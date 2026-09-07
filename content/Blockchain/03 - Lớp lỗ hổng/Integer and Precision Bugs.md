---
tags: [audit, lỗ-hổng, số-học]
status: evergreen
---
# Integer and Precision Bugs

> Solidity 0.8 đã đóng cửa overflow. Nó **không** đóng ba cửa còn lại: ép kiểu hẹp, kiểu quá hẹp cho miền giá trị, và làm tròn. Ba cửa đó chiếm toàn bộ số finding số học trong seed.

## 1. Bốn dạng

| Dạng | Solidity 0.8 có chặn không | Ví dụ trong seed |
|---|---|---|
| Overflow/underflow trong phép toán | ✅ | Kakarot H-02 (Cairo, không có checked arithmetic) |
| **Truncation khi ép kiểu** | ❌ | — |
| **Kiểu quá hẹp cho miền thật** | ❌ | Coded Estate M-03, M-04 |
| **Làm tròn / mất độ chính xác** | ❌ | — (nhưng là nguồn mất tiền lớn nhất trong DeFi thật) |

## 2. Kiểu quá hẹp — hai finding, một bài học

**Coded Estate M-03:** `price_per_day`, `price_per_month` khai kiểu `u64`. Trần `u64` ≈ `1,8446744e19`. Với token 18 decimals, đó là **~18 token**. Không đặt được giá thuê thực tế.

Sponsor: *"Chúng tôi dùng token 6 decimals trên nền tảng."*
Judge giữ Medium: *"Stablecoin 18 decimals rất phổ biến, và có thể trông đợi một số tài sản bridge sang sẽ có 18 decimals. Trong kịch bản đó, giá tối đa \$18/tháng là quá thấp — nghĩa là những token đó không dùng được."*

**Coded Estate M-04:** cùng lỗi ở tham số `amount` của `withdrawtolandlord`. Đường đi của severity rất đáng học:

1. Warden nộp ở Medium, mô tả tác động là "không rút được tiền".
2. Judge hạ xuống **Low**: *"chia nhỏ ra nhiều lần gọi là rút được."*
3. Warden phản biện bằng **số cụ thể**: rút `5.000e18` cần `5000e18 / (2^64−1) ≈ 272` lần gọi; với `50.000e18` của token \$0,1 thì là **2.711 lần**.
4. Judge nâng lại **Medium**: *"\$5.000 là con số hợp lý cho một protocol như vậy — căn hộ ở Zurich thuê \$5.000/tháng, hợp đồng dài có thể \$30.000. Vậy chủ nhà phải gọi ~1.632 lần. Nếu mỗi lần ~\$1 thì đó là gần 5% phí trên tổng số tiền."*

> [!warning] Bài học về tranh luận severity
> Warden thắng không phải bằng lập luận hay hơn mà bằng **một con số**. "Cồng kềnh" là tính từ; "1.632 lần gọi, ≈5% phí" là bằng chứng. Xem [[Severity Classification]] và [[Writing a Finding]].

## 3. Overflow khi không có checked arithmetic

Hai finding của Kakarot cho thấy đời sống ngoài Solidity 0.8:

- **H-02:** vòng lặp trong `felt_to_bytes_little` underflow khi hint trả về byte lớn hơn giá trị còn lại ⇒ `value` bọc quanh thành `STARKNET_PRIME − 1` ⇒ vòng lặp chạy tiếp ⇒ **prover giả mạo được output**, và hàm này được `get_create_address()` dùng. Mitigation: **range check**.
- **M-04:** `chain_id` lấy từ `items[6].data` qua `bytes_to_felt` mà **không giới hạn `data_len ≤ 31`** ⇒ tràn felt ⇒ chữ ký với `chain_id` vô lý vẫn qua được kiểm tra. Xem [[Transaction Lifecycle]].

Mẫu chung: **mọi hàm chuyển đổi độ dài thay đổi phải kiểm biên độ dài**.

## 4. Làm tròn — lớp lỗi ít gây chú ý nhất, mất tiền nhiều nhất

Solidity không có số thực. Mọi tỉ lệ là `a * b / c`, và mỗi phép chia mất phần dư.

