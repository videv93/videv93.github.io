---
tags: [ml, thuật-toán, svm, classification]
status: evergreen
---
# Multiclass SVM

> SVM được sinh ra cho bài toán nhị phân. Mở rộng nó lên $K$ lớp có ba cách, và chúng khác nhau về chi phí tính toán lẫn chất lượng nghiệm — không phải chi tiết kỹ thuật vặt vãnh.

## 1. Khái niệm cốt lõi

| Chiến lược | Số mô hình | Mỗi mô hình train trên | Dự đoán |
|---|---|---|---|
| **One-vs-Rest (OvR)** | $K$ | **Toàn bộ** dữ liệu | Chọn lớp có khoảng cách lớn nhất |
| **One-vs-One (OvO)** | $K(K-1)/2$ | Chỉ 2 lớp liên quan | Bỏ phiếu |
| **Multi-class hinge** | 1 | Toàn bộ | Argmax của $K$ điểm số |

### So sánh chi phí

Với $N$ mẫu, $K$ lớp, thuật toán train có độ phức tạp $O(N^2)$ (như `SVC`):

| | OvR | OvO |
|---|---|---|
| Số mô hình | $K$ | $K(K-1)/2$ |
| Kích thước mỗi bài toán | $N$ | $\approx 2N/K$ |
| Tổng chi phí $\approx$ | $K\cdot N^2$ | $\frac{K^2}{2}\cdot\left(\frac{2N}{K}\right)^2 = 2N^2$ |

Kết luận **phản trực giác**: OvO train **nhiều mô hình hơn** nhưng tổng chi phí **thấp hơn** và không phụ thuộc $K$ — vì mỗi bài toán con nhỏ hơn nhiều, và độ phức tạp là bậc hai. Đây chính là lý do `sklearn.svm.SVC` dùng OvO làm mặc định, trong khi hầu hết mô hình khác dùng OvR.

| | OvR | OvO |
|---|---|---|
| Mất cân bằng lớp | **Có** — mỗi mô hình thấy 1 vs $K-1$ | Không |
| Vùng nhập nhằng | Có (nhiều mô hình cùng nói "có") | Có (hoà phiếu) |
| Trí nhớ khi triển khai | $K$ mô hình | $K(K-1)/2$ mô hình |
| Diễn giải được | Dễ hơn | Khó hơn |

### Multi-class hinge loss

Cách thứ ba: một mô hình duy nhất với $K$ vector trọng số, dùng hàm mất mát trực tiếp cho đa lớp (Crammer–Singer):

$$\mathcal{L}_i = \sum_{k \ne y_i}\max\left(0,\ \mathbf{w}_k^T\mathbf{x}_i - \mathbf{w}_{y_i}^T\mathbf{x}_i + \Delta\right)$$

Đọc là: "điểm số của lớp đúng phải cao hơn mọi lớp khác **ít nhất $\Delta$**; phần thiếu bao nhiêu thì phạt bấy nhiêu". $\Delta = 1$ là mặc định (nó có thể hấp thụ vào thang của $\mathbf{w}$).

| | Multi-class hinge | Cross-entropy ([[Softmax Regression]]) |
|---|---|---|
| Mục tiêu | Chỉ cần vượt margin $\Delta$ | Luôn đẩy xác suất lớp đúng lên 1 |
| Khi đã vượt margin | Loss = 0, ngừng học từ mẫu đó | Vẫn còn loss nhỏ |
| Đầu ra | Điểm số, không phải xác suất | Xác suất |
| Thực tế | Chênh lệch thường nhỏ | Phổ biến hơn nhiều |

Đây cũng chính là hàm mất mát dùng cho tầng phân loại tuyến tính trong nhiều bài giảng computer vision, nên đáng nhớ dù ít dùng độc lập.

## 2. Nguyên tắc / Best practices

