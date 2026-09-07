---
tags: [dsal, graph]
status: evergreen
---
# Graph Representation

> Graph là cấu trúc trừu tượng nhất nhưng phổ biến nhất trong đời thực: bạn bè, đường đi, dependency. Note này là **cửa vào** của cả nhóm graph: cách biểu diễn, cách chẩn đoán đề, và bảng chọn thuật toán.

## 1. Ba cách biểu diễn

```python
from collections import defaultdict

# 1) Adjacency list — mặc định cho hầu hết bài
graph: dict[int, list[int]] = defaultdict(list)
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)         # bỏ dòng này nếu directed

# 2) Edge list — input "raw", dùng cho Kruskal
edges = [(0, 1), (1, 2), ...]

# 3) Adjacency matrix — chỉ khi V nhỏ và đồ thị dày
adj = [[0] * n for _ in range(n)]
for u, v in edges:
    adj[u][v] = 1
```

| Biểu diễn | Lookup `(u,v)` | Duyệt láng giềng `u` | Bộ nhớ |
| --- | --- | --- | --- |
| Adjacency list | `O(deg(u))` | `O(deg(u))` | `O(V + E)` |
| Edge list | `O(E)` | `O(E)` | `O(E)` |
| Adjacency matrix | `O(1)` | `O(V)` | `O(V²)` |

→ **Mặc định dùng adjacency list.** Chỉ chuyển sang matrix khi cần kiểm tra cạnh `O(1)` và `V` nhỏ (≤ 1000).

## 2. Ba câu hỏi trước khi code

1. **Có hướng hay vô hướng?** Directed phải cân nhắc chu trình.
2. **Có trọng số không?** Có → [[Dijkstra]]; không → [[BFS]] đủ.
3. **Đặc tính đặc biệt?** DAG → [[Topological Sort]]; bipartite; grid → [[Island Matrix Traversal]].

Hỏi thêm: self-loop? multi-edge? disconnected?

## 3. Chẩn đoán đề → chọn pattern

| Triệu chứng đề bài | Pattern |
| --- | --- |
| "Có đường từ A đến B?" | [[BFS]] / [[DFS]] / [[Union Find]] |
| "Số cụm / số đảo" | [[DFS]] / [[Union Find]] / [[Island Matrix Traversal]] |
| "Thứ tự thực hiện với ràng buộc" | [[Topological Sort]] |
| "Shortest path, trọng số dương" | [[Dijkstra]] |
| "Shortest path, cạnh 0/1" | 0-1 BFS (deque) |
| "Shortest path, có cạnh âm" | Bellman-Ford |
| "All-pairs shortest, V ≤ 500" | Floyd-Warshall `O(V³)` |
| "Nhỏ nhất kết nối tất cả" | [[Minimum Spanning Tree]] |
| "Bottleneck min/max trên path" | Kruskal + DSU hoặc [[Binary Search with Graph]] |
| "Bipartite?" | BFS/DFS 2-coloring |

## 4. Template duyệt cơ bản

```python
from collections import deque

def dfs(node, visited, graph):
    if node in visited: return
    visited.add(node)
    for nb in graph[node]:
        dfs(nb, visited, graph)

def dfs_iter(start, graph):
    visited, stack = set(), [start]
    while stack:
        node = stack.pop()
        if node in visited: continue
        visited.add(node)
        for nb in graph[node]:
            if nb not in visited: stack.append(nb)
    return visited

def bfs(start, graph):
    visited, queue = {start}, deque([start])
    while queue:
        node = queue.popleft()
        for nb in graph[node]:
            if nb not in visited:
                visited.add(nb); queue.append(nb)
    return visited
```

## 5. Cạm bẫy

- **Quên thêm cạnh ngược** cho đồ thị vô hướng (hoặc thêm nhầm cho directed).
- **Đánh dấu visited khi pop thay vì khi push** trong BFS → node vào queue nhiều lần, `O(V²)`.
- **Clone Graph (LC 133)**: phải đặt `old_to_new[node] = new` **trước** khi đệ quy vào neighbors, nếu không sẽ lặp vô hạn khi có chu trình.
- **Evaluate Division (LC 399)**: coi `a/b = w` là cạnh có trọng số nhân; hỏi `x/y` là tìm đường đi và **nhân** trọng số dọc đường; không có đường → `-1.0`.
- **Node không phải số nguyên liên tiếp** (là string, toạ độ…) → dùng dict thay vì list, hoặc map về index.

## 6. Bài kinh điển

| LC | Bài | Kỹ thuật |
| --- | --- | --- |
| [1971](https://leetcode.com/problems/find-if-path-exists-in-graph/) | Find if Path Exists | BFS/DFS/DSU |
| [133](https://leetcode.com/problems/clone-graph/) | Clone Graph | Map old→new đặt trước đệ quy |
| [323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) | Number of Connected Components | DFS đếm / DSU |
| [207](https://leetcode.com/problems/course-schedule/) | Course Schedule | DFS detect cycle ([[Topological Sort]]) |
| [785](https://leetcode.com/problems/is-graph-bipartite/) | Is Graph Bipartite? | BFS 2-coloring |
| [399](https://leetcode.com/problems/evaluate-division/) | Evaluate Division | DFS có trọng số nhân |

**Tự luyện:** LC 261, 332 (Eulerian path), 444, 684, 743, 947.

## 7. Checklist áp dụng

- [ ] Directed hay undirected? Đã thêm/không thêm cạnh ngược đúng chưa?
- [ ] Có trọng số không? Trọng số có âm không?
- [ ] Đồ thị có thể **disconnected** không? (phải loop qua mọi node làm start)
- [ ] Có self-loop / multi-edge không?
- [ ] `visited` được đánh dấu lúc push hay lúc pop?

## Tham khảo

- [cp-algorithms — Graph traversal](https://cp-algorithms.com/graph/depth-first-search.html) và [BFS](https://cp-algorithms.com/graph/breadth-first-search.html)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 22: Elementary Graph Algorithms
- [LeetCode Explore — Graph](https://leetcode.com/explore/learn/card/graph/)
- [William Fiset — Graph Theory playlist](https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P)

## Liên kết
[[BFS]] · [[DFS]] · [[Topological Sort]] · [[Union Find]] · [[Dijkstra]] · [[Minimum Spanning Tree]] · [[Island Matrix Traversal]] · [[DS&AL]]
