---
tags: [math, calculus, continuity]
status: evergreen
---
# Continuity

> Ba điều kiện, và một hệ quả lớn: liên tục là **giấy phép để thế số vào**. Mọi định lý tồn tại trong Calculus 1 ([[Intermediate Value Theorem]], [[Extreme Value Theorem]], [[Mean Value Theorem]]) đều bắt đầu bằng chữ "liên tục".

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"11) Continuity 25:35"* và *"12) Removable and Nonremovable Discontinuities 34:06"*.

## 1. Định nghĩa

$f$ **liên tục tại $a$** khi cả ba điều sau đúng:

1. $f(a)$ **xác định**
2. $\lim_{x\to a} f(x)$ **tồn tại** (hai phía bằng nhau, hữu hạn)
3. $\lim_{x\to a} f(x) = f(a)$

Ba điều kiện tương ứng với ba kiểu hỏng khác nhau — và bảng ở mục 2 chính là bảng đó.

**Dạng $\varepsilon$–$\delta$:** $\forall\varepsilon>0\ \exists\delta>0: |x-a|<\delta \Rightarrow |f(x)-f(a)|<\varepsilon$. Khác định nghĩa [[Limits]] đúng một chỗ: bỏ điều kiện $0<|x-a|$.

$f$ liên tục **trên khoảng** nếu liên tục tại mọi điểm trong đó. Tại đầu mút của $[a,b]$ chỉ đòi liên tục một phía.

## 2. Phân loại điểm gián đoạn

| Loại | Điều kiện hỏng | Hình dạng | Vá được? |
|---|---|---|---|
| **Removable** (bỏ được) | (1) hoặc (3) | Lỗ thủng | ✅ định nghĩa lại $f(a) := \lim$ |
| **Jump** (bước nhảy) | (2) — hai phía khác nhau | Bậc thang | ❌ |
| **Infinite** (vô cực) | (2) — giới hạn $\to\pm\infty$ | Tiệm cận đứng | ❌ |
| **Oscillating** | (2) — dao động | $\sin\frac1x$ tại $0$ | ❌ |

Chỉ **removable** là vá được, và tên gọi đến từ đúng chỗ đó.

**Ví dụ mẫu:**
- $f(x)=\frac{x^2-9}{x-3}$ tại $x=3$: removable, vá bằng $f(3)=6$.
- $f(x)=\frac{|x|}{x}$ tại $x=0$: jump ($-1$ vs $+1$).
- $f(x)=\frac1x$ tại $x=0$: infinite → [[Infinite Limits and Asymptotes]].

## 3. Hàm nào liên tục sẵn

Liên tục trên toàn miền xác định của chúng:

| Họ hàm | Miền |
|---|---|
| Đa thức | $\mathbb{R}$ |
| Hàm hữu tỉ | mọi nơi mẫu $\ne 0$ |
| Căn bậc $n$ | $n$ lẻ: $\mathbb{R}$; $n$ chẵn: $[0,\infty)$ |
| $\sin, \cos$ | $\mathbb{R}$ |
| $\tan, \sec$ | trừ $\pi/2 + k\pi$ |
| $e^x$ | $\mathbb{R}$ → [[The Exponential Function]] |
| $\ln x$ | $(0,\infty)$ → [[The Natural Logarithm]] |

**Phép toán bảo toàn liên tục:** tổng, hiệu, tích, thương (mẫu $\ne0$), và **hợp** — $f\circ g$ liên tục tại $a$ nếu $g$ liên tục tại $a$ và $f$ liên tục tại $g(a)$.

Hệ quả thực dụng: hầu hết hàm gặp trong bài tập liên tục sẵn, nên **thế trực tiếp** hợp lệ. Chỉ cần cẩn thận tại điểm nối của hàm từng khúc và điểm mẫu bằng 0.

## 4. Liên tục vs khả vi

$$\text{khả vi} \Rightarrow \text{liên tục}, \qquad \text{liên tục} \not\Rightarrow \text{khả vi}$$

Phản ví dụ: $f(x)=|x|$ liên tục tại $0$ nhưng không khả vi (đạo hàm trái $-1$, phải $+1$). Cực đoan hơn: hàm Weierstrass liên tục khắp nơi, không khả vi ở đâu cả. → [[Derivative Definition]]

Đây là ví dụ mẫu về "điều kiện cần nhưng không đủ" trong [[Mathematical Logic Basics]].

## 5. Cạm bẫy

1. **Chỉ kiểm tra $\lim$ tồn tại rồi kết luận liên tục.** Thiếu điều kiện (1) và (3).
2. **Nghĩ hàm hữu tỉ "gián đoạn" tại điểm mẫu bằng 0.** Điểm đó **không thuộc miền xác định** — nói chặt thì hàm không gián đoạn ở đó, nó chỉ không tồn tại ở đó. Nhiều sách Calculus 1 nói lỏng chỗ này.
3. **Tưởng vá được mọi lỗ.** Chỉ removable.
4. **Nhầm liên tục với "vẽ được một nét".** Trực giác này gãy với $f(x)=x\sin\frac1x$.
5. **Quên kiểm tra điểm nối của hàm từng khúc.** Đây là chỗ ra đề gần như 100%.
6. **Áp định lý cần liên tục trên khoảng đóng mà chỉ kiểm liên tục trong khoảng mở.**

## 6. Checklist áp dụng
- [ ] $f(a)$ có xác định không?
- [ ] $\lim_{x\to a^-}$ và $\lim_{x\to a^+}$ có bằng nhau và hữu hạn không?
- [ ] Hai thứ trên có bằng nhau không?
- [ ] Nếu gián đoạn — thuộc loại nào trong bốn loại?
- [ ] Nếu là hàm từng khúc — đã kiểm **mọi** điểm nối chưa?
- [ ] Nếu bài yêu cầu tìm tham số để liên tục — đã đặt $\lim^- = \lim^+ = f(a)$ chưa?
- [ ] Định lý sắp dùng đòi liên tục trên $[a,b]$ hay $(a,b)$?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §2.5: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 11–12: https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Continuity*: https://tutorial.math.lamar.edu/Classes/CalcI/Continuity.aspx
- Wikipedia — *Weierstrass function*: https://en.wikipedia.org/wiki/Weierstrass_function

## Liên kết
[[Limits]] · [[Computing Limits]] · [[Intermediate Value Theorem]] · [[Derivative Definition]] · [[Extreme Value Theorem]] · [[Math]]
