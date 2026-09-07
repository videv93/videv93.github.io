---
tags: [math, calculus, derivative]
status: evergreen
---
# Product and Quotient Rule

> Hai quy tắc, một nguồn gốc, và một cạm bẫy chung: **thứ tự trừ**. Quy tắc tích đối xứng nên sai cũng ra đúng; quy tắc thương thì không tha thứ.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"20) Product Rule 1:26:59"* và *"21) Quotient Rule 1:30:26"*.

## 1. Hai công thức

$$(fg)' = f'g + fg' \qquad\qquad \left(\frac fg\right)' = \frac{f'g - fg'}{g^2}$$

**Đọc quy tắc thương thành câu:** *"đạo hàm tử nhân mẫu, trừ tử nhân đạo hàm mẫu, tất cả chia mẫu bình phương."* Thứ tự trừ là bắt buộc — $\frac{fg'-f'g}{g^2}$ sai dấu.

## 2. Vì sao quy tắc tích đúng

Từ [[Derivative Definition]], thêm và bớt $f(x+h)g(x)$:

$$\frac{f(x+h)g(x+h)-f(x)g(x)}{h} = \underbrace{\frac{f(x+h)-f(x)}{h}}_{\to f'}g(x) + f(x+h)\underbrace{\frac{g(x+h)-g(x)}{h}}_{\to g'}$$

Bước cuối cần $f(x+h)\to f(x)$, tức cần $f$ **liên tục** — mà khả vi kéo theo liên tục ([[Continuity]]).

**Trực giác diện tích:** hình chữ nhật cạnh $f$ và $g$; khi cả hai giãn ra một chút, diện tích tăng thêm hai dải ($f'g$ và $fg'$) cộng một góc nhỏ $f'g'h$ — góc này bậc $h^2$ nên biến mất trong giới hạn.

**Quy tắc thương suy từ quy tắc tích** + [[Chain Rule]]: viết $\frac fg = f\cdot g^{-1}$, đạo hàm $g^{-1}$ là $-g^{-2}g'$, gom lại là ra.

## 3. Mở rộng ba hàm trở lên

$$(fgh)' = f'gh + fg'h + fgh'$$

Mẫu chung: **đạo hàm từng thừa số một, giữ nguyên các thừa số khác, cộng lại.** Đúng cho $n$ thừa số.

Với nhiều thừa số hoặc lũy thừa phức tạp, **logarithmic differentiation** nhanh hơn:
$$y = \frac{x^2(x+1)^3}{\sqrt{x-1}} \Rightarrow \ln y = 2\ln x + 3\ln(x+1) - \tfrac12\ln(x-1)$$
$$\frac{y'}{y} = \frac2x + \frac3{x+1} - \frac1{2(x-1)} \Rightarrow y' = y\cdot(\cdots)$$
→ [[The Natural Logarithm]]

## 4. Khi nào **không** dùng quy tắc thương

Quy tắc thương tạo biểu thức cồng kềnh. Ba lối tránh:

| Biểu thức | Cách tốt hơn |
|---|---|
| $\frac{x^2+3x}{x}$ | chia ra trước: $x+3$ ⟹ $y'=1$ |
| $\frac{5}{x^3}$ | viết $5x^{-3}$ ⟹ $-15x^{-4}$ |
| $\frac{f(x)}{c}$ (c hằng) | $\frac1c f'$ |
| $\frac{c}{g(x)}$ | $c\cdot g^{-1}$ + chain rule |

Chỉ dùng quy tắc thương khi **cả tử và mẫu** đều là hàm không tầm thường của $x$.

## 5. Cạm bẫy

1. **$(fg)'=f'g'$.** Kiểm bằng $f=g=x$.
2. **Đảo thứ tự trừ ở quy tắc thương.** Sai dấu toàn bộ kết quả. Mẹo: **tử trước** — bắt đầu bằng $f'$.
3. **Quên bình phương mẫu.**
4. **Áp quy tắc thương cho $\frac{f}{c}$ với $c$ hằng.** Ra $\frac{f'c - 0}{c^2}=\frac{f'}{c}$ — đúng nhưng vòng vo, dễ sai.
5. **Quên chain rule bên trong.** $\left(\frac{\sin 2x}{x}\right)'$ cần $(\sin2x)'=2\cos2x$.
6. **Không rút gọn kết quả.** Bài sau ([[First Derivative Test]]) cần **giải $f'=0$** — biểu thức chưa rút gọn thì không giải nổi.

## 6. Checklist áp dụng
- [ ] Có rút gọn được biểu thức thành tổng trước không? (thường có)
- [ ] Nếu là tích: đã đạo hàm **từng** thừa số và giữ nguyên phần còn lại chưa?
- [ ] Nếu là thương: tử bắt đầu bằng $f'g$ chứ không phải $fg'$?
- [ ] Mẫu đã bình phương chưa?
- [ ] Có hàm lồng nào cần chain rule bên trong không?
- [ ] Đã rút gọn / phân tích nhân tử $f'$ để lát nữa giải $f'=0$ được chưa?
- [ ] Kiểm nhanh với một giá trị $x$ cụ thể?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §3.2: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 20–21: https://www.youtube.com/watch?v=G-ti56DEXE8
- 3Blue1Brown — *Visualizing the chain rule and product rule*: https://www.3blue1brown.com/lessons/chain-rule-and-product-rule
- Paul's Online Math Notes — *Product and Quotient Rule*: https://tutorial.math.lamar.edu/Classes/CalcI/ProductQuotientRule.aspx

## Liên kết
[[Differentiation Rules]] · [[Chain Rule]] · [[Derivative Definition]] · [[The Natural Logarithm]] · [[Math]]
