---
tags: [math, calculus, integral, theorem]
status: evergreen
---
# Mean Value Theorem for Integrals

> Định nghĩa đúng của "giá trị trung bình của một hàm" — và định lý nói rằng hàm liên tục **thật sự đạt** giá trị trung bình đó tại đâu đó. Cũng là mảnh ghép trong chứng minh [[Fundamental Theorem of Calculus]].

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"50) Mean Value Theorem for Integrals and Average Value of a Function 4:28:05"* trong seed.

## 1. Giá trị trung bình

$$f_{\text{avg}} = \frac1{b-a}\int_a^b f(x)\,dx$$

**Vì sao là công thức này:** trung bình của $n$ mẫu đều là $\frac1n\sum f(x_i)$. Nhân và chia cho $\Delta x = \frac{b-a}n$:
$$\frac1n\sum f(x_i) = \frac{1}{b-a}\sum f(x_i)\Delta x \xrightarrow{n\to\infty} \frac1{b-a}\int_a^b f$$
Trung bình rời rạc → trung bình liên tục, qua [[Riemann Sums]].

**Hình học:** $f_{\text{avg}}$ là chiều cao của hình chữ nhật đáy $[a,b]$ có **cùng diện tích** với vùng dưới đồ thị.

## 2. Định lý

Nếu $f$ **liên tục** trên $[a,b]$, tồn tại $c\in[a,b]$ sao cho
$$f(c) = \frac1{b-a}\int_a^b f(x)\,dx \qquad\text{tức}\qquad \int_a^b f(x)\,dx = f(c)(b-a)$$

**Chứng minh:** theo [[Extreme Value Theorem]], $f$ đạt $m=\min f$ và $M=\max f$. Tính chất chặn của tích phân cho
$$m \le \frac1{b-a}\int_a^b f \le M$$
Rồi [[Intermediate Value Theorem]] cho $c$ với $f(c)$ bằng đúng giá trị giữa. ∎

Chứng minh này dùng **cả hai** định lý tồn tại của chương trước — một ví dụ tốt về cách các định lý xếp chồng lên nhau.

**Liên tục là bắt buộc:** hàm bậc thang nhận giá trị $0$ và $1$ có trung bình $0.5$ nhưng không bao giờ **bằng** $0.5$.

## 3. So với MVT thường

| | [[Mean Value Theorem]] | MVT cho tích phân |
|---|---|---|
| Về | đạo hàm | giá trị hàm |
| Cần | liên tục $[a,b]$ + khả vi $(a,b)$ | chỉ **liên tục** $[a,b]$ |
| Kết luận | $f'(c)=\dfrac{f(b)-f(a)}{b-a}$ | $f(c)=\dfrac1{b-a}\int_a^b f$ |
| Nói gì | tốc độ tức thời = tốc độ trung bình | giá trị tại một điểm = giá trị trung bình |

Chúng **tương đương nhau qua FTC**: áp MVT thường cho $F(x)=\int_a^x f$ ra đúng MVT tích phân.

## 4. Ứng dụng

| Bài toán | Công thức |
|---|---|
| Nhiệt độ trung bình trong ngày | $\frac1{24}\int_0^{24}T(t)dt$ |
| Tốc độ trung bình (theo thời gian) | $\frac1{b-a}\int_a^b \vert v\vert dt$ → [[Motion and Kinematics]] |
| Giá trị hiệu dụng RMS | $\sqrt{\frac1{T}\int_0^T f^2 dt}$ |
| Kỳ vọng của biến ngẫu nhiên liên tục | $\int x\,p(x)dx$ → [[Prob&Stats]] |
| Giá trung bình theo khối lượng (VWAP) | trọng số → [[Quant]] |

> [!warning] Trung bình theo **thời gian** khác trung bình theo **quãng đường**
> Đi 60 km/h một giờ rồi 20 km/h một giờ: trung bình theo thời gian là $40$ km/h. Nhưng đi 60 km/h **một quãng** rồi 20 km/h **cùng quãng** thì trung bình là trung bình điều hoà $= 30$ km/h. Biến lấy trung bình quyết định đáp án.

## 5. Cạm bẫy

1. **Quên chia cho $(b-a)$.** Thì đó là tích phân, không phải trung bình.
2. **Bỏ giả thiết liên tục.**
3. **Nghĩ $c$ duy nhất.**
4. **Nhầm hai MVT.**
5. **Trung bình của $f^2$ không phải bình phương trung bình.** $\overline{f^2}\ne\bar f^2$ — chênh lệch chính là phương sai ([[Prob&Stats]]).
6. **Lấy trung bình sai biến.** Xem cảnh báo mục 4.
7. **Cho rằng $f_{\text{avg}}$ nằm giữa $f(a)$ và $f(b)$.** Chỉ nằm giữa $\min$ và $\max$.

## 6. Checklist áp dụng
- [ ] Đã chia cho độ dài khoảng $(b-a)$ chưa?
- [ ] $f$ có liên tục trên $[a,b]$ không?
- [ ] Đang lấy trung bình theo **biến nào**? Có đúng biến đề hỏi không?
- [ ] Nếu đề hỏi tìm $c$ — đã giải $f(c)=f_{\text{avg}}$ và kiểm $c\in[a,b]$ chưa?
- [ ] Có nhiều nghiệm $c$ không? (báo cáo hết nếu đề hỏi)
- [ ] Kết quả có nằm giữa $\min f$ và $\max f$ không? (phép kiểm miễn phí)
- [ ] Nếu là đại lượng bình phương (RMS) — đã lấy căn sau cùng chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §6.5: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 50 (4:28:05): https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Average Function Value*: https://tutorial.math.lamar.edu/Classes/CalcI/AvgFcnValue.aspx
- Wikipedia — *Mean value theorem for definite integrals*: https://en.wikipedia.org/wiki/Mean_value_theorem#Mean_value_theorems_for_definite_integrals

## Liên kết
[[Mean Value Theorem]] · [[Fundamental Theorem of Calculus]] · [[Riemann Sums]] · [[Extreme Value Theorem]] · [[Intermediate Value Theorem]] · [[Math]]
