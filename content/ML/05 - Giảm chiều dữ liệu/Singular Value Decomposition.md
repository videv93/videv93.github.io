---
tags: [ml, toán, dimensionality-reduction, linear-algebra]
status: evergreen
---
# Singular Value Decomposition

> SVD là **phân tích ma trận tổng quát nhất**: mọi ma trận, kể cả không vuông, không đối xứng, suy biến, đều phân tích được. [[Principal Component Analysis]], [[Matrix Factorization Collaborative Filtering]], nén ảnh, giả nghịch đảo — tất cả đều là SVD dưới tên khác.

## 1. Khái niệm cốt lõi

Với mọi $\mathbf{A}\in\mathbb{R}^{m\times n}$:
$$\mathbf{A} = \mathbf{U}\boldsymbol{\Sigma}\mathbf{V}^T$$

| Thành phần | Shape | Tính chất |
|---|---|---|
| $\mathbf{U}$ | $m\times m$ | Trực giao; cột = left singular vectors |
| $\boldsymbol{\Sigma}$ | $m\times n$ | Đường chéo, $\sigma_1 \ge \sigma_2 \ge \ldots \ge 0$ |
| $\mathbf{V}$ | $n\times n$ | Trực giao; cột = right singular vectors |

**Diễn giải hình học:** mọi phép biến đổi tuyến tính = **quay** ($\mathbf{V}^T$) → **co giãn theo trục** ($\boldsymbol{\Sigma}$) → **quay** ($\mathbf{U}$). Không có gì khác.

### Quan hệ với trị riêng

| Ma trận | Trị riêng | Vector riêng |
|---|---|---|
| $\mathbf{A}^T\mathbf{A}$ | $\sigma_i^2$ | Cột của $\mathbf{V}$ |
| $\mathbf{A}\mathbf{A}^T$ | $\sigma_i^2$ | Cột của $\mathbf{U}$ |

Vì $\mathbf{A}^T\mathbf{A}$ luôn đối xứng nửa xác định dương ([[Linear Algebra for ML]]), trị riêng của nó luôn thực và không âm ⟹ giá trị suy biến luôn thực và không âm.

### Truncated SVD và định lý Eckart–Young

Giữ $k$ giá trị suy biến lớn nhất:
$$\mathbf{A}_k = \mathbf{U}_k\boldsymbol{\Sigma}_k\mathbf{V}_k^T = \sum_{i=1}^{k}\sigma_i\mathbf{u}_i\mathbf{v}_i^T$$

**Định lý Eckart–Young:** $\mathbf{A}_k$ là **xấp xỉ hạng $k$ tốt nhất có thể** của $\mathbf{A}$ theo chuẩn Frobenius và chuẩn phổ. Không có cách nào tốt hơn.

Đây là lý do SVD không chỉ là "một cách phân tích" — nó là **cách tối ưu** để nén thông tin tuyến tính.

### Nén ảnh — ví dụ trực quan nhất

Ảnh xám $m\times n$ cần $mn$ số. Với truncated SVD hạng $k$, chỉ cần $k(m+n+1)$ số.

Với ảnh $1000\times1000$: gốc $10^6$ số; $k=50$ chỉ cần $\approx 100.050$ số — **tỉ lệ nén 10×**, và ảnh thường vẫn nhận ra rõ ràng. Vẽ đồ thị $\sigma_i$ theo $i$ sẽ thấy chúng tụt dốc rất nhanh: phần lớn "năng lượng" của ảnh tự nhiên nằm ở vài chục thành phần đầu.

### Ứng dụng trong ML

| Ứng dụng | SVD làm gì |
|---|---|
| [[Principal Component Analysis]] | SVD trên dữ liệu đã trừ trung bình |
| [[Matrix Factorization Collaborative Filtering]] | Xấp xỉ hạng thấp của ma trận tiện ích |
| Latent Semantic Analysis | SVD trên ma trận term–document |
| Giả nghịch đảo Moore–Penrose | $\mathbf{A}^\dagger = \mathbf{V}\boldsymbol{\Sigma}^\dagger\mathbf{U}^T$ — nền của [[Linear Regression]] |
| Khử nhiễu | Bỏ các thành phần $\sigma$ nhỏ |
| Số điều kiện | $\sigma_{\max}/\sigma_{\min}$ |

## 2. Nguyên tắc / Best practices

