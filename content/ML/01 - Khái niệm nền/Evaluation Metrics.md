---
tags: [ml, khái-niệm-nền, metrics, evaluation]
status: evergreen
---
# Evaluation Metrics

> Metric là chỗ bạn **định nghĩa thế nào là thành công**. Chọn sai metric thì mô hình sẽ tối ưu đúng thứ bạn đo — và bạn sẽ có một hệ thống hoàn hảo theo con số, vô dụng trong thực tế.

## 1. Khái niệm cốt lõi

### Ma trận nhầm lẫn — gốc của mọi metric phân loại

| | Dự đoán Dương | Dự đoán Âm |
|---|---|---|
| **Thực Dương** | $T_p$ | $F_n$ (bỏ lọt) |
| **Thực Âm** | $F_p$ (báo động giả) | $T_n$ |

| Metric | Công thức | Trả lời câu hỏi |
|---|---|---|
| **Precision** | $T_p/(T_p+F_p)$ | Trong những cái tôi báo là dương, bao nhiêu đúng? |
| **Recall** (TPR, sensitivity) | $T_p/(T_p+F_n)$ | Trong tất cả cái dương thật, tôi bắt được bao nhiêu? |
| **F1** | $2PR/(P+R)$ | Trung bình điều hoà — khi P và R quan trọng ngang nhau |
| **Accuracy** | $(T_p+T_n)/\text{tổng}$ | Tỉ lệ đúng chung — **chỉ có nghĩa khi dữ liệu cân bằng** |
| **FPR** | $F_p/(F_p+T_n)$ | Tỉ lệ báo động giả |
| **FNR** | $F_n/(F_n+T_p)$ | Tỉ lệ bỏ lọt = $1-$ recall |
| **Specificity** (TNR) | $T_n/(T_n+F_p)$ | $1-$ FPR |

### Bảng cụ thể: FADAML vs baseline

Đây là ví dụ mẫu mực về vì sao phải nhìn nhiều metric cùng lúc:

| Mô hình | Precision | Recall | F1 | Accuracy | FPR ↓ | FNR ↓ |
|---|---|---|---|---|---|---|
| FNDNet | 0.726 | 0.722 | 0.724 | 0.733 | 0.340 | 0.213 |
| Bi-LSTM + Attention | 0.631 | 0.619 | 0.620 | 0.643 | 0.529 | 0.231 |
| **FastText + CNN** | 0.289 | 0.500 | 0.366 | **0.579** | **1.00** | **0.00** |
| **FADAML** | **0.913** | **0.913** | **0.913** | **0.915** | **0.098** | **0.074** |

Nhìn dòng FastText+CNN: **accuracy 57.9%, FNR 0%** — nghe như một bộ phát hiện tuyệt vời. Thực tế: FPR = 100% nghĩa là nó gán **mọi thứ** vào lớp "giả". Nó không bỏ lọt cái nào vì nó không loại cái nào. Accuracy 57.9% chỉ phản ánh tỉ lệ lớp giả trong tập (16.850/29.085 = 57.9%).

> [!warning] Đây là lý do accuracy một mình là metric nguy hiểm nhất
> Với dữ liệu lệch 99/1, dự đoán lớp đa số mọi lúc cho accuracy 99%. Luôn báo cáo accuracy **kèm** precision, recall, và FPR/FNR. Và luôn so với baseline `DummyClassifier`.

### Đánh đổi precision–recall

Chúng đối nghịch: hạ ngưỡng → recall tăng, precision giảm. Chọn điểm nào phụ thuộc **chi phí**:

| Tình huống | Ưu tiên | Vì sao |
|---|---|---|
| Lọc spam vào thư mục rác | **Precision** | Mất một email quan trọng tệ hơn thấy một spam |
| Sàng lọc ung thư | **Recall** | Bỏ lọt bệnh nhân tệ hơn nhiều so với xét nghiệm thêm |
| Chặn tin rao giả tự động | **Precision** | Chặn nhầm người bán thật làm mất khách của nền tảng |
| Đánh dấu tin rao để người kiểm duyệt xem | **Recall** | Người kiểm duyệt sẽ lọc tiếp; bỏ lọt mới đắt |

