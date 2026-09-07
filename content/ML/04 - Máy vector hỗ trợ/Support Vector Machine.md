---
tags: [ml, thuật-toán, svm, classification, supervised]
status: evergreen
---
# Support Vector Machine

> Perceptron dừng ở **bất kỳ** đường tách nào. SVM hỏi câu hỏi tốt hơn: trong vô số đường tách được, đường nào **an toàn nhất**? Câu trả lời — đường có margin lớn nhất — vừa duy nhất, vừa có nền tảng lý thuyết vững, vừa dẫn thẳng tới [[Kernel SVM]].

## 1. Khái niệm cốt lõi

**Margin** = khoảng cách từ siêu phẳng $\mathbf{w}^T\mathbf{x} + b = 0$ tới điểm dữ liệu gần nhất. SVM cực đại hoá nó.

Khoảng cách từ điểm $\mathbf{x}_i$ tới siêu phẳng: $\dfrac{y_i(\mathbf{w}^T\mathbf{x}_i + b)}{\lVert\mathbf{w}\rVert_2}$.

Chuẩn hoá sao cho điểm gần nhất có $y_i(\mathbf{w}^T\mathbf{x}_i+b) = 1$, khi đó margin $= 2/\lVert\mathbf{w}\rVert_2$, và cực đại margin ⟺ cực tiểu $\lVert\mathbf{w}\rVert^2$:

$$\min_{\mathbf{w},b}\ \tfrac{1}{2}\lVert\mathbf{w}\rVert_2^2 \quad\text{s.t.}\quad y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1,\ \forall i$$

Đây là một **QP** (xem [[Convex Optimization Problems]]): hàm mục tiêu toàn phương lồi, ràng buộc affine ⟹ nghiệm toàn cục **duy nhất**.

### Bài toán đối ngẫu

Áp dụng [[Lagrange Duality]]:

$$\max_{\boldsymbol{\lambda}}\ \sum_i \lambda_i - \tfrac{1}{2}\sum_{i,j}\lambda_i\lambda_j y_i y_j \,\mathbf{x}_i^T\mathbf{x}_j \quad\text{s.t.}\quad \lambda_i \ge 0,\ \sum_i \lambda_i y_i = 0$$

Khôi phục nghiệm gốc: $\mathbf{w} = \sum_i \lambda_i y_i \mathbf{x}_i$, và $b$ tính từ bất kỳ support vector nào.

> [!note] Hai điều quan trọng nhất trong bài toán đối ngẫu
> **Thứ nhất:** dữ liệu chỉ xuất hiện qua **tích vô hướng** $\mathbf{x}_i^T\mathbf{x}_j$. Thay tích vô hướng bằng một hàm kernel là toàn bộ ý tưởng của [[Kernel SVM]] — không cần đổi gì khác trong thuật toán.
> **Thứ hai:** theo complementary slackness, $\lambda_i > 0$ **chỉ với** những điểm nằm đúng trên margin. Mọi điểm khác có $\lambda_i = 0$ và biến mất khỏi nghiệm. Đó là **support vector**.

### Support vector — hệ quả thực tế

| Đặc điểm | Ý nghĩa |
|---|---|
| Chỉ support vector quyết định siêu phẳng | Xoá mọi điểm khác → nghiệm không đổi |
| Số support vector thường nhỏ so với $N$ | Mô hình gọn khi triển khai |
| Thêm điểm xa biên không đổi gì | Bền với dữ liệu "dễ" |
| Di chuyển một support vector → biên đổi | **Rất nhạy** với outlier gần biên |

Dòng cuối là điểm yếu chí mạng của SVM lề cứng, và là lý do [[Soft Margin SVM]] tồn tại.

### So sánh với các mô hình tuyến tính khác

| | [[Perceptron Learning Algorithm]] | [[Logistic Regression]] | **SVM lề cứng** |
|---|---|---|---|
| Nghiệm | Bất kỳ đường tách nào | Xác định bởi cross-entropy | **Margin cực đại, duy nhất** |
| Dữ liệu không tách được | Không hội tụ | Hội tụ | **Vô nghiệm** |
| Cho xác suất | Không | Có | Không (cần Platt scaling) |
| Nhạy với outlier | Có | Vừa phải | **Rất cao** |

## 2. Nguyên tắc / Best practices

