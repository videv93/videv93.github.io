---
tags: [ml, recommender-system, collaborative-filtering, dimensionality-reduction]
status: evergreen
---
# Matrix Factorization Collaborative Filtering

> Kỹ thuật thắng Netflix Prize và vẫn là xương sống của hệ gợi ý hiện đại. Ý tưởng: mỗi người dùng và mỗi sản phẩm được biểu diễn bằng một vector **latent factor** ngắn, và mức độ ưa thích chỉ là tích vô hướng giữa chúng.

## 1. Khái niệm cốt lõi

Xấp xỉ [[Utility Matrix]] bằng tích hai ma trận hạng thấp:
$$\mathbf{Y} \approx \mathbf{X}^T\mathbf{W}, \qquad \mathbf{X}\in\mathbb{R}^{k\times M},\ \mathbf{W}\in\mathbb{R}^{k\times N}$$

- $\mathbf{x}_i$ — vector $k$ chiều mô tả **sản phẩm** $i$
- $\mathbf{w}_j$ — vector $k$ chiều mô tả **sở thích** người dùng $j$
- $\hat{y}_{ij} = \mathbf{x}_i^T\mathbf{w}_j$

$k$ thường 20–200, rất nhỏ so với $M, N$. Số tham số giảm từ $MN$ xuống $k(M+N)$.

> [!note] Latent factor học được, không phải do người định nghĩa
> Ở [[Content-Based Recommendation]], **bạn** phải định nghĩa đặc trưng sản phẩm (thể loại, năm, đạo diễn). Ở đây, mô hình **tự học** $\mathbf{x}_i$ từ hành vi. Các chiều học được đôi khi tương ứng với khái niệm nhận ra được ("mức độ hành động", "phim nghệ thuật vs thương mại"), nhưng thường thì không — và đó không phải vấn đề, trừ khi bạn cần giải thích.

### Hàm mất mát — chỉ trên ô đã biết

$$\mathcal{L} = \frac{1}{2s}\sum_{(i,j)\in\mathcal{S}}(y_{ij} - \mathbf{x}_i^T\mathbf{w}_j)^2 + \frac{\lambda}{2}\left(\lVert\mathbf{X}\rVert_F^2 + \lVert\mathbf{W}\rVert_F^2\right)$$

$\mathcal{S}$ = tập ô **đã biết**, $s = |\mathcal{S}|$.

Đây là khác biệt then chốt so với [[Singular Value Decomposition]] cổ điển: SVD đòi ma trận đầy đủ và tối ưu trên **mọi** ô, kể cả ô trống mà ta phải bịa giá trị. Matrix factorization chỉ tối ưu trên ô đã quan sát — đúng đắn hơn về mặt thống kê, nhưng trả giá bằng việc **mất nghiệm đóng**.

### Cách giải: ALS

Hàm mất mát **không lồi** theo $(\mathbf{X},\mathbf{W})$ cùng lúc — có tích của hai biến. Nhưng nó **lồi theo từng biến khi cố định biến kia**. Đó là cấu trúc để dùng:

**Alternating Least Squares (ALS):**
1. Cố định $\mathbf{X}$, giải $\mathbf{W}$ → mỗi cột là một bài toán Ridge độc lập
2. Cố định $\mathbf{W}$, giải $\mathbf{X}$ → tương tự
3. Lặp cho tới hội tụ

Mỗi bước có **nghiệm đóng** và các cột độc lập nên **song song hoá hoàn hảo** — đây là lý do ALS thống trị trong hệ thống phân tán (Spark MLlib).

Cách thay thế: SGD trên từng cặp $(i,j)$ đã biết. Xem [[Gradient Descent Variants]].

### Bias term — cải tiến rẻ mà hiệu quả

$$\hat{y}_{ij} = \mu + b_i + b_j + \mathbf{x}_i^T\mathbf{w}_j$$

| Số hạng | Nắm bắt |
|---|---|
| $\mu$ | Trung bình toàn cục |
| $b_i$ | "Phim này nói chung hay/dở" |
| $b_j$ | "Người này nói chung dễ/khó tính" |
| $\mathbf{x}_i^T\mathbf{w}_j$ | Tương tác thật sự giữa sở thích và sản phẩm |

Riêng ba số hạng bias đã giải thích phần lớn biến thiên rating. Bổ sung chúng gần như luôn cải thiện kết quả và tốn rất ít.

## 2. Nguyên tắc / Best practices

