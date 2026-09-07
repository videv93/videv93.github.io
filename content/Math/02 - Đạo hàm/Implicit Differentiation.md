---
tags: [math, calculus, derivative]
status: evergreen
---
# Implicit Differentiation

> Kỹ thuật lấy đạo hàm khi **không giải được $y$ theo $x$** — và đó là đa số trường hợp. Toàn bộ kỹ thuật chỉ là [[Chain Rule]] cộng một quy ước ký hiệu.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"27) Implicit versus Explicit Differentiation 2:09:25"* trong seed.

## 1. Explicit vs implicit

| | Explicit | Implicit |
|---|---|---|
| Dạng | $y = f(x)$ | $F(x,y) = 0$ |
| Ví dụ | $y = \sqrt{25-x^2}$ | $x^2+y^2=25$ |
| Là hàm? | có | quan hệ — có thể **không** là hàm |
| Đạo hàm | trực tiếp | implicit differentiation |

Vòng tròn $x^2+y^2=25$ **không** là hàm (một $x$ cho hai $y$). Nhưng quanh mỗi điểm không nằm trên trục hoành, nó *là* hàm địa phương — và đó là điều kiện đủ để có $\frac{dy}{dx}$. (Phát biểu chặt: định lý hàm ẩn.)

## 2. Quy trình

1. Lấy $\frac{d}{dx}$ **cả hai vế**.
2. Mỗi lần gặp $y$, coi nó là $y(x)$ ⟹ nhân thêm $\frac{dy}{dx}$ (đây là chain rule).
3. Gom mọi hạng tử chứa $\frac{dy}{dx}$ về một vế.
4. Đặt nhân tử chung $\frac{dy}{dx}$ và giải.

$$x^2+y^2=25 \ \xrightarrow{d/dx}\ 2x + 2y\frac{dy}{dx}=0 \ \Rightarrow\ \frac{dy}{dx}=-\frac xy$$

Kiểm chứng: từ $y=\sqrt{25-x^2}$ ta có $y' = \frac{-x}{\sqrt{25-x^2}} = -\frac xy$. Khớp.

## 3. Bảng phản xạ

| Gặp | Đạo hàm theo $x$ | Lý do |
|---|---|---|
| $x^3$ | $3x^2$ | thường |
| $y^3$ | $3y^2\dfrac{dy}{dx}$ | chain rule |
| $xy$ | $y + x\dfrac{dy}{dx}$ | quy tắc **tích** |
| $\sin y$ | $\cos y\dfrac{dy}{dx}$ | chain rule |
| $e^{xy}$ | $e^{xy}\big(y+x\frac{dy}{dx}\big)$ | chain + tích |
| $\dfrac{x}{y}$ | $\dfrac{y - x\frac{dy}{dx}}{y^2}$ | quy tắc thương |

**Hai lỗi cấu trúc:** quên $\frac{dy}{dx}$ ở hạng tử chứa $y$, và quên rằng $xy$ cần quy tắc tích chứ không phải chain rule đơn thuần.

## 4. Ba việc chỉ làm được bằng implicit

**Tiếp tuyến với đường cong không phải hàm**
Tiếp tuyến của $x^2+y^2=25$ tại $(3,4)$: hệ số góc $=-3/4$ ⟹ $y-4=-\frac34(x-3)$.

**Đạo hàm hàm ngược**
$y=\arcsin x \Rightarrow \sin y = x \Rightarrow \cos y\cdot y' = 1 \Rightarrow y' = \frac1{\cos y}=\frac1{\sqrt{1-x^2}}$.
Đây là cách toàn bộ dòng $\arcsin/\arctan$ trong bảng [[Differentiation Rules]] được suy ra.

**Logarithmic differentiation**
$y=x^x \Rightarrow \ln y = x\ln x \Rightarrow \frac{y'}{y}=\ln x + 1 \Rightarrow y' = x^x(\ln x+1)$.
Không có cách nào khác — $x^x$ không phải lũy thừa cũng không phải hàm mũ. → [[Bases Other Than e]]

## 5. Đạo hàm cấp hai ẩn

Từ $\frac{dy}{dx}=-\frac xy$, lấy đạo hàm tiếp (quy tắc thương + thay lại $\frac{dy}{dx}$):
$$\frac{d^2y}{dx^2} = -\frac{y - x\frac{dy}{dx}}{y^2} = -\frac{y - x(-x/y)}{y^2}=-\frac{y^2+x^2}{y^3}=-\frac{25}{y^3}$$

**Bước bắt buộc:** thay $\frac{dy}{dx}$ đã tìm được vào, nếu không kết quả vẫn còn $\frac{dy}{dx}$ và vô dụng cho [[Concavity and Inflection Points]].

## 6. Cạm bẫy

1. **Quên $\frac{dy}{dx}$.** Lỗi số một. Đọc lại: mọi hạng tử có $y$ phải có $\frac{dy}{dx}$.
2. **Đạo hàm $xy$ thành $\frac{dy}{dx}$.** Là **tích** — cần $y + x\frac{dy}{dx}$.
3. **Chỉ đạo hàm một vế.** Vế phải là hằng thì thành $0$, nhưng phải viết ra.
4. **Kết quả chứa cả $x$ và $y$ và tưởng là sai.** Bình thường — implicit derivative thường phụ thuộc cả hai.
5. **Quên thay $\frac{dy}{dx}$ vào khi tính cấp hai.**
6. **Áp implicit khi giải explicit dễ hơn.** $y^3=x$ giải thẳng nhanh hơn.
7. **Không kiểm điểm có nằm trên đường cong không** trước khi tính tiếp tuyến.

## 7. Checklist áp dụng
- [ ] Đã lấy $\frac{d}{dx}$ **cả hai** vế chưa?
- [ ] Mọi hạng tử chứa $y$ đã có thừa số $\frac{dy}{dx}$ chưa?
- [ ] Hạng tử dạng $xy$, $x^2y$… đã dùng quy tắc **tích** chưa?
- [ ] Đã gom hết $\frac{dy}{dx}$ về một vế và đặt nhân tử chung chưa?
- [ ] Nếu tính tiếp tuyến: điểm đó có thoả phương trình gốc không?
- [ ] Mẫu số của $\frac{dy}{dx}$ bằng 0 ở đâu? (đó là tiếp tuyến đứng)
- [ ] Nếu cấp hai: đã thay $\frac{dy}{dx}$ vào chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §3.5: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 27 (2:09:25): https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Implicit Differentiation*: https://tutorial.math.lamar.edu/Classes/CalcI/ImplicitDIff.aspx
- Wikipedia — *Implicit function theorem*: https://en.wikipedia.org/wiki/Implicit_function_theorem

## Liên kết
[[Chain Rule]] · [[Related Rates]] · [[Differentiation Rules]] · [[Concavity and Inflection Points]] · [[Math]]
