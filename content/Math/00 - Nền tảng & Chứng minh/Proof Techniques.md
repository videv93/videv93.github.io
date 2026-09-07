---
tags: [math, foundations, proof]
status: evergreen
---
# Proof Techniques

> Sáu khuôn chứng minh phủ gần hết toán đại học. Biết chọn đúng khuôn quan trọng hơn biết viết đẹp — chọn sai khuôn thì viết bao nhiêu cũng không ra.

> [!note] Ghi chú nguồn
> Thư mục này không có trong seed dạng chữ. Nó đến từ `mathematics-roadmap.jpg`, nơi **Naive Set Theory, Mathematical Reasoning, Proofs, and Discrete Mathematics** là nút chặn: gần như mọi nhánh (real analysis, abstract algebra, topology, number theory) đều có mũi tên đi ra từ nó. Seed calculus thì bỏ qua hoàn toàn phần này — xem [[Computational vs Rigorous Mathematics]].

## 1. Sáu khuôn

| Khuôn | Dạng mệnh đề | Cách mở đầu | Ví dụ kinh điển |
|---|---|---|---|
| **Trực tiếp** | $P \Rightarrow Q$ | "Giả sử $P$." → biến đổi tới $Q$ | Tổng hai số chẵn là chẵn |
| **Phản đảo** (contrapositive) | $P \Rightarrow Q$ | "Giả sử $\neg Q$." → tới $\neg P$ | $n^2$ chẵn $\Rightarrow n$ chẵn |
| **Phản chứng** (contradiction) | Mọi dạng | "Giả sử $\neg$(mệnh đề)." → mâu thuẫn | $\sqrt 2$ vô tỉ |
| **Quy nạp** | $\forall n \in \mathbb{N}$ | Cơ sở $n = n_0$, bước $n \to n+1$ | $\sum_{k=1}^n k = n(n+1)/2$ |
| **Phản ví dụ** | Bác bỏ $\forall x, P(x)$ | Chỉ ra đúng **một** $x$ | "Mọi số nguyên tố là lẻ" — $2$ |
| **Song ánh / đếm hai cách** | Đẳng thức về số lượng | "Ta đếm cùng một tập theo hai cách" | → [[Story Proofs]] ở [[Prob&Stats]] |

## 2. Chọn khuôn nào

1. **Kết luận có dạng "không tồn tại" hoặc chứa "vô tỉ / vô hạn / không"** → phản chứng.
2. **Giả thiết $P$ khó dùng nhưng $\neg Q$ dễ dùng** → phản đảo. Đây là dấu hiệu bị bỏ lỡ nhiều nhất.
3. **Mệnh đề chỉ số bởi $n$ tự nhiên** → quy nạp. Nếu bước $n \to n+1$ không đủ, dùng **quy nạp mạnh** (giả sử đúng với mọi $k \le n$).
4. **Hai vế đều là số nguyên đếm được** → đếm hai cách, gần như luôn đẹp hơn đại số.
5. **Mệnh đề "khi và chỉ khi"** → luôn tách thành hai chiều, viết riêng. Đừng cố chứng minh cả hai chiều bằng một chuỗi tương đương trừ khi mọi bước thật sự thuận nghịch.

## 3. Cạm bẫy

1. **Giả định điều phải chứng minh.** Bắt đầu từ $Q$ rồi biến đổi tới một mệnh đề đúng — sai chiều. Chỉ hợp lệ nếu mọi bước là $\Leftrightarrow$ và bạn nói rõ điều đó.
2. **Quy nạp thiếu cơ sở.** Bước quy nạp đúng mà không có $n_0$ thì chứng minh được cả mệnh đề sai.
3. **Nhầm phản đảo với đảo.** Đảo của $P \Rightarrow Q$ là $Q \Rightarrow P$ — **không tương đương**. Phản đảo là $\neg Q \Rightarrow \neg P$ — tương đương. → [[Mathematical Logic Basics]]
4. **Phản chứng khi trực tiếp đủ.** Thói quen xấu: gói mọi thứ vào phản chứng làm chứng minh dài và khó kiểm tra.
5. **"Rõ ràng là…"** che một bước bạn chưa kiểm. Nếu thật sự rõ ràng thì viết nó ra chỉ tốn một dòng.
6. **Phủ định sai lượng từ.** $\neg(\forall x\, \exists y\, P)$ là $\exists x\, \forall y\, \neg P$, không phải $\forall x\, \exists y\, \neg P$.

## 4. Checklist áp dụng
- [ ] Đã viết ra chính xác **giả thiết** và **kết luận** dưới dạng ký hiệu chưa?
- [ ] Mọi lượng từ trong mệnh đề đã được xác định rõ phạm vi chưa?
- [ ] Khuôn đã chọn có khớp với dạng kết luận không (bảng mục 1)?
- [ ] Nếu quy nạp: cơ sở đã kiểm chưa? Bước quy nạp có **thật sự dùng** giả thiết quy nạp không?
- [ ] Có bước nào đang đi từ kết luận về giả thiết không?
- [ ] Đã thử một trường hợp cụ thể ($n=2,3$) để chắc mệnh đề không sai không?
- [ ] Đọc lại: có chữ "rõ ràng", "hiển nhiên", "dễ thấy" nào đang giấu một bước không?

## Tham khảo
- Velleman — *How to Prove It: A Structured Approach*, 3rd ed.: https://www.cambridge.org/9781108424189
- Hammack — *Book of Proof* (miễn phí, PDF): https://www.people.vcu.edu/~rhammack/BookOfProof/
- Polya — *How to Solve It*: https://press.princeton.edu/books/paperback/9780691164076/how-to-solve-it
- Cambridge — Gowers, *How to write a good proof*: https://www.dpmms.cam.ac.uk/~wtg10/proofs.html

## Liên kết
[[Mathematical Logic Basics]] · [[Sets Functions and Relations]] · [[Reading Mathematics]] · [[Computational vs Rigorous Mathematics]] · [[Math]]
