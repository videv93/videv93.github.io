---
tags: [ml, toán, calculus, optimization]
status: evergreen
---
# Matrix Calculus

> Toàn bộ ML là "tìm tham số làm hàm mất mát nhỏ nhất", và cách duy nhất khả thi để làm việc đó ở quy mô hàng triệu tham số là **đạo hàm theo ma trận**. Không có chương này thì [[Gradient Descent]] và [[Backpropagation]] chỉ là công thức chép lại.

## 1. Khái niệm cốt lõi

**Quy ước mẫu số (denominator layout)** — dùng thống nhất trong vault: gradient **luôn có cùng shape với biến lấy đạo hàm**. Đây là quy ước duy nhất khiến `W = W - eta * grad_W` chạy được mà không cần chuyển vị.

| Hàm | Biến | Gradient | Shape |
|---|---|---|---|
| $f: \mathbb{R}^n \to \mathbb{R}$ | $\mathbf{x} \in \mathbb{R}^n$ | $\nabla_\mathbf{x} f$ | $n \times 1$ |
| $f: \mathbb{R}^{m\times n} \to \mathbb{R}$ | $\mathbf{W}$ | $\nabla_\mathbf{W} f$ | $m \times n$ |
| $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m$ | $\mathbf{x}$ | Jacobian $\mathbf{J}$ | $n \times m$ (quy ước mẫu số) |

### Bảng gradient thường gặp

| $f$ | $\nabla_\mathbf{x} f$ |
|---|---|
| $\mathbf{a}^T\mathbf{x} = \mathbf{x}^T\mathbf{a}$ | $\mathbf{a}$ |
| $\mathbf{x}^T\mathbf{A}\mathbf{x}$ | $(\mathbf{A} + \mathbf{A}^T)\mathbf{x}$; nếu $\mathbf{A}$ đối xứng → $2\mathbf{A}\mathbf{x}$ |
| $\lVert \mathbf{x} \rVert_2^2 = \mathbf{x}^T\mathbf{x}$ | $2\mathbf{x}$ |
| $\lVert \mathbf{A}\mathbf{x} - \mathbf{b} \rVert_2^2$ | $2\mathbf{A}^T(\mathbf{A}\mathbf{x} - \mathbf{b})$ |
| $\text{trace}(\mathbf{W}^T\mathbf{A})$ | $\nabla_\mathbf{W} = \mathbf{A}$ |
| $\lVert \mathbf{X} \rVert_F^2$ | $2\mathbf{X}$ |
| $\log \det(\mathbf{X})$ | $\mathbf{X}^{-T}$ |

Dòng thứ tư là **công thức quan trọng nhất của cả vault** — nó cho ra nghiệm đóng của [[Linear Regression]] và là điểm khởi đầu của mọi dẫn giải hồi quy.

### Ba tính chất dùng liên tục

1. **Tuyến tính:** $\nabla(\alpha f + \beta g) = \alpha\nabla f + \beta\nabla g$.
2. **Tích:** $\nabla(f \cdot g) = (\nabla f) g + f (\nabla g)$ — cẩn thận thứ tự khi $f, g$ là ma trận.
3. **Chain rule:** $\nabla_\mathbf{x} g(\mathbf{u}(\mathbf{x})) = \mathbf{J}_\mathbf{u} \cdot \nabla_\mathbf{u} g$. Đây chính là [[Backpropagation]], không hơn không kém.

## 2. Nguyên tắc / Best practices

1. **Kiểm tra shape trước khi tin công thức.** Nếu gradient không cùng shape với biến, dẫn giải sai — không cần đọc lại từng dòng.
2. **Luôn chạy numerical gradient check khi tự cài đặt.** Xấp xỉ sai phân trung tâm chính xác hơn sai phân tiến một bậc:
   $$\frac{\partial f}{\partial x} \approx \frac{f(x+\varepsilon) - f(x-\varepsilon)}{2\varepsilon}, \quad \varepsilon \approx 10^{-6}$$
   So sánh bằng **sai số tương đối**, không phải tuyệt đối:
   ```python
   def check_grad(fn, grad_fn, x, eps=1e-6):
       g_analytic = grad_fn(x)
       g_num = np.zeros_like(x)
       it = np.nditer(x, flags=['multi_index'])
       while not it.finished:
           i = it.multi_index
           old = x[i]
           x[i] = old + eps; fp = fn(x)
           x[i] = old - eps; fm = fn(x)
           x[i] = old
           g_num[i] = (fp - fm) / (2 * eps)
           it.iternext()
       # sai số tương đối < 1e-6 là đạt
       return np.max(np.abs(g_analytic - g_num) /
                     (np.maximum(1e-8, np.abs(g_analytic) + np.abs(g_num))))
   ```
