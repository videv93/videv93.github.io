---
tags: [dsal, technique, binary-search]
status: evergreen
---
# Binary Search

> "Chia đôi mảng đã sort" nghe dễ, nhưng đây là **bug magnet số một** trong phỏng vấn. Cách chữa: chọn **một template duy nhất** và bám suốt đời — ở đây là nửa khoảng `[lo, hi)` với `while lo < hi`, đồng bộ với `bisect` của Python.

## 1. Khi nào dùng

- Có cấu trúc **đơn điệu** (đã sort, hoặc có thể "search on answer" — xem [[Search on Answer]]).
- Đề yêu cầu `O(log n)`.
- Cần tìm **boundary**: first/last occurrence, insert position.
- Không gian tìm kiếm biểu diễn được bằng một đoạn `[lo, hi]`, chia được thành hai nửa "có đáp án" / "không có đáp án".

**Mẫu suy nghĩ chuẩn:**
1. **Không gian tìm kiếm là gì?** (index / giá trị / đáp án)
2. **Hàm `check(mid)`** trả True/False thế nào? Nó có **đơn điệu** không?
3. **Đáp án là ranh giới nào?** First `True` hay last `False`?

## 2. Template code — dùng một cái duy nhất

```python
def lower_bound(nums, target) -> int:
    """Vị trí đầu tiên có nums[i] >= target; không có thì trả len(nums)."""
    lo, hi = 0, len(nums)             # [lo, hi) — nửa mở
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target: lo = mid + 1
        else:                  hi = mid
    return lo

def upper_bound(nums, target) -> int:
    """Vị trí đầu tiên có nums[i] > target."""
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] <= target: lo = mid + 1
        else:                   hi = mid
    return lo

def binary_search_answer(check, lo: int, hi: int) -> int:
    """Giá trị nhỏ nhất trong [lo, hi] thoả check(x)=True (check đơn điệu F→T)."""
    while lo < hi:
        mid = (lo + hi) // 2
        if check(mid): hi = mid
        else:          lo = mid + 1
    return lo
```

Python có sẵn: `bisect_left` = `lower_bound`, `bisect_right` = `upper_bound`.

## 3. Hai invariant — chọn một, đừng trộn

**Closed `[lo, hi]`** (tìm chính xác giá trị):
```
lo, hi = 0, n - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if check(mid): return mid
    elif too_small(mid): lo = mid + 1
    else: hi = mid - 1
return -1
```

**Half-open `[lo, hi)`** (first-true / lower_bound):
```
lo, hi = 0, n
while lo < hi:
    mid = (lo + hi) // 2
    if pred(mid): hi = mid
    else: lo = mid + 1
return lo          # vị trí True đầu tiên, hoặc n nếu không có
```

## 4. Cạm bẫy

- **Trộn hai invariant** (`lo <= hi` với `hi = mid`) → vòng lặp vô hạn. Đây là bug #1.
- **Khởi tạo `hi` sai**: index thì `n` (nửa mở) hoặc `n-1` (đóng); search on answer thì `max` hoặc `max+1`.
- **Không xác định trước "không tìm thấy trả gì"** — `-1`, `n`, hay `lo`?
- **Rotated array (LC 33)**: mỗi bước xác định **nửa nào đang sorted** trước, rồi mới kiểm target có nằm trong nửa đó không.
- **Overflow `(lo+hi)//2`**: Python an toàn; Java/C++ phải viết `lo + (hi - lo) // 2`. Với `Sqrt(x)`, `mid*mid` tràn `int32` — dùng `mid <= x / mid`.

## 5. Bài kinh điển

| LC | Bài | Dạng |
| --- | --- | --- |
| [704](https://leetcode.com/problems/binary-search/) | Binary Search | Tìm chính xác |
| [35](https://leetcode.com/problems/search-insert-position/) | Search Insert Position | `lower_bound` |
| [278](https://leetcode.com/problems/first-bad-version/) | First Bad Version | first-true trên predicate |
| [34](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) | Find First and Last Position | `lower_bound` + `upper_bound` |
| [33](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Search in Rotated Sorted Array | Xác định nửa đã sort |
| [69](https://leetcode.com/problems/sqrtx/) | Sqrt(x) | Search on answer đơn giản |

**Tự luyện:** LC 162, 153, 540, 658, 1011, 875.

## 6. Checklist trước khi submit

- [ ] `lo`, `hi` khởi tạo đúng theo loại khoảng?
- [ ] Điều kiện vòng lặp (`<` hay `<=`) khớp với loại khoảng?
- [ ] Cập nhật `mid+1` / `mid-1` / `mid` đúng — có khả năng lặp vô hạn không?
- [ ] Trường hợp không tìm thấy trả về gì?
- [ ] Đã test: mảng rỗng, 1 phần tử, target nhỏ hơn min, lớn hơn max, có duplicate?

## Tham khảo

- [Python docs — bisect](https://docs.python.org/3/library/bisect.html)
- [Binary search — Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm) — phần "Implementation issues" và bug lịch sử `(lo+hi)/2`
- [USACO Guide — Binary Search](https://usaco.guide/silver/binary-search)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 3.3

## Liên kết
[[Search on Answer]] · [[Binary Search with Graph]] · [[Binary Search with DP]] · [[Sorting]] · [[Divide and Conquer]] · [[DS&AL]]
