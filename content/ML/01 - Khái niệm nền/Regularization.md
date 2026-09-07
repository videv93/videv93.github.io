---
tags: [ml, khái-niệm-nền, regularization]
status: evergreen
---
# Regularization

> Regularization là **cố ý làm mô hình khó khớp dữ liệu hơn** để nó tổng quát hoá tốt hơn. Nghe nghịch lý, cho tới khi bạn nhớ rằng dữ liệu huấn luyện chứa cả quy luật lẫn nhiễu, và mô hình không tự phân biệt được hai thứ đó.

## 1. Khái niệm cốt lõi

Hàm mục tiêu có regularizer:
$$J(\mathbf{w}) = \underbrace{\mathcal{L}(\mathbf{w})}_{\text{khớp dữ liệu}} + \lambda \underbrace{R(\mathbf{w})}_{\text{phạt độ phức tạp}}$$

$\lambda$ là **núm điều chỉnh đánh đổi bias–variance** trực tiếp: $\lambda = 0$ → không phạt → variance cao; $\lambda \to \infty$ → $\mathbf{w}\to 0$ → bias cao.

### Bảng so sánh các kỹ thuật

| Kỹ thuật | Áp dụng cho | Cơ chế | Đặc điểm quyết định |
|---|---|---|---|
| **$\ell_2$ / Ridge / weight decay** | Mọi mô hình có tham số | $\lambda\lVert\mathbf{w}\rVert_2^2$ | Co đều mọi trọng số, **không** về 0; khả vi |
| **$\ell_1$ / LASSO** | Mô hình tuyến tính | $\lambda\lVert\mathbf{w}\rVert_1$ | **Tạo nghiệm thưa** → chọn đặc trưng tự động |
| **Elastic Net** | Mô hình tuyến tính | Kết hợp $\ell_1 + \ell_2$ | Thưa nhưng ổn định khi đặc trưng tương quan |
| **Dropout** | Mạng neuron | Tắt ngẫu nhiên $p$ neuron mỗi bước | Xấp xỉ ensemble của $2^n$ mạng con |
| **Early stopping** | Mọi mô hình lặp | Dừng khi validation loss chạm đáy | Rẻ nhất, không thêm siêu tham số phức tạp |
| **Batch normalization** | Mạng neuron | Chuẩn hoá kích hoạt theo batch | Có hiệu ứng regularize như tác dụng phụ |
| **Data augmentation** | Ảnh, âm thanh, text | Sinh biến thể của mẫu có sẵn | Thêm dữ liệu "miễn phí" — mạnh nhất khi áp dụng được |
| **Ensemble / bagging** | Mọi mô hình | Trung bình nhiều mô hình | Giảm variance trực tiếp — nền của random forest |

### Vì sao $\ell_1$ tạo nghiệm thưa còn $\ell_2$ thì không

Hình học: quả cầu $\ell_1$ có **góc nhọn nằm trên các trục toạ độ**. Đường đồng mức của hàm mất mát chạm vào quả cầu tại một góc → tại đó một số thành phần bằng đúng 0. Quả cầu $\ell_2$ tròn, không có góc, nên điểm chạm hầu như không bao giờ nằm trên trục.

Cách nhìn thứ hai, từ [[Maximum Likelihood and MAP]]:

| Regularizer | = MAP với prior | Ý nghĩa |
|---|---|---|
| $\ell_2$ | Gaussian $\mathcal{N}(0,\sigma^2)$ | "Trọng số thường nhỏ" |
| $\ell_1$ | Laplace | "Trọng số thường **đúng bằng** 0" |

Laplace có đỉnh nhọn tại 0 — nó không chỉ nói "nhỏ" mà nói "bằng 0". Đó là toàn bộ lý do.

> [!note] Weight decay và $\ell_2$ không phải lúc nào cũng là một
> Với SGD thuần, cộng $\lambda\lVert\mathbf{w}\rVert^2$ vào loss tương đương với trừ $\eta\lambda\mathbf{w}$ khỏi trọng số mỗi bước. Với **Adam** thì không tương đương — vì gradient của số hạng phạt cũng bị chia bởi ước lượng phương sai. Đây là lý do `AdamW` tồn tại và là mặc định đúng khi dùng Adam. Xem [[Gradient Descent Variants]].

## 2. Nguyên tắc / Best practices

