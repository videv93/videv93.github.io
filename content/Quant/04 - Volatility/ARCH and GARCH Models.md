---
tags: [quant, volatility, time-series, modeling]
status: evergreen
---
# ARCH and GARCH Models

> Mô hình hoá **phương sai có điều kiện thay đổi theo thời gian** một cách tiết kiệm tham số. Tác động lớn nhất của chúng không nằm ở dự báo vol, mà ở **đo rủi ro**.

## 1. Giải nghĩa cái tên

**ARCH** = **A**uto**R**egressive **C**onditionally **H**eteroscedastic.

| Thành phần | Nghĩa |
|---|---|
| **Autoregressive** | Dùng giá trị trễ **của chính quá trình** để ước lượng trạng thái tương lai |
| **Homoscedastic** | Phương sai **hằng số** — không bao giờ đúng trong tài chính |
| **Heteroscedastic** | Phương sai **không hằng số** — khớp với dữ liệu |
| **Conditionally** heteroscedastic | Phương sai của sai số đổi theo thời gian và **phụ thuộc thông tin quá khứ** |

## 2. Định nghĩa ARCH(q)

Chuỗi return:
$$y_t = \mu + \varepsilon_t, \qquad \varepsilon_t = \sigma_t z_t$$
với $z_t$ là **innovation**, $\mathbb{E}[z_t]=0$, $\operatorname{Var}(z_t)=1$ (thường chuẩn, nhưng phân phối đuôi dày cũng dùng được).

Quá trình volatility:
$$\sigma_t^2 = \alpha_0 + \alpha_1\varepsilon_{t-1}^2 + \alpha_2\varepsilon_{t-2}^2 + \dots + \alpha_q\varepsilon_{t-q}^2$$

Vì $\varepsilon_{t-1} = \sigma_{t-1}z_{t-1}$, mỗi số hạng thực chất là $\sigma_{t-1}^2 z_{t-1}^2$ — đó là chỗ thành phần autoregressive nằm.

**Rõ ràng hơn về việc model cái gì:** biến $\sigma_t^2$ ở đây là **realized volatility**, không phải implied. Xem [[Realized vs Implied Volatility]].

## 3. Vì sao nó bắt được fat tails

- Kỳ vọng có điều kiện và không điều kiện đều bằng 0.
- **Phương sai có điều kiện** cho filtration $\mathcal{F}_{t-1}$ **bằng $\sigma_t^2$** — không phải hằng số, mà phụ thuộc thời gian. Đây chính là phần "conditionally heteroscedastic".

Hệ quả sâu sắc: $\varepsilon_t = \sigma_t z_t$ là **hỗn hợp các Gaussian với phương sai khác nhau**. Hỗn hợp như vậy **leptokurtic** — đuôi dày hơn một Gaussian đơn lẻ.

Bạn kiểm chứng được bằng cách tính kurtosis giải tích: nó > 3 (điều kiện: mẫu số không bằng 0 và tham số không âm). Tức là ta **đảm bảo về mặt toán học** rằng model tính đến excess kurtosis quan sát trong dữ liệu.

## 4. GARCH(p,q) — Bollerslev 1986

$$\sigma_t^2 = \alpha_0 + \sum_{i=1}^{q}\alpha_i\varepsilon_{t-i}^2 + \sum_{j=1}^{p}\beta_j\sigma_{t-j}^2$$

Điểm mới: ngoài **squared residual trễ**, còn có **conditional variance trễ**.

**Vì sao tốt hơn?** Chứng minh được: một quá trình **ARCH(∞) tương đương GARCH(1,1)**. (Nhân phương trình thứ hai với $\beta$, trừ khỏi phương trình thứ nhất, sắp xếp lại.)

> Nếu ARCH(∞) bắt được các động lực volatility ta quan tâm, thì một biểu diễn **tiết kiệm hơn nhiều** là GARCH(1,1) cũng bắt được chúng.

Số hạng $\beta$ mang **long memory dependence** mà ARCH cần vô hạn bậc mới có. Đó là lý do GARCH(1,1) được dùng rộng rãi trong thực tế.

## 5. So sánh thực nghiệm (horse race trên equity đơn lẻ)

| Model | RMSE | R² out-of-sample |
|---|---|---|
| EWMA | ~42% | ~5,12% |
| ARCH(1) | ~25% | ~5% |
| GARCH(1,1) | tương đương ARCH(1) | **~8%** |

EWMA chỉ **đuổi theo giá trị trễ** bằng tổ hợp có trọng số — nó không mô hình hoá động lực nào cả. ARCH/GARCH **thực sự tính đến** clustering, kurtosis, heteroscedasticity.

