---
tags: [math, calculus, derivative]
status: evergreen
---
# Derivative Definition

> Đạo hàm là **một giới hạn**, không phải một bảng công thức. Ai bỏ qua chỗ này sẽ không hiểu vì sao [[Chain Rule]] đúng, vì sao $|x|$ không khả vi, hay vì sao [[Newton's Method]] chạy.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"16) Derivative (Full Derivation and Explanation) 1:04:11"* và *"17) Definition of the Derivative Example 1:12:10"*.

## 1. Định nghĩa

$$f'(a) = \lim_{h\to0}\frac{f(a+h)-f(a)}{h} \qquad\text{(dạng tương đương)}\qquad f'(a)=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}$$

$f$ **khả vi tại $a$** nếu giới hạn này tồn tại và hữu hạn.

Tử số là **thay đổi của $f$**, mẫu là **thay đổi của $x$**. Tỉ số là hệ số góc của cát tuyến; giới hạn là hệ số góc **tiếp tuyến**. Vì thế đạo hàm và tốc độ biến thiên tức thời là **cùng một thứ**, không phải hai ứng dụng — xem [[Rates of Change]].

Đây là dạng vô định $\frac00$: cả tử và mẫu đều $\to 0$. Toàn bộ giá trị của [[Computing Limits]] nằm ở đây.

## 2. Ký hiệu

| Ký hiệu | Đọc | Ưu điểm |
|---|---|---|
| $f'(x)$ | Lagrange | ngắn |
| $\dfrac{dy}{dx}$ | Leibniz | thấy rõ biến, chain rule "rút gọn được" |
| $\dfrac{d}{dx}[f(x)]$ | Leibniz toán tử | rõ đang lấy đạo hàm theo gì |
| $\dot y$ | Newton | vật lý, đạo hàm theo thời gian |
| $D_x f$ | Euler | toán tử |

$\frac{dy}{dx}$ **không phải phân số**, nhưng hành xử như phân số trong nhiều trường hợp — [[Differentials and Linear Approximation]] giải thích vì sao và tới đâu.

## 3. Tính đạo hàm bằng định nghĩa

Quy trình bốn bước cho $f(x)=x^2$:

1. $f(x+h) = (x+h)^2 = x^2+2xh+h^2$
2. $f(x+h)-f(x) = 2xh+h^2$
3. Chia: $\dfrac{2xh+h^2}{h} = 2x+h$ (hợp lệ vì $h\ne0$)
4. $\lim_{h\to0}(2x+h)=2x$

**Bước 3 là toàn bộ bài toán.** Mục tiêu luôn là triệt tiêu $h$ ở mẫu. Với căn thì nhân liên hợp; với phân thức thì quy đồng; với $\sin$ thì dùng [[Trigonometric Limits]].

$$f(x)=\sqrt x:\quad \frac{\sqrt{x+h}-\sqrt x}{h}\cdot\frac{\sqrt{x+h}+\sqrt x}{\sqrt{x+h}+\sqrt x} = \frac{1}{\sqrt{x+h}+\sqrt x} \to \frac1{2\sqrt x}$$

## 4. Khi nào **không** khả vi

Bốn kiểu hỏng — đều là "giới hạn định nghĩa không tồn tại":

| Kiểu | Ví dụ | Chuyện gì xảy ra |
|---|---|---|
| **Góc / gấp khúc** | $\vert x\vert$ tại $0$ | đạo hàm trái $\ne$ phải |
| **Cusp** | $x^{2/3}$ tại $0$ | trái $\to-\infty$, phải $\to+\infty$ |
| **Tiếp tuyến đứng** | $x^{1/3}$ tại $0$ | giới hạn $=+\infty$ |
| **Gián đoạn** | mọi điểm gián đoạn | không liên tục ⟹ không khả vi |

$$\text{khả vi} \Rightarrow \text{liên tục}, \qquad \text{liên tục} \not\Rightarrow \text{khả vi}$$

Chiều thuận chứng minh được: $\lim_{h\to0}[f(a+h)-f(a)] = \lim_{h\to0}\frac{f(a+h)-f(a)}{h}\cdot h = f'(a)\cdot 0 = 0$. → [[Continuity]]

## 5. Đạo hàm một phía và đạo hàm cấp cao

$$f'_-(a)=\lim_{h\to0^-}\frac{f(a+h)-f(a)}{h}, \qquad f'_+(a)=\lim_{h\to0^+}(\cdots)$$

$f$ khả vi tại $a$ ⟺ hai đạo hàm một phía tồn tại, hữu hạn, và **bằng nhau**. Đây là công cụ duy nhất cho hàm từng khúc.

**Đạo hàm cấp cao:** $f'' = (f')'$, $f''' $, $f^{(4)}$… Cấp 2 cho độ cong ([[Concavity and Inflection Points]]), cấp 2 theo thời gian là gia tốc ([[Motion and Kinematics]]).

## 6. Cạm bẫy

1. **Rút gọn $h$ trước khi lấy giới hạn là hợp lệ** — vì $h\ne0$ trong định nghĩa giới hạn. Nhiều người ngần ngại ở đây; không cần.
2. **Nhầm $f'(a)$ (một số) với $f'(x)$ (một hàm).**
3. **Nghĩ liên tục ⟹ khả vi.**
4. **Dùng $\frac{dy}{dx}$ như phân số bừa bãi.** Chỉ hợp lệ trong chain rule và separable ODE, và cả hai đều có chứng minh riêng.
5. **Quên kiểm tra hai phía tại điểm nối** của hàm từng khúc. Ra đề gần như chắc chắn.
6. **Nghĩ $f'(a)=0$ nghĩa là cực trị.** Chỉ là **điểm tới hạn** — $x^3$ tại $0$ là phản ví dụ. → [[Critical Numbers and Extrema]]

## 7. Checklist áp dụng
- [ ] Đang dùng dạng $h\to0$ hay $x\to a$? (chọn dạng nào biến đổi dễ hơn)
- [ ] Đã viết $f(x+h)$ ra **hết** rồi mới trừ chưa?
- [ ] Đã triệt tiêu được $h$ ở mẫu chưa? (nếu chưa: liên hợp / quy đồng / hằng đẳng thức)
- [ ] Nếu hàm từng khúc hoặc có $\vert\cdot\vert$ — đã kiểm hai đạo hàm một phía chưa?
- [ ] Kết quả có đơn vị hợp lý không? (đơn vị $f$ chia đơn vị $x$)
- [ ] Nếu đề nói "bằng định nghĩa" — có đang lén dùng bảng công thức không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §2.7–2.8: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 16–17 (1:04:11): https://www.youtube.com/watch?v=G-ti56DEXE8
- 3Blue1Brown — *The paradox of the derivative*: https://www.3blue1brown.com/lessons/derivatives
- MIT OCW 18.01 — *Single Variable Calculus*, Lecture 1: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/

## Liên kết
[[Differentiation Rules]] · [[Rates of Change]] · [[Continuity]] · [[Computing Limits]] · [[Differentials and Linear Approximation]] · [[Math]]
