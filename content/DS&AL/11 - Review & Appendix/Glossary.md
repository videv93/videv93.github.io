---
tags: [dsal, reference, glossary]
status: evergreen
---
# Glossary

> Thuật ngữ Việt–Anh. Quy ước của vault này: **giải thích bằng tiếng Việt, giữ nguyên thuật ngữ tiếng Anh** — vì tài liệu và đồng nghiệp đều dùng tiếng Anh.

| Tiếng Anh | Tiếng Việt | Định nghĩa ngắn |
| --- | --- | --- |
| Invariant | Bất biến | Thuộc tính luôn đúng tại mọi thời điểm trong vòng lặp / đệ quy — xem [[Monotonic Stack and Deque]] |
| State | Trạng thái | Đại lượng đủ để mô tả bài con ([[Dynamic Programming]], [[Game Theory]]) |
| Transition | Bước chuyển | `dp[next] = f(dp[curr])` — quan hệ giữa các state |
| Subproblem | Bài con | Bài nhỏ hơn dùng để xây bài lớn (DP, [[Divide and Conquer]]) |
| Optimal substructure | Cấu trúc con tối ưu | Lời giải tối ưu xây từ lời giải con tối ưu |
| Overlapping subproblems | Bài con trùng lặp | Subproblem xuất hiện nhiều lần → cache được |
| Monotonic | Đơn điệu | Tăng/giảm theo một chiều (sort, stack, predicate binary search) |
| Amortized | Khấu hao | Trung bình mỗi thao tác `O(1)` dù worst-case có thể `O(n)` |
| Greedy | Tham lam | Mỗi bước chọn cái tốt nhất tại chỗ — [[Greedy]] |
| Heuristic | Heuristic | Quy tắc chọn lựa không bảo đảm tối ưu |
| Trie | Trie (prefix tree) | Cây mà mỗi node là 1 ký tự, đường đi là 1 prefix — [[Trie]] |
| Adjacency list | Danh sách kề | `graph[u] = [v1, v2, …]` — [[Graph Representation]] |
| In-place | In-place | Sửa trực tiếp input, không tạo cấu trúc phụ |
| Stable sort | Sort ổn định | Giữ thứ tự gốc của phần tử bằng nhau (Python `sorted` là stable) |
| Sentinel | Sentinel | Phần tử biên ảo để tránh special-case (dummy head, `[-1, n]`) |
| Pivot | Pivot | Phần tử chuẩn để partition (quicksort, quickselect) |
| Backtracking | Backtracking | Đệ quy + undo state khi quay lui — [[Backtracking]] |
| Memoization | Memoization | Cache kết quả subproblem (top-down DP) |
| Tabulation | Tabulation | Build bảng DP bottom-up |
| Bitmask | Bitmask | Encode subset bằng int (bit `i` = phần tử `i` có/không) — [[Bitmask DP]] |
| Lazy deletion | Xoá lười | Đánh dấu bỏ qua thay vì xoá thật (heap trong [[Dijkstra]]) |
| Coordinate compression | Nén toạ độ | Map giá trị lớn về rank nhỏ — [[Advanced Tree]] |
| LIS | LIS | Longest Increasing Subsequence |
| LCS | LCS | Longest Common Subsequence |
| LPS | LPS | Longest Prefix Suffix (mảng failure của [[KMP]]) |
| LCP | LCP | Longest Common Prefix |
| MST | MST | Minimum Spanning Tree — [[Minimum Spanning Tree]] |
| DSU | DSU | Disjoint Set Union (Union Find) — [[Union Find]] |
| DAG | DAG | Directed Acyclic Graph — [[Topological Sort]] |
| BST | BST | Binary Search Tree — [[Advanced Tree]] |
| BIT | BIT | Binary Indexed Tree = Fenwick Tree |
| FSM | FSM | Finite State Machine — [[String Parser]] |
| Big-O | Big-O | Notation độ phức tạp tiệm cận — [[Big-O Analysis]] |
| α(n) | Alpha(n) | Hàm Ackermann ngược (≈ 4 với mọi `n` thực tế) |
| TLE | TLE | Time Limit Exceeded |

## Tham khảo

- [Coding DSA Interview At Big Tech — Phụ lục H](https://engineerpro-team.github.io/coding-book/vi/) — bảng thuật ngữ gốc
- [NIST Dictionary of Algorithms and Data Structures](https://xlinux.nist.gov/dads/) — từ điển thuật ngữ chuẩn
- [VNOI Wiki](https://vnoi.info/wiki/) — thuật ngữ DSA tiếng Việt

## Liên kết
[[Big-O Analysis]] · [[Pattern Selection Map]] · [[References]] · [[DS&AL]]
