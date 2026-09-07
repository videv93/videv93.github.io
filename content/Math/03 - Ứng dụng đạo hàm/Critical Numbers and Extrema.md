---
tags: [math, calculus, optimization]
status: evergreen
---
# Critical Numbers and Extrema

> Điểm tới hạn là **danh sách ứng viên**, không phải danh sách đáp án. Nhầm hai thứ này là lỗi cấu trúc phổ biến nhất trong toàn bộ chương tối ưu.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"29) Critical Numbers 2:18:46"* trong seed.

## 1. Định nghĩa

$c$ là **điểm tới hạn** (critical number) của $f$ nếu $c$ thuộc miền xác định và:

- $f'(c) = 0$, **hoặc**
- $f'(c)$ **không tồn tại**

> [!warning] Hai vế "hoặc" đều bắt buộc kiểm
> Bỏ vế thứ hai là bỏ mất cực trị tại điểm góc. $f(x)=|x|$ có cực tiểu tại $0$ mà $f'(0)$ không tồn tại — nếu chỉ giải $f'=0$ thì mất nghiệm. → [[Derivative Definition]]

## 2. Bốn loại cực trị

| | Địa phương (relative) | Toàn cục (absolute/global) |
|---|---|---|
| **Cực đại** | $f(c)\ge f(x)$ với mọi $x$ **gần** $c$ | $f(c)\ge f(x)$ với **mọi** $x$ trong miền |
| **Cực tiểu** | $f(c)\le f(x)$ gần $c$ | $f(c)\le f(x)$ toàn miền |

**Định lý Fermat:** nếu $f$ có cực trị địa phương tại $c$ **trong** khoảng mở và $f'(c)$ tồn tại, thì $f'(c)=0$.

> [!warning] Chiều ngược **sai**
> $f'(c)=0$ **không** kéo theo cực trị. $f(x)=x^3$ có $f'(0)=0$ nhưng $0$ không phải cực trị — nó là điểm uốn nằm ngang. Đây là lý do phải có [[First Derivative Test]] hoặc [[Concavity and Inflection Points]] để **phân loại** ứng viên.

## 3. Quy trình tìm cực trị toàn cục trên $[a,b]$ (closed interval method)

1. Kiểm $f$ **liên tục** trên $[a,b]$ — nếu không, [[Extreme Value Theorem]] không bảo đảm gì.
2. Tính $f'$, tìm **mọi** điểm tới hạn trong $(a,b)$: giải $f'=0$ **và** tìm chỗ $f'$ không tồn tại.
3. Tính $f$ tại mọi điểm tới hạn.
4. Tính $f(a)$ và $f(b)$ — **đầu mút luôn phải kiểm**.
5. So sánh danh sách giá trị: lớn nhất là max, nhỏ nhất là min.

Trên khoảng **mở** hoặc **vô hạn**, bước 4 không dùng được — phải xét giới hạn tại biên ([[Infinite Limits and Asymptotes]]) và có thể **không tồn tại** cực trị toàn cục.

## 4. Bài toán tối ưu ứng dụng

1. Vẽ hình, đặt tên biến.
2. Viết **hàm mục tiêu** cần cực trị.
3. Viết **ràng buộc**, dùng nó khử biến để hàm mục tiêu còn **một** biến.
4. Xác định **miền xác định thực tế** (chiều dài $>0$, số lượng nguyên…).
5. Áp quy trình mục 3.
6. Trả lời câu hỏi gốc — thường là hỏi $x$ chứ không phải $f(x)$, hoặc ngược lại.

Bước 4 là bước bị bỏ nhiều nhất và là nguồn của mọi đáp án vô lý (hộp có cạnh âm).

## 5. Cạm bẫy

1. **Chỉ giải $f'=0$**, bỏ chỗ $f'$ không tồn tại.
2. **Coi mọi điểm tới hạn là cực trị.** $x^3$.
3. **Quên kiểm hai đầu mút** trên khoảng đóng.
4. **Lấy điểm tới hạn nằm ngoài miền.** Loại trước khi so sánh.
5. **Nhầm cực trị địa phương với toàn cục.** Cực đại địa phương có thể nhỏ hơn giá trị tại đầu mút.
6. **Điểm mà $f$ không xác định không phải điểm tới hạn.** $f(x)=1/x$ không có điểm tới hạn tại $0$ — $0$ không thuộc miền.
7. **Trả lời sai đại lượng.** Đề hỏi "diện tích lớn nhất" mà trả lời chiều dài.

## 6. Checklist áp dụng
- [ ] Đã tính $f'$ và **rút gọn/phân tích nhân tử** chưa?
- [ ] Đã giải $f'=0$ **và** tìm chỗ $f'$ không xác định chưa?
- [ ] Mọi điểm tới hạn có nằm trong miền xác định của $f$ không?
- [ ] Miền là đóng và bị chặn không? (nếu có → tính cả hai đầu mút)
- [ ] Nếu miền mở/vô hạn — đã xét giới hạn ở biên chưa?
- [ ] Đã **phân loại** từng ứng viên (test 1 hoặc test 2) chưa?
- [ ] Đáp án có thoả ràng buộc vật lý (dương, hữu hạn) không?
- [ ] Đề hỏi giá trị $x$ hay giá trị $f(x)$?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §4.1, §4.7: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 29 (2:18:46): https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *Critical Points*: https://tutorial.math.lamar.edu/Classes/CalcI/CriticalPoints.aspx
- Wikipedia — *Fermat's theorem (stationary points)*: https://en.wikipedia.org/wiki/Fermat%27s_theorem_(stationary_points)

## Liên kết
[[Extreme Value Theorem]] · [[First Derivative Test]] · [[Concavity and Inflection Points]] · [[Derivative Definition]] · [[Math]]
