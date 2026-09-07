---
tags: [ml, khái-niệm-nền, features, data]
status: evergreen
---
# Data and Feature Engineering

> Mọi thuật toán trong vault này đều nhận đầu vào là một **vector số có độ dài cố định**. Biến dữ liệu thật — văn bản thô, ảnh, danh mục, toạ độ — thành vector đó chính là feature engineering, và nó quyết định kết quả nhiều hơn việc chọn mô hình.

## 1. Khái niệm cốt lõi

**Mô hình chung cho mọi bài toán ML:**

```
dữ liệu thô  →  [feature extractor]  →  vector đặc trưng x  →  [mô hình]  →  đầu ra
```

Phần lớn nỗ lực của một dự án nằm ở mũi tên thứ nhất, không phải mũi tên thứ hai.

### Các kỹ thuật trích chọn đặc trưng

| Kỹ thuật | Dữ liệu | Ý tưởng | Nhược điểm |
|---|---|---|---|
| **One-hot encoding** | Danh mục | Mỗi giá trị → một chiều nhị phân | Nổ chiều khi cardinality cao |
| **Label encoding** | Danh mục có thứ tự | Ánh xạ sang số nguyên | Áp đặt thứ tự giả nếu danh mục vô hướng |
| **Bag of Words (BoW)** | Văn bản | Đếm tần suất từ | Mất thứ tự từ hoàn toàn |
| **n-gram** | Văn bản | Đếm cụm $n$ từ liên tiếp | Nổ chiều rất nhanh |
| **TF-IDF** | Văn bản | Tần suất × nghịch đảo độ phổ biến | Vẫn không hiểu ngữ nghĩa |
| **Word embedding** | Văn bản | Vector đặc trưng học được | Cần mô hình pre-trained |
| **Transfer learning** | Ảnh, văn bản | Lấy tầng gần cuối của mạng pre-trained làm đặc trưng | Phụ thuộc domain của mô hình gốc |
| **Feature enrichment** | Bất kỳ | Tạo đặc trưng mới từ tri thức chuyên gia | Cần chuyên gia thật |

> [!note] n-gram trong thực tế
> [[FADAML Case Study]] dùng n-gram khoảng $(1,3)$, giới hạn 10.000 đặc trưng và chỉ cấp 15% bộ nhớ cho chúng — n-gram hiếm bị loại bỏ. Đây là con số cụ thể đáng nhớ: không giới hạn thì tràn RAM ngay trên tập 29.000 mẫu.

### Feature enrichment — thứ mà AutoML không tự làm được

Ví dụ mẫu mực từ [[FADAML Case Study]]: từ text thô của một tin rao bất động sản, NER trích ra 4 đặc trưng cơ bản (*price*, *area*, *road*, *district*). Nhưng chuyên gia bất động sản biết thêm:

| Đặc trưng làm giàu | Cách tạo | Vì sao chuyên gia biết mà máy không |
|---|---|---|
| `house_type` | Regex bắt "mặt tiền" / "hẻm" | Nhà mặt tiền và nhà hẻm là hai thị trường khác nhau |
| `road_width` | Regex; mặc định 20 nếu là mặt tiền | Độ rộng hẻm quyết định giá hơn cả diện tích |
| `road_first/second/third` | GeoPy lấy toạ độ, khoảng cách Manhattan, lấy 3 đường gần nhất | Đường gần nhau trong cùng quận có giá/m² tương tự |

Kết quả ablation: bỏ nhóm đặc trưng cơ bản làm accuracy tụt từ 91.5% → 78.5%. **Đặc trưng làm giàu đóng góp nhiều hơn cả việc đổi thuật toán.**

### Chuẩn hoá vector đặc trưng

| Phương pháp | Công thức | Khi nào dùng |
|---|---|---|
| Min–max scaling | $(x - x_{\min})/(x_{\max}-x_{\min})$ | Cần miền $[0,1]$ cố định; nhạy với outlier |
| **Standardization (z-score)** | $(x-\mu)/\sigma$ | Mặc định tốt cho hầu hết trường hợp |
| Robust scaling | Dùng median và IQR | Dữ liệu có outlier nặng (giá bất động sản!) |
| Chuẩn hoá $\ell_2$ theo hàng | $\mathbf{x}/\lVert\mathbf{x}\rVert_2$ | Khi chỉ hướng có nghĩa, không phải độ lớn (TF-IDF) |
| Biến đổi $\log$ | $\log(1+x)$ | Biến lệch phải mạnh — xem [[Hedonic Pricing and GIS]] |

**Thuật toán nào bắt buộc chuẩn hoá:** [[K-Nearest Neighbors]], [[K-Means Clustering]], [[Support Vector Machine]], [[Principal Component Analysis]], mọi mạng neuron, mọi mô hình có [[Regularization]].
**Thuật toán không cần:** cây quyết định và [[Gradient Boosting and Tree Ensembles]] — chúng chỉ so sánh ngưỡng.

## 2. Nguyên tắc / Best practices