1. **Không regularize hệ số tự do (bias/intercept).** Nó không gây overfit, và phạt nó chỉ làm mô hình lệch đi. Mọi thư viện tốt đã mặc định như vậy — nhưng khi tự cài đặt thì phải nhớ.
2. **Chuẩn hoá đặc trưng trước khi regularize.** $\lambda$ phạt như nhau cho mọi trọng số; nếu một đặc trưng có thang $10^6$ và một cái $10^{-3}$, hình phạt hoàn toàn mất ý nghĩa. Xem [[Data and Feature Engineering]].
3. **Tìm $\lambda$ trên lưới log.** $10^{-6}, 10^{-5}, \ldots, 10^{2}$. Tìm tuyến tính là lãng phí — $\lambda$ tác động theo bậc độ lớn.
4. **Chọn $\lambda$ bằng cross-validation, không bằng train loss.** Train loss luôn tăng đơn điệu theo $\lambda$; nó không cho bạn thông tin gì.
5. **Dùng $\ell_1$ khi bạn tin rằng phần lớn đặc trưng vô dụng.** Dùng $\ell_2$ khi bạn tin mọi đặc trưng đóng góp một chút. Với đặc trưng tương quan mạnh, $\ell_1$ chọn tuỳ tiện một cái trong nhóm — Elastic Net ổn định hơn.
6. **Với deep learning, thử theo thứ tự: augmentation → early stopping → dropout/weight decay.** Augmentation gần như luôn thắng khi miền dữ liệu cho phép.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Dùng dropout khi inference.** Dropout chỉ bật lúc train. Quên `model.eval()` trong PyTorch là bug kinh điển: kết quả dự đoán ngẫu nhiên giữa các lần chạy.
- **Cộng dropout **và** batch norm bừa bãi.** Chúng tương tác xấu; nhiều kiến trúc hiện đại bỏ dropout hoàn toàn khi đã có batch norm.
- **Regularize khi mô hình đang underfit.** Train error đang cao mà thêm $\lambda$ → tệ hơn về mọi mặt. Kiểm tra [[Overfitting]] trước để biết mình ở nhánh nào.
- **Dùng `Lasso` để "diễn giải" xem đặc trưng nào quan trọng.** Với đặc trưng tương quan, LASSO giữ một cái và bỏ cái kia gần như ngẫu nhiên — đổi seed hoặc đổi vài mẫu là danh sách đổi theo. Đây là một biểu hiện cụ thể của [[Prediction vs Inference]].
- **Quên rằng $\lambda$ tối ưu phụ thuộc kích thước tập dữ liệu.** Thêm dữ liệu thì $\lambda$ tối ưu giảm. Không dò lại sau khi mở rộng dữ liệu là bỏ phí.
- **Dùng $\ell_2$ với Adam mà không dùng AdamW.** Xem callout ở trên — hình phạt sẽ không hoạt động như bạn nghĩ.

## 4. Checklist áp dụng

- [ ] Mô hình của tôi đang overfit hay underfit? (Kiểm tra train error trước!)
- [ ] Đặc trưng đã được chuẩn hoá trước khi regularize chưa?
- [ ] Tôi có đang phạt cả hệ số tự do không?
- [ ] $\lambda$ được chọn bằng cross-validation trên lưới log chứ?
- [ ] Nếu dùng Adam: tôi dùng `AdamW` hay `Adam` + `weight_decay`?
- [ ] Nếu dùng dropout: tôi có gọi `model.eval()` khi đánh giá không?
- [ ] Nếu dùng LASSO để chọn đặc trưng: kết quả có ổn định qua các seed/fold không?
- [ ] Tôi đã thử data augmentation trước khi thêm hình phạt chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.linear_model.RidgeCV` / `LassoCV` / `ElasticNetCV` | Tự dò $\lambda$ bằng CV trong một lời gọi | [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html) |
| `torch.optim.AdamW` | Weight decay tách rời, đúng cách với Adam | [pytorch.org](https://pytorch.org/docs/stable/generated/torch.optim.AdamW.html) |
| `torch.nn.Dropout` | Nhớ `model.train()` / `model.eval()` | [pytorch.org](https://pytorch.org/docs/stable/generated/torch.nn.Dropout.html) |
| `albumentations` / `torchvision.transforms` | Data augmentation cho ảnh | [albumentations.ai](https://albumentations.ai/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, §8.3 "Cơ chế kiểm soát" và §16.6 "Suy giảm trọng số" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Srivastava et al., "Dropout: A Simple Way to Prevent Neural Networks from Overfitting", *JMLR* 15, 2014 — [PDF](https://jmlr.org/papers/v15/srivastava14a.html)
- Loshchilov & Hutter, "Decoupled Weight Decay Regularization" (AdamW), ICLR 2019 — [arXiv:1711.05101](https://arxiv.org/abs/1711.05101)
- Hastie et al., *The Elements of Statistical Learning*, §3.4 "Shrinkage Methods" — [PDF miễn phí](https://hastie.su.domains/ElemStatLearn/)

## Liên kết

[[Overfitting]] · [[Maximum Likelihood and MAP]] · [[Model Validation]] · [[Gradient Descent Variants]] · [[ML]]
