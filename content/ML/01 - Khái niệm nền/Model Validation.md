---
tags: [ml, khái-niệm-nền, validation, evaluation]
status: evergreen
---
# Model Validation

> Validation là **quy trình duy nhất** cho bạn một ước lượng trung thực về việc mô hình sẽ hoạt động ra sao trên dữ liệu chưa từng thấy. Làm sai bước này thì mọi con số trong báo cáo đều là hư cấu, kể cả khi code hoàn toàn đúng.

## 1. Khái niệm cốt lõi

### Ba tập, ba vai trò khác nhau

| Tập | Dùng để | Được nhìn bao nhiêu lần |
|---|---|---|
| **Train** | Học tham số $\mathbf{w}$ | Vô số |
| **Validation** | Chọn siêu tham số, chọn mô hình, early stopping | Nhiều lần |
| **Test** | Ước lượng hiệu năng cuối cùng | **Đúng một lần** |

FADAML chia 29.085 mẫu thành 23.268 train / 5.817 test (80/20), rồi lấy thêm **10% của train** làm validation bằng **stratified sampling** — giữ nguyên tỉ lệ lớp trong mỗi tập. Đây là cấu hình mặc định hợp lý.

### Các chiến lược validation

| Chiến lược | Cách làm | Dùng khi |
|---|---|---|
| Hold-out | Chia một lần 70/15/15 | Dữ liệu lớn (> 50k mẫu) |
| **k-fold CV** | Chia $k$ phần, huấn luyện $k$ lần | Mặc định; $k=5$ hoặc $10$ |
| **Stratified k-fold** | k-fold giữ tỉ lệ lớp mỗi fold | **Luôn dùng cho phân loại** |
| Leave-one-out | $k=N$ | Dữ liệu rất nhỏ; đắt và variance cao |
| **Group k-fold** | Không tách cùng một nhóm qua hai fold | Có nhiều mẫu cùng một thực thể |
| **Time-series split** | Train quá khứ → test tương lai | **Bắt buộc** khi có yếu tố thời gian |
| Nested CV | CV bên trong chọn siêu tham số, CV bên ngoài đánh giá | Khi cần ước lượng không thiên lệch nghiêm ngặt |

### Rò rỉ dữ liệu (data leakage) — bảng nhận diện

| Dạng rò rỉ | Biểu hiện | Cách chặn |
|---|---|---|
| **Tiền xử lý trước khi chia** | Fit scaler/PCA/vectorizer trên toàn bộ dữ liệu | Bọc trong `Pipeline`, fit trong từng fold |
| **Đặc trưng từ tương lai** | Dùng biến chỉ tồn tại sau khi kết quả xảy ra | Rà từng cột: "có ở thời điểm dự đoán không?" |
| **Trùng lặp giữa train và test** | Cùng một mẫu ở cả hai tập | Khử trùng lặp **trước** khi chia |
| **Nhóm bị tách** | Cùng bệnh nhân/người dùng ở cả hai bên | `GroupKFold` |
| **Rò rỉ thời gian** | Xáo trộn ngẫu nhiên dữ liệu chuỗi thời gian | `TimeSeriesSplit` |
| **Rò rỉ mục tiêu qua encoding** | Target encoding tính trên cả tập | Tính trong từng fold |

> [!warning] Khử trùng lặp phải làm trước khi chia — bài học từ FADAML
> Dữ liệu FADAML được thu thập từ **năm website** khác nhau, và các đại lý bất động sản đăng chéo cùng một tin lên nhiều nơi để tăng độ hiển thị. Nếu chia train/test trước khi khử trùng lặp, cùng một bất động sản sẽ nằm ở cả hai tập — điểm test sẽ cao giả tạo mà không ai phát hiện. Nhóm tác giả khử trùng lặp hai tầng: trước bằng độ giống nhau của text, sau bằng so sánh các đặc trưng quan trọng.

## 2. Nguyên tắc / Best practices

1. **Chia dữ liệu là việc đầu tiên, trước mọi thứ khác.** Trước EDA sâu, trước tiền xử lý, trước khi nhìn phân phối. Nhìn test set bằng mắt cũng là một dạng rò rỉ (qua bộ não bạn).
2. **Mọi bước biến đổi phải nằm trong `Pipeline`.** Đây không phải phong cách — đây là cách duy nhất `cross_val_score` cho ra con số đúng.
3. **Stratify cho phân loại, luôn luôn.** `train_test_split(..., stratify=y)`. Với lớp hiếm, không stratify có thể tạo fold không chứa lớp đó.
4. **Có thời gian trong dữ liệu ⟹ chia theo thời gian.** Không có ngoại lệ. Xáo trộn ngẫu nhiên dữ liệu chuỗi thời gian là cho mô hình nhìn tương lai.
5. **Ghi lại số lần bạn chạm vào validation set.** 200 lần thử thì kết quả tốt nhất đã bị lạc quan hoá đáng kể. Đây là "vấn đề so sánh bội" của ML.
6. **Báo cáo trung bình ± độ lệch chuẩn qua các fold.** Một con số đơn lẻ giấu mất variance — và variance chính là thứ bạn cần biết để tin vào kết quả.
7. **Test set động vào đúng một lần, ở cuối.** Nếu bạn đã nhìn nó và quay lại chỉnh mô hình, nó không còn là test set nữa. Hãy thành thật về điều này trong báo cáo.

