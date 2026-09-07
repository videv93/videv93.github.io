---
tags: [dsal, dp]
status: evergreen
---
# Dynamic Programming

> DP = [[Recursion]] + memoization (hoặc bottom-up). Cần **hai** tính chất: **optimal substructure** (lời giải tối ưu xây từ lời giải con tối ưu) và **overlapping subproblems** (bài con lặp lại). Thiếu tính chất thứ hai thì đó là [[Divide and Conquer]]; thiếu tính chất thứ nhất thì phải [[Backtracking]].

## 1. Năm yếu tố của mọi bài DP

Trả lời đủ 5 câu này là đã giải xong bài:
1. **State** — `dp[i][j]` nghĩa là gì? (viết thành câu tiếng Việt hoàn chỉnh)
2. **Transition** — `dp[i][j] = f(...)`
3. **Base case**
4. **Answer** nằm ở ô nào?
5. **Thứ tự duyệt** — từ nhỏ đến lớn theo chiều nào?

## 2. Bốn nhóm DP

| Nhóm | Đặc điểm state | Bài đại diện |
| --- | --- | --- |
| **Sequence DP (2D)** | `(i, j)` = hai prefix | LCS, Edit Distance |
| **Knapsack** | `(i, capacity)` | 0/1 Knapsack, Partition Equal Subset Sum |
| **Linear DP** | `dp[i]` hoặc `dp[i][k]` | Coin Change, House Robber, Stock |
| **Interval / Partition DP** | `dp[l][r]`, split tại `k` | Burst Balloons, MCM, Strange Printer |

## 3. Template code

```python
from functools import cache

# 1) Top-down — dễ thấy transition nhất
@cache
def dp(*state):
    if base_condition(*state):
        return base_value
    return combine([dp(*sub) for sub in transitions(*state)])

# 2) Bottom-up 2D
dp = [[0] * cols for _ in range(rows)]
for i in range(rows):
    for j in range(cols):
        dp[i][j] = base_value if base(i, j) else f(dp[i-1][j], dp[i][j-1], ...)
return dp[-1][-1]

# 3) Space-optimized 1D — khi transition chỉ dùng dòng trước
prev = [0] * cols
for i in range(rows):
    cur = [0] * cols
    for j in range(cols):
        cur[j] = f(prev[j], cur[j-1], ...)
    prev = cur
```

**Top-down vs bottom-up:** top-down (`@cache`) dễ viết, thấy rõ transition, nhưng tốn stack. Bottom-up tiết kiệm stack và dễ tối ưu space.

## 4. Bảng state/transition — 18 bài kinh điển

| Bài | State | Transition | Base | Answer |
| --- | --- | --- | --- | --- |
| LCS (1143) | `dp[i][j]` = LCS của 2 prefix | Match: `dp[i-1][j-1]+1`; else `max(dp[i-1][j], dp[i][j-1])` | `dp[0][j]=dp[i][0]=0` | `dp[m][n]` |
| LIS (300) | `tails[k]` = phần tử cuối nhỏ nhất của LIS dài `k+1` | `bisect_left` + replace/append | `tails=[]` | `len(tails)` |
| Edit Distance (72) | `dp[i][j]` = min edit | Match: `dp[i-1][j-1]`; else `1 + min(3 chiều)` | `dp[i][0]=i, dp[0][j]=j` | `dp[m][n]` |
| 0/1 Knapsack | `dp[w]` = max value với capacity `w` | `dp[w] = max(dp[w], dp[w-wi]+vi)` — **duyệt ngược** | `dp[*]=0` | `dp[W]` |
| Partition Equal Sum (416) | `dp[w]` = có subset sum `= w`? | `dp[w] |= dp[w-x]` | `dp[0]=True` | `dp[sum//2]` |
| Russian Doll (354) | Sort 2D rồi LIS trên `h` | Như LIS | — | `len(tails)` |
| Coin Change (322) | `dp[a]` = min coin | `dp[a] = min(dp[a-c]+1)` | `dp[0]=0` | `dp[amount]` |
| Coin Change II (518) | `dp[a]` = số cách | `dp[a] += dp[a-c]` (**outer loop = coin**) | `dp[0]=1` | `dp[amount]` |
| Stock Cooldown (309) | `hold[i], sold[i], rest[i]` | 3 transition giữa các state | `hold[0]=-p[0]` | `max(sold[-1], rest[-1])` |
| Stock IV (188) | `dp[t][i]` = max profit ≤ `t` giao dịch | `max(dp[t][i-1], p[i] + max_diff)` | `dp[0][i]=0` | `dp[k][n-1]` |
| House Robber II (213) | Tách 2 case (rob nhà 0 / không) | Như Robber I | — | `max(case1, case2)` |
| Max Product Subarray (152) | `cur_max, cur_min` rolling | Swap khi `x < 0` | `nums[0]` | `max(best)` |
| Palindrome Partition II (132) | `dp[i]` = min cut cho `s[..i]` | `dp[i] = min(dp[j-1]+1)` nếu `s[j..i]` palindrome | `dp[i]=0` nếu `s[0..i]` palindrome | `dp[n-1]` |
| Burst Balloons (312) | `dp[i][j]` = max điểm nổ trong `(i,j)` exclusive | `max(a[i]*a[k]*a[j] + dp[i][k] + dp[k][j])` | `dp[i][i+1]=0` | `dp[0][n-1]` |
| MCM | `dp[i][j]` = min phép nhân | `min(dp[i][k]+dp[k+1][j]+p[i-1]p[k]p[j])` | `dp[i][i]=0` | `dp[1][n]` |
| Cut a Stick (1547) | `dp[i][j]` = min cost | `min(dp[i][k]+dp[k][j]) + cuts[j]-cuts[i]` | `dp[i][i+1]=0` | `dp[0][m-1]` |
| Stone Game VII (1690) | `dp[l][r]` = max chênh lệch của người đi | `max(sum-a[l]-dp[l+1][r], sum-a[r]-dp[l][r-1])` | `dp[i][i]=0` | `dp[0][n-1]` |
| Strange Printer (664) | `dp[i][j]` = min lượt in | `min(dp[i][j-1]+1, dp[i][k]+dp[k+1][j-1])` khi `s[k]==s[j]` | `dp[i][i]=1` | `dp[0][n-1]` |

