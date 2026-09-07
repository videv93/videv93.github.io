---
tags: [quant, data, alpha]
status: growing
---
# Alternative Data

> Chuỗi giá chỉ cho bạn biết chuyện đã xảy ra. Alternative data là nỗ lực lấy thông tin **trước khi nó hiện lên chuỗi** — và đó là một trong số ít nguồn edge còn thật.

## 1. Vì sao cần

Time series model, theo cấu trúc, **không thể** bắt được structural break. Nó chỉ mô hình hoá trend, seasonality, shock — và ngoại suy "nếu status quo tiếp diễn". Xem [[Filtering Smoothing and Forecasting]].

Nhưng thông tin gây ra break đó **tồn tại trước** khi giá phản ánh. Câu hỏi là: bạn có tiếp cận được không?

**Ví dụ minh hoạ trực tiếp nhất.** Chuỗi bench press dao động quanh 350 lbs suốt một năm, rồi 9/12/2024 rơi xuống 45 lbs — vì rách cơ ngực.
- Model time series không có thông tin đó **cho tới khi nó hiện lên chuỗi**.
- **Bác sĩ đã biết.** Người ngồi cùng phòng chờ đã biết.

Áp lên giá cổ phiếu: jump xảy ra. Có thông tin nào ta dùng được để có edge **trước khi** jump được realize không?

## 2. Ví dụ kinh điển: 2008 / The Big Short

Model time series thuần trên credit default swap sẽ dự báo giá trị tiếp tục tăng — "nếu status quo tiếp diễn". Rồi sự kiện vỡ nợ xảy ra và giá trị về đáy.

Nhưng nhiều người **đã dự đoán được**. Cách nào? **Không phải bằng time series model.** Họ:
- Đến tận nơi xem các căn nhà.
- Đào vào dữ liệu tỉ lệ vỡ nợ thế chấp thật.

Đó là alternative data: dùng thông tin **ngoài** chuỗi giá của chính công cụ đó để suy ra điều thị trường chưa bắt kịp.

## 3. Các loại alternative data

| Loại | Ví dụ |
|---|---|
| **Hình ảnh vệ tinh / drone** | Đếm xe trong bãi đỗ Walmart để ước lượng doanh thu |
| **Văn bản** | News, tweet, filing, transcript earnings call |
| **Audio / video** | Biểu cảm khuôn mặt CEO, tone giọng trong earnings call |
| **Giao dịch** | Dữ liệu thẻ tín dụng tổng hợp |
| **Web** | Job posting, app download, web traffic |
| **Vi mô ngành** | Tỉ lệ vỡ nợ thế chấp, dữ liệu vận tải, dữ liệu thời tiết |

Điểm chung: chúng **không phải insider information**. Chúng là thông tin công khai nhưng tốn công thu thập, làm sạch, và biến thành signal.

## 4. Quy trình biến thành alpha

1. Thu thập → làm sạch → tiền xử lý (thường là hàng trăm triệu dòng, lưu ở parquet).
2. Feature engineering.
3. Gán score cho từng ticker theo thời gian → thành **signal**.
4. Phân tích return theo **cross-section**: quantile plot của signal vs average return.
5. Xây danh mục long-short: long quantile cao nhất, short quantile thấp nhất.
6. Alpha regression để kiểm tra nó **không phải chỉ là beta**.

Chi tiết: [[Alpha Signals]].

## 5. Quan hệ nghịch: dễ ↔ hiệu quả

> Có **quan hệ nghịch** giữa việc phát triển một signal dễ đến mức nào và hiệu lực của signal đó.

Câu hỏi tự kiểm nghiêm khắc:
- Tôi có thực sự fetch, clean, pre-process, feature engineer và xây model trên một chuỗi thời gian **hàng trăm triệu dòng** từ alternative data không?
- Tôi có phân biệt được **bearing priced risk** (được đền bù trong cross-section) với **orthogonal return alpha** không?
- Tôi có hiểu khác biệt giữa tính chất tiệm cận trong lớp học và thế giới thực **không dừng, bất định** không?
- Tôi đang trade một rổ equity trong cross-section, hay một composite portfolio của nhiều chiến lược?

Nếu câu trả lời là **không** cho bất kỳ câu nào — bạn nên **học**, không nên spam backtest, và chắc chắn không nên trade.

## 6. Khi nào **không** cần alternative data

Không phải bài toán nào cũng cần. Xem [[Time Series Analysis]]:
- **Market making** — bạn giao dịch tần suất cao; sau một cú jump bạn chỉ cần điều chỉnh và tiếp tục từ mức mới. Time series là đủ.
- **Định giá tài sản illiquid** — dùng proxy thanh khoản + [[Kalman Filter]]. Đủ.

Quyết định phụ thuộc **bài toán**, không phải phụ thuộc alternative data có sang trọng hay không.

## 7. Cạm bẫy
- **Mua dataset rồi mong nó tự thành alpha.** Phần khó là biến dữ liệu thành signal có ý nghĩa kinh tế.
- **Không kiểm tra alpha vs beta.** Rất nhiều "signal" chỉ là market exposure trá hình.
- **Data snooping trên dataset alternative.** Càng nhiều chiều, càng dễ tìm ra mẫu giả. Xem [[Backtesting and Overfitting]].
- **Bỏ qua độ trễ và chi phí.** Dữ liệu vệ tinh có độ trễ; nếu trễ hơn thị trường thì vô dụng.
- **Nhầm với insider information.** Ranh giới pháp lý phải rõ ràng.
- **Bỏ qua survivorship bias trong chính dataset.**

## 8. Checklist áp dụng
- [ ] Nguồn dữ liệu này có đi **trước** chuỗi giá không? Bao lâu?
- [ ] Chi phí thu thập + xử lý có tương xứng với edge kỳ vọng không?
- [ ] Signal của tôi có quan hệ **đơn điệu** với return trong cross-section không?
- [ ] Sau khi hồi quy lên market factor, alpha còn lại có ý nghĩa thống kê không?
- [ ] Tôi có đang data-snoop trên không gian nhiều chiều không?
- [ ] Bài toán của tôi có thực sự **cần** alternative data, hay time series là đủ?

## Tham khảo
- Quant Guild — *Time Series Analysis for Quant Finance*: https://youtu.be/JwqjuUnR8OY
- Quant Guild — *I Bet You've Never Found Alpha (and I Can Prove It)*: https://youtu.be/UzTJHs3-eT0
- Quant Guild — *Natural Language Processing (NLP) for Quant Trading*: https://youtu.be/6llKh4kQBYs
- Quant Guild — *Do Emojis Predict Stock Returns?*: https://youtu.be/915-fyEM9l8
- Denev & Amen — *The Book of Alternative Data*
- Lewis, M. — *The Big Short* (và phim cùng tên)

## Liên kết
[[Time Series Analysis]] · [[Alpha Signals]] · [[Backtesting and Overfitting]] · [[Filtering Smoothing and Forecasting]] · [[CAPM Alpha and Beta]] · [[Quant]]
