---
tags: [dsal, dp, sorting]
status: evergreen
---
# Sorting DP

> Nhóm bài mà **bước đầu tiên là sort**, sau đó mới DP (hoặc greedy, hoặc monotonic stack). Nhãn "Sort + DP" hơi hẹp — hãy đọc nó là **"sort như một bước tiền xử lý"**.

## 1. Khi nào dùng

- Input có cấu trúc nhiều chiều mà sort giúp **ngầm hoá một chiều** (Russian Doll: sort theo `w` rồi chỉ còn LIS trên `h`).
- Bài LIS-like trên dữ liệu 2D hoặc có trọng số.
- Job scheduling, envelope stacking, divisible subset.

## 2. Trick quan trọng nhất: tie-break khi sort

```python
envelopes.sort(key=lambda e: (e[0], -e[1]))   # w tăng, h GIẢM
```
`h` giảm để hai envelope **cùng `w`** không tạo thành "LIS giả" — vì cùng `w` thì không lồng vào nhau được. Đây là nguồn bug số một của cả họ bài này.

## 3. Ba loại bài trong nhóm

| Loại | Bài | Sau khi sort thì làm gì |
| --- | --- | --- |
| **Sort → LIS/DP** | Russian Doll (354), Stacking Cuboids (1691), Largest Divisible Subset (368) | DP `O(n²)` hoặc patience `O(n log n)` |
| **Sort → DP + binary search** | Job Scheduling (1235) | `bisect` tìm job trước không đè ([[Binary Search with DP]]) |
| **Sort → greedy / monotonic stack** | Min Taps (1326), Visible People (1944) | Greedy interval cover / [[Monotonic Stack and Deque]] |

## 4. Hai bài mẫu

**Job Scheduling (LC 1235):**
```
jobs sort theo endTime: J1=[1,3,50] J2=[2,4,10] J3=[3,5,40] J4=[3,6,70]
dp[i] = max(dp[i-1], profit[i] + dp[prev(i)])
prev(i) = job cuối cùng có endTime ≤ start[i]     ← binary search
```

**Minimum Taps (LC 1326):** chuyển mỗi tap `(i, r)` thành interval `[i-r, i+r]`, rồi bài trở thành "phủ đoạn bằng ít interval nhất" — greedy kiểu Jump Game ([[Greedy]], [[Interval]]). Không phải DP, nhưng cùng họ "sort + interval cover".

**Maximum Height by Stacking Cuboids (LC 1691):** với mỗi cuboid, sort **ba cạnh của chính nó** trước (vì được xoay tuỳ ý), rồi sort danh sách, rồi LIS 3 chiều.

## 5. Cạm bẫy

- **Quên tie-break `desc`** ở chiều thứ hai (Russian Doll, Stacking Cuboids).
- **Sort làm mất index gốc** khi đề hỏi vị trí ([[Sorting]]).
- **Visible People in Queue (LC 1944) không thật sự cần sort** — người đã đứng cố định; bài này là monotonic stack quét từ phải sang. Nó nằm ở nhóm này chỉ vì "thứ tự là tiền đề".
- **Largest Divisible Subset (LC 368)**: sau khi sort, `dp[i] = max(dp[j]) + 1` với `nums[i] % nums[j] == 0` — tính bắc cầu của chia hết là lý do sort làm bài dễ đi.
- **DP `O(n²)` khi `n = 10^5`** → phải chuyển sang patience/binary search.

## 6. Bài kinh điển

| LC | Bài | Sau sort |
| --- | --- | --- |
| [368](https://leetcode.com/problems/largest-divisible-subset/) | Largest Divisible Subset | DP `O(n²)` + truy vết |
| [354](https://leetcode.com/problems/russian-doll-envelopes/) | Russian Doll Envelopes | LIS trên `h` |
| [1691](https://leetcode.com/problems/maximum-height-by-stacking-cuboids/) | Maximum Height by Stacking Cuboids | Sort cạnh + LIS 3D |
| [1235](https://leetcode.com/problems/maximum-profit-in-job-scheduling/) | Maximum Profit in Job Scheduling | DP + `bisect` |
| [1944](https://leetcode.com/problems/number-of-visible-people-in-a-queue/) | Number of Visible People in a Queue | Monotonic stack |
| [1326](https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/) | Minimum Number of Taps | Greedy interval cover |

**Tự luyện:** LC 1235, 1626.

## 7. Checklist áp dụng

- [ ] Sort theo khoá nào? Có cần tie-break `desc` không?
- [ ] Sau khi sort, bài rút về dạng đã biết nào (LIS / interval cover / stack)?
- [ ] `n` bao lớn? DP `O(n²)` có chạy nổi không?
- [ ] Đề có cần truy vết dãy cụ thể không? (→ lưu parent)
- [ ] Có phải thật sự cần sort không, hay thứ tự đã có sẵn?

## Tham khảo

- [Patience sorting — Wikipedia](https://en.wikipedia.org/wiki/Patience_sorting)
- [Python docs — Sorting HOW TO](https://docs.python.org/3/howto/sorting.html)
- [USACO Guide — Sorting & Greedy](https://usaco.guide/silver/greedy-sorting)
- [cp-algorithms — LIS](https://cp-algorithms.com/sequences/longest_increasing_subsequence.html)

## Liên kết
[[Sorting]] · [[Dynamic Programming]] · [[Binary Search with DP]] · [[Greedy]] · [[Interval]] · [[Monotonic Stack and Deque]] · [[DS&AL]]
