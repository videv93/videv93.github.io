---
tags: [ml, recommender-system, collaborative-filtering]
status: evergreen
---
# Neighborhood-Based Collaborative Filtering

> Bước nhảy về ý tưởng so với [[Content-Based Recommendation]]: **quên hoàn toàn nội dung sản phẩm đi**. Chỉ cần biết ai đã thích gì. "Những người giống bạn cũng thích X" — đơn giản vậy, và nó thường chính xác hơn.

## 1. Khái niệm cốt lõi

Về bản chất, đây là [[K-Nearest Neighbors]] áp lên [[Utility Matrix]].

### Hai hướng

| | **User–user CF** | **Item–item CF** |
|---|---|---|
| Tìm láng giềng của | Người dùng | Sản phẩm |
| Logic | "Người giống bạn thích X" | "Người thích Y cũng thích X" |
| Số thực thể | $N$ người dùng | $M$ sản phẩm |
| Ổn định theo thời gian | Thấp — sở thích thay đổi | **Cao** — quan hệ giữa sản phẩm ít đổi |
| Tính trước được | Khó | **Dễ** — ma trận tương tự sản phẩm ít thay đổi |
| Khi $M \ll N$ | Đắt hơn | **Rẻ hơn** |
| Giải thích được | "Người giống bạn…" | **"Vì bạn đã thích Y"** — thuyết phục hơn |

> [!note] Item–item thắng trong hầu hết hệ thống thương mại
> Amazon công bố kiến trúc item-to-item từ 2003 và nó trở thành chuẩn ngành. Lý do không phải độ chính xác mà là **kỹ thuật vận hành**: ma trận tương tự sản phẩm tính offline hàng đêm, và gợi ý real-time chỉ là tra bảng. User–user đòi tính lại mỗi khi người dùng có hành vi mới.

Về mặt toán học, item–item chỉ là user–user chạy trên $\mathbf{Y}^T$ — cùng một thuật toán.

### Ba bước

**1. Chuẩn hoá.** Trừ trung bình từng người dùng, ô trống đặt bằng 0 (nghĩa "trung tính"). Xem [[Utility Matrix]].

**2. Tính độ tương tự.** Cosine trên vector đã chuẩn hoá:
$$\text{sim}(u_1,u_2) = \frac{\hat{\mathbf{y}}_{u_1}^T\hat{\mathbf{y}}_{u_2}}{\lVert\hat{\mathbf{y}}_{u_1}\rVert\lVert\hat{\mathbf{y}}_{u_2}\rVert}$$

Cosine trên dữ liệu **đã trừ trung bình** chính là tương quan Pearson — hai cái tên, một công thức.

**3. Dự đoán.** Trung bình có trọng số từ $k$ láng giềng gần nhất **đã đánh giá sản phẩm đó**:
$$\hat{y}_{ij} = \bar{y}_j + \frac{\sum_{u\in\mathcal{N}(i,j)}\hat{y}_{iu}\cdot\text{sim}(j,u)}{\sum_{u\in\mathcal{N}(i,j)}\lvert\text{sim}(j,u)\rvert}$$

Chú ý: cộng lại $\bar{y}_j$ ở cuối để về thang gốc, và mẫu số dùng **trị tuyệt đối** để tương tự âm không lật dấu kết quả.

### So sánh với matrix factorization

| | Neighborhood CF | [[Matrix Factorization Collaborative Filtering]] |
|---|---|---|
| Cần huấn luyện | Không (lazy) | Có |
| Chi phí dự đoán | Cao | Rất thấp |
| Bộ nhớ | Ma trận tương tự $O(N^2)$ hoặc $O(M^2)$ | $O((M+N)k)$ |
| Xử lý độ thưa cực cao | **Kém** | Tốt |
| Giải thích được | **Tốt** | Kém (latent factor vô danh) |
| Chất lượng | Khá | **Thường tốt hơn** |

## 2. Nguyên tắc / Best practices

