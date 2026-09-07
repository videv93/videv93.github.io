---
tags: [ml, thuật-toán, supervised, lazy-learning]
status: evergreen
---
# K-Nearest Neighbors

> Thuật toán duy nhất **không học gì cả**: nó chỉ nhớ toàn bộ dữ liệu, và khi được hỏi thì đi tìm những điểm giống nhất. Đơn giản tới mức dễ bị coi thường — nhưng nó là baseline không thể thiếu và là nền tư duy của [[Neighborhood-Based Collaborative Filtering]].

## 1. Khái niệm cốt lõi

**Lazy learning:** không có pha huấn luyện. Toàn bộ chi phí dồn vào lúc dự đoán.

| Pha | KNN | Mô hình thông thường |
|---|---|---|
| Train | $O(1)$ — chỉ lưu dữ liệu | Đắt |
| Predict | $O(Nd)$ mỗi truy vấn | Rẻ |
| Bộ nhớ | $O(Nd)$ — **giữ toàn bộ tập train** | $O(\text{số tham số})$ |

Thuật toán: với điểm mới $\mathbf{x}$, tìm $k$ điểm gần nhất trong tập train, rồi:
- **Phân loại:** bỏ phiếu đa số (hoặc bỏ phiếu có trọng số)
- **Hồi quy:** lấy trung bình (hoặc trung bình có trọng số)

### Chọn khoảng cách

| Khoảng cách | Công thức | Dùng khi |
|---|---|---|
| Euclidean ($\ell_2$) | $\sqrt{\sum(x_i-z_i)^2}$ | Mặc định, đặc trưng liên tục |
| **Manhattan ($\ell_1$)** | $\sum\lvert x_i-z_i\rvert$ | Nhiều chiều; **lưới đường phố** |
| Cosine | $1 - \frac{\mathbf{x}^T\mathbf{z}}{\lVert\mathbf{x}\rVert\lVert\mathbf{z}\rVert}$ | Text, TF-IDF — chỉ hướng quan trọng |
| Hamming | Số vị trí khác nhau | Đặc trưng nhị phân/danh mục |
| Mahalanobis | Có tính hiệp phương sai | Đặc trưng tương quan mạnh |

> [!note] Manhattan cho dữ liệu đô thị — ví dụ từ FADAML
> [[FADAML Case Study]] dùng **khoảng cách Manhattan** để tìm 3 con đường gần nhất trong cùng quận, không dùng Euclidean. Lý do rất cụ thể: trong thành phố bạn đi theo ô bàn cờ, không đi xuyên qua nhà. Chọn metric đúng với **hình học của bài toán thật** quan trọng hơn chọn thuật toán.

### Trọng số theo khoảng cách

| Cách | Công thức trọng số | Đặc điểm |
|---|---|---|
| **Uniform** | $1/k$ cho mọi láng giềng | Đơn giản; điểm xa cũng có tiếng nói ngang |
| **Distance** | $\propto 1/d_i$ | Điểm gần có ảnh hưởng lớn hơn |

Trong bảng kết quả của FADAML, `KNN Distance` đạt validation accuracy 0.756 còn `KNN Uniform` chỉ 0.721 — chênh 3.5 điểm chỉ do đổi trọng số.

## 2. Nguyên tắc / Best practices

