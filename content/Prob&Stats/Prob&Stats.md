---
tags: [probability, statistics, moc]
type: MOC
updated: 2026-08-28
---
# 🎲 Probability & Statistics — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng của khu vực Xác suất & Thống kê. Xây từ transcript Stat 110 (Harvard), 18.650 (MIT), Wikipedia và khoá poker JHU — xem `_archive-seed/`.

## Cách dùng vault này
- **Học từ đầu** → theo [[Learning Roadmap]], đi tuần tự `00 →10`.
- **Tra cứu nhanh một phân phối** → [[Distribution Cheatsheet]].
- **Đang giải một bài toán cụ thể** → vào `02 - Classic Problems`, phần lớn bài lạ đều là biến thể của bốn bài kinh điển ở đó.
- Mỗi note có 3 tầng: **Khái niệm → Nguyên tắc/Cạm bẫy → Checklist**. Học được điều mới thì thêm vào đúng tầng, đừng tạo note mới.
- `status:` — `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- Giải thích bằng tiếng Việt, **giữ nguyên thuật ngữ tiếng Anh** vì mọi tài liệu gốc đều là tiếng Anh.

---

## 00 — Nền tảng
- [[Learning Roadmap]] — lộ trình từ đếm đến suy diễn thống kê
- [[Sample Space & Events]] — ngôn ngữ tập hợp làm nền cho mọi thứ
- [[Naive Definition of Probability]] — công thức đếm, và khi nào nó sai
- [[Counting & Combinatorics]] — quy tắc nhân, hoán vị, tổ hợp, bảng sampling
- [[Axioms of Probability]] — định nghĩa không ngây thơ, 2 tiên đề Kolmogorov
- [[Properties of Probability]] — phần bù, đơn điệu, union bound, inclusion–exclusion
- [[Story Proofs]] — chứng minh bằng diễn giải, kỹ năng đặc trưng của Stat 110

## 01 — Xác suất có điều kiện
- [[Conditional Probability]] — bản chất "cập nhật niềm tin", không phải công thức
- [[Bayes Rule]] — đảo chiều điều kiện, dạng odds
- [[Law of Total Probability]] — chia để trị bằng partition
- [[Independence]] — độc lập đôi một ≠ độc lập toàn phần
- [[Conditional Independence]] — độc lập có thể xuất hiện và biến mất khi conditioning
- [[Conditional Probability Fallacies]] — prosecutor's fallacy, base rate neglect

## 02 — Bài toán kinh điển
- [[Birthday Problem]] — vì sao 23 người là đủ
- [[Matching Problem]] — inclusion–exclusion và hằng số $1/e$
- [[Monty Hall Problem]] — vì sao phải đổi cửa
- [[Simpson's Paradox]] — gộp dữ liệu đảo ngược kết luận

## 03 — Biến ngẫu nhiên
- [[Random Variable]] — hàm từ sample space vào $\mathbb{R}$, không phải "biến"
- [[PMF]] — mô tả đầy đủ biến rời rạc
- [[CDF]] — mô tả đầy đủ mọi biến, kể cả liên tục
- [[Discrete vs Continuous]] — PMF vs PDF, vì sao $P(X=x)=0$
- [[Independence of Random Variables]] — định nghĩa qua joint CDF/PMF

## 04 — Các phân phối
- [[Bernoulli & Binomial]] — viên gạch cơ bản nhất
- [[Hypergeometric]] — lấy mẫu **không** hoàn lại
- [[Geometric & Negative Binomial]] — đợi thành công đầu tiên / thứ $r$
- [[Poisson Distribution]] — đếm sự kiện hiếm
- [[Poisson Paradigm]] — xấp xỉ Poisson khi các biến cố "gần độc lập"
- [[Uniform Distribution]] — và Universality of the Uniform
- [[Normal Distribution]] — chuẩn hoá, quy tắc 68–95–99.7
- [[Exponential Distribution]] — memoryless trong thời gian liên tục
- [[Distribution Cheatsheet]] — bảng tra cứu tổng hợp

## 05 — Kỳ vọng & Moment
- [[Expectation]] — trung bình có trọng số
- [[Linearity of Expectation]] — công cụ mạnh nhất, **không cần độc lập**
- [[Indicator Random Variables]] — cầu nối giữa xác suất và kỳ vọng
- [[LOTUS]] — tính $E[g(X)]$ mà không cần phân phối của $g(X)$
- [[Variance]] — độ phân tán, và vì sao bình phương
- [[Moment Generating Functions]] — xác định phân phối, sinh moment
- [[Conditional Expectation]] — $E[X|Y]$ là một biến ngẫu nhiên

## 06 — Định lý giới hạn
- [[Modes of Convergence]] — hội tụ theo xác suất / hầu chắc chắn / theo phân phối
- [[Law of Large Numbers]] — trung bình mẫu hội tụ về $\mu$
- [[Central Limit Theorem]] — vì sao Normal ở khắp nơi
- [[Concentration Inequalities]] — Markov, Chebyshev, Hoeffding

## 07 — Suy diễn thống kê
- [[Statistical Model]] — bộ ba $(E, (\mathbb{P}_\theta)_{\theta\in\Theta})$
- [[Parametric vs Nonparametric]] — đánh đổi giữa giả định và dữ liệu
- [[Estimator Quality]] — bias, variance, quadratic risk
- [[Maximum Likelihood Estimation]] — nguyên lý ước lượng chủ đạo
- [[Convexity & Optimization]] — vì sao log-likelihood lõm là tin tốt
- [[Fisher Information]] — độ cong của log-likelihood, cận Cramér–Rao
- [[Confidence Intervals]] — cách đọc đúng, cách hiểu sai

## 08 — Tư duy Bayes
- [[Bayesian vs Frequentist]] — $\theta$ là hằng số hay biến ngẫu nhiên?
- [[Laplace's Rule of Succession]] — mặt trời mai có mọc không
- [[Beta-Binomial Conjugacy]] — prior đẹp làm posterior dễ

## 09 — Quá trình ngẫu nhiên
- [[Markov Chains]] — trạng thái tương lai chỉ phụ thuộc hiện tại
- [[Transition Matrices]] — biến Markov chain thành đại số tuyến tính
- [[First Step Analysis]] — kỹ thuật condition on the first step
- [[Gambler's Ruin]] — bài toán mẫu mực của random walk
- [[Random Walk]] — bước đi ngẫu nhiên và tính hồi quy

## 10 — Cờ bạc & Ứng dụng
- [[Expected Value in Gambling]] — house edge, vì sao mọi trò đều âm EV
- [[Pot Odds]] — quyết định call/fold bằng số
- [[Poker Probability]] — outs, equity, combinatorics của bài
- [[Roulette]] — bàn cược và biên nhà cái
- [[Số đề & Lô]] — phân tích EV của trò cờ bạc phổ biến ở Việt Nam
- [[Bankroll & Kelly Criterion]] — có lợi thế rồi thì cược bao nhiêu

---

## Nguồn học nền tảng (dùng chung cho cả area)

| Nguồn | Dạng | Link |
|---|---|---|
| **Stat 110** — Joe Blitzstein, Harvard | Video + bài tập | https://projects.iq.harvard.edu/stat110 |
| *Introduction to Probability* — Blitzstein & Hwang | Sách (miễn phí) | http://probabilitybook.net |
| **MIT 18.650** — Statistics for Applications, Philippe Rigollet | Video | https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/ |
| **MIT 6.041** — Probabilistic Systems Analysis, John Tsitsiklis | Video | https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/ |
| *All of Statistics* — Larry Wasserman | Sách | https://link.springer.com/book/10.1007/978-0-387-21736-9 |
| *Probability Cheatsheet* — William Chen | 10 trang tóm tắt | https://github.com/wzchen/probability_cheatsheet |
| Seeing Theory — Brown University | Trực quan tương tác | https://seeing-theory.brown.edu |
| 3Blue1Brown — Probability | Video trực quan | https://www.youtube.com/playlist?list=PLZHQObOWTQDMp_VZelDYjka8tnXNpXhzJ |

## `_archive-seed/`
Chứa transcript gốc đã clipping, giữ nguyên 100% để đối chiếu:

- Stat 110: [[Lecture 1 Probability and Counting  Statistics 110|L1]] · [[Lecture 2 Story Proofs, Axioms of Probability  Statistics 110|L2]] · [[Lecture 3 Birthday Problem, Properties of Probability  Statistics 110|L3]] · [[Lecture 4 Conditional Probability  Statistics 110|L4]] · [[Lecture 5 Conditioning Continued, Law of Total Probability  Statistics 110|L5]] · [[Lecture 6 Monty Hall, Simpson's Paradox  Statistics 110|L6]] · [[Lecture 7 Gambler's Ruin and Random Variables  Statistics 110|L7]] · [[Lecture 8 Random Variables and Their Distributions  Statistics 110|L8]] · [[Lecture 9 Expectation, Indicator Random Variables, Linearity  Statistics 110|L9]] · [[Lecture 11 The Poisson distribution  Statistics 110|L11]] · [[Lecture 12 Discrete vs Continuous, the Uniform  Statistics 110|L12]] · [[Lecture 17 Moment Generating Functions  Statistics 110|L17]]
- MIT 18.650: [[3. Parametric Inference]] · [[5. Maximum Likelihood Estimation (cont.)]]
- Khác: [[Law of large numbers]] · [[Markov Chains & Transition Matrices]] · [[Johns Hopkins Poker Course - Lecture 2]] · [[Roulette – Wikipedia tiếng Việt]] · [[Số đề – Wikipedia tiếng Việt]]

> ⚠️ File `Lecture 12 …` trước đây bị Obsidian Web Clipper gán nhầm tiêu đề *"Eminem — Symphonic Orchestra Rebirth"*. Nội dung thật là Stat 110 Lecture 12. Đã đổi tên khi tái cấu trúc.

## Liên kết
[[Knowledge Seed Playbook]] — quy trình đã dùng để dựng vault này.