1. **Luôn thêm bias term.** Cải thiện lớn, chi phí gần bằng 0.
2. **Dò $k$ và $\lambda$ cùng nhau.** $k$ lớn cần $\lambda$ lớn. Điểm khởi đầu: $k \in \{20, 50, 100\}$, $\lambda$ trên lưới log.
3. **Khởi tạo ngẫu nhiên nhỏ.** Khởi tạo bằng 0 khiến gradient bằng 0 vĩnh viễn — mô hình không học gì. Dùng $\mathcal{N}(0, 0.1)$.
4. **ALS cho hệ phân tán, SGD cho một máy.** ALS song song hoá tốt hơn; SGD tốn ít bộ nhớ hơn.
5. **Với implicit feedback, dùng ALS có trọng số tin cậy.** Thuật toán của Hu–Koren–Volinsky xử lý đúng vấn đề "không có tín hiệu âm" nêu ở [[Utility Matrix]].
6. **Đánh giá bằng metric xếp hạng, không chỉ RMSE.** Bài học lớn nhất từ Netflix Prize: mô hình thắng cuộc (tối ưu RMSE) chưa bao giờ được triển khai đầy đủ, vì RMSE không đo đúng thứ người dùng trải nghiệm.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Áp SVD cổ điển lên ma trận tiện ích.** Nó không xử lý ô trống. Điền 0 rồi chạy SVD sẽ dạy mô hình rằng mọi thứ chưa xem đều bị ghét. "SVD" trong tài liệu recommender gần như luôn nghĩa là matrix factorization tối ưu bằng gradient, không phải SVD đại số tuyến tính.
- **Khởi tạo bằng 0.** Gradient của $\mathbf{x}_i^T\mathbf{w}_j$ theo $\mathbf{x}_i$ là $\mathbf{w}_j$ — nếu cả hai đều 0 thì mọi gradient đều 0 mãi mãi.
- **Không regularize.** Người dùng có 3 rating và $k=100$ latent factor → overfit tuyệt đối.
- **Cold start vẫn bất lực.** Người dùng mới không có $\mathbf{w}_j$, sản phẩm mới không có $\mathbf{x}_i$. Đây là điểm yếu chung của mọi collaborative filtering.
- **Cố diễn giải latent factor.** Chúng không có ý nghĩa được đảm bảo, không có thứ tự cố định, và đổi seed thì đổi hoàn toàn. Nếu bạn cần giải thích cho người dùng, dùng item–item CF hoặc content-based.
- **Chia train/test ngẫu nhiên trên dữ liệu có thời gian.** Xem [[Model Validation]].
- **Tối ưu RMSE rồi triển khai để xếp hạng top-N.** Xem best practice số 6 — đây là bài học đắt giá nhất trong lịch sử ngành recommender.
- **Quên rằng bài toán không lồi.** ALS hội tụ về điểm dừng, không phải nghiệm toàn cục. Chạy nhiều khởi tạo.

## 4. Checklist áp dụng

- [ ] Tôi có thêm bias term ($\mu, b_i, b_j$) không?
- [ ] Khởi tạo có ngẫu nhiên (khác 0) không?
- [ ] $k$ và $\lambda$ được dò cùng nhau chứ?
- [ ] Tôi chỉ tối ưu trên ô **đã biết** chứ không điền 0 vào ô trống?
- [ ] Dữ liệu là explicit hay implicit? Nếu implicit, tôi dùng ALS có trọng số chứ?
- [ ] Metric của tôi đo xếp hạng (Precision@k, NDCG) hay chỉ RMSE?
- [ ] Tôi chia train/test theo thời gian chứ?
- [ ] Kết quả có ổn định qua các seed khởi tạo không?
- [ ] Tôi có đường dẫn dự phòng cho cold start không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `implicit` | ALS và BPR cho implicit feedback; nhanh, có GPU | [implicit.readthedocs.io](https://implicit.readthedocs.io/) |
| Surprise `SVD` | Matrix factorization của Simon Funk, có bias — tên gây hiểu nhầm | [surpriselib.com](https://surpriselib.com/) |
| Spark MLlib ALS | ALS phân tán cho dữ liệu rất lớn | [spark.apache.org](https://spark.apache.org/docs/latest/ml-collaborative-filtering.html) |
| LightFM | Mô hình lai: matrix factorization + đặc trưng nội dung → xử lý cold start | [making.lyst.com/lightfm](https://making.lyst.com/lightfm/docs/home.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 19 "Lọc cộng tác phân tích ma trận" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Koren, Bell & Volinsky, "Matrix Factorization Techniques for Recommender Systems", *IEEE Computer* 42(8), 2009 — [doi:10.1109/MC.2009.263](https://doi.org/10.1109/MC.2009.263)
- Hu, Koren & Volinsky, "Collaborative Filtering for Implicit Feedback Datasets", ICDM 2008 — [PDF](http://yifanhu.net/PUB/cf.pdf)
- Netflix Tech Blog, "Netflix Recommendations: Beyond the 5 stars" — vì sao RMSE không đủ — [netflixtechblog.com](https://netflixtechblog.com/netflix-recommendations-beyond-the-5-stars-part-1-55838468f429)

## Liên kết

[[Utility Matrix]] · [[Singular Value Decomposition]] · [[Neighborhood-Based Collaborative Filtering]] · [[Regularization]] · [[ML]]