3. **Rút gọn về vô hướng khi bí.** Viết $f$ dưới dạng tổng các phần tử, lấy $\partial f/\partial x_{ij}$, rồi ghép lại thành ma trận. Chậm nhưng không bao giờ sai.
4. **Dùng trace để "xoay" biểu thức.** $\text{trace}(\mathbf{ABC}) = \text{trace}(\mathbf{BCA})$ cho phép đưa biến cần lấy đạo hàm ra vị trí thuận lợi.
5. **Chỉ tự cài gradient khi đang học.** Trong sản xuất, dùng autodiff (PyTorch/JAX). Nhưng phải hiểu nó làm gì để đọc được lỗi khi gradient nổ hoặc biến mất.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Trộn lẫn hai quy ước layout.** Nửa dẫn giải theo tử số, nửa theo mẫu số → mọi thứ lệch một phép chuyển vị và bạn sẽ "sửa" bằng cách rắc `.T` cho tới khi shape khớp. Chọn một quy ước và ghi rõ ở đầu file.
- **Chọn $\varepsilon$ sai khi check gradient.** $\varepsilon$ quá lớn → sai số xấp xỉ; quá nhỏ ($10^{-10}$) → mất chính xác dấu phẩy động. $10^{-6}$ với `float64` là vùng an toàn. Nếu đang dùng `float32`, gradient check gần như vô nghĩa.
- **Check gradient tại điểm không khả vi.** ReLU tại 0, $\ell_1$ tại 0, hinge loss tại margin — numerical check sẽ báo sai dù code đúng. Kiểm tra ở điểm ngẫu nhiên, tránh biên.
- **Quên hệ số 2.** $\nabla \lVert \mathbf{x} \rVert^2 = 2\mathbf{x}$, không phải $\mathbf{x}$. Sai số này chỉ làm learning rate lệch 2 lần nên **mô hình vẫn hội tụ** — và vì thế bug tồn tại rất lâu mà không bị phát hiện.
- **Không kiểm tra gradient trên dữ liệu nhỏ trước.** Chạy check trên batch 5 mẫu, 3 đặc trưng. Chạy trên dữ liệu thật vừa chậm vừa khó đọc.

## 4. Checklist áp dụng

- [ ] Gradient tôi tính có **cùng shape** với biến không?
- [ ] Tôi đã ghi rõ quy ước layout (tử số/mẫu số) ở đầu file chưa?
- [ ] Tôi đã chạy `check_grad` trên dữ liệu bé (< 10 mẫu) trước khi train chưa?
- [ ] Sai số tương đối có dưới $10^{-6}$ không? Nếu $10^{-3}$–$10^{-5}$: nghi ngờ. Nếu $> 10^{-2}$: chắc chắn sai.
- [ ] Tôi có đang check tại điểm không khả vi (ReLU/hinge tại 0) không?
- [ ] Hàm mất mát của tôi có trung bình theo batch không, và gradient có chia cùng hệ số đó không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| PyTorch `autograd` | Autodiff động; `torch.autograd.gradcheck` là gradient check sẵn có | [pytorch.org](https://pytorch.org/docs/stable/autograd.html) |
| JAX | `grad`, `jacfwd`, `jacrev` — autodiff kiểu hàm, gần với ký hiệu toán nhất | [jax.readthedocs.io](https://jax.readthedocs.io/) |
| SymPy | Đạo hàm ký hiệu, dùng để đối chiếu dẫn giải bằng tay | [sympy.org](https://www.sympy.org/) |
| Matrix Calculus (online) | Nhập biểu thức, trả gradient dạng ma trận | [matrixcalculus.org](http://www.matrixcalculus.org/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 2 "Giải tích ma trận" (mục 2.5 bảng gradient, 2.6 kiểm tra gradient) — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Petersen & Pedersen, *The Matrix Cookbook*, §2 Derivatives — [PDF](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)
- CS231n, *Backpropagation, Intuitions* + *Vector, Matrix, and Tensor Derivatives* — [cs231n.github.io](https://cs231n.github.io/optimization-2/)
- Deisenroth et al., *Mathematics for Machine Learning*, Ch. 5 Vector Calculus — [mml-book.github.io](https://mml-book.github.io/)

## Liên kết

[[Linear Algebra for ML]] · [[Gradient Descent]] · [[Backpropagation]] · [[Linear Regression]] · [[ML]]
