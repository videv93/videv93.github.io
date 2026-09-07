---
tags: [dsal, index, practice, prompt]
type: reference
status: growing
created: 2026-09-06
updated: 2026-09-06
---
# AI Problem Generator — Mục lục đề & prompt 1vs1

> Dùng để **nhờ AI sinh đề** luyện đấu LeetCode 1vs1. Ba phần: (1) định nghĩa 3 cấp độ, (2) mục lục 44 pattern × 3 cấp — copy dòng nào cần vào prompt, (3) các prompt template dán thẳng.
>
> Nguyên tắc: AI **sinh đề mới**, không chép nguyên bài LC (đối thủ có thể đã thuộc). Cột "Bài neo" chỉ để AI biết *độ khó tham chiếu*, phải đổi bối cảnh + đổi ràng buộc.

## 1. Ba cấp độ

| Cấp | Tên | `n` điển hình | Time budget 1vs1 | Kỳ vọng | Vai trò trong trận |
| --- | --- | --- | --- | --- | --- |
| **L1** | Warm-up (Dễ) | `n ≤ 10^3` | 6–10 phút | 1 pattern thuần, không kết hợp, không edge case ẩn | Bài mở màn, phân định tốc độ gõ |
| **L2** | Core (Vừa) | `10^4 ≤ n ≤ 10^5` | 15–25 phút | 1 pattern + 1 twist (state design, tie-break, index math) | Bài quyết định trận đấu |
| **L3** | Duel-killer (Khó) | `n ≤ 2·10^5` hoặc `n ≤ 20` (bitmask) | 30–45 phút | **2 pattern ghép**, hoặc phải chứng minh tính đúng | Bài tie-break, thường không ai AC hết |

**Quy tắc ràng buộc → thuật toán được phép** (chi tiết ở [[Big-O Analysis]]) — luôn đưa vào prompt để AI khoá độ khó:

| `n` | Bắt buộc đạt | Chặn đứng lời giải |
| --- | --- | --- |
| `≤ 20` | `O(2^n · n)` | — (mở đường [[Bitmask DP]]) |
| `≤ 500` | `O(n^3)` | `O(2^n)` |
| `≤ 5·10^3` | `O(n^2)` | `O(n^3)` |
| `≤ 10^5` | `O(n log n)` | `O(n^2)` |
| `≤ 10^6` | `O(n)` / `O(n log log n)` | `O(n log n)` nếu constant lớn |

**Cách ép độ khó lên/xuống cho cùng một pattern:**

| Cần | Thao tác lên đề |
| --- | --- |
| L1 → L2 | Tăng `n` một bậc · thêm 1 chiều state · đổi "tồn tại?" → "đếm số cách" · thêm truy vấn offline |
| L2 → L3 | Ghép pattern thứ hai · yêu cầu **khôi phục nghiệm** (không chỉ giá trị) · thêm update online · đổi sang modulo `10^9+7` · ép in-place `O(1)` space |
| L3 → L2 | Cho sẵn gợi ý về state · giảm `n` · bỏ phần truy vết nghiệm |

---

## 2. Mục lục đề theo pattern

### 00 — Nền tảng (không sinh đề code, dùng để chấm)
[[Interview Process UMPIRE]] · [[Big-O Analysis]] · [[Python Interview Toolkit]] · [[Whiteboard Communication]] — dùng làm **rubric chấm** trong prompt, xem §3.4.

### 01 — Cấu trúc dữ liệu cơ bản

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Array]] | Biến đổi tại chỗ, hai lượt | Xoay/đảo/gộp in-place | Prefix–suffix hai lượt, `O(1)` extra | In-place với marker dấu âm / hoán vị cyclic sort | 189, 238, 41 |
| [[String]] | Chuẩn hoá, so khớp, mã hoá | Đảo từ, kiểm tra palindrome | Group anagram, encode/decode có delimiter | Palindrome twist + so khớp wildcard | 49, 271, 5 |
| [[Hash Table]] | Đổi bộ nhớ lấy thời gian | Two Sum, đếm tần suất | Hash key tự thiết kế (tuple, sorted-string, diff) | Hash + **khi hash không đủ** → cần thêm order (LRU) | 1, 49, 146 |
| [[Linked List]] | 5 trick con trỏ | Reverse, detect cycle | Reverse theo nhóm `k`, merge–split | Copy list random pointer / LRU tự cài từ node | 206, 25, 138 |
| [[Stack and Queue]] | Cấu trúc lồng, undo | Valid parentheses | Simulate với stack state (decode string) | Min-stack `O(1)` + queue-từ-stack amortized | 20, 394, 155 |
| [[Heap]] | Top-k, k-way, median | K largest | Two-heap median stream / merge k list | Heap + lazy deletion + tie-break đa tiêu chí (scheduler) | 215, 295, 621 |

