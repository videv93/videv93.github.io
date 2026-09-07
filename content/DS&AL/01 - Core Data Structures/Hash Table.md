---
tags: [dsal, data-structure, hash]
status: evergreen
---
# Hash Table

> Triết lý: **đổi bộ nhớ lấy thời gian**. Chấp nhận `O(n)` bộ nhớ phụ để có lookup `O(1)` — đó là cách biến rất nhiều bài `O(n²)` thành `O(n)`. Điều đáng học không phải "hash là gì" mà là **khi nào hash KHÔNG đủ**.

## 1. Khi nào dùng

- Cần look-up / đếm / dedupe mà **không cần thứ tự**.
- Có thể đổi vòng lặp `O(n)` bên trong thành membership test `O(1)`.
- Pattern phổ biến nhất: **"thấy prefix nào đó → check complement"** (Two Sum, Subarray Sum K).

## 2. Template code

```python
from collections import Counter, defaultdict

# 1) Counter: đếm tần suất
cnt = Counter(nums)
top3 = cnt.most_common(3)

# 2) defaultdict(list): nhóm theo khoá
groups: dict[str, list[int]] = defaultdict(list)
for i, v in enumerate(arr):
    groups[v].append(i)

# 3) Prefix sum + dict: tìm subarray thoả điều kiện
prefix_index = {0: -1}          # prefix_sum -> index sớm nhất
cur = 0
for i, x in enumerate(arr):
    cur += x
    if cur - target in prefix_index:
        ...                     # tìm thấy subarray sum = target
    if cur not in prefix_index:
        prefix_index[cur] = i
```

## 3. Khi hash KHÔNG đủ

| Yêu cầu | Hash đủ? | Thay thế |
| --- | --- | --- |
| Lookup `O(1)`, không cần thứ tự | ✅ | — |
| Cần thứ tự duyệt | ❌ | `OrderedDict` / sorted list |
| Range query `[l, r]` | ❌ | Fenwick / Segment Tree ([[Advanced Tree]]) |
| Top-k frequent | Một phần | [[Heap]] |
| Nearest neighbor | ❌ | `SortedList` / BST |
| Subarray sum **có số âm** | ✅ prefix sum + hash | — |
| Subarray sum **không âm** | — | Thường [[Sliding Window]] gọn hơn |
| Cần `O(1)` **worst-case** | ❌ | Hash bị adversary tấn công collision |
| Khoá là list / dict | ❌ | Convert sang `tuple` / `frozenset` |

## 4. Cạm bẫy

- **`dict[k]` raise `KeyError`** — dùng `.get(k, default)` hoặc `defaultdict`.
- **Khoá không hashable**: `list`, `dict`, `set` → phải wrap thành `tuple`/`frozenset` (ảnh hưởng cả `@cache`, xem [[Python Interview Toolkit]]).
- **Nhầm amortized với worst-case** khi phát biểu độ phức tạp.
- **Longest Consecutive (LC 128)**: nếu thiếu điều kiện "chỉ chạy chain khi `x-1 ∉ set`" thì tụt về `O(n²)`. Mỗi chain chỉ có **một** starter ⇒ tổng chi phí `O(n)`.
- **Đếm bằng dict rồi sort để lấy top-k** — `O(n log n)`, trong khi heap size k chỉ `O(n log k)` ([[Heap]]).

## 5. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [217](https://leetcode.com/problems/contains-duplicate/) | Contains Duplicate | Set membership |
| [128](https://leetcode.com/problems/longest-consecutive-sequence/) | Longest Consecutive Sequence | Chỉ chạy chain từ starter |
| [347](https://leetcode.com/problems/top-k-frequent-elements/) | Top K Frequent Elements | Counter + heap / bucket sort |
| [560](https://leetcode.com/problems/subarray-sum-equals-k/) | Subarray Sum Equals K | Prefix sum + hash ([[Prefix Sum]]) |
| [205](https://leetcode.com/problems/isomorphic-strings/) | Isomorphic Strings | Hai map hai chiều |
| [146](https://leetcode.com/problems/lru-cache/) | LRU Cache | Hash + doubly linked list ([[Linked List]]) |

**Tự luyện:** LC 1, 49, 219, 220, 525, 974, 30, 380.

**LRU hai cách:** `OrderedDict` với `move_to_end` (5 dòng, demo nhanh) vs dict + DLL tự cài (thể hiện hiểu amortized `O(1)` cho cả `get`/`put` — phỏng vấn senior thường yêu cầu cài tay).

## 6. Checklist áp dụng

- [ ] Bài này có thật sự không cần thứ tự không? (nếu cần → sorted structure)
- [ ] Khoá có hashable không?
- [ ] Đã xử lý `KeyError` bằng `.get` / `defaultdict` chưa?
- [ ] Nếu là subarray sum: mảng có số âm không? (có → prefix+hash; không → sliding window)
- [ ] Nếu là top-k: heap hay bucket sort có tốt hơn sort toàn bộ không?

## Tham khảo

- [Python docs — collections.Counter / defaultdict / OrderedDict](https://docs.python.org/3/library/collections.html)
- [Python Wiki — Time Complexity (dict, set)](https://wiki.python.org/moin/TimeComplexity)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 11: Hash Tables, universal hashing
- [LeetCode Explore — Hash Table](https://leetcode.com/explore/learn/card/hash-table/)

## Liên kết
[[Array]] · [[Prefix Sum]] · [[Heap]] · [[Sliding Window]] · [[Linked List]] · [[Advanced Tree]] · [[DS&AL]]
