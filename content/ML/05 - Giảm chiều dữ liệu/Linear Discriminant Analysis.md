---
tags: [ml, thuật-toán, dimensionality-reduction, supervised, classification]
status: evergreen
---
# Linear Discriminant Analysis

> LDA là câu trả lời cho điểm mù của [[Principal Component Analysis]]: nó **có** nhìn nhãn. Thay vì hỏi "dữ liệu trải rộng theo hướng nào", nó hỏi "hướng nào **tách các lớp** ra xa nhất".

## 1. Khái niệm cốt lõi

| | [[Principal Component Analysis]] | **LDA** |
|---|---|---|
| Dùng nhãn | **Không** (unsupervised) | **Có** (supervised) |
| Tối ưu | Phương sai tổng thể | **Tỉ số** phân tán giữa lớp / trong lớp |
| Số chiều tối đa | $\min(d, N)$ | **$K-1$** (K = số lớp) |
| Mục tiêu | Nén, khử nhiễu | Tách lớp |

### Hai ma trận phân tán

| Ma trận | Định nghĩa | Muốn |
|---|---|---|
| **Within-class** $\mathbf{S}_W$ | $\sum_k \sum_{i\in k}(\mathbf{x}_i-\boldsymbol{\mu}_k)(\mathbf{x}_i-\boldsymbol{\mu}_k)^T$ | **Nhỏ** — mỗi lớp chụm lại |
| **Between-class** $\mathbf{S}_B$ | $\sum_k N_k(\boldsymbol{\mu}_k-\boldsymbol{\mu})(\boldsymbol{\mu}_k-\boldsymbol{\mu})^T$ | **Lớn** — các lớp xa nhau |

**Tiêu chí Fisher:**
$$J(\mathbf{w}) = \frac{\mathbf{w}^T\mathbf{S}_B\mathbf{w}}{\mathbf{w}^T\mathbf{S}_W\mathbf{w}} \longrightarrow \max$$

Nghiệm: vector riêng ứng với trị riêng lớn nhất của $\mathbf{S}_W^{-1}\mathbf{S}_B$.

Với bài toán **nhị phân**, nghiệm có dạng đóng rất gọn:
$$\mathbf{w} \propto \mathbf{S}_W^{-1}(\boldsymbol{\mu}_1 - \boldsymbol{\mu}_2)$$

Đọc là: "đi theo hướng nối hai tâm lớp, nhưng **đã hiệu chỉnh** bởi hình dạng phân tán trong lớp". Nếu bỏ $\mathbf{S}_W^{-1}$, bạn chỉ nối hai tâm — và điều đó sai khi dữ liệu có phân tán bất đẳng hướng.

> [!note] Vì sao LDA giới hạn ở $K-1$ chiều
> $\mathbf{S}_B$ là tổng của $K$ ma trận hạng 1, và chúng bị ràng buộc bởi $\sum_k N_k\boldsymbol{\mu}_k = N\boldsymbol{\mu}$. Nên $\text{rank}(\mathbf{S}_B) \le K-1$ ⟹ nhiều nhất $K-1$ trị riêng khác 0. Với bài toán 2 lớp, LDA cho **đúng một chiều**. Đây là hạn chế cứng, không phải lựa chọn thiết kế.

### LDA vừa là bộ giảm chiều, vừa là bộ phân loại

Với giả định: mỗi lớp phân phối Gaussian, và **mọi lớp có chung ma trận hiệp phương sai**, LDA cho ra bộ phân loại Bayes tối ưu — với ranh giới **tuyến tính**.

Bỏ giả định "chung hiệp phương sai" → **QDA** (Quadratic Discriminant Analysis), ranh giới bậc hai, nhiều tham số hơn, cần nhiều dữ liệu hơn.

| | LDA | QDA | [[Logistic Regression]] |
|---|---|---|---|
| Giả định phân phối | Gaussian, chung $\boldsymbol{\Sigma}$ | Gaussian, riêng $\boldsymbol{\Sigma}_k$ | **Không giả định** |
| Ranh giới | Tuyến tính | Bậc hai | Tuyến tính |
| Số tham số | Ít | Nhiều ($K$ ma trận $d\times d$) | Ít |
| Khi dữ liệu ít | **Tốt hơn** | Kém | Trung bình |
| Khi giả định sai | Kém đi | Kém đi | **Vẫn ổn** |

Dòng cuối là lý do logistic regression phổ biến hơn LDA trong thực tế: nó không đặt cược vào giả định phân phối.

## 2. Nguyên tắc / Best practices

