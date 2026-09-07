---
tags: [ml, toán, probability, estimation]
status: evergreen
---
# Maximum Likelihood and MAP

> Hai cách trả lời cùng một câu hỏi: "cho dữ liệu này, tham số nào là hợp lý nhất?" MLE chỉ nghe dữ liệu. MAP nghe cả dữ liệu lẫn niềm tin có trước. Khoảng cách giữa chúng chính là **regularization** — và đó là lý do note này quan trọng hơn vẻ ngoài lý thuyết của nó.

## 1. Khái niệm cốt lõi

| | **MLE** (Maximum Likelihood Estimation) | **MAP** (Maximum A Posteriori) |
|---|---|---|
| Cực đại hoá | $P(D\mid\theta)$ | $P(\theta\mid D) \propto P(D\mid\theta)P(\theta)$ |
| Dạng log | $\arg\max_\theta \sum_i \log P(x_i\mid\theta)$ | $\arg\max_\theta \left[\sum_i \log P(x_i\mid\theta) + \log P(\theta)\right] $ |
| Cần prior | Không | Có |
| Ít dữ liệu | **Overfit nặng** | Prior kéo về, ổn định hơn |
| Nhiều dữ liệu | Hội tụ về giá trị thật | Hội tụ về cùng chỗ với MLE |
| Trả về | Một điểm ước lượng | Một điểm ước lượng (mode của posterior) |

> [!note] MAP không phải là Bayes đầy đủ
> Bayes đầy đủ trả về **cả phân phối** posterior. MAP chỉ lấy đỉnh của nó rồi vứt phần còn lại — nên vẫn không cho bạn thanh sai số. Nếu bạn cần khoảng tin cậy chứ không chỉ một con số, MAP là không đủ.

### Cầu nối quan trọng nhất: prior chính là regularizer

Với hồi quy tuyến tính, giả sử nhiễu Gaussian:

| Prior trên $\mathbf{w}$ | MAP tương đương với | Tên gọi ở phía ML |
|---|---|---|
| Không có (phẳng) | Bình phương tối thiểu thuần | [[Linear Regression]] |
| Gaussian $\mathcal{N}(0,\sigma^2\mathbf{I})$ | Bình phương tối thiểu + $\lambda\lVert\mathbf{w}\rVert_2^2$ | **Ridge / weight decay** |
| Laplace $\propto e^{-\lvert w\rvert/b}$ | Bình phương tối thiểu + $\lambda\lVert\mathbf{w}\rVert_1$ | **LASSO** |

Đây là một trong những cây cầu đẹp nhất của ML: cùng một phương trình, đọc từ phía thống kê thì gọi là *prior*, đọc từ phía tối ưu thì gọi là *hình phạt*. Xem [[Regularization]].

Tương tự, **chọn hàm mất mát chính là chọn giả định về nhiễu**:

| Giả định nhiễu | MLE cho ra hàm mất mát |
|---|---|
| Gaussian | MSE (bình phương sai số) |
| Laplace | MAE (trị tuyệt đối) |
| Bernoulli | Binary cross-entropy → [[Logistic Regression]] |
| Categorical | Cross-entropy → [[Softmax Regression]] |

Xem [[Loss Functions]].

## 2. Nguyên tắc / Best practices

1. **Luôn tối ưu log-likelihood, không phải likelihood.** Tích → tổng, tránh underflow, và đạo hàm gọn hơn hẳn.
2. **Đổi dấu để thành bài toán cực tiểu.** `negative log-likelihood` (NLL) là tên chuẩn; mọi thư viện tối ưu đều tìm min chứ không tìm max.
3. **Kiểm tra tính lồi của NLL trước khi chọn optimizer.** NLL của hồi quy logistic là lồi → gradient descent chắc chắn về nghiệm toàn cục. NLL của mạng neuron thì không → xem [[Convex Sets and Functions]].
4. **Chọn prior liên hợp khi có thể.** Cho nghiệm đóng, không cần chạy tối ưu.
5. **Diễn giải $\lambda$ ngược về prior.** $\lambda$ lớn ⟺ prior hẹp ⟺ "tôi rất tin $\mathbf{w}$ gần 0". Cách diễn giải này giúp chọn khoảng tìm kiếm $\lambda$ hợp lý thay vì mò từ $10^{-6}$ đến $10^{6}$.

