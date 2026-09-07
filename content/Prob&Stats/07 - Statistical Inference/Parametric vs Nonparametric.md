---
tags: [statistics, inference]
status: growing
---
# Parametric vs Nonparametric

> Đánh đổi trung tâm của thống kê: **giả định nhiều → cần ít dữ liệu nhưng dễ sai; giả định ít → cần nhiều dữ liệu nhưng khó sai.**

## 1. Định nghĩa

| | Parametric | Nonparametric |
|---|---|---|
| $\Theta$ | Tập con của $\mathbb{R}^d$, $d$ **hữu hạn và cố định** | Vô hạn chiều (một không gian hàm) |
| Ví dụ | $N(\mu,\sigma^2)$: $d=2$ | "mọi phân phối liên tục có mật độ" |
| Cần bao nhiêu dữ liệu | Ít | Nhiều (tệ hơn theo số chiều) |
| Rủi ro | Misspecification | Overfitting, hội tụ chậm |
| Tốc độ hội tụ | $O(1/\sqrt n)$ | Chậm hơn, ví dụ $O(n^{-2/5})$ cho ước lượng mật độ |

Rigollet định nghĩa (Lecture 3): parametric khi $\Theta \subseteq \mathbb{R}^d$ với $d$ cố định; nonparametric khi $\Theta$ vô hạn chiều. **Semiparametric** ở giữa: có phần tham số hữu hạn quan tâm + phần vô hạn chiều gây nhiễu (ví dụ mô hình Cox proportional hazards).

## 2. Cùng một câu hỏi, hai cách tiếp cận

| Câu hỏi | Parametric | Nonparametric |
|---|---|---|
| Ước lượng phân phối | Khớp $N(\hat\mu,\hat\sigma^2)$ | ECDF, kernel density estimation |
| So sánh hai nhóm | t-test | Mann–Whitney U, permutation test |
| Tương quan | Pearson $\rho$ | Spearman, Kendall's tau |
| Hồi quy | Tuyến tính | Spline, kernel, random forest |
| Khoảng tin cậy | CLT + $\hat\sigma$ | Bootstrap |
| Kiểm định phân phối | — | Kolmogorov–Smirnov |

## 3. Curse of dimensionality

Lý do nonparametric "đắt": để ước lượng mật độ trong $\mathbb{R}^d$ với cùng độ chính xác, số mẫu cần tăng **theo hàm mũ của $d$**. Trong $\mathbb{R}^{10}$, dữ liệu thực tế luôn thưa thớt.

Đây là lý do parametric (và các mô hình có cấu trúc mạnh) vẫn thống trị khi $d$ lớn — giả định chính là cách "mượn sức" giữa các vùng của không gian.

## 4. Khi nào chọn cái nào

**Chọn parametric khi:**
- Có lý thuyết/story biện minh cho họ phân phối (đếm sự kiện hiếm → Poisson)
- Cỡ mẫu nhỏ
- Cần diễn giải tham số ("rate là 3.2 ca/giờ")
- Cần ngoại suy ngoài vùng dữ liệu

**Chọn nonparametric khi:**
- Không có lý do tin vào họ nào
- Dữ liệu nhiều
- Có outlier / đuôi dày / đa mode
- Chỉ cần dự đoán, không cần diễn giải

**Chiến lược thực dụng**: khớp parametric, rồi **kiểm tra** bằng công cụ nonparametric (Q–Q plot, bootstrap, KS test). Nếu hai bên khớp nhau → tin parametric vì nó hiệu quả hơn.

## 5. Cạm bẫy

1. **"Nonparametric = không có giả định".** Sai. Vẫn cần iid, vẫn cần chọn bandwidth/kernel, vẫn có giả định trơn.
2. **Dùng nonparametric với $n$ nhỏ** → variance rất lớn, kết luận vô nghĩa.
3. **Dùng parametric rồi không kiểm tra giả định.**
4. **Nghĩ rằng test nonparametric "an toàn hơn nên luôn dùng".** Chúng có power thấp hơn khi giả định parametric đúng.
5. **Nhầm "nonparametric" với "không có tham số".** KDE có bandwidth; random forest có hàng nghìn tham số. Ý nghĩa là **số tham số không cố định trước, tăng theo dữ liệu**.
6. **Ngoại suy bằng mô hình nonparametric.** Ngoài vùng dữ liệu, chúng không nói được gì.

## 6. Checklist
- [ ] Có story/lý thuyết nào gợi ý họ phân phối không?
- [ ] $n$ là bao nhiêu? $d$ là bao nhiêu?
- [ ] Cần diễn giải tham số hay chỉ cần dự đoán?
- [ ] Có cần ngoại suy không?
- [ ] Nếu dùng parametric: đã kiểm tra khớp (Q–Q, residual) chưa?
- [ ] Nếu dùng nonparametric: bandwidth/độ trơn chọn bằng cách nào? (cross-validation?)
- [ ] Hai cách tiếp cận có cho cùng kết luận không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.gaussian_kde` | Ước lượng mật độ nonparametric | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.gaussian_kde.html |
| `scipy.stats.bootstrap` | Khoảng tin cậy không cần giả định phân phối | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html |
| `scipy.stats.ks_2samp` | So sánh hai phân phối | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html |

## Tham khảo
- MIT 18.650 Lecture 3 (*Non Parametric Estimation*): https://www.youtube.com/watch?v=TSkDZbGS94k
- Wasserman — *All of Nonparametric Statistics*: https://link.springer.com/book/10.1007/0-387-30623-4
- Wikipedia — *Nonparametric statistics*: https://en.wikipedia.org/wiki/Nonparametric_statistics
- Wikipedia — *Curse of dimensionality*: https://en.wikipedia.org/wiki/Curse_of_dimensionality

## Liên kết
[[Statistical Model]] · [[Estimator Quality]] · [[Maximum Likelihood Estimation]] · [[CDF]] · [[Prob&Stats]]
