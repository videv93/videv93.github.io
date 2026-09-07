---
tags: [ml, optimization, neural-network]
status: evergreen
---
# Gradient Descent

> Thuật toán chạy phía sau gần như mọi mô hình ML hiện đại. Ý tưởng chỉ là: **đi ngược hướng dốc**. Toàn bộ độ khó nằm ở việc đi **bao xa** mỗi bước và biết **khi nào dừng**.

## 1. Khái niệm cốt lõi

$$\theta_{t+1} = \theta_t - \eta \nabla_\theta J(\theta_t)$$

| Thành phần | Vai trò | Hỏng khi |
|---|---|---|
| $\nabla_\theta J$ | Hướng tăng nhanh nhất → đi ngược lại | Gradient sai (xem [[Matrix Calculus]]) |
| $\eta$ (learning rate) | Độ dài bước | Quá lớn → phân kỳ; quá nhỏ → không bao giờ tới |
| Điều kiện dừng | Khi nào ngừng lặp | Dừng sớm/muộn đều tốn |

### Vì sao đi ngược gradient

Gradient chỉ hướng **tăng** nhanh nhất của hàm tại một điểm. Với hàm một biến, điều này rút gọn thành trực giác đơn giản: $f'(x) > 0$ (đang lên dốc) → lùi lại; $f'(x) < 0$ (đang xuống dốc) → tiến lên. Công thức $x \leftarrow x - \eta f'(x)$ làm đúng cả hai trường hợp.

### Learning rate — bảng chẩn đoán

| Triệu chứng của loss | Nguyên nhân | Xử lý |
|---|---|---|
| Tăng vọt lên `NaN`/`inf` | $\eta$ quá lớn | Giảm 10 lần |
| Dao động lên xuống quanh một mức | $\eta$ hơi lớn | Giảm 3 lần, hoặc dùng scheduler |
| Giảm rất chậm, gần như phẳng | $\eta$ quá nhỏ | Tăng 3–10 lần |
| Giảm rồi phẳng ở mức cao | Kẹt vùng phẳng / plateau | Thêm momentum, xem [[Gradient Descent Variants]] |
| Giảm đẹp rồi phẳng ở mức thấp | Đang hội tụ | Bình thường |

**Cách tìm $\eta$ hiệu quả nhất:** LR range test — tăng $\eta$ theo cấp số nhân qua vài trăm bước, vẽ loss theo $\eta$, chọn giá trị ngay **trước** điểm loss bắt đầu tăng.

### Điều kiện dừng

| Tiêu chí | Công thức | Ghi chú |
|---|---|---|
| Số bước tối đa | $t > T$ | Luôn phải có, làm chốt an toàn |
| Gradient nhỏ | $\lVert\nabla J\rVert < \varepsilon$ | Đúng về lý thuyết; hiếm đạt được trong deep learning |
| Loss không đổi | $\lvert J_t - J_{t-1}\rvert < \varepsilon$ | Dễ dừng nhầm ở plateau |
| **Validation loss không cải thiện** | Patience $p$ epoch | **Tiêu chí đúng trong thực tế** — chính là early stopping ở [[Regularization]] |

### Vì sao GD chỉ đảm bảo cực tiểu địa phương

Với hàm **lồi** ([[Convex Sets and Functions]]), cực tiểu địa phương = toàn cục → GD đảm bảo đúng đích. [[Linear Regression]], [[Logistic Regression]], [[Softmax Regression]] đều thuộc nhóm này.

Với mạng neuron thì không lồi. Nhưng thực nghiệm cho thấy ở chiều rất cao, **điểm yên ngựa (saddle point) mới là vấn đề chính**, không phải cực tiểu địa phương tồi — và momentum giúp thoát khỏi chúng.

## 2. Nguyên tắc / Best practices

