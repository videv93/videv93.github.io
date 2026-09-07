---
tags: [math, moc]
type: moc
status: evergreen
created: 2026-09-01
---
# Math

> Vault toán **nền tảng**: giải tích một biến, đại số tuyến tính, và tiệm cận. Không phải vault xác suất ([[Prob&Stats]]), không phải vault tối ưu ([[ML]]), không phải vault định giá ([[Quant]]) — nhưng là thứ cả ba đứng lên.

## Cách dùng vault này

- **Thư mục đánh số theo thứ tự học**, không theo bảng chữ cái. `00` → `09` là một lộ trình đọc được từ đầu tới cuối.
- `status` trong frontmatter: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- Tiếng Việt để giải thích, **giữ nguyên thuật ngữ tiếng Anh** — vì mọi sách và mọi bài giảng đều dùng tiếng Anh.
- Ký hiệu toán viết bằng LaTeX (`$...$`), Obsidian render trực tiếp.
- **Đọc [[Computational vs Rigorous Mathematics]] trước khi bắt đầu.** Nó quyết định bạn nên đọc vault này theo kiểu nào — và vì sao hai nguồn seed của vault này mâu thuẫn nhau.

## 00 - Nền tảng & Chứng minh

Thứ roadmap đặt trước mọi thứ khác, và thứ khoá học "calculus trong một video" bỏ qua hoàn toàn.

- [[Proof Techniques]] — sáu kiểu chứng minh và khi nào dùng cái nào
- [[Sets Functions and Relations]] — ngôn ngữ nền của toàn bộ toán hiện đại
- [[Mathematical Logic Basics]] — lượng từ, phủ định, điều kiện cần/đủ
- [[Reading Mathematics]] — cách đọc một định lý và một chứng minh cho đúng tốc độ

## 01 - Giới hạn & Liên tục

- [[Limits]] — định nghĩa $\varepsilon$–$\delta$ và trực giác đi kèm
- [[Computing Limits]] — bảng kỹ thuật: thế, phân tích, liên hợp, trị tuyệt đối, hàm từng khúc
- [[Trigonometric Limits]] — hai giới hạn lượng giác phải thuộc
- [[Continuity]] — ba điều kiện, và phân loại điểm gián đoạn
- [[Intermediate Value Theorem]] — định lý tồn tại đầu tiên bạn gặp
- [[Infinite Limits and Asymptotes]] — tiệm cận đứng, tiệm cận ngang, giới hạn tại vô cực

## 02 - Đạo hàm

- [[Derivative Definition]] — giới hạn tỉ sai phân, và vì sao nó là *cùng một thứ* với tiếp tuyến
- [[Differentiation Rules]] — bảng công thức, kèm chứng minh ngắn
- [[Product and Quotient Rule]] — hai quy tắc hay sai dấu nhất
- [[Chain Rule]] — quy tắc quan trọng nhất trong toàn bộ calculus
- [[Implicit Differentiation]] — khi $y$ không tách được ra
- [[Rates of Change]] — tốc độ trung bình vs tức thời
- [[Motion and Kinematics]] — vị trí, vận tốc, gia tốc, tốc độ
- [[Related Rates]] — quy trình 6 bước, và cạm bẫy "thế số quá sớm"

## 03 - Ứng dụng đạo hàm

