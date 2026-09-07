---
tags: [dsal, math, bit]
status: evergreen
---
# Bit Manipulation

> Bit trick mở ra lời giải `O(1)` cho nhiều bài tưởng `O(n)`, và `int` 32-bit chứa được 32 boolean. Đây là ngôn ngữ thứ hai của lập trình viên — và là nền cho [[Bitmask DP]] và [[Binary Trie XOR]].

## 1. Khi nào dùng

- Ràng buộc set/subset nhỏ (`≤ 20` phần tử) → [[Bitmask DP]].
- Cần toggle / count / lookup bit nhanh.
- Bài XOR đặc thù: "single number", "cặp có XOR lớn nhất".
- Tối ưu bộ nhớ.

## 2. Cheat-sheet

```python
x |= (1 << i)          # set bit i
x &= ~(1 << i)         # clear bit i
x ^= (1 << i)          # toggle bit i
(x >> i) & 1           # test bit i
x & -x                 # lowest set bit    (x=12=0b1100 → 4=0b100)
x &= x - 1             # xoá lowest set bit (Brian Kernighan)
bin(x).count('1')      # đếm bit 1  (hoặc x.bit_count() từ Py3.10)
x > 0 and (x & (x-1)) == 0    # kiểm power of 2
x ^ 0xFFFFFFFF         # đảo bit trong 32-bit

# Duyệt mọi submask của mask
sub = mask
while sub:
    ...                # dùng sub
    sub = (sub - 1) & mask
```

## 3. Tính chất XOR phải thuộc

- `a ^ a = 0`, `a ^ 0 = a`, XOR có tính giao hoán và kết hợp ⇒ XOR toàn mảng khử hết các số xuất hiện chẵn lần (Single Number).
- `a ^ b` cho biết **các bit khác nhau** giữa `a` và `b`; `x & -x` lấy ra một bit khác nhau để **chia mảng làm hai nhóm** (Single Number III).
- Muốn **max XOR**: greedy từ bit **cao nhất** xuống, vì bit cao có trọng số lớn hơn tổng mọi bit thấp cộng lại ([[Binary Trie XOR]]).

## 4. Cạm bẫy — số âm trong Python

Python `int` **vô hạn bit**, không tràn, và `-1` có vô hạn bit `1` ⇒ phải **mask thủ công** khi mô phỏng 32-bit:

```python
MASK = 0xFFFFFFFF
INT_MIN_NEG = 0x80000000

# Sum of Two Integers (LC 371) — cộng không dùng '+'
while b:
    a, b = (a ^ b) & MASK, ((a & b) << 1) & MASK
return a if a < INT_MIN_NEG else ~(a ^ MASK)
```

Khác:
- **Counting Bits (LC 338) — hai recurrence**: `dp[i] = dp[i >> 1] + (i & 1)` (dùng bit cao + lsb) hoặc `dp[i] = dp[i & (i-1)] + 1` (xoá bit thấp nhất). Cả hai `O(n)`; chọn cái bạn giải thích trôi chảy hơn.
- **Bitwise AND of Numbers Range (LC 201)**: AND của mọi số trong `[m, n]` = **prefix nhị phân chung dài nhất** của `m` và `n`, các bit thấp còn lại `= 0`. Shift cả hai sang phải tới khi bằng nhau, đếm bước, shift trái lại.
- **`x >> i` với `x` âm trong Python** là arithmetic shift (giữ dấu), khác C.
- **Nhầm `&` với `and`** (và `|` với `or`) — ưu tiên toán tử cũng khác, luôn đóng ngoặc.

## 5. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [136](https://leetcode.com/problems/single-number/) | Single Number | XOR toàn mảng |
| [191](https://leetcode.com/problems/number-of-1-bits/) | Number of 1 Bits | Brian Kernighan `x &= x-1` |
| [338](https://leetcode.com/problems/counting-bits/) | Counting Bits | DP theo bit |
| [371](https://leetcode.com/problems/sum-of-two-integers/) | Sum of Two Integers | XOR + carry, mask 32-bit |
| [201](https://leetcode.com/problems/bitwise-and-of-numbers-range/) | Bitwise AND of Numbers Range | Prefix chung |
| [421](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) | Maximum XOR of Two Numbers | Greedy theo bit / [[Binary Trie XOR]] |

**Tự luyện:** LC 137, 190, 260, 268, 461, 1290.

## 6. Checklist áp dụng

- [ ] Có số âm không? Cần mask 32-bit không?
- [ ] Dùng `&`/`|`/`^` (bitwise) hay `and`/`or` (logic)? Đã đóng ngoặc chưa?
- [ ] Có tận dụng được `a ^ a = 0` không?
- [ ] Với max XOR: đã greedy từ bit cao nhất chưa?
- [ ] `n ≤ 20` không? (→ cân nhắc bitmask thay vì set)

## Tham khảo

- [Python docs — int.bit_count / bit_length](https://docs.python.org/3/library/stdtypes.html#int.bit_count)
- [cp-algorithms — Bit manipulation](https://cp-algorithms.com/algebra/bit-manipulation.html)
- [Bit Twiddling Hacks — Sean Eron Anderson](https://graphics.stanford.edu/~seander/bithacks.html) — bộ sưu tập kinh điển
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 10: Bit manipulation

## Liên kết
[[Bitmask DP]] · [[Binary Trie XOR]] · [[Python Interview Toolkit]] · [[Prime Number]] · [[DS&AL]]
