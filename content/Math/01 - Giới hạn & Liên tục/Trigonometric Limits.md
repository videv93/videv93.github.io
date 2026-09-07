---
tags: [math, calculus, limits, trigonometry]
status: evergreen
---
# Trigonometric Limits

> Hai giới hạn. Thuộc hai cái này là giải được gần như mọi giới hạn lượng giác trong Calculus 1 — và chúng cũng chính là thứ sinh ra $(\sin x)' = \cos x$.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả ba header rỗng liền nhau trong seed: *"Trig Function Limit Example 1 / 2 / 3"* (21:37, 22:38, 23:41).

## 1. Hai giới hạn nền

$$\boxed{\lim_{x\to0}\frac{\sin x}{x}=1} \qquad\qquad \boxed{\lim_{x\to0}\frac{1-\cos x}{x}=0}$$

Điều kiện **bắt buộc**: $x$ tính bằng **radian**. Ở độ, $\lim_{x\to0}\frac{\sin x^\circ}{x}=\frac{\pi}{180}$. Đây là lý do duy nhất khiến toán cao cấp dùng radian.

**Biến thể hay dùng thứ ba:**
$$\lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12 \qquad \lim_{x\to0}\frac{\tan x}{x}=1$$

## 2. Vì sao $\frac{\sin x}{x}\to1$

Chứng minh hình học bằng [[Limits]] (định lý kẹp), trên $0<x<\pi/2$ trong đường tròn đơn vị:

$$\text{diện tích tam giác trong} \le \text{diện tích quạt} \le \text{diện tích tam giác ngoài}$$
$$\tfrac12\sin x \ \le\ \tfrac12 x \ \le\ \tfrac12\tan x$$

Chia cho $\tfrac12 \sin x$ (dương):
$$1 \le \frac{x}{\sin x} \le \frac{1}{\cos x} \ \Longrightarrow\ \cos x \le \frac{\sin x}{x} \le 1$$

Vì $\cos x \to 1$, định lý kẹp cho kết quả. Hàm chẵn nên phía trái cũng vậy.

> [!warning] Đây là chứng minh, không phải chu trình luẩn quẩn — **nếu** diện tích quạt được định nghĩa độc lập với đạo hàm. Dùng L'Hôpital cho giới hạn này thì luẩn quẩn: L'Hôpital cần $(\sin x)'=\cos x$, mà công thức đó lại cần chính giới hạn này.

## 3. Kỹ thuật biến đổi

**Nguyên tắc:** ép biểu thức về đúng dạng $\frac{\sin(\square)}{\square}$ với cùng một $\square$ ở trên và dưới.

| Bài | Biến đổi | Kết quả |
|---|---|---|
| $\lim_{x\to0}\dfrac{\sin 5x}{x}$ | nhân chia cho $5$: $5\cdot\dfrac{\sin5x}{5x}$ | $5$ |
| $\lim_{x\to0}\dfrac{\sin 3x}{\sin 7x}$ | $\dfrac{3}{7}\cdot\dfrac{\sin3x}{3x}\cdot\dfrac{7x}{\sin7x}$ | $3/7$ |
| $\lim_{x\to0}\dfrac{\tan x}{x}$ | $\dfrac{\sin x}{x}\cdot\dfrac1{\cos x}$ | $1$ |
| $\lim_{x\to0}\dfrac{1-\cos x}{x^2}$ | nhân liên hợp $\to \dfrac{\sin^2x}{x^2(1+\cos x)}$ | $1/2$ |
| $\lim_{x\to0}\dfrac{x}{\sin x}$ | nghịch đảo | $1$ |
| $\lim_{x\to\pi}\dfrac{\sin x}{x-\pi}$ | đặt $u=x-\pi$, $\sin x=-\sin u$ | $-1$ |

**Mẹo đổi biến:** giới hạn không ở $0$ thì đặt $u = x - a$ để kéo về $0$.

## 4. Khi nào **không** dùng bảng này

- $x \to \infty$: $\lim_{x\to\infty}\frac{\sin x}{x}=0$ — đây là **định lý kẹp** ($-\frac1x \le \frac{\sin x}{x}\le\frac1x$), không phải giới hạn nền.
- $\lim_{x\to\infty}\sin x$ **không tồn tại** — dao động vĩnh viễn, không tiến tới đâu.
- Mẫu không tiến về $0$ cùng tốc độ: $\lim_{x\to0}\frac{\sin x}{x^2}$ không hữu hạn.

## 5. Cạm bẫy

1. **Dùng độ thay vì radian.** Sai ngay hằng số.
2. **$\frac{\sin 5x}{x} = 1$.** Sai — hệ số trong ngoặc phải khớp với mẫu.
3. **Dùng L'Hôpital chứng minh $\frac{\sin x}{x}\to1$.** Luẩn quẩn (mục 2).
4. **Nhầm $\frac{1-\cos x}{x}\to0$ với $\frac{1-\cos x}{x^2}\to\frac12$.** Hai bậc khác nhau, hai kết quả khác nhau.
5. **Quên rằng $\sin$ bị chặn.** Với $x\to\infty$, tính bị chặn mới là công cụ, không phải bảng trên.
6. **Áp $\frac{\sin\square}{\square}$ khi $\square \not\to 0$.**

## 6. Checklist áp dụng
- [ ] Đang ở radian chứ?
- [ ] Biểu thức có phải dạng vô định $\frac00$ không? (nếu không, thế thẳng)
- [ ] Đối số trong $\sin$ và mẫu số đã **khớp nhau** chưa?
- [ ] Nếu $x \to a \ne 0$: đã đổi biến $u=x-a$ chưa?
- [ ] Có $1-\cos$ không → đã thử nhân liên hợp chưa?
- [ ] Nếu $x\to\infty$: đã chuyển sang lập luận bị chặn + kẹp chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §2.4, §3.3: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 8–10: https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Derivatives of Trig Functions* (chứng minh giới hạn): https://tutorial.math.lamar.edu/Classes/CalcI/DiffTrigFcns.aspx
- Wikipedia — *Squeeze theorem* (mục ví dụ $\sin x/x$): https://en.wikipedia.org/wiki/Squeeze_theorem

## Liên kết
[[Limits]] · [[Computing Limits]] · [[Differentiation Rules]] · [[Math]]
