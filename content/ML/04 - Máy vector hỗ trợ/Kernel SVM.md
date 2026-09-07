---
tags: [ml, thuật-toán, svm, kernel, classification]
status: evergreen
---
# Kernel SVM

> Kernel trick là một trong những ý tưởng đẹp nhất của ML: **làm việc trong không gian vô hạn chiều mà không bao giờ đặt chân vào đó**. Nó biến SVM từ một bộ phân loại tuyến tính thành một trong những mô hình phi tuyến mạnh nhất trước kỷ nguyên deep learning.

## 1. Khái niệm cốt lõi

**Vấn đề:** dữ liệu không tách được tuyến tính trong không gian gốc.
**Ý tưởng cũ:** ánh xạ sang không gian nhiều chiều hơn $\Phi(\mathbf{x})$, nơi nó tách được.
**Vấn đề của ý tưởng cũ:** $\Phi(\mathbf{x})$ có thể có hàng triệu — hoặc vô hạn — chiều. Không tính nổi.

**Kernel trick:** nhớ rằng bài toán đối ngẫu của [[Support Vector Machine]] chỉ chứa dữ liệu qua tích vô hướng $\mathbf{x}_i^T\mathbf{x}_j$. Thay nó bằng
$$k(\mathbf{x}_i,\mathbf{x}_j) = \Phi(\mathbf{x}_i)^T\Phi(\mathbf{x}_j)$$
và tính $k$ **trực tiếp**, không bao giờ tính $\Phi$.

Ví dụ cụ thể: với $\mathbf{x}\in\mathbb{R}^2$ và $k(\mathbf{x},\mathbf{z}) = (\mathbf{x}^T\mathbf{z})^2$, khai triển ra cho thấy nó tương đương với tích vô hướng trong không gian 3 chiều $\Phi(\mathbf{x}) = (x_1^2, \sqrt{2}x_1x_2, x_2^2)$ — nhưng ta chỉ cần bình phương một tích vô hướng 2 chiều.

### Điều kiện Mercer

Một hàm $k$ là kernel hợp lệ ⟺ ma trận Gram $\mathbf{K}$ với $K_{ij} = k(\mathbf{x}_i,\mathbf{x}_j)$ **đối xứng và nửa xác định dương** với mọi tập điểm.

Điều này đảm bảo tồn tại $\Phi$ tương ứng, và giữ cho bài toán đối ngẫu vẫn lồi. Kernel không thoả Mercer → bài toán không lồi → mọi bảo đảm mất hiệu lực.

### Các kernel thường dùng

| Kernel | $k(\mathbf{x},\mathbf{z})$ | Siêu tham số | Dùng khi |
|---|---|---|---|
| **Linear** | $\mathbf{x}^T\mathbf{z}$ | — | $d$ lớn, text; luôn thử đầu tiên |
| **Polynomial** | $(\gamma\mathbf{x}^T\mathbf{z} + r)^{D}$ | $\gamma, r, D$ | Biết tương tác bậc thấp có ý nghĩa |
| **RBF / Gaussian** | $\exp(-\gamma\lVert\mathbf{x}-\mathbf{z}\rVert^2)$ | $\gamma$ | **Mặc định phi tuyến**; $\Phi$ vô hạn chiều |
| **Sigmoid** | $\tanh(\gamma\mathbf{x}^T\mathbf{z} + r)$ | $\gamma, r$ | Hiếm dùng; **không** luôn thoả Mercer |

### $\gamma$ của RBF — hiểu đúng

$\gamma$ điều khiển "bán kính ảnh hưởng" của mỗi support vector:

| | $\gamma$ nhỏ | $\gamma$ lớn |
|---|---|---|
| Ảnh hưởng mỗi điểm | Rộng | Rất hẹp |
| Ranh giới | Mượt, gần tuyến tính | Rất gấp khúc, bao quanh từng điểm |
| Rủi ro | Underfit | **Overfit nặng** |

> [!warning] $\gamma$ quá lớn = học thuộc, và nó trông giống một mô hình hoàn hảo
> Với $\gamma$ rất lớn, mỗi support vector chỉ ảnh hưởng vùng nhỏ xíu quanh nó. Mô hình đạt **100% train accuracy** và hiệu năng test bằng đoán ngẫu nhiên. Đây là dạng [[Overfitting]] rõ ràng nhất, dễ tái tạo nhất — và cũng dễ bỏ sót nhất nếu chỉ nhìn train accuracy.

$C$ và $\gamma$ **tương tác mạnh**: $\gamma$ lớn có thể bù bằng $C$ nhỏ và ngược lại. Bắt buộc dò lưới 2D.

## 2. Nguyên tắc / Best practices

