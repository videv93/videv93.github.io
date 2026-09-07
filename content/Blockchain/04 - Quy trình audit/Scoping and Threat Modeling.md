---
tags: [audit, quy-trình]
status: evergreen
---
# Scoping and Threat Modeling

> Threat model là câu trả lời cho **"ai muốn gì, và họ được phép làm gì để đạt được nó"**. Không có nó, bạn chỉ đang tìm lỗi kỹ thuật — và những vụ mất tiền lớn nhất không phải lỗi kỹ thuật.

## 1. Bốn danh sách phải lập trước khi đọc code

### a. Actor
Với mỗi actor: quyền gì, động cơ gì, tệ nhất họ làm được gì.

Ví dụ Coded Estate:

| Actor | Quyền | Tệ nhất |
|---|---|---|
| Chủ nhà (token owner) | Niêm yết, đặt giá, duyệt/từ chối, rút tiền, **burn token** | Burn khi đang có khách ⇒ tiền khách kẹt (H-09) |
| Khách thuê | Đặt, cọc, huỷ | Đặt kín lịch miễn phí (M-06) |
| Người mua | Bid, huỷ bid, `transfer_nft` | Giữ approval sau khi huỷ ⇒ lấy NFT miễn phí (H-05) |
| Contract owner | Đặt phí | Đặt phí 100% (QA-02) |

Bảng này **tự sinh ra** bốn trong số các finding của audit đó. Đây là lý do nó đứng trước việc đọc code.

### b. Tài sản
Cái gì có giá trị, nằm ở đâu, ai chạm được. Với mỗi tài sản: **liệt kê mọi đường nó rời khỏi contract**. Coded Estate H-08 tồn tại vì có **hai** đường chuyển NFT và chỉ một đường có logic thanh toán.

### c. Giả định tin cậy
Điều protocol tin mà không kiểm được. Ví dụ thật từ seed:
- *"Chúng tôi dùng token 6 decimals"* (Coded Estate) — không được kiểm trong code
- *"Mọi token dùng cho DualVmToken sẽ được kiểm tương thích trước khi deploy"* (Kakarot)
- *"Admin sẽ không đặt phí 100%"*

Mỗi giả định là một trong ba thứ: (1) đưa được vào code thành `require` ⇒ đề xuất làm vậy; (2) không đưa được ⇒ **ghi vào báo cáo như rủi ro vận hành**; (3) sai ⇒ finding.

### d. Bất biến
Xem [[Invariant Discovery]].

## 2. Câu hỏi cho sponsor

| Câu hỏi | Vì sao |
|---|---|
| Deploy lên chain nào? | EVM-equivalence, precompile, gas — xem [[EVM Execution Model]] |
| Token nào được hỗ trợ? Allowlist hay tuỳ ý? | [[Weird ERC20 Tokens]] |
| Admin là ai? Multisig? Timelock? | [[Access Control Patterns]] |
| Contract có upgradeable không? | [[Proxy and Upgradeability]] |
| Tích hợp với protocol nào bên ngoài? | [[Composability Risk]] |
| Phần nào ngoài scope, và vì sao? | Ngoài scope không có nghĩa là không rủi ro |
| Hành vi nào là "chủ đích" dù trông lạ? | Coded Estate M-05 |
| Đã audit lần nào chưa? Báo cáo đâu? | Đừng tìm lại cái đã tìm |

## 3. Đọc README như đọc spec

README của Kakarot liệt kê hẳn *"ERC-20 token behaviors in scope"*. Zenith biến danh sách đó thành **bảng đối chiếu từng hành vi × trạng thái hỗ trợ** — và bảng đó chính là finding M-07.

> [!warning] Mọi câu khẳng định trong README là một bất biến chờ được kiểm
> *"Any ERC20"* trong README của Coded Estate trở thành finding QA-01: logic hiện tại **không xử lý được CW20**. Đọc README, gạch chân mọi câu khẳng định, rồi đi kiểm từng câu.

## 4. Cạm bẫy

1. **Chấp nhận scope theo đúng danh sách file.** Contract ngoài scope mà contract trong scope tin tưởng thì vẫn là rủi ro của bạn — ghi vào báo cáo.
2. **Bỏ qua actor "admin độc hại".** Nhiều protocol coi đây là ngoài phạm vi; nhưng người dùng thì không.
3. **Chỉ mô hình hoá tấn công đơn lẻ.** Coded Estate M-01 là **tổ hợp hai đặc quyền hợp lệ**.
4. **Quên actor "người ngoài không có quyền gì".** Nhiều DoS đến từ đây.
5. **Không viết threat model ra giấy.** Giữ trong đầu nghĩa là mất nó ở ngày thứ ba.
6. **Coi tài liệu là nguồn sự thật.** Tài liệu và code lệch nhau **là** một finding — Gondi M-01 dùng chính điểm này để giữ severity.

## 5. Checklist áp dụng

- [ ] Đã có bảng actor × quyền × "tệ nhất làm được gì" chưa?
- [ ] Đã liệt kê mọi đường mỗi loại tài sản rời khỏi contract chưa?
- [ ] Đã liệt kê giả định tin cậy chưa? Mỗi giả định thuộc nhóm nào trong ba nhóm ở mục 1c?
- [ ] Đã gạch chân mọi câu khẳng định trong README/docs và lên kế hoạch kiểm từng câu chưa?
- [ ] Đã hỏi sponsor đủ tám câu ở mục 2 chưa?
- [ ] Có xét actor "admin độc hại" và "người ngoài không quyền" không?
- [ ] Có xét **tổ hợp** đặc quyền không, hay chỉ từng cái?
- [ ] Contract ngoài scope nào được contract trong scope tin tưởng? Đã ghi vào báo cáo chưa?

## Tham khảo

- [Trail of Bits — Threat modeling for smart contracts](https://secure-contracts.com/development-guidelines/)
- [Code4rena — Audit README template](https://docs.code4rena.com/roles/sponsors)
- [Coded Estate QA-01](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/30) — README nói "any ERC20", code không đỡ được
- [Kakarot README — ERC-20 behaviors in scope](https://github.com/code-423n4/2024-09-kakarot)

## Liên kết

[[Audit Workflow]] · [[Invariant Discovery]] · [[Access Control Patterns]] · [[Weird ERC20 Tokens]] · [[Blockchain]]
