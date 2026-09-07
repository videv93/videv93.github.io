---
tags: [ml, thuật-toán, regression, supervised]
status: evergreen
---
# Linear Regression

> Mô hình đơn giản nhất có nghiệm đóng, và cũng là mô hình được dùng nhiều nhất ngoài đời — không phải vì nó mạnh, mà vì **hệ số của nó đọc được**. Xem [[Prediction vs Inference]] để hiểu vì sao điều đó lại quan trọng hơn accuracy trong nhiều lĩnh vực.

## 1. Khái niệm cốt lõi

Mô hình: $\hat{y} = \mathbf{w}^T\bar{\mathbf{x}}$, với $\bar{\mathbf{x}} = [1, x_1, \ldots, x_d]^T$ (thêm 1 để gộp hệ số tự do vào $\mathbf{w}$).

Hàm mất mát (MSE):
$$\mathcal{L}(\mathbf{w}) = \frac{1}{2}\lVert \bar{\mathbf{X}}^T\mathbf{w} - \mathbf{y}\rVert_2^2$$

Lấy gradient (dòng thứ tư của bảng ở [[Matrix Calculus]]) và cho bằng 0:
$$\bar{\mathbf{X}}\bar{\mathbf{X}}^T\mathbf{w} = \bar{\mathbf{X}}\mathbf{y} \quad\Longrightarrow\quad \mathbf{w} = (\bar{\mathbf{X}}\bar{\mathbf{X}}^T)^{\dagger}\bar{\mathbf{X}}\mathbf{y}$$

$\dagger$ là **giả nghịch đảo Moore–Penrose** — dùng nó thay nghịch đảo vì $\bar{\mathbf{X}}\bar{\mathbf{X}}^T$ có thể suy biến.

> [!note] "Tuyến tính" nghĩa là tuyến tính **theo tham số**, không phải theo dữ liệu
> $y = w_0 + w_1 x + w_2 x^2 + w_3\log x$ vẫn là hồi quy tuyến tính. Bạn được phép biến đổi $\mathbf{x}$ tuỳ ý — miễn là $\mathbf{w}$ xuất hiện tuyến tính. Đây là lý do hồi quy tuyến tính linh hoạt hơn nhiều so với cái tên gợi ý, và là nền của mô hình hedonic trong [[Hedonic Pricing and GIS]].

### Hai cách giải

| | Nghiệm đóng (normal equation) | [[Gradient Descent]] |
|---|---|---|
| Độ phức tạp | $O(d^3 + Nd^2)$ | $O(Nd)$ mỗi bước |
| Khi nào tốt hơn | $d$ nhỏ (< vài nghìn) | $d$ lớn, hoặc $N$ quá lớn để vừa RAM |
| Siêu tham số | Không có | Learning rate, số bước |
| Chính xác | Nghiệm chính xác | Xấp xỉ |

### Các biến thể

| Tên | Hàm mục tiêu | Giải quyết |
|---|---|---|
| OLS | MSE | Cơ bản |
| **Ridge** | MSE $+\lambda\lVert\mathbf{w}\rVert_2^2$ | $\bar{\mathbf{X}}\bar{\mathbf{X}}^T$ suy biến, đa cộng tuyến |
| **LASSO** | MSE $+\lambda\lVert\mathbf{w}\rVert_1$ | Chọn đặc trưng tự động |
| Huber regression | Huber loss | Outlier |
| **Semi-log** | MSE trên $\log y$ | $y$ lệch phải; hệ số đọc thành **% thay đổi** |

Dòng cuối là dạng được dùng trong nghiên cứu bất động sản Việt Nam: hồi quy $\log(\text{giá})$ theo các đặc điểm, để hệ số đọc trực tiếp thành "mỗi mét chiều rộng đường làm giá tăng x%".

## 2. Nguyên tắc / Best practices

1. **Luôn dùng hồi quy tuyến tính làm baseline.** Nó chạy trong vài giây và cho bạn biết bài toán khó tới đâu. Nếu một mô hình phức tạp không vượt nó đáng kể, hãy chọn cái đơn giản.
2. **Dùng `np.linalg.lstsq` hoặc `pinv`, không dùng `inv`.** Ổn định số hơn nhiều, và không sập khi ma trận suy biến.
3. **Chuẩn hoá đặc trưng nếu định regularize.** Xem [[Regularization]].
4. **Kiểm tra phân phối phần dư (residual).** Vẽ residual theo giá trị dự đoán: nếu có hình phễu (heteroskedasticity) hoặc hình cong, giả định tuyến tính bị vi phạm.
5. **Lấy $\log$ biến mục tiêu khi nó lệch phải.** Giá nhà, thu nhập, dân số — gần như luôn cần.
6. **Kiểm tra đa cộng tuyến bằng VIF.** VIF > 10 nghĩa là hệ số của biến đó không đáng tin để diễn giải (dù dự đoán vẫn ổn) — đây là ranh giới [[Prediction vs Inference]].

