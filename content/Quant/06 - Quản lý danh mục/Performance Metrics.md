---
tags: [quant, portfolio, metrics, core]
status: evergreen
---
# Performance Metrics

> Sharpe ratio **không phải** thước đo return trên mỗi đơn vị rủi ro theo cách bạn nghĩ. Nó là một **phép nén mất mát thông tin (lossy compression)** của thông tin đường đi — và có thể hoàn toàn vô dụng tuỳ vào đường đi đó được tạo ra thế nào.

## 1. Thống kê là tính chất của **một đường đi**

Khi bạn tính mean return và variance của một chiến lược, bạn đang quan sát **tính chất của một realization duy nhất**, **không phải** của phân phối sinh dữ liệu nằm dưới.

Đằng sau đường bạn đã đi là vô số đường bạn **có thể** đã đi, từ cùng một phân phối.

> Sai lầm đầu tiên: giả định expected return và variance quan sát được trên đường đã đi là thứ quyết định mỗi lần rút mẫu. Nó không phải.

## 2. Lossy compression

Các thống kê này có duy nhất không? **Chắc chắn không.**

Có **vô số** đường đi cho ra cùng một bộ thống kê. Mô phỏng: một loạt path trong cả kịch bản low variance và high variance khớp **hoàn hảo** các số 30% / 15% và 30% / 50%.

> Cho tôi expected return và variance, bạn **không thể** nói đường nào tạo ra chúng. Có vô số. Vì thế các metric này chỉ hữu ích **đúng bằng** mức hữu ích của đường đi tạo ra chúng.

Sharpe ratio nén thêm một tầng nữa: từ (return, vol) → một số. Bạn cũng không khôi phục được return và vol gốc.

## 3. Các metric và ý nghĩa

| Metric | Công thức | Đo gì |
|---|---|---|
| **Sharpe** | $(R_p - R_f)/\sigma_p$ | Return vượt risk-free trên mỗi đơn vị **tổng** volatility |
| **Sortino** | $(R_p - R_f)/\sigma_{\text{downside}}$ | Chỉ phạt **downside** deviation |
| **Information Ratio** | $(R_p - R_b)/\sigma_{\text{tracking}}$ | Return vượt **benchmark** trên mỗi đơn vị active risk |
| **Max Drawdown** | — | Khoản lỗ chưa thực hiện tệ nhất dọc equity curve |
| **CAGR** | — | Nếu đường đi mượt thì gộp ở tốc độ nào |

## 4. Sharpe thất bại ở đâu — hai lỗ hổng

### a) Hình học đường đi: phạt cả upside

Sharpe đối xử với **upside deviation giống hệt downside deviation**.

**Ví dụ đối chứng:**
| | Chiến lược A | Chiến lược B |
|---|---|---|
| Sharpe | **1,5** | **1,8** |
| Expected return | **17,21%** | 8,65% |

Nếu cả hai ổn định nhìn tới, bạn chọn cái nào? Chọn Sharpe cao hơn — vì sao? Nó có expected return **thấp hơn gần một nửa**.

Sharpe của A thấp hơn vì nó bị phạt cho các **cú sốc dương**. → Dùng **Sortino**: chỉ tính deviation âm so với trend. Khi đó A có điểm cao hơn.

### b) Tính ổn định nhìn tới

Đây là lỗ hổng nghiêm trọng hơn. Nếu tiếp tục giao dịch chiến lược đó, bạn có quan sát được các thống kê tương tự không?

Kịch bản điển hình: backtest chạy tốt → có Sharpe mục tiêu → deploy live → hiệu suất suy giảm.

Hai nguyên nhân, và **chỉ hai**:
1. **Path chất lượng, backtest hợp lệ, và gặp regime change / structural break.** Hoàn toàn có thể. Đó là câu hỏi nghiên cứu — crowding? một whale rút khỏi thị trường?
2. **Bạn đã overfit backtest.** Data snooping, survivorship bias, look-ahead bias, khớp noise. Xem [[Backtesting and Overfitting]].

> Nếu tôi phải đặt cược, tôi cược vào (2).

## 5. Điều đó có nghĩa gì trong thực tế

Với một Sharpe = 3 từ backtest overfit, metric đó **vô dụng**. Nó nén một đường đi vô nghĩa.

Câu hỏi phải hỏi **ngược dòng**: đường đi này được tạo ra thế nào?
- Từ backtest overfit → không có giá trị nhìn tới.
- Từ một composite khổng lồ 500 triệu dòng parquet với alternative data để thông tin cho quyết định giao dịch → **có thể** có giá trị.

