---
tags: [dsal, graph, grid]
status: evergreen
---
# Island Matrix Traversal

> Grid 2D là **graph ngầm**: mỗi ô là một node, 4 (hoặc 8) ô kề là cạnh. Mọi bài "đảo" / "tô màu vùng" / "flood fill" đều là [[DFS]]/[[BFS]] trên graph này. Bốn trick đặc trưng: flood fill, multi-source từ biên, reverse thinking, mutate input.

## 1. Khi nào dùng

- Đề cho `grid: List[List[T]]` với ô có 2–3 trạng thái.
- Câu hỏi: đếm/đo vùng liên thông, tô màu, lan toả, xác định ranh giới.

Hai hướng tư duy:
- **Forward** — BFS/DFS từ ô quan tâm, đếm/đo.
- **Reverse** — tìm các ô **KHÔNG** thoả (ví dụ: nối được với biên), phần còn lại là đáp án.

## 2. Template code

```python
from collections import deque
DIRS = [(-1, 0), (1, 0), (0, -1), (0, 1)]

# 1) Flood fill DFS — mark in-place
def flood_fill(grid, r, c, marker) -> int:
    rows, cols = len(grid), len(grid[0])
    if not (0 <= r < rows and 0 <= c < cols) or grid[r][c] != 1:
        return 0
    grid[r][c] = marker
    size = 1
    for dr, dc in DIRS:
        size += flood_fill(grid, r + dr, c + dc, marker)
    return size

# 2) Multi-source BFS từ tất cả biên / tất cả ô đặc biệt
def multi_source_bfs(grid, sources):
    queue, visited = deque(sources), set(sources)
    while queue:
        r, c = queue.popleft()
        for dr, dc in DIRS:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited:
                visited.add((nr, nc)); queue.append((nr, nc))
    return visited
```

## 3. Bốn trick

1. **Flood fill** — lan từ một ô, đếm/đo vùng.
2. **Multi-source BFS từ biên** — cho Surrounded Regions, Pacific Atlantic: ô "không bị bao quanh" chính là ô **nối được với biên**; seed từ biên rồi lấy phần bù.
3. **Reverse thinking** — đánh dấu cái *không* cần, suy ra cái cần.
4. **Mutate input để mark visited** — `'1' → '0'` hoặc `'#'`, tiết kiệm `O(R·C)` bộ nhớ.

| Tiêu chí | In-place mark | `visited` set / 2D bool |
| --- | --- | --- |
| Bộ nhớ phụ | `O(1)` | `O(R·C)` |
| Mutate input? | Có | Không |
| Chạy lại / khôi phục | Khó | Dễ |
| Ưu tiên | Khi được phép & cần `O(1)` | Khi grid immutable hoặc cần re-run |

## 4. Cạm bẫy

- **Quên bounds check** trước khi truy cập `grid[nr][nc]` → Python index âm **không** báo lỗi mà wrap về cuối mảng: bug im lặng.
- **Mutate input khi interviewer không cho phép** — hỏi trước.
- **DFS đệ quy trên grid `1000×1000`** → vượt recursion limit. Dùng iterative stack hoặc BFS.
- **Multi-source: đẩy thiếu nguồn** (01 Matrix phải đẩy **tất cả** ô `0`; Walls and Gates phải đẩy **tất cả** cổng).
- **8-hướng vs 4-hướng** — đọc kỹ đề, khác nhau hoàn toàn kết quả.

## 5. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [200](https://leetcode.com/problems/number-of-islands/) | Number of Islands | Flood fill + mark in-place |
| [695](https://leetcode.com/problems/max-area-of-island/) | Max Area of Island | Flood fill trả size |
| [130](https://leetcode.com/problems/surrounded-regions/) | Surrounded Regions | Seed từ biên, lấy phần bù |
| [417](https://leetcode.com/problems/pacific-atlantic-water-flow/) | Pacific Atlantic Water Flow | Hai lần BFS từ hai biên, giao nhau |
| [286](https://leetcode.com/problems/walls-and-gates/) | Walls and Gates | Multi-source BFS |
| [542](https://leetcode.com/problems/01-matrix/) | 01 Matrix | Multi-source BFS từ mọi ô `0` |

**Tự luyện:** LC 463, 733, 994, 1020, 1254, 1905.

## 6. Checklist áp dụng

- [ ] 4 hướng hay 8 hướng?
- [ ] Bounds check đủ 4 điều kiện (`0 <= nr < R and 0 <= nc < C`) chưa?
- [ ] Được mutate grid không? Nếu không, đã có `visited` chưa?
- [ ] Grid có lớn tới mức DFS đệ quy tràn stack không?
- [ ] Bài này nên nghĩ xuôi hay nghĩ ngược (seed từ biên)?
- [ ] Nếu cần thêm ô online (add land) → cân nhắc [[Union Find]].

## Tham khảo

- [Wikipedia — Flood fill](https://en.wikipedia.org/wiki/Flood_fill)
- [cp-algorithms — BFS on grid](https://cp-algorithms.com/graph/breadth-first-search.html)
- [LeetCode Explore — Graph: Islands](https://leetcode.com/explore/learn/card/graph/)
- [USACO Guide — Flood Fill](https://usaco.guide/silver/flood-fill)

## Liên kết
[[DFS]] · [[BFS]] · [[Union Find]] · [[Graph Representation]] · [[Binary Search with Graph]] · [[DS&AL]]
