---
tags: [audit, lỗ-hổng, chữ-ký]
status: evergreen
---
# Signature Malleability

> Với mỗi chữ ký ECDSA hợp lệ tồn tại **ít nhất một chữ ký khác cũng hợp lệ cho cùng message**. Nếu contract của bạn coi "bytes chữ ký" là danh tính duy nhất của một hành động, thì tính chất toán học đó là một lỗ hổng.

## 1. Vì sao có hai chữ ký

Đường cong secp256k1 đối xứng qua trục hoành: nếu `(r, s)` xác thực được, thì `(r, n − s)` cũng vậy, chỉ khác `v` (đảo giữa 27 và 28).

```
(r, s,      v)
(r, n − s,  v ⊕ 1)     ← cùng signer, cùng message, bytes khác
```

**EIP-2** (Homestead) yêu cầu chữ ký **transaction** phải có `s ≤ n/2` — chọn lấy nửa dưới, loại bỏ tính đa trị. Nhưng precompile `ecrecover` **không** áp ràng buộc đó: nó chấp nhận cả `s` ở nửa trên. Đó chính là lý do mọi contract tự verify chữ ký phải tự kiểm.

## 2. Ba chữ ký thay vì hai — Kakarot H-06

Cài đặt `ec_recover` của Kakarot không giới hạn `s < secp256k1n` gì cả:

| | Ethereum | Kakarot |
|---|---|---|
| `s = 2` | ✅ địa chỉ X | ✅ địa chỉ X |
| `s = n − 2` (đảo `v`) | ✅ địa chỉ X | ✅ địa chỉ X |
| `s = n + 2` | **`address(0)`** | ✅ **địa chỉ X** |

⇒ Trên Kakarot, malleability có **hai** đường thay vì một. Mọi contract đã audit trên Ethereum và giả định "chỉ có hai biến thể" đều sai khi deploy sang đây.

Mitigation review còn cho thấy phần đuôi thú vị: bản vá đầu (PR-1565) **chỉ vá một nửa** — `verify_eth_signature_uint256` vẫn lỏng. Và một finding QA riêng chỉ ra `y_parity` được parse thành boolean nên `v = 2, 3` cũng qua. Phải tới PR-1633 và PR-1635 mới đóng hết. Xem [[Mitigation Review]].

> [!warning] Bài học lớn hơn malleability
> Ràng buộc `0 < s ≤ n/2` **chỉ áp cho chữ ký transaction**, không áp cho `ecrecover`. Zenith phải nói rõ điều này trong mitigation review vì chính warden cũng nhầm. Khi audit chữ ký, phải biết đang nói về **tầng nào**.

## 3. Bốn hệ quả thực tế

| Nếu contract làm gì | Malleability gây ra gì |
|---|---|
| Dùng `keccak256(signature)` làm khoá "đã dùng" | **Replay** — biến đổi chữ ký để dùng lại |
| Dùng chữ ký làm ID đơn hàng/giao dịch | Trùng ID, kế toán lệch |
| Không kiểm `ecrecover != address(0)` | Chữ ký rác "được ký bởi" `address(0)` |
| Ghép chữ ký vào một hash lớn hơn | Hash đổi mà ý nghĩa không đổi |

Cách sửa gốc: **đánh dấu đã dùng theo `digest` hoặc `nonce`, không theo bytes chữ ký.** Khi đó malleability trở thành vô hại.

## 4. Cạm bẫy

1. **`ecrecover` trần** thay vì `ECDSA.recover` của OpenZeppelin (đã chặn `s > n/2` và `address(0)`).
2. **Kiểm `s` nhưng quên `v`.** `v` ngoài `{27, 28}` phải revert, không phải im lặng chấp nhận (Kakarot QA-05).
3. **Kiểm `r` bỏ qua.** `r = 0` hoặc `r ≥ n` phải bị từ chối; ở Kakarot việc này gây revert ở tầng RPC (issue #9).
4. **Chữ ký 64-byte (EIP-2098 compact) và 65-byte** trộn lẫn — độ dài khác nhau nghĩa là parse khác nhau.
5. **Contract wallet (EIP-1271)** không dùng ECDSA, nên mọi kiểm tra `s`/`v` không áp dụng — nhưng câu trả lời của nó **đổi được sau khi bạn hỏi**.
6. **Malleability ở tầng transaction**: trước EIP-155 và trên các chain lạ, tx hash có thể đổi mà tx vẫn hợp lệ — hệ thống off-chain theo dõi theo tx hash sẽ mất dấu.

## 5. Checklist áp dụng

- [ ] Dùng `ecrecover` trần hay `ECDSA.recover`?
- [ ] Có kiểm `s ≤ n/2` không?
- [ ] Có kiểm `v ∈ {27, 28}` (hoặc `y_parity ∈ {0,1}`) và từ chối phần còn lại không?
- [ ] Có kiểm kết quả `!= address(0)` không?
- [ ] "Đã dùng" được đánh dấu theo **digest/nonce** hay theo bytes chữ ký?
- [ ] Contract có deploy lên chain không phải Ethereum L1 không? Cài đặt `ecrecover` ở đó có được kiểm chưa?
- [ ] Có hỗ trợ cả chữ ký 64 và 65 byte không? Parse có phân biệt đúng không?
- [ ] Có test với `s` nửa trên, `v` ngoài dải, `r = 0` không?

## Tham khảo

- [Kakarot H-06](https://github.com/code-423n4/2024-09-kakarot-findings/issues/13) — ba chữ ký cho một message
- [EIP-2: Homestead — ràng buộc `s ≤ n/2`](https://eips.ethereum.org/EIPS/eip-2)
- [EIP-2098: Compact signature representation](https://eips.ethereum.org/EIPS/eip-2098)
- [OpenZeppelin ECDSA](https://docs.openzeppelin.com/contracts/api/utils#ECDSA)
- [SWC-117: Signature Malleability](https://swcregistry.io/docs/SWC-117)

## Liên kết

[[Signatures and EIP-712]] · [[Transaction Lifecycle]] · [[Mitigation Review]] · [[Case Kakarot]] · [[Blockchain]]
