---
tags: [dsal, string, pattern-matching]
status: evergreen
---
# Z Function

> `z[i]` = độ dài đoạn dài nhất bắt đầu tại `s[i]` **đồng thời** là prefix của `s` (quy ước `z[0] = n`). Tính được trong `O(n)`. Nhiều người thấy Z **dễ hình dung hơn LPS** của [[KMP]] — cùng sức mạnh, khác cách nghĩ.

## 1. Z-box invariant — chìa khoá của `O(n)`

Z-box `[l, r)` = đoạn đã match với prefix, có `r` lớn nhất tới hiện tại.
```
[l ........... r)
s :  ┌───┐    ┌──────────────┐
     │ A │ ...│  B = prefix  │  ...
     └───┘    └──────────────┘
       └────── B khớp với prefix của s, dài r - l

Khi xét z[i] với i ∈ [l, r):
  • Đã biết z[i - l] (vì s[l..r) = s[0..r-l))
  • Lower bound: z[i] = min(r - i, z[i - l])
  • Sau đó mở rộng bằng so sánh ký tự
Khi i ≥ r:
  • Không có thông tin → so sánh từ s[0]
Cập nhật box khi i + z[i] > r.
```

**Chứng minh `O(n)`:** mỗi lần "extend" trong while loop làm `r` tăng. `r` đơn điệu không giảm và `≤ n` ⇒ tổng số extend `≤ n`. Cộng `O(1)` cho mỗi `i` ⇒ tổng `O(n)`.

## 2. Trace với `s = "aabxaabxaab"`

```
i   l  r   z[i]
0   0  0   11    (quy ước z[0] = n)
1   0  0   1     i ≥ r → so từ đầu: s[1]=a=s[0] ✓, s[2]=b≠s[1]=a ✗ ⇒ 1; box = [1,2)
2   1  2   0     s[2]=b ≠ s[0]=a
3   1  2   0
4   1  2   7     i ≥ r → so từ đầu, khớp "aabxaab" ⇒ 7; box = [4,11)
5   4 11   1     min(11-5, z[1]) = min(6,1) = 1; extend: s[6]=b ≠ s[1]=a ⇒ 1
6   4 11   0     min(5, z[2]) = 0
7   4 11   0     min(4, z[3]) = 0
8   4 11   3     min(3, z[4]) = min(3,7) = 3
9   4 11   1     min(2, z[5]) = 1
10  4 11   0     min(1, z[6]) = 0

z = [11, 1, 0, 0, 7, 1, 0, 0, 3, 1, 0]
```

## 3. Template code

```python
def z_function(s: str) -> list[int]:
    n = len(s)
    z = [0] * n
    z[0] = n
    l = r = 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return z
```

## 4. Ứng dụng

- **Pattern matching**: build `z` của `P + '#' + T`; vị trí nào có `z[i] == len(P)` là một match.
- **Đếm echo substring** (`s[i:i+L] == s[i+L:i+2L]`): kiểm `z[i+L] ≥ L`.
- **Sum of Scores of Built Strings (LC 2223)**: đáp án là tổng của mảng `z` (`z[0] = n` tính cả chuỗi đầy đủ).
- **LCP giữa các suffix** — nền cho nhiều bài chuỗi nâng cao.

## 5. Cạm bẫy

- **Quên `z[0] = n`** (hoặc quy ước `0`) — phải nhất quán trong cả bài.
- **Sentinel `#` xuất hiện trong input** → match giả. Chọn ký tự chắc chắn ngoài charset.
- **Điều kiện `i < r` vs `i <= r`** — dùng `i < r` với box nửa mở `[l, r)`; trộn hai quy ước là nguồn off-by-one.
- **Maximum Deletions on a String (LC 2430)**: cần `lcp[i][j]` = LCP của `s[i:]` và `s[j:]`. Z tính được gián tiếp nhưng **DP 2D tự nhiên hơn** — bài này ở nhóm Z chỉ để thấy LCP và Z là họ hàng, không phải lúc nào cũng dùng Z trực tiếp.
- **Match Substring After Replacement (LC 2301)**: quan hệ match **không đối xứng** (có mapping thay thế) ⇒ failure function của KMP/Z **không dùng được**, phải DP hoặc brute force có cắt tỉa.

## 6. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| — | Z-function implementation | Template + trace tay |
| [28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | strStr() (bản Z) | `P + '#' + T` |
| [2223](https://leetcode.com/problems/sum-of-scores-of-built-strings/) | Sum of Scores of Built Strings | Tổng mảng `z` |
| [2430](https://leetcode.com/problems/maximum-deletions-on-a-string/) | Maximum Deletions on a String | LCP DP (không thuần Z) |
| [2301](https://leetcode.com/problems/match-substring-after-replacement/) | Match Substring After Replacement | Match không đối xứng |
| [1316](https://leetcode.com/problems/distinct-echo-substrings/) | Distinct Echo Substrings | `z[i+L] ≥ L` |

**Tự luyện:** LC 1392, 1163.

## 7. Checklist áp dụng

- [ ] Quy ước `z[0]` đã nhất quán chưa?
- [ ] Sentinel có an toàn không?
- [ ] Box `[l, r)` nửa mở — điều kiện `i < r` đã đúng chưa?
- [ ] Quan hệ match có đối xứng không? (không → Z/KMP không dùng được)
- [ ] Bài này Z hay [[Rolling Hash]] gọn hơn?

## Tham khảo

- [cp-algorithms — Z-function](https://cp-algorithms.com/string/z-function.html) — bản chứng minh `O(n)` đầy đủ
- [Codeforces — Z-algorithm tutorial](https://codeforces.com/blog/entry/3107)
- [Wikipedia — Z-algorithm (String searching)](https://en.wikipedia.org/wiki/String-searching_algorithm)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 26: String algorithms

## Liên kết
[[KMP]] · [[Rolling Hash]] · [[String]] · [[Dynamic Programming]] · [[DS&AL]]
