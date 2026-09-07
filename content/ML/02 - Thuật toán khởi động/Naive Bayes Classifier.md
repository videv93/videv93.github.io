---
tags: [ml, thuật-toán, supervised, classification, probability]
status: evergreen
---
# Naive Bayes Classifier

> Một mô hình xây trên giả định gần như luôn sai — rằng các đặc trưng độc lập với nhau — nhưng vẫn hoạt động tốt bất ngờ trên văn bản. Hiểu **vì sao** nó vẫn chạy quan trọng hơn nhiều so với công thức của nó.

## 1. Khái niệm cốt lõi

Từ định lý Bayes ở [[Probability for ML]]:
$$c^\star = \arg\max_c P(c\mid\mathbf{x}) = \arg\max_c P(c)\,P(\mathbf{x}\mid c)$$

Giả định **naive** — các đặc trưng độc lập **có điều kiện** trên lớp:
$$P(\mathbf{x}\mid c) = \prod_{i=1}^{d} P(x_i\mid c)$$

Nhờ đó, thay vì ước lượng một phân phối $d$ chiều (bất khả thi), ta chỉ cần $d$ phân phối một chiều.

Thực tế luôn tính trong miền log để tránh underflow:
$$c^\star = \arg\max_c \left[\log P(c) + \sum_{i=1}^{d}\log P(x_i\mid c)\right]$$

### Ba biến thể theo dạng đặc trưng

| Biến thể | $P(x_i\mid c)$ | Đặc trưng | Dùng cho |
|---|---|---|---|
| **Multinomial NB** | Phân phối multinomial | Số đếm (số lần xuất hiện từ) | Phân loại văn bản — mặc định |
| **Bernoulli NB** | Bernoulli | Nhị phân (từ có/không xuất hiện) | Văn bản ngắn, tin nhắn |
| **Gaussian NB** | $\mathcal{N}(\mu_{ic},\sigma_{ic}^2)$ | Liên tục | Đặc trưng số |
| Complement NB | Biến thể của multinomial | Số đếm | Văn bản **mất cân bằng lớp** |

### Laplace smoothing — không phải tuỳ chọn

Nếu một từ chưa từng xuất hiện với lớp $c$ trong tập train: $P(x_i\mid c) = 0$ → cả tích về 0 → lớp $c$ bị loại vĩnh viễn dù mọi bằng chứng khác đều ủng hộ nó.

$$P(x_i\mid c) = \frac{n_{ic} + \alpha}{n_c + \alpha d}$$

$\alpha = 1$ là Laplace smoothing; $\alpha < 1$ là Lidstone. Như đã nêu ở [[Maximum Likelihood and MAP]], đây **chính xác** là MAP với prior Dirichlet — không phải một thủ thuật chắp vá.

> [!warning] Đặt $\alpha = 0$ là hỏng mô hình
> `MultinomialNB(alpha=0)` sẽ sập hoặc cho kết quả vô nghĩa ngay khi gặp từ mới trong tập test. Sklearn còn cảnh báo về điều này. Giá trị mặc định 1.0 là an toàn; dò $\alpha \in \{0.01, 0.1, 0.5, 1\}$ bằng cross-validation nếu cần.

## 2. Nguyên tắc / Best practices

