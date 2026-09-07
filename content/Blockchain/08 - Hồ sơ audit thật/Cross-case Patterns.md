---
tags: [audit, case-study, tổng-hợp]
status: evergreen
---
# Cross-case Patterns

> Ba báo cáo. **Ba ngôn ngữ khác nhau** — Solidity, Rust/CosmWasm, Cairo. Ba lĩnh vực khác nhau — NFT lending, bất động sản token hoá, zkEVM. Note này trả lời câu hỏi duy nhất đáng hỏi: **cái gì lặp lại ở cả ba?**

## 1. Ba con số nền

| | Gondi | Coded Estate | Kakarot |
|---|---|---|---|
| Ngôn ngữ | Solidity | Rust / CosmWasm | Cairo |
| Dòng code | 4.117 | 2.647 | 15.398 |
| Warden | **2** | 4 | **23** |
| Dòng/warden | ~2.060 | ~660 | ~670 |
| High / Medium | 0 / 1 | **9 / 9** | 6 / 11 |
| Mitigation review | ❌ | ❌ | ✅ |
| Thời gian | 3 tuần | **1 tuần** | 4 tuần |

Đọc bảng này cùng [[Contest Severity vs Real Risk]] — số finding nói về **số mắt** và **độ trưởng thành của codebase**, không nói về mức độ an toàn.

## 2. Sáu mẫu lặp lại ở cả ba

### ⭐ 1. Thu hồi quyền không khớp với cấp quyền
| Case | Biểu hiện |
|---|---|
| Gondi M-01 | Revoke truyền `rights = ""` ⇒ sai khoá ⇒ không xoá gì |
| Coded Estate H-05 | Huỷ bid không revoke approval |
| Kakarot QA-04 | Đổi native token ⇒ không cấp lại approval được |

**Ba ngôn ngữ, ba codebase, một lỗi.** → [[Stale Approval and Delegation]]

### ⭐ 2. Đổi tham số hệ thống khi còn việc dang dở
| Case | Biểu hiện |
|---|---|
| Gondi L-08 | Đổi liquidator ⇒ auction cũ không settle được |
| Coded Estate H-06, H-07 | Đổi `denom` khi còn bid / chưa quyết toán |
| Kakarot QA-04 | Đổi native token ⇒ account cũ hỏng |

→ [[Broken State Lifecycle]]

### ⭐ 3. Kiểu số quá hẹp cho miền giá trị thật
| Case | Biểu hiện |
|---|---|
| Coded Estate M-03, M-04 | `u64` cho tiền ⇒ trần ~18 token với 18 decimals |
| Kakarot H-02, M-04 | Underflow felt, `chain_id` không giới hạn độ dài |

→ [[Integer and Precision Bugs]]

### ⭐ 4. Nhiều đường tới cùng một hành động, kiểm tra không đều
| Case | Biểu hiện |
|---|---|
| Coded Estate H-08 | `transfer_nft` có thanh toán, `send_nft` không |
| Coded Estate H-04 | Hàm short-term dùng được cho long-term |
| Gondi L-06 | Chữ ký `addNewTranche` dùng được cho `refinanceFull` |
| Kakarot H-01 | Delegatecall là đường vòng qua whitelist |

→ [[Missing Input Validation]]

### ⭐ 5. Kiểm tra bảo vệ đặt sai tầng
| Case | Biểu hiện |
|---|---|
| Kakarot H-01 | Whitelist theo code address thay vì execution address |
| Kakarot M-06 | Reentrancy guard ở account thay vì ở `eth_call` |
| Gondi L-08 | `onlyLiquidator` kiểm một biến đổi được giữa chừng |

→ [[Delegatecall and Context Confusion]], [[Reentrancy]]

### ⭐ 6. Off-chain là điểm mù chung
| Case | Biểu hiện |
|---|---|
| Gondi L-01 | Event thiếu trường tạo nên khoá lưu trữ |
| Gondi L-05 | `offerId` không được xác thực |
| Coded Estate M-08 | `tokenURI` tuỳ ý ⇒ giả mạo, JSON injection |

→ [[Metadata and Off-chain Trust]]

## 3. Ba mẫu về *quy trình*, không về code

1. **Sponsor trả lời bằng giả định vận hành.** *"Chúng tôi dùng token 6 decimals"*, *"Không ai set mảng dài như vậy"*, *"Token sẽ được kiểm trước khi deploy"*. Không câu nào sai; không câu nào nằm trong code hay tài liệu. → [[Scoping and Threat Modeling]]

2. **Severity được quyết bằng con số, không bằng lập luận.** Coded Estate M-04 đổi mức hai lần; yếu tố quyết định là phép tính "1.632 lần gọi". → [[Writing a Finding]]

3. **Bản vá cũng có bug.** 5/33 ở Kakarot. Hai case còn lại **không có mitigation review**, nên ta không biết tỉ lệ của chúng. → [[Mitigation Review]]

## 4. Bài học lớn nhất

> [!warning] Lớp lỗ hổng không phụ thuộc ngôn ngữ
> Solidity, Rust và Cairo có hệ kiểu, mô hình bộ nhớ và cơ chế an toàn **hoàn toàn khác nhau**. Rust có ownership; Cairo có prover. Không cái nào ngăn được sáu mẫu ở mục 2.
>
> Lý do: những mẫu đó không phải lỗi **ngôn ngữ**. Chúng là lỗi **mô hình** — về vòng đời, về quyền, về ai tin ai. Ngôn ngữ an toàn hơn không sửa được điều đó.

Hệ quả thực tế cho việc học: **đừng học "lỗ hổng Solidity". Học các lớp lỗi ở [[Vulnerability Taxonomy]] và đọc báo cáo ở mọi ngôn ngữ.**

## 5. Checklist rút gọn từ ba case

Sáu câu hỏi bắt được sáu mẫu ở mục 2 — dùng khi audit bất kỳ codebase nào:

- [ ] Mọi chỗ **cấp** quyền có chỗ **thu hồi** khớp chính xác tham số không?
- [ ] Mọi setter hệ thống: còn việc dang dở nào phụ thuộc giá trị cũ không? Front-run được không?
- [ ] Mọi kiểu số cho tiền: miền giá trị thật tối đa là bao nhiêu với token 18 decimals?
- [ ] Có **bao nhiêu đường** tới mỗi hành động quan trọng? Danh sách kiểm tra của chúng có khớp không?
- [ ] Mỗi phép kiểm bảo vệ đặt ở **ranh giới** hay ở một **lối vào**?
- [ ] Event có đủ trường để off-chain dựng lại state không? Có chuỗi tuỳ ý nào đi vào ngữ cảnh có cấu trúc không?

## Tham khảo

- [Gondi](https://code4rena.com/reports/2024-06-gondi) · [Coded Estate](https://code4rena.com/reports/2024-10-coded-estate) · [Kakarot](https://code4rena.com/reports/2024-09-kakarot)
- [Solodit](https://solodit.xyz/) — kiểm chứng rằng sáu mẫu này lặp lại ở hàng nghìn audit khác
- [Trail of Bits — Building Secure Contracts](https://secure-contracts.com/)

## Liên kết

[[Case Gondi]] · [[Case Coded Estate]] · [[Case Kakarot]] · [[Vulnerability Taxonomy]] · [[Audit Checklist Master]] · [[Blockchain]]
