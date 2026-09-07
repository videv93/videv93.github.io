---
tags: [audit, lỗ-hổng]
status: evergreen
---
# Stale Approval and Delegation

> Cấp quyền là hành động **hai bước bất đối xứng**: cấp thì dễ, thu hồi thì phải khớp *chính xác* cái đã cấp. Ba finding riêng biệt trong seed — trên ba codebase và ba ngôn ngữ khác nhau — đều là biến thể của việc bước hai không khớp bước một.

## 1. Ba biến thể trong seed

| Finding | Cấp gì | Thu hồi hụt ở đâu |
|---|---|---|
| **Coded Estate H-05** | Approval khi đặt bid | Huỷ bid **không** revoke approval |
| **Gondi M-01** | Delegation kèm `bytes32 rights` | Revoke luôn truyền `rights = ""` ⇒ khoá khác ⇒ không xoá gì |
| **Kakarot QA-04** | Approval native token lúc init | Đổi native token ⇒ không cấp lại được |

## 2. Coded Estate H-05 — approval sống lâu hơn lý do tồn tại của nó

Khi `auto_approve = true`, người đặt bid được cấp approval để tự gọi `transfer_nft` hoàn tất giao dịch. Hợp lý.

Nhưng khi họ **huỷ bid**, contract hoàn tiền và xoá bid — **không thu hồi approval**.

```
1. Bid vào NFT có auto_approve  → được approval
2. Huỷ bid ngay lập tức          → nhận lại tiền, GIỮ approval
3. Gọi transfer_nft              → lấy NFT, thanh toán 0 (vì bid đã bị xoá)
```

Cùng lỗ hổng, lối vào khác: **H-08** dùng `send_nft` (đường transfer không có logic thanh toán) thay vì bước 3.

> [!warning] Approval phải bị ràng buộc vào lý do cấp nó
> Nếu bạn cấp quyền vì một điều kiện, thì **mọi đường làm điều kiện đó biến mất** phải thu hồi quyền. Đếm số đường: ở Coded Estate có ít nhất hai (huỷ bid, gỡ niêm yết) và không đường nào thu hồi.

## 3. Gondi M-01 — thu hồi bằng sai khoá

`DelegateRegistry` của Delegate.cash băm `rights` vào **khoá lưu trữ**. `MultiSourceLoan.delegate()` cho borrower truyền `_rights` tuỳ ý, nhưng `revokeDelegate()` **luôn truyền `""`**:

```solidity
IDelegateRegistry(getDelegateRegistry)
    .delegateERC721(_delegate, _collection, _tokenId, "", false);  // ← sai khoá
```

Ghi vào một khoá khác ⇒ delegation gốc còn nguyên. Kịch bản: borrower cũ delegate NFT với `rights` tuỳ chỉnh → khoản vay kết thúc → NFT sang borrower mới → ai đó gọi `revokeDelegate()` (không có tác dụng) → **borrower cũ vẫn dùng delegation để nhận airdrop/vé của borrower mới**.

Judge lưu ý thêm hai điểm đáng học:
1. Có **đường vòng** tồn tại (gọi `delegate()` với đúng `rights` và `value=false`) — nhưng người dùng sẽ dùng hàm tên là `revokeDelegate`, nên vẫn là Medium.
2. Code **đi ngược đặc tả interface của chính nó** ⇒ củng cố mức severity.

> **Bài học:** "tồn tại cách khác để đạt kết quả đúng" không làm một hàm sai trở thành đúng.

## 4. Cạm bẫy chung

1. **Approval theo cặp `(owner, spender)` không đủ.** ERC-721 có hai tầng: `approve(tokenId)` và `setApprovalForAll(operator)`. Transfer xoá tầng một, **không** xoá tầng hai.
2. **Infinite approval** biến mọi bug tương lai của spender thành bug của bạn.
3. **Approve race** (non-zero → non-zero) — xem [[Token Standards]].
4. **Quyền cấp cho contract có thể upgrade** ⇒ bạn đã cấp cho code chưa tồn tại.
5. **Không có sự kiện đủ trường để theo dõi off-chain.** Gondi L-01: `Delegated`/`RevokeDelegate` không phát `bytes32 _rights`, đúng cái trường tạo nên khoá ⇒ **không dựng lại được danh sách delegation đang tồn tại**. Bug ở mục 3 lẽ ra phát hiện được sớm nếu event đầy đủ.
6. **Thu hồi hàng loạt không có.** Khi phát hiện sự cố, có hàm nào huỷ mọi approval đang treo không?

## 5. Checklist áp dụng

- [ ] Liệt kê mọi chỗ **cấp** quyền (approve, delegate, setOperator, addCaller). Với mỗi cái, tìm chỗ **thu hồi** tương ứng.
- [ ] Thu hồi có truyền **đúng bộ tham số** đã dùng lúc cấp không? (khoá, rights, tokenId, operator)
- [ ] Có **bao nhiêu đường** làm cho điều kiện cấp quyền không còn đúng? Mỗi đường có thu hồi không?
- [ ] Sau khi thu hồi, có test nào chứng minh quyền đã thực sự mất không?
- [ ] Event có đủ trường để off-chain dựng lại tập quyền đang tồn tại không?
- [ ] Có approval nào vô hạn không? Cấp cho contract nào? Contract đó upgradeable không?
- [ ] Có cơ chế thu hồi khẩn cấp hàng loạt không?
- [ ] ERC-721: transfer có xoá cả `approve` lẫn `setApprovalForAll` liên quan không?

## Tham khảo

- [Gondi M-01](https://code4rena.com/reports/2024-06-gondi) — revoke bằng `rights` rỗng
- [Coded Estate H-05](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/6) — huỷ bid giữ approval
- [Delegate.cash — DelegateRegistry](https://github.com/delegatexyz/delegate-registry)
- [EIP-721 — approve vs setApprovalForAll](https://eips.ethereum.org/EIPS/eip-721)
- [Revoke.cash](https://revoke.cash/) — công cụ xem approval đang treo của một địa chỉ

## Liên kết

[[Broken State Lifecycle]] · [[Token Standards]] · [[Access Control Patterns]] · [[Case Gondi]] · [[Blockchain]]
