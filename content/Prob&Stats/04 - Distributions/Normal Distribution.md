---
tags: [probability, distribution, continuous]
status: evergreen
---
# Normal Distribution

> Không phải vì thế giới "tự nhiên là Normal", mà vì **tổng của nhiều thứ nhỏ độc lập** thì Normal. Hiểu đúng lý do này quyết định khi nào được dùng nó.

## 1. Định nghĩa

$X \sim N(\mu, \sigma^2)$:
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$
$$E[X]=\mu, \quad \text{Var}(X)=\sigma^2, \quad M_X(t) = \exp\!\left(\mu t + \tfrac{\sigma^2 t^2}{2}\right)$$

**Standard Normal** $Z\sim N(0,1)$ có PDF $\varphi$ và CDF $\Phi$. Chuẩn hoá: $Z = \frac{X-\mu}{\sigma}$.

$\Phi$ **không có dạng đóng** — phải tra bảng hoặc dùng `erf`. Đây là lý do inverse transform sampling không dùng được trực tiếp cho Normal.

## 2. Quy tắc 68–95–99.7

| Khoảng | Xác suất |
|---|---|
| $\mu \pm 1\sigma$ | 68.27% |
| $\mu \pm 2\sigma$ | 95.45% |
| $\mu \pm 3\sigma$ | 99.73% |
| $\mu \pm 1.96\sigma$ | **95%** (dùng cho khoảng tin cậy) |
| $\mu \pm 2.58\sigma$ | 99% |

Số 1.96 là số nên thuộc lòng → [[Confidence Intervals]].

## 3. Tính chất đặc trưng

| Tính chất | Nội dung |
|---|---|
| **Đối xứng** | $\varphi(-z)=\varphi(z)$, $\Phi(-z) = 1-\Phi(z)$ |
| **Đóng dưới phép cộng** | $X\perp Y$ Normal $\Rightarrow aX+bY$ Normal |
| **Đóng dưới biến đổi tuyến tính** | $aX+b \sim N(a\mu+b, a^2\sigma^2)$ |
| **Uncorrelated ⟺ independent** | Chỉ khi **joint** Normal |
| **Moment lẻ** | $E[Z^{2k+1}]=0$; $E[Z^2]=1$, $E[Z^4]=3$ |
| **Entropy cực đại** | Trong mọi phân phối có variance cho trước |

Tính đóng dưới phép cộng chứng minh gọn nhất bằng [[Moment Generating Functions]]: nhân hai MGF dạng $e^{\mu t + \sigma^2t^2/2}$ ra đúng dạng đó.

## 4. Vì sao Normal ở khắp nơi

[[Central Limit Theorem]]: tổng/trung bình của nhiều biến iid có variance hữu hạn → Normal, **bất kể phân phối gốc**.

Hệ quả: đại lượng nào là *tổng* của nhiều tác động nhỏ độc lập thì gần Normal (chiều cao, sai số đo). Đại lượng nào là *tích* của nhiều tác động thì gần **Lognormal** (thu nhập, giá cổ phiếu, kích thước công ty) — vì log của tích là tổng.

## 5. Cạm bẫy

1. **Giả định Normal cho dữ liệu có đuôi dày.** Lợi suất tài chính có kurtosis cao; "biến động 6-sigma" xảy ra thường xuyên hơn Normal dự đoán hàng tỉ lần. Đây là phê phán trung tâm của Taleb.
2. **Giả định Normal cho dữ liệu bị chặn hoặc lệch.** Thời gian, thu nhập, số đếm — không âm và lệch phải; dùng Lognormal/Gamma.
3. **Nhầm "marginal Normal" với "joint Normal".** Hai biến từng cái Normal vẫn có thể có joint rất kỳ dị; lúc đó uncorrelated **không** kéo theo độc lập → [[Independence of Random Variables]].
4. **Dùng CLT với cỡ mẫu nhỏ và phân phối lệch mạnh.** "$n\ge30$" là quy tắc ngón tay cái, không phải định lý.
5. **Quên continuity correction** khi xấp xỉ Binomial.
6. **CLT không áp dụng khi variance vô hạn** (Cauchy, Pareto với $\alpha\le2$) → [[Central Limit Theorem]].
7. **Kiểm định normality với $n$ rất lớn** luôn bác bỏ — mọi dữ liệu thật đều không Normal chính xác. Nhìn Q–Q plot thay vì p-value.

## 6. Checklist
- [ ] Đại lượng này có phải tổng của nhiều tác động nhỏ không?
- [ ] Có bị chặn (không âm, có trần) không?
- [ ] Có đuôi dày không? (kurtosis, Q–Q plot)
- [ ] Nếu lệch phải mạnh → thử log rồi kiểm tra lại
- [ ] Đang cần joint Normal hay chỉ marginal?
- [ ] Cỡ mẫu đủ cho CLT chưa, xét đến độ lệch của phân phối gốc?
- [ ] Kết luận có nhạy với giả định đuôi không? (stress test)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.norm` | pdf/cdf/ppf | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html |
| `scipy.stats.probplot` | Q–Q plot kiểm tra normality | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.probplot.html |
| `scipy.special.erf` | Tính $\Phi$ chính xác | https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.erf.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §5.4: http://probabilitybook.net
- Stat 110 Lecture 13–14: https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo
- Wikipedia — *Normal distribution*: https://en.wikipedia.org/wiki/Normal_distribution
- Wikipedia — *Log-normal distribution*: https://en.wikipedia.org/wiki/Log-normal_distribution
- Taleb — *The Black Swan* (phê phán giả định Normal): https://en.wikipedia.org/wiki/The_Black_Swan_(Taleb_book)

## Liên kết
[[Central Limit Theorem]] · [[Uniform Distribution]] · [[Variance]] · [[Confidence Intervals]] · [[Moment Generating Functions]] · [[Prob&Stats]]