Hai dòng cuối là **cùng một mô hình, hai cách triển khai** — và chúng cần hai ngưỡng khác nhau. Metric phụ thuộc cách dùng, không chỉ phụ thuộc bài toán.

### Metric theo ngưỡng vs metric toàn cục

| | Phụ thuộc ngưỡng | Không phụ thuộc ngưỡng |
|---|---|---|
| Phân loại | Precision, Recall, F1, Accuracy | **ROC-AUC**, **PR-AUC** |
| Khi nào dùng | Đã chốt ngưỡng triển khai | So sánh mô hình trước khi chọn ngưỡng |

**ROC-AUC vs PR-AUC:** với dữ liệu lệch nặng, ROC-AUC lạc quan hoá vì $T_n$ khổng lồ làm FPR luôn nhỏ. **PR-AUC là lựa chọn đúng khi lớp dương hiếm.**

### Metric hồi quy

| Metric | Công thức | Đặc điểm |
|---|---|---|
| **RMSE** | $\sqrt{\frac{1}{N}\sum(y-\hat{y})^2}$ | Cùng đơn vị với $y$; phạt nặng outlier |
| **MAE** | $\frac{1}{N}\sum\lvert y-\hat{y}\rvert$ | Bền với outlier; dễ giải thích |
| **MAPE** | $\frac{1}{N}\sum\lvert(y-\hat y)/y\rvert$ | Sai số tương đối; **vỡ khi $y$ gần 0** |
| **$R^2$** | $1 - SS_{res}/SS_{tot}$ | Tỉ lệ phương sai giải thích được; so với baseline "đoán trung bình" |

$R^2$ là metric chính của [[Hedonic Pricing and GIS]] — mô hình GWR cho Hà Nội giải thích ~62% biến thiên giá. Trong ML dự báo, con số đó là kém; trong kinh tế lượng đô thị, nó là bình thường và có ý nghĩa. **Ngưỡng "tốt" phụ thuộc lĩnh vực.**

## 2. Nguyên tắc / Best practices

1. **Chọn một metric chính trước khi train.** Có thể theo dõi nhiều, nhưng phải có đúng một cái để quyết định. Nếu không, bạn sẽ chọn metric nào làm mô hình của mình trông đẹp nhất.
2. **Luôn báo cáo kèm baseline.** "F1 = 0.72" vô nghĩa; "F1 = 0.72 so với baseline lớp đa số 0.37" mới có nghĩa.
3. **Với dữ liệu lệch, dùng PR-AUC và F1 macro, không dùng accuracy và ROC-AUC.**
4. **Chọn ngưỡng trên validation, không phải test.** Ngưỡng là một siêu tham số.
5. **Báo cáo ma trận nhầm lẫn đầy đủ, không chỉ số tổng hợp.** Bốn ô nói lên nhiều hơn bất kỳ con số đơn nào — bảng FADAML ở trên là bằng chứng.
6. **Kiểm tra calibration nếu bạn dùng xác suất để ra quyết định.** Mô hình có thể xếp hạng tốt (AUC cao) mà xác suất hoàn toàn sai lệch. Dùng reliability diagram và `CalibratedClassifierCV`.
7. **Đổi metric sang tiền hoặc thời gian khi trình bày.** "FPR 9.8% nghĩa là 570 tin thật bị chặn nhầm mỗi 5.817 tin" cụ thể hơn nhiều so với "9.8%".

## 3. Cạm bẫy / Sai lầm hay gặp

