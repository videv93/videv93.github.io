---
tags: [ml, thuật-toán, unsupervised, clustering]
status: evergreen
---
# K-Means Clustering

> Thuật toán unsupervised được dùng nhiều nhất, và cũng bị dùng sai nhiều nhất. Nó **luôn** trả về $K$ cụm — kể cả khi dữ liệu không có cụm nào. Trách nhiệm kiểm chứng thuộc về bạn, không thuộc về thuật toán.

## 1. Khái niệm cốt lõi

Mục tiêu: tìm $K$ tâm cụm $\mathbf{m}_1..\mathbf{m}_K$ và gán nhãn $\mathbf{z}_i$ cực tiểu hoá **inertia**:
$$J = \sum_{i=1}^{N}\sum_{k=1}^{K} z_{ik}\lVert\mathbf{x}_i - \mathbf{m}_k\rVert_2^2$$

Bài toán này **không lồi** và NP-khó. Thuật toán Lloyd giải xấp xỉ bằng cách lặp hai bước:

1. **Gán:** mỗi điểm về tâm gần nhất (cố định $\mathbf{m}$, tối ưu $\mathbf{z}$)
2. **Cập nhật:** mỗi tâm = trung bình các điểm thuộc nó (cố định $\mathbf{z}$, tối ưu $\mathbf{m}$)

Mỗi bước đều làm $J$ giảm hoặc giữ nguyên ⟹ **đảm bảo hội tụ**, nhưng chỉ về cực tiểu **địa phương**. Xem [[Convex Sets and Functions]].

### Chọn $K$

| Phương pháp | Cách làm | Hạn chế |
|---|---|---|
| **Elbow** | Vẽ $J$ theo $K$, tìm điểm gãy | Điểm gãy thường mơ hồ |
| **Silhouette score** | Đo độ chặt trong cụm vs tách giữa cụm, $\in[-1,1]$ | Thiên vị cụm cầu |
| Gap statistic | So $J$ với dữ liệu ngẫu nhiên tham chiếu | Tốn tính toán |
| **Tri thức miền** | "Chúng tôi cần 5 phân khúc khách hàng" | Cách tốt nhất khi có |

### Ứng dụng thực tế

| Ứng dụng | Cách dùng |
|---|---|
| Phân khúc khách hàng | Cụm theo hành vi mua |
| **Nén ảnh** | $K$ cụm màu → mỗi pixel chỉ cần $\log_2 K$ bit thay vì 24 bit |
| **Tách vật thể trong ảnh** | Cụm pixel theo màu + toạ độ |
| Nén vector (VQ) | Codebook cho tín hiệu |
| Khởi tạo cho mô hình khác | Tâm cụm làm khởi tạo cho GMM |

Nén ảnh là ví dụ trực quan nhất: ảnh 24-bit có $2^{24}$ màu; chạy K-means với $K=16$ trên không gian RGB rồi thay mỗi pixel bằng tâm cụm gần nhất cho ra ảnh vẫn nhận ra được với **16 màu**.

## 2. Nguyên tắc / Best practices

1. **Chuẩn hoá đặc trưng, bắt buộc.** Cùng lý do với [[K-Nearest Neighbors]]: thuật toán hoàn toàn dựa trên khoảng cách Euclidean.
2. **Luôn dùng `k-means++` để khởi tạo.** Nó chọn các tâm ban đầu cách xa nhau, giảm mạnh xác suất rơi vào nghiệm địa phương tồi. Đây là mặc định của sklearn — đừng đổi.
3. **Chạy nhiều lần với seed khác nhau** (`n_init=10` trở lên) và lấy nghiệm có $J$ nhỏ nhất. Vì bài toán không lồi, một lần chạy không nói lên gì.
4. **Vẽ dữ liệu trước khi cụm.** Chiếu xuống 2D bằng [[Principal Component Analysis]] hoặc UMAP. Nếu mắt không thấy cụm, K-means cũng sẽ tạo ra cụm giả.
5. **Kiểm chứng cụm bằng thứ gì đó bên ngoài thuật toán.** Cụm có khác nhau về một biến **không** dùng để cụm không? Nếu không, có thể chúng chỉ là phân hoạch tuỳ tiện.
6. **Với $N$ lớn, dùng `MiniBatchKMeans`.** Nhanh hơn nhiều lần, kết quả gần như tương đương.

## 3. Cạm bẫy / Sai lầm hay gặp

