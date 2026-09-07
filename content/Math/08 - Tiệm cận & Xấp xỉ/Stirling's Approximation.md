---
tags: [math, asymptotics, combinatorics]
status: evergreen
---
# Stirling's Approximation

> $n! \sim \sqrt{2\pi n}\,(n/e)^n$. Công thức biến giai thừa — thứ không tính nổi và không giải tích được — thành một biểu thức trơn, khả vi, và **cực kỳ chính xác** ngay cả với $n$ nhỏ.

> [!note] Ghi chú nguồn
> Từ seed `stirling formular - Google Search.md` — một clipping kết quả tìm kiếm với bảy nguồn: Wikipedia, Wolfram MathWorld, Keith Conrad (UConn), arXiv 2310.04872, Terence Tao (254A Notes 0a), Brilliant, HyperPhysics. Toàn bộ seed là **một khái niệm và bảy đường vào nó**; note này hệ thống hoá khái niệm, note [[Proving Stirling's Formula]] hệ thống hoá các đường chứng minh.

## 1. Ba dạng phát biểu

**Dạng tích (dạng thường dùng):**
$$\boxed{n! \sim \sqrt{2\pi n}\left(\frac ne\right)^n}$$

**Dạng log thô** (Wikipedia trong seed):
$$\ln n! = n\ln n - n + O(\ln n)$$

**Dạng log đầy đủ** (Conrad trong seed):
$$\ln n! = n\ln n - n + \tfrac12\ln n + \tfrac12\ln(2\pi) + \varepsilon_n, \qquad \varepsilon_n\to0$$

> [!warning] Ba dạng **không** tương đương
> Dạng log thô yếu hơn hẳn: nó vứt cả $\frac12\ln n$ lẫn $\frac12\ln 2\pi$ vào $O(\ln n)$. Mũ hoá nó **không** ra dạng tích — vì $\sim$ không mũ hoá được ([[Asymptotic Notation]] mục 3). Chỉ dạng thứ ba mới tương đương với dạng tích.
>
> Khi tra cứu, phải biết mình đang cần dạng nào. Cho độ phức tạp thuật toán, dạng thô đủ. Cho xác suất và vật lý thống kê, cần dạng đầy đủ vì thừa số $\sqrt{2\pi n}$ chính là thứ mang thông tin.

## 2. Độ chính xác

| $n$ | $n!$ | Stirling | Sai số tương đối |
|---|---|---|---|
| $1$ | $1$ | $0.9221$ | $7.8\%$ |
| $5$ | $120$ | $118.02$ | $1.65\%$ |
| $10$ | $3\,628\,800$ | $3\,598\,696$ | $0.83\%$ |
| $100$ | — | — | $0.083\%$ |
| $1000$ | — | — | $0.0083\%$ |

Sai số tương đối $\approx \frac1{12n}$ — giảm tuyến tính, và đã dưới $1\%$ từ $n=10$. Đây là một xấp xỉ tiệm cận **hiếm khi tốt sớm đến thế**.

**Chuỗi hiệu chỉnh** (chuỗi tiệm cận, phân kỳ nhưng hữu dụng):
$$n! = \sqrt{2\pi n}\left(\frac ne\right)^n\left(1+\frac1{12n}+\frac1{288n^2}-\frac{139}{51840n^3}-\cdots\right)$$

**Chặn hai phía chặt** (Robbins):
$$\sqrt{2\pi n}\left(\frac ne\right)^ne^{\frac1{12n+1}} < n! < \sqrt{2\pi n}\left(\frac ne\right)^ne^{\frac1{12n}}$$
Bất đẳng thức này dùng được trong chứng minh, khác với dấu $\sim$ chỉ dùng được ở giới hạn.

## 3. Mở rộng cho hàm Gamma

Wolfram MathWorld trong seed nêu: Stirling áp cho cả hàm Gamma, không chỉ số nguyên.
$$\Gamma(z) \sim \sqrt{\frac{2\pi}{z}}\left(\frac ze\right)^z, \qquad \Gamma(n)=(n-1)!$$

Đây là lý do Stirling quan trọng hơn một mẹo tính giai thừa: nó cho **dáng điệu của $\Gamma$**, hàm nội suy liên tục của giai thừa, và do đó xuất hiện trong phân phối Gamma, Beta, chi-bình phương. → [[Prob&Stats]]

## 4. Vì sao $\sqrt{2\pi n}$ — và $\pi$ ở đâu ra

Terry Tao trong seed đặt đúng câu hỏi này: *"there are two constants involved in it: $\pi$ and $e$."*

- **$e$** đến từ $\int\ln x\,dx = x\ln x - x$ — xấp xỉ tổng bằng tích phân. → [[The Natural Logarithm]]
- **$\pi$** đến từ tích phân Gauss $\int_{-\infty}^\infty e^{-t^2/2}dt=\sqrt{2\pi}$, xuất hiện khi xấp xỉ đỉnh của hàm dưới dấu tích phân bằng một Gaussian (phương pháp Laplace).

Nói cách khác, $\sqrt{2\pi n}$ là **chiều rộng của đỉnh Gaussian**, và đó là lý do Stirling và định lý giới hạn trung tâm là hai mặt của cùng một hiện tượng. Chi tiết ở [[Proving Stirling's Formula]].

## 5. Dùng ở đâu

| Lĩnh vực | Dùng làm gì |
|---|---|
| **Tổ hợp** | $\binom{2n}{n}\sim\dfrac{4^n}{\sqrt{\pi n}}$ — hệ số nhị thức trung tâm |
| **Xác suất** | xấp xỉ nhị thức bằng chuẩn; chứng minh CLT cho biến Bernoulli → [[Prob&Stats]] |
| **Vật lý thống kê** | $\ln\Omega$ trong entropy Boltzmann; công thức Sackur–Tetrode → Physics |
| **Lý thuyết thông tin** | entropy nhị phân: $\binom{n}{pn}\approx 2^{nH(p)}$ |
| **Thuật toán** | $\log(n!) = \Theta(n\log n)$ — chặn dưới cho sắp xếp so sánh → [[DS&AL]] |
| **Tính toán số** | tính $\ln n!$ mà không tràn số |

**Chặn dưới sắp xếp:** cây quyết định phân biệt $n!$ hoán vị cần độ sâu $\ge\log_2 n! = \Theta(n\log n)$. Không thuật toán so sánh nào nhanh hơn — và Stirling là bước duy nhất trong chứng minh đó.

**Hệ số nhị thức trung tâm:** áp Stirling ba lần vào $\frac{(2n)!}{(n!)^2}$, các thừa số $e$ triệt tiêu, còn $\frac{4^n}{\sqrt{\pi n}}$. Đây là nguồn của mọi $\frac1{\sqrt n}$ trong random walk.

## 6. Cạm bẫy

1. **Trộn ba dạng phát biểu.** Cảnh báo mục 1.
2. **Bỏ thừa số $\sqrt{2\pi n}$.** Sai số tương đối trở thành vô hạn. Chỉ bỏ được khi lấy log **và** chỉ cần bậc dẫn đầu.
3. **Dùng cho $n$ rất nhỏ mà cần độ chính xác cao.** $n=1$ sai $7.8\%$.
4. **Cộng thêm số hạng của chuỗi hiệu chỉnh vô hạn.** Chuỗi **phân kỳ** — thêm quá $\approx 2\pi n$ số hạng thì sai số **tăng** trở lại. Đây là bản chất của chuỗi tiệm cận.
5. **Áp cho $\Gamma$ với sai chỉ số.** $\Gamma(n)=(n-1)!$, không phải $n!$.
6. **Tính $n!$ trực tiếp rồi lấy log.** Tràn số với $n>170$ ở double. Tính $\ln n!$ bằng Stirling hoặc `lgamma`.
7. **Nghĩ Stirling là đẳng thức.** Nó là quan hệ tiệm cận; muốn bất đẳng thức thì dùng chặn Robbins.

## 7. Checklist áp dụng
- [ ] Cần dạng tích, dạng log thô, hay dạng log đầy đủ?
- [ ] $n$ của bài toán bằng bao nhiêu? Sai số $\approx\frac1{12n}$ có chấp nhận được không?
- [ ] Có cần thừa số $\sqrt{2\pi n}$ không? (cần nếu kết quả cuối là một tỉ số hoặc một xác suất)
- [ ] Cần **quan hệ tiệm cận** hay cần **bất đẳng thức**? (nếu bất đẳng thức → dùng chặn Robbins)
- [ ] Đối tượng là $n!$ hay $\Gamma(n)$? (lệch một chỉ số)
- [ ] Nếu áp nhiều lần (như $\binom{2n}{n}$) — các thừa số có triệt tiêu đúng không?
- [ ] Trong code: có dùng `lgamma` thay vì tính giai thừa rồi lấy log không?
- [ ] Đã kiểm bằng số với một $n$ cụ thể chưa?

## Tham khảo
- Wikipedia — *Stirling's approximation*: https://en.wikipedia.org/wiki/Stirling%27s_approximation
- Wolfram MathWorld — *Stirling's Approximation*: https://mathworld.wolfram.com/StirlingsApproximation.html
- Keith Conrad — *Stirling's Formula* (PDF, 8 trang): https://kconrad.math.uconn.edu/blurbs/analysis/stirling.pdf
- Terence Tao — *254A Notes 0a: Stirling's formula*: https://terrytao.wordpress.com/2010/01/02/254a-notes-0a-stirlings-formula/
- Brilliant — *Stirling's Formula*: https://brilliant.org/wiki/stirlings-formula/
- HyperPhysics — *Stirling's Approximation for n!*: http://hyperphysics.phy-astr.gsu.edu/hbase/Math/stirling.html

## Liên kết
[[Proving Stirling's Formula]] · [[Asymptotic Notation]] · [[Summation Formulas]] · [[The Natural Logarithm]] · [[Prob&Stats]] · [[Math]]
