---
tags: [math, calculus, limits]
status: evergreen
---
# Limits

> Khái niệm khiến calculus trở thành toán chứ không phải mẹo. Đạo hàm và tích phân đều **chỉ là giới hạn** — hiểu chỗ này thì hai chương sau gần như miễn phí.

> ⚠️ Note này thuộc nhánh calculus tính toán. Đọc [[Computational vs Rigorous Mathematics]] để biết nó đưa bạn tới đâu và **không** tới đâu.

> [!note] Ghi chú nguồn
> Trong seed gốc, file `You Can Learn Calculus 1 in One Video (Full Course).md` chỉ có đúng một dòng cho mục này: *"1) Introduction to Limits"* — một **header rỗng**. Note này trả lời lời hứa đó.

## 1. Hai định nghĩa

**Trực giác:** $\lim_{x\to a} f(x) = L$ nghĩa là $f(x)$ tiến gần $L$ tùy ý khi $x$ tiến gần $a$ — nhưng $x \ne a$.

**Hình thức ($\varepsilon$–$\delta$, Cauchy–Weierstrass):**
$$\forall \varepsilon>0\ \ \exists \delta>0:\ \ 0<|x-a|<\delta \ \Rightarrow\ |f(x)-L|<\varepsilon$$

Đọc như một trò chơi hai người: đối thủ đưa $\varepsilon$ (độ chính xác đòi hỏi), bạn phải tìm được $\delta$ (độ gần cần thiết). Bạn thắng với **mọi** $\varepsilon$ thì giới hạn tồn tại. Thứ tự lượng từ ở đây là tất cả — xem [[Mathematical Logic Basics]].

> [!warning] $f(a)$ hoàn toàn không liên quan
> Điều kiện $0<|x-a|$ **loại bỏ** $x=a$. Giới hạn nói về *hành vi quanh* $a$, không phải *giá trị tại* $a$. Hàm có thể không xác định tại $a$ mà vẫn có giới hạn — đó chính là điều làm định nghĩa đạo hàm chạy được ([[Derivative Definition]]).

## 2. Giới hạn một phía

$$\lim_{x\to a^-} f(x) = L^- \qquad \lim_{x\to a^+} f(x) = L^+$$

$$\lim_{x\to a} f(x) \text{ tồn tại} \iff L^- = L^+ \text{ và cả hai hữu hạn}$$

Đây là công cụ duy nhất để xử lý hàm từng khúc và trị tuyệt đối. → [[Computing Limits]]

## 3. Luật giới hạn

Nếu $\lim f$ và $\lim g$ đều tồn tại (hữu hạn):

| Luật | Công thức |
|---|---|
| Tổng / hiệu | $\lim(f\pm g) = \lim f \pm \lim g$ |
| Tích | $\lim(fg) = \lim f \cdot \lim g$ |
| Thương | $\lim(f/g) = \lim f / \lim g$, **nếu** $\lim g \ne 0$ |
| Lũy thừa | $\lim f^n = (\lim f)^n$ |
| Hằng | $\lim c = c$ |
| Hợp | $\lim f(g(x)) = f(\lim g)$ **nếu** $f$ liên tục tại $\lim g$ |

> [!warning] Luật chỉ dùng được khi từng giới hạn tồn tại
> $\lim_{x\to0}(\frac1x - \frac1x) = 0$ nhưng không được viết thành hiệu hai giới hạn — cả hai đều không tồn tại. Rút gọn **trước**, áp luật **sau**.

## 4. Bảy dạng vô định

$$\frac00 \quad \frac{\infty}{\infty} \quad 0\cdot\infty \quad \infty-\infty \quad 0^0 \quad \infty^0 \quad 1^\infty$$

Vô định = **chưa quyết định được**, không phải "không tồn tại". Phải biến đổi rồi mới kết luận. Ngược lại, $\frac{c}{0}$ với $c \ne 0$ **không** vô định — nó cho giới hạn vô cực hoặc không tồn tại ([[Infinite Limits and Asymptotes]]).

## 5. Định lý kẹp (Squeeze Theorem)

Nếu $g(x) \le f(x) \le h(x)$ quanh $a$ và $\lim_{x\to a} g = \lim_{x\to a} h = L$ thì $\lim_{x\to a} f = L$.

Công cụ chủ lực cho những hàm dao động: $\lim_{x\to0} x^2\sin\frac1x = 0$ vì $-x^2 \le x^2\sin\frac1x \le x^2$. Cũng là cách chứng minh $\lim_{x\to0}\frac{\sin x}{x}=1$ → [[Trigonometric Limits]].

## 6. Cạm bẫy

1. **Thế số ngay lập tức.** Chỉ hợp lệ khi $f$ liên tục tại $a$ — mà điều đó phải biết trước ([[Continuity]]).
2. **Nhầm "không tồn tại" với "bằng vô cực".** $\lim_{x\to0}\frac1{x^2}=+\infty$ là *mô tả* cách nó không tồn tại (theo nghĩa hữu hạn).
3. **Coi $0/0$ là $0$ hoặc là $1$.** Nó là dạng vô định, giá trị phụ thuộc hàm cụ thể.
4. **Quên kiểm tra hai phía.** $\lim_{x\to0}\frac{|x|}{x}$ không tồn tại vì $-1 \ne 1$.
5. **Dùng đồ thị máy tính làm chứng cứ.** Máy tính không phân biệt được lỗ thủng (removable discontinuity) với điểm bình thường.
6. **Áp luật hợp mà quên điều kiện liên tục.** Đây là chỗ sai kín đáo nhất trong danh sách.

## 7. Checklist áp dụng
- [ ] Thế $x=a$ vào — ra số xác định? (xong) Ra dạng vô định? (biến đổi) Ra $c/0$? (xét vô cực)
- [ ] Nếu có trị tuyệt đối, căn, hoặc hàm từng khúc — đã xét **cả hai phía** chưa?
- [ ] Nếu dạng $0/0$ — đã thử phân tích nhân tử / liên hợp / hằng đẳng thức chưa?
- [ ] Nếu hàm dao động chặn được — có dùng được định lý kẹp không?
- [ ] Mọi luật giới hạn đã áp có thoả điều kiện tiền đề chưa (mẫu $\ne 0$, hàm ngoài liên tục)?
- [ ] Kết luận là một số, là $\pm\infty$, hay là "không tồn tại"? Ba thứ khác nhau.

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §2.2–2.4: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 1–10: https://www.youtube.com/watch?v=G-ti56DEXE8
- 3Blue1Brown — *Limits, L'Hôpital's rule, and epsilon delta definitions*: https://www.3blue1brown.com/lessons/limits
- Paul's Online Math Notes — *Limits*: https://tutorial.math.lamar.edu/Classes/CalcI/limitsIntro.aspx

## Liên kết
[[Computing Limits]] · [[Trigonometric Limits]] · [[Continuity]] · [[Infinite Limits and Asymptotes]] · [[Derivative Definition]] · [[Math]]