1. **Kiểm tra gradient bằng số trước khi train.** Xem [[Matrix Calculus]]. Bỏ qua bước này là tự nguyện debug mù.
2. **Chuẩn hoá đặc trưng.** Đặc trưng có thang lệch nhau tạo "thung lũng hẹp" — GD sẽ ziczac chậm chạp. Chuẩn hoá làm mặt lỗi tròn hơn và tăng tốc hội tụ nhiều lần.
3. **Vẽ loss theo bước lặp, mỗi lần chạy.** Không có đồ thị này thì bạn đang đoán.
4. **Dùng learning rate schedule.** Cosine decay hoặc step decay gần như luôn tốt hơn $\eta$ cố định.
5. **Luôn có giới hạn số bước.** Điều kiện hội tụ có thể không bao giờ thoả.
6. **Chạy overfit 10 mẫu để kiểm tra pipeline.** Nếu không đạt loss ≈ 0, có bug — đừng đổ lỗi cho learning rate.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Đổi learning rate mà không đổi gì khác rồi kết luận "mô hình tệ".** $\eta$ là siêu tham số nhạy nhất. Dò nó theo bậc độ lớn ($10^{-1}$ đến $10^{-5}$) trước khi kết luận bất cứ điều gì về kiến trúc.
- **Không chuẩn hoá rồi thắc mắc vì sao hội tụ chậm.** Số điều kiện của Hessian quyết định tốc độ; chuẩn hoá là cách rẻ nhất để cải thiện nó.
- **Nhầm loss trung bình với loss tổng.** Nếu lấy tổng, $\eta$ hiệu dụng tỉ lệ với batch size — đổi batch size thì phải đổi $\eta$ theo, và người ta thường không nhớ điều đó.
- **Gradient nổ (exploding).** Loss thành `NaN` sau vài bước. Dùng gradient clipping (`clip_grad_norm_`), giảm $\eta$, kiểm tra khởi tạo.
- **Gradient biến mất (vanishing).** Loss đứng yên hoàn toàn ở mạng sâu. Nguyên nhân gần như luôn là hàm kích hoạt bão hoà — xem [[Activation Functions]].
- **Dừng theo train loss.** Train loss luôn giảm; nó không nói gì về tổng quát hoá. Dừng theo validation.
- **Tin rằng "hội tụ" nghĩa là "tìm được nghiệm tốt nhất".** Với bài toán không lồi, hội tụ chỉ nghĩa là dừng lại ở một điểm. Chạy nhiều seed.

## 4. Checklist áp dụng

- [ ] Tôi đã kiểm tra gradient bằng số chưa?
- [ ] Đặc trưng đã được chuẩn hoá chưa?
- [ ] Tôi đã vẽ loss theo bước lặp chưa? Đồ thị trông như thế nào trong bảng chẩn đoán ở trên?
- [ ] $\eta$ được dò theo bậc độ lớn hay chỉ lấy giá trị mặc định?
- [ ] Tôi có dùng learning rate schedule không?
- [ ] Loss được trung bình theo batch chứ không lấy tổng?
- [ ] Điều kiện dừng của tôi dựa trên **validation** loss?
- [ ] Tôi đã thử overfit 10 mẫu để xác nhận pipeline đúng chưa?
- [ ] Với bài toán không lồi: tôi đã chạy nhiều seed và báo cáo khoảng kết quả chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `torch.optim.SGD` | GD/SGD cơ bản, có `momentum`, `nesterov` | [pytorch.org](https://pytorch.org/docs/stable/optim.html) |
| `torch.optim.lr_scheduler` | `CosineAnnealingLR`, `ReduceLROnPlateau`, `OneCycleLR` | [pytorch.org](https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate) |
| `torch.nn.utils.clip_grad_norm_` | Chống gradient nổ | [pytorch.org](https://pytorch.org/docs/stable/generated/torch.nn.utils.clip_grad_norm_.html) |
| `sklearn.linear_model.SGDClassifier` | GD cho mô hình tuyến tính, không cần deep learning framework | [scikit-learn.org](https://scikit-learn.org/stable/modules/sgd.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 12 "Gradient descent" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Ruder, "An overview of gradient descent optimization algorithms" — [arXiv:1609.04747](https://arxiv.org/abs/1609.04747)
- Goodfellow et al., *Deep Learning*, Ch. 8 "Optimization for Training Deep Models" — [deeplearningbook.org](https://www.deeplearningbook.org/contents/optimization.html)
- Smith, "Cyclical Learning Rates for Training Neural Networks" (LR range test) — [arXiv:1506.01186](https://arxiv.org/abs/1506.01186)

## Liên kết

[[Gradient Descent Variants]] · [[Matrix Calculus]] · [[Convex Sets and Functions]] · [[Backpropagation]] · [[ML]]
