---
tags: [ml, toán, linear-algebra]
status: evergreen
---
# Linear Algebra for ML

> Đại số tuyến tính không phải môn phụ trợ của ML — nó **là** ngôn ngữ của ML. Mọi mô hình trong vault này cuối cùng đều quy về "nhân một ma trận với một vector rồi tối ưu".

## 1. Khái niệm cốt lõi

Quy ước ký hiệu dùng thống nhất toàn vault (theo *Machine Learning cơ bản*):

| Ký hiệu | Nghĩa |
|---|---|
| $x$ (thường, nghiêng) | số vô hướng |
| $\mathbf{x}$ (thường, đậm) | vector **cột** |
| $\mathbf{X}$ (hoa, đậm) | ma trận |
| $\mathbf{X}^T$ / $\mathbf{X}^H$ | chuyển vị / chuyển vị liên hợp (Hermitian) |
| $\mathbf{x}_i$ | cột thứ $i$ của $\mathbf{X}$ |
| $\mathbf{I}$ | ma trận đơn vị |

> [!warning] Cạm bẫy số một của người mới
> Trong ML, **dữ liệu được xếp theo cột**: $\mathbf{X} \in \mathbb{R}^{d \times N}$ với $d$ chiều đặc trưng, $N$ điểm dữ liệu. Nhưng `numpy`, `pandas` và `scikit-learn` đều xếp **theo hàng**: `X.shape == (N, d)`. Mọi công thức trong sách phải chuyển vị lại khi cài đặt. Đây là nguồn bug phổ biến nhất khi đọc sách rồi viết code.

Các khối kiến thức, theo đúng thứ tự cần dùng:

| Khái niệm | Vì sao ML cần nó | Xuất hiện ở note nào |
|---|---|---|
| Nhân ma trận, chuyển vị | Biểu diễn cả một tầng mạng bằng một phép nhân | [[Multilayer Perceptron]] |
| Ma trận nghịch đảo, giả nghịch đảo | Nghiệm đóng của bình phương tối thiểu | [[Linear Regression]] |
| Định thức, hạng | Biết khi nào hệ vô số nghiệm → khi nào cần regularization | [[Regularization]] |
| Tổ hợp tuyến tính, không gian sinh | Hiểu "dữ liệu thật sự nằm trong không gian mấy chiều" | [[Principal Component Analysis]] |
| Hệ trực chuẩn, ma trận trực giao | $\mathbf{U}^T\mathbf{U} = \mathbf{I}$ → phép quay không làm méo khoảng cách | [[Singular Value Decomposition]] |
| Trị riêng, vector riêng, chéo hoá | Trục chính của đám mây dữ liệu | [[Principal Component Analysis]] |
| Ma trận xác định dương (PSD) | Đảm bảo hàm mất mát lồi → có nghiệm toàn cục | [[Convex Sets and Functions]] |
| Chuẩn ($\ell_0, \ell_1, \ell_2$, Frobenius) | Đo sai số và đo độ phức tạp mô hình | [[Loss Functions]], [[Regularization]] |
| Vết (trace) | Rút gọn dẫn giải gradient của hàm ma trận | [[Matrix Calculus]] |

### Chuẩn — bảng tra nhanh

| Chuẩn | Công thức | Tính chất quyết định |
|---|---|---|
| $\ell_0$ | số phần tử khác 0 | Không phải chuẩn thật, không lồi → không tối ưu trực tiếp được |
| $\ell_1$ | $\sum_i \lvert x_i \rvert$ | Lồi, **tạo nghiệm thưa** → dùng cho feature selection |
| $\ell_2$ | $\sqrt{\sum_i x_i^2}$ | Khả vi mọi nơi → dễ tối ưu, nghiệm co đều chứ không thưa |
| $\ell_\infty$ | $\max_i \lvert x_i \rvert$ | Dùng trong adversarial robustness |
| Frobenius | $\sqrt{\sum_{ij} x_{ij}^2}$ | $\ell_2$ cho ma trận; dùng trong [[Matrix Factorization Collaborative Filtering]] |

## 2. Nguyên tắc / Best practices

