---
tags: [ml, ứng-dụng, multimodal, features]
status: evergreen
---
# Multimodal Machine Learning

> Dữ liệu thật hiếm khi thuộc một loại. Một tin rao bất động sản có **văn bản** tự do, **số** (giá, diện tích), **danh mục** (quận, loại nhà), **toạ độ**, và **ảnh**. Multimodal learning là nghệ thuật ghép chúng vào một mô hình duy nhất mà không để loại nào nuốt chửng loại nào.

## 1. Khái niệm cốt lõi

### Các modality thường gặp

| Modality | Biểu diễn điển hình | Note trong vault |
|---|---|---|
| Văn bản | TF-IDF, n-gram, embedding | [[Vietnamese NLP]] |
| Số | Chuẩn hoá, biến đổi $\log$ | [[Data and Feature Engineering]] |
| Danh mục | One-hot, target encoding | [[Data and Feature Engineering]] |
| Không gian | Toạ độ, khoảng cách, láng giềng | [[Hedonic Pricing and GIS]] |
| Ảnh | Transfer learning từ CNN | — |
| Chuỗi thời gian | Cửa sổ trượt, thống kê tổng hợp | — |

### Ba chiến lược fusion

| Chiến lược | Cách làm | Ưu | Nhược |
|---|---|---|---|
| **Early fusion** | Ghép mọi đặc trưng thành một vector, đưa vào một mô hình | Đơn giản; mô hình học được tương tác chéo modality | Modality nhiều chiều lấn át |
| **Late fusion** | Mỗi modality một mô hình, gộp dự đoán ở cuối | Mỗi mô hình tối ưu riêng; xử lý được modality thiếu | **Không học được tương tác chéo** |
| **Hybrid / intermediate** | Học biểu diễn riêng, gộp ở tầng giữa | Linh hoạt nhất | Phức tạp, cần deep learning |

[[FADAML Case Study]] dùng **early fusion**: text và 9 đặc trưng bảng được ghép thành một bản ghi duy nhất, rồi giao cho [[AutoML]] xử lý. Chọn lựa này có lý do rõ: tín hiệu cần bắt **chính là tương tác chéo modality** — "văn bản mô tả một căn nhà bình thường **nhưng** trường giá lại nói 55 tỉ". Late fusion theo cấu trúc không bắt được mâu thuẫn đó.

### Vấn đề trung tâm: mất cân bằng chiều

Sau khi vectorize, text có thể chiếm 10.000 chiều (n-gram) còn dữ liệu bảng chỉ 9 chiều. Ghép thẳng lại thì mô hình bị text chi phối hoàn toàn.

| Cách xử lý | Chi tiết |
|---|---|
| Giới hạn số đặc trưng text | FADAML đặt `max_features = 10.000`, n-gram range $(1,3)$ |
| Giới hạn ngân sách bộ nhớ | FADAML cấp **15% bộ nhớ** cho đặc trưng n-gram, loại bỏ n-gram hiếm |
| Giảm chiều text | [[Singular Value Decomposition]] / LSA về 100–300 chiều |
| Nén text thành embedding | Sentence embedding cho vector 384–768 chiều đặc |
| Dùng mô hình bất biến với thang | [[Gradient Boosting and Tree Ensembles]] không nhạy với thang, nhưng vẫn nhạy với số lượng đặc trưng |

### Bằng chứng: multimodal đóng góp bao nhiêu

Ablation study của FADAML, bỏ dần từng nhóm đặc trưng:

| Cấu hình | Accuracy | Mất đi |
|---|---|---|
| Mô hình đầy đủ | **91.5%** | — |
| Bỏ đặc trưng không gian (3 đường gần nhất) | 91.1% | 0.4% |
| Bỏ tiếp đặc trưng làm giàu (`house_type`, `road_width`) | 88.1% | 3.4% |
| Bỏ tiếp đặc trưng cơ bản (giá, diện tích, đường, quận) | **78.5%** | 9.6% |

Dòng cuối là mô hình **chỉ dùng text**. Nó vẫn vượt baseline deep learning tốt nhất (73.3%) — nhưng thêm 9 đặc trưng bảng nâng nó lên 13 điểm phần trăm.

> [!note] Bài học định lượng
> Chín đặc trưng bảng do chuyên gia thiết kế đóng góp nhiều hơn toàn bộ chênh lệch giữa các kiến trúc deep learning trong bảng baseline. Khi có dữ liệu đa modality, **thêm modality thường thắng đổi kiến trúc**.

## 2. Nguyên tắc / Best practices

