---
tags: [dsal, index, reference]
status: evergreen
---
# Pattern Selection Map

> Note quan trọng nhất khi luyện tập: **tra ngược từ dấu hiệu đề bài sang pattern**. Trong phỏng vấn, bước "Match" của [[Interview Process UMPIRE]] chính là chạy bảng này trong đầu.

## 1. Dấu hiệu đề bài → pattern

| Đề bài nói gì                                       | Pattern                                       |
| --------------------------------------------------- | --------------------------------------------- |
| "Find pair / triplet with sum"                      | [[Two Pointers]], [[Hash Table]]              |
| "Longest / shortest substring thoả điều kiện"       | [[Sliding Window]]                            |
| "Find element trong mảng đã sort"                   | [[Binary Search]]                             |
| "Min/max X sao cho …"                               | [[Search on Answer]]                          |
| "Số subarray thoả …"                                | [[Prefix Sum]] + [[Hash Table]]               |
| "Connected components / cycle trong undirected"     | [[Union Find]], [[DFS]]                       |
| "Shortest path không trọng số"                      | [[BFS]]                                       |
| "Shortest path trọng số ≥ 0"                        | [[Dijkstra]]                                  |
| "Shortest path có cạnh âm"                          | Bellman-Ford ([[Dijkstra]])                   |
| "Thứ tự thực hiện / cycle trong directed"           | [[Topological Sort]]                          |
| "Min cost kết nối tất cả"                           | [[Minimum Spanning Tree]]                     |
| "Next greater / smaller element"                    | [[Monotonic Stack and Deque]]                 |
| "Sliding window max/min"                            | [[Monotonic Stack and Deque]] (deque)         |
| "Substring matching"                                | [[KMP]], [[Rolling Hash]], [[Z Function]]     |
| "Prefix matching / dictionary lookup"               | [[Trie]]                                      |
| "Max XOR pair"                                      | [[Binary Trie XOR]]                           |
| "Liệt kê tất cả permutation / subset / combination" | [[Backtracking]]                              |
| "Số cách / min steps"                               | [[Dynamic Programming]], [[Combinatorics DP]] |
| "Hai người chơi tối ưu"                             | [[Game Theory]]                               |
| "Path / depth / diameter / LCA trên cây"            | [[DFS]], [[Tree DP]]                          |
| "Range sum + update"                                | [[Prefix Sum]], [[Advanced Tree]]             |
| "Median / kth largest trên stream"                  | [[Heap]]                                      |
| "`n ≤ 20` và có subset"                             | [[Bitmask DP]]                                |
| "Đếm/đo vùng trên grid"                             | [[Island Matrix Traversal]]                   |
| "Interval / lịch / booking"                         | [[Interval]]                                  |
| "Parse biểu thức / validate chuỗi"                  | [[String Parser]]                             |

## 2. Các cặp pattern hay bị nhầm

**BFS vs DFS vs Union Find** (connectivity / components):

| Pattern | Khi dùng | Time | Space |
| --- | --- | --- | --- |
| [[BFS]] | Shortest path không trọng số, level-order | `O(V+E)` | `O(V)` |
| [[DFS]] | Connectivity, cycle detection, topo sort | `O(V+E)` | `O(V)` stack |
| [[Union Find]] | Online thêm cạnh, query "connected?", offline sort cạnh | `O((V+E)·α)` | `O(V)` |

**Binary Search thường vs Search on Answer:**

| Pattern | Search trên gì | Predicate |
| --- | --- | --- |
| [[Binary Search]] | Index trong mảng đã sort | `nums[mid]` vs `target` |
| [[Search on Answer]] | **Giá trị đáp án** | `check(mid)` đơn điệu T/F |

**Sliding Window vs Two Pointers:**

