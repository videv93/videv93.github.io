---
tags: [dsal, data-structure, string]
status: evergreen
---
# String

> Chuỗi là **mảng các ký tự** — mọi kỹ thuật ở [[Array]] đều áp dụng được. Nhưng string có hai đặc thù riêng: phải làm rõ **bảng mã** (ASCII hay Unicode?) và trong Python chuỗi **immutable** — mọi thao tác "đổi ký tự" thực chất là `list(s)` rồi `''.join(...)`.

## 1. Khi nào dùng

- Đề thao tác trên một/nhiều chuỗi: palindrome, anagram, đảo từ, parse số.
- Easy/Medium thường chỉ cần [[Two Pointers]], `Counter`, hoặc state machine.
- Medium/Hard thường chuyển sang pattern nâng cao: [[Sliding Window]], [[Trie]], [[Rolling Hash]], [[KMP]].

**3 câu hỏi chốt:**
1. Chỉ ASCII (26 chữ cái? 128 ký tự?) hay full Unicode?
2. Phân biệt hoa/thường không? Có khoảng trắng đầu/cuối không?
3. Chuỗi có thể rỗng không?

## 2. Template code

```python
from collections import Counter

def two_pointers_in_string(s: str) -> bool:
    """Kiểm tra điều kiện đối xứng / theo cặp."""
    l, r = 0, len(s) - 1
    while l < r:
        if not check(s[l], s[r]):
            return False
        l += 1
        r -= 1
    return True

def count_chars(s: str) -> dict[str, int]:
    """Bảng đếm ký tự — gần như mọi bài string đều cần."""
    return Counter(s)
```

## 3. Giả thiết về ký tự — làm rõ TRƯỚC khi code

1. **Bảng chữ cái**: mảng đếm `[26]` chỉ dùng được khi đúng 26 chữ thường. Unicode → dùng `Counter`.
2. **Hoa/thường**: `"Aa"` có phải palindrome không? LC 125 lowercase trước; LC 5 thì không.
3. **Ký tự không phải chữ-số**: lọc bằng `isalnum()`, hay đề đã đảm bảo sạch?
4. **Khoảng trắng**: `strip()` trước khi parse số.

## 4. String pattern map

| Pattern | Khi gặp | Note |
| --- | --- | --- |
| Counting (`Counter`, mảng `[26]`) | Anagram, frequency | [[Hash Table]] |
| Two pointers (vào/ra) | Palindrome, reverse | [[Two Pointers]] |
| Sliding window | Substring với ràng buộc động | [[Sliding Window]] |
| Parsing bằng stack / FSM | atoi, calculator, decode | [[Stack and Queue]], [[String Parser]] |
| Pattern matching | strStr, anagram trong text | [[KMP]], [[Z Function]] |
| Hashing chuỗi | Rabin-Karp, đếm substring phân biệt | [[Rolling Hash]] |

**Group Anagrams — chọn key thế nào?**
- Sorted string key (`"eat" → "aet"`): 2 dòng, `O(n·k log k)`.
- Tuple 26 count: `O(n·k)`, nhanh hơn khi `k` lớn và bảng chữ cái nhỏ.
- Trong phỏng vấn: **nói cả hai**, viết sorted trước, đổi sang tuple khi cần tối ưu.

## 5. Cạm bẫy

- **Nối chuỗi trong vòng lặp** (`s += ch`) → `O(n²)` vì immutable. Gom vào list rồi `''.join()`.
- **Mảng đếm `[26]` khi input có thể là Unicode** → IndexError hoặc kết quả sai.
- **Quên `strip()` / dấu `+`/`-` khi parse số** (atoi là FSM 4 trạng thái, xem [[String Parser]]).
- **So sánh slice trong vòng lặp** — `s[i:j] == t` là `O(j-i)`, dễ biến `O(n)` thành `O(n²)`.
- **Palindrome với ký tự đặc biệt** — quyết định lọc trước hay lọc trong lúc chạy hai con trỏ.

## 6. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [242](https://leetcode.com/problems/valid-anagram/) | Valid Anagram | Counter / mảng 26 |
| [125](https://leetcode.com/problems/valid-palindrome/) | Valid Palindrome | Two pointers + `isalnum` |
| [14](https://leetcode.com/problems/longest-common-prefix/) | Longest Common Prefix | Quét dọc theo cột |
| [8](https://leetcode.com/problems/string-to-integer-atoi/) | String to Integer (atoi) | FSM + clamp 32-bit |
| [49](https://leetcode.com/problems/group-anagrams/) | Group Anagrams | `defaultdict` + key chuẩn hoá |
| [151](https://leetcode.com/problems/reverse-words-in-a-string/) | Reverse Words in a String | Split/join hoặc reverse 2 lần |

**Tự luyện:** LC 28, 58, 67, 415, 387, 383, 344, 541.

## 7. Checklist áp dụng

- [ ] Đã chốt bảng mã (26 / ASCII / Unicode) chưa?
- [ ] Có phân biệt hoa thường không? Đã lowercase nếu cần chưa?
- [ ] Có nối chuỗi trong vòng lặp không? (đổi sang list + join)
- [ ] Chuỗi rỗng và chuỗi 1 ký tự đã test chưa?
- [ ] Nếu bài là substring matching: đã cân nhắc [[KMP]] / [[Rolling Hash]] chưa?

## Tham khảo

- [Python docs — str methods](https://docs.python.org/3/library/stdtypes.html#string-methods)
- [LeetCode Explore — Strings](https://leetcode.com/explore/learn/card/array-and-string/)
- [cp-algorithms — String processing](https://cp-algorithms.com/string/prefix-function.html) — nền cho KMP/Z
- [Unicode Technical Report #15 — Normalization](https://unicode.org/reports/tr15/) — khi đề thật sự có Unicode

## Liên kết
[[Array]] · [[Two Pointers]] · [[Sliding Window]] · [[String Parser]] · [[KMP]] · [[Rolling Hash]] · [[Trie]] · [[DS&AL]]
