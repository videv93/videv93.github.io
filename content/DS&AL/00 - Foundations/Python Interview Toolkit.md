---
tags: [dsal, foundations, python]
status: evergreen
---
# Python Interview Toolkit

> Python thắng ở phỏng vấn vì code ngắn — nhưng chính sự ngắn đó giấu đi các bẫy: chia số âm, `heapq` chỉ có min-heap, `@cache` cần hashable, mutable default. Note này là tủ đồ nghề + danh sách bẫy.

## 1. Cấu trúc dữ liệu và chi phí

```python
# List
lst.append(x); lst.pop()      # O(1) cả hai
lst.insert(0, x); lst.pop(0)  # O(n) — tránh, dùng deque
sorted(lst)                   # O(n log n), trả list mới (Timsort, stable)
lst[::-1]                     # O(n)
lst[a:b]                      # O(b-a) — copy, không phải view

# Dict / Set
from collections import defaultdict, Counter
cnt = Counter("anagram"); cnt.most_common(2)   # [('a',3), ('n',1)]
dd = defaultdict(list); dd[k].append(v)
s & t; s | t; s - t                            # giao / hợp / hiệu

# Deque — BFS, sliding window
from collections import deque
dq.append(x); dq.appendleft(x); dq.pop(); dq.popleft()   # O(1) cả 4

# Heap — chỉ min-heap
import heapq
heapq.heappush(h, x); heapq.heappop(h)   # O(log n)
heapq.heapify(lst)                        # O(n)
heapq.nsmallest(k, lst)                   # O(n log k)
```

## 2. Idiom hay dùng

```python
from bisect import bisect_left, bisect_right, insort
from functools import cache, cmp_to_key, reduce
from itertools import combinations, permutations, product, accumulate, pairwise
from math import gcd, lcm, comb, factorial, inf

idx = bisect_left(sorted_lst, x)          # lower_bound — xem [[Binary Search]]
list(accumulate([1,2,3,4]))               # [1, 3, 6, 10] — [[Prefix Sum]]
list(pairwise([1,2,3,4]))                 # [(1,2),(2,3),(3,4)]
arr.sort(key=cmp_to_key(cmp))             # comparator tuỳ biến — [[Sorting]]

# SortedList (pip install sortedcontainers) — khi cần sorted + insert O(log n)
from sortedcontainers import SortedList

import sys; sys.setrecursionlimit(10**6)  # graph/tree lớn
```

## 3. Cạm bẫy — phần quan trọng nhất

**Số học & chia:**
- `int / int` trả **float**; integer division phải dùng `//`.
- `-7 // 2 == -4` (floor), **không** phải `-3`. Muốn truncate-toward-zero: `int(-7/2)`.
- `-7 % 2 == 1` trong Python (luôn `≥ 0`), khác C/C++/Java. Rất quan trọng khi làm prefix sum modulo ([[Prefix Sum]]).
- Python `int` vô hạn bit → không tràn, nhưng phải **cố ý mask 32-bit** khi đề yêu cầu (LC 7, 8, 371 — xem [[Bit Manipulation]]).

**Heap & comparison:**
- `heapq` **chỉ có min-heap**; max-heap → push `-x`.
- Heap so sánh tuple theo từng phần tử: push `(priority, idx, payload)` với `idx` làm tie-breaker — nếu không, `payload` không comparable (ví dụ `ListNode`) sẽ raise `TypeError` khi priority bằng nhau.

**Recursion & cache:**
- Recursion limit mặc định ~1000; Python **không có tail-call optimization**. `n > 10^5` → chuyển iterative.
- `@cache` chỉ nhận argument **hashable**: `list`/`dict`/`set` phải wrap thành `tuple`/`frozenset`.
- `@cache` đặt trên method sẽ cache **global qua mọi instance** — dùng `@cached_property` nếu muốn cache theo instance.

**Mutable & reference:**
- `def f(x=[])` — mọi lời gọi share chung list. Dùng `def f(x=None): x = x or []`.
- `result.append(path)` append **reference**; backtracking phải `result.append(path.copy())` ([[Backtracking]]).

**Sort:**
- `sorted()` là Timsort, **stable** — tận dụng để sort nhiều khoá bằng nhiều lần sort.
- Python 3 bỏ tham số `cmp=`; dùng `key=` hoặc `functools.cmp_to_key`.

## 4. Checklist áp dụng

- [ ] Có dùng `/` ở chỗ đáng ra phải là `//` không?
- [ ] Modulo có chạy trên số âm không? (Python an toàn, nhưng nói rõ nếu interviewer dùng Java/C++.)
- [ ] Heap có phải max-heap không? Đã negate chưa? Tuple đã có tie-breaker chưa?
- [ ] Hàm `@cache` có nhận list/dict làm tham số không?
- [ ] Backtracking đã `.copy()` path trước khi append chưa?
- [ ] Có `pop(0)` / `in list` / slicing nằm trong vòng lặp không? ([[Big-O Analysis]])

## Tham khảo

- [Python docs — collections](https://docs.python.org/3/library/collections.html) · [heapq](https://docs.python.org/3/library/heapq.html) · [bisect](https://docs.python.org/3/library/bisect.html) · [functools](https://docs.python.org/3/library/functools.html) · [itertools](https://docs.python.org/3/library/itertools.html)
- [Python Wiki — Time Complexity](https://wiki.python.org/moin/TimeComplexity)
- [sortedcontainers — SortedList](https://grantjenks.com/docs/sortedcontainers/sortedlist.html)
- [Python docs — Floor division & modulo semantics](https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations)

## Liên kết
[[Big-O Analysis]] · [[Heap]] · [[Backtracking]] · [[Bit Manipulation]] · [[Interview Process UMPIRE]] · [[DS&AL]]
