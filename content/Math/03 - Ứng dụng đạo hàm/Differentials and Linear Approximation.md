---
tags: [math, calculus, approximation]
status: evergreen
---
# Differentials and Linear Approximation

> $dy$ và $\Delta y$ khác nhau, và biết khác chỗ nào là biết vì sao ký hiệu Leibniz "rút gọn được" mà không phải phân số. Đây cũng là bậc 1 của khai triển Taylor và là nền của [[Newton's Method]].

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"39) Differentials: Deltay and dy 3:21:39"* trong seed.

## 1. Hai đại lượng

| | Định nghĩa | Là gì |
|---|---|---|
| $\Delta x$ | thay đổi thật của $x$ | ta chọn |
| $\Delta y$ | $f(x+\Delta x)-f(x)$ | thay đổi **thật** của $y$ |
| $dx$ | $:= \Delta x$ | quy ước — bằng nhau |
| $dy$ | $f'(x)\,dx$ | thay đổi **dọc tiếp tuyến** |

$$\boxed{\Delta y \approx dy = f'(x)\,dx}$$

Sai số $\Delta y - dy$ tiến về $0$ **nhanh hơn** $\Delta x$ — chính xác hơn: $\Delta y - dy = o(\Delta x)$, ký hiệu giải thích ở [[Asymptotic Notation]]. Đó là toàn bộ nội dung của "khả vi".

**Hình học:** $\Delta y$ đi dọc **đường cong**; $dy$ đi dọc **tiếp tuyến**. Chúng xuất phát cùng điểm và tách nhau dần.

## 2. Xấp xỉ tuyến tính

$$L(x) = f(a) + f'(a)(x-a) \qquad f(x)\approx L(x) \text{ khi } x \approx a$$

$L$ chính là **tiếp tuyến tại $a$**, viết dưới tên khác. Còn gọi là *linearization*.

**Ví dụ — ước lượng $\sqrt{4.1}$:** lấy $f(x)=\sqrt x$, $a=4$, $f'(4)=\frac1{2\cdot2}=0.25$:
$$\sqrt{4.1}\approx 2 + 0.25(0.1) = 2.025$$
Giá trị thật $2.024845\ldots$ — sai số $1.5\times10^{-4}$.

**Chọn $a$:** điểm gần nhất mà $f(a)$ và $f'(a)$ tính được **bằng tay**. Đây là toàn bộ nghệ thuật của kỹ thuật này.

## 3. Xấp xỉ chuẩn nên thuộc

Quanh $x=0$:

$$\sin x \approx x \qquad \tan x\approx x \qquad \cos x \approx 1-\tfrac{x^2}2$$
$$e^x\approx 1+x \qquad \ln(1+x)\approx x \qquad (1+x)^n \approx 1+nx$$

$\sin x \approx x$ là chính [[Trigonometric Limits]] phát biểu lại. $(1+x)^n\approx1+nx$ là công thức lãi suất đơn xấp xỉ lãi kép trong [[Quant]].

## 4. Lan truyền sai số

Nếu đo $x$ với sai số $\Delta x$, thì $f(x)$ có sai số:

| Loại | Công thức |
|---|---|
| Tuyệt đối | $\vert dy\vert = \vert f'(x)\vert\,\vert dx\vert$ |
| Tương đối | $\left\vert\dfrac{dy}{y}\right\vert = \left\vert\dfrac{f'(x)}{f(x)}\right\vert\vert dx\vert$ |
| Phần trăm | sai số tương đối $\times 100\%$ |

**Ví dụ:** đo bán kính cầu sai $1\%$ ⟹ thể tích $V=\frac43\pi r^3$ sai
$$\frac{dV}{V}=\frac{4\pi r^2\,dr}{\frac43\pi r^3}=3\frac{dr}{r}=3\%$$
Quy tắc chung: **lũy thừa $n$ nhân sai số tương đối lên $n$ lần.**

## 5. Vì sao $\frac{dy}{dx}$ hành xử như phân số

Sau khi định nghĩa $dy = f'(x)dx$ như **hai đại lượng riêng**, tỉ số $\frac{dy}{dx}$ **thật sự** là một phân số của hai vi phân. Điều này làm hợp thức:

- [[Chain Rule]]: $\frac{dy}{dx}=\frac{dy}{du}\frac{du}{dx}$
- [[U-Substitution]]: đổi $du = g'(x)dx$
- Phương trình vi phân tách biến: $\frac{dy}{dx}=g(x)h(y) \Rightarrow \frac{dy}{h(y)}=g(x)dx$

Nhưng đây là một **định lý về ký hiệu**, không phải giấy phép rút gọn tùy tiện. $\frac{\partial^2 z}{\partial x\partial y}$ chẳng hạn không tách được như vậy.

## 6. Cạm bẫy

1. **Nhầm $dy$ với $\Delta y$.** $dy$ luôn là xấp xỉ.
2. **Dùng $\Delta x$ quá lớn.** Sai số bậc hai lớn theo $(\Delta x)^2$.
3. **Chọn $a$ mà $f(a)$ không tính nhẩm được.** Mất hết ý nghĩa.
4. **Quên xấp xỉ luôn lệch về một phía.** $f''>0$ (lõm lên) ⟹ tiếp tuyến nằm **dưới** ⟹ xấp xỉ **thiếu**. Ngược lại thì thừa. → [[Concavity and Inflection Points]]
5. **Nhầm sai số tuyệt đối với tương đối.**
6. **Dùng $\sin x\approx x$ khi $x$ tính bằng độ.** Chỉ đúng với radian.
7. **Coi $dx$ là "vô cùng bé".** Trong Calculus 1, $dx$ là một số thực hữu hạn do ta chọn.

## 7. Checklist áp dụng
- [ ] Đã chọn $a$ gần $x$ và tính được $f(a)$, $f'(a)$ bằng tay chưa?
- [ ] $\Delta x = x - a$ có đủ nhỏ không? (thường $<10\%$ của $a$)
- [ ] Đang được hỏi $dy$ (xấp xỉ) hay $\Delta y$ (thật)?
- [ ] Sai số cần là tuyệt đối, tương đối, hay phần trăm?
- [ ] Dựa vào dấu $f''$: xấp xỉ đang thừa hay thiếu?
- [ ] Nếu là hàm lượng giác — đang dùng radian chứ?
- [ ] Kết quả có gần với ước lượng thô bằng đầu không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §3.10: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 39 (3:21:39): https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Linear Approximations / Differentials*: https://tutorial.math.lamar.edu/Classes/CalcI/LinearApproximations.aspx
- MIT OCW 18.01 — *Single Variable Calculus*, Lecture 9: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/

## Liên kết
[[Rates of Change]] · [[Newton's Method]] · [[Chain Rule]] · [[U-Substitution]] · [[Asymptotic Notation]] · [[Math]]
