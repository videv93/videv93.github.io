---
tags: [ml, thuật-toán, classification, supervised]
status: evergreen
---
# Logistic Regression

> Tên gọi gây hiểu lầm: đây là mô hình **phân loại**, không phải hồi quy. Nó là baseline mặc định đúng cho mọi bài toán phân loại nhị phân — nhanh, lồi, cho xác suất calibrate tốt, và hệ số đọc được.

## 1. Khái niệm cốt lõi

$$P(y=1\mid\mathbf{x}) = \sigma(\mathbf{w}^T\mathbf{x}), \qquad \sigma(z) = \frac{1}{1+e^{-z}}$$

Hàm **sigmoid** ép $\mathbb{R}$ về $(0,1)$ để đọc được như xác suất.

Tính chất đạo hàm đặc biệt gọn, và đó là lý do sigmoid được chọn:
$$\sigma'(z) = \sigma(z)(1-\sigma(z))$$

### Hàm mất mát

Binary cross-entropy, đến thẳng từ MLE với giả định Bernoulli ([[Maximum Likelihood and MAP]]):
$$J(\mathbf{w}) = -\frac{1}{N}\sum_i\left[y_i\log p_i + (1-y_i)\log(1-p_i)\right]$$

Gradient có dạng **cực kỳ gọn**:
$$\nabla_\mathbf{w} J = \frac{1}{N}\sum_i (p_i - y_i)\mathbf{x}_i$$

Đây chính là dạng "sai số × đầu vào" xuất hiện lại ở [[Softmax Regression]] và ở tầng cuối của mọi mạng phân loại — không phải trùng hợp.

$J$ **lồi** theo $\mathbf{w}$ ⟹ [[Gradient Descent]] đảm bảo tìm được nghiệm toàn cục.

### Diễn giải hệ số — log-odds

$$\log\frac{P(y=1)}{P(y=0)} = \mathbf{w}^T\mathbf{x}$$

Vế trái là **log-odds** (logit). Nghĩa là: mô hình tuyến tính **trong không gian log-odds**, phi tuyến trong không gian xác suất.

| Diễn giải | Phát biểu |
|---|---|
| $w_j$ | Mỗi đơn vị tăng của $x_j$ làm log-odds tăng $w_j$ |
| $e^{w_j}$ | **Odds ratio** — odds nhân lên $e^{w_j}$ lần |
| $w_j = 0.7$ | $e^{0.7}\approx 2$ → odds gấp đôi |

Đây là lý do logistic regression thống trị y tế và kinh tế lượng: odds ratio là ngôn ngữ chuẩn của các ngành đó. Xem [[Prediction vs Inference]].

### Ranh giới quyết định

$\mathbf{w}^T\mathbf{x} = 0$ là một **siêu phẳng** — logistic regression luôn cho ranh giới tuyến tính. Muốn ranh giới cong: thêm đặc trưng đa thức, hoặc chuyển sang [[Kernel SVM]] / [[Multilayer Perceptron]].

### Đa lớp

| Cách | Mô tả | Khi nào |
|---|---|---|
| One-vs-Rest (OvR) | $K$ bộ phân loại nhị phân | Mặc định của sklearn cũ; xác suất không tổng 1 |
| **Softmax / multinomial** | Một mô hình chung | Đúng hơn về mặt xác suất — xem [[Softmax Regression]] |

## 2. Nguyên tắc / Best practices

