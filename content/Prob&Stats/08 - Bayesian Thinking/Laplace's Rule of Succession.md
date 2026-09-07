---
tags: [statistics, bayes]
status: growing
---
# Laplace's Rule of Succession

> Mặt trời đã mọc $n$ ngày liên tiếp — xác suất mai nó mọc là bao nhiêu? Laplace trả lời $\frac{n+1}{n+2}$. Bài toán đồ chơi này chứa gần như toàn bộ tư duy Bayes.

## 1. Bài toán (Blitzstein, Lecture 17)

Đồng xu có $p$ chưa biết. Đặt prior $p\sim\text{Unif}(0,1) = \text{Beta}(1,1)$. Tung $n$ lần, **tất cả** đều ra mặt ngửa. Xác suất lần thứ $n+1$ cũng ngửa?

**Bước 1 — Posterior.** Từ [[Beta-Binomial Conjugacy]]: $p\mid\text{data}\sim\text{Beta}(1+n,\ 1+0) = \text{Beta}(n+1,1)$.

**Bước 2 — Dự đoán.** Dùng [[Law of Total Probability]] dạng liên tục:
$$P(X_{n+1}=1\mid \text{data}) = E[p\mid\text{data}] = \frac{n+1}{(n+1)+1} = \boxed{\frac{n+1}{n+2}}$$

Trường hợp tổng quát ($k$ thành công trong $n$): $\dfrac{k+1}{n+2}$.

## 2. Vì sao đáp án **không** phải 1

MLE cho $\hat p = 1$, tức "chắc chắn 100%". Điều đó vô lý sau 3 lần tung — và nguy hiểm sau 1000 lần: nó gán xác suất 0 cho một sự kiện chưa từng thấy nhưng hoàn toàn có thể xảy ra.

Prior kéo ước lượng ra khỏi biên. Đây chính là **shrinkage**, và là cách xử lý nguyên tắc cho bài toán "zero count" → [[Estimator Quality]].

| $n$ | MLE | Laplace |
|---|---|---|
| 1 | 1.000 | 0.667 |
| 5 | 1.000 | 0.857 |
| 10 | 1.000 | 0.917 |
| 100 | 1.000 | 0.990 |
| 1000 | 1.000 | 0.999 |

Laplace tiến về 1 nhưng **không bao giờ đạt** — đúng như trực giác về quy nạp.

## 3. Các quan sát **không** độc lập

Điểm tinh tế nhất, và là lý do bài này đáng học kỹ.

$X_1,\dots,X_{n+1}$ độc lập **có điều kiện cho trước $p$**, nhưng **không độc lập** một cách vô điều kiện:
$$P(X_{n+1}=1) = \frac12 \quad\text{nhưng}\quad P(X_{n+1}=1\mid X_1=\cdots=X_n=1) = \frac{n+1}{n+2}$$

Vì các quan sát cùng mang thông tin về $p$, chúng tương quan dương. Đây là ví dụ sạch nhất cho [[Conditional Independence]] — và là lý do học được từ dữ liệu là điều khả dĩ.

Trên thực tế, phân phối chung của $X_1,\dots,X_n$ ở đây là **exchangeable** chứ không phải iid; định lý de Finetti nói mọi dãy exchangeable đều biểu diễn được dưới dạng "iid có điều kiện cho một tham số ẩn" — chính là cấu trúc này.

## 4. Ứng dụng thực tế

- **Laplace smoothing / add-one smoothing** trong Naive Bayes và mô hình ngôn ngữ n-gram: cộng 1 vào mọi đếm để không có xác suất 0. Đây chính xác là rule of succession.
- **Xếp hạng đánh giá sản phẩm** khi số đánh giá ít.
- **Ước lượng tỉ lệ lỗi** khi chưa quan sát lỗi nào: MLE cho 0, Laplace cho $\frac{1}{n+2}$. (Cách frequentist tương ứng: **rule of three** — chặn trên 95% cho tỉ lệ là $3/n$ khi thấy 0 sự kiện.)
- **Thompson sampling** khởi động cho nhánh chưa được thử.

## 5. Cạm bẫy

1. **Áp cho mặt trời theo nghĩa đen.** Laplace biết rõ đây là minh hoạ; ông không cho rằng ta thật sự không biết gì về thiên văn học. Prior uniform là giả định *mạnh*, không phải trung lập.
2. **Nghĩ Beta(1,1) là "không có thông tin".** Nó gán xác suất bằng nhau cho mọi $p$, nhưng không trung lập trên thang odds.
3. **Dùng khi các quan sát không exchangeable** — nếu có xu hướng theo thời gian thì mô hình sai.
4. **Add-one smoothing với từ vựng rất lớn.** Trong mô hình ngôn ngữ, cộng 1 vào 50.000 từ chiếm mất quá nhiều khối lượng xác suất; dùng add-$\alpha$ với $\alpha$ nhỏ, hoặc Kneser–Ney.
5. **Quên rằng đáp án phụ thuộc prior.** Với Beta(0.5,0.5) (Jeffreys) đáp án là $\frac{n+0.5}{n+1}$.

## 6. Checklist
- [ ] Các quan sát có exchangeable không?
- [ ] Prior nào đang dùng? Nó tương đương bao nhiêu quan sát ảo?
- [ ] Có sự kiện nào đếm bằng 0 không? → cần smoothing
- [ ] Kích thước không gian sự kiện lớn đến đâu? (ảnh hưởng chọn $\alpha$)
- [ ] Cần dự đoán quan sát tiếp theo hay ước lượng $p$? (hai câu hỏi khác nhau)
- [ ] Nếu là frequentist: rule of three có cho kết luận tương tự không?

## Tham khảo
- Stat 110 Lecture 17 (*Laplace's Rule of Succession*): https://www.youtube.com/watch?v=N8O6zd6vTZ8
- Blitzstein & Hwang — *Introduction to Probability*, §8.3: http://probabilitybook.net
- Wikipedia — *Rule of succession*: https://en.wikipedia.org/wiki/Rule_of_succession
- Wikipedia — *Additive smoothing*: https://en.wikipedia.org/wiki/Additive_smoothing
- Wikipedia — *Rule of three (statistics)*: https://en.wikipedia.org/wiki/Rule_of_three_(statistics)
- Wikipedia — *de Finetti's theorem*: https://en.wikipedia.org/wiki/De_Finetti%27s_theorem

## Liên kết
[[Beta-Binomial Conjugacy]] · [[Bayes Rule]] · [[Conditional Independence]] · [[Bayesian vs Frequentist]] · [[Law of Total Probability]] · [[Prob&Stats]]