1. **Luôn viết shape ra giấy trước khi viết code.** `(d, N)` hay `(N, d)`? Một dòng comment shape ở mỗi bước tiết kiệm hàng giờ debug.
2. **Không bao giờ gọi `np.linalg.inv`.** Dùng `np.linalg.solve(A, b)` thay cho `inv(A) @ b` — nhanh hơn và ổn định số hơn nhiều lần. Nếu ma trận suy biến, dùng `np.linalg.pinv` (giả nghịch đảo Moore–Penrose).
3. **Kiểm tra hạng trước khi nghịch đảo.** `np.linalg.matrix_rank(X)` < số cột nghĩa là có cột phụ thuộc tuyến tính → nghiệm bình phương tối thiểu không duy nhất → phải regularize.
4. **Ma trận đối xứng thì dùng `eigh`, không dùng `eig`.** `np.linalg.eigh` khai thác tính đối xứng, trả trị riêng thực đã sắp xếp, nhanh và chính xác hơn.
5. **Nhớ ba tính chất PSD.** $\mathbf{A}$ đối xứng là PSD ⟺ mọi trị riêng $\ge 0$ ⟺ $\mathbf{x}^T\mathbf{A}\mathbf{x} \ge 0\ \forall \mathbf{x}$ ⟺ tồn tại $\mathbf{B}$ sao cho $\mathbf{A} = \mathbf{B}^T\mathbf{B}$. Dạng thứ ba giải thích vì sao mọi ma trận hiệp phương sai đều PSD.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Nhầm "khả nghịch" với "hạng đầy đủ theo cột".** $\mathbf{X}^T\mathbf{X}$ khả nghịch ⟺ $\mathbf{X}$ có hạng đầy đủ theo cột. Với $N < d$ (ít dữ liệu, nhiều đặc trưng) thì **không bao giờ** khả nghịch — đây chính là lý do toán học khiến [[Linear Regression]] cần [[Regularization]].
- **Quên rằng trị riêng của ma trận không đối xứng có thể là số phức.** Ma trận hiệp phương sai luôn đối xứng nên an toàn; ma trận trọng số của mạng neuron thì không.
- **Chuẩn hoá nhầm trục.** `X.mean(axis=0)` với layout `(N, d)` cho trung bình từng đặc trưng (đúng); `axis=1` cho trung bình từng mẫu (gần như luôn sai).
- **Dùng $\ell_0$ để "chọn feature".** Nghe hợp lý nhưng bài toán NP-khó. Thực tế luôn thay bằng $\ell_1$ — đó là toàn bộ ý tưởng của LASSO.
- **Tin vào định thức để kiểm tra suy biến.** Với ma trận lớn, định thức tràn số hoặc về 0 do làm tròn. Dùng **số điều kiện** `np.linalg.cond` hoặc giá trị suy biến nhỏ nhất thay thế.

## 4. Checklist áp dụng

- [ ] Tôi đã viết shape của mọi ma trận trong công thức ra giấy chưa?
- [ ] Layout dữ liệu của tôi là `(N, d)` hay `(d, N)`, và có nhất quán toàn pipeline không?
- [ ] Tôi có đang gọi `inv()` ở đâu không? Thay được bằng `solve()` hoặc `pinv()` không?
- [ ] Số mẫu $N$ có lớn hơn số đặc trưng $d$ không? Nếu không, tôi đã regularize chưa?
- [ ] Ma trận tôi đang phân tích trị riêng có đối xứng không? Nếu có, tôi dùng `eigh` chưa?
- [ ] Số điều kiện `cond(X)` có vượt $10^{10}$ không? Nếu có, kết quả số học không đáng tin.

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| NumPy | Chuẩn de-facto cho mảng nhiều chiều; `np.linalg` đủ cho toàn bộ vault này | [numpy.org](https://numpy.org/doc/stable/reference/routines.linalg.html) |
| SciPy `linalg` | Phong phú hơn numpy: phân tích Cholesky, QR, LU, ma trận thưa | [scipy.org](https://docs.scipy.org/doc/scipy/reference/linalg.html) |
| The Matrix Cookbook | Sổ tay tra công thức, không giải thích — để cạnh bàn | [PDF](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf) |
| 3Blue1Brown — Essence of Linear Algebra | Xây trực giác hình học trước khi vào công thức | [YouTube](https://www.3blue1brown.com/topics/linear-algebra) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 1 "Ôn tập Đại số tuyến tính" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Deisenroth, Faisal, Ong, *Mathematics for Machine Learning*, Ch. 2–4 — [mml-book.github.io](https://mml-book.github.io/)
- Gilbert Strang, *Introduction to Linear Algebra* / MIT 18.06 — [ocw.mit.edu](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- Petersen & Pedersen, *The Matrix Cookbook* — [PDF](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)

## Liên kết

[[Matrix Calculus]] · [[Singular Value Decomposition]] · [[Principal Component Analysis]] · [[Convex Sets and Functions]] · [[ML]]
