---
tags: [audit, case-study, solidity, nft]
status: evergreen
---
# Case Gondi

> ⚠️ Đọc [[Contest Severity vs Real Risk]] trước — **0 High không có nghĩa là an toàn**, nó có nghĩa là hai người đã đọc 4.117 dòng.

> **Code4rena, 14/6 – 5/7/2024. Solidity. 29 contract, 4.117 dòng. 2 warden. Judge: 0xsomeone.**
> Kết quả: **0 High, 1 Medium, 12 Low.** Đây là hình dạng của một audit trên codebase đã trưởng thành — và là ca đáng học nhất về việc **phần Low chứa nhiều bài học hơn phần High**.

## 1. Protocol

Cho vay thế chấp NFT với ba đặc điểm ít gặp — xem [[NFT Finance]]:
- **Tranche**: nhiều lender ở các mức ưu tiên khác nhau trong cùng một khoản vay
- **Refinance**: đổi khoản vay sang điều kiện tốt hơn, do borrower hoặc lender khởi xướng
- **UserVault**: bó nhiều tài sản (ERC-20 + ERC-721) thành một NFT làm thế chấp
- **Delegation**: borrower vẫn dùng được NFT đang khoá qua Delegate.cash

*Lưu ý về scope:* báo cáo ghi rõ **các finding liên quan tới pool chưa phát hành đã bị lược bỏ do embargo**. Nghĩa là báo cáo công khai không phải toàn bộ kết quả audit.

## 2. Finding duy nhất: M-01

`revokeDelegate()` luôn truyền `rights = ""` vào `DelegateRegistry`, trong khi `delegate()` cho borrower truyền `rights` tuỳ ý. `rights` được **băm vào khoá lưu trữ** ⇒ revoke ghi vào khoá khác ⇒ **không xoá gì cả**.

Kịch bản: borrower cũ delegate với `rights` tuỳ chỉnh → khoản vay kết thúc → NFT sang borrower mới → `revokeDelegate()` (vô tác dụng) → borrower cũ vẫn nhận airdrop/vé của borrower mới.

Chi tiết ở [[Stale Approval and Delegation]].

**Hai điểm về judging đáng nhớ:**
1. Judge thừa nhận có **đường vòng** (gọi `delegate()` với đúng `rights`, `value=false`), nhưng giữ Medium vì *"người dùng sẽ dùng hàm tên là `revokeDelegate`"*.
2. Judge nêu thêm rằng code **đi ngược đặc tả interface của chính nó** (`IMultiSourceLoan.sol#L257-L261`) như lý do củng cố severity.

## 3. Sáu bài học trong phần Low

Phần Low của Gondi giá trị hơn phần High của nhiều audit khác:

| Finding | Bài học chuyển được | Note |
|---|---|---|
| **L-01** Event thiếu `bytes32 _rights` | Trường tạo nên **khoá lưu trữ** phải có trong event, nếu không off-chain không dựng lại được state | [[Metadata and Off-chain Trust]] |
| **L-02** Underflow revert trước custom error | **Kiểm điều kiện trước, tính sau** | [[Integer and Precision Bugs]] |
| **L-03** `unchecked` trừ khi biến là `type(uint256).max` | Mọi `unchecked` phải có lập luận | [[Solidity Value Types]] |
| **L-05** `offerId` không được ký khi lender là pool | Mọi trường ảnh hưởng kết quả phải nằm trong phần được ký | [[Signatures and EIP-712]] |
| **L-06** Chữ ký `addNewTranche` dùng được cho `refinanceFull` | **Mỗi hành động một `TYPEHASH`** | [[Signatures and EIP-712]] |
| **L-07** `minLockPeriod` không có trần | Mọi tham số quản trị cần min/max | [[Access Control Patterns]] |
| **L-08** Đổi liquidator khoá tài sản, front-run được | **Permissionless + admin setter = front-running** | [[Front-running and MEV]] |
| **L-10** Two-step không kiểm khớp độ dài | Quy trình hai bước cài sai tệ hơn một bước | [[Access Control Patterns]] |
| **L-12** Bó tài sản đổi được dù tài liệu nói không | **Bất biến trong tài liệu không được thực thi** | [[Invariant Discovery]] |

L-08 và L-12 đều đủ nặng để là Medium ở một audit khác — chúng bị chấm Low một phần vì được nộp trong báo cáo QA gộp.

## 4. Vì sao chỉ có 1 Medium

Bốn giả thuyết, không loại trừ nhau:

1. **Codebase trưởng thành.** Solidity, dùng thư viện chuẩn, đã qua audit trước.
2. **Chỉ 2 warden.** ~2.000 dòng/người. So với Kakarot: 23 warden. Xem [[Contest Severity vs Real Risk]].
3. **Invitational contest** — nhóm nhỏ được mời, không mở công khai.
4. **Embargo** — findings về pool chưa phát hành bị lược khỏi báo cáo công khai.

Đọc "0 High = an toàn" là bỏ qua cả bốn.

## 5. Cái đáng bắt chước từ Gondi

- **Custom error thay vì `require` string** — rẻ hơn và rõ hơn.
- **Two-step cho mọi việc thêm caller đặc quyền** (dù cài đặt có lỗi ở L-10).
- **Lock period** để chống refinance lạm dụng (dù thiếu trần ở L-07).
- **Dùng registry chuẩn của bên thứ ba** (Delegate.cash) thay vì tự viết — đúng hướng, và M-01 cho thấy **tích hợp cũng phải audit**. Xem [[Composability Risk]].

## 5. Phép kiểm chuyển được sang codebase khác

- [ ] Mọi `revoke`/`remove`/`cancel` có truyền **đúng bộ tham số** đã dùng lúc cấp không?
- [ ] Mọi quy trình hai bước có kiểm khớp giữa đề xuất và xác nhận không?
- [ ] Mọi tham số quản trị có trần không?
- [ ] Có hàm permissionless nào dùng địa chỉ mà admin đổi được không? Front-run được không?
- [ ] Mỗi hành động dùng chữ ký có `TYPEHASH` riêng không?
- [ ] Bất biến nào trong tài liệu **không** được thực thi trong code?

## Tham khảo

- [Gondi audit report (Code4rena, 6/2024)](https://code4rena.com/reports/2024-06-gondi) — báo cáo đầy đủ trong `_archive-seed/Gondi.md`
- [Delegate.cash DelegateRegistry](https://github.com/delegatexyz/delegate-registry)
- [Gondi documentation](https://docs.gondi.xyz/)

## Liên kết

[[NFT Finance]] · [[Stale Approval and Delegation]] · [[Case Study Method]] · [[Cross-case Patterns]] · [[Blockchain]]
