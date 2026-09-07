---
tags: [quant, time-series, modeling, filtering]
status: evergreen
---
# Kalman Filter

> Kết hợp **model neo vào lý thuyết** với **dữ liệu quan sát nhiễu**, đệ quy theo thời gian. Cách thực dụng nhất để sống chung với non-stationarity — nhưng nó là **băng dán, không phải thuốc chữa**.

## 1. Ý tưởng

Ta muốn ước lượng trạng thái thật $x_t$ của một hệ, nhưng:
- Model của ta không hoàn hảo.
- Quan sát của ta có nhiễu đo.

Kalman filter dung hoà hai nguồn thông tin đó thông qua **Kalman gain**:

$$K = \frac{\text{bất định của model}}{\text{bất định của model} + \text{bất định của phép đo}}$$

| Tham số | Vai trò |
|---|---|
| $F$ | Hệ số phân rã — tốc độ mean reversion |
| $B$ | Mức trung bình dài hạn |
| $Q$ | Phương sai nhiễu quá trình (process noise) |
| $R$ | **Sai số đo** — cần gạt chính |

**Cần gạt $R$:**
- $R$ **lớn** → gain **nhỏ** → tin **model** hơn.
- $R$ **nhỏ** → gain **lớn** → tin **dữ liệu** hơn.

## 2. Ba bước triển khai (ví dụ: lọc VIX)

**Bước 1 — Offline calibration ("đặt định luật vật lý").**
Chọn model neo vào lý thuyết: volatility là mean-reverting → dùng [[Ornstein-Uhlenbeck Process]], rời rạc hoá thành **AR(1)**. Hồi quy để lấy $\phi$ và $b$, rồi suy ngược ra $\kappa$ (tốc độ hồi phục) và $\theta$ (mean dài hạn).

⚠️ Câu hỏi mở ở đây: dùng bao nhiêu dữ liệu? Xem [[Model Specification and Parameterization]].

**Bước 2 — Khởi tạo.**
$x_0$ = quote đầu tiên hoặc mean dài hạn. $P_0$ = độ tin cậy ban đầu (covariance), thường đặt cao. Vì đây là state-space model, sau **burn-in period** Kalman gain sẽ **hội tụ**.

**Bước 3 — Cập nhật đệ quy (live filter).** Mỗi tick:
1. **Model guess** — chiếu trạng thái tiến một bước, dự báo error covariance.
2. **Innovation** — chênh lệch giữa dữ liệu quan sát và dự báo của model. *"Thị trường vừa làm mô hình OU của tôi bất ngờ đến mức nào?"*
3. **Kalman gain** — tin cái nào hơn?
4. **Cập nhật state estimate** bằng gain.
5. **Cập nhật error covariance** — thấy thêm một điểm dữ liệu → bất định về spot giảm.

## 3. Trực giác: đánh đổi thích ứng

Đặt hai filter cạnh nhau khi có cú nhảy trong phân phối sinh dữ liệu:

| | $R$ lớn / gain nhỏ (tin model) | $R$ nhỏ / gain lớn (tin dữ liệu) |
|---|---|---|
| Khi thấy outlier | Giữ mức, không nhảy theo | Thích ứng rất nhanh |
| Nếu là outlier thật | **Đúng** — giữ được mức | Bị "whiplash", ra quyết định sai một lúc rồi quay lại |
| Nếu là regime mới | Chậm, tụt lại phía sau | **Đúng** — bắt kịp regime nhanh hơn |

**Không có bữa trưa miễn phí.** Bạn chọn phía nào cũng phải trả giá phía kia. Có thể chọn tham số **thống kê** (tối thiểu hoá một hàm mục tiêu) thay vì đặt tay.

## 4. Kết quả thực tế trên VIX

Coi quote VIX là phép đo nhiễu, model là OU rời rạc hoá AR(1):
- Filter bám dữ liệu, nhưng forecast của nó **cũng biết "định luật vật lý"**: có một mức cần hồi về.
- Khi VIX rơi thấp, forecast kéo lên. Khi VIX spike mạnh, filter bám cú spike **nhưng** forecast kéo xuống — vì model mean reversion.

Đây là điểm mạnh cốt lõi: forecast hiệu quả **kể cả khi gặp dữ liệu mới và cực đoan**.