```solidity
// ❌ chia trước — mất toàn bộ phần lẻ
uint256 fee = amount / 10000 * feeBps;
// ✅ nhân trước
uint256 fee = amount * feeBps / 10000;
```

Ba câu hỏi cho mọi phép chia:
1. **Làm tròn về phía ai?** Phí thu về protocol phải làm tròn **lên**; số trả cho người dùng làm tròn **xuống**. Ngược lại là rò rỉ.
2. **Có phép chia nào đứng trước phép nhân không?**
3. **Với đầu vào nhỏ nhất (1 wei), kết quả có thành 0 không?** Nếu có, ai lợi dụng được việc lặp lại nó nhiều lần?

Câu 3 là gốc của **inflation attack** trên vault ERC-4626 — xem [[Yield Vaults]].

## 5. Cạm bẫy

1. **`unchecked` không có lập luận đi kèm.** Gondi L-03: `unchecked { _remainingNewLender -= oldLenderDebt; }` chạy cả khi biến đang là `type(uint256).max` — vô nghĩa, và che mất ý định thật.
2. **Underflow ném panic trước custom error.** Gondi L-02 — kiểm trước, tính sau.
3. **`0^0` trả 0 thay vì 1.** Kakarot M-05. Hàm không được dùng cho `0^0` ở thời điểm audit, nhưng judge vẫn chấm Medium theo quy tắc *speculation on future code*: hàm toán học nền tảng sai thì code tương lai kế thừa cái sai đó.
4. **Trộn hai độ chính xác** (`1e18` của WETH với `1e6` của USDC) mà không chuẩn hoá.
5. **Ép `int` ↔ `uint`** đảo dấu im lặng.
6. **`type(uint256).max` dùng làm sentinel** rồi vẫn đem đi tính toán.
7. **Giá trị trung gian tràn** dù kết quả cuối vừa: `a * b / c` có thể tràn ở `a * b`. Dùng `Math.mulDiv` (full-precision) của OpenZeppelin.

## 6. Checklist áp dụng

- [ ] Mọi `uintN`/`intN` với N < 256: miền giá trị thật tối đa là bao nhiêu, tính bằng đơn vị nhỏ nhất của token 18 decimals?
- [ ] Mọi ép kiểu hẹp có qua `SafeCast` không?
- [ ] Mọi `unchecked` có comment chứng minh không tràn không?
- [ ] Có phép chia nào trước phép nhân không?
- [ ] Mỗi phép chia làm tròn về phía ai? Có lợi cho protocol hay cho người dùng?
- [ ] Với đầu vào 1 wei, có kết quả nào thành 0 không? Lặp lại có lợi cho ai không?
- [ ] Có phép nhân trung gian nào tràn dù kết quả cuối vừa không? Có dùng `mulDiv` không?
- [ ] Có hàm chuyển đổi độ dài thay đổi nào không kiểm biên không?
- [ ] Có hàm toán học nền tảng nào sai ở ca biên (`0^0`, `x/0`, giá trị max) không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| OpenZeppelin `Math.mulDiv` | Nhân-chia độ chính xác đầy đủ | https://docs.openzeppelin.com/contracts/api/utils#Math |
| `SafeCast` | Ép kiểu hẹp có revert | https://docs.openzeppelin.com/contracts/api/utils#SafeCast |
| Echidna / `forge fuzz` | Tìm ca biên số học tự động | https://book.getfoundry.sh/ |
| Halmos | Chứng minh không tràn bằng ký hiệu | https://github.com/a16z/halmos |

## Tham khảo

- [Coded Estate M-03](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/29) · [M-04](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/27)
- [Kakarot H-02](https://github.com/code-423n4/2024-09-kakarot-findings/issues/118) · [M-04](https://github.com/code-423n4/2024-09-kakarot-findings/issues/69) · [M-05](https://github.com/code-423n4/2024-09-kakarot-findings/issues/65)
- [Solidity docs — Checked/Unchecked arithmetic](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic)
- [C4 — Speculation on future code](https://docs.code4rena.com/awarding/judging-criteria/severity-categorization#speculation-on-future-code)

## Liên kết

[[Solidity Value Types]] · [[Yield Vaults]] · [[Severity Classification]] · [[Solidity Version Pitfalls]] · [[Blockchain]]