## 3. Cạm bẫy / Sai lầm hay gặp

- **Nhạy cực kỳ với outlier.** MSE phạt bậc hai, nên một điểm nhiễu có thể kéo lệch cả đường hồi quy. Trên dữ liệu bất động sản thật, các tin rao nhập sai giá (nhầm đơn vị triệu/tỉ) hoặc tin cho thuê lẫn vào mục bán là nguồn outlier chính. [[FADAML Case Study]] xử lý bằng cách đặt khoảng giá trị hợp lệ **do chuyên gia định** cho từng đặc trưng.
- **$d > N$ ⟹ nghiệm không duy nhất.** Toán học đảm bảo có vô số $\mathbf{w}$ khớp hoàn hảo. Bắt buộc phải regularize.
- **Đa cộng tuyến làm hệ số vô nghĩa.** Diện tích và số phòng tương quan 0.9 → hệ số của chúng có thể ra dấu ngược nhau với độ lớn khổng lồ, triệt tiêu nhau. Dự đoán vẫn tốt; diễn giải thì hoàn toàn sai.
- **Ngoại suy ra ngoài miền dữ liệu huấn luyện.** Mô hình học trên nhà 30–200 m² sẽ cho dự đoán vô nghĩa với nhà 2.000 m². Nó không biết mình đang ngoại suy và không báo cho bạn.
- **Đọc hệ số như quan hệ nhân quả.** "Thêm một phòng ngủ làm giá tăng 300 triệu" là kết luận sai từ dữ liệu quan sát. Hệ số là quan hệ tương quan **có điều kiện trên các biến khác trong mô hình** — thay đổi tập biến thì hệ số đổi theo.
- **Quên rằng $R^2$ luôn tăng khi thêm biến.** Dùng $R^2$ điều chỉnh, hoặc đánh giá trên tập test.

## 4. Checklist áp dụng

- [ ] Tôi đã chạy hồi quy tuyến tính làm baseline chưa?
- [ ] $N$ có lớn hơn $d$ đáng kể không? Nếu không, tôi đã regularize chưa?
- [ ] Biến mục tiêu có lệch phải không? Tôi đã thử $\log$ chưa?
- [ ] Tôi đã vẽ đồ thị phần dư chưa? Nó có cấu trúc gì không?
- [ ] Tôi đã kiểm tra và xử lý outlier chưa? Ngưỡng do đâu mà có?
- [ ] VIF của các biến là bao nhiêu? Có biến nào > 10 không?
- [ ] Dữ liệu dự đoán mới có nằm trong miền dữ liệu huấn luyện không?
- [ ] Nếu tôi định diễn giải hệ số: tôi đã đọc [[Prediction vs Inference]] chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.linear_model.LinearRegression` | Nhanh, API nhất quán, **không** có p-value | [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html) |
| `statsmodels.OLS` | Trả bảng đầy đủ: hệ số, chuẩn sai, p-value, $R^2$ điều chỉnh | [statsmodels.org](https://www.statsmodels.org/stable/regression.html) |
| `np.linalg.lstsq` | Giải trực tiếp, ổn định số | [numpy.org](https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html) |
| `statsmodels.stats.outliers_influence.variance_inflation_factor` | Tính VIF để phát hiện đa cộng tuyến | [statsmodels.org](https://www.statsmodels.org/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 7 "Hồi quy tuyến tính" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Hastie et al., *The Elements of Statistical Learning*, Ch. 3 "Linear Methods for Regression" — [PDF miễn phí](https://hastie.su.domains/ElemStatLearn/)
- scikit-learn, *Ordinary Least Squares* & *Ridge regression* — [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html)
- Bishop, *Pattern Recognition and Machine Learning*, Ch. 3 "Linear Models for Regression", Springer 2006

## Liên kết

[[Matrix Calculus]] · [[Regularization]] · [[Gradient Descent]] · [[Hedonic Pricing and GIS]] · [[Prediction vs Inference]] · [[ML]]
