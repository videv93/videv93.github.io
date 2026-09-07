---
tags: [ml, thuật-toán, ensemble, tabular]
status: evergreen
---
# Gradient Boosting and Tree Ensembles

> Vũ khí mặc định cho **dữ liệu bảng**. Trong bảng kết quả của [[AutoML]] ở FADAML, bốn trong sáu mô hình đứng đầu là gradient boosting — và điều đó lặp lại ở gần như mọi cuộc thi Kaggle với dữ liệu có cấu trúc.

## 1. Khái niệm cốt lõi

### Hai họ ensemble

| | **Bagging** (Random Forest) | **Boosting** (XGBoost, LightGBM, CatBoost) |
|---|---|---|
| Cách xây | Cây **song song**, độc lập | Cây **tuần tự**, mỗi cây sửa lỗi của tổng trước đó |
| Mỗi cây | Sâu, variance cao | Nông (depth 3–8), bias cao |
| Giảm cái gì | **Variance** | **Bias** |
| Overfit khi thêm cây | Không (bão hoà) | **Có** — cần early stopping |
| Song song hoá | Hoàn hảo | Chỉ trong từng cây |
| Tinh chỉnh | Dễ, ít nhạy | Nhạy, cần dò kỹ |
| Kết quả điển hình | Khá | **Tốt hơn** |

Bảng FADAML minh hoạ chính xác điều này: Random Forest 0.790, Extra Trees 0.782, còn LightGBM 0.892–0.904 — chênh **11 điểm phần trăm** trên cùng dữ liệu.

### Ý tưởng gradient boosting

Mỗi cây mới được huấn luyện để dự đoán **gradient âm của hàm mất mát** tại dự đoán hiện tại — tức là "phần còn thiếu". Với MSE, gradient âm chính là **phần dư** $(y - \hat{y})$; với hàm mất mát khác thì tổng quát hơn.

$$F_{m}(\mathbf{x}) = F_{m-1}(\mathbf{x}) + \nu \cdot h_m(\mathbf{x})$$

$\nu$ là **learning rate** (shrinkage), thường 0.01–0.1. Nó và số cây đánh đổi trực tiếp cho nhau: $\nu$ nhỏ cần nhiều cây hơn, nhưng thường tổng quát hoá tốt hơn.

Đây chính là [[Gradient Descent]] — nhưng thực hiện trong **không gian hàm** thay vì không gian tham số.

### Ba cài đặt chính

| | **XGBoost** | **LightGBM** | **CatBoost** |
|---|---|---|---|
| Chiến lược mọc cây | Level-wise | **Leaf-wise** (sâu hơn, chính xác hơn) | Symmetric (cây cân bằng) |
| Kỹ thuật đặc trưng | Sparsity-aware, weighted quantile sketch | **GOSS** + **EFB** | **Ordered boosting** |
| Danh mục | Cần encode trước | Hỗ trợ sẵn | **Xử lý tự nhiên, tốt nhất** |
| Tốc độ | Nhanh | **Nhanh nhất** | Chậm nhất |
| Rủi ro overfit | Vừa | Cao hơn (leaf-wise) | Thấp hơn |
| Trong bảng FADAML | 0.883 (10.7s) | **0.904** (6.7s) | 0.892 (72.1s) |

- **GOSS** (Gradient-based One-Side Sampling): giữ mẫu có gradient lớn, lấy mẫu ngẫu nhiên phần còn lại → ít dữ liệu hơn, cùng chất lượng.
- **EFB** (Exclusive Feature Bundling): gộp các đặc trưng loại trừ lẫn nhau (như các cột one-hot) thành một → giảm chiều hiệu dụng.
- **Ordered boosting** của CatBoost: chống **prediction shift** — hiện tượng rò rỉ tinh vi khi cùng dữ liệu được dùng cả để tính thống kê danh mục lẫn để huấn luyện.

### Vì sao cây thắng mạng neuron trên dữ liệu bảng

| Lý do | Chi tiết |
|---|---|
| Bất biến với biến đổi đơn điệu | Không cần chuẩn hoá; $\log$ hay không cũng cho cùng cây |
| Xử lý đặc trưng không đồng nhất | Số, danh mục, thang khác nhau — không vấn đề gì |
| Xử lý giá trị thiếu tự nhiên | Học hướng đi mặc định cho `NaN` |
| Bắt tương tác bậc thấp hiệu quả | Mỗi nhánh cây là một tương tác |
| Bền với đặc trưng vô dụng | Đơn giản là không chọn chúng để split |

Mạng neuron cần tất cả những thứ trên phải được **làm thủ công** — đó là lý do `Neural Net Torch` trong FADAML (0.898) thua LightGBM-Large (0.904) dù được cấu hình cẩn thận.

## 2. Nguyên tắc / Best practices

