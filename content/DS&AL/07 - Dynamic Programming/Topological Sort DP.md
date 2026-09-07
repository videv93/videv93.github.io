---
tags: [dsal, dp, graph]
status: evergreen
---
# Topological Sort DP

> DP trên DAG = [[Topological Sort]] + DP tuyến tính theo thứ tự topo. Topo order đảm bảo: khi tính `dp[v]`, mọi `dp[u]` với `u → v` đã xong.

## 1. Khi nào dùng

- DAG có dependency rõ ràng.
- Longest / shortest path trên DAG (**longest path trên graph tổng quát là NP-hard, trên DAG thì `O(V+E)`**).
- Đếm số đường đi, transitive closure, aggregation dọc DAG.

## 2. Ba mẫu chính

| Mẫu | Bài tiêu biểu |
| --- | --- |
| Longest path on DAG | LC 329 Longest Increasing Path in a Matrix |
| Counting paths | LC 1976 Number of Ways to Arrive at Destination |
| Reachability closure | LC 1462 Course Schedule IV |
| Dependency scheduling | LC 1136, LC 2050 Parallel Courses |
| Aggregation dọc DAG | LC 1857 Largest Color Value |

## 3. Khung code

```python
from collections import defaultdict, deque

order = topo_sort_kahn(n, edges)          # xem [[Topological Sort]]
dp = [base] * n
for u in order:
    for v in graph[u]:
        dp[v] = combine(dp[v], dp[u])     # cập nhật SAU khi u đã hoàn tất
if len(order) != n:
    return -1                              # có chu trình
```

Hai điểm cốt lõi: **cập nhật `dp[v]` từ `dp[u]`** (push style) và **kiểm chu trình** bằng `len(order) != n`.

## 4. Ba bài mẫu

**Largest Color Value (LC 1857)** — `dp[node][color]` = số node màu `color` nhiều nhất trên đường đi kết thúc tại `node`:
```
với mỗi cạnh u → v:  dp[v][c] = max(dp[v][c], dp[u][c] + (1 nếu color[v] == c else 0))
```
Chỉ chốt `dp[v]` sau khi đã xét **tất cả** parent. Còn node chưa visit sau topo ⇒ có cycle ⇒ trả `-1`.

**Course Schedule IV (LC 1462)** — transitive closure: với mỗi cạnh `u → v`, `closure[v] |= closure[u]`; trả lời query `(a, b)` bằng `a in closure[b]`. Dùng bitmask khi `n ≤ 100` ([[Bitmask DP]]).

**Find All Possible Recipes (LC 2115)** — một ingredient có thể **vừa** là nguyên liệu thô **vừa** là tên một recipe khác. Build cạnh `ingredient → recipe`; topo từ các supply có sẵn; khi mọi ingredient của một recipe đã sẵn sàng, recipe đó vào output và **bản thân nó trở thành ingredient** cho recipe khác.

## 5. Cạm bẫy

- **Đảo chiều cạnh** — nhất quán với quy ước ở [[Topological Sort]]: `prerequisites[i] = [u, v]` nghĩa "học `u` trước `v`" ⇒ cạnh `u → v`.
- **Chốt `dp[v]` quá sớm** khi chưa xét hết parent.
- **Longest Increasing Path in a Matrix (LC 329)**: dễ nhất là DFS + memo (DAG ngầm, cạnh đi từ ô nhỏ sang ô lớn); Kahn cũng làm được nhưng dài hơn.
- **Quên trả `-1` khi có chu trình.**
- **Parallel Courses III (LC 2050)**: `dp[v] = max(dp[u]) + time[v]` — là **longest path có trọng số**, không phải đếm lớp.

## 6. Bài kinh điển

| LC | Bài |
| --- | --- |
| [329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) | Longest Increasing Path in a Matrix |
| [2050](https://leetcode.com/problems/parallel-courses-iii/) | Parallel Courses III |
| [1857](https://leetcode.com/problems/largest-color-value-in-a-directed-graph/) | Largest Color Value in a Directed Graph |
| [2392](https://leetcode.com/problems/build-a-matrix-with-conditions/) | Build a Matrix With Conditions |
| [1462](https://leetcode.com/problems/course-schedule-iv/) | Course Schedule IV |
| [2115](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/) | Find All Possible Recipes from Given Supplies |

**Tự luyện:** LC 1462, 2192.

## 7. Checklist áp dụng

- [ ] Đồ thị có phải DAG không? Đã kiểm cycle chưa?
- [ ] Chiều cạnh có khớp với mô tả đề không? (vẽ 2 cạnh ra kiểm)
- [ ] `dp[v]` chỉ được đọc sau khi mọi parent đã xử lý?
- [ ] Có trọng số trên node/cạnh không? (→ longest path có trọng số)
- [ ] Với closure: `n` nhỏ đủ để dùng bitmask không?

## Tham khảo

- [cp-algorithms — Topological Sort](https://cp-algorithms.com/graph/topological-sort.html)
- [USACO Guide — DP on DAGs / Topological Sort](https://usaco.guide/gold/toposort)
- [Wikipedia — Longest path problem](https://en.wikipedia.org/wiki/Longest_path_problem) — vì sao DAG là ca dễ
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 16: Directed graphs

## Liên kết
[[Topological Sort]] · [[Dynamic Programming]] · [[Graph Representation]] · [[Bitmask DP]] · [[DFS]] · [[DS&AL]]
