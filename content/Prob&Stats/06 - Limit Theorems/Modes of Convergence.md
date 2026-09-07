---
tags: [probability, limit-theorems]
status: growing
---
# Modes of Convergence

> "Dãy biến ngẫu nhiên hội tụ" có ít nhất bốn nghĩa khác nhau. Chọn đúng nghĩa là điều kiện để phát biểu đúng [[Law of Large Numbers]] và [[Central Limit Theorem]].

## 1. Bốn kiểu hội tụ

| Kiểu | Ký hiệu | Định nghĩa | Ý nghĩa |
|---|---|---|---|
| **Almost surely** | $X_n \xrightarrow{a.s.} X$ | $P(\lim_n X_n = X)=1$ | Hầu như mọi quỹ đạo đều hội tụ |
| **In probability** | $X_n \xrightarrow{P} X$ | $\forall\varepsilon>0: P(|X_n-X|>\varepsilon)\to0$ | Xác suất lệch nhiều dần về 0 |
| **In $L^p$ (mean square nếu $p=2$)** | $X_n\xrightarrow{L^p}X$ | $E|X_n-X|^p\to0$ | Sai số bình phương trung bình → 0 |
| **In distribution** | $X_n\xrightarrow{d}X$ | $F_n(x)\to F(x)$ tại mọi điểm liên tục | Chỉ phân phối hội tụ, không phải giá trị |

## 2. Thứ tự mạnh yếu

$$X_n\xrightarrow{a.s.} X \;\Longrightarrow\; X_n\xrightarrow{P}X \;\Longrightarrow\; X_n\xrightarrow{d}X$$
$$X_n\xrightarrow{L^2}X \;\Longrightarrow\; X_n\xrightarrow{P}X$$

**Không có chiều ngược lại** (trừ hai ngoại lệ):
- $X_n\xrightarrow{d}c$ (hằng số) $\Rightarrow X_n\xrightarrow{P}c$
- $X_n\xrightarrow{P}X$ $\Rightarrow$ tồn tại **dãy con** hội tụ a.s.

$L^2$ và a.s. **không so sánh được** với nhau: có dãy hội tụ a.s. nhưng không $L^2$, và ngược lại.

## 3. Vì sao phân biệt quan trọng

| Định lý | Kiểu hội tụ |
|---|---|
| **Weak LLN** | in probability |
| **Strong LLN** | almost surely |
| **CLT** | in distribution |
| **Glivenko–Cantelli** | a.s., đều theo $x$ |

Weak LLN nói: với mỗi $n$ lớn, khả năng $\bar X_n$ lệch nhiều là nhỏ — nhưng không loại trừ việc $\bar X_n$ lệch nhiều **vô hạn lần** trong suốt dãy.

Strong LLN loại trừ điều đó: hầu như mọi quỹ đạo chỉ lệch nhiều **hữu hạn lần**. Đây mới là điều biện minh cho việc chạy mô phỏng Monte Carlo lâu → [[Law of Large Numbers]].

## 4. Phản ví dụ nên nhớ

**In probability nhưng không a.s. — "typewriter sequence".** Chia $[0,1]$ thành các khoảng nhỏ dần, $X_n$ = indicator của khoảng thứ $n$ chạy vòng quanh. $P(X_n=1)\to0$ nên hội tụ theo xác suất; nhưng với mỗi $\omega$, $X_n(\omega)=1$ **vô hạn lần** → không a.s.

**In distribution nhưng không in probability.** $X\sim N(0,1)$, $X_n = -X$ với mọi $n$. Thì $X_n\xrightarrow{d}X$ (cùng phân phối), nhưng $|X_n - X|=2|X|$ không nhỏ.

**Hội tụ theo xác suất nhưng không $L^1$.** $X_n = n$ với xác suất $1/n$, bằng 0 nếu không. $X_n\xrightarrow{P}0$ nhưng $E[X_n]=1$ với mọi $n$.

## 5. Các công cụ liên quan

- **Slutsky's theorem**: $X_n\xrightarrow{d}X$, $Y_n\xrightarrow{P}c$ $\Rightarrow$ $X_n+Y_n\xrightarrow{d}X+c$, $X_nY_n\xrightarrow{d}cX$. Đây là cách thay $\sigma$ bằng $\hat\sigma$ trong khoảng tin cậy mà vẫn hợp lệ → [[Confidence Intervals]].
- **Continuous mapping theorem**: $g$ liên tục thì $g(X_n)$ hội tụ theo cùng kiểu.
- **Delta method**: $\sqrt{n}(\hat\theta-\theta)\xrightarrow{d}N(0,\sigma^2)$ $\Rightarrow$ $\sqrt n(g(\hat\theta)-g(\theta))\xrightarrow{d}N(0,g'(\theta)^2\sigma^2)$.

## 6. Cạm bẫy

1. **Nói "hội tụ" mà không nói kiểu nào.**
2. **Cho rằng in distribution kéo theo hội tụ giá trị.** Không — nó chỉ nói về hình dạng phân phối.
3. **Đổi thứ tự giới hạn và kỳ vọng.** $\lim E[X_n]\ne E[\lim X_n]$ nói chung; cần dominated/monotone convergence.
4. **Dùng CLT rồi kết luận về một mẫu cụ thể.** CLT nói về phân phối của trung bình, không về một quan sát.
5. **Bỏ qua điều kiện "tại mọi điểm liên tục"** trong định nghĩa hội tụ theo phân phối.

## 7. Checklist
- [ ] Đang cần kết luận về **giá trị** hay về **phân phối**?
- [ ] Kiểu hội tụ nào là đủ cho mục đích này?
- [ ] Nếu dùng Strong LLN: các giả thiết ($E|X|<\infty$, iid) có thoả không?
- [ ] Có đang đổi thứ tự $\lim$ và $E$ không?
- [ ] Nếu thay tham số ước lượng vào công thức tiệm cận: đã viện dẫn Slutsky chưa?

## Tham khảo
- Wasserman — *All of Statistics*, Ch.5: https://link.springer.com/book/10.1007/978-0-387-21736-9
- Wikipedia — *Convergence of random variables*: https://en.wikipedia.org/wiki/Convergence_of_random_variables
- Wikipedia — *Slutsky's theorem*: https://en.wikipedia.org/wiki/Slutsky%27s_theorem
- Wikipedia — *Delta method*: https://en.wikipedia.org/wiki/Delta_method

## Liên kết
[[Law of Large Numbers]] · [[Central Limit Theorem]] · [[Concentration Inequalities]] · [[Estimator Quality]] · [[Prob&Stats]]