## 5. Ứng dụng: định giá trái phiếu kém thanh khoản

Bài toán: định giá trái phiếu không giao dịch thường xuyên.
- **Model** — chiết khấu dòng tiền (coupon, cấu trúc) về hiện tại. Bản thân không ngẫu nhiên. Dùng Treasury làm proxy cộng **credit spread**.
- **Cái thay đổi** — chính là credit spread. Nếu illiquid, phải proxy.
- **Quan sát** — thi thoảng có một giao dịch của chính trái phiếu đó; **và** có các đợt phát hành tương tự đang giao dịch.

→ Kalman filter kết hợp model định giá với các quan sát đó để suy ra trạng thái (giá) hiện tại. Đây là mô hình sản xuất thật — lệnh `BVAL` của Bloomberg.

Ứng dụng tương tự: [[Time Series Analysis]] mục "khi nào time series là đủ".

## 6. Giới hạn quan trọng

> **Kalman filter chuẩn KHÔNG cập nhật tham số của model.**

Nó chỉ kết hợp *forecast của model* với *dữ liệu quan sát*. Model OU bạn calibrate ban đầu vẫn đứng yên. Nếu regime đổi và model không còn cho forecast tốt do **mis-parameterization**, Kalman filter chỉ là **băng dán, không phải thuốc chữa**.

**Và bạn đang chồng model lên model** — Kalman filter tự nó cũng có tham số, cũng có thể bị mis-parameterize.

## 7. Mở rộng

- **Dual filter** — coi tham số của model như *state* và cập nhật chúng cùng lúc với mức trạng thái. Đây là thứ bạn thực sự muốn.
- **Regime detection** — trending vs reverting, high vs low volatility.
- **Multi-model** — chạy nhiều model + parameterization song song.
- **Extended / Unscented Kalman Filter** — cho hệ phi tuyến.
- **Particle filter** — khi nhiễu không Gaussian.

## 8. Cạm bẫy
- **Nghĩ Kalman filter tự sửa model sai.** Không. Xem mục 6.
- **Quên đếm tham số.** Model gốc + filter = hai tầng tham số.
- **Đặt $R$ theo cảm tính rồi để yên.** Nên ước lượng thống kê.
- **Không chờ burn-in.** Ước lượng đầu chuỗi không tin được.
- **Dùng Kalman filter cho quá trình không neo được vào lý thuyết nào.** Bạn chỉ đang smooth dữ liệu một cách đắt đỏ.

## 9. Checklist áp dụng
- [ ] Model "định luật vật lý" của tôi là gì? Neo vào literature nào?
- [ ] Tôi calibrate nó trên cửa sổ nào? Vì sao?
- [ ] $R$ của tôi đến từ đâu — đặt tay hay tối ưu?
- [ ] Tôi muốn thích ứng nhanh hay giữ mức? Đánh đổi đó có phù hợp bài toán không?
- [ ] Tôi đã bỏ giai đoạn burn-in ra khỏi đánh giá chưa?
- [ ] Tôi có cần dual filter (cập nhật cả tham số) không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `pykalman` | Kalman filter/smoother + EM cho tham số | https://pykalman.github.io |
| `filterpy` | KF, EKF, UKF, particle filter | https://filterpy.readthedocs.io |
| `statsmodels` state space | MLEModel, tích hợp tốt với time series | https://www.statsmodels.org |
| Bloomberg `BVAL` | Ví dụ sản xuất của mô hình này | — |

## Tham khảo
- Quant Guild — *Kalman Filters for Quant Finance*: https://youtu.be/zVJY_oaVh-0 · notebook: Quant-Guild-Library 2026/92
- Quant Guild — *Trading Mean Reversion with Kalman Filters*: https://youtu.be/BuPil7nXvMU
- Kalman, R.E. — *A New Approach to Linear Filtering and Prediction Problems* (1960)
- Harvey, A. — *Forecasting, Structural Time Series Models and the Kalman Filter*
- Durbin & Koopman — *Time Series Analysis by State Space Methods*

## Liên kết
[[Ornstein-Uhlenbeck Process]] · [[Model Specification and Parameterization]] · [[Filtering Smoothing and Forecasting]] · [[Stationarity and Non-Stationarity]] · [[Expectation and Convergence]] · [[Quant]]