1. **Dùng làm baseline cho mọi bài toán phân loại.** Nếu mô hình phức tạp không vượt nó rõ rệt, hãy chọn nó.
2. **Chuẩn hoá đặc trưng.** Bắt buộc khi có regularization (mà sklearn bật mặc định với `C=1.0`).
3. **Dùng `class_weight='balanced'` khi lớp mất cân bằng.**
4. **Chọn ngưỡng riêng, đừng mặc định 0.5.** Ngưỡng 0.5 chỉ tối ưu khi hai loại sai có chi phí bằng nhau — hiếm khi đúng. Xem [[Evaluation Metrics]].
5. **Dùng `LogisticRegressionCV` để dò $C$.** Chú ý: sklearn dùng $C = 1/\lambda$ — $C$ **nhỏ** nghĩa là regularize **mạnh**. Dấu ngược này gây nhầm liên tục.
6. **Nếu cần p-value và khoảng tin cậy, dùng `statsmodels`.** sklearn không cung cấp chúng, và đó là lựa chọn thiết kế có chủ đích.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Nhầm $C$ với $\lambda$.** `C=0.01` là regularization rất mạnh, không phải rất yếu. Lỗi này khiến người ta kết luận sai về mô hình.
- **Tách hoàn hảo (perfect separation).** Nếu dữ liệu tách được tuyến tính hoàn toàn, MLE không tồn tại — $\lVert\mathbf{w}\rVert$ tiến ra vô cùng. Triệu chứng: hệ số khổng lồ (hàng trăm, hàng nghìn). Regularization sửa được ngay lập tức. Đây là chỗ perceptron "thành công" còn logistic regression "thất bại" — và thất bại đó lại đúng đắn hơn.
- **Diễn giải $w_j$ như xác suất.** $w_j$ ở thang log-odds, không phải thang xác suất. Cùng một $w_j$ tạo thay đổi xác suất rất khác nhau tuỳ điểm xuất phát: từ 0.5 lên 0.6 dễ hơn nhiều so với từ 0.95 lên 0.99.
- **Đọc hệ số như quan hệ nhân quả.** Cùng cảnh báo với [[Linear Regression]] — hệ số là tương quan có điều kiện trên các biến khác trong mô hình.
- **Đa cộng tuyến làm hệ số bất ổn.** Dự đoán vẫn tốt, diễn giải thì vô nghĩa.
- **Quên rằng ranh giới luôn tuyến tính.** Nếu mô hình cho kết quả kém trên dữ liệu rõ ràng phi tuyến, vấn đề không phải là dò thêm siêu tham số.
- **Tự cài `log(sigmoid(z))`.** Với $z$ rất âm, `sigmoid(z)` underflow về 0 và `log(0) = -inf`. Dùng `BCEWithLogitsLoss` hoặc `log_sigmoid` ổn định số.

## 4. Checklist áp dụng

- [ ] Đặc trưng đã được chuẩn hoá chưa?
- [ ] Tôi hiểu $C = 1/\lambda$ chứ? $C$ tôi chọn tương ứng với mức regularization nào?
- [ ] Hệ số có giá trị bất thường lớn không (dấu hiệu tách hoàn hảo)?
- [ ] Lớp có mất cân bằng không? Tôi đã đặt `class_weight` chưa?
- [ ] Ngưỡng quyết định của tôi là bao nhiêu, và nó được chọn trên validation set chứ?
- [ ] Xác suất mô hình xuất ra có calibrate không? Tôi đã vẽ reliability diagram chưa?
- [ ] Nếu diễn giải hệ số: tôi đã kiểm tra đa cộng tuyến (VIF) chưa?
- [ ] Ranh giới tuyến tính có đủ cho bài toán này không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.linear_model.LogisticRegression` | Nhiều solver (`lbfgs`, `saga`), hỗ trợ $\ell_1/\ell_2$/elasticnet | [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) |
| `LogisticRegressionCV` | Tự dò $C$ bằng cross-validation | [scikit-learn.org](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegressionCV.html) |
| `statsmodels.Logit` | Bảng đầy đủ: hệ số, chuẩn sai, p-value, pseudo-$R^2$ | [statsmodels.org](https://www.statsmodels.org/stable/discretemod.html) |
| `torch.nn.BCEWithLogitsLoss` | Sigmoid + cross-entropy ổn định số | [pytorch.org](https://pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 14 "Hồi quy logistic" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Hastie et al., *The Elements of Statistical Learning*, §4.4 "Logistic Regression" — [PDF miễn phí](https://hastie.su.domains/ElemStatLearn/)
- scikit-learn, *Logistic regression* — [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression)
- Bishop, *Pattern Recognition and Machine Learning*, §4.3 "Probabilistic Discriminative Models", Springer 2006

## Liên kết

[[Softmax Regression]] · [[Perceptron Learning Algorithm]] · [[Loss Functions]] · [[Evaluation Metrics]] · [[Prediction vs Inference]] · [[ML]]