- [[Critical Numbers and Extrema]] — cực trị địa phương vs toàn cục
- [[Extreme Value Theorem]] — điều kiện tồn tại của max/min
- [[Mean Value Theorem]] — Rolle, MVT, và các hệ quả bị đánh giá thấp
- [[First Derivative Test]] — dấu của $f'$ và bảng biến thiên
- [[Concavity and Inflection Points]] — $f''$, điểm uốn, second derivative test
- [[Newton's Method]] — nghiệm số, tốc độ hội tụ bậc hai, và khi nào nó gãy
- [[Differentials and Linear Approximation]] — $dy$ vs $\Delta y$

## 04 - Tích phân & Hàm siêu việt

- [[Antiderivatives]] — tích phân bất định và hằng số $C$ hay bị quên
- [[U-Substitution]] — chain rule chạy ngược
- [[Summation Formulas]] — công thức tổng cần cho Riemann sum
- [[Riemann Sums]] — xây dựng tích phân xác định từ đầu
- [[Fundamental Theorem of Calculus]] — cây cầu giữa đạo hàm và diện tích
- [[Mean Value Theorem for Integrals]] — giá trị trung bình của hàm
- [[Numerical Integration]] — trapezoid, Simpson, và bậc sai số
- [[The Natural Logarithm]] — định nghĩa $\ln x$ bằng tích phân, không bằng "log cơ số $e$"
- [[The Exponential Function]] — $e^x$ và chứng minh đạo hàm của nó
- [[Bases Other Than e]] — $a^x$, $\log_a x$, và đổi cơ số

## 05 - Vector & Ma trận

- [[Vectors]] — vector cột, $\mathbb{R}^m$, và hai cách nhìn hình học
- [[Dot Product and Norms]] — công thức cosine, hình chiếu, trực giao
- [[Linear Independence]] — điều kiện, và ý nghĩa hình học
- [[Vector Spaces and Basis]] — tiên đề không gian vector, span, chiều
- [[Matrix Algebra]] — chuyển vị, tích, tính conformal, luật giao hoán *không* đúng
- [[Matrix as Columns]] — cách nhìn khiến mọi chứng minh ma trận dễ đi
- [[Special Matrices]] — đối xứng, đơn vị, ma trận toàn 1, đường chéo
- [[Systems of Linear Equations]] — under/over-determined, rank, định thức, ma trận nghịch đảo

## 06 - Trị riêng & Phân rã

- [[Eigenvalues and Eigenvectors]] — định nghĩa, đa thức đặc trưng, cách giải
- [[Diagonalization]] — $A = S\Lambda S^{-1}$ và điều kiện tồn tại
- [[Matrix Powers and Dynamics]] — vì sao $A^k$ bị chi phối bởi một eigenvalue duy nhất
- [[Stochastic Matrices]] — cột tổng bằng 1, eigenvalue 1, phân phối dừng
- [[Perron-Frobenius Theorem]] — vì sao ma trận dương luôn có phân phối dừng
- [[Matrix Decompositions]] — bản đồ LU, QR, Cholesky, eigen, SVD

## 07 - Đại số tuyến tính trong tài chính

Nửa sau của bài giảng MIT 18.642. Mỗi note ở đây là **đại số tuyến tính**, phần tài chính đầy đủ nằm ở [[Quant]].

- [[Portfolio as a Vector]] — $q \cdot p$, PnL, rebalancing, và bẫy look-ahead
- [[Short Selling and Zero-Cost Portfolios]] — trọng số âm, danh mục chi phí bằng 0
- [[Arbitrage Portfolios]] — định nghĩa hình thức, và statistical arbitrage
- [[Single-Period Market Model]] — ma trận giá dương $A$, trạng thái $\omega_1..\omega_m$
- [[Contingent Claims and Replication]] — hai phương trình hai ẩn, và khi nào giải được
- [[No-Arbitrage and Pricing Measure]] — điều kiện tồn tại, tính duy nhất, market completeness

## 08 - Tiệm cận & Xấp xỉ

- [[Asymptotic Notation]] — $\sim$, $O$, $o$, $\Theta$ — bốn ký hiệu hay bị dùng lẫn
- [[Stirling's Approximation]] — $n! \sim \sqrt{2\pi n}\,(n/e)^n$, sai số, và khi nào dùng được
- [[Proving Stirling's Formula]] — bốn đường chứng minh, từ sơ cấp tới Laplace

## 09 - Lộ trình & Tài nguyên

- [[Mathematics Roadmap]] — sơ đồ phụ thuộc ~40 môn, chép lại từ ảnh trong seed
- [[Learning Resources]] — catalogue sách, khoá học, kênh
- [[Math for Quant and ML]] — vault này nối vào [[Quant]], [[ML]], [[Prob&Stats]] ở đâu
- ⚠️ [[Computational vs Rigorous Mathematics]] — **note bản lề.** Hai hệ giá trị trong seed va nhau ở đây

## Ranh giới với area khác

| Chủ đề | Sống ở đâu | Vì sao |
|---|---|---|
| Xác suất, biến ngẫu nhiên, định lý giới hạn | [[Prob&Stats]] | Đã hệ thống hoá đầy đủ ở đó |
| Markov chain (mặt xác suất) | [[Prob&Stats]] | Math chỉ giữ mặt **ma trận** — xem [[Stochastic Matrices]] |
| SVD, PCA, matrix calculus, tối ưu lồi | [[ML]] | Là công cụ ML, không phải toán nền |
| Black-Scholes, risk-neutral pricing, SDE | [[Quant]] | Math chỉ giữ mô hình **một kỳ, hữu hạn trạng thái** |
| Vật lý dùng calculus | `2. Areas/Physics/` | Area seed, chưa chạy playbook |

## Nguồn học nền tảng

| Nguồn | Loại | Dùng cho | Link |
|---|---|---|---|
| MIT 18.642 *Topics in Mathematics with Applications in Finance* | Khoá học | Thư mục 05–07 | https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024 |
| MIT 18.06 *Linear Algebra* — Gilbert Strang | Khoá học | Thư mục 05–06 | https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010 |
| The Math Sorcerer — *Calculus 1 Full Course* | Video 5h20 | Thư mục 01–04 | https://www.youtube.com/watch?v=G-ti56DEXE8 |
| 3Blue1Brown — *Essence of Linear Algebra* / *Essence of Calculus* | Video | Trực giác trước khi học hình thức | https://www.3blue1brown.com/topics/linear-algebra |
| Velleman — *How to Prove It* | Sách | Thư mục 00 | https://www.cambridge.org/9781108424189 |
| Stewart — *Calculus: Early Transcendentals* | Sách | Bài tập cho 01–04 | https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart |
| Keith Conrad — *Stirling's Formula* (PDF) | Ghi chú | Thư mục 08 | https://kconrad.math.uconn.edu/blurbs/analysis/stirling.pdf |
| Terence Tao — *254A Notes 0a: Stirling's formula* | Blog | Thư mục 08 | https://terrytao.wordpress.com/2010/01/02/254a-notes-0a-stirlings-formula/ |

## Ghi chú về `_archive-seed/`

Bốn file seed gốc nằm nguyên vẹn ở `_archive-seed/`:

| File | Loại seed | Đã nở thành |
|---|---|---|
| `Lecture 2 Linear Algebra.md` (883 dòng transcript) | Nguyên liệu thô | Thư mục 05, 06, 07 |
| `You Can Learn Calculus 1 in One Video (Full Course).md` (60 mục syllabus, 0 nội dung) | Dàn ý — 60 header rỗng | Thư mục 01, 02, 03, 04 |
| `stirling formular - Google Search.md` | Clipping | Thư mục 08 |
| `mathematics-roadmap.jpg` | Sơ đồ | [[Mathematics Roadmap]] |

Quy trình tạo ra vault này: [[Knowledge Seed Playbook]].

## Liên kết
[[Prob&Stats]] · [[ML]] · [[Quant]] · [[Knowledge Seed Playbook]]
