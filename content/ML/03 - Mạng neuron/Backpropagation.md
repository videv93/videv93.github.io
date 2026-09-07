---
tags: [ml, neural-network, deep-learning, optimization]
status: evergreen
---
# Backpropagation

> Backprop **không phải** một thuật toán học — nó chỉ là chain rule áp dụng có tổ chức để tính gradient. Việc học vẫn do [[Gradient Descent]] làm. Nhầm lẫn này rất phổ biến và nó che mất điều đơn giản đẹp đẽ nằm bên dưới.

## 1. Khái niệm cốt lõi

Vấn đề: cần $\partial J/\partial \mathbf{W}^{(l)}$ cho **mọi** tầng $l$. Tính riêng từng cái là lãng phí khủng khiếp — các tầng chia sẻ hầu hết phép tính.

Giải pháp: đi ngược từ tầng cuối, truyền một đại lượng trung gian gọi là $\boldsymbol{\delta}$.

### Bốn phương trình của backprop

Dùng ký hiệu của [[Multilayer Perceptron]]; $\odot$ là nhân theo từng phần tử.

| # | Phương trình | Đọc là |
|---|---|---|
| **1** | $\boldsymbol{\delta}^{(L)} = \nabla_{\mathbf{a}}J \odot f'(\mathbf{z}^{(L)})$ | Sai số tại tầng cuối |
| **2** | $\boldsymbol{\delta}^{(l)} = \left(\mathbf{W}^{(l+1)}\boldsymbol{\delta}^{(l+1)}\right)\odot f'(\mathbf{z}^{(l)})$ | **Đẩy sai số ngược lại một tầng** |
| **3** | $\nabla_{\mathbf{W}^{(l)}}J = \mathbf{a}^{(l-1)}\boldsymbol{\delta}^{(l)T}$ | Gradient trọng số = (đầu vào) × (sai số) |
| **4** | $\nabla_{\mathbf{b}^{(l)}}J = \boldsymbol{\delta}^{(l)}$ | Gradient bias = sai số |

$\boldsymbol{\delta}^{(l)} = \partial J/\partial\mathbf{z}^{(l)}$ — "tầng này chịu trách nhiệm bao nhiêu cho sai số cuối cùng".

Phương trình 3 là dạng **"sai số × đầu vào"** đã gặp ở [[Logistic Regression]] và [[Softmax Regression]]. Nó không phải trùng hợp — hai mô hình đó chính là mạng một tầng.

### Đơn giản hoá quan trọng: softmax + cross-entropy

Khi tầng cuối là softmax và loss là cross-entropy, phương trình 1 rút gọn thành:
$$\boldsymbol{\delta}^{(L)} = \hat{\mathbf{y}} - \mathbf{y}$$

Đúng vậy — chỉ là hiệu giữa dự đoán và nhãn. Mọi số hạng $f'$ triệt tiêu sạch. Đây là lý do kỹ thuật khiến cặp softmax + cross-entropy được dùng phổ biến đến vậy, và vì sao thư viện gộp chúng vào một hàm.

### Chi phí

| | Forward | Backward |
|---|---|---|
| Thời gian | $O(\text{số tham số})$ | $\approx 2\times$ forward |
| Bộ nhớ | Phải **lưu mọi** $\mathbf{a}^{(l)}, \mathbf{z}^{(l)}$ | Dùng cache của forward |

Bộ nhớ tỉ lệ với (batch size × tổng kích thước kích hoạt). Đây là ràng buộc thực tế quyết định batch size tối đa, không phải số tham số.

## 2. Nguyên tắc / Best practices

