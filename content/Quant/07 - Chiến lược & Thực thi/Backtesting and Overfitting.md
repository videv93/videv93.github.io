---
tags: [quant, strategy, backtest, core]
status: evergreen
---
# Backtesting and Overfitting

> Mục tiêu của backtest **không phải** tạo ra một equity curve đẹp. Mục tiêu là tìm một **model robust**. Nối các chấm để có đường cong đẹp chính là định nghĩa của việc overfit noise.

## 1. Ba lớp model

| Lớp | Trong mẫu | Ngoài mẫu | Nhận diện |
|---|---|---|---|
| **Underfit** | Xấu | Xấu | Dễ phát hiện — thống kê in-sample đã không hấp dẫn |
| **Robust** | **Có sai số hợp lý** | **Sai số hợp lý** | Đây là mục tiêu |
| **Overfit** | Rất đẹp | **Sai số khủng khiếp** | **Nguy hiểm nhất** — Sharpe 3 rất hấp dẫn |

> Bạn sẽ **không** có crystal ball dự đoán return. Đó không phải không gian ta làm việc. Bạn đang xây một model robust có khả năng đưa ra dự báo hợp lý ngoài mẫu để ra quyết định có thông tin — để có edge.

Model robust **sẽ có sai số**. Đó là điều đúng đắn.

Underfit ít nguy hiểm hơn vì bạn thấy ngay thống kê xấu và không dùng nó. Overfit với Sharpe 3 thì **chắc chắn hấp dẫn** — và đó là vấn đề.

## 2. Các bias phải kiểm tra

| Bias | Nội dung |
|---|---|
| **Data snooping** | Thử nhiều biến thể trên cùng dữ liệu tới khi ra kết quả đẹp |
| **Survivorship bias** | Universe chỉ chứa công ty còn sống hôm nay |
| **Look-ahead bias** | Dùng thông tin chưa tồn tại tại thời điểm quyết định (bao gồm cả smoothing! Xem [[Filtering Smoothing and Forecasting]]) |
| **Overfitting noise** | Khớp nhiễu ngẫu nhiên thay vì cấu trúc |
| **Selection bias** | Chỉ báo cáo backtest chạy được |
| **Chi phí bỏ sót** | Bỏ qua slippage, phí, market impact |

⚠️ Cảnh báo cụ thể: nếu bạn nhờ ChatGPT hoặc Claude chạy backtest hộ, rồi deploy live mà **không hiểu bias nào đang được đưa vào**, và không hiểu mục đích của backtest nói chung — bạn không có model, bạn có một biểu đồ.

Và: hãy cẩn thận với **các nền tảng tự động hoá quy trình cho bạn**. Chúng bán subscription để bạn có "tick data tốt hơn", "backtest pro hơn", "scheme tối ưu hoá". *Vì sao bạn lại đi tối ưu hoá backtest theo cách đó? Bạn đang overfit noise.*

## 3. Vì sao chiến lược thất bại khi live

Chỉ có **hai** khả năng:

**(1) Regime change / structural break.** Backtest hợp lệ, không overfit gì, nhưng phân phối sinh dữ liệu đã thay đổi căn bản. Hoàn toàn có thể xảy ra.

Đó là **câu hỏi nghiên cứu**, và bạn nên điều tra được:
- Nó gãy thường xuyên đến mức nào? Mỗi hai tháng? Một lần rồi hết?
- Do crowding out?
- Do một whale không còn tham gia thị trường?

Cấu trúc **có** gãy. Xem [[Stationarity and Non-Stationarity]].

**(2) Bạn đã overfit.** Nếu phải đặt cược, đây là đáp án.

Phân biệt hai khả năng này là một trong những kỹ năng khó nhất của nghề.

## 4. Backtest thực sự dùng để làm gì

**Không** phải để dự đoán tương lai.

