---
tags: [quant, strategy, alpha]
status: evergreen
---
# Alpha Signals

> Một signal định lượng trông như thế nào, đo bằng gì, và vì sao gần như tất cả những gì bạn tưởng là alpha thật ra chỉ là beta.

## 1. Signal tốt trông như thế nào

Biểu đồ chuẩn để đánh giá: **quantile plot** — chia signal thành các bucket (thường 5 hoặc 10), tính average forward return của mỗi bucket.

Cái bạn muốn thấy: **quan hệ đơn điệu (monotonic)**.
- Bucket signal thấp nhất → average return **âm**.
- Bucket signal cao nhất → average return **dương**.
- Các bucket ở giữa nằm đúng thứ tự.

→ Xây danh mục **long-short**: net long rổ trên, net short rổ dưới. Đây là **cross-sectional return strategy** — bạn dự đoán return **trong cross-section**, không phải dự đoán giá.

Kết quả **không** phải equity curve hoàn hảo đi lên và sang phải. Nó lởm chởm. Nhưng nếu quan hệ đơn điệu bền vững, bạn tích luỹ P&L.

## 2. Ví dụ pipeline: sentiment signal

1. Nguồn: biểu cảm khuôn mặt CEO, tweet, bài báo, transcript earnings call.
2. Dùng ML/NLP trích xuất sentiment score.
3. Gán mỗi score cho một **equity ticker**.
4. Lặp theo thời gian → chuỗi thời gian của score → **signal**.
5. Quantile plot → kiểm tra tính đơn điệu.
6. Xây long-short portfolio.
7. **Alpha regression** để kiểm tra nó không chỉ là beta.

Xem [[Alternative Data]].

## 3. Nơi tìm bất hiệu quả

- Option implied volatility (xem [[Volatility Risk Premium]])
- Earnings event
- Cross-sectional social sentiment
- Bán vol bị định giá quá cao — cách rất nhiều hedge fund kiếm tiền
- Mean reversion về một vol surface đã calibrate
- Momentum, value, quality (xem [[Diversification]] mục factor)

Có **bất hiệu quả hệ thống** trong thị trường và chúng khai thác được ở quy mô định lượng, đặc biệt với đủ dữ liệu. Khi bạn vào không gian big data — news, text, thậm chí video, audio — bạn trích xuất được nhiều signal.

## 4. ⚠️ Kiểm tra bắt buộc: alpha hay beta?

Đây là bước mà gần như mọi người bỏ qua.

$$R_p - R_f = \alpha + \beta(R_m - R_f) + \varepsilon$$

Chạy hồi quy. Nếu $\alpha$ **không có ý nghĩa thống kê**, bạn không có alpha.

Ba ví dụ phản chứng (chi tiết ở [[CAPM Alpha and Beta]]):
1. Chiến lược moving average, Sharpe ~1, equity curve đẹp → **beta = 1,14**. Beta giải thích toàn bộ return.
2. "Nhưng tôi có timing advantage" → kéo dài qua đợt sụt giảm lớn: chiến lược **−20%** và **beta tăng lên**.
3. "Vậy dùng regime switching, chỉ trade low-vol regime" → alpha **bằng 0 và không có ý nghĩa thống kê**.

## 5. Quan hệ nghịch: dễ ↔ hiệu quả

> Có **quan hệ nghịch** giữa việc phát triển một signal dễ đến mức nào và hiệu lực của signal đó.

Bốn câu hỏi tự kiểm:
1. Tôi có thực sự fetch, clean, pre-process, feature engineer và xây model trên một chuỗi thời gian **hàng trăm triệu dòng** lưu đau đớn ở parquet, dùng alternative data, để thông tin cho việc xây danh mục không?
2. Tôi có hiểu khác biệt giữa **bearing priced risk** (được đền bù trong cross-section) và **orthogonal return alpha** không?
3. Tôi có hiểu khác biệt giữa asymptotics trong lớp học và thế giới thực **không dừng, bất định** không?
4. Tôi đang trade một **rổ equity trong cross-section**, hay một **composite portfolio của nhiều chiến lược**?

