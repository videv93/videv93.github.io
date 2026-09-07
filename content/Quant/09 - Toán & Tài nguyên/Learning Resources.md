---
tags: [quant, resources, moc]
status: evergreen
---
# Learning Resources

> Danh mục tài nguyên đã dùng để dựng vault này, cộng những nguồn được các note khác trích dẫn nhiều nhất.

## 1. Khoá học & nền tảng

| Nguồn | Nội dung | Link |
|---|---|---|
| **Quant Guild** (Roman Paolucci) | 100+ giờ lecture, adaptive practice engine, interview questions có lời giải đầy đủ, khoá từ A–Z về math/probability/coding/finance. Có bản miễn phí | https://quantguild.com |
| **MIT 18.642** — Topics in Mathematics with Applications in Finance (Fall 2024) | Giảng viên: Vasily Strela (RBC), Jake Xia, Peter Kempthorne. Nửa toán + nửa ứng dụng, có guest lecture từ BlackRock, Two Sigma, Millennium, Kalshi, Mizuho, và John Hull. Dùng R + RStudio Cloud | https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024 |
| **MIT 18.S096** — phiên bản 2013 | Cùng dòng, nhiều nội dung stochastic processes | https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013 |
| **Ergodicity Economics** (London Mathematical Laboratory) | Chương trình nghiên cứu tái xây dựng kinh tế học không giả định time average = ensemble average | https://ergodicityeconomics.com/ |

## 2. Thư viện code

| Nguồn | Nội dung | Link |
|---|---|---|
| **Quant Guild Library** | 108+ Jupyter notebook, mỗi cái kèm một video lecture. Từ stochastic calculus, option pricing, tới trading strategy và AI in finance | https://github.com/romanmichaelpaolucci/Quant-Guild-Library |
| **The Gaussian Cookbook** | Công thức mô phỏng quá trình ngẫu nhiên | https://gaussiancookbook.com · SSRN 5332011 |
| AIMLModeling/OrnsteinUhlenbeck | Mô phỏng OU + first passage time | https://github.com/AIMLModeling/OrnsteinUhlenbeck |

## 3. Sách chuẩn ngành

**Nền toán & xác suất**
- Shreve — *Stochastic Calculus for Finance I & II*
- Øksendal — *Stochastic Differential Equations*
- Williams — *Probability with Martingales*
- Feller — *An Introduction to Probability Theory and Its Applications*

**Định giá & phái sinh**
- Hull — *Options, Futures, and Other Derivatives* (sách gối đầu giường của ngành)
- Gatheral — *The Volatility Surface*
- Natenberg — *Option Volatility and Pricing*
- Glasserman — *Monte Carlo Methods in Financial Engineering*
- Joshi — *The Concepts and Practice of Mathematical Finance*

**Time series & econometrics**
- Tsay — *Analysis of Financial Time Series*
- Hamilton — *Time Series Analysis*
- Hyndman & Athanasopoulos — *Forecasting: Principles and Practice* (miễn phí): https://otexts.com/fpp3/
- Angrist & Pischke — *Mostly Harmless Econometrics*

**Danh mục & chiến lược**
- Grinold & Kahn — *Active Portfolio Management*
- Ang — *Asset Management: A Systematic Approach to Factor Investing*
- López de Prado — *Advances in Financial Machine Learning*
- Chan — *Quantitative Trading*
- Harris — *Trading and Exchanges: Market Microstructure for Practitioners*

**Rủi ro, bet sizing, tâm lý**
- MacLean, Thorp & Ziemba — *The Kelly Capital Growth Investment Criterion*
- Thorp — *A Man for All Markets*
- Chen & Ankenman — *The Mathematics of Poker*
- Taleb — *Fooled by Randomness*
- Spitznagel — *Safe Haven: Investing for Financial Storms*

**Đọc thêm (không kỹ thuật)**
- Lewis — *The Big Short* (xem [[Alternative Data]])
- Patterson — *The Quants*
- Phim: *The Big Short*, *Wall Street*, *Boiler Room*

## 4. Bài báo nền tảng