## 3. Cạm bẫy / Sai lầm hay gặp

- **`fit_transform` trên toàn bộ `X` rồi mới `train_test_split`.** Lỗi phổ biến nhất trong toàn bộ ML, và nó **không báo lỗi gì cả** — chỉ cho bạn con số đẹp hơn sự thật.
- **Cross-validation với `SMOTE`/oversampling áp dụng trước.** Bản sao của một mẫu ở train và bản gốc ở validation → rò rỉ. Oversampling phải nằm **trong** pipeline của từng fold.
- **Chọn đặc trưng trên toàn bộ dữ liệu rồi mới CV.** Bước chọn đặc trưng đã nhìn thấy nhãn của validation. Nó phải nằm trong pipeline.
- **Dùng cùng một tập cho early stopping và báo cáo.** Early stopping đã tối ưu lên tập đó. Cần tập thứ ba.
- **Chia ngẫu nhiên dữ liệu có cấu trúc nhóm.** Ảnh của cùng một bệnh nhân, tin rao của cùng một môi giới, câu của cùng một tài liệu — đều cần `GroupKFold`.
- **Báo cáo kết quả tốt nhất trong nhiều lần chạy.** Đó là max, không phải kỳ vọng. Báo cáo trung bình.
- **Tin vào một mô hình vượt baseline 0.3%.** Nếu độ lệch chuẩn qua các fold là 1.5%, khác biệt đó là nhiễu.

## 4. Checklist áp dụng

- [ ] Tôi đã chia dữ liệu **trước** khi tiền xử lý chưa?
- [ ] Mọi bước biến đổi có nằm trong `Pipeline` không?
- [ ] Với bài toán phân loại: tôi đã `stratify` chưa?
- [ ] Dữ liệu có yếu tố thời gian không? Nếu có, tôi đã chia theo thời gian chưa?
- [ ] Có nhóm (người dùng, bệnh nhân, môi giới) bị tách qua hai tập không?
- [ ] Tôi đã khử trùng lặp **trước** khi chia chưa?
- [ ] Từng cột đặc trưng: giá trị này có tồn tại **tại thời điểm dự đoán** không?
- [ ] Tôi đã chạm vào validation set bao nhiêu lần? Con số đó có được ghi lại không?
- [ ] Test set của tôi có còn nguyên vẹn không?
- [ ] Tôi báo cáo trung bình ± độ lệch chuẩn hay chỉ một con số?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.model_selection` | `StratifiedKFold`, `GroupKFold`, `TimeSeriesSplit`, `cross_validate` | [scikit-learn.org](https://scikit-learn.org/stable/modules/cross_validation.html) |
| `sklearn.pipeline.Pipeline` | Chống rò rỉ tiền xử lý một cách có hệ thống | [scikit-learn.org](https://scikit-learn.org/stable/modules/compose.html) |
| `imbalanced-learn` `Pipeline` | Pipeline hỗ trợ resampling đúng cách trong CV | [imbalanced-learn.org](https://imbalanced-learn.org/) |
| MLflow / DVC | Ghi lại mọi lần chạy — biết mình đã thử bao nhiêu cấu hình | [mlflow.org](https://mlflow.org/) · [dvc.org](https://dvc.org/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, §8.2 "Xác thực" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- scikit-learn, *Cross-validation: evaluating estimator performance* — [scikit-learn.org](https://scikit-learn.org/stable/modules/cross_validation.html)
- Kaufman et al., "Leakage in Data Mining: Formulation, Detection, and Avoidance", *ACM TKDD* 6(4), 2012 — [doi:10.1145/2382577.2382579](https://doi.org/10.1145/2382577.2382579)
- Hastie et al., *The Elements of Statistical Learning*, §7.10 "Cross-Validation" — [PDF miễn phí](https://hastie.su.domains/ElemStatLearn/)

## Liên kết

[[Overfitting]] · [[Evaluation Metrics]] · [[Data and Feature Engineering]] · [[FADAML Case Study]] · [[ML]]
