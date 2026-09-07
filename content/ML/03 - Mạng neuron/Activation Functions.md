---
tags: [ml, neural-network, deep-learning]
status: evergreen
---
# Activation Functions

> Không có hàm kích hoạt phi tuyến, một mạng 100 tầng **chính xác tương đương** với một tầng duy nhất. Chúng là thứ duy nhất khiến "deep" có nghĩa.

## 1. Khái niệm cốt lõi

Vì sao bắt buộc phi tuyến: $\mathbf{W}_3(\mathbf{W}_2(\mathbf{W}_1\mathbf{x})) = (\mathbf{W}_3\mathbf{W}_2\mathbf{W}_1)\mathbf{x} = \mathbf{W}'\mathbf{x}$. Chồng bao nhiêu tầng tuyến tính vẫn ra một phép tuyến tính. Xem [[Perceptron Learning Algorithm]].

### Bảng so sánh

| Hàm | Công thức | Miền giá trị | Ưu | Nhược |
|---|---|---|---|---|
| **Sigmoid** | $1/(1+e^{-z})$ | $(0,1)$ | Đọc được như xác suất | **Bão hoà hai đầu** → vanishing gradient; không zero-centered |
| **tanh** | $(e^z-e^{-z})/(e^z+e^{-z})$ | $(-1,1)$ | Zero-centered | Vẫn bão hoà |
| **ReLU** | $\max(0,z)$ | $[0,\infty)$ | Không bão hoà phía dương; rất rẻ; hội tụ nhanh | **Dying ReLU**; không zero-centered |
| **Leaky ReLU** | $\max(\alpha z, z)$, $\alpha\approx 0.01$ | $\mathbb{R}$ | Sửa dying ReLU | Thêm siêu tham số |
| **PReLU** | Như trên, $\alpha$ học được | $\mathbb{R}$ | Tự thích ứng | Thêm tham số |
| **ELU** | $z$ nếu $z>0$, $\alpha(e^z-1)$ nếu ngược lại | $(-\alpha,\infty)$ | Mượt, gần zero-centered | Có `exp`, chậm hơn |
| **GELU** | $z\cdot\Phi(z)$ | $\mathbb{R}$ | **Mặc định của Transformer** | Đắt hơn ReLU |
| **Swish/SiLU** | $z\cdot\sigma(z)$ | $\mathbb{R}$ | Thường nhỉnh hơn ReLU | Đắt hơn |
| **Softmax** | Xem [[Softmax Regression]] | Simplex | Tầng đầu ra đa lớp | Không dùng ở tầng ẩn |

### Vanishing gradient — cơ chế cụ thể

$\sigma'(z) = \sigma(z)(1-\sigma(z))$, đạt cực đại **0.25** tại $z=0$ và tiến về 0 ở hai đầu.

Trong [[Backpropagation]], gradient nhân dồn qua các tầng. Với 10 tầng sigmoid, hệ số tốt nhất có thể là $0.25^{10} \approx 10^{-6}$. Các tầng đầu **không nhận được tín hiệu học nào**.

Đây không phải chi tiết lịch sử — nó là lý do kỹ thuật cụ thể khiến mạng sâu không train được trước khoảng 2010, và ReLU (đạo hàm bằng đúng 1 ở phía dương) là một trong những thứ mở khoá deep learning.

### Dying ReLU

Nếu $z < 0$ với **mọi** dữ liệu, ReLU trả 0 và đạo hàm cũng 0 → neuron đó không bao giờ cập nhật nữa. Nó chết vĩnh viễn.

| Nguyên nhân | Cách chữa |
|---|---|
| Learning rate quá lớn (bước nhảy đẩy bias xuống rất âm) | Giảm $\eta$ |
| Khởi tạo tồi | Dùng He initialization |
| Bản chất ReLU | Dùng Leaky ReLU / ELU / GELU |

### Khởi tạo phải khớp với hàm kích hoạt

| Hàm kích hoạt | Khởi tạo đúng | Phương sai |
|---|---|---|
| sigmoid / tanh | **Xavier/Glorot** | $2/(n_{in}+n_{out})$ |
| ReLU và họ hàng | **He/Kaiming** | $2/n_{in}$ |

Dùng nhầm cặp này khiến tín hiệu nổ hoặc tắt dần qua các tầng — một dạng bug rất khó chẩn đoán vì mô hình vẫn "chạy".

## 2. Nguyên tắc / Best practices

