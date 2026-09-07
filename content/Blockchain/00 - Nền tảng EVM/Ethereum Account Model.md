---
tags: [blockchain, evm, nền-tảng]
status: evergreen
---
# Ethereum Account Model

> Ethereum chỉ có **hai loại tài khoản**, và gần một nửa số lỗi access control trong thực tế đến từ việc code nhầm lẫn giữa chúng, hoặc nhầm giữa *ai gọi trực tiếp* và *ai bắt đầu chuỗi gọi*.

## 1. Hai loại tài khoản

| | **EOA** (Externally Owned Account) | **Contract Account** |
|---|---|---|
| Kiểm soát bởi | Private key secp256k1 | Code của chính nó |
| Có code | Không (`extcodesize == 0`) | Có |
| Khởi tạo transaction | **Chỉ EOA làm được** | Không, chỉ phản ứng |
| Nonce dùng để | Chống replay transaction | Đếm số contract đã deploy |
| Địa chỉ sinh từ | `keccak256(pubkey)[12:]` | `keccak256(rlp(sender, nonce))[12:]` hoặc CREATE2 |

Từ EIP-7702 (Pectra) ranh giới này **mờ đi**: một EOA có thể tạm mang code. Mọi kiểm tra kiểu "đây có phải EOA không" viết trước 2025 đều cần xem lại.

## 2. Bốn biến ngữ cảnh phải phân biệt được

| Biến | Là ai | Bị thao túng được không |
|---|---|---|
| `msg.sender` | Người gọi **trực tiếp** ở frame hiện tại | Không, nhưng đổi theo mỗi frame |
| `tx.origin` | EOA **khởi tạo** cả transaction | Không, nhưng dùng để auth là **lỗ hổng** |
| `address(this)` | Contract đang chạy code | **Có** — dưới `delegatecall` nó là contract *gọi* |
| `msg.value` | ETH kèm theo frame hiện tại | Bị lặp lại nếu dùng trong vòng lặp (`msg.value` không giảm) |

> [!warning] `tx.origin` để xác thực = lỗ hổng phishing kinh điển
> Nếu contract A kiểm tra `require(tx.origin == owner)`, kẻ tấn công chỉ cần dụ owner gọi vào contract độc hại B, rồi B gọi A. `tx.origin` vẫn là owner. Chỉ dùng `msg.sender`.

**Ví dụ thật từ seed:** Kakarot M-02 — logic address aliasing (kế thừa từ Optimism) đáng lẽ **chỉ áp dụng cho contract** lại được áp cho cả EOA, vì thiếu đúng phép kiểm `msg.sender != tx.origin`. Kết quả: access control ở phía L2 luôn fail. Xem [[Cross-domain Message Bugs]].

## 3. Cạm bẫy

1. **`extcodesize == 0` không chứng minh là EOA.** Trong constructor, contract có `extcodesize == 0`. Đây là cách bypass mọi "onlyEOA" kinh điển.
2. **`address(this)` dưới `delegatecall`.** Contract bị delegatecall không được phép giả định gì về địa chỉ hay storage của chính nó. Kakarot H-01 chính là lỗi này ở tầng precompile — whitelist theo *code address* chứ không phải *execution address*. Xem [[Delegatecall and Context Confusion]].
3. **Nonce của contract ≠ nonce chống replay.** Muốn chống replay chữ ký thì phải tự quản nonce; xem [[Signatures and EIP-712]].
4. **Địa chỉ trùng nhau giữa L1 và L2.** Vì CREATE phụ thuộc `(sender, nonce)`, cùng một địa chỉ có thể tồn tại trên hai chain với bytecode khác nhau. Đó là **lý do tồn tại của address aliasing**.
5. **Gửi ETH tới contract không có `receive`/`fallback` payable sẽ revert** — dùng làm vector DoS. Xem [[Denial of Service Patterns]].
6. **`selfdestruct` gửi ETH cưỡng bức**, bỏ qua mọi `receive`. Mọi contract dùng `address(this).balance` làm kế toán đều sai.

## 4. Checklist áp dụng

- [ ] Có chỗ nào dùng `tx.origin` cho mục đích không phải logging không?
- [ ] Có "onlyEOA" nào dựa vào `extcodesize` / `msg.sender == tx.origin` không? Nó bảo vệ cái gì, và bypass được thì mất gì?
- [ ] Contract này có được thiết kế để bị `delegatecall` không? Nếu có, nó có giả định gì về `address(this)` hay storage layout không?
- [ ] Có dùng `address(this).balance` làm nguồn sự thật kế toán không?
- [ ] Có `msg.value` dùng bên trong vòng lặp (batch payment) không?
- [ ] Contract có nhận được ETH cưỡng bức mà vẫn hoạt động đúng không?

## Tham khảo

- [Solidity docs — Units and Globally Available Variables](https://docs.soliditylang.org/en/latest/units-and-global-variables.html)
- [EIP-7702: Set EOA account code](https://eips.ethereum.org/EIPS/eip-7702)
- [Optimism docs — Address aliasing](https://docs.optimism.io/stack/differences#address-aliasing) — nguồn của mẫu bị dùng sai trong Kakarot M-02
- [Kakarot M-02, Code4rena](https://github.com/code-423n4/2024-09-kakarot-findings/issues/111)
- [SWC-115: Authorization through tx.origin](https://swcregistry.io/docs/SWC-115)

## Liên kết

[[Delegatecall and Context Confusion]] · [[Access Control Patterns]] · [[Cross-domain Message Bugs]] · [[EVM Execution Model]] · [[Blockchain]]