1. **Dùng NB làm baseline cho mọi bài toán phân loại văn bản.** Nó train trong vài giây trên hàng triệu tài liệu và thường đạt 80–90% hiệu năng của mô hình phức tạp.
2. **Multinomial cho đếm, Bernoulli cho nhị phân, Gaussian cho số liên tục.** Chọn nhầm biến thể là sai lầm phổ biến và im lặng.
3. **Luôn tính trong miền log.** Mọi thư viện đã làm sẵn; chỉ quan trọng khi tự cài đặt.
4. **Với đặc trưng liên tục lệch, biến đổi trước.** Gaussian NB giả định mỗi đặc trưng phân phối chuẩn trong từng lớp — lấy $\log$ hoặc dùng biến đổi power.
5. **Dùng `ComplementNB` khi lớp mất cân bằng.** Nó được thiết kế đúng cho tình huống này và thường thắng `MultinomialNB` rõ rệt.
6. **Dùng thứ hạng, đừng dùng giá trị xác suất.** Xem cạm bẫy dưới.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Xác suất xuất ra cực kỳ không calibrate.** Naive Bayes thường trả về xác suất gần 0 hoặc gần 1 vì nó nhân hàng nghìn số như thể chúng độc lập — bằng chứng bị **đếm nhiều lần**. Thứ tự xếp hạng vẫn đúng, giá trị thì không. Nếu bạn cần xác suất thật để ra quyết định theo ngưỡng chi phí, hãy calibrate (`CalibratedClassifierCV`) hoặc dùng mô hình khác.
- **Đặc trưng tương quan mạnh phá hỏng mô hình.** Thêm cùng một đặc trưng 5 lần khiến nó có sức nặng gấp 5. Trong tiếng Việt, các cụm như "mặt tiền" / "nhà mặt tiền" / "mt" mang cùng thông tin — n-gram tạo ra rất nhiều đặc trưng trùng lặp kiểu này. Xem [[Vietnamese NLP]].
- **Quên smoothing.** Xem callout ở trên.
- **Dùng Gaussian NB cho đặc trưng danh mục đã one-hot.** Một biến 0/1 không phân phối chuẩn. Dùng Bernoulli NB.
- **Cho rằng "naive" nghĩa là "kém".** Với văn bản chiều rất cao và dữ liệu vừa phải, NB thường vượt các mô hình phức tạp hơn — chính vì nó có bias cao nên variance thấp. Xem [[Overfitting]].
- **Áp NB cho bài toán mà quan hệ giữa đặc trưng chính là tín hiệu.** Nếu điều bạn cần phát hiện là "diện tích lớn **nhưng** giá thấp", NB theo cấu trúc không thể biểu diễn được — nó nhìn từng đặc trưng riêng rẽ. Đây là lý do cụ thể khiến [[FADAML Case Study]] cần mô hình có tương tác ([[Gradient Boosting and Tree Ensembles]]) chứ không thể dùng NB thuần.

## 4. Checklist áp dụng

- [ ] Tôi chọn đúng biến thể (Multinomial / Bernoulli / Gaussian) cho dạng đặc trưng của mình chưa?
- [ ] `alpha` có > 0 không?
- [ ] Dữ liệu có mất cân bằng lớp không? Tôi đã thử `ComplementNB` chưa?
- [ ] Tôi có định dùng **giá trị** xác suất không? Nếu có, tôi đã calibrate chưa?
- [ ] Các đặc trưng của tôi có tương quan mạnh không? Tôi đã cân nhắc loại bớt chưa?
- [ ] Tín hiệu tôi cần bắt có phải là **tương tác** giữa các đặc trưng không? Nếu có, NB không phải công cụ đúng.
- [ ] Tôi đã so NB với một baseline khác (logistic regression trên cùng đặc trưng) chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.naive_bayes` | `MultinomialNB`, `BernoulliNB`, `GaussianNB`, `ComplementNB` | [scikit-learn.org](https://scikit-learn.org/stable/modules/naive_bayes.html) |
| `TfidfVectorizer` | Sinh đặc trưng đếm/TF-IDF làm đầu vào cho NB | [scikit-learn.org](https://scikit-learn.org/stable/modules/feature_extraction.html) |
| `CalibratedClassifierCV` | Sửa xác suất không calibrate của NB | [scikit-learn.org](https://scikit-learn.org/stable/modules/calibration.html) |
| `underthesea` | Tách từ tiếng Việt trước khi vectorize | [github.com/undertheseanlp/underthesea](https://github.com/undertheseanlp/underthesea) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 11 "Bộ phân loại naive Bayes" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Manning, Raghavan & Schütze, *Introduction to Information Retrieval*, Ch. 13 "Text classification and Naive Bayes" — [nlp.stanford.edu/IR-book](https://nlp.stanford.edu/IR-book/)
- Rennie et al., "Tackling the Poor Assumptions of Naive Bayes Text Classifiers", ICML 2003 — nguồn gốc của ComplementNB
- scikit-learn, *Naive Bayes* — [scikit-learn.org](https://scikit-learn.org/stable/modules/naive_bayes.html)

## Liên kết

[[Probability for ML]] · [[Maximum Likelihood and MAP]] · [[Vietnamese NLP]] · [[Logistic Regression]] · [[ML]]
