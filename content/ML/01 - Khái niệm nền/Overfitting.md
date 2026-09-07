---
tags: [ml, khái-niệm-nền, overfitting, generalization]
status: evergreen
---
# Overfitting

> Quá khớp là khi mô hình **học thuộc** thay vì **học quy luật**. Đây là hiện tượng trung tâm của ML: nếu không có nó, ta chỉ cần tra bảng. Mọi kỹ thuật ở [[Regularization]] và [[Model Validation]] tồn tại chỉ để chống lại nó.

## 1. Khái niệm cốt lõi

| | Underfitting | Vừa khớp | **Overfitting** |
|---|---|---|---|
| Lỗi trên train | Cao | Thấp | **Rất thấp / bằng 0** |
| Lỗi trên test | Cao | Thấp | **Cao** |
| Khoảng cách train–test | Nhỏ | Nhỏ | **Lớn** |
| Bias | Cao | Cân bằng | Thấp |
| Variance | Thấp | Cân bằng | **Cao** |
| Cách chữa | Mô hình phức tạp hơn, thêm đặc trưng | — | Thêm dữ liệu, regularize, giảm phức tạp |

### Phân tích bias–variance

Sai số kỳ vọng tách thành ba phần:
$$\mathbb{E}[\text{error}] = \underbrace{\text{Bias}^2}_{\text{mô hình quá đơn giản}} + \underbrace{\text{Variance}}_{\text{mô hình quá nhạy với dữ liệu}} + \underbrace{\sigma^2}_{\text{nhiễu không khử được}}$$

Thành phần thứ ba là **sàn không thể vượt qua**. Nếu bạn đang cố đẩy accuracy từ 95% lên 99% mà nhãn của bạn có 3% sai, bạn đang đuổi theo nhiễu.

### Dấu hiệu nhận biết

| Dấu hiệu | Diễn giải |
|---|---|
| Train loss ↓, validation loss ↑ | Overfitting kinh điển — dừng ở điểm validation chạm đáy |
| Train accuracy 100%, test 70% | Học thuộc |
| Kết quả nhảy mạnh khi đổi random seed | Variance cao |
| Thêm dữ liệu làm test error giảm rõ | Đang overfit, thêm dữ liệu là thuốc đúng |
| Thêm dữ liệu **không** giúp gì | Đang underfit hoặc đã chạm sàn nhiễu |

### Nguyên nhân gốc

1. **Mô hình quá phức tạp so với lượng dữ liệu.** Đa thức bậc cao qua ít điểm — hình ảnh kinh điển từ sách.
2. **Số đặc trưng lớn hơn số mẫu** ($d > N$). Toán học đảm bảo luôn tồn tại nghiệm khớp hoàn hảo — xem [[Linear Algebra for ML]].
3. **Nhiễu trong nhãn.** Mô hình đủ mạnh sẽ học thuộc cả phần sai.
4. **Rò rỉ dữ liệu.** Trường hợp tệ nhất: bạn còn không biết mình đang overfit. Xem [[Model Validation]].

## 2. Nguyên tắc / Best practices

