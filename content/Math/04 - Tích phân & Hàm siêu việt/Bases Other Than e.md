---
tags: [math, calculus, transcendental]
status: evergreen
---
# Bases Other Than e

> Mọi cơ số quy về $e$ bằng một đẳng thức: $a^x = e^{x\ln a}$. Nhớ đúng một dòng đó là không bao giờ phải nhớ bảng công thức cho $a^x$ và $\log_a x$.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"56) Derivatives and Integrals for Bases other than e 5:08:33"* trong seed, cùng bốn mục ví dụ cuối (*"57–60) Integration/Derivative Example 1–2"*).

## 1. Đẳng thức nền

$$\boxed{a^x = e^{x\ln a}} \qquad\qquad \boxed{\log_a x = \frac{\ln x}{\ln a}}$$

Đẳng thức thứ nhất là **định nghĩa** của $a^x$ khi $x$ vô tỉ — không có cách nào khác để nói $2^{\sqrt2}$ nghĩa là gì. Đó là lý do [[The Natural Logarithm]] phải được xây trước.

Đẳng thức thứ hai gọi là **đổi cơ số** — suy ra bằng cách lấy $\ln$ hai vế của $a^{\log_a x}=x$.

## 2. Bảng đạo hàm và nguyên hàm

| | Đạo hàm | Nguyên hàm |
|---|---|---|
| $a^x$ | $a^x\ln a$ | $\dfrac{a^x}{\ln a}+C$ |
| $a^{g(x)}$ | $a^{g}\ln a\cdot g'$ | — |
| $\log_a x$ | $\dfrac1{x\ln a}$ | $\dfrac{x\ln x - x}{\ln a}+C$ |
| $x^n$ ($n$ hằng) | $nx^{n-1}$ | $\dfrac{x^{n+1}}{n+1}+C$ |
| $x^x$ | $x^x(\ln x+1)$ | không sơ cấp |

**Suy $(a^x)'$ trong hai dòng:**
$$(a^x)' = (e^{x\ln a})' = e^{x\ln a}\cdot\ln a = a^x\ln a$$
Chỉ là [[Chain Rule]]. Không cần nhớ riêng.

Khi $a=e$: $\ln e = 1$ ⟹ mọi $\ln a$ biến mất và bảng thu về bảng của $e$. Đó là **toàn bộ lý do** $e$ được gọi là cơ số "tự nhiên": nó là cơ số duy nhất không sinh ra hằng số thừa.

## 3. Bốn dạng lũy thừa — đừng nhầm

| Dạng | Ví dụ | Công cụ |
|---|---|---|
| Cơ số biến, mũ **hằng** | $x^5$ | quy tắc lũy thừa |
| Cơ số **hằng**, mũ biến | $5^x$ | quy tắc hàm mũ |
| **Cả hai** biến | $x^x$, $x^{\sin x}$ | logarithmic differentiation |
| Cả hai hằng | $5^5$ | đạo hàm $=0$ |

> [!warning] Đây là phân loại quan trọng nhất trong note
> Nhầm dòng 1 với dòng 2 là lỗi phổ biến nhất của cả chương hàm siêu việt. Nhìn xem **$x$ nằm ở đâu** trước khi chọn công thức.

**Dòng 3 — quy trình:** lấy $\ln$, đạo hàm ẩn, nhân lại $y$.
$$y=x^{\sin x} \Rightarrow \ln y = \sin x\ln x \Rightarrow \frac{y'}y = \cos x\ln x + \frac{\sin x}{x}$$
$$\Rightarrow y' = x^{\sin x}\left(\cos x\ln x+\frac{\sin x}x\right)$$
→ [[Implicit Differentiation]]

## 4. Cơ số hay dùng ngoài toán

| Cơ số | Dùng ở đâu | Vì sao |
|---|---|---|
| $e$ | giải tích, tăng trưởng liên tục, thống kê | không sinh hằng số thừa |
| $2$ | khoa học máy tính, entropy (bit) | chia đôi → [[DS&AL]] |
| $10$ | kỹ thuật, pH, decibel, thang Richter | khớp hệ thập phân |

Đổi giữa chúng chỉ là nhân một hằng số: $\log_2 x = \frac{\ln x}{\ln 2}\approx 1.4427\ln x$. Vì thế trong [[Asymptotic Notation]], $O(\log n)$ không cần ghi cơ số — mọi cơ số sai khác hằng số.

## 5. Giải phương trình mũ và log

**Phương trình mũ:** lấy $\ln$ hai vế.
$$3^{2x}=7 \Rightarrow 2x\ln3=\ln7 \Rightarrow x = \frac{\ln7}{2\ln3}$$

**Phương trình log:** mũ hoá hai vế — rồi **kiểm nghiệm ngoại lai**.
$$\ln x + \ln(x-3)=\ln 4 \Rightarrow x(x-3)=4 \Rightarrow x=4 \text{ hoặc } x=-1$$
$x=-1$ **loại** vì $\ln(-1)$ không xác định. Bước kiểm này bắt buộc, vì phép mũ hoá làm mất điều kiện miền.

## 6. Cạm bẫy

1. **Quên $\ln a$.** $(2^x)'=2^x$ ❌ / $2^x\ln2$ ✅.
2. **Nhầm $x^a$ với $a^x$.**
3. **$\int a^x dx = a^x\ln a$.** Sai chiều — nguyên hàm **chia** cho $\ln a$.
4. **Áp quy tắc lũy thừa cho $x^x$.**
5. **Không kiểm nghiệm ngoại lai** khi giải phương trình log.
6. **$\log(a+b)=\log a+\log b$.**
7. **Nhầm cơ số mặc định.** `log` trong Python/C là $\ln$; trong máy tính bỏ túi thường là $\log_{10}$; trong CS lý thuyết thường là $\log_2$.
8. **Đổi cơ số ngược phân số.** $\log_a x = \frac{\ln x}{\ln a}$ — cơ số ở **mẫu**.

## 7. Checklist áp dụng
- [ ] $x$ nằm ở cơ số, ở số mũ, hay cả hai? (bảng mục 3)
- [ ] Nếu là $a^x$ — đã có thừa số $\ln a$ chưa? Đúng chiều nhân/chia chưa?
- [ ] Nếu cả hai biến — đã lấy $\ln$ trước chưa?
- [ ] Có hàm hợp trong số mũ không → đã nhân $g'$ chưa?
- [ ] Nếu giải phương trình log — đã kiểm mọi nghiệm thoả miền xác định chưa?
- [ ] Đổi cơ số: cơ số cũ ở tử hay mẫu?
- [ ] Trong code: `log` này là cơ số mấy?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §6.4, §7.4: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 56–60 (5:08:33–5:20:32): https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Derivatives of Exponential and Logarithm Functions*: https://tutorial.math.lamar.edu/Classes/CalcI/DiffExpLogFcns.aspx
- Wikipedia — *Change of base formula*: https://en.wikipedia.org/wiki/Logarithm#Change_of_base

## Liên kết
[[The Natural Logarithm]] · [[The Exponential Function]] · [[Implicit Differentiation]] · [[Chain Rule]] · [[Asymptotic Notation]] · [[Math]]