## 6. Ví dụ thực tế về việc metric bị lạm dụng

Một quant trader công bố P&L year-to-date: bắt đầu 100k → 120k → tụt về 80k → 130k → **bị liquidate về 70k** → hồi lên ~130k. Sharpe ~0,88, Sortino ~0,97.

Nếu chỉ show đoạn từ 70k lên 140k: **Sharpe 6,28, Sortino 14,8.**

Cùng một tài khoản. Cửa sổ khác nhau. Đó là mức độ dễ bị bóp méo của các con số này.

Và: **các performance metric bản thân là biến ngẫu nhiên.** Trung bình của chúng qua thời gian **không hội tụ về giá trị cố định**, vì không gian là time-variant.

## 7. Sharpe cao ≠ Information Ratio cao

Một danh mục có thể có **Sharpe cao** (hiệu suất risk-adjusted tuyệt đối) nhưng **Information Ratio khiêm tốn** — đặc biệt khi bản thân benchmark cũng chạy tốt. Nghĩa là phần lớn return đến từ market exposure chứ không phải kỹ năng chủ động. Xem [[CAPM Alpha and Beta]].

## 8. Cách nghĩ đúng

> Live strategy performance — giao dịch bằng vốn thật, ra quyết định có thông tin dưới bất định, đặc biệt trong thời gian dài — **đáng giá hàng nghìn backtest**.

Ẩn dụ batting average: một người có batting average tốt vài năm trước — có nghĩa hôm nay họ vụt bóng giỏi không? *Có thể.* Tuần trước có batting average khủng — hôm nay giỏi không? *Có thể.*

Tất cả quy về performance, model-informed decision making, kiến thức và kinh nghiệm. Không phải về performance metric tuỳ tiện.

**Và:** nếu bạn vẫn ra quyết định đầu tư bằng **một con số duy nhất**, bạn không phải quant, cũng không phải trader — bạn là con bạc thích biện minh bằng toán tồi.

## 9. Cạm bẫy
- **So sánh Sharpe giữa các chiến lược có skewness khác nhau.** Bán vol có Sharpe đẹp giả tạo. Xem [[Volatility Risk Premium]].
- **Chọn cửa sổ có lợi.** Xem mục 6.
- **Không hỏi đường đi được tạo ra thế nào.**
- **Dùng Sharpe cho danh mục cá nhân trade nhiều kiểu khác nhau.** Nó chỉ hợp lý cho backtest của một chiến lược cố định.
- **Quên max drawdown và khả năng tiếp cận vốn.** Đánh bại S&P 500 mà drawdown 80% thì tệ.
- **Quên rằng tất cả đều nhìn lui.**

## 10. Checklist áp dụng
- [ ] Đường đi tạo ra metric này được tạo ra thế nào? Backtest hay live?
- [ ] Nếu là backtest — tôi đã kiểm tra data snooping, survivorship, look-ahead chưa?
- [ ] Sharpe của tôi có đang bị phạt vì upside không? Sortino nói gì?
- [ ] Max drawdown là bao nhiêu? Tôi sống qua được không?
- [ ] Information Ratio nói gì so với Sharpe? Có phải tôi chỉ đang ăn beta?
- [ ] Nếu đổi cửa sổ tính, con số đổi bao nhiêu?
- [ ] Tôi có đang ra quyết định bằng **một** con số không?

## Tham khảo
- Quant Guild — *Stop Using the Sharpe Ratio Until You Watch This*: https://youtu.be/NJ5PNfIQHrE
- Quant Guild — *Why Trading Metrics are Misleading (Unless This is True)*: https://youtu.be/xziwmju7x2s
- Quant Guild — *Profitable vs Tradable: Why Most Strategies Fail Live*: https://youtu.be/fzz22JNg9HE
- Sharpe, W. — *The Sharpe Ratio*, Journal of Portfolio Management (1994)
- Sortino & Price — *Performance Measurement in a Downside Risk Framework* (1994)
- Bailey & López de Prado — *The Deflated Sharpe Ratio*, JPM (2014)
- Lo, A. — *The Statistics of Sharpe Ratios*, Financial Analysts Journal (2002)

## Liên kết
[[Backtesting and Overfitting]] · [[CAPM Alpha and Beta]] · [[Volatility Drag]] · [[Stationarity and Non-Stationarity]] · [[Efficient Frontier]] · [[Quant]]
