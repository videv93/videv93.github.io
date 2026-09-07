---
tags: [dsal, graph, topological-sort]
status: evergreen
---
# Topological Sort

> Sắp xếp đỉnh của **DAG** sao cho mọi cạnh `u → v` thì `u` đứng **trước** `v`. Bắt buộc cho mọi bài "hoàn thành theo thứ tự phụ thuộc": build system, task scheduler, course prerequisites.

## 1. Quy ước hướng cạnh — đọc kỹ, đây là lỗi phổ biến nhất

```
Mô tả thực tế              Cạnh trong graph      Indegree
────────────────────────────────────────────────────────────
"a must come before b"     a → b                 indeg[b] += 1
"b depends on a"           a → b                 indeg[b] += 1
"a is prerequisite of b"   a → b                 indeg[b] += 1
────────────────────────────────────────────────────────────
LC 207/210:  prerequisites[i] = [course, prereq] = [b, a]
             ⇒ cạnh a → b (prereq → course)
LC 269 Alien Dict: words[i] < words[i+1] theo lex
             ⇒ ký tự khác nhau đầu tiên c1 < c2 ⇒ cạnh c1 → c2
```

**Kahn's invariant:** pop node có `indeg == 0` ⟺ "không còn ai phải xong trước nó".

Khi gặp đề có wording lạ, **vẽ 2–3 cạnh ra giấy** trước khi code.

## 2. Hai thuật toán

**Kahn (BFS, indegree)** — mặc định, vì dễ mở rộng cho "min levels":
```python
from collections import defaultdict, deque

def topo_sort_kahn(n: int, edges) -> list[int]:
    graph, indeg = defaultdict(list), [0] * n
    for u, v in edges:
        graph[u].append(v); indeg[v] += 1
    queue = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while queue:
        u = queue.popleft(); order.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0: queue.append(v)
    return order if len(order) == n else []      # rỗng = có chu trình
```

**DFS post-order** — duyệt DFS, push node vào stack khi xong, reverse stack. Cả hai đều `O(V + E)`.

## 3. Bốn kết quả suy ra được từ Kahn

1. **Detect cycle**: `len(order) != V` ⇒ có chu trình.
2. **Min levels** (thời gian song song tối thiểu): đếm số lần xử lý hết một "lớp" queue.
3. **Uniqueness**: nếu queue **luôn** có đúng 1 phần tử ⇒ topo order duy nhất (LC 444). Có ≥ 2 ứng viên tại một bước ⇒ nhiều thứ tự hợp lệ.
4. **DP trên DAG**: topo order cho phép tính `dp[node]` chỉ dựa trên `dp[predecessors]` — xem [[Topological Sort DP]].

## 4. Cạm bẫy

- **Vẽ cạnh ngược chiều** — lỗi #1. Luôn kiểm bằng ví dụ 2 cạnh.
- **Quên node cô lập** (indegree 0, không có cạnh nào) — vẫn phải nằm trong order.
- **Alien Dictionary (LC 269) — invalid prefix**: nếu `w_i` là prefix của `w_{i-1}` (ví dụ `["abc","ab"]`) thì từ điển **không hợp lệ** → trả `""`. Phải kiểm **trước** khi build edges.
- **Sort Items by Groups (LC 1203) — DAG hai lớp**:
```
Item DAG:  5 → 6,  7 → 8,  6 → 7
Group DAG: A → B   (vì 6 → 7, mà 6 ∈ A, 7 ∈ B)
⇒ topo trên group, rồi topo item trong từng group
```
Item không thuộc group nào (`-1`) phải gán group ảo riêng.
- **Minimum Height Trees (LC 310)**: không phải topo thường mà là **bóc lá dần** (peeling) cho tới khi còn ≤ 2 node.

## 5. Bài kinh điển

| LC | Bài | Điểm học |
| --- | --- | --- |
| [210](https://leetcode.com/problems/course-schedule-ii/) | Course Schedule II | Kahn cơ bản + detect cycle |
| [269](https://leetcode.com/problems/alien-dictionary/) | Alien Dictionary | Build graph từ so sánh lex |
| [310](https://leetcode.com/problems/minimum-height-trees/) | Minimum Height Trees | Bóc lá dần |
| [1203](https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/) | Sort Items by Groups | Topo hai lớp |
| [444](https://leetcode.com/problems/sequence-reconstruction/) | Sequence Reconstruction | Kiểm tính duy nhất |
| [1136](https://leetcode.com/problems/parallel-courses/) | Parallel Courses | Đếm số lớp = min semesters |

**Tự luyện:** LC 207, 802, 851, 1462, 1857, 2050.

## 6. Checklist áp dụng

- [ ] Đã vẽ 2–3 cạnh ra để kiểm chiều chưa?
- [ ] Đồ thị có phải DAG không? Đã kiểm `len(order) == V` chưa?
- [ ] Node cô lập có nằm trong kết quả không?
- [ ] Đề hỏi thứ tự **bất kỳ** hay thứ tự **duy nhất**?
- [ ] Có cần đếm số lớp (thời gian song song) không?

## Tham khảo

- [cp-algorithms — Topological Sorting](https://cp-algorithms.com/graph/topological-sort.html)
- [Wikipedia — Topological sorting (Kahn's algorithm)](https://en.wikipedia.org/wiki/Topological_sorting)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 22.4
- [USACO Guide — Topological Sort](https://usaco.guide/gold/toposort)

## Liên kết
[[Graph Representation]] · [[BFS]] · [[DFS]] · [[Topological Sort DP]] · [[Union Find]] · [[DS&AL]]
