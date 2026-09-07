---
tags: [ml, recommender-system, data]
status: evergreen
---
# Utility Matrix

> Cấu trúc dữ liệu gốc của mọi hệ thống gợi ý: một ma trận **người dùng × sản phẩm** mà bạn chỉ biết vài phần trăm số ô. Toàn bộ bài toán gợi ý là **điền vào những ô còn trống**.

## 1. Khái niệm cốt lõi

$\mathbf{Y}\in\mathbb{R}^{M\times N}$: $M$ sản phẩm, $N$ người dùng, $y_{ij}$ = mức độ ưa thích của người dùng $j$ với sản phẩm $i$. Phần lớn ô là **trống** (chưa biết, không phải bằng 0).

### Rating tường minh vs ẩn

| | **Explicit** (tường minh) | **Implicit** (ẩn) |
|---|---|---|
| Ví dụ | Đánh sao 1–5, like/dislike | Lượt click, thời gian xem, mua hàng |
| Lượng dữ liệu | Ít | **Rất nhiều** |
| Độ tin cậy | Cao | Thấp — click không có nghĩa là thích |
| Ô trống nghĩa là | Chưa biết | **Nhập nhằng**: chưa thấy, hay đã thấy và không thích? |
| Có tín hiệu âm | Có | **Không** — đây là khó khăn cốt lõi |

Hệ thống thực tế gần như luôn dùng implicit, vì nó phong phú hơn hàng nghìn lần. Nhưng thiếu tín hiệu âm khiến ta không thể chỉ áp thẳng các kỹ thuật hồi quy quen thuộc.

### Độ thưa (sparsity)

$$\text{sparsity} = 1 - \frac{\text{số ô đã biết}}{M\times N}$$

MovieLens 100k: 943 người dùng × 1.682 phim = 1.586.126 ô, chỉ 100.000 ô có rating ⟹ **sparsity ≈ 93.7%**. Với hệ thống thương mại thật (hàng triệu sản phẩm), con số thường vượt **99.9%**.

Điều này định hình mọi quyết định kỹ thuật:

| Hệ quả của độ thưa | Ý nghĩa |
|---|---|
| Không được lưu ma trận dày | $10^6\times10^6$ `float64` = 8 TB. Bắt buộc dùng định dạng thưa |
| Không dùng được SVD cổ điển | Nó không xử lý ô trống — xem [[Matrix Factorization Collaborative Filtering]] |
| Hai người dùng hiếm khi chồng lấn | Tương quan tính trên 2–3 sản phẩm chung là vô nghĩa |
| Cần nhiều mẫu để đánh giá | Test trên tập thưa có variance rất cao |

### Vấn đề cold start

| Loại | Tình huống | Giải pháp |
|---|---|---|
| **Người dùng mới** | Không có lịch sử | Hỏi sở thích lúc đăng ký; gợi ý phổ biến; dùng thông tin nhân khẩu |
| **Sản phẩm mới** | Chưa ai đánh giá | **[[Content-Based Recommendation]]** — dùng mô tả sản phẩm |
| **Hệ thống mới** | Không có dữ liệu nào | Bắt đầu bằng content-based, chuyển dần sang collaborative |

Cold start sản phẩm là lý do chính khiến content-based vẫn tồn tại dù collaborative filtering thường chính xác hơn.

### Chuẩn hoá rating — bước bắt buộc

Người dùng có thang đánh giá rất khác nhau: người "dễ tính" cho toàn 4–5 sao, người "khó tính" cho 2–3 sao. So sánh trực tiếp là so sánh thang đo, không phải sở thích.

| Cách | Công thức | Ghi chú |
|---|---|---|
| **Trừ trung bình người dùng** | $\hat{y}_{ij} = y_{ij} - \bar{y}_j$ | Phổ biến nhất |
| Trừ trung bình sản phẩm | $\hat{y}_{ij} = y_{ij} - \bar{y}_i$ | Cho item-item |
| Z-score | $(y_{ij}-\bar{y}_j)/\sigma_j$ | Cả tâm lẫn thang |
| Bias baseline | $y_{ij} - (\mu + b_i + b_j)$ | Tốt nhất — xem [[Matrix Factorization Collaborative Filtering]] |

Sau khi trừ trung bình, ô trống được đặt bằng **0** — nghĩa là "trung tính", không phải "ghét". Đây là thủ thuật quan trọng: nó biến ma trận thưa thành ma trận dùng được mà không bịa ra tín hiệu âm giả.

## 2. Nguyên tắc / Best practices

