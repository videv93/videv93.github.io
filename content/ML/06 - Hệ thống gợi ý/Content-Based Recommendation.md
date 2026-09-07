---
tags: [ml, recommender-system, supervised]
status: evergreen
---
# Content-Based Recommendation

> Cách gợi ý đơn giản nhất: mô tả sản phẩm bằng một vector đặc trưng, rồi **học một mô hình riêng cho từng người dùng**. Nó thường kém chính xác hơn collaborative filtering — nhưng nó là thứ duy nhất hoạt động khi sản phẩm hoàn toàn mới.

## 1. Khái niệm cốt lõi

**Ý tưởng:** biểu diễn mỗi sản phẩm $i$ bằng vector đặc trưng $\mathbf{x}_i$ (thể loại, từ khoá, TF-IDF của mô tả…). Với mỗi người dùng $j$, học một mô hình riêng $\mathbf{w}_j$ sao cho:
$$y_{ij} \approx \mathbf{w}_j^T\mathbf{x}_i + b_j$$

Đây **chính xác** là [[Linear Regression]] — chạy $N$ lần, mỗi lần cho một người dùng, chỉ trên những sản phẩm mà người đó đã đánh giá.

### Vì sao phải regularize

Một người dùng mới có thể chỉ đánh giá 3 phim, trong khi $\mathbf{x}_i$ có 20 chiều. Đây là tình huống $d > N$ kinh điển ở [[Linear Regression]] — nghiệm không duy nhất và overfit chắc chắn. Bắt buộc dùng Ridge:

$$\min_{\mathbf{w}_j}\ \sum_{i\in\mathcal{I}_j}(\mathbf{w}_j^T\mathbf{x}_i + b_j - y_{ij})^2 + \lambda\lVert\mathbf{w}_j\rVert_2^2$$

$\mathcal{I}_j$ = tập sản phẩm người dùng $j$ đã đánh giá.

### So sánh với collaborative filtering

| | **Content-based** | **Collaborative** ([[Neighborhood-Based Collaborative Filtering]]) |
|---|---|---|
| Cần gì | Mô tả sản phẩm | Chỉ cần lịch sử tương tác |
| Sản phẩm mới (cold start) | ✅ **Xử lý được** | ❌ Bất lực |
| Người dùng mới | ❌ Vẫn khó | ❌ Bất lực |
| Khám phá bất ngờ (serendipity) | ❌ Thấp — chỉ gợi ý thứ tương tự | ✅ Cao |
| Cần feature engineering | ✅ Nhiều | ❌ Không |
| Độ chính xác | Thường thấp hơn | Thường cao hơn |
| Giải thích được | ✅ "Vì bạn thích phim hành động" | Khó hơn |

### Xây vector đặc trưng cho sản phẩm

| Nguồn | Kỹ thuật | Ghi chú |
|---|---|---|
| Thể loại, tag | One-hot | Đơn giản, hiệu quả |
| Mô tả văn bản | **TF-IDF** | Chuẩn cho MovieLens |
| Mô tả văn bản (hiện đại) | Sentence embedding | Bắt ngữ nghĩa tốt hơn nhiều |
| Ảnh sản phẩm | Transfer learning từ CNN | Xem [[Data and Feature Engineering]] |
| Metadata | Năm, đạo diễn, giá | Nhớ chuẩn hoá |

Xem [[Data and Feature Engineering]] cho chi tiết từng kỹ thuật.

## 2. Nguyên tắc / Best practices

