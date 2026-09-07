---
tags: [ml, tài-nguyên, lộ-trình]
status: evergreen
---
# Learning Roadmap

> Thứ tự đọc đề xuất cho toàn bộ vault này, kèm mốc kiểm tra ở mỗi chặng. Nguyên tắc xuyên suốt lấy từ lời nói đầu của *Machine Learning cơ bản*: **luôn bắt đầu từ những điều đơn giản** — thuật toán đơn giản cho bạn bộ khung nhanh và cái nhìn sơ bộ về độ khó của bài toán.

## Trước khi bắt đầu

| Yêu cầu | Mức cần | Không có thì |
|---|---|---|
| Đại số tuyến tính | Ma trận, vector, trị riêng | Đọc [[Linear Algebra for ML]] khi tắc |
| Giải tích | Đạo hàm, chain rule | Đọc [[Matrix Calculus]] khi tắc |
| Xác suất thống kê | Bayes, phân phối cơ bản | Đọc [[Probability for ML]] khi tắc |
| Python | numpy cơ bản | Học `numpy` trước, mọi thứ khác đợi được |

> [!note] Đừng đọc `00 - Nền tảng toán` từ đầu tới cuối
> Nó là **tài liệu tra cứu**, không phải giáo trình. Đọc nó khi bạn gặp một công thức không hiểu, không phải trước khi bắt đầu. Đọc tuyến tính phần toán là cách chắc chắn nhất để bỏ cuộc ở tuần thứ hai.

## Lộ trình 12 tuần

### Chặng 1 — Khung tư duy (tuần 1–2)

**Đọc:** [[ML Problem Framing]] → [[Data and Feature Engineering]] → [[Loss Functions]] → [[Overfitting]] → [[Model Validation]] → [[Evaluation Metrics]]

**Làm:** lấy một bộ dữ liệu bảng bất kỳ (Titanic, California Housing). Chia train/test **đúng cách**, chạy `DummyClassifier`, ghi lại con số.

✅ **Mốc kiểm tra:** bạn giải thích được cho người khác vì sao accuracy 95% có thể là một mô hình vô dụng.

### Chặng 2 — Bốn thuật toán đầu tiên (tuần 3–4)

**Đọc:** [[Linear Regression]] → [[K-Nearest Neighbors]] → [[K-Means Clustering]] → [[Naive Bayes Classifier]]

**Làm:** cài đặt [[Linear Regression]] bằng numpy thuần (nghiệm đóng), rồi đối chiếu với `sklearn`. Kết quả phải khớp tới 6 chữ số thập phân.

✅ **Mốc kiểm tra:** bạn biết thuật toán nào **cần chuẩn hoá** và vì sao.

### Chặng 3 — Tối ưu và mạng neuron (tuần 5–7)

**Đọc:** [[Gradient Descent]] → [[Gradient Descent Variants]] → [[Perceptron Learning Algorithm]] → [[Logistic Regression]] → [[Softmax Regression]] → [[Activation Functions]] → [[Multilayer Perceptron]] → [[Backpropagation]]

**Làm:** cài đặt một MLP 2 tầng bằng numpy thuần, **có gradient check bằng số**. Train trên MNIST. Đây là bài tập giá trị nhất trong cả lộ trình.

✅ **Mốc kiểm tra:** gradient check của bạn cho sai số tương đối $< 10^{-6}$, và bạn giải thích được vì sao sigmoid gây vanishing gradient.

### Chặng 4 — SVM và toán tối ưu (tuần 8–9)

**Đọc:** [[Convex Sets and Functions]] → [[Convex Optimization Problems]] → [[Lagrange Duality]] → [[Support Vector Machine]] → [[Soft Margin SVM]] → [[Kernel SVM]] → [[Multiclass SVM]]

**Làm:** giải bài toán đối ngẫu SVM bằng CVXOPT trên dữ liệu 2D, vẽ margin và đánh dấu support vector.

✅ **Mốc kiểm tra:** bạn giải thích được vì sao **chỉ** các điểm trên margin có $\lambda_i > 0$ (complementary slackness).

