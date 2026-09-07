---
tags: [dsal, technique, binary-search, dp]
status: evergreen
---
# Binary Search with DP

> Khi transition của DP cần "tìm nhanh giá trị tối ưu trong phần đã xét", binary search vào cấu trúc đã sắp giảm `O(n²)` xuống `O(n log n)`. Đây là bản chất của LIS `O(n log n)`, Job Scheduling, Constrained Subsequence Sum.

## 1. Khi nào dùng

- DP có transition dạng "tìm vị trí phù hợp nhất" trong một cấu trúc **đã sort**.
- `dp[i] = max/min(...)` mà argmax tìm được bằng binary search thay vì quét.
- Mở rộng: transition cần **range max/min query** → segment tree ([[Advanced Tree]]) — vẫn cùng họ "tra cứu nhanh bên trong DP".

## 2. Template code

```python
from bisect import bisect_left

# Patience sorting — LIS O(n log n)
tails = []                      # tails[k] = phần tử cuối nhỏ nhất của LIS dài k+1
for x in arr:
    idx = bisect_left(tails, x)   # bisect_right nếu cho phép bằng nhau
    if idx == len(tails):
        tails.append(x)
    else:
        tails[idx] = x
lis_length = len(tails)
```

⚠️ `tails` **không** phải là một LIS thật — chỉ độ dài của nó là đúng. Muốn dựng lại dãy, phải lưu parent.

## 3. Các dạng trong họ này

| Bài | Cấu trúc tra cứu | Ghi chú |
| --- | --- | --- |
| LIS (LC 300) | `tails` + `bisect` | Nền của cả họ |
| Russian Doll Envelopes (LC 354) | Sort `(w asc, h desc)` rồi LIS trên `h` | `h desc` để cùng `w` không tạo LIS giả |
| LIS II (LC 2407) | **Segment tree** range-max | Có ràng buộc gap `≤ k`, patience không đủ |
| Number of LIS (LC 673) | DP `(length, count)` | Không dùng patience |
| Job Scheduling (LC 1235) | `bisect` trên endTime | `prev(i)` = job cuối có `end ≤ start[i]` |
| Max Sum Rectangle ≤ K (LC 363) | `SortedList` + `bisect` | Fix 2 cột → max subarray sum ≤ k |
| Allocate Mailboxes (LC 1478) | Precompute `cost[l][r]` theo median | DP `dp[k][i]` chia cluster |

## 4. Job Scheduling — hình dung

```
jobs sort theo endTime:  J1=[1,3,50]  J2=[2,4,10]  J3=[3,5,40]  J4=[3,6,70]

dp[i] = max(dp[i-1], profit[i] + dp[prev(i)])
prev(i) = job cuối cùng có endTime ≤ start[i]   ← binary search ở đây
```

## 5. Cạm bẫy

- **`bisect_left` vs `bisect_right`**: strictly increasing dùng `bisect_left`; non-decreasing (cho phép bằng) dùng `bisect_right`. Sai chỗ này lệch đúng 1 ở các test có phần tử trùng.
- **Tưởng `tails` là dãy LIS** → trả sai khi đề đòi dãy cụ thể.
- **Russian Doll quên `h desc`** → hai envelope cùng `w` bị tính là tăng dần.
- **`SortedList` cần `pip install sortedcontainers`** — trên LeetCode có sẵn, nhưng phỏng vấn onsite nên hỏi trước, hoặc tự cài BIT ([[Advanced Tree]]).
- **Allocate Mailboxes**: `cost[l][r]` tối ưu tại **median**, không phải mean — chứng minh bằng bất đẳng thức tổng khoảng cách.

## 6. Bài kinh điển

| LC | Bài |
| --- | --- |
| [354](https://leetcode.com/problems/russian-doll-envelopes/) | Russian Doll Envelopes |
| [2407](https://leetcode.com/problems/longest-increasing-subsequence-ii/) | Longest Increasing Subsequence II |
| [673](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) | Number of Longest Increasing Subsequence |
| [363](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/) | Max Sum of Rectangle No Larger Than K |
| [1425](https://leetcode.com/problems/constrained-subsequence-sum/) | Constrained Subsequence Sum (monotonic deque) |
| [1478](https://leetcode.com/problems/allocate-mailboxes/) | Allocate Mailboxes |

**Tự luyện:** LC 1235, 1626.

## 7. Checklist áp dụng

- [ ] Transition có thật sự tra cứu trên cấu trúc **đã sort** không?
- [ ] `bisect_left` hay `bisect_right`? (strict vs non-strict)
- [ ] Đề có đòi **dãy cụ thể** không? (→ phải lưu parent, patience không đủ)
- [ ] Có ràng buộc phụ (gap, thời gian) khiến cần segment tree thay vì `tails` không?
- [ ] Sort đa khoá đã đúng chiều chưa (`asc`/`desc` cho tie)?

## Tham khảo

- [Patience sorting — Wikipedia](https://en.wikipedia.org/wiki/Patience_sorting) — chứng minh LIS `O(n log n)`
- [Python docs — bisect](https://docs.python.org/3/library/bisect.html)
- [sortedcontainers — SortedList](https://grantjenks.com/docs/sortedcontainers/sortedlist.html)
- [cp-algorithms — Longest increasing subsequence](https://cp-algorithms.com/sequences/longest_increasing_subsequence.html)

## Liên kết
[[Binary Search]] · [[Dynamic Programming]] · [[Sorting DP]] · [[Advanced Tree]] · [[Monotonic Stack and Deque]] · [[DS&AL]]
