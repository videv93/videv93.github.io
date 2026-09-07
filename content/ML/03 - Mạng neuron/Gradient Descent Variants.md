---
tags: [ml, optimization, neural-network]
status: evergreen
---
# Gradient Descent Variants

> [[Gradient Descent]] thuần có hai vấn đề: mỗi bước phải quét **toàn bộ** dữ liệu, và nó ziczac chậm chạp trong thung lũng hẹp. Các biến thể ở đây sinh ra để chữa từng vấn đề đó, và một mô hình hiện đại luôn dùng ít nhất hai trong số chúng.

## 1. Khái niệm cốt lõi

### Trục thứ nhất: bao nhiêu dữ liệu mỗi bước

| Biến thể | Dữ liệu mỗi bước | Ưu | Nhược |
|---|---|---|---|
| **Batch GD** | Toàn bộ $N$ mẫu | Gradient chính xác, hội tụ mượt | Chậm; không vừa RAM với dữ liệu lớn |
| **SGD** | 1 mẫu | Cập nhật rất nhanh; nhiễu giúp thoát cực tiểu địa phương | Dao động mạnh; không tận dụng vector hoá |
| **Mini-batch GD** | $B$ mẫu (32–512) | **Cân bằng tốt nhất** — mặc định thực tế | Thêm siêu tham số $B$ |

> [!note] "SGD" trong mọi thư viện thực ra là mini-batch GD
> `torch.optim.SGD` không lấy từng mẫu một — nó nhận batch bạn đưa vào. Thuật ngữ đã trôi nghĩa. Khi đọc paper, "SGD" gần như luôn nghĩa là mini-batch.

### Trục thứ hai: dùng lịch sử gradient như thế nào

| Thuật toán | Ý tưởng | Công thức cốt lõi |
|---|---|---|
| **Momentum** | Tích luỹ quán tính theo hướng nhất quán | $v_t = \gamma v_{t-1} + \eta\nabla J(\theta)$; $\theta \leftarrow \theta - v_t$ |
| **NAG** (Nesterov) | Nhìn trước một bước rồi mới tính gradient | $v_t = \gamma v_{t-1} + \eta\nabla J(\theta - \gamma v_{t-1})$ |
| **AdaGrad** | Learning rate riêng cho mỗi tham số, giảm dần | Chia cho $\sqrt{\sum \text{grad}^2}$ tích luỹ |
| **RMSProp** | Như AdaGrad nhưng dùng trung bình trượt | Chia cho $\sqrt{\mathbb{E}[\text{grad}^2]}$ |
| **Adam** | **Momentum + RMSProp** | Ước lượng moment bậc 1 và bậc 2, có hiệu chỉnh bias |
| **AdamW** | Adam với weight decay tách rời | Adam + trừ $\eta\lambda\theta$ riêng |

### Momentum trực giác — vì sao nó hiệu quả

Hình dung quả bóng lăn xuống thung lũng hẹp và dài. GD thuần nảy qua nảy lại giữa hai vách dốc và tiến rất chậm dọc theo đáy. Momentum **cộng dồn** các bước: thành phần ngang (nhất quán) tích luỹ và tăng tốc; thành phần dọc (đổi dấu liên tục) triệt tiêu lẫn nhau.

$\gamma = 0.9$ là giá trị mặc định gần như phổ quát — nó tương ứng với "nhớ khoảng 10 bước gần nhất".

**NAG** cải tiến nhỏ nhưng thông minh: thay vì tính gradient tại vị trí hiện tại rồi cộng quán tính, nó **nhìn trước** tới nơi quán tính sắp đưa mình tới rồi mới tính gradient ở đó. Kết quả: bóng "phanh sớm" khi sắp vọt qua đáy.

### Chọn optimizer nào

| Tình huống | Chọn |
|---|---|
| Mô hình tuyến tính, dữ liệu bảng | SGD + momentum, hoặc solver đóng |
| Deep learning, mặc định an toàn | **AdamW**, $\eta = 3\times10^{-4}$ |
| Computer vision, cần điểm cuối tốt nhất | SGD + momentum + cosine schedule |
| Transformer / NLP | AdamW + warmup |
| Đặc trưng thưa (text, one-hot) | Adam hoặc AdaGrad — learning rate thích ứng có ích rõ |

## 2. Nguyên tắc / Best practices

