---
tags: [math, calculus, optimization]
status: evergreen
---
# Concavity and Inflection Points

> $f'$ nói đồ thị đi lên hay xuống; $f''$ nói nó **cong** kiểu gì. Đây cũng là chỗ tính lồi (convexity) xuất hiện lần đầu — khái niệm sẽ chi phối toàn bộ [[ML]] và bất đẳng thức Jensen ở [[Prob&Stats]].

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"35) Concavity, Inflection Points, and the Second Derivative 3:00:53"* và *"36) The Second Derivative Test for Relative Extrema 3:10:06"*.

## 1. Lõm lên / lõm xuống

| Dấu $f''$ | Tên | Hình dạng | Tiếp tuyến | Tên trong tối ưu |
|---|---|---|---|---|
| $f''>0$ | lõm lên (concave up) | chén ∪ | nằm **dưới** đồ thị | **lồi** (convex) |
| $f''<0$ | lõm xuống (concave down) | vòm ∩ | nằm **trên** đồ thị | lõm (concave) |

> [!warning] "Concave up" tiếng Anh = "lồi" (convex) tiếng tối ưu
> Từ vựng calculus và từ vựng tối ưu **ngược nhau về tên gọi**. Sách Calculus 1 nói *concave up*; Boyd & Vandenberghe nói *convex*. Cùng một thứ. Đây là nguồn nhầm lẫn khi chuyển từ vault này sang [[ML]].

$f''$ là đạo hàm của $f'$ ⟹ $f''>0$ nghĩa là **hệ số góc đang tăng**. Đồ thị vẫn có thể đang đi xuống — chỉ là xuống chậm dần.

## 2. Bốn tổ hợp dấu

| $f'$ | $f''$ | Mô tả |
|---|---|---|
| $+$ | $+$ | tăng, **nhanh dần** |
| $+$ | $-$ | tăng, **chậm dần** (bão hoà) |
| $-$ | $+$ | giảm, chậm dần |
| $-$ | $-$ | giảm, nhanh dần (sụp đổ) |

Bảng này là cách đọc mọi phát biểu kiểu "lạm phát đang giảm tốc", "tăng trưởng chững lại" cho đúng. → [[Rates of Change]]

## 3. Điểm uốn (inflection point)

Điểm mà **tính lõm đổi chiều**.

**Quy trình:** tìm nơi $f''=0$ **hoặc** $f''$ không tồn tại → đó là **ứng viên** → kiểm $f''$ có **đổi dấu** qua đó không.

> [!warning] $f''(c)=0$ không đủ
> $f(x)=x^4$ có $f''(0)=0$ nhưng $f''=12x^2\ge0$ khắp nơi — **không** đổi dấu, nên $0$ **không** là điểm uốn. Cùng cấu trúc lỗi với "$f'(c)=0$ ⟹ cực trị" ở [[Critical Numbers and Extrema]].

Ngược lại, $f''$ có thể **không tồn tại** tại điểm uốn: $f(x)=x^{1/3}$ đổi lõm tại $0$ mà $f''(0)$ không xác định.

## 4. Second derivative test

Tại điểm tới hạn $c$ (tức $f'(c)=0$):

| $f''(c)$ | Kết luận |
|---|---|
| $>0$ | cực **tiểu** địa phương (đáy chén) |
| $<0$ | cực **đại** địa phương (đỉnh vòm) |
| $=0$ hoặc không tồn tại | **không kết luận được** — chuyển sang [[First Derivative Test]] |

Ba hàm cùng có $f'(0)=f''(0)=0$ nhưng ba kết quả khác nhau: $x^4$ (min), $-x^4$ (max), $x^3$ (không cực trị). Đó chính là lý do dòng thứ ba của bảng là "không kết luận được", không phải "không có cực trị".

## 5. Vẽ đồ thị đầy đủ (curve sketching)

Gộp mọi thứ đã học:

1. Miền xác định, giao trục, tính chẵn/lẻ.
2. Tiệm cận đứng, ngang, xiên → [[Infinite Limits and Asymptotes]].
3. $f'$: bảng dấu → khoảng tăng/giảm, cực trị → [[First Derivative Test]].
4. $f''$: bảng dấu → khoảng lõm, điểm uốn.
5. Vẽ, kiểm tra hai bảng dấu có mâu thuẫn không.

Hai bảng dấu mâu thuẫn (ví dụ: cực đại nằm ở đoạn lõm lên) là dấu hiệu tính sai $f'$ hoặc $f''$ — một phép kiểm miễn phí.

## 6. Cạm bẫy

1. **Kết luận điểm uốn chỉ từ $f''=0$**, không kiểm đổi dấu.
2. **Quên ứng viên nơi $f''$ không tồn tại.**
3. **Nhầm "lõm lên" với "đang tăng".** Độc lập hoàn toàn — xem bảng mục 2.
4. **Dùng second derivative test khi $f''(c)=0$** rồi kết luận "không có cực trị".
5. **Nhầm hướng từ vựng convex/concave up** khi đọc tài liệu tối ưu.
6. **Điểm uốn tại chỗ $f$ không xác định.** Tiệm cận đứng không phải điểm uốn — điểm uốn phải thuộc đồ thị.
7. **Chỉ báo cáo $x$ của điểm uốn.** Điểm uốn là một **điểm** $(c, f(c))$.

## 7. Checklist áp dụng
- [ ] Đã tính và rút gọn $f''$ chưa?
- [ ] Danh sách ứng viên điểm uốn có gồm cả chỗ $f''$ không tồn tại chưa?
- [ ] Đã kiểm $f''$ **đổi dấu** qua từng ứng viên chưa?
- [ ] Ứng viên có thuộc miền xác định của $f$ không?
- [ ] Nếu dùng second derivative test: $f''(c)\ne0$ chứ? (nếu $=0$ → chuyển test 1)
- [ ] Bảng dấu $f'$ và bảng dấu $f''$ có nhất quán với hình vẽ không?
- [ ] Đã báo cáo điểm uốn dưới dạng cặp $(c, f(c))$ chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §4.3, §4.5: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 35–36: https://www.youtube.com/watch?v=G-ti56DEXE8
- Boyd & Vandenberghe — *Convex Optimization*, ch. 3 (từ vựng convex): https://web.stanford.edu/~boyd/cvxbook/
- Paul's Online Math Notes — *The Shape of a Graph, Part II*: https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtII.aspx

## Liên kết
[[First Derivative Test]] · [[Critical Numbers and Extrema]] · [[Infinite Limits and Asymptotes]] · [[Rates of Change]] · [[ML]] · [[Math]]
