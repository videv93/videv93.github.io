---
tags: [ml, thuật-toán, classification, supervised]
status: evergreen
---
# Softmax Regression

> Tổng quát hoá [[Logistic Regression]] cho $K$ lớp. Nó là **tầng cuối của gần như mọi mạng phân loại** trên đời — hiểu kỹ nó là hiểu cách một mạng neuron biến điểm số thành xác suất.

## 1. Khái niệm cốt lõi

Với $K$ lớp, mô hình tính $K$ điểm số (**logits**) $z_k = \mathbf{w}_k^T\mathbf{x}$ rồi chuẩn hoá:

$$p_k = \text{softmax}(\mathbf{z})_k = \frac{e^{z_k}}{\sum_{j=1}^{K} e^{z_j}}$$

Kết quả: $p_k > 0$ và $\sum_k p_k = 1$ — một phân phối xác suất hợp lệ.

### Ba tính chất phải nhớ

| Tính chất | Phát biểu | Hệ quả |
|---|---|---|
| **Bất biến với dịch chuyển** | $\text{softmax}(\mathbf{z} + c) = \text{softmax}(\mathbf{z})$ | Nền của thủ thuật ổn định số |
| **Dư thừa tham số** | Cộng cùng một vector vào mọi $\mathbf{w}_k$ không đổi kết quả | Nghiệm không duy nhất → cần [[Regularization]] |
| **$K=2$ quy về sigmoid** | Softmax 2 lớp ≡ logistic regression | Hai mô hình là một |

### Ổn định số — thủ thuật bắt buộc

$e^{z}$ với $z = 1000$ cho `inf`. Nhờ tính bất biến dịch chuyển, luôn trừ đi giá trị lớn nhất trước:

```python
def softmax_stable(Z):
    # Z shape (N, K) — mỗi hàng một mẫu
    Z = Z - Z.max(axis=1, keepdims=True)   # dòng quan trọng nhất
    e = np.exp(Z)
    return e / e.sum(axis=1, keepdims=True)
```

Bỏ dòng thứ hai thì hàm chạy đúng trên dữ liệu đồ chơi và **tràn số trên dữ liệu thật** — một bug tuyệt vời để tự học cách debug.

### Hàm mất mát và gradient

Cross-entropy với nhãn one-hot $\mathbf{y}$:
$$J = -\frac{1}{N}\sum_i\sum_k y_{ik}\log p_{ik}$$

Gradient — vẫn dạng "sai số × đầu vào" quen thuộc:
$$\nabla_{\mathbf{W}} J = \frac{1}{N}\,\mathbf{X}(\mathbf{P} - \mathbf{Y})^T$$

Sự gọn gàng này không ngẫu nhiên: nó là đặc điểm chung của cặp (hàm liên kết chuẩn tắc, log-likelihood) trong họ mô hình tuyến tính tổng quát.

$J$ **lồi** theo $\mathbf{W}$ ⟹ nghiệm toàn cục đảm bảo.

### Softmax vs sigmoid: chọn cái nào

| | Softmax | $K$ sigmoid độc lập |
|---|---|---|
| Ràng buộc | $\sum_k p_k = 1$ | Mỗi $p_k$ độc lập |
| Bài toán | **Đa lớp** (mỗi mẫu đúng một nhãn) | **Đa nhãn** (mỗi mẫu nhiều nhãn) |
| Ví dụ | Chữ số 0–9 | Ảnh chứa {mèo, chó, cây} |
| PyTorch | `CrossEntropyLoss` | `BCEWithLogitsLoss` |

Chọn nhầm là lỗi thiết kế phổ biến: dùng softmax cho bài toán đa nhãn sẽ khiến các lớp **cạnh tranh** với nhau một cách vô lý — nhận diện được một mèo sẽ làm giảm xác suất có một cái cây trong cùng bức ảnh.

## 2. Nguyên tắc / Best practices

