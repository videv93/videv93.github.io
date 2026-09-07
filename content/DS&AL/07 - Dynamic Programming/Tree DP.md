---
tags: [dsal, dp, tree]
status: evergreen
---
# Tree DP

> Tree DP = [[DFS]] bottom-up trên cây, mỗi node tính giá trị từ các con. Pattern đặc biệt của nhóm này: **re-rooting** — tính đáp số cho *mọi* node làm root, giảm `O(n²)` xuống `O(n)`.

## 1. Khi nào dùng

- Bài trên tree/forest cần "tính cho từng node" hoặc "tối ưu toàn cục".
- DP với 2–3 state mỗi node (rob/skip, có camera/được cover/chờ cover).
- Bài re-rooting: tổng khoảng cách từ mỗi node, đường kính từ mỗi node.

## 2. Template code

```python
# 1) Tree DP bottom-up
def dfs(node, parent):
    state = base
    for child in graph[node]:
        if child == parent: continue        # tránh quay lại cha
        state = combine(state, dfs(child, node))
    return state

# 2) Re-rooting: 2 lần DFS
#    DFS1 (post-order): down[v] = đáp số subtree của v
#    DFS2 (pre-order):  chuyển root từ parent p sang child c
```

## 3. Re-rooting — công thức tổng quát

**Pass 1 (post-order)**: tính `down[v]` = đáp số cho subtree gốc tại `v`.
**Pass 2 (pre-order)**: chuyển root từ `p` xuống `c`:
```
ans[c] = ans[p] - contribution_của_c_vào_p + contribution_của_phần_còn_lại_vào_c
```

Cụ thể với **Sum of Distances in Tree (LC 834)**:
```
ans[c] = ans[p] - size[c] + (n - size[c])
```
- Mọi node **trong subtree `c`** lại gần root hơn 1 đơn vị ⇒ giảm `size[c]`.
- Mọi node **còn lại** xa hơn 1 đơn vị ⇒ tăng `n - size[c]`.

**Trace** trên cây `0 → {1, 2, 3}`, `1 → 4`:
- Pass 1: `down[4]=0, size[4]=1`; `down[1]=1, size[1]=2`; `down[2]=down[3]=0`; `down[0] = (1+2)+(0+1)+(0+1) = 5` ⇒ `ans[0] = 5`.
- Pass 2: `ans[1] = 5 - 2 + (5-2) = 6`.

## 4. Ba bài mẫu về thiết kế state

**House Robber III (LC 337)** — trả tuple `(rob_this, skip_this)`:
`rob = node.val + skip_left + skip_right`; `skip = max(rob_left, skip_left) + max(rob_right, skip_right)`.

**Binary Tree Cameras (LC 968)** — 3 state:
- `0`: node **chưa được cover**, cần hàng xóm đặt camera
- `1`: node **có camera**
- `2`: node **đã được cover** nhưng không có camera

Luật post-order: nếu có child `= 0` ⇒ node `= 1` (đặt camera); else nếu có child `= 1` ⇒ node `= 2`; else (mọi child `= 2`) ⇒ node `= 0` (chờ cha cover).

**Diameter (LC 543)**: hàm trả về **depth**, còn đáp số toàn cục là `max(left + right)` gom dọc đường — top1 + top2, **không** phải `top1 × 2`.

## 5. Cạm bẫy

- **Nhầm giá trị trả về với đáp số toàn cục** — bug kinh điển của Diameter và Max Path Sum.
- **Quên `if child == parent: continue`** trong cây biểu diễn bằng adjacency list vô hướng → lặp vô hạn.
- **Đệ quy sâu trên cây lệch** (`n = 10^5` dạng chuỗi) → stack overflow, phải iterative hoặc tăng limit.
- **Re-rooting quên cập nhật `size`** trước khi dùng ở pass 2.
- **Minimum Edge Reversals (LC 2858)**: build graph **vô hướng** nhưng nhớ hướng gốc — cost 0 nếu đi thuận, 1 nếu ngược; sau đó re-rooting.

## 6. Bài kinh điển

| LC | Bài | State |
| --- | --- | --- |
| [337](https://leetcode.com/problems/house-robber-iii/) | House Robber III | `(rob, skip)` |
| [968](https://leetcode.com/problems/binary-tree-cameras/) | Binary Tree Cameras | 3 state 0/1/2 |
| [543](https://leetcode.com/problems/diameter-of-binary-tree/) | Diameter of Binary Tree | Trả depth, gom `L+R` |
| [2246](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/) | Longest Path With Different Adjacent Characters | Diameter có ràng buộc |
| [834](https://leetcode.com/problems/sum-of-distances-in-tree/) | Sum of Distances in Tree | **Re-rooting** |
| [2858](https://leetcode.com/problems/minimum-edge-reversals-so-every-node-is-reachable/) | Minimum Edge Reversals | Re-rooting có hướng |

**Tự luyện:** LC 124 ([[Advanced Tree]]), 543.

## 7. Checklist áp dụng

- [ ] Mỗi node cần bao nhiêu state? Đã liệt kê hết chưa?
- [ ] Giá trị trả về có khác đáp số toàn cục không?
- [ ] Cây cho bằng `TreeNode` hay adjacency list? (list → cần tránh quay lại parent)
- [ ] Đề có hỏi cho **mọi** node làm root không? (→ re-rooting)
- [ ] Độ sâu tối đa có tràn stack không?

## Tham khảo

- [USACO Guide — Tree DP](https://usaco.guide/gold/dp-trees) và [Rerooting](https://usaco.guide/plat/rerooting)
- [cp-algorithms — Tree algorithms](https://cp-algorithms.com/graph/tree_painting.html)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 14: Tree algorithms
- [CSES — Tree Algorithms section](https://cses.fi/problemset/list/) (Tree Distances I & II là bài re-rooting chuẩn)

## Liên kết
[[DFS]] · [[Dynamic Programming]] · [[Advanced Tree]] · [[Recursion]] · [[Graph Representation]] · [[DS&AL]]
