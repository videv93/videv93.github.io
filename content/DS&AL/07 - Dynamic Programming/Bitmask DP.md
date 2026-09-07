---
tags: [dsal, dp, bitmask]
status: evergreen
---
# Bitmask DP

> Khi state là **subset của một tập nhỏ** (`n ≤ 20–22`), encode subset bằng bitmask `int` và DP trên bitmask. State space `O(2^n)`. Đây là pattern cho họ bài TSP, set cover, assignment, partition.

## 1. Khi nào dùng

- Constraint `n ≤ 20–22` — đây là **dấu hiệu nhận biết mạnh nhất** (`2^20 ≈ 10^6`).
- Bài "partition / cover / assignment" trên tập.
- Bài "thăm tất cả các đỉnh" (TSP-style).

## 2. Template code

```python
from functools import cache

@cache
def dp(mask, *extra_state):
    if mask == 0:                       # hoặc mask == (1 << n) - 1
        return base_value
    return best(dp(mask ^ (1 << i), ...) for i in iterate_bits(mask))
```

## 3. Bitmask cookbook

| Thao tác | Code |
| --- | --- |
| Bit `i` có set? | `(mask >> i) & 1` |
| Set bit `i` | `mask \| (1 << i)` |
| Clear bit `i` | `mask & ~(1 << i)` |
| Toggle bit `i` | `mask ^ (1 << i)` |
| Lowest set bit | `mask & -mask` |
| Pop count | `bin(mask).count('1')` hoặc `mask.bit_count()` (Py 3.10+) |
| **Duyệt submask** | `sub = mask` rồi `while sub: ...; sub = (sub - 1) & mask` |
| Duyệt set bits | `while mask: i = (mask & -mask).bit_length() - 1; mask &= mask - 1` |

Chi tiết bit trick ở [[Bit Manipulation]].

## 4. Bảng feasibility theo constraint

| `n` | `2^n` | DP shape thường gặp | Time |
| --- | --- | --- | --- |
| ≤ 20 | ≤ 10⁶ | `dp[mask]` (TSP, assignment) | `O(2^n · n)` |
| ≤ 16 | ≤ 65k | `dp[mask][i]` (TSP có endpoint) | `O(2^n · n²)` |
| ≤ 22–25 | ≤ 33M | Cần submask enumeration | `O(3^n)` cho subset-sum DP |

Tổng chi phí duyệt **mọi submask của mọi mask** là `O(3^n)`, không phải `O(4^n)` — vì mỗi phần tử có 3 khả năng: ngoài mask, trong mask nhưng ngoài submask, trong submask.

## 5. Cạm bẫy

- **`n > 22`** → `2^n` nổ bộ nhớ. Nếu constraint lớn hơn thì đây không phải pattern đúng.
- **Quên `sub = 0` trong vòng duyệt submask** — vòng `while sub:` bỏ qua submask rỗng; nếu cần nó, xử lý riêng.
- **Shortest Superstring (LC 943)**: phải **loại bỏ từ là substring của từ khác** trước khi DP.
- **Maximum Students (LC 1349) — điều kiện mask theo hàng**:
```
Valid trong hàng:      s & (s << 1) == 0
Compatible với prev p: (s & (p << 1)) == 0 and (s & (p >> 1)) == 0
Nằm trong ô cho phép:  s & broken_mask[row] == 0
```
- **Path reconstruction** cần bảng `parent[mask][i]` — nghĩ trước khi code nếu đề đòi in ra đường đi.
- **`@cache` trên mask lớn** tốn bộ nhớ dict; bottom-up array `dp = [inf] * (1 << n)` thường nhanh hơn nhiều.

## 6. Bài kinh điển

| LC | Bài | Shape |
| --- | --- | --- |
| [698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | Partition to K Equal Sum Subsets | `dp[mask]` + backtracking |
| [847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) | Shortest Path Visiting All Nodes | BFS state `(mask, node)` ([[BFS]]) |
| [1125](https://leetcode.com/problems/smallest-sufficient-team/) | Smallest Sufficient Team | Set cover |
| [943](https://leetcode.com/problems/find-the-shortest-superstring/) | Find the Shortest Superstring | TSP + overlap |
| [1349](https://leetcode.com/problems/maximum-students-taking-exam/) | Maximum Students Taking Exam | DP theo hàng, mask conflict |
| [1879](https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/) | Minimum XOR Sum of Two Arrays | Assignment problem |

**Tự luyện:** LC 691, 1494, 1799, 464 ([[Game Theory]]).

## 7. Checklist áp dụng

- [ ] `n` có ≤ 22 không?
- [ ] Mask đại diện cho **cái gì** — đã viết thành câu chưa?
- [ ] Base case là `mask == 0` hay `mask == full`?
- [ ] Có cần chiều phụ (`node` cuối, `i` hiện tại) không?
- [ ] Đề có đòi đường đi cụ thể không? (→ lưu parent)
- [ ] Bottom-up array có tiết kiệm hơn `@cache` không?

## Tham khảo

- [cp-algorithms — Submask enumeration](https://cp-algorithms.com/algebra/all-submasks.html) — chứng minh `O(3^n)`
- [USACO Guide — Bitmask DP](https://usaco.guide/gold/dp-bitmasks)
- [Wikipedia — Held–Karp algorithm](https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm) — TSP bằng bitmask DP
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 10: Bit manipulation

## Liên kết
[[Dynamic Programming]] · [[Bit Manipulation]] · [[Binary Trie XOR]] · [[BFS]] · [[Backtracking]] · [[Game Theory]] · [[DS&AL]]
