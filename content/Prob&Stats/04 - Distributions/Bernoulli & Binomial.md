---
tags: [probability, distribution, discrete]
status: evergreen
---
# Bernoulli & Binomial

> Viên gạch cơ bản nhất. Mọi phân phối rời rạc khác trong khoá học đều dựng từ hoặc liên hệ với Bernoulli.

## 1. Bernoulli

$X \sim \text{Bern}(p)$: một phép thử, thành công (1) với xác suất $p$, thất bại (0) với $1-p$.

$$E[X] = p, \qquad \text{Var}(X) = p(1-p), \qquad M_X(t) = 1-p+pe^t$$

Chú ý $E[X^2] = E[X] = p$ vì $X^2 = X$ khi $X\in\{0,1\}$ — đây là mẹo tính variance nhanh nhất.

**Bernoulli chính là indicator.** Mọi event $A$ sinh ra một $\text{Bern}(P(A))$ → [[Indicator Random Variables]]. Đó là lý do phân phối này có mặt khắp nơi.

## 2. Binomial

$X \sim \text{Bin}(n,p)$ = số thành công trong $n$ phép thử Bernoulli **độc lập, cùng $p$**.

$$P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}, \quad k = 0,\dots,n$$

$$E[X] = np, \qquad \text{Var}(X) = np(1-p), \qquad M_X(t) = (1-p+pe^t)^n$$

**Story proof của $E[X]$:** viết $X = I_1+\cdots+I_n$ với $I_j\sim\text{Bern}(p)$, dùng [[Linearity of Expectation]]: $E[X] = np$. Một dòng, không cần tổng nào cả — so với việc tính $\sum_k k\binom{n}{k}p^kq^{n-k}$ trực tiếp thì đây là ví dụ đẹp nhất về sức mạnh của indicator.

## 3. Tính chất

| Tính chất | Nội dung |
|---|---|
| **Đối xứng** | $X\sim\text{Bin}(n,p) \Rightarrow n - X \sim \text{Bin}(n, 1-p)$ |
| **Cộng tính** | $X\sim\text{Bin}(n,p)$, $Y\sim\text{Bin}(m,p)$ độc lập $\Rightarrow X+Y\sim\text{Bin}(n+m,p)$ |
| **Mode** | $\lfloor (n+1)p \rfloor$ |
| **Variance cực đại** | tại $p=1/2$, bằng $n/4$ |

Tính cộng tính chứng minh được bằng convolution ([[PMF]]) hoặc [[Moment Generating Functions]], nhưng story proof ngắn nhất: gộp $n$ và $m$ phép thử thành $n+m$ phép thử cùng $p$.

**Cảnh báo:** cần **cùng $p$**. $\text{Bin}(n,p)+\text{Bin}(m,q)$ với $p\neq q$ không phải Binomial.

## 4. Quan hệ với các phân phối khác

| Điều kiện | Kết quả |
|---|---|
| $n=1$ | Bernoulli |
| $n\to\infty$, $p\to0$, $np\to\lambda$ | $\to$ [[Poisson Distribution]] |
| $n$ lớn, $p$ vừa phải | $\approx N(np, np(1-p))$ → [[Central Limit Theorem]] |
| Lấy mẫu **không** hoàn lại | [[Hypergeometric]], không phải Binomial |
| Đếm số phép thử đến thành công đầu | [[Geometric & Negative Binomial]] |
| $X\mid p$, với $p\sim\text{Beta}$ | Beta-Binomial → [[Beta-Binomial Conjugacy]] |

Quy tắc thực dụng cho xấp xỉ: dùng Poisson khi $n \ge 100$ và $np \le 10$; dùng Normal khi $np \ge 10$ **và** $n(1-p)\ge 10$ (nhớ continuity correction).

## 5. Cạm bẫy

1. **Dùng Binomial khi lấy mẫu không hoàn lại.** Xấp xỉ chỉ ổn khi cỡ mẫu $\le 10\%$ quần thể.
2. **Dùng Binomial khi các phép thử không độc lập** hoặc $p$ thay đổi giữa các phép thử (overdispersion → thực tế cần Beta-Binomial).
3. **Nhầm "$n$ phép thử" với "$n$ thành công".** Binomial cố định $n$; Negative Binomial cố định số thành công.
4. **Xấp xỉ Normal khi $p$ rất nhỏ** — phân phối lệch mạnh, xấp xỉ tệ. Dùng Poisson.
5. **Quên continuity correction** khi xấp xỉ Normal: $P(X\le k)\approx \Phi\!\left(\frac{k+0.5-np}{\sqrt{np(1-p)}}\right)$.
6. **Tính $\binom{n}{k}$ trực tiếp với $n$ lớn** → tràn số. Dùng log-gamma hoặc thư viện.

## 6. Checklist trước khi dùng Binomial
- [ ] Số phép thử $n$ có cố định trước không?
- [ ] Mỗi phép thử chỉ có 2 kết quả chứ?
- [ ] Các phép thử độc lập chứ? → [[Independence]]
- [ ] $p$ có giống nhau ở mọi phép thử không?
- [ ] Lấy mẫu có hoàn lại không? (nếu không → Hypergeometric)
- [ ] Nếu xấp xỉ: đã kiểm tra $np\ge10$ và $n(1-p)\ge10$ chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.binom` | pmf/cdf/rvs, ổn định số học | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binom.html |
| `statsmodels.stats.proportion` | Khoảng tin cậy cho $p$ | https://www.statsmodels.org/stable/stats.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §3.3–3.4: http://probabilitybook.net
- Stat 110 Lecture 7 & 8: https://www.youtube.com/watch?v=PNrqCdslGi4
- Wikipedia — *Binomial distribution*: https://en.wikipedia.org/wiki/Binomial_distribution

## Liên kết
[[Indicator Random Variables]] · [[Hypergeometric]] · [[Poisson Distribution]] · [[Geometric & Negative Binomial]] · [[Distribution Cheatsheet]] · [[Prob&Stats]]
