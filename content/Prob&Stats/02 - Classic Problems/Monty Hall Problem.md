---
tags: [probability, classic-problem, conditioning]
status: evergreen
---
# Monty Hall Problem

> Đổi cửa thắng $2/3$, giữ cửa thắng $1/3$. Bài toán này gây tranh cãi không phải vì toán khó, mà vì **luật chơi không được phát biểu đầy đủ** — và luật chơi mới là thứ quyết định đáp án.

## 1. Bài toán chuẩn

3 cửa, 1 xe hơi, 2 con dê. Bạn chọn cửa 1. Monty — **người biết xe ở đâu** — mở một cửa còn lại **luôn có dê**, rồi hỏi bạn có đổi không.

**Luật chơi bắt buộc phải nêu rõ:**
1. Monty **luôn** mở một cửa và **luôn** mời đổi (không tuỳ hứng).
2. Monty **biết** xe ở đâu và **không bao giờ** mở cửa có xe.
3. Nếu có 2 lựa chọn (bạn đã chọn đúng cửa xe), Monty chọn ngẫu nhiên đều.

Thiếu bất kỳ điều nào, đáp án đổi.

## 2. Ba cách hiểu

**Cách 1 — Điều kiện theo vị trí xe** ([[Law of Total Probability]]):
$$P(\text{thắng khi đổi}) = P(\text{thắng}\mid\text{chọn đúng})\cdot\tfrac13 + P(\text{thắng}\mid\text{chọn sai})\cdot\tfrac23 = 0\cdot\tfrac13 + 1\cdot\tfrac23 = \tfrac23$$

Chiến lược đổi thắng **chính xác khi** lựa chọn ban đầu sai — mà lựa chọn ban đầu sai với xác suất $2/3$. Đây là lập luận một dòng, không cần Bayes.

**Cách 2 — Bayes.** $S$ = xe ở cửa $i$, $M_3$ = Monty mở cửa 3, bạn chọn cửa 1.

| Xe ở | $P(\text{xe})$ | $P(M_3\mid\text{xe})$ | Tích |
|---|---|---|---|
| Cửa 1 | 1/3 | 1/2 | 1/6 |
| Cửa 2 | 1/3 | 1 | 1/3 |
| Cửa 3 | 1/3 | 0 | 0 |

$P(\text{xe ở cửa 2}\mid M_3) = \frac{1/3}{1/6+1/3} = 2/3$.

**Cách 3 — 1 triệu cửa** (cách thuyết phục nhất, Blitzstein dùng trong Lecture 6). Bạn chọn 1 cửa trong 1.000.000. Monty mở 999.998 cửa toàn dê. Đổi hay không? Rõ ràng đổi — cửa còn lại "hút" toàn bộ xác suất $999999/1000000$.

## 3. Vì sao trực giác sai

- **"Còn 2 cửa nên 50–50".** Đếm khả năng không phải đếm xác suất — hai cửa không đồng khả năng.
- **Bỏ qua rằng hành động của Monty mang thông tin.** Cửa Monty mở không ngẫu nhiên; nó bị *ràng buộc* bởi vị trí xe. Nếu Monty mở ngẫu nhiên và tình cờ trúng dê thì đáp án **đúng là 50–50**.
- **Xác suất cửa bạn chọn không đổi** ($1/3$) vì Monty không bao giờ mở cửa đó — không có thông tin mới về nó.

## 4. Các biến thể (đáp án thay đổi!)

| Biến thể | $P(\text{thắng khi đổi})$ |
|---|---|
| Chuẩn | 2/3 |
| Monty mở ngẫu nhiên, tình cờ ra dê | 1/2 |
| Monty chỉ mời đổi khi bạn đã chọn đúng ("Monty ác") | 0 |
| Monty thiên vị mở cửa 3 khi có lựa chọn (xác suất $p$) | $\frac{1}{1+p}$ |
| $n$ cửa, Monty mở 1 cửa dê | $\frac{n-1}{n(n-2)}$ |

Bài học lớn hơn cả đáp án: **cơ chế tạo ra dữ liệu quyết định cách suy luận về dữ liệu.**

## 5. Cạm bẫy

1. **Không nêu luật chơi** rồi tranh cãi. 90% tranh luận Monty Hall là tranh luận về hai bài toán khác nhau.
2. **Áp dụng cho tình huống đời thực nơi "người mở cửa" không bị ràng buộc.** Chọn ngẫu nhiên thì không có lợi thế.
3. **Coi đây chỉ là câu đố.** Cùng cấu trúc với *observation selection effect* — dữ liệu được lọc trước khi bạn nhìn thấy → [[Conditional Independence]].
4. **Nhầm với bài Three Prisoners** — cùng cấu trúc, nhưng câu hỏi khác (hỏi về xác suất của chính mình, không đổi được).

## 6. Checklist cho mọi bài "có người tiết lộ thông tin"
- [ ] Người tiết lộ **biết** gì?
- [ ] Họ **buộc phải** hành động thế nào? Có lựa chọn nào không?
- [ ] Khi có nhiều lựa chọn, họ chọn theo phân phối nào?
- [ ] Thông tin được tiết lộ **có thể đã khác đi** không? (Nếu không thể → không có thông tin)
- [ ] Đã thử phóng đại lên $n$ rất lớn để kiểm tra trực giác chưa?
- [ ] Đã mô phỏng 10.000 ván chưa?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §2.7: http://probabilitybook.net
- Stat 110 Lecture 6: https://www.youtube.com/watch?v=fDcjhAKuhqQ
- Selvin (1975) — thư gốc trên *The American Statistician*: https://doi.org/10.1080/00031305.1975.10479121
- Wikipedia — *Monty Hall problem*: https://en.wikipedia.org/wiki/Monty_Hall_problem
- Rosenhouse — *The Monty Hall Problem* (sách chuyên khảo): https://global.oup.com/academic/product/the-monty-hall-problem-9780195367898

## Liên kết
[[Law of Total Probability]] · [[Bayes Rule]] · [[Conditional Probability]] · [[Simpson's Paradox]] · [[Prob&Stats]]
