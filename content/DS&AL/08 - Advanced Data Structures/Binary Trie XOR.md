---
tags: [dsal, data-structure, trie, bit]
status: evergreen
---
# Binary Trie XOR

> Tên đầy đủ: **Binary Trie để tối ưu XOR theo từng bit**. Mỗi số 32-bit là một đường đi 32 tầng trong trie (mỗi node có 2 con: 0 và 1). Query "max XOR" trở thành **DFS greedy đi theo bit ngược lại**.

## 1. Khi nào dùng

- Tìm cặp có **max/min XOR**.
- Bài có ràng buộc trên giá trị XOR (đếm cặp có XOR trong khoảng).
- Truy vấn XOR **offline** (sort query rồi insert dần).

## 2. Template code

```python
class BinaryTrie:
    """Binary Trie cho int 32-bit. Hỗ trợ insert / max_xor."""
    def __init__(self):
        self.children = [None, None]        # 0, 1

    def insert(self, x: int, bits: int = 31) -> None:
        node = self
        for b in range(bits, -1, -1):
            bit = (x >> b) & 1
            if not node.children[bit]:
                node.children[bit] = BinaryTrie()
            node = node.children[bit]

    def max_xor(self, x: int, bits: int = 31) -> int:
        node, out = self, 0
        for b in range(bits, -1, -1):
            bit = (x >> b) & 1
            opposite = 1 - bit
            if node.children[opposite]:
                out |= 1 << b                  # ăn được bit này
                node = node.children[opposite]
            else:
                node = node.children[bit]
        return out
```

**Vì sao greedy đúng:** bit cao có trọng số lớn hơn **tổng tất cả** bit thấp hơn cộng lại, nên ăn được bit cao luôn tốt hơn mọi phương án hy sinh nó.

## 3. Ba biến thể cần biết

**1. Trie có `count` mỗi node** — cho phép "xoá" số khi cửa sổ trượt (giảm `count` thay vì xoá node). Cần cho LC 2935.

**2. Offline sort + insert dần** (LC 1707 Maximum XOR With an Element From Array): sort query theo `m` tăng dần, sort mảng tăng dần; với mỗi query chỉ insert các phần tử `≤ m` rồi mới query.

**3. Đếm cặp có XOR trong khoảng** (LC 1803):
```
count(L, R) = countLE(R) - countLE(L - 1)
```
`countLE(limit)` với mỗi `a[i]`, đi từ bit cao xuống:
- Nếu bit của `limit` là `1`: các số có XOR bit này `= 0` (cùng bit với `a[i]`) thì **chắc chắn ≤ limit** ⇒ **cộng cả subtree đó** vào đáp án; rồi đi tiếp xuống nhánh "khác bit".
- Nếu bit của `limit` là `0`: chỉ đi nhánh "cùng bit `a[i]`".

## 4. Cạm bẫy

- **Số bit không đủ**: `bits = 31` cho `int32` dương; nếu giá trị tới `10^9` thì 30 bit là đủ, nhưng dư vẫn an toàn — **thiếu** thì sai.
- **Quên rằng trie rỗng** — query trước khi insert bất kỳ số nào sẽ `AttributeError`. Insert phần tử đầu trước, hoặc kiểm `None`.
- **Strong Pair (LC 2935)**: định nghĩa `|x - y| ≤ min(x, y)`. Giả sử `x ≤ y` ⇒ `y - x ≤ x` ⇒ **`y ≤ 2x`**. Sort tăng dần ⇒ với mỗi `y`, các ứng viên `x ≥ y/2` nằm trong một **cửa sổ trượt** ⇒ trie cần hỗ trợ xoá.
- **Genetic Difference (LC 1938)**: `parents[i]` build cây, **value của node `i` chính là `i`**; trie chứa các giá trị dọc đường root → node hiện tại, thêm khi vào và **xoá khi ra** (DFS + undo).
- **Max XOR After Operations (LC 2317)**: không cần trie — chỉ cần OR tất cả các số. Đọc kỹ đề trước khi dựng trie.

## 5. Bài kinh điển

| LC | Bài | Biến thể |
| --- | --- | --- |
| [421](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) | Maximum XOR of Two Numbers | Trie cơ bản (cách khác: greedy prefix + hash, xem [[Bit Manipulation]]) |
| [1707](https://leetcode.com/problems/maximum-xor-with-an-element-from-array/) | Maximum XOR With an Element From Array | Offline sort + insert dần |
| [1803](https://leetcode.com/problems/count-pairs-with-xor-in-a-range/) | Count Pairs With XOR in a Range | `countLE` theo bit |
| [1938](https://leetcode.com/problems/maximum-genetic-difference-query/) | Maximum Genetic Difference Query | DFS + insert/remove |
| [2935](https://leetcode.com/problems/maximum-strong-pair-xor-ii/) | Maximum Strong Pair XOR II | Sliding window trên trie |
| [2317](https://leetcode.com/problems/maximum-xor-after-operations/) | Maximum XOR After Operations | Chỉ cần OR — bẫy đề |

## 6. Checklist áp dụng

- [ ] Giá trị max là bao nhiêu? Cần bao nhiêu bit?
- [ ] Có cần **xoá** khỏi trie không? (→ lưu `count` mỗi node)
- [ ] Query có ràng buộc giá trị không? (→ offline sort + insert dần)
- [ ] Bài hỏi max XOR hay **đếm** cặp? (đếm → `countLE`)
- [ ] Có cách đơn giản hơn trie không? (đọc kỹ đề trước)

## Tham khảo

- [cp-algorithms — Binary trie / XOR maximization](https://cp-algorithms.com/data_structures/trie.html)
- [USACO Guide — Binary Trie (Tries)](https://usaco.guide/adv/string-suffix)
- [Wikipedia — Trie](https://en.wikipedia.org/wiki/Trie)
- [LeetCode — Trie + Bit Manipulation tag](https://leetcode.com/tag/trie/)

## Liên kết
[[Trie]] · [[Bit Manipulation]] · [[Bitmask DP]] · [[Sliding Window]] · [[Advanced Tree]] · [[DS&AL]]
