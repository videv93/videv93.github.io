---
tags: [probability, expectation]
status: evergreen
---
# LOTUS

> *Law of the Unconscious Statistician*: tính $E[g(X)]$ mà **không cần** tìm phân phối của $g(X)$. Tên gọi hài hước vì ai cũng dùng nó theo bản năng trước khi biết nó là một định lý.

## 1. Phát biểu

Rời rạc: $\displaystyle E[g(X)] = \sum_x g(x)\,P(X=x)$
Liên tục: $\displaystyle E[g(X)] = \int_{-\infty}^{\infty} g(x)f_X(x)\,dx$

Nhiều biến: $\displaystyle E[g(X,Y)] = \sum_x\sum_y g(x,y)\,P(X=x,Y=y)$

**Điểm mấu chốt**: dùng PMF/PDF của $X$, **không** phải của $g(X)$. Việc tìm phân phối của $g(X)$ thường khó hơn nhiều (đổi biến, Jacobian, hàm không đơn điệu).

## 2. Vì sao đây là định lý, không phải định nghĩa

Định nghĩa kỳ vọng của biến $Y=g(X)$ là $E[Y] = \sum_y y\,P(Y=y)$ — theo phân phối **của $Y$**. LOTUS khẳng định hai cách tính này cho cùng kết quả. Không hiển nhiên: nhiều giá trị $x$ có thể ánh xạ về cùng một $y$, và LOTUS gộp chúng lại đúng cách.

## 3. Ví dụ

**Variance của Uniform** (Blitzstein, Lecture 12): $U\sim\text{Unif}(0,1)$
$$E[U^2] = \int_0^1 x^2\,dx = \frac13 \Rightarrow \text{Var}(U) = \frac13-\frac14=\frac1{12}$$
Không cần tìm phân phối của $U^2$ (nó là Beta, phức tạp hơn nhiều).

**MGF**: $M_X(t) = E[e^{tX}] = \sum_x e^{tx}p(x)$ — chính là LOTUS với $g(x)=e^{tx}$ → [[Moment Generating Functions]].

**Moment bậc $n$**: $E[X^n] = \sum_x x^n p(x)$.

**Fundamental bridge**: $g = I_A$ → $E[I_A]=P(A)$ → [[Indicator Random Variables]].

## 4. Jensen's inequality — hệ quả quan trọng

$E[g(X)]$ và $g(E[X])$ **khác nhau**, và ta biết khác theo chiều nào:

| $g$ | Quan hệ | Ví dụ |
|---|---|---|
| Lồi (convex) | $E[g(X)] \ge g(E[X])$ | $E[X^2]\ge(E[X])^2$ |
| Lõm (concave) | $E[g(X)] \le g(E[X])$ | $E[\ln X]\le \ln E[X]$ |
| Tuyến tính | Bằng nhau | $E[aX+b]=aE[X]+b$ |

Ứng dụng thực tế: lợi suất trung bình theo hình học **luôn** nhỏ hơn theo số học — lý do một khoản đầu tư +50%/-50% không hoà vốn. → [[Bankroll & Kelly Criterion]]

## 5. Cạm bẫy

1. **Plug-in fallacy**: tính $g(E[X])$ rồi tưởng là $E[g(X)]$. Sai lầm phổ biến nhất trong mô hình hoá kinh doanh ("dùng giá trị trung bình cho mọi đầu vào").
2. **Quên rằng LOTUS dùng phân phối của $X$**, rồi đi tìm phân phối của $g(X)$ một cách không cần thiết.
3. **Với nhiều biến, phải dùng joint** — không dùng được marginal riêng lẻ trừ khi $g$ tách được.
4. **Kỳ vọng có thể không tồn tại** dù $E[X]$ tồn tại. $X$ Cauchy-lite, $g(x)=x^2$…
5. **Đổi biến trong tích phân mà quên Jacobian** — nếu đã dùng LOTUS thì không cần đổi biến, đó là điểm lợi.
6. **Áp Jensen sai chiều.** Kiểm tra $g''$ trước.

## 6. Checklist
- [ ] Đang cần $E[g(X)]$? → dùng LOTUS, đừng tìm phân phối của $g(X)$
- [ ] Đã dùng PMF/PDF của **$X$** chưa?
- [ ] Nếu nhiều biến: có joint chưa? $g$ có tách được không?
- [ ] Tích phân/tổng có hội tụ không?
- [ ] Có đang thay giá trị trung bình vào một hàm phi tuyến không? (plug-in fallacy)
- [ ] $g$ lồi hay lõm? → biết được chiều lệch của sai lầm plug-in

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §4.5: http://probabilitybook.net
- Stat 110 Lecture 12: https://www.youtube.com/watch?v=Tci---bVs60
- Wikipedia — *Law of the unconscious statistician*: https://en.wikipedia.org/wiki/Law_of_the_unconscious_statistician
- Wikipedia — *Jensen's inequality*: https://en.wikipedia.org/wiki/Jensen%27s_inequality
- Savage — *The Flaw of Averages*: https://www.flawofaverages.com

## Liên kết
[[Expectation]] · [[Variance]] · [[Moment Generating Functions]] · [[Indicator Random Variables]] · [[Discrete vs Continuous]] · [[Prob&Stats]]