1. **Fit scaler trên train, transform trên test.** `scaler.fit_transform(X_train)` rồi `scaler.transform(X_test)` — **không bao giờ** fit trên toàn bộ dữ liệu. Đây là dạng rò rỉ dữ liệu phổ biến nhất, xem [[Model Validation]].
2. **Bọc mọi bước tiền xử lý trong `Pipeline`.** Đây là cách duy nhất đảm bảo cross-validation không bị rò rỉ.
3. **Làm việc với chuyên gia miền, sớm.** FADAML tạo đặc trưng bằng cách hỏi hai chuyên gia bất động sản và yêu cầu họ **thống nhất hoàn toàn** trước khi chốt. Đó là quy trình, không phải may mắn.
4. **Đặc trưng làm giàu chống dữ liệu thưa.** Nếu chỉ có một tin rao trên một con đường, `road` vô dụng — nhưng `road_first/second/third` vẫn cho mô hình thông tin để ngoại suy. Nghĩ về feature như bảo hiểm cho dữ liệu thiếu.
5. **Chọn đặc trưng bằng tương quan với mục tiêu, giao với ý kiến chuyên gia.** FADAML sắp xếp đặc trưng theo tương quan với giá, rồi lấy phần giao với danh sách chuyên gia hay dùng — hai nguồn tín hiệu độc lập.
6. **Giữ nhất quán kiểu và đơn vị.** Mọi tên quận đều là chuỗi; mọi giá đều là triệu VND. Nghe hiển nhiên, và luôn bị vi phạm.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Rò rỉ dữ liệu qua bước chuẩn hoá.** Tính $\mu,\sigma$ trên cả train+test rồi mới chia → điểm test cao giả tạo. Lỗi này im lặng và cực kỳ phổ biến.
- **One-hot cho biến cardinality cao.** 10.000 tên đường → 10.000 chiều, hầu hết bằng 0. Dùng target encoding, hashing, hoặc như FADAML: chuyển sang **đặc trưng không gian** (3 đường gần nhất) thay vì one-hot tên đường.
- **Label encoding cho danh mục vô hướng.** Gán quận 1→1, quận 5→5 khiến mô hình tuyến tính tin rằng "quận 5 gấp 5 lần quận 1". Với cây thì vô hại, với mô hình tuyến tính thì tai hoạ.
- **Quên xử lý danh mục chưa từng thấy khi triển khai.** Một tên đường mới xuất hiện trong sản xuất → encoder ném lỗi. Đặt `handle_unknown='ignore'` và test đường dẫn đó.
- **Chuẩn hoá nhãn cùng với đặc trưng.** Nếu biến đổi $\log$ cho biến mục tiêu, phải nhớ **biến đổi ngược** khi báo cáo sai số — nếu không RMSE bạn báo là RMSE trong không gian log, không phải VND.
- **Tin rằng deep learning làm feature engineering thay bạn.** Đúng với ảnh và giọng nói. Với dữ liệu bảng và văn bản chuyên ngành thì không: baseline FADAML **chỉ dùng text** đạt 78.5%, thêm đặc trưng thủ công lên 91.5%.

## 4. Checklist áp dụng

- [ ] Mọi bước tiền xử lý có nằm trong một `Pipeline` không?
- [ ] Scaler có được `fit` **chỉ trên train** không?
- [ ] Có đặc trưng nào chứa thông tin từ tương lai (leakage) không?
- [ ] Biến danh mục cardinality cao được xử lý bằng gì, và tôi có kiểm tra số chiều sau encoding chưa?
- [ ] Encoder xử lý giá trị chưa từng thấy như thế nào?
- [ ] Thuật toán tôi dùng có cần chuẩn hoá không? (KNN/SVM/PCA/NN: có; cây: không)
- [ ] Biến mục tiêu có lệch không? Nếu đã biến đổi, tôi có biến đổi ngược khi báo cáo không?
- [ ] Tôi đã hỏi một người thật sự hiểu miền dữ liệu này chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.preprocessing` | `StandardScaler`, `OneHotEncoder`, `RobustScaler` | [scikit-learn.org](https://scikit-learn.org/stable/modules/preprocessing.html) |
| `sklearn.pipeline` + `ColumnTransformer` | Chuẩn hoá khác nhau cho cột số và cột danh mục, chống leakage | [scikit-learn.org](https://scikit-learn.org/stable/modules/compose.html) |
| `TfidfVectorizer` / `CountVectorizer` | BoW và TF-IDF, có tham số `ngram_range`, `max_features` | [scikit-learn.org](https://scikit-learn.org/stable/modules/feature_extraction.html) |
| GeoPy | Geocoding: tên đường → toạ độ. Dùng trong FADAML | [geopy.readthedocs.io](https://geopy.readthedocs.io/) |
| GeoPandas | Thao tác dữ liệu không gian, khoảng cách, join theo vùng | [geopandas.org](https://geopandas.org/) |
| `category_encoders` | Target encoding, hashing cho cardinality cao | [contrib.scikit-learn.org](https://contrib.scikit-learn.org/category_encoders/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 6 "Các kỹ thuật xây dựng đặc trưng" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Nguyen, Nguyen & Nguyen, "Fake Advertisements Detection Using Automated Multimodal Learning", §4.2 — [arXiv:2501.10848](https://arxiv.org/abs/2501.10848)
- scikit-learn, *Preprocessing data* — [scikit-learn.org](https://scikit-learn.org/stable/modules/preprocessing.html)
- Zheng & Casari, *Feature Engineering for Machine Learning*, O'Reilly 2018

## Liên kết

[[ML Problem Framing]] · [[Model Validation]] · [[Multimodal Machine Learning]] · [[FADAML Case Study]] · [[Vietnamese NLP]] · [[ML]]