1. **Chuẩn hoá đặc trưng, bắt buộc.** SVM dựa hoàn toàn vào khoảng cách hình học. Không chuẩn hoá thì margin bị đặc trưng thang lớn chi phối.
2. **Đừng dùng lề cứng trong thực tế.** Dữ liệu thật gần như không bao giờ tách được tuyến tính hoàn hảo. Luôn bắt đầu từ [[Soft Margin SVM]] với tham số $C$.
3. **Với $d$ lớn và $N$ vừa, dùng bài toán đối ngẫu.** Với $N$ rất lớn, dùng dạng gốc + SGD (`LinearSVC` hoặc `SGDClassifier` với hinge loss).
4. **Kiểm tra số support vector.** Nếu gần bằng $N$, mô hình đang overfit hoặc $C$ chọn sai — xem [[Soft Margin SVM]].
5. **Học SVM lề cứng như bước đệm lý thuyết, không phải công cụ.** Giá trị của chương này là dẫn giải đối ngẫu, thứ mở đường cho kernel.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Dữ liệu không tách được ⟹ bài toán vô nghiệm.** Không phải "hội tụ chậm" — tập khả thi rỗng. Solver sẽ báo infeasible. Đây là hành vi đúng, không phải bug.
- **Một outlier duy nhất phá huỷ mô hình.** Một điểm nhãn sai nằm sâu trong vùng lớp kia làm margin co về gần 0. Trên dữ liệu bất động sản có nhãn do người gán, điều này gần như chắc chắn xảy ra.
- **Quên chuẩn hoá.** Lỗi phổ biến nhất khi dùng SVM.
- **Ma trận kernel $N\times N$ không vừa bộ nhớ.** Với $N = 50.000$, ma trận `float64` chiếm 20 GB. Đây là giới hạn cứng của cách tiếp cận đối ngẫu — với dữ liệu lớn phải dùng dạng gốc.
- **Mong đợi xác suất từ SVM.** SVM cho khoảng cách có dấu, không cho xác suất. `probability=True` trong sklearn chạy Platt scaling bằng cross-validation nội bộ — nó **chậm hơn nhiều** và đôi khi không nhất quán với `predict()`.
- **Dùng SVM cho bài toán đa lớp mà không nghĩ.** SVM vốn là nhị phân — xem [[Multiclass SVM]].

## 4. Checklist áp dụng

- [ ] Đặc trưng đã được chuẩn hoá chưa?
- [ ] Dữ liệu của tôi có tách được tuyến tính không? Nếu không (gần như chắc chắn), tôi dùng soft margin chứ?
- [ ] $N$ của tôi là bao nhiêu? Ma trận kernel $N\times N$ có vừa bộ nhớ không?
- [ ] Số support vector chiếm bao nhiêu phần trăm dữ liệu?
- [ ] Tôi có cần xác suất không? Nếu có, SVM có phải lựa chọn đúng?
- [ ] Có outlier nào nằm sâu trong vùng lớp đối diện không?
- [ ] Bài toán của tôi có nhiều hơn 2 lớp không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.svm.SVC` | SVM đầy đủ với kernel; dùng libsvm; $O(N^2)$–$O(N^3)$ | [scikit-learn.org](https://scikit-learn.org/stable/modules/svm.html) |
| `sklearn.svm.LinearSVC` | Chỉ kernel tuyến tính, dùng liblinear — **nhanh hơn nhiều** cho $N$ lớn | [scikit-learn.org](https://scikit-learn.org/stable/modules/svm.html#svm-classification) |
| CVXOPT `solvers.qp` | Giải trực tiếp bài toán QP, khớp với dẫn giải trong sách | [cvxopt.org](https://cvxopt.org/) |
| LIBSVM | Cài đặt tham chiếu, có tài liệu "practical guide" rất tốt | [csie.ntu.edu.tw/~cjlin/libsvm](https://www.csie.ntu.edu.tw/~cjlin/libsvm/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 26 "Máy vector hỗ trợ" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Cortes & Vapnik, "Support-vector networks", *Machine Learning* 20:273–297, 1995 — [doi:10.1007/BF00994018](https://doi.org/10.1007/BF00994018)
- Hsu, Chang & Lin, "A Practical Guide to Support Vector Classification" — [PDF](https://www.csie.ntu.edu.tw/~cjlin/papers/guide/guide.pdf)
- Bishop, *Pattern Recognition and Machine Learning*, Ch. 7 "Sparse Kernel Machines", Springer 2006

## Liên kết

[[Soft Margin SVM]] · [[Kernel SVM]] · [[Lagrange Duality]] · [[Convex Optimization Problems]] · [[ML]]
