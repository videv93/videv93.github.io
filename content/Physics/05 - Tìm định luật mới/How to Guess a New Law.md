---
tags: [physics, method, heuristics]
status: growing
---
# How to Guess a New Law

> Bước 1 trong quy trình của [[Seeking New Laws]] là "đoán" — nhưng đoán trong một không gian bị ràng buộc rất chặt. Note này liệt kê các ràng buộc và các nguồn phỏng đoán thực tế.

## 1. Vì sao không thể đoán bừa

Một định luật mới phải sống sót qua toàn bộ những gì đã biết. Các ràng buộc bắt buộc:

| Ràng buộc | Nghĩa là |
|---|---|
| **Giới hạn cổ điển** | Ở thang lớn / $\hbar \to 0$ phải cho lại vật lý cổ điển |
| **Bất biến Lorentz** | Phải nhất quán với thuyết tương đối hẹp |
| **Unitarity** | Tổng xác suất phải bằng 1 |
| **Định luật bảo toàn** | Phải tôn trọng các đối xứng đã kiểm chứng. Xem [[Symmetry and Conservation Laws]] |
| **Nhân quả** | Tín hiệu không nhanh hơn ánh sáng |
| **Khớp mọi dữ liệu cũ** | Tiêu chuẩn tối thiểu, không phải bằng chứng |

Không gian còn lại sau các ràng buộc này rất nhỏ. Đó là lý do "đoán" khả thi.

## 2. Bốn nguồn phỏng đoán

### 2.1 — Đối xứng

Cách hiện đại nhất: **giả định một đối xứng, rồi suy ra động lực học bắt buộc theo nó.** Toàn bộ Mô hình Chuẩn được xây như vậy — chọn nhóm gauge $SU(3) \times SU(2) \times U(1)$, và dạng của các tương tác gần như được quyết định.

Ví dụ trong seed: parity bị vi phạm **tối đa** → ràng buộc rất chặt lên dạng tương tác yếu → cấu trúc V−A. Xem [[Parity Violation]] và [[V-A Theory of Weak Interaction]].

### 2.2 — Tương tự (analogy)

Feynman đưa ví dụ trực tiếp: ông tiếp cận lượng tử hấp dẫn bằng cách **loại suy từ photon**. Photon là trường không khối lượng spin 1; ông xét trường không khối lượng **spin 2** và thu được phương trình Einstein.

> Wikipedia clipping trong seed: *"By analogy with the photon, which has spin 1, he investigated the consequences of a free massless spin 2 field and derived the Einstein field equation of general relativity, but little more."*

Vế "but little more" quan trọng ngang phần đầu — loại suy đưa ta tới điểm khởi đầu, không tới đích. Xem [[Quantum Gravity]].

### 2.3 — Nguyên lý biến phân

Đoán một **tác dụng** (action) thay vì đoán phương trình chuyển động. Ưu điểm lớn: đối xứng dễ áp đặt, và các định luật bảo toàn tự động xuất hiện qua định lý Noether.

Đây là cách [[Path Integral Formulation]] biến nguyên lý tác dụng tối thiểu từ một *sự kiện lạ* thành một *công cụ*. Xem [[Three Equivalent Formulations]].

### 2.4 — Đoán thẳng phương trình

Feynman nêu Dirac làm ví dụ mẫu, ở bài giảng #2:

> "Dirac discovered the correct laws of quantum mechanics — for relativity quantum mechanics — simply by **guessing the equation**. The method of guessing the equation seems to be a pretty effective way of guessing new laws."

Nhưng Dirac không đoán bừa. Ràng buộc ông tự đặt: phương trình phải bậc nhất theo $\partial/\partial t$ (để xác suất dương), phải bất biến Lorentz, và bình phương lên phải cho ra phương trình Klein–Gordon. Ba ràng buộc đó gần như quyết định câu trả lời — và nó kéo theo **spin** và **phản vật chất** như hệ quả không mời mà đến.

## 3. Nguồn không đáng tin

| Nguồn | Feynman nói gì |
|---|---|
| **Trực giác triết học** | *"All intuitions about what nature's going to do philosophically fail — it never works."* |
| **Vẻ đẹp** | Hữu ích để đoán, vô dụng để phán quyết. Xem [[Simplicity and Beauty in Physics]] |
| **Mô hình cơ học** | Giúp trực giác, nhưng khám phá lớn thường trừu tượng hoá khỏi chúng. Xem [[Why Mechanism Models Fail]] |
| **Uy tín người đoán** | *"It doesn't make any difference... who made the guess, or what his name is."* |

## 4. Cạm bẫy

> [!warning] Đoán mà không sinh ra tiên đoán mới
> Ràng buộc thật sự không phải "khớp dữ liệu cũ" — mọi lý thuyết đang cạnh tranh đều khớp. Ràng buộc thật là **tiên đoán khác đi ở đâu đó kiểm được**. Nếu phỏng đoán của bạn không phân biệt được với lý thuyết hiện hành ở bất kỳ thí nghiệm nào, nó chưa phải một phỏng đoán khoa học.

- **Thêm tham số tự do để khớp.** Với đủ tham số, mọi thứ đều khớp. Von Neumann: *"With four parameters I can fit an elephant."*
- **Bỏ qua giới hạn cổ điển.** Một lý thuyết lượng tử không cho lại Newton ở thang lớn thì đã sai trước khi kiểm.
- **Nhầm loại suy với chứng minh.** Feynman loại suy từ photon sang graviton và tới được phương trình Einstein — rồi tắc. Loại suy là bước một.
- **Đoán mà không tính.** Xem [[Seeking New Laws]] bước 2.

## 5. Checklist áp dụng

- [ ] Phỏng đoán của tôi có tôn trọng mọi ràng buộc ở mục 1 không?
- [ ] Nó cho lại lý thuyết cũ ở giới hạn thích hợp chứ?
- [ ] Nó tiên đoán **khác** ở đâu, và khác bao nhiêu?
- [ ] Tôi có đang thêm tham số tự do để khớp không?
- [ ] Tôi biết mình đang dùng nguồn phỏng đoán nào trong bốn nguồn ở mục 2?

## Tham khảo

- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 7
- [Messenger Lecture #7](https://www.feynmanlectures.caltech.edu/fml.html#7) và [#2](https://www.feynmanlectures.caltech.edu/fml.html#2)
- Dirac, "The Quantum Theory of the Electron", *Proc. Roy. Soc. A* 117 (1928)
- Feynman, *Lectures on Gravitation* (Addison Wesley, 1995) — cách tiếp cận spin-2 đầy đủ. ISBN 0-201-62734-5
- Weinberg, *The Quantum Theory of Fields*, Vol I, Chương 2–5 — ràng buộc đối xứng làm việc thế nào

## Liên kết

[[Seeking New Laws]] · [[Why Wrong Theories Are Rejected]] · [[Symmetry and Conservation Laws]] · [[Quantum Gravity]] · [[Path Integral Formulation]] · [[Why Mechanism Models Fail]] · [[Physics]]
