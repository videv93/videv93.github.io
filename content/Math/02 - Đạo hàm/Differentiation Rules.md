---
tags: [math, calculus, derivative, reference]
status: evergreen
---
# Differentiation Rules

> Bảng tra. Mỗi công thức ở đây đều suy ra được từ [[Derivative Definition]] — và biết suy ra được ít nhất một lần là khác biệt giữa thuộc và hiểu.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"18) Derivative Formulas 1:15:39"* và *"19) More Derivative Formulas 1:23:11"*.

## 1. Quy tắc cấu trúc

| Quy tắc | Công thức | Ghi chú |
|---|---|---|
| Hằng | $(c)' = 0$ | |
| Hằng nhân | $(cf)' = cf'$ | |
| Tổng / hiệu | $(f\pm g)' = f'\pm g'$ | đạo hàm là toán tử **tuyến tính** |
| Lũy thừa | $(x^n)' = nx^{n-1}$ | đúng với **mọi** $n$ thực |
| Tích | $(fg)' = f'g + fg'$ | → [[Product and Quotient Rule]] |
| Thương | $\left(\frac fg\right)' = \frac{f'g-fg'}{g^2}$ | → [[Product and Quotient Rule]] |
| Hợp | $[f(g(x))]' = f'(g(x))\,g'(x)$ | → [[Chain Rule]] |

> [!warning] $(fg)' \ne f'g'$
> Sai lầm số một trong Calculus 1. Kiểm nhanh: $f=g=x$. Vế trái $(x^2)'=2x$; vế sai $1\cdot1=1$.

## 2. Bảng hàm cơ bản

| $f(x)$ | $f'(x)$ |
|---|---|
| $x^n$ | $nx^{n-1}$ |
| $\sqrt x = x^{1/2}$ | $\frac1{2\sqrt x}$ |
| $\frac1x = x^{-1}$ | $-\frac1{x^2}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x\tan x$ |
| $\csc x$ | $-\csc x\cot x$ |
| $e^x$ | $e^x$ |
| $a^x$ | $a^x\ln a$ |
| $\ln x$ | $\frac1x$ |
| $\log_a x$ | $\frac1{x\ln a}$ |
| $\arcsin x$ | $\frac1{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\frac1{1+x^2}$ |

**Mẹo nhớ:** mọi hàm "co-" ($\cos$, $\cot$, $\csc$) có đạo hàm mang **dấu trừ**. $e^x$ và $\ln x$ được chứng minh ở [[The Exponential Function]] và [[The Natural Logarithm]]; $a^x$ và $\log_a$ ở [[Bases Other Than e]].

## 3. Ba công thức đáng tự suy lại

**$(x^n)'$ — khai triển nhị thức**
$$\frac{(x+h)^n-x^n}{h}=\frac{nx^{n-1}h + \binom n2 x^{n-2}h^2+\cdots}{h}=nx^{n-1}+O(h)\to nx^{n-1}$$

**$(\sin x)'$ — công thức cộng + [[Trigonometric Limits]]**
$$\frac{\sin(x+h)-\sin x}{h}=\sin x\cdot\frac{\cos h - 1}{h} + \cos x\cdot\frac{\sin h}{h} \to \sin x\cdot 0 + \cos x\cdot 1 = \cos x$$
Đây là chỗ hai giới hạn lượng giác *được dùng để làm gì*.

**$(\tan x)'$ — quy tắc thương**
$$\left(\frac{\sin x}{\cos x}\right)' = \frac{\cos^2x+\sin^2x}{\cos^2 x}=\frac1{\cos^2x}=\sec^2 x$$

## 4. Quy trình đọc biểu thức

Nhìn biểu thức từ **ngoài vào trong**, xác định phép toán ngoài cùng:

| Ngoài cùng là | Dùng |
|---|---|
| Tổng/hiệu | tách ra, làm từng hạng tử |
| Tích hai hàm đều chứa $x$ | quy tắc tích |
| Phân thức | quy tắc thương (hoặc viết thành tích với lũy thừa âm) |
| Hàm lồng trong hàm | chain rule |
| Hằng nhân hàm | kéo hằng ra ngoài |

$\frac{d}{dx}\big[x^2\sin(3x)\big]$: ngoài cùng là **tích** → $2x\sin(3x) + x^2\cdot 3\cos(3x)$ (dùng chain rule cho $\sin 3x$).

## 5. Cạm bẫy

1. **$(fg)'=f'g'$ và $(f/g)'=f'/g'$.** Cả hai đều sai.
2. **Quên chain rule khi đối số không phải $x$.** $(\sin 3x)'=3\cos3x$, không phải $\cos 3x$.
3. **$(x^n)'$ áp cho $n$ là biến.** $(x^x)'\ne x\cdot x^{x-1}$ — phải dùng logarithmic differentiation.
4. **$(e^x)' = xe^{x-1}$.** Sai — $e^x$ là hàm mũ, không phải lũy thừa. Cơ số cố định, số mũ biến.
5. **Sai dấu ở $\cos$, $\cot$, $\csc$.**
6. **Quên $\ln a$ ở $a^x$ và $\log_a x$.**
7. **Đạo hàm từng phần của phân thức.** $\left(\frac{x^2+1}{x}\right)'\ne\frac{2x}{1}$ — chia ra trước ($x + \frac1x$) thì dễ hơn quy tắc thương.

## 6. Checklist áp dụng
- [ ] Đã xác định phép toán **ngoài cùng** chưa?
- [ ] Có hàm lồng nhau không → có nhân đạo hàm phần trong chưa?
- [ ] Rút gọn biểu thức **trước** khi lấy đạo hàm có làm bài dễ hơn không?
- [ ] Dấu của các hàm "co-" đã đúng chưa?
- [ ] $a^x$ hay $x^a$? (hai công thức khác nhau hoàn toàn)
- [ ] Kiểm nhanh: thế $x$ bằng một số dễ vào cả $f$ và $f'$, dấu có hợp lý không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §3.1–3.6: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 18–19: https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Derivatives* (bảng đầy đủ): https://tutorial.math.lamar.edu/Classes/CalcI/DerivativeIntro.aspx
- MIT OCW 18.01 — *Single Variable Calculus*: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/

## Liên kết
[[Derivative Definition]] · [[Product and Quotient Rule]] · [[Chain Rule]] · [[Trigonometric Limits]] · [[The Exponential Function]] · [[Math]]
