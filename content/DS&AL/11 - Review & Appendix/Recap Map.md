---
tags: [dsal, index, reference]
status: evergreen
---
# Recap Map

> Một số bài xuất hiện ở **nhiều pattern** dưới những góc nhìn khác nhau. Đây là bản đồ để không nhầm "đọc lại lần hai" với "học một góc nhìn mới" — và cũng là danh sách bài đáng luyện nhất, vì bài giải được nhiều cách là bài dạy được nhiều thứ.

| LC | Bài | Note chính | Cũng xuất hiện ở | Góc nhìn mới |
| --- | --- | --- | --- | --- |
| 56 | Merge Intervals | [[Sorting]] | [[Interval]] | Sort tổng quát vs pattern interval |
| 75 | Sort Colors | [[Sorting]] | [[Two Pointers]] | Dutch flag vs 3-pointer partition |
| 11 | Container With Most Water | [[Array]] | [[Two Pointers]] | Trick mảng vs hai con trỏ hội tụ |
| 98 | Validate BST | [[DFS]] | [[Advanced Tree]] | DFS bound vs tính chất BST |
| 146 | LRU Cache | [[Hash Table]] | [[Linked List]] | Hash + DLL vs pattern DLL |
| 206 | Reverse Linked List | [[Linked List]] | [[Recursion]] | Iterative vs đệ quy |
| 50 | Pow(x, n) | [[Recursion]] | [[Divide and Conquer]] | Fast power vs khung D&C |
| 215 | Kth Largest | [[Heap]] | [[Divide and Conquer]] | Heap size k vs quickselect |
| 239 | Sliding Window Maximum | [[Monotonic Stack and Deque]] | [[Sliding Window]] | Deque vs cửa sổ |
| 253 | Meeting Rooms II | [[Sorting]] | [[Interval]] | Heap vs sweep line |
| 354 | Russian Doll Envelopes | [[Dynamic Programming]] | [[Binary Search with DP]] · [[Sorting DP]] | 3 góc: DP thuần, BS+DP, sort+DP |
| 421 | Maximum XOR of Two Numbers | [[Bit Manipulation]] | [[Binary Trie XOR]] | Greedy theo bit vs binary trie |
| 560 | Subarray Sum Equals K | [[Hash Table]] | [[Prefix Sum]] | Hash complement vs prefix sum |
| 778 | Swim in Rising Water | [[Union Find]] | [[Dijkstra]] · [[Binary Search with Graph]] | 3 cách: DSU offline, Dijkstra, BS+BFS |
| 1316 | Distinct Echo Substrings | [[Rolling Hash]] | [[Z Function]] | Hai thuật toán chuỗi khác nhau |
| 1631 | Path With Minimum Effort | [[Dijkstra]] | [[Binary Search with Graph]] | Relax min-max vs threshold |
| 2223 | Sum of Scores of Built Strings | [[Rolling Hash]] | [[Z Function]] | Hash vs Z array |
| 394 | Decode String | [[Stack and Queue]] | [[String Parser]] | Stack cơ bản vs parser tổng quát |
| 337 | House Robber III | [[DFS]] | [[Tree DP]] | Trả tuple vs Tree DP có hệ thống |
| 124 | Binary Tree Maximum Path Sum | [[Advanced Tree]] | [[Tree DP]] | Return vs global |
| 329 | Longest Increasing Path in a Matrix | [[Topological Sort DP]] | [[DFS]] | Topo trên DAG ngầm vs DFS + memo |

## Cách đọc một bài recap

Đừng đọc lại lời giải lần hai. Hỏi ba câu:
1. **Pattern hiện tại nhìn bài cũ theo cách gì?** (ví dụ: LC 778 dưới lăng kính DSU là "khi nào hai ô cùng component", dưới lăng kính Dijkstra là "min của max dọc đường")
2. **Cách nào ngắn hơn / dễ giải thích hơn trong phỏng vấn?**
3. **Nếu interviewer hỏi "còn cách nào khác?" — bạn nói được bao nhiêu cách?**

Đây chính là điểm khác biệt giữa "làm được bài" và "hiểu bài".

## Tham khảo

- [Coding DSA Interview At Big Tech — Phụ lục J](https://engineerpro-team.github.io/coding-book/vi/) — bảng recap gốc
- [LeetCode Solutions tab](https://leetcode.com/problemset/) — đọc nhiều cách giải cho cùng một bài
- [NeetCode](https://www.youtube.com/@NeetCode) — nhiều video trình bày 2–3 cách cho một bài

## Liên kết
[[Pattern Selection Map]] · [[LeetCode Index]] · [[Must-Do 50]] · [[Study Roadmap]] · [[DS&AL]]
