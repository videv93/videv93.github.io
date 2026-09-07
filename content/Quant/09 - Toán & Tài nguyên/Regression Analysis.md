---
tags: [quant, math, statistics]
status: growing
---
# Regression Analysis

> Công cụ được dùng nhiều nhất trong quant, và cũng bị dùng sai nhiều nhất. Điểm mấu chốt hay bị hiểu nhầm: **"tuyến tính" nói về tham số, không phải về biến.**

## 1. Thiết lập

**Multiple linear regression:** một biến phụ thuộc, nhiều biến giải thích.
$$y_i = \hat{y}_i + \varepsilon_i, \qquad \hat{y}_i = \beta_0 + \beta_1 x_{i1} + \dots + \beta_p x_{ip}$$

**Ba mục đích khác nhau:**
1. **Dự báo** — ví dụ dự báo return trên một horizon cố định.
2. **Suy luận nhân quả** — thí nghiệm y học, treatment effect. Trong tài chính rất khó. Xem [[Efficient Market Hypothesis]].
3. **Xấp xỉ hàm** — hiểu quan hệ hàm giữa các biến.

## 2. ⚠️ "Tuyến tính" nghĩa là gì

Các biến giải thích có thể là:
- Các luỹ thừa khác nhau của **một** biến $x$ (đa thức).
- **Chuỗi Fourier** của $x$.
- **Giá trị trễ** của chính chuỗi $y$ (autoregression).

> Cái quan trọng **không phải** là $\hat{y}$ là tổng của các $x$, mà là **$\hat{y}$ tuyến tính trong các tham số $\beta$.**

Chính tính tuyến tính theo tham số này cho phép ta xác định tham số bằng công thức đóng.

Đây cũng là điểm được nhấn mạnh trong [[Model Specification and Parameterization]]: model tuyến tính chỉ tuyến tính trong parameterization — bạn feature-engineer thoải mái.

## 3. Ví dụ minh hoạ: high yield spread

Chuỗi high yield spread (yield trái phiếu BAA − yield Treasury Mỹ). Chênh lệch này dương, thường trên 2 — công ty tín dụng thấp phải trả lãi cao hơn.

**Fit bằng đa thức bậc 8:** khớp hoàn hảo. Ai cũng biết đa thức bậc đủ cao khớp được mọi đường cong mượt. **Nhưng ta có kỳ vọng spread thực sự tuân theo một đa thức bậc cao không? Gần như chắc chắn không.** → Đây là [[Backtesting and Overfitting]] dưới dạng khác.

**Fit bằng chuỗi Fourier:** thêm số hạng → mô hình hoá được biến thiên tần số cao hơn. Cho thấy phân tích tần số có thể hữu ích trong chuỗi tài chính.

**Fit bằng autoregression:** *"spread ngày mai bằng spread hôm nay, hoặc rất gần"*. Kết quả: **R² = 0,995** — đường fit gần như trùng khớp hoàn toàn.

> Việc dùng giá trị lịch sử của một chuỗi thời gian có thể **cực kỳ mạnh** để dự báo giá trị tương lai.

⚠️ Nhưng đừng nhầm: R² 0,995 ở đây phần lớn phản ánh việc chuỗi có **unit root** (nó gần như random walk), không phải việc bạn dự báo giỏi. Xem [[Stationarity and Non-Stationarity]].

## 4. Quy trình chuẩn

1. **Đề xuất model** + đưa ra **giả định về sai số** $\varepsilon$.
2. **Định nghĩa tiêu chí** đánh giá estimator — least squares, minimum MSE, maximum likelihood, robust, Bayes.
3. **Đặc trưng hoá estimator tốt nhất** theo tiêu chí đó.
4. **Kiểm tra giả định có thoả không.**
5. **Rất thường xuyên** phát hiện giả định không thoả → sửa lại → model mới.

## 5. Giả định Gauss-Markov

Sai số có mean 0, phương sai hằng số $\sigma$, và **không tương quan**.

**Có thể thêm:** sai số phân phối chuẩn (không bắt buộc cho BLUE).

**Có thể tổng quát hoá:**
| Mở rộng | Khi nào cần |
|---|---|
| Phương sai **không hằng số** (heteroscedastic) | Luôn cần trong tài chính. Xem [[ARCH and GARCH Models]] |
| Sai số **tương quan theo thời gian** | Time series regression → generalized Gauss-Markov |
| Phân phối **không chuẩn** | Dữ liệu return — fat tails. Xem [[Stylized Facts of Volatility]] |

> Câu hỏi dẫn đường cho mọi phân tích thực nghiệm: **giả định của bạn có hợp lý không, nếu không thoả bởi dữ liệu?** Và: **tiêu chí bạn dùng có phù hợp không? Có biến thể nào cho hiệu suất cao hơn không?**

## 6. Ứng dụng trong vault này

| Nơi dùng | Note |
|---|---|
| Đo beta của danh mục | [[CAPM Alpha and Beta]] |
| Kiểm tra alpha có ý nghĩa thống kê | [[Alpha Signals]] |
| Hồi quy realized vol phía trước trên implied vol | [[Volatility Risk Premium]] |
| Fit AR(1) để suy ngược tham số OU | [[Ornstein-Uhlenbeck Process]] |
| Ước lượng mức mean-reverting cho VIX | [[Kalman Filter]] |

## 7. Cạm bẫy
- **R² cao ≠ model tốt.** Đặc biệt với chuỗi có unit root.
- **Bỏ qua kiểm tra residual.** Autocorrelation, heteroscedasticity, non-normality đều thay đổi kết luận.
- **Nhầm correlation với causation.** Cần regression discontinuity, instrumental variables, difference-in-differences.
- **Overfit bằng đa thức bậc cao.** Xem mục 3.
- **Dùng OLS trên dữ liệu heteroscedastic** mà không dùng robust standard errors.
- **Nhìn p-value mà không nhìn effect size.**

## 8. Checklist áp dụng
- [ ] Model của tôi tuyến tính trong **tham số** chứ?
- [ ] Tôi đã vẽ residual chưa? Chúng có ngẫu nhiên không?
- [ ] Residual có heteroscedastic không? Tôi dùng robust standard errors chưa?
- [ ] R² cao của tôi có phải do unit root không?
- [ ] Tôi đang dự báo, suy luận nhân quả, hay xấp xỉ hàm? Tiêu chí có phù hợp không?
- [ ] Tôi thử bao nhiêu specification trước khi ra kết quả này?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `statsmodels` (Python) | OLS + đầy đủ chẩn đoán, robust SE | https://www.statsmodels.org |
| `linearmodels` (Python) | Panel data, IV, factor model | https://bashtage.github.io/linearmodels/ |
| R base `lm` / `glm` | Chuẩn thống kê, chẩn đoán tốt | https://www.r-project.org |
| RStudio Cloud | Chạy R trên trình duyệt, không cần cài | https://posit.cloud |

## Tham khảo
- MIT 18.642 — *Lecture 6: Stochastic Processes I (cont.); Regression Analysis*: https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024
- Greene, W. — *Econometric Analysis*
- Angrist & Pischke — *Mostly Harmless Econometrics*
- Hastie, Tibshirani & Friedman — *The Elements of Statistical Learning*
- FRED (Federal Reserve Economic Database) — ~80.000 chuỗi thời gian: https://fred.stlouisfed.org

## Liên kết
[[CAPM Alpha and Beta]] · [[Alpha Signals]] · [[Time Series Analysis]] · [[Math for Quantitative Finance]] · [[Stationarity and Non-Stationarity]] · [[Quant]]