1. **Luôn dùng định dạng ma trận thưa.** `scipy.sparse.csr_matrix`. Chuyển sang dày là cách nhanh nhất để sập.
2. **Chuẩn hoá trước khi tính độ tương tự.** Không có bước này, mọi độ tương tự chỉ đo "ai hào phóng hơn".
3. **Đo và báo cáo độ thưa ngay đầu.** Nó dự báo bài toán khó tới đâu tốt hơn bất kỳ chỉ số nào khác.
4. **Xử lý cold start như một đường dẫn riêng, không phải trường hợp ngoại lệ.** Trong hệ thống thật, người dùng mới và sản phẩm mới xuất hiện liên tục.
5. **Với implicit feedback, mô hình hoá độ tin cậy chứ không phải giá trị.** Xem ALS cho implicit feedback (Hu, Koren & Volinsky).
6. **Chia train/test theo thời gian, không ngẫu nhiên.** Hành vi người dùng có thứ tự thời gian; xáo trộn ngẫu nhiên cho mô hình nhìn thấy tương lai. Xem [[Model Validation]].

## 3. Cạm bẫy / Sai lầm hay gặp

- **Coi ô trống là 0.** Ô trống nghĩa là **chưa biết**, không phải "ghét". Điền 0 vào ma trận rating thô sẽ dạy mô hình rằng mọi thứ chưa xem đều tệ.
- **Không chuẩn hoá rồi tính cosine similarity.** Hai người dùng đều cho điểm cao mọi thứ sẽ có độ tương tự cao — dù sở thích hoàn toàn khác nhau.
- **Tính tương quan trên quá ít sản phẩm chung.** Hai người dùng chung 2 phim có thể ra tương quan 1.0. Đặt ngưỡng tối thiểu (ví dụ ≥ 5 sản phẩm chung) trước khi tin.
- **Đánh giá bằng RMSE trên rating rồi triển khai để xếp hạng.** RMSE tốt không đồng nghĩa top-10 gợi ý tốt. Dùng Precision@k, Recall@k, NDCG.
- **Bỏ qua thiên lệch phổ biến (popularity bias).** Chỉ gợi ý sản phẩm phổ biến cho metric đẹp nhưng giết chết tính đa dạng. Đo cả coverage và độ mới.
- **Bỏ qua vòng phản hồi.** Hệ thống gợi ý ảnh hưởng tới dữ liệu tương lai của chính nó: người dùng chỉ đánh giá thứ được gợi ý. Dữ liệu bạn thu thập **không** là mẫu ngẫu nhiên.
- **Chia ngẫu nhiên bỏ qua thời gian.** Xem best practice số 6.

## 4. Checklist áp dụng

- [ ] Dữ liệu của tôi là explicit hay implicit feedback?
- [ ] Độ thưa là bao nhiêu phần trăm?
- [ ] Tôi đang lưu ma trận ở định dạng thưa chứ?
- [ ] Tôi đã chuẩn hoá rating (trừ trung bình người dùng) chưa?
- [ ] Ô trống được xử lý như "chưa biết" hay bị điền 0 nhầm?
- [ ] Tôi có đường dẫn xử lý riêng cho người dùng mới và sản phẩm mới không?
- [ ] Tôi đặt ngưỡng số sản phẩm chung tối thiểu khi tính tương tự chưa?
- [ ] Tôi chia train/test theo thời gian chứ?
- [ ] Metric của tôi đo dự đoán rating hay đo chất lượng xếp hạng?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.sparse` | `csr_matrix`, `coo_matrix` — định dạng bắt buộc | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/sparse.html) |
| MovieLens | Bộ dữ liệu chuẩn để học và benchmark (100k / 1M / 25M) | [grouplens.org/datasets/movielens](https://grouplens.org/datasets/movielens/) |
| Surprise | Thư viện chuyên cho recommender với rating tường minh | [surpriselib.com](https://surpriselib.com/) |
| `implicit` | ALS và BPR cho implicit feedback, rất nhanh | [implicit.readthedocs.io](https://implicit.readthedocs.io/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, §17.2 "Ma trận tiện ích" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Leskovec, Rajaraman & Ullman, *Mining of Massive Datasets*, Ch. 9 "Recommendation Systems" — [PDF miễn phí](http://www.mmds.org/)
- Hu, Koren & Volinsky, "Collaborative Filtering for Implicit Feedback Datasets", ICDM 2008 — [PDF](http://yifanhu.net/PUB/cf.pdf)
- GroupLens, MovieLens datasets — [grouplens.org](https://grouplens.org/datasets/movielens/)

## Liên kết

[[Content-Based Recommendation]] · [[Neighborhood-Based Collaborative Filtering]] · [[Matrix Factorization Collaborative Filtering]] · [[Model Validation]] · [[ML]]