| Bài | Note liên quan |
|---|---|
| Black & Scholes (1973) — *The Pricing of Options and Corporate Liabilities* | [[Black-Scholes Model]] |
| Merton (1973) — *Theory of Rational Option Pricing* | [[Black-Scholes Model]] |
| Kac (1949) — *On Distributions of Certain Wiener Functionals* | [[Feynman-Kac and Risk-Neutral Pricing]] |
| Harrison & Kreps (1979), Harrison & Pliska (1981) — FTAP | [[Feynman-Kac and Risk-Neutral Pricing]] |
| Markowitz (1952) — *Portfolio Selection* | [[Efficient Frontier]] |
| Sharpe (1964) — *Capital Asset Prices* | [[CAPM Alpha and Beta]] |
| Fama (1970) — *Efficient Capital Markets* | [[Efficient Market Hypothesis]] |
| Fama & French (1993) — *Common risk factors…* | [[Diversification]] |
| Engle (1982) — ARCH (Nobel 2003) | [[ARCH and GARCH Models]] |
| Bollerslev (1986) — GARCH | [[ARCH and GARCH Models]] |
| Kelly (1956) — *A New Interpretation of Information Rate* | [[Kelly Criterion]] |
| Kalman (1960) — *A New Approach to Linear Filtering…* | [[Kalman Filter]] |
| Uhlenbeck & Ornstein (1930) | [[Ornstein-Uhlenbeck Process]] |
| Peters (2019) — *The ergodicity problem in economics*, Nature Physics | [[Ergodicity]] |
| Cont (2001) — *Empirical properties of asset returns* | [[Stylized Facts of Volatility]] |
| Avellaneda & Stoikov (2008) — market making | [[Market Making]] |
| Glosten & Milgrom (1985) — adverse selection | [[Market Making]] |
| Bailey et al. (2014) — *Pseudo-Mathematics and Financial Charlatanism* | [[Backtesting and Overfitting]] |

Quant Guild có video *The 5 Papers that Built Modern Quant Finance*: https://youtu.be/ZwS1gMGegrM

## 5. Dữ liệu & công cụ

| Tên | Dùng để | Link |
|---|---|---|
| **Interactive Brokers** | Broker + API (Java/Python/C++). Dùng trong mọi quant build của Quant Guild | https://www.interactivebrokers.com |
| **FRED** | ~80.000 chuỗi thời gian kinh tế | https://fred.stlouisfed.org |
| Yahoo Finance | Dữ liệu giá miễn phí, import được vào R/Python | — |
| **RStudio Cloud / Posit Cloud** | Chạy R trên trình duyệt, không cần cài | https://posit.cloud |
| TradingView | Biểu đồ, vẽ mức, template | https://www.tradingview.com |
| Forex Factory | Lịch tin kinh tế | https://www.forexfactory.com |
| TradeZella | Journal giao dịch có phân tích theo setup/khung giờ | https://www.tradezella.com |

**Thư viện Python:** `numpy` · `scipy` · `pandas` · `statsmodels` · `arch` · `pykalman` · `filterpy` · `PyPortfolioOpt` · `riskfolio-lib` · `hmmlearn`
**Thư viện R:** `quantmod` · `markovchain` · `rugarch`

## 6. Kênh & cộng đồng

| Nguồn | Link |
|---|---|
| Quant Guild (YouTube) | https://www.youtube.com/@quantguild |
| Quant Guild (Medium blog) | https://quantguild.medium.com/ · https://medium.com/quant-guild |
| Quant Guild Discord | https://discord.com/invite/MJ4FU2c6c3 |
| MIT OpenCourseWare | https://ocw.mit.edu |
| discourses.io | https://discourses.io/ |

## 7. Ghi chú
- Trong seed gốc có một file `📜 Weekly Guild Letter` — chỉ là clipping Gmail rỗng, không có nội dung. Newsletter của Quant Guild đăng ký được tại https://quantguild.com.
- Về cụm `08 - Price Action bán lẻ (ICT)`: nguồn chính là Casper SMC và Inner Circle Trader. Đọc [[Quant Critique of ICT]] để có góc nhìn đối chiếu.

## Liên kết
[[Math for Quantitative Finance]] · [[Optimal Policy Function]] · [[Quant Critique of ICT]] · [[Quant]]
