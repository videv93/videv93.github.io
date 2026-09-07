---
tags: [math, calculus, theorem]
status: evergreen
---
# Intermediate Value Theorem

> Định lý **tồn tại** đầu tiên bạn gặp: nó khẳng định có nghiệm mà không nói nghiệm ở đâu. Đây là một kiểu định lý mới, và cách nghĩ về nó khác hẳn công thức tính.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"13) Intermediate Value Theorem 42:42"* trong seed.

## 1. Phát biểu

Nếu $f$ **liên tục trên $[a,b]$** và $N$ là một số nằm giữa $f(a)$ và $f(b)$, thì **tồn tại** $c \in (a,b)$ với $f(c) = N$.

**Dạng thường dùng (Bolzano):** nếu $f$ liên tục trên $[a,b]$ và $f(a)\cdot f(b) < 0$ thì $f$ có ít nhất một nghiệm trong $(a,b)$.

Trực giác: đồ thị liên tục đi từ dưới trục lên trên trục thì phải cắt trục. Nhưng đó là trực giác — bản chất định lý dựa trên **tính đầy đủ của $\mathbb{R}$** (mọi tập bị chặn trên có supremum). Trên $\mathbb{Q}$ định lý **sai**: $f(x)=x^2-2$ đổi dấu trên $[1,2]$ nhưng không có nghiệm hữu tỉ.

## 2. Từng giả thiết dùng để làm gì

| Bỏ giả thiết | Phản ví dụ | Kết luận |
|---|---|---|
| **Liên tục** | $f(x)=\frac1x$ trên $[-1,1]$, $f(-1)=-1<0<1=f(1)$ | Không có nghiệm |
| **Khoảng đóng** | cần $f(a), f(b)$ tồn tại | Không phát biểu được |
| **Khoảng liên thông** | $f$ trên $[-2,-1]\cup[1,2]$ | Không áp dụng được |

Đây là quy trình đọc định lý mô tả trong [[Reading Mathematics]]: tấn công từng giả thiết.

## 3. Định lý này **không** nói gì

> [!warning] Ba điều IVT không khẳng định
> 1. **Không nói nghiệm ở đâu.** Chỉ nói có.
> 2. **Không nói có bao nhiêu nghiệm.** Ít nhất một, có thể vô hạn.
> 3. **Chiều ngược sai.** $f$ có nghiệm trong $(a,b)$ **không** kéo theo $f$ liên tục hay $f(a)f(b)<0$. Ví dụ: $f(x)=x^2$ trên $[-1,1]$ có nghiệm nhưng $f(-1)f(1)=1>0$.

Muốn kết luận **duy nhất** phải thêm tính đơn điệu — tức là cần $f' > 0$ hoặc $f' < 0$, từ [[First Derivative Test]].

## 4. Ba ứng dụng

**Chứng minh phương trình có nghiệm**
$$x^3 - x - 1 = 0 \text{ có nghiệm trong } (1,2)?$$
$f$ là đa thức ⟹ liên tục. $f(1) = -1 < 0$, $f(2)=5>0$ ⟹ có nghiệm. Xong.

**Bisection method** — thuật toán tìm nghiệm dựa hoàn toàn vào IVT: chia đôi khoảng, giữ nửa có đổi dấu, lặp. Hội tụ **tuyến tính** (mỗi bước giảm sai số một nửa) — chậm hơn [[Newton's Method]] nhưng **luôn** hội tụ, không cần đạo hàm.

**Bài toán điểm bất động** — chứng minh $f(x)=x$ có nghiệm: áp IVT cho $g(x)=f(x)-x$.

## 5. Cạm bẫy

1. **Quên kiểm tra liên tục.** Bước bắt buộc, và với hàm hữu tỉ phải kiểm mẫu không triệt tiêu **trong** $[a,b]$.
2. **Dùng IVT để kết luận nghiệm duy nhất.**
3. **Kết luận "không có nghiệm" khi $f(a)f(b)>0$.** IVT là điều kiện **đủ**, không cần. → [[Mathematical Logic Basics]]
4. **Áp trên khoảng mở** rồi dùng giá trị tại đầu mút.
5. **Nhầm IVT với EVT.** IVT nói về **giá trị trung gian**, EVT nói về **max/min**. → [[Extreme Value Theorem]]
6. **Dùng $f(a) < N < f(b)$ mà quên trường hợp $f(a) > f(b)$.** "Giữa" không có thứ tự cố định.

## 6. Checklist áp dụng
- [ ] $f$ có liên tục trên **toàn bộ** $[a,b]$ không? (kiểm mẫu, căn, log trong khoảng)
- [ ] Đã tính $f(a)$ và $f(b)$ bằng số cụ thể chưa?
- [ ] $N$ có thật sự nằm giữa hai giá trị đó không?
- [ ] Kết luận đang phát biểu là "tồn tại", không phải "duy nhất" chứ?
- [ ] Nếu cần duy nhất — đã có lập luận đơn điệu ($f'$ giữ dấu) chưa?
- [ ] Nếu $f(a)f(b)>0$ — đã tránh kết luận sai "không có nghiệm" chưa?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §2.5: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 13 (42:42): https://www.youtube.com/watch?v=G-ti56DEXE8
- Wikipedia — *Intermediate value theorem*: https://en.wikipedia.org/wiki/Intermediate_value_theorem
- Abbott — *Understanding Analysis*, §4.5 (chứng minh đầy đủ): https://link.springer.com/book/10.1007/978-1-4939-2712-8

## Liên kết
[[Continuity]] · [[Extreme Value Theorem]] · [[Mean Value Theorem]] · [[Newton's Method]] · [[Math]]
