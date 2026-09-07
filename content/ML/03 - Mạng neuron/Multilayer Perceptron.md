---
tags: [ml, neural-network, deep-learning]
status: evergreen
---
# Multilayer Perceptron

> MLP là kiến trúc mạng neuron cơ bản nhất và vẫn là **tầng cuối của gần như mọi mô hình hiện đại** — CNN, Transformer, đều kết thúc bằng vài tầng fully-connected. Hiểu MLP là hiểu 80% từ vựng của deep learning.

## 1. Khái niệm cốt lõi

### Ký hiệu chuẩn (dùng thống nhất với [[Backpropagation]])

| Ký hiệu | Nghĩa |
|---|---|
| $L$ | Số tầng (không tính tầng đầu vào) |
| $\mathbf{W}^{(l)}$ | Ma trận trọng số tầng $l$, shape $(n^{(l-1)}, n^{(l)})$ |
| $\mathbf{b}^{(l)}$ | Vector bias tầng $l$ |
| $\mathbf{z}^{(l)} = \mathbf{W}^{(l)T}\mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}$ | **Pre-activation** (logits của tầng) |
| $\mathbf{a}^{(l)} = f(\mathbf{z}^{(l)})$ | **Activation** sau khi qua hàm phi tuyến |
| $\mathbf{a}^{(0)} = \mathbf{x}$ | Đầu vào |
| $\mathbf{a}^{(L)} = \hat{\mathbf{y}}$ | Đầu ra |

Phân biệt $\mathbf{z}$ và $\mathbf{a}$ là chìa khoá — nhầm hai cái này là nguồn sai lầm số một khi tự cài đặt backprop.

### Lan truyền xuôi (forward pass)

```python
def forward(X, Ws, bs, f):
    A = X                                  # (N, d)
    cache = [A]
    for W, b in zip(Ws, bs):
        Z = A @ W + b                      # pre-activation
        A = f(Z)                           # activation
        cache.append((Z, A))               # LƯU LẠI — backprop cần
    return A, cache
```

Dòng `cache.append` là chỗ đánh đổi bộ nhớ: forward phải **giữ lại mọi kích hoạt trung gian** để backward dùng. Đây là lý do batch size lớn làm hết VRAM.

### Định lý xấp xỉ phổ quát

Một mạng với **một** tầng ẩn đủ rộng và hàm kích hoạt phi tuyến có thể xấp xỉ **bất kỳ** hàm liên tục nào trên tập compact, với sai số tuỳ ý nhỏ.

> [!warning] Định lý này nói ít hơn bạn tưởng
> Nó khẳng định **tồn tại** một mạng như vậy. Nó **không** nói: mạng đó rộng bao nhiêu (có thể là số mũ), tìm được trọng số đó bằng gradient descent hay không, hay mô hình có tổng quát hoá không. Trên thực tế, **sâu** hiệu quả hơn **rộng** rất nhiều: cùng số tham số, mạng sâu biểu diễn được lớp hàm phong phú hơn.

### Chọn kiến trúc

| Câu hỏi | Hướng dẫn thực dụng |
|---|---|
| Bao nhiêu tầng ẩn? | Dữ liệu bảng: 2–4. Ảnh/text: dùng kiến trúc chuyên biệt, không phải MLP thuần |
| Mỗi tầng bao nhiêu neuron? | Bắt đầu bằng luỹ thừa của 2 (128, 256); giữ đều hoặc thu hẹp dần |
| Rộng hay sâu? | **Sâu vừa phải** thường thắng rộng-nông với cùng ngân sách tham số |
| Bao nhiêu tham số? | Nhiều hơn số mẫu là bình thường trong DL — nhưng phải regularize |

Trong [[FADAML Case Study]], `Neural Net Torch` là MLP 4 tầng, 128 node mỗi tầng, ReLU, huấn luyện 500 epoch bằng Adam ($\eta = 3\times10^{-4}$, weight decay $10^{-6}$) — và nó đạt validation accuracy 89.8%, đứng **thứ ba** sau LightGBM-Large. Đây là kết quả điển hình cho **dữ liệu bảng**: cây thường thắng mạng neuron.

## 2. Nguyên tắc / Best practices