1. **Luôn thử kernel tuyến tính trước.** Với $d$ lớn (text, TF-IDF), tuyến tính thường đủ và nhanh hơn hàng trăm lần. Chỉ chuyển sang RBF khi tuyến tính rõ ràng không đủ.
2. **Chuẩn hoá, bắt buộc.** RBF dựa trực tiếp trên $\lVert\mathbf{x}-\mathbf{z}\rVert^2$ — một đặc trưng thang lớn sẽ chi phối toàn bộ kernel.
3. **Dò $(C,\gamma)$ trên lưới log 2D.** Ví dụ $C\in\{10^{-2}..10^{3}\}$, $\gamma\in\{10^{-4}..10^{1}\}$.
4. **Bắt đầu từ `gamma='scale'`.** Mặc định của sklearn, $\gamma = 1/(d\cdot\text{Var}(X))$ — một điểm khởi đầu hợp lý.
5. **Với $N > 10^4$, cân nhắc xấp xỉ kernel.** `Nystroem` hoặc `RBFSampler` biến kernel thành đặc trưng tường minh, rồi dùng `LinearSVC`. Nhanh hơn nhiều với chút mất mát chính xác.
6. **Tránh polynomial bậc cao.** $D > 3$ gây bất ổn số học (giá trị nổ hoặc tràn) và hiếm khi thắng RBF.

## 3. Cạm bẫy / Sai lầm hay gặp

- **$\gamma$ quá lớn → train accuracy 100%, test thảm hoạ.** Xem callout trên. Luôn kiểm tra khoảng cách train–test.
- **Dò $C$ và $\gamma$ tuần tự thay vì đồng thời.** Vì chúng tương tác, tối ưu từng cái riêng cho ra kết quả kém hơn đáng kể.
- **Ma trận kernel $N\times N$ không vừa RAM.** $N=50.000$ với `float64` → 20 GB. Đây là giới hạn cứng, không phải vấn đề tối ưu hoá.
- **Dùng kernel sigmoid mà không kiểm tra.** Nó không thoả điều kiện Mercer với mọi $(\gamma, r)$; solver có thể không hội tụ hoặc cho nghiệm vô nghĩa.
- **Quên rằng kernel không thoát khỏi lời nguyền số chiều.** Với $d$ rất lớn và $N$ nhỏ, RBF thường overfit — và kernel tuyến tính lại tốt hơn.
- **Kernel tự viết không đối xứng.** $k(\mathbf{x},\mathbf{z}) \ne k(\mathbf{z},\mathbf{x})$ phá vỡ mọi thứ. Kiểm tra bằng `np.allclose(K, K.T)`.
- **Cho rằng kernel SVM luôn mạnh hơn mô hình tuyến tính.** Trên dữ liệu bảng vừa phải, [[Gradient Boosting and Tree Ensembles]] thường thắng cả hai — và chạy nhanh hơn nhiều.

## 4. Checklist áp dụng

- [ ] Tôi đã thử kernel tuyến tính trước chưa? Nó kém hơn bao nhiêu?
- [ ] Đặc trưng đã chuẩn hoá chưa?
- [ ] Tôi dò $(C, \gamma)$ trên lưới 2D chứ không tuần tự?
- [ ] Train accuracy và test accuracy chênh nhau bao nhiêu? (> 15% = $\gamma$ quá lớn)
- [ ] Ma trận kernel $N \times N$ có vừa bộ nhớ không?
- [ ] Nếu tự viết kernel: nó có đối xứng và PSD không?
- [ ] Với $N$ lớn: tôi đã cân nhắc `Nystroem` + `LinearSVC` chưa?
- [ ] Tôi đã so với gradient boosting chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.svm.SVC(kernel='rbf')` | Kernel SVM đầy đủ; nhận cả kernel tự viết qua `kernel=callable` | [scikit-learn.org](https://scikit-learn.org/stable/modules/svm.html#kernel-functions) |
| `sklearn.kernel_approximation.Nystroem` | Xấp xỉ kernel thành đặc trưng tường minh cho $N$ lớn | [scikit-learn.org](https://scikit-learn.org/stable/modules/kernel_approximation.html) |
| `RBFSampler` | Random Fourier features cho kernel RBF | [scikit-learn.org](https://scikit-learn.org/stable/modules/kernel_approximation.html#radial-basis-function-kernel) |
| `sklearn.metrics.pairwise` | Tính ma trận kernel trực tiếp để kiểm tra | [scikit-learn.org](https://scikit-learn.org/stable/modules/metrics.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 28 "Máy vector hỗ trợ hạt nhân" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Schölkopf & Smola, *Learning with Kernels*, MIT Press 2002 — sách chuẩn về kernel method
- Rahimi & Recht, "Random Features for Large-Scale Kernel Machines", NeurIPS 2007 — nền của `RBFSampler`
- scikit-learn, *RBF SVM parameters* — trực quan hoá tác động của $C$ và $\gamma$ — [scikit-learn.org](https://scikit-learn.org/stable/auto_examples/svm/plot_rbf_parameters.html)

## Liên kết

[[Support Vector Machine]] · [[Soft Margin SVM]] · [[Lagrange Duality]] · [[Overfitting]] · [[ML]]
