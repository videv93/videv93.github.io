---
tags: [probability, distribution, discrete]
status: growing
---
# Geometric & Negative Binomial

> Binomial hỏi "bao nhiêu thành công trong $n$ lần?". Hai phân phối này hỏi ngược lại: "**cần bao nhiêu lần** để có $r$ thành công?".

## 1. Geometric — hai quy ước

$X \sim \text{Geom}(p)$: **số thất bại trước thành công đầu tiên**.
$$P(X=k) = (1-p)^k p, \quad k=0,1,2,\dots \qquad E[X] = \frac{1-p}{p}, \quad \text{Var}(X)=\frac{1-p}{p^2}$$

$Y \sim \text{FS}(p)$ (first success): **số phép thử tính cả lần thành công** = $X+1$.
$$P(Y=k) = (1-p)^{k-1}p, \quad k=1,2,\dots \qquad E[Y] = \frac{1}{p}, \quad \text{Var}(Y)=\frac{1-p}{p^2}$$

⚠️ Hai quy ước này khác nhau và **sách nào cũng dùng một kiểu**. Blitzstein dùng quy ước đầu; nhiều sách khác dùng quy ước sau; `scipy.stats.geom` dùng quy ước **FS**. Luôn kiểm tra trước khi dùng.

Cách nhớ $E[Y] = 1/p$: xác suất $1/6$ thì trung bình cần 6 lần tung — hợp trực giác.

## 2. Memoryless property

$$P(X \ge m+n \mid X \ge m) = P(X \ge n)$$

Đồng xu không nhớ 10 lần sấp vừa rồi. Geometric là phân phối rời rạc **duy nhất** có tính chất này; bản liên tục tương ứng là [[Exponential Distribution]].

Hệ quả tâm lý học: đây chính là lý do **gambler's fallacy** sai — "sắp đến lượt ra rồi" là niềm tin trái với memorylessness. → [[Expected Value in Gambling]]

## 3. Negative Binomial

$X\sim\text{NBin}(r,p)$: số **thất bại** trước khi có $r$ thành công.
$$P(X=k) = \binom{k+r-1}{r-1}p^r(1-p)^k, \quad k=0,1,2,\dots$$
$$E[X] = \frac{r(1-p)}{p}, \qquad \text{Var}(X) = \frac{r(1-p)}{p^2}$$

**Story proof:** $X$ = tổng của $r$ biến Geometric độc lập → kỳ vọng và phương sai cộng lại. → [[Linearity of Expectation]]

Hệ số $\binom{k+r-1}{r-1}$ đến từ việc phép thử **cuối cùng bắt buộc là thành công**; $r-1$ thành công còn lại nằm tự do trong $k+r-1$ vị trí đầu.

## 4. Bảng đối chiếu

| | Cố định | Ngẫu nhiên | Phân phối |
|---|---|---|---|
| Binomial | số phép thử $n$ | số thành công | $\text{Bin}(n,p)$ |
| Negative Binomial | số thành công $r$ | số phép thử | $\text{NBin}(r,p)$ |
| Geometric | $r=1$ | số phép thử | $\text{Geom}(p)$ |

Đây là quan hệ **đối ngẫu** — nhớ bảng này là đủ để không bao giờ chọn nhầm.

## 5. Ứng dụng quan trọng: overdispersion

Negative Binomial còn có vai trò thứ hai, quan trọng hơn trong thực hành: **mô hình đếm khi variance > mean**.

Poisson buộc $\text{Var} = E$. Dữ liệu đếm thực tế (số click, số ca bệnh, số lỗi) thường có variance lớn hơn nhiều. NBin sinh ra tự nhiên như **Poisson–Gamma mixture**: $X\mid\lambda \sim \text{Pois}(\lambda)$, $\lambda\sim\text{Gamma}$ → $X\sim\text{NBin}$. Đây là lý do `statsmodels` có `NegativeBinomial` regression bên cạnh `Poisson`.

## 6. Cạm bẫy

1. **Nhầm hai quy ước Geometric** — sai lệch đúng 1 đơn vị ở kỳ vọng.
2. **Coupon collector không phải Geometric.** Thu đủ $n$ loại cần $\sum_{i=1}^n \text{Geom}$ với $p$ **khác nhau** mỗi lần: $E = n H_n \approx n\ln n$.
3. **Gambler's fallacy** — tin rằng chuỗi thất bại làm tăng xác suất thành công.
4. **Dùng Poisson cho dữ liệu overdispersed** → sai số chuẩn quá nhỏ, p-value quá đẹp.
5. **$E[Y]=1/p$ không có nghĩa "sau $1/p$ lần chắc chắn thành công".** $P(Y > 1/p) \approx e^{-1}\approx 37\%$.
6. **Quên rằng NBin có support vô hạn** — có thể mãi không đủ $r$ thành công.

## 7. Checklist
- [ ] Cố định số phép thử hay số thành công?
- [ ] Quy ước Geometric nào đang dùng? (có tính lần thành công không)
- [ ] Thư viện dùng quy ước nào? (scipy: FS)
- [ ] Các phép thử độc lập và cùng $p$ chứ?
- [ ] Nếu là dữ liệu đếm: variance có lớn hơn mean không? → dùng NBin thay Poisson
- [ ] Có phải bài coupon collector trá hình không? ($p$ thay đổi giữa các chặng)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.geom` | Quy ước FS (bắt đầu từ 1) | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.geom.html |
| `scipy.stats.nbinom` | Đếm số thất bại | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.nbinom.html |
| `statsmodels` NegativeBinomial | Hồi quy đếm có overdispersion | https://www.statsmodels.org/stable/generated/statsmodels.discrete.discrete_model.NegativeBinomial.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §4.3: http://probabilitybook.net
- Stat 110 Lecture 9 (*Geometric Example*): https://www.youtube.com/watch?v=LX2q356N2rU
- Wikipedia — *Geometric distribution*: https://en.wikipedia.org/wiki/Geometric_distribution
- Wikipedia — *Negative binomial distribution*: https://en.wikipedia.org/wiki/Negative_binomial_distribution
- Wikipedia — *Coupon collector's problem*: https://en.wikipedia.org/wiki/Coupon_collector%27s_problem

## Liên kết
[[Bernoulli & Binomial]] · [[Exponential Distribution]] · [[Poisson Distribution]] · [[Expected Value in Gambling]] · [[Distribution Cheatsheet]] · [[Prob&Stats]]
