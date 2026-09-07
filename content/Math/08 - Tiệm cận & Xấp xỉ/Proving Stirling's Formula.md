---
tags: [math, asymptotics, proof]
status: evergreen
---
# Proving Stirling's Formula

> Bốn đường chứng minh, bốn mức công cụ. Seed chứa **sáu nguồn khác nhau** cho cùng một công thức — không phải thừa: mỗi nguồn dùng một kỹ thuật, và biết cả bốn cho bạn bốn công cụ chứ không phải một kết quả.

> [!note] Ghi chú nguồn
> Từ `stirling formular - Google Search.md`. Seed liệt kê Conrad (UConn, Wallis), arXiv 2310.04872 (*"An Elementary Proof"* — Smolík 2023, nêu rõ *"Many well-known proofs of this formula are grounded in integral calculus"*), Terry Tao (254A Notes 0a, Laplace), Brilliant, HyperPhysics (bản vật lý, thô nhất). Note này đối chiếu chúng.

## 1. Bảng bốn đường

| Đường | Công cụ | Cho ra | Nguồn trong seed |
|---|---|---|---|
| **A. Xấp xỉ tổng bằng tích phân** | $\int\ln x\,dx$ | $\ln n!\approx n\ln n-n$ — **thiếu hằng số** | HyperPhysics |
| **B. Euler–Maclaurin** | công thức tổng–tích phân | thêm $\frac12\ln n$, hằng số vẫn chưa xác định | Conrad |
| **C. Tích Wallis** | $\prod$ Wallis | **xác định hằng số** $=\sqrt{2\pi}$ | Conrad, Brilliant |
| **D. Phương pháp Laplace** | $\Gamma(n+1)=\int_0^\infty t^ne^{-t}dt$ | toàn bộ công thức trong một lần | Tao |

Đường A+B+C là con đường sơ cấp cổ điển. Đường D là con đường "một phát ăn ngay" nhưng cần giải tích tiệm cận.

## 2. Đường A — bậc dẫn đầu

$$\ln n! = \sum_{k=1}^n \ln k \approx \int_1^n \ln x\,dx = \big[x\ln x - x\big]_1^n = n\ln n - n + 1$$

Nguyên hàm $\int\ln x\,dx = x\ln x - x$ suy bằng tích phân từng phần. → [[The Natural Logarithm]]

Đây là toàn bộ bản HyperPhysics — bản dùng trong vật lý thống kê, nơi $\ln\Omega$ có thêm thừa số $N\sim10^{23}$ nên mọi thứ dưới bậc $n\ln n$ đều bỏ được.

**Thiếu gì:** so tổng với tích phân bằng hình thang cho ra thêm $\frac12\ln n$, và hằng số thì đường này không xác định được.

## 3. Đường B — Euler–Maclaurin

Công thức Euler–Maclaurin nối tổng với tích phân chính xác đến mọi bậc:
$$\sum_{k=1}^n f(k) = \int_1^n f + \frac{f(1)+f(n)}2 + \sum_{j}\frac{B_{2j}}{(2j)!}\big[f^{(2j-1)}\big]_1^n + R$$

Áp cho $f=\ln$:
$$\ln n! = n\ln n - n + \tfrac12\ln n + C + \frac{1}{12n}-\frac1{360n^3}+\cdots$$

