---
tags: [ml, khái-niệm-nền, framing]
status: evergreen
---
# ML Problem Framing

> Sai lầm đắt nhất trong một dự án ML gần như không bao giờ là chọn sai mô hình — mà là **giải sai bài toán**. Note này là bước phải làm trước khi mở notebook.

## 1. Khái niệm cốt lõi

Định nghĩa kinh điển của Tom Mitchell: một chương trình *học* từ kinh nghiệm **E** với nhiệm vụ **T** và phép đánh giá **P**, nếu hiệu năng theo P trên T tăng lên khi có thêm E.

Ba chữ này là ba câu hỏi phải trả lời trước:

| | Câu hỏi | Nếu không trả lời được |
|---|---|---|
| **T** — Task | Đầu vào là gì, đầu ra là gì, một mẫu dữ liệu trông ra sao? | Không biết cần thu thập gì |
| **E** — Experience | Dữ liệu từ đâu, có nhãn không, bao nhiêu? | Không biết dự án khả thi không |
| **P** — Performance | Đo bằng metric nào, ngưỡng nào là "đủ tốt"? | Không bao giờ biết khi nào xong |

### Phân nhóm thuật toán theo nhãn

| Nhóm | Có nhãn? | Câu hỏi trả lời | Note trong vault |
|---|---|---|---|
| **Supervised** | Có | "Nhãn của điểm mới là gì?" | [[Linear Regression]], [[Logistic Regression]], [[Support Vector Machine]] |
| **Unsupervised** | Không | "Dữ liệu này có cấu trúc gì?" | [[K-Means Clustering]], [[Principal Component Analysis]] |
| **Semi-supervised** | Một phần | Ít nhãn, nhiều dữ liệu thô | Pseudo-labeling, self-training |
| **Reinforcement** | Phần thưởng trễ | "Hành động nào tối đa hoá phần thưởng dài hạn?" | [[Deep Reinforcement Learning]] |

### Phân nhóm theo dạng đầu ra

| Bài toán | Đầu ra | Metric mặc định |
|---|---|---|
| Classification | Nhãn rời rạc | Accuracy, F1 — xem [[Evaluation Metrics]] |
| Regression | Số thực | RMSE, MAE |
| Clustering | Phân nhóm | Silhouette, inertia |
| Dimensionality reduction | Biểu diễn ít chiều hơn | Tỉ lệ phương sai giữ lại |
| Ranking / recommendation | Thứ tự | Precision@k, NDCG — xem [[Utility Matrix]] |

### Hai kiểu dữ liệu, hai cách suy nghĩ

| | Dữ liệu có nhãn đầy đủ | Dữ liệu nhãn phải *tạo ra* |
|---|---|---|
| Ví dụ | MNIST, Iris | [[FADAML Case Study]] — nhãn "tin giả" không tồn tại sẵn |
| Rủi ro chính | Overfit | **Nhãn sai hệ thống** — mô hình học lại đúng thiên kiến của người gán nhãn |

> [!warning] Nhãn không phải sự thật, nhãn là một quyết định
> Trong [[FADAML Case Study]], "tin rao giả" được định nghĩa bằng quy tắc: nếu giá đăng lệch nhiều so với giá do chuyên gia định, và hai chuyên gia độc lập cho giá lệch nhau dưới 10%, thì gán nhãn *fake*. Mô hình đạt 91.5% accuracy — nhưng nó đang học **định nghĩa đó**, không phải học "sự giả dối". Luôn viết ra định nghĩa nhãn của bạn, thành văn, trước khi train.

## 2. Nguyên tắc / Best practices

