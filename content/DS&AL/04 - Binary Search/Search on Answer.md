---
tags: [dsal, technique, binary-search]
status: evergreen
---
# Search on Answer

> Kỹ thuật mạnh hơn hẳn [[Binary Search]] thường: thay vì search trên **index**, ta search trên **giá trị đáp án**. Điều kiện duy nhất: tồn tại predicate `check(x)` **đơn điệu** trên miền đáp án.

## 1. Khi nào dùng

- Đề hỏi *"min X sao cho …"* hoặc *"max X sao cho …"*.
- Miền đáp án bound được rõ ràng trên/dưới.
- Dấu hiệu: bài trông giống DP nhưng state cồng kềnh; hoặc constraint `n ≤ 10^9` ([[Big-O Analysis]]).

**Quy trình 4 bước:**
1. Xác định **đáp án là biến gì** (capacity, speed, distance…).
2. Bound `[lo, hi]` của đáp án.
3. Viết `check(mid) -> bool` và **chứng minh nó đơn điệu**.
4. Binary search "first True" hoặc "last True".

## 2. Template code

```python
def search_on_answer(lo: int, hi: int, check) -> int:
    """Giá trị nhỏ nhất trong [lo, hi] thoả check(x) = True."""
    while lo < hi:
        mid = (lo + hi) // 2
        if check(mid): hi = mid          # cố thu về phía True
        else:          lo = mid + 1
    return lo
```

## 3. Bảng universal — điền vào là ra lời giải

| Bài | Đáp số tìm | `lo, hi` | Predicate `can(x)` | Mục tiêu |
| --- | --- | --- | --- | --- |
| Koko (LC 875) | tốc độ ăn `k` | `1, max(piles)` | tổng giờ ≤ H | **min** x thoả |
| Ship Packages (LC 1011) | capacity | `max(w), sum(w)` | giao trong ≤ D ngày | **min** |
| Split Array (LC 410) | largest subarray sum | `max(arr), sum(arr)` | chia được ≤ m phần | **min** |
| Aggressive Cows | khoảng cách `d` | `1, max - min` | đặt được ≥ C bò | **max** x thoả |
| Magnetic Force (LC 1552) | force | `1, max - min` | đặt được ≥ m | **max** |

## 4. Chứng minh tính đơn điệu (bắt buộc nói ra)

- **Koko**: `k` lớn → ăn nhanh hơn → tổng giờ giảm ⇒ `can` chuyển `F → T` khi `x` tăng.
- **Aggressive Cows**: `d` lớn → khó đặt hơn → số bò đặt được giảm ⇒ `can` chuyển `T → F` khi `x` tăng (tìm **last True**).

Nếu không chứng minh được đơn điệu thì pattern này **không áp dụng được** — đó là điều kiện tiên quyết, không phải chi tiết.

## 5. Cạm bẫy

- **Bound sai**: `lo` phải là giá trị nhỏ nhất *có thể hợp lệ* — với Split Array là `max(arr)`, không phải `0`.
- **Nhầm first-true với last-true** — với last-true phải dùng `mid = (lo + hi + 1) // 2` (ceil), nếu không sẽ lặp vô hạn.
- **`check` tốn kém** — độ phức tạp tổng là `O(check × log range)`; nếu `check` là `O(n)` thì tổng `O(n log range)`.
- **Median of Two Sorted Arrays (LC 4) KHÔNG phải search on answer** — nó là **binary partition**: tìm `i, j` sao cho `A[..i] ∪ B[..j]` là nửa nhỏ. Đừng ép vào template chung.

**Aggressive Cows — feasibility:**
```
positions: [1, 2, 4, 8, 9], cows c = 3
d = 3 ⇒ chọn 1, 4, 8 ✅ (3 con)
d = 4 ⇒ chọn 1, 8    ❌ (chỉ 2 con)
⇒ max d = 3
```

## 6. Bài kinh điển

| LC | Bài |
| --- | --- |
| [875](https://leetcode.com/problems/koko-eating-bananas/) | Koko Eating Bananas |
| [1011](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) | Capacity To Ship Packages Within D Days |
| [410](https://leetcode.com/problems/split-array-largest-sum/) | Split Array Largest Sum |
| [719](https://leetcode.com/problems/find-k-th-smallest-pair-distance/) | Find K-th Smallest Pair Distance |
| [4](https://leetcode.com/problems/median-of-two-sorted-arrays/) | Median of Two Sorted Arrays (binary partition) |
| — | Aggressive Cows (bài kinh điển SPOJ) |

**Tự luyện:** LC 668, 1283, 1482, 2616.

## 7. Checklist áp dụng

- [ ] Đáp án là biến gì? Đơn vị của nó?
- [ ] `lo`, `hi` có bao trọn miền đáp án hợp lệ không?
- [ ] Đã phát biểu và **chứng minh** tính đơn điệu của `check` chưa?
- [ ] first-true hay last-true? Nếu last-true, `mid` đã dùng ceil chưa?
- [ ] Tổng độ phức tạp `O(check × log range)` có nằm trong constraint không?

## Tham khảo

- [USACO Guide — Binary Search on the Answer](https://usaco.guide/silver/binary-search)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 3.3, phần "Finding the optimal solution"
- [Wikipedia — Parametric search](https://en.wikipedia.org/wiki/Parametric_search)
- [LeetCode — Binary Search tag, mức Hard](https://leetcode.com/tag/binary-search/)

## Liên kết
[[Binary Search]] · [[Binary Search with Graph]] · [[Binary Search with DP]] · [[Greedy]] · [[Big-O Analysis]] · [[DS&AL]]