- **K-means luôn tìm ra cụm, kể cả trong nhiễu ngẫu nhiên.** Chạy nó trên dữ liệu Gaussian đồng nhất và bạn vẫn nhận được $K$ cụm "đẹp". Thuật toán không có cách nào nói "dữ liệu này không có cấu trúc cụm".
- **Giả định cụm hình cầu, kích thước tương đương, mật độ tương đương.** Cụm hình vòng cung, hình chữ C, hoặc một cụm to một cụm nhỏ → K-means chia sai hoàn toàn. Dùng DBSCAN (cụm theo mật độ) hoặc Gaussian Mixture (cụm hình elip) thay thế.
- **Nhạy với outlier.** Trung bình bị outlier kéo mạnh. K-medoids dùng điểm dữ liệu thật làm tâm nên bền hơn.
- **Cụm rỗng.** Nếu một tâm không được gán điểm nào, thuật toán vỡ. Thư viện xử lý tự động (khởi tạo lại), nhưng cài đặt tự viết thì phải nhớ.
- **Diễn giải nhãn cụm như nhãn thật.** Cụm 0 và cụm 1 không có thứ tự, không có ý nghĩa. Đổi seed thì số hiệu đổi theo. Đừng bao giờ dùng số hiệu cụm làm đặc trưng số.
- **Chạy K-means trên đặc trưng one-hot.** Trung bình của các vector one-hot không phải một danh mục — nó là một phân phối, và "khoảng cách tới trung bình đó" thường vô nghĩa. Dùng K-modes cho dữ liệu danh mục.
- **Dùng elbow rồi kết luận "có đúng 4 cụm".** Elbow là gợi ý, không phải bằng chứng. Số cụm "đúng" thường không tồn tại.

## 4. Checklist áp dụng

- [ ] Tôi đã chuẩn hoá đặc trưng chưa?
- [ ] Tôi đã vẽ dữ liệu (2D projection) và thật sự thấy cấu trúc cụm chưa?
- [ ] `n_init` có ≥ 10 không? Kết quả có ổn định qua các seed không?
- [ ] $K$ được chọn dựa trên gì: elbow, silhouette, hay nhu cầu nghiệp vụ?
- [ ] Các cụm của tôi có hình cầu và kích thước tương đương không? Nếu không, K-means là sai công cụ.
- [ ] Có outlier nào kéo lệch tâm cụm không?
- [ ] Tôi đã kiểm chứng cụm bằng một biến bên ngoài chưa?
- [ ] Tôi có đang dùng số hiệu cụm như một biến số không? (Đừng.)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.cluster.KMeans` | `init='k-means++'`, `n_init`, thuộc tính `inertia_` | [scikit-learn.org](https://scikit-learn.org/stable/modules/clustering.html#k-means) |
| `MiniBatchKMeans` | Cho $N$ lớn; nhanh hơn nhiều lần | [scikit-learn.org](https://scikit-learn.org/stable/modules/clustering.html#mini-batch-k-means) |
| `sklearn.cluster.DBSCAN` / `HDBSCAN` | Cụm theo mật độ, tự tìm số cụm, có khái niệm "nhiễu" | [scikit-learn.org](https://scikit-learn.org/stable/modules/clustering.html#dbscan) |
| `sklearn.mixture.GaussianMixture` | Cụm hình elip, gán mềm (xác suất) | [scikit-learn.org](https://scikit-learn.org/stable/modules/mixture.html) |
| `silhouette_score` | Đánh giá chất lượng cụm | [scikit-learn.org](https://scikit-learn.org/stable/modules/clustering.html#silhouette-coefficient) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 10 "Phân cụm K-means" (mục 10.4 phân cụm chữ số, 10.5 tách vật thể, 10.6 nén ảnh) — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Arthur & Vassilvitskii, "k-means++: The Advantages of Careful Seeding", SODA 2007 — [PDF](https://theory.stanford.edu/~sergei/papers/kMeansPP-soda.pdf)
- scikit-learn, *Clustering* — so sánh trực quan các thuật toán trên dữ liệu khó — [scikit-learn.org](https://scikit-learn.org/stable/modules/clustering.html)
- Bishop, *Pattern Recognition and Machine Learning*, §9.1 "K-means Clustering", Springer 2006

## Liên kết

[[K-Nearest Neighbors]] · [[Principal Component Analysis]] · [[Data and Feature Engineering]] · [[Singular Value Decomposition]] · [[ML]]
