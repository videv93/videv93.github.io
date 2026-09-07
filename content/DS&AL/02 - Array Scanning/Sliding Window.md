---
tags: [dsal, technique, sliding-window]
status: evergreen
---
# Sliding Window

> Sliding window = [[Two Pointers]] cùng chiều. Window `[l, r]` mở rộng `r`, co `l` khi vi phạm điều kiện. Giải gọn rất nhiều bài "longest / shortest / count subarray thoả điều kiện" trong `O(n)`.

## 1. Điều kiện áp dụng (quan trọng nhất)

Sliding window **chỉ đúng** khi tồn tại invariant **đơn điệu** dưới thao tác mở rộng/co lại:
- Subarray sum **không âm** → mở rộng làm tổng tăng, co làm tổng giảm ✅
- Subarray sum **có số âm** → mở rộng có thể làm tổng giảm ❌ → dùng [[Prefix Sum]] + hash thay thế

Đây là ranh giới hay bị bỏ qua nhất; hỏi ngay "mảng có số âm không?" khi nhận đề.

## 2. Hai mẫu chính + trick exactly-K

```python
# 1) Variable-size: longest thoả điều kiện
l, best = 0, 0
state = ...
for r in range(len(s)):
    add(s[r], state)
    while not valid(state):
        remove(s[l], state); l += 1
    best = max(best, r - l + 1)

# 2) Count subarray "exactly K" = atMost(K) - atMost(K-1)
def at_most(k):
    l, total, state = 0, 0, ...
    for r in range(len(arr)):
        add(arr[r], state)
        while violates(state):
            remove(arr[l], state); l += 1
        total += r - l + 1        # mọi subarray kết thúc tại r đều hợp lệ
    return total

result = at_most(k) - at_most(k - 1)
```

| Loại | Pattern | Bài |
| --- | --- | --- |
| Fixed `k` | Giữ `r - l + 1 == k`, trượt 1 bước | LC 643, 567 |
| Variable, co khi vi phạm | Mở `r`, co `l` đến khi hợp lệ | LC 3, 76, 209 |
| atMost K | Mở `r`, co `l` đến khi `< K` đặc tính | LC 992, 1248 |

## 3. Minimum Window Substring — need/have

```
S = "ADOBECODEBANC", T = "ABC"
need = {A:1, B:1, C:1}; need_unique = 3
have_unique = số ký tự đã match ĐỦ số lượng

Mở rộng r đến khi have_unique == need_unique
→ co l cho tới khi mất một ký tự cần thiết → cập nhật min
```
**Bug điển hình:** nhầm "match đủ" với "tổng count đủ". Chỉ tăng `have_unique` khi `cnt[c] == need[c]` (vừa khớp), giảm khi `cnt[c] < need[c]` (vừa thiếu).

## 4. Cạm bẫy

- **Dùng sliding window cho mảng có số âm** → sai âm thầm, test nhỏ vẫn pass.
- **Re-compute state trong window** mỗi bước (ví dụ `max(window)`) → `O(n·k)`. Phải track incremental, hoặc dùng monotonic deque ([[Monotonic Stack and Deque]]).
- **Quên cập nhật `best` sau vòng while** hoặc cập nhật khi window đang không hợp lệ.
- **Fixed-size window quên bỏ phần tử ra khỏi state** khi `r - l + 1 > k`.
- **`exactly K` giải trực tiếp** — gần như luôn khó hơn `atMost(K) - atMost(K-1)`.

## 5. Bài kinh điển

| LC | Bài | Mẫu |
| --- | --- | --- |
| [3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Longest Substring Without Repeating | Variable + last-index map |
| [76](https://leetcode.com/problems/minimum-window-substring/) | Minimum Window Substring | need/have counter |
| [424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Longest Repeating Char Replacement | Window - maxFreq ≤ k |
| [567](https://leetcode.com/problems/permutation-in-string/) | Permutation in String | Fixed-size + counter |
| [992](https://leetcode.com/problems/subarrays-with-k-different-integers/) | Subarrays with K Different Integers | atMost(K) − atMost(K−1) |
| [239](https://leetcode.com/problems/sliding-window-maximum/) | Sliding Window Maximum | Monotonic deque, **không** phải counter |

**Tự luyện:** LC 209, 340, 487, 904, 1004, 1208.

## 6. Checklist áp dụng

- [ ] Mảng có số âm không? (có → prefix sum + hash, không phải sliding window)
- [ ] Invariant có đơn điệu khi mở rộng/co không?
- [ ] State được cập nhật **incremental** hay đang tính lại mỗi bước?
- [ ] Cập nhật đáp án ở đúng chỗ (sau khi window hợp lệ) chưa?
- [ ] Nếu là "exactly K": đã thử `atMost(K) - atMost(K-1)` chưa?

## Tham khảo

- [USACO Guide — Sliding Window](https://usaco.guide/gold/sliding-window)
- [LeetCode — Sliding Window tag](https://leetcode.com/tag/sliding-window/)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 8.3: Sliding window minimum
- [NeetCode — Sliding Window playlist](https://neetcode.io/roadmap)

## Liên kết
[[Two Pointers]] · [[Prefix Sum]] · [[Monotonic Stack and Deque]] · [[Hash Table]] · [[String]] · [[DS&AL]]
