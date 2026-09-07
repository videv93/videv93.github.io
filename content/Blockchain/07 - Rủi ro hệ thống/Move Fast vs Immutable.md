---
tags: [blockchain, bản-lề, văn-hoá]
status: evergreen
---
# Move Fast vs Immutable

> ⚠️ **Note bản lề.** Mâu thuẫn này nằm trong **một nguồn duy nhất** của seed — chương 1 *Mastering Ethereum* vừa ca ngợi tốc độ vừa ghi lại cái giá của nó — và nó là lý do tồn tại của mọi thứ trong thư mục `02` và `04`.

## 1. Mâu thuẫn, bằng chính lời của nguồn

Chương 1 *Mastering Ethereum* mô tả văn hoá Ethereum:

> *"Trong Ethereum, văn hoá phát triển của cộng đồng hướng về tương lai chứ không phải quá khứ. Câu thần chú (không hoàn toàn nghiêm túc) là 'move fast and break things'. Nếu cần một thay đổi, nó được triển khai — kể cả khi điều đó làm mất hiệu lực các giả định trước đó, phá vỡ tương thích, hoặc buộc client phải cập nhật."*

Rồi vài đoạn sau, cùng chương, cùng tác giả:

> *"Một trong những thách thức lớn với lập trình viên Ethereum là **mâu thuẫn nội tại giữa việc triển khai code lên một hệ thống bất biến và một nền tảng phát triển vẫn đang tiến hoá**. Bạn không thể đơn giản 'nâng cấp' smart contract của mình. Bạn phải sẵn sàng deploy cái mới, di chuyển người dùng, ứng dụng và tiền, rồi bắt đầu lại."*

Và câu kết luận mà ít ai trích:

> *"Trớ trêu thay, điều này cũng có nghĩa là mục tiêu xây dựng hệ thống tự chủ hơn với ít kiểm soát tập trung hơn vẫn **chưa được thực hiện đầy đủ**... Để 'tiến hoá' nền tảng, bạn phải sẵn sàng vứt bỏ và khởi động lại smart contract của mình, nghĩa là **bạn phải giữ một mức độ kiểm soát nhất định đối với chúng**."*

## 2. Vì sao không bên nào sai

**Bên "move fast" đúng ở chỗ:** Ethereum có được vị thế hôm nay nhờ tốc độ. EIP-1559, The Merge, proto-danksharding — không hệ thống bảo thủ nào làm được trong khung thời gian đó. Chương 1 nói thẳng: *"Có rất ít cơ hội cho 'bike-shedding'."* Đối chiếu với Bitcoin, nơi mọi thay đổi phải tương thích ngược, cho thấy đánh đổi là thật ở cả hai chiều.

**Bên "immutable" đúng ở chỗ:** tính bất biến **là** sản phẩm. Nếu code sửa được thì người dùng không tin code — họ tin người kiểm soát code, và khi đó phần lớn lý do dùng blockchain biến mất.

## 3. Chỗ hai bên đồng thuận

| Điểm | Cả hai bên đều chấp nhận |
|---|---|
| Cần một đường sửa lỗi | Không ai muốn một bug vĩnh viễn |
| Kiểm soát phải minh bạch | Ai upgrade được, phải công khai |
| Người dùng cần thời gian thoát | Timelock, thông báo |
| Nâng cấp là **hành động quản trị**, không phải hành động kỹ thuật | Xem [[Governance Attacks]] |

Toàn bộ ngành đã hội tụ vào một thoả hiệp: **upgradeable + timelock + multisig + công bố rõ**. Đó không phải chiến thắng của bên nào — đó là một khoản nợ kỹ thuật được quản lý.

## 4. Chỗ nó gãy

### ⚠️ a. Upgradeability trả lời một vấn đề bằng ba vấn đề mới
Storage collision, uninitialized implementation, quyền nâng cấp. Xem [[Proxy and Upgradeability]] và [[Storage Layout]]. Nghịch lý: **cơ chế thêm vào để sửa bug lại là một trong những nguồn bug lớn nhất.**

### ⚠️ b. "Không upgradeable" thường là hư cấu
Gondi không dùng proxy. Nhưng `updateLiquidationContract()` đổi được contract nắm giữ tài sản thế chấp — và làm vậy **khoá tài sản của người dùng vĩnh viễn** (L-08). Về mặt rủi ro, một setter đổi được contract giữ tiền tương đương một proxy.