1. **Với dữ liệu bảng, thử [[Gradient Boosting and Tree Ensembles]] trước MLP.** Bằng chứng thực nghiệm rất nhất quán ở điểm này, và bảng kết quả FADAML là một ví dụ.
2. **Chuẩn hoá đầu vào.** Mạng neuron cực kỳ nhạy với thang đặc trưng.
3. **Bắt đầu nhỏ rồi mở rộng.** Một mạng 2 tầng × 64 node chạy được và cho baseline; đi từ đó lên.
4. **Kiểm tra overfit 10 mẫu trước.** Nếu mạng không đạt loss ≈ 0 trên 10 mẫu, có bug — đừng đổ tại dữ liệu.
5. **Dùng batch normalization hoặc layer normalization cho mạng sâu.** Chúng làm mặt lỗi mượt hơn và cho phép learning rate lớn hơn.
6. **Đếm tham số trước khi train.** $\sum_l n^{(l-1)}n^{(l)}$. Nếu vượt xa số mẫu, hãy chuẩn bị sẵn kế hoạch [[Regularization]].

## 3. Cạm bẫy / Sai lầm hay gặp

- **Quên hàm kích hoạt giữa các tầng.** Mạng thành mô hình tuyến tính. Triệu chứng đặc trưng: thêm tầng **không thay đổi gì** kết quả. Xem [[Activation Functions]].
- **Áp activation ở tầng đầu ra rồi lại dùng loss `with_logits`.** Sigmoid/softmax hai lần.
- **Không chuẩn hoá đầu vào** rồi dò learning rate hàng giờ.
- **Nhầm $\mathbf{z}$ với $\mathbf{a}$ trong cache.** Backprop cần $\mathbf{z}$ để tính $f'(\mathbf{z})$ và cần $\mathbf{a}^{(l-1)}$ để tính gradient trọng số. Lưu nhầm → gradient sai — và gradient check sẽ bắt được ngay.
- **Dùng MLP thuần cho ảnh.** Làm phẳng ảnh 224×224×3 thành vector 150.528 chiều vứt bỏ toàn bộ cấu trúc không gian, và tầng đầu tiên đã có hàng chục triệu tham số. Dùng CNN.
- **Mạng quá lớn so với dữ liệu, không regularize.** Với 29.000 mẫu như FADAML, một MLP vài triệu tham số sẽ học thuộc.
- **Bias trong tầng ngay trước batch norm.** BatchNorm trừ trung bình nên bias bị triệt tiêu — nó chỉ là tham số thừa. Đặt `bias=False`.

## 4. Checklist áp dụng

- [ ] Dữ liệu của tôi là dạng bảng không? Nếu có, tôi đã thử gradient boosting trước chưa?
- [ ] Đầu vào đã được chuẩn hoá chưa?
- [ ] Có activation giữa **mọi** cặp tầng tuyến tính không?
- [ ] Tầng đầu ra có khớp với bài toán và với loss function không?
- [ ] Tôi đã đếm số tham số và so với số mẫu chưa?
- [ ] Tôi đã chạy overfit 10 mẫu để xác nhận pipeline chưa?
- [ ] Khởi tạo có khớp với hàm kích hoạt không?
- [ ] Tôi có kế hoạch regularization (dropout / weight decay / early stopping) chưa?
- [ ] Bộ nhớ có đủ cho batch size này không? (Nhớ: forward giữ toàn bộ kích hoạt trung gian.)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `torch.nn.Sequential` + `Linear` | Cách nhanh nhất dựng MLP | [pytorch.org](https://pytorch.org/docs/stable/generated/torch.nn.Linear.html) |
| `sklearn.neural_network.MLPClassifier` | MLP không cần deep learning framework; tốt cho baseline | [scikit-learn.org](https://scikit-learn.org/stable/modules/neural_networks_supervised.html) |
| `torchinfo` / `torchsummary` | In shape và số tham số từng tầng | [github.com/TylerYep/torchinfo](https://github.com/TylerYep/torchinfo) |
| TensorFlow Playground | Thấy tác động của số tầng, số neuron ngay lập tức | [playground.tensorflow.org](https://playground.tensorflow.org/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 16 "Mạng neuron đa tầng và lan truyền ngược" (§16.1–16.3) — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Goodfellow et al., *Deep Learning*, Ch. 6 "Deep Feedforward Networks" — [deeplearningbook.org](https://www.deeplearningbook.org/contents/mlp.html)
- Nielsen, *Neural Networks and Deep Learning*, Ch. 4 (chứng minh trực quan định lý xấp xỉ phổ quát) — [neuralnetworksanddeeplearning.com](http://neuralnetworksanddeeplearning.com/chap4.html)
- Grinsztajn et al., "Why do tree-based models still outperform deep learning on tabular data?", NeurIPS 2022 — [arXiv:2207.08815](https://arxiv.org/abs/2207.08815)

## Liên kết

[[Backpropagation]] · [[Activation Functions]] · [[Gradient Descent Variants]] · [[Gradient Boosting and Tree Ensembles]] · [[ML]]
