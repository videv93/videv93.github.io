---
tags: [probability, distribution, discrete]
status: evergreen
---
# Poisson Distribution

> Phân phối của **số sự kiện hiếm trong một khoảng**. Chỉ một tham số $\lambda$, và nó vừa là kỳ vọng vừa là phương sai — đặc điểm này vừa là ưu điểm vừa là điểm yếu.

## 1. Định nghĩa

$X \sim \text{Pois}(\lambda)$, $\lambda > 0$:
$$P(X=k) = \frac{e^{-\lambda}\lambda^k}{k!}, \quad k = 0,1,2,\dots$$

Tổng bằng 1 nhờ chuỗi Taylor: $\sum_k \frac{\lambda^k}{k!} = e^{\lambda}$.

$$E[X] = \lambda, \qquad \text{Var}(X) = \lambda, \qquad M_X(t) = e^{\lambda(e^t-1)}$$

Việc mean = variance là **dấu hiệu nhận biết** — nếu dữ liệu không thoả, Poisson là mô hình sai.

## 2. Ba cách Poisson xuất hiện

**(a) Giới hạn của Binomial.** $n\to\infty$, $p\to0$, $np\to\lambda$:
$$\binom{n}{k}p^k(1-p)^{n-k} \longrightarrow \frac{e^{-\lambda}\lambda^k}{k!}$$
Story: rất nhiều cơ hội, mỗi cơ hội rất khó xảy ra. Đây là chứng minh Blitzstein trình bày ở Lecture 11.

**(b) Poisson process.** Sự kiện đến với cường độ $\lambda$ mỗi đơn vị thời gian, độc lập giữa các khoảng rời nhau. Số sự kiện trong khoảng độ dài $t$ là $\text{Pois}(\lambda t)$; **khoảng cách giữa các sự kiện** là [[Exponential Distribution]].

**(c) Poisson paradigm.** Nhiều event hiếm, *gần* độc lập → tổng số xảy ra $\approx$ Poisson, dù chúng phụ thuộc nhẹ. → [[Poisson Paradigm]]

## 3. Tính chất

| Tính chất | Nội dung |
|---|---|
| **Cộng tính** | $X\sim\text{Pois}(\lambda_1) \perp Y\sim\text{Pois}(\lambda_2) \Rightarrow X+Y\sim\text{Pois}(\lambda_1+\lambda_2)$ |
| **Thinning** | Mỗi sự kiện được giữ độc lập với xác suất $p$ → $\text{Pois}(\lambda p)$, và phần giữ/bỏ **độc lập nhau** |
| **Conditioning** | $X+Y=n \Rightarrow X \mid (X+Y=n) \sim \text{Bin}\!\left(n, \frac{\lambda_1}{\lambda_1+\lambda_2}\right)$ |
| **Mode** | $\lfloor \lambda \rfloor$ |
| **Xấp xỉ Normal** | $\lambda$ lớn ($\ge 20$) → $\approx N(\lambda,\lambda)$ |

Tính **thinning** là kết quả đẹp và phản trực giác nhất: tách một Poisson process thành hai luồng thì hai luồng độc lập với nhau.

## 4. Ví dụ (Blitzstein, Lecture 11)

- **Giọt mưa rơi vào một ô vuông**: rất nhiều giọt, mỗi giọt xác suất nhỏ → Poisson.
- **Số cặp trùng sinh nhật** trong nhóm $k$ người: $\lambda = \binom{k}{2}/365$ → [[Birthday Problem]].
- **Số lính Phổ chết vì bị ngựa đá** (Bortkiewicz, 1898) — ví dụ lịch sử đầu tiên.
- Số email/giờ, số lỗi trên 1000 dòng code, số cuộc gọi đến tổng đài, số đột biến gen.

## 5. Cạm bẫy

1. **Overdispersion.** Dữ liệu thực tế thường có variance > mean (do $\lambda$ bản thân biến thiên). Kiểm tra tỉ số variance/mean trước khi dùng; nếu $\gg 1$ → [[Geometric & Negative Binomial]].
2. **Sự kiện có bùng nổ theo cụm (clustering).** Poisson process giả định độc lập giữa các khoảng — lượt truy cập website sau khi lên trang nhất Hacker News không thoả.
3. **$\lambda$ không hằng số theo thời gian.** Cần non-homogeneous Poisson process.
4. **Dùng cho biến có chặn trên tự nhiên.** Poisson có support vô hạn; nếu tối đa 10 sự kiện thì Binomial hợp hơn.
5. **Nhầm $\lambda$ với xác suất.** $\lambda$ là số đếm kỳ vọng, có thể $>1$.
6. **Quên đổi đơn vị.** $\lambda$ luôn gắn với một khoảng cụ thể; đổi khoảng thì phải nhân tỉ lệ.

## 6. Checklist
- [ ] Đang đếm sự kiện trong một khoảng cố định chứ?
- [ ] Có chặn trên tự nhiên không? (→ có thể là Binomial)
- [ ] Các sự kiện có độc lập không? Có bị cụm không?
- [ ] $\lambda$ có ổn định theo thời gian/không gian không?
- [ ] Từ dữ liệu: $s^2/\bar{x} \approx 1$ không? (→ kiểm tra overdispersion)
- [ ] $\lambda$ đang tính cho đúng đơn vị khoảng chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.poisson` | pmf/cdf/rvs | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html |
| `statsmodels` Poisson GLM | Hồi quy đếm | https://www.statsmodels.org/stable/glm.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §4.7–4.8: http://probabilitybook.net
- Stat 110 Lecture 11: https://www.youtube.com/watch?v=TD1N4hxqMzY
- Wikipedia — *Poisson distribution*: https://en.wikipedia.org/wiki/Poisson_distribution
- Wikipedia — *Poisson point process*: https://en.wikipedia.org/wiki/Poisson_point_process

## Liên kết
[[Poisson Paradigm]] · [[Bernoulli & Binomial]] · [[Exponential Distribution]] · [[Geometric & Negative Binomial]] · [[Birthday Problem]] · [[Prob&Stats]]
