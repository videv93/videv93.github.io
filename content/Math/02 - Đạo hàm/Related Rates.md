---
tags: [math, calculus, derivative, application]
status: evergreen
---
# Related Rates

> Hai đại lượng ràng buộc nhau bằng một phương trình; biết tốc độ thay đổi của cái này, tìm tốc độ của cái kia. Kỹ thuật thì đơn giản — **quy trình** mới là thứ quyết định đúng sai.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"28) Related Rates 2:14:14"* trong seed.

## 1. Ý tưởng

Có một phương trình $F(x,y)=0$ trong đó $x=x(t)$, $y=y(t)$. Lấy $\frac{d}{dt}$ hai vế → được một phương trình nối $\frac{dx}{dt}$ và $\frac{dy}{dt}$.

Đây là [[Implicit Differentiation]] với biến độc lập là **$t$**, không phải $x$. Mọi biến hình học đều nhân thêm đạo hàm theo $t$ — [[Chain Rule]] lần nữa.

## 2. Quy trình 6 bước

1. **Vẽ hình.** Ghi cái gì cố định, cái gì thay đổi.
2. **Đặt tên biến.** Mọi đại lượng **thay đổi** phải là hàm của $t$.
3. **Viết ra cái đã cho và cái cần tìm** dưới dạng đạo hàm: "cho $\frac{dx}{dt}=3$, tìm $\frac{dy}{dt}$ khi $x=4$".
4. **Tìm phương trình liên hệ** các biến — chỉ các biến, **chưa thế số**.
5. **Đạo hàm theo $t$** cả hai vế.
6. **Bây giờ mới thế số** và giải.

> [!warning] Bước 6 phải đứng sau bước 5
> Thế số ở bước 4 là cạm bẫy lớn nhất của cả chủ đề: một biến bị biến thành hằng số, đạo hàm của nó thành $0$, và bài sai từ gốc. Chỉ thế những giá trị **luôn luôn** cố định (bán kính bình cố định, chiều dài thang).

## 3. Ba bài mẫu

**Thang trượt** — thang dài 10 m, chân trượt ra $1$ m/s. Đỉnh tụt nhanh bao nhiêu khi chân cách tường 6 m?
$$x^2+y^2=100 \xrightarrow{d/dt} 2x\frac{dx}{dt}+2y\frac{dy}{dt}=0 \Rightarrow \frac{dy}{dt}=-\frac xy\frac{dx}{dt}$$
Khi $x=6$: $y=8$, $\frac{dy}{dt}=-\frac68(1)=-0.75$ m/s. Dấu âm = đang tụt.

**Bình nón** — nước chảy vào nón bán kính đáy $R$, cao $H$, tốc độ $\frac{dV}{dt}$.
$$V=\frac13\pi r^2h, \quad \frac rh=\frac RH \Rightarrow r=\frac{R}{H}h \Rightarrow V=\frac{\pi R^2}{3H^2}h^3$$
**Phải khử $r$ trước khi đạo hàm** — dùng tỉ số đồng dạng. Đây là bước hay bị bỏ.

**Bóng phình** — $V=\frac43\pi r^3 \Rightarrow \frac{dV}{dt}=4\pi r^2\frac{dr}{dt}$. Với $\frac{dV}{dt}$ hằng, $\frac{dr}{dt}\propto 1/r^2$ — bóng càng to càng phồng chậm.

## 4. Bảng công thức liên hệ hay gặp

| Tình huống | Phương trình |
|---|---|
| Tam giác vuông (thang, bóng, khoảng cách) | $x^2+y^2=z^2$ |
| Hai vật chuyển động vuông góc | $z^2=x^2+y^2$ |
| Bóng cầu | $V=\frac43\pi r^3$, $S=4\pi r^2$ |
| Nón / phễu | $V=\frac13\pi r^2h$ + tỉ số đồng dạng |
| Trụ | $V=\pi r^2 h$ |
| Góc nâng (camera theo dõi) | $\tan\theta = \frac{y}{x}$ |
| Bóng đèn / bóng người | tam giác đồng dạng |

## 5. Cạm bẫy

1. **Thế số quá sớm.** Cạm bẫy số một — xem cảnh báo mục 2.
2. **Quên khử biến thừa.** Bài nón có hai biến $r,h$ nhưng chỉ một phương trình đạo hàm → phải dùng đồng dạng để còn một biến.
3. **Sai dấu.** Đại lượng **giảm** ⟹ đạo hàm **âm**. Đọc lại đề: "trượt ra", "rò rỉ", "tụt xuống".
4. **Đạo hàm theo $x$ thay vì theo $t$.**
5. **Quên đơn vị hoặc trộn đơn vị** (cm với m).
6. **Không kiểm tính hợp lý của kết quả.** Bóng phình thì $\frac{dr}{dt}>0$; đỉnh thang tụt thì $\frac{dy}{dt}<0$.
7. **Coi tốc độ là hằng khi đề không nói vậy.**

## 6. Checklist áp dụng
- [ ] Đã vẽ hình và đặt tên mọi biến chưa?
- [ ] Biến nào **thay đổi theo $t$**, biến nào là hằng thật sự?
- [ ] Đã viết ra rõ "cho gì / tìm gì" dưới dạng $\frac{d\cdot}{dt}$ chưa?
- [ ] Phương trình liên hệ có chứa **đúng** các biến cần không? Có biến thừa cần khử không?
- [ ] Đã đạo hàm theo $t$ **trước khi** thế số chưa?
- [ ] Dấu của mỗi tốc độ đã khớp với mô tả (tăng/giảm) chưa?
- [ ] Đơn vị đồng nhất chưa? Đáp án có đơn vị chưa?
- [ ] Kết quả có hợp lý về độ lớn và dấu không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §3.9: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 28 (2:14:14): https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Related Rates*: https://tutorial.math.lamar.edu/Classes/CalcI/RelatedRates.aspx
- MIT OCW 18.01 — *Single Variable Calculus*, Lecture 12: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/

## Liên kết
[[Implicit Differentiation]] · [[Chain Rule]] · [[Rates of Change]] · [[Motion and Kinematics]] · [[Math]]
