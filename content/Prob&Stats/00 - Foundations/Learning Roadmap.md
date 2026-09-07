---
tags: [probability, statistics, foundations, roadmap]
status: evergreen
---
# Learning Roadmap

> Xác suất không học được theo kiểu tra cứu. Nó là một ngôn ngữ — phải đi tuần tự, vì mỗi tầng dùng lại toàn bộ tầng dưới.

## 1. Bốn chặng

| Chặng | Bạn học được gì | Note trong vault | Nguồn chính |
|---|---|---|---|
| **A. Đếm & tiên đề** | Biến câu hỏi thành tập hợp, đếm được | `00 - Foundations` | Stat 110 L1–L3 |
| **B. Conditioning** | Cập nhật niềm tin khi có thông tin mới | `01`, `02` | Stat 110 L4–L6 |
| **C. Biến ngẫu nhiên & kỳ vọng** | Mô hình hoá đại lượng, tính trung bình/độ lệch | `03`, `04`, `05` | Stat 110 L7–L17 |
| **D. Suy diễn** | Đi ngược từ dữ liệu về tham số | `06`, `07`, `08` | MIT 18.650 |

## 2. Thứ tự đọc đề xuất

1. [[Sample Space & Events]] → [[Naive Definition of Probability]] → [[Counting & Combinatorics]]
2. [[Axioms of Probability]] → [[Properties of Probability]] → [[Story Proofs]]
3. [[Conditional Probability]] → [[Law of Total Probability]] → [[Bayes Rule]] → [[Independence]]
4. Làm cho bằng được 4 bài: [[Birthday Problem]], [[Matching Problem]], [[Monty Hall Problem]], [[Gambler's Ruin]]
5. [[Random Variable]] → [[PMF]] → [[CDF]] → [[Discrete vs Continuous]]
6. Học phân phối **theo story, không theo công thức** → [[Distribution Cheatsheet]]
7. [[Expectation]] → [[Linearity of Expectation]] → [[Indicator Random Variables]] → [[Variance]] → [[LOTUS]]
8. [[Law of Large Numbers]] → [[Central Limit Theorem]]
9. [[Statistical Model]] → [[Estimator Quality]] → [[Maximum Likelihood Estimation]]

## 3. Nguyên tắc học

1. **Story trước công thức.** Mỗi phân phối là một câu chuyện ("số lần thành công trong $n$ phép thử độc lập"). Nhớ story thì suy ra được công thức; nhớ công thức thì không suy ra được story.
2. **Luôn hỏi "biến ngẫu nhiên này sống trên sample space nào".** Phần lớn lỗi sai đến từ việc trộn hai sample space khác nhau trong một bài.
3. **Kiểm tra chiều (sanity check)** mọi đáp án: xác suất phải nằm trong $[0,1]$, kỳ vọng phải nằm trong khoảng giá trị có thể, tăng $n$ thì đáp án phải thay đổi đúng chiều.
4. **Làm bài tập bằng tay ít nhất một lần**, rồi mô phỏng bằng code để kiểm chứng. Simulation là công cụ tự chấm bài tốt nhất.
5. **Đọc lại sau 1 tháng.** Conditioning là thứ ai cũng nghĩ mình hiểu ở lần đầu.

## 4. Cạm bẫy khi tự học

- **Nhảy thẳng vào thống kê suy diễn** khi chưa vững kỳ vọng/phương sai → sẽ học vẹt công thức $t$-test mà không hiểu vì sao có $\sqrt{n}$.
- **Học phân phối như một danh sách** thay vì như một họ có quan hệ (Bernoulli → Binomial → Poisson; Geometric → Negative Binomial; Uniform → mọi thứ qua [[Uniform Distribution]]).
- **Bỏ qua phần chứng minh** vì "chỉ cần dùng". Story proof (→ [[Story Proofs]]) chính là phần giúp nhớ lâu nhất.
- **Không viết code.** Một mô phỏng 20 dòng giải quyết được tranh cãi Monty Hall nhanh hơn 2 giờ tranh luận.

## 5. Checklist tự đánh giá
- [ ] Giải thích được vì sao [[Naive Definition of Probability]] sai trong bài "có sự sống trên sao Hải Vương không"?
- [ ] Viết được công thức Bayes ở dạng odds mà không tra?
- [ ] Phân biệt được $P(A|B)$ và $P(B|A)$ bằng một ví dụ y khoa cụ thể?
- [ ] Tính được $E[X]$ của Hypergeometric bằng [[Linearity of Expectation]] trong dưới 3 dòng?
- [ ] Nói được vì sao CLT cần phương sai hữu hạn?
- [ ] Giải thích được "khoảng tin cậy 95%" mà không dùng câu "xác suất $\theta$ nằm trong khoảng là 95%"?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Seeing Theory | Trực quan tương tác từng khái niệm | https://seeing-theory.brown.edu |
| Probability Cheatsheet | 10 trang tóm tắt toàn bộ Stat 110 | https://github.com/wzchen/probability_cheatsheet |
| SciPy `scipy.stats` | Mô phỏng & kiểm chứng bằng Python | https://docs.scipy.org/doc/scipy/reference/stats.html |
| Stat 110 Strategic Practice | Bài tập có lời giải theo tuần | https://projects.iq.harvard.edu/stat110/strategic-practice-problems |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*: http://probabilitybook.net
- Harvard Stat 110 — trang khoá học: https://projects.iq.harvard.edu/stat110
- MIT OCW 18.650: https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/
- Wasserman — *All of Statistics*: https://link.springer.com/book/10.1007/978-0-387-21736-9

## Liên kết
[[Sample Space & Events]] · [[Story Proofs]] · [[Distribution Cheatsheet]] · [[Prob&Stats]]
