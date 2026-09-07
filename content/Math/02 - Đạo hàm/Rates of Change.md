---
tags: [math, calculus, derivative, application]
status: evergreen
---
# Rates of Change

> Đạo hàm **là** tốc độ biến thiên tức thời — không phải "có ứng dụng là". Note này làm rõ chỗ nối giữa hai cách nói, và cái bẫy đơn vị đi kèm.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"23) Average and Instantaneous Rate of Change (Full Derivation) 1:39:52"* và *"24) …(Example) 1:47:37"*.

## 1. Trung bình vs tức thời

| | Trung bình | Tức thời |
|---|---|---|
| Công thức | $\dfrac{f(b)-f(a)}{b-a}$ | $f'(a)=\lim_{h\to0}\dfrac{f(a+h)-f(a)}{h}$ |
| Hình học | hệ số góc **cát tuyến** | hệ số góc **tiếp tuyến** |
| Cần gì | hai điểm | một điểm + tính khả vi |
| Đo | trên một khoảng | tại một thời điểm |

Tức thời là **giới hạn** của trung bình khi khoảng co về 0. Đó là toàn bộ nội dung của [[Derivative Definition]] — chỉ đổi từ vựng.

[[Mean Value Theorem]] nối hai cột này lại: tồn tại một điểm mà tốc độ tức thời **bằng đúng** tốc độ trung bình.

## 2. Đơn vị

$$[f'] = \frac{[f]}{[x]}$$

| $f$ | $x$ | $f'$ | Tên |
|---|---|---|---|
| mét | giây | m/s | vận tốc |
| m/s | giây | m/s² | gia tốc |
| chi phí (đ) | số sản phẩm | đ/sản phẩm | **chi phí biên** |
| doanh thu | số sản phẩm | đ/sản phẩm | doanh thu biên |
| dân số | năm | người/năm | tốc độ tăng trưởng |
| giá quyền chọn | giá cổ phiếu | không thứ nguyên | **delta** → [[Quant]] |
| nồng độ | thời gian | mol/(L·s) | tốc độ phản ứng |

Kiểm đơn vị là cách bắt lỗi rẻ nhất: nếu đáp án ra "m/s" cho một bài hỏi gia tốc thì sai ở đâu đó.

## 3. Diễn giải dấu và độ lớn

| | Nghĩa |
|---|---|
| $f'(a)>0$ | đang tăng tại $a$ |
| $f'(a)<0$ | đang giảm tại $a$ |
| $f'(a)=0$ | đứng yên tức thời — điểm tới hạn ([[Critical Numbers and Extrema]]) |
| $\vert f'(a)\vert$ lớn | thay đổi nhanh |
| $f''(a)>0$ | tốc độ **đang tăng** — tăng nhanh dần / giảm chậm dần |

Câu hay bị hiểu sai: *"lạm phát đang giảm"* nghĩa là $f''<0$ với $f$ = mức giá — giá vẫn **tăng**, chỉ chậm lại. → [[Concavity and Inflection Points]]

## 4. Xấp xỉ tuyến tính

$$f(a+h) \approx f(a) + f'(a)h$$

Đây là cách "tốc độ biến thiên" trở nên dùng được: biết giá trị và tốc độ tại một điểm thì dự đoán được lân cận. Chi phí biên $C'(100)=50$ nghĩa là sản phẩm thứ 101 tốn *xấp xỉ* 50 đơn vị. → [[Differentials and Linear Approximation]]

## 5. Cạm bẫy

1. **Dùng tốc độ trung bình để trả lời câu hỏi "tại thời điểm".**
2. **Bỏ đơn vị.** Đáp án tốc độ biến thiên không có đơn vị thì gần như vô nghĩa.
3. **Nhầm $f$ giảm với $f'$ giảm.** $f$ giảm ⟺ $f'<0$. $f'$ giảm ⟺ $f''<0$. Hoàn toàn khác nhau.
4. **Coi chi phí biên là chi phí thật của đơn vị tiếp theo.** Nó là **xấp xỉ** — chính xác chỉ khi $C$ tuyến tính.
5. **Quên rằng đạo hàm cần khả vi.** Dữ liệu rời rạc (giá đóng cửa hàng ngày) không có đạo hàm; chỉ có sai phân.
6. **So sánh tốc độ của hai đại lượng khác đơn vị.** Cần chuẩn hoá (ví dụ: tốc độ **tương đối** $f'/f$).

## 6. Checklist áp dụng
- [ ] Câu hỏi hỏi "trên khoảng" (trung bình) hay "tại thời điểm" (tức thời)?
- [ ] Đã ghi đơn vị của kết quả chưa? Có đúng dạng $[f]/[x]$ không?
- [ ] Dấu của đạo hàm có khớp với mô tả bằng lời không?
- [ ] Nếu đề nói "tăng chậm lại" — đó là $f'>0$ **và** $f''<0$, đã viết cả hai chưa?
- [ ] Nếu dùng xấp xỉ tuyến tính — $h$ có đủ nhỏ không?
- [ ] Dữ liệu là hàm liên tục hay dãy rời rạc?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §2.7, §3.7: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 23–24: https://www.youtube.com/watch?v=G-ti56DEXE8
- 3Blue1Brown — *The paradox of the derivative*: https://www.3blue1brown.com/lessons/derivatives
- Paul's Online Math Notes — *Rates of Change*: https://tutorial.math.lamar.edu/Classes/CalcI/RateOfChange.aspx

## Liên kết
[[Derivative Definition]] · [[Motion and Kinematics]] · [[Related Rates]] · [[Differentials and Linear Approximation]] · [[Mean Value Theorem]] · [[Math]]
