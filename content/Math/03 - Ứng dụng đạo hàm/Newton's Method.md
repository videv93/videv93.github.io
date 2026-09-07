---
tags: [math, calculus, numerical]
status: evergreen
---
# Newton's Method

> Thuật toán tìm nghiệm nhanh nhất trong Calculus 1 — hội tụ **bậc hai**, số chữ số đúng gấp đôi mỗi vòng. Cũng là thuật toán dễ gãy nhất, và biết nó gãy khi nào quan trọng hơn biết công thức.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"38) Newton's Method 3:17:16"* trong seed.

## 1. Công thức và ý tưởng

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

**Suy ra:** thay $f$ bằng tiếp tuyến tại $x_n$ (xấp xỉ tuyến tính của [[Differentials and Linear Approximation]]), rồi lấy giao điểm của tiếp tuyến với trục hoành:
$$0 = f(x_n) + f'(x_n)(x-x_n) \Rightarrow x = x_n - \frac{f(x_n)}{f'(x_n)}$$

Lặp lại: mỗi vòng thay bài toán phi tuyến bằng một bài toán tuyến tính.

## 2. Tốc độ hội tụ

| Phương pháp | Bậc | Sai số mỗi vòng | Cần |
|---|---|---|---|
| Bisection ([[Intermediate Value Theorem]]) | tuyến tính | $\varepsilon \to \varepsilon/2$ | chỉ liên tục + đổi dấu |
| Newton | **bậc hai** | $\varepsilon \to C\varepsilon^2$ | $f'$, và điểm đầu tốt |
| Secant | $\approx 1.618$ | — | không cần $f'$ |

Bậc hai nghĩa là: sai số $10^{-2}$ → $10^{-4}$ → $10^{-8}$ → $10^{-16}$. **Bốn vòng** là đủ độ chính xác double precision — nếu nó hội tụ.

Điều kiện đủ để hội tụ: $f$ khả vi hai lần, $f'(r)\ne0$ tại nghiệm $r$, và $x_0$ **đủ gần** $r$. Chữ "đủ gần" là toàn bộ vấn đề.

## 3. Bốn kiểu gãy

| Kiểu | Nguyên nhân | Ví dụ |
|---|---|---|
| **Chia cho 0** | $f'(x_n)=0$ | $x_0$ rơi đúng cực trị |
| **Phân kỳ** | $x_0$ quá xa | $f(x)=\arctan x$, $\vert x_0\vert$ lớn |
| **Chu trình** | lặp qua lại vô hạn | $f(x)=x^3-2x+2$ với $x_0=0$ ($0\to1\to0\to\cdots$) |
| **Hội tụ chậm** | nghiệm bội ($f'(r)=0$) | $f(x)=x^2$ — chỉ còn tuyến tính |

Với nghiệm bội $m$, công thức sửa: $x_{n+1}=x_n - m\frac{f(x_n)}{f'(x_n)}$ khôi phục bậc hai.

**Chiến lược thực dụng:** dùng bisection vài vòng để vào gần, rồi chuyển sang Newton. Đó là cách các thư viện số thật (Brent's method) làm.

## 4. Quy trình

1. Vẽ hoặc dùng [[Intermediate Value Theorem]] để **định vị** nghiệm.
2. Chọn $x_0$ trong khoảng đó, tránh chỗ $f'\approx0$.
3. Tính $f$ và $f'$ **dạng ký hiệu** trước.
4. Lặp, giữ đủ chữ số thập phân (Newton khuếch đại sai số làm tròn ở vòng đầu).
5. **Dừng khi** $|x_{n+1}-x_n| < $ ngưỡng, **và** kiểm $|f(x_{n+1})|$ nhỏ.
6. Kiểm nghiệm tìm được có phải nghiệm mình muốn không (hàm nhiều nghiệm).

**Ví dụ — tính $\sqrt2$:** $f(x)=x^2-2$, $f'=2x$:
$$x_{n+1}=x_n-\frac{x_n^2-2}{2x_n}=\frac12\left(x_n+\frac2{x_n}\right)$$
Từ $x_0=1$: $1.5$, $1.41\overline{6}$, $1.414215\ldots$ — ba vòng, sáu chữ số đúng. Đây chính là thuật toán Babylon, có trước Newton hai nghìn năm.

## 5. Newton ngoài Calculus 1

- **Tối ưu:** tìm nghiệm của $f'(x)=0$ ⟹ $x_{n+1}=x_n-\frac{f'(x_n)}{f''(x_n)}$. Đây là Newton's method for optimization — nền của các thuật toán bậc hai trong [[ML]].
- **Nhiều chiều:** $\mathbf{x}_{n+1}=\mathbf{x}_n - J^{-1}\mathbf{f}(\mathbf{x}_n)$ với $J$ là Jacobian — cần giải hệ tuyến tính mỗi vòng ([[Systems of Linear Equations]]).
- **Tài chính:** tính implied volatility từ giá quyền chọn là bài toán Newton kinh điển → [[Quant]].

## 6. Cạm bẫy

1. **Không kiểm $f'(x_n)\ne0$** trước khi chia.
2. **Chọn $x_0$ tùy tiện.** Vẽ đồ thị trước, luôn luôn.
3. **Dừng chỉ dựa trên $\vert x_{n+1}-x_n\vert$.** Với hàm rất phẳng, hai lần lặp gần nhau mà vẫn xa nghiệm. Kiểm cả $|f|$.
4. **Làm tròn quá sớm.** Hội tụ bậc hai bị vô hiệu nếu mỗi vòng chỉ giữ 4 chữ số.
5. **Giả định hội tụ.** Không có bảo đảm toàn cục. Đặt giới hạn số vòng lặp.
6. **Nhầm nghiệm.** Với hàm nhiều nghiệm, $x_0$ khác nhau ra nghiệm khác nhau (fractal Newton).
7. **Dùng Newton cho hàm không khả vi.**

## 7. Checklist áp dụng
- [ ] Đã định vị nghiệm bằng đồ thị hoặc IVT chưa?
- [ ] $x_0$ có nằm gần nghiệm và tránh chỗ $f'\approx0$ không?
- [ ] Đã viết $f'$ dạng ký hiệu (không phải xấp xỉ số) chưa?
- [ ] Có kiểm $f'(x_n)\ne0$ ở mỗi vòng không?
- [ ] Tiêu chí dừng có gồm **cả** $\vert\Delta x\vert$ **và** $\vert f(x)\vert$ không?
- [ ] Có giới hạn số vòng lặp để tránh chu trình vô hạn không?
- [ ] Nghiệm tìm được có phải nghiệm **mình cần** không?
- [ ] Nếu hội tụ chậm bất thường — có phải nghiệm bội không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §4.8: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 38 (3:17:16): https://www.youtube.com/watch?v=G-ti56DEXE8
- Wikipedia — *Newton's method* (mục failure analysis): https://en.wikipedia.org/wiki/Newton%27s_method
- Burden & Faires — *Numerical Analysis*, ch. 2: https://www.cengage.com/c/numerical-analysis-10e-burden

## Liên kết
[[Differentials and Linear Approximation]] · [[Intermediate Value Theorem]] · [[Critical Numbers and Extrema]] · [[Systems of Linear Equations]] · [[Numerical Integration]] · [[Math]]
