---
tags: [dsal, data-structure, stack, queue]
status: evergreen
---
# Stack and Queue

> Stack (LIFO) và Queue (FIFO) là cặp đôi ngược nhau. **Stack giải mọi bài có cấu trúc lồng** (ngoặc, expression, nested structure); **Queue phục vụ duyệt theo lớp** ([[BFS]]) và cửa sổ trượt.

## 1. Khi nào dùng

**Stack** hợp khi:
- Có cấu trúc **lồng / balanced**: ngoặc, tag HTML, biểu thức lồng nhau.
- Cần "undo" — bước trước phải xử lý xong *sau* bước hiện tại (DFS iterative).
- Bài "next greater element", "largest rectangle", "daily temperatures" → [[Monotonic Stack and Deque]].

**Queue** hợp khi:
- Duyệt theo lớp / BFS ([[BFS]]).
- Sliding window max/min → monotonic deque.
- Producer-consumer, task scheduler.

## 2. Template code

```python
from collections import deque

# 1) Stack bằng list — O(1) amortized
stack: list[int] = []
stack.append(x); top = stack[-1]; val = stack.pop()

# 2) Queue bằng deque — O(1) cả hai đầu (đừng dùng list.pop(0): O(n))
queue: deque[int] = deque()
queue.append(x); val = queue.popleft()

# 3) Stack lưu (index, value) — nền của monotonic stack
stack: list[tuple[int, int]] = []
for i, v in enumerate(arr):
    while stack and stack[-1][1] < v:
        idx, _ = stack.pop()
        ...            # idx vừa tìm được "next greater" = v
    stack.append((i, v))
```

## 3. Stack chứa gì? — mental model

| Mục đích | Stack chứa | Bài ví dụ |
| --- | --- | --- |
| Match cặp đối xứng | Ngoặc mở / token đang chờ đóng | LC 20, 1249 |
| Lưu token trước đó chưa hoàn tất | Số / chuỗi cần "expand" sau | LC 394 Decode String |
| Undo / context | Phép tính cha | LC 224 Calculator ([[String Parser]]) |
| Monotonic | Index/value tăng hoặc giảm | [[Monotonic Stack and Deque]] |
| Iterative DFS | Frame call | Tree inorder iterative ([[DFS]]) |

## 4. Cạm bẫy

- **`list.pop(0)` cho queue** → `O(n)` mỗi lần, biến BFS thành `O(n²)`. Luôn dùng `deque`.
- **RPN (LC 150) — thứ tự operand**: pop `b` trước, `a` sau, tính `a op b`. Nhầm thứ tự là bug điển hình với `-` và `/`.
- **Quên kiểm tra stack rỗng** trước `stack[-1]` / `stack.pop()`.
- **Valid Parentheses**: quên check stack còn thừa ở cuối (`"(("` phải trả `False`).
- **Decode String**: quên reset `num` và `cur` sau mỗi `[` — trace tay là cách nhanh nhất để thấy.

**Decode String (LC 394) — trace `3[a2[c]]`:**

| Bước | Char | num | cur | numStack | strStack |
| --- | --- | --- | --- | --- | --- |
| 0 | `3` | 3 | `""` | `[]` | `[]` |
| 1 | `[` | 0 | `""` | `[3]` | `[""]` |
| 2 | `a` | 0 | `"a"` | `[3]` | `[""]` |
| 3 | `2` | 2 | `"a"` | `[3]` | `[""]` |
| 4 | `[` | 0 | `""` | `[3,2]` | `["", "a"]` |
| 5 | `c` | 0 | `"c"` | `[3,2]` | `["", "a"]` |
| 6 | `]` | 0 | `"acc"` | `[3]` | `[""]` |
| 7 | `]` | 0 | `"accaccacc"` | `[]` | `[]` |

## 5. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [20](https://leetcode.com/problems/valid-parentheses/) | Valid Parentheses | Map đóng→mở + check rỗng cuối |
| [155](https://leetcode.com/problems/min-stack/) | Min Stack | Pair stack `(val, cur_min)` hoặc aux stack |
| [232](https://leetcode.com/problems/implement-queue-using-stacks/) | Implement Queue using Stacks | Hai stack, amortized `O(1)` |
| [150](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | Evaluate RPN | Thứ tự pop `b` rồi `a` |
| [739](https://leetcode.com/problems/daily-temperatures/) | Daily Temperatures | Teaser monotonic stack |
| [394](https://leetcode.com/problems/decode-string/) | Decode String | Hai stack (num + str) |

**Tự luyện:** LC 32, 71, 84, 225, 622, 933, 946.

**Min Stack — hai cách:** pair stack `(val, current_min)` (đơn giản, `O(n)` bộ nhớ) vs aux stack chỉ push khi `val ≤ current_min` (tiết kiệm hơn khi nhiều giá trị lớn).

## 6. Checklist áp dụng

- [ ] Queue có đang dùng `deque` không (không phải `list.pop(0)`)?
- [ ] Đã check stack rỗng trước mọi `pop()` / `[-1]` chưa?
- [ ] Với bài ngoặc: đã check stack rỗng ở **cuối** chưa?
- [ ] Với RPN / calculator: thứ tự operand đúng chưa?
- [ ] Bài này có thật sự là monotonic stack không? (nếu "next greater/smaller" → có)

## Tham khảo

- [Python docs — collections.deque](https://docs.python.org/3/library/collections.html#collections.deque)
- [LeetCode Explore — Queue & Stack](https://leetcode.com/explore/learn/card/queue-stack/)
- [Wikipedia — Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 10.1: Stacks and queues

## Liên kết
[[Monotonic Stack and Deque]] · [[BFS]] · [[DFS]] · [[String Parser]] · [[Recursion]] · [[DS&AL]]
