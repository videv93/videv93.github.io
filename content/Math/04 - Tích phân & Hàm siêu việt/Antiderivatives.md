---
tags: [math, calculus, integral]
status: evergreen
---
# Antiderivatives

> Đạo hàm chạy ngược. Dễ phát biểu, khó làm — vì đạo hàm luôn tính được theo thuật toán còn nguyên hàm thì **không**. Và cái $+C$ ai cũng quên là hệ quả trực tiếp của [[Mean Value Theorem]].

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"40) Indefinite Integration (theory) 3:24:11"* và *"41) Indefinite Integration (formulas) 3:34:52"*.

## 1. Định nghĩa

$F$ là **nguyên hàm** của $f$ trên khoảng $I$ nếu $F'(x)=f(x)$ với mọi $x \in I$.

$$\int f(x)\,dx = F(x)+C$$

Ký hiệu này gọi là **tích phân bất định**. Nó **chưa** liên quan gì tới diện tích — mối liên hệ đó là nội dung của [[Fundamental Theorem of Calculus]], và là một định lý, không phải định nghĩa.

## 2. Vì sao có $+C$

Nếu $F'=G'=f$ trên một khoảng thì $(F-G)'=0$, và theo hệ quả 1 của [[Mean Value Theorem]], $F-G$ là **hằng số**.

Nên: mọi nguyên hàm khác nhau đúng một hằng số. $+C$ mô tả **toàn bộ** họ nghiệm.

> [!warning] "Trên một khoảng" là điều kiện thật
> $\int \frac{dx}{x} = \ln|x| + C$ chỉ đúng trên $(0,\infty)$ hoặc $(-\infty,0)$ **riêng**. Trên miền không liên thông, hằng số hai bên có thể **khác nhau** — chặt chẽ phải viết $C_1, C_2$. Hầu hết sách Calculus 1 bỏ qua chỗ này.

Bỏ $+C$ trong tích phân bất định là mất nghiệm — nghiêm trọng nhất khi giải phương trình vi phân, nơi $C$ được xác định bởi điều kiện đầu ([[Motion and Kinematics]]).

## 3. Bảng nguyên hàm

| $f(x)$ | $\int f\,dx$ |
|---|---|
| $x^n$, $n\ne-1$ | $\dfrac{x^{n+1}}{n+1}+C$ |
| $\dfrac1x$ | $\ln\vert x\vert + C$ |
| $e^x$ | $e^x+C$ |
| $a^x$ | $\dfrac{a^x}{\ln a}+C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x+C$ |
| $\sec^2x$ | $\tan x+C$ |
| $\sec x\tan x$ | $\sec x+C$ |
| $\csc^2 x$ | $-\cot x+C$ |
| $\dfrac1{1+x^2}$ | $\arctan x + C$ |
| $\dfrac1{\sqrt{1-x^2}}$ | $\arcsin x + C$ |

**Dấu ngược nhau so với đạo hàm:** $(\cos)' = -\sin$ nên $\int\sin = -\cos$. Đây là chỗ sai dấu kinh điển.

$n=-1$ là ngoại lệ **duy nhất** của quy tắc lũy thừa, và lý do là [[The Natural Logarithm]]. $\int\tan x\,dx$, $\int\sec x\,dx$ cũng thuộc nhóm log — xem note đó.

## 4. Tính chất

$$\int [f\pm g] = \int f \pm \int g \qquad \int cf = c\int f$$

> [!warning] Không có quy tắc tích, quy tắc thương, quy tắc hợp cho tích phân
> $\int fg \ne \int f\int g$. Đây là khác biệt cấu trúc lớn nhất giữa đạo hàm và tích phân: đạo hàm có quy tắc cho **mọi** phép ghép; tích phân chỉ có tuyến tính. Mọi kỹ thuật tích phân ([[U-Substitution]], tích phân từng phần) là **mẹo đảo ngược** một quy tắc đạo hàm cụ thể.

Hệ quả: nhiều hàm sơ cấp **không có** nguyên hàm sơ cấp — $e^{-x^2}$, $\frac{\sin x}{x}$, $\frac1{\ln x}$. Điều này được **chứng minh** (định lý Liouville), không phải "chưa ai tìm ra". Hàm $e^{-x^2}$ chính là hàm mật độ chuẩn — lý do bảng $\Phi(z)$ tồn tại trong [[Prob&Stats]].

## 5. Quy trình

1. Rút gọn / khai triển / chia đa thức **trước**. Thường bài trở thành tổng lũy thừa.
2. Tách tổng, kéo hằng ra ngoài.
3. Tra bảng cho từng hạng tử.
4. Nếu không khớp bảng → thử [[U-Substitution]].
5. Cộng $+C$.
6. **Kiểm bằng cách đạo hàm ngược lại.** Phép kiểm này miễn phí và bắt được gần như mọi lỗi.

$$\int \frac{x^2+1}{x}dx = \int\left(x+\frac1x\right)dx = \frac{x^2}2+\ln|x|+C$$

## 6. Cạm bẫy

1. **Quên $+C$.**
2. **Áp quy tắc lũy thừa cho $n=-1$.** Ra $\frac{x^0}{0}$ — chia cho 0.
3. **Sai dấu ở $\sin/\cos$.**
4. **$\int\frac1x dx = \ln x$** thiếu trị tuyệt đối.
5. **Bịa quy tắc tích.**
6. **Đạo hàm ngược quy tắc lũy thừa cho hàm hợp.** $\int(2x+1)^5dx \ne \frac{(2x+1)^6}{6}$ — thiếu chia cho $2$. Đây là [[Chain Rule]] chạy ngược → [[U-Substitution]].
7. **Cố tìm nguyên hàm sơ cấp cho hàm không có.** Biết danh sách ở mục 4 tiết kiệm rất nhiều thời gian.

## 7. Checklist áp dụng
- [ ] Đã rút gọn / chia / khai triển biểu thức trước chưa?
- [ ] Có hàm hợp không? (nếu có → substitution, không phải tra bảng thẳng)
- [ ] $n=-1$ có xuất hiện không?
- [ ] Dấu của $\sin/\cos$ đã đúng chiều ngược chưa?
- [ ] Có $\ln$ không → đã có trị tuyệt đối chưa?
- [ ] Đã cộng $+C$ chưa?
- [ ] **Đã đạo hàm kết quả để kiểm chưa?**

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §4.9, §5.4: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 40–41: https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Indefinite Integrals*: https://tutorial.math.lamar.edu/Classes/CalcI/IndefiniteIntegrals.aspx
- Wikipedia — *Liouville's theorem (differential algebra)*: https://en.wikipedia.org/wiki/Liouville%27s_theorem_(differential_algebra)

## Liên kết
[[U-Substitution]] · [[Fundamental Theorem of Calculus]] · [[Mean Value Theorem]] · [[The Natural Logarithm]] · [[Motion and Kinematics]] · [[Math]]