## 5. Interval DP — framing "chọn thao tác CUỐI CÙNG"

Burst Balloons / Strange Printer / MCM đều theo khung này:
- `dp[i][j]` = đáp số tối ưu cho đoạn `[i..j]`.
- Hỏi: **thao tác nào thực hiện cuối cùng** trong đoạn này? Chọn `k ∈ [i..j]` chia thành `[i..k-1]` và `[k+1..j]` đã giải xong.
- Khác với "chọn đầu tiên" — đa số trường hợp "chọn cuối" cho recurrence sạch hơn.

## 6. Cạm bẫy

- **0/1 Knapsack duyệt xuôi capacity** → biến thành unbounded knapsack (mỗi món dùng nhiều lần). Phải duyệt **ngược**.
- **Coin Change II đảo thứ tự vòng lặp** → đếm hoán vị thay vì tổ hợp. Coin ở vòng ngoài.
- **State thiếu chiều** — dấu hiệu: transition cần thông tin mà state không mang.
- **`@cache` với argument không hashable** ([[Python Interview Toolkit]]).
- **Tối ưu space quá sớm** → khó debug. Viết 2D chạy đúng trước, rồi mới rolling 1D.
- **Max Product Subarray**: phải giữ **cả** `cur_max` và `cur_min` vì số âm làm đảo vai trò.

## 7. Roadmap 8 bài nếu thiếu thời gian

1. House Robber (198) — linear DP cơ bản
2. Coin Change (322) — unbounded knapsack
3. LIS (300) — patience ([[Binary Search with DP]])
4. LCS (1143) — DP 2D trên hai chuỗi
5. Edit Distance (72) — kinh điển
6. Best Time to Buy and Sell Stock IV (188) — DP với `k` giao dịch
7. Burst Balloons (312) — interval DP
8. Stone Game (877) — minimax ([[Game Theory]])

**Tự luyện thêm:** LC 70, 64, 91, 583, 712, 887.

## 8. Checklist áp dụng

- [ ] Đã viết định nghĩa state thành **một câu hoàn chỉnh** chưa?
- [ ] Transition có dùng thông tin không có trong state không? (→ thiếu chiều)
- [ ] Base case đã phủ hết biên chưa?
- [ ] Thứ tự duyệt có đảm bảo bài con được tính trước không?
- [ ] Knapsack: chiều capacity duyệt xuôi hay ngược?
- [ ] Có phải bài đếm không? (`+=` thay vì `max`, và nhớ `% MOD` — xem [[Combinatorics DP]])

## Tham khảo

- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 15: Dynamic Programming, phần "Elements of dynamic programming"
- [cp-algorithms — DP topics](https://cp-algorithms.com/dynamic_programming/knapsack.html)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 7: Dynamic programming
- [CSES Problem Set — Dynamic Programming](https://cses.fi/problemset/list/) — 19 bài DP phủ hết các dạng nền

## Liên kết
[[Recursion]] · [[Bitmask DP]] · [[Tree DP]] · [[Topological Sort DP]] · [[Sorting DP]] · [[Combinatorics DP]] · [[Game Theory]] · [[Binary Search with DP]] · [[Greedy]] · [[DS&AL]]
