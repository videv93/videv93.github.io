---
tags: [dsal, data-structure, heap]
status: evergreen
---
# Heap

> Heap (priority queue) trả lời nhanh một câu hỏi duy nhất: *"phần tử lớn/nhỏ nhất **bây giờ** là gì?"*. `push`/`pop` đều `O(log n)`. Pattern quan trọng nhất: **heap kích thước k** để giữ k phần tử tốt nhất trong `O(n log k)`.

## 1. Khi nào dùng

- Lấy *top k* liên tục từ stream (Top K, Kth Largest).
- Lấy min/max **động** khi vừa insert vừa delete (Median from Data Stream).
- **K-way merge** — gộp `k` list đã sort.
- **Greedy với priority** (Task Scheduler, Reorganize String, Meeting Rooms — xem [[Interval]]).

⚠️ Sliding window max **không** dùng heap mà dùng monotonic deque ([[Monotonic Stack and Deque]]).

## 2. Template code

```python
import heapq

# 1) Min-heap cơ bản
heap: list[int] = []
heapq.heappush(heap, x)
top = heap[0]                  # peek, không pop
val = heapq.heappop(heap)

# 2) Max-heap = negate (heapq chỉ có min-heap)
heapq.heappush(heap, -x); val = -heapq.heappop(heap)

# 3) Top-k nhanh
heapq.nsmallest(k, arr); heapq.nlargest(k, arr)      # O(n log k)

# 4) Heapify O(n) — nhanh hơn n lần push
heapq.heapify(arr)

# 5) Priority tuỳ ý — push tuple, thêm idx làm tie-breaker
heapq.heappush(heap, (priority, idx, payload))
```

## 3. Heap vs Sort vs Quickselect

| Yêu cầu | Heap `O(n log k)` | Sort `O(n log n)` | Quickselect `O(n)` avg |
| --- | --- | --- | --- |
| Top-k khi `n` lớn, `k` nhỏ | ✅ Tốt nhất | OK | ✅ Khi không cần thứ tự |
| Cần k phần tử **đã sắp** | ✅ | ✅ | Phải sort thêm |
| Streaming (data đến dần) | ✅ | ❌ | ❌ |
| Đảm bảo worst-case | ✅ | ✅ | ❌ (`O(n²)`) |
| Trong phỏng vấn | Mặc định, dễ giải thích | Khi `n` nhỏ | Khi cần "linear time" |

Quickselect chi tiết ở [[Divide and Conquer]].

## 4. Median Finder — invariant hai heap

```
max_heap (lo)          min_heap (hi)
  …,3,5,7,8      ←  →     9,10,12,…
top = 8                   top = 9
```
- `|len(lo) - len(hi)| ≤ 1`, và **mọi** phần tử `lo` ≤ **mọi** phần tử `hi`.
- Add: push tạm sang heap kia rồi rebalance.
- Median = top của heap lớn hơn, hoặc trung bình 2 top khi bằng size.

## 5. Cạm bẫy

- **Quên `heapq` chỉ là min-heap** → sai hướng cả bài.
- **Tuple chứa object không comparable** (`ListNode`) → `TypeError` khi priority bằng nhau. Thêm `idx` làm tie-breaker.
- **Dùng `heapify` rồi `push` lặp** khi chỉ cần `nlargest` — code dài hơn mà không nhanh hơn.
- **Task Scheduler**: công thức đếm `max((max_count - 1) * (n + 1) + ties, total_tasks)` đẹp và nhanh, nhưng **phải chứng minh được** — nếu không, cứ mô phỏng bằng heap.
- **Top K Frequent Words** tie-break: sort theo `(-freq, word)` — tần số giảm, từ điển tăng.

## 6. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [215](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Kth Largest Element | Heap size k / quickselect |
| [692](https://leetcode.com/problems/top-k-frequent-words/) | Top K Frequent Words | Counter + tie-break `(-freq, word)` |
| [295](https://leetcode.com/problems/find-median-from-data-stream/) | Find Median from Data Stream | Hai heap cân bằng |
| [973](https://leetcode.com/problems/k-closest-points-to-origin/) | K Closest Points to Origin | Max-heap size k theo `d²` |
| [23](https://leetcode.com/problems/merge-k-sorted-lists/) | Merge k Sorted Lists | K-way merge ([[Linked List]]) |
| [621](https://leetcode.com/problems/task-scheduler/) | Task Scheduler | Heap simulation / công thức đếm |

**Tự luyện:** LC 378, 451, 502, 767, 1046, 1167.

## 7. Checklist áp dụng

- [ ] Cần max-heap không? Đã negate chưa?
- [ ] Tuple đẩy vào heap có tie-breaker chưa?
- [ ] Có phải bài sliding window max không? (→ dùng deque, không dùng heap)
- [ ] `k` nhỏ hơn `n` nhiều không? (→ heap size k thay vì sort)
- [ ] Bài có phải streaming không? (→ heap; sort không dùng được)

## Tham khảo

- [Python docs — heapq](https://docs.python.org/3/library/heapq.html) — kể cả phần "Priority Queue Implementation Notes"
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 6: Heapsort & priority queues
- [Wikipedia — Binary heap](https://en.wikipedia.org/wiki/Binary_heap) — chứng minh `heapify` là `O(n)`
- [LeetCode Explore — Heap](https://leetcode.com/explore/learn/card/heap/)

## Liên kết
[[Hash Table]] · [[Monotonic Stack and Deque]] · [[Divide and Conquer]] · [[Dijkstra]] · [[Interval]] · [[Minimum Spanning Tree]] · [[DS&AL]]
