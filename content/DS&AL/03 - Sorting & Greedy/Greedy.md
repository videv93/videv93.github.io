---
tags: [dsal, technique, greedy]
status: evergreen
---
# Greedy

> Mỗi bước chọn cái tốt nhất **tại chỗ**, hy vọng cộng dồn ra tối ưu toàn cục. Pattern lừa dối ở chỗ: greedy hợp lệ **rất khó chứng minh**. Trong phỏng vấn bạn vừa phải đoán đúng "luật tham" vừa phải justify ngắn gọn.

## 1. Khi nào dùng

- Bài hỏi tối ưu (max/min) và có tính chất **exchange argument**: nghiệm tối ưu nào cũng có thể "hoán đổi" về nghiệm greedy mà không tệ đi.
- Có lựa chọn rõ ràng tại mỗi bước **mà không cần xem toàn cục** (khác [[Dynamic Programming]]).
- Dạng điển hình: *sort theo X rồi quét tuyến tính*.

**Khi greedy sai → DP cứu.** Nếu hoán đổi không bảo toàn tối ưu thì phải xét toàn cục.

## 2. Ba cách justify greedy trong phỏng vấn

1. **Exchange argument** — giả sử có lời giải tối ưu khác greedy; swap một lựa chọn của nó về greedy, chỉ ra cost không tăng; lặp lại ⇒ tối ưu trùng greedy.
2. **Stay-ahead** — tại mọi bước `k`, greedy "tiến" ít nhất bằng mọi lời giải khác; quy nạp ⇒ tối ưu toàn cục.
3. **Cut / matroid property** — mọi đáp số tối ưu chứa được cạnh nhẹ nhất qua một cut (nền của [[Minimum Spanning Tree]]).

## 3. Template code

```python
def greedy_template(items):
    items.sort(key=...)          # 90% bài greedy phải sort trước
    result = 0
    for x in items:
        if local_condition(x):
            result += x
            ...                  # cập nhật state
    return result
```

## 4. Ba invariant kinh điển

**Jump Game (LC 55) — farthest reach:**
```
i:      0  1  2  3  4
nums:  [2, 3, 1, 1, 4]
reach:  2  4  4  4  ≥4 ✅
```
`reach` = chỉ số xa nhất tới được tính đến `i`. Nếu `i > reach` tại bất kỳ bước nào → kẹt.

**Gas Station (LC 134) — vì sao bỏ cả segment failed:** nếu xuất phát từ `s` mà fail tại `i`, thì **mọi** điểm `k ∈ [s, i]` cũng fail (vì từ `s` tới `k` ta đã có dư xăng mà vẫn không kéo được tới `i+1`) ⇒ nhảy thẳng tới `i+1`.

**Candy (LC 135) — 2-pass:** trái→phải xử lý ràng buộc với hàng xóm trái; phải→trái xử lý ràng buộc phải; hai ràng buộc độc lập nên lấy `max` là đủ.

## 5. Cạm bẫy

- **Greedy "cảm giác đúng" nhưng sai** — Coin Change với bộ xu tuỳ ý là ví dụ kinh điển: greedy lấy xu lớn nhất sai, phải DP ([[Dynamic Programming]]).
- **Sort sai khoá** → greedy đúng ý tưởng nhưng sai kết quả (xem [[Interval]]: giữ nhiều nhất phải sort theo `end`).
- **Không phát biểu invariant ra miệng** → interviewer không biết bạn đang chứng minh hay đang đoán.
- **Partition Labels**: cần `last[ch]` cho **mọi** ký tự trước khi quét, không thể quyết định online.
- **Jump Game II** nhầm giữa "biên của bước hiện tại" và "farthest": phải tăng `steps` khi `i == current_end`.

## 6. Bài kinh điển

| LC | Bài | Luật tham |
| --- | --- | --- |
| [55](https://leetcode.com/problems/jump-game/) | Jump Game | Farthest reach |
| [45](https://leetcode.com/problems/jump-game-ii/) | Jump Game II | BFS ngầm theo tầng |
| [134](https://leetcode.com/problems/gas-station/) | Gas Station | Bỏ cả segment failed |
| [455](https://leetcode.com/problems/assign-cookies/) | Assign Cookies | Sort cả hai, ghép nhỏ với nhỏ |
| [763](https://leetcode.com/problems/partition-labels/) | Partition Labels | `last[ch]` + mở rộng biên |
| [135](https://leetcode.com/problems/candy/) | Candy | Two-pass lấy max |

**Tự luyện:** LC 122, 376, 406, 435, 452, 678, 870.

## 7. Checklist áp dụng

- [ ] Đã phát biểu được "luật tham" thành một câu chưa?
- [ ] Có justify được bằng exchange argument hoặc stay-ahead không?
- [ ] Đã thử tìm phản ví dụ nhỏ (n = 3, 4) chưa?
- [ ] Sort theo khoá đúng chưa?
- [ ] Nếu không chứng minh được: đã cân nhắc DP chưa?

## Tham khảo

- [Wikipedia — Greedy algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm) và [Matroid](https://en.wikipedia.org/wiki/Matroid)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 16: Greedy algorithms, phần "Elements of the greedy strategy"
- [USACO Guide — Greedy Algorithms](https://usaco.guide/silver/greedy-sorting)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 6: Greedy algorithms

## Liên kết
[[Sorting]] · [[Interval]] · [[Dynamic Programming]] · [[Minimum Spanning Tree]] · [[Heap]] · [[DS&AL]]
