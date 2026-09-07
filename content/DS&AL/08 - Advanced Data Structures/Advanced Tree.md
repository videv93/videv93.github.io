---
tags: [dsal, data-structure, tree, segment-tree, fenwick]
status: evergreen
---
# Advanced Tree

> Ba cấu trúc trả lời "range query + update" trong `O(log n)`: **BST**, **Fenwick Tree (BIT)**, **Segment Tree**. Trong phỏng vấn Big Tech, BST hỏi rất nhiều; Fenwick/Segment xuất hiện ở vòng onsite mức Hard.

## 1. Chọn cấu trúc nào

| Cần gì | Dùng |
| --- | --- |
| Tree có tính chất `left < node < right` | **BST** |
| Prefix sum + point update | **Fenwick** (code ngắn nhất) |
| Range min/max/GCD/merge phức tạp | **Segment Tree** |
| Range update (lazy) | **Segment Tree + lazy propagation** |
| Range sum, mảng **không đổi** | [[Prefix Sum]] — đừng dùng cây |

## 2. Template code

```python
# Fenwick Tree (1-indexed) — ~10 dòng
class Fenwick:
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i: int, delta: int) -> None:
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i                       # lowbit

    def query(self, i: int) -> int:           # prefix sum [1..i]
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

    def range_query(self, l: int, r: int) -> int:
        return self.query(r) - self.query(l - 1)


# Segment Tree — sum, bản iterative
class SegTree:
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (2 * n)

    def update(self, i: int, val: int) -> None:
        i += self.n
        self.tree[i] = val
        while i > 1:
            i //= 2
            self.tree[i] = self.tree[2*i] + self.tree[2*i+1]

    def query(self, l: int, r: int) -> int:   # [l, r)
        res = 0
        l += self.n; r += self.n
        while l < r:
            if l & 1: res += self.tree[l]; l += 1
            if r & 1: r -= 1; res += self.tree[r]
            l //= 2; r //= 2
        return res
```

## 3. Fenwick vs Segment Tree

|  | Fenwick | Segment Tree |
| --- | --- | --- |
| Thao tác | Prefix sum, point update | Range sum / min / max / gcd… |
| Độ dài code | ~10 dòng | ~40–60 dòng |
| Bộ nhớ | `n` | `4n` (đệ quy) hoặc `2n` (iterative) |
| Lazy propagation | Khó | Dễ |
| Khi nào đủ dùng | Chỉ cần prefix/sum | Cần range query + update phức tạp |

## 4. Tree family map

| Cấu trúc | Hỗ trợ | Bài |
| --- | --- | --- |
| Binary Tree | Duyệt, path | LC 124, 543 ([[Tree DP]]) |
| BST | Search, kth, range count | LC 230, 938 |
| Fenwick / BIT | Prefix sum/count + point update | LC 307, 315 |
| Segment Tree | Range query/update tổng quát | LC 732, 218 |
| [[Trie]] | Prefix chuỗi | LC 208, 212 |

## 5. Cạm bẫy

- **Fenwick là 1-indexed** — quên `+1` khi map từ mảng 0-indexed là bug kinh điển.
- **Coordinate compression** (LC 315): giá trị tới `±10^4` nhưng số phần tử `≤ 5·10^4` ⇒ sort unique, map value → rank `[0, m-1]`, Fenwick size `m` là đủ.
- **Validate BST bằng so sánh cục bộ** — phải truyền bound, xem [[DFS]].
- **Recover BST (LC 99)**: in-order duyệt phải ra dãy tăng; tìm **hai** vị trí vi phạm (nếu chỉ có một cặp kề nhau bị đổi thì chỉ tìm được một).
- **Serialize/Deserialize (LC 297)**: preorder + null marker (`"1,2,#,#,3,#,#"`) tự nhiên với đệ quy, deserialize bằng queue; level-order dễ nhìn hơn nhưng dài hơn. Cả hai đều `O(n)`.
- **Binary Tree Maximum Path Sum (LC 124)**: hàm trả về "path đi xuống một nhánh" (`max(0, ...)` để bỏ nhánh âm), còn đáp số toàn cục là `node.val + left + right`.

## 6. Bài kinh điển

| LC | Bài | Cấu trúc |
| --- | --- | --- |
| [98](https://leetcode.com/problems/validate-binary-search-tree/) | Validate BST | Bound `(lo, hi)` |
| [99](https://leetcode.com/problems/recover-binary-search-tree/) | Recover Binary Search Tree | In-order tìm 2 vi phạm |
| [297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | Serialize and Deserialize | Preorder + null marker |
| [124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | Binary Tree Maximum Path Sum | Bottom-up, tách return vs global |
| [315](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) | Count of Smaller Numbers After Self | Fenwick + coordinate compression |
| [307](https://leetcode.com/problems/range-sum-query-mutable/) | Range Sum Query - Mutable | Fenwick / Segment Tree |

**Tự luyện:** LC 1109, 1395, 2179, 230, 938.

## 7. Checklist áp dụng

- [ ] Mảng có update không? (không → [[Prefix Sum]] là đủ)
- [ ] Chỉ cần sum hay cần min/max/gcd? (sum → Fenwick)
- [ ] Có range update không? (→ Segment Tree lazy)
- [ ] Giá trị có lớn nhưng số phần tử nhỏ không? (→ coordinate compression)
- [ ] Fenwick đã dùng đúng 1-indexed chưa?

## Tham khảo

- [cp-algorithms — Fenwick Tree](https://cp-algorithms.com/data_structures/fenwick.html) và [Segment Tree](https://cp-algorithms.com/data_structures/segment_tree.html)
- [Efficient and easy segment trees — Al.Cash](https://codeforces.com/blog/entry/18051) — nguồn của bản iterative `2n`
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 12–13: BST và Red-Black Trees
- [USACO Guide — Point Update Range Sum](https://usaco.guide/gold/PURS)

## Liên kết
[[DFS]] · [[Tree DP]] · [[Prefix Sum]] · [[Trie]] · [[Binary Search with DP]] · [[Hash Table]] · [[DS&AL]]
