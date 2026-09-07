---
tags: [statistics, inference, estimation]
status: evergreen
---
# Estimator Quality

> Một estimator là một **random variable**. Nên đánh giá nó không phải bằng "lần này nó đúng không", mà bằng phân phối của nó: lệch đi đâu (bias) và dao động bao nhiêu (variance).

## 1. Từ vựng

| Khái niệm | Định nghĩa |
|---|---|
| **Statistic** | Hàm bất kỳ của dữ liệu, không phụ thuộc $\theta$ |
| **Estimator** $\hat\theta_n$ | Statistic dùng để ước lượng $\theta^*$ |
| **Estimate** | Giá trị cụ thể của $\hat\theta_n$ trên một bộ dữ liệu |
| **Bias** | $\text{bias}(\hat\theta_n) = E[\hat\theta_n] - \theta^*$ |
| **Unbiased** | $E[\hat\theta_n]=\theta^*$ **với mọi** $\theta^*\in\Theta$ |
| **Consistent** | $\hat\theta_n \xrightarrow{P}\theta^*$ khi $n\to\infty$ |
| **Quadratic risk** | $R(\hat\theta_n) = E\big[(\hat\theta_n-\theta^*)^2\big]$ |

Chú ý chữ "với mọi $\theta^*$" trong unbiased: nếu chỉ đúng ở một giá trị thì vô nghĩa (estimator hằng số $\hat\theta=5$ là "không chệch" tại $\theta^*=5$).

## 2. Phân rã bias–variance

$$\boxed{R(\hat\theta_n) = \underbrace{\text{bias}(\hat\theta_n)^2}_{\text{lệch hệ thống}} + \underbrace{\text{Var}(\hat\theta_n)}_{\text{dao động}}}$$

Chứng minh: cộng và trừ $E[\hat\theta_n]$ bên trong bình phương, số hạng chéo triệt tiêu.

Đây là công thức trung tâm của cả thống kê lẫn machine learning. Hệ quả quan trọng: **estimator có bias vẫn có thể tốt hơn** nếu nó đổi được nhiều variance lấy chút bias (ridge regression, shrinkage, James–Stein).

| Trường hợp | Bias | Variance | Risk |
|---|---|---|---|
| $\hat\theta = \bar X_n$ | 0 | $\sigma^2/n$ | $\sigma^2/n$ |
| $\hat\theta = X_1$ | 0 | $\sigma^2$ | $\sigma^2$ (không consistent!) |
| $\hat\theta = c$ (hằng) | $c-\theta^*$ | 0 | $(c-\theta^*)^2$ |

Dòng giữa cho thấy: **unbiased không đủ**. $X_1$ không chệch nhưng vô dụng.

## 3. Ví dụ: variance mẫu và $n$ vs $n-1$

$$\hat\sigma^2_{\text{MLE}} = \frac1n\sum(X_i-\bar X)^2 \quad\text{(chệch)}, \qquad S^2 = \frac{1}{n-1}\sum(X_i-\bar X)^2 \quad\text{(không chệch)}$$

Lý do chia $n-1$ (Bessel's correction): $\bar X$ đã "tiêu" mất một bậc tự do — các độ lệch $X_i-\bar X$ luôn tổng bằng 0.

Điều thú vị: **$\hat\sigma^2_{\text{MLE}}$ có MSE nhỏ hơn $S^2$**. Không chệch không phải lúc nào cũng tốt hơn.

⚠️ Thực hành: `numpy.var` mặc định `ddof=0` ($n$); `pandas.var` mặc định `ddof=1` ($n-1$). Nguồn lỗi im lặng rất hay gặp → [[Variance]].

## 4. Consistency vs Unbiasedness — hai thứ khác nhau

| | Consistent | Unbiased |
|---|---|---|
| Nói về | Hành vi khi $n\to\infty$ | Hành vi trung bình ở **mọi** $n$ |
| Có thể có cái này mà thiếu cái kia? | Có, cả hai chiều | |

- Consistent nhưng chệch: $\hat\sigma^2_{\text{MLE}}$
- Unbiased nhưng không consistent: $\hat\theta = X_1$

**Consistency quan trọng hơn.** Một estimator không consistent thì thêm dữ liệu cũng vô ích.

## 5. Các tiêu chí khác

- **Efficiency**: variance nhỏ nhất trong lớp estimator không chệch. Cận dưới là **Cramér–Rao** → [[Fisher Information]].
- **Asymptotic normality**: $\sqrt n(\hat\theta_n-\theta^*)\xrightarrow{d}N(0,V)$ — cơ sở của [[Confidence Intervals]].
- **Robustness**: có bị một outlier phá hỏng không? Median có breakdown point 50%, mean có 0%.
- **Sufficiency**: statistic có giữ hết thông tin về $\theta$ không (Rao–Blackwell).

## 6. Cạm bẫy

1. **Chỉ tối ưu bias, bỏ qua variance** (hoặc ngược lại). Nhìn **risk**.
2. **Cho rằng unbiased luôn tốt hơn.**
3. **Dùng estimator không consistent** rồi thêm dữ liệu và tưởng đã cải thiện.
4. **Bias do lấy mẫu ≠ bias của estimator.** Mẫu lệch thì không estimator nào cứu được → [[Law of Large Numbers]].
5. **Quên rằng risk phụ thuộc $\theta^*$.** Một estimator có thể tốt ở vùng này, tệ ở vùng khác — nên mới có minimax risk.
6. **Đánh giá estimator trên chính dữ liệu đã dùng để khớp** → đánh giá quá lạc quan.
7. **`ddof` sai** trong thư viện.

## 7. Checklist
- [ ] $\hat\theta_n$ có consistent không?
- [ ] Bias là bao nhiêu? Có giảm theo $n$ không?
- [ ] Variance là bao nhiêu? Có giảm theo $1/n$ không?
- [ ] Risk tổng cộng so với các estimator khác thế nào?
- [ ] Có nhạy với outlier không?
- [ ] Risk có phụ thuộc mạnh vào $\theta^*$ không?
- [ ] Có bias nào đến từ **thiết kế lấy mẫu** không? (không sửa được bằng toán)

## Tham khảo
- MIT 18.650 Lecture 3 (*Bias of an Estimator*, *Quadratic Risk*): https://www.youtube.com/watch?v=TSkDZbGS94k
- Wasserman — *All of Statistics*, Ch.6: https://link.springer.com/book/10.1007/978-0-387-21736-9
- Wikipedia — *Bias–variance tradeoff*: https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff
- Wikipedia — *Bessel's correction*: https://en.wikipedia.org/wiki/Bessel%27s_correction
- Wikipedia — *Consistent estimator*: https://en.wikipedia.org/wiki/Consistent_estimator

## Liên kết
[[Statistical Model]] · [[Maximum Likelihood Estimation]] · [[Fisher Information]] · [[Variance]] · [[Confidence Intervals]] · [[Prob&Stats]]
