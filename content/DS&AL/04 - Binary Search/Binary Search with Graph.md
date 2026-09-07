---
tags: [dsal, technique, binary-search, graph]
status: evergreen
---
# Binary Search with Graph

> Khi bài có dạng **"min của max"** hoặc **"max của min"** trên graph/grid: binary search trên đáp án + kiểm tra khả thi bằng BFS/DFS. Chậm hơn Dijkstra một hệ số `log`, nhưng **dễ nghĩ và dễ code hơn nhiều**.

## 1. Khi nào dùng

- "Min effort path", "max difficulty path", "ngưỡng nhỏ nhất để đi được từ A đến B".
- Predicate tự nhiên: *"với threshold T, có đường đi không?"* → trả lời bằng [[BFS]] / [[DFS]].

## 2. Template code

```python
def solve(lo, hi, can_reach):
    while lo < hi:
        mid = (lo + hi) // 2
        if can_reach(mid):     # BFS/DFS với constraint phụ thuộc mid
            hi = mid
        else:
            lo = mid + 1
    return lo
```
`can_reach(x)` đơn điệu: `x` càng "rộng rãi" thì chỉ có thể chuyển `False → True`, không bao giờ ngược lại. Đây là điều kiện bắt buộc, giống [[Search on Answer]].

## 3. Bảng predicate của họ bài này

| Bài | Đáp án | `can(x)` | Chiều đơn điệu |
| --- | --- | --- | --- |
| Path With Minimum Effort (LC 1631) | max chênh lệch cạnh | BFS chỉ qua cạnh có diff ≤ x | True khi x ↗ |
| Swim in Rising Water (LC 778) | ngưỡng nước | BFS qua ô có height ≤ x | True khi x ↗ |
| Path With Maximum Minimum (LC 1102) | min trên path | DFS qua ô có giá trị ≥ x | True khi x ↘ |
| Last Day Where You Can Still Cross (LC 1970) | ngày | BFS trên grid tại thời điểm x | True khi x ↘ |

## 4. So với Dijkstra và DSU offline

| Cách | Khi dùng | Độ phức tạp |
| --- | --- | --- |
| [[Dijkstra]] (max-min / min-max relax) | Áp dụng được thì nhanh hơn | `O((V+E) log V)` |
| **BS + BFS** (note này) | Dễ giải thích, code ngắn | `O((V+E) · log range)` |
| [[Union Find]] offline | Khi sort được cạnh/query theo trọng số | `O((V+E) · α)` |

Cùng một bài (LC 778) giải được bằng **cả ba** — trong phỏng vấn nên nói ra cả ba rồi chọn một để cài.

## 5. Cạm bẫy

- **Quên chứng minh đơn điệu** của `can_reach` → dùng binary search trên predicate không đơn điệu, sai âm thầm.
- **Bound sai**: `lo/hi` phải lấy từ min/max giá trị thật trên grid, không phải `0..10^9` bừa (vẫn đúng nhưng chậm).
- **Reset `visited` mỗi lần gọi `can_reach`** — quên là dính state của lần trước.
- **Trapping Rain Water II (LC 407) không phải BS** — bản chất là **Dijkstra-like với priority queue** (luôn xử lý ô biên thấp nhất). Đặt cạnh nhau để thấy cả hai đều thuộc họ "đáp án = ngưỡng".
- **Find a Peak Element II (LC 1901)**: binary search trên **cột**, mỗi bước tìm max của cột đó — không phải BS trên đáp án.

## 6. Bài kinh điển

| LC | Bài | Cách khác cũng giải được |
| --- | --- | --- |
| [778](https://leetcode.com/problems/swim-in-rising-water/) | Swim in Rising Water | DSU offline, Dijkstra |
| [1631](https://leetcode.com/problems/path-with-minimum-effort/) | Path With Minimum Effort | Dijkstra |
| [1970](https://leetcode.com/problems/last-day-where-you-can-still-cross/) | Last Day Where You Can Still Cross | DSU ngược thời gian |
| [407](https://leetcode.com/problems/trapping-rain-water-ii/) | Trapping Rain Water II | Heap (Dijkstra-like) |
| [2513](https://leetcode.com/problems/minimize-the-maximum-of-two-arrays/) | Minimize the Maximum of Two Arrays | Toán/inclusion-exclusion |
| [1901](https://leetcode.com/problems/find-a-peak-element-ii/) | Find a Peak Element II | BS trên cột |

**Tự luyện:** LC 1102, 1631.

## 7. Checklist áp dụng

- [ ] `can_reach(x)` có đơn điệu không? Theo chiều nào?
- [ ] `lo`, `hi` lấy từ giá trị thật trong dữ liệu chưa?
- [ ] `visited` có được reset mỗi lần check không?
- [ ] Đã cân nhắc Dijkstra / DSU offline như phương án nhanh hơn chưa?
- [ ] `O((V+E) log range)` có vừa constraint không?

## Tham khảo

- [USACO Guide — Binary Search on Answer](https://usaco.guide/silver/binary-search)
- [cp-algorithms — Dijkstra](https://cp-algorithms.com/graph/dijkstra.html) — so sánh với hướng relax max-min
- [Wikipedia — Widest path problem](https://en.wikipedia.org/wiki/Widest_path_problem) — nền lý thuyết của bottleneck path
- [LeetCode — Binary Search + Graph tag](https://leetcode.com/tag/binary-search/)

## Liên kết
[[Search on Answer]] · [[BFS]] · [[DFS]] · [[Dijkstra]] · [[Union Find]] · [[Minimum Spanning Tree]] · [[DS&AL]]
