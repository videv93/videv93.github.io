---
tags: [probability, conditioning]
status: evergreen
---
# Law of Total Probability

> Chia để trị. Khi không tính được $P(B)$ trực tiếp, hãy cắt sample space thành các mảnh mà trong mỗi mảnh bài toán trở nên dễ.

## 1. Phát biểu

Cho $A_1,\dots,A_n$ là một **partition** của $S$ (đôi một disjoint, hợp lại bằng $S$, mỗi cái xác suất dương):

$$P(B) = \sum_{i=1}^{n} P(B \cap A_i) = \sum_{i=1}^{n} P(B\mid A_i)\,P(A_i)$$

Đọc thành lời: *xác suất trung bình có trọng số*, trọng số là $P(A_i)$.

Phiên bản có điều kiện (rất hay dùng, hay bị quên):
$$P(B\mid C) = \sum_i P(B\mid A_i \cap C)\,P(A_i \mid C)$$

## 2. Chọn partition thế nào

Nguyên tắc của Blitzstein: **điều kiện theo cái bạn ước gì mình biết.**

| Bài toán | Ước gì biết → partition theo |
|---|---|
| Rút bi từ 1 trong 2 hộp | Hộp nào được chọn |
| Xác suất thắng ván bạc | Kết quả **ván đầu tiên** → [[First Step Analysis]] |
| Xác suất một lá bài là Át | Lá trước đó là gì |
| Chọn xúc xắc từ túi rồi tung | Loại xúc xắc |
| Tỉ lệ khỏi bệnh toàn viện | Bệnh viện / mức độ nặng → [[Simpson's Paradox]] |

Partition tốt là partition làm cho $P(B\mid A_i)$ trở nên **hiển nhiên**.

## 3. Quan hệ với các công cụ khác

- Là **mẫu số** của [[Bayes Rule]] ở dạng đầy đủ.
- Là phiên bản xác suất của **tree diagram**: mỗi nhánh tầng 1 là một $A_i$, nhân dọc rồi cộng ngang.
- Phiên bản kỳ vọng của nó là **Adam's Law**: $E[X] = \sum_i E[X\mid A_i]P(A_i)$ → [[Conditional Expectation]].
- Với biến liên tục: $P(B) = \int P(B\mid X = x) f_X(x)\,dx$.

## 4. Ví dụ mẫu — bài Gambler's Ruin rút gọn

Gọi $p_i$ = xác suất thắng khi đang có $i$ đồng. Điều kiện theo kết quả ván tiếp theo:
$$p_i = p\,p_{i+1} + q\,p_{i-1}$$
Một dòng, và bài toán biến thành phương trình sai phân → [[Gambler's Ruin]].

## 5. Cạm bẫy

1. **Partition không phủ hết $S$** hoặc **chồng nhau** → tổng không ra 1. Luôn kiểm tra $\sum P(A_i) = 1$.
2. **Nhân sai chiều**: viết $P(A_i \mid B)P(A_i)$ thay vì $P(B\mid A_i)P(A_i)$.
3. **Trung bình các xác suất mà không có trọng số.** $P(B) \neq \frac{1}{n}\sum P(B\mid A_i)$ trừ khi các $A_i$ đồng khả năng. Đây chính là cơ chế của [[Simpson's Paradox]].
4. **Điều kiện theo event xác suất 0** trong trường hợp liên tục — cần công thức tích phân, không phải tổng.
5. **Partition quá mịn** làm bài khó hơn. Partition nên vừa đủ để $P(B\mid A_i)$ dễ.

## 6. Checklist
- [ ] Các $A_i$ có đôi một disjoint không?
- [ ] $\bigcup A_i = S$ chưa? ($\sum P(A_i) = 1$?)
- [ ] $P(B\mid A_i)$ có thực sự dễ hơn $P(B)$ không? Nếu không → đổi partition.
- [ ] Đã nhân **trọng số** $P(A_i)$ chưa, hay đang lấy trung bình cộng?
- [ ] Có vẽ được tree diagram để kiểm chứng không?
- [ ] Nếu bài lặp lại theo bước → đã thử điều kiện theo bước đầu tiên chưa?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §2.3: http://probabilitybook.net
- Stat 110 Lecture 5: https://www.youtube.com/watch?v=JzDvVgNDxo8
- Stat 110 Lecture 6 (LOTP trong Monty Hall): https://www.youtube.com/watch?v=fDcjhAKuhqQ
- Wikipedia — *Law of total probability*: https://en.wikipedia.org/wiki/Law_of_total_probability

## Liên kết
[[Conditional Probability]] · [[Bayes Rule]] · [[First Step Analysis]] · [[Monty Hall Problem]] · [[Simpson's Paradox]] · [[Conditional Expectation]] · [[Prob&Stats]]
