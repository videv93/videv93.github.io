---
tags: [probability, limit-theorems]
status: evergreen
---
# Central Limit Theorem

> Trung bình của nhiều biến iid có phân phối **xấp xỉ Normal, bất kể phân phối gốc là gì**. Đây là lý do phân phối chuẩn xuất hiện khắp nơi — và là lý do thống kê cổ điển hoạt động được.

## 1. Phát biểu

$X_1,\dots,X_n$ iid, $E[X_i]=\mu$, $\text{Var}(X_i)=\sigma^2 < \infty$. Khi $n\to\infty$:

$$\frac{\bar X_n - \mu}{\sigma/\sqrt n} \xrightarrow{d} N(0,1)$$

Tương đương: $\bar X_n \approx N\!\left(\mu, \frac{\sigma^2}{n}\right)$ và $\sum_i X_i \approx N(n\mu, n\sigma^2)$.

Hội tụ là **theo phân phối** — chỉ hình dạng phân phối hội tụ, không phải giá trị → [[Modes of Convergence]].

## 2. LLN vs CLT

| | Nói gì | Tốc độ |
|---|---|---|
| **LLN** | $\bar X_n \to \mu$ | — |
| **CLT** | $\bar X_n - \mu$ có cỡ $\sigma/\sqrt n$ và **hình chuông** | $O(1/\sqrt n)$ |

CLT là "phóng to" LLN: LLN nói sai số về 0, CLT nói sai số về 0 **nhanh cỡ nào và theo hình dạng nào**. Kết hợp lại cho [[Confidence Intervals]].

Tốc độ $1/\sqrt n$ là quy tắc quan trọng nhất trong thực hành: **muốn giảm sai số một nửa, cần 4× dữ liệu**.

## 3. Điều kiện

| Điều kiện | Bắt buộc? |
|---|---|
| Độc lập | Có (có phiên bản cho phụ thuộc yếu: martingale CLT) |
| Cùng phân phối | Không bắt buộc — **Lyapunov/Lindeberg CLT** nới lỏng |
| $\sigma^2 < \infty$ | **Bắt buộc tuyệt đối** |
| $n$ lớn | Cần; "$n\ge30$" chỉ là quy tắc ngón tay cái |

**Khi variance vô hạn**: tổng hội tụ về **stable distribution** (Lévy), không phải Normal. Ví dụ: Cauchy, Pareto với $\alpha<2$. Đây là lý do CLT không cứu được mô hình rủi ro tài chính.

**Berry–Esseen theorem** cho cận sai số: $\sup_x|F_n(x)-\Phi(x)| \le \frac{C\rho}{\sigma^3\sqrt n}$ với $\rho=E|X-\mu|^3$. Sai số $O(1/\sqrt n)$, và **tệ hơn khi phân phối gốc lệch mạnh**.

## 4. "$n \ge 30$" — quy tắc sai đến mức nào

| Phân phối gốc | $n$ cần cho xấp xỉ tốt |
|---|---|
| Đối xứng, đuôi mỏng (Unif) | ~5–10 |
| Vừa phải lệch (Expo) | ~30–50 |
| Rất lệch (Lognormal $\sigma=2$) | hàng nghìn |
| Bin($n,p$) với $p$ nhỏ | cần $np\ge10$ và $n(1-p)\ge10$ |
| Đuôi dày, $\sigma^2=\infty$ | **không bao giờ** |

Cách kiểm tra thực tế: bootstrap phân phối của $\bar X_n$ và nhìn Q–Q plot, thay vì tin quy tắc.

## 5. Ứng dụng

- **Khoảng tin cậy**: $\bar X \pm 1.96\,\hat\sigma/\sqrt n$ → [[Confidence Intervals]]
- **Kiểm định giả thuyết**: z-test, t-test
- **Xấp xỉ Binomial bằng Normal** (nhớ continuity correction) → [[Bernoulli & Binomial]]
- **Tính tiệm cận chuẩn của MLE** → [[Fisher Information]]
- **Sai số Monte Carlo**: thanh sai số của mô phỏng

## 6. Cạm bẫy

1. **Nghĩ CLT nói "dữ liệu trở thành Normal".** Không — **trung bình mẫu** trở thành Normal. Dữ liệu gốc vẫn nguyên hình dạng của nó.
2. **Dùng khi $\sigma^2$ vô hạn.**
3. **Tin "$n\ge30$" một cách máy móc** (§4).
4. **Dùng cho dữ liệu tương quan** (chuỗi thời gian, dữ liệu nhóm) → sai số chuẩn bị đánh giá thấp nghiêm trọng.
5. **Áp CLT cho đuôi cực.** Xấp xỉ tốt ở trung tâm, tệ ở phân vị 0.999 — chính là vùng mà quản trị rủi ro quan tâm (VaR).
6. **Nhầm với LLN.**
7. **Quên rằng CLT không sửa được bias.** Mẫu lệch thì trung tâm của phân phối tiệm cận cũng lệch.

## 7. Checklist
- [ ] $\sigma^2$ có hữu hạn không?
- [ ] Dữ liệu có iid không? Có tự tương quan không?
- [ ] Phân phối gốc lệch/đuôi dày đến mức nào?
- [ ] $n$ đã đủ **cho phân phối cụ thể này** chưa? (kiểm tra bằng bootstrap)
- [ ] Đang quan tâm vùng trung tâm hay vùng đuôi?
- [ ] Có bias trong cách lấy mẫu không?
- [ ] Đang nói về trung bình hay về một quan sát đơn lẻ?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Seeing Theory — CLT | Mô phỏng tương tác | https://seeing-theory.brown.edu/probability-distributions/index.html |
| `scipy.stats.bootstrap` | Kiểm tra phân phối thật của $\bar X_n$ | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §10.3: http://probabilitybook.net
- Wikipedia — *Central limit theorem*: https://en.wikipedia.org/wiki/Central_limit_theorem
- Wikipedia — *Berry–Esseen theorem*: https://en.wikipedia.org/wiki/Berry%E2%80%93Esseen_theorem
- Wikipedia — *Stable distribution*: https://en.wikipedia.org/wiki/Stable_distribution
- 3Blue1Brown — *But what is the Central Limit Theorem?*: https://www.youtube.com/watch?v=zeJD6dqJ5lo

## Liên kết
[[Law of Large Numbers]] · [[Normal Distribution]] · [[Modes of Convergence]] · [[Confidence Intervals]] · [[Variance]] · [[Prob&Stats]]
