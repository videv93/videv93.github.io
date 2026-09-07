---
tags: [ml, ứng-dụng, case-study, automl, multimodal]
status: evergreen
---
# FADAML Case Study

> ⚠️ **Đọc [[Prediction vs Inference]] trước khi áp dụng bất kỳ note nào trong thư mục này.**

> Một hệ thống ML end-to-end hoàn chỉnh, giải bài toán thật, trên dữ liệu tiếng Việt thật, với con số công khai và ablation study trung thực. Đây là note đáng đọc nhất trong vault cho ai muốn thấy **toàn bộ pipeline** thay vì từng thuật toán rời rạc.

## 1. Bài toán và hệ thống

**Bài toán:** cho một tin rao bất động sản dạng văn bản tự do (HTML đã gỡ tag), phân loại **thật** hay **giả**.

Nguồn: năm sàn phổ biến nhất — `batdongsan.com.vn`, `chotot.com`, `diaoconline.vn`, `123nhadat.vn`, `muaban.net`.

### Ba thành phần

| Thành phần | Làm gì | Note liên quan |
|---|---|---|
| **1. Crawler + tiền xử lý** | Cào HTML, gỡ tag `\n` `\t` `<br>`, gộp khoảng trắng, hạ chữ thường | [[Vietnamese NLP]] |
| **2. Trích đặc trưng multimodal + làm sạch** | NER lấy 4 thực thể, làm giàu thêm 5 đặc trưng, khử nhiễu/outlier/trùng lặp | [[Multimodal Machine Learning]], [[Data and Feature Engineering]] |
| **3. AutoML** | AutoGluon huấn luyện 14 mô hình, stack 2 tầng, weighted ensemble | [[AutoML]] |

### 10 đặc trưng cuối cùng

| Đặc trưng | Kiểu | Sinh từ |
|---|---|---|
| `description` | string | Thành phần 1 |
| `price` | real (triệu VND) | NER |
| `area` | real (m²) | NER |
| `road` | category | NER |
| `district` | category | NER |
| `house_type` | category | **Làm giàu** (regex: mặt tiền / hẻm) |
| `road_width` | real | **Làm giàu** (regex; mặt tiền → hằng số 20) |
| `road_first` | category | **Làm giàu** (GeoPy + khoảng cách Manhattan) |
| `road_second` | category | **Làm giàu** |
| `road_third` | category | **Làm giàu** |

NER dùng `MishWindowEncoder` trên embedding **PhoBERT-base**, huấn luyện sẵn trên một tập bất động sản khác gán nhãn bằng Doccano.

## 2. Ba quyết định đáng học nhất

### 2.1. Cách tạo nhãn

Không có nhãn "tin giả" sẵn. Quy trình:

1. So giá đăng với giá dự đoán từ giao dịch tương tự trong quá khứ
2. Chênh lệch lớn → **hai chuyên gia bất động sản độc lập** định giá lại
3. Nếu hai giá của họ **không nằm trong 10% của nhau** → gán nhãn **giả**
4. Chuyên gia kiểm tra thủ công một tập con ngẫu nhiên, sửa nhãn sai
5. **Lặp lại bước 4 cho tới khi không còn sửa nào**

Bước 5 là điểm sáng: nó biến chất lượng nhãn thành một tiêu chí dừng đo được, thay vì một lời hứa. Nhưng nó cũng có nghĩa mô hình học **đúng định nghĩa này** — xem [[ML Problem Framing]].

### 2.2. Đặc trưng không gian bằng khoảng cách Manhattan

GeoPy lấy toạ độ mọi con đường trong quận, tính khoảng cách **Manhattan** giữa các cặp, lấy ba đường gần nhất làm đặc trưng.

Hai lý do, đều thực dụng:
- **Khoảng cách Manhattan** khớp với hình học lưới đường phố, không phải đường chim bay
- Nó **chống dữ liệu thưa**: nếu chỉ có một tin rao trên một con đường, `road` vô dụng — nhưng `road_first/second/third` vẫn cho mô hình cơ sở để ngoại suy giá/m²

### 2.3. Khử trùng lặp trước khi chia train/test

Đại lý đăng chéo cùng một bất động sản lên nhiều sàn. Khử trùng lặp hai tầng: trước bằng độ giống nhau của text, sau bằng so sánh các đặc trưng quan trọng. Không làm bước này thì cùng một bất động sản nằm ở cả train và test — xem [[Model Validation]].

## 3. Kết quả

Dữ liệu: 29.085 mẫu (12.235 thật / 16.850 giả), chia 23.268 train / 5.817 test, validation = 10% của train, stratified sampling.

| Mô hình | Precision | Recall | F1 | Accuracy | FPR ↓ | FNR ↓ |
|---|---|---|---|---|---|---|
| FNDNet | 0.726 | 0.722 | 0.724 | 0.733 | 0.340 | 0.213 |
| Bi-LSTM + Attention | 0.631 | 0.619 | 0.620 | 0.643 | 0.529 | 0.231 |
| FastText + CNN | 0.289 | 0.500 | 0.366 | 0.579 | 1.00 | 0.00 |
| **FADAML** | **0.913** | **0.913** | **0.913** | **0.915** | **0.098** | **0.074** |