1. **Với dữ liệu bảng, thử LightGBM trước tiên.** Nhanh, mạnh, ít cần tinh chỉnh để có kết quả tốt.
2. **Luôn dùng early stopping với validation set.** Boosting **sẽ** overfit nếu để chạy mãi. Đây là khác biệt lớn nhất so với random forest.
3. **Dò theo thứ tự ưu tiên:** `learning_rate` → `num_leaves`/`max_depth` → `min_child_samples` → tham số lấy mẫu (`subsample`, `colsample`) → regularization.
4. **Learning rate nhỏ + nhiều cây > learning rate lớn + ít cây.** $\nu = 0.05$ với 1000 cây thường thắng $\nu = 0.3$ với 100 cây.
5. **Dùng CatBoost khi có nhiều đặc trưng danh mục cardinality cao.** Nó xử lý tốt nhất và tránh được rò rỉ target encoding.
6. **Không cần chuẩn hoá đặc trưng.** Khác với mọi thuật toán khác trong vault này — xem [[Data and Feature Engineering]].

## 3. Cạm bẫy / Sai lầm hay gặp

- **Không early stopping.** Boosting tiếp tục giảm train loss vô hạn. Không có early stopping thì bạn đang chọn "số cây" bằng cách đoán.
- **Đọc feature importance mặc định như sự thật.** Importance dựa trên số lần split (`split`) thiên vị đặc trưng cardinality cao; dựa trên gain (`gain`) ổn hơn nhưng vẫn không phải đo lường nhân quả. Dùng **permutation importance** hoặc SHAP.
- **Đặc trưng tương quan chia nhau importance.** Hai đặc trưng gần trùng nhau sẽ có importance thấp cả hai — không phải vì chúng vô dụng mà vì chúng thay thế được cho nhau. Đây là biểu hiện cụ thể của [[Prediction vs Inference]].
- **Rò rỉ target qua encoding danh mục.** Tính target encoding trên toàn bộ dữ liệu là rò rỉ kinh điển. CatBoost giải quyết bằng ordered boosting; các thư viện khác thì bạn phải tự lo trong pipeline.
- **`num_leaves` quá lớn với LightGBM.** Mọc leaf-wise nghĩa là `num_leaves = 1024` tạo cây rất sâu và overfit nhanh. Quy tắc: `num_leaves < 2^max_depth`.
- **Dùng gradient boosting để ngoại suy.** Cây không ngoại suy được — dự đoán bị chặn trong khoảng giá trị đã thấy khi train. Với chuỗi thời gian có xu hướng, đây là hạn chế nghiêm trọng.
- **Cho rằng nó luôn thắng.** Với ảnh, âm thanh, văn bản dài thuần tuý, mạng neuron thắng áp đảo. Cây thắng ở **dữ liệu bảng**.

## 4. Checklist áp dụng

- [ ] Dữ liệu của tôi có phải dạng bảng không? Nếu có, tôi đã thử gradient boosting chưa?
- [ ] Tôi có bật early stopping với validation set không?
- [ ] `learning_rate` của tôi là bao nhiêu? Tôi đã thử giá trị nhỏ hơn + nhiều cây hơn chưa?
- [ ] Với LightGBM: `num_leaves` có hợp lý so với `max_depth` không?
- [ ] Đặc trưng danh mục được xử lý thế nào? Có rò rỉ target không?
- [ ] Tôi đọc feature importance loại nào? Tôi đã thử permutation importance hoặc SHAP chưa?
- [ ] Có đặc trưng tương quan mạnh nào đang chia nhau importance không?
- [ ] Mô hình có cần ngoại suy ra ngoài miền dữ liệu train không? (Nếu có, cây không phù hợp.)
- [ ] Thời gian train và dự đoán có đạt yêu cầu không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| LightGBM | Nhanh nhất; `num_leaves`, `min_child_samples` là tham số chính | [lightgbm.readthedocs.io](https://lightgbm.readthedocs.io/) |
| XGBoost | Chín muồi, tài liệu tốt, chạy phân tán | [xgboost.readthedocs.io](https://xgboost.readthedocs.io/) |
| CatBoost | Tốt nhất cho đặc trưng danh mục | [catboost.ai](https://catboost.ai/) |
| `sklearn.ensemble.HistGradientBoosting*` | Không cần cài thêm gói; nhanh, đủ tốt | [scikit-learn.org](https://scikit-learn.org/stable/modules/ensemble.html#histogram-based-gradient-boosting) |
| SHAP | Giải thích đóng góp từng đặc trưng cho từng dự đoán | [shap.readthedocs.io](https://shap.readthedocs.io/) |

## Tham khảo

- Chen & Guestrin, "XGBoost: A Scalable Tree Boosting System", KDD 2016 — [arXiv:1603.02754](https://arxiv.org/abs/1603.02754)
- Ke et al., "LightGBM: A Highly Efficient Gradient Boosting Decision Tree", NeurIPS 2017 — [PDF](https://papers.nips.cc/paper/6907-lightgbm-a-highly-efficient-gradient-boosting-decision-tree)
- Prokhorenkova et al., "CatBoost: unbiased boosting with categorical features", NeurIPS 2018 — [arXiv:1706.09516](https://arxiv.org/abs/1706.09516)
- Grinsztajn, Oyallon & Varoquaux, "Why do tree-based models still outperform deep learning on tabular data?", NeurIPS 2022 — [arXiv:2207.08815](https://arxiv.org/abs/2207.08815)

## Liên kết

[[AutoML]] · [[FADAML Case Study]] · [[Multilayer Perceptron]] · [[Overfitting]] · [[Prediction vs Inference]] · [[ML]]
