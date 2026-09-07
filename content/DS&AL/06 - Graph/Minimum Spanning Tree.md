---
tags: [dsal, graph, mst]
status: evergreen
---
# Minimum Spanning Tree

> MST = tập cạnh kết nối **tất cả** đỉnh với tổng trọng số nhỏ nhất, không có chu trình. Hai thuật toán: **Kruskal** (sort cạnh + DSU) và **Prim** (heap mở rộng từ một đỉnh). Cả hai đều `O(E log E)`.

## 1. Khi nào dùng

- "Kết nối tất cả N điểm/thành phố với chi phí nhỏ nhất".
- "Nâng cấp mạng / xây đường ống".
- Hỏi cạnh **critical / pseudo-critical** → biến thể MST.
- Bài **bottleneck path** (max-min hoặc min-max trên đường đi) — cùng họ.

## 2. Hai tính chất nền (nói ra để justify)

- **Cut property**: với mọi cut, cạnh **trọng số nhỏ nhất** băng qua cut nằm trong **một** MST nào đó.
- **Cycle property**: trong mọi chu trình, cạnh **trọng số lớn nhất** **không** nằm trong bất kỳ MST nào.

Hệ quả: Kruskal (chọn cạnh tăng dần) và Prim (mở rộng từ một node) đều build ra MST đúng.

## 3. Template code

```python
# Kruskal — sort edges + DSU (xem [[Union Find]])
def kruskal(n, edges):
    edges.sort(key=lambda e: e[2])
    dsu = DSU(n)
    total = 0
    for u, v, w in edges:
        if dsu.union(u, v):        # chỉ lấy khi nối 2 component khác nhau
            total += w
    return total

# Prim — heap grow
import heapq
def prim(n, graph):
    visited = [False] * n
    heap = [(0, 0)]                # (weight, node)
    total = 0
    while heap:
        w, u = heapq.heappop(heap)
        if visited[u]: continue
        visited[u] = True
        total += w
        for v, weight in graph[u]:
            if not visited[v]:
                heapq.heappush(heap, (weight, v))
    return total
```

## 4. Kruskal vs Prim

|  | Kruskal | Prim |
| --- | --- | --- |
| Cấu trúc | DSU + sort edges | Heap + visited |
| Time | `O(E log E)` | `O(E log V)` |
| Đồ thị **thưa** | ✅ Tốt | OK |
| Đồ thị **dày** | OK | ✅ Tốt hơn |
| Input cần | Edge list | Adjacency list |
| Streaming cạnh | ✅ xử lý tăng dần | ❌ |

Mental model Kruskal: *"Sort cạnh theo trọng số. Mỗi cạnh, nếu nối hai component khác nhau thì lấy. DSU theo dõi connectivity dần dần."*

## 5. Cạm bẫy

- **Quên kiểm đồ thị liên thông** — nếu cuối cùng `components > 1` thì không tồn tại spanning tree, phải trả `-1`.
- **Min Cost to Connect All Points (LC 1584)**: đồ thị **đầy đủ** với `E = O(n²)` — Prim thường tốt hơn Kruskal ở đây.
- **Optimize Water Distribution (LC 1168)**: thêm **node ảo 0** nối tới mọi nhà với chi phí đào giếng ⇒ bài trở thành MST thuần. Trick "virtual node" rất hay được hỏi.
- **Critical / Pseudo-critical edges (LC 1489)**: với mỗi cạnh, chạy MST **bỏ cạnh đó** (critical nếu tổng tăng hoặc không liên thông) và MST **bắt buộc lấy cạnh đó** (pseudo-critical nếu tổng bằng MST gốc).
- **Bottleneck path (LC 1102)**: tương đương "path mà cạnh **nhỏ nhất** dọc path là lớn nhất". Hai cách: Kruskal-style (sort cạnh **giảm dần**, union tới khi `src` và `dst` cùng component) hoặc Dijkstra max-min ([[Dijkstra]]).

**LC 1697 — offline threshold**: không phải MST nhưng cùng logic Kruskal, xem [[Union Find]].

## 6. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [1584](https://leetcode.com/problems/min-cost-to-connect-all-points/) | Min Cost to Connect All Points | Prim trên đồ thị đầy đủ |
| [1135](https://leetcode.com/problems/connecting-cities-with-minimum-cost/) | Connecting Cities With Minimum Cost | Kruskal + kiểm liên thông |
| [1168](https://leetcode.com/problems/optimize-water-distribution-in-a-village/) | Optimize Water Distribution | Virtual node 0 |
| [1489](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/) | Critical & Pseudo-Critical Edges | Chạy MST có/không cạnh |
| [1697](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/) | Edge Length Limited Paths | Offline DSU |
| [1102](https://leetcode.com/problems/path-with-maximum-minimum-value/) | Path With Maximum Minimum Value | Bottleneck path |

**Tự luyện:** LC 1722, 1971.

## 7. Checklist áp dụng

- [ ] Đồ thị có đảm bảo liên thông không? Nếu không, trả gì?
- [ ] Đồ thị thưa hay dày? (dày → Prim; thưa → Kruskal)
- [ ] Có "chi phí đứng một mình" (đào giếng, xây trạm) không? (→ virtual node)
- [ ] Bài có phải bottleneck path trá hình không?
- [ ] DSU đã có path compression + union by rank chưa?

## Tham khảo

- [cp-algorithms — MST Kruskal](https://cp-algorithms.com/graph/mst_kruskal.html) và [MST Prim](https://cp-algorithms.com/graph/mst_prim.html)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 23: Minimum Spanning Trees, chứng minh cut property
- [Wikipedia — Minimum spanning tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree)
- [USACO Guide — Minimum Spanning Trees](https://usaco.guide/gold/mst)

## Liên kết
[[Union Find]] · [[Dijkstra]] · [[Greedy]] · [[Heap]] · [[Binary Search with Graph]] · [[Graph Representation]] · [[DS&AL]]
