---
tags: [solidity, ngôn-ngữ]
status: evergreen
---
# Units and Global Variables

> [!note] Ghi chú nguồn
> Trả header rỗng `Units and Globally Available Variables.md` trong seed — file **0 dòng nội dung**, chỉ có một link chết tới `Ether Units`.

> Biến toàn cục là chỗ contract chạm vào thế giới bên ngoài. Câu hỏi duy nhất cần hỏi cho mỗi biến: **ai điều khiển được giá trị này, và sai lệch bao nhiêu thì có lợi cho họ?**

## 1. Đơn vị

| Đơn vị | Giá trị | Ghi chú |
|---|---|---|
| `wei` | 1 | Đơn vị gốc |
| `gwei` | `1e9` | Đơn vị gas price |
| `ether` | `1e18` | **Chỉ là hằng số** — không liên quan tới decimals của ERC-20 |
| `seconds` / `minutes` / `hours` / `days` / `weeks` | 1 / 60 / 3600 / 86400 / 604800 | `years` **đã bị bỏ** từ 0.5.0 |

> [!warning] `1 ether` ≠ "một đơn vị token"
> USDC có 6 decimals, WBTC có 8, một số token có 0. Mọi hằng số `1e18` cứng trong code xử lý token tuỳ ý là một finding. Xem [[Weird ERC20 Tokens]].

## 2. Biến toàn cục và mức tin cậy

| Biến | Ai điều khiển | Tin được không |
|---|---|---|
| `msg.sender` | Người gọi trực tiếp | ✅ dùng cho auth |
| `msg.value` | Người gửi | ✅ nhưng **không giảm trong vòng lặp** |
| `msg.data` | Người gọi | ❌ đầu vào không tin cậy |
| `tx.origin` | EOA khởi tạo | ❌ **không dùng cho auth** |
| `tx.gasprice` | Người gửi | ❌ điều khiển được hoàn toàn |
| `block.timestamp` | Proposer, lệch được vài giây | ⚠️ ok cho deadline dài, ❌ cho randomness |
| `block.number` | Giao thức | ⚠️ **thời gian mỗi block khác nhau giữa các chain** |
| `block.prevrandao` | Beacon chain | ⚠️ biết trước được 1 epoch — không phải randomness an toàn |
| `block.coinbase` | Proposer | ❌ |
| `blockhash(n)` | Giao thức | ⚠️ chỉ 256 block gần nhất, ngoài dải trả `0` |
| `block.chainid` | Giao thức | ✅ dùng cho domain separator |
| `gasleft()` | Ngữ cảnh | ⚠️ đưa gas vào logic nghiệp vụ |
| `address(this).balance` | **Bất kỳ ai** (`selfdestruct`) | ❌ không dùng làm kế toán |

## 3. Hàm toàn cục hay bị dùng sai

- `keccak256(abi.encodePacked(a, b))` — **collision** nếu `a`,`b` đều là kiểu động. Dùng `abi.encode`.
- `ecrecover(hash, v, r, s)` — trả `address(0)` khi chữ ký hỏng. **Phải kiểm `!= address(0)`**, nếu không `address(0)` trở thành "người ký hợp lệ". Xem [[Signature Malleability]].
- `abi.decode` — revert nếu dữ liệu không khớp, nhưng **không** kiểm được ngữ nghĩa.
- `address.call{value: v}("")` — trả `(bool, bytes)`; bỏ qua giá trị trả về là finding.
- `selfdestruct` — từ EIP-6780 (Cancun) chỉ còn xoá trong cùng tx tạo ra contract; **code cũ dựa vào nó đã đổi hành vi**.

## 4. Cạm bẫy về thời gian

1. **`block.number` không đo được thời gian.** Ethereum ~12s/block; Arbitrum, Optimism, Polygon khác hẳn. Contract deploy đa chain phải dùng `block.timestamp`.
2. **`blockhash` ngoài 256 block trả `0`** — mọi randomness dựa vào nó tự động thành `0` sau 256 block. Kakarot có finding đúng dạng này (`blockhash` gây crash ở biên, và bản vá lại **off-by-one**: `current_block - 9` mới là giá trị đầu tiên ngoài dải, nhưng code chặn từ `-10`).
3. **Không có "hết hạn" tự động.** Mọi thứ cần hết hạn phải kiểm `block.timestamp` **mỗi lần đọc**, không phải một lần lúc ghi. Coded Estate H-07 là ví dụ: `check_can_edit_short` chỉ kiểm "đã qua thời điểm check-out chưa" mà **không kiểm đã thanh toán xong chưa** ⇒ landlord đổi được `denom` giữa lúc thuê xong và lúc quyết toán ⇒ rút tiền bằng token đắt hơn.

## 5. Checklist áp dụng

- [ ] Có dùng `block.timestamp`, `blockhash`, `prevrandao` làm nguồn ngẫu nhiên không?
- [ ] Có dùng `block.number` để đo khoảng thời gian trên chain không phải Ethereum L1 không?
- [ ] Có `1e18` cứng nào áp lên token do người dùng chọn không?
- [ ] Mọi `ecrecover` có kiểm kết quả `!= address(0)` không?
- [ ] Có `abi.encodePacked` với nhiều tham số động đưa vào hash không?
- [ ] Có dùng `address(this).balance` hoặc `token.balanceOf(this)` làm nguồn sự thật kế toán không?
- [ ] Điều kiện "được phép sửa" có kiểm **toàn bộ** vòng đời chưa, hay chỉ kiểm mốc thời gian?

## Tham khảo

- [Solidity docs — Units and Globally Available Variables](https://docs.soliditylang.org/en/latest/units-and-global-variables.html)
- [EIP-4399: `prevrandao`](https://eips.ethereum.org/EIPS/eip-4399) — và cảnh báo về tính dự đoán được
- [EIP-6780: SELFDESTRUCT only in same transaction](https://eips.ethereum.org/EIPS/eip-6780)
- [SWC-116: Block values as a proxy for time](https://swcregistry.io/docs/SWC-116)
- [Coded Estate H-07](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/4) — điều kiện "được sửa" thiếu vế thanh toán

## Liên kết

[[Ethereum Account Model]] · [[Signature Malleability]] · [[Weird ERC20 Tokens]] · [[Broken State Lifecycle]] · [[Blockchain]]
