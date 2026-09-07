---
tags: [probability, distribution, continuous]
status: evergreen
---
# Exponential Distribution

> Phân phối của **thời gian chờ** cho sự kiện tiếp theo trong một Poisson process. Là phân phối liên tục duy nhất **memoryless** — và tính chất đó vừa đẹp vừa nguy hiểm khi mô hình hoá.

## 1. Định nghĩa

$X \sim \text{Expo}(\lambda)$, $\lambda>0$ là **rate**:
$$f(x) = \lambda e^{-\lambda x},\quad F(x) = 1-e^{-\lambda x}, \quad x \ge 0$$
$$E[X] = \frac{1}{\lambda}, \qquad \text{Var}(X) = \frac{1}{\lambda^2}, \qquad M_X(t) = \frac{\lambda}{\lambda - t}\ (t<\lambda)$$

⚠️ Hai quy ước tham số: **rate** $\lambda$ (Blitzstein, R) vs **scale** $\theta = 1/\lambda$ (`scipy.stats.expon` dùng `scale`). Nguồn lỗi thường xuyên.

**Location–scale**: $X\sim\text{Expo}(\lambda) \Rightarrow \lambda X\sim\text{Expo}(1)$. Nên chỉ cần hiểu $\text{Expo}(1)$.

## 2. Memoryless property

$$P(X > s+t \mid X > s) = P(X > t)$$

"Đã chờ 10 phút" không làm thời gian chờ còn lại ngắn đi. Chứng minh một dòng:
$$\frac{P(X>s+t)}{P(X>s)} = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t}$$

**Định lý:** Exponential là phân phối liên tục **duy nhất** có tính chất này (rời rạc: [[Geometric & Negative Binomial]]).

Hệ quả về hazard rate: $h(x) = \frac{f(x)}{1-F(x)} = \lambda$ — **hằng số**. Vật không già đi. Blitzstein tính $E[X \mid X > a] = a + 1/\lambda$ (Lecture 17) — kỳ vọng còn lại không đổi.

## 3. Quan hệ với Poisson

Trong một Poisson process cường độ $\lambda$:
- Số sự kiện trong $[0,t]$: $\text{Pois}(\lambda t)$ → [[Poisson Distribution]]
- Khoảng cách giữa hai sự kiện liên tiếp: $\text{Expo}(\lambda)$, iid
- Thời gian đến sự kiện thứ $n$: $\text{Gamma}(n,\lambda)$

Chứng minh liên hệ: $P(X > t) = P(\text{không sự kiện nào trong } [0,t]) = e^{-\lambda t}$.

## 4. Tính chất hữu ích

| Tính chất | Nội dung |
|---|---|
| **Minimum** | $X_i\sim\text{Expo}(\lambda_i)$ độc lập $\Rightarrow \min_i X_i \sim \text{Expo}(\sum\lambda_i)$ |
| **Ai đến trước** | $P(X_1 < X_2) = \frac{\lambda_1}{\lambda_1+\lambda_2}$ |
| **Tổng** | $n$ biến iid $\text{Expo}(\lambda)$ → $\text{Gamma}(n,\lambda)$ |
| **Sinh mẫu** | $X = -\frac{1}{\lambda}\ln U$, $U\sim\text{Unif}(0,1)$ → [[Uniform Distribution]] |

Tính chất minimum là công cụ chính khi phân tích hệ thống có nhiều thành phần cạnh tranh (queueing, race condition).

## 5. Cạm bẫy

1. **Nhầm rate với scale.** `scipy.stats.expon(scale=1/lam)` — kiểm tra bằng cách so mean.
2. **Dùng memoryless cho thứ có già đi.** Tuổi thọ máy móc, người, ổ cứng đều có hazard rate tăng theo thời gian → dùng **Weibull**, không phải Exponential.
3. **Bathtub curve.** Thiết bị điện tử có hazard rate cao lúc đầu (lỗi sản xuất), thấp ở giữa, cao về cuối. Exponential chỉ mô tả được đoạn giữa.
4. **Cho rằng thời gian chờ trung bình quan sát được = $1/\lambda$.** Nếu lấy mẫu theo thời điểm ngẫu nhiên, bạn có xu hướng rơi vào khoảng dài hơn — **inspection paradox** (waiting time paradox): khoảng chứa thời điểm bạn đến có kỳ vọng $2/\lambda$.
5. **Giả định thời gian phục vụ là Exponential** chỉ vì toán đẹp — thực tế thường không.
6. **Quên $X\ge0$** khi biến đổi biến.

## 6. Checklist
- [ ] Đại lượng có phải thời gian/khoảng cách đến sự kiện tiếp theo không?
- [ ] Hazard rate có thực sự hằng số không? (vẽ hazard thực nghiệm)
- [ ] Có hiện tượng "già đi" hay "chạy rà" không? → Weibull
- [ ] Tham số truyền vào thư viện là rate hay scale?
- [ ] Nếu lấy mẫu theo thời điểm: có dính inspection paradox không?
- [ ] Các sự kiện có xảy ra theo cụm không? (Poisson process giả định không)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.expon` | Dùng `scale=1/rate` | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.expon.html |
| `lifelines` | Phân tích sống sót, hazard rate | https://lifelines.readthedocs.io |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §5.5: http://probabilitybook.net
- Stat 110 Lecture 17 (*Memoryless Property*): https://www.youtube.com/watch?v=N8O6zd6vTZ8
- Wikipedia — *Exponential distribution*: https://en.wikipedia.org/wiki/Exponential_distribution
- Wikipedia — *Inspection paradox*: https://en.wikipedia.org/wiki/Inspection_paradox
- Wikipedia — *Bathtub curve*: https://en.wikipedia.org/wiki/Bathtub_curve

## Liên kết
[[Poisson Distribution]] · [[Geometric & Negative Binomial]] · [[Uniform Distribution]] · [[Conditional Expectation]] · [[Distribution Cheatsheet]] · [[Prob&Stats]]