**Phép kiểm thật không phải "có proxy không" mà là: *có ai đổi được hành vi giữ tiền của tôi không?***

### ⚠️ c. "Move fast" đẩy chi phí sang integrator
Mỗi lần nền tảng đổi, mọi contract đã deploy trở thành code viết cho một EVM không còn tồn tại nữa: giá gas đổi (mẫu `transfer()` 2300 gas chết), `SELFDESTRUCT` đổi ngữ nghĩa (EIP-6780), `PUSH0` xuất hiện và phá vỡ deploy đa chain, `block.difficulty` thành `prevrandao`. Xem [[Solidity Version Pitfalls]].

Chi phí này không do người quyết định thay đổi trả.

### ⚠️ d. Nó khuyến khích deploy trước, hiểu sau
Ba báo cáo trong seed đều là audit của code **sắp** hoặc **đã** deploy. Không phải review thiết kế. Ngành đã chuẩn hoá việc **tìm lỗ hổng High sau khi kiến trúc đã đông cứng**, ở giai đoạn mà sửa gốc thì quá đắt — nên nhiều thứ chỉ được *acknowledged*. Xem [[Contest Severity vs Real Risk]].

### ⚠️ e. "Dễ viết code" là một câu quảng cáo có hoá đơn
Chương 1: *"Trong vài năm đầu, thường thấy áo phông tuyên bố rằng bạn có thể tạo một token chỉ trong năm dòng code."* Rồi ngay câu sau: *"Tất nhiên đây là con dao hai lưỡi. Viết code thì dễ, nhưng viết code **tốt và an toàn** thì rất khó."*

Ba báo cáo trong `_archive-seed/` — 16 High, 21 Medium — là hoá đơn của vế đầu.

## 5. Cách dùng một cách trung thực

| Dùng như | **Không** dùng như |
|---|---|
| Lý do để **ghim** version compiler, EVM version, và địa chỉ đối tác | Lý do để tránh mọi thứ mới |
| Lý do để audit **cả bản vá**, không chỉ code gốc | Lý do để không bao giờ nâng cấp |
| Lý do để coi upgradeability là **rủi ro quản trị phải công bố** | Lý do để coi mọi proxy là finding |
| Lý do để hỏi *"contract này viết cho EVM version nào"* | Lý do để từ chối deploy đa chain |

## 6. Phép kiểm bạn tự chạy được

- **Phép kiểm kiểm soát**: với một protocol bất kỳ, tìm câu trả lời cho *"ai đổi được hành vi giữ tiền của tôi, và trong bao lâu?"* Nếu không tìm được trong 15 phút, đó chính là câu trả lời.
- **Phép kiểm "không upgradeable"**: `grep` mọi hàm `onlyOwner`/`onlyAdmin` set một `address`. Mỗi cái là một đường thay đổi hành vi.
- **Phép kiểm hạn sử dụng**: contract này giả định điều gì về EVM? (giá gas, opcode có sẵn, ngữ nghĩa `SELFDESTRUCT`). Giả định nào đã sai ở fork gần nhất?
- **Phép kiểm tách nội dung khỏi nguồn**: khi đọc một lập luận ủng hộ hoặc phản đối upgradeability, hỏi *"người nói có nắm khoá upgrade không?"* — rồi đánh giá lập luận mà bỏ qua câu trả lời đó.

## Tham khảo

- *Mastering Ethereum* 2nd ed., ch.1 — "Ethereum's Development Culture" và "Why Learn Ethereum?" (trong `_archive-seed/1. What Is Ethereum?.md`)
- [EIP-6780: SELFDESTRUCT semantics change](https://eips.ethereum.org/EIPS/eip-6780) — ví dụ về giả định bị vô hiệu
- [EIP-3855: PUSH0](https://eips.ethereum.org/EIPS/eip-3855) — phá vỡ deploy đa chain
- [OpenZeppelin — Proxy upgrade pattern](https://docs.openzeppelin.com/upgrades-plugins/proxies)
- [Gondi L-08 (Code4rena)](https://code4rena.com/reports/2024-06-gondi) — "không upgradeable" mà vẫn đổi được contract giữ tài sản

## Liên kết

[[What Is Ethereum]] · [[Proxy and Upgradeability]] · [[Contest Severity vs Real Risk]] · [[Solidity Version Pitfalls]] · [[Governance Attacks]] · [[Blockchain]]