- **Chỉ báo cáo accuracy trên dữ liệu lệch.** Xem lại bảng FastText+CNN ở trên.
- **F1 mà không nói rõ `macro` / `micro` / `weighted`.** Với đa lớp, ba con số này có thể chênh nhau rất xa. `micro` = accuracy trong bài toán đơn nhãn.
- **Dùng ROC-AUC cho bài toán lớp dương chiếm 0.1%.** AUC 0.95 nghe tuyệt vời và có thể tương ứng với precision 5%.
- **Tối ưu ngưỡng trên test set.** Xem [[Model Validation]].
- **Nhầm recall với precision khi diễn giải cho người khác.** Viết ra đầy đủ mẫu số mỗi lần: "trong 3.370 tin giả, mô hình bắt được 3.076".
- **So sánh MAPE giữa các tập có phân phối $y$ khác nhau.** MAPE nổ khi $y$ nhỏ — với bất động sản giá rẻ, sai 100 triệu là 20%; với căn 55 tỉ, sai 100 triệu là 0.2%.
- **Báo cáo $R^2$ trên tập train.** $R^2$ trên train luôn tăng khi thêm biến. Dùng $R^2$ điều chỉnh, hoặc tốt hơn: $R^2$ trên tập test.
- **Bỏ qua độ lệch chuẩn qua các fold.** Chênh 0.3% giữa hai mô hình với std 1.5% là nhiễu.

## 4. Checklist áp dụng

- [ ] Metric chính của tôi là gì, và tôi chọn nó **trước** hay **sau** khi thấy kết quả?
- [ ] Tỉ lệ lớp trong dữ liệu là bao nhiêu? Accuracy của baseline lớp đa số là bao nhiêu?
- [ ] Tôi đã in ma trận nhầm lẫn đầy đủ chưa?
- [ ] Chi phí của false positive so với false negative là bao nhiêu lần?
- [ ] Nếu lớp dương hiếm: tôi dùng PR-AUC thay ROC-AUC chưa?
- [ ] Ngưỡng quyết định được chọn trên validation chứ không phải test?
- [ ] Với đa lớp: tôi đã nói rõ `macro` hay `weighted` chưa?
- [ ] Tôi có báo cáo độ lệch chuẩn qua các fold không?
- [ ] Nếu dùng xác suất để ra quyết định: mô hình đã được calibrate chưa?
- [ ] Tôi đã diễn giải metric thành số lượng thực tế (bao nhiêu ca/tháng) chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.metrics.classification_report` | Precision/recall/F1 cho từng lớp trong một lời gọi | [scikit-learn.org](https://scikit-learn.org/stable/modules/model_evaluation.html) |
| `ConfusionMatrixDisplay` | Vẽ ma trận nhầm lẫn, có chuẩn hoá theo hàng | [scikit-learn.org](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ConfusionMatrixDisplay.html) |
| `PrecisionRecallDisplay` / `RocCurveDisplay` | Đường cong PR và ROC | [scikit-learn.org](https://scikit-learn.org/stable/modules/model_evaluation.html) |
| `CalibratedClassifierCV` | Hiệu chỉnh xác suất (Platt scaling, isotonic) | [scikit-learn.org](https://scikit-learn.org/stable/modules/calibration.html) |
| `DummyClassifier` | Baseline tầm thường bắt buộc phải có | [scikit-learn.org](https://scikit-learn.org/stable/modules/model_evaluation.html#dummy-estimators) |

## Tham khảo

- Nguyen, Nguyen & Nguyen, "Fake Advertisements Detection Using Automated Multimodal Learning", §5.1.3 & Table 9 — [arXiv:2501.10848](https://arxiv.org/abs/2501.10848)
- scikit-learn, *Metrics and scoring* — [scikit-learn.org](https://scikit-learn.org/stable/modules/model_evaluation.html)
- Saito & Rehmsmeier, "The Precision-Recall Plot Is More Informative than the ROC Plot on Imbalanced Datasets", *PLoS ONE* 10(3), 2015 — [doi:10.1371/journal.pone.0118432](https://doi.org/10.1371/journal.pone.0118432)
- Google ML Crash Course, *Classification: Accuracy, Precision, Recall* — [developers.google.com](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall)

## Liên kết

[[Model Validation]] · [[Loss Functions]] · [[ML Problem Framing]] · [[FADAML Case Study]] · [[ML]]
