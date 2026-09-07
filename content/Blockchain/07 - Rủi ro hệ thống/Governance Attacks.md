---
tags: [defi, rủi-ro, governance]
status: evergreen
---
# Governance Attacks

> Governance là **cửa hậu hợp pháp** của mọi protocol. Nếu ai đó kiểm soát được quy trình bỏ phiếu, họ không cần tìm bug — họ chỉ cần bỏ phiếu cho một bug.

## 1. Bốn cửa vào

| Cửa | Cơ chế |
|---|---|
| **Mua phiếu bằng flash loan** | Quyền biểu quyết theo số dư **tức thời** ⇒ vay, vote, trả |
| **Tích luỹ phiếu thật** | Mua đủ token trên thị trường mở — hợp pháp và đã xảy ra nhiều lần |
| **Đề xuất độc hại đội lốt vô hại** | Calldata dài, không ai đọc; hoặc "nâng cấp thư viện" |
| **Chiếm quyền admin** | Không cần governance nếu owner là một EOA |

## 2. Bốn biện pháp và chỗ chúng gãy

| Biện pháp | Chống được | Gãy khi |
|---|---|---|
| **Snapshot theo block trước** | Flash loan | Vẫn mua được token trước snapshot |
| **Timelock** | Đề xuất bất ngờ | Quá ngắn để ai kịp phản ứng, hoặc timelock cũng do governance đổi |
| **Quorum** | Nhóm nhỏ | Quá thấp; hoặc quá cao ⇒ tê liệt (một dạng DoS) |
| **Guardian / veto** | Đề xuất độc hại | Guardian trở thành điểm tập trung mới |

> [!warning] Timelock chỉ có giá trị nếu có người theo dõi
> Timelock 48 giờ chỉ bảo vệ được nếu có ai đọc calldata của đề xuất đang chờ **và** người dùng kịp rút. Nếu không ai theo dõi, nó chỉ là 48 giờ trì hoãn.

## 3. Câu hỏi rà soát quyền quản trị

Đây là bảng phải điền cho mọi protocol:

| Câu hỏi | Vì sao |
|---|---|
| Ai đổi được tham số nào? | Bề mặt tấn công |
| Mỗi tham số có min/max cứng không? | Coded Estate QA-02: fee đặt được 100% |
| Có timelock không? Bao lâu? Người dùng rút kịp không? | |
| Owner là EOA, multisig hay governance? Multisig m/n bao nhiêu? | Một key = một protocol |
| Governance đổi được **chính timelock** không? | Nếu có, timelock là hư cấu |
| Có upgrade contract được không? | Xem [[Proxy and Upgradeability]] |
| Có allowlist token/collateral không? Ai thêm được? | Thêm một token độc = mất tiền |
| Có hàm dừng khẩn cấp không? Ai gọi được? Ai bật lại được? | |

Bảng này thuộc pha scoping — xem [[Scoping and Threat Modeling]].

## 4. Cạm bẫy

1. **Quyền biểu quyết theo `balanceOf` tức thời** thay vì checkpoint. Xem [[Flash Loans]].
2. **Delegation không có cooldown** ⇒ vẫn mua được quyền tạm thời.
3. **Quorum quá cao** ⇒ không đề xuất nào qua ⇒ protocol đóng băng vĩnh viễn. Đây là DoS ở tầng quản trị.
4. **Đề xuất thực thi calldata tuỳ ý** — chuẩn, nhưng nghĩa là một đề xuất qua được là toàn quyền.
5. **Không có đường thu hồi quyền.** Kakarot QA-04 là bản nhỏ của vấn đề này ở tầng kỹ thuật.
6. **Contract "không upgradeable" nhưng có setter đổi mọi địa chỉ phụ thuộc** — tương đương upgradeable về mặt rủi ro. Gondi `updateLiquidationContract()` là ví dụ.
7. **Token quản trị thanh khoản mỏng** ⇒ mua đủ phiếu rẻ hơn giá trị TVL kiểm soát được. Đây là phép tính phải làm: **chi phí mua quyền kiểm soát so với TVL**.

## 5. Checklist áp dụng

- [ ] Đã điền đầy đủ bảng ở mục 3 chưa?
- [ ] Quyền biểu quyết dùng checkpoint hay số dư tức thời?
- [ ] Chi phí mua đủ phiếu để thông qua một đề xuất là bao nhiêu? So với TVL?
- [ ] Timelock bao lâu? Người dùng rút kịp trong khoảng đó không?
- [ ] Governance đổi được chính timelock/quorum không?
- [ ] Mọi tham số quản trị có min/max cứng trong code không?
- [ ] Có hàm dừng khẩn cấp không? Ai gọi được, ai bật lại được?
- [ ] Nếu quorum không bao giờ đạt, protocol có bị đóng băng vĩnh viễn không?
- [ ] Có setter nào đổi được contract giữ tiền mà không qua governance không?
- [ ] Admin độc hại làm được gì tệ nhất? Đã ghi vào báo cáo chưa?

## Tham khảo

- [OpenZeppelin Governor](https://docs.openzeppelin.com/contracts/api/governance) — cài đặt tham chiếu, có checkpoint
- [Rekt — Beanstalk](https://rekt.news/beanstalk-rekt/) — flash loan governance attack, \$182M
- [Compound Governance docs](https://docs.compound.finance/governance/)
- [a16z — Governance attack vectors](https://a16zcrypto.com/posts/article/dao-governance-attacks-and-how-to-avoid-them/)

## Liên kết

[[Access Control Patterns]] · [[Flash Loans]] · [[Proxy and Upgradeability]] · [[Economic Attacks]] · [[Blockchain]]