1. **Chuẩn hoá đặc trưng, bắt buộc.** KNN toàn bộ dựa trên khoảng cách. Một đặc trưng thang $10^6$ sẽ nuốt chửng mọi đặc trưng khác. Đây là lỗi số một khi dùng KNN.
2. **Chọn $k$ lẻ cho phân loại nhị phân.** Tránh hoà phiếu.
3. **$k$ nhỏ → variance cao; $k$ lớn → bias cao.** Dò $k$ bằng cross-validation. Điểm khởi đầu hợp lý: $k \approx \sqrt{N}$.
4. **Dùng `algorithm='kd_tree'` hoặc `'ball_tree'` khi $d$ nhỏ.** Với $d \lesssim 20$, chúng giảm truy vấn từ $O(N)$ xuống $\approx O(\log N)$. Với $d$ lớn hơn, chúng không giúp gì — dùng brute force hoặc ANN.
5. **Với $N$ rất lớn, chuyển sang tìm kiếm xấp xỉ (ANN).** FAISS, Annoy, HNSW. Đánh đổi một chút chính xác lấy tốc độ hàng trăm lần.
6. **Chọn metric theo hình học của bài toán.** Text → cosine; toạ độ đô thị → Manhattan; đặc trưng tương quan → Mahalanobis hoặc chạy [[Principal Component Analysis]] trước.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Không chuẩn hoá.** Lặp lại vì đây là lỗi phổ biến nhất và nó im lặng — mô hình vẫn chạy, chỉ cho kết quả tệ.
- **Lời nguyền số chiều.** Ở chiều cao, mọi điểm gần như cách đều nhau: tỉ số giữa khoảng cách xa nhất và gần nhất tiến về 1. Khái niệm "láng giềng gần" mất nghĩa. Với $d > 20$–$30$, giảm chiều trước bằng [[Principal Component Analysis]], hoặc dùng thuật toán khác.
- **Mất cân bằng lớp bóp méo phiếu bầu.** Lớp đa số áp đảo trong mọi lân cận. Dùng trọng số theo khoảng cách, hoặc `class_weight`, hoặc cân bằng lại dữ liệu.
- **Chi phí bộ nhớ và độ trễ khi triển khai.** Trong bảng FADAML, KNN có **thời gian dự đoán 10.5 giây** — trong khi LightGBM chỉ mất 0.06 giây, chậm hơn ~160 lần. Với hệ thống lọc tin rao real-time, đó là điểm chết.
- **Giá trị thiếu phá vỡ khoảng cách.** Không có cách tự nhiên nào tính khoảng cách với `NaN`. Phải điền khuyết trước, và cách điền ảnh hưởng trực tiếp tới kết quả.
- **Dùng KNN với đặc trưng danh mục one-hot mà không nghĩ.** Khoảng cách Euclidean giữa hai vector one-hot luôn là $\sqrt{2}$ nếu khác nhau — mọi cặp danh mục khác nhau đều "cách đều". Có thể đúng, có thể sai với bài toán của bạn.

## 4. Checklist áp dụng

- [ ] Tôi đã chuẩn hoá tất cả đặc trưng chưa?
- [ ] $k$ được chọn bằng cross-validation chứ không phải mặc định 5?
- [ ] Với phân loại nhị phân, $k$ có lẻ không?
- [ ] Số chiều $d$ của tôi là bao nhiêu? Nếu > 20, tôi đã giảm chiều chưa?
- [ ] Metric khoảng cách có khớp với hình học của bài toán không?
- [ ] Tôi đã thử `weights='distance'` chưa?
- [ ] Dữ liệu có mất cân bằng lớp không?
- [ ] Độ trễ dự đoán có chấp nhận được trong sản xuất không? Tôi đã đo chưa?
- [ ] Bộ nhớ để giữ toàn bộ tập train có khả thi không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.neighbors.KNeighborsClassifier` | Hỗ trợ `weights`, `metric`, `algorithm` | [scikit-learn.org](https://scikit-learn.org/stable/modules/neighbors.html) |
| FAISS | Tìm kiếm láng giềng xấp xỉ cho hàng triệu vector, có GPU | [faiss.ai](https://faiss.ai/) |
| Annoy / hnswlib | ANN nhẹ, dễ nhúng vào ứng dụng | [github.com/spotify/annoy](https://github.com/spotify/annoy) |
| `sklearn.impute.KNNImputer` | Dùng KNN để điền giá trị thiếu | [scikit-learn.org](https://scikit-learn.org/stable/modules/impute.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 9 "K lân cận" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- scikit-learn, *Nearest Neighbors* — [scikit-learn.org](https://scikit-learn.org/stable/modules/neighbors.html)
- Beyer et al., "When Is 'Nearest Neighbor' Meaningful?", ICDT 1999 — bài gốc về lời nguyền số chiều
- Hastie et al., *The Elements of Statistical Learning*, §2.3 & Ch. 13 — [PDF miễn phí](https://hastie.su.domains/ElemStatLearn/)

## Liên kết

[[Data and Feature Engineering]] · [[Principal Component Analysis]] · [[Neighborhood-Based Collaborative Filtering]] · [[FADAML Case Study]] · [[ML]]
