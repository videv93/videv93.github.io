---
tags: [quant, portfolio, alpha, core]
status: evergreen
---
# CAPM, Alpha and Beta

> **Market beta là gió đang thổi.** Bạn không quyết định hướng gió. Và phần lớn cái người ta gọi là alpha thật ra chỉ là beta được đóng gói lại.

## 1. Beta là gì

Hồi quy return danh mục lên return thị trường:
$$R_p - R_f = \alpha + \beta(R_m - R_f) + \varepsilon$$

| Beta | Nghĩa |
|---|---|
| **1,0** | Dịch chuyển 1:1 với thị trường (index fund thụ động) |
| **> 1,0** | Biến động hơn thị trường — khuếch đại cả lãi lẫn lỗ |
| **< 1,0** | Ít biến động hơn, thường coi là phòng thủ |
| **< 0** | Nghịch chiều thị trường (một số chiến lược hedge) |

**CAPM:**
$$\mathbb{E}[R_p] = R_f + \beta(\mathbb{E}[R_m] - R_f)$$

CAPM giả định nhà đầu tư **chỉ** được đền bù cho việc gánh systematic risk. Mọi return vượt quá mức CAPM dự đoán là **alpha**.

## 2. Beta là gió thổi

Bạn trải qua giai đoạn lạm phát, giảm phát, mở rộng, thu hẹp. **Bạn không chọn được.** Không ai chọn được. Không ai biết sắp có crash hay khủng hoảng không.

Nhìn factor thị trường theo thời gian: vùng xanh cho return dương, vùng đỏ cho return âm — và nó **trông y hệt đường giá S&P 500**, vì nó chính là market exposure.

> Về beta, bạn là **hành khách**, không phải tài xế.

Tất cả chúng ta chỉ đang **định vị để sống sót dài hạn**.

## 3. ⚠️ Câu chuyện cảnh báo

Một asset manager quản vài trăm triệu đô. Phân tích danh mục của khách hàng: sau khi loại vài lựa chọn discretionary của chính khách, phần do "chuyên môn" của manager xây dựng **chỉ đơn giản là đang giao dịch market portfolio**.

Trong cuộc họp, câu hỏi: *"Anh đã làm gì cho khách hàng của tôi ngoài việc giao dịch raw beta exposure?"*

Câu trả lời: **"Beta là gì?"**

Bắt tay và swing golf thì có thể ổn. Về mặt toán học thì đó là cách làm mất vốn của khách hàng.

## 4. Chiến lược "của bạn" nhiều khả năng chỉ là beta

**Ví dụ 1 — chiến lược moving average.** Equity curve đi lên và sang phải, Sharpe ~1, max drawdown hợp lý, số lệnh hợp lý qua nhiều năm. Trông ổn.

Chạy hồi quy: **beta = 1,14**. Hiệu suất của chiến lược phụ thuộc thống kê vào hiệu suất thị trường trong đúng giai đoạn đó.

> Beta giải thích **toàn bộ** return của bạn. Không kỹ năng, không chiến lược, không edge — chỉ tích luỹ transaction cost.

**Ví dụ 2 — "nhưng tín hiệu cho tôi lợi thế timing".** Kéo dài cùng chiến lược đó qua một đợt sụt giảm lớn của S&P 500: chiến lược **−20%**, và **beta còn tăng lên** — nó phơi nhiễm với thị trường **nhiều hơn** đúng lúc tệ nhất.

**Ví dụ 3 — "vậy dùng regime switching".** Dùng Markov chain phân ba regime (low/mid/high vol), chỉ giao dịch trong low vol, còn lại giữ cash. Chạy hồi quy: **không những không có alpha, mà còn không có ý nghĩa thống kê.**

Kết luận: **regime modeling cũng nhiều khả năng chỉ là beta.**

## 5. Beta và volatility drag

Beta > 1 có hậu quả gộp nghiêm trọng. Thị trường lên thì danh mục lên mạnh; thị trường xuống thì danh mục xuống mạnh. Và drawdown 10% cần **hơn** 10% để hồi.

