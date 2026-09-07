---
tags: [math, calculus, transcendental]
status: evergreen
---
# The Natural Logarithm

> $\ln x$ **không** được định nghĩa là "log cơ số $e$". Nó được định nghĩa bằng **một tích phân** — và định nghĩa đó là chỗ duy nhất giải thích được vì sao $n=-1$ là ngoại lệ của quy tắc lũy thừa.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"53) The Natural Logarithm ln(x) Definition and Derivative 4:50:25"* và *"54) Integral formulas for 1/x, tan(x), cot(x), csc(x), sec(x) 4:56:30"*.

## 1. Định nghĩa bằng tích phân

$$\ln x := \int_1^x \frac1t\,dt \qquad (x>0)$$

Từ định nghĩa này, **mọi** tính chất suy ra ngay:

| Tính chất | Suy ra từ |
|---|---|
| $\ln 1 = 0$ | cận trùng nhau |
| $(\ln x)' = \frac1x$ | [[Fundamental Theorem of Calculus]] phần 1 |
| $\ln x$ tăng nghiêm ngặt trên $(0,\infty)$ | $\frac1x>0$ |
| $\ln x$ lõm xuống | $(\ln x)''=-\frac1{x^2}<0$ |
| miền $(0,\infty)$, range $\mathbb{R}$ | tích phân phân kỳ hai đầu |

**$e$ được định nghĩa sau:** $e$ là số duy nhất với $\ln e = 1$, tức $\int_1^e\frac{dt}t=1$. Rồi $e^x$ mới là hàm **ngược** của $\ln$ — xem [[The Exponential Function]].

Thứ tự này (tích phân → $\ln$ → $e$) ngược với thứ tự dạy phổ thông ($e$ → $\ln$), nhưng nó là thứ tự **chặt chẽ** duy nhất: nó không giả định trước sự tồn tại của $a^x$ với số mũ vô tỉ.

## 2. Vì sao $n=-1$ là ngoại lệ

$$\int x^n dx = \frac{x^{n+1}}{n+1}+C \quad (n\ne-1)$$

Với $n=-1$, mẫu bằng $0$. Nhưng nguyên hàm vẫn phải tồn tại (hàm $\frac1x$ liên tục trên $(0,\infty)$, nên FTC phần 1 bảo đảm). Nguyên hàm đó **không phải hàm lũy thừa nào cả** — nó là một hàm mới, và ta gọi nó là $\ln$.

$$\int\frac{dx}{x}=\ln|x|+C$$

Trị tuyệt đối vì $\ln$ chỉ xác định trên $(0,\infty)$; với $x<0$ ta có $(\ln(-x))'=\frac{-1}{-x}=\frac1x$ ✓. Nhưng nhớ cảnh báo ở [[Antiderivatives]]: hai nhánh là hai khoảng riêng, hằng số có thể khác nhau.

## 3. Tính chất đại số — chứng minh bằng calculus

$$\ln(ab)=\ln a+\ln b \qquad \ln\frac ab=\ln a-\ln b\qquad \ln(a^r)=r\ln a$$

**Chứng minh $\ln(ab)=\ln a + \ln b$:** cố định $a$, xét $f(x)=\ln(ax)-\ln x$. Thì
$$f'(x)=\frac{a}{ax}-\frac1x=0$$
nên $f$ hằng ([[Mean Value Theorem]] hệ quả 1). Thế $x=1$: $f(1)=\ln a$. Vậy $\ln(ax)=\ln x + \ln a$. ∎

Đây là mẫu chứng minh đẹp: biến một đẳng thức đại số thành một bài toán "đạo hàm bằng 0".

## 4. Năm tích phân lượng giác