1. **Luôn vẽ learning curve** (lỗi theo số mẫu) và **validation curve** (lỗi theo độ phức tạp). Hai đồ thị này nói rõ bạn đang ở nhánh nào và nên làm gì tiếp.
2. **Thêm dữ liệu là thuốc mạnh nhất, khi nó khả thi.** Chính các tác giả FADAML nêu kích thước tập 29.085 mẫu là hạn chế khiến các mô hình mạng neuron trong ensemble không phát huy được.
3. **Bắt đầu từ mô hình đơn giản rồi tăng dần.** Đi từ phức tạp xuống khó hơn nhiều vì bạn không biết mình đã vượt điểm tối ưu từ lúc nào.
4. **Early stopping là regularizer rẻ nhất.** Không tốn gì, chỉ cần theo dõi validation loss.
5. **Nghi ngờ kết quả quá đẹp.** Accuracy 99% trên bài toán khó gần như luôn là leakage, không phải thiên tài.
6. **Chạy nhiều seed và báo cáo độ lệch chuẩn.** Một con số đơn lẻ giấu mất variance — thứ mà bạn đang cố đo.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Overfit lên tập validation.** Bạn thử 200 cấu hình, chọn cái tốt nhất trên validation, rồi báo cáo con số đó. Nó đã bị lạc quan hoá. Phải có tập **test** động vào đúng một lần.
- **Nhầm underfitting với overfitting.** Cả hai đều cho test error cao. Phân biệt bằng **train error**: cao → underfit, gần 0 → overfit. Chữa ngược thì càng làm tệ hơn.
- **Cho rằng mô hình lớn luôn overfit.** Mạng neuron rất lớn thường tổng quát hoá tốt hơn mạng vừa (double descent). "Giảm số tham số" không phải phản xạ đúng trong deep learning.
- **Dùng test set để quyết định bất cứ điều gì.** Nhìn test set một lần để chọn mô hình là đã biến nó thành validation set. Từ đó bạn không còn ước lượng không thiên lệch nào nữa.
- **Bỏ qua nhiễu nhãn.** Nếu chuyên gia không thống nhất được nhãn thì mô hình cũng không. FADAML xử lý điều này bằng cách yêu cầu hai chuyên gia định giá độc lập và chỉ gán nhãn khi họ lệch nhau dưới 10% — rồi kiểm tra lại thủ công một mẫu ngẫu nhiên **lặp đi lặp lại cho tới khi không còn chỉnh sửa nào**.
- **Data augmentation làm rò rỉ giữa train và validation.** Nếu bạn augment **trước** khi chia, ảnh gốc ở train và bản xoay của nó ở validation — điểm validation vô nghĩa.

## 4. Checklist áp dụng

- [ ] Tôi có ghi lại **cả** train error và validation error không?
- [ ] Khoảng cách giữa chúng là bao nhiêu? Đang tăng hay giảm theo epoch?
- [ ] Tôi đã vẽ learning curve chưa? Thêm dữ liệu có giúp không?
- [ ] Tôi đã thử bao nhiêu cấu hình trên tập validation? Con số đó có được ghi lại không?
- [ ] Tập test của tôi có còn nguyên vẹn (chưa dùng để quyết định gì) không?
- [ ] Nhãn của tôi nhiễu tới mức nào? Tôi có ước lượng sàn nhiễu chưa?
- [ ] Kết quả có ổn định qua nhiều random seed không?
- [ ] Nếu train error đã gần 0: tôi đang cần regularize, không phải cần mô hình lớn hơn.

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.model_selection.learning_curve` | Vẽ lỗi theo số mẫu huấn luyện | [scikit-learn.org](https://scikit-learn.org/stable/modules/learning_curve.html) |
| `validation_curve` | Vẽ lỗi theo một siêu tham số | [scikit-learn.org](https://scikit-learn.org/stable/modules/learning_curve.html#validation-curve) |
| TensorBoard / Weights & Biases | Theo dõi train/val loss theo thời gian thực | [tensorboard](https://www.tensorflow.org/tensorboard) · [wandb.ai](https://wandb.ai/) |
| `cleanlab` | Phát hiện nhãn có khả năng sai trong tập dữ liệu | [cleanlab.ai](https://cleanlab.ai/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 8 "Quá khớp" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Hastie, Tibshirani & Friedman, *The Elements of Statistical Learning*, Ch. 7 "Model Assessment and Selection" — [PDF miễn phí](https://hastie.su.domains/ElemStatLearn/)
- Belkin et al., "Reconciling modern machine-learning practice and the classical bias–variance trade-off", *PNAS* 2019 — [arXiv:1812.11118](https://arxiv.org/abs/1812.11118)
- Domingos, "A Few Useful Things to Know about Machine Learning", *CACM* 2012 — [PDF](https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf)

## Liên kết

[[Regularization]] · [[Model Validation]] · [[Evaluation Metrics]] · [[Loss Functions]] · [[ML]]
