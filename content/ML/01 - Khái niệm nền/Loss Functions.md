---
tags: [ml, khái-niệm-nền, loss, optimization]
status: evergreen
---
# Loss Functions

> Hàm mất mát là chỗ bạn **nói cho máy biết thế nào là sai**. Mọi thứ khác — thuật toán tối ưu, kiến trúc, siêu tham số — chỉ là cách đi tới đích. Chọn sai hàm mất mát thì tối ưu càng giỏi càng đi xa mục tiêu thật.

## 1. Khái niệm cốt lõi

Ba tầng khái niệm hay bị gộp lẫn:

| Tầng | Định nghĩa | Ví dụ |
|---|---|---|
| **Loss** | Sai số trên **một** mẫu | $(y_i - \hat{y}_i)^2$ |
| **Cost / Objective** | Trung bình loss trên toàn bộ dữ liệu, cộng regularizer | $\frac{1}{N}\sum_i \ell_i + \lambda\lVert\mathbf{w}\rVert^2$ |
| **Metric** | Cái ta thật sự quan tâm, thường không khả vi | F1, AUC — xem [[Evaluation Metrics]] |

> [!warning] Loss ≠ Metric
> Ta tối ưu loss vì nó khả vi; ta được đánh giá bằng metric. Cross-entropy giảm không đảm bảo F1 tăng. Luôn theo dõi **cả hai** trên tập validation.

### Bảng tra: bài toán → hàm mất mát

| Bài toán | Hàm mất mát | Công thức | Giả định nhiễu tương ứng |
|---|---|---|---|
| Hồi quy | **MSE** | $\frac{1}{N}\sum(y_i-\hat{y}_i)^2$ | Gaussian |
| Hồi quy, có outlier | **MAE** | $\frac{1}{N}\sum\lvert y_i-\hat{y}_i\rvert$ | Laplace |
| Hồi quy, cân bằng | **Huber** | Bậc 2 gần 0, tuyến tính ở xa | Gaussian có đuôi dày |
| Hồi quy, sai số tương đối | **MSLE** | MSE trên $\log(1+y)$ | Nhân tính, không cộng tính |
| Phân loại nhị phân | **Binary cross-entropy** | $-[y\log p + (1-y)\log(1-p)]$ | Bernoulli |
| Phân loại đa lớp | **Cross-entropy** | $-\sum_k y_k \log p_k$ | Categorical |
| Phân loại có margin | **Hinge** | $\max(0, 1-y\cdot z)$ | — (không xác suất) |
| Mất cân bằng nặng | **Focal loss** | CE nhân $(1-p)^\gamma$ | Hạ trọng số mẫu dễ |
| Xếp hạng | **Pairwise / BPR** | So sánh cặp | — |

Cột cuối là cây cầu về [[Maximum Likelihood and MAP]]: **chọn hàm mất mát chính là chọn giả định về nhiễu**, dù bạn có ý thức về điều đó hay không.

### MSE vs MAE — khác biệt thực tế

| | MSE | MAE |
|---|---|---|
| Phạt outlier | Bậc 2 → rất nặng | Tuyến tính → nhẹ |
| Nghiệm tối ưu hằng số | **Trung bình** | **Trung vị** |
| Khả vi tại 0 | Có | Không |
| Dùng khi | Nhiễu đối xứng, ít outlier | Có outlier, quan tâm "trường hợp điển hình" |

Đây không phải chi tiết học thuật. Với giá bất động sản — phân phối lệch phải, vài căn siêu đắt — MSE sẽ kéo mô hình về phía các căn đắt nhất. Đó là lý do [[Hedonic Pricing and GIS]] hồi quy trên $\log(\text{giá})$ chứ không trên giá.

### Cross-entropy vs Hinge

| | Cross-entropy | Hinge |
|---|---|---|
| Đầu ra | Xác suất có ý nghĩa | Chỉ có dấu và độ lớn margin |
| Mẫu đã phân loại đúng, xa biên | Vẫn đóng góp loss nhỏ | Đóng góp **đúng 0** |
| Hệ quả | Tiếp tục đẩy biên | Chỉ quan tâm support vector |
| Note | [[Logistic Regression]], [[Softmax Regression]] | [[Soft Margin SVM]] |

## 2. Nguyên tắc / Best practices

