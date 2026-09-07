---
tags: [ml, thuật-toán, dimensionality-reduction, unsupervised]
status: evergreen
---
# Principal Component Analysis

> Kỹ thuật giảm chiều được dùng nhiều nhất. Ý tưởng một câu: **tìm những hướng mà dữ liệu trải rộng nhất, rồi vứt phần còn lại**. Điểm mấu chốt cần hiểu — PCA hoàn toàn **không biết** nhãn của bạn.

## 1. Khái niệm cốt lõi

Hai cách phát biểu, dẫn tới **cùng một nghiệm**:

| Góc nhìn | Mục tiêu |
|---|---|
| Cực đại phương sai | Tìm hướng chiếu mà phương sai của dữ liệu chiếu là lớn nhất |
| Cực tiểu sai số tái tạo | Tìm không gian con $k$ chiều gần dữ liệu nhất theo $\ell_2$ |

### Các bước thực hiện

1. **Trừ trung bình:** $\bar{\mathbf{X}} = \mathbf{X} - \boldsymbol{\mu}$. **Bỏ bước này thì không còn là PCA.**
2. Tính ma trận hiệp phương sai $\mathbf{S} = \frac{1}{N}\bar{\mathbf{X}}\bar{\mathbf{X}}^T$
3. Tìm trị riêng và vector riêng của $\mathbf{S}$ (dùng `eigh` vì $\mathbf{S}$ đối xứng)
4. Sắp xếp giảm dần theo trị riêng, lấy $k$ vector riêng đầu → $\mathbf{U}_k$
5. Chiếu: $\mathbf{Z} = \mathbf{U}_k^T\bar{\mathbf{X}}$
6. Tái tạo (nếu cần): $\hat{\mathbf{X}} = \mathbf{U}_k\mathbf{Z} + \boldsymbol{\mu}$

### Quan hệ với SVD

Trong thực tế **không ai** tính ma trận hiệp phương sai rồi phân tích trị riêng — chạy [[Singular Value Decomposition]] trực tiếp trên $\bar{\mathbf{X}}$ ổn định số hơn nhiều:

| Từ SVD $\bar{\mathbf{X}} = \mathbf{U}\boldsymbol{\Sigma}\mathbf{V}^T$ | Tương ứng trong PCA |
|---|---|
| Cột của $\mathbf{U}$ | Thành phần chính |
| $\sigma_i^2/N$ | Phương sai giải thích bởi thành phần $i$ |

Tính $\mathbf{S}$ tường minh **bình phương số điều kiện** của bài toán — với dữ liệu có thang lệch, kết quả mất chính xác đáng kể.

### Chọn số chiều $k$

$$\text{Tỉ lệ phương sai giữ lại} = \frac{\sum_{i=1}^{k}\lambda_i}{\sum_{i=1}^{d}\lambda_i}$$

| Cách chọn | Ngưỡng thông dụng |
|---|---|
| Tỉ lệ phương sai | 95% hoặc 99% |
| Scree plot | Điểm gãy trên đồ thị $\lambda_i$ |
| Trực quan hoá | $k=2$ hoặc $3$ — không cần lý do khác |
| Tiền xử lý cho mô hình khác | Dò $k$ như một siêu tham số |

sklearn cho phép `PCA(n_components=0.95)` — truyền thẳng tỉ lệ mong muốn.

### Ứng dụng

| Ứng dụng | Cách dùng |
|---|---|
| Trực quan hoá | Chiếu xuống 2D/3D để nhìn cấu trúc |
| Tiền xử lý cho [[K-Nearest Neighbors]] / [[K-Means Clustering]] | Chống lời nguyền số chiều |
| Khử nhiễu | Nhiễu thường nằm ở thành phần phương sai nhỏ |
| **Eigenfaces** | PCA trên ảnh khuôn mặt — ứng dụng kinh điển |
| Nén | Giữ 95% phương sai với 10% số chiều |
| Khử đa cộng tuyến | Thành phần chính trực giao theo định nghĩa |

## 2. Nguyên tắc / Best practices