Chi tiết 14 mô hình bên trong ensemble: xem bảng ở [[AutoML]]. Ablation study từng nhóm đặc trưng: xem [[Multimodal Machine Learning]].

Hai điều đáng chú ý:
- **FastText+CNN có FPR 100% và FNR 0%** — nó gán *mọi thứ* vào lớp "giả". Accuracy 57.9% chỉ là tỉ lệ lớp giả trong tập. Xem [[Evaluation Metrics]].
- Mô hình FADAML **chỉ dùng text** (78.5%) vẫn vượt baseline deep learning tốt nhất (73.3%). Kết luận của nhóm tác giả: với bài toán này, AutoML tốt hơn word embedding pre-trained + deep learning.

Tài nguyên: AMD Ryzen 7 3.20 GHz, 16 GB RAM, ~2.4 GB bộ nhớ dùng, 124.86 giây train ensemble cuối. **Không GPU.**

## 4. Giới hạn — do chính tác giả nêu

| Giới hạn | Chi tiết |
|---|---|
| **Chưa đủ để triển khai** | 91.5% accuracy, FPR 9.8%, FNR 7.4% — nhóm tác giả nói thẳng là chưa đạt mức sản xuất |
| Tập dữ liệu vừa phải | 29.085 mẫu khiến các mô hình deep learning trong ensemble không phát huy được |
| Nhiễu trong dữ liệu | Cần thêm kỹ thuật khử nhiễu |
| Bài toán tiến hoá | Tin rao giả thay đổi nhanh hơn mô hình; cần retrain liên tục; hướng đề xuất là online learning và continual learning |

Hướng phát triển các tác giả đề xuất: thêm modality **ảnh** bất động sản, thêm mô hình vào ensemble, mở rộng sang miền khác (y tế, tin sinh học, thương mại điện tử khác).

> [!warning] Con số 91.5% nghĩa là gì trên thực tế
> Trên 5.817 tin test: FPR 9.8% ≈ **240 tin rao thật bị chặn nhầm**; FNR 7.4% ≈ **249 tin giả lọt qua**. Với một sàn thương mại, 240 người bán thật bị chặn là 240 khiếu nại. Đây là lý do metric phải được dịch sang số lượng thực tế — xem [[Evaluation Metrics]].

## 5. Checklist rút ra cho dự án của bạn

- [ ] Nhãn của tôi được định nghĩa bằng quy tắc gì? Quy tắc đó có được viết thành văn không?
- [ ] Tôi có quy trình kiểm tra chất lượng nhãn **có tiêu chí dừng** không?
- [ ] Tôi đã khử trùng lặp **trước** khi chia train/test chưa?
- [ ] Tôi đã hỏi chuyên gia miền về những đặc trưng máy không tự suy ra được chưa?
- [ ] Tôi đã chạy ablation study để biết nhóm đặc trưng nào thực sự đóng góp chưa?
- [ ] Tôi báo cáo FPR và FNR riêng, không chỉ accuracy chứ?
- [ ] Tôi đã dịch metric sang số lượng thực tế (bao nhiêu ca sai mỗi ngày) chưa?
- [ ] Ngưỡng "đủ tốt để triển khai" là bao nhiêu, và ai quyết định?
- [ ] Tôi có kế hoạch retrain khi phân phối dữ liệu dịch chuyển không?
- [ ] Tôi đã đọc [[Prediction vs Inference]] trước khi diễn giải feature importance chưa?

## Công cụ

| Tên | Vai trò trong hệ thống | Link |
|---|---|---|
| AutoGluon 0.4.0 | Thành phần 3: AutoML + stacking | [auto.gluon.ai](https://auto.gluon.ai/) |
| PhoBERT-base | Embedding cho NER | [huggingface.co/vinai/phobert-base](https://huggingface.co/vinai/phobert-base) |
| Doccano | Gán nhãn NER | [github.com/doccano/doccano](https://github.com/doccano/doccano) |
| GeoPy | Geocoding tên đường → toạ độ | [geopy.readthedocs.io](https://geopy.readthedocs.io/) |

## Tham khảo

- Nguyen, Nguyen & Nguyen, "Fake Advertisements Detection Using Automated Multimodal Learning: A Case Study for Vietnamese Real Estate Data" — [arXiv:2501.10848](https://arxiv.org/abs/2501.10848)
- Erickson et al., "AutoGluon-Tabular: Robust and Accurate AutoML for Structured Data" — [arXiv:2003.06505](https://arxiv.org/abs/2003.06505)
- Nguyen & Nguyen, "PhoBERT: Pre-trained language models for Vietnamese", *Findings of EMNLP* 2020 — [aclanthology.org/2020.findings-emnlp.92](https://aclanthology.org/2020.findings-emnlp.92/)
- Sadeghpour & Vlajic, "Ads and Fraud: A Comprehensive Survey of Fraud in Online Advertising", *J. Cybersecurity and Privacy* 1(4), 2021 — [doi:10.3390/jcp1040040](https://doi.org/10.3390/jcp1040040)

## Liên kết

[[Prediction vs Inference]] · [[AutoML]] · [[Multimodal Machine Learning]] · [[Vietnamese NLP]] · [[Evaluation Metrics]] · [[Model Validation]] · [[ML]]
