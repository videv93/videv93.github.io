---
tags: [quant, moc]
type: MOC
updated: 2026-08-29
---
# 📈 Quant — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng của khu vực Quantitative Finance & Trading. Mỗi mục con là một note độc lập, có phần **Tham khảo** riêng để đào sâu.

## Cách dùng vault này
- **Mới bắt đầu** → đọc `00 - Nền tảng` theo thứ tự, đặc biệt [[Edge and Expected Value]]. Không hiểu edge thì mọi thứ phía sau vô nghĩa.
- **Cần nền toán** → `01 - Xác suất & Quá trình ngẫu nhiên`.
- **Đang xây model** → `03 - Time Series & Mô hình hoá` + `04 - Volatility`.
- **Đang quản tiền của chính mình** → `06 - Quản lý danh mục` là phần quan trọng nhất trong toàn bộ vault.
- Mỗi note có 3 tầng: **Khái niệm → Nguyên tắc → Checklist**. Học được điều mới thì thêm vào đúng tầng thay vì tạo note mới.
- `status:` trong frontmatter: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).

> [!warning] Một câu xuyên suốt toàn bộ vault
> *"All models are wrong, some are useful."* — Mọi model trong đây đều sai. Câu hỏi không phải "model này đúng không" mà là **"model này sai theo cách nào, và cái sai đó có ngăn tôi ra quyết định tốt hơn không?"** Xem [[All Models Are Wrong]].

---

## 00 — Nền tảng
- [[Randomness vs Uncertainty]] — hệ ngẫu nhiên (xác suất cố định) vs hệ bất định (xác suất đổi theo thời gian)
- [[Games of Chance vs Games of Incomplete Information]] — vì sao roulette là cờ bạc còn poker/trading thì không
- [[Edge and Expected Value]] — định nghĩa edge, phân rã EV, edge định lượng vs định tính
- [[Optimal Policy Function]] — cái mà pro thật sự học không phải chiến lược mà là hàm chính sách
- [[All Models Are Wrong]] — model sai vẫn kiếm được tiền, với điều kiện gì
- [[Trading Myths Busted]] — 3 huyền thoại bị bác bằng toán