Đó là hệ quả trực tiếp của geometric compounding, và là lý do bạn không thể đuổi theo return phù du bằng cái giá volatility. Xem [[Volatility Drag]].

## 6. Đo beta thế nào

1. Cần proxy cho market portfolio: giữ nhiều cổ phiếu US, hoặc dùng S&P 500 (hai đường gần như trùng nhau).
2. Hồi quy return danh mục lên return thị trường.
3. Slope = beta. Đối chứng: hồi quy thị trường lên chính nó cho slope ≈ 1.

## 7. Sự thật về alpha và retail trading

> Có **quan hệ nghịch** giữa việc phát triển một signal dễ đến mức nào và hiệu lực của nó.

Bốn câu hỏi tự kiểm nghiêm khắc:
1. Tôi có thực sự fetch, clean, pre-process, feature engineer và xây model trên chuỗi thời gian **hàng trăm triệu dòng** lưu ở parquet, từ alternative data, để thông tin cho việc xây danh mục không?
2. Tôi có hiểu khác biệt giữa **bearing priced risk** (được đền bù trong cross-section) và **orthogonal return alpha** không?
3. Tôi có hiểu khác biệt giữa tính chất tiệm cận trong lớp học và thế giới thực **không dừng, bất định** không?
4. Tôi đang trade một rổ equity trong cross-section, hay một composite portfolio của nhiều chiến lược?

Nếu câu trả lời là **không** cho bất kỳ câu nào — nhiều khả năng là vậy — bạn nên **học**, không nên spam backtest, và chắc chắn không nên trade.

⚠️ Lưu ý: "alpha" mang nghĩa khác nhau tuỳ bối cảnh. Có thể là return orthogonal với thị trường. Có thể là một bất hiệu quả thống kê bạn đang khai thác. Có thể bị crowded out, có thể không cấp được nhiều vốn.

## 8. Giới hạn của CAPM

CAPM **không** giải thích 100% biến thiên. Ta có các model khác: Fama-French 3 factor, Carhart 4 factor (thêm momentum), Fama-French 5 factor. Và có **joint hypothesis problem** — không thể test market efficiency mà không đồng thời test asset pricing model.

Ta **không bao giờ** giải thích được 100% biến thiên của giá tài sản trong cross-section.

## 9. Checklist áp dụng
- [ ] Beta của danh mục tôi là bao nhiêu? Tôi đã thực sự chạy hồi quy chưa?
- [ ] Sau khi trừ beta, alpha còn lại là bao nhiêu? Nó có **ý nghĩa thống kê** không?
- [ ] Beta của tôi có tăng lên trong các đợt sụt giảm không? (Dấu hiệu rất xấu)
- [ ] Tôi trả lời được cả 4 câu hỏi ở mục 7 chưa?
- [ ] Nếu tôi chỉ mua-và-giữ SPY, kết quả có khác gì chiến lược của tôi không?
- [ ] Tôi đang được đền bù cho rủi ro nào? Rủi ro nào tôi gánh miễn phí?

## Tham khảo
- Quant Guild — *I Bet You've Never Found Alpha (and I Can Prove It)*: https://youtu.be/UzTJHs3-eT0
- Quant Guild — *Quant Explains Alpha in 3 Minutes*: https://youtu.be/Ivz58kZLD2U
- Sharpe, W. — *Capital Asset Prices: A Theory of Market Equilibrium under Conditions of Risk*, Journal of Finance (1964)
- Fama & French — *The Cross-Section of Expected Stock Returns*, Journal of Finance (1992)
- Carhart, M. (1997) — momentum factor
- Fama, E. — *Efficient Capital Markets*, Journal of Finance (1970) — joint hypothesis problem
- Grinold & Kahn — *Active Portfolio Management*

## Liên kết
[[Alpha Signals]] · [[Types of Portfolio Risk]] · [[Volatility Drag]] · [[Performance Metrics]] · [[Backtesting and Overfitting]] · [[Efficient Market Hypothesis]] · [[Quant]]
