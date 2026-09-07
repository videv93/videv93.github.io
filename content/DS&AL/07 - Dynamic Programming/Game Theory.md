---
tags: [dsal, dp, game-theory]
status: evergreen
---
# Game Theory

> Bài hai người chơi luân phiên, mỗi người chơi **tối ưu**. Pattern chung: **minimax DP** — tại mỗi state, người đến lượt tìm cách max điểm mình / min điểm đối thủ. Khi state graph có chu trình → BFS lùi từ terminal state.

## 1. Khi nào dùng

- Hai (đôi khi nhiều) người chơi luân phiên.
- Đề có cụm *"both play optimally"*, *"ai thắng"*, *"max score difference"*.
- State enumerate được → DP/memo khả thi.

## 2. Template code

```python
from functools import cache

@cache
def dp(state, is_first_turn):
    if terminal(state):
        return score(state)
    if is_first_turn:
        return max(dp(next_state(m), False) - delta(m) for m in moves(state))
    else:
        return min(dp(next_state(m), True) + delta(m) for m in moves(state))
```

**Mẹo gọn hơn:** thay vì mang `is_first_turn`, định nghĩa `dp(state)` = **chênh lệch điểm tối đa mà người đến lượt đạt được**. Khi đó `dp(l, r) = max(a[l] - dp(l+1, r), a[r] - dp(l, r-1))` — đối xứng, không cần biến lượt.

## 3. Taxonomy bốn loại

| Loại | Đặc trưng | Bài |
| --- | --- | --- |
| **Math trick** | Phân tích parity / tổng / "luôn thắng" | LC 292 Nim, LC 877 Stone Game |
| **Minimax DP** | `dp[state]` = giá trị tối ưu cho người đến lượt | LC 486, LC 1140 |
| **Memoized state graph** | State rời rạc, transition phức tạp | LC 464 Can I Win ([[Bitmask DP]]) |
| **Retrograde BFS** | Truyền outcome ngược từ terminal state | LC 913 Cat and Mouse |

## 4. Hai lập luận đáng nhớ

**Stone Game (LC 877) — vì sao người đi trước luôn thắng:** `n` chẵn ⇒ người đi trước có thể chọn **toàn bộ pile index chẵn** hoặc **toàn bộ pile index lẻ** (chia hai màu). Tổng hai nhóm khác nhau (vì tổng tất cả là lẻ) ⇒ chọn nhóm lớn hơn. Nhưng **vẫn nên học DP** vì pattern "minimax hai đầu" tổng quát cho LC 486.

**Cat and Mouse (LC 913) — retrograde:** state `(mouse_pos, cat_pos, turn)`. Terminal: chuột về hang → chuột thắng; mèo trùng chuột → mèo thắng. BFS lùi: nếu **tất cả** nước đi của người đến lượt dẫn tới state thua, thì state hiện tại cũng thua.

## 5. Cạm bẫy

- **Quên rằng đối thủ cũng chơi tối ưu** — nghĩ greedy "lấy pile to nhất" là sai ngay LC 486.
- **State thiếu lượt chơi** khi hàm không đối xứng.
- **Chu trình trong state graph** → memo đệ quy lặp vô hạn; phải chuyển sang retrograde BFS.
- **Can I Win (LC 464)**: state là bitmask số đã dùng (`≤ 20` ⇒ mask `≤ 2^20`); nhớ case tổng tất cả `< target` → không ai thắng, trả `False`.
- **Stone Game II (LC 1140)**: state `(i, M)` với `M` là giới hạn số pile lấy được; transition lấy `1..2M` pile, cập nhật `M' = max(M, x)`.

## 6. Bài kinh điển

| LC | Bài | Loại |
| --- | --- | --- |
| [292](https://leetcode.com/problems/nim-game/) | Nim Game | Math trick (`n % 4 != 0`) |
| [877](https://leetcode.com/problems/stone-game/) | Stone Game | Math + minimax DP |
| [486](https://leetcode.com/problems/predict-the-winner/) | Predict the Winner | `dp(l, r)` chênh lệch |
| [1140](https://leetcode.com/problems/stone-game-ii/) | Stone Game II | State `(i, M)` |
| [913](https://leetcode.com/problems/cat-and-mouse/) | Cat and Mouse | Retrograde BFS |
| [464](https://leetcode.com/problems/can-i-win/) | Can I Win | Bitmask memo |

**Tự luyện:** LC 294, 375, 1690 (Stone Game VII, xem [[Dynamic Programming]]).

## 7. Checklist áp dụng

- [ ] State có đủ mô tả thế cờ không? Có cần lượt chơi không?
- [ ] Có thể định nghĩa `dp` = **chênh lệch** để bỏ biến lượt không?
- [ ] State graph có chu trình không? (→ retrograde BFS thay memo)
- [ ] Số state có nằm trong giới hạn bộ nhớ không?
- [ ] Có math trick nào ngắn hơn không? (nhưng vẫn nên biết cách DP)

## Tham khảo

- [Wikipedia — Minimax](https://en.wikipedia.org/wiki/Minimax) và [Sprague–Grundy theorem](https://en.wikipedia.org/wiki/Sprague%E2%80%93Grundy_theorem)
- [cp-algorithms — Games on graphs](https://cp-algorithms.com/game_theory/games_on_graphs.html)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 25: Game theory (Nim, Grundy numbers)
- [LeetCode — Game Theory tag](https://leetcode.com/tag/game-theory/)

## Liên kết
[[Dynamic Programming]] · [[Bitmask DP]] · [[BFS]] · [[Recursion]] · [[Combinatorics DP]] · [[DS&AL]]
