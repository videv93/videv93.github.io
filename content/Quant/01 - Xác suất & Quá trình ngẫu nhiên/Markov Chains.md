---
tags: [quant, probability, stochastic]
status: growing
---
# Markov Chains

> "Tương lai chỉ phụ thuộc quá khứ thông qua giá trị cuối cùng." Một giả định đơn giản hoá mạnh mẽ — và là nền của regime modeling trong quant.

## 1. Tính Markov

Quá trình $X_t$ là **Markov** nếu với $u < s < t$:
$$\mathcal{L}(X_t \mid X_v, v \le s) = \mathcal{L}(X_t \mid X_s)$$

Không quan trọng bạn *đến* trạng thái $X_s$ bằng đường nào. Hai realization khác nhau có cùng điểm cuối → cùng phân phối tương lai.

Đây chính là cấu trúc của [[Gambler's Ruin]]: "không quan trọng vốn từng lên 10.000 rồi về 10; bạn đang ở 10."

## 2. Markov chain

Không gian trạng thái $S$ (hữu hạn hoặc đếm được), chỉ số thời gian $n = 0,1,2,\dots$:
$$P(X_{n+1}=j \mid X_0,\dots,X_n=i) = P(X_{n+1}=j \mid X_n=i)$$

**Xích Markov dừng (stationary):** xác suất chuyển một bước không phụ thuộc $n$ → ma trận $P = [p_{ij}]$ với $p_{ij}\ge 0$, $\sum_j p_{ij} = 1$.

Ma trận $P$ **cộng** phân phối trạng thái ban đầu **đặc tả hoàn toàn** mô hình xác suất của quá trình. Phân phối đồng thời phân rã được:
$$P(X_0=i_0,\dots,X_n=i_n) = \pi_{i_0}\, p_{i_0 i_1}\cdots p_{i_{n-1} i_n}$$

**Chuyển $n$ bước:** $P^{(n)} = P^n$ (luỹ thừa ma trận). Chứng minh bằng *first-step analysis*:
$$p^{(n)}_{ij} = \sum_k p_{ik}\, p^{(n-1)}_{kj}$$

## 3. Ứng dụng 1 — credit rating migration

Doanh nghiệp được xếp hạng AAA … C, D (default, gần như trạng thái hấp thụ). Hạng tín dụng cao → vay lãi suất thấp hơn. Bảng migration probability một năm cho thấy:
- AAA chỉ có ~43% khả năng **giữ nguyên** AAA sau một năm.
- CCC có ~41% khả năng lên B, ~32% giữ nguyên, và **~20% default**.

Toàn bộ phân tích này là công cụ Markov chain chuẩn.

## 4. Ứng dụng 2 — trạng thái up/down của cổ phiếu

Định nghĩa trạng thái 2 ngày cho AAPL: (up,up), (up,down), (down,up), (down,down) → 4 trạng thái. Ước lượng $p_{ij}$ thực nghiệm từ dữ liệu đóng cửa.

Kết quả quan sát được (AAPL, ~4,5 năm):
- Hai ngày tăng liên tiếp → **có xu hướng** tiếp tục tăng ngày thứ ba.
- Hai ngày giảm liên tiếp → **ít khả năng** giảm tiếp ngày thứ ba (xác suất < 0,5) — có xu hướng đảo chiều.

Mở rộng lên trạng thái 3 ngày → 8 trạng thái. Ba ngày giảm → xác suất ngày tăng kế tiếp ~**60%**. Ba ngày tăng → có xu hướng tăng tiếp.

⚠️ **Đừng vội mừng.** Đây là ước lượng thực nghiệm trên một mã, một cửa sổ. Xác suất chuyển **không cố định theo thời gian** ([[Stationarity and Non-Stationarity]]), và 0,510 thì gần như không khác 0,5. Đây là bài tập minh hoạ, không phải chiến lược.

## 5. Ứng dụng 3 — regime switching

Ứng dụng quant phổ biến nhất: dùng Markov chain (hoặc **Hidden Markov Model**) để phân loại regime — ví dụ low / mid / high volatility — rồi chỉ giao dịch trong regime chọn lọc.

⚠️ Cảnh báo quan trọng: **regime modeling thường vẫn chỉ là beta.** Chạy chiến lược moving average chỉ trong regime low-vol, rồi hồi quy alpha → alpha không những bằng 0 mà còn **không có ý nghĩa thống kê**. Xem [[CAPM Alpha and Beta]] và [[Alpha Signals]].

## 6. Khái niệm cần biết thêm
- **Communicating classes** — trạng thái nào tới được trạng thái nào (có thể qua nhiều bước)? Ví dụ AAPL 3 ngày là *strongly connected*.
- **Absorbing states** — default, phá sản. Xem [[Gambler's Ruin]].
- **Stationary distribution** — phân phối bất biến dưới $P$.
- **Hidden Markov Model** — trạng thái không quan sát trực tiếp, chỉ quan sát tín hiệu phát ra. Đây là dạng dùng nhiều nhất cho regime.

## 7. Cạm bẫy
- **Giả định Markov ở nơi có long memory.** Volatility có bằng chứng phụ thuộc tầm xa → rough volatility / Volterra process phù hợp hơn.
- **Giả định stationary transition** trong khi thị trường đổi regime — mỉa mai thay, chính là thứ ta dùng Markov chain để mô hình hoá.
- **Overfit số trạng thái.** 8 trạng thái từ 4,5 năm dữ liệu ngày là ít mẫu cho mỗi ô.
- **Nhầm backtest đẹp với alpha.** Xem mục 5.

## 8. Checklist áp dụng
- [ ] Tính Markov có hợp lý cho quá trình của tôi không, hay có long memory?
- [ ] Xác suất chuyển của tôi ước lượng từ bao nhiêu mẫu mỗi ô?
- [ ] Ma trận có ổn định khi đổi cửa sổ thời gian không?
- [ ] Nếu tôi lọc regime, tôi đã chạy alpha regression để kiểm tra chưa phải là beta chưa?
- [ ] Có trạng thái hấp thụ nào trong hệ của tôi không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `markovchain` (R) | Fit + vẽ đồ thị chuyển trạng thái; bài giới thiệu có cả nền toán | https://cran.r-project.org/package=markovchain |
| `hmmlearn` (Python) | Hidden Markov Model | https://hmmlearn.readthedocs.io |
| `quantmod` (R) | Lấy dữ liệu giá từ internet | https://cran.r-project.org/package=quantmod |
| `statsmodels` MarkovRegression | Regime switching cho time series | https://www.statsmodels.org |

## Tham khảo
- MIT 18.642 — *Lecture 6: Stochastic Processes I (cont.); Regression Analysis*
- Quant Guild — *Markov Chains for Quant Finance*: https://youtu.be/k8oQfd6M5sA
- Quant Guild — *Hidden Markov Models for Quant Finance*: https://youtu.be/Bru4Mkr601Q
- Quant Guild — *Why Your Backtests are Wrong | Markov Property for Quant Trading*: https://youtu.be/w-EbZ6Xct_E
- Hamilton, J. — *A New Approach to the Economic Analysis of Nonstationary Time Series*, Econometrica (1989)

## Liên kết
[[Martingales]] · [[Gambler's Ruin]] · [[Stationarity and Non-Stationarity]] · [[Alpha Signals]] · [[Quant]]
