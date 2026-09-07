---
tags: [math, calculus, theorem]
status: evergreen
---
# Extreme Value Theorem

> Định lý **bảo đảm sự tồn tại** của max và min. Không có nó, quy trình tìm cực trị toàn cục ở [[Critical Numbers and Extrema]] chỉ là một danh sách ứng viên có thể rỗng.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả header rỗng *"30) Extreme Value Theorem 2:28:36"* trong seed.

## 1. Phát biểu

Nếu $f$ **liên tục** trên khoảng **đóng và bị chặn** $[a,b]$, thì $f$ đạt cả giá trị lớn nhất và nhỏ nhất trên $[a,b]$: tồn tại $c,d \in [a,b]$ sao cho
$$f(d) \le f(x) \le f(c) \quad \forall x \in [a,b]$$

Ba từ khoá: **liên tục**, **đóng**, **bị chặn**. Bỏ bất kỳ từ nào thì định lý sai.

## 2. Ba giả thiết, ba phản ví dụ

| Bỏ giả thiết | Ví dụ | Chuyện gì hỏng |
|---|---|---|
| **Liên tục** | $f(x)=\frac1x$ trên $[-1,1]$ (đặt $f(0)=0$) | không bị chặn, không có max |
| **Đóng** | $f(x)=x$ trên $(0,1)$ | inf $=0$, sup $=1$, **không đạt** được |
| **Bị chặn** | $f(x)=x$ trên $[0,\infty)$ | không có max |
| Cả ba đủ | $f(x)=x^2$ trên $[-1,2]$ | max $=4$, min $=0$ ✅ |

Ví dụ $(0,1)$ là ví dụ đáng nhớ nhất: hàm đẹp nhất có thể, khoảng chỉ thiếu **hai điểm**, mà max/min biến mất hoàn toàn.

## 3. Định lý này nói gì và không nói gì

| Nói | Không nói |
|---|---|
| Max và min **tồn tại** | Chúng nằm **ở đâu** |
| Chúng đạt được tại điểm cụ thể trong $[a,b]$ | Chúng **duy nhất** ($\sin x$ trên $[0,4\pi]$ đạt max hai lần) |
| — | $f$ khả vi ở đâu |
| — | Điều gì xảy ra khi giả thiết không thoả (**có thể** vẫn có max) |

EVT là điều kiện **đủ**, không cần: $f(x)=x^2$ trên $(-1,1)$ vẫn có min tại $0$ dù khoảng mở.

## 4. Vì sao đúng (ý tưởng)

Hai bước, cả hai đều dựa trên **tính đầy đủ của $\mathbb{R}$** — cùng nền tảng với [[Intermediate Value Theorem]]:

1. **Bị chặn:** hàm liên tục trên compact thì bị chặn (nếu không, xây được dãy $x_n$ với $|f(x_n)|>n$; theo Bolzano–Weierstrass dãy có dãy con hội tụ về $x^*\in[a,b]$, mâu thuẫn với liên tục tại $x^*$).
2. **Đạt được:** đặt $M = \sup f$. Nếu $f$ không bao giờ đạt $M$ thì $\frac1{M-f(x)}$ liên tục và không bị chặn — mâu thuẫn bước 1.

Chứng minh đầy đủ thuộc real analysis, không thuộc Calculus 1 — xem [[Mathematics Roadmap]].

## 5. Cạm bẫy

1. **Quên kiểm liên tục.** Với hàm hữu tỉ: mẫu có triệt tiêu trong $[a,b]$ không?
2. **Áp cho khoảng mở.** Nguồn sai phổ biến nhất.
3. **Kết luận "không có max" khi giả thiết không thoả.** EVT chỉ là điều kiện đủ. → [[Mathematical Logic Basics]]
4. **Nhầm EVT với IVT.** EVT: max/min. IVT: giá trị trung gian.
5. **Tưởng EVT chỉ ra chỗ cực trị.** Nó chỉ bảo đảm tồn tại; tìm ở đâu là việc của [[Critical Numbers and Extrema]].
6. **Quên đầu mút cũng là ứng viên.** EVT không nói cực trị nằm bên trong.

## 6. Checklist áp dụng
- [ ] Khoảng có **đóng** không? (dấu ngoặc vuông cả hai đầu)
- [ ] Khoảng có **bị chặn** không? (không chứa $\pm\infty$)
- [ ] $f$ có liên tục trên **toàn bộ** khoảng không? (mẫu, căn, log, điểm nối)
- [ ] Nếu một giả thiết hỏng — có tránh kết luận "không có cực trị" không?
- [ ] Sau khi EVT bảo đảm tồn tại: đã lập danh sách ứng viên (điểm tới hạn + hai đầu mút) chưa?
- [ ] Có kiểm khả năng max/min đạt tại **nhiều** điểm không?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §4.1: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 30 (2:28:36): https://www.youtube.com/watch?v=G-ti56DEXE8
- Abbott — *Understanding Analysis*, §4.4: https://link.springer.com/book/10.1007/978-1-4939-2712-8
- Wikipedia — *Extreme value theorem*: https://en.wikipedia.org/wiki/Extreme_value_theorem

## Liên kết
[[Critical Numbers and Extrema]] · [[Intermediate Value Theorem]] · [[Continuity]] · [[Mean Value Theorem]] · [[Math]]
