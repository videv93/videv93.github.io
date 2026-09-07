---
tags: [math, asymptotics, notation]
status: evergreen
---
# Asymptotic Notation

> Bốn ký hiệu — $\sim$, $O$, $o$, $\Theta$ — nói bốn điều khác nhau, và bị dùng lẫn liên tục. Note này định nghĩa chúng chính xác, vì [[Stirling's Approximation]] chỉ có nghĩa khi biết chính xác dấu $\sim$ nghĩa là gì.

> [!note] Ghi chú nguồn
> Sinh ra từ seed `stirling formular - Google Search.md`, nơi Wikipedia phát biểu $\ln n! = n\ln n - n + O(\ln n)$ và Conrad phát biểu dạng chi tiết hơn với $\varepsilon_n\to0$. Hai phát biểu **không tương đương**, và không phân biệt được nếu không có note này.

## 1. Bốn định nghĩa

Khi $n\to\infty$ (hoặc $x\to a$):

| Ký hiệu | Đọc | Định nghĩa | Nghĩa |
|---|---|---|---|
| $f\sim g$ | tương đương tiệm cận | $\lim \dfrac fg = 1$ | **sai số tương đối** $\to0$ |
| $f = O(g)$ | big-O | $\exists C: \vert f\vert\le C\vert g\vert$ | $f$ không lớn hơn $g$ quá một hằng số |
| $f=o(g)$ | little-o | $\lim\dfrac fg = 0$ | $f$ **nhỏ hơn hẳn** $g$ |
| $f=\Theta(g)$ | theta | $O(g)$ **và** $g=O(f)$ | cùng bậc, chặn hai phía |

Thêm: $f=\Omega(g)$ nghĩa $g=O(f)$ (chặn dưới).

## 2. Bốn cái này khác nhau thế nào

$$f(n)=n^2+3n$$

| Phát biểu | Đúng? |
|---|---|
| $f\sim n^2$ | ✅ tỉ số $\to1$ |
| $f = O(n^2)$ | ✅ |
| $f = O(n^3)$ | ✅ — big-O là chặn **trên**, được phép lỏng |
| $f=\Theta(n^2)$ | ✅ |
| $f=\Theta(n^3)$ | ❌ |
| $f\sim n^2+3n$ | ✅ (hiển nhiên) |
| $f\sim n^2+n$ | ✅ — vì tỉ số vẫn $\to1$! |
| $f = n^2+o(n^2)$ | ✅ tương đương với $f\sim n^2$ |

> [!warning] $\sim$ **không** giữ được sai số tuyệt đối
> $n^2+3n \sim n^2$ nhưng hiệu của chúng là $3n\to\infty$. Tương đương tiệm cận chỉ nói **sai số tương đối** nhỏ. Đây chính xác là lý do $n!\sim\sqrt{2\pi n}(n/e)^n$ dù hiệu tuyệt đối giữa hai vế là một số khổng lồ.

## 3. Quy tắc thao tác

$$O(f)+O(g) = O(\max(f,g)) \qquad O(f)\cdot O(g)=O(fg) \qquad c\cdot O(f)=O(f)$$
$$f\sim g \Rightarrow f^k\sim g^k \qquad f_1\sim g_1, f_2\sim g_2 \Rightarrow f_1f_2\sim g_1g_2$$

> [!warning] $\sim$ **không** cộng được và **không** lấy log/exp được
> - $f_1\sim g_1$ và $f_2\sim g_2$ **không** cho $f_1-f_2\sim g_1-g_2$. Ví dụ: $n^2+n\sim n^2$ và $n^2\sim n^2$, nhưng hiệu là $n$ vs $0$.
> - $f\sim g$ **không** cho $e^f\sim e^g$. Ví dụ: $n+\ln n\sim n$ nhưng $e^{n+\ln n}=ne^n \not\sim e^n$.
> - Chiều ngược **được**: $f\sim g$ (cả hai $\to\infty$) ⟹ $\ln f\sim\ln g$.

Quy tắc thứ hai là lý do bản $\ln n!$ của Stirling **yếu hơn** bản $n!$ — mũ hoá làm mất thông tin.

## 4. Thang tăng trưởng

$$1 \ \ll\ \ln\ln n\ \ll\ \ln n \ \ll\ n^{\varepsilon}\ \ll\ n \ \ll\ n\ln n\ \ll\ n^2\ \ll\ 2^n\ \ll\ n!\ \ll\ n^n$$

trong đó $f\ll g$ nghĩa $f = o(g)$.

Vị trí của $n!$ giữa $2^n$ và $n^n$ **chính xác đến đâu** là câu hỏi mà [[Stirling's Approximation]] trả lời:
$$n! \sim \sqrt{2\pi n}\left(\frac ne\right)^n$$
tức $n!$ gần $n^n$ hơn, chia cho $e^n$ và nhân một thừa số căn.

**Bản Calculus 1** của thang này là mục "bậc tăng trưởng" ở [[Infinite Limits and Asymptotes]]; đây là bản có ký hiệu.

## 5. Dùng ở đâu

| Lĩnh vực | Dùng gì | Ví dụ |
|---|---|---|
| Độ phức tạp thuật toán | $O$, $\Theta$ | quicksort $\Theta(n\log n)$ trung bình → [[DS&AL]] |
| Giải tích tiệm cận | $\sim$, $o$ | Stirling, định lý số nguyên tố |
| Xấp xỉ số | $O$ | sai số Simpson $O(h^4)$ → [[Numerical Integration]] |
| Xấp xỉ Taylor | $o$, $O$ | $e^x = 1+x+O(x^2)$ khi $x\to0$ → [[Differentials and Linear Approximation]] |
| Thống kê | $O_p$, $o_p$ (theo xác suất) | tốc độ hội tụ của ước lượng → [[Prob&Stats]] |

> [!note] $O$ có hai chiều đọc
> Trong CS, $x\to\infty$. Trong giải tích, thường $x\to0$ — và khi đó $O(x^3)$ **nhỏ hơn** $O(x^2)$, ngược với trực giác CS. Luôn nêu rõ giới hạn đang xét.

## 6. Cạm bẫy

1. **Dùng $O$ khi ý là $\Theta$.** "Thuật toán này là $O(n^2)$" không loại trừ khả năng nó là $O(n)$.
2. **Dùng dấu $=$ hai chiều.** $f=O(g)$ là lạm dụng ký hiệu — nó nghĩa $f\in O(g)$. Không được viết $O(g)=f$, và $O(n)=O(n^2)$ đúng nhưng $O(n^2)=O(n)$ sai.
3. **Trừ hai quan hệ $\sim$.** Mục 3.
4. **Mũ hoá hai vế của $\sim$.** Mục 3.
5. **Nhầm sai số tương đối với tuyệt đối.** Cảnh báo mục 2.
6. **Bỏ quên hằng số ẩn.** $O(n)$ với hằng số $10^9$ thua $O(n^2)$ với hằng số $1$ ở mọi $n$ thực tế.
7. **Không nói rõ biến nào tiến tới đâu.**
8. **Ghi cơ số của log trong $O$.** Không cần — mọi cơ số sai khác hằng số ([[Bases Other Than e]]).

## 7. Checklist áp dụng
- [ ] Biến nào đang tiến tới đâu? ($n\to\infty$ hay $x\to0$?)
- [ ] Cần chặn trên ($O$), chặn hai phía ($\Theta$), hay tương đương ($\sim$)?
- [ ] Nếu dùng $\sim$: đang nói sai số **tương đối** — có đủ cho bài toán không?
- [ ] Có đang trừ, lấy log, hay mũ hoá hai quan hệ tiệm cận không? (kiểm quy tắc mục 3)
- [ ] Hằng số ẩn lớn cỡ nào? Có ảnh hưởng ở kích thước thực tế không?
- [ ] Với $n$ cụ thể của bài toán, xấp xỉ này đã đủ chính xác chưa? (kiểm bằng số)
- [ ] Có phát biểu mạnh hơn (thêm số hạng) mà mình cần không?

## Tham khảo
- Graham, Knuth, Patashnik — *Concrete Mathematics*, ch. 9 (*Asymptotics*): https://www-cs-faculty.stanford.edu/~knuth/gkp.html
- de Bruijn — *Asymptotic Methods in Analysis*: https://store.doverpublications.com/0486642216.html
- Wikipedia — *Big O notation*: https://en.wikipedia.org/wiki/Big_O_notation
- Wikipedia — *Asymptotic analysis*: https://en.wikipedia.org/wiki/Asymptotic_analysis

## Liên kết
[[Stirling's Approximation]] · [[Proving Stirling's Formula]] · [[Infinite Limits and Asymptotes]] · [[Differentials and Linear Approximation]] · [[DS&AL]] · [[Math]]
