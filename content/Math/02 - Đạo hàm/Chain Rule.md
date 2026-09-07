---
tags: [math, calculus, derivative]
status: evergreen
---
# Chain Rule

> Quy tắc quan trọng nhất trong calculus. [[Implicit Differentiation]], [[Related Rates]], [[U-Substitution]] và backpropagation trong [[ML]] đều **chỉ là** chain rule mặc áo khác.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"22) Chain Rule 1:34:10"* trong seed.

## 1. Ba cách viết cùng một thứ

$$\big[f(g(x))\big]' = f'(g(x))\cdot g'(x)$$
$$\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx} \qquad (u = g(x))$$
$$(\text{ngoài})' \text{ tại } (\text{trong}) \ \times\ (\text{trong})'$$

Dạng Leibniz nhìn như rút gọn phân số — đó là lý do ký hiệu Leibniz thắng thế. Nhưng nó **không phải** phép rút gọn; $du$ không phải một số. → [[Differentials and Linear Approximation]]

## 2. Vì sao đúng

Ý tưởng: nếu $u$ thay đổi nhanh gấp $g'$ lần $x$, và $y$ thay đổi nhanh gấp $f'$ lần $u$, thì $y$ thay đổi nhanh gấp tích hai lần so với $x$.

$$\frac{\Delta y}{\Delta x} = \frac{\Delta y}{\Delta u}\cdot\frac{\Delta u}{\Delta x}$$

Chứng minh chặt phải xử lý trường hợp $\Delta u = 0$ (dùng hàm phụ liên tục), nhưng ý tưởng đúng như trên.

**Trực giác đơn vị:** bánh răng. Xe chạy nhanh gấp 3 lần bánh xe; bánh xe quay nhanh gấp 5 lần trục ⟹ xe nhanh gấp 15 lần trục.

## 3. Quy trình

1. Xác định hàm **ngoài** $f$ và hàm **trong** $g$. Hỏi: "nếu chỉ được làm một phép cuối cùng, đó là phép gì?"
2. Đạo hàm hàm ngoài, **giữ nguyên phần trong**.
3. Nhân với đạo hàm phần trong.
4. Lồng nhiều lớp thì lặp — mỗi lớp một thừa số.

| Biểu thức | Ngoài | Trong | Kết quả |
|---|---|---|---|
| $\sin(3x)$ | $\sin$ | $3x$ | $3\cos(3x)$ |
| $(2x+1)^5$ | $(\cdot)^5$ | $2x+1$ | $10(2x+1)^4$ |
| $e^{x^2}$ | $e^{(\cdot)}$ | $x^2$ | $2xe^{x^2}$ |
| $\ln(\cos x)$ | $\ln$ | $\cos x$ | $-\tan x$ |
| $\sqrt{x^2+1}$ | $\sqrt{\cdot}$ | $x^2+1$ | $\frac{x}{\sqrt{x^2+1}}$ |
| $\sin^2(3x)$ | ba lớp | | $2\sin(3x)\cdot\cos(3x)\cdot3$ |

## 4. Chain rule ba lớp trở lên

$$\big[f(g(h(x)))\big]' = f'(g(h(x)))\cdot g'(h(x))\cdot h'(x)$$

$\sin^2(3x)$ đọc là $(\cdot)^2 \circ \sin \circ 3x$ — ba lớp, ba thừa số. Viết ra từng lớp trước khi đạo hàm thì gần như không sai.

**Trường hợp tổng quát bậc $n$ hay dùng:**
$$\big[g(x)^n\big]' = n\,g(x)^{n-1}g'(x) \qquad \big[e^{g(x)}\big]' = e^{g(x)}g'(x) \qquad \big[\ln g(x)\big]' = \frac{g'(x)}{g(x)}$$

## 5. Chain rule ở nơi khác

| Chỗ | Nó là chain rule kiểu gì |
|---|---|
| [[Implicit Differentiation]] | mỗi lần gặp $y$ thì nhân thêm $\frac{dy}{dx}$ |
| [[Related Rates]] | đạo hàm theo $t$ mọi biến phụ thuộc $t$ |
| [[U-Substitution]] | chạy **ngược** chain rule |
| Backpropagation ([[ML]]) | chain rule trên đồ thị tính toán |
| [[Matrix Powers and Dynamics]] | phiên bản ma trận: đạo hàm hợp thành tích Jacobian |

## 6. Cạm bẫy

1. **Quên nhân đạo hàm phần trong.** Lỗi số một. $(\sin 3x)' = \cos 3x$ ❌ / $3\cos 3x$ ✅.
2. **Thế phần trong vào đạo hàm sai chỗ.** $[(2x+1)^5]' = 5(2x+1)^4\cdot2$, không phải $5x^4\cdot 2$.
3. **Đếm thiếu lớp.** $\sin^2(3x)$ có ba lớp, không phải hai.
4. **Nhầm $\sin^2 x$ với $\sin(x^2)$.** Cái đầu là $(\sin x)^2$ (ngoài là bình phương), cái sau ngoài là $\sin$.
5. **Dùng chain rule khi thật ra là tích.** $x\sin x$ không lồng nhau.
6. **Rút gọn $\frac{dy}{du}\cdot\frac{du}{dx}$ như phân số rồi tưởng đó là chứng minh.**

## 7. Checklist áp dụng
- [ ] Đã tách rõ hàm ngoài / hàm trong chưa? (viết ra $u = \ldots$)
- [ ] Có bao nhiêu lớp lồng? Số thừa số trong kết quả có bằng số lớp không?
- [ ] Đạo hàm hàm ngoài đã **giữ nguyên** phần trong chưa?
- [ ] Đã nhân đạo hàm phần trong chưa? (đọc lại kết quả, đếm thừa số)
- [ ] $\sin^2 x$ hay $\sin(x^2)$?
- [ ] Nếu nhiều lớp — đã viết từng lớp ra giấy trước khi nhân chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §3.4: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 22 (1:34:10): https://www.youtube.com/watch?v=G-ti56DEXE8
- 3Blue1Brown — *Visualizing the chain rule and product rule*: https://www.3blue1brown.com/lessons/chain-rule-and-product-rule
- Paul's Online Math Notes — *Chain Rule*: https://tutorial.math.lamar.edu/Classes/CalcI/ChainRule.aspx

## Liên kết
[[Differentiation Rules]] · [[Implicit Differentiation]] · [[Related Rates]] · [[U-Substitution]] · [[Product and Quotient Rule]] · [[Math]]