## 3. Cạm bẫy / Sai lầm hay gặp

- **MLE với ít dữ liệu là công thức của thảm hoạ.** Tung đồng xu 3 lần ra 3 mặt ngửa → MLE kết luận $p=1$, tức "mặt sấp là bất khả thi". Đây không phải ví dụ nhân tạo: nó chính xác là chuyện xảy ra với một từ hiếm trong [[Naive Bayes Classifier]], và Laplace smoothing chính là MAP với prior Beta/Dirichlet.
- **Coi MAP là "MLE có thêm gia vị".** Prior không phải tuỳ chọn thẩm mỹ — nó thay đổi nghiệm. Với dữ liệu nhỏ, hai người chọn prior khác nhau sẽ ra hai kết luận khác nhau, và cả hai đều đúng theo khung của mình.
- **Quên rằng MAP không bất biến với tham số hoá lại.** Mode của phân phối thay đổi khi bạn đổi biến (ví dụ từ $\sigma$ sang $\log\sigma$); trung bình posterior thì không. Nếu kết quả của bạn nhạy với cách viết tham số, đó là dấu hiệu MAP không phải công cụ đúng.
- **Tối ưu likelihood trên chính tập dùng để chọn siêu tham số.** Likelihood trên train luôn tăng khi mô hình phức tạp hơn. Chọn $\lambda$ phải bằng validation — xem [[Model Validation]].
- **Cho rằng "nhiều dữ liệu thì prior không quan trọng" luôn đúng.** Chỉ đúng khi prior có mật độ khác 0 tại giá trị thật. Prior gán xác suất 0 cho một vùng thì **không lượng dữ liệu nào** kéo posterior vào vùng đó được.

## 4. Checklist áp dụng

- [ ] Tôi đang tối ưu log-likelihood hay likelihood?
- [ ] Hàm mất mát tôi chọn tương ứng với giả định nhiễu nào? Giả định đó có hợp với dữ liệu không?
- [ ] Số mẫu của tôi có đủ lớn so với số tham số không? Nếu không, tôi đã thêm prior/regularizer chưa?
- [ ] Có lớp/từ/danh mục nào có số đếm bằng 0 không? Đã smoothing chưa?
- [ ] $\lambda$ của tôi được chọn bằng validation hay bằng cảm tính?
- [ ] Tôi có cần khoảng tin cậy không? Nếu có, MAP là không đủ — cần Bayes đầy đủ.

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.<dist>.fit` | MLE sẵn có cho hầu hết phân phối chuẩn | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/stats.html) |
| `sklearn.linear_model.Ridge` / `Lasso` | MAP với prior Gaussian / Laplace, dưới tên khác | [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html) |
| PyMC / NumPyro | Khi cần posterior đầy đủ chứ không chỉ mode | [pymc.io](https://www.pymc.io/) |
| `statsmodels` | MLE kèm chuẩn sai, p-value — cần cho [[Prediction vs Inference]] | [statsmodels.org](https://www.statsmodels.org/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 4 "Ước lượng tham số mô hình" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Bishop, *Pattern Recognition and Machine Learning*, §1.2.5 "Curve fitting re-visited" & §3.3, Springer 2006
- Murphy, *Probabilistic Machine Learning: An Introduction*, Ch. 4 "Statistics" — [probml.github.io](https://probml.github.io/pml-book/book1.html)
- Goodfellow et al., *Deep Learning*, §5.5 "Maximum Likelihood Estimation" — [deeplearningbook.org](https://www.deeplearningbook.org/contents/ml.html)

## Liên kết

[[Probability for ML]] · [[Regularization]] · [[Loss Functions]] · [[Linear Regression]] · [[Naive Bayes Classifier]] · [[ML]]
