---
tags: [dsal, dp, combinatorics]
status: evergreen
---
# Combinatorics DP

> DP **đếm** thay vì tối ưu: transition là phép **cộng** (`+=`), không phải `max`/`min`. Dấu hiệu nhận biết: đề hỏi "số cách", "số đường đi", "số chuỗi", và luôn kèm `mod 10^9 + 7`.

## 1. Khi nào dùng

- Đếm số cách / số path / số sequence thoả điều kiện.
- Transition là tổng của các state trước.
- Kết quả lớn → cần `% MOD`.

## 2. Khung chung

```python
MOD = 10**9 + 7

def dp_count(n):
    table = [0] * (n + 1)
    table[0] = 1                      # base: có đúng 1 cách "không làm gì"
    for i in range(1, n + 1):
        table[i] = sum(table[j] for j in transitions(i)) % MOD
    return table[n]
```

**Ba câu hỏi:**
1. **State**: cái gì đặc trưng cho bài con? (index, số phần tử đã chọn, parity, giá trị cuối…)
2. **Transition graph**: từ state này sang state nào, với count bao nhiêu?
3. **Modulo**: áp `% MOD` sau **mỗi** phép cộng/nhân lớn.

## 3. Ba bài mẫu

**Unique Paths (LC 62) — hai cách:**

| Cách | Time | Space | Khi nào |
| --- | --- | --- | --- |
| DP grid `dp[i][j] = dp[i-1][j] + dp[i][j-1]` | `O(mn)` | `O(mn)` hoặc `O(min(m,n))` | Khi có obstacle (LC 63) hoặc đề mở rộng |
| Công thức `C(m+n-2, m-1)` | `O(min(m,n))` | `O(1)` | Khi không obstacle |

**Count Vowels Permutation (LC 1220) — transition graph:**
```
a → e
e → a, i
i → a, e, o, u
o → i, u
u → a
```
`dp[i][v]` = số chuỗi độ dài `i` kết thúc bằng nguyên âm `v`. Vẽ transition graph ra giấy trước khi code là cách nhanh nhất.

**Number of Music Playlists (LC 920)** — `dp[i][j]` = playlist độ dài `i` dùng đúng `j` bài khác nhau:
- Thêm **bài mới**: `dp[i-1][j-1] × (N - (j-1))`
- Thêm **bài cũ** (cách lần phát trước ≥ K): `dp[i-1][j] × max(0, j - K)`

## 4. Cạm bẫy

- **Quên `% MOD`** ở một transition → Python không tràn nhưng số khổng lồ làm chậm, và sai nếu đề đòi số dư.
- **Đếm hoán vị thay vì tổ hợp** — thứ tự vòng lặp quyết định (Coin Change II: coin ở vòng **ngoài**, xem [[Dynamic Programming]]).
- **Base case `dp[0] = 1`** — "có đúng một cách để không làm gì". Đặt `0` là sai toàn bộ.
- **Dùng công thức tổ hợp khi có ràng buộc** (obstacle, cấm kề nhau) → phải quay lại DP.
- **`math.comb` với `MOD`**: `comb(n, k) % MOD` đúng vì Python int vô hạn, nhưng nếu tự cài modular inverse thì cần `pow(x, MOD-2, MOD)` (định lý Fermat nhỏ, `MOD` phải là prime — `10^9+7` là prime, xem [[Prime Number]]).

**Digit DP + KMP (LC 1397 Find All Good Strings)**: đếm chuỗi `≤ s2`, `≥ s1`, không chứa `evil` ⇒ `f(s2) - f(s1 - 1)`. State `(idx, kmp_state, is_tight)` với `kmp_state` là con trỏ LPS trong `evil` ([[KMP]]).

## 5. Bài kinh điển

| LC | Bài | State |
| --- | --- | --- |
| [62](https://leetcode.com/problems/unique-paths/) | Unique Paths | `dp[i][j]` grid |
| [63](https://leetcode.com/problems/unique-paths-ii/) | Unique Paths II | Grid có obstacle |
| [935](https://leetcode.com/problems/knight-dialer/) | Knight Dialer | `dp[i][digit]` + transition graph |
| [1220](https://leetcode.com/problems/count-vowels-permutation/) | Count Vowels Permutation | `dp[i][vowel]` |
| [1434](https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/) | Number of Ways to Wear Different Hats | Bitmask theo người ([[Bitmask DP]]) |
| [920](https://leetcode.com/problems/number-of-music-playlists/) | Number of Music Playlists | `dp[i][j]` độ dài × số bài |

**Tự luyện:** LC 357, 1641, 1411, 552.

## 6. Checklist áp dụng

- [ ] Transition là `+=` (đếm) hay `max/min` (tối ưu)?
- [ ] Base case `dp[0] = 1` chưa?
- [ ] Đã `% MOD` sau **mọi** phép cộng/nhân chưa?
- [ ] Thứ tự vòng lặp có phân biệt tổ hợp/hoán vị đúng ý đề không?
- [ ] Có ràng buộc nào khiến công thức tổ hợp không dùng được không?
- [ ] Đã vẽ transition graph ra chưa?

## Tham khảo

- [cp-algorithms — Binomial coefficients](https://cp-algorithms.com/combinatorics/binomial-coefficients.html) và [Modular inverse](https://cp-algorithms.com/algebra/module-inverse.html)
- [Python docs — math.comb / pow(x, y, mod)](https://docs.python.org/3/library/math.html#math.comb)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 22: Combinatorics
- [Wikipedia — Fermat's little theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem)

## Liên kết
[[Dynamic Programming]] · [[Bitmask DP]] · [[Prime Number]] · [[KMP]] · [[Game Theory]] · [[DS&AL]]
