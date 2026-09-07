---
tags: [solidity, ngôn-ngữ]
status: evergreen
---
# Solidity Value Types

> [!note] Ghi chú nguồn
> Trong seed gốc, `Values Type.md` là **15 dòng, mỗi dòng một tên kiểu**, không giải thích gì — một header rỗng dạng danh sách. Cùng với `signed-integer-type.md` / `unsigned-integer-type.md` (liệt kê `int8`…`int256`) và `type-name.md`. Note này trả cả cụm đó.

> Kiểu giá trị được **copy khi gán**. Toàn bộ danh sách chỉ có 15 mục, nhưng ba trong số chúng — integer, address, bytesN — chịu trách nhiệm cho gần như mọi bug số học trong lịch sử Solidity.

## 1. Danh sách đầy đủ (15 mục trong seed)

| Kiểu | Ghi chú cho auditor |
|---|---|
| `bool` | `true`/`false`. Toán tử `&&`/`\|\|` **short-circuit** — vế phải có thể không chạy |
| `int` / `uint` (`int8`…`int256`, bước 8) | `uint` = `uint256`. **Ép hẹp là chỗ mất tiền**, xem mục 2 |
| Fixed point (`fixed`/`ufixed`) | **Chưa dùng được** — khai báo được, không thao tác được. Mọi số thập phân trong DeFi phải tự làm bằng số nguyên |
| `address` / `address payable` | 20 byte. Chỉ `payable` mới `.transfer()`/`.send()` được |
| Contract type | Ép được về `address`; **không đảm bảo đích có code** |
| `bytes1`…`bytes32` (fixed) | Ép `bytesN` → `bytesM` (M<N) **cắt từ bên phải**; ép `uintN` cắt từ bên trái |
| `bytes` / `string` động | **Là reference type**, không phải value type — xem [[Solidity Reference Types]] |
| Address literal | Có checksum; sai checksum thì không compile |
| Rational & integer literal | Tính toán ở **độ chính xác tuỳ ý** trước khi ép kiểu |
| String literal | Không có ký tự kết thúc; `"abc"` ép được sang `bytes3` |
| Unicode literal | `unicode"…"` |
| Hexadecimal literal | `hex"0011ff"` |
| `enum` | Kiểu con của `uint8`, **tối đa 256 giá trị**; từ 0.8.0 ép giá trị ngoài dải sẽ revert |
| User-defined value type | `type Price is uint256;` — an toàn kiểu **không tốn gas** |
| Function type | `internal` / `external`; lưu được vào biến, **là bề mặt tấn công nếu do user cung cấp** |

## 2. Số học: ba cạm bẫy sinh ra tiền

### a. Ép kiểu hẹp (downcast) — im lặng làm mất bit
```solidity
uint256 big = 2**128;
uint128 small = uint128(big);   // = 0, KHÔNG revert (kể cả 0.8.x)
```
Solidity 0.8 chỉ chặn **overflow trong phép toán**, không chặn **truncation khi ép kiểu**. Dùng `SafeCast` của OpenZeppelin.

### b. Kiểu quá hẹp cho miền giá trị thật
Đây là hai finding riêng biệt trong seed, cả hai đều được chấm Medium:

- **Coded Estate M-03**: `price_per_day` dùng `u64`. Với token 18 decimals, trần là ~18 token ⇒ không đặt được giá thuê thực tế. Sponsor đáp *"chúng tôi dùng token 6 decimals"* — judge vẫn giữ Medium vì stablecoin 18 decimals rất phổ biến.
- **Coded Estate M-04**: `withdrawtolandlord(amount: u64)`. Rút 5.000 token 18-decimals ⇒ phải gọi **1.632 lần**. Judge ban đầu hạ xuống Low, warden tính ra con số phí gas ≈ 5% số tiền, judge nâng lại Medium.

> [!warning] Bài học chung của hai finding
> **Chọn kiểu số là một quyết định về miền giá trị, không phải về gas.** Và khi tranh luận severity, con số cụ thể ("1.632 lần gọi") thắng tính từ ("cồng kềnh"). Xem [[Integer and Precision Bugs]] và [[Severity Classification]].

### c. Không có số thực
`fixed`/`ufixed` không dùng được. Mọi tỉ lệ phải làm bằng số nguyên với hệ số (`1e18`, `10_000` bps). Từ đó sinh ra toàn bộ lớp lỗi làm tròn: chia trước nhân, làm tròn về phía nào, ai được lợi khi lẻ.

## 3. Cạm bẫy khác

1. **`unchecked` block** tắt kiểm tra overflow. Mỗi `unchecked` phải kèm lập luận vì sao không tràn được. Gondi L-03 chỉ ra một `unchecked { _remainingNewLender -= oldLenderDebt; }` chạy cả khi biến đang là `type(uint256).max` — vô nghĩa và che mất ý định.
2. **Underflow xảy ra trước custom error.** Gondi L-02: `_checkStrictlyBetter` revert vì underflow ở biểu thức, nên `NotStrictlyImprovedError()` **không bao giờ được ném**. Người dùng nhận panic code khó hiểu thay vì lý do thật. Kiểm điều kiện trước, tính sau.
3. **`address(0)`** vừa là "chưa set", vừa là địa chỉ hợp lệ để đốt token. Gondi Low ghi nhận việc dùng `address(0)` để chỉ ETH là gây nhầm lẫn — nên dùng hằng số rõ ràng (`0xEeee…EEeE`).
4. **`enum` từ hàm ngoài**: giá trị ngoài dải revert với panic `0x21`, không phải custom error.
5. **So sánh `string`** phải qua `keccak256(bytes(a)) == keccak256(bytes(b))`.

## 4. Checklist áp dụng

- [ ] Mọi `uintN` với N < 256: miền giá trị thật tối đa là bao nhiêu? Có nhân với `1e18` ở đâu không?
- [ ] Mọi ép kiểu hẹp (`uint128(x)`, `uint64(x)`, `int256(x)`) có dùng `SafeCast` không?
- [ ] Mọi `unchecked` có comment giải thích vì sao an toàn không?
- [ ] Có phép trừ nào có thể underflow **trước** khi tới `require`/custom error không?
- [ ] Có phép chia nào đứng trước phép nhân không?
- [ ] Có dùng `address(0)` mang hai nghĩa khác nhau trong cùng contract không?

## Tham khảo

- [Solidity docs — Types](https://docs.soliditylang.org/en/latest/types.html)
- [Solidity docs — Panic codes](https://docs.soliditylang.org/en/latest/control-structures.html#panic-via-assert-and-error-via-require)
- [OpenZeppelin SafeCast](https://docs.openzeppelin.com/contracts/api/utils#SafeCast)
- [Coded Estate M-03](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/29) và [M-04](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/27)
- [Gondi L-02, L-03 (Code4rena)](https://code4rena.com/reports/2024-06-gondi)

## Liên kết

[[Solidity Reference Types]] · [[Integer and Precision Bugs]] · [[Solidity Version Pitfalls]] · [[Blockchain]]
