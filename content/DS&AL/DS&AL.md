---
tags: [dsal, moc]
type: MOC
status: evergreen
created: 2026-08-27
updated: 2026-08-27
---
# 🧠 DS&AL — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng của khu vực Data Structures & Algorithms, tổ chức theo **44 pattern** phỏng vấn coding tại Big Tech. Mỗi note là một pattern tra cứu được: *khi nào dùng → template → cạm bẫy → checklist → bài kinh điển*.

## Cách dùng vault này

- **Chưa biết bắt đầu từ đâu** → [[Study Roadmap]] (ba lộ trình: 1 tuần / 2 tuần / 6 tuần).
- **Gặp một bài lạ, không biết dùng pattern nào** → [[Pattern Selection Map]] (tra từ dấu hiệu đề bài).
- **Biết số LC, muốn biết pattern** → [[LeetCode Index]] (263 bài).
- **Còn một tuần trước onsite** → [[Must-Do 50]] + [[Interview Checklist]].
- **Cần lời giải Python đầy đủ** → bản gốc 288 bài ở `_archive-seed/`.
- Thư mục đánh số theo **thứ tự học**, không theo bảng chữ cái. `status:` trong frontmatter: `seed` → `growing` → `evergreen`.
- Quy ước ngôn ngữ: giải thích tiếng Việt, **giữ nguyên thuật ngữ tiếng Anh** ([[Glossary]]).

---

## 00 — Nền tảng
- [[Interview Process UMPIRE]] — 6 bước để không đóng băng khi nhận đề
- [[Big-O Analysis]] — và bảng constraint `n` → thuật toán được phép
- [[Python Interview Toolkit]] — cấu trúc dữ liệu, idiom, và các bẫy Python
- [[Whiteboard Communication]] — cách trình bày, cách xin hint, cách xử lý khi bí
- [[Study Roadmap]] — lộ trình 1 / 2 / 6 tuần + nguyên tắc học

## 01 — Cấu trúc dữ liệu cơ bản
- [[Array]] — in-place, two-pass, prefix-suffix, quyết định trước khi code
- [[String]] — bảng mã, immutability, string pattern map
- [[Hash Table]] — đổi bộ nhớ lấy thời gian, và **khi nào hash không đủ**
- [[Linked List]] — 5 trick: dummy head, slow/fast, reverse, split-merge, relinking
- [[Stack and Queue]] — cấu trúc lồng, undo, nền của monotonic
- [[Heap]] — heap size k, hai heap cho median, k-way merge

## 02 — Kỹ thuật quét mảng
- [[Two Pointers]] — ba mẫu: hai đầu, slow-fast, cùng chiều
- [[Sliding Window]] — điều kiện đơn điệu, trick `exactly K = atMost(K) − atMost(K−1)`
- [[Prefix Sum]] — `P[0] = 0`, prefix + hash, prefix 2D
- [[Monotonic Stack and Deque]] — invariant, next greater, largest rectangle

## 03 — Sorting & Greedy
- [[Sorting]] — comparator tuỳ biến, sort mua gì / mất gì
- [[Interval]] — 4 thao tác chuẩn, sweep line, quy ước đóng/mở
- [[Greedy]] — exchange argument, stay-ahead, khi greedy sai thì DP cứu

## 04 — Binary Search
- [[Binary Search]] — một template duy nhất `[lo, hi)`
- [[Search on Answer]] — search trên **giá trị đáp án**, bảng predicate
- [[Binary Search with Graph]] — "min của max" + BFS/DFS check
- [[Binary Search with DP]] — LIS `O(n log n)`, job scheduling

## 05 — Đệ quy & Backtracking
- [[Recursion]] — base case, recursive case, kết hợp; phân biệt 4 họ hàng
- [[Divide and Conquer]] — bài con **độc lập**, Master theorem, quickselect
- [[Backtracking]] — choose → explore → unchoose, xử lý duplicate, pruning

## 06 — Graph
- [[Graph Representation]] — 3 biểu diễn + bảng chẩn đoán đề
- [[BFS]] — shortest path không trọng số, multi-source, thiết kế state
- [[DFS]] — bottom-up vs top-down, thiết kế giá trị trả về, LCA
- [[Island Matrix Traversal]] — flood fill, seed từ biên, reverse thinking
- [[Topological Sort]] — quy ước hướng cạnh, Kahn, detect cycle
- [[Union Find]] — path compression + union by rank, offline DSU
- [[Dijkstra]] — lazy deletion + bảng chọn thuật toán shortest path
- [[Minimum Spanning Tree]] — Kruskal vs Prim, cut property, bottleneck path

