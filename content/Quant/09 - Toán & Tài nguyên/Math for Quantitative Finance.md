---
tags: [quant, math, roadmap]
status: growing
---
# Math for Quantitative Finance

> Lộ trình toán tối thiểu để làm quant. Không phải "học hết toán" — mà là biết **thứ tự** và **vì sao** mỗi mảng cần thiết.

> [!note] Ghi chú nguồn
> Trong seed gốc, file `Math for Quantatative Finance.md` **hoàn toàn rỗng** — chỉ có frontmatter và một link YouTube. Note này trả lời hứa đó, tổng hợp từ các yêu cầu thực tế xuất hiện xuyên suốt vault.

## 1. Vì sao các firm đòi trình toán cao

Citadel, Jane Street, Jump đòi trình toán và thống kê cao. Coding cần thiết, kiến thức tài chính thì học trên việc được.

> Lý do không phải vì họ biết điều bạn không biết. **Họ không biết Apple sẽ lên hay xuống tuần sau. Không ai biết.**
> Mục đích của quá trình modeling là **áp một cấu trúc hữu ích lên bất định** để có edge so với đối thủ — và đối thủ của bạn cũng là những người giỏi nhất thế giới đang xây model tương tự.

Và vì **động lực của trò chơi này thay đổi hàng ngày**, bạn không thể học một bộ quy tắc cố định. Bạn phải học **cách xây model**.

## 2. Lộ trình theo tầng

### Tầng 0 — Bắt buộc trước mọi thứ

| Mảng | Dùng ở đâu trong vault này |
|---|---|
| **Giải tích** (một biến & nhiều biến) | Đạo hàm riêng trong [[Black-Scholes Model]], tối ưu hoá |
| **Đại số tuyến tính** | [[Efficient Frontier]] (ma trận covariance), PCA, [[Regression Analysis]] |
| **Xác suất** | Nền của **mọi thứ**. [[Expectation and Convergence]] |
| **Thống kê** | Ước lượng, kiểm định, [[Regression Analysis]] |

Đây chính là prerequisite mà MIT 18.642 nêu: **linear algebra, một chút statistics, calculus và mathematical analysis.** Không yêu cầu kiến thức tài chính trước.

### Tầng 1 — Cốt lõi quant

| Mảng | Note liên quan |
|---|---|
| **Quá trình ngẫu nhiên** — martingale, Markov, stopping time | [[Martingales]], [[Markov Chains]] |
| **Time series** — AR, MA, ARMA, ARIMA, unit root | [[Time Series Analysis]], [[Stationarity and Non-Stationarity]] |
| **Econometrics** — OLS, Gauss-Markov, causality | [[Regression Analysis]], [[Efficient Market Hypothesis]] |
| **Phương pháp số** — Monte Carlo, finite differences | [[Monte Carlo Simulation]] |
| **Tối ưu hoá** — MLE, L-BFGS, convex optimization | [[Ornstein-Uhlenbeck Process]], [[Efficient Frontier]] |

### Tầng 2 — Giải tích ngẫu nhiên (nếu làm pricing)

| Mảng | Note liên quan |
|---|---|
| **Brownian motion, bổ đề Itô, tích phân Itô** | [[Brownian Motion and SDEs]] |
| **SDE và nghiệm** | [[Ornstein-Uhlenbeck Process]] |
| **PDE** (đặc biệt parabolic / phương trình truyền nhiệt) | [[Black-Scholes Model]] |
| **Định lý Feynman-Kac, đổi độ đo (Girsanov)** | [[Feynman-Kac and Risk-Neutral Pricing]] |

### Tầng 3 — Chuyên sâu

- Machine learning (hiểu đúng: **kỳ vọng có điều kiện phi tuyến**, không phải "dự đoán")
- Fourier transform (FFT cho pricing — Carr–Madan)
- Rough path theory, Volterra process, fractional Brownian motion
- Hawkes process, jump diffusion
- Reinforcement learning (nối với [[Optimal Policy Function]])

## 3. Coding — không tách rời

| Ngôn ngữ | Dùng cho |
|---|---|
| **Python** | Nghiên cứu, prototyping, ML. Hệ sinh thái mạnh nhất |
| **C++** | Engine thực thi latency-nhạy. Xem [[Ornstein-Uhlenbeck Process]] mục Euler–Maruyama |
| **R** | Thống kê, truy cập ngay các phương pháp mới. MIT 18.642 dùng R + RStudio Cloud |
| **SQL / parquet** | Xử lý dữ liệu lớn. Xem [[Alternative Data]] |

## 4. Cạm bẫy trong việc học
- **Học toán mà không gắn với bài toán.** Mỗi mảng ở trên nên học kèm một ứng dụng cụ thể.
- **Nhảy thẳng vào stochastic calculus** khi chưa vững xác suất.
- **Bỏ qua econometrics** vì nghĩ ML thay thế được. Không — causality vẫn là vấn đề mở.
- **Bỏ qua bề rộng.** Có PhD vật lý là tốt, nhưng bạn đã học macroeconomics chưa? Tài chính, kinh tế, công nghệ, các ngành khác nhau — tất cả thay đổi động lực cuộc chơi.
- **Học để "biết" thay vì để "xây".** Mục tiêu là xây được model.

## 5. Checklist tự đánh giá
- [ ] Tôi viết ra được bổ đề Itô và giải thích vì sao $(dW)^2 = dt$ không?
- [ ] Tôi phân biệt được convergence in probability với almost sure convergence không?
- [ ] Tôi giải thích được vì sao OLS là BLUE dưới giả định Gauss-Markov không?
- [ ] Tôi code được một Monte Carlo pricer từ đầu không?
- [ ] Tôi calibrate được một model bằng MLE không?
- [ ] Tôi giải thích được ML là kỳ vọng có điều kiện phi tuyến không?

## Tham khảo
- The Math Sorcerer — *Math for Quantitative Finance*: https://youtu.be/8U0ksSGEHtc
- **MIT 18.642** — Topics in Mathematics with Applications in Finance (Fall 2024): https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024
- **MIT 18.S096** — phiên bản 2013: https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013
- Shreve, S. — *Stochastic Calculus for Finance I & II*
- Wilmott, P. — *Paul Wilmott on Quantitative Finance*
- Joshi, M. — *The Concepts and Practice of Mathematical Finance*
- Quant Guild — *I Built the Quant Roadmap*: https://youtu.be/kLJEXE5_7rI
- Quant Guild — *I Ranked the Best College Majors for Becoming a Quant*: https://youtu.be/DL_mG-RUFlQ
- Quant Guild — *Books that Made Me a Quant*: https://youtu.be/izuZqWz-Dpg

## Liên kết
[[Regression Analysis]] · [[Monte Carlo Simulation]] · [[Brownian Motion and SDEs]] · [[Learning Resources]] · [[Quant]]
