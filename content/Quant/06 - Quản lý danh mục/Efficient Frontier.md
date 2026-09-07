---
tags: [quant, portfolio, optimization]
status: evergreen
---
# Efficient Frontier

> Công cụ khái niệm mạnh mẽ, và là cái bẫy thực hành. Trọng số "tối ưu" nhạy cảm đến mức nó thực chất là một dạng **overfitting**.

## 1. Định nghĩa

**Efficient Frontier** là đường cong biểu diễn tập các danh mục cho:
- **Lợi nhuận kỳ vọng lớn nhất** với một mức rủi ro cho trước, hoặc tương đương
- **Rủi ro nhỏ nhất** với một mức lợi nhuận cho trước.

| | Đặc điểm |
|---|---|
| **Efficient portfolio** | Nằm **trên** đường cong, tối ưu hoá đánh đổi risk-return |
| **Inefficient portfolio** | Nằm **dưới** đường cong — bị chi phối bởi lựa chọn tốt hơn |

## 2. Capital Market Line và tangency portfolio

Thêm một **tài sản phi rủi ro** (T-bill) → dựng được các tổ hợp nằm trên **Capital Market Line (CML)**, đường thẳng tiếp tuyến với efficient frontier.

Các danh mục trên CML **vượt trội** so với chỉ đường cong, vì cho return trên mỗi đơn vị rủi ro tốt hơn — thông qua leverage hoặc phân bổ vào tài sản phi rủi ro.

**Tangency portfolio** = điểm CML chạm frontier. Nó có **Sharpe ratio cao nhất** (slope của CML tại đó), và là nền tảng lý thuyết của nhiều chiến lược đầu tư thụ động.

## 3. ⚠️ Estimation risk — vì sao nó vỡ trong thực tế

Dựng efficient frontier từ dữ liệu lịch sử đưa vào **estimation risk**:

> Thay đổi nhỏ trong giả định đầu vào (expected return, covariance) dẫn tới danh mục **khác biệt kịch tính**.

Đây là một dạng **overfitting** — tối ưu hoá cho quá khứ thay vì tương lai.

**Nguyên nhân gốc:** đầu vào chính là những đại lượng không tồn tại theo nghĩa hội tụ. Expected return là một quá trình ngẫu nhiên. Xem [[Expectation and Convergence]] và [[Stationarity and Non-Stationarity]].

**Ví dụ cụ thể.** Một quant trader chạy min-variance optimization trên ba "chiến lược" của mình (discretionary trading, algorithmic trading, mua thị trường). Kết quả: 15% / 75% / 10%.

> Những trọng số đó **sai**. Chúng được ước lượng từ dữ liệu. Chúng không hội tụ về giá trị cố định nào. Optimizer đang cho tôi trọng số, nhưng nó **không** nói cho tôi cách phân bổ vốn tối ưu.

Và sâu hơn: **đây không phải bài toán tối ưu toàn cục.** Không gian biến thiên theo thời gian. EV của mỗi chiến lược thay đổi ở các thời điểm khác nhau. Volatility tăng rồi giảm. Bất định xuất hiện rồi tan. Bạn không quyết định được điều kiện thị trường hiện tại, hay chiến lược nào phù hợp lúc này.

## 4. Các khung tốt hơn

| Phương pháp                  | Ý tưởng                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Black-Litterman**          | Kết hợp prior (thường là market-cap weights) với quan điểm nhà đầu tư → output ổn định và trực giác hơn |
| **Stochastic optimization**  | Lấy mẫu từ **phân phối** của đầu vào thay vì dùng point estimate → danh mục robust dưới bất định        |
| **Bayesian shrinkage**       | Kéo ước lượng thô (đặc biệt là mean) về prior bảo thủ → giảm nhiễu và phản ứng thái quá                 |
| **Risk parity**              | Bỏ hẳn expected return khỏi bài toán — chỉ cân bằng đóng góp rủi ro                                     |
| **Hierarchical Risk Parity** | Dùng cấu trúc cụm thay vì nghịch đảo ma trận covariance (López de Prado)                                |

Điểm chung của các cách này: **giảm phụ thuộc vào ước lượng mean**, vốn là đại lượng khó ước lượng nhất.

## 5. Ràng buộc thực tế

Ở môi trường institution, tối ưu hoá bị ràng buộc bởi transaction cost, giới hạn turnover, yêu cầu pháp lý. Trong các trường hợp đó, **model đơn giản hoá hoặc pha trộn thường vượt trội model thuần toán học.**

## 6. Cạm bẫy
- **Cắm historical mean vào optimizer.** Đây là lỗi số một.
- **Coi trọng số output là chân lý.** Chúng là hàm rất nhạy của đầu vào nhiễu.
- **Rebalance quá thường xuyên theo output optimizer.** Transaction cost ăn hết lợi ích lý thuyết.
- **Nghịch đảo ma trận covariance gần suy biến.** Với nhiều tài sản, ít quan sát → không ổn định.
- **Quên rằng đây không phải bài toán tĩnh.**
- **Nghĩ Sharpe cao nhất = tốt nhất cho bạn.** Xem [[Performance Metrics]] và mục tiêu cá nhân trong [[Risk and Return]].

## 7. Checklist áp dụng
- [ ] Đầu vào của tôi (mean, covariance) ước lượng từ bao nhiêu dữ liệu?
- [ ] Nếu tôi thay đổi expected return ±10%, trọng số đổi bao nhiêu?
- [ ] Tôi có dùng shrinkage hoặc Black-Litterman không? Nếu không, vì sao?
- [ ] Tôi đã tính transaction cost và turnover vào chưa?
- [ ] Tôi có cần expected return trong bài toán không, hay risk parity là đủ?
- [ ] Trọng số này có ổn định qua các cửa sổ ước lượng khác nhau không?

## Công cụ
| Tên                  | Đặc điểm                                       | Link                                  |
| -------------------- | ---------------------------------------------- | ------------------------------------- |
| `PyPortfolioOpt`     | Mean-variance, Black-Litterman, HRP, shrinkage | https://pyportfolioopt.readthedocs.io |
| `riskfolio-lib`      | Nhiều measure rủi ro và ràng buộc              | https://riskfolio-lib.readthedocs.io  |
| `sklearn.covariance` | Ledoit-Wolf shrinkage                          | https://scikit-learn.org              |

## Tham khảo
- Markowitz, H. — *Portfolio Selection*, Journal of Finance (1952)
- Black & Litterman — *Global Portfolio Optimization*, Financial Analysts Journal (1992)
- Ledoit & Wolf — *A well-conditioned estimator for large-dimensional covariance matrices* (2004)
- López de Prado, M. — *Building Diversified Portfolios that Outperform Out of Sample* (HRP), JPM (2016)
- Quant Guild — *Equity Portfolio Management*: https://quantguild.com/lesson_page?subject=finance&level=1&topic=Equity+Portfolio+Management
- Quant Guild — *Why Portfolio Optimization Doesn't Work*: https://youtu.be/32EAVUHVZHg
- Quant Guild — *Black-Litterman vs. Mean-Variance Portfolio Optimization in Python*: https://youtu.be/o1mCFVt79Y8

## Liên kết
[[Diversification]] · [[Performance Metrics]] · [[Expectation and Convergence]] · [[Stationarity and Non-Stationarity]] · [[Risk and Return]] · [[Quant]]