1. **Chọn hàm mất mát từ chi phí kinh doanh, không từ thói quen.** Nếu bỏ lọt một tin giả tốn gấp 5 lần chặn nhầm một tin thật, hãy đưa tỉ lệ 5:1 vào trọng số lớp, đừng để mặc định 1:1.
2. **Dùng phiên bản `with_logits` của thư viện.** `BCEWithLogitsLoss` gộp sigmoid và cross-entropy để ổn định số học. Tự viết `log(sigmoid(x))` sẽ ra `-inf`.
3. **Trung bình theo batch, không lấy tổng.** Nếu lấy tổng, learning rate hiệu dụng thay đổi theo batch size — và bạn sẽ tưởng batch size lớn "làm mô hình tệ đi".
4. **Theo dõi loss trên cả train và validation cùng lúc.** Train giảm + validation tăng = [[Overfitting]]. Chỉ nhìn train loss thì không thấy gì.
5. **Loss không giảm ở epoch đầu = bug, không phải cần thêm epoch.** Kiểm tra bằng cách cho mô hình overfit **cố ý** trên 10 mẫu. Nếu không đạt loss ≈ 0, code sai chứ không phải dữ liệu khó.
6. **Kiểm tra giá trị loss ban đầu.** Với $K$ lớp cân bằng, cross-entropy khởi đầu phải xấp xỉ $\log K$ (2 lớp → 0.693). Lệch nhiều = khởi tạo hoặc nhãn sai.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Dùng accuracy làm hàm mất mát.** Không khả vi, gradient bằng 0 gần như mọi nơi. Đây là lý do tồn tại của các surrogate loss như cross-entropy và hinge.
- **Cross-entropy với xác suất bằng 0.** $\log 0 = -\infty$. Luôn clip vào $[\varepsilon, 1-\varepsilon]$ hoặc dùng phiên bản logits.
- **Quên trọng số lớp khi dữ liệu mất cân bằng.** Với 99% lớp âm, cực tiểu hoá cross-entropy thuần cho ra mô hình dự đoán "âm" mọi lúc. Chính xác điều này xảy ra với baseline FastText+CNN trong [[FADAML Case Study]]: FPR 100%, FNR 0% — mô hình gán mọi thứ vào một lớp và accuracy vẫn 57.9%.
- **So sánh giá trị loss giữa hai bài toán khác nhau.** Loss 0.3 không "tốt hơn" loss 2.1 nếu chúng đến từ hai hàm khác nhau hoặc hai thang dữ liệu khác nhau.
- **Regularizer nằm ngoài loss khi báo cáo.** Báo cáo loss **có** regularizer trong khi so sánh mô hình có $\lambda$ khác nhau là so sánh táo với cam. Tách riêng hai thành phần khi log.
- **Tối ưu MSE trên $\log(y)$ rồi báo cáo RMSE như thể đó là VND.** Phải mũ hoá ngược trước khi báo cáo — và nhớ rằng $\exp(\text{mean of logs})$ là trung bình nhân, không phải trung bình cộng.

## 4. Checklist áp dụng

- [ ] Hàm mất mát tôi chọn tương ứng với giả định nhiễu nào? Giả định đó đúng với dữ liệu này chứ?
- [ ] Loss của tôi có khớp với metric tôi bị đánh giá không? Nếu không, tôi có theo dõi cả hai không?
- [ ] Chi phí của false positive và false negative có được phản ánh trong loss không?
- [ ] Loss có được trung bình theo batch không?
- [ ] Giá trị loss ở bước 0 có bằng con số lý thuyết mong đợi ($\log K$) không?
- [ ] Tôi đã thử cho mô hình overfit 10 mẫu để kiểm tra code chưa?
- [ ] Tôi đang dùng phiên bản `with_logits` chứ không tự ghép sigmoid + log?
- [ ] Nếu biến mục tiêu đã biến đổi ($\log$), tôi có biến đổi ngược khi báo cáo không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `torch.nn` losses | `CrossEntropyLoss` (đã gồm softmax), `BCEWithLogitsLoss`, `HuberLoss` | [pytorch.org](https://pytorch.org/docs/stable/nn.html#loss-functions) |
| `sklearn.metrics` | `log_loss`, `hinge_loss`, `mean_absolute_error` để đối chiếu | [scikit-learn.org](https://scikit-learn.org/stable/modules/model_evaluation.html) |
| `class_weight='balanced'` | Tự động cân trọng số lớp trong hầu hết estimator của sklearn | [scikit-learn.org](https://scikit-learn.org/stable/modules/svm.html#unbalanced-problems) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, §5.5 "Hàm mất mát và tham số mô hình" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Goodfellow et al., *Deep Learning*, Ch. 6.2 "Gradient-Based Learning" — [deeplearningbook.org](https://www.deeplearningbook.org/contents/mlp.html)
- Lin et al., "Focal Loss for Dense Object Detection", ICCV 2017 — [arXiv:1708.02002](https://arxiv.org/abs/1708.02002)
- Bishop, *Pattern Recognition and Machine Learning*, §4.3 & §7.1, Springer 2006

## Liên kết

[[Maximum Likelihood and MAP]] · [[Evaluation Metrics]] · [[Regularization]] · [[Gradient Descent]] · [[ML]]
