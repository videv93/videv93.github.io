---
tags: [dsal, technique, recursion]
status: evergreen
---
# Recursion

> Đệ quy là *ngôn ngữ tự nhiên* để mô tả bài toán **tự tương tự**. Khi ba thành phần — base case, recursive case, kết hợp — "click", bạn sẽ thấy [[Dynamic Programming]], [[Backtracking]], [[DFS]] đều là cùng một ngôn ngữ.

## 1. Ba câu hỏi trước khi code đệ quy

1. **Trạng thái** của hàm gồm những biến gì? (đủ để định nghĩa "bài con")
2. **Base case** là gì? (khi nào trả về luôn?)
3. **Bước đệ quy** chia bài lớn thành bài con thế nào, kết hợp kết quả ra sao?

## 2. Template code — ba biến thể

```python
from functools import cache

# 1) Đệ quy thuần (có thể chậm vì lặp lại bài con)
def recurse(state):
    if base_condition(state):
        return base_value
    return combine(recurse(sub1(state)), recurse(sub2(state)))

# 2) Top-down DP: thêm cache → O(số trạng thái)
@cache
def f(*state):
    if base_condition(*state):
        return base_value
    return combine(f(*sub1(*state)), f(*sub2(*state)))

# 3) Backtracking: liệt kê + undo
def backtrack(path, choices):
    if is_solution(path):
        results.append(path.copy())
        return
    for c in choices:
        if not valid(c, path): continue
        path.append(c)                       # choose
        backtrack(path, next_choices(choices, c))   # explore
        path.pop()                           # unchoose
```

## 3. Phân biệt bốn họ hàng dễ nhầm

| Thuộc tính | Recursion | [[DFS]] | [[Backtracking]] | Top-down DP |
| --- | --- | --- | --- | --- |
| Mục tiêu | Giải bài con tự gọi lại | Duyệt graph/tree | Liệt kê **tất cả** lời giải | Tối ưu / đếm |
| Có **undo** state? | Không bắt buộc | Hiếm | **Bắt buộc** | Không |
| Có **memo**? | Có thể | Hiếm | Hiếm (state phụ thuộc đường đi) | **Bắt buộc** |
| Ví dụ | Fibonacci, Pow | Number of Islands | Permutations, N-Queens | LCS, Coin Change |

Nhận diện **overlapping subproblems** → thêm `@cache` là chuyển ngay sang DP.

## 4. Cạm bẫy Python

- **Recursion limit mặc định ~1000.** Cây/list dài hơn → `sys.setrecursionlimit(10**6)` **và** tăng stack (`threading.stack_size`) nếu cần.
- **Không có tail-call optimization.** `def f(n): return f(n-1)` vẫn stack overflow.
- Đệ quy sâu trong hot loop chậm hơn iterative ~3–5×.
- **`@cache` cần argument hashable** — list/dict/set phải wrap thành tuple/frozenset ([[Python Interview Toolkit]]).
- **Quên base case cho input rỗng** (`None`, `[]`) — nguồn `RecursionError` phổ biến nhất.

## 5. Bài kinh điển

| LC | Bài | Điểm học |
| --- | --- | --- |
| [509](https://leetcode.com/problems/fibonacci-number/) | Fibonacci | Naive `O(2^n)` → memo `O(n)` |
| [50](https://leetcode.com/problems/powx-n/) | Pow(x, n) | Fast power, xử lý `n` âm |
| [206](https://leetcode.com/problems/reverse-linked-list/) | Reverse Linked List (đệ quy) | Trả head mới từ đáy lên ([[Linked List]]) |
| [22](https://leetcode.com/problems/generate-parentheses/) | Generate Parentheses | Ràng buộc `open ≤ n`, `close ≤ open` |
| [46](https://leetcode.com/problems/permutations/) | Permutations | choose/explore/unchoose |
| [78](https://leetcode.com/problems/subsets/) | Subsets | Chọn / không chọn tại mỗi index |

**Tự luyện:** LC 21, 24, 95, 96 (Catalan), 247, 779.

## 6. Checklist áp dụng

- [ ] State có đủ để định nghĩa bài con không?
- [ ] Base case đã bao gồm input rỗng/null chưa?
- [ ] Có overlapping subproblems không? (có → thêm `@cache`)
- [ ] Độ sâu đệ quy tối đa là bao nhiêu? Có vượt 1000 không?
- [ ] Đệ quy có mutate state dùng chung không? Nếu có, đã undo chưa?

## Tham khảo

- [Python docs — sys.setrecursionlimit](https://docs.python.org/3/library/sys.html#sys.setrecursionlimit) và [functools.cache](https://docs.python.org/3/library/functools.html#functools.cache)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 4: Divide-and-conquer & recurrences
- [Wikipedia — Recursion (computer science)](https://en.wikipedia.org/wiki/Recursion_(computer_science))
- [LeetCode Explore — Recursion I & II](https://leetcode.com/explore/learn/card/recursion-i/)

## Liên kết
[[Backtracking]] · [[Divide and Conquer]] · [[Dynamic Programming]] · [[DFS]] · [[Tree DP]] · [[Python Interview Toolkit]] · [[DS&AL]]