1. **Luôn kiểm tra gradient bằng số khi tự cài đặt.** Xem [[Matrix Calculus]]. Backprop viết tay sai rất dễ và bug im lặng.
2. **Kiểm tra shape ở từng phương trình.** $\boldsymbol{\delta}^{(l)}$ phải cùng shape với $\mathbf{z}^{(l)}$; $\nabla_{\mathbf{W}^{(l)}}$ phải cùng shape với $\mathbf{W}^{(l)}$.
3. **Theo dõi norm của gradient theo tầng.** Nếu norm giảm theo cấp số nhân khi đi ngược về tầng đầu, bạn đang gặp vanishing gradient — xem [[Activation Functions]].
4. **Dùng gradient checkpointing khi hết bộ nhớ.** Đánh đổi ~30% thời gian để không phải giữ toàn bộ kích hoạt.
5. **Trong sản xuất, dùng autodiff.** PyTorch/JAX làm việc này đúng và nhanh hơn. Tự cài đặt chỉ để học — nhưng việc học đó là cần thiết để đọc được lỗi.
6. **Cắt gradient (clipping) cho mạng hồi quy hoặc mạng rất sâu.** `clip_grad_norm_(params, 1.0)` là mặc định an toàn.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Quên `optimizer.zero_grad()`.** PyTorch **cộng dồn** gradient. Không xoá thì bạn đang cộng gradient của mọi batch từ đầu — mô hình vẫn train, kết quả vô nghĩa, không có lỗi.
- **Nhầm $\mathbf{z}$ với $\mathbf{a}$ khi tính $f'$.** Phương trình 2 cần $f'(\mathbf{z}^{(l)})$, **không phải** $f'(\mathbf{a}^{(l)})$. Với ReLU thì trùng nhau nên bug ẩn; với sigmoid thì sai ngay.
- **Vanishing gradient.** Với sigmoid, mỗi tầng nhân thêm hệ số $\le 0.25$. Qua 10 tầng: $10^{-6}$. Triệu chứng: loss đứng yên, tầng đầu không đổi trọng số. Chữa: ReLU/GELU, residual connection, batch norm.
- **Exploding gradient.** Loss thành `NaN` đột ngột. Chữa: gradient clipping, giảm learning rate, kiểm tra khởi tạo.
- **Gọi `.backward()` hai lần trên cùng một đồ thị.** PyTorch giải phóng đồ thị sau lần đầu. Cần `retain_graph=True`, nhưng thường thì việc cần nó là dấu hiệu thiết kế sai.
- **Quên `.detach()` khi lưu tensor để log.** Giữ nguyên đồ thị tính toán → rò rỉ bộ nhớ tăng dần qua các epoch. Dùng `.item()` hoặc `.detach()`.
- **Đưa tensor có `requires_grad=True` vào thống kê chạy.** Cùng nguyên nhân với trên.
- **Cho rằng backprop "học".** Nó chỉ tính gradient. Nếu learning rate sai thì backprop hoàn hảo vẫn không cứu được.

## 4. Checklist áp dụng

- [ ] `optimizer.zero_grad()` có được gọi trước mỗi `backward()` không?
- [ ] Nếu tự cài đặt: tôi đã chạy gradient check bằng số chưa?
- [ ] Shape của $\boldsymbol{\delta}^{(l)}$ có khớp với $\mathbf{z}^{(l)}$ không?
- [ ] Tôi dùng $f'(\mathbf{z})$ hay nhầm sang $f'(\mathbf{a})$?
- [ ] Tôi đã log norm gradient theo tầng chưa? Nó có giảm theo cấp số nhân không?
- [ ] Có `NaN` xuất hiện không? Tôi đã bật gradient clipping chưa?
- [ ] Tôi có `.detach()` khi lưu giá trị để log không?
- [ ] Bộ nhớ có tăng dần qua các epoch không (dấu hiệu rò rỉ đồ thị)?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `torch.autograd` | Autodiff; `torch.autograd.gradcheck` kiểm tra gradient bằng số | [pytorch.org](https://pytorch.org/docs/stable/autograd.html) |
| `torch.utils.checkpoint` | Gradient checkpointing — đổi tính toán lấy bộ nhớ | [pytorch.org](https://pytorch.org/docs/stable/checkpoint.html) |
| `torch.nn.utils.clip_grad_norm_` | Cắt gradient chống exploding | [pytorch.org](https://pytorch.org/docs/stable/generated/torch.nn.utils.clip_grad_norm_.html) |
| `torchviz` | Vẽ đồ thị tính toán để debug | [github.com/szagoruyko/pytorchviz](https://github.com/szagoruyko/pytorchviz) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, §16.4 "Lan truyền ngược" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Rumelhart, Hinton & Williams, "Learning representations by back-propagating errors", *Nature* 323, 533–536, 1986 — [doi:10.1038/323533a0](https://doi.org/10.1038/323533a0)
- Nielsen, *Neural Networks and Deep Learning*, Ch. 2 — dẫn giải bốn phương trình rõ ràng nhất — [neuralnetworksanddeeplearning.com](http://neuralnetworksanddeeplearning.com/chap2.html)
- CS231n, *Backpropagation, Intuitions* — [cs231n.github.io](https://cs231n.github.io/optimization-2/)

## Liên kết

[[Multilayer Perceptron]] · [[Matrix Calculus]] · [[Gradient Descent]] · [[Activation Functions]] · [[ML]]
