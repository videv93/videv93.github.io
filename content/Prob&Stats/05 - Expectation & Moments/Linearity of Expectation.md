---
tags: [probability, expectation]
status: evergreen
---
# Linearity of Expectation

> $E[X+Y] = E[X]+E[Y]$ **kể cả khi $X$ và $Y$ phụ thuộc nhau chằng chịt.** Đây là công cụ mạnh nhất trong toàn bộ xác suất sơ cấp, và sức mạnh của nó đến từ đúng chữ "kể cả" đó.

## 1. Phát biểu

Với mọi $X_1,\dots,X_n$ trên cùng sample space và hằng số $a_i$:
$$E\!\left[\sum_{i=1}^n a_i X_i\right] = \sum_{i=1}^n a_i E[X_i]$$

**Không cần độc lập. Không cần cùng phân phối. Không cần gì cả.**

Đối chiếu: $\text{Var}(X+Y)=\text{Var}(X)+\text{Var}(Y)$ **cần** uncorrelated → [[Variance]]. Đó là điểm khác biệt then chốt giữa hai đại lượng.

## 2. Vì sao đúng

Vì $E$ là tổng/tích phân, và tổng thì tuyến tính:
$$E[X+Y] = \sum_{s\in S}(X(s)+Y(s))P(s) = \sum_s X(s)P(s) + \sum_s Y(s)P(s)$$

Nhìn ở tầng **sample space** (chứ không phải tầng phân phối), tính chất này là hiển nhiên — nhắc lại vì sao [[Random Variable]] nên hiểu là hàm.

## 3. Chiến thuật: viết mọi thứ thành tổng indicator

Đây là ứng dụng chính. Nếu $X$ đếm số lần một chuyện xảy ra, viết
$$X = I_1 + I_2 + \cdots + I_n, \qquad E[X] = \sum_j P(A_j)$$
→ [[Indicator Random Variables]]

| Bài toán | Phân rã | $E[X]$ |
|---|---|---|
| Binomial | $n$ indicator, mỗi cái $p$ | $np$ |
| **Hypergeometric** | $n$ indicator phụ thuộc, mỗi cái $K/N$ | $nK/N$ |
| [[Matching Problem]] | $n$ indicator, mỗi cái $1/n$ | $1$ |
| [[Birthday Problem]] (số cặp trùng) | $\binom{n}{2}$ indicator | $\binom{n}{2}/365$ |
| Coupon collector | $n$ Geometric với $p$ khác nhau | $nH_n \approx n\ln n$ |
| Số fixed point của hoán vị | $n$ indicator | $1$ |

Ba dòng ở giữa đều có indicator **phụ thuộc mạnh** — và linearity vẫn cho đáp án chính xác trong một dòng. Tính trực tiếp qua PMF thì mất hàng trang.

## 4. Ví dụ chi tiết: Hypergeometric

Rút 5 lá từ bộ bài, $X$ = số Át. Các lần rút **không** độc lập.

$I_j$ = lá thứ $j$ là Át. Theo đối xứng, $P(I_j=1) = 4/52$ với **mọi** $j$ — kể cả lá thứ 5.
$$E[X] = 5\cdot\frac{4}{52} = \frac{5}{13}$$

Đây là ví dụ Blitzstein dùng trong Lecture 9. So sánh với việc tính $\sum_k k\frac{\binom{4}{k}\binom{48}{5-k}}{\binom{52}{5}}$.

## 5. Cạm bẫy

1. **Áp cho variance.** $\text{Var}(X+Y)\ne\text{Var}(X)+\text{Var}(Y)$ nếu có tương quan.
2. **Áp cho tích.** $E[XY]\ne E[X]E[Y]$ nói chung.
3. **Áp cho hàm phi tuyến.** $E[X^2]\ne (E[X])^2$, $E[\max(X,Y)]\ne\max(E[X],E[Y])$.
4. **Cộng RV từ hai sample space khác nhau** — phải mô hình hoá chung trước.
5. **Tổng vô hạn** cần điều kiện hội tụ (Fubini–Tonelli); an toàn khi các số hạng không âm.
6. **Số hạng ngẫu nhiên.** $E\!\left[\sum_{i=1}^{N}X_i\right]$ với $N$ ngẫu nhiên $\ne N\cdot E[X]$; cần **Wald's identity**: $= E[N]E[X]$ khi $N$ độc lập với các $X_i$.

## 6. Checklist
- [ ] Đại lượng cần tính có phải là **tổng đếm** không?
- [ ] Có viết được thành tổng indicator không?
- [ ] Mỗi indicator có xác suất bằng bao nhiêu? (dùng đối xứng nếu được)
- [ ] Có đang vô tình dùng linearity cho variance/tích/hàm phi tuyến không?
- [ ] Số số hạng có ngẫu nhiên không? → Wald
- [ ] Kiểm tra bằng trường hợp nhỏ ($n=1,2$).

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §4.2: http://probabilitybook.net
- Stat 110 Lecture 9 (*Linearity*): https://www.youtube.com/watch?v=LX2q356N2rU
- Wikipedia — *Expected value § Linearity*: https://en.wikipedia.org/wiki/Expected_value#Linearity
- Wikipedia — *Wald's equation*: https://en.wikipedia.org/wiki/Wald%27s_equation

## Liên kết
[[Expectation]] · [[Indicator Random Variables]] · [[Variance]] · [[Hypergeometric]] · [[Matching Problem]] · [[Story Proofs]] · [[Prob&Stats]]
