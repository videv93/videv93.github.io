---
tags: [math, calculus, integral]
status: evergreen
---
# Riemann Sums

> Định nghĩa **thật** của tích phân xác định. Nó không phải "nguyên hàm rồi trừ" — đó là [[Fundamental Theorem of Calculus]], một định lý **đáng ngạc nhiên**, và chỉ đáng ngạc nhiên nếu bạn biết định nghĩa gốc.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"46) Definite Integral (Complete Construction via Riemann Sums) 3:58:04"* và *"47) Definite Integral using Limit Definition Example 4:10:16"*.

## 1. Xây dựng

Trên $[a,b]$, chia thành $n$ khoảng con đều:
$$\Delta x = \frac{b-a}{n}, \qquad x_i = a + i\Delta x$$

Chọn một điểm mẫu $x_i^*$ trong mỗi khoảng, lập **tổng Riemann**:
$$R_n = \sum_{i=1}^n f(x_i^*)\,\Delta x$$

Định nghĩa:
$$\int_a^b f(x)\,dx = \lim_{n\to\infty} \sum_{i=1}^n f(x_i^*)\Delta x$$

$f$ **khả tích** trên $[a,b]$ nếu giới hạn này tồn tại và **không phụ thuộc cách chọn** $x_i^*$. Mọi hàm liên tục trên $[a,b]$ đều khả tích; hàm bị chặn với hữu hạn điểm gián đoạn cũng vậy.

Ký hiệu $\int$ là chữ **S kéo dài** (summa) và $dx$ là dấu vết của $\Delta x$ — Leibniz thiết kế ký hiệu để nhắc chính cấu trúc này.

## 2. Ba cách chọn điểm mẫu

| Tên | $x_i^*$ | Với $f$ tăng |
|---|---|---|
| Left endpoint | $x_{i-1}$ | **thiếu** |
| Right endpoint | $x_i$ | **thừa** |
| Midpoint | $\frac{x_{i-1}+x_i}2$ | chính xác hơn hẳn |

Với $f$ giảm thì đảo lại. Left và right kẹp giá trị thật ⟹ dùng để **chặn sai số**. Midpoint rule có sai số bậc $O(1/n^2)$ trong khi left/right chỉ $O(1/n)$ — xem [[Numerical Integration]].

## 3. Tính bằng định nghĩa

Quy trình cho $\int_0^2 x^2 dx$ (right endpoint):

1. $\Delta x = \frac2n$, $x_i = \frac{2i}{n}$
2. $f(x_i)=\frac{4i^2}{n^2}$
3. $R_n = \sum_{i=1}^n \frac{4i^2}{n^2}\cdot\frac2n = \frac8{n^3}\sum_{i=1}^n i^2$
4. Dùng [[Summation Formulas]]: $=\frac8{n^3}\cdot\frac{n(n+1)(2n+1)}6$
5. $\lim_{n\to\infty} = \frac8{6}\cdot 2 = \frac83$

Bốn công thức tổng của note kia **tồn tại vì bước 4**. Đó là lý do duy nhất chúng nằm trong giáo trình Calculus 1.

## 4. Ý nghĩa: diện tích **có dấu**

$$\int_a^b f\,dx = (\text{diện tích trên trục}) - (\text{diện tích dưới trục})$$

Muốn diện tích hình học thật thì lấy $\int_a^b|f|dx$ — phải chia khoảng tại các nghiệm của $f$. Cùng cấu trúc với độ dời vs quãng đường ở [[Motion and Kinematics]].

**Tính chất:**

| | |
|---|---|
| $\int_a^a f = 0$ | |
| $\int_b^a f = -\int_a^b f$ | đảo cận đổi dấu |
| $\int_a^c f = \int_a^b f + \int_b^c f$ | cộng khoảng (đúng cả khi $b\notin[a,c]$) |
| $\int(f\pm g)=\int f\pm\int g$ | tuyến tính |
| $f\ge0 \Rightarrow \int_a^b f\ge0$ | bảo toàn thứ tự |
| $m\le f\le M \Rightarrow m(b-a)\le\int_a^b f\le M(b-a)$ | chặn — nền của [[Mean Value Theorem for Integrals]] |

## 5. Tích phân xác định vs bất định

| | Xác định $\int_a^b$ | Bất định $\int$ |
|---|---|---|
| Kết quả | một **số** | một **họ hàm** ($+C$) |
| Định nghĩa | giới hạn tổng Riemann | nguyên hàm ([[Antiderivatives]]) |
| Liên hệ | qua [[Fundamental Theorem of Calculus]] | |

Hai khái niệm này **được định nghĩa hoàn toàn độc lập**. Việc chúng liên quan tới nhau là nội dung FTC — và là lý do calculus tồn tại như một môn.

## 6. Cạm bẫy

1. **Nghĩ tích phân xác định "là" nguyên hàm.** Định nghĩa là giới hạn tổng.
2. **Nhầm diện tích có dấu với diện tích hình học.**
3. **Quên $\Delta x$ trong tổng.** $\sum f(x_i)$ không phải tổng Riemann.
4. **Sai chỉ số:** left dùng $i$ chạy $0..n-1$, right dùng $1..n$.
5. **Thay $n$ bằng số cụ thể quá sớm** rồi lấy giới hạn.
6. **Áp cho hàm không bị chặn.** $\int_0^1\frac1x dx$ là tích phân **suy rộng**, cần định nghĩa khác.
7. **Quên đảo cận đổi dấu.**

## 7. Checklist áp dụng
- [ ] $\Delta x = \frac{b-a}{n}$ đã viết đúng chưa?
- [ ] $x_i$ dùng left, right hay midpoint? Chỉ số chạy đúng khoảng chưa?
- [ ] Đã rút $\Delta x$ và các hằng ra khỏi tổng chưa?
- [ ] Tổng còn lại có khớp một trong bốn công thức của [[Summation Formulas]] không?
- [ ] Đã lấy giới hạn $n\to\infty$ **sau cùng** chưa?
- [ ] Đề hỏi diện tích có dấu hay diện tích hình học?
- [ ] $f$ có bị chặn và liên tục trên $[a,b]$ không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §5.1–5.2: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 46–47: https://www.youtube.com/watch?v=G-ti56DEXE8
- 3Blue1Brown — *Integration and the fundamental theorem of calculus*: https://www.3blue1brown.com/lessons/integration
- Abbott — *Understanding Analysis*, ch. 7 (Riemann integral chặt chẽ): https://link.springer.com/book/10.1007/978-1-4939-2712-8

## Liên kết
[[Summation Formulas]] · [[Fundamental Theorem of Calculus]] · [[Antiderivatives]] · [[Numerical Integration]] · [[Mean Value Theorem for Integrals]] · [[Math]]