Tất cả đều là mẫu $\int\frac{g'}{g}$ của [[U-Substitution]]:

| Tích phân | Kết quả | $u$ |
|---|---|---|
| $\int\tan x\,dx$ | $-\ln\vert\cos x\vert+C = \ln\vert\sec x\vert + C$ | $u=\cos x$ |
| $\int\cot x\,dx$ | $\ln\vert\sin x\vert+C$ | $u=\sin x$ |
| $\int\sec x\,dx$ | $\ln\vert\sec x+\tan x\vert+C$ | mẹo dưới |
| $\int\csc x\,dx$ | $-\ln\vert\csc x+\cot x\vert+C$ | tương tự |

**Mẹo cho $\sec x$** — nhân chia cho $(\sec x+\tan x)$:
$$\int\sec x\cdot\frac{\sec x+\tan x}{\sec x+\tan x}dx = \int\frac{\sec^2x+\sec x\tan x}{\sec x+\tan x}dx$$
Tử số **chính là** đạo hàm của mẫu ⟹ $\ln|\sec x+\tan x|+C$. Mẹo này không tự nhiên chút nào — nó được tìm ra bằng cách đoán ngược từ đáp án. Không cần thấy nó "hiển nhiên"; cần nhớ nó.

## 5. Logarithmic differentiation

Khi biểu thức là tích/thương/lũy thừa nhiều tầng, lấy $\ln$ trước rồi mới đạo hàm:
$$y=f(x) \Rightarrow \ln y = \ln f(x) \Rightarrow \frac{y'}{y}=\big[\ln f\big]' \Rightarrow y'=y\cdot\big[\ln f\big]'$$

Đây là **cách duy nhất** xử lý $x^x$, $x^{\sin x}$, $(\ln x)^x$ — cơ số **và** số mũ đều biến. → [[Implicit Differentiation]], [[Bases Other Than e]]

$\frac{y'}{y}$ gọi là **đạo hàm logarit** = tốc độ tăng trưởng **tương đối**. Trong tài chính đây chính là log return: $\ln\frac{P_t}{P_{t-1}}$ — lý do [[Quant]] dùng log return thay vì simple return.

## 6. Cạm bẫy

1. **$\int\frac{dx}x = \ln x$** thiếu trị tuyệt đối.
2. **$\ln(a+b)=\ln a+\ln b$.** Sai. Chỉ **tích** mới tách được.
3. **$\frac{\ln a}{\ln b}=\ln\frac ab$.** Sai — vế trái là $\log_b a$.
4. **$(\ln x)^2$ và $\ln(x^2)$.** Cái sau bằng $2\ln|x|$; cái trước không tách được.
5. **Quên miền $x>0$.** $\ln(x-3)$ đòi $x>3$.
6. **Nhầm $\ln$ với $\log$.** Trong toán cao cấp và hầu hết ngôn ngữ lập trình, `log` **là** $\ln$; trong kỹ thuật thường là $\log_{10}$.
7. **Coi $\ln$ tăng nhanh.** Nó tăng **chậm hơn mọi** $x^p$ — xem [[Infinite Limits and Asymptotes]] và [[Asymptotic Notation]].

## 7. Checklist áp dụng
- [ ] Đối số của $\ln$ có dương không? (xác định miền trước)
- [ ] Nếu là nguyên hàm — đã có trị tuyệt đối chưa?
- [ ] Biểu thức có phải dạng $\frac{g'}{g}$ không? (nếu có → ra $\ln|g|$ ngay)
- [ ] Đang tách $\ln$ của **tích** (được) hay của **tổng** (không được)?
- [ ] Nếu cơ số và số mũ đều chứa $x$ — đã dùng logarithmic differentiation chưa?
- [ ] `log` trong tài liệu/code này là $\ln$ hay $\log_{10}$?
- [ ] Nếu kết quả có nhiều nhánh (qua $x=0$) — hằng số hai nhánh có cần tách không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §6.2*, §7.1: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 53–54: https://www.youtube.com/watch?v=G-ti56DEXE8
- MIT OCW 18.01 — *Single Variable Calculus*, Lecture 5–6: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/
- Wikipedia — *Natural logarithm*: https://en.wikipedia.org/wiki/Natural_logarithm

## Liên kết
[[The Exponential Function]] · [[Bases Other Than e]] · [[U-Substitution]] · [[Fundamental Theorem of Calculus]] · [[Antiderivatives]] · [[Math]]
