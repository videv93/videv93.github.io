---
tags: [dsal, technique, monotonic]
status: evergreen
---
# Monotonic Stack and Deque

> Stack/deque mà phần tử **luôn giữ tính đơn điệu**. Đây là vũ khí mạnh nhất cho họ bài "next greater/smaller", "range max/min trong sliding window", "largest rectangle". Mỗi index push 1 lần, pop tối đa 1 lần ⇒ tổng `O(n)` amortized.

## 1. Khi nào dùng

- "Next greater / smaller element".
- "Largest rectangle / area under curve".
- Cần `min/max` trong sliding window ([[Sliding Window]] không track được incremental).
- Đếm subarray theo điều kiện monotonic ("contribution của mỗi phần tử").

**Tăng hay giảm?**
- **Stack tăng dần** (đáy→đỉnh) → dùng cho "previous/next **smaller**".
- **Stack giảm dần** → dùng cho "previous/next **greater**".

## 2. Invariant — hiểu invariant là hiểu cả pattern

**Monotonic decreasing stack:**
```
Tại mọi thời điểm:  bottom → top
   [v0, v1, ..., vk]   với   v0 ≥ v1 ≥ ... ≥ vk

Khi thêm x:
   while stack[-1] < x: pop      # stack[-1] vừa tìm được next greater = x
   push x

Stack giữ các "ứng viên đang chờ next greater".
Mỗi index push 1 lần, pop ≤ 1 lần → O(n).
```

**Trace `arr = [73, 74, 75, 71, 69, 72, 76]`:**
```
i  v   Action                                Stack (index, value)
0  73  push                                  [(0,73)]
1  74  74>73 → pop (0,73), res[0]=74         [(1,74)]
2  75  75>74 → pop (1,74), res[1]=75         [(2,75)]
3  71  push                                  [(2,75),(3,71)]
4  69  push                                  [(2,75),(3,71),(4,69)]
5  72  pop (4,69) res[4]=72; pop (3,71) res[3]=72   [(2,75),(5,72)]
6  76  pop (5,72) res[5]=76; pop (2,75) res[2]=76   [(6,76)]
Result: [74, 75, 76, 72, 72, 76, -1]
```

**Monotonic deque (sliding window max):**
```
Invariant (head → tail, giảm dần):  arr[i0] ≥ arr[i1] ≥ ... ≥ arr[ik]
   • Head luôn là MAX của window hiện tại.
Khi thêm index r:
   1. Pop tail nếu arr[tail] ≤ arr[r]   (vô dụng: r mới hơn VÀ lớn hơn)
   2. Push r vào tail
   3. Pop head nếu head ≤ r - k         (ra ngoài window)
   4. Max = arr[head]
```

> Invariant là công cụ debug: nếu deque mất tính đơn điệu, hoặc head nằm ngoài window, chắc chắn code có bug.

## 3. Template code

```python
# 1) Monotonic decreasing stack — Next Greater Element
def next_greater(arr: list[int]) -> list[int]:
    n = len(arr)
    result = [-1] * n
    stack: list[int] = []                    # lưu index
    for i, v in enumerate(arr):
        while stack and arr[stack[-1]] < v:
            result[stack.pop()] = v
        stack.append(i)
    return result

# 2) Monotonic deque — Sliding Window Max
from collections import deque
def sliding_max(arr: list[int], k: int) -> list[int]:
    dq: deque[int] = deque()
    out = []
    for i, v in enumerate(arr):
        while dq and arr[dq[-1]] <= v:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(arr[dq[0]])
    return out
```

## 4. Largest Rectangle (LC 84) — sentinel trace

`heights = [2, 1, 5, 6, 2, 3]`, thêm sentinel `0` ở cuối:
```
i  h  stack(idx)  pop & compute                maxA
0  2  [0]                                       0
1  1  pop 0: h=2, w=1-0 ⇒ 2                     2
      [1]
2  5  [1,2]                                     2
3  6  [1,2,3]                                   2
4  2  pop 3: h=6, w=4-2-1=1 ⇒ 6                 6
      pop 2: h=5, w=4-1-1=2 ⇒ 10               10
      [1,4]
5  3  [1,4,5]                                  10
6  0  pop 5: h=3, w=1 ⇒ 3
      pop 4: h=2, w=4 ⇒ 8
      pop 1: h=1, w=6 ⇒ 6                      10
```
**Invariant:** stack lưu index có `h` tăng nghiêm ngặt; gặp `h` thấp hơn thì các cột cao hơn bên trái "đóng cửa" rectangle của chúng.

## 5. Cạm bẫy

- **Lưu value thay vì index** → không tính được chiều rộng.
- **Quên sentinel** (`0` cuối cho histogram, hoặc duyệt 2 vòng cho circular array LC 503).
- **Tie-break trong bài contribution** (Sum of Subarray Minimums): dùng `<` ở một bên và `≤` ở bên kia, để mỗi subarray được đếm **đúng một lần**.
- **Nhầm `<` với `≤` khi pop** → sai với phần tử bằng nhau.
- **Dùng heap cho sliding window max** → `O(n log n)` thay vì `O(n)`, và phải xử lý lazy deletion.

**Remove K Digits (LC 402) — vì sao greedy đúng:** nếu đỉnh stack `s[-1] > d_in`, xoá `s[-1]` luôn tốt hơn, vì nó nằm ở **hàng cao hơn** nên giảm giá trị số nhiều hơn.

## 6. Bài kinh điển

| LC | Bài | Cấu trúc |
| --- | --- | --- |
| [739](https://leetcode.com/problems/daily-temperatures/) | Daily Temperatures | Decreasing stack |
| [503](https://leetcode.com/problems/next-greater-element-ii/) | Next Greater Element II | Stack + duyệt 2 vòng |
| [84](https://leetcode.com/problems/largest-rectangle-in-histogram/) | Largest Rectangle in Histogram | Increasing stack + sentinel |
| [239](https://leetcode.com/problems/sliding-window-maximum/) | Sliding Window Maximum | Monotonic deque |
| [907](https://leetcode.com/problems/sum-of-subarray-minimums/) | Sum of Subarray Minimums | Contribution `a[i] × left × right` |
| [402](https://leetcode.com/problems/remove-k-digits/) | Remove K Digits | Greedy stack |

**Tự luyện:** LC 42, 316, 456, 901, 1019, 1856.

## 7. Checklist áp dụng

- [ ] Stack đang lưu **index** hay value? (nên là index)
- [ ] Cần tăng dần hay giảm dần? (smaller → tăng; greater → giảm)
- [ ] Có cần sentinel ở cuối / duyệt 2 vòng (circular) không?
- [ ] Điều kiện pop dùng `<` hay `≤`? Đã khớp với yêu cầu tie-break chưa?
- [ ] Với deque: đã pop head khi ra khỏi window chưa?

## Tham khảo

- [USACO Guide — Monotonic Stack](https://usaco.guide/gold/stacks) và [Sliding Window Minimum](https://usaco.guide/gold/sliding-window)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 8.2–8.3 (stack đơn điệu, sliding window minimum)
- [LeetCode — Monotonic Stack tag](https://leetcode.com/tag/monotonic-stack/)
- [Python docs — collections.deque](https://docs.python.org/3/library/collections.html#collections.deque)

## Liên kết
[[Stack and Queue]] · [[Sliding Window]] · [[Array]] · [[Heap]] · [[Sorting DP]] · [[DS&AL]]
