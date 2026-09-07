---
tags: [ml, thuật-toán, svm, classification, supervised]
status: evergreen
---
# Soft Margin SVM

> Phiên bản SVM dùng được ngoài đời. Nó thừa nhận điều mà lề cứng phủ nhận: **dữ liệu thật luôn có nhiễu**, và cố tách hoàn hảo mọi điểm là công thức của overfitting.

## 1. Khái niệm cốt lõi

Thêm **slack variable** $\xi_i \ge 0$ cho phép vi phạm margin:

$$\min_{\mathbf{w},b,\boldsymbol{\xi}}\ \tfrac{1}{2}\lVert\mathbf{w}\rVert_2^2 + C\sum_{i=1}^{N}\xi_i \quad\text{s.t.}\quad y_i(\mathbf{w}^T\mathbf{x}_i+b) \ge 1-\xi_i,\ \ \xi_i \ge 0$$

| $\xi_i$ | Vị trí điểm |
|---|---|
| $\xi_i = 0$ | Đúng phía, ngoài hoặc trên margin |
| $0 < \xi_i < 1$ | Trong margin nhưng vẫn phân loại đúng |
| $\xi_i = 1$ | Nằm đúng trên siêu phẳng |
| $\xi_i > 1$ | **Phân loại sai** |

### Tham số $C$ — núm điều chỉnh duy nhất quan trọng

| | $C$ nhỏ | $C$ lớn |
|---|---|---|
| Ưu tiên | Margin rộng | Ít vi phạm |
| Cho phép sai | Nhiều | Ít |
| Bias / Variance | Bias cao | **Variance cao** |
| Số support vector | Nhiều | Ít |
| $C \to \infty$ | — | Quy về lề cứng |

$C$ chính là $1/\lambda$ trong ngôn ngữ [[Regularization]] — **$C$ nhỏ = regularize mạnh**. Dấu ngược này giống hệt tham số $C$ của [[Logistic Regression]] trong sklearn, và gây nhầm lẫn với cùng tần suất.

### Dạng không ràng buộc: hinge loss

Có thể loại bỏ hoàn toàn slack variable. Ràng buộc buộc $\xi_i \ge \max(0, 1 - y_i z_i)$, và vì đang cực tiểu nên dấu bằng xảy ra:

$$\min_{\mathbf{w},b}\ \underbrace{\sum_{i=1}^{N}\max\left(0,\ 1 - y_i(\mathbf{w}^T\mathbf{x}_i+b)\right)}_{\text{hinge loss}} + \underbrace{\tfrac{1}{2C}\lVert\mathbf{w}\rVert_2^2}_{\ell_2 \text{ regularizer}}$$

Cách viết này quan trọng vì nó cho thấy SVM **chỉ là** một mô hình tuyến tính với hinge loss + $\ell_2$ — cùng khuôn với mọi mô hình khác ở [[Loss Functions]]. Và nó cho phép train bằng SGD trên hàng triệu mẫu, thoát khỏi giới hạn bộ nhớ $O(N^2)$ của bài toán đối ngẫu.

Hinge loss lồi (max của hai hàm affine, xem [[Convex Sets and Functions]]) nhưng **không khả vi tại $y_i z_i = 1$** → dùng subgradient.

### Hinge vs cross-entropy

| | Hinge (SVM) | Cross-entropy (logistic) |
|---|---|---|
| Điểm đúng, xa biên | Loss = **đúng 0** | Loss > 0, vẫn nhỏ |
| Hệ quả | Chỉ support vector ảnh hưởng | Mọi điểm ảnh hưởng |
| Đầu ra | Khoảng cách có dấu | Xác suất |
| Nghiệm thưa | Có | Không |

## 2. Nguyên tắc / Best practices

