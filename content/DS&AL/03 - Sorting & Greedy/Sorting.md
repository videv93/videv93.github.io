---
tags: [dsal, technique, sorting]
status: evergreen
---
# Sorting

> Sort tự nó là **bài toán đã giải** — Python có Timsort (`O(n log n)` worst, stable). Cái cần học không phải cách cài quicksort, mà là: *khi nào sort là tiền đề giải bài*, và **comparator tuỳ biến**.

## 1. Khi nào dùng

- Đề có cấu trúc thứ tự: interval, thời gian, lexicographic.
- Sort trước làm bài "nhỏ lại" — `O(n log n)` chỉ là chi phí mở màn.
- Cần so sánh **không theo trị số tự nhiên** — ví dụ `"33"` và `"3"` phải so theo cách nối chuỗi (Largest Number).

**3 câu hỏi vàng:**
1. **Sort theo khoá nào?** start, end, length, freq, ratio?
2. **Sort xong duyệt thế nào?** one-pass / two pointers / sweep line / heap?
3. **Cần stable không?** Python `sorted` mặc định stable — đây là tài sản quý.

## 2. Template code

```python
from functools import cmp_to_key

nums.sort(key=lambda x: x[0])                  # 1) khoá đơn
nums.sort(key=lambda x: (x[0], -x[1]))         # 2) nhiều khoá: x[0] tăng, x[1] giảm

def cmp(a, b) -> int:                          # 3) comparator tuỳ biến
    if a + b > b + a: return -1                # a đứng trước
    if a + b < b + a: return 1
    return 0
arr.sort(key=cmp_to_key(cmp))

events = [(start, +1), (end, -1)]              # 4) sweep line
events.sort()
```

## 3. Sort mua gì / mất gì

**Mua:**
- Đưa dữ liệu về monotonic → mở ra [[Two Pointers]], [[Binary Search]], sweep line.
- Gom các phần tử "giống nhau" cạnh nhau (anagram, interval).

**Mất:**
- **Mất index gốc** — nếu output cần index, lưu `(value, idx)` **trước** khi sort.
- **Mutate input** — làm rõ với interviewer trước khi sort.
- `O(n log n)`, không miễn phí.

## 4. Cạm bẫy

- **Largest Number (LC 179)**: so `(a+b)` vs `(b+a)` là quan hệ **bắc cầu** nên `cmp_to_key` an toàn. Python 3 không còn tham số `cmp=`. Edge `"00…0"` → strip leading zeros sau khi nối.
- **Sort xong quên khôi phục index** → trả sai đáp án cho bài hỏi vị trí.
- **Dutch National Flag (LC 75)**: ba con trỏ `low/mid/high`; khi swap với `high` thì **không** tăng `mid` (phần tử vừa đổi về chưa được xét).
- **Wiggle Sort LC 280 vs 324**: LC 280 (`≤ ≥ ≤`) chỉ cần swap láng giềng sai → `O(n)`; LC 324 (`< > <` chặt) cần sort + interleave hoặc median trick.
- **Sort để tìm top-k** khi `k ≪ n` — heap `O(n log k)` tốt hơn ([[Heap]]).

## 5. Meeting Rooms II — heap vs sweep

|  | Heap | Sweep line |
| --- | --- | --- |
| Tư duy | "Phòng nào trống sớm nhất → tái dùng" | Đếm overlap tại mỗi mốc thời gian |
| Code | `heapq` + sort theo start | Sort events `(time, ±1)` |
| Mở rộng | Dễ trả về **lịch cụ thể** (phòng nào, lúc nào) | Khó trả về lịch |

Chi tiết ở [[Interval]].

## 6. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [75](https://leetcode.com/problems/sort-colors/) | Sort Colors / Dutch Flag | 3 con trỏ, một lượt |
| [56](https://leetcode.com/problems/merge-intervals/) | Merge Intervals | Sort theo start + gộp |
| [179](https://leetcode.com/problems/largest-number/) | Largest Number | `cmp_to_key` với `a+b` vs `b+a` |
| [253](https://leetcode.com/problems/meeting-rooms-ii/) | Meeting Rooms II | Heap hoặc sweep line |
| [791](https://leetcode.com/problems/custom-sort-string/) | Custom Sort String | `key=order.index` |
| [280](https://leetcode.com/problems/wiggle-sort/) | Wiggle Sort | Swap láng giềng, `O(n)` |

**Tự luyện:** LC 1859, 1636, 252, 1235, 1996, 1366.

## 7. Checklist áp dụng

- [ ] Output có cần index gốc không? Đã lưu `(value, idx)` chưa?
- [ ] Được phép mutate input không?
- [ ] Sort theo khoá nào — và có cần tie-breaker không?
- [ ] Có tận dụng được tính stable không (sort nhiều lần thay vì comparator phức tạp)?
- [ ] Có thật sự cần sort toàn bộ, hay heap/quickselect đủ?

## Tham khảo

- [Python docs — Sorting HOW TO](https://docs.python.org/3/howto/sorting.html) — key function, `cmp_to_key`, stability
- [Timsort — Wikipedia](https://en.wikipedia.org/wiki/Timsort)
- [Dutch national flag problem — Wikipedia](https://en.wikipedia.org/wiki/Dutch_national_flag_problem)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 7–8: Quicksort, sorting in linear time

## Liên kết
[[Interval]] · [[Greedy]] · [[Two Pointers]] · [[Heap]] · [[Binary Search]] · [[Sorting DP]] · [[DS&AL]]
