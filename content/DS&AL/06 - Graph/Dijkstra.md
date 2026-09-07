---
tags: [dsal, graph, shortest-path]
status: evergreen
---
# Dijkstra

> Tìm đường đi ngắn nhất từ một source tới mọi đỉnh trong graph **trọng số không âm**. Với heap: `O((V + E) log V)`. Cạnh âm → Bellman-Ford; cạnh đồng nhất → [[BFS]] đã đủ.

## 1. Khi nào dùng

- Graph có trọng số **không âm**, cần shortest path.
- Bài "minimum cost path", "minimum effort", "minimum sum to reach".
- Khi BFS không đủ vì các cạnh có chi phí khác nhau.

## 2. Template code

```python
import heapq

def dijkstra(graph: dict, source: int, n: int) -> list[float]:
    INF = float('inf')
    dist = [INF] * n
    dist[source] = 0
    heap = [(0, source)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:              # lazy deletion — entry cũ, bỏ qua
            continue
        for v, w in graph[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(heap, (nd, v))
    return dist
```

**Lazy deletion** (`if d > dist[u]: continue`) thay cho decrease-key: đơn giản hơn nhiều và vẫn đúng độ phức tạp.

## 3. Bảng chọn thuật toán shortest path

| Tính chất đồ thị | Thuật toán | Time |
| --- | --- | --- |
| Không trọng số (mọi cạnh = 1) | [[BFS]] | `O(V + E)` |
| Cạnh ∈ {0, 1} | **0-1 BFS** (deque: push_front cho 0, push_back cho 1) | `O(V + E)` |
| Cạnh ≥ 0 | **Dijkstra** (heap) | `O((V + E) log V)` |
| Có cạnh âm, không có vòng âm | **Bellman-Ford** | `O(V · E)` |
| Cần phát hiện vòng âm | Bellman-Ford + vòng lặp thứ `V` | `O(V · E)` |
| All-pairs, `V ≤ 500` | **Floyd-Warshall** | `O(V³)` |
| DAG | Topo order + relax | `O(V + E)` ([[Topological Sort]]) |

## 4. Cạm bẫy

- **Dùng Dijkstra với cạnh âm** → sai âm thầm. Đây là ranh giới cứng, không phải "thường thì ổn".
- **Quên lazy deletion** → xử lý lại node đã chốt, chậm nhưng vẫn đúng; hoặc dùng `visited` set thì phải cẩn thận thứ tự.
- **Cheapest Flights with K Stops (LC 787)**: state cần thêm "số stops" ⇒ **không** dùng Dijkstra thuần. Hai cách: BFS theo lớp (mỗi lớp = 1 stop) giữ `dist[node]`, hoặc Bellman-Ford `K+1` vòng.
- **Path With Minimum Effort (LC 1631)**: relax bằng `max(d, |diff|)` chứ không phải `d + w` — Dijkstra biến thể "min của max".
- **Min Cost Valid Path (LC 1368)**: đi đúng hướng cost 0, đổi hướng cost 1 ⇒ **0-1 BFS** với deque, `O(R·C)`, không cần `log` của heap.
- **Heap chứa tuple có phần tử không comparable** → thêm tie-breaker ([[Heap]]).

## 5. Bài kinh điển

| LC | Bài | Biến thể |
| --- | --- | --- |
| [743](https://leetcode.com/problems/network-delay-time/) | Network Delay Time | Dijkstra chuẩn |
| [1631](https://leetcode.com/problems/path-with-minimum-effort/) | Path With Minimum Effort | Relax min-max |
| [787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Cheapest Flights Within K Stops | Bellman-Ford K+1 vòng |
| [778](https://leetcode.com/problems/swim-in-rising-water/) | Swim in Rising Water | Dijkstra max-min ([[Union Find]]) |
| [1293](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) | Shortest Path with Obstacles Elimination | State `(r, c, k)` |
| [1368](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/) | Minimum Cost Valid Path | 0-1 BFS |

**Tự luyện:** LC 882, 1976, 2065.

## 6. Checklist áp dụng

- [ ] Có cạnh âm không? (có → Bellman-Ford, không phải Dijkstra)
- [ ] Cạnh chỉ có hai giá trị 0/1 không? (→ 0-1 BFS nhanh hơn)
- [ ] State có cần thêm chiều (số stops, số obstacle còn lại) không?
- [ ] Relax là `d + w` hay `max(d, w)` / `min(d, w)`?
- [ ] Đã có lazy deletion hoặc `visited` chưa?

## Tham khảo

- [cp-algorithms — Dijkstra](https://cp-algorithms.com/graph/dijkstra.html) và [0-1 BFS](https://cp-algorithms.com/graph/01_bfs.html)
- [cp-algorithms — Bellman-Ford](https://cp-algorithms.com/graph/bellman_ford.html) · [Floyd-Warshall](https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 24: Single-Source Shortest Paths
- [Wikipedia — Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

## Liên kết
[[Graph Representation]] · [[BFS]] · [[Heap]] · [[Minimum Spanning Tree]] · [[Binary Search with Graph]] · [[Union Find]] · [[DS&AL]]
