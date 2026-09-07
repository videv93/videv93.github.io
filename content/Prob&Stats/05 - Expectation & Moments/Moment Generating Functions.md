---
tags: [probability, moments]
status: evergreen
---
# Moment Generating Functions

> Biến đổi phân phối thành một hàm số. Ba lý do dùng nó: **sinh moment**, **xác định phân phối duy nhất**, và **biến tổng thành tích**.

## 1. Định nghĩa

$$M_X(t) = E\!\left[e^{tX}\right]$$

Là LOTUS với $g(x)=e^{tx}$ → [[LOTUS]]. Luôn có $M_X(0)=1$.

**Điều kiện tồn tại**: $M_X(t)$ phải hữu hạn trên một khoảng mở chứa 0. Nhiều phân phối không thoả (Lognormal, Cauchy, Pareto) — với chúng dùng **characteristic function** $\varphi_X(t)=E[e^{itX}]$, luôn tồn tại.

## 2. Ba lý do MGF quan trọng (Blitzstein, Lecture 17)

**(a) Sinh moment.** Khai triển $e^{tX} = \sum_n \frac{t^nX^n}{n!}$:
$$M_X(t) = \sum_{n=0}^{\infty}\frac{E[X^n]}{n!}t^n \quad\Rightarrow\quad E[X^n] = M_X^{(n)}(0)$$

Đạo hàm bậc $n$ tại 0 cho moment bậc $n$. Đó là lý do có tên "moment generating". Cũng có thể đọc trực tiếp: $E[X^n]$ là hệ số của $t^n$ nhân $n!$.

**(b) Xác định phân phối.** Nếu $M_X(t)=M_Y(t)$ trên một khoảng quanh 0 thì $X$ và $Y$ **cùng phân phối**. Đây là công cụ chứng minh "phân phối này bằng phân phối kia" mạnh nhất.

**(c) Tổng thành tích.** $X\perp Y \Rightarrow M_{X+Y}(t)=M_X(t)M_Y(t)$.

Kết hợp (b) và (c): chứng minh $\text{Bin}(n,p)+\text{Bin}(m,p)=\text{Bin}(n+m,p)$ chỉ là nhân hai đa thức. Tiện hơn convolution rất nhiều → [[PMF]].

## 3. Bảng MGF

| Phân phối | $M_X(t)$ | Miền $t$ |
|---|---|---|
| Bern($p$) | $1-p+pe^t$ | $\mathbb{R}$ |
| Bin($n,p$) | $(1-p+pe^t)^n$ | $\mathbb{R}$ |
| Geom($p$) | $\frac{p}{1-(1-p)e^t}$ | $t<-\ln(1-p)$ |
| Pois($\lambda$) | $e^{\lambda(e^t-1)}$ | $\mathbb{R}$ |
| $N(\mu,\sigma^2)$ | $e^{\mu t+\sigma^2t^2/2}$ | $\mathbb{R}$ |
| Expo($\lambda$) | $\frac{\lambda}{\lambda-t}$ | $t<\lambda$ |
| Gamma($a,\lambda$) | $\left(\frac{\lambda}{\lambda-t}\right)^a$ | $t<\lambda$ |
| Unif($0,1$) | $\frac{e^t-1}{t}$ | $\mathbb{R}$ |

## 4. Ứng dụng

- **Chứng minh CLT.** Khai triển MGF của $\frac{\sum X_i - n\mu}{\sigma\sqrt n}$ hội tụ về $e^{t^2/2}$ = MGF của $N(0,1)$ → [[Central Limit Theorem]].
- **Tính cộng tính**: Pois + Pois = Pois, Normal + Normal = Normal, Gamma + Gamma = Gamma (cùng rate).
- **Chernoff bound**: $P(X\ge a) \le e^{-ta}M_X(t)$ với mọi $t>0$; tối ưu theo $t$ được cận mũ, chặt hơn Chebyshev rất nhiều → [[Concentration Inequalities]].
- **Cumulant generating function** $K_X(t)=\ln M_X(t)$: $K'(0)=\mu$, $K''(0)=\sigma^2$ — thường tính dễ hơn.

## 5. Cạm bẫy

1. **Giả định MGF tồn tại.** Lognormal có mọi moment hữu hạn nhưng MGF phân kỳ với mọi $t>0$ — và moment **không** xác định được phân phối Lognormal (bài toán moment không xác định).
2. **Nhân MGF khi các biến không độc lập.**
3. **Nhầm $M_X(t)$ với PDF.** Nó chỉ là một biến đổi, không có ý nghĩa xác suất trực tiếp.
4. **Quên miền hội tụ.** Expo chỉ có MGF khi $t<\lambda$.
5. **Đạo hàm tại 0 mà không kiểm tra khả vi.**
6. **Dùng MGF cho phân phối đuôi dày** — dùng characteristic function thay thế.

## 6. Khi nào dùng MGF vs cách khác

| Bài toán | Công cụ tốt nhất |
|---|---|
| $E[X]$, $\text{Var}(X)$ của phân phối quen | Tra bảng |
| $E[X]$ của tổng đếm | [[Indicator Random Variables]] |
| Moment bậc cao | MGF |
| Chứng minh tổng có phân phối gì | MGF |
| Tổng của **số ngẫu nhiên** các biến | MGF + [[Conditional Expectation]] |
| Chặn đuôi mũ | Chernoff (qua MGF) |
| Phân phối đuôi dày | Characteristic function |

## 7. Checklist
- [ ] MGF có tồn tại trên khoảng quanh 0 không?
- [ ] Miền hội tụ là gì?
- [ ] Nếu nhân MGF: các biến có độc lập không?
- [ ] Có nhận ra MGF kết quả thuộc họ nào không? (so bảng §3)
- [ ] $M_X(0)=1$ chứ? (sanity check)
- [ ] Có cách nào ngắn hơn không (indicator, story proof)?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, Ch.6: http://probabilitybook.net
- Stat 110 Lecture 17: https://www.youtube.com/watch?v=N8O6zd6vTZ8
- Wikipedia — *Moment-generating function*: https://en.wikipedia.org/wiki/Moment-generating_function
- Wikipedia — *Chernoff bound*: https://en.wikipedia.org/wiki/Chernoff_bound
- Wikipedia — *Moment problem*: https://en.wikipedia.org/wiki/Moment_problem

## Liên kết
[[LOTUS]] · [[Variance]] · [[Central Limit Theorem]] · [[Concentration Inequalities]] · [[Normal Distribution]] · [[Prob&Stats]]
