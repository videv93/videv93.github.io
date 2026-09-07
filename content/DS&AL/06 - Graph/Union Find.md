---
tags: [dsal, graph, dsu]
status: evergreen
---
# Union Find

> DSU (Disjoint Set Union) làm hai việc trên các tập rời: `find(x)` trả root của tập chứa `x`, `union(x, y)` gộp hai tập. Với **path compression** + **union by rank/size**, mỗi thao tác gần như `O(1)` (chính xác `O(α(n))`, α là hàm Ackermann ngược, ≈ 4 với mọi `n` thực tế).

## 1. Khi nào dùng

- Đếm / kiểm tra **connected components** khi cạnh được **thêm dần** (không thể BFS lại từ đầu mỗi lần).
- Phát hiện chu trình trong đồ thị **vô hướng** (cạnh nối hai đỉnh cùng root).
- Kruskal MST ([[Minimum Spanning Tree]]).
- Bài **offline**: sort cạnh và query theo trọng số rồi xử lý tăng dần.

**DSU vs BFS/DFS:** đề hỏi *"sau mỗi thao tác thêm cạnh, còn bao nhiêu thành phần?"* → DSU thắng. Đề static, hỏi một lần → BFS/DFS đủ.

## 2. Template code

```python
class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.size = [1] * n
        self.components = n

    def find(self, x: int) -> int:
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]   # path compression
            x = self.parent[x]
        return x

    def union(self, x: int, y: int) -> bool:
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False                     # đã cùng tập → cạnh này tạo cycle
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx                  # union by rank
        self.parent[ry] = rx
        self.size[rx] += self.size[ry]
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        self.components -= 1
        return True

    def connected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)
```

## 3. Invariant — rừng cha con

```
nodes:  0  1  2  3  4  5
parent: 0  0  0  3  3  5     (sau union(1,0), union(2,1), union(4,3))

forest:    0          3      5
          / \         |
         1   2        4
```
Mỗi root đại diện một component. Path compression làm cây "dẹt" dần: sau `find(4)` trên một chuỗi dài, mọi node trên đường đi trỏ thẳng lên root.

## 4. Cạm bẫy

- **Quên path compression hoặc union by rank** → cây suy biến thành chuỗi, `find` thành `O(n)`.
- **`union` trả `False` bị bỏ qua** — chính giá trị trả về này cho biết cạnh tạo chu trình (Redundant Connection) và dùng để đếm component.
- **Node không phải số nguyên** (email, chuỗi, toạ độ) → map về index bằng dict trước.
- **Number of Islands II (LC 305)**: mỗi lần thêm ô, `count += 1` trước; với mỗi neighbor đã active, nếu `union` thành công thì `count -= 1`.
- **Largest Component by Common Factor (LC 952)**: union **số** với **từng prime factor** của nó (prime là "node ảo"); cuối cùng chỉ đếm theo số gốc, không tính prime nodes ([[Prime Number]]).

**Offline DSU (LC 1697)** — không phải MST nhưng cùng họ: sort cả cạnh và query theo trọng số; duyệt query theo limit tăng dần, union mọi cạnh `< limit`, rồi trả lời `connected(u, v)`. Đây chính là logic Kruskal áp cho threshold query.

**Swim in Rising Water (LC 778)**: sort ô theo độ cao tăng dần, union các ô kề đã "ngập"; khi `(0,0)` và `(n-1,n-1)` cùng component thì độ cao hiện tại là đáp án. So sánh với [[Dijkstra]] và [[Binary Search with Graph]].

## 5. Bài kinh điển

| LC | Bài | Điểm học |
| --- | --- | --- |
| [547](https://leetcode.com/problems/number-of-provinces/) | Number of Provinces | Đếm component |
| [684](https://leetcode.com/problems/redundant-connection/) | Redundant Connection | `union` trả `False` = cạnh thừa |
| [721](https://leetcode.com/problems/accounts-merge/) | Accounts Merge | Map email → index |
| [305](https://leetcode.com/problems/number-of-islands-ii/) | Number of Islands II | Online add land |
| [990](https://leetcode.com/problems/satisfiability-of-equality-equations/) | Satisfiability of Equality Equations | Xử lý `==` trước, `!=` sau |
| [778](https://leetcode.com/problems/swim-in-rising-water/) | Swim in Rising Water | Offline threshold |

**Tự luyện:** LC 261, 1319, 1631, 1697.

## 6. Checklist áp dụng

- [ ] Đã có **cả** path compression **và** union by rank/size chưa?
- [ ] Node có cần map từ chuỗi/toạ độ về index không?
- [ ] Có tận dụng giá trị trả về của `union` không?
- [ ] Cạnh được thêm **dần** hay static? (static → BFS/DFS có thể đơn giản hơn)
- [ ] Query có sort được để xử lý offline không?

## Tham khảo

- [cp-algorithms — Disjoint Set Union](https://cp-algorithms.com/data_structures/disjoint_set_union.html) — có chứng minh `O(α(n))`
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 21: Data Structures for Disjoint Sets
- [Wikipedia — Disjoint-set data structure](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)
- [USACO Guide — DSU](https://usaco.guide/gold/dsu)

## Liên kết
[[Graph Representation]] · [[Minimum Spanning Tree]] · [[Island Matrix Traversal]] · [[Binary Search with Graph]] · [[Topological Sort]] · [[DS&AL]]
