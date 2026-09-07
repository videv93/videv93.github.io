---
tags: [quant, probability, stochastic, mean-reversion]
status: evergreen
---
# Ornstein-Uhlenbeck Process

> Chuyển động Brown **có lò xo**. Đây là mô hình mean reversion chuẩn cho spread stat-arb, lãi suất, và volatility — và là lý do bạn không nên trade mean reversion bằng moving average.

## 1. SDE và trực giác

$$dX_t = \kappa(\theta - X_t)\,dt + \sigma\,dW_t$$

| Tham số | Ý nghĩa |
|---|---|
| $\theta$ | Mức cân bằng dài hạn (long-term mean) |
| $\kappa$ (hay $\theta$ trong một số ký hiệu khác) | **Tốc độ hồi phục** — "độ cứng của lò xo" |
| $\sigma$ | Volatility |
| $W_t$ | Quá trình Wiener chuẩn |

Khác biệt cốt lõi so với [[Brownian Motion and SDEs]]: **drift không còn là hằng số**, mà **tỉ lệ với khoảng cách tới mean**.
- $X_t > \theta$ → drift âm → kéo xuống.
- $X_t < \theta$ → drift dương → chặn drawdown.

## 2. Tính chất

**Kỳ vọng có điều kiện:**
$$\mathbb{E}[X_t \mid X_0] = \theta + (X_0-\theta)e^{-\kappa t} \;\xrightarrow{t\to\infty}\; \theta$$

**Phương sai:**
$$\operatorname{Var}(X_t) = \frac{\sigma^2}{2\kappa}\left(1-e^{-2\kappa t}\right) \;\xrightarrow{t\to\infty}\; \frac{\sigma^2}{2\kappa}$$

> **Đây là điểm quan trọng nhất:** phương sai **không** tăng vô hạn. Nó hội tụ về $\sigma^2/2\kappa$. Ta có một khung liên tục **bị chặn, dừng, và giao dịch được**.

**Hàm tự tương quan:** $\rho(s) = e^{-\kappa s}$ — phân rã mũ.

**Phân phối:** Gaussian với mean và variance phụ thuộc thời gian; ở trạng thái dừng là $\mathcal{N}(\theta, \sigma^2/2\kappa)$.

## 3. Nghiệm chính xác vs Euler–Maruyama

Nhân hai vế với integrating factor $e^{\kappa t}$ và áp bổ đề Itô → tích phân được chính xác, cho **transition density chính xác** (sai số xấp xỉ bằng 0).

Vậy vì sao vẫn dùng Euler–Maruyama?

> Vì nghiệm chính xác đòi hỏi tính hàm mũ **ở mỗi tick**. Ở tầng phần cứng, `std::exp` tốn tới ~100 chu kỳ CPU. Với hàng triệu quote đến, overhead này làm nghẽn luồng giao dịch → execute trên dữ liệu cũ → bị front-run.

Rời rạc hoá:
$$X_{t+\Delta t} = X_t + \kappa(\theta - X_t)\Delta t + \sigma\sqrt{\Delta t}\,Z,\quad Z\sim\mathcal{N}(0,1)$$

Precompute $\sqrt{\Delta t}$ ngoài hot loop → vòng lặp chỉ còn phép nhân. Đây là đánh đổi **độ chính xác lấy latency**, và trong HFT đó là đánh đổi đúng.

## 4. Calibration — đừng đoán tham số

Kiến trúc nhanh nhưng nếu $\kappa, \theta, \sigma$ đến từ moving average lịch sử thì bạn đang **giao dịch một ảo giác**.

**Hai cách chuẩn:**

**a) OLS qua rời rạc hoá AR(1).** OU rời rạc chính là AR(1):
$$X_{t+1} = \phi X_t + b + \varepsilon$$
Hồi quy → $\phi, b$ → suy ngược ra $\kappa = -\ln\phi/\Delta t$ và $\theta = b/(1-\phi)$.

**b) Maximum Likelihood Estimation.** Vì transition là Gaussian chính xác, xây likelihood tích trên mọi tick, lấy log để tránh underflow, rồi tối ưu (ví dụ **L-BFGS-B** trong `scipy.optimize`).

Kiểm chứng bằng mô phỏng: sinh path với $\theta = 0{,}5$ đã biết → OLS cho 0,50698; MLE cũng rất sát. Covariance lý thuyết 0,0401 vs tính từ dữ liệu 0,0403.

## 5. First passage time

Thời gian kỳ vọng để quá trình chạm mức $\theta$ từ trạng thái ban đầu — có mật độ giải tích, chuẩn hoá qua hằng số $C$ = độ lệch ban đầu đã chuẩn hoá so với $\theta$. Cực kỳ hữu ích cho stat-arb: **spread mất bao lâu để đóng?**