1. **Chuẩn hoá đặc trưng trước, khi chúng khác đơn vị.** PCA cực đại phương sai; một đặc trưng tính bằng VNĐ (thang $10^9$) sẽ trở thành thành phần chính thứ nhất bất kể nó có ý nghĩa hay không. Với đặc trưng cùng đơn vị (pixel), chỉ trừ trung bình là đủ.
2. **`fit` trên train, `transform` trên test.** PCA là một bước học — fit trên toàn bộ dữ liệu là rò rỉ. Xem [[Model Validation]].
3. **Luôn vẽ tỉ lệ phương sai tích luỹ.** Nó cho biết dữ liệu thật sự có bao nhiêu chiều.
4. **Bọc trong `Pipeline`.** `Pipeline([('scale', StandardScaler()), ('pca', PCA(0.95)), ('clf', SVC())])`.
5. **Với dữ liệu văn bản thưa, dùng `TruncatedSVD` thay vì `PCA`.** `PCA` trừ trung bình → phá vỡ tính thưa → nổ bộ nhớ.
6. **Nếu mục tiêu là tách lớp, cân nhắc [[Linear Discriminant Analysis]].** PCA tối ưu phương sai, không tối ưu khả năng phân biệt.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Quên trừ trung bình.** Thành phần đầu tiên sẽ chỉ về hướng của vector trung bình — thường vô nghĩa. sklearn làm tự động; cài đặt tự viết thì phải nhớ.
- **PCA không biết nhãn — và điều đó có thể gây hại.** Hướng phương sai lớn nhất không nhất thiết là hướng phân biệt lớp tốt nhất. Có những tập dữ liệu mà thành phần chính thứ nhất **xoá sạch** tín hiệu phân lớp. Đây là điểm khác biệt cốt lõi với LDA.
- **Không chuẩn hoá khi đặc trưng khác đơn vị.** Trên dữ liệu bất động sản (giá tính bằng tỉ, diện tích bằng m², số tầng), PC1 sẽ gần như hoàn toàn là "giá" — hoàn toàn vô dụng.
- **Diễn giải thành phần chính như khái niệm có ý nghĩa.** PC1 là một **tổ hợp tuyến tính** của mọi đặc trưng gốc. Đôi khi nó tương ứng với thứ diễn giải được, thường thì không. Đừng ép ý nghĩa vào nó.
- **Fit PCA trên toàn bộ dữ liệu trước khi chia train/test.** Dạng rò rỉ tinh vi và rất phổ biến.
- **Dùng PCA cho cấu trúc phi tuyến.** PCA chỉ tìm không gian con **tuyến tính**. Dữ liệu nằm trên đường xoắn ốc hoặc mặt cong sẽ bị chiếu hỏng. Dùng UMAP, t-SNE (để trực quan hoá) hoặc kernel PCA.
- **Dùng t-SNE/UMAP làm tiền xử lý cho mô hình.** Chúng dùng để **nhìn**, không dùng để **train** — chúng không có phép biến đổi ổn định áp dụng được cho dữ liệu mới, và khoảng cách trong không gian nhúng không đáng tin.

## 4. Checklist áp dụng

- [ ] Đặc trưng của tôi có cùng đơn vị không? Nếu không, tôi đã chuẩn hoá chưa?
- [ ] PCA có được `fit` chỉ trên train không?
- [ ] Tôi đã vẽ đồ thị phương sai tích luỹ chưa? $k$ tôi chọn giữ lại bao nhiêu %?
- [ ] Dữ liệu của tôi có thưa không? Nếu có, tôi dùng `TruncatedSVD` chứ?
- [ ] Mục tiêu của tôi là nén hay là tách lớp? Nếu tách lớp, tôi đã cân nhắc LDA chưa?
- [ ] Cấu trúc dữ liệu có phi tuyến không? PCA có phù hợp không?
- [ ] Tôi có đang gán ý nghĩa cho từng thành phần chính không? Có căn cứ gì không?
- [ ] Mô hình sau PCA có tốt hơn mô hình không PCA không? (Kiểm tra chứ đừng giả định.)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.decomposition.PCA` | `n_components` nhận cả số nguyên lẫn tỉ lệ; có `whiten` | [scikit-learn.org](https://scikit-learn.org/stable/modules/decomposition.html#pca) |
| `IncrementalPCA` | Cho dữ liệu không vừa RAM, xử lý theo batch | [scikit-learn.org](https://scikit-learn.org/stable/modules/decomposition.html#incremental-pca) |
| `KernelPCA` | Phiên bản phi tuyến qua kernel trick | [scikit-learn.org](https://scikit-learn.org/stable/modules/decomposition.html#kernel-pca) |
| UMAP | Giảm chiều phi tuyến; nhanh hơn t-SNE, giữ cấu trúc toàn cục tốt hơn | [umap-learn.readthedocs.io](https://umap-learn.readthedocs.io/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 21 "Phân tích thành phần chính" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Jolliffe & Cadima, "Principal component analysis: a review and recent developments", *Phil. Trans. R. Soc. A* 374, 2016 — [doi:10.1098/rsta.2015.0202](https://doi.org/10.1098/rsta.2015.0202)
- Turk & Pentland, "Eigenfaces for Recognition", *J. Cognitive Neuroscience* 3(1), 1991 — [doi:10.1162/jocn.1991.3.1.71](https://doi.org/10.1162/jocn.1991.3.1.71)
- scikit-learn, *Decomposing signals in components* — [scikit-learn.org](https://scikit-learn.org/stable/modules/decomposition.html)

## Liên kết

[[Singular Value Decomposition]] · [[Linear Discriminant Analysis]] · [[K-Nearest Neighbors]] · [[Data and Feature Engineering]] · [[ML]]