1. **Bắt đầu bằng AdamW với $\eta = 3\times 10^{-4}$.** Đây là điểm khởi đầu đúng trong đa số trường hợp; tinh chỉnh sau.
2. **Nếu dùng weight decay với Adam, phải dùng `AdamW`.** Xem [[Regularization]] — `Adam(weight_decay=...)` không làm điều bạn nghĩ.
3. **Batch size và learning rate đi cùng nhau.** Tăng batch size $k$ lần thì thường tăng $\eta$ khoảng $k$ lần (linear scaling rule) hoặc $\sqrt{k}$ lần.
4. **Xáo trộn dữ liệu mỗi epoch.** `shuffle=True`. Nếu không, mô hình học theo thứ tự file — và nếu dữ liệu được sắp theo lớp thì đó là thảm hoạ.
5. **Dùng warmup cho mô hình lớn.** Vài trăm bước đầu với $\eta$ tăng dần từ 0. Không có nó, Adam ước lượng moment từ quá ít mẫu và bước đầu tiên có thể phá hỏng khởi tạo.
6. **Adam hội tụ nhanh hơn nhưng SGD+momentum thường tổng quát hoá tốt hơn.** Nếu bạn có ngân sách tính toán, thử cả hai.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Dùng `Adam` + `weight_decay` thay vì `AdamW`.** Lỗi im lặng: mô hình vẫn train, chỉ là regularization yếu hơn nhiều so với dự định.
- **Quên `optimizer.zero_grad()` trong PyTorch.** Gradient **cộng dồn** qua các batch. Quên dòng này khiến mô hình học kiểu hoàn toàn sai — và nó vẫn chạy không báo lỗi.
- **Quên `shuffle=True`.** Đặc biệt nguy hiểm khi dữ liệu được sắp theo nhãn.
- **Đổi batch size mà không đổi learning rate.** Rồi kết luận "batch lớn làm mô hình tệ".
- **Nhầm `epoch` với `step`.** Scheduler cấu hình theo step nhưng gọi `.step()` mỗi epoch (hoặc ngược lại) → lịch trình sai lệch hàng trăm lần.
- **Dùng AdaGrad cho huấn luyện dài.** Mẫu số tích luỹ mãi không giảm → learning rate hiệu dụng tiến về 0 và mô hình ngừng học. RMSProp sinh ra chính để sửa điều này.
- **Cho rằng optimizer thích ứng loại bỏ nhu cầu dò learning rate.** Adam vẫn nhạy với $\eta$, chỉ là bớt nhạy hơn SGD.

## 4. Checklist áp dụng

- [ ] Tôi dùng optimizer nào, và vì sao chọn nó?
- [ ] Nếu dùng weight decay với Adam: tôi dùng `AdamW` chứ?
- [ ] `optimizer.zero_grad()` có được gọi mỗi bước không?
- [ ] `shuffle=True` trong DataLoader chứ?
- [ ] Batch size và learning rate có được điều chỉnh cùng nhau không?
- [ ] Scheduler được `.step()` theo đúng đơn vị (batch hay epoch)?
- [ ] Với mô hình lớn: tôi đã dùng warmup chưa?
- [ ] Tôi đã vẽ loss curve và xác nhận nó giảm mượt chứ không dao động dữ dội?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `torch.optim` | SGD (có momentum/nesterov), Adam, AdamW, RMSprop, Adagrad | [pytorch.org](https://pytorch.org/docs/stable/optim.html) |
| `torch.optim.lr_scheduler.OneCycleLR` | Warmup + cosine decay trong một scheduler; mặc định rất tốt | [pytorch.org](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.OneCycleLR.html) |
| Distill — *Why Momentum Really Works* | Giải thích tương tác momentum × số điều kiện | [distill.pub/2017/momentum](https://distill.pub/2017/momentum/) |
| `sklearn.linear_model.SGDClassifier` | `learning_rate='adaptive'`, `early_stopping=True` | [scikit-learn.org](https://scikit-learn.org/stable/modules/sgd.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, §12.4 momentum, §12.5 Nesterov, §12.6 stochastic gradient descent — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Kingma & Ba, "Adam: A Method for Stochastic Optimization", ICLR 2015 — [arXiv:1412.6980](https://arxiv.org/abs/1412.6980)
- Loshchilov & Hutter, "Decoupled Weight Decay Regularization" (AdamW), ICLR 2019 — [arXiv:1711.05101](https://arxiv.org/abs/1711.05101)
- Ruder, "An overview of gradient descent optimization algorithms" — [arXiv:1609.04747](https://arxiv.org/abs/1609.04747)

## Liên kết

[[Gradient Descent]] · [[Regularization]] · [[Backpropagation]] · [[Multilayer Perceptron]] · [[ML]]
