---
tags: [math, calculus, integral, theorem]
status: evergreen
---
# Fundamental Theorem of Calculus

> Định lý nói rằng đạo hàm và tích phân là **hai phép toán ngược nhau** — một sự thật hoàn toàn không hiển nhiên, vì [[Riemann Sums]] (diện tích) và [[Antiderivatives]] (đạo hàm ngược) được định nghĩa độc lập. Đây là lý do calculus tồn tại như một môn thống nhất.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"48) Fundamental Theorem of Calculus 4:18:18"* và *"51) Extended Fundamental Theorem of Calculus (Better than 2nd FTC) 4:36:16"*.

## 1. Hai phần

**FTC phần 1 — đạo hàm của tích phân.** Nếu $f$ liên tục trên $[a,b]$ và
$$g(x) = \int_a^x f(t)\,dt \quad\text{thì}\quad g'(x) = f(x)$$

Nói cách khác: **mọi hàm liên tục đều có nguyên hàm**, và tích phân xây được nó. Đây là phần sâu hơn.

**FTC phần 2 — tính tích phân bằng nguyên hàm.** Nếu $F'=f$ với $f$ liên tục trên $[a,b]$:
$$\int_a^b f(x)\,dx = F(b)-F(a) \ =:\ \big[F(x)\big]_a^b$$

Phần 2 là công cụ tính; phần 1 là lý do phần 2 đúng.

> [!note] Vì sao $C$ biến mất
> $[F(b)+C]-[F(a)+C] = F(b)-F(a)$. Hằng số triệt tiêu ⟹ tích phân **xác định** không cần $+C$, tích phân **bất định** thì cần.

## 2. Vì sao phần 1 đúng

$$\frac{g(x+h)-g(x)}{h} = \frac1h\int_x^{x+h} f(t)\,dt$$

Vế phải là **giá trị trung bình** của $f$ trên $[x,x+h]$. Khi $h\to0$, khoảng co lại về điểm $x$, và vì $f$ liên tục, trung bình đó $\to f(x)$. Chi tiết dùng [[Mean Value Theorem for Integrals]].

**Trực giác:** $g(x)$ là diện tích tích luỹ. Tăng $x$ thêm $h$ thì diện tích tăng thêm một dải mỏng $\approx f(x)\cdot h$. Tốc độ tăng diện tích **chính là chiều cao**.

## 3. FTC mở rộng (cận là hàm)

$$\frac{d}{dx}\int_{a}^{u(x)} f(t)\,dt = f(u(x))\,u'(x)$$
$$\frac{d}{dx}\int_{v(x)}^{u(x)} f(t)\,dt = f(u(x))u'(x) - f(v(x))v'(x)$$

Đây là FTC + [[Chain Rule]]. Seed gọi phiên bản này *"Better than 2nd FTC"* — đúng, vì nó bao trọn cả hai trường hợp cận hằng lẫn cận hàm.

**Ví dụ:**
$$\frac{d}{dx}\int_1^{x^2}\sin t\,dt = \sin(x^2)\cdot 2x$$
$$\frac{d}{dx}\int_{x}^{x^3} e^{t^2}dt = e^{x^6}\cdot3x^2 - e^{x^2}$$
Ví dụ thứ hai quan trọng: $e^{t^2}$ **không có nguyên hàm sơ cấp**, nhưng đạo hàm của tích phân vẫn tính được chính xác. Đây là chỗ FTC phần 1 tỏ ra mạnh hơn phần 2.

**Cận dưới là hàm:** đảo cận đổi dấu trước, rồi áp công thức.

## 4. Quy trình dùng FTC phần 2

1. Kiểm $f$ **liên tục** trên $[a,b]$.
2. Tìm **một** nguyên hàm $F$ (không cần $+C$).
3. Tính $F(b)-F(a)$.
4. Nếu có [[U-Substitution]]: **đổi cận** thay vì thay ngược.

$$\int_0^{\pi} \sin x\,dx = [-\cos x]_0^\pi = -(-1)-(-1)=2$$

> [!warning] Không kiểm liên tục thì ra kết quả sai một cách thầm lặng
> $\int_{-1}^{1}\frac{dx}{x^2} = \left[-\frac1x\right]_{-1}^1 = -1-1 = -2$ — **vô lý**, vì hàm dưới dấu tích phân luôn dương. Nguyên nhân: $f$ không liên tục tại $0$. Tích phân này thật ra phân kỳ. Đây là lỗi nguy hiểm nhất trong chương vì máy tính cũng không cảnh báo.

## 5. Hệ quả về "tích luỹ"

$$F(b) = F(a) + \int_a^b F'(x)\,dx$$

Đọc: **giá trị cuối = giá trị đầu + tổng mọi thay đổi**. Đây là dạng dùng nhiều nhất ngoài toán thuần:

| $F'$ | $\int_a^b F'$ |
|---|---|
| vận tốc | độ dời → [[Motion and Kinematics]] |
| tốc độ dòng chảy | tổng lượng nước |
| chi phí biên | tổng chi phí tăng thêm |
| mật độ xác suất | xác suất trên khoảng → [[Prob&Stats]] |

## 6. Cạm bẫy

1. **Bỏ qua điểm gián đoạn trong $[a,b]$.** Xem cảnh báo mục 4.
2. **Quên chain rule khi cận là hàm.**
3. **Quên đổi dấu khi cận dưới là hàm.**
4. **Cộng $+C$ vào tích phân xác định.**
5. **Thay ngược $u$ nhưng dùng cận $u$**, hoặc ngược lại.
6. **Nhầm $\int_a^b f$ với diện tích hình học** khi $f$ đổi dấu.
7. **Nghĩ FTC phần 1 vô dụng.** Nó là công cụ duy nhất cho những hàm không có nguyên hàm sơ cấp.
8. **Áp cho hàm không bị chặn** — cần tích phân suy rộng.

## 7. Checklist áp dụng
- [ ] $f$ có liên tục trên **toàn bộ** $[a,b]$ không? (kiểm mẫu, căn, log, $\tan$)
- [ ] Đã tìm được **một** nguyên hàm chưa? Đã đạo hàm lại để kiểm chưa?
- [ ] Đã thế cận đúng thứ tự $F(b)-F(a)$ chưa?
- [ ] Nếu cận là hàm — đã nhân $u'(x)$ chưa? Có cận dưới là hàm không?
- [ ] Nếu có substitution — đã đổi cận chưa?
- [ ] Kết quả có dấu hợp lý không? ($f>0$ trên $[a,b]$ thì tích phân phải dương)
- [ ] Đề hỏi diện tích có dấu hay diện tích hình học?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §5.3: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 48, 51: https://www.youtube.com/watch?v=G-ti56DEXE8
- 3Blue1Brown — *Integration and the fundamental theorem of calculus*: https://www.3blue1brown.com/lessons/integration
- MIT OCW 18.01 — *Single Variable Calculus*, Lecture 18: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/

## Liên kết
[[Riemann Sums]] · [[Antiderivatives]] · [[U-Substitution]] · [[Mean Value Theorem for Integrals]] · [[Chain Rule]] · [[Math]]