| Pattern | Khi dùng | Cửa sổ |
| --- | --- | --- |
| [[Two Pointers]] hai đầu | Sort + tìm cặp (sum, distance) | Hội tụ từ hai phía |
| [[Sliding Window]] cùng chiều | Longest/shortest subarray, predicate đơn điệu | Mở `r`, co `l` |

**KMP vs Z vs Rolling Hash:**

| Pattern | Preprocess | Khi tốt | Khi xấu |
| --- | --- | --- | --- |
| [[KMP]] | LPS `O(m)` | Deterministic, chu kỳ chuỗi | LPS khó hiểu |
| [[Z Function]] | Z array `O(n)` | Dễ hình dung hơn LPS | Hiệu năng tương đương |
| [[Rolling Hash]] | Prefix hash + powers | Nhiều pattern, so đoạn tuỳ ý | Rủi ro va chạm |

**Dijkstra vs BS+BFS vs DSU offline** (min/max path):

| Pattern | Khi dùng | Complexity |
| --- | --- | --- |
| [[Dijkstra]] | Weighted ≥ 0, query online | `O((V+E) log V)` |
| [[Binary Search with Graph]] | Predicate đơn điệu theo threshold | `O((V+E) log range)` |
| [[Union Find]] offline | Sort được cạnh và query | `O((V+E)·α)` |

**Recursion vs Backtracking vs DFS vs Top-down DP:**

| Pattern | Đặc trưng |
| --- | --- |
| [[Recursion]] | Đệ quy thuần, không track choice |
| [[Backtracking]] | `choose → explore → unchoose`, liệt kê tất cả |
| [[DFS]] | Duyệt graph/tree, mark visited |
| Top-down DP ([[Dynamic Programming]]) | Recursion + `@cache`, overlapping subproblems |

## 3. Constraint → thuật toán

Nếu đề không gợi ý gì, đọc constraint. Bảng đầy đủ ở [[Big-O Analysis]]:
`n ≤ 10` → `O(n!)` · `n ≤ 20` → `O(2^n)` · `n ≤ 5000` → `O(n²)` · `n ≤ 10^5` → `O(n log n)` · `n ≤ 10^9` → `O(log n)`.

## 4. Template ở đâu

| Pattern | Note |
| --- | --- |
| Two Pointers, Sliding Window | [[Two Pointers]], [[Sliding Window]] |
| Binary Search, Search on Answer | [[Binary Search]], [[Search on Answer]] |
| Prefix Sum, Monotonic Stack | [[Prefix Sum]], [[Monotonic Stack and Deque]] |
| BFS, DFS, Backtracking | [[BFS]], [[DFS]], [[Backtracking]] |
| Union Find, Topo Sort, Dijkstra, MST | [[Union Find]], [[Topological Sort]], [[Dijkstra]], [[Minimum Spanning Tree]] |
| Trie, Fenwick/Segment | [[Trie]], [[Advanced Tree]] |
| LCS/LIS, Knapsack, Tree DP, Bitmask DP | [[Dynamic Programming]], [[Tree DP]], [[Bitmask DP]] |
| KMP, Z, Rolling Hash | [[KMP]], [[Z Function]], [[Rolling Hash]] |

## Tham khảo

- [NeetCode Roadmap](https://neetcode.io/roadmap) — đồ thị phụ thuộc giữa các pattern
- [Tech Interview Handbook — Algorithms cheatsheet](https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/) — bảng "khi nào dùng gì" tương đương
- [LeetCode — duyệt theo tag](https://leetcode.com/problemset/) — kiểm chứng chẩn đoán bằng cách lọc tag
- [Coding DSA Interview At Big Tech — Phụ lục A](https://engineerpro-team.github.io/coding-book/vi/) — bảng gốc của note này

## Liên kết
[[LeetCode Index]] · [[Recap Map]] · [[Must-Do 50]] · [[Interview Process UMPIRE]] · [[Big-O Analysis]] · [[DS&AL]]

Muốn luyện ngược lại (sinh đề mới từ một pattern) → [[AI Problem Generator]].
