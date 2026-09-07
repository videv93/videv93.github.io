---
tags: [quant, time-series, modeling, core]
status: evergreen
---
# Stationarity and Non-Stationarity

> Giả định đầu tiên giáo sư bảo bạn chấp nhận, và là giả định bị vi phạm nặng nhất trong thực tế. Đây là vấn đề trung tâm của quant modeling.

## 1. Định nghĩa

**Stationarity** = các moment thống kê tiến hoá **một cách xác định**, tức là tĩnh theo thời gian: mean, variance, autocorrelation, autocovariance đều không đổi.

Trong lớp học: giả định stationarity → mọi định lý hội tụ chạy, mọi ước lượng có tính chất tiệm cận đẹp.

Trong thực tế: **không có stationarity**, và bạn phải sống chung với nó.

## 2. Vì sao nó không tồn tại

1. **Regime đổi** — lạm phát, lãi suất, chính quyền mới, khủng hoảng.
2. **Doanh nghiệp đổi** — NVIDIA năm 2005 không phải NVIDIA bây giờ. Phân phối return của nó **nên** đổi.
3. **Metagame đổi** — công cụ mới, công nghệ mới, người chơi mới, chiến lược mới.
4. **Cấu trúc gãy** — earnings shock, sự kiện vỡ nợ, thay đổi quy định.

Hệ quả sâu nhất: **expected return là một quá trình ngẫu nhiên**, và do đó mọi moment bậc cao cũng vậy. Xem [[Expectation and Convergence]].

## 3. Về các test stationarity

> "Nếu bạn thử test stationarity, nó hơi buồn cười. Thực sự không có test đáng tin cậy nào cho stationarity."

Lập luận quen thuộc: *giá cổ phiếu có unit root nên hãy dùng return, return thì stationary.* Điều này đúng một phần và tiện lợi, nhưng nó không giải quyết vấn đề — phân phối của **return** cũng đổi theo thời gian.

Test unit root (ADF, KPSS, Phillips-Perron) kiểm tra một dạng non-stationarity rất hẹp. Chúng hữu ích, nhưng đừng nhầm "pass ADF" với "stationary".

## 4. Hệ quả thực tế

| Nơi bị ảnh hưởng       | Hậu quả                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Backtest               | Hiệu suất suy giảm khi deploy live — có thể do regime change chứ không phải overfit. Xem [[Backtesting and Overfitting]]                       |
| Performance metric     | Sharpe, Sortino… bản thân là **biến ngẫu nhiên**, trung bình của chúng không hội tụ về giá trị cố định. Xem [[Performance Metrics]]            |
| Portfolio optimization | Trọng số "tối ưu" ước lượng từ dữ liệu và **không** hội tụ. Chạy min-variance ra 15%/75%/10% — những con số đó sai. Xem [[Efficient Frontier]] |
| Edge components        | $P(W)$, $\bar{W}$, $P(L)$, $\bar{L}$ đều trôi. Xem [[Gambler's Ruin]]                                                                          |
| Model parameters       | Tham số calibrate hôm qua có thể vô nghĩa hôm nay. Xem [[Model Specification and Parameterization]]                                            |

**Một dấu hiệu cảnh báo cụ thể:** khi ai đó trích dẫn CLT để nói "chiến lược tốt rồi sẽ hội tụ về EV dương" — họ đang giả định stationarity mà không biết. Và thường họ cũng không phân biệt được convergence in probability với almost sure convergence.

## 5. Chiến lược đối phó

Không có giải pháp, chỉ có cách sống chung:

1. **Mô hình thích ứng** — [[Kalman Filter]], đặc biệt là dual filter cập nhật cả tham số model.
2. **Regime switching** — [[Markov Chains]], Hidden Markov Model. Chỉ giao dịch trong regime phù hợp.
3. **Conditional heteroscedasticity** — [[ARCH and GARCH Models]] cho variance biến thiên.
4. **Cửa sổ ước lượng ngắn hơn** — đánh đổi bias/variance. Không có câu trả lời đúng cho "dùng bao nhiêu dữ liệu".
5. **Khai tử và hồi sinh chiến lược** — coi đó là công việc thường trực, không phải thất bại.
6. **Alternative data** — bắt structural break trước khi nó hiện lên chuỗi. Xem [[Alternative Data]].

## 6. Cạm bẫy
- **Hand-wave stationarity đi.** Nó xứng đáng được thảo luận thẳng thắn, không phải giả định ngầm.
- **Fit model trên toàn bộ lịch sử.** Nếu phân phối đã đổi, bạn đang thông tin sai cho tham số.
- **Dùng cửa sổ ngắn tới mức chỉ còn noise.** Sai lầm ngược lại.
- **Coi "pass test" là "stationary".**
- **Kết luận "vậy thì mọi model đều vô dụng".** Sai — xem [[All Models Are Wrong]].

## 7. Checklist áp dụng
- [ ] Tôi có đang giả định stationarity ở đâu mà không nói ra không?
- [ ] Cửa sổ ước lượng của tôi dựa trên cơ sở gì?
- [ ] Nếu tôi fit lại model trên nửa sau dữ liệu, tham số có khác nhiều không?
- [ ] Model của tôi có cơ chế thích ứng khi regime đổi không?
- [ ] Khi hiệu suất suy giảm, tôi phân biệt "regime change" với "overfit" bằng cách nào?
- [ ] Tôi có kế hoạch khai tử chiến lược không? Tiêu chí là gì?

## Tham khảo
- Quant Guild — *Non-Stationarity and Why Market Timing Fails*: https://youtu.be/7nvjrgqKjJE
- Quant Guild — *Expected Stock Returns Don't Exist*: https://youtu.be/tHEOQ4Wq5KU
- Quant Guild — *Time Series Analysis for Quant Finance*: https://youtu.be/JwqjuUnR8OY
- Hamilton, J. — *Time Series Analysis*, Ch. 15–17 (unit roots)
- Dickey & Fuller (1979); Kwiatkowski, Phillips, Schmidt & Shin (1992) — các test kinh điển
- López de Prado, M. — *Advances in Financial Machine Learning*, Ch. 5 (fractional differentiation)

## Liên kết
[[Expectation and Convergence]] · [[Kalman Filter]] · [[Model Specification and Parameterization]] · [[Backtesting and Overfitting]] · [[Performance Metrics]] · [[Quant]]
