---
tags: [audit, checklist, tài-nguyên]
status: evergreen
---
# Audit Checklist Master

> Checklist gộp của cả vault, sắp theo **thứ tự dùng khi audit thật**. Mỗi mục dẫn về note giải thích. Đây là note để mở trong màn hình thứ hai, không phải note để đọc.
>
> ⚠️ Checklist là **sàn**, không phải trần. Nó bắt được các lớp lỗi đã biết; bug đắt tiền thường ở [[Invariant Discovery]] và [[Economic Attacks]], nơi không checklist nào chạm tới.

## A. Trước khi đọc code — [[Scoping and Threat Modeling]]

- [ ] Bảng actor × quyền × "tệ nhất làm được gì"
- [ ] Mọi đường mỗi loại tài sản **rời khỏi** contract
- [ ] Danh sách giả định tin cậy — mỗi cái: đưa vào code được / ghi vào báo cáo / là finding
- [ ] Danh sách bất biến bằng câu tiếng Việt — [[Invariant Discovery]]
- [ ] Gạch chân mọi câu khẳng định trong README, lên kế hoạch kiểm từng câu
- [ ] Hỏi sponsor: chain đích? token hỗ trợ? admin là ai? upgradeable? audit trước? gì ngoài scope?

## B. Cấu hình và version — [[Solidity Version Pitfalls]]

