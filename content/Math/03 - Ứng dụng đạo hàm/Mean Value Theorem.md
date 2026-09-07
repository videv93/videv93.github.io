---
tags: [math, calculus, theorem]
status: evergreen
---
# Mean Value Theorem

> Định lý cầu nối quan trọng nhất của Calculus 1. Gần như mọi thứ bạn tin là hiển nhiên — "$f'>0$ thì $f$ tăng", "$f'=0$ khắp nơi thì $f$ hằng", "hai nguyên hàm chỉ khác hằng số" — đều **được chứng minh bằng MVT** và không có cách nào khác.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"31) Rolle's Theorem 2:34:50"* và *"32) The Mean Value Theorem 2:41:20"*.

## 1. Hai phát biểu

**Rolle:** $f$ liên tục trên $[a,b]$, khả vi trên $(a,b)$, **và $f(a)=f(b)$** ⟹ tồn tại $c\in(a,b)$ với $f'(c)=0$.

**MVT (Lagrange):** $f$ liên tục trên $[a,b]$, khả vi trên $(a,b)$ ⟹ tồn tại $c\in(a,b)$ với
$$f'(c) = \frac{f(b)-f(a)}{b-a}$$

Rolle là trường hợp riêng của MVT khi $f(a)=f(b)$. Ngược lại, MVT chứng minh **từ** Rolle: áp Rolle cho $g(x)=f(x)-\big[f(a)+\frac{f(b)-f(a)}{b-a}(x-a)\big]$ (hiệu giữa $f$ và cát tuyến), vì $g(a)=g(b)=0$.

**Hình học:** tồn tại một điểm mà **tiếp tuyến song song với cát tuyến**. Tức tốc độ tức thời bằng đúng tốc độ trung bình tại đâu đó — nối hai cột của [[Rates of Change]].

**Ví dụ đời thường:** xe đi 180 km trong 2 giờ ⟹ tốc độ trung bình 90 km/h ⟹ có **một khoảnh khắc** đồng hồ chỉ đúng 90 km/h. Đây là cơ sở của camera đo tốc độ trung bình.

## 2. Chú ý giả thiết bất đối xứng

| Trên | Đòi hỏi | Vì sao |
|---|---|---|
| $[a,b]$ đóng | **liên tục** | cần giá trị tại hai đầu mút |
| $(a,b)$ mở | **khả vi** | không cần đạo hàm tại đầu mút |

$f(x)=|x|$ trên $[-1,1]$: liên tục, $f(-1)=f(1)$, nhưng không khả vi tại $0$ ⟹ Rolle không áp dụng, và thật vậy $f'$ không bao giờ bằng $0$.

$f(x)=x^{2/3}$ trên $[-1,1]$: cùng lý do, có cusp.

## 3. Bốn hệ quả — đây mới là giá trị thật

| Hệ quả | Phát biểu | Dùng ở đâu |
|---|---|---|
| **1** | $f'=0$ trên khoảng ⟹ $f$ hằng | nền của mọi thứ dưới |
| **2** | $f'=g'$ trên khoảng ⟹ $f-g$ hằng | **hằng số $+C$** của [[Antiderivatives]] |
| **3** | $f'>0$ trên khoảng ⟹ $f$ tăng nghiêm ngặt | [[First Derivative Test]] |
| **4** | $\vert f'\vert \le M$ ⟹ $\vert f(b)-f(a)\vert \le M\vert b-a\vert$ | chặn sai số, Lipschitz |

**Chứng minh hệ quả 3** (mẫu cho cả bốn): lấy $x_1<x_2$ trong khoảng. MVT trên $[x_1,x_2]$ cho $c$ với $f(x_2)-f(x_1)=f'(c)(x_2-x_1)>0$ ⟹ $f(x_2)>f(x_1)$. ∎

> [!note] Vì sao đây là chỗ quan trọng
> "$f'>0$ thì đồ thị đi lên" nghe hiển nhiên, nhưng nó là mệnh đề **toàn cục** suy ra từ thông tin **địa phương**. Chỉ MVT làm được bước nhảy đó. Không có MVT thì không có bảng biến thiên, không có $+C$, không có [[Fundamental Theorem of Calculus]].

## 4. Ứng dụng chặn giá trị

Chứng minh $|\sin a - \sin b| \le |a-b|$: áp hệ quả 4 với $|(\sin)'|=|\cos|\le1$. Một dòng.

Chứng minh phương trình có **đúng một** nghiệm: IVT cho tồn tại + Rolle cho duy nhất (nếu có hai nghiệm thì $f'$ phải triệt tiêu giữa chúng — mâu thuẫn nếu $f'$ không đổi dấu). → [[Intermediate Value Theorem]]

## 5. Cạm bẫy

1. **Áp Rolle mà không kiểm $f(a)=f(b)$.**
2. **Quên kiểm khả vi trên toàn $(a,b)$.** Trị tuyệt đối, căn bậc lẻ, hàm từng khúc.
3. **Nghĩ $c$ duy nhất.** Có thể có nhiều $c$.
4. **Tưởng MVT cho biết $c$ ở đâu.** Định lý tồn tại. Với đa thức bậc 2 thì $c$ là trung điểm — trùng hợp, không phải quy luật.
5. **Áp trên khoảng có điểm gián đoạn.**
6. **Dùng hệ quả 3 trên tập không liên thông.** $f(x)=-1/x$ có $f'>0$ khắp nơi trên miền xác định nhưng **không** tăng trên $\mathbb{R}\setminus\{0\}$ ($f(-1)=1 > f(1)=-1$). Các hệ quả chỉ đúng trên **một khoảng**.
7. **Nhầm MVT với [[Mean Value Theorem for Integrals]].** Hai định lý khác nhau.

## 6. Checklist áp dụng
- [ ] $f$ liên tục trên $[a,b]$ **đóng** chưa?
- [ ] $f$ khả vi trên $(a,b)$ **mở** chưa? (kiểm góc, cusp, tiếp tuyến đứng)
- [ ] Nếu dùng Rolle: $f(a)=f(b)$ chưa?
- [ ] Đang kết luận "tồn tại $c$", không phải "duy nhất $c$" chứ?
- [ ] Nếu dùng hệ quả (tăng/giảm/hằng): miền có phải **một khoảng liên thông** không?
- [ ] Nếu chặn sai số: đã tìm $M = \max|f'|$ trên khoảng chưa?
- [ ] Nếu chứng minh duy nhất nghiệm: đã có IVT (tồn tại) **và** Rolle/đơn điệu (duy nhất) chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §4.2: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 31–32: https://www.youtube.com/watch?v=G-ti56DEXE8
- Abbott — *Understanding Analysis*, §5.3: https://link.springer.com/book/10.1007/978-1-4939-2712-8
- Wikipedia — *Mean value theorem*: https://en.wikipedia.org/wiki/Mean_value_theorem

## Liên kết
[[Extreme Value Theorem]] · [[First Derivative Test]] · [[Antiderivatives]] · [[Rates of Change]] · [[Mean Value Theorem for Integrals]] · [[Math]]
