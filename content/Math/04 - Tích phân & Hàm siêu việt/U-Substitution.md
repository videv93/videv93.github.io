---
tags: [math, calculus, integral, technique]
status: evergreen
---
# U-Substitution

> [[Chain Rule]] chạy ngược. Kỹ thuật tích phân đầu tiên và quan trọng nhất — và toàn bộ khó khăn nằm ở **chọn $u$**, không ở phần còn lại.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả bốn header rỗng trong seed: *"42) Integral with u substitution Example 1 / 2 / 3"* (3:43:21–3:47:49) và *"49) Definite Integral with u substitution 4:25:47"*.

## 1. Công thức

$$\int f(g(x))\,g'(x)\,dx = \int f(u)\,du \qquad (u = g(x),\ du = g'(x)\,dx)$$

Chứng minh: đạo hàm vế phải theo $x$ là $f(u)\frac{du}{dx}=f(g(x))g'(x)$ — đúng bằng hàm dưới dấu tích phân bên trái. Chain rule, đọc từ phải sang trái.

$du = g'(x)dx$ hợp thức nhờ [[Differentials and Linear Approximation]].

## 2. Quy trình

1. **Chọn $u$** — thường là phần bên trong hàm hợp.
2. Tính $du = g'(x)\,dx$.
3. **Thay hết** $x$ và $dx$. Không được sót một chữ $x$ nào.
4. Tính tích phân theo $u$.
5. **Thay ngược** $u = g(x)$ (bất định) — hoặc đổi cận (xác định, mục 4).

$$\int 2x\cos(x^2)dx: \quad u=x^2,\ du=2x\,dx \Rightarrow \int\cos u\,du = \sin u + C = \sin(x^2)+C$$

## 3. Chọn $u$ thế nào

| Nhìn thấy | Chọn $u$ = |
|---|---|
| $f(\text{cái gì đó})$ với hàm hợp | phần **bên trong** |
| $(\ldots)^n$ | biểu thức trong ngoặc |
| $\sqrt{\ldots}$ | biểu thức dưới căn |
| $e^{\ldots}$ | số mũ |
| Phân thức | **mẫu số** (nếu tử ~ đạo hàm mẫu) |
| $\ln(\ldots)$ | có thể là $\ln$ hoặc phần trong |
| Có $g$ và $g'$ cùng lúc | $g$ |

**Phép kiểm quyết định:** sau khi chọn $u$, phần còn lại (ngoài $f(u)$) có phải là **bội hằng số** của $g'(x)$ không? Nếu có → chạy. Nếu không → chọn khác.

**Chỉnh hằng số:** thiếu hệ số thì bù bằng hằng.
$$\int x\,e^{x^2}dx: u=x^2, du=2x\,dx \Rightarrow x\,dx = \tfrac12du \Rightarrow \tfrac12\int e^u du = \tfrac12 e^{x^2}+C$$
Chỉ **hằng số** mới kéo ra được — không kéo được $x$.

## 4. Với tích phân xác định — hai cách

**Cách A (khuyên dùng): đổi cận**
$$\int_0^2 x e^{x^2}dx \xrightarrow{u=x^2} \int_{u=0}^{u=4}\tfrac12 e^u du = \tfrac12(e^4-1)$$
Không cần thay ngược. Nhanh hơn và ít lỗi hơn.

**Cách B: giữ cận $x$**, tính nguyên hàm theo $u$, thay ngược về $x$, rồi mới thế cận.

> [!warning] Đổi cận thì phải đổi **cả hai**
> Lỗi phổ biến: thay $u$ vào biểu thức nhưng vẫn dùng cận $x$ cũ. Kết quả sai hoàn toàn mà nhìn vẫn "hợp lý".

Nếu $u$ không đơn điệu trên khoảng lấy tích phân (ví dụ $u=x^2$ trên $[-1,1]$), phải chia khoảng — nếu không cận trên và cận dưới trùng nhau và ra $0$ sai.

## 5. Ba mẫu hay gặp

| Dạng | $u$ | Kết quả |
|---|---|---|
| $\int\dfrac{g'(x)}{g(x)}dx$ | $g$ | $\ln\vert g(x)\vert+C$ |
| $\int g(x)^n g'(x)dx$ | $g$ | $\dfrac{g^{n+1}}{n+1}+C$ |
| $\int e^{g(x)}g'(x)dx$ | $g$ | $e^{g(x)}+C$ |

Mẫu thứ nhất cho $\int\tan x\,dx = -\ln|\cos x|+C$ ($u=\cos x$) — xem [[The Natural Logarithm]].

**Khi $u$ không khử hết $x$:** giải ngược. $\int x\sqrt{x+1}\,dx$ với $u=x+1$ ⟹ $x = u-1$, thay vào: $\int(u-1)\sqrt u\,du$. Kỹ thuật này cứu được rất nhiều bài trông như bế tắc.

## 6. Cạm bẫy

1. **Còn sót $x$ sau khi thay.** Dấu hiệu chọn $u$ sai — hoặc cần giải ngược $x$ theo $u$.
2. **Quên đổi $dx$ thành $du$.**
3. **Đổi cận nửa vời.**
4. **Kéo biến ra ngoài dấu tích phân.** Chỉ hằng số được phép.
5. **Quên thay ngược** khi làm tích phân bất định.
6. **Nghĩ mọi tích phân đều u-sub được.** $\int e^{x^2}dx$ không — [[Antiderivatives]] mục 4.
7. **Bỏ qua trường hợp $u$ không đơn điệu** trong tích phân xác định.

## 7. Checklist áp dụng
- [ ] Đã xác định hàm hợp và phần "bên trong" chưa?
- [ ] $g'(x)$ (sai khác hằng số) có **thật sự** xuất hiện trong biểu thức không?
- [ ] Sau khi thay, biểu thức còn chữ $x$ nào không?
- [ ] $dx$ đã được thay bằng $du$ chưa?
- [ ] Nếu xác định: đã đổi **cả hai** cận chưa? $u$ có đơn điệu trên khoảng đó không?
- [ ] Nếu bất định: đã thay ngược về $x$ và cộng $+C$ chưa?
- [ ] Đã đạo hàm kết quả để kiểm chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §5.5: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 42–44, 49: https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Substitution Rule*: https://tutorial.math.lamar.edu/Classes/CalcI/SubstitutionRuleIndefinite.aspx
- MIT OCW 18.01 — *Single Variable Calculus*, Lecture 19: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/

## Liên kết
[[Antiderivatives]] · [[Chain Rule]] · [[Fundamental Theorem of Calculus]] · [[The Natural Logarithm]] · [[Differentials and Linear Approximation]] · [[Math]]
