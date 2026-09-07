---
tags: [ml, ứng-dụng, automl, tooling]
status: evergreen
---
# AutoML

> AutoML tự động hoá phần **chọn mô hình và tinh chỉnh siêu tham số** — công đoạn tốn thời gian nhất và ít sáng tạo nhất của một dự án ML. Nó không tự động hoá phần khó thật sự: hiểu bài toán, tạo đặc trưng, và quyết định thế nào là thành công.

## 1. Khái niệm cốt lõi

AutoML tìm kiếm trong không gian:

| Chiều tìm kiếm | Ví dụ |
|---|---|
| Tiền xử lý | Chuẩn hoá nào, điền khuyết ra sao, encoding gì |
| Thuật toán | Cây, tuyến tính, mạng neuron, KNN |
| Siêu tham số | Learning rate, độ sâu cây, $C$ của SVM |
| Ensemble | Mô hình nào gộp với nhau, trọng số bao nhiêu |

### Các framework

| Framework | Điểm mạnh | Link |
|---|---|---|
| **AutoGluon** | Rất mạnh trên dữ liệu thô; stacking nhiều tầng; hỗ trợ multimodal | [auto.gluon.ai](https://auto.gluon.ai/) |
| auto-sklearn | Meta-learning + Bayesian optimization | [automl.github.io](https://automl.github.io/auto-sklearn/) |
| TPOT | Tìm kiếm pipeline bằng thuật toán di truyền | [epistasislab.github.io/tpot](http://epistasislab.github.io/tpot/) |
| H2O AutoML | Quy mô doanh nghiệp, phân tán | [h2o.ai](https://h2o.ai/) |
| Optuna | Không phải AutoML đầy đủ — chỉ tối ưu siêu tham số, nhưng rất linh hoạt | [optuna.org](https://optuna.org/) |

### Stacking — kỹ thuật cốt lõi của AutoGluon

Thay vì chọn **một** mô hình tốt nhất, xếp chồng chúng thành tầng:

1. **Tầng 1:** huấn luyện mọi mô hình cơ sở trên tập train
2. **Tầng 2:** ghép dự đoán của tầng 1 **với đặc trưng gốc** thành vector đầu vào mới, rồi chạy ensemble selection
3. **Weighted ensemble:** kết hợp có trọng số dựa trên hiệu năng validation

Bước ensemble selection lặp đi lặp lại: mỗi vòng thêm vào ensemble mô hình **cải thiện validation nhiều nhất** (cho phép chọn lại cùng một mô hình để tăng trọng số).

> [!note] Kiến trúc này mượn từ deep learning
> AutoGluon mô tả quy trình huấn luyện của nó là lấy cảm hứng từ **huấn luyện theo tầng và skip connection** trong deep learning — khác biệt là mỗi "node" trong một tầng là **một mô hình ML hoàn chỉnh**, không phải một neuron. Việc nối dự đoán tầng 1 với đặc trưng gốc chính là skip connection.

### Bằng chứng: bảng kết quả FADAML

Toàn bộ 14 mô hình AutoGluon huấn luyện, sắp theo validation accuracy:

| Mô hình | Val. accuracy | Thời gian dự đoán (s) | Thời gian train (s) |
|---|---|---|---|
| **Weighted Ensemble** | **0.925** | 0.376 | 124.86 |
| LightGBM-Large | 0.904 | 0.063 | 6.70 |
| Neural Net Torch | 0.898 | 0.032 | 25.45 |
| LightGBM | 0.892 | 0.066 | 4.58 |
| CatBoost | 0.892 | 0.208 | 72.13 |
| XGBoost | 0.883 | 0.117 | 10.71 |
| LightGBM-XT | 0.881 | 0.112 | 13.06 |
| Random Forest (Entropy) | 0.790 | 0.066 | 14.88 |
| Random Forest (Gini) | 0.787 | 0.066 | 14.96 |
| Extra Trees (Entropy) | 0.782 | 0.070 | 19.92 |
| Extra Trees (Gini) | 0.781 | 0.069 | 19.68 |
| KNN Distance | 0.756 | **10.487** | 1.13 |
| KNN Uniform | 0.721 | **10.681** | 1.10 |
| Neural Net FastAI | 0.627 | 0.027 | 9.16 |

Ba điều đọc được từ bảng này:

1. **Ensemble thắng mọi mô hình đơn** (+2.1 điểm so với mô hình tốt nhất) nhưng **train chậm gấp 19 lần** LightGBM-Large.
2. **Gradient boosting thống trị** — bốn vị trí trong top 6. Xem [[Gradient Boosting and Tree Ensembles]].
3. **KNN có thời gian dự đoán 10.5 giây** — chậm hơn LightGBM ~160 lần. Với hệ thống lọc real-time, nó là không dùng được bất kể accuracy.

Toàn bộ hệ thống chạy trên máy **AMD Ryzen 7, 16 GB RAM**, dùng khoảng 2.4 GB bộ nhớ. Không cần GPU.

## 2. Nguyên tắc / Best practices

1. **Dùng AutoML để lập baseline mạnh, nhanh.** Trong vài phút bạn có con số mà tinh chỉnh thủ công phải mất nhiều ngày mới đạt.
2. **Đầu tư vào feature engineering, không vào tinh chỉnh mô hình.** Ablation của FADAML cho thấy đặc trưng đóng góp 13 điểm; chênh lệch giữa các mô hình chỉ vài điểm. Xem [[Data and Feature Engineering]].
3. **Đặt ngân sách thời gian tường minh.** Không có giới hạn, AutoGluon sẽ train tới hội tụ — hợp lý cho nghiên cứu, không hợp lý cho vòng lặp thử nghiệm.
4. **Kiểm tra bảng leaderboard, đừng chỉ lấy mô hình top.** Nếu mô hình thứ hai kém 1% nhưng nhanh gấp 20 lần, nó thường là lựa chọn triển khai đúng.
5. **Đo thời gian dự đoán, không chỉ accuracy.** Bảng trên là ví dụ hoàn hảo về vì sao.
6. **Giới hạn bộ nhớ cho đặc trưng n-gram.** FADAML đặt 15% để tránh out-of-memory — một tham số nhỏ nhưng quyết định việc chạy được hay không.

## 3. Cạm bẫy / Sai lầm hay gặp

- **AutoML không sửa được dữ liệu tồi.** Nhãn sai, rò rỉ, đặc trưng vô nghĩa — AutoML sẽ tối ưu hết sức lên chính những sai lầm đó, và cho ra con số đẹp trên một bài toán sai.
- **Rò rỉ dữ liệu được khuếch đại.** Vì AutoML thử hàng chục cấu hình, một rò rỉ nhỏ sẽ được khai thác triệt để. Xem [[Model Validation]].
- **Overfit lên validation set.** Thử 50 mô hình rồi chọn cái tốt nhất trên validation thì con số đó đã bị lạc quan hoá. Cần tập test riêng.
- **Ensemble khó triển khai và khó gỡ lỗi.** 14 mô hình xếp hai tầng có nghĩa là 14 phụ thuộc thư viện, 14 điểm hỏng, và không cách nào giải thích một dự đoán cụ thể.
- **Bỏ qua chi phí suy luận.** Weighted ensemble của FADAML mất 0.376s cho một batch validation — gấp 6 lần LightGBM đơn lẻ.
- **Cho rằng AutoML thay thế được hiểu biết miền.** Chín đặc trưng do chuyên gia bất động sản thiết kế trong FADAML là thứ AutoML **không thể** tự tạo ra. Nó tối ưu trên đặc trưng bạn đưa cho nó.
- **Không cố định seed và version.** Kết quả AutoML rất khó tái lập nếu không ghim phiên bản thư viện.

## 4. Checklist áp dụng

- [ ] Tôi đã kiểm tra rò rỉ dữ liệu **trước** khi chạy AutoML chưa?
- [ ] Tôi có tập test riêng, chưa bị AutoML chạm vào không?
- [ ] Tôi đã đặt ngân sách thời gian chưa?
- [ ] Tôi đã xem toàn bộ leaderboard chứ không chỉ mô hình top?
- [ ] Thời gian dự đoán của mô hình được chọn là bao nhiêu? Có đạt yêu cầu sản xuất không?
- [ ] Mô hình được chọn có triển khai được không (số phụ thuộc, kích thước)?
- [ ] Tôi đã dành thời gian cho feature engineering tương xứng chưa?
- [ ] Tôi đã ghim phiên bản thư viện và seed để tái lập được chưa?
- [ ] Tôi có cần giải thích từng dự đoán không? Nếu có, ensemble có phù hợp không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| AutoGluon | `TabularPredictor.fit()`; `leaderboard()` in bảng như trên | [auto.gluon.ai](https://auto.gluon.ai/) |
| Optuna | Tối ưu siêu tham số linh hoạt, tích hợp với mọi framework | [optuna.org](https://optuna.org/) |
| auto-sklearn | Meta-learning từ các dataset trước | [automl.github.io/auto-sklearn](https://automl.github.io/auto-sklearn/) |
| `feature_importance()` của AutoGluon | Permutation importance cho ensemble | [auto.gluon.ai](https://auto.gluon.ai/stable/api/autogluon.tabular.TabularPredictor.feature_importance.html) |

## Tham khảo

- Erickson et al., "AutoGluon-Tabular: Robust and Accurate AutoML for Structured Data" — [arXiv:2003.06505](https://arxiv.org/abs/2003.06505)
- Hutter, Kotthoff & Vanschoren (eds.), *Automated Machine Learning: Methods, Systems, Challenges*, Springer 2019 — [PDF miễn phí](https://www.automl.org/book/)
- Nguyen, Nguyen & Nguyen, "Fake Advertisements Detection Using Automated Multimodal Learning", §4.3 & Table 10 — [arXiv:2501.10848](https://arxiv.org/abs/2501.10848)
- Caruana et al., "Ensemble Selection from Libraries of Models", ICML 2004 — thuật toán ensemble selection dùng trong AutoGluon

## Liên kết

[[FADAML Case Study]] · [[Gradient Boosting and Tree Ensembles]] · [[Multimodal Machine Learning]] · [[Model Validation]] · [[Prediction vs Inference]] · [[ML]]
