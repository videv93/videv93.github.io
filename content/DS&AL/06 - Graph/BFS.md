---
tags: [dsal, graph, bfs]
status: evergreen
---
# BFS

> BFS duyệt theo **lớp**. Đặc tính then chốt: nếu mọi cạnh có trọng số **bằng nhau**, BFS từ source cho ra **đường đi ngắn nhất** tới mọi đỉnh. Đó là lý do BFS xuất hiện ở mọi bài "số bước tối thiểu".

## 1. Khi nào dùng

- Shortest path trong graph **không trọng số** (hoặc trọng số đồng nhất).
- "Số bước tối thiểu" để biến state này thành state khác.
- Duyệt **level by level** (level-order traversal, lớp của grid).
- **Multi-source BFS** khi nhiều nguồn cùng lan toả.
- Graph **ngầm** (state space): Word Ladder, Open Lock, Snakes & Ladders.

**Phân biệt với [[DFS]]:** BFS = path ngắn nhất, theo lớp. DFS = thám hiểm sâu, connectivity, đếm component.

## 2. Template code — ba biến thể

```python
from collections import deque

# 1) BFS chuẩn — shortest path start → target
def bfs_shortest(start, target, neighbors_fn) -> int:
    if start == target: return 0
    visited = {start}
    queue = deque([(start, 0)])
    while queue:
        node, dist = queue.popleft()
        for nb in neighbors_fn(node):
            if nb == target: return dist + 1
            if nb not in visited:
                visited.add(nb)                 # đánh dấu khi PUSH
                queue.append((nb, dist + 1))
    return -1

# 2) BFS theo lớp — không cần lưu distance trong queue
def bfs_by_level(start, neighbors_fn):
    visited, queue, level = {start}, deque([start]), 0
    while queue:
        for _ in range(len(queue)):             # chốt size đầu mỗi lớp
            node = queue.popleft()
            for nb in neighbors_fn(node):
                if nb not in visited:
                    visited.add(nb); queue.append(nb)
        level += 1

# 3) Multi-source BFS — đẩy tất cả nguồn vào queue từ đầu
queue = deque(sources)
visited = set(sources)
```

## 3. State design — đa dạng hơn bạn nghĩ

| State | Bài tiêu biểu |
| --- | --- |
| `node` | Shortest path graph không trọng số |
| `(r, c)` | Grid ([[Island Matrix Traversal]]) |
| `word` | Word Ladder |
| `(r, c, k_remaining)` | Shortest Path with K Obstacles |
| `board_serialized` | Sliding Puzzle, Open Lock |
| `bitmask_visited` | Shortest Path Visiting All Nodes ([[Bitmask DP]]) |
| `(node, parity)` | Bài chẵn/lẻ số bước |

Thiết kế state là 80% công việc; khi state đúng, code BFS chỉ là template.

## 4. Cạm bẫy

- **Đánh dấu `visited` khi pop thay vì khi push** → node vào queue nhiều lần, blow-up bộ nhớ.
- **Dùng `list.pop(0)`** thay `deque.popleft()` → `O(n)` mỗi lần ([[Stack and Queue]]).
- **Off-by-one khi đếm bước** — dùng BFS theo lớp để tránh, hoặc lưu `(node, dist)` cho rõ ràng.
- **Word Ladder neighbor generation**: wildcard map `h*t → {hot, hat, hit}` precompute `O(N·L)`, lookup `O(L)`; brute thử 26 chữ mỗi vị trí là `O(L·26)` mỗi node — chậm khi `N` lớn.
- **Snakes & Ladders — chuyển 1D ↔ 2D serpentine**:
```
row_from_bottom = (i - 1) // n
col_in_row      = (i - 1) % n
r = n - 1 - row_from_bottom
c = col_in_row if row_from_bottom % 2 == 0 else n - 1 - col_in_row
```
Bug điển hình: quên đảo chiều hàng lẻ, hoặc lẫn index 0/1.

**Distance: level BFS vs lưu trong queue** — level BFS gọn khi mọi node cùng lớp có cùng dist; lưu `(node, d)` linh hoạt hơn nhưng tốn bộ nhớ.

## 5. Bài kinh điển

| LC | Bài | Biến thể |
| --- | --- | --- |
| [102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Binary Tree Level Order Traversal | BFS theo lớp |
| [994](https://leetcode.com/problems/rotting-oranges/) | Rotting Oranges | Multi-source |
| [127](https://leetcode.com/problems/word-ladder/) | Word Ladder | Graph ngầm + wildcard map |
| [752](https://leetcode.com/problems/open-the-lock/) | Open the Lock | State = chuỗi 4 chữ số |
| [1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/) | Shortest Path in Binary Matrix | 8 hướng |
| [909](https://leetcode.com/problems/snakes-and-ladders/) | Snakes and Ladders | 1D ↔ 2D serpentine |

**Tự luyện:** LC 199, 207, 286, 542, 815, 847, 994.

## 6. Checklist áp dụng

- [ ] Mọi cạnh có cùng trọng số không? (không → Dijkstra / 0-1 BFS)
- [ ] `visited` đánh dấu lúc **push** chưa?
- [ ] State đã đủ để phân biệt hai tình huống khác nhau chưa?
- [ ] Có nhiều nguồn không? (→ multi-source, đẩy hết vào queue lúc đầu)
- [ ] Đếm bước bằng level hay bằng `(node, dist)`? Đã tránh off-by-one chưa?

## Tham khảo

- [cp-algorithms — Breadth-first search](https://cp-algorithms.com/graph/breadth-first-search.html) và [0-1 BFS](https://cp-algorithms.com/graph/01_bfs.html)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 22.2
- [LeetCode Explore — Queue & Stack: BFS](https://leetcode.com/explore/learn/card/queue-stack/)
- [USACO Guide — Breadth First Search](https://usaco.guide/silver/bfs)

## Liên kết
[[Graph Representation]] · [[DFS]] · [[Island Matrix Traversal]] · [[Dijkstra]] · [[Topological Sort]] · [[Stack and Queue]] · [[DS&AL]]