- [ ] Pragma ghim chính xác, không floating
- [ ] Version có trong [bug list](https://docs.soliditylang.org/en/latest/bugs.html) không? Code dùng mẫu bị ảnh hưởng không?
- [ ] `evm_version` khai rõ; chain đích hỗ trợ `PUSH0`/`TSTORE` chứ?
- [ ] Optimizer runs, `via_ir` — test chạy cùng cấu hình
- [ ] `forge build --sizes` — có contract nào gần 24KB không?
- [ ] `forge coverage` — vùng nào 0%?

## C. Quyền và vòng đời — [[Access Control Patterns]], [[Broken State Lifecycle]]

- [ ] Bảng: mỗi hàm thay đổi state × "ai gọi được". Có hàng nào là "bất kỳ ai" ngoài ý muốn?
- [ ] Two-step cho mọi chuyển quyền? Cài đặt có kiểm khớp đề xuất/xác nhận không?
- [ ] Mọi tham số admin có min/max cứng không? (fee, thời gian, tỉ lệ)
- [ ] **Tổ hợp** đặc quyền: admin độc hại làm gì tệ nhất?
- [ ] Máy trạng thái cho mọi thực thể giữ tiền đã vẽ chưa?
- [ ] Mọi hàm xoá/burn/đóng có kiểm nghĩa vụ chưa kết thúc không?
- [ ] Mỗi trạng thái cuối: có ai còn tiền mà không còn đường rút không?
- [ ] Mọi setter đổi địa chỉ hệ thống: việc dang dở bị bỏ rơi không? Front-run được không?
- [ ] Mọi chỗ **cấp** quyền có chỗ **thu hồi** khớp chính xác tham số không? — [[Stale Approval and Delegation]]

## D. Đầu vào — [[Missing Input Validation]]

- [ ] Bảng: mỗi hàm × mỗi tham số × "dải hợp lệ". Ô trống = finding tiềm năng
- [ ] Mọi trường struct: có chỗ nào **đọc** nó không? (`grep -c`)
- [ ] Mọi cờ boolean: được kiểm ở **mọi** đường thực thi chứ?
- [ ] Tham số `address`: kiểm `!= address(0)`? Ràng buộc phải là ai?
- [ ] Tham số tiền: khớp với giá trị đã cam kết trước đó?
- [ ] Có **hai hàm nào làm cùng một việc** không? Diff danh sách kiểm tra của chúng
- [ ] Điều kiện "được phép sửa" phủ **toàn bộ** vòng đời hay chỉ một mốc?

## E. Số học — [[Integer and Precision Bugs]]

- [ ] Mọi `uintN` với N<256: miền giá trị thật với token 18 decimals?
- [ ] Mọi ép kiểu hẹp qua `SafeCast`?
- [ ] Mọi `unchecked` có lập luận?
- [ ] Có chia trước nhân không? Có dùng `mulDiv` cho tích trung gian không?
- [ ] Mỗi phép chia làm tròn về phía **protocol** chứ?
- [ ] Đầu vào 1 wei có cho kết quả 0 không? Lặp lại có lợi cho ai?
- [ ] Hàm toán nền tảng đúng ở ca biên (`0^0`, max, 0)?

## F. Lời gọi ra ngoài — [[Reentrancy]], [[Denial of Service Patterns]]

- [ ] Liệt kê **mọi** lời gọi ra ngoài, kể cả callback ẩn (`safeTransfer*`, oracle, EIP-1271)
- [ ] State hoàn tất trước mỗi lời gọi (CEI)?
- [ ] Guard dùng chung giữa các contract chia sẻ state?
- [ ] Hàm `view` nào bị bên ngoài dùng làm giá? Đọc được giữa lúc state dở dang không?
- [ ] Mọi low-level `call`: kiểm `success`? Kiểm đích có code?
- [ ] Giới hạn returndata?
- [ ] Mọi vòng lặp: ai điều khiển độ dài? Có cap?
- [ ] Mọi hàm **bắt buộc phải chạy được**: phụ thuộc gì có thể fail?
- [ ] Push payment nào chuyển sang pull được không?

## G. Token và tích hợp — [[Weird ERC20 Tokens]], [[Composability Risk]]

- [ ] Mọi lời gọi token qua `SafeERC20`?
- [ ] Bảng hành vi lệch chuẩn × "protocol chịu được không"
- [ ] Kế toán bằng biến nội bộ hay `balanceOf`? Có đo delta không?
- [ ] Có **bao nhiêu đường** để tài sản rời contract? Kiểm tra có đều không?
- [ ] Loại token thanh toán có bị khoá suốt vòng đời một nghĩa vụ không?
- [ ] Sơ đồ mọi contract bên ngoài: upgradeable? pausable? revert được? approval vô hạn?
- [ ] Kill switch cho từng tích hợp?

## H. Chữ ký — [[Signatures and EIP-712]], [[Signature Malleability]]

- [ ] Nonce? Deadline? `chainId`? `verifyingContract`?
- [ ] Mỗi hành động một `TYPEHASH` riêng? Chữ ký dùng chéo hàm được không?
- [ ] Mọi trường ảnh hưởng kết quả nằm trong phần được ký?
- [ ] `ECDSA.recover` thay vì `ecrecover` trần? Kiểm `!= address(0)`, `s ≤ n/2`, `v` hợp lệ?
- [ ] "Đã dùng" đánh dấu theo digest/nonce hay theo bytes chữ ký?
- [ ] Hỗ trợ EIP-1271?

## I. Ngữ cảnh thực thi — [[Delegatecall and Context Confusion]], [[Storage Layout]]

- [ ] Mọi `delegatecall`: đích cố định? Người dùng ảnh hưởng được không?
- [ ] Storage layout caller/callee khớp? Đã diff `forge inspect` chưa?
- [ ] Phép kiểm phân quyền nào dựa vào `address(this)` hay "code nào đang chạy"?
- [ ] Whitelist kiểm **execution address** hay **code address**?
- [ ] Proxy: slot EIP-1967? `_disableInitializers()`? `initializer` modifier? `__gap`?
- [ ] Mọi block `assembly`: `0x40` cập nhật? `extcodesize` kiểm? offset kiểm biên?

## J. Thứ tự và thời gian — [[Front-running and MEV]], [[Units and Global Variables]]

- [ ] Hàm nào mà biết trước nội dung đem lại lợi ích? Lợi ích bao nhiêu?
- [ ] Luồng nào cần hai giao dịch của hai bên? Bên sau bị ràng buộc bởi state bên trước đổi được không?
- [ ] Hàm permissionless nào dùng tham số admin đổi được? Xét thứ tự xấu nhất cùng block
- [ ] Slippage do người gọi truyền? Deadline thật (không phải `block.timestamp`)?
- [ ] Nguồn ngẫu nhiên on-chain nào không?
- [ ] `block.number` dùng đo thời gian trên chain không phải L1 không?

## K. Giá và kinh tế — [[Oracles]], [[Oracle Manipulation]], [[Economic Attacks]]

- [ ] Liệt kê **mọi** nguồn giá, kể cả gián tiếp (tỉ lệ vault, LP token, `totalSupply`)
- [ ] Với mỗi nguồn: **chi phí thao túng vs lợi ích tối đa** — viết ra con số
- [ ] Có nguồn spot on-chain không? TWAP cửa sổ bao lâu, pool sâu bao nhiêu?
- [ ] Chainlink: `answer > 0`, `updatedAt`, staleness theo heartbeat, `answeredInRound`, circuit breaker, sequencer uptime (L2)?
- [ ] Mọi cơ chế cần **người ngoài hành động**: lợi nhuận kỳ vọng trong điều kiện tệ nhất?
- [ ] Tài nguyên khan hiếm nào chiếm được gần miễn phí?
- [ ] Nếu người gọi có vốn vô hạn trong đúng tx này, họ làm được gì? — [[Flash Loans]]
- [ ] Mọi người rút cùng lúc thì sao? Gas đắt 100×? Thanh khoản bằng 0?

## L. Ranh giới off-chain — [[Metadata and Off-chain Trust]]

- [ ] Chuỗi người dùng nào được ghép vào cấu trúc (JSON/SVG/URL)?
- [ ] Event có đủ trường để dựng lại state? Trường tạo nên khoá lưu trữ có trong event?
- [ ] Danh tính đối tượng gồm những trường nào? Frontend hiển thị đủ chứ?
- [ ] Giả định về off-chain đã ghi vào phần "assumptions" của báo cáo chưa?

## M. Trước khi nộp — [[Writing a Finding]], [[Mitigation Review]]

- [ ] Mỗi finding: tiêu đề = hàm + hành vi sai + hậu quả
- [ ] Attack path đánh số, mỗi bước một hành động
- [ ] Tác động **định lượng bằng số**
- [ ] PoC chạy được; đã sửa bug và chạy lại để xác nhận test fail
- [ ] Mitigation cụ thể tới mức copy được
- [ ] Severity khớp [[Severity Classification]]; không nói quá
- [ ] Đã lên lịch pha mitigation review chưa?

## Liên kết

[[Vulnerability Taxonomy]] · [[Audit Workflow]] · [[Cross-case Patterns]] · [[Learning Roadmap]] · [[Blockchain]]
