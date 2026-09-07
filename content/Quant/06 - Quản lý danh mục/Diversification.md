---
tags: [quant, portfolio, risk]
status: evergreen
---
# Diversification

> Nó hoạt động vì tài sản không tương quan hoàn hảo. Nó dừng lại ở systematic risk. Và nó **thất bại đúng lúc bạn cần nó nhất**.

## 1. Cơ chế toán học

Phương sai danh mục:
$$\operatorname{Var}(P) = \sum_i w_i^2\sigma_i^2 + \sum_{i \ne j} w_i w_j \operatorname{Cov}(i,j)$$

- Số hạng đầu: rủi ro riêng của từng tài sản.
- Số hạng sau: **quan hệ giữa mọi cặp tài sản**.

**Covariance** đo hai tài sản dịch chuyển cùng nhau thế nào. **Correlation** là phiên bản chuẩn hoá, từ −1 đến +1.

Diversification hoạt động vì khi một tài sản zig còn tài sản kia zag, volatility của chúng **triệt tiêu một phần**.

## 2. Nó dừng ở đâu

Vẽ tổng rủi ro theo số lượng tài sản: giảm mạnh lúc đầu, rồi **đường cong phẳng ra**. Chỉ còn lại systematic risk — mức volatility tối thiểu bạn phải gánh để phơi nhiễm với equity.

**Con số thực dụng:** một danh mục được coi là đa dạng hoá hợp lý ở khoảng **30 cổ phiếu** trải trên nhiều ngành và nhiều mức vốn hoá.

## 3. **Cách** bạn đa dạng hoá quan trọng hơn **số lượng**

> 50 cổ phiếu tech có thể không đa dạng hơn 5 cổ phiếu tech bao nhiêu, do tương quan nội ngành cao.

Minh hoạ tầng bậc:
1. **Một cổ phiếu** → toàn bộ danh mục theo một mã.
2. **Danh mục tech** → idiosyncratic risk từng công ty được đa dạng hoá đi. Một mã −40% mà danh mục vẫn +10%. Nhưng nếu **tech** kém hiệu suất thì cả danh mục kém.
3. **Danh mục thị trường rộng** (S&P 500, VOO) → industry risk cũng được đa dạng hoá đi.
4. **Còn lại: market risk.** Xem [[Types of Portfolio Risk]].

Diversification đúng nghĩa cần trải theo **ngành, địa lý, và style**.

## 4. Các cách gán trọng số

| Cách                                  | Đặc điểm                                                       |
| ------------------------------------- | -------------------------------------------------------------- |
| **Market-cap weighted**               | Công ty lớn có trọng số lớn (S&P 500)                          |
| **Equal-weighted**                    | Mọi tài sản trọng số như nhau — tăng phơi nhiễm với mã nhỏ     |
| **Risk-parity / volatility-weighted** | Trọng số theo nghịch đảo volatility → cân bằng đóng góp rủi ro |
| **Factor-based**                      | Hướng tới các risk premia mục tiêu                             |

## 5. Factor — nguồn return hệ thống

| Factor | Định nghĩa |
|---|---|
| **Value** | Giá thấp so với cơ bản (P/E, P/B thấp) |
| **Momentum** | Hiệu suất gần đây mạnh, giả định xu hướng kéo dài ngắn-trung hạn |
| **Quality** | ROE cao, nợ thấp, lợi nhuận ổn định — bền hơn trong suy thoái |
| **Size** | Small-cap, lịch sử cho return cao hơn (kèm rủi ro cao hơn) |
| **Low volatility** | Biến động thấp, dùng cho chiến lược phòng thủ |

Có thể pha trộn thành **multi-factor portfolio**. Factor có tính hệ thống và lặp lại được, nhưng **không đảm bảo outperform mọi năm** — hiệu lực thay đổi theo regime và chu kỳ.

Đối lập với factor là **alpha** — return vượt quá phần giải thích được bởi các rủi ro/benchmark đã biết. Xem [[CAPM Alpha and Beta]] và [[Alpha Signals]].

## 6. ⚠️ Diversification thất bại trong khủng hoảng

Đây là điều quan trọng nhất trong note này.

**Ví dụ cụ thể.** Healthcare Services và Semiconductor Equipment: tương quan gần **0**. Rolling 40-day correlation là đường phẳng quanh 0. Hợp lý — hai ngành chẳng liên quan gì nhau.

**Rồi macro headwind ập tới.** Tương quan **vọt lên gần 1**. Chúng dịch chuyển cùng nhau.

> Cái bạn tưởng là danh mục đã đa dạng hoá — bạn chỉ đa dạng hoá **loại rủi ro cụ thể đó**. Bạn vẫn phơi nhiễm hoàn toàn với broader market risk, và CAPM regression sẽ nói cho bạn biết điều đó.

Hệ quả: đúng lúc bạn cần diversification nhất, **lợi ích của nó biến mất**.

Giải pháp: [[Physical Decorrelation]] — tìm tài sản thuộc **thị trường khác hoàn toàn**.

## 7. Cạm bẫy
- **Đếm số mã thay vì đo tương quan.**
- **Dùng tương quan lịch sử thời bình để lập kế hoạch cho khủng hoảng.**
- **Nghĩ nhiều tài sản không tương quan = return cao hơn.** Rủi ro khác nhau **không** hàm ý return giống nhau. Xem [[Risk and Return]].
- **Bỏ qua estimation risk trong ma trận covariance.** Nó không ổn định. Xem [[Efficient Frontier]].
- **Đa dạng hoá tới mức chỉ còn beta thuần** rồi tưởng mình đang quản lý chủ động. Xem [[CAPM Alpha and Beta]].

## 8. Checklist áp dụng
- [ ] Danh mục tôi có bao nhiêu vị thế? Trải trên bao nhiêu ngành?
- [ ] Ma trận tương quan của tôi trông thế nào? Có cụm nào không?
- [ ] Tương quan đó thay đổi ra sao trong các đợt sụt giảm lịch sử?
- [ ] Tôi dùng cách gán trọng số nào? Vì sao?
- [ ] Tôi có phơi nhiễm factor có chủ đích không, hay tình cờ?
- [ ] Tôi có sleeve nào thuộc thị trường khác hoàn toàn không?

## Tham khảo
- Quant Guild — *Equity Portfolio Management*: https://quantguild.com/lesson_page?subject=finance&level=1&topic=Equity+Portfolio+Management
- Quant Guild — *The Ultimate Guide to Quant Portfolio Management*: https://youtu.be/LX4Ugaxx9n0
- Markowitz, H. — *Portfolio Selection* (1952)
- Fama & French — *Common risk factors in the returns on stocks and bonds*, JFE (1993)
- Carhart, M. — *On Persistence in Mutual Fund Performance*, Journal of Finance (1997) — momentum factor
- Asness, Moskowitz & Pedersen — *Value and Momentum Everywhere*, Journal of Finance (2013)

## Liên kết
[[Types of Portfolio Risk]] · [[Physical Decorrelation]] · [[Efficient Frontier]] · [[CAPM Alpha and Beta]] · [[Risk and Return]] · [[Quant]]
