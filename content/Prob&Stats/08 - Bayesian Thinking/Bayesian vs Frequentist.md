---
tags: [statistics, bayes, inference]
status: evergreen
---
# Bayesian vs Frequentist

> Câu hỏi phân biệt hai trường phái chỉ có một: **$\theta$ là hằng số chưa biết, hay là một biến ngẫu nhiên?** Mọi khác biệt còn lại đều là hệ quả.

## 1. Bảng đối chiếu

| | Frequentist | Bayesian |
|---|---|---|
| $\theta$ là | Hằng số cố định, chưa biết | Random variable |
| Dữ liệu là | Ngẫu nhiên (có thể lặp lại) | Cố định (đã quan sát) |
| Xác suất nghĩa là | Tần suất dài hạn | Mức độ tin |
| Đầu ra | $\hat\theta$, khoảng tin cậy, p-value | Phân phối posterior đầy đủ |
| Cần prior | Không | **Có** |
| "95%" nghĩa là | 95% các khoảng sinh ra sẽ chứa $\theta$ | Xác suất $\theta$ nằm trong khoảng là 95% |
| Khoảng | Confidence interval | **Credible interval** |
| Ước lượng điểm | MLE → [[Maximum Likelihood Estimation]] | Posterior mean / median / MAP |

## 2. Công thức Bayes cho tham số

$$\underbrace{p(\theta\mid x)}_{\text{posterior}} = \frac{\overbrace{p(x\mid\theta)}^{\text{likelihood}}\ \overbrace{p(\theta)}^{\text{prior}}}{\underbrace{p(x)}_{\text{evidence}}} \propto L(\theta)\,p(\theta)$$

→ [[Bayes Rule]]

Điểm mấu chốt: frequentist coi $L(\theta)$ là hàm của $\theta$ nhưng **không** là phân phối xác suất trên $\theta$; Bayesian nhân nó với prior để **biến nó thành** phân phối xác suất trên $\theta$.

**MAP vs MLE**: $\hat\theta_{MAP} = \arg\max_\theta L(\theta)p(\theta)$. Với prior đều thì MAP = MLE. Với prior Gaussian thì MAP = MLE + phạt $L^2$ (ridge); với prior Laplace thì = phạt $L^1$ (lasso). **Regularization chính là prior đội lốt.**

## 3. Ví dụ so sánh: tung xu 10 lần, 8 mặt ngửa

| | Kết quả |
|---|---|
| **MLE** | $\hat p = 0.8$ |
| **Wald CI 95%** | $[0.55, 1.05]$ — vượt biên, vô nghĩa |
| **Wilson CI 95%** | $[0.49, 0.94]$ |
| **Bayes, prior Beta(1,1)** | Posterior Beta(9,3), mean $= 0.75$, credible interval $[0.48, 0.94]$ |
| **Bayes, prior Beta(50,50)** | Posterior Beta(58,52), mean $= 0.53$ — prior mạnh kéo về 0.5 |

Dòng cuối cho thấy điều cốt lõi: **prior có ảnh hưởng thật**, nhất là khi dữ liệu ít. Với $n$ lớn, mọi prior hợp lý đều cho cùng kết luận (**Bernstein–von Mises theorem**) — tranh cãi chỉ quan trọng khi dữ liệu khan hiếm.

## 4. Chọn cách nào

**Nghiêng Bayesian khi:**
- Có thông tin tiên nghiệm thật (nghiên cứu trước, ràng buộc vật lý)
- Dữ liệu ít
- Mô hình phân tầng / nhiều nhóm nhỏ
- Cần trả lời trực tiếp "xác suất giả thuyết đúng là bao nhiêu"
- Cần cập nhật tuần tự khi dữ liệu về dần

**Nghiêng frequentist khi:**
- Cần bảo đảm về sai lầm loại I trong quy trình chuẩn hoá (thử nghiệm lâm sàng, kiểm định pháp lý)
- Không muốn tranh cãi về prior
- Cần kết quả nhanh, mô hình đơn giản
- Người đọc/quy định yêu cầu

Thực hành hiện đại thường **dùng cả hai** và kiểm tra xem có cùng kết luận không.

## 5. Cạm bẫy

1. **Diễn giải confidence interval theo kiểu Bayes** — sai lầm số một → [[Confidence Intervals]].
2. **"Prior không thiên vị" không tồn tại.** Uniform trên $\theta$ không phải uniform trên $\ln\theta$. Jeffreys prior bất biến với reparametrization, nhưng vẫn là một lựa chọn.
3. **Prior quá mạnh, không kiểm tra độ nhạy.** Luôn chạy lại với 2–3 prior khác nhau.
4. **Improper prior** (không tích phân về 1) đôi khi cho posterior improper → kết quả vô nghĩa.
5. **Cho rằng Bayes miễn nhiễm p-hacking.** Có thể "prior-hack" hoặc dừng lấy dữ liệu tuỳ tiện.
6. **Nhân likelihood của dữ liệu phụ thuộc** → posterior quá tự tin → [[Conditional Independence]].
7. **Nhầm MAP với posterior mean.** Với posterior lệch, hai cái khác nhau đáng kể.
8. **Coi đây là cuộc chiến ý thức hệ.** Trong thực hành, chọn công cụ theo bài toán.

## 6. Checklist
- [ ] Có thông tin tiên nghiệm thật không? Từ đâu?
- [ ] $n$ lớn hay nhỏ? (lớn → hai cách hội tụ về nhau)
- [ ] Câu hỏi cần trả lời là gì: quyết định, ước lượng, hay phân phối niềm tin?
- [ ] Đã kiểm tra độ nhạy với prior chưa?
- [ ] Prior có proper không?
- [ ] Đang diễn giải khoảng đúng loại chưa?
- [ ] Hai cách tiếp cận có cho cùng kết luận không? Nếu không, vì sao?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| PyMC | Bayesian modeling bằng Python, MCMC/NUTS | https://www.pymc.io |
| Stan | Ngôn ngữ mô hình Bayes chuẩn công nghiệp | https://mc-stan.org |
| `arviz` | Chẩn đoán & trực quan posterior | https://python.arviz.org |

## Tham khảo
- Stat 110 Lecture 17 (*Bayesian Approach*): https://www.youtube.com/watch?v=N8O6zd6vTZ8
- Gelman et al. — *Bayesian Data Analysis* (bản PDF miễn phí): http://www.stat.columbia.edu/~gelman/book/
- McElreath — *Statistical Rethinking*: https://xcelab.net/rm/
- Wikipedia — *Bayesian statistics*: https://en.wikipedia.org/wiki/Bayesian_statistics
- Wikipedia — *Bernstein–von Mises theorem*: https://en.wikipedia.org/wiki/Bernstein%E2%80%93von_Mises_theorem

## Liên kết
[[Bayes Rule]] · [[Beta-Binomial Conjugacy]] · [[Laplace's Rule of Succession]] · [[Maximum Likelihood Estimation]] · [[Confidence Intervals]] · [[Prob&Stats]]