1. **Chuẩn hoá trước, luôn luôn.** Không có ngoại lệ với SVM.
2. **Dò $C$ trên lưới log:** $\{10^{-3}, 10^{-2}, \ldots, 10^{3}\}$ bằng cross-validation. Đây là siêu tham số quan trọng nhất.
3. **Với kernel RBF, dò $C$ và $\gamma$ **cùng nhau** trên lưới 2D.** Chúng tương tác mạnh; dò tuần tự cho kết quả kém hơn rõ rệt. Xem [[Kernel SVM]].
4. **$N$ lớn ⟹ dùng `LinearSVC` hoặc `SGDClassifier(loss='hinge')`.** `SVC` có độ phức tạp siêu tuyến tính và trở nên không thực tế từ khoảng $N > 10^4$.
5. **Dùng `class_weight='balanced'` khi lớp mất cân bằng.** SVM tối ưu margin toàn cục nên rất nhạy với mất cân bằng.
6. **Kiểm tra tỉ lệ support vector.** Gần 100% nghĩa là $C$ quá nhỏ hoặc kernel quá rộng — mô hình chỉ đang ghi nhớ.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Nhầm chiều tác động của $C$.** $C$ **nhỏ** = regularize **mạnh** = margin rộng. Nhớ ngược sẽ khiến bạn dò lưới sai hướng suốt buổi.
- **Không chuẩn hoá.** Với `SVC(kernel='rbf')`, $\gamma$ mặc định là `'scale'` = $1/(d\cdot\text{Var}(X))$ — nó bù phần nào cho việc không chuẩn hoá, nhưng chỉ trên tổng thể, không theo từng đặc trưng. Vẫn phải chuẩn hoá.
- **Dùng `SVC` trên dữ liệu lớn.** Với $N = 100.000$, `SVC` có thể chạy nhiều giờ. `LinearSVC` xong trong vài giây.
- **Dùng `probability=True` mà không biết nó làm gì.** Nó chạy 5-fold CV nội bộ để fit Platt scaling — chậm hơn nhiều lần, và `predict_proba()` có thể mâu thuẫn với `predict()` ở các mẫu gần biên.
- **Quên rằng hinge loss không khả vi.** Nếu tự cài đặt bằng gradient descent thuần, thuật toán có thể dao động quanh điểm gãy. Dùng subgradient hoặc thư viện.
- **So sánh $C$ giữa các tập dữ liệu có kích thước khác nhau.** Số hạng $C\sum_i\xi_i$ tỉ lệ với $N$; $C$ tối ưu phụ thuộc kích thước dữ liệu.

## 4. Checklist áp dụng

- [ ] Đặc trưng đã chuẩn hoá chưa?
- [ ] $C$ được dò trên lưới log bằng cross-validation chứ?
- [ ] Tôi có nhớ đúng chiều: $C$ nhỏ = regularize mạnh?
- [ ] Nếu dùng RBF: tôi dò $C$ và $\gamma$ cùng nhau trên lưới 2D chứ?
- [ ] $N$ của tôi là bao nhiêu? `SVC` hay `LinearSVC` là lựa chọn đúng?
- [ ] Tỉ lệ support vector là bao nhiêu phần trăm?
- [ ] Lớp có mất cân bằng không? `class_weight` đã đặt chưa?
- [ ] Tôi có thật sự cần `probability=True` không, hay chỉ cần thứ hạng?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.svm.SVC` | Có `C`, `kernel`, `gamma`, `class_weight`, `probability` | [scikit-learn.org](https://scikit-learn.org/stable/modules/svm.html) |
| `sklearn.svm.LinearSVC` | Nhanh cho $N$ lớn; lưu ý: nó regularize cả bias | [scikit-learn.org](https://scikit-learn.org/stable/modules/generated/sklearn.svm.LinearSVC.html) |
| `SGDClassifier(loss='hinge')` | SVM tuyến tính qua SGD; xử lý được hàng triệu mẫu | [scikit-learn.org](https://scikit-learn.org/stable/modules/sgd.html) |
| `GridSearchCV` | Dò lưới 2D cho $(C, \gamma)$ | [scikit-learn.org](https://scikit-learn.org/stable/modules/grid_search.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 27 "Máy vector hỗ trợ lề mềm" (§27.4 dạng không ràng buộc) — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Cortes & Vapnik, "Support-vector networks", *Machine Learning* 20, 1995 — [doi:10.1007/BF00994018](https://doi.org/10.1007/BF00994018)
- Hsu, Chang & Lin, "A Practical Guide to Support Vector Classification" — [PDF](https://www.csie.ntu.edu.tw/~cjlin/papers/guide/guide.pdf)
- scikit-learn, *Support Vector Machines* — mục "Tips on Practical Use" — [scikit-learn.org](https://scikit-learn.org/stable/modules/svm.html#tips-on-practical-use)

## Liên kết

[[Support Vector Machine]] · [[Kernel SVM]] · [[Loss Functions]] · [[Regularization]] · [[ML]]
