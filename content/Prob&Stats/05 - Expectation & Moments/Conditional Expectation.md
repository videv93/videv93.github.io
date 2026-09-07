---
tags: [probability, expectation, conditioning]
status: growing
---
# Conditional Expectation

> $E[X\mid Y]$ **là một random variable**, không phải một số. Nắm được câu đó là nắm được toàn bộ chủ đề này.

## 1. Hai đối tượng khác nhau

| Ký hiệu | Là gì |
|---|---|
| $E[X \mid Y = y]$ | Một **số** — trung bình của $X$ trong nhóm $Y=y$ |
| $E[X \mid Y]$ | Một **random variable** — hàm $g(Y)$, ngẫu nhiên vì $Y$ ngẫu nhiên |
| $E[X\mid A]$ | Một số — trung bình của $X$ trên event $A$ |

Công thức: $E[X\mid Y=y] = \sum_x x\,P(X=x\mid Y=y)$, và $E[X\mid Y] := g(Y)$ với $g(y)=E[X\mid Y=y]$.

## 2. Adam's Law (tower property)

$$E\big[E[X\mid Y]\big] = E[X]$$

Đây là phiên bản kỳ vọng của [[Law of Total Probability]]. Dạng hay dùng:
$$E[X] = \sum_y E[X\mid Y=y]\,P(Y=y)$$

Chiến thuật: khi không tính được $E[X]$ trực tiếp, **điều kiện theo cái bạn ước gì mình biết**, rồi lấy trung bình.

Dạng mở rộng: $E[E[X\mid Y,Z]\mid Z] = E[X\mid Z]$ — "tower" nghĩa là bóc dần từng tầng thông tin.

## 3. Eve's Law (law of total variance)

$$\text{Var}(X) = \underbrace{E\big[\text{Var}(X\mid Y)\big]}_{\text{biến thiên trong nhóm}} + \underbrace{\text{Var}\big(E[X\mid Y]\big)}_{\text{biến thiên giữa các nhóm}}$$

Đây là phân rã ANOVA viết bằng ngôn ngữ xác suất, và là công cụ chính khi tính variance của mô hình phân tầng. → [[Variance]]

## 4. Tính chất

| Tính chất | |
|---|---|
| Linearity | $E[aX+bZ\mid Y] = aE[X\mid Y]+bE[Z\mid Y]$ |
| Taking out what is known | $E[h(Y)X\mid Y] = h(Y)E[X\mid Y]$ |
| Independence | $X\perp Y \Rightarrow E[X\mid Y]=E[X]$ |
| Projection | $E[X\mid Y]$ là hàm của $Y$ **gần $X$ nhất** theo nghĩa bình phương tối thiểu |

Tính chất cuối là lý do hồi quy tồn tại: hàm hồi quy tối ưu chính là $E[Y\mid X]$.

## 5. Ví dụ: memoryless (Blitzstein, Lecture 17)

$X\sim\text{Expo}(\lambda)$. Tính $E[X\mid X>a]$.

Vì memoryless, $X - a \mid (X>a) \sim \text{Expo}(\lambda)$, nên
$$E[X\mid X>a] = a + \frac{1}{\lambda}$$
Đã chờ $a$ phút thì kỳ vọng còn lại vẫn là $1/\lambda$ → [[Exponential Distribution]].

## 6. Cạm bẫy

1. **Coi $E[X\mid Y]$ là một số.** Nó là biến ngẫu nhiên; lấy kỳ vọng lần nữa mới ra số.
2. **Quên rằng $E[X\mid Y]$ là hàm của $Y$**, nên có variance riêng (Eve's Law).
3. **Nhầm $E[X\mid Y=y]$ với $E[X\mid Y]$** trong ký hiệu.
4. **Điều kiện trên event xác suất 0** với biến liên tục mà không dùng conditional density.
5. **Áp Adam's Law với trọng số sai** — phải nhân $P(Y=y)$, không lấy trung bình cộng. Đây là cơ chế của [[Simpson's Paradox]].
6. **Nhầm $E[X\mid Y]$ với hồi quy tuyến tính.** Hồi quy tuyến tính chỉ là xấp xỉ tuyến tính tốt nhất của $E[Y\mid X]$; hàm thật có thể cong.

## 7. Checklist
- [ ] Đang nói về một số hay một random variable?
- [ ] Nếu tính $E[X]$ khó → có biến $Y$ nào làm nó dễ không?
- [ ] Đã nhân trọng số $P(Y=y)$ chưa?
- [ ] Cần variance? → dùng Eve's Law, đừng quên số hạng thứ hai
- [ ] Có "lấy ra ngoài" được hàm của $Y$ không?
- [ ] Nếu bài lặp theo bước: có dùng được [[First Step Analysis]] không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, Ch.9: http://probabilitybook.net
- Stat 110 Lecture 17 (*Conditional Expectation*): https://www.youtube.com/watch?v=N8O6zd6vTZ8
- Wikipedia — *Conditional expectation*: https://en.wikipedia.org/wiki/Conditional_expectation
- Wikipedia — *Law of total expectation*: https://en.wikipedia.org/wiki/Law_of_total_expectation

## Liên kết
[[Expectation]] · [[Law of Total Probability]] · [[Variance]] · [[First Step Analysis]] · [[Exponential Distribution]] · [[Markov Chains]] · [[Prob&Stats]]
