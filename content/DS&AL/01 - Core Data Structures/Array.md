---
tags: [dsal, data-structure, array]
status: evergreen
---
# Array

> Array là cấu trúc cơ bản nhất nhưng xuất hiện nhiều nhất trong phỏng vấn. Gần như mọi pattern nâng cao ([[Two Pointers]], [[Sliding Window]], [[Prefix Sum]], [[Monotonic Stack and Deque]]) đều là một cách duyệt array. Thói quen cần hình thành: **nghĩ về index, không nghĩ về phần tử**.

## 1. Khi nào dùng

- Đề cho một mảng số/chuỗi, hỏi tìm cặp / bộ ba / dãy con thoả điều kiện.
- Có ràng buộc **in-place** hoặc **O(1) extra space**.
- Dạng quen: *"tìm chỉ số"*, *"đếm số lần"*, *"đảo/xoay/sắp xếp lại"*, *"chia mảng làm hai phần"*.

**3 câu hỏi chốt khi nhận đề:**
1. Mảng có sorted không? Có duplicate không?
2. Được modify in-place không, hay phải giữ nguyên input?
3. Giá trị có thể âm / bằng 0 / có overflow không?

## 2. Bốn trick nền

```python
from typing import List

def two_pass_pattern(nums: List[int]) -> List[int]:
    """Pass 1 gom thông tin (prefix/suffix/count), pass 2 dùng thông tin đó."""
    n = len(nums)
    aux = [0] * n
    for i in range(n):
        aux[i] = ...          # tuỳ bài
    return [... for i in range(n)]

def two_pointers_in_place(nums: List[int]) -> int:
    """slow = vị trí ghi, fast = vị trí đọc. Trả độ dài phần hợp lệ."""
    slow = 0
    for fast in range(len(nums)):
        if condition(nums[fast]):
            nums[slow] = nums[fast]
            slow += 1
    return slow
```

1. **In-place** — ghi đè bằng con trỏ `slow`, không cấp phát mảng mới.
2. **Two-pass** — lượt 1 gom thông tin, lượt 2 dùng nó (Product Except Self).
3. **Prefix–suffix** — tích/tổng từ trái và từ phải, kết hợp lại.
4. **Two-pointer** — hội tụ từ hai đầu hoặc cùng chiều ([[Two Pointers]]).

## 3. Bảng quyết định trước khi code

| Câu hỏi | Nếu YES | Nếu NO |
| --- | --- | --- |
| Cho phép mutate input? | In-place (Move Zeroes, Rotate) | Tạo mảng kết quả |
| Cần giữ thứ tự gốc? | Two-pointer cùng chiều | Có thể swap tự do |
| Trả về **index** hay **value**? | Cẩn thận khi sort: lưu `(value, index)` | — |
| Có số 0 / số âm? | Product Except Self **không** dùng được phép chia | Prefix × suffix bình thường |
| Cần O(1) bộ nhớ? | 3-reverse trick, in-place marker | Được dùng hash / mảng phụ |

**Rotate Array (LC 189) — ba cách:**

| Cách | Time | Space | Khi nào chọn |
| --- | --- | --- | --- |
| Mảng phụ | `O(n)` | `O(n)` | Dễ viết nhất, ít bug nhất |
| **3-reverse** | `O(n)` | `O(1)` | Mặc định trong phỏng vấn |
| Cyclic replacement (GCD) | `O(n)` | `O(1)` | Khi interviewer hỏi "không dùng reverse" |

## 4. Cạm bẫy

- **Off-by-one** khi đảo đoạn `[l, r]` — luôn viết rõ đóng/mở khoảng.
- **Shallow copy**: `matrix = [[0]*n]*m` tạo `m` reference tới **cùng một** list. Dùng `[[0]*n for _ in range(m)]`.
- **Mutate trong khi lặp** (`for x in lst: lst.remove(x)`) → nhảy phần tử.
- **Product Except Self với phép chia** — hỏng ngay khi mảng có số 0.
- **Sort làm mất index gốc** — nếu output cần index, lưu `(value, idx)` trước khi sort ([[Sorting]]).

## 5. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [1](https://leetcode.com/problems/two-sum/) | Two Sum | Hash complement — [[Hash Table]] |
| [121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Best Time to Buy and Sell Stock | Giữ min chạy dọc |
| [238](https://leetcode.com/problems/product-of-array-except-self/) | Product of Array Except Self | Prefix × suffix, không chia |
| [283](https://leetcode.com/problems/move-zeroes/) | Move Zeroes | slow/fast in-place |
| [11](https://leetcode.com/problems/container-with-most-water/) | Container With Most Water | Two-pointer hội tụ |
| [189](https://leetcode.com/problems/rotate-array/) | Rotate Array | 3-reverse |

**Tự luyện:** LC 26, 27, 88, 169 (Boyer–Moore), 268, 287, 525, 769.

## 6. Checklist áp dụng

- [ ] Đã hỏi sorted / duplicate / mutate được không?
- [ ] Output cần index hay value? Nếu index thì đã tránh sort chưa?
- [ ] Có số âm / số 0 làm hỏng logic nhân-chia không?
- [ ] Mảng 2D có bị shallow copy không?
- [ ] Đã thử edge case: rỗng, 1 phần tử, toàn bộ giống nhau?

## Cửa ngõ sang pattern khác

[[Prefix Sum]] (subarray sum, range update) · [[Two Pointers]] (3Sum, Container) · [[Sliding Window]] (subarray có ràng buộc động) · [[Sorting]] + [[Greedy]] (Meeting Rooms, Jump Game) · [[Monotonic Stack and Deque]] (Next Greater, Largest Rectangle).

## Tham khảo

- [LeetCode Explore — Array and String](https://leetcode.com/explore/learn/card/fun-with-arrays/) — bài tập nền có hướng dẫn
- [Python Wiki — Time Complexity (list)](https://wiki.python.org/moin/TimeComplexity) — chi phí thật của `insert`, `pop(0)`, slicing
- [USACO Guide — Prefix Sums & Two Pointers](https://usaco.guide/silver/prefix-sums) — hệ thống hoá kỹ thuật quét mảng
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 2, phần in-place algorithms

## Liên kết
[[Two Pointers]] · [[Prefix Sum]] · [[Sliding Window]] · [[Sorting]] · [[Hash Table]] · [[String]] · [[DS&AL]]