1. **Viết một câu mô tả bài toán trước khi viết code.** "Cho một tin rao dạng text thô, dự đoán nhãn nhị phân giả/thật, tối ưu F1, mục tiêu ≥ 0.90." Nếu không viết được câu này, dự án chưa sẵn sàng.
2. **Xác định baseline tầm thường ngay đầu.** Đoán lớp đa số cho ra bao nhiêu? Một quy tắc heuristic đơn giản cho ra bao nhiêu? Mọi mô hình phải vượt con số này mới đáng nói.
3. **Bắt đầu từ thuật toán đơn giản nhất.** Sách *Machine Learning cơ bản* nhấn mạnh điều này ở lời nói đầu, và nó vẫn đúng: một mô hình đơn giản chạy trong 5 phút cho bạn biết bài toán khó tới đâu — thông tin đó đáng giá hơn một mô hình phức tạp chạy 3 ngày.
4. **Hỏi "sai kiểu nào tốn kém hơn" trước khi chọn metric.** Chặn nhầm một tin thật (false positive) và bỏ lọt một tin giả (false negative) có chi phí rất khác nhau — xem [[Evaluation Metrics]].
5. **Kiểm tra bài toán có cần ML không.** Nếu một bộ quy tắc `if/else` do chuyên gia viết ra đạt 85% và ML đạt 88%, chi phí vận hành ML có thể không đáng.
6. **Xác định rõ mình cần dự đoán hay cần hiểu.** Đây là ngã rẽ lớn nhất — xem [[Prediction vs Inference]].

## 3. Cạm bẫy / Sai lầm hay gặp

- **Nhảy vào mô hình trước khi định nghĩa metric.** Kết quả: 3 tuần sau vẫn tranh cãi "mô hình này tốt hơn không".
- **Định nghĩa nhãn mơ hồ.** "Khách hàng có nguy cơ rời bỏ" — trong bao lâu? 30 ngày hay 90 ngày? Hai định nghĩa này là hai bài toán khác nhau với hai mô hình khác nhau.
- **Dùng thông tin không có ở thời điểm dự đoán.** Kinh điển: đưa `ngày_huỷ_đơn` vào mô hình dự đoán huỷ đơn. Mô hình đạt 99% và vô dụng khi triển khai. Xem [[Model Validation]].
- **Bỏ qua chi phí thu thập dữ liệu.** Đặc trưng tốt nhất trong nghiên cứu có thể là đặc trưng không lấy được real-time trong sản xuất.
- **Cho rằng accuracy cao nghĩa là triển khai được.** Chính các tác giả FADAML thừa nhận 91.5% accuracy (FPR 9.8%, FNR 7.4%) **vẫn chưa đủ để đưa vào sản xuất**. Ngưỡng "đủ tốt" do bài toán quyết định, không do bảng xếp hạng quyết định.
- **Quên rằng bài toán tự thay đổi.** Tin rao giả tiến hoá nhanh hơn mô hình. Không có kế hoạch retrain thì mô hình sẽ mục dần mà không ai hay.

## 4. Checklist áp dụng

- [ ] Tôi viết được T, E, P thành ba câu rõ ràng chưa?
- [ ] Một mẫu dữ liệu (input, output) trông cụ thể như thế nào? Tôi đã nhìn 10 mẫu thật chưa?
- [ ] Nhãn của tôi được định nghĩa bằng quy tắc gì? Quy tắc đó có được viết ra không?
- [ ] Baseline tầm thường cho ra con số bao nhiêu?
- [ ] Sai kiểu nào tốn kém hơn: false positive hay false negative?
- [ ] Mọi đặc trưng tôi dùng có sẵn **tại thời điểm dự đoán** trong sản xuất không?
- [ ] Ngưỡng "đủ tốt để triển khai" là bao nhiêu, và ai quyết định con số đó?
- [ ] Bài toán này có cần ML không, hay quy tắc thủ công đã đủ?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google ML Problem Framing | Checklist chính thức, ngắn và thực dụng | [developers.google.com](https://developers.google.com/machine-learning/problem-framing) |
| `sklearn.dummy` | `DummyClassifier` / `DummyRegressor` — baseline tầm thường trong 2 dòng | [scikit-learn.org](https://scikit-learn.org/stable/modules/model_evaluation.html#dummy-estimators) |
| ML Canvas | Mẫu một trang để điền T/E/P và các bên liên quan | [ownml.co/machine-learning-canvas](https://www.ownml.co/machine-learning-canvas) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 5 "Các khái niệm cơ bản" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Mitchell, *Machine Learning*, McGraw-Hill 1997 — định nghĩa T/E/P
- Domingos, "A Few Useful Things to Know about Machine Learning", *CACM* 55(10), 2012 — [PDF](https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf)
- Sculley et al., "Hidden Technical Debt in Machine Learning Systems", NeurIPS 2015 — [PDF](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf)

## Liên kết

[[Data and Feature Engineering]] · [[Evaluation Metrics]] · [[Model Validation]] · [[Prediction vs Inference]] · [[ML]]
