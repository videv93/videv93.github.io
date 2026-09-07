---
tags: [dsal, technique, two-pointers]
status: evergreen
---
# Two Pointers

> Vũ khí cơ bản nhất, xuất hiện xuyên suốt [[Array]], [[String]], [[Linked List]]. Hệ thống hoá thành **3 mẫu**: hai đầu (đối nghịch), slow & fast (khác tốc độ), cùng chiều (nền của [[Sliding Window]]).

## 1. Ba mẫu — chọn shape nào?

| Shape | Khi dùng | Bài tiêu biểu |
| --- | --- | --- |
| **Two-end** (`l=0`, `r=n-1`, đi vào giữa) | Đã sort, palindrome, container | LC 11, 15, 167, 125 |
| **Same-direction** (`l`, `r` cùng tiến) | Subarray với invariant — [[Sliding Window]] là ca đặc biệt | LC 26, 283 |
| **Slow-fast** (`slow` 1 bước, `fast` 2 bước) | Cycle detection, tìm middle | LC 141, 142, 876 |

## 2. Khi nào dùng

- Mảng/chuỗi **đã sort**, cần tìm cặp / bộ 3 / bộ k.
- Cần `O(1)` extra space.
- Bài có kiểu "đuổi nhau": hai biến trên cùng cấu trúc di chuyển theo quy tắc.

## 3. Template code

```python
# 1) Hai đầu (mảng đã sort)
l, r = 0, len(arr) - 1
while l < r:
    s = arr[l] + arr[r]
    if s == target:
        ...; l += 1; r -= 1
    elif s < target:
        l += 1
    else:
        r -= 1

# 2) Slow & fast (in-place compaction)
slow = 0
for fast in range(len(arr)):
    if condition(arr[fast]):
        arr[slow] = arr[fast]
        slow += 1
```

## 4. 3Sum / 4Sum — checklist skip duplicate

```python
nums.sort()
for i in range(n):
    if i > 0 and nums[i] == nums[i-1]: continue          # (1) skip anchor dup
    l, r = i + 1, n - 1
    while l < r:
        s = nums[i] + nums[l] + nums[r]
        if s == 0:
            ans.append([nums[i], nums[l], nums[r]])
            l += 1; r -= 1
            while l < r and nums[l] == nums[l-1]: l += 1  # (2) skip left dup
            while l < r and nums[r] == nums[r+1]: r -= 1  # (3) skip right dup
        elif s < 0: l += 1
        else: r -= 1
```
Với 4Sum còn thêm một vòng anchor nữa ⇒ **4 chỗ skip**. Quên chỗ nào cũng sinh duplicate.

## 5. Cạm bẫy

- **Quên sort** trước khi dùng mẫu hai đầu — logic dịch con trỏ chỉ đúng khi monotonic.
- **Skip duplicate thiếu chỗ** → output có bộ trùng.
- **Slow-fast quên điều kiện `fast and fast.next`** → `AttributeError` ở [[Linked List]].
- **Chứng minh tính đúng đắn**: mẫu hai đầu chỉ hợp lệ khi việc dịch một đầu **chắc chắn không bỏ sót** đáp án. Với Container With Most Water: luôn dịch con trỏ ở phía thanh **thấp hơn**, vì giữ thanh thấp lại thì diện tích không thể tăng.

**Trapping Rain Water — hai cách:**

|  | Prefix/suffix max | Two pointers |
| --- | --- | --- |
| Time | `O(n)` | `O(n)` |
| Space | `O(n)` | **`O(1)`** |
| Trực giác | nước tại `i` = `min(L[i], R[i]) - h[i]` | Cần lập luận "thanh thấp hơn quyết định" |

Trong phỏng vấn: **nói prefix/suffix trước** (dễ giải thích), tối ưu sang two-pointer khi interviewer hỏi về space.

## 6. Bài kinh điển

| LC                                                                          | Bài                       | Mẫu                               |
| --------------------------------------------------------------------------- | ------------------------- | --------------------------------- |
| [15](https://leetcode.com/problems/3sum/)                                   | 3Sum                      | Two-end + skip dup                |
| [42](https://leetcode.com/problems/trapping-rain-water/)                    | Trapping Rain Water       | Two-end `O(1)` space              |
| [11](https://leetcode.com/problems/container-with-most-water/)              | Container With Most Water | Two-end greedy                    |
| [75](https://leetcode.com/problems/sort-colors/)                            | Sort Colors               | Three-way partition ([[Sorting]]) |
| [80](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/) | Remove Duplicates II      | Slow-fast, cho phép 2 lần         |
| [18](https://leetcode.com/problems/4sum/)                                   | 4Sum                      | Hai anchor + two-end              |

**Tự luyện:** LC 26, 27, 88 (merge in-place từ cuối), 287 (Floyd), 905.

## 7. Checklist áp dụng

- [ ] Mảng đã sort chưa? (mẫu hai đầu bắt buộc sort)
- [ ] Đã skip duplicate ở **tất cả** các vị trí anchor và inner chưa?
- [ ] Có lập luận được vì sao dịch con trỏ này (không phải con trỏ kia) không bỏ sót nghiệm?
- [ ] Với LL: điều kiện `fast and fast.next` đã đủ chưa?
- [ ] Kết quả có yêu cầu index gốc không? (sort làm mất index)

## Tham khảo

- [USACO Guide — Two Pointers](https://usaco.guide/silver/two-pointers)
- [LeetCode Explore — Two Pointer Technique](https://leetcode.com/explore/learn/card/array-and-string/205/array-two-pointer-technique/)
- [Wikipedia — Cycle detection (Floyd)](https://en.wikipedia.org/wiki/Cycle_detection)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 8: Amortized analysis (two pointers)

## Liên kết
[[Array]] · [[Sliding Window]] · [[Sorting]] · [[Linked List]] · [[String]] · [[DS&AL]]
