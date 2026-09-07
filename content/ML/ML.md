---
tags: [ml, moc, machine-learning]
type: moc
status: evergreen
created: 2026-08-30
updated: 2026-08-30
---
# ML — Machine Learning

> Bản đồ kiến thức machine learning: từ nền tảng toán → khái niệm → thuật toán cổ điển → mạng neuron → SVM → giảm chiều → hệ gợi ý → ML ứng dụng thật, kèm bối cảnh lịch sử.
> Xương sống là cuốn **Machine Learning cơ bản** (Vũ Hữu Tiệp, 422 trang, 29 chương), mở rộng bằng hai bài báo ứng dụng trên dữ liệu bất động sản Việt Nam và một mảng lịch sử DeepMind.

## Cách dùng vault này

- **Đọc theo số thư mục.** `00` → `09` là thứ tự học, không phải thứ tự bảng chữ cái. Nhảy cóc được, nhưng `03` cần `00` và `01`.
- **`status` trong frontmatter:** `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- **Tên thư mục tiếng Việt, tên file tiếng Anh.** Thư mục để lướt bằng mắt, tên file để `[[link]]` khớp với cách nghĩ khi tra cứu.
- **Thuật ngữ giữ nguyên tiếng Anh.** Giải thích bằng tiếng Việt. Vì tài liệu và đồng nghiệp đều dùng tiếng Anh.
- **Mỗi khái niệm chỉ định nghĩa ở đúng một note.** Chỗ khác trỏ `[[link]]` tới.
- ⚠️ **[[Prediction vs Inference]]** là note bản lề. Đọc nó trước khi dùng bất kỳ note nào trong `07 - ML ứng dụng`.

## 00 - Nền tảng toán

Toán tối thiểu để đọc được phần dẫn giải của mọi note phía sau. Quay lại đây khi tắc, đừng đọc hết một lượt.

- [[Linear Algebra for ML]] — ma trận, hạng, trị riêng, chuẩn, ma trận xác định dương
- [[Matrix Calculus]] — gradient của hàm ma trận, bảng gradient thường gặp, numerical gradient check
- [[Probability for ML]] — xác suất có điều kiện, Bayes, các phân phối thường gặp
- [[Maximum Likelihood and MAP]] — hai cách ước lượng tham số, prior như regularizer
- [[Convex Sets and Functions]] — tập lồi, hàm lồi, vì sao lồi là ranh giới "giải được"
- [[Convex Optimization Problems]] — dạng chuẩn, LP, QP, GP
- [[Lagrange Duality]] — hàm đối ngẫu, duality gap, điều kiện KKT

## 01 - Khái niệm nền

Khung tư duy dùng chung cho mọi thuật toán. Phần này quyết định dự án ML thành hay bại nhiều hơn cả việc chọn mô hình.

- [[ML Problem Framing]] — task/experience/performance, supervised vs unsupervised, chọn đúng bài toán
- [[Data and Feature Engineering]] — feature vector, one-hot, BoW, TF-IDF, transfer learning, chuẩn hoá
- [[Loss Functions]] — hàm mất mát nào cho bài toán nào, và vì sao
- [[Overfitting]] — bias–variance, dấu hiệu nhận biết, học thuộc vs học quy luật
- [[Regularization]] — L1/L2, weight decay, dropout, early stopping
- [[Model Validation]] — train/val/test, cross-validation, các cách rò rỉ dữ liệu
- [[Evaluation Metrics]] — accuracy, precision/recall, F1, ROC-AUC, FPR/FNR, chọn metric theo chi phí sai

## 02 - Thuật toán khởi động

Bốn thuật toán không cần toán nặng. Luôn chạy một cái ở đây làm baseline trước khi động tới deep learning.

- [[Linear Regression]] — nghiệm đóng, giả nghịch đảo, khi nào dùng được
- [[K-Nearest Neighbors]] — lazy learning, chọn k, lời nguyền số chiều
- [[K-Means Clustering]] — thuật toán, chọn K, nén ảnh, giới hạn của cụm cầu
- [[Naive Bayes Classifier]] — giả định độc lập, Laplace smoothing, vì sao vẫn tốt cho text

## 03 - Mạng neuron

Từ gradient descent lên tới backpropagation. Đây là nền của toàn bộ deep learning hiện đại.

- [[Gradient Descent]] — ý tưởng, learning rate, điều kiện dừng
- [[Gradient Descent Variants]] — momentum, NAG, SGD, mini-batch, Adam
- [[Perceptron Learning Algorithm]] — mô hình neuron đầu tiên, giới hạn XOR
- [[Logistic Regression]] — sigmoid, cross-entropy, ranh giới tuyến tính
- [[Softmax Regression]] — tổng quát hoá đa lớp, numerical stability
- [[Activation Functions]] — sigmoid, tanh, ReLU và họ hàng, vanishing gradient
- [[Multilayer Perceptron]] — kiến trúc, ký hiệu tầng, khả năng xấp xỉ phổ quát
- [[Backpropagation]] — chain rule theo tầng, công thức, cạm bẫy khi cài đặt

## 04 - Máy vector hỗ trợ

Bốn biến thể SVM theo thứ tự chặt → lỏng → phi tuyến → đa lớp. Cần [[Lagrange Duality]] trước.

- [[Support Vector Machine]] — margin cực đại, bài toán gốc và đối ngẫu
- [[Soft Margin SVM]] — slack variable, tham số C, hinge loss
- [[Kernel SVM]] — kernel trick, điều kiện Mercer, chọn kernel
- [[Multiclass SVM]] — one-vs-one, one-vs-rest, multi-class hinge loss

## 05 - Giảm chiều dữ liệu

Ba kỹ thuật tuyến tính. SVD là gốc, PCA và LDA là hai cách dùng nó với hai mục tiêu khác nhau.

- [[Singular Value Decomposition]] — phân tích, truncated SVD, nén ảnh
- [[Principal Component Analysis]] — cực đại phương sai, chọn số chiều, whitening
- [[Linear Discriminant Analysis]] — cực đại tỉ số phân tán giữa/trong lớp

## 06 - Hệ thống gợi ý

Bài toán điền ô trống của ma trận tiện ích, giải theo ba cách.

- [[Utility Matrix]] — cấu trúc dữ liệu gốc, độ thưa, cold start
- [[Content-Based Recommendation]] — mô tả sản phẩm, hồi quy per-user
- [[Neighborhood-Based Collaborative Filtering]] — user-user vs item-item, chuẩn hoá rating
- [[Matrix Factorization Collaborative Filtering]] — latent factor, ALS, bias term

## 07 - ML ứng dụng

Nơi kiến thức chạm dữ liệu thật. Hai bài báo về **cùng một đối tượng** — giá bất động sản Việt Nam — nhưng theo hai hệ giá trị chỏi nhau.

- [[Multimodal Machine Learning]] — kết hợp text + tabular + ảnh, các chiến lược fusion
- [[AutoML]] — không gian tìm kiếm, stacking, khi nào AutoML thắng và khi nào thua
- [[Gradient Boosting and Tree Ensembles]] — XGBoost, LightGBM, CatBoost, random forest
- [[Vietnamese NLP]] — tách từ, PhoBERT, NER, đặc thù low-resource
- [[FADAML Case Study]] — pipeline phát hiện tin rao giả, 91.5% accuracy, ablation study
- [[Hedonic Pricing and GIS]] — mô hình hedonic, GWR, biến không gian cho giá nhà
- ⚠️ [[Prediction vs Inference]] — **note bản lề**. Đọc trước hai note trên.

## 08 - Lịch sử và bối cảnh

Vì sao ML trông như bây giờ. Đọc để biết mình đang đứng ở đâu trong dòng chảy, không phải để thi.

- [[Demis Hassabis]] — cờ vua → game AI → neuroscience → DeepMind → Nobel
- [[DeepMind]] — sứ mệnh "solve intelligence", mô hình nghiên cứu, các mốc chính
- [[Deep Reinforcement Learning]] — DQN, policy gradient, ba trụ agent/environment/reward
- [[AlphaGo]] — policy + value network + MCTS, và bước nhảy tới AlphaZero
- [[AlphaFold]] — protein folding, CASP, vì sao nó đoạt Nobel Hoá học
- [[RL for LLM Reasoning]] — RLHF, GRPO, reasoning model, Xiangqi-R1

## 09 - Tài nguyên

- [[Learning Roadmap]] — thứ tự học đề xuất theo tuần, kèm mốc kiểm tra
- [[ML Toolchain]] — numpy, scikit-learn, PyTorch, AutoGluon, môi trường làm việc
- [[Learning Resources]] — catalogue sách, khoá học, blog, dataset

## Nguồn học nền tảng dùng chung

| Nguồn | Loại | Dùng cho | Link |
|---|---|---|---|
| Machine Learning cơ bản — Vũ Hữu Tiệp | Sách (tiếng Việt) | **Xương sống của vault này**, 29 chương | [github](https://github.com/tiepvupsu/ebookMLCB) · [blog](https://machinelearningcoban.com) |
| Pattern Recognition and ML — Bishop | Sách | Nền xác suất, đồ thị mô hình | [Springer](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/) |
| The Elements of Statistical Learning | Sách | Thống kê, tree ensembles | [hastie.su.domains](https://hastie.su.domains/ElemStatLearn/) |
| Deep Learning — Goodfellow et al. | Sách | Mạng neuron, tối ưu | [deeplearningbook.org](https://www.deeplearningbook.org) |
| Mathematics for Machine Learning | Sách | Đại số tuyến tính, giải tích, xác suất | [mml-book.github.io](https://mml-book.github.io/) |
| Convex Optimization — Boyd & Vandenberghe | Sách | Phần `00`, phần `04` | [stanford.edu/~boyd](https://web.stanford.edu/~boyd/cvxbook/) |
| scikit-learn User Guide | Docs | Mọi thuật toán cổ điển | [scikit-learn.org](https://scikit-learn.org/stable/user_guide.html) |
| CS229 / CS231n / CS224n — Stanford | Khoá học | ML, CV, NLP | [cs229](https://cs229.stanford.edu/) · [cs231n](https://cs231n.github.io/) · [cs224n](https://web.stanford.edu/class/cs224n/) |
| Reinforcement Learning: An Introduction | Sách | Phần `08` | [incompleteideas.net](http://incompleteideas.net/book/the-book-2nd.html) |

Danh sách đầy đủ hơn ở [[Learning Resources]].

## Ghi chú về `_archive-seed/`

`_archive-seed/` giữ nguyên 5 file seed gốc (4 clipping `.md` + `book_ML.pdf`) để đối chiếu. **Không sửa gì trong đó.** Toàn bộ nội dung của chúng đã được mở rộng vào các note ở trên — không câu nào bị vứt đi:

| File seed | Đi vào đâu |
|---|---|
| `book_ML.pdf` (422 trang, 29 chương) | Thư mục `00` → `06`, và [[Learning Roadmap]] |
| `Fake Advertisements Detection…` | [[FADAML Case Study]], [[Multimodal Machine Learning]], [[AutoML]], [[Gradient Boosting and Tree Ensembles]], [[Vietnamese NLP]], [[Evaluation Metrics]] |
| `(PDF) Price Determinants and GIS Analysis…` | [[Hedonic Pricing and GIS]], [[Prediction vs Inference]] |
| `Demis Hassabis.md` | [[Demis Hassabis]], [[DeepMind]], [[AlphaGo]], [[AlphaFold]], [[Deep Reinforcement Learning]] |
| `Xiangqi-R1…` (⚪ header rỗng) | [[RL for LLM Reasoning]] |

## Liên kết

[[Knowledge Seed Playbook]] — quy trình đã dùng để dựng vault này.