1. **Để thư viện lo, trừ khi có lý do cụ thể.** `SVC` dùng OvO, `LinearSVC` dùng OvR — cả hai đều là lựa chọn đúng cho ngữ cảnh của chúng.
2. **$K$ lớn ($> 20$) ⟹ tránh OvO.** $K(K-1)/2$ mô hình trở nên khó quản lý khi triển khai, kể cả khi train nhanh.
3. **Dùng `class_weight='balanced'` với OvR.** OvR tự tạo mất cân bằng 1-vs-rest; không bù lại thì các lớp hiếm bị bỏ qua.
4. **Đánh giá bằng F1 macro, không phải accuracy.** Với đa lớp, accuracy che giấu hiệu năng tệ trên lớp hiếm. Xem [[Evaluation Metrics]].
5. **Kiểm tra ma trận nhầm lẫn $K\times K$.** Nó cho biết **cặp lớp nào** bị lẫn — thông tin hành động được, khác hẳn một con số tổng hợp.
6. **Với $K$ rất lớn, cân nhắc [[Softmax Regression]] hoặc gradient boosting.** Chúng xử lý đa lớp tự nhiên bằng một mô hình duy nhất.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Cho rằng OvO chậm hơn vì nhiều mô hình hơn.** Xem bảng chi phí — điều ngược lại mới đúng với thuật toán bậc hai.
- **Quên mất cân bằng do OvR tạo ra.** Với $K=10$ lớp cân bằng, mỗi mô hình OvR thấy tỉ lệ 1:9. Với lớp hiếm thì còn tệ hơn nhiều.
- **Vùng nhập nhằng không được xử lý.** OvR: nhiều mô hình cùng trả về dương. OvO: hoà phiếu. Thư viện có quy tắc phá hoà (dùng khoảng cách có dấu), nhưng nếu tự cài đặt thì phải nghĩ tới.
- **So sánh khoảng cách có dấu giữa các mô hình OvR khác nhau.** Chúng được huấn luyện độc lập, thang điểm không so sánh trực tiếp được. Đây là lý do OvR cần calibrate nếu muốn dùng như xác suất.
- **Dùng accuracy trên tập đa lớp mất cân bằng.** Cùng cạm bẫy đã nêu ở [[Evaluation Metrics]], nhưng khuếch đại lên khi $K$ lớn.
- **Bỏ qua thời gian dự đoán khi triển khai.** OvO với $K=50$ nghĩa là 1.225 mô hình phải chạy cho **mỗi** dự đoán.

## 4. Checklist áp dụng

- [ ] $K$ của tôi là bao nhiêu? OvO có khả thi khi triển khai không?
- [ ] Nếu dùng OvR: tôi đã đặt `class_weight='balanced'` chưa?
- [ ] Tôi đánh giá bằng F1 macro hay accuracy?
- [ ] Tôi đã in ma trận nhầm lẫn $K\times K$ chưa? Cặp lớp nào bị lẫn nhiều nhất?
- [ ] Thời gian dự đoán cho một mẫu là bao nhiêu? Có chấp nhận được không?
- [ ] Tôi có cần xác suất không? Nếu có, tôi đã calibrate chưa?
- [ ] Tôi đã so với [[Softmax Regression]] và gradient boosting chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.svm.SVC` | Mặc định OvO (`decision_function_shape='ovr'` chỉ đổi cách trình bày đầu ra) | [scikit-learn.org](https://scikit-learn.org/stable/modules/svm.html#multi-class-classification) |
| `sklearn.svm.LinearSVC` | Mặc định OvR; có `multi_class='crammer_singer'` cho multi-class hinge | [scikit-learn.org](https://scikit-learn.org/stable/modules/generated/sklearn.svm.LinearSVC.html) |
| `sklearn.multiclass` | `OneVsRestClassifier`, `OneVsOneClassifier` — bọc bất kỳ mô hình nhị phân nào | [scikit-learn.org](https://scikit-learn.org/stable/modules/multiclass.html) |
| `ConfusionMatrixDisplay` | Ma trận nhầm lẫn $K\times K$, chuẩn hoá theo hàng | [scikit-learn.org](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ConfusionMatrixDisplay.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 29 "Máy vector hỗ trợ đa lớp" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Crammer & Singer, "On the Algorithmic Implementation of Multiclass Kernel-based Vector Machines", *JMLR* 2, 2001 — [PDF](https://www.jmlr.org/papers/v2/crammer01a.html)
- Hsu & Lin, "A Comparison of Methods for Multiclass Support Vector Machines", *IEEE TNN* 13(2), 2002 — [doi:10.1109/72.991427](https://doi.org/10.1109/72.991427)
- CS231n, *Linear Classification: Multiclass SVM loss* — [cs231n.github.io](https://cs231n.github.io/linear-classify/)

## Liên kết

[[Support Vector Machine]] · [[Soft Margin SVM]] · [[Softmax Regression]] · [[Evaluation Metrics]] · [[ML]]
