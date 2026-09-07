---
tags: [solidity, mẫu, chữ-ký]
status: evergreen
---
# Signatures and EIP-712

> Chữ ký cho phép người dùng **uỷ quyền off-chain, thực thi on-chain** — tiết kiệm gas và cải thiện UX. Cái giá: bạn tự viết lại một phần của cơ chế chống replay mà giao thức vốn làm hộ bạn bằng nonce transaction. **Năm ràng buộc phải có, thiếu một là mất tiền.**

## 1. Năm ràng buộc của một chữ ký an toàn

| Ràng buộc | Thiếu thì sao |
|---|---|
| **Nonce** (hoặc đánh dấu đã dùng) | Replay vô hạn cùng một chữ ký |
| **Deadline** | Chữ ký sống mãi; ý định cũ thực thi ở tương lai xa |
| **`chainId`** | Replay sang chain khác (mọi fork, mọi L2) |
| **`address(this)`** trong domain | Replay sang contract khác cùng codebase |
| **`s ≤ n/2` và kiểm `!= address(0)`** | Malleability + `ecrecover` hỏng trả `address(0)` |

EIP-712 gói bốn cái đầu vào `domainSeparator` + `structHash`:

```solidity
bytes32 digest = keccak256(abi.encodePacked(
    "\x19\x01",
    DOMAIN_SEPARATOR,        // name, version, chainId, verifyingContract
    keccak256(abi.encode(TYPEHASH, owner, spender, value, nonce, deadline))
));
address signer = ECDSA.recover(digest, v, r, s);
require(signer == owner && signer != address(0), "bad sig");
```

## 2. Vì sao EIP-712 chứ không phải hash trần

`eth_sign` trên một hash trần bắt người dùng ký **một chuỗi hex vô nghĩa** — họ không biết đang uỷ quyền cái gì. EIP-712 làm ví hiển thị được từng trường. Đây là biện pháp chống phishing, và với NFT/DeFi thì nó là biện pháp *quan trọng nhất*: phần lớn tiền mất của người dùng cá nhân đến từ ký nhầm, không từ bug contract.

## 3. Malleability, ngắn gọn

Với mỗi chữ ký hợp lệ `(r, s, v)`, tồn tại `(r, n − s, v ⊕ 1)` cũng hợp lệ cho cùng message. Nếu bạn dùng **hash của chữ ký** làm khoá "đã dùng", attacker biến đổi được chữ ký để lách. Xử lý: chỉ chấp nhận `s ≤ n/2` (dùng `ECDSA.recover` của OpenZeppelin, nó đã kiểm), và tốt hơn nữa là **đánh dấu theo nonce/digest, không theo chữ ký**.

Kakarot H-06 là bản nặng hơn: cài đặt `ecrecover` của họ không chặn `s > secp256k1n`, cho **ba** chữ ký hợp lệ thay vì hai. Chi tiết ở [[Signature Malleability]].

## 4. Cạm bẫy

1. **Cache `DOMAIN_SEPARATOR` là `immutable`** ⇒ sai sau khi chain fork (chainId đổi). OpenZeppelin `EIP712` tính lại khi `chainId` khác.
2. **Không kiểm `ecrecover != address(0)`** ⇒ chữ ký rác "được ký bởi" `address(0)`. Nếu `address(0)` có quyền gì thì mất luôn.
3. **Contract wallet không ký được ECDSA.** Cần **EIP-1271** (`isValidSignature`) — nếu bỏ qua, mọi ví multisig/smart account không dùng được protocol.
4. **Chữ ký dùng lại được cho hai hành động khác nhau.** Gondi L-06 chính xác là lỗi này: một `renegotiationOffer` mà lender ký cho `addNewTranche()` lại **dùng được cho `refinanceFull()`** khi khoản vay chỉ có một tranche, vì hai hàm kiểm điều kiện gần giống nhau. Lender bị đẩy vào một vị thế rủi ro hơn cái họ đồng ý.
   > **Bài học:** mỗi hành động phải có `TYPEHASH` riêng. Chữ ký phải nói rõ nó cho phép *hàm nào*, không chỉ *tham số nào*.
5. **Trường trong struct không được ký.** Gondi L-05: `offerId` không nằm trong phần verify khi lender là pool contract ⇒ borrower điền `offerId` tuỳ ý ⇒ kế toán off-chain lệch.
6. **`v` lỏng lẻo.** Kakarot QA-05: `y_parity` được parse thành boolean nên `2` và `3` cũng qua. Không mất tiền, nhưng lệch spec — và lệch spec là chỗ bug tương lai mọc lên.
7. **Signature bởi contract đã bị `selfdestruct`/upgrade** — EIP-1271 hỏi lại contract mỗi lần, nên câu trả lời đổi được sau khi bạn kiểm.

## 5. Checklist áp dụng

- [ ] Chữ ký có nonce không? Nonce tăng ở đâu, và có tăng cả khi hành động thất bại không?
- [ ] Có deadline không?
- [ ] Domain separator có `chainId` và `verifyingContract` không? Có tính lại khi `chainId` đổi không?
- [ ] Mỗi hành động khác nhau có `TYPEHASH` riêng không? Có chữ ký nào dùng được cho **hai** hàm không?
- [ ] Mọi trường ảnh hưởng tới kết quả có nằm trong phần được ký không?
- [ ] Có kiểm `signer != address(0)` không?
- [ ] Có chặn `s > n/2` không?
- [ ] Có hỗ trợ EIP-1271 cho contract wallet không?
- [ ] "Đã dùng" được đánh dấu theo nonce/digest hay theo bytes chữ ký?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| OpenZeppelin `ECDSA` + `EIP712` | Cài đặt tham chiếu, đã chặn malleability | https://docs.openzeppelin.com/contracts/api/utils#ECDSA |
| `cast wallet sign` | Ký thử từ CLI | https://book.getfoundry.sh/ |
| Foundry `vm.sign` | Dựng PoC chữ ký trong test | https://book.getfoundry.sh/ |

## Tham khảo

- [EIP-712: Typed structured data hashing and signing](https://eips.ethereum.org/EIPS/eip-712)
- [EIP-1271: Standard signature validation for contracts](https://eips.ethereum.org/EIPS/eip-1271)
- [EIP-2612: Permit](https://eips.ethereum.org/EIPS/eip-2612)
- [Gondi L-05, L-06 (Code4rena)](https://code4rena.com/reports/2024-06-gondi) — chữ ký dùng chéo hàm
- [Kakarot H-06](https://github.com/code-423n4/2024-09-kakarot-findings/issues/13) — ba chữ ký cho một message

## Liên kết

[[Signature Malleability]] · [[Transaction Lifecycle]] · [[Token Standards]] · [[Blockchain]]
