---
tags: [math, calculus, limits, technique]
status: evergreen
---
# Computing Limits

> Bảng tra kỹ thuật: nhìn dạng biểu thức → biết ngay dùng công cụ nào. Đây là phần seed hứa nhiều nhất (7 mục riêng biệt) và cũng là phần dễ thành phản xạ nhất.

> ⚠️ Note này thuộc nhánh calculus tính toán. Đọc [[Computational vs Rigorous Mathematics]] trước khi coi việc thành thạo bảng dưới là "biết giới hạn".

> [!note] Ghi chú nguồn
> Trả bảy header rỗng liền nhau trong seed: *"Computing Limits from a Graph"*, *"Computing Basic Limits by plugging in numbers and factoring"*, *"Limit using the Difference of Cubes Formula"*, *"Limit with Absolute Value"*, *"Limit by Rationalizing"*, *"Limit of a Piecewise Function"*, *"Limits at Infinity"*.

## 1. Cây quyết định

| Nhìn thấy | Dùng | Vì sao |
|---|---|---|
| Đa thức, hàm hữu tỉ mẫu $\ne 0$ | **Thế trực tiếp** | hàm liên tục tại đó |
| $\frac00$ với đa thức | **Phân tích nhân tử**, rút gọn | thừa số $(x-a)$ triệt tiêu |
| $\frac00$ có căn | **Nhân liên hợp** | biến căn thành đa thức |
| $\frac00$ có $a^3\pm b^3$ | **Hằng đẳng thức lập phương** | $a^3-b^3=(a-b)(a^2+ab+b^2)$ |
| Trị tuyệt đối | **Tách hai phía** | $\vert x\vert$ đổi công thức tại $0$ |
| Hàm từng khúc tại điểm nối | **Tách hai phía** | hai công thức khác nhau |
| Hàm lượng giác, $\frac00$ | **Hai giới hạn chuẩn** | → [[Trigonometric Limits]] |
| $\frac{\infty}{\infty}$, $x\to\pm\infty$ | **Chia cho lũy thừa cao nhất** | → [[Infinite Limits and Asymptotes]] |
| Dao động bị chặn | **Định lý kẹp** | → [[Limits]] |
| Mẫu $\to 0$, tử $\ne 0$ | **Xét dấu hai phía** | ra $\pm\infty$ hoặc không tồn tại |
| Đồ thị cho sẵn | **Đọc hai phía bằng mắt** | giá trị tại điểm **không** tính |

## 2. Bốn kỹ thuật đại số

**Phân tích nhân tử**
$$\lim_{x\to3}\frac{x^2-9}{x-3}=\lim_{x\to3}\frac{(x-3)(x+3)}{x-3}=\lim_{x\to3}(x+3)=6$$
Rút gọn hợp lệ vì $x \ne 3$ trong định nghĩa giới hạn.

**Hiệu/tổng lập phương**
$$a^3-b^3=(a-b)(a^2+ab+b^2), \qquad a^3+b^3=(a+b)(a^2-ab+b^2)$$
$$\lim_{x\to2}\frac{x^3-8}{x-2}=\lim_{x\to2}(x^2+2x+4)=12$$

**Nhân liên hợp**
$$\lim_{x\to0}\frac{\sqrt{x+4}-2}{x}=\lim_{x\to0}\frac{x}{x(\sqrt{x+4}+2)}=\frac14$$
Nhân cả tử và mẫu với $\sqrt{x+4}+2$. Với căn bậc ba, liên hợp là $a^2+ab+b^2$.

**Quy đồng** — cho dạng $\infty-\infty$:
$$\lim_{x\to0}\Big(\frac1x-\frac1{x^2+x}\Big)=\lim_{x\to0}\frac{x+1-1}{x(x+1)}\cdot\frac{1}{1}=\lim_{x\to0}\frac{1}{x+1}=1$$

## 3. Trị tuyệt đối và hàm từng khúc

$$|x-a| = \begin{cases} x-a & x \ge a \\ -(x-a) & x < a\end{cases}$$

Quy trình: viết lại **không có** dấu trị tuyệt đối trên mỗi phía → tính $\lim_{x\to a^-}$ và $\lim_{x\to a^+}$ riêng → so sánh.

$$\lim_{x\to2^-}\frac{|x-2|}{x-2}=\frac{-(x-2)}{x-2}=-1,\qquad \lim_{x\to2^+}=+1 \ \Rightarrow\ \text{không tồn tại}$$

Với hàm từng khúc, **chỉ** điểm nối cần xét hai phía; mọi điểm khác thế trực tiếp vào nhánh tương ứng.

## 4. Đọc giới hạn từ đồ thị

1. Đi từ **trái** tới $x=a$ → giá trị $y$ đang tiến tới là $\lim_{x\to a^-}$.
2. Đi từ **phải** tới $x=a$ → $\lim_{x\to a^+}$.
3. Bằng nhau ⟹ giới hạn tồn tại và bằng giá trị đó.
4. **Chấm tròn đặc tại $(a, f(a))$ không tham gia.** Nó chỉ nói $f(a)$, dùng cho [[Continuity]] chứ không cho giới hạn.

## 5. Cạm bẫy

1. **Rút gọn rồi quên rằng miền xác định đã đổi.** $\frac{x^2-9}{x-3}$ và $x+3$ là hai hàm khác nhau (một cái thủng tại $3$) — nhưng **giới hạn** bằng nhau. Đừng viết dấu $=$ giữa hai hàm.
2. **Nhân liên hợp sai vế.** Nếu căn ở mẫu thì nhân liên hợp của mẫu.
3. **Bỏ qua dấu khi mở trị tuyệt đối phía trái.**
4. **Dùng L'Hôpital khi chưa kiểm dạng vô định.** L'Hôpital chỉ hợp lệ với $\frac00$ và $\frac{\infty}{\infty}$ — và nó không nằm trong seed này, dùng cẩn thận.
5. **Đọc đồ thị lấy $f(a)$ thay vì giới hạn.**
6. **Chia cho lũy thừa cao nhất của tử thay vì của mẫu** khi $x\to\infty$.

## 6. Checklist áp dụng
- [ ] Đã thế $x=a$ để phân loại dạng chưa?
- [ ] Nếu $\frac00$: tử và mẫu có chung thừa số $(x-a)$ không? Có căn không? Có lập phương không?
- [ ] Có trị tuyệt đối / hàm từng khúc / hàm chẵn-lẻ đổi dấu quanh $a$ không → tách hai phía?
- [ ] Sau khi biến đổi, đã thế lại được số chưa?
- [ ] Kết quả có hợp lý về dấu không? (thử $x = a \pm 0.01$ trong đầu)
- [ ] Nếu ra "không tồn tại" — đã nói rõ **vì sao** (hai phía khác nhau / dao động / vô cực) chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §2.3: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 2–7 (5:38–21:37): https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Computing Limits*: https://tutorial.math.lamar.edu/Classes/CalcI/ComputingLimits.aspx
- Khan Academy — *Limits and continuity*: https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new

## Liên kết
[[Limits]] · [[Trigonometric Limits]] · [[Continuity]] · [[Infinite Limits and Asymptotes]] · [[Math]]