### 02 — Kỹ thuật quét mảng

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Two Pointers]] | Hai đầu / slow-fast / cùng chiều | Remove duplicates sorted | 3Sum có dedupe | 4Sum / trapping water dạng biến thể 2D | 26, 15, 42 |
| [[Sliding Window]] | Window đơn điệu | Fixed-size max sum | Variable window need/have | `exactly K = atMost(K) − atMost(K−1)` + ký tự đa tập | 643, 76, 992 |
| [[Prefix Sum]] | Cộng dồn + hash | Range sum immutable | Subarray sum = K bằng hash | Prefix 2D / prefix XOR / prefix + monotonic | 303, 560, 304 |
| [[Monotonic Stack and Deque]] | Invariant đơn điệu | Next greater element | Largest rectangle in histogram | Sliding window max + sum of subarray minimums (đóng góp) | 496, 84, 907 |

> ⚠️ Bẫy hay đưa vào L2/L3: **mảng có số âm** → sliding window sai âm thầm, phải chuyển sang prefix + hash.

### 03 — Sorting & Greedy

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Sorting]] | Comparator tuỳ biến | Sort theo khoá phụ | Custom comparator (largest number) | Sort + cấu trúc phụ (counting inversion) | 179, 493 |
| [[Interval]] | 4 thao tác chuẩn | Merge intervals | Insert interval / min meeting rooms | Sweep line có trọng số + skyline | 56, 253, 218 |
| [[Greedy]] | Exchange argument | Jump game I | Task scheduler / gas station | Greedy **phải chứng minh** + phản ví dụ khi nào DP mới đúng | 55, 134, 621 |

### 04 — Binary Search

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Binary Search]] | Template `[lo, hi)` | Tìm chỉ số / first-last | Search rotated array có duplicate | Median of two sorted arrays (partition) | 34, 81, 4 |
| [[Search on Answer]] | Search trên giá trị đáp án | Koko eating bananas | Split array largest sum | Predicate phức tạp + tie-break, min-max có ràng buộc kép | 875, 410 |
| [[Binary Search with Graph]] | "Min của max" + check BFS/DFS | — | Swim in rising water | Bottleneck path + capacity check trên grid lớn | 778, 1102 |
| [[Binary Search with DP]] | Patience / tìm vị trí chèn | — | LIS `O(n log n)` | Job scheduling weighted + truy vết nghiệm | 300, 1235 |

### 05 — Đệ quy & Backtracking

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Recursion]] | Base + recursive case | Generate parentheses | Đệ quy trả cấu trúc (build tree) | Đệ quy lồng + memo trên chuỗi | 22, 105, 87 |
| [[Divide and Conquer]] | Bài con **độc lập** | Maximum subarray | Quickselect kth | Merge sort đếm nghịch thế / count of smaller after self | 53, 215, 315 |
| [[Backtracking]] | choose → explore → unchoose | Subsets, permutations | Xử lý **duplicate** (sort + skip) | Pruning mạnh: N-Queens / Sudoku / word search II (+[[Trie]]) | 78, 47, 212 |

### 06 — Graph

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Graph Representation]] | Chọn biểu diễn | Build adjacency list | Clone graph | Đề "ẩn graph" — tự nhận ra state là node | 133, 127 |
| [[BFS]] | Shortest path không trọng số | Level-order tree | Multi-source BFS (rotting oranges) | **Thiết kế state phức hợp** (BFS trên `(pos, keys)` bitmask) | 102, 994, 864 |
| [[DFS]] | Bottom-up vs top-down | Max depth | LCA / validate BST | Thiết kế giá trị trả về nhiều thành phần (diameter + path sum) | 104, 236, 124 |
| [[Island Matrix Traversal]] | Flood fill | Number of islands | Seed từ biên (surrounded regions) | Reverse thinking + đếm hình dạng distinct | 200, 130, 694 |
| [[Topological Sort]] | Thứ tự & cycle directed | Course schedule (có/không) | Trả về thứ tự + alien dictionary | Topo + DP đường dài nhất / lexicographic nhỏ nhất (heap) | 207, 269, 1857 |
| [[Union Find]] | Connectivity online | Số connected components | Redundant connection / accounts merge | DSU offline sort cạnh, DSU with rollback, DSU trên đồ thị nhị phân | 323, 721 |
| [[Dijkstra]] | Shortest path trọng số ≥ 0 | Network delay time | Cheapest flight ≤ k stops (Bellman-Ford) | Dijkstra trên state mở rộng / path with max probability | 743, 787, 1631 |
| [[Minimum Spanning Tree]] | Min cost kết nối | — | Connect all points (Kruskal/Prim) | Bottleneck path + cut property phải giải thích | 1584, 1102 |