1. **Luôn dùng Ridge, không dùng OLS.** Người dùng ít rating là quy tắc, không phải ngoại lệ.
2. **Chuẩn hoá vector đặc trưng.** Cần thiết để hình phạt $\lambda$ có ý nghĩa nhất quán.
3. **Chuẩn hoá rating trước.** Trừ trung bình người dùng — xem [[Utility Matrix]].
4. **Dùng $\lambda$ khác nhau theo số rating của người dùng.** Người có 3 rating cần regularize mạnh hơn nhiều so với người có 300. Hoặc đơn giản: dùng cùng $\lambda$ nhưng nhớ rằng nó ảnh hưởng người dùng thưa nhiều nhất.
5. **Dùng content-based làm lớp dự phòng cho hệ thống lai.** Kiến trúc thực tế phổ biến nhất: collaborative làm chính, content-based xử lý sản phẩm mới.
6. **Tận dụng khả năng giải thích.** "Gợi ý vì bạn thích phim khoa học viễn tưởng" tăng lòng tin người dùng — collaborative filtering không nói được câu đó một cách tự nhiên.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Bong bóng lọc (filter bubble).** Content-based chỉ gợi ý thứ **giống** những gì đã xem. Người dùng thích một phim hành động sẽ chỉ thấy phim hành động mãi mãi. Không có cơ chế khám phá nội tại — phải chủ động thêm tính đa dạng vào.
- **Chất lượng gợi ý bị chặn bởi chất lượng đặc trưng.** Nếu vector đặc trưng chỉ có thể loại, mô hình không bao giờ phân biệt được hai phim hành động hay và dở. Collaborative filtering học được điều này miễn phí từ hành vi.
- **Overfit trên người dùng có ít rating.** Với 3 rating và 20 đặc trưng, mô hình khớp hoàn hảo và dự đoán vô nghĩa. Ridge là bắt buộc.
- **Vẫn không giải quyết được cold start người dùng.** Người dùng hoàn toàn mới không có $\mathbf{w}_j$. Cần hỏi sở thích lúc đăng ký hoặc dùng mô hình dân số chung.
- **Quên rằng huấn luyện $N$ mô hình riêng là tốn kém.** Với hàng triệu người dùng, đây là $10^6$ bài toán Ridge. Cần huấn luyện theo lô và cập nhật tăng dần.
- **Dùng cùng $\lambda$ cho mọi người dùng mà không nghĩ.** Số lượng dữ liệu mỗi người dùng chênh nhau hàng trăm lần.
- **Đánh giá bằng RMSE thay vì chất lượng xếp hạng.** Cùng cạm bẫy đã nêu ở [[Utility Matrix]].

## 4. Checklist áp dụng

- [ ] Tôi có mô tả/đặc trưng cho sản phẩm không? Chúng đủ giàu để phân biệt sản phẩm chứ?
- [ ] Tôi đang dùng Ridge chứ không phải OLS?
- [ ] Vector đặc trưng đã chuẩn hoá chưa?
- [ ] Rating đã được chuẩn hoá (trừ trung bình người dùng) chưa?
- [ ] Người dùng ít rating nhất có bao nhiêu rating? Mô hình cho họ có tin được không?
- [ ] Tôi có cơ chế đảm bảo tính đa dạng trong danh sách gợi ý không?
- [ ] Tôi có kế hoạch cho cold start **người dùng** không (content-based không giải được)?
- [ ] Chi phí huấn luyện $N$ mô hình có khả thi ở quy mô của tôi không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.linear_model.Ridge` | Chính là mô hình mỗi người dùng | [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression) |
| `TfidfVectorizer` | Sinh vector đặc trưng từ mô tả sản phẩm | [scikit-learn.org](https://scikit-learn.org/stable/modules/feature_extraction.html) |
| `sentence-transformers` | Embedding ngữ nghĩa, tốt hơn TF-IDF nhiều | [sbert.net](https://www.sbert.net/) |
| MovieLens 100k | Có sẵn `u.item` với thông tin thể loại — bài tập chuẩn | [grouplens.org](https://grouplens.org/datasets/movielens/100k/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 17 "Hệ thống gợi ý dựa trên nội dung" (§17.4 bài toán MovieLens 100k) — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Leskovec, Rajaraman & Ullman, *Mining of Massive Datasets*, §9.2 "Content-Based Recommendations" — [PDF miễn phí](http://www.mmds.org/)
- Lops, de Gemmis & Semeraro, "Content-based Recommender Systems: State of the Art and Trends", in *Recommender Systems Handbook*, Springer 2011
- scikit-learn, *Ridge regression* — [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression)

## Liên kết

[[Utility Matrix]] · [[Linear Regression]] · [[Regularization]] · [[Neighborhood-Based Collaborative Filtering]] · [[ML]]
