---
tags: [math, calculus, limits, asymptotes]
status: evergreen
---
# Infinite Limits and Asymptotes

> Hai câu hỏi khác nhau bị gộp chung tên: *hàm làm gì khi $x$ tiến tới một điểm xấu* (tiệm cận đứng) và *hàm làm gì khi $x$ chạy ra vô cực* (tiệm cận ngang). Nhầm hai cái là nhầm cả bài.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả ba header rỗng trong seed: *"14) Infinite Limits 49:43"*, *"15) Vertical Asymptotes 57:33"*, *"37) Limits at Infinity 3:14:26"*. Ba mục nằm cách nhau hơn hai tiếng trong video nhưng là **cùng một khái niệm nhìn từ hai phía**, nên gộp vào một note.

## 1. Hai loại giới hạn vô hạn

| | Giới hạn **vô cực** | Giới hạn **tại vô cực** |
|---|---|---|
| Ký hiệu | $\lim_{x\to a} f(x) = \pm\infty$ | $\lim_{x\to\pm\infty} f(x) = L$ |
| Hỏi gì | $x$ tiến tới $a$, $f$ nổ | $x$ chạy ra xa, $f$ ổn định |
| Cho ra | **Tiệm cận đứng** $x=a$ | **Tiệm cận ngang** $y=L$ |
| Số lượng tối đa | không giới hạn | tối đa **2** (một mỗi phía) |

> [!warning] $\lim = \infty$ nghĩa là giới hạn **không tồn tại**
> Ký hiệu $=\infty$ là cách *mô tả* kiểu không tồn tại, không phải một giá trị. Nói "giới hạn bằng vô cùng" là nói tắt hợp lệ, nhưng đừng dùng $\infty$ trong luật giới hạn như một con số.

## 2. Tiệm cận đứng

$x=a$ là tiệm cận đứng nếu **ít nhất một** trong bốn giới hạn một phía bằng $\pm\infty$.

**Quy trình cho hàm hữu tỉ $\frac{p(x)}{q(x)}$:**
1. Rút gọn hết thừa số chung.
2. Nghiệm còn lại của mẫu → tiệm cận đứng.
3. Nghiệm bị **triệt tiêu** khi rút gọn → **lỗ thủng** (removable discontinuity), không phải tiệm cận. → [[Continuity]]
4. Xét dấu hai phía để biết $+\infty$ hay $-\infty$.

$$\frac{x^2-1}{x^2-x} = \frac{(x-1)(x+1)}{x(x-1)} \Rightarrow \text{tiệm cận đứng } x=0;\ \text{lỗ thủng tại } x=1$$

**Xét dấu:** với $\frac1{x-2}$ tại $x=2$: từ phải mẫu $\to0^+$ ⟹ $+\infty$; từ trái mẫu $\to0^-$ ⟹ $-\infty$.

Ngoài hàm hữu tỉ: $\ln x$ có tiệm cận đứng $x=0$; $\tan x$ có tiệm cận tại $\pi/2 + k\pi$.

## 3. Tiệm cận ngang — quy tắc bậc

Cho $\frac{p(x)}{q(x)}$ với $\deg p = n$, $\deg q = m$, hệ số cao nhất $a_n, b_m$:

| Trường hợp | $\lim_{x\to\pm\infty}$ | Tiệm cận |
|---|---|---|
| $n < m$ | $0$ | $y=0$ |
| $n = m$ | $a_n/b_m$ | $y = a_n/b_m$ |
| $n > m$ | $\pm\infty$ | không có ngang; $n=m+1$ ⟹ có **tiệm cận xiên** |

**Kỹ thuật tổng quát:** chia tử và mẫu cho **lũy thừa cao nhất của mẫu**.

$$\lim_{x\to\infty}\frac{3x^2+5}{2x^2-x} = \lim_{x\to\infty}\frac{3+5/x^2}{2-1/x} = \frac32$$

**Có căn thì cẩn thận dấu:** $\sqrt{x^2}=|x|$, nên khi $x\to-\infty$ ta có $\sqrt{x^2}=-x$.
$$\lim_{x\to-\infty}\frac{\sqrt{x^2+1}}{x} = \lim_{x\to-\infty}\frac{|x|\sqrt{1+1/x^2}}{x} = -1$$
Đây là chỗ sai nhiều nhất trong cả mục.

## 4. Bậc tăng trưởng

Khi $x\to\infty$, thứ tự tăng nhanh dần:
$$\ln x \ \ll\ x^p \ (p>0) \ \ll\ a^x \ (a>1) \ \ll\ x! \ \ll\ x^x$$

Tỉ số của hàm chậm hơn trên hàm nhanh hơn luôn $\to 0$. Đây là bản Calculus-1 của **ký hiệu tiệm cận** — bản đầy đủ ở [[Asymptotic Notation]], và [[Stirling's Approximation]] chính là công cụ định lượng chỗ $x!$ đứng trong dãy này.

## 5. Cạm bẫy

1. **Nhầm lỗ thủng với tiệm cận đứng.** Phải rút gọn **trước**.
2. **Quên $\sqrt{x^2}=|x|$ khi $x\to-\infty$.**
3. **Coi $\infty-\infty=0$.** Dạng vô định. $\lim_{x\to\infty}(\sqrt{x^2+x}-x)=\frac12$, không phải $0$ — dùng nhân liên hợp ([[Computing Limits]]).
4. **Nghĩ đồ thị không được cắt tiệm cận ngang.** Được — tiệm cận là hành vi ở **vô cực**, không phải rào chắn. $\frac{\sin x}{x}$ cắt $y=0$ vô số lần.
5. **Tính một phía rồi kết luận cả hai.** $\lim_{x\to\infty}$ và $\lim_{x\to-\infty}$ có thể khác nhau ($\arctan x$: $\pi/2$ và $-\pi/2$).
6. **Tìm tiệm cận ngang cho hàm dao động không tắt.** $\sin x$ không có giới hạn tại vô cực.

## 6. Checklist áp dụng
- [ ] Đã rút gọn phân thức **trước** khi tìm tiệm cận đứng chưa?
- [ ] Mỗi nghiệm mẫu: là tiệm cận hay là lỗ thủng?
- [ ] Đã xét dấu **cả hai phía** của mỗi tiệm cận đứng chưa?
- [ ] Với tiệm cận ngang: đã so bậc tử/mẫu chưa?
- [ ] Có căn không → đã xử lý $|x|$ cho phía $-\infty$ chưa?
- [ ] Đã tính **riêng** $x\to+\infty$ và $x\to-\infty$ chưa?
- [ ] Nếu $\infty-\infty$ hoặc $\frac{\infty}{\infty}$ — đã biến đổi trước khi kết luận chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §2.2, §2.6: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 14–15, 37: https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Limits at Infinity*: https://tutorial.math.lamar.edu/Classes/CalcI/LimitsAtInfinityI.aspx
- Wikipedia — *Asymptote*: https://en.wikipedia.org/wiki/Asymptote

## Liên kết
[[Limits]] · [[Computing Limits]] · [[Continuity]] · [[Concavity and Inflection Points]] · [[Asymptotic Notation]] · [[Math]]