### 07 — Dynamic Programming

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Dynamic Programming]] | 5 yếu tố state/transition | House robber, climb stairs | Knapsack / edit distance / LCS | DP 2 chiều + tối ưu space `O(n)` + truy vết nghiệm | 198, 72, 1143 |
| [[Bitmask DP]] | `n ≤ 22`, submask | — | Assign task với mask | TSP-style / partition thành k tập bằng submask enumeration | 698, 847 |
| [[Tree DP]] | DP bottom-up trên cây | House robber III | Nhiều state trên mỗi node | **Re-rooting** (đáp án cho mọi gốc) | 337, 834 |
| [[Topological Sort DP]] | DP trên DAG | — | Longest path in DAG | Đếm đường đi + transitive closure | 329 |
| [[Sorting DP]] | Sort như tiền xử lý | — | Russian doll envelopes | Tie-break `desc` để tránh đếm trùng + LIS `O(n log n)` | 354, 1691 |
| [[Combinatorics DP]] | Đếm `+=` mod `10^9+7` | Unique paths | Decode ways / distinct subsequence | Đếm có ràng buộc kép + nghịch đảo modulo | 62, 91, 115 |
| [[Game Theory]] | Minimax, dp = chênh lệch | Nim đơn giản | Stone game (dp chênh lệch) | Retrograde BFS / cat & mouse | 877, 913 |

### 08 — Cấu trúc dữ liệu nâng cao

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Advanced Tree]] | Range query + update | BST insert/search | Fenwick range sum + point update | Segment tree lazy / coordinate compression + count smaller | 307, 315, 699 |
| [[Trie]] | Prefix matching | Implement trie | Word search II (trie + backtracking) | Wildcard `.` search / reverse trie cho suffix | 208, 212, 211 |
| [[Binary Trie XOR]] | Greedy theo bit | — | Maximum XOR of two numbers | Đếm cặp XOR trong khoảng `[L, R]` + truy vấn offline | 421, 1707 |

### 09 — Thuật toán chuỗi

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Rolling Hash]] | Rabin-Karp | Tìm substring | Longest duplicate substring (+binary search) | Double hash chống va chạm, hash 2D | 187, 1044 |
| [[KMP]] | LPS array | strStr | Shortest palindrome (LPS trên `s + # + rev`) | Chu kỳ chuỗi + repeated substring pattern | 28, 214, 459 |
| [[Z Function]] | Z-box | strStr bằng Z | Đếm occurrence overlapping | Z + prefix function kết hợp | 28 |
| [[String Parser]] | stack / FSM / recursive descent | Valid number (FSM) | Basic calculator II | Calculator III (ngoặc lồng) / regex matching | 227, 224, 10 |

### 10 — Toán & Bit

| Pattern | Dạng đề lõi | L1 | L2 | L3 | Bài neo |
| --- | --- | --- | --- | --- | --- |
| [[Prime Number]] | Sàng, SPF | Count primes | Factorization bằng SPF | GCD/LCM trên mảng + số học modulo | 204, 1071 |
| [[Bit Manipulation]] | Tính chất XOR | Single number I | Single number II/III (đếm bit) | Bit trick + **bẫy số âm trong Python** (mask `0xFFFFFFFF`) | 136, 137, 371 |

### 11 — Dạng lai (dành riêng cho L3)

| Dạng | Mô tả | Neo |
| --- | --- | --- |
| Design + implement | "Design X" rồi cài đặt — [[System Design Hybrid]] | LRU 146, Twitter 355, Snake 353 |
| Multi-pattern | Hai pattern bắt buộc ghép — xem [[Recap Map]] | 315 (BIT+D&C), 84 (mono stack + DP) |
| Simulation nặng | Đề dài, nhiều rule, ít thuật toán nhưng dễ sai | 68, 289 |

---

## 3. Prompt template

### 3.1. Prompt sinh một đề (dùng nhiều nhất)

