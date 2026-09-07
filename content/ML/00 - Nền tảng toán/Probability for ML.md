---
tags: [ml, toán, probability, statistics]
status: evergreen
---
# Probability for ML

> Xác suất là cách ML nói về **sự không chắc chắn**. Mô hình không trả lời "ảnh này là mèo" mà trả lời "80% là mèo" — và toàn bộ khác biệt giữa một mô hình dùng được và một mô hình nguy hiểm nằm ở chỗ con số 80% đó có đáng tin hay không.

## 1. Khái niệm cốt lõi

| Khái niệm | Công thức | Dùng ở đâu trong vault |
|---|---|---|
| Xác suất có điều kiện | $P(A\mid B) = P(A,B)/P(B)$ | Mọi mô hình phân loại |
| Quy tắc nhân | $P(A,B) = P(A\mid B)P(B)$ | Dẫn giải likelihood |
| Quy tắc cộng (marginal) | $P(A) = \sum_B P(A,B)$ | Loại bỏ biến ẩn |
| **Định lý Bayes** | $P(\theta\mid D) = \dfrac{P(D\mid\theta)P(\theta)}{P(D)}$ | [[Maximum Likelihood and MAP]], [[Naive Bayes Classifier]] |
| Độc lập | $P(A,B) = P(A)P(B)$ | Giả định cốt lõi của [[Naive Bayes Classifier]] |
| Độc lập có điều kiện | $P(A,B\mid C) = P(A\mid C)P(B\mid C)$ | Giả định *thật sự* của naive Bayes |
| Kỳ vọng, phương sai | $\mathbb{E}[X]$, $\text{Var}(X)$ | Bias–variance ở [[Overfitting]] |

**Bốn thành phần của Bayes**, gọi đúng tên vì chúng xuất hiện khắp nơi:

- $P(D\mid\theta)$ — **likelihood**: dữ liệu khớp tham số tới đâu
- $P(\theta)$ — **prior**: tôi tin gì trước khi nhìn dữ liệu
- $P(\theta\mid D)$ — **posterior**: tôi tin gì sau khi nhìn dữ liệu
- $P(D)$ — **evidence**: hằng số chuẩn hoá, thường bỏ qua khi chỉ cần argmax

### Các phân phối thường gặp

| Phân phối | Miền | Tham số | Xuất hiện khi |
|---|---|---|---|
| Bernoulli | $\{0,1\}$ | $p$ | Nhãn nhị phân → [[Logistic Regression]] |
| Categorical | $\{1..K\}$ | $\mathbf{p}$ | Nhãn đa lớp → [[Softmax Regression]] |
| Binomial | $\{0..n\}$ | $n, p$ | Đếm số lần thành công |
| Multinomial | vector đếm | $n, \mathbf{p}$ | Đếm từ trong văn bản → naive Bayes cho text |
| Beta | $[0,1]$ | $\alpha,\beta$ | **Prior liên hợp** của Bernoulli |
| Dirichlet | simplex | $\boldsymbol{\alpha}$ | Prior liên hợp của Categorical |
| Gaussian (Normal) | $\mathbb{R}$ | $\mu,\sigma^2$ | Nhiễu đo đạc → nền của [[Linear Regression]] |
| Gaussian nhiều chiều | $\mathbb{R}^d$ | $\boldsymbol{\mu},\boldsymbol{\Sigma}$ | [[Linear Discriminant Analysis]] |

> [!note] Prior liên hợp (conjugate prior)
> Khi prior và posterior **cùng họ phân phối**, posterior có công thức đóng — không cần lấy mẫu. Beta là liên hợp của Bernoulli, Dirichlet của Categorical, Gaussian của Gaussian (khi biết phương sai). Đây là lý do kỹ thuật khiến Laplace smoothing ở [[Naive Bayes Classifier]] chỉ là "cộng thêm $\alpha$ vào đếm" — nó chính là một Dirichlet prior trá hình.

## 2. Nguyên tắc / Best practices