⚠️ **R² thấp là bình thường** cho equity đơn lẻ với return ngày. Đừng hoảng. Literature ghi nhận: dùng **intraday returns** (ví dụ 5 phút) làm proxy tốt hơn cho quá trình vol latent, ARCH có thể giải thích **40–60%** biến thiên. Hợp lý — proxy tốt hơn cho biến latent thì model bắt được nhiều hơn.

## 6. Ứng dụng ấn tượng nhất: Value at Risk

Đây là nơi thấy rõ nhất tác động.

| Cách tính VaR | Giả định | Exceedance thực tế (ngưỡng 5%) |
|---|---|---|
| **Parametric** (Gaussian, vol hằng số) | Homoscedastic — vi phạm nặng | **~40%** |
| **GARCH** | Conditionally heteroscedastic | **~9,74%** |

Từ 40% xuống ~10% so với mục tiêu 5%. Vẫn chưa hoàn hảo, nhưng cải thiện **khổng lồ**. Model parametric mà giáo sư finance dạy bạn đang sai lệch tới mức nguy hiểm.

Ứng dụng khác: dự báo vol cho chiến lược quant (nén nhiều vol feature bằng PCA), định giá option, sizing.

## 7. Biến thể cần biết

| Model | Thêm gì |
|---|---|
| **GJR-GARCH** | Số hạng bất đối xứng → bắt **leverage effect** |
| **EGARCH** | Log-variance, cũng bất đối xứng, không cần ràng buộc dương |
| **FIGARCH** | Fractionally integrated → long memory |
| **GARCH-t / skewed-t** | Innovation đuôi dày thay vì Gaussian |
| **Multivariate GARCH (DCC, BEKK)** | Correlation biến thiên theo thời gian |

⚠️ GARCH chuẩn dùng **bình phương** residual → đối xứng → **không bắt được leverage effect**. Cần biến thể bất đối xứng. Xem [[Stylized Facts of Volatility]].

## 8. Cạm bẫy
- **Fit GARCH lên implied volatility.** Sai đối tượng.
- **Kỳ vọng R² cao.** Với equity đơn lẻ + return ngày, ~5–10% là bình thường.
- **Dùng GARCH chuẩn rồi mong bắt leverage effect.** Không được.
- **Bỏ qua ràng buộc tham số.** $\alpha_i, \beta_j \ge 0$ và $\sum(\alpha+\beta) < 1$ để variance dừng.
- **Overfit qua grid search.** Bạn có thể làm EWMA trông tốt hơn nếu cố. Giá trị của GARCH nằm ở việc nó **mô hình hoá đúng động lực**, không phải ở con số RMSE của một mẫu.
- **Chỉ nhìn RMSE / R².** Có metric chuyên biệt hơn (QLIKE) tranh luận trong literature.

## 9. Checklist áp dụng
- [ ] Tôi fit trên realized vol hay nhầm sang implied?
- [ ] Tôi dùng return ngày hay có proxy intraday tốt hơn?
- [ ] Tôi có cần bắt leverage effect không? Nếu có, đã chuyển sang GJR/EGARCH chưa?
- [ ] Tham số của tôi có thoả điều kiện dừng không?
- [ ] Backtest VaR: tỉ lệ exceedance thực tế bao nhiêu so với mức danh nghĩa?
- [ ] Innovation của tôi Gaussian hay đuôi dày? Residual chuẩn hoá còn kurtosis thừa không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `arch` (Python, Kevin Sheppard) | ARCH/GARCH/EGARCH/GJR, backtest VaR | https://arch.readthedocs.io |
| `rugarch` (R) | Bộ GARCH đầy đủ nhất | https://cran.r-project.org/package=rugarch |
| `statsmodels` | Time series nền, ARIMA | https://www.statsmodels.org |

## Tham khảo
- Engle, R. — *Autoregressive Conditional Heteroscedasticity with Estimates of the Variance of UK Inflation*, Econometrica (1982) — Nobel 2003
- Bollerslev, T. — *Generalized Autoregressive Conditional Heteroskedasticity*, J. Econometrics (1986)
- Glosten, Jagannathan & Runkle (1993) — GJR-GARCH
- Nelson, D. — *Conditional Heteroskedasticity in Asset Returns: A New Approach*, Econometrica (1991) — EGARCH
- Quant Guild — *Master Volatility with ARCH & GARCH Models*: https://youtu.be/iImtlBRcczA
- Tsay, R. — *Analysis of Financial Time Series*, Ch. 3

## Liên kết
[[Stylized Facts of Volatility]] · [[Realized vs Implied Volatility]] · [[Stationarity and Non-Stationarity]] · [[Kalman Filter]] · [[Performance Metrics]] · [[Quant]]