1. **Đo baseline từng modality riêng lẻ trước.** Text-only, tabular-only, rồi mới kết hợp. Không có ba con số này thì bạn không biết fusion có giúp gì.
2. **Cân bằng số chiều giữa các modality.** Đây là quyết định kỹ thuật quan trọng nhất trong bài toán multimodal.
3. **Dùng early fusion khi tín hiệu nằm ở tương tác chéo modality.** Dùng late fusion khi các modality độc lập, hoặc khi một modality thường thiếu.
4. **Chuẩn hoá trong từng modality trước khi ghép.** Xem [[Data and Feature Engineering]].
5. **Kiểm tra feature importance theo nhóm modality.** Nếu một modality có tổng importance gần 0, hãy hỏi vì sao trước khi giữ nó.
6. **Lên kế hoạch cho modality thiếu.** Trong sản xuất, ảnh có thể chưa upload, toạ độ có thể geocode thất bại. Mô hình phải chạy được khi thiếu.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Một modality nuốt chửng phần còn lại.** 10.000 chiều text vs 9 chiều bảng — mô hình sẽ tìm tín hiệu ở chỗ có nhiều chiều nhất. Triệu chứng: thêm đặc trưng bảng không cải thiện gì.
- **Rò rỉ dữ liệu qua một modality.** Với nhiều nguồn dữ liệu, khả năng một nguồn chứa thông tin tương lai tăng lên. Rà từng modality riêng — xem [[Model Validation]].
- **Bỏ qua chi phí thu thập của từng modality.** Ảnh cần lưu trữ và băng thông; geocoding cần gọi API có giới hạn tốc độ. Đặc trưng không gian của FADAML đòi tra GeoPy cho **mọi con đường** — không miễn phí ở quy mô lớn.
- **Fusion trước khi xử lý giá trị thiếu.** Nếu một modality thiếu ở 30% mẫu, ghép thẳng sẽ tạo ra rất nhiều 0 và mô hình học "0 nghĩa là gì đó".
- **Cho rằng thêm modality luôn giúp.** Đặc trưng không gian của FADAML chỉ thêm 0.4% — trong khi tốn công geocoding đáng kể. Đo trước, giữ sau.
- **Không kiểm tra căn chỉnh (alignment).** Ảnh thứ $i$ có đúng thuộc về tin rao thứ $i$ không? Lỗi lệch chỉ số trong pipeline đa nguồn rất phổ biến và rất khó phát hiện.

## 4. Checklist áp dụng

- [ ] Tôi đã đo baseline riêng cho từng modality chưa?
- [ ] Số chiều của từng modality sau khi vectorize là bao nhiêu? Chúng có cân bằng không?
- [ ] Tôi dùng early hay late fusion? Tín hiệu tôi cần có nằm ở tương tác chéo modality không?
- [ ] Từng modality có được chuẩn hoá riêng trước khi ghép không?
- [ ] Tôi đã kiểm tra feature importance theo nhóm modality chưa?
- [ ] Modality nào có thể thiếu trong sản xuất? Mô hình xử lý thế nào?
- [ ] Chi phí thu thập từng modality là bao nhiêu, so với đóng góp đo được?
- [ ] Dữ liệu các modality có được căn chỉnh đúng chỉ số không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| AutoGluon Multimodal | Xử lý text + bảng + ảnh trong một API; dùng trong FADAML | [auto.gluon.ai](https://auto.gluon.ai/stable/tutorials/multimodal/index.html) |
| `sklearn.compose.ColumnTransformer` | Biến đổi khác nhau cho từng nhóm cột, ghép lại tự động | [scikit-learn.org](https://scikit-learn.org/stable/modules/compose.html) |
| `sentence-transformers` | Nén text thành vector đặc 384–768 chiều | [sbert.net](https://www.sbert.net/) |
| `sklearn.decomposition.TruncatedSVD` | LSA để giảm chiều đặc trưng text thưa | [scikit-learn.org](https://scikit-learn.org/stable/modules/decomposition.html#lsa) |

## Tham khảo

- Nguyen, Nguyen & Nguyen, "Fake Advertisements Detection Using Automated Multimodal Learning", §4.2 & §5.3 (ablation) — [arXiv:2501.10848](https://arxiv.org/abs/2501.10848)
- Baltrušaitis, Ahuja & Morency, "Multimodal Machine Learning: A Survey and Taxonomy", *IEEE TPAMI* 41(2), 2018 — [arXiv:1705.09406](https://arxiv.org/abs/1705.09406)
- Shi et al., "Benchmarking Multimodal AutoML for Tabular Data with Text Fields" — [arXiv:2111.02705](https://arxiv.org/abs/2111.02705)
- Nguyen et al., "Multimodal Machine Learning for Credit Modeling", IEEE COMPSAC 2021

## Liên kết

[[FADAML Case Study]] · [[AutoML]] · [[Data and Feature Engineering]] · [[Vietnamese NLP]] · [[ML]]
