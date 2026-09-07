---
tags: [dsal, string, pattern-matching]
status: evergreen
---
# KMP

> Substring matching trong `O(n + m)` **đảm bảo** (không như [[Rolling Hash]] có xác suất va chạm). Cốt lõi là mảng **LPS**: `lps[i]` = độ dài prefix dài nhất của `pattern[0..i]` **đồng thời** là suffix của nó (không tính chính nó).

## 1. LPS — hiểu bằng ví dụ `ababaca`

```
index :   0    1    2    3    4    5    6
char  :   a    b    a    b    a    c    a
LPS   :   0    0    1    2    3    0    1

LPS[0]=0  1 ký tự, không có proper prefix
LPS[1]=0  "ab"      — prefix "a" ≠ suffix "b"
LPS[2]=1  "aba"     — prefix "a"  = suffix "a"
LPS[3]=2  "abab"    — prefix "ab" = suffix "ab"
LPS[4]=3  "ababa"   — prefix "aba"= suffix "aba"
LPS[5]=0  "ababac"  — không có
LPS[6]=1  "ababaca" — prefix "a"  = suffix "a"
```

**Trực giác:** khi mismatch tại `pattern[i+1]`, ta **không cần restart từ đầu** — nhảy về `pattern[LPS[i]]`, vì các ký tự `pattern[0..LPS[i]-1]` chắc chắn đã khớp (chúng cũng là suffix của phần vừa match).

**Trace xây LPS:**

| `i` | char | Diễn biến | `lps[i]` |
| --- | --- | --- | --- |
| 0 | a | — | 0 |
| 1 | b | `j=0`; `s[0]≠s[1]` | 0 |
| 2 | a | `j=0`; `s[0]==s[2]` ⇒ `j=1` | 1 |
| 3 | b | `j=1`; `s[1]==s[3]` ⇒ `j=2` | 2 |
| 4 | a | `j=2`; `s[2]==s[4]` ⇒ `j=3` | 3 |
| 5 | c | `j=3` fail → `lps[2]=1` fail → `lps[0]=0` fail | 0 |
| 6 | a | `j=0`; `s[0]==s[6]` ⇒ `j=1` | 1 |

## 2. Template code

```python
def build_lps(p: str) -> list[int]:
    n = len(p)
    lps = [0] * n
    length, i = 0, 1
    while i < n:
        if p[i] == p[length]:
            length += 1; lps[i] = length; i += 1
        elif length > 0:
            length = lps[length - 1]          # fallback, KHÔNG tăng i
        else:
            lps[i] = 0; i += 1
    return lps

def kmp_search(text: str, p: str) -> list[int]:
    lps = build_lps(p)
    result, i, j = [], 0, 0
    while i < len(text):
        if text[i] == p[j]:
            i += 1; j += 1
            if j == len(p):
                result.append(i - j)
                j = lps[j - 1]                 # tiếp tục tìm match kế
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1
    return result
```
Mỗi ký tự của text bị so sánh tối đa 2 lần ⇒ `O(n + m)`.

## 3. Trick từ LPS

- **Chu kỳ của chuỗi**: nếu `len(s) % (len(s) - lps[-1]) == 0` thì `s` là một chuỗi con lặp lại (LC 459).
- **Longest Happy Prefix** (LC 1392) chính là `s[:lps[-1]]`.
- **Shortest Palindrome** (LC 214): build LPS của `s + '#' + reverse(s)`; `lps[-1]` là độ dài palindrome prefix dài nhất.

## 4. Cạm bẫy

- **Sentinel `#` phải KHÔNG xuất hiện trong input.** Nếu input có thể chứa mọi ký tự, dùng hai sentinel khác nhau hoặc chuyển sang [[Z Function]].
- **Tăng `i` trong nhánh fallback** — sai lầm kinh điển khi tự viết `build_lps`.
- **Find All Anagrams (LC 438) KHÔNG phải KMP** — đó là [[Sliding Window]] + counter. KMP match **liên tục theo thứ tự**; anagram không quan tâm thứ tự. Đặt cạnh nhau chỉ để phân biệt.
- **Quên `j = lps[j-1]` sau khi tìm thấy một match** → bỏ sót các match chồng lấn.

## 5. KMP vs Z

|  | KMP | [[Z Function]] |
| --- | --- | --- |
| Preprocess | LPS array của `P` | Z array của `P + '#' + T` |
| Tư duy | "Fail → quay lui khôn ngoan" | "Khớp tiền tố tại mọi vị trí" |
| Cài đặt | Failure function, 2 con trỏ | 1 box `[l, r)`, dễ off-by-one |
| Ứng dụng riêng | Chu kỳ chuỗi, prefix function | LCP, đếm substring phân biệt |

Hiệu năng tương đương. Chọn cái bạn viết đúng nhanh hơn dưới áp lực.

## 6. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Implement strStr() | KMP chuẩn |
| [214](https://leetcode.com/problems/shortest-palindrome/) | Shortest Palindrome | LPS của `s + '#' + rev(s)` |
| [459](https://leetcode.com/problems/repeated-substring-pattern/) | Repeated Substring Pattern | Chu kỳ từ `lps[-1]` |
| [438](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Find All Anagrams | Sliding window (**không** phải KMP) |
| [1297](https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring/) | Max Occurrences of a Substring | Sliding window + counter |
| [1392](https://leetcode.com/problems/longest-happy-prefix/) | Longest Happy Prefix | `s[:lps[-1]]` |

**Tự luyện:** LC 686, 1392, 3008.

## 7. Checklist áp dụng

- [ ] Có cần **đảm bảo** không va chạm không? (có → KMP/Z thay rolling hash)
- [ ] Sentinel có chắc chắn không xuất hiện trong input không?
- [ ] `build_lps` có tăng `i` nhầm trong nhánh fallback không?
- [ ] Cần tìm **tất cả** match hay chỉ match đầu? (tất cả → reset `j = lps[j-1]`)
- [ ] Bài có thật sự cần matching theo thứ tự không? (anagram thì không)

## Tham khảo

- [cp-algorithms — Prefix function (KMP)](https://cp-algorithms.com/string/prefix-function.html) — có phần ứng dụng chu kỳ chuỗi
- [Wikipedia — Knuth–Morris–Pratt algorithm](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 32: String Matching
- [Tushar Roy — KMP explanation](https://www.youtube.com/watch?v=GTJr8OvyEVQ)

## Liên kết
[[String]] · [[Z Function]] · [[Rolling Hash]] · [[Sliding Window]] · [[Trie]] · [[Combinatorics DP]] · [[DS&AL]]
