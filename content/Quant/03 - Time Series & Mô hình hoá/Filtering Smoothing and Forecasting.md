---
tags: [quant, time-series, modeling]
status: evergreen
---
# Filtering, Smoothing and Forecasting

> Ba tác vụ khác nhau hoàn toàn, dùng ba tập thông tin khác nhau, trả lời ba câu hỏi khác nhau. Người vẽ moving average lên biểu đồ TradingView thường không biết mình đang làm cái nào.

## 1. Bảng phân biệt

| Tác vụ | Dùng thông tin | Trả lời | Ví dụ kỹ thuật |
|---|---|---|---|
| **Filtering** | Quá khứ + hiện tại | Trạng thái **hiện tại** là gì, sau khi bỏ nhiễu? | Moving average, [[Kalman Filter]] |
| **Smoothing** | Quá khứ + hiện tại + **tương lai** | Trạng thái **trong quá khứ** đã là gì? | Exponential smoothing, Kalman smoother |
| **Forecasting** | Quá khứ + hiện tại | Trạng thái **tương lai** kỳ vọng là gì? | ARMA, GARCH, Kalman prediction |

**Smoothing đòi hỏi kiến thức toàn cục về đường đi** — nó dùng giá trị ở phía sau để suy ngược về phía trước. Do đó nó **không dùng được live**. Nếu bạn roll nó về phía trước, nó biến thành filtering.

## 2. Điểm quan trọng nhất: filtering **không** dự đoán

Khi bạn ném moving average lên biểu đồ:
- Bạn đang **filtering** — dò trạng thái hiện tại đã khử nhiễu.
- Nó **không nói gì** về trạng thái tương lai.

Đây là một trong những nhầm lẫn tốn tiền nhất trong retail trading.

## 3. Không tồn tại "prediction"

> Không có crystal ball thì **không có cái gọi là dự đoán**. Chỉ có **kỳ vọng**.

Vì sao từ "prediction" gây hại: bạn lên YouTube/Medium, thấy code có `.fit()` và `.predict()`, và bỗng nhiên bạn "đang dự đoán giá cổ phiếu". Wrapper của thư viện dùng từ đó; bản chất toán học thì không.

**Ví dụ chuẩn — xúc xắc.** Best guess cho một lần tung là **3,5**. Xúc xắc không thể ra 3,5. Nhưng 3,5 là giá trị tối thiểu hoá mean squared error trên vô hạn lần tung. Đó theo nghĩa đen là điều tốt nhất bạn làm được.

**Ví dụ trực giác nhất — nhiệt độ.** Giữa tháng 12 ở New York, bạn dự đoán bao nhiêu độ F? Không ai nói 100. Bạn nói ~20. Hôm nay 20 độ, ngày mai bạn đoán bao nhiêu? Vẫn ~20.

Đó **chính xác** là time series analysis. Nó không biết gì mà bạn không biết hoặc không hiểu được bằng định tính. Nó mô hình hoá trend, seasonality, shock — và **không ngoại suy một cách thần kỳ**.

Machine learning không thay đổi điều này. ML về bản chất là **kỳ vọng có điều kiện phi tuyến**. Vẫn là kỳ vọng.

## 4. "Nếu status quo tiếp diễn"

Forecast là phát biểu có điều kiện: **nếu mọi thứ tiếp diễn như hiện tại**, đây là hành vi kỳ vọng.
- Status quo → forecast hợp lý.
- Không status quo → **sai một cách bạo lực**.

Ví dụ earnings: giá đi bình thường tới sự kiện, rồi nhảy lên mức mới. Forecast ngây thơ cho mức cũ. Không model time series nào bắt được cú nhảy — trừ khi bạn có insider information hoặc [[Alternative Data]].

## 5. Nhưng forecast sai vẫn kiếm được tiền

Điều kiện: **đúng trên trung bình**. Có một model tốt hơn không có model, khi bạn phải ra một chuỗi quyết định dưới bất định.

Ví dụ market making: mức mid biến thiên ngẫu nhiên theo thời gian, ta chỉ dùng moving average để dò. Vẫn quote spread quanh mức đó và **vẫn thu được P&L**. Xem [[Market Making]] và [[All Models Are Wrong]].

## 6. Cạm bẫy
- **Gọi filtering là prediction.** Sai lầm số một.
- **Dùng smoothing để backtest.** Đây là **look-ahead bias** trần trụi — smoothing dùng dữ liệu tương lai theo định nghĩa.
- **Tin vào từ `predict` trong API.** `model.predict()` trả về kỳ vọng có điều kiện.
- **Kỳ vọng forecast bắt được jump.** Nó không thể, theo cấu trúc.
- **Đánh giá forecast bằng một điểm dữ liệu.** Đánh giá bằng phân phối sai số trên nhiều điểm.

## 7. Checklist áp dụng
- [ ] Tôi đang làm filtering, smoothing hay forecasting? Gọi đúng tên chưa?
- [ ] Nếu là backtest — tôi có vô tình dùng smoothing (look-ahead) không?
- [ ] Forecast của tôi giả định status quo nào? Điều gì phá vỡ nó?
- [ ] Tôi cần forecast **đúng**, hay chỉ cần **đúng trên trung bình**?
- [ ] Tôi có đang dùng chữ "dự đoán" khi ý là "kỳ vọng" không?

## Tham khảo
- Quant Guild — *Time Series Analysis for Quant Finance*: https://youtu.be/JwqjuUnR8OY
- Quant Guild — *What Does AI Actually Learn* (kỳ vọng có điều kiện phi tuyến): https://youtu.be/tX7b2KT63WQ
- Quant Guild — *Information and Stock Price Prediction*: https://youtu.be/Ao9InJohtpY
- Anderson & Moore — *Optimal Filtering*
- Hyndman & Athanasopoulos — *Forecasting: Principles and Practice*: https://otexts.com/fpp3/

## Liên kết
[[Time Series Analysis]] · [[Kalman Filter]] · [[All Models Are Wrong]] · [[Market Making]] · [[Alternative Data]] · [[Quant]]