1. **Chuẩn hoá trước khi tính tương tự.** Không có bước này, bạn đang đo "ai chấm điểm hào phóng hơn".
2. **Ưu tiên item–item cho hệ thống sản xuất.** Tính trước được, ổn định hơn, giải thích tốt hơn.
3. **Chỉ lấy láng giềng **đã đánh giá** sản phẩm cần dự đoán.** Đây là chi tiết dễ bỏ sót: $k$ láng giềng gần nhất nói chung khác với $k$ láng giềng gần nhất **có rating cho sản phẩm này**.
4. **Đặt ngưỡng số sản phẩm chung tối thiểu.** Tương tự tính trên 2 sản phẩm chung là nhiễu. Yêu cầu ≥ 5.
5. **Chỉ giữ tương tự dương.** Tương tự âm ("người này ngược gu tôi") về lý thuyết dùng được nhưng thực nghiệm cho thấy chúng chủ yếu là nhiễu.
6. **Dò $k$ bằng cross-validation.** $k$ nhỏ → nhiễu; $k$ lớn → gợi ý trở về phổ biến chung.
7. **Lưu ma trận tương tự dạng thưa, chỉ top-$k$ mỗi hàng.** Ma trận $N\times N$ đầy đủ không khả thi ở quy mô lớn.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Không chuẩn hoá.** Lỗi số một, và nó im lặng.
- **Ma trận tương tự $O(N^2)$ nổ bộ nhớ.** Với 1 triệu người dùng: $10^{12}$ ô. Phải dùng ANN (FAISS) hoặc chuyển sang matrix factorization.
- **Tin vào tương tự tính trên quá ít điểm chung.** Xem best practice số 4.
- **Cold start vẫn bất lực hoàn toàn.** Người dùng mới không có ai giống; sản phẩm mới không có ai đánh giá. Cần [[Content-Based Recommendation]] làm lớp dự phòng.
- **Popularity bias.** Sản phẩm phổ biến xuất hiện trong lịch sử của mọi người → luôn có tương tự cao → luôn được gợi ý. Đo coverage và độ mới, không chỉ accuracy.
- **Quên trị tuyệt đối ở mẫu số.** Nếu có tương tự âm và mẫu số dùng tổng thường, kết quả có thể lật dấu hoặc chia cho số gần 0.
- **Vòng phản hồi tự củng cố.** Hệ thống gợi ý X → người dùng xem X → dữ liệu nói X phổ biến → gợi ý X nhiều hơn. Phải chủ động khám phá (exploration).
- **Đánh giá bằng RMSE.** Người dùng thấy top-10, không thấy dự đoán rating. Dùng Precision@k, NDCG.

## 4. Checklist áp dụng

- [ ] Tôi đã chuẩn hoá rating trước khi tính tương tự chưa?
- [ ] Tôi dùng user–user hay item–item? Vì sao?
- [ ] $M$ và $N$ của tôi là bao nhiêu? Ma trận tương tự có vừa bộ nhớ không?
- [ ] Tôi có đặt ngưỡng số điểm chung tối thiểu không?
- [ ] Tôi có lọc chỉ lấy láng giềng **đã đánh giá** sản phẩm đích không?
- [ ] $k$ được dò bằng cross-validation chứ?
- [ ] Tôi có xử lý tương tự âm đúng cách (trị tuyệt đối ở mẫu số) không?
- [ ] Có đường dẫn dự phòng cho cold start không?
- [ ] Tôi đo coverage và độ đa dạng, không chỉ accuracy chứ?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.metrics.pairwise.cosine_similarity` | Hoạt động trực tiếp trên ma trận thưa | [scikit-learn.org](https://scikit-learn.org/stable/modules/metrics.html#cosine-similarity) |
| Surprise `KNNBasic` / `KNNWithMeans` | Cài đặt chuẩn có sẵn chuẩn hoá | [surpriselib.com](https://surpriselib.com/) |
| `implicit` | Item–item cho implicit feedback, rất nhanh | [implicit.readthedocs.io](https://implicit.readthedocs.io/) |
| FAISS | Tìm top-$k$ láng giềng ở quy mô hàng triệu | [faiss.ai](https://faiss.ai/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 18 "Lọc cộng tác lân cận" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Linden, Smith & York, "Amazon.com Recommendations: Item-to-Item Collaborative Filtering", *IEEE Internet Computing* 7(1), 2003 — [doi:10.1109/MIC.2003.1167344](https://doi.org/10.1109/MIC.2003.1167344)
- Sarwar et al., "Item-Based Collaborative Filtering Recommendation Algorithms", WWW 2001 — [PDF](https://dl.acm.org/doi/10.1145/371920.372071)
- Leskovec et al., *Mining of Massive Datasets*, §9.3 "Collaborative Filtering" — [PDF miễn phí](http://www.mmds.org/)

## Liên kết

[[Utility Matrix]] · [[K-Nearest Neighbors]] · [[Matrix Factorization Collaborative Filtering]] · [[Content-Based Recommendation]] · [[ML]]
