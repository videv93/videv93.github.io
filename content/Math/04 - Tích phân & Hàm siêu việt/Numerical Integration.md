---
tags: [math, calculus, integral, numerical]
status: evergreen
---
# Numerical Integration

> Khi không có nguyên hàm sơ cấp — tức phần lớn trường hợp thực tế — vẫn tính được tích phân, chỉ là gần đúng. Điều đáng nhớ không phải công thức mà là **bậc sai số**.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"52) Simpson's Rule 4:44:59"* trong seed. Seed còn kèm ghi chú của chính tác giả: *"error here: forgot to cube the (3/2) here at the end, otherwise ok!"* — giữ lại vì nó là lời nhắc rằng số học của phương pháp số dễ sai đến mức nào.

## 1. Ba quy tắc

Với $n$ khoảng con đều, $\Delta x = \frac{b-a}{n}$, $x_i = a+i\Delta x$:

| Quy tắc | Công thức | Xấp xỉ $f$ bằng | Sai số |
|---|---|---|---|
| **Trapezoid** | $\frac{\Delta x}{2}\big[f_0 + 2f_1+\cdots+2f_{n-1}+f_n\big]$ | đoạn thẳng | $O(1/n^2)$ |
| **Midpoint** | $\Delta x\big[f(\bar x_1)+\cdots+f(\bar x_n)\big]$ | hằng tại trung điểm | $O(1/n^2)$ |
| **Simpson** | $\frac{\Delta x}{3}\big[f_0+4f_1+2f_2+4f_3+\cdots+4f_{n-1}+f_n\big]$ | **parabol** | $O(1/n^4)$ |

**Hệ số Simpson:** $1, 4, 2, 4, 2, \ldots, 4, 1$. Đầu và cuối là $1$; các chỉ số **lẻ** hệ số $4$; các chỉ số **chẵn** ở giữa hệ số $2$. Tổng hệ số phải bằng $3n$ — phép kiểm nhanh.

> [!warning] Simpson đòi $n$ **chẵn**
> Vì mỗi parabol phủ **hai** khoảng con. $n$ lẻ thì công thức vô nghĩa.

## 2. Chặn sai số

| Quy tắc | Chặn |
|---|---|
| Trapezoid | $\vert E_T\vert \le \dfrac{K_2(b-a)^3}{12n^2}$, $K_2 = \max\vert f''\vert$ |
| Midpoint | $\vert E_M\vert \le \dfrac{K_2(b-a)^3}{24n^2}$ |
| Simpson | $\vert E_S\vert \le \dfrac{K_4(b-a)^5}{180n^4}$, $K_4=\max\vert f^{(4)}\vert$ |

Đọc bảng này cho biết:

- Midpoint **chính xác gấp đôi** trapezoid, cùng công sức. Trapezoid phổ biến hơn chỉ vì tái sử dụng được các điểm mút.
- Gấp đôi $n$: trapezoid/midpoint giảm sai số $4$ lần; Simpson giảm **16** lần.
- $f''=0$ (hàm tuyến tính) ⟹ trapezoid **chính xác tuyệt đối**.
- $f^{(4)}=0$ (bậc $\le3$) ⟹ Simpson **chính xác tuyệt đối**. Simpson xấp xỉ bằng parabol nhưng lại tích phân đúng cả bậc ba — một sự may mắn do đối xứng.

## 3. Chiều lệch

| $f$ | Trapezoid | Midpoint |
|---|---|---|
| lõm lên ($f''>0$) | **thừa** | thiếu |
| lõm xuống ($f''<0$) | thiếu | thừa |

Dây cung nằm trên đường cong lõm lên; tiếp tuyến tại trung điểm nằm dưới. → [[Concavity and Inflection Points]]

Hệ quả hữu ích: trapezoid và midpoint **kẹp** giá trị thật. Và $\frac{2M+T}{3}$ = đúng công thức Simpson — đó là cách suy ra Simpson mà không cần parabol.

## 4. Khi nào dùng

| Tình huống | Vì sao cần số |
|---|---|
| $\int e^{-x^2}dx$ | không có nguyên hàm sơ cấp → [[Antiderivatives]] |
| $\int\frac{\sin x}{x}dx$ | như trên |
| Dữ liệu đo rời rạc | không có công thức $f$ |
| Nguyên hàm tồn tại nhưng quá phức tạp | rẻ hơn |
| Định giá phái sinh, VaR | → [[Quant]], Monte Carlo |

Với chiều cao (nhiều biến), các quy tắc lưới này sụp đổ vì số điểm tăng $n^d$ — đó là lúc Monte Carlo thắng, dù chỉ hội tụ $O(1/\sqrt N)$. → [[Prob&Stats]]

## 5. Cạm bẫy

1. **Dùng Simpson với $n$ lẻ.**
2. **Sai hệ số $4/2$.** Đếm lại: bắt đầu và kết thúc bằng $1$, xen kẽ $4,2,4,2,\ldots,4$.
3. **Quên nhân $\frac{\Delta x}{3}$** (Simpson) hay $\frac{\Delta x}{2}$ (trapezoid).
4. **Lấy $K$ là $\vert f''(a)\vert$ thay vì $\max\vert f''\vert$ trên **toàn** khoảng.**
5. **Áp cho hàm không trơn.** Chặn sai số cần $f''$ (hoặc $f^{(4)}$) tồn tại và bị chặn. Với hàm có góc, chia khoảng tại đó.
6. **Áp cho tích phân suy rộng.** Hàm không bị chặn thì mọi quy tắc trên vô nghĩa.
7. **Lỗi số học khi thế** — chính là lỗi tác giả seed tự ghi lại.
8. **Tăng $n$ vô hạn.** Quá một ngưỡng, sai số làm tròn máy tính lấn át sai số phương pháp.

## 6. Checklist áp dụng
- [ ] $n$ có chẵn không (nếu dùng Simpson)?
- [ ] $\Delta x = \frac{b-a}{n}$ đã tính đúng chưa?
- [ ] Hệ số có đúng mẫu $1,4,2,\ldots,4,1$ không? Tổng hệ số $=3n$ chưa?
- [ ] Đã nhân thừa số $\frac{\Delta x}{3}$ (hoặc $\frac{\Delta x}{2}$) chưa?
- [ ] Nếu cần chặn sai số: $K$ có phải **max** trên toàn khoảng không?
- [ ] $f$ có trơn đủ bậc trên $[a,b]$ không? Có bị chặn không?
- [ ] Kết quả có nằm giữa ước lượng trapezoid và midpoint không?
- [ ] Đã kiểm lại số học bằng cách tính với $n$ nhỏ hơn xem có hội tụ không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §7.7: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 52 (4:44:59): https://www.youtube.com/watch?v=G-ti56DEXE8
- Burden & Faires — *Numerical Analysis*, ch. 4: https://www.cengage.com/c/numerical-analysis-10e-burden
- Wikipedia — *Simpson's rule*: https://en.wikipedia.org/wiki/Simpson%27s_rule

## Liên kết
[[Riemann Sums]] · [[Fundamental Theorem of Calculus]] · [[Antiderivatives]] · [[Newton's Method]] · [[Concavity and Inflection Points]] · [[Math]]