> Backtest cho bạn **insight về cách danh mục của bạn đã phản ứng với các sự kiện khác nhau** — bull cycle, bear cycle, đi ngang, slow bleed, fast bleed. Rồi bạn định vị danh mục sao cho **bất cứ điều gì tới, bạn trải qua được, quản lý được, và tiếp tục tích luỹ tài sản.**

Có thể là ngồi qua drawdown khó chịu, hedge chúng, monetize chúng, hoặc chạy chiến lược độc lập với market risk.

**Bạn không cần backtest cho những điều hiển nhiên.** Nếu bạn backtest một danh mục gồm 2 cổ phiếu + một sports market-making algorithm, nó sẽ nói với bạn điều bạn đã biết: thuật toán đó chẳng liên quan gì tới US equity risk.

Tương tự: nếu CAPM regression cho thấy beta > 1, bạn **không cần** backtest để biết điều gì xảy ra khi thị trường sập. Xem [[Physical Decorrelation]].

## 5. Live performance đáng giá hơn nhiều

> Live strategy performance — giao dịch bằng vốn thật, ra quyết định có thông tin dưới bất định, đặc biệt trong thời gian dài — **đáng giá hàng nghìn backtest**.

Xem [[Performance Metrics]].

## 6. Cạm bẫy
- **Tối ưu hoá tham số cho tới khi equity curve đẹp.** Đây chính là overfitting.
- **Không giữ dữ liệu out-of-sample thật sự.** Nếu bạn đã nhìn nó, nó không còn out-of-sample.
- **Backtest trên universe hiện tại.** Survivorship bias.
- **Dùng chỉ báo tính từ toàn bộ chuỗi.** Look-ahead bias.
- **Bỏ qua transaction cost.** Chiến lược tần suất cao thường chết ở đây.
- **Kết luận từ một backtest duy nhất.** Nhiều lần thử = nhiều cơ hội tìm ra may mắn.
- **Không tính số lần thử.** Nếu bạn thử 1.000 biến thể, Sharpe cao nhất gần như chắc chắn là noise. Xem *Deflated Sharpe Ratio*.

## 7. Checklist áp dụng
- [ ] Tôi đã thử bao nhiêu biến thể trước khi ra kết quả này?
- [ ] Có dữ liệu out-of-sample nào tôi **chưa hề** nhìn không?
- [ ] Universe của tôi có bao gồm công ty đã delisted không?
- [ ] Có chỉ báo nào dùng thông tin tương lai không? (Kiểm tra kỹ smoothing)
- [ ] Tôi đã trừ phí, spread, slippage, market impact chưa?
- [ ] Sai số out-of-sample của tôi là bao nhiêu? Nó có **hợp lý** không, hay quá đẹp?
- [ ] Nếu chiến lược gãy live, tôi có kế hoạch chẩn đoán regime change vs overfit không?
- [ ] Tôi có đang backtest điều tôi vốn đã biết không?

## Tham khảo
- Quant Guild — *Stop Using the Sharpe Ratio Until You Watch This*: https://youtu.be/NJ5PNfIQHrE
- Quant Guild — *3 Backtesting Pitfalls That Ruin Your Trading Strategy*: https://youtu.be/sjq3toGtr0U
- Quant Guild — *Quant Explains Backtesting with Poker*: https://youtu.be/xJJ1nWj9Rto
- Quant Guild — *Profitable vs Tradable: Why Most Strategies Fail Live*: https://youtu.be/fzz22JNg9HE
- López de Prado, M. — *Advances in Financial Machine Learning* (Ch. 11–12, backtesting)
- Bailey, Borwein, López de Prado & Zhu — *Pseudo-Mathematics and Financial Charlatanism*, Notices of the AMS (2014)
- Harvey & Liu — *Backtesting*, Journal of Portfolio Management (2015)

## Liên kết
[[Performance Metrics]] · [[Stationarity and Non-Stationarity]] · [[Model Specification and Parameterization]] · [[Alpha Signals]] · [[Physical Decorrelation]] · [[Quant]]
