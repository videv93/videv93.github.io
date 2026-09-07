---
tags: [math, calculus, algebra]
status: evergreen
---
# Summation Formulas

> Bốn công thức tổng. Không có chúng thì không tính được [[Riemann Sums]] bằng định nghĩa, và không thấy được vì sao $\int_0^b x\,dx = \frac{b^2}2$ ra từ đâu.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"45) Summation Formulas 3:49:38"* trong seed.

## 1. Ký hiệu sigma

$$\sum_{i=1}^n a_i = a_1+a_2+\cdots+a_n$$

$i$ là **biến câm** (dummy) — đổi tên không đổi giá trị. Số hạng tử là $n - m + 1$ khi chạy từ $m$ tới $n$ (không phải $n-m$ — lỗi off-by-one kinh điển).

**Tính chất (tuyến tính):**
$$\sum(a_i+b_i)=\sum a_i+\sum b_i \qquad \sum c\,a_i = c\sum a_i \qquad \sum_{i=1}^n c = nc$$

> [!warning] Không có tính chất nhân
> $\sum a_ib_i \ne \left(\sum a_i\right)\left(\sum b_i\right)$. Cùng cấu trúc với "không có quy tắc tích cho tích phân" ở [[Antiderivatives]] — và không phải trùng hợp: tích phân **là** giới hạn của tổng.

## 2. Bốn công thức

$$\sum_{i=1}^n 1 = n \qquad \sum_{i=1}^n i = \frac{n(n+1)}{2}$$
$$\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6} \qquad \sum_{i=1}^n i^3 = \left[\frac{n(n+1)}{2}\right]^2$$

Công thức thứ tư đẹp một cách kỳ lạ: tổng lập phương = **bình phương** của tổng.

**Bậc tăng trưởng** — thứ quyết định kết quả tích phân:
$$\sum i \sim \frac{n^2}{2}, \qquad \sum i^2\sim\frac{n^3}{3},\qquad \sum i^3\sim\frac{n^4}{4}$$
Tổng quát $\sum_{i=1}^n i^p \sim \frac{n^{p+1}}{p+1}$ — chính là $\int x^p dx = \frac{x^{p+1}}{p+1}$ hiện ra từ trước. → [[Asymptotic Notation]]

## 3. Chứng minh $\sum i = \frac{n(n+1)}2$

**Cách Gauss:** viết tổng hai lần, xuôi và ngược:
$$\begin{aligned} S &= 1 + 2 + \cdots + n\\ S &= n + (n-1)+\cdots+1\\ 2S &= \underbrace{(n+1)+(n+1)+\cdots+(n+1)}_{n \text{ lần}} = n(n+1)\end{aligned}$$

**Cách quy nạp** ([[Proof Techniques]]): cơ sở $n=1$ cho $1=\frac{1\cdot2}2$ ✓. Bước: giả sử đúng với $n$, thì
$$\sum_{i=1}^{n+1} i = \frac{n(n+1)}2 + (n+1) = \frac{(n+1)(n+2)}2 \ ✓$$

Cách Gauss cho biết **vì sao**; quy nạp chỉ xác nhận. Nhớ cả hai.

## 4. Tổng khác cần biết

| Tổng | Công thức | Điều kiện |
|---|---|---|
| Cấp số cộng | $\dfrac{n(a_1+a_n)}2$ | |
| Cấp số nhân hữu hạn | $a\dfrac{1-r^n}{1-r}$ | $r\ne1$ |
| Cấp số nhân vô hạn | $\dfrac{a}{1-r}$ | $\vert r\vert<1$ |
| Telescoping | $\sum(a_i - a_{i+1}) = a_1 - a_{n+1}$ | |
| Điều hoà | $H_n \approx \ln n + \gamma$ | $\gamma\approx0.5772$ |

Cấp số nhân vô hạn là công thức định giá trái phiếu vĩnh viễn trong [[Quant]]. $H_n \approx \ln n$ nối thẳng sang [[Stirling's Approximation]] và [[Asymptotic Notation]].

**Telescoping** là kỹ thuật đẹp nhất trong bảng: $\sum_{i=1}^n\frac1{i(i+1)}=\sum\left(\frac1i-\frac1{i+1}\right)=1-\frac1{n+1}$.

## 5. Cạm bẫy

1. **Đếm sai số hạng tử.** $\sum_{i=0}^{n}$ có $n+1$ hạng tử.
2. **Bỏ qua chỉ số bắt đầu.** $\sum_{i=1}^n$ và $\sum_{i=0}^n$ khác nhau một hạng tử.
3. **Bịa quy tắc nhân.**
4. **Nhầm $\sum i^2$ với $(\sum i)^2$.**
5. **Áp cấp số nhân vô hạn khi $\vert r\vert\ge1$.** Phân kỳ.
6. **Kéo biến chạy ra ngoài $\sum$.** Chỉ kéo được thứ **không phụ thuộc $i$**.
7. **Đổi biến mà quên đổi cận.** Cùng lỗi với [[U-Substitution]].

## 6. Checklist áp dụng
- [ ] Chỉ số chạy từ đâu tới đâu? Bao nhiêu hạng tử?
- [ ] Đã tách tổng thành các tổng cơ bản chưa?
- [ ] Hằng số nào kéo được ra ngoài? (thứ không chứa $i$)
- [ ] Nếu tổng khớp một trong bốn công thức — đã tra đúng công thức chưa?
- [ ] Nếu là cấp số nhân vô hạn — $\vert r\vert<1$ chứ?
- [ ] Có thể telescoping (viết thành hiệu liên tiếp) không?
- [ ] Kiểm với $n=1,2,3$ bằng tay?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §5.1 (Appendix E): https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 45 (3:49:38): https://www.youtube.com/watch?v=G-ti56DEXE8
- Graham, Knuth, Patashnik — *Concrete Mathematics*, ch. 2 (*Sums*): https://www-cs-faculty.stanford.edu/~knuth/gkp.html
- Wikipedia — *Faulhaber's formula*: https://en.wikipedia.org/wiki/Faulhaber%27s_formula

## Liên kết
[[Riemann Sums]] · [[Proof Techniques]] · [[Asymptotic Notation]] · [[Stirling's Approximation]] · [[Math]]