## 01 — Xác suất & Quá trình ngẫu nhiên
- [[Expectation and Convergence]] — kỳ vọng, LLN, và khi nào kỳ vọng *không tồn tại*
- [[Ergodicity]] — time average vs ensemble average; vì sao EV dương vẫn cháy tài khoản
- [[Gambler's Ruin]] — xác suất phá sản, và vì sao trading *chính là* bài toán này
- [[Martingales]] — martingale, stopping time, optional stopping theorem
- [[Markov Chains]] — tính Markov, ma trận chuyển trạng thái, ứng dụng regime
- [[Brownian Motion and SDEs]] — GBM, Itô, nền của mọi model liên tục
- [[Ornstein-Uhlenbeck Process]] — mean reversion có neo, Euler–Maruyama, MLE, jump diffusion

## 02 — Edge, Bet Sizing & Rủi ro
- [[Kelly Criterion]] — tối ưu time average, vì sao full-Kelly quá hung hăng
- [[Volatility Drag]] — thuế biến động lên tăng trưởng gộp
- [[Risk Management]] — cắt lỗ sớm, để lãi chạy, trailing stop, giới hạn lỗ ngày
- [[Trading Psychology]] — tilt, revenge trading, IKEA effect, gỡ "tầm quan trọng"

## 03 — Time Series & Mô hình hoá
- [[Time Series Analysis]] — trend/seasonality/shock, khi nào time series là đủ
- [[Stationarity and Non-Stationarity]] — giả định bị vi phạm nhiều nhất trong quant
- [[Filtering Smoothing and Forecasting]] — ba tác vụ hoàn toàn khác nhau hay bị nhầm
- [[Model Specification and Parameterization]] — model gãy vì specification hay vì tham số?
- [[Kalman Filter]] — kết hợp model với dữ liệu quan sát, Kalman gain, dual filter
- [[Alternative Data]] — nguồn edge nằm *trước* khi giá phản ánh

## 04 — Volatility
- [[Realized vs Implied Volatility]] — nhìn lui vs nhìn tới, hai nguồn hoàn toàn khác nhau
- [[Stylized Facts of Volatility]] — clustering, mean reversion, leverage effect, fat tails
- [[ARCH and GARCH Models]] — mô hình hoá phương sai có điều kiện
- [[Volatility Risk Premium]] — nỗi sợ bị định giá quá cao một cách hệ thống

## 05 — Định giá phái sinh
- [[European Options]] — payoff tại T là chuyện dễ; định giá tại t mới là vấn đề
- [[Black-Scholes Model]] — 5 input → 1 giá, và mọi giả định bị vi phạm
- [[Feynman-Kac and Risk-Neutral Pricing]] — vì sao PDE và kỳ vọng risk-neutral là một
- [[Trading with a Pricing Model]] — biến mispricing lý thuyết thành EV dương

## 06 — Quản lý danh mục
- [[Risk and Return]] — rủi ro cao hơn **không** đồng nghĩa lợi nhuận cao hơn
- [[Types of Portfolio Risk]] — idiosyncratic / industry / systematic
- [[Diversification]] — hoạt động thế nào và dừng ở đâu
- [[CAPM Alpha and Beta]] — phần lớn "alpha" của bạn chỉ là beta
- [[Efficient Frontier]] — và estimation risk khiến nó vỡ trong thực tế
- [[Performance Metrics]] — Sharpe là nén mất mát thông tin, không phải chân lý
- [[Efficient Market Hypothesis]] — cả ba dạng đều sai, nhưng sai theo cách hữu ích
- [[Physical Decorrelation]] — cách "đa dạng hoá cái không đa dạng hoá được"

## 07 — Chiến lược & Thực thi
- [[Backtesting and Overfitting]] — mục tiêu là model robust, không phải equity curve đẹp
- [[Quant vs Discretionary Trading]] — hai cách tiếp cận, một mục tiêu
- [[Retail vs Institutional Trading]] — buy side, sell side, và vị thế thật của retail
- [[Market Making]] — kiếm tiền từ spread quanh một mức kỳ vọng "đủ tốt"
- [[Alpha Signals]] — signal cross-sectional, quantile plot, alpha decay

## 08 — Price Action bán lẻ (ICT)
- [[ICT Liquidity]] — buyside/sellside liquidity, trapped traders
- [[Market Structure and Displacement]] — displacement vs manipulation
- [[Fair Value Gaps and Order Blocks]] — IRL → ERL, BSG, inflection point
- [[Time-Based Liquidity]] — session levels, SMT divergence, mốc thời gian
- [[Quant Critique of ICT]] — ⚠️ đọc note này **trước** khi áp dụng cả cụm 08

## 09 — Toán & Tài nguyên
- [[Math for Quantitative Finance]] — lộ trình toán tối thiểu để làm quant
- [[Regression Analysis]] — OLS, giả định Gauss–Markov, dùng ở đâu trong quant
- [[Monte Carlo Simulation]] — khi nào mô phỏng thắng nghiệm giải tích
- [[Learning Resources]] — sách, khoá học, thư viện notebook, kênh

---

## Nguồn học nền tảng (dùng chung cho cả area)

| Nguồn | Loại | Link |
|---|---|---|
| Quant Guild (Roman Paolucci) | Kênh YouTube + nền tảng học | https://quantguild.com · https://www.youtube.com/@quantguild |
| Quant Guild Library | 100+ Jupyter notebook kèm video | https://github.com/romanmichaelpaolucci/Quant-Guild-Library |
| MIT 18.642 — Topics in Mathematics with Applications in Finance | Khoá học đại học (free) | https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024 |
| MIT 18.S096 — Topics in Mathematics of Finance | Khoá học đại học (free) | https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013 |
| Ergodicity Economics (London Mathematical Laboratory) | Chương trình nghiên cứu | https://ergodicityeconomics.com/ |
| Hull — *Options, Futures, and Other Derivatives* | Sách chuẩn ngành | — |
| Shreve — *Stochastic Calculus for Finance I & II* | Sách chuẩn ngành | — |
| Tsay — *Analysis of Financial Time Series* | Sách chuẩn ngành | — |
| López de Prado — *Advances in Financial Machine Learning* | Sách (backtest, overfitting) | — |
| The Gaussian Cookbook | Công thức mô phỏng quá trình ngẫu nhiên | https://gaussiancookbook.com |

Chi tiết hơn: [[Learning Resources]].

---

## Về `_archive-seed/`
29 file clipping gốc (transcript YouTube, lesson page, README) nằm trong `_archive-seed/`.
Toàn bộ nội dung của chúng đã được chuyển vào hệ thống note ở trên — **không có gì bị vứt đi**, chỉ được mở rộng và khử trùng lặp. Giữ lại để đối chiếu nguyên văn và truy nguồn.

Ba file trong seed vốn là **header rỗng** (lời hứa chưa trả) và nay đã có nội dung đầy đủ:
- `Quant vs. Discretionary Trading.md` → [[Quant vs Discretionary Trading]]
- `Math for Quantatative Finance.md` → [[Math for Quantitative Finance]]
- `📜 Weekly Guild Letter.md` → gộp vào [[Learning Resources]]

## Liên kết
[[Knowledge Seed Playbook]] — quy trình đã dùng để dựng vault này.
