---
tags: [math, calculus, transcendental]
status: evergreen
---
# The Exponential Function

> Hàm duy nhất bằng chính đạo hàm của nó. Tính chất đó không phải một sự thật thú vị bên lề — nó là **định nghĩa** của $e^x$ theo nghĩa hữu dụng, và là lý do $e$ xuất hiện ở mọi mô hình tăng trưởng.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"55) Derivative of e^x and it's Proof 5:02:19"* trong seed.

## 1. Định nghĩa và chứng minh đạo hàm

$e^x$ := hàm **ngược** của $\ln x$ ([[The Natural Logarithm]]). Tức $y=e^x \iff \ln y = x$.

**Chứng minh $(e^x)'=e^x$** bằng [[Implicit Differentiation]]:
$$\ln y = x \xrightarrow{d/dx} \frac{1}{y}\cdot y' = 1 \Rightarrow y' = y = e^x \quad ∎$$

Ba dòng. Đây là lý do định nghĩa $\ln$ trước lại tiện: mọi thứ về $e^x$ rơi ra từ tính chất hàm ngược.

**Với chain rule:** $\left(e^{g(x)}\right)' = e^{g(x)}g'(x)$, $\int e^{g}g'\,dx = e^{g}+C$.

## 2. Bốn định nghĩa tương đương của $e$

| Định nghĩa | Biểu thức |
|---|---|
| Qua $\ln$ | số duy nhất với $\int_1^e\frac{dt}t = 1$ |
| Giới hạn lãi kép | $e=\lim_{n\to\infty}\left(1+\frac1n\right)^n$ |
| Chuỗi | $e=\sum_{k=0}^\infty\frac1{k!} = 1+1+\frac12+\frac16+\cdots$ |
| Phương trình vi phân | nghiệm duy nhất của $y'=y$, $y(0)=1$ |

$e \approx 2.718281828\ldots$, vô tỉ và **siêu việt**.

Giới hạn lãi kép là gốc lịch sử (Bernoulli, bài toán lãi suất): gộp lãi càng thường xuyên thì $\left(1+\frac rn\right)^{nt}\to e^{rt}$ — **lãi kép liên tục**. Đây là chỗ $e$ vào tài chính và là nền của discount factor trong [[No-Arbitrage and Pricing Measure]].

Chuỗi hội tụ cực nhanh ($10$ số hạng cho $7$ chữ số) — cách máy tính thật sự tính $e^x$.

## 3. Tính chất

| | |
|---|---|
| $e^{a+b}=e^ae^b$ | $e^{-x}=1/e^x$ |
| $e^{\ln x}=x$ ($x>0$) | $\ln(e^x)=x$ (mọi $x$) |
| $e^x>0$ **luôn** | range $(0,\infty)$, miền $\mathbb{R}$ |
| tăng nghiêm ngặt, lõm lên | $(e^x)''=e^x>0$ |
| $\lim_{x\to\infty}e^x=\infty$ | $\lim_{x\to-\infty}e^x=0$ (tiệm cận ngang $y=0$) |

**Tăng trưởng vượt trội:** $\lim_{x\to\infty}\frac{e^x}{x^p}=\infty$ với **mọi** $p$. Hàm mũ thắng mọi đa thức. → [[Infinite Limits and Asymptotes]], [[Asymptotic Notation]]

## 4. Phương trình vi phân $y'=ky$

$$y' = ky \iff y = Ce^{kt}, \qquad C=y(0)$$

**Chứng minh duy nhất:** xét $g(t)=y(t)e^{-kt}$. Thì $g'=y'e^{-kt}-ky e^{-kt}=(y'-ky)e^{-kt}=0$ ⟹ $g$ hằng ([[Mean Value Theorem]]). ∎

Đọc thành lời: *"tốc độ thay đổi tỉ lệ với lượng hiện có"*. Mọi mô hình sau đều là phương trình này:

| Hiện tượng | $k$ |
|---|---|
| Tăng trưởng dân số | $>0$ |
| Phân rã phóng xạ | $<0$, chu kỳ bán rã $=\frac{\ln2}{\vert k\vert}$ |
| Lãi kép liên tục | lãi suất |
| Định luật nguội Newton | $<0$ → Physics |
| Nồng độ thuốc | $<0$ |

**Chu kỳ bán rã $=\frac{\ln 2}{|k|}$** đáng thuộc — $\ln 2 \approx 0.693$, nguồn của "quy tắc 72" trong tài chính: vốn nhân đôi sau $\approx 72/r\%$ năm.

## 5. Hàm liên quan

$$\sinh x = \frac{e^x-e^{-x}}2,\qquad \cosh x = \frac{e^x+e^{-x}}2$$
$$(\sinh)'=\cosh,\quad (\cosh)'=\sinh,\quad \cosh^2-\sinh^2=1$$

Không dấu trừ như lượng giác thường. $\cosh$ là hình dạng dây xích treo (catenary).

**Công thức Euler** (ngoài Calculus 1 nhưng đáng biết): $e^{ix}=\cos x + i\sin x$, cho $e^{i\pi}+1=0$. Nó nối hàm mũ với lượng giác và giải thích vì sao cả hai đều xuất hiện trong nghiệm của phương trình vi phân tuyến tính — và trong [[Eigenvalues and Eigenvectors]] khi eigenvalue là số phức.

## 6. Cạm bẫy

1. **$(e^x)'=xe^{x-1}$.** Nhầm hàm mũ với hàm lũy thừa. Cơ số cố định thì dùng công thức mũ.
2. **$e^{a+b}=e^a+e^b$.** Sai.
3. **$e^{\ln x}=x$ quên điều kiện $x>0$.**
4. **$(e^{x^2})' = e^{x^2}$** — quên [[Chain Rule]], thiếu $2x$.
5. **Nhầm $e^{-x}$ với $-e^x$.** Cái đầu luôn dương.
6. **Coi $e^x$ và $x^e$ như nhau.**
7. **Quên $e^x>0$** khi giải bất phương trình — chia cho $e^x$ **không** đổi chiều bất đẳng thức.
8. **Dùng lãi kép rời rạc khi đề nói "liên tục"** (hoặc ngược lại).

## 7. Checklist áp dụng
- [ ] Cơ số cố định hay biến? ($e^x$ vs $x^e$ vs $x^x$)
- [ ] Số mũ có phải hàm không → đã nhân $g'(x)$ chưa?
- [ ] Nếu là bài tăng trưởng/phân rã: đã nhận ra dạng $y'=ky$ chưa?
- [ ] $k$ dương hay âm? Có khớp với "tăng" / "giảm" trong đề không?
- [ ] Điều kiện đầu $y(0)$ đã dùng để tìm $C$ chưa?
- [ ] Lãi kép rời rạc hay liên tục?
- [ ] Nếu giải bất phương trình: có nhớ $e^x>0$ nên không đổi chiều không?
- [ ] Đơn vị của $k$ có khớp với đơn vị thời gian không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §6.2, §6.4, §9.4: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 55 (5:02:19): https://www.youtube.com/watch?v=G-ti56DEXE8
- 3Blue1Brown — *What's so special about Euler's number e?*: https://www.3blue1brown.com/lessons/eulers-number
- Wikipedia — *e (mathematical constant)*: https://en.wikipedia.org/wiki/E_(mathematical_constant)

## Liên kết
[[The Natural Logarithm]] · [[Bases Other Than e]] · [[Chain Rule]] · [[Antiderivatives]] · [[Asymptotic Notation]] · [[Math]]