1. **Đừng bao giờ tự viết softmax + log riêng rẽ.** `torch.nn.CrossEntropyLoss` nhận **logits thô** và đã gộp log-softmax bên trong một cách ổn định số.
2. **Kiểm tra loss ban đầu ≈ $\log K$.** Với 10 lớp cân bằng, cross-entropy khởi đầu phải quanh 2.303. Lệch nhiều = khởi tạo sai hoặc nhãn sai.
3. **Nhớ kiểm tra shape của nhãn.** PyTorch `CrossEntropyLoss` nhận **chỉ số lớp** (`long`), không nhận one-hot. Đây là lỗi kiểu dữ liệu thường gặp nhất khi mới dùng.
4. **Dùng nhiệt độ (temperature) khi cần điều chỉnh độ tự tin.** $\text{softmax}(\mathbf{z}/T)$: $T>1$ làm phân phối mềm hơn, $T<1$ nhọn hơn. Đây là cách calibrate rẻ nhất và là nền của knowledge distillation.
5. **Với $K$ rất lớn** (hàng chục nghìn lớp, ví dụ mô hình ngôn ngữ), softmax đầy đủ là nút thắt. Dùng hierarchical softmax hoặc sampled softmax.
6. **Regularize để khử dư thừa tham số.** Nếu không, nghiệm trôi tự do và hệ số không diễn giải được.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Quên trừ max → tràn số.** Xem trên. Triệu chứng: `nan` xuất hiện đột ngột sau vài chục bước.
- **Áp softmax hai lần.** Cho đầu ra đã qua `softmax()` vào `CrossEntropyLoss` (vốn đã có log-softmax bên trong). Mô hình vẫn train, chậm và tệ hơn nhiều — và không có thông báo lỗi nào.
- **Dùng softmax cho bài toán đa nhãn.** Xem bảng ở trên.
- **Diễn giải xác suất softmax như độ tin cậy đã calibrate.** Mạng neuron hiện đại nổi tiếng **quá tự tin**: xuất ra 0.99 cho những mẫu nó sai. Cần temperature scaling để sửa.
- **Cho rằng softmax "chọn max".** Nó là **soft**max — một xấp xỉ mềm, khả vi của argmax. Với logits gần nhau, nó trả về phân phối gần đều, đúng như thiết kế.
- **So sánh logits giữa hai mô hình khác nhau.** Logits chỉ có nghĩa tương đối trong cùng một vector. Chỉ xác suất sau chuẩn hoá mới so sánh được.
- **Đưa nhãn one-hot vào `CrossEntropyLoss` của PyTorch.** Xem best practice số 3.

## 4. Checklist áp dụng

- [ ] Bài toán của tôi là **đa lớp** hay **đa nhãn**? Tôi chọn đúng hàm chưa?
- [ ] Tôi có đang truyền logits thô vào loss function chứ không phải xác suất đã softmax?
- [ ] Loss ở bước 0 có xấp xỉ $\log K$ không?
- [ ] Kiểu và shape của nhãn có khớp với yêu cầu của loss function không?
- [ ] Nếu tự cài đặt: tôi đã trừ max trước khi `exp` chưa?
- [ ] Tôi có regularize để khử dư thừa tham số không?
- [ ] Nếu dùng xác suất để ra quyết định: tôi đã calibrate (temperature scaling) chưa?
- [ ] Với $K$ rất lớn: softmax đầy đủ có phải nút thắt tính toán không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `torch.nn.CrossEntropyLoss` | Nhận logits thô; đã gồm log-softmax ổn định số | [pytorch.org](https://pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html) |
| `scipy.special.softmax` / `logsumexp` | Cài đặt ổn định số sẵn có | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/special.html) |
| `sklearn.linear_model.LogisticRegression(multi_class='multinomial')` | Softmax regression trong sklearn | [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) |
| `netcal` / temperature scaling | Hiệu chỉnh độ tự tin của mạng neuron | [github.com/EFS-OpenSource/calibration-framework](https://github.com/EFS-OpenSource/calibration-framework) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 15 "Hồi quy softmax" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Guo et al., "On Calibration of Modern Neural Networks", ICML 2017 — [arXiv:1706.04599](https://arxiv.org/abs/1706.04599)
- Goodfellow et al., *Deep Learning*, §6.2.2 "Output Units" — [deeplearningbook.org](https://www.deeplearningbook.org/contents/mlp.html)
- CS231n, *Linear Classification: Softmax classifier* — [cs231n.github.io](https://cs231n.github.io/linear-classify/)

## Liên kết

[[Logistic Regression]] · [[Loss Functions]] · [[Multilayer Perceptron]] · [[Activation Functions]] · [[ML]]