```
Bạn là người ra đề cho một trận đấu LeetCode 1vs1.

PATTERN: <dán tên pattern từ §2, ví dụ: Sliding Window>
CẤP ĐỘ: <L1 / L2 / L3>
NGÔN NGỮ: đề bằng tiếng Việt, giữ nguyên thuật ngữ tiếng Anh.

Ràng buộc bắt buộc:
- Sinh đề MỚI HOÀN TOÀN. Không chép và không đổi tên biến từ bài LeetCode có sẵn.
  Bối cảnh phải mới (logistics, game, sinh học, tài chính…), không phải "mảng số nguyên".
- Độ khó neo theo bài <dán cột "Bài neo" tương ứng> nhưng nội dung khác hẳn.
- Chọn n sao cho lời giải naive TLE còn lời giải đúng vừa đủ pass:
  <dán dòng tương ứng từ bảng "n → thuật toán được phép" ở §1>
- Đề phải có đúng 1 lời giải tối ưu, và ít nhất 1 cách sai hấp dẫn (bẫy).

Xuất ra ĐÚNG format sau, KHÔNG kèm lời giải:
1. Tiêu đề
2. Đề bài (mô tả + input/output format)
3. Ràng buộc (constraints, ghi rõ giá trị n, giá trị phần tử, số lượng query)
4. 2 ví dụ có giải thích + 1 edge case (không giải thích)
5. Time limit đề nghị cho trận: <6-10 / 15-25 / 30-45> phút
6. --- SPOILER (để riêng cuối, tôi tự che) ---
   - Pattern đúng + complexity mục tiêu
   - Bẫy chính
   - 5 hidden test case (gồm: min, max, all-same, đối xứng, adversarial)
```

### 3.2. Prompt sinh bộ đề cho một trận (recommended)

```
Sinh 1 BỘ ĐỀ trận đấu 1vs1, tổng 60 phút, gồm 3 bài:
- Bài A (L1) — pattern: <...>
- Bài B (L2) — pattern: <...>
- Bài C (L3) — ghép 2 pattern: <...> + <...>

Ba bài phải KHÁC pattern nhau và khác chủ đề bối cảnh.
Kèm bảng điểm: A=100, B=250, C=500, phạt −25/lần submit sai.
Áp dụng toàn bộ ràng buộc format của prompt sinh một đề.
```

### 3.3. Prompt "adversarial" — sinh đề khó đoán pattern

Dùng khi đối thủ đã quen mặt pattern:

```
Sinh 1 đề cấp <L2/L3> mà DẤU HIỆU BỀ MẶT gợi sai pattern.
Cụ thể: đề trông giống <pattern mồi, ví dụ: Sliding Window>
nhưng lời giải đúng phải dùng <pattern thật, ví dụ: Prefix Sum + Hash Table>.
Giải thích ở phần SPOILER: vì sao pattern mồi sai (cho phản ví dụ cụ thể).
```

Các cặp mồi ↔ thật sẵn có ở [[Pattern Selection Map]] §2 ("Các cặp pattern hay bị nhầm"):
sliding window ↔ prefix+hash (mảng có số âm) · BFS ↔ Dijkstra ↔ Union Find · binary search thường ↔ [[Search on Answer]] · greedy ↔ DP · backtracking ↔ [[Bitmask DP]].

### 3.4. Prompt chấm bài sau trận

```
Đây là đề <dán> và code của tôi <dán>.
Chấm theo rubric, mỗi mục 0–5 kèm 1 câu lý do:
1. Correctness — chỉ ra test case fail nếu có
2. Complexity — có đạt mục tiêu không, nêu bottleneck
3. Edge case đã xử lý (null/empty/1 phần tử/overflow/duplicate)
4. Code clarity theo tiêu chuẩn phỏng vấn ([[Whiteboard Communication]])
5. Pattern có tối ưu không — có pattern khác nhanh hơn không
Kết luận: bản refactor ngắn gọn nhất, và 1 bài tương tự nên luyện tiếp.
```

### 3.5. Prompt sinh lịch luyện

```
Tôi có <N> ngày, mỗi ngày <M> phút. Dựa trên mục lục 44 pattern ở đây,
xếp lịch mỗi ngày 1 bộ (L1 + L2), 2 ngày/lần thêm 1 bài L3.
Ưu tiên pattern tôi hay sai: <liệt kê>. Không lặp pattern trong 3 ngày liên tiếp.
```

---

## 4. Checklist trước khi dùng đề AI sinh

- [ ] Đề có **input/output format rõ ràng**, không mơ hồ về tie-break
- [ ] Constraint có ép được đúng độ phức tạp mong muốn (thử tính `n × complexity` < `10^8`)
- [ ] Có ít nhất 1 edge case mà lời giải ngây thơ chết
- [ ] AI không vô tình sinh đề **không giải được** hoặc constraint mâu thuẫn → bắt AI tự viết brute-force `O(n^2)` để đối chiếu trên `n ≤ 100`
- [ ] Spoiler đã tách riêng, dán cho cả hai người sau khi hết giờ

## Liên kết
[[Pattern Selection Map]] · [[Must-Do 50]] · [[LeetCode Index]] · [[Recap Map]] · [[Big-O Analysis]] · [[Study Roadmap]]