1. **Luôn làm việc với log-probability.** Nhân hàng nghìn số nhỏ hơn 1 sẽ underflow về 0. $\log P(A,B) = \log P(A) + \log P(B)$ vừa ổn định vừa nhanh hơn.
2. **Dùng log-sum-exp trick khi phải cộng xác suất trong miền log.** `scipy.special.logsumexp` — trừ giá trị lớn nhất ra trước khi `exp`. Cùng thủ thuật này cứu [[Softmax Regression]] khỏi tràn số.
3. **Phân biệt likelihood và xác suất.** $P(D\mid\theta)$ đọc theo $D$ là phân phối xác suất (tổng bằng 1); đọc theo $\theta$ là **likelihood** và **không** tổng bằng 1. Nhầm hai thứ này là gốc của mọi hiểu lầm về p-value.
4. **Prior là giả định, không phải sự thật.** Ghi rõ prior bạn chọn và vì sao. Với ít dữ liệu, prior quyết định kết quả; với nhiều dữ liệu, nó bị likelihood nhấn chìm.
5. **Kiểm tra calibration, không chỉ accuracy.** Trong 100 mẫu mô hình nói "80% chắc", có đúng khoảng 80 mẫu đúng không? Xem [[Evaluation Metrics]].

## 3. Cạm bẫy / Sai lầm hay gặp

- **Nghịch lý tỉ lệ nền (base rate fallacy).** Test có độ nhạy 99% cho bệnh hiếm tỉ lệ 1/10.000: kết quả dương tính chỉ có ~1% khả năng là bệnh thật. Đây **không phải** ví dụ sách vở — nó là lý do một bộ phát hiện gian lận với "99% accuracy" có thể vô dụng khi gian lận chỉ chiếm 0.1%. Xem [[Evaluation Metrics]].
- **Nhầm $P(A\mid B)$ với $P(B\mid A)$.** "90% người bệnh có triệu chứng này" ≠ "90% người có triệu chứng này bị bệnh". Sai lầm phổ biến nhất trong cả toán lẫn đời sống.
- **Giả định độc lập mà không kiểm chứng.** Trong [[FADAML Case Study]], các từ trong một tin rao bất động sản rõ ràng **không** độc lập. Naive Bayes vẫn chạy được — nhưng xác suất nó xuất ra thì không đáng tin, chỉ thứ tự xếp hạng là đáng tin.
- **Xác suất 0 huỷ hoại toàn bộ tích.** Một từ chưa từng thấy trong tập huấn luyện → $P = 0$ → cả tích về 0. Bắt buộc phải smoothing.
- **Dùng Gaussian cho dữ liệu lệch mạnh.** Giá bất động sản có đuôi phải rất dài. Lấy $\log$ trước, đó chính là lý do mô hình hedonic ở [[Hedonic Pricing and GIS]] dùng dạng semi-log.

## 4. Checklist áp dụng

- [ ] Tôi đang tính $P(A\mid B)$ hay $P(B\mid A)$? Viết ra rõ ràng chưa?
- [ ] Tôi có đang nhân nhiều xác suất mà không chuyển sang miền log không?
- [ ] Có giá trị xác suất nào bằng 0 trong tính toán của tôi không? Đã smoothing chưa?
- [ ] Tỉ lệ nền (base rate) của lớp dương là bao nhiêu? Metric của tôi có tính đến nó không?
- [ ] Tôi giả định độc lập ở đâu? Giả định đó có hợp lý với dữ liệu này không?
- [ ] Biến mục tiêu của tôi có lệch không? Đã cân nhắc biến đổi $\log$ chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats` | Toàn bộ phân phối chuẩn, `pdf`/`cdf`/`rvs`/`fit` | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/stats.html) |
| `scipy.special.logsumexp` | Cộng xác suất trong miền log mà không tràn số | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.logsumexp.html) |
| PyMC | Suy diễn Bayes bằng MCMC khi không có nghiệm đóng | [pymc.io](https://www.pymc.io/) |
| Seeing Theory | Trực quan hoá tương tác các khái niệm xác suất | [seeing-theory.brown.edu](https://seeing-theory.brown.edu/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 3 "Ôn tập Xác suất" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Bishop, *Pattern Recognition and Machine Learning*, Ch. 1.2 & Ch. 2 "Probability Distributions", Springer 2006
- Deisenroth et al., *Mathematics for Machine Learning*, Ch. 6 "Probability and Distributions" — [mml-book.github.io](https://mml-book.github.io/)
- Kahneman & Tversky, base rate fallacy — tóm tắt tại [Wikipedia: Base rate fallacy](https://en.wikipedia.org/wiki/Base_rate_fallacy)

## Liên kết

[[Maximum Likelihood and MAP]] · [[Naive Bayes Classifier]] · [[Evaluation Metrics]] · [[Loss Functions]] · [[ML]]
