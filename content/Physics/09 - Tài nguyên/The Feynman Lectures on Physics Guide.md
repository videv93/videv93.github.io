---
tags: [physics, resources, textbook]
status: evergreen
---
# The Feynman Lectures on Physics Guide

> Bản đồ ba tập, và lời khuyên đọc chương nào trước. Đọc kèm [[The Feynman Lectures Experiment]] — bộ sách này **không** phải giáo trình nhập môn, dù nó được viết để làm giáo trình nhập môn.

Bản HTML miễn phí: [feynmanlectures.caltech.edu](https://www.feynmanlectures.caltech.edu/)

## 1. Ba tập

| Tập | Nội dung | Số chương |
|---|---|---|
| **I** | Chủ yếu cơ học, bức xạ, nhiệt | 52 |
| **II** | Chủ yếu điện từ học và vật chất | 42 |
| **III** | Cơ học lượng tử | 21 |
| **Tips** | *Feynman's Tips on Physics* — phụ lục giải bài tập (2005) | 4 bài giảng + bài tập |

*Tips* do Michael Gottlieb và Ralph Leighton biên soạn với hỗ trợ của Kip Thorne, gồm bốn bài giảng chưa từng công bố về **cách giải bài tập**, cùng bài tập của Robert Leighton và Rochus Vogt và một tiểu luận lịch sử của Matthew Sands.

## 2. Các chương quan trọng nhất — và note tương ứng

Đây là bảng dùng nhiều nhất trong note này. Mỗi dòng nối một chương với note trong vault.

### Tập I

| Chương | Chủ đề | Note |
|---|---|---|
| **I-1** | Atoms in Motion | [[The Unfinished Structure of Physics]] |
| **I-4** | Conservation of Energy | [[Conservation of Energy]] — **ẩn dụ 28 khối gỗ** |
| **I-7** | The Theory of Gravitation | Cả thư mục `01 - Hấp dẫn` |
| **I-9** | Newton's Laws of Dynamics | [[Inertia and Force]] |
| **I-10** | Conservation of Momentum | [[Conservation of Momentum]] |
| **I-18, I-20** | Rotation; Angular momentum | [[Conservation of Angular Momentum]] |
| **I-22** | Algebra | [[Mathematics as Language and Reasoning]] |
| **I-44** | The Laws of Thermodynamics | [[Entropy and the Second Law]] |
| **I-46** | **Ratchet and Pawl** | [[Entropy and the Second Law]], [[The Arrow of Time]] |
| **I-52** | Symmetry in Physical Laws | [[Symmetry in Physical Law]], [[Parity Violation]] |

### Tập II

| Chương | Chủ đề | Note |
|---|---|---|
| **II-19** | **The Principle of Least Action** | [[Three Equivalent Formulations]] — *chương hay nhất Feynman từng viết về chủ đề này* |
| **II-27** | Field Energy and Field Momentum | [[Conservation of Momentum]] |
| **II-42** | Curved Space | [[Equivalence Principle]] |

### Tập III

| Chương | Chủ đề | Note |
|---|---|---|
| **III-1** | **Quantum Behavior** | [[The Double Slit Experiment]] — *"the only mystery"* |
| **III-2** | Wave and Particle Viewpoints | [[The Uncertainty Principle]] |
| **III-21** | Schrödinger Equation in a Classical Context | [[Superfluidity of Helium]] |

## 3. Ba chương nên đọc trước tiên

Nếu chỉ có thời gian cho ba chương:

1. **I-1, Atoms in Motion** — chứa câu nổi tiếng: nếu chỉ được truyền lại một câu cho thế hệ sau, ông chọn *"all things are made of atoms — little particles that move around in perpetual motion, attracting each other when they are a little distance apart, but repelling upon being squeezed into one another."* Chương này cho thấy toàn bộ triết lý dạy học của ông.
2. **II-19, The Principle of Least Action** — Feynman tự nói đây là bài giảng ông thích nhất. Nó nối [[Three Equivalent Formulations]] với [[Path Integral Formulation]].
3. **III-1, Quantum Behavior** — cách vào cơ học lượng tử không giống bất kỳ sách nào khác.

## 4. Cách đọc bộ này cho đúng

| Bạn là | Cách dùng |
|---|---|
| Học vật lý lần đầu | ❌ **Không** dùng làm giáo trình chính. Dùng Halliday–Resnick hoặc Young–Freedman làm chính, đọc Feynman song song để lấy trực giác |
| Đã học, muốn hiểu lại | ✅ Đối tượng lý tưởng. Đọc theo chương rời, không theo thứ tự |
| Muốn dạy | Lấy ẩn dụ và cách vào đề, đừng copy cấu trúc |
| Cần bài tập | Dùng *Feynman's Tips on Physics* |

> [!warning] Điểm yếu lớn nhất: thiếu bài tập
> Đây là lý do nó không được các trường dùng làm giáo trình, dù nội dung xuất sắc. Xem [[Mathematics as Language and Reasoning]]: toán là ngôn ngữ **cộng suy luận**, và phần suy luận chỉ luyện được bằng cách làm. Đọc Feynman mà không làm bài tập ở đâu đó là học một nửa.

## 5. Tính năng của bản HTML

- **LaTeX qua MathJax** — phương trình phóng to không vỡ; click chuột phải vào phương trình để xem tuỳ chọn trợ năng.
- **Hình SVG** — phóng to không mất nét (trình duyệt cũ nhận hình PNG thay thế).
- **Bản ghi âm nhúng** — 122 bản ghi 1961–64 phát được ngay trong chương tương ứng.
- **Link ảnh lớp học** — đặt gần tiêu đề mỗi chương.
- **"Restore my view"** — quay lại đúng chỗ đọc/nghe dở. Đánh dấu [feynmanlectures.caltech.edu#restore](https://www.feynmanlectures.caltech.edu/#restore). Cần LocalStorage bật, và chỉ hoạt động sau khi đã mở rồi đóng một chương.

## 6. Checklist áp dụng

- [ ] Tôi biết mình thuộc đối tượng nào ở bảng mục 4?
- [ ] Nếu đang học lần đầu, tôi có nguồn bài tập riêng chưa?
- [ ] Tôi đã đọc I-1, II-19, III-1 chưa?
- [ ] Tôi đã đánh dấu link `#restore` chưa?
- [ ] Khi tra một khái niệm, tôi dùng được bảng ở mục 2 để tìm đúng chương?

## Tham khảo

- [The Feynman Lectures on Physics — bản HTML miễn phí](https://www.feynmanlectures.caltech.edu/)
- Feynman, Leighton & Sands, *The Feynman Lectures on Physics: The Definitive and Extended Edition* (Addison Wesley, 2005). ISBN 0-8053-9045-6
- Gottlieb & Leighton, *Feynman's Tips on Physics: A Problem-Solving Supplement* (2005)
- [Feynman's Preface](https://www.feynmanlectures.caltech.edu/I_toc.html) — **đọc trước tiên**; ông tự đánh giá bộ sách
- Goodstein & Neugebauer, "Special Preface" (ấn bản 1989)

## Liên kết

[[Learning Resources]] · [[Messenger Lectures Guide]] · [[The Feynman Lectures Experiment]] · [[Study Roadmap]] · [[Feynman Bibliography]] · [[Physics]]
