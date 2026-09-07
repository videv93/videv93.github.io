---
tags: [dsal, string, parsing]
status: evergreen
---
# String Parser

> Họ bài "implement một mini-language": calculator, công thức hoá học, Lisp. Ba paradigm: **stack** cho cấu trúc lồng, **FSM** cho token tuyến tính, **recursive descent** cho grammar đệ quy.

## 1. Khi nào dùng

- Đề: "Implement Calculator", "Parse Lisp", "Validate HTML Tag", "Number of Atoms".
- Có **grammar** rõ ràng: số, toán tử, ngoặc, biểu thức lồng nhau.
- Yêu cầu: eval / validate / trích xuất / chuẩn hoá chuỗi.

## 2. Taxonomy — chọn paradigm nào

| Loại | Đặc trưng | Bài |
| --- | --- | --- |
| **Stack-based** | Cấu trúc lồng (ngoặc, bracket) | LC 224, 394, 726 |
| **FSM / state machine** | Token tuyến tính, state rõ ràng | LC 8 (atoi), LC 65 |
| **Recursive descent** | Grammar có đệ quy | LC 736, 770 |
| **DP trên chuỗi** | Match với pattern (`.`, `*`) | LC 10, 44 |

## 3. Ba kỹ thuật nền

**Đọc số nhiều chữ số:**
```python
if ch.isdigit():
    num = num * 10 + int(ch)
```

**Basic Calculator II (LC 227) — stack với `last_op`:** giữ toán tử trước đó; khi gặp toán tử mới hoặc hết chuỗi, áp dụng `last_op` lên `num`: `+` push `num`, `-` push `-num`, `*`/`/` pop rồi tính. Cuối cùng `sum(stack)`. Chú ý `//` của Python làm tròn xuống với số âm — dùng `int(a / b)` để truncate-toward-zero ([[Python Interview Toolkit]]).

**Valid Number (LC 65) — bảng FSM:**

| State | digit | `+/-` | `.` | `e/E` |
| --- | --- | --- | --- | --- |
| 0 start | 2 | 1 | 4 | – |
| 1 sign | 2 | – | 4 | – |
| 2 int | 2 | – | 3 | 6 |
| 3 dot sau int | 5 | – | – | 6 |
| 4 dot chưa có int | 5 | – | – | – |
| 5 frac | 5 | – | – | 6 |
| 6 e | 8 | 7 | – | – |
| 7 exp sign | 8 | – | – | – |
| 8 exp int | 8 | – | – | – |

Accept states: `{2, 3, 5, 8}`.

## 4. Number of Atoms (LC 726) — stack of Counter

`"K4(ON(SO3)2)2"`:
```
stack = [Counter()]
'K' '4'      → top {K:4}
'('          → push {}
'O' 'N'      → top {O:1, N:1}
'('          → push {}
'S' 'O' '3'  → top {S:1, O:3}
')' '2'      → pop, ×2 = {S:2, O:6}, merge xuống ⇒ {O:7, N:1, S:2}
')' '2'      → pop, ×2, merge vào base {K:4} ⇒ {K:4, O:14, N:2, S:4}
```

## 5. Cạm bẫy

- **Quên xử lý số cuối chuỗi** — sau vòng lặp phải flush `num` còn lại.
- **Chia số âm trong calculator**: `-3 // 2 == -2` ở Python nhưng đề thường muốn `-1` (truncate toward zero) ⇒ `int(-3 / 2)`.
- **atoi (LC 8)**: thứ tự bắt buộc là `strip` → dấu → chữ số → clamp `[-2^31, 2^31-1]`. Bỏ sót clamp là fail case cuối.
- **Regex Matching (LC 10) là DP, không phải parser**: `*` cho phép 0 hoặc nhiều lần ⇒ quyết định **không cục bộ**. `dp[i][j]` = `s[..i]` match `p[..j]`; khi `p[j] == '*'`: thử "dùng 0 lần" `dp[i][j-2]` hoặc "dùng thêm 1 lần" `dp[i-1][j]` nếu `s[i-1]` khớp `p[j-1]` ([[Dynamic Programming]]).
- **Integer to English Words (LC 273)**: chia theo nhóm 3 chữ số, xử lý số 0 và khoảng trắng thừa — bug ở đây gần như luôn là dấu cách.

## 6. Bài kinh điển

| LC | Bài | Paradigm |
| --- | --- | --- |
| [227](https://leetcode.com/problems/basic-calculator-ii/) | Basic Calculator II | Stack + `last_op` |
| [394](https://leetcode.com/problems/decode-string/) | Decode String | Hai stack ([[Stack and Queue]]) |
| [726](https://leetcode.com/problems/number-of-atoms/) | Number of Atoms | Stack of Counter |
| [10](https://leetcode.com/problems/regular-expression-matching/) | Regular Expression Matching | DP 2D |
| [65](https://leetcode.com/problems/valid-number/) | Valid Number | FSM |
| [273](https://leetcode.com/problems/integer-to-english-words/) | Integer to English Words | Chia nhóm 3 chữ số |

**Tự luyện:** LC 224, 772, 591, 736, 1106.

## 7. Checklist áp dụng

- [ ] Grammar có đệ quy không? (có → recursive descent hoặc stack)
- [ ] Đã liệt kê hết các state của FSM chưa? Accept states là gì?
- [ ] Đã flush token cuối sau vòng lặp chưa?
- [ ] Chia số âm: đề muốn floor hay truncate?
- [ ] Có cần clamp overflow 32-bit không?
- [ ] Bài này có thực chất là DP không (`*` wildcard)?

## Tham khảo

- [Wikipedia — Recursive descent parser](https://en.wikipedia.org/wiki/Recursive_descent_parser) và [Shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm)
- [Wikipedia — Finite-state machine](https://en.wikipedia.org/wiki/Finite-state_machine)
- [Python docs — re module](https://docs.python.org/3/library/re.html) (để hiểu vì sao regex engine cần backtracking)
- [Crafting Interpreters — Parsing Expressions](https://craftinginterpreters.com/parsing-expressions.html)

## Liên kết
[[Stack and Queue]] · [[String]] · [[Dynamic Programming]] · [[Recursion]] · [[Python Interview Toolkit]] · [[DS&AL]]