1. **Mặc định: ReLU cho tầng ẩn.** Nếu gặp dying ReLU, chuyển sang GELU hoặc Leaky ReLU. Với Transformer, dùng GELU ngay từ đầu.
2. **Không dùng sigmoid/tanh ở tầng ẩn của mạng sâu.** Chỉ dùng chúng ở tầng đầu ra, hoặc trong RNN/LSTM nơi chúng đóng vai trò cổng.
3. **Tầng đầu ra chọn theo bài toán, không theo sở thích:**
   | Bài toán | Tầng đầu ra |
   |---|---|
   | Hồi quy | Không có (linear) |
   | Nhị phân | Sigmoid (hoặc logits + `BCEWithLogitsLoss`) |
   | Đa lớp | Softmax (hoặc logits + `CrossEntropyLoss`) |
   | Đa nhãn | $K$ sigmoid độc lập |
   | Đầu ra không âm | ReLU hoặc softplus |
4. **Khớp khởi tạo với hàm kích hoạt.** He cho ReLU, Xavier cho tanh/sigmoid.
5. **Theo dõi tỉ lệ neuron chết.** Với ReLU, ghi lại phần trăm kích hoạt bằng 0. Trên 40% là dấu hiệu cảnh báo.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Áp hàm kích hoạt ở tầng đầu ra rồi lại dùng loss `with_logits`.** Sigmoid hai lần. Mô hình vẫn train, kết quả tệ, không có lỗi nào.
- **Quên hàm kích hoạt giữa các tầng.** Mạng "sâu" của bạn là mô hình tuyến tính. Triệu chứng: thêm tầng không giúp gì cả.
- **Dùng sigmoid ở tầng ẩn vì "nó cho giá trị đẹp trong [0,1]".** Đây là công thức cho vanishing gradient.
- **Nhầm khởi tạo Xavier với He.** Chênh hệ số 2 — nghe nhỏ, nhưng luỹ thừa qua 50 tầng thành hệ số $2^{25}$.
- **Learning rate cao + ReLU.** Kết hợp kinh điển làm chết hàng loạt neuron trong vài trăm bước đầu. Warmup giúp tránh — xem [[Gradient Descent Variants]].
- **Cho rằng "hàm kích hoạt mới nhất luôn tốt hơn".** Chênh lệch giữa ReLU, GELU, Swish thường dưới 1% và bị lấn át bởi learning rate hay data augmentation. Đừng tốn ngân sách tinh chỉnh vào đây trước khi làm xong những thứ quan trọng hơn.
- **Dùng ReLU ở tầng đầu ra của bài toán hồi quy có giá trị âm.** Mô hình sẽ không bao giờ dự đoán được số âm, và bạn sẽ mất rất lâu để nhận ra.

## 4. Checklist áp dụng

- [ ] Có hàm kích hoạt phi tuyến giữa **mọi** cặp tầng tuyến tính không?
- [ ] Hàm kích hoạt tầng đầu ra có khớp với bài toán không?
- [ ] Tôi có đang áp activation hai lần (một lần trong model, một lần trong loss) không?
- [ ] Khởi tạo có khớp với hàm kích hoạt không (He cho ReLU, Xavier cho tanh)?
- [ ] Tôi đã đo tỉ lệ neuron ReLU chết chưa?
- [ ] Nếu mạng sâu và gradient biến mất: tôi có đang dùng sigmoid ở tầng ẩn không?
- [ ] Với bài toán hồi quy: đầu ra có bị chặn không mong muốn bởi activation không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `torch.nn` activations | `ReLU`, `LeakyReLU`, `ELU`, `GELU`, `SiLU`, `Tanh`, `Sigmoid` | [pytorch.org](https://pytorch.org/docs/stable/nn.html#non-linear-activations-weighted-sum-nonlinearity) |
| `torch.nn.init` | `kaiming_normal_` (He), `xavier_uniform_` (Glorot) | [pytorch.org](https://pytorch.org/docs/stable/nn.init.html) |
| TensorFlow Playground | Đổi activation và xem ranh giới quyết định thay đổi trực tiếp | [playground.tensorflow.org](https://playground.tensorflow.org/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, §16.3 "Hàm kích hoạt" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- He et al., "Delving Deep into Rectifiers" (He initialization, PReLU), ICCV 2015 — [arXiv:1502.01852](https://arxiv.org/abs/1502.01852)
- Hendrycks & Gimpel, "Gaussian Error Linear Units (GELUs)" — [arXiv:1606.08415](https://arxiv.org/abs/1606.08415)
- Glorot & Bengio, "Understanding the difficulty of training deep feedforward neural networks", AISTATS 2010 — [PDF](https://proceedings.mlr.press/v9/glorot10a.html)

## Liên kết

[[Multilayer Perceptron]] · [[Backpropagation]] · [[Softmax Regression]] · [[Gradient Descent Variants]] · [[ML]]
