---
tags: [ml, tài-nguyên, công-cụ]
status: evergreen
---
# ML Toolchain

> Bộ công cụ tối thiểu để làm mọi thứ trong vault này, và thứ tự nên học chúng. Nguyên tắc: **hai thư viện đủ cho 80% công việc** — `numpy` và `scikit-learn`.

## 1. Lõi

| Thư viện | Vai trò | Học khi nào |
|---|---|---|
| **NumPy** | Mảng nhiều chiều, đại số tuyến tính. Nền của mọi thứ khác | **Đầu tiên, trước mọi thứ** |
| **scikit-learn** | Mọi thuật toán ML cổ điển, API nhất quán, tài liệu xuất sắc | Ngay sau numpy |
| pandas | Đọc, làm sạch, biến đổi dữ liệu bảng | Song song với numpy |
| matplotlib / seaborn | Vẽ. Bạn sẽ vẽ nhiều hơn bạn nghĩ | Song song |

*Machine Learning cơ bản* dùng đúng hai thư viện chính: **numpy** để xây mô hình từ đầu, và **scikit-learn** để kiểm chứng các suy luận toán học. Đó là cặp đúng để học.

> [!note] API của scikit-learn là thứ đáng học nhất
> `fit()` / `predict()` / `transform()` / `fit_transform()`, cộng với `Pipeline` và `GridSearchCV`. Nắm bốn phương thức và hai lớp này thì bạn dùng được **mọi** estimator trong thư viện, kể cả những cái chưa từng thấy. Nó cũng là chuẩn mà các thư viện khác bắt chước.

## 2. Theo lĩnh vực

| Lĩnh vực                        | Công cụ                                             | Ghi chú                                           |
| ------------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| **Dữ liệu bảng, hiệu năng cao** | LightGBM, XGBoost, CatBoost                         | Xem [[Gradient Boosting and Tree Ensembles]]      |
| **AutoML**                      | AutoGluon, Optuna                                   | Xem [[AutoML]]                                    |
| **Deep learning**               | PyTorch                                             | Chuẩn de-facto trong nghiên cứu                   |
| **NLP tiếng Việt**              | underthesea, VnCoreNLP, PhoBERT                     | Xem [[Vietnamese NLP]]                            |
| **NLP nói chung**               | HuggingFace `transformers`, `sentence-transformers` |                                                   |
| **Dữ liệu không gian**          | GeoPandas, GeoPy, PySAL, mgwr                       | Xem [[Hedonic Pricing and GIS]]                   |
| **Thống kê suy luận**           | statsmodels                                         | Khi cần p-value — xem [[Prediction vs Inference]] |
| **Tối ưu lồi**                  | CVXPY, CVXOPT                                       | Xem [[Convex Optimization Problems]]              |
| **Hệ gợi ý**                    | Surprise, `implicit`, LightFM                       | Xem [[Utility Matrix]]                            |
| **Reinforcement learning**      | Gymnasium, Stable-Baselines3                        | Xem [[Deep Reinforcement Learning]]               |
| **Giải thích mô hình**          | SHAP, `sklearn.inspection`                          | Đọc kèm cảnh báo ở [[Prediction vs Inference]]    |

## 3. Môi trường làm việc

| Nhu cầu | Công cụ | Lý do |
|---|---|---|
| Quản lý môi trường | **uv** hoặc conda | Môi trường riêng cho từng dự án, không ngoại lệ |
| Thử nghiệm tương tác | Jupyter / VS Code notebook | Vòng lặp nhanh |
| Ghi lại thí nghiệm | MLflow, Weights & Biases | Bạn **sẽ** quên đã thử gì |
| Phiên bản dữ liệu | DVC | Code có git, dữ liệu cũng cần |
| Tính toán mạnh | Google Colab, Kaggle Notebooks | GPU miễn phí để bắt đầu |

> [!warning] Notebook tốt để khám phá, tệ để sản xuất
> Trạng thái ẩn, thứ tự chạy không xác định, khó review, khó test. Khi một notebook đã ổn định, hãy chuyển logic sang file `.py` và import ngược vào notebook.

**Phần cứng:** toàn bộ [[FADAML Case Study]] chạy trên **AMD Ryzen 7 3.20 GHz, 16 GB RAM**, dùng ~2.4 GB bộ nhớ, **không GPU**. Với dữ liệu bảng, GPU hiếm khi cần. Đừng để việc thiếu GPU chặn bạn bắt đầu.

## 4. Thói quen kỹ thuật

1. **Một môi trường ảo cho mỗi dự án.** Không ngoại lệ.
2. **Ghim phiên bản.** `requirements.txt` hoặc `pyproject.toml` với phiên bản chính xác. FADAML ghi rõ AutoGluon **0.4.0** — đó là lý do kết quả tái lập được.
3. **Cố định random seed ở mọi chỗ.** `numpy`, `random`, framework DL, và tham số `random_state` của sklearn.
4. **Bọc mọi tiền xử lý trong `Pipeline`.** Cách duy nhất chống rò rỉ trong cross-validation — xem [[Model Validation]].
5. **Ghi lại mọi lần chạy.** Siêu tham số, seed, metric, thời gian. Sau ba ngày bạn sẽ không nhớ nổi.
6. **Dùng git cho code từ ngày đầu.** Kể cả dự án cá nhân.
7. **Viết một hàm `load_data()` duy nhất.** Mọi notebook gọi nó. Tránh mười phiên bản khác nhau của cùng một bước làm sạch.

## 5. Cạm bẫy công cụ hay gặp

- **`fit_transform` trên toàn bộ dữ liệu.** Rò rỉ, im lặng, phổ biến nhất.
- **Không ghim phiên bản** rồi kết quả đổi sau khi `pip install --upgrade`.
- **Quên `model.eval()` trong PyTorch.** Dropout và batch norm hoạt động sai khi inference.
- **Cài đặt tràn lan vào môi trường gốc.** Xung đột phụ thuộc là chuyện của tuần sau.
- **Dùng notebook làm nơi lưu logic chính.** Xem callout trên.
- **Không đo thời gian dự đoán.** Bảng ở [[AutoML]] cho thấy KNN chậm hơn LightGBM ~160 lần — accuracy không phải chỉ số duy nhất quyết định triển khai.

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, §0.4 "Yêu cầu về kiến thức" và §0.5 "Mã nguồn đi kèm" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- scikit-learn, *Common pitfalls and recommended practices* — [scikit-learn.org](https://scikit-learn.org/stable/common_pitfalls.html)
- Sculley et al., "Hidden Technical Debt in Machine Learning Systems", NeurIPS 2015 — [PDF](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf)
- Nguyen, Nguyen & Nguyen, "Fake Advertisements Detection Using Automated Multimodal Learning", §5.1 (cấu hình phần cứng và phiên bản) — [arXiv:2501.10848](https://arxiv.org/abs/2501.10848)

## Liên kết

[[Learning Resources]] · [[Learning Roadmap]] · [[AutoML]] · [[Model Validation]] · [[ML]]
