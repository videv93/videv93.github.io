---
tags: [quant, portfolio, risk]
status: evergreen
---
# Types of Portfolio Risk

> Ba tầng rủi ro. Hai tầng đầu đa dạng hoá được, tầng thứ ba thì không — và cách gọi tên tầng thứ ba là một **misnomer** gây hại.

## 1. Ba loại

| Loại | Nguồn | Ví dụ | Đa dạng hoá được? |
|---|---|---|---|
| **Idiosyncratic** (riêng công ty) | Sự kiện đặc thù của một doanh nghiệp | Quản trị kém, thu hồi sản phẩm, kiện tụng, vi phạm quy định | ✅ Có |
| **Industry** (ngành) | Chia sẻ giữa các công ty cùng ngành | Thiếu hụt chip bán dẫn, bùng nổ cloud | ✅ Có (phần lớn) |
| **Systematic / Market** | Vĩ mô, ảnh hưởng toàn thị trường | Lạm phát, lãi suất, sự kiện địa chính trị | ❌ Không |

**Quan trọng:** không phải danh mục nào — hay cổ phiếu nào — cũng mang ba loại này theo tỉ lệ như nhau.
- Danh mục tech tập trung: **ít** idiosyncratic risk (các mã đi cùng nhau) nhưng **rất nhiều** industry risk.
- Một startup biotech đơn lẻ: bị chi phối bởi idiosyncratic risk.

## 2. Quan sát qua sample path

Bốn đường trong một năm minh hoạ:
- **Market index** — phản ánh systematic risk ảnh hưởng mọi tài sản.
- **Tech A & B** — tăng mạnh hơn do industry outperformance.
- **Tech C** — kém hiệu suất riêng lẻ, tách khỏi cả ngành lẫn thị trường → idiosyncratic.

Bài học: danh mục **không** phơi nhiễm đồng đều với mọi nguồn rủi ro. Hiểu bạn đang gánh loại nào — và nó **có được đền bù không** — là trung tâm của quản lý danh mục.

## 3. Vì sao systematic risk không đa dạng hoá được (và được trả tiền)

Nếu nhà đầu tư có thể đa dạng hoá **hết** rủi ro, lợi nhuận kỳ vọng sẽ hội tụ về **risk-free rate**. Điều đó không xảy ra — và **không nên** xảy ra.

**Equity risk premium** tồn tại chính vì thị trường đền bù nhà đầu tư cho việc gánh systematic risk không thể đa dạng hoá.

(Về mặt lý thuyết, nếu đa dạng hoá hết rủi ro thì bạn nhận risk-free rate — và chính đại lượng đó là nền để định giá các công cụ phức tạp hơn. Xem [[Feynman-Kac and Risk-Neutral Pricing]].)

## 4. ⚠️ "Undiversifiable" là một misnomer nguy hiểm

Đây là điểm mà academia bỏ lỡ, và nó gây hại thật:

> Sinh viên tài chính ra trường nói "market risk không đa dạng hoá được" như một chân lý. **Đúng — nhưng.**

Market risk là **principal direction of risk** của **một thị trường cụ thể** (ví dụ US equities). Điều đó **không** có nghĩa bạn không thể đa dạng hoá nó bằng cách:
- Thêm **strategy layer** (sleeve) không phụ thuộc market risk đó.
- Thêm sản phẩm tương quan âm.
- Thêm tài sản thuộc **thị trường khác hoàn toàn**.

Bạn không bị kẹt. Xem [[Physical Decorrelation]].

## 5. Cạm bẫy
- **Nghĩ "nhiều mã hơn = đa dạng hơn".** 50 mã tech không đa dạng hơn nhiều so với 5 mã tech. Xem [[Diversification]].
- **Không biết mình đang gánh loại rủi ro nào.** Đây là lỗi phổ biến nhất của nhà đầu tư retail — mua SPY/VOO mà không hiểu principal direction of risk mình đang phơi nhiễm.
- **Chấp nhận "undiversifiable" như số phận.**
- **Giả định rủi ro được gánh sẽ được đền bù.** Idiosyncratic risk **không** được đền bù — bạn gánh nó miễn phí nếu không đa dạng hoá.

## 6. Checklist áp dụng
- [ ] Danh mục của tôi phơi nhiễm với những nguồn rủi ro nào, theo tỉ lệ nào?
- [ ] Rủi ro nào trong đó **được đền bù**? Rủi ro nào tôi đang gánh miễn phí?
- [ ] Principal direction of risk của tôi là gì? (US equities? Tech? Crypto?)
- [ ] Tôi có sleeve nào nằm ngoài direction đó không?
- [ ] Nếu direction đó sập 40%, danh mục tôi ra sao?

## Tham khảo
- Quant Guild — *Equity Portfolio Management*: https://quantguild.com/lesson_page?subject=finance&level=1&topic=Equity+Portfolio+Management
- Quant Guild — *The Ultimate Guide to Quant Portfolio Management*: https://youtu.be/LX4Ugaxx9n0
- Quant Guild — free research note về market risk và principal directions of risk: https://quantguild.com
- Sharpe, W. — *Capital Asset Prices*, Journal of Finance (1964)
- Ang, A. — *Asset Management*

## Liên kết
[[Diversification]] · [[CAPM Alpha and Beta]] · [[Physical Decorrelation]] · [[Risk and Return]] · [[Quant]]
