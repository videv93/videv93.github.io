---
tags: [quant, probability, stochastic]
status: growing
---
# Brownian Motion and SDEs

> Nền tảng vay từ vật lý cho gần như mọi model liên tục trong quant finance. Hiểu nó không phải để "biết toán" mà để biết model của bạn **giả định gì về thế giới**.

## 1. Chuyển động Brown chuẩn

Phương trình vi phân ngẫu nhiên (SDE) cơ sở:
$$dX_t = \mu\,dt + \sigma\,dW_t$$

- $\mu\,dt$ — **drift**: xu hướng xác định.
- $\sigma\,dW_t$ — **diffusion**: nhiễu Gaussian không dự đoán được. $W_t$ là quá trình Wiener.

**Cái bẫy chết người:** trong model này **phương sai tăng vô hạn theo thời gian**. Không có neo. Không có lực hồi phục. Giá có thể trôi đi mãi. Brownian motion **không có trí nhớ**.

→ Hệ quả trực tiếp: **giao dịch mean reversion trên kiến trúc này là tự sát về mặt toán học.** Bạn cần một quá trình có neo — xem [[Ornstein-Uhlenbeck Process]].

## 2. Geometric Brownian Motion (GBM)

Giá tài sản không thể âm, và biến động theo tỉ lệ chứ không theo lượng tuyệt đối. Nên mô hình chuẩn là:
$$dS_t = \mu S_t\,dt + \sigma S_t\,dW_t$$

Dưới **độ đo risk-neutral**, drift được thay bằng lãi suất phi rủi ro:
$$dS_t = r S_t\,dt + \sigma S_t\,dW_t$$
Risk-neutral chỉ có nghĩa: *trong kỳ vọng, tài sản tăng trưởng bằng risk-free rate*. Không hơn. Xem [[Feynman-Kac and Risk-Neutral Pricing]].

GBM là giả định nền của [[Black-Scholes Model]].

## 3. Quy tắc tính toán Itô

Ba đẳng thức làm nên toàn bộ stochastic calculus:
$$dt^2 = 0,\qquad dt\,dW_t = 0,\qquad (dW_t)^2 = dt$$

Đẳng thức thứ ba (**quadratic variation**) là điều làm calculus ngẫu nhiên khác calculus thường.

**Bổ đề Itô** — với $V(S_t, t)$:
$$dV = \frac{\partial V}{\partial t}dt + \frac{\partial V}{\partial S}dS + \frac{1}{2}\frac{\partial^2 V}{\partial S^2}(dS)^2$$
Mọi số hạng bậc cao hơn triệt tiêu vì hai quy tắc đầu. Với GBM, $(dS)^2 = \sigma^2 S^2\,dt$.

**Phiên bản product rule** (cần khi xử lý quá trình chiết khấu $e^{-rt}V$):
$$d(A_tB_t) = A_t\,dB_t + B_t\,dA_t + dA_t\,dB_t$$

## 4. Rời rạc hoá: Euler–Maruyama

Sàn giao dịch không truyền dữ liệu liên tục — order book đến theo tick rời rạc. Triển khai SDE liên tục trong engine rời rạc gây **discretization error tích luỹ**.

$$X_{t+\Delta t} = X_t + \mu(X_t)\Delta t + \sigma\sqrt{\Delta t}\, Z,\qquad Z \sim \mathcal{N}(0,1)$$

Điểm mấu chốt về hiệu năng: nghiệm giải tích chính xác cần hàm mũ (`std::exp`), tốn tới ~100 chu kỳ CPU mỗi lần gọi. Với hàng triệu quote đến, đó là nút cổ chai. Euler–Maruyama đổi độ chính xác lấy phép nhân đơn thuần — precompute $\sqrt{\Delta t}$ ngoài vòng lặp nóng. Xem [[Ornstein-Uhlenbeck Process]] mục triển khai.

## 5. Mở rộng khi thực tế phá vỡ giả định

| Vấn đề thực tế | Mở rộng |
|---|---|
| Volatility không hằng số | Heston (stochastic volatility), SABR |
| Fat tails, flash crash | Merton jump diffusion (thêm quá trình Poisson) |
| Jump cụm lại, "sợ hãi lây lan" | **Hawkes process** (self-exciting) — Poisson với cường độ $\lambda$ hằng số là giả định quá ngây thơ |
| Long memory trong volatility | Fractional Brownian motion, Volterra process (rough volatility) |

## 6. Cạm bẫy
- **Dùng Brownian motion thuần để trade mean reversion.** Xem mục 1.
- **Giả định Gaussian.** Thị trường có skewness, volatility clustering, flash crash. Sự kiện 6-sigma xảy ra thường xuyên hơn nhiều so với mô hình chuẩn dự đoán. Xem [[Stylized Facts of Volatility]].
- **Ước lượng tham số bằng moving average lịch sử.** Đưa vào bias thống kê không phục hồi được — bạn đang giao dịch một ảo giác. Dùng MLE.
- **Quên rằng risk-neutral ≠ real-world.** Định giá dùng $\mathbb{Q}$; đo rủi ro dùng $\mathbb{P}$.

## 7. Checklist áp dụng
- [ ] Quá trình tôi mô hình hoá có cần neo (mean reversion) không? Nếu có, BM thuần là sai.
- [ ] Tôi đã kiểm tra return có fat tails không trước khi giả định Gaussian?
- [ ] Tham số của tôi đến từ đâu — MLE hay ước chừng?
- [ ] Discretization step $\Delta t$ của tôi có đủ nhỏ so với động lực của quá trình không?
- [ ] Tôi đang làm việc dưới độ đo $\mathbb{P}$ hay $\mathbb{Q}$? Có nhất quán không?

## Tham khảo
- Shreve, S. — *Stochastic Calculus for Finance II: Continuous-Time Models*
- Øksendal, B. — *Stochastic Differential Equations*
- Quant Guild — *Brownian Motion for Quant Finance*: https://youtu.be/jiAdz9W4aDI
- Quant Guild — *Ito's Lemma Clearly and Visually Explained*: https://youtu.be/TgBzqdN24fo
- Quant Guild — *Ito Integration Clearly and Visually Explained*: https://youtu.be/dUvZ8m3QpeI
- Quant Guild — *Stochastic Differential Equations for Quant Finance*: https://youtu.be/qDAeSC40ZJE
- The Gaussian Cookbook — công thức mô phỏng: https://gaussiancookbook.com · SSRN 5332011

## Liên kết
[[Ornstein-Uhlenbeck Process]] · [[Black-Scholes Model]] · [[Feynman-Kac and Risk-Neutral Pricing]] · [[Monte Carlo Simulation]] · [[Martingales]] · [[Quant]]