1. **Dùng LDA khi $K$ lớn và bạn cần giảm chiều có giám sát.** Với $K=2$ thì $K-1=1$ chiều — thường quá ít để hữu ích.
2. **Kiểm tra $\mathbf{S}_W$ có khả nghịch không.** Với $d > N$, nó **luôn** suy biến. Dùng `solver='lsqr'` với `shrinkage='auto'` (Ledoit–Wolf) hoặc chạy PCA trước.
3. **PCA rồi LDA là combo kinh điển.** Với dữ liệu chiều rất cao (ảnh khuôn mặt), chạy PCA giảm về vài trăm chiều rồi mới LDA. Đây đúng là quy trình của "Fisherfaces".
4. **Chuẩn hoá đặc trưng.** Cùng lý do với PCA.
5. **Kiểm tra giả định trước khi tin kết quả.** Vẽ dữ liệu từng lớp: chúng có hình elip xấp xỉ giống nhau không? Nếu không, LDA đang bị vi phạm giả định.
6. **So với logistic regression, luôn.** Chúng thường cho kết quả tương đương; nếu LDA thua đáng kể, giả định Gaussian sai.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Nhầm với LDA của chủ đề (Latent Dirichlet Allocation).** Trùng tên viết tắt hoàn toàn, hai thuật toán không liên quan gì. Bối cảnh quyết định — hãy viết đầy đủ khi có thể gây nhầm.
- **$\mathbf{S}_W$ suy biến khi $d > N$.** Nghịch đảo sập hoặc cho kết quả rác. Bắt buộc shrinkage hoặc PCA trước.
- **Mong đợi nhiều hơn $K-1$ chiều.** `LinearDiscriminantAnalysis(n_components=5)` với 3 lớp sẽ báo lỗi. Đây là giới hạn toán học.
- **Áp LDA khi các lớp có hiệp phương sai rất khác nhau.** Giả định cốt lõi bị vi phạm; dùng QDA.
- **Áp LDA khi các lớp có cùng trung bình nhưng khác phương sai.** $\mathbf{S}_B \approx 0$ → LDA hoàn toàn bất lực, dù các lớp tách được rõ ràng. Đây là ca thất bại kinh điển đáng nhớ.
- **Dùng LDA cho dữ liệu phi Gaussian mạnh** (đếm, danh mục one-hot, phân phối lệch nặng). Biến đổi trước, hoặc dùng mô hình không giả định phân phối.
- **Quên rằng LDA cũng là bộ phân loại.** Nhiều người dùng nó chỉ để giảm chiều rồi gắn thêm một classifier khác — đôi khi `LinearDiscriminantAnalysis` một mình đã đủ.

## 4. Checklist áp dụng

- [ ] $K$ của tôi là bao nhiêu? $K-1$ chiều có đủ dùng không?
- [ ] $d$ có nhỏ hơn $N$ không? Nếu không, tôi đã dùng shrinkage hoặc PCA trước chưa?
- [ ] Tôi đã vẽ dữ liệu từng lớp và kiểm tra hình dạng phân tán chưa?
- [ ] Các lớp có xấp xỉ Gaussian với hiệp phương sai tương tự không?
- [ ] Nếu hiệp phương sai khác nhau rõ: tôi đã thử QDA chưa?
- [ ] Các lớp có khác nhau về **trung bình** không? (Nếu chỉ khác phương sai, LDA vô dụng.)
- [ ] Tôi đã so LDA với [[Logistic Regression]] chưa?
- [ ] Tôi đang nói về LDA nào? (Discriminant Analysis hay Dirichlet Allocation?)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.discriminant_analysis.LinearDiscriminantAnalysis` | Vừa `transform` (giảm chiều) vừa `predict` (phân loại); có `shrinkage` | [scikit-learn.org](https://scikit-learn.org/stable/modules/lda_qda.html) |
| `QuadraticDiscriminantAnalysis` | Khi hiệp phương sai các lớp khác nhau | [scikit-learn.org](https://scikit-learn.org/stable/modules/lda_qda.html) |
| `sklearn.covariance.LedoitWolf` | Ước lượng hiệp phương sai có shrinkage khi $d$ lớn | [scikit-learn.org](https://scikit-learn.org/stable/modules/covariance.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 22 "Phân tích biệt thức tuyến tính" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Fisher, "The Use of Multiple Measurements in Taxonomic Problems", *Annals of Eugenics* 7(2), 1936 — bài gốc
- Hastie et al., *The Elements of Statistical Learning*, §4.3 "Linear Discriminant Analysis" — [PDF miễn phí](https://hastie.su.domains/ElemStatLearn/)
- Belhumeur, Hespanha & Kriegman, "Eigenfaces vs. Fisherfaces", *IEEE TPAMI* 19(7), 1997 — [doi:10.1109/34.598228](https://doi.org/10.1109/34.598228)

## Liên kết

[[Principal Component Analysis]] · [[Logistic Regression]] · [[Probability for ML]] · [[Singular Value Decomposition]] · [[ML]]
