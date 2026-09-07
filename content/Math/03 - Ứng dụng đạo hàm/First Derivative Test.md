---
tags: [math, calculus, optimization]
status: evergreen
---
# First Derivative Test

> Bảng dấu của $f'$. Công cụ này **luôn** kết luận được — khác [[Concavity and Inflection Points]] (second derivative test) có thể bó tay. Nếu chỉ được nhớ một test, nhớ cái này.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"33) Increasing and Decreasing Functions using the First Derivative 2:48:13"* và *"34) The First Derivative Test 2:53:28"*.

## 1. Đơn điệu

Trên **một khoảng** (điều kiện này quan trọng — xem [[Mean Value Theorem]] cạm bẫy 6):

| Dấu $f'$ | $f$ |
|---|---|
| $f'>0$ | tăng nghiêm ngặt |
| $f'<0$ | giảm nghiêm ngặt |
| $f'=0$ khắp khoảng | hằng |

Cả ba đều là **hệ quả của MVT**, không phải định nghĩa. Chiều ngược yếu hơn: $f$ tăng ⟹ $f'\ge0$ (dấu bằng có thể xảy ra — $x^3$ tại $0$).

## 2. Bảng biến thiên — quy trình

1. Tìm miền xác định của $f$.
2. Tính $f'$, **phân tích nhân tử**.
3. Tìm mọi **điểm tới hạn** và mọi điểm $f$ không xác định → [[Critical Numbers and Extrema]].
4. Chia trục số bằng **tất cả** các điểm đó.
5. Chọn một điểm thử trong mỗi khoảng, xác định **dấu** $f'$.
6. Đọc kết luận từ bảng.

> [!warning] Điểm không thuộc miền xác định vẫn phải chia khoảng
> $f(x)=\frac{x^2}{x-1}$: $x=1$ không phải điểm tới hạn (không thuộc miền) nhưng $f'$ **đổi dấu** qua đó, nên bắt buộc phải là một vách ngăn trong bảng.

## 3. Kết luận từ bảng dấu

Tại điểm tới hạn $c$, xét dấu $f'$ **hai bên**:

| Trái $c$ | Phải $c$ | Kết luận |
|---|---|---|
| $+$ | $-$ | cực **đại** địa phương |
| $-$ | $+$ | cực **tiểu** địa phương |
| $+$ | $+$ | không cực trị (điểm uốn ngang) |
| $-$ | $-$ | không cực trị |

Mẹo: vẽ mũi tên ↗↘ theo dấu. Đỉnh núi là max, đáy thung là min.

**Ví dụ:** $f(x)=x^3-3x$ ⟹ $f'=3(x-1)(x+1)$.

| Khoảng | $(-\infty,-1)$ | $(-1,1)$ | $(1,\infty)$ |
|---|---|---|---|
| $f'$ | $+$ | $-$ | $+$ |
| $f$ | ↗ | ↘ | ↗ |

$x=-1$: cực đại địa phương $f(-1)=2$. $x=1$: cực tiểu địa phương $f(-1)=-2$. Không có cực trị toàn cục vì miền là $\mathbb{R}$.

## 4. First vs second derivative test

| | First derivative test | Second derivative test |
|---|---|---|
| Cần | $f'$ và bảng dấu | $f''$ tại điểm tới hạn |
| Áp dụng khi | **luôn luôn** | $f''(c)$ tồn tại và $\ne0$ |
| Nếu $f''(c)=0$ | không ảnh hưởng | **không kết luận được** |
| Điểm $f'$ không tồn tại | xử lý được | không xử lý được |
| Công sức | nhiều hơn | ít hơn khi $f''$ dễ tính |
| Cho thêm | bảng biến thiên đầy đủ | chỉ phân loại một điểm |

Kết luận thực dụng: dùng second derivative test khi $f''$ tính nhanh và ra khác $0$; mọi trường hợp khác dùng first. → [[Concavity and Inflection Points]]

## 5. Cạm bẫy

1. **Không phân tích nhân tử $f'$** ⟹ không giải được $f'=0$ và không xét dấu được.
2. **Quên chia khoảng tại điểm $f$ không xác định.**
3. **Kết luận cực trị mà $f'$ không đổi dấu.**
4. **Đọc dấu $f'$ nhầm thành dấu $f$.** $f'>0$ nói $f$ **tăng**, không nói $f>0$.
5. **Chọn điểm thử là chính điểm tới hạn.** Phải chọn điểm **trong lòng** khoảng.
6. **Áp "tăng trên mọi khoảng" thành "tăng trên hợp các khoảng".** Sai với hàm có tiệm cận đứng.
7. **Nhầm cực trị địa phương với toàn cục.** Bảng dấu chỉ cho địa phương; toàn cục cần thêm đầu mút hoặc giới hạn ở vô cực.

## 6. Checklist áp dụng
- [ ] Đã xác định miền xác định của $f$ chưa?
- [ ] $f'$ đã phân tích nhân tử chưa?
- [ ] Danh sách vách ngăn có gồm **cả** điểm tới hạn **và** điểm $f$ không xác định chưa?
- [ ] Mỗi khoảng đã chọn một điểm thử **bên trong** chưa?
- [ ] Đã ghi rõ đây là cực trị **địa phương** chưa?
- [ ] Nếu cần toàn cục — đã xét đầu mút / giới hạn ở $\pm\infty$ chưa?
- [ ] Kết luận có ghi cả **vị trí** ($x=c$) lẫn **giá trị** ($f(c)$) không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §4.3: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 33–34: https://www.youtube.com/watch?v=G-ti56DEXE8
- Paul's Online Math Notes — *The Shape of a Graph, Part I*: https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtI.aspx
- Wikipedia — *Derivative test*: https://en.wikipedia.org/wiki/Derivative_test

## Liên kết
[[Critical Numbers and Extrema]] · [[Concavity and Inflection Points]] · [[Mean Value Theorem]] · [[Extreme Value Theorem]] · [[Math]]
