---
tags: [math, meta, navigation]
status: evergreen
---
# Math for Quant and ML

> Vault Math nối vào ba area khác trong vault này ở đâu, và **ranh giới** nằm chỗ nào. Note này tồn tại để không viết lại cùng một khái niệm ở bốn nơi — nguyên tắc "một khái niệm, một nhà" của [[Knowledge Seed Playbook]].

## 1. Bản đồ bốn area

| Area | Trả lời câu hỏi | Đứng trên |
|---|---|---|
| **Math** (vault này) | Công cụ hoạt động thế nào và khi nào hỏng | — |
| [[Prob&Stats]] | Bất định được mô hình hoá thế nào | Math `01`–`04`, `05` |
| [[ML]] | Học từ dữ liệu thế nào | Math `05`, `06` + Prob&Stats |
| [[Quant]] | Định giá và giao dịch thế nào | Math `05`–`07` + Prob&Stats |

## 2. Ranh giới — khái niệm nào sống ở đâu

| Khái niệm | Nhà | Math giữ gì |
|---|---|---|
| Biến ngẫu nhiên, phân phối, kỳ vọng | [[Prob&Stats]] | — |
| Định lý giới hạn trung tâm, luật số lớn | [[Prob&Stats]] | [[Stirling's Approximation]] là công cụ của CLT nhị thức |
| Markov chain (mặt xác suất) | [[Prob&Stats]] `09` | [[Stochastic Matrices]] — chỉ mặt **ma trận**: eigenvalue 1, hội tụ |
| Brownian motion, SDE, martingale | [[Quant]] `01` | — |
| SVD, PCA, giảm chiều | [[ML]] `05` | [[Matrix Decompositions]] — chỉ bảng tổng quan và chỗ nối |
| Matrix calculus, gradient, Jacobian | [[ML]] `00` | [[Chain Rule]] là nền của backprop |
| Tối ưu lồi, Lagrange duality | [[ML]] `00` | [[Concavity and Inflection Points]] — tính lồi một biến |
| Black–Scholes, risk-neutral pricing | [[Quant]] `05` | [[No-Arbitrage and Pricing Measure]] — bản **một kỳ, hữu hạn trạng thái** |
| Hồi quy, least squares | [[Quant]] `09`, [[ML]] | [[Dot Product and Norms]], [[Systems of Linear Equations]] — mặt hình chiếu |
| Monte Carlo | [[Quant]] `09` | [[Numerical Integration]] — so sánh với quy tắc lưới |
| Time series, stationarity | [[Quant]] `03` | [[Matrix Powers and Dynamics]] — điều kiện ổn định $\vert\lambda\vert<1$ |

**Quy tắc:** nếu một khái niệm cần **giả thiết mô hình về thế giới** (giá, dữ liệu, rủi ro) thì nó thuộc area ứng dụng. Nếu nó đúng bất kể bối cảnh thì nó thuộc Math.

## 3. Đường đi từ Math sang Quant

| Math | → | Quant |
|---|---|---|
| [[Portfolio as a Vector]] | → | tối ưu danh mục, đo lường hiệu quả (`06`) |
| [[Arbitrage Portfolios]] | → | Efficient Market Hypothesis, alpha (`06`, `07`) |
| [[Contingent Claims and Replication]] | → | European Options, hedging (`05`) |
| [[No-Arbitrage and Pricing Measure]] | → | Feynman-Kac and Risk-Neutral Pricing, Black-Scholes (`05`) |
| [[Matrix Powers and Dynamics]] | → | Stationarity and Non-Stationarity (`03`) |
| [[The Exponential Function]] | → | lãi kép liên tục, discount factor |
| [[Stirling's Approximation]] | → | xấp xỉ nhị thức trong mô hình cây |

Thư mục `07` của vault này **là** phiên bản đại số tuyến tính của Quant `05`. Cùng nội dung, hai mức trừu tượng: Math giữ mô hình một kỳ hữu hạn trạng thái (giải được bằng tay, thấy rõ cấu trúc); Quant giữ mô hình thời gian liên tục (dùng được thật).

## 4. Đường đi từ Math sang ML

| Math | → | ML |
|---|---|---|
| [[Chain Rule]] | → | backpropagation |
| [[Dot Product and Norms]] | → | similarity, $L^1$/$L^2$ regularization |
| [[Linear Independence]] | → | đa cộng tuyến, feature redundancy |
| [[Eigenvalues and Eigenvectors]] | → | PCA, spectral clustering (`05`) |
| [[Matrix Decompositions]] | → | SVD, matrix factorization (`05`, `06`) |
| [[Concavity and Inflection Points]] | → | convex optimization (`00`) |
| [[Newton's Method]] | → | phương pháp tối ưu bậc hai |
| [[Systems of Linear Equations]] | → | normal equations, ridge regression |
| [[Numerical Integration]] | → | Monte Carlo vs quadrature trong Bayesian |

## 5. Nền toán tối thiểu cho mỗi đích

**Đủ để đọc [[ML]]:**
`02` (đạo hàm, chain rule) · `03` (cực trị, lồi) · `05` (vector, ma trận) · `06` (eigen) · [[Prob&Stats]] `00`–`05`.
Không cần: `07`, `08`, phần lớn `04`.

**Đủ để đọc [[Quant]]:**
Tất cả trên, cộng `04` (tích phân, hàm mũ) · `07` (mô hình thị trường) · [[Prob&Stats]] `09` (quá trình ngẫu nhiên).

**Đủ để đọc [[Prob&Stats]] ở mức chặt chẽ:**
`00` (chứng minh) · `01`–`04` đầy đủ · `08` (tiệm cận) · rồi Abbott *Understanding Analysis*. Xem lộ trình C ở [[Learning Resources]].

## 6. Cạm bẫy điều hướng

1. **Viết lại một khái niệm vì "ở đây cũng cần".** Link, đừng chép. → [[Knowledge Seed Playbook]]
2. **Học toán tuần tự trước khi chạm ứng dụng.** Roadmap là bản đồ, không phải hàng đợi — [[Mathematics Roadmap]] mục 7.
3. **Nhảy vào [[Quant]] mà thiếu `05`–`06`.** Mọi thứ ở đó là đại số tuyến tính mặc áo tài chính.
4. **Nhầm mức trừu tượng.** Mô hình một kỳ của Math `07` **không** thay thế được Black–Scholes; nó là bản đơn giản hoá để thấy cấu trúc.
5. **Bỏ qua ranh giới trong bảng mục 2** rồi có hai note mâu thuẫn nhau ở hai area.
6. **Học tối ưu lồi từ Math.** Vault này chỉ có tính lồi một biến; bản đầy đủ ở [[ML]] `00`.

## 7. Checklist khi thêm note mới vào Math
- [ ] Khái niệm này đã có nhà ở area khác chưa? (grep vault trước khi viết)
- [ ] Nó có cần giả thiết về **thế giới** không? (nếu có → thuộc area ứng dụng)
- [ ] Nếu trùng một phần — Math giữ mặt nào, area kia giữ mặt nào? Đã ghi rõ trong cả hai chưa?
- [ ] Note mới có link về [[Math]] và sang area liên quan chưa?
- [ ] Bảng ranh giới ở mục 2 có cần cập nhật không?

## Tham khảo
- Deisenroth, Faisal, Ong — *Mathematics for Machine Learning* (PDF miễn phí): https://mml-book.github.io/
- Boyd & Vandenberghe — *Convex Optimization*: https://web.stanford.edu/~boyd/cvxbook/
- Joshi — *The Concepts and Practice of Mathematical Finance*: https://www.cambridge.org/9780521514088
- MIT OCW 18.642 — *Topics in Mathematics with Applications in Finance*: https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024

## Liên kết
[[Learning Resources]] · [[Mathematics Roadmap]] · [[Quant]] · [[ML]] · [[Prob&Stats]] · [[Knowledge Seed Playbook]] · [[Math]]