### Chặng 5 — Giảm chiều và hệ gợi ý (tuần 10)

**Đọc:** [[Singular Value Decomposition]] → [[Principal Component Analysis]] → [[Linear Discriminant Analysis]] → [[Utility Matrix]] → [[Content-Based Recommendation]] → [[Neighborhood-Based Collaborative Filtering]] → [[Matrix Factorization Collaborative Filtering]]

**Làm:** nén một ảnh bằng truncated SVD ở $k = 5, 20, 50, 100$; vẽ phổ giá trị suy biến. Rồi xây một recommender trên MovieLens 100k.

✅ **Mốc kiểm tra:** bạn biết vì sao SVD cổ điển **không** dùng được trực tiếp cho ma trận tiện ích.

### Chặng 6 — ML ứng dụng (tuần 11–12)

**Đọc:** ⚠️ [[Prediction vs Inference]] **trước tiên** → [[Multimodal Machine Learning]] → [[AutoML]] → [[Gradient Boosting and Tree Ensembles]] → [[Vietnamese NLP]] → [[FADAML Case Study]] → [[Hedonic Pricing and GIS]]

**Làm:** lấy một bộ dữ liệu bảng thật, chạy AutoGluon, **rồi chạy ablation study** bỏ từng nhóm đặc trưng để đo đóng góp thật.

✅ **Mốc kiểm tra:** bạn nói được bài toán của mình cần **dự đoán** hay cần **hiểu**, và chọn công cụ theo đó.

### Đọc rải rác — bất cứ lúc nào

`08 - Lịch sử và bối cảnh`: [[Demis Hassabis]], [[DeepMind]], [[Deep Reinforcement Learning]], [[AlphaGo]], [[AlphaFold]], [[RL for LLM Reasoning]]. Đọc để biết mình đang đứng ở đâu, không phải để thi.

## Sau 12 tuần — đi tiếp hướng nào

| Nếu bạn quan tâm | Hướng đi | Tài nguyên |
|---|---|---|
| Ảnh, video | CNN, vision transformer | CS231n |
| Văn bản, LLM | Transformer, fine-tuning | CS224n, HuggingFace course |
| Dữ liệu bảng trong sản xuất | MLOps, monitoring, drift | Xem [[ML Toolchain]] |
| Nghiên cứu | Đọc paper, tái lập kết quả | Papers with Code |
| Kinh tế lượng, chính sách | Suy luận nhân quả | [[Prediction vs Inference]] → sách của Angrist & Pischke |

Danh mục đầy đủ ở [[Learning Resources]].

## Bảy nguyên tắc xuyên suốt

1. **Luôn bắt đầu từ thuật toán đơn giản.** Nó cho bạn bộ khung nhanh và cái nhìn về độ khó thật của bài toán.
2. **Cài đặt bằng numpy trước, dùng thư viện sau.** Bạn không hiểu backprop cho tới khi tự viết một lần.
3. **Luôn có baseline.** `DummyClassifier` trước, mô hình sau.
4. **Gradient check mọi thứ bạn tự viết.**
5. **Chia dữ liệu trước, làm mọi thứ khác sau.**
6. **Feature engineering thắng model tuning.** Bằng chứng định lượng ở [[Multimodal Machine Learning]].
7. **Viết ra con số, đừng nhớ trong đầu.** Bạn sẽ quên mình đã thử gì sau ba ngày.

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 0 "Lời nói đầu" (§0.4 yêu cầu kiến thức, §0.6 bố cục) — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Domingos, "A Few Useful Things to Know about Machine Learning", *CACM* 2012 — [PDF](https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf)
- fundaml.com — khoá numpy ngắn đi kèm sách MLCB — [fundaml.com](https://fundaml.com)
- scikit-learn User Guide — vừa là tài liệu vừa là giáo trình — [scikit-learn.org](https://scikit-learn.org/stable/user_guide.html)

## Liên kết

[[Learning Resources]] · [[ML Toolchain]] · [[ML Problem Framing]] · [[Prediction vs Inference]] · [[ML]]
