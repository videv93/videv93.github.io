---
tags: [dsal, graph, dfs, tree]
status: evergreen
---
# DFS

> DFS đi **sâu nhất có thể** rồi mới quay lui. Đây là ngôn ngữ tự nhiên của mọi bài cây: depth, path sum, validate, LCA. Điều cần nắm không phải "cách duyệt" mà là **thiết kế giá trị trả về**.

## 1. Khi nào dùng

- Cây / DAG / graph cần duyệt theo độ sâu.
- Tính giá trị **bottom-up** (giá trị node phụ thuộc các con).
- Tìm **path** từ root đến lá thoả điều kiện.
- Khi **không** cần đường đi ngắn nhất — chỉ cần có/không/đếm/liệt kê.

## 2. Định dạng input chuẩn (tree)

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
```
`Input: root = [1, 2, 3, null, 4]` là **level-order serialize** của LeetCode: đọc theo BFS, `null` là vị trí thiếu con. Cây thực tế: `1` là root, `2`/`3` là con trái/phải, `2.left = None`, `2.right = TreeNode(4)`.

## 3. Ba mẫu DFS trên cây

```python
# 1) Bottom-up: trả giá trị từ con lên
def dfs_bottom_up(node) -> int:
    if not node: return 0
    left, right = dfs_bottom_up(node.left), dfs_bottom_up(node.right)
    return combine(node.val, left, right)

# 2) Top-down: truyền state xuống
def dfs_top_down(node, state) -> None:
    if not node: return
    new_state = update(state, node.val)
    if is_leaf(node):
        ...  # ghi kết quả
        return
    dfs_top_down(node.left, new_state)
    dfs_top_down(node.right, new_state)

# 3) Iterative bằng stack
def dfs_iter(root):
    stack = [root]
    while stack:
        node = stack.pop()
        if not node: continue
        ...                       # visit
        stack.append(node.right)
        stack.append(node.left)   # left lên top trước
```

## 4. Thiết kế giá trị trả về — cốt lõi của Tree DP

```
def dfs(node):
    if not node: return base
    L, R = dfs(node.left), dfs(node.right)
    # combine L, R với node.val → đáp số cho subtree này
    # CẬP NHẬT đáp số toàn cục nếu cần
    return result_to_pass_up
```
⚠️ Cái **trả về** ≠ cái **đáp số toàn cục**. Ví dụ Diameter: trả về *depth*, còn đáp số là max của `L + R` gom dọc đường. Xem thêm [[Tree DP]].

## 5. Traversal order cheat sheet

| Traversal | Khi nào dùng |
| --- | --- |
| **Pre-order** (root → L → R) | Serialize, clone, copy |
| **In-order** (L → root → R) | BST xuất ra dãy tăng, kth smallest |
| **Post-order** (L → R → root) | Tổng hợp từ con (tree DP, diameter) |
| **Level-order** | Theo tầng, distance ([[BFS]]) |

## 6. Cạm bẫy

- **Validate BST bằng cách chỉ so với con trực tiếp** — SAI. Phải truyền bound `(lo, hi)`: sang trái cập nhật `hi = node.val`, sang phải cập nhật `lo = node.val`.
- **Stack overflow** trên cây lệch / grid lớn — đổi sang iterative hoặc `sys.setrecursionlimit` ([[Recursion]]).
- **Quên `if not node: return`** — `AttributeError` ngay test đầu.
- **Trong graph (không phải tree): quên `visited`** → lặp vô hạn khi có chu trình.
- **Path Sum II**: phải `.copy()` path khi ghi kết quả ([[Backtracking]]).

**House Robber III — trace `(rob, skip)`** trên cây `3 / (2 → 3), (3 → 1)`:
lá `3` → `(3,0)`; lá `1` → `(1,0)`; node `2` → `rob=2, skip=max(3,0)=3` ⇒ `(2,3)`; node `3` phải → `(3,1)`; root `3` → `rob = 3+3+1 = 7`, `skip = 3+3 = 6` ⇒ `max = 7`.

**LCA — ba biến thể:**

| Loại cây | Cách |
| --- | --- |
| Binary tree thường | Đệ quy bottom-up, trả node nếu chứa `p` hoặc `q` (LC 236) |
| BST | So value với root, đi một nhánh (LC 235) — `O(log n)` |
| Có parent pointer | Hash tổ tiên của `p`, đi từ `q` lên |

## 7. Bài kinh điển

| LC | Bài | Mẫu |
| --- | --- | --- |
| [104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Maximum Depth of Binary Tree | Bottom-up |
| [113](https://leetcode.com/problems/path-sum-ii/) | Path Sum II | Top-down + backtrack |
| [797](https://leetcode.com/problems/all-paths-from-source-to-target/) | All Paths From Source to Target | DFS trên DAG |
| [98](https://leetcode.com/problems/validate-binary-search-tree/) | Validate BST | Bound `(lo, hi)` |
| [337](https://leetcode.com/problems/house-robber-iii/) | House Robber III | Trả tuple `(rob, skip)` |
| [236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | LCA of a Binary Tree | Bottom-up trả node |

**Tự luyện:** LC 100, 101, 110, 124, 129, 144, 257.

## 8. Checklist áp dụng

- [ ] Bài là bottom-up, top-down, hay hỗn hợp?
- [ ] Cái trả về có khác cái đáp số toàn cục không? Đã tách rõ chưa?
- [ ] Với BST: đã truyền bound thay vì so sánh cục bộ chưa?
- [ ] Với graph: đã có `visited` chưa?
- [ ] Độ sâu tối đa có gây stack overflow không?

## Tham khảo

- [cp-algorithms — Depth First Search](https://cp-algorithms.com/graph/depth-first-search.html)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 22.3, phần edge classification
- [LeetCode Explore — Binary Tree](https://leetcode.com/explore/learn/card/data-structure-tree/)
- [USACO Guide — Depth First Search](https://usaco.guide/silver/dfs)

## Liên kết
[[Graph Representation]] · [[BFS]] · [[Tree DP]] · [[Recursion]] · [[Backtracking]] · [[Advanced Tree]] · [[Island Matrix Traversal]] · [[DS&AL]]
