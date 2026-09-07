---
tags: [probability, conditioning]
status: evergreen
---
# Conditional Probability

> "Conditioning is the soul of statistics." — Joe Blitzstein. Không phải một công thức phụ, mà là **cách duy nhất** để đưa thông tin mới vào một mô hình xác suất.

## 1. Định nghĩa

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0.$$

Cách đọc đúng: **thu nhỏ sample space lại còn $B$**, rồi hỏi tỉ lệ phần $A$ trong đó. Dưới góc nhìn diện tích: cắt hình vuông chỉ giữ vùng $B$, rồi chuẩn hoá vùng đó về diện tích 1.

Điểm triết học của Blitzstein: **mọi xác suất đều là có điều kiện.** $P(A)$ chỉ là cách viết tắt của $P(A \mid \text{toàn bộ thông tin nền})$. Vì thế khi thông tin thay đổi, xác suất phải thay đổi — đó không phải mâu thuẫn.

## 2. Ba định lý sinh ra từ định nghĩa

| Tên | Công thức | Dùng để |
|---|---|---|
| **Multiplication rule** | $P(A\cap B) = P(B)P(A\mid B) = P(A)P(B\mid A)$ | Tính xác suất giao theo từng bước |
| **Chain rule** | $P(A_1\cdots A_n) = P(A_1)P(A_2\mid A_1)\cdots P(A_n \mid A_1\cdots A_{n-1})$ | Mô hình hoá theo trình tự thời gian |
| **Bayes' rule** | $P(A\mid B) = \dfrac{P(B\mid A)P(A)}{P(B)}$ | Đảo chiều điều kiện → [[Bayes Rule]] |

Cộng thêm [[Law of Total Probability]] là đủ bộ công cụ cho gần như mọi bài conditioning.

## 3. Conditional probability *là* probability

Với $B$ cố định, hàm $A \mapsto P(A\mid B)$ thoả **đầy đủ** [[Axioms of Probability]]. Hệ quả thực dụng: mọi công thức bạn biết đều có phiên bản có điều kiện.

$$P(A^c\mid B) = 1 - P(A\mid B), \qquad P(A\cup C\mid B) = P(A\mid B)+P(C\mid B)-P(A\cap C\mid B)$$

Nhưng **chỉ khi cùng điều kiện $B$**. Không có công thức nào cho $P(A\mid B)$ theo $P(A \mid B^c)$ mà không thêm thông tin.

## 4. Hai chiến lược giải bài của Blitzstein

1. **Điều kiện theo cái bạn ước gì mình biết.** Không biết bi lấy từ hộp nào? Điều kiện theo hộp. Đây là [[Law of Total Probability]].
2. **Điều kiện theo bước đầu tiên** ("Feynman algorithm" như Blitzstein đùa trong Lecture 5): với bài lặp/đệ quy, điều kiện theo kết quả bước 1 → [[First Step Analysis]], [[Gambler's Ruin]].

## 5. Cạm bẫy

1. **$P(A\mid B) \neq P(B\mid A)$.** Sai lầm nghiêm trọng nhất, có tên riêng: prosecutor's fallacy → [[Conditional Probability Fallacies]].
2. **$P(A \mid B) \neq P(A \cap B)$.** Mẫu số khác nhau.
3. **Điều kiện trên event xác suất 0** — vô nghĩa nếu không định nghĩa lại (cần conditional density).
4. **Tưởng $P(A\mid B) \ge P(A)$ luôn.** Conditioning có thể làm giảm xác suất.
5. **Nhầm "conditioning" với "causation".** $P(\text{ướt}\mid\text{ô})$ cao không có nghĩa ô gây mưa.
6. **Đổi điều kiện giữa chừng bài toán** mà không tuyên bố — nguồn gốc của phần lớn nghịch lý Monty Hall.

## 6. Checklist khi gặp bài conditioning
- [ ] Đã viết rõ event $A$ và event $B$ bằng chữ chưa?
- [ ] Đang cần $P(A\mid B)$ hay $P(B\mid A)$?
- [ ] "Thông tin mới" đã được diễn đạt thành một event cụ thể chưa?
- [ ] Có thể vẽ cây (tree diagram) không? Mỗi nhánh là một bước conditioning.
- [ ] Nếu bí: **ước gì mình biết thêm điều gì?** → điều kiện theo điều đó.
- [ ] Sanity check bằng bảng tần suất tự nhiên (natural frequencies) với 10.000 người.

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, Ch.2: http://probabilitybook.net
- Stat 110 Lecture 4: https://www.youtube.com/watch?v=P7NE4WF8j-Q
- Stat 110 Lecture 5: https://www.youtube.com/watch?v=JzDvVgNDxo8
- Wikipedia — *Conditional probability*: https://en.wikipedia.org/wiki/Conditional_probability

## Liên kết
[[Bayes Rule]] · [[Law of Total Probability]] · [[Independence]] · [[Conditional Probability Fallacies]] · [[Conditional Expectation]] · [[Prob&Stats]]