1. **Dùng `full_matrices=False` trong numpy.** Với ma trận rất chữ nhật, "thin SVD" tiết kiệm bộ nhớ khổng lồ mà không mất thông tin cần dùng.
2. **Với ma trận lớn hoặc chỉ cần $k$ thành phần đầu, dùng `randomized_svd` hoặc `svds`.** Nhanh hơn nhiều lần so với SVD đầy đủ.
3. **Vẽ phổ giá trị suy biến trước khi chọn $k$.** Điểm gãy trên đồ thị cho biết cấu trúc thật của dữ liệu.
4. **Chọn $k$ theo tỉ lệ năng lượng giữ lại:** $\sum_{i\le k}\sigma_i^2 / \sum_i\sigma_i^2$. Ngưỡng 95% hoặc 99% là thông lệ.
5. **Với ma trận thưa, dùng `scipy.sparse.linalg.svds`.** SVD đầy đủ sẽ biến ma trận thưa thành dày và làm nổ bộ nhớ.
6. **Nhớ rằng SVD không duy nhất về dấu.** $(\mathbf{u}_i, \mathbf{v}_i)$ và $(-\mathbf{u}_i, -\mathbf{v}_i)$ đều hợp lệ. Đừng ngạc nhiên khi hai thư viện cho dấu ngược nhau.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Chạy SVD đầy đủ trên ma trận lớn.** Độ phức tạp $O(\min(m,n)^2\max(m,n))$. Với ma trận $10^5\times10^4$ là bất khả thi. Luôn hỏi: tôi cần bao nhiêu thành phần?
- **Áp SVD lên ma trận thưa mà không dùng phiên bản thưa.** `np.linalg.svd(sparse.toarray())` là cách nhanh nhất để hết RAM.
- **Nhầm SVD với PCA.** PCA = SVD **sau khi trừ trung bình**. Bỏ bước trừ trung bình, thành phần đầu tiên sẽ chỉ ra hướng của vector trung bình chứ không phải hướng phương sai lớn nhất. Xem [[Principal Component Analysis]].
- **Diễn giải giá trị suy biến như "tầm quan trọng" mà quên thang đo.** $\sigma$ phụ thuộc đơn vị của dữ liệu. Nhân toàn bộ ma trận với 1000 thì mọi $\sigma$ tăng 1000 lần. Chỉ **tỉ lệ** giữa chúng mới có nghĩa.
- **Dùng SVD cho ma trận có giá trị thiếu.** SVD cổ điển không xử lý được `NaN`. Với ma trận tiện ích thưa (phần lớn ô trống), phải dùng matrix factorization tối ưu bằng gradient descent chỉ trên các ô đã biết — xem [[Matrix Factorization Collaborative Filtering]].
- **Bỏ qua bất định về dấu khi so sánh kết quả.** Hai lần chạy có thể cho thành phần lật dấu; đừng kết luận là bug.

## 4. Checklist áp dụng

- [ ] Ma trận của tôi kích thước bao nhiêu? SVD đầy đủ có khả thi không?
- [ ] Ma trận có thưa không? Tôi có đang dùng phiên bản thưa không?
- [ ] Tôi cần bao nhiêu thành phần $k$? Có thể dùng truncated SVD không?
- [ ] Tôi đã vẽ phổ giá trị suy biến chưa? Nó tụt dốc ở đâu?
- [ ] Tỉ lệ năng lượng giữ lại với $k$ tôi chọn là bao nhiêu?
- [ ] Nếu mục tiêu là PCA: tôi đã trừ trung bình chưa?
- [ ] Có giá trị thiếu trong ma trận không? Nếu có, SVD cổ điển không dùng được.

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `np.linalg.svd` | SVD đầy đủ; dùng `full_matrices=False` | [numpy.org](https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html) |
| `scipy.sparse.linalg.svds` | Truncated SVD cho ma trận thưa | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.linalg.svds.html) |
| `sklearn.decomposition.TruncatedSVD` | LSA cho ma trận TF-IDF; **không** trừ trung bình (giữ tính thưa) | [scikit-learn.org](https://scikit-learn.org/stable/modules/decomposition.html#lsa) |
| `sklearn.utils.extmath.randomized_svd` | SVD xấp xỉ nhanh cho ma trận lớn | [scikit-learn.org](https://scikit-learn.org/stable/modules/generated/sklearn.utils.extmath.randomized_svd.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 20 "Phân tích giá trị suy biến" (§20.3 nén ảnh) — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Strang, *Linear Algebra and Learning from Data*, Ch. I.8–I.9, Wellesley-Cambridge Press 2019
- Halko, Martinsson & Tropp, "Finding Structure with Randomness", *SIAM Review* 53(2), 2011 — nền của randomized SVD
- Deisenroth et al., *Mathematics for Machine Learning*, §4.5 "Singular Value Decomposition" — [mml-book.github.io](https://mml-book.github.io/)

## Liên kết

[[Principal Component Analysis]] · [[Linear Algebra for ML]] · [[Matrix Factorization Collaborative Filtering]] · [[Linear Regression]] · [[ML]]
