---
tags: [probability, conditioning, bayes]
status: evergreen
---
# Bayes Rule

> Một dòng đại số tầm thường, nhưng là công cụ tư duy quan trọng nhất trong toàn bộ thống kê: cách đi từ $P(\text{dữ liệu}\mid\text{giả thuyết})$ về $P(\text{giả thuyết}\mid\text{dữ liệu})$.

## 1. Ba cách viết

**Dạng cơ bản**
$$P(A\mid B) = \frac{P(B\mid A)\,P(A)}{P(B)}$$

**Dạng đầy đủ** (dùng [[Law of Total Probability]] cho mẫu số)
$$P(A\mid B) = \frac{P(B\mid A)P(A)}{P(B\mid A)P(A) + P(B\mid A^c)P(A^c)}$$

**Dạng odds** — dạng đáng nhớ nhất:
$$\underbrace{\frac{P(A\mid B)}{P(A^c\mid B)}}_{\text{posterior odds}} = \underbrace{\frac{P(A)}{P(A^c)}}_{\text{prior odds}} \times \underbrace{\frac{P(B\mid A)}{P(B\mid A^c)}}_{\text{likelihood ratio}}$$

Dạng odds cho thấy bản chất: **niềm tin cũ × sức mạnh bằng chứng = niềm tin mới**. Mẫu số $P(B)$ biến mất — đây là lý do dạng này dễ tính nhẩm hơn nhiều.

## 2. Từ vựng

| Thành phần | Tên | Nghĩa |
|---|---|---|
| $P(A)$ | **Prior** | Niềm tin trước khi thấy dữ liệu |
| $P(B\mid A)$ | **Likelihood** | Dữ liệu khớp giả thuyết đến đâu |
| $P(B)$ | **Evidence / normalizing constant** | Xác suất thấy dữ liệu, mọi giả thuyết gộp lại |
| $P(A\mid B)$ | **Posterior** | Niềm tin sau khi thấy dữ liệu |

## 3. Ví dụ chuẩn: xét nghiệm y khoa

Bệnh hiếm: $P(D) = 1\%$. Test: sensitivity $P(+\mid D) = 95\%$, specificity $P(-\mid D^c)=95\%$.

$$P(D\mid +) = \frac{0.95 \times 0.01}{0.95\times 0.01 + 0.05 \times 0.99} = \frac{0.0095}{0.0590} \approx 16\%$$

**Dương tính vẫn chỉ 16% khả năng có bệnh.** Cách giải thích trực quan nhất (natural frequencies) với 10.000 người:

| | Có bệnh (100) | Không bệnh (9.900) | Tổng |
|---|---|---|---|
| Test **+** | 95 | 495 | 590 |
| Test **−** | 5 | 9.405 | 9.410 |

$95/590 \approx 16\%$. Gigerenzer chứng minh bác sĩ trả lời đúng nhiều hơn hẳn khi đề bài viết bằng bảng tần suất thay vì phần trăm.

## 4. Cạm bẫy

1. **Base rate neglect.** Bỏ qua $P(A)$ và trả lời 95%. Sai lầm phổ biến nhất → [[Conditional Probability Fallacies]].
2. **Quên $P(B\mid A^c)$.** Likelihood của giả thuyết đối lập là một nửa của bằng chứng.
3. **Prior "không thiên vị" không tồn tại.** Chọn prior đều cũng là một lựa chọn có hệ quả → [[Bayesian vs Frequentist]].
4. **Cập nhật nhiều lần với dữ liệu không độc lập** — nhân likelihood chỉ hợp lệ khi có [[Conditional Independence]].
5. **Nhầm posterior với xác suất "khách quan".** Nó luôn phụ thuộc prior.

## 5. Cập nhật tuần tự

Posterior sau quan sát thứ nhất trở thành prior cho quan sát thứ hai. Ở dạng odds việc này rất gọn:
$$\text{odds}_n = \text{odds}_0 \times \prod_{i=1}^{n} \frac{P(B_i\mid A)}{P(B_i \mid A^c)}$$
(với điều kiện các $B_i$ độc lập có điều kiện cho trước $A$).

## 6. Checklist
- [ ] Đã xác định rõ đâu là giả thuyết, đâu là bằng chứng chưa?
- [ ] Prior lấy từ đâu? Có biện minh được không?
- [ ] Đã tính $P(B\mid A^c)$ chưa, hay chỉ có $P(B\mid A)$?
- [ ] Thử lại bằng bảng tần suất 10.000 — có ra cùng số không?
- [ ] Nếu prior đổi 10 lần, posterior đổi bao nhiêu? (độ nhạy)
- [ ] Các quan sát có độc lập có điều kiện thật không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §2.3: http://probabilitybook.net
- Stat 110 Lecture 4: https://www.youtube.com/watch?v=P7NE4WF8j-Q
- Gigerenzer & Hoffrage — *How to improve Bayesian reasoning without instruction*: https://pure.mpg.de/rest/items/item_2101336/component/file_2101335/content
- Wikipedia — *Bayes' theorem*: https://en.wikipedia.org/wiki/Bayes%27_theorem
- 3Blue1Brown — *Bayes theorem*: https://www.youtube.com/watch?v=HZGCoVF3YvM

## Liên kết
[[Conditional Probability]] · [[Law of Total Probability]] · [[Conditional Probability Fallacies]] · [[Bayesian vs Frequentist]] · [[Beta-Binomial Conjugacy]] · [[Prob&Stats]]
