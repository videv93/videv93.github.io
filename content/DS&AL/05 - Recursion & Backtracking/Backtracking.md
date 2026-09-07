---
tags: [dsal, technique, backtracking]
status: evergreen
---
# Backtracking

> Backtracking = [[DFS]] kèm **undo** state khi quay lui. Đây là pattern để **liệt kê** mọi cấu hình hợp lệ. Bí mật của backtracking hiệu quả không phải template, mà là **pruning** — cắt nhánh sớm khi biết chắc không dẫn tới nghiệm.

## 1. Khi nào dùng

- Cần **liệt kê tất cả** nghiệm (không chỉ đếm — đếm thì thường là [[Dynamic Programming]]).
- Cấu trúc đệ quy + nhiều lựa chọn tại mỗi bước.
- Không có optimal substructure → DP không áp dụng được.

**3 thành phần:** Choice (tại mỗi bước có lựa chọn nào?) · Constraint (lựa chọn nào hợp lệ?) · Goal (khi nào dừng và ghi kết quả?).

## 2. Template code

```python
def backtrack(path, choices):
    if is_goal(path):
        result.append(path.copy())      # .copy() — bắt buộc!
        return
    for c in choices:
        if not valid(c, path):
            continue
        path.append(c)                          # choose
        backtrack(path, next_choices(choices, c))  # explore
        path.pop()                              # unchoose
```

Mantra: **choose → explore → unchoose**.

## 3. Schema — trả lời trước khi code

| Thành phần | Câu hỏi |
| --- | --- |
| **Path** | List / string / bitmask? |
| **Choice list** | Từ `n` phần tử, hay vị trí, hay chữ số 1..9? |
| **Goal test** | Khi nào ghi nhận / return? |
| **Pruning** | Loại sớm được không? Sort trước để skip dup? |
| **Undo** | Pop list, xoá khỏi set, hay đổi lại mask? |

**Cây quyết định — Permutations của `[1,2,3]`:**
```
[]
    /   |    \
   1    2     3
 / |    | \   | \
2  3    1  3  1  2
|  |    |  |  |  |
3  2    3  1  2  1
```
Mỗi đường root→leaf là một hoán vị. Backtrack = DFS trên cây ảo này.

## 4. Xử lý duplicate — hai công thức phải thuộc

**Subsets II** (sort + skip dup ở **cùng level**):
```python
nums.sort()
for i in range(start, n):
    if i > start and nums[i] == nums[i-1]: continue
    path.append(nums[i]); dfs(i + 1); path.pop()
```

**Permutations II** (dùng mảng `used`):
```python
nums.sort()
for i in range(n):
    if used[i]: continue
    if i > 0 and nums[i] == nums[i-1] and not used[i-1]: continue  # giữ thứ tự
```

**N-Queens / Sudoku — constraint sets:**
- Cột: `cols`
- Đường chéo `/`: cùng `r + c` → `pos_diag`
- Đường chéo `\`: cùng `r - c` → `neg_diag`
- Sudoku thêm: `rows[r]`, `cols[c]`, `boxes[(r//3)*3 + c//3]`

## 5. Cạm bẫy

- **`result.append(path)` không `.copy()`** → mọi kết quả trỏ về cùng một list rỗng. Bug số một.
- **Quên `path.pop()`** → state rò rỉ sang nhánh anh em.
- **Skip duplicate sai điều kiện** (`i > 0` thay vì `i > start`) → mất nghiệm hợp lệ.
- **Không prune** → `O(n!)` thật sự chạy, TLE ở `n = 9` (Sudoku).
- **Expression Add Operators (LC 282)**: vì `*` ưu tiên cao hơn, khi nhân phải **rút lại** operand trước: `cur_total - prev_operand + prev_operand * num`.
- **Word Search II**: sau khi tìm thấy word, set `node.word = None` để không thêm hai lần ([[Trie]]).

## 6. Bài kinh điển

| LC | Bài | Điểm học |
| --- | --- | --- |
| [77](https://leetcode.com/problems/combinations/) | Combinations | Giới hạn `start`, prune theo số còn lại |
| [90](https://leetcode.com/problems/subsets-ii/) | Subsets II | Skip dup cùng level |
| [47](https://leetcode.com/problems/permutations-ii/) | Permutations II | `used` array |
| [17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Letter Combinations | Tích Descartes |
| [39](https://leetcode.com/problems/combination-sum/) | Combination Sum | Tái sử dụng phần tử: `dfs(i)` không phải `dfs(i+1)` |
| [131](https://leetcode.com/problems/palindrome-partitioning/) | Palindrome Partitioning | Precompute bảng palindrome |
| [51](https://leetcode.com/problems/n-queens/) | N-Queens | 3 constraint set |
| [37](https://leetcode.com/problems/sudoku-solver/) | Sudoku Solver | Constraint propagation |
| [79](https://leetcode.com/problems/word-search/) | Word Search | Mark visited in-place, undo sau |
| [140](https://leetcode.com/problems/word-break-ii/) | Word Break II | Memo trả **danh sách** kết quả |
| [93](https://leetcode.com/problems/restore-ip-addresses/) | Restore IP Addresses | Prune theo độ dài còn lại |
| [282](https://leetcode.com/problems/expression-add-operators/) | Expression Add Operators | `prev_operand` cho phép nhân |

**Tự luyện:** LC 78, 46, 22, 980, 1255.

## 7. Checklist áp dụng

- [ ] Đã `.copy()` path trước khi append vào result chưa?
- [ ] Mỗi `append`/`add` đều có `pop`/`remove` tương ứng chưa?
- [ ] Có duplicate trong input không? Đã sort + skip đúng công thức chưa?
- [ ] Prune được ở đâu? (ngân sách còn lại, độ dài còn lại, constraint set)
- [ ] Đề hỏi **liệt kê** hay **đếm**? (đếm → cân nhắc DP)

## Tham khảo

- [Wikipedia — Backtracking](https://en.wikipedia.org/wiki/Backtracking) và [Eight queens puzzle](https://en.wikipedia.org/wiki/Eight_queens_puzzle)
- [LeetCode Explore — Recursion II (Backtracking)](https://leetcode.com/explore/learn/card/recursion-ii/)
- [USACO Guide — Complete Search / Recursion](https://usaco.guide/bronze/intro-complete)
- [Peter Norvig — Solving Every Sudoku Puzzle](https://norvig.com/sudoku.html) — constraint propagation + search

## Liên kết
[[Recursion]] · [[DFS]] · [[Dynamic Programming]] · [[Trie]] · [[Bitmask DP]] · [[DS&AL]]
