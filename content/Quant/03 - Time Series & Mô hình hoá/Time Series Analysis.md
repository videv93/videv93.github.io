---
tags: [quant, time-series, modeling]
status: evergreen
---
# Time Series Analysis

> Một chuỗi thời gian là tập quan sát theo thời gian. Nhưng phía dưới mỗi điểm trên biểu đồ là **một thứ gì đó đang thực sự vận hành** — và quên điều đó là sai lầm phổ biến nhất của người phân tích chuỗi.

## 1. Cấu trúc cơ bản

| Loại | Đặc điểm | Ví dụ |
|---|---|---|
| **Regular** | Khoảng thời gian đều | Giá đóng cửa cổ phiếu hằng ngày |
| **Irregular** | Khoảng không đều, thiếu dữ liệu | Sản phẩm kém thanh khoản chỉ giao dịch thi thoảng |

Điều ít ai để ý: biểu đồ chuỗi thời gian là **nội suy tuyến tính từng đoạn**. Ta nối các điểm và **bỏ qua toàn bộ những gì xảy ra ở giữa**. Với close-to-close cũng vậy — giữa hai điểm ta không biết gì cả.

**Đừng mất dấu cái nằm dưới.** Nếu đây là giá cổ phiếu, có một doanh nghiệp đang vận hành. Giá là *hệ quả* của hoạt động đó. Có thông tin xảy ra **ngoài** chuỗi giá và có thể dùng để dự báo nó → xem [[Alternative Data]].

## 2. Phân rã: trend / seasonality / shock

- **Trend** — hướng dịch chuyển dài hạn.
- **Seasonality** — mẫu lặp theo chu kỳ cố định.
- **Shock / residual** — dao động ngẫu nhiên, sự kiện bất ngờ.

⚠️ Không thành phần nào **buộc phải** hiện diện, và quan trọng hơn: **không có gì đảm bảo chúng ổn định.**

Khi ta nói "chuỗi này có trend tăng", điều ta thật sự nói là: *nó có xu hướng thể hiện trend này; nếu status quo tiếp diễn thì kỳ vọng hành vi tương tự.*

Ví dụ: một doanh nghiệp công nghệ có trend doanh thu đẹp → đối thủ ra sản phẩm AI giết chết sản phẩm đó → trend biến mất, thậm chí đảo chiều. Với giá cổ phiếu trên khung ngắn, điều này xảy ra **liên tục**.

Cũng lưu ý: shock component **được định nghĩa theo một cách rất cụ thể** trong model (thường là nhiễu Gaussian). Nó **không** bao trùm mọi sự kiện bất ngờ — regime shift lớn không nằm trong đó.

## 3. Ba tác vụ

Filtering, smoothing, forecasting — ba việc hoàn toàn khác nhau, thường xuyên bị gộp làm một. Xem note riêng: [[Filtering Smoothing and Forecasting]].

## 4. Khi nào chỉ time series là đủ

**Đủ:**

*Market making.* Bạn cần một mức mid "đủ tốt" để quote spread quanh nó. Không cần đúng — chỉ cần **đúng trên trung bình**. Ví dụ: xúc xắc bị làm cho trọng số thay đổi ngẫu nhiên theo thời gian; dùng moving average để dò mức, quote spread quanh đó → vẫn tích luỹ P&L. Xem [[Market Making]].

*Định giá tài sản kém thanh khoản.* Sản phẩm chỉ giao dịch thưa thớt, nhưng có các proxy thanh khoản. Dùng [[Kalman Filter]] để suy mức giá của sản phẩm illiquid từ cách các sản phẩm khác đang giao dịch. Đây là ứng dụng sản xuất thật (ví dụ mô hình định giá trái phiếu tại Bloomberg — lệnh `BVAL`).

**Không đủ:**

*Earnings event.* Giá nhảy tạo mức mới. Forecast time series ngây thơ sẽ cho mức cũ — sai một cách bạo lực. Cách hợp lý hơn: mô hình hoá **hai trạng thái thế giới** bằng thị trường option (straddle) — nhưng nó **không** cho biết hướng.

*Cấu trúc gãy (structural break).* Chuỗi bench press của một người dao động quanh 350 lbs suốt một năm, rồi đột ngột rơi xuống 45 lbs vào 9/12/2024 — vì rách cơ ngực. Phân phối sinh dữ liệu đã đổi hoàn toàn. Model không có thông tin đó **cho tới khi nó hiện lên chuỗi**. Nhưng bác sĩ đã biết. Người ngồi cùng phòng chờ đã biết. → **Có cách lấy thông tin trước khi nó hiện lên chuỗi.**

*2008 / The Big Short.* Model time series thuần trên credit default swap sẽ dự báo giá trị tiếp tục tăng. Người kiếm được tiền từ cú đó không dùng time series — họ dùng **alternative data**: đến tận nơi xem nhà, đào vào tỉ lệ vỡ nợ thế chấp thật.

## 5. Cạm bẫy
- **Nhầm forecast với prediction.** Xem [[Filtering Smoothing and Forecasting]].
- **Giả định stationarity vì giáo trình bảo thế.** Xem [[Stationarity and Non-Stationarity]].
- **Ném moving average lên biểu đồ rồi gọi đó là chiến lược.** MA là **filtering** — nó nói gì về trạng thái *hiện tại*, không nói gì về tương lai.
- **Nghĩ shock component đã bao gồm mọi bất ngờ.** Không.
- **Áp phân rã trend/seasonality lên giá intraday.** Sẽ không có ổn định nào; thông tin vô dụng cho giao dịch.
- **Quên chuỗi nội suy.** Bạn không biết gì giữa hai điểm.

## 6. Checklist áp dụng
- [ ] Chuỗi của tôi regular hay irregular? Tôi xử lý missing data thế nào?
- [ ] Trend/seasonality tôi tìm được có **ổn định** qua nhiều cửa sổ không?
- [ ] Tôi đang làm filtering, smoothing hay forecasting? Tôi có gọi đúng tên không?
- [ ] Bài toán của tôi có thuộc loại "time series là đủ" (market making, illiquid pricing) không?
- [ ] Có nguồn alternative data nào đi trước chuỗi này không?
- [ ] Điều gì tạo ra các điểm dữ liệu này? Cái gì có thể phá vỡ nó?

## Tham khảo
- Quant Guild — *Time Series Analysis for Quant Finance*: https://youtu.be/JwqjuUnR8OY
- Tsay, R. — *Analysis of Financial Time Series*
- Hamilton, J. — *Time Series Analysis*
- Hyndman & Athanasopoulos — *Forecasting: Principles and Practice* (free): https://otexts.com/fpp3/
- Avellaneda & Stoikov — *High-frequency trading in a limit order book* (mô hình market making kinh điển)

## Liên kết
[[Filtering Smoothing and Forecasting]] · [[Stationarity and Non-Stationarity]] · [[Alternative Data]] · [[Kalman Filter]] · [[Market Making]] · [[Quant]]