Nếu **không** cho bất kỳ câu nào — bạn nên học, không nên spam backtest, và chắc chắn không nên trade.

## 6. Alpha decay và scalability

**Alpha decay** — signal suy giảm theo thời gian, do:
- **Crowding out** — nhiều người khai thác cùng bất hiệu quả.
- **Regime change** — bất hiệu quả không còn tồn tại.
- **Scaling** — càng cấp nhiều vốn, edge càng giảm.

Ở tầm institution, crowding **là** vấn đề thật — nên mới có non-compete và garden leave.

Ở tầm retail, người nói "không ai chia sẻ chiến lược có lãi" gần như chắc chắn **không có đủ vốn** để crowd-out bất kỳ alpha nào. Xem [[Trading Myths Busted]].

Hệ quả vận hành: bạn phải **khai tử alpha chết** và đôi khi **hồi sinh** chúng khi chúng ổn định trở lại. Đây là công việc toàn thời gian. Xem [[Optimal Policy Function]].

## 7. Đa chiến lược thay vì một chiến lược

> Mỗi firm không chạy một chiến lược với một expected value.

Đôi khi CIO buộc mọi người net long hoặc net short, và mỗi team tự tìm cách. Đôi khi mỗi team hành động độc lập, và **tính không đồng nhất đó cho đảm bảo rủi ro tốt hơn**.

Điểm chính: nếu mỗi team vận hành chiến lược riêng, mỗi team cố đạt EV dương — thì **chắc chắn tốt hơn** đặt hết trứng vào một giỏ, nơi bạn có thể phá sản trước khi tích luỹ được tài sản.

Đây là ứng dụng trực tiếp của [[Gambler's Ruin]] và [[Ergodicity]] ở tầm tổ chức.

## 8. Cạm bẫy
- **Không chạy alpha regression.** Lỗi số một.
- **Nhầm arbitrage với statistical edge.** Bạn không nói về risk-free profit. Và ở arbitrage thật, Sharpe hàng chục là con số vô nghĩa — bạn thường chỉ "được cầm hoá đơn", không execute được.
- **Bỏ qua transaction cost trong long-short.** Turnover cao ăn hết alpha.
- **Overfit quantile plot.** Nếu bạn thử 50 cách chia bucket, một cách sẽ trông đơn điệu.
- **Giả định signal ổn định.** Không có gì đảm bảo chiến lược chạy 5 năm sẽ chạy năm nay.
- **Không phân biệt "may/xui" với "có/không có edge".** Xem [[Gambler's Ruin]].

## 9. Checklist áp dụng
- [ ] Quantile plot của tôi có đơn điệu không? Trên bao nhiêu bucket?
- [ ] Alpha sau hồi quy là bao nhiêu? p-value?
- [ ] Beta của chiến lược tôi là bao nhiêu? Nó thay đổi thế nào qua các regime?
- [ ] Turnover của tôi là bao nhiêu? Sau phí còn lại gì?
- [ ] Signal này còn hiệu lực ở quy mô vốn nào?
- [ ] Tôi có tiêu chí khai tử signal không?
- [ ] Tôi trả lời được cả 4 câu ở mục 5 chưa?

## Tham khảo
- Quant Guild — *I Bet You've Never Found Alpha (and I Can Prove It)*: https://youtu.be/UzTJHs3-eT0
- Quant Guild — *How to Trade with an Edge*: https://youtu.be/NlqpDB2BhxE
- Quant Guild — *Quant Trader on Retail vs. Institutional Trading*: https://youtu.be/j1XAcdEHzbU
- Quant Guild — *Analyzing Stock Returns with Principal Component Analysis in Python*: https://youtu.be/CyCy1LGtk4Q
- Grinold & Kahn — *Active Portfolio Management*
- López de Prado, M. — *Advances in Financial Machine Learning*
- Tulchinsky, I. — *Finding Alphas: A Quantitative Approach to Building Trading Strategies* (WorldQuant)

## Liên kết
[[CAPM Alpha and Beta]] · [[Alternative Data]] · [[Backtesting and Overfitting]] · [[Retail vs Institutional Trading]] · [[Optimal Policy Function]] · [[Quant]]