## 07 — Dynamic Programming
- [[Dynamic Programming]] — 5 yếu tố, 4 nhóm DP, bảng state/transition 18 bài
- [[Bitmask DP]] — `n ≤ 22`, submask enumeration, TSP-style
- [[Tree DP]] — bottom-up nhiều state, **re-rooting**
- [[Topological Sort DP]] — DP trên DAG: longest path, closure, counting
- [[Sorting DP]] — sort như bước tiền xử lý, trick tie-break `desc`
- [[Combinatorics DP]] — đếm bằng `+=`, modulo `10^9+7`
- [[Game Theory]] — minimax, `dp` = chênh lệch, retrograde BFS

## 08 — Cấu trúc dữ liệu nâng cao
- [[Advanced Tree]] — BST, Fenwick, Segment Tree, coordinate compression
- [[Trie]] — prefix tree, wildcard, reverse trie
- [[Binary Trie XOR]] — greedy theo bit, đếm cặp XOR trong khoảng

## 09 — Thuật toán chuỗi
- [[Rolling Hash]] — Rabin-Karp, va chạm và ba cấp độ đảm bảo
- [[KMP]] — LPS array, chu kỳ chuỗi
- [[Z Function]] — Z-box invariant, dễ hình dung hơn LPS
- [[String Parser]] — stack / FSM / recursive descent

## 10 — Toán & Bit
- [[Prime Number]] — sàng Eratosthenes, SPF, factorization
- [[Bit Manipulation]] — cheat-sheet, tính chất XOR, bẫy số âm trong Python

## 11 — Ôn tập & Phụ lục
- [[Pattern Selection Map]] — **tra ngược từ đề bài sang pattern** + các cặp hay nhầm
- [[Must-Do 50]] — 50 bài cho tuần cuối
- [[LeetCode Index]] — 263 bài, tra theo số LC
- [[Recap Map]] — bài giải được bằng nhiều pattern, mỗi lần một góc nhìn
- [[AI Problem Generator]] — mục lục đề 3 cấp + prompt nhờ AI sinh đề luyện 1vs1
- [[Behavioral STAR]] — framework + 10 câu thường gặp
- [[System Design Hybrid]] — bài "Design X": design rồi implement
- [[Interview Checklist]] — việc cần làm theo mốc 1 tháng / 1 tuần / 24 giờ
- [[Glossary]] — thuật ngữ Việt–Anh
- [[References]] — nguồn học nền tảng dùng chung

---

## Nguồn học nền tảng

| Nguồn | Dùng để | Link |
| --- | --- | --- |
| Coding DSA Interview At Big Tech (EngineerPro) | Nguồn gốc của vault này, 288 bài kèm lời giải Python | [engineerpro-team.github.io](https://engineerpro-team.github.io/coding-book/vi/) |
| cp-algorithms | Tra cứu thuật toán cụ thể, có chứng minh | [cp-algorithms.com](https://cp-algorithms.com/) |
| USACO Guide | Lộ trình theo tier, giải thích rõ ràng | [usaco.guide](https://usaco.guide/) |
| Competitive Programming Handbook | Sách free, gọn, sát pattern | [cses.fi/book](https://cses.fi/book/book.pdf) |
| CLRS | Textbook để tra cứu | [mitpress](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) |
| NeetCode | Roadmap + video theo pattern | [neetcode.io](https://neetcode.io/roadmap) |
| LeetCode | Practice + contest | [leetcode.com](https://leetcode.com/) |
| interviewing.io / Pramp | Mock interview | [interviewing.io](https://interviewing.io/) · [pramp.com](https://www.pramp.com/) |

Danh sách đầy đủ (sách, blog, YouTube, nguồn tiếng Việt) ở [[References]].

---

## `_archive-seed/`

Bản gốc **28.516 dòng** của cuốn *Phỏng vấn DSA tại Big Tech — 288 bài tập kèm lời giải Python* (Phạm Ngọc Lâm / EngineerPro) được giữ nguyên vẹn ở đó. Vault này là **bản hệ thống hoá theo pattern**; khi cần **lời giải Python đầy đủ, phân tích độ phức tạp từng bài, hoặc bẫy phỏng vấn của một bài cụ thể**, mở bản gốc và tra theo số mục (`1.1`, `29.14`, …) hoặc tên bài.

## Liên kết
[[Knowledge Seed Playbook]] — quy trình đã dùng để dựng vault này.
