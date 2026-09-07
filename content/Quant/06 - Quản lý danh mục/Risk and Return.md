---
tags: [quant, portfolio]
status: evergreen
---
# Risk and Return

> Nguyên lý nền của tài chính nói: lợi nhuận kỳ vọng cao hơn đòi hỏi rủi ro cao hơn. Điều đó **không** có nghĩa là chiều ngược lại đúng — **rủi ro cao hơn không đảm bảo lợi nhuận cao hơn.**

## 1. Bốn viên thuốc đắng phải nuốt trước

1. **Không có bữa trưa miễn phí.** Muốn vượt risk-free rate (Treasury Mỹ) thì phải chấp nhận bất định.
2. **Không có silver bullet.** Không tồn tại một chiến lược/kỹ thuật quản danh mục tối ưu cho mọi người — giống như không có một giáo án tập gym tối ưu cho mọi người. Muốn khoẻ nhất thì không chạy bán marathon hai lần một tuần.
3. **Mục tiêu quyết định thiết kế.** Nếu bạn cần tiếp cận vốn, bạn không được overexpose với market beta — vì khủng hoảng đến là phải bán ở 60 xu/đô.
4. **Tài sản lớn được xây rất chậm.** Bạn trả cho convexity bằng **thời gian**. Muốn vé số thì đi casino.

## 2. Cái gì đưa vào danh mục

|                                     | Ví dụ                                                                                                                                                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Securities** (giao dịch trên sàn) | Cổ phiếu, trái phiếu, ETF, quỹ tương hỗ, option, futures, REIT                                                                                                    |
| **Non-securities**                  | Bất động sản, hàng hoá **vật lý** (vàng thật, không phải gold ETF), nghệ thuật, đồ sưu tầm, doanh nghiệp tư nhân, crypto, tiền mặt & tiết kiệm, sản phẩm bảo hiểm |

Tất cả đều là **risky asset** — giá trị thay đổi theo thời gian.

## 3. Đo bằng gì

- **Return** → mean / expected return.
- **Risk** → standard deviation (độ lệch kỳ vọng so với cái được kỳ vọng), tức volatility.

## 4. Vấn đề nền tảng: cả hai đều nhìn lui

Bạn tính được mean và standard deviation của danh mục — nhưng **những con số đó nói về quá khứ đã xảy ra**.

Và cả khi ước lượng **đúng**, bạn vẫn gặp **ngẫu nhiên nền tảng**: bạn sẽ đi **một** sample path ngẫu nhiên trong vô số path khả dĩ. Đường "kỳ vọng" là ensemble average — **không path riêng lẻ nào đi theo nó**.

Hai vấn đề chồng lên nhau:
1. Ước lượng lịch sử không chính xác cho tương lai (thay đổi theo thời gian).
2. Kể cả ước lượng đúng, bạn không chọn được path.

> Không công nghệ nào từng tồn tại sẽ cho phép dự báo hoàn hảo path bạn sẽ đi.

**May thay, ta không cần dự đoán.** Mục tiêu là **positioning and survival** — sống đến được dài hạn để compounding phát huy. Xem [[Efficient Market Hypothesis]] mục counterfactual.

## 5. Rủi ro cao hơn ≠ lợi nhuận cao hơn

**Ví dụ đối chứng.** AI startup: bùng nổ, rồi đối thủ ra sản phẩm áp đảo, rồi về penny stock. Volatility đo được **cực cao**. Microsoft: volatility thấp hơn nhiều.

Kết quả: bạn gánh **nhiều rủi ro hơn hẳn** mà **không** đạt return cao hơn — thực tế là thấp hơn.

Mạnh hơn nữa: **rủi ro đo được ngang nhau cũng không hàm ý expected return ngang nhau.** Hai khoản đầu tư cùng standard deviation có thể có profile return hoàn toàn khác.

> Không phải rủi ro nào cũng được tạo ra như nhau.

## 6. Toán học đằng sau: volatility drag

Vì sao nên tối ưu **risk-adjusted return** thay vì return tuyệt đối? Vì cách tài sản gộp theo thời gian phạt biến động. Có phương trình cụ thể cho việc này. Xem [[Volatility Drag]].

Kết quả: đuổi theo return cao với vol cao dẫn tới **geometric return bằng 0 hoặc âm** sau 10 năm, trong khi đầu tư đúng cách cho đường cong lồi đẹp.

## 7. Cạm bẫy
- **"Rủi ro cao để giàu nhanh."** Toán nói ngược lại trong dài hạn.
- **So sánh khoản đầu tư bằng return tuyệt đối.**
- **Coi standard deviation lịch sử là rủi ro tương lai.**
- **Bỏ qua mục tiêu cá nhân.** "Tối đa hoá tài sản" mà bỏ qua thanh khoản, horizon, khả năng chịu drawdown là không có mục tiêu.
- **Nhầm ensemble average với path của mình.**

## 8. Checklist áp dụng
- [ ] Mục tiêu thật của tôi là gì? (Không phải "kiếm nhiều tiền" — cụ thể hơn)
- [ ] Tôi cần tiền khi nào? Nếu lúc đó thị trường −30%, tôi ổn không?
- [ ] Tôi đo hiệu suất bằng return tuyệt đối hay risk-adjusted?
- [ ] Rủi ro tôi đang gánh có được **đền bù** không?
- [ ] Tôi có nhầm ensemble average với path của chính mình không?

## Tham khảo
- Quant Guild — *The Ultimate Guide to Quant Portfolio Management*: https://youtu.be/LX4Ugaxx9n0
- Quant Guild — *Equity Portfolio Management* lesson: https://quantguild.com/lesson_page?subject=finance&level=1&topic=Equity+Portfolio+Management
- Markowitz, H. — *Portfolio Selection*, Journal of Finance (1952)
- Ang, A. — *Asset Management: A Systematic Approach to Factor Investing*

## Liên kết
[[Volatility Drag]] · [[Types of Portfolio Risk]] · [[Diversification]] · [[Performance Metrics]] · [[Efficient Frontier]] · [[Quant]]