Số hạng $\frac1{12n}$ — nguồn của quy tắc "sai số $\approx\frac1{12n}$" ở [[Stirling's Approximation]] — rơi ra ngay từ đây, với $B_2=\frac16$.

**Vẫn thiếu:** hằng số $C$. Euler–Maclaurin cho biết $C$ **tồn tại** (dãy $\ln n! - n\ln n + n - \frac12\ln n$ hội tụ) nhưng không cho giá trị.

Chứng minh $C$ tồn tại: dãy đó **đơn điệu giảm và bị chặn dưới** — dùng [[Mean Value Theorem]] để chặn từng số hạng. Đây là kiểu lập luận điển hình của real analysis.

## 4. Đường C — tích Wallis xác định hằng số

Tích Wallis:
$$\frac\pi2 = \prod_{k=1}^\infty \frac{2k}{2k-1}\cdot\frac{2k}{2k+1} = \lim_{n\to\infty}\frac{1}{2n+1}\left[\frac{(2n)!!}{(2n-1)!!}\right]^2$$

suy ra từ $I_n=\int_0^{\pi/2}\sin^n x\,dx$ với công thức truy hồi (tích phân từng phần).

Viết lại theo giai thừa và thế $n!\approx Ce^{-n}n^{n+1/2}$ vào cả hai vế. Các luỹ thừa triệt tiêu, còn lại một phương trình cho $C$:
$$C = \sqrt{2\pi}$$

**Đây là chỗ $\pi$ vào công thức.** Nó không đến từ giai thừa — nó đến từ **tích phân của $\sin^n$**, tức từ hình học tròn.

Seed ghi Conrad tóm tắt đúng đường này: *"First take the log of n!… This will be done via Wallis formula (and Wallis integrals). This completes the proof of Stirling's formula."*

## 5. Đường D — phương pháp Laplace

Xuất phát từ biểu diễn tích phân của Gamma:
$$n! = \Gamma(n+1)=\int_0^\infty t^ne^{-t}\,dt = \int_0^\infty e^{n\ln t - t}\,dt$$

Số mũ $\varphi(t)=n\ln t - t$ có cực đại tại $\varphi'(t)=\frac nt - 1=0$, tức $t=n$ ([[Critical Numbers and Extrema]]). Ở đó $\varphi(n)=n\ln n - n$ và $\varphi''(n)=-\frac1n$.

Khai triển Taylor quanh đỉnh và đặt $t = n+\sqrt n\,u$:
$$n!\approx e^{n\ln n-n}\int_{-\infty}^\infty e^{-u^2/2}\sqrt n\,du = \left(\frac ne\right)^n\sqrt n\cdot\sqrt{2\pi}$$

vì $\int e^{-u^2/2}du=\sqrt{2\pi}$ (tích phân Gauss).

**Ba số hạng, ba nguồn gốc:**

| Thừa số | Đến từ |
|---|---|
| $(n/e)^n$ | **giá trị** của $\varphi$ tại đỉnh |
| $\sqrt n$ | **độ rộng** của đỉnh, $1/\sqrt{\vert\varphi''\vert}$ |
| $\sqrt{2\pi}$ | **tích phân Gauss** |

Đường này trả lời câu hỏi của Tao trong seed — $\pi$ và $e$ ở đâu ra — rõ ràng nhất: $e$ từ đỉnh, $\pi$ từ dạng Gaussian của đỉnh.

Nó cũng cho thấy vì sao Stirling và **định lý giới hạn trung tâm** là họ hàng: cả hai đều là "xấp xỉ đỉnh bằng Gaussian". → [[Prob&Stats]]

## 6. Nên đọc đường nào

| Mục tiêu | Đọc |
|---|---|
| Chỉ cần bậc dẫn đầu, vật lý thống kê | A (HyperPhysics) |
| Cần chứng minh sơ cấp, không dùng giải tích phức | arXiv 2310.04872 |
| Cần đầy đủ chi tiết, trình độ đại học | Conrad (8 trang, B+C) |
| Muốn hiểu **vì sao** có $\pi$ và $e$ | Tao (D) |
| Cần chuỗi hiệu chỉnh mọi bậc | Euler–Maclaurin (B) |

## 7. Cạm bẫy

1. **Nghĩ đường A là chứng minh đầy đủ.** Nó không xác định được hằng số, và bỏ mất $\frac12\ln n$.
2. **Nghĩ hằng số "rõ ràng là" $1$** vì $\int_1^n$ cho số hạng $+1$. Hoàn toàn không — nó là $\ln\sqrt{2\pi}\approx0.919$.
3. **Cộng vô hạn số hạng Euler–Maclaurin.** Chuỗi phân kỳ — xem [[Stirling's Approximation]] cạm bẫy 4.
4. **Dùng Laplace mà quên đổi biến chia $\sqrt n$.** Bỏ mất chính thừa số $\sqrt n$ cần tìm.
5. **Trộn hai đường giữa chừng.** Mỗi đường có bộ ký hiệu và chuẩn hoá riêng.
6. **Quên kiểm giả thiết hội tụ** khi đổi thứ tự giới hạn và tích phân trong đường D.
7. **Trích "Stirling's formula" mà không nói dạng nào.** → [[Asymptotic Notation]]

## 8. Checklist áp dụng
- [ ] Cần bậc dẫn đầu hay cần hằng số chính xác?
- [ ] Nếu cần hằng số — đã có bước Wallis (C) hoặc Laplace (D) chưa?
- [ ] Nếu dùng Euler–Maclaurin: cắt ở số hạng nào? Sai số bậc mấy?
- [ ] Nếu dùng Laplace: đã tìm đúng cực đại của số mũ chưa? $\varphi''$ ở đó bằng bao nhiêu?
- [ ] Đổi biến đã đúng thang $\sqrt n$ chưa?
- [ ] Kết quả có khớp bảng số ở [[Stirling's Approximation]] không? (kiểm với $n=10$)
- [ ] Đang cần **chứng minh** hay chỉ cần **dùng**? (nếu chỉ dùng thì note kia đủ)

## Tham khảo
- Keith Conrad — *Stirling's Formula* (đường B + C, 8 trang): https://kconrad.math.uconn.edu/blurbs/analysis/stirling.pdf
- Smolík (2023) — *An Elementary Proof of Stirling's Formula*, arXiv:2310.04872: https://arxiv.org/abs/2310.04872
- Terence Tao — *254A Notes 0a: Stirling's formula* (đường D, Laplace): https://terrytao.wordpress.com/2010/01/02/254a-notes-0a-stirlings-formula/
- Brilliant — *Stirling's Formula*: https://brilliant.org/wiki/stirlings-formula/
- Wikipedia — *Wallis product*: https://en.wikipedia.org/wiki/Wallis_product
- Wikipedia — *Laplace's method*: https://en.wikipedia.org/wiki/Laplace%27s_method

## Liên kết
[[Stirling's Approximation]] · [[Asymptotic Notation]] · [[The Natural Logarithm]] · [[Critical Numbers and Extrema]] · [[Proof Techniques]] · [[Math]]
