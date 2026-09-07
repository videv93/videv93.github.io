---
tags: [dsal, technique, divide-conquer]
status: evergreen
---
# Divide and Conquer

> Chia bài thành các bài con **độc lập**, giải đệ quy, rồi kết hợp. Khác [[Dynamic Programming]] ở đúng một chữ: bài con của D&C **không trùng nhau**. Phần khó nhất luôn nằm ở bước `combine`.

## 1. Khi nào dùng

- Chia được mảng / khoảng / cây làm 2–3 phần độc lập.
- Cần giảm `O(n²)` → `O(n log n)` bằng cách kết hợp hai nửa trong `O(n)`.
- Master theorem áp được: `T(n) = aT(n/b) + f(n)`.

## 2. Template code

```python
def divide_conquer(arr, lo: int, hi: int):
    if lo >= hi:                        # base case
        return base_value(arr[lo])
    mid = (lo + hi) // 2
    left = divide_conquer(arr, lo, mid)
    right = divide_conquer(arr, mid + 1, hi)
    return combine(left, right)         # thường O(n) — phần khó nhất
```

**Khung tổng quát:**
```
solve(P):
    if |P| ≤ threshold: brute()
    chia P → P1, P2 (gần đều)
    A1 = solve(P1); A2 = solve(P2)
    return combine(A1, A2, cross_information)
```

## 3. Master theorem cheat

`T(n) = aT(n/b) + f(n)`:
- `a = b`, `f(n) = O(n)` → `O(n log n)` — merge sort
- `a = 1, b = 2`, `f(n) = O(1)` → `O(log n)` — [[Binary Search]]
- `a = 2, b = 2`, `f(n) = O(1)` → `O(n)`

```
n ━━ split ━━ n/2, n/2 ━━ split ━━ n/4 ×4 ━━ …   depth = log n
combine O(n) mỗi tầng × log n tầng ⇒ O(n log n)
```

## 4. Quickselect vs Heap vs Sort (LC 215 — Kth Largest)

|  | Quickselect | Heap size k | Sort |
| --- | --- | --- | --- |
| Trung bình | `O(n)` | `O(n log k)` | `O(n log n)` |
| Worst | `O(n²)` (giảm bằng random pivot) | `O(n log k)` | `O(n log n)` |
| Tại chỗ | ✅ | ❌ | ✅ |
| Code | Trung bình | Ngắn | Ngắn nhất |

Chi tiết heap ở [[Heap]].

## 5. Cạm bẫy

- **Quên random pivot cho quickselect** → adversary input đẩy về `O(n²)`.
- **Combine không đúng `O(n)`** → tổng độ phức tạp tệ hơn tưởng.
- **Maximum Subarray D&C**: quên xét **crossing subarray** (đoạn vắt qua `mid`) — đó chính là phần `combine`.
- **Merge sort đếm inversion**: đếm ở đúng thời điểm merge (khi lấy phần tử từ nửa phải, cộng số phần tử còn lại của nửa trái).
- **Closest Pair**: sau khi có `d = min(d1, d2)`, chỉ cần xét strip rộng `2d` quanh đường chia; sort strip theo `y`, mỗi điểm chỉ so với **6** điểm kế tiếp.

## 6. Bài kinh điển

| LC | Bài | Điểm học |
| --- | --- | --- |
| [53](https://leetcode.com/problems/maximum-subarray/) | Maximum Subarray (bản D&C) | Crossing subarray |
| — | Merge Sort & Count Inversions | Đếm trong lúc merge |
| [215](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Kth Largest (quickselect) | Partition + random pivot |
| [50](https://leetcode.com/problems/powx-n/) | Pow(x, n) | Fast power `O(log n)` |
| [241](https://leetcode.com/problems/different-ways-to-add-parentheses/) | Different Ways to Add Parentheses | Chia tại mỗi toán tử |
| — | Closest Pair of Points | Strip `2d`, so 6 điểm |

**Tự luyện:** LC 169, 218 (Skyline), 932, 1649.

## 7. Checklist áp dụng

- [ ] Bài con có thật sự **độc lập** không? (nếu trùng → DP)
- [ ] Bước `combine` tốn bao nhiêu? Đã tính vào Master theorem chưa?
- [ ] Có bỏ sót trường hợp "vắt qua điểm chia" không?
- [ ] Base case (1 phần tử, 0 phần tử) đã đúng chưa?
- [ ] Nếu là quickselect: đã random pivot chưa?

## Tham khảo

- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 4: Divide-and-Conquer, Master theorem đầy đủ
- [Wikipedia — Master theorem](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms))
- [cp-algorithms — Divide and conquer](https://cp-algorithms.com/others/divide_and_conquer_dp.html)
- [Wikipedia — Closest pair of points problem](https://en.wikipedia.org/wiki/Closest_pair_of_points_problem)

## Liên kết
[[Recursion]] · [[Binary Search]] · [[Heap]] · [[Sorting]] · [[Dynamic Programming]] · [[Big-O Analysis]] · [[DS&AL]]