Đối chiếu mật độ lý thuyết với histogram hitting time mô phỏng → khớp tốt.

## 6. Vấn đề còn lại: giả định Gaussian

Toàn bộ khung OU xây trên Brownian motion → giả định Gaussian, volatility hằng số, tail event bất khả thi. Thực tế: skewness lớn, volatility clustering, flash crash. Một sự kiện 6-sigma sẽ khiến model không dự báo được cú nhảy.

**Mở rộng jump diffusion:**
$$dX_t = \kappa(\theta - X_t)\,dt + \sigma\,dW_t + J\,dq_t$$
$dq_t$ = bộ đếm Poisson với cường độ $\lambda$; khi kích hoạt, chồng thêm cú sốc biên độ $J$. Cho phép giá "dịch chuyển tức thời" qua order book — mô hình hoá flash crash.

Triển khai: mỗi tick chạy bước Euler–Maruyama, rồi rút một biến uniform; nếu dưới ngưỡng $\lambda$ thì kích hoạt jump.

⚠️ **Lỗ hổng còn lại:** Poisson chuẩn giả định cú sốc xảy ra với xác suất **không đổi**. Thực tế flash crash sinh ra hoảng loạn — **jump cụm lại**. Để mô hình hoá lây lan này cần **Hawkes process** (self-exciting).

## 7. Ứng dụng
- **Stat-arb / pairs trading**: spread giữa hai tài sản là đối tượng OU điển hình.
- **Lãi suất**: mô hình Vasicek chính là OU.
- **Volatility / VIX**: vol là quá trình mean-reverting được ghi nhận rộng rãi trong literature → là lựa chọn model đúng cho [[Kalman Filter]] trên VIX.
- **Vật lý**: vận tốc hạt Brown có ma sát. **Sinh học**: động lực quần thể.

## 8. Cạm bẫy
- **Dùng moving average làm proxy mean reversion.** Không có neo, không có ràng buộc phương sai, không có tham số hồi phục.
- **Đoán tham số thay vì calibrate.** Bias thống kê không phục hồi được.
- **Giả định $\theta$ cố định.** Mức cân bằng dài hạn cũng đổi theo regime. Xem [[Model Specification and Parameterization]].
- **Bỏ qua fat tails.** OU thuần sẽ không sống sót qua macro shock.
- **Cửa sổ calibration sai.** Dùng toàn bộ lịch sử khi phân phối đã đổi → tham số sai hoàn toàn.

## 9. Checklist áp dụng
- [ ] Chuỗi của tôi có thật sự mean-reverting không? (test ADF / Hurst exponent)
- [ ] Tôi calibrate bằng MLE hay OLS, hay đang đoán?
- [ ] Cửa sổ calibration của tôi có phản ánh data-generating distribution hiện tại không?
- [ ] Xác suất chạm mức nào đó theo model có hợp lý không? (Nếu ra "1 lần mỗi 65 tỉ năm" → sai tham số)
- [ ] Tôi có cần jump component không? Tài sản này có gap không?
- [ ] Nếu chạy trong engine latency-nhạy, tôi đã loại `exp` khỏi hot loop chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.optimize` L-BFGS-B | Tối ưu negative log-likelihood để calibrate | https://docs.scipy.org/doc/scipy/reference/optimize.html |
| `statsmodels` AR / ARIMA | Fit AR(1) → suy ngược tham số OU | https://www.statsmodels.org |
| AIMLModeling/OrnsteinUhlenbeck | Code mô phỏng + first passage time | https://github.com/AIMLModeling/OrnsteinUhlenbeck |
| The Gaussian Cookbook | Công thức mô phỏng quá trình ngẫu nhiên | https://gaussiancookbook.com |

## Tham khảo
- Uhlenbeck & Ornstein — *On the Theory of the Brownian Motion*, Phys. Rev. 36 (1930)
- Vasicek, O. — *An equilibrium characterization of the term structure*, JFE (1977)
- *Modeling Mean Reversion with the Ornstein-Uhlenbeck Process*: https://youtu.be/Irv0tp6Etbc
- *Simulating Ornstein-Uhlenbeck Process in Python*: https://youtu.be/dV23py1ISs0
- Quant Guild — *Trading Mean Reversion with Kalman Filters*: https://youtu.be/BuPil7nXvMU
- Quant Guild — *Hawkes Processes for Quant Finance*: https://youtu.be/BotPHbWFRUA
- Merton, R. — *Option pricing when underlying stock returns are discontinuous*, JFE (1976)

## Liên kết
[[Brownian Motion and SDEs]] · [[Kalman Filter]] · [[Stylized Facts of Volatility]] · [[Model Specification and Parameterization]] · [[Monte Carlo Simulation]] · [[Quant]]
