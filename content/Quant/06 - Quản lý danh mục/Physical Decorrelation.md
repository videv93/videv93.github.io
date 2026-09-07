---
tags: [quant, portfolio, risk, hedging]
status: evergreen
---
# Physical Decorrelation

> Cách "đa dạng hoá cái không đa dạng hoá được": tìm tài sản thuộc **thị trường khác hoàn toàn**, nơi principal direction of risk của bạn không tồn tại.

## 1. Vấn đề nó giải

[[Diversification]] cho thấy: tương quan **vọt lên gần 1 trong khủng hoảng**. Healthcare và Semiconductor có tương quan ~0 trong thời bình, nhưng khi macro headwind ập tới, chúng cùng rơi.

Lý do: cả hai đều thuộc **cùng một thị trường** — US equities. Cùng principal direction of risk.

## 2. Physical decorrelation là gì

Ẩn dụ: khi tôi tung một xúc xắc, rồi tung xúc xắc thứ hai — **chúng chẳng liên quan gì tới nhau.** Đó là decorrelation *vật lý*, không phải decorrelation *thống kê ước lượng từ dữ liệu lịch sử*.

**Ví dụ.** Bạn có danh mục US equities **và** một danh mục đồng hồ sưu tầm.
- Khủng hoảng ập tới, US equities lao dốc.
- Giá đồng hồ **không quan tâm chút nào.**

Đó là **rủi ro trực giao (orthogonal)** — thị trường trực giao, vuông góc, không tương quan. Nó chẳng liên quan gì tới US equities.

Ứng viên khác: nghệ thuật, bất động sản, hàng hoá vật lý, doanh nghiệp tư nhân, và các **chiến lược** không phụ thuộc market direction (ví dụ một market-making algorithm cho thị trường thể thao).

## 3. ⚠️ Cảnh báo bắt buộc

> Điều này **không** có nghĩa bạn cứ giữ càng nhiều tài sản không tương quan càng tốt.

Nhắc lại từ [[Risk and Return]]: **profile rủi ro khác nhau không hàm ý profile return giống nhau.**

Nếu tôi xây một danh mục các tài sản trực giao với nhau tạo ra tương quan ròng bằng 0, và người khác cũng làm vậy một cách ngẫu nhiên — **không có nghĩa hai chúng ta có cùng expected return.**

Decorrelation là điều kiện **cần**, không phải điều kiện **đủ**.

## 4. Bạn không cần backtest để biết điều gì sẽ xảy ra

Nếu tôi nhìn CAPM regression của một danh mục và thấy beta > 1 rõ ràng:

> Tôi **không cần** backtest để nói cho bạn biết chuyện gì xảy ra khi thị trường sập.

Câu hỏi duy nhất đáng hỏi là: **danh mục có leg hoặc sleeve nào để physically decorrelate khỏi cú sập đó không?**
- **Không** → bạn sẽ sập cùng thị trường.
- **Có** → bạn có thể không chỉ outperform, mà outperform **đáng kể** trong dài hạn, với drawdown tốt hơn và CAGR cao hơn.

## 5. Portfolio sleeves

Khi thiết kế danh mục, bạn đưa vào các **sleeve** khác nhau: equity sleeve, bond sleeve, art, real estate, watches, strategy sleeve. Không có cách one-size-fits-all — **khẩu vị rủi ro của bạn quyết định cái gì nằm trong danh mục**.

## 6. Hedged vs unhedged — kết quả có thể ngược trực giác

Mô phỏng hai danh mục qua 10 năm:

| | Unhedged | Hedged |
|---|---|---|
| Cách làm | Chấp nhận nhiều rủi ro hơn để cố đạt return cao hơn | Chi một phần upside để mua bảo vệ downside |
| Drawdown | ~30% | Nông hơn nhiều |
| Kết quả 10 năm | **Kém hơn** | **Tốt hơn** |

Vì sao? Đuổi theo return cao tạo drawdown sâu đến mức **underperform danh mục có hedge**. Và nếu bạn **monetize vốn phòng thủ đó trong drawdown** (mua vào lúc giá rẻ), bạn tạo ra CAGR cao hơn nữa.

Cơ chế nền: [[Volatility Drag]].

Đây là một trong những nhận thức sâu sắc nhất khi bạn hiểu **không có silver bullet strategy**. Tất cả là positioning và survival. **Trạng thái thế giới nào bạn có thể ở trong đó mà vẫn ngủ ngon?**

## 7. Cách nghĩ đúng về backtest ở đây

Backtest **không** dùng để dự đoán. Nó dùng để biết danh mục bạn **đã phản ứng thế nào** với các sự kiện khác nhau: bull cycle, bear cycle, sideways, slow bleed, fast bleed.

Ví dụ: backtest một danh mục gồm 2 cổ phiếu + một sports market-making algorithm. Nó nói cho bạn điều bạn **đã biết** — thuật toán đó chẳng liên quan gì tới US equity risk. Bạn không cần backtest cho điều đó.

Cái backtest cho bạn là **insight về phản ứng qua các regime**, để bạn định vị cho những gì sắp tới. Xem [[Backtesting and Overfitting]].

## 8. Cạm bẫy
- **Nhầm tương quan thấp lịch sử với decorrelation vật lý.** Cái đầu vỡ trong khủng hoảng; cái sau thì không.
- **Gom tài sản không tương quan mà không nghĩ về expected return.**
- **Bỏ qua thanh khoản của tài sản trực giao.** Đồng hồ, nghệ thuật, bất động sản khó bán nhanh — đúng lúc bạn cần tiền.
- **Bỏ qua chi phí hedge.** Bảo vệ downside có giá; nếu không bao giờ dùng đến thì đó là chi phí ròng.
- **Nghĩ hedge = từ bỏ lợi nhuận.** Xem mục 6.

## 9. Checklist áp dụng
- [ ] Principal direction of risk của tôi là gì?
- [ ] Tôi có sleeve nào **thuộc thị trường khác** không?
- [ ] Các sleeve đó có expected return dương không, hay chỉ là decorrelation không?
- [ ] Chúng có thanh khoản khi tôi cần không?
- [ ] Nếu thị trường chính của tôi −40%, tôi có leg nào monetize được không?
- [ ] Tôi ngủ ngon ở trạng thái thế giới nào? Danh mục hiện tại có đưa tôi tới đó không?

## Tham khảo
- Quant Guild — *The Ultimate Guide to Quant Portfolio Management*: https://youtu.be/LX4Ugaxx9n0
- Quant Guild — free research note về principal directions of risk: https://quantguild.com
- Quant Guild — *How a Quant Manages a Portfolio*: https://youtu.be/JjbBAyu0DmI
- Asness, Frazzini & Pedersen — *Leverage Aversion and Risk Parity*, FAJ (2012)
- Spitznagel, M. — *Safe Haven: Investing for Financial Storms* (tail hedging và CAGR)
- Dalio, R. — *Principles for Navigating Big Debt Crises* (all-weather logic)

## Liên kết
[[Diversification]] · [[Types of Portfolio Risk]] · [[Volatility Drag]] · [[CAPM Alpha and Beta]] · [[Backtesting and Overfitting]] · [[Quant]]
