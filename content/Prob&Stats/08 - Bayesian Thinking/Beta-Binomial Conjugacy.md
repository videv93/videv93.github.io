---
tags: [statistics, bayes, distribution]
status: growing
---
# Beta-Binomial Conjugacy

> Prior Beta + dữ liệu Binomial = posterior Beta. Cập nhật niềm tin trở thành **phép cộng hai số nguyên** — không cần tích phân, không cần MCMC.

## 1. Phân phối Beta

$p \sim \text{Beta}(a,b)$ trên $[0,1]$:
$$f(p) = \frac{p^{a-1}(1-p)^{b-1}}{B(a,b)}, \qquad E[p]=\frac{a}{a+b}, \qquad \text{mode}=\frac{a-1}{a+b-2}\ (a,b>1)$$

Diễn giải: như thể đã quan sát $a-1$ thành công và $b-1$ thất bại **trước khi có dữ liệu thật** (pseudo-counts).

| Prior | Ý nghĩa |
|---|---|
| Beta(1,1) | Uniform — "không biết gì" |
| Beta(0.5,0.5) | Jeffreys prior — bất biến với reparametrization |
| Beta(2,2) | Nghiêng nhẹ về 0.5 |
| Beta(50,50) | Tin mạnh $p\approx0.5$ |
| Beta(1,10) | Tin $p$ nhỏ |

## 2. Kết quả conjugacy

Prior $p\sim\text{Beta}(a,b)$, quan sát $k$ thành công trong $n$ phép thử:

$$\boxed{p \mid \text{data} \sim \text{Beta}(a+k,\ b+n-k)}$$

Chứng minh một dòng:
$$p(p\mid x) \propto \underbrace{p^k(1-p)^{n-k}}_{\text{likelihood}}\cdot\underbrace{p^{a-1}(1-p)^{b-1}}_{\text{prior}} = p^{a+k-1}(1-p)^{b+n-k-1}$$

Nhận ra ngay là nhân Beta — hằng số chuẩn hoá tự lo. Đây là toàn bộ ý nghĩa của "conjugate": **posterior nằm cùng họ với prior**.

## 3. Posterior mean là trung bình có trọng số

$$E[p\mid\text{data}] = \frac{a+k}{a+b+n} = \underbrace{\frac{n}{a+b+n}}_{w}\cdot\underbrace{\frac{k}{n}}_{\text{MLE}} + \underbrace{\frac{a+b}{a+b+n}}_{1-w}\cdot\underbrace{\frac{a}{a+b}}_{\text{prior mean}}$$

**Shrinkage**: posterior kéo MLE về phía prior, mức kéo phụ thuộc $n$ so với $a+b$ ("prior sample size"). Khi $n\to\infty$, posterior mean $\to$ MLE — dữ liệu áp đảo prior → [[Bayesian vs Frequentist]].

Đây cũng là lý do xếp hạng sản phẩm nên dùng shrinkage: sản phẩm 5⭐ với 1 đánh giá không nên xếp trên sản phẩm 4.8⭐ với 1000 đánh giá.

## 4. Bảng các cặp conjugate khác

| Likelihood | Conjugate prior | Posterior |
|---|---|---|
| Binomial($n,p$) | Beta($a,b$) | Beta($a+k$, $b+n-k$) |
| Poisson($\lambda$) | Gamma($\alpha,\beta$) | Gamma($\alpha+\sum x_i$, $\beta+n$) |
| Normal($\mu$), $\sigma$ biết | Normal | Normal |
| Normal($\sigma^2$), $\mu$ biết | Inverse-Gamma | Inverse-Gamma |
| Exponential($\lambda$) | Gamma | Gamma |
| Multinomial | Dirichlet | Dirichlet |

Tất cả đều là **exponential family** — conjugacy không phải trùng hợp mà là tính chất cấu trúc của họ này.

## 5. Ứng dụng

- **A/B testing Bayes**: tính trực tiếp $P(p_A > p_B)$ — câu hỏi mà p-value không trả lời được.
- **Thompson sampling** cho multi-armed bandit: lấy mẫu từ posterior Beta của mỗi nhánh, chọn nhánh có mẫu cao nhất. Cân bằng explore/exploit tự nhiên.
- **Xếp hạng đánh giá** với shrinkage (§3).
- **Laplace smoothing** trong Naive Bayes: cộng 1 vào mọi đếm chính là prior Beta(1,1) → [[Laplace's Rule of Succession]].

## 6. Cạm bẫy

1. **Chọn prior mạnh vì tiện tính** rồi không kiểm tra độ nhạy.
2. **Beta(1,1) không phải "không có thông tin".** Nó là uniform trên $p$, nhưng không uniform trên odds hay log-odds.
3. **Dùng conjugacy khi model thật không phải Binomial** (dữ liệu có overdispersion, phép thử không độc lập).
4. **Nhầm posterior mean với MAP.** Với $a,b<1$ posterior có thể có mode ở biên.
5. **Cập nhật nhiều lần với dữ liệu không độc lập** → posterior quá hẹp.
6. **Dừng thu thập dữ liệu khi thấy kết quả đẹp.** Bayes chịu ảnh hưởng ít hơn frequentist nhưng không miễn nhiễm.
7. **Diễn giải credible interval như confidence interval** (hoặc ngược lại) → [[Confidence Intervals]].

## 7. Checklist
- [ ] Dữ liệu có thật sự là Binomial không? (độc lập, $p$ hằng)
- [ ] Prior đến từ đâu? $a+b$ tương đương bao nhiêu quan sát?
- [ ] $n$ so với $a+b$ thế nào? (prior còn ảnh hưởng nhiều không)
- [ ] Đã thử 2–3 prior khác nhau chưa?
- [ ] Đang báo cáo posterior mean, MAP, hay cả phân phối?
- [ ] Credible interval có được diễn giải đúng không?
- [ ] Nếu là bandit: có cần discount dữ liệu cũ không? (môi trường thay đổi)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.beta` | pdf/cdf/ppf, lấy mẫu | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.beta.html |
| PyMC | Mô hình Bayes tổng quát | https://www.pymc.io |
| VWO/Evan Miller Bayesian A/B calculator | Tính $P(p_A>p_B)$ | https://www.evanmiller.org/bayesian-ab-testing.html |

## Tham khảo
- Stat 110 Lecture 17 (*The Posterior Distribution*): https://www.youtube.com/watch?v=N8O6zd6vTZ8
- Blitzstein & Hwang — *Introduction to Probability*, §8.3: http://probabilitybook.net
- Gelman et al. — *Bayesian Data Analysis*, Ch.2: http://www.stat.columbia.edu/~gelman/book/
- Wikipedia — *Conjugate prior*: https://en.wikipedia.org/wiki/Conjugate_prior
- Wikipedia — *Thompson sampling*: https://en.wikipedia.org/wiki/Thompson_sampling

## Liên kết
[[Bayes Rule]] · [[Bayesian vs Frequentist]] · [[Laplace's Rule of Succession]] · [[Bernoulli & Binomial]] · [[Distribution Cheatsheet]] · [[Prob&Stats]]
