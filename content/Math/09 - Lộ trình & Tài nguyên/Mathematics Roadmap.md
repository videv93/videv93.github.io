---
tags: [math, roadmap, resources]
type: catalogue
status: evergreen
---
# Mathematics Roadmap

> Chép lại `mathematics-roadmap.jpg` từ seed sang dạng văn bản tra cứu được. Đây là một **đồ thị phụ thuộc** ~40 môn toán, mỗi nút kèm 2–9 sách gợi ý. Giá trị của nó không nằm ở danh sách sách mà ở các **mũi tên**: cái gì phải học trước cái gì.

> [!note] Ghi chú nguồn
> Ảnh trong seed không có chú thích, không có nguồn ghi kèm. Nó dùng ba màu: **Essential** (xanh), **Optional but Recommended** (tím), **Optional** (vàng), với mũi tên một chiều = phụ thuộc và mũi tên hai chiều = liên hệ qua lại. Note này giữ nguyên cấu trúc đó. Sách được liệt kê theo đúng ảnh, không thêm không bớt.

## 1. Hai điểm xuất phát

Sơ đồ có **hai** nút *Start*:

| Đường vào | Đi tới | Màu |
|---|---|---|
| Đường toán | **Precalculus** → Calculus | Essential |
| Đường triết | **Introduction to Philosophy** → Introduction to Logic | Optional but Recommended |

Hai đường gặp nhau ở nhánh logic/set theory. Việc sơ đồ đặt triết học làm một điểm xuất phát ngang hàng là một lựa chọn có chủ ý — nó coi *"toán là gì"* là câu hỏi phải hỏi sớm, không phải hỏi sau.

## 2. Trục chính — bốn tầng

```
Precalculus
   ↓
Calculus  ←→  Problem Solving
   ↓
   ├─→ Introduction to Linear Algebra ─→ Advanced Linear Algebra
   ├─→ Introduction to Differential Equations ─→ Introduction to PDE
   └─→ Naive Set Theory, Mathematical Reasoning, Proofs, Discrete Mathematics   ★ NÚT CHẶN
          ↓
          ├─→ Introduction to Number Theory
          ├─→ Introduction to Real Analysis ─→ Mathematical Analysis ─→ Advanced Mathematical Analysis
          ├─→ Introduction to Combinatorics
          ├─→ Introduction to Numerical Analysis
          ├─→ Introduction to Abstract Algebra ─→ Advanced Abstract Algebra
          ├─→ Introduction to General Topology ─→ Algebraic Topology
          ├─→ Euclidean and Non-Euclidean Geometry
          └─→ Introduction to Axiomatic Set Theory ─→ Mathematical Logic & Model Theory ─→ Theory of Computation
```

> [!note] Nút chặn của cả sơ đồ
> **Naive Set Theory, Mathematical Reasoning, Proofs, and Discrete Mathematics** là nút có nhiều mũi tên đi ra nhất. Gần như mọi nhánh "toán thật" đều đi qua nó. Đây là nội dung của thư mục `00 - Nền tảng & Chứng minh` trong vault này — và là thứ mà seed calculus (*"Calculus 1 in one video"*) bỏ qua hoàn toàn. Xem [[Computational vs Rigorous Mathematics]].

## 3. Nhánh giải tích và ứng dụng

```
Introduction to Real Analysis
   ├─→ Introduction to Complex Analysis
   ├─→ Mathematical Analysis ─→ Introduction to Functional Analysis
   │                        └─→ Introduction to Differential Geometry ─→ Advanced Differential Geometry
   ├─→ Introduction to Optimization Theory ─→ Convex Optimization
   └─→ Introduction to Probability Theory
          ├─→ Introduction to Mathematical Statistics ─→ Advanced Mathematical Statistics
          ├─→ Advanced Probability Theory ─→ Stochastic Calculus
          ├─→ Time Series Analysis
          └─→ Introduction to Game Theory
```

Nhánh này là nhánh mà [[Quant]], [[ML]] và [[Prob&Stats]] trong vault đang đứng trên. Xem [[Math for Quant and ML]] để biết mỗi area cắt vào đâu.

## 4. Danh mục sách theo nút

**Precalculus** — Redlin/Stewart/Watson *Precalculus: Mathematics for Calculus* · Sullivan *Precalculus*

**Calculus** — Stewart *Calculus: Early Transcendentals* · Strogatz *Infinite Powers* · Thomas *Thomas' Calculus*

**Problem Solving** — Polya *How to Solve It* · Tao *Solving Mathematical Problems* · Wickelgren *How to Solve Mathematical Problems* · Polya *Mathematical Discovery*

**Introduction to Linear Algebra** — Anton & Rorres *Elementary Linear Algebra* · Strang *Introduction to Linear Algebra* · Lay/Lay/McDonald *Linear Algebra and Its Applications*

**Advanced Linear Algebra** — Axler *Linear Algebra Done Right* · Lang *Algebra* · Halmos *Finite-Dimensional Vector Spaces* · Treil *Linear Algebra Done Wrong* · Shilov & Silverman *Linear Algebra*

**Differential Equations** — Boyce & DiPrima · Zill · Nagle/Saff/Snider

**Partial Differential Equations** — Farlow · Myint-U & Debnath · Strauss · Pinsky

**Proofs & Discrete Math** — Velleman *How to Prove It* · Roberts *Introduction to Mathematical Proofs* · Hammack *Book of Proof* · Bloch *Proofs and Fundamentals* · Epp · Rosen · Scheinerman *Mathematics: A Discrete Introduction*

**Real Analysis** — Bartle & Sherbert · Trench · Alcock *How to Think About Analysis* · Pedersen *From Calculus to Analysis* · Kane *Writing Proofs in Analysis*

**Mathematical Analysis** — Rudin *Principles of Mathematical Analysis* · Bartle *The Elements of Real Analysis* · Apostol · Goldberg *Methods of Real Analysis* · Edwards · Shurman

**Abstract Algebra** — Gallian *Contemporary Abstract Algebra* · Artin *Algebra* · Goodman *Algebra: Abstract and Concrete* · Rotman *A First Course in Abstract Algebra*

**Advanced Abstract Algebra** — Hungerford · Dummit & Foote · Rotman *Advanced Modern Algebra* · Isaacs · Cohn · Vinberg · Lang · Aluffi *Algebra: Chapter 0* · Atiyah & MacDonald *Introduction to Commutative Algebra*

**General Topology** — Willard · Croom *Principles of Topology* · Chinn & Steenrod *First Concepts of Topology* · Morris *Topology Without Tears* · Sutherland · Munkres · van Rooij & Buskes

**Complex Analysis** — Howie · Ablowitz & Fokas *Complex Variables* · Needham *Visual Complex Analysis* · Brown & Churchill · Zill

**Probability Theory** — Bertsekas & Tsitsiklis · Ross *A First Course in Probability* · Meester *A Natural Introduction to Probability* · Blitzstein & Hwang *Introduction to Probability*

**Mathematical Statistics** — Bain & Engelhardt · Larsen & Marx · Wackerly/Mendenhall/Scheaffer · Hogg/McKean/Craig · Dekking et al. · Devore & Berk

**Advanced Probability** — Rosenthal *A First Look at Rigorous Probability* · Pollard *A User's Guide to Measure Theoretic Probability* · Billingsley *Probability and Measure* · Shiryaev · Feller

**Stochastic Calculus** — Arguin *A First Course in Stochastic Calculus* · Klebaner · Särkkä & Solin *Applied Stochastic Differential Equations* · Grigoriu · Calin *An Informal Introduction* · Baldi

**Optimization / Convex** — Sundaram *A First Course in Optimization Theory* · Bertsimas & Tsitsiklis · Baldick · Gill/Murray/Wright · Chong & Zak · Bertsekas · Boyd & Vandenberghe *Convex Optimization* · Borwein & Lewis · Güler

**Numerical Analysis** — Sauer · Burden & Faires · Ascher & Greif · Epperson

**Category Theory** — Awodey · Riehl *Category Theory in Context* · Leinster *Basic Category Theory* · Smith *Category Theory: A Gentle Introduction* · Adámek/Herrlich/Strecker *Abstract and Concrete Categories*

**Set Theory (axiomatic)** — Goldrei *Classic Set Theory* · Enderton *Elements of Set Theory* · Hrbacek & Jech · Fraenkel/Bar-Hillel/Levy · O'Leary

**Mathematical Logic** — Chiswell & Hodges · Enderton · Hedman · Goldrei · Leary · Mendelson

**Theory of Computation** — Sipser · Enderton *Computability Theory* · Martin

## 5. Nhánh triết học

Sơ đồ dành hẳn một cột cho triết học, màu tím (*Optional but Recommended*):

| Nút | Sách |
|---|---|
| Introduction to Philosophy | Blackburn *Think* · Velasquez · Appiah *Thinking It Through* |
| Introduction to Logic | Howard-Snyder et al. *The Power of Logic* · Hurley *A Concise Introduction to Logic* |
| Philosophy of Language | Miller · Morris · Lycan · Daly |
| Philosophy of Mathematics and Logic | Brown · Beth · Frege *The Foundations of Arithmetic* · Russell · Tarski · Fisher · Etchemendy · McKeon · Haack |
| Philosophy of Probability and Statistics | Hacking *An Introduction to Probability and Inductive Logic* · Savage · Jaynes *Probability Theory: The Logic of Science* · Halpern · Howie · de Finetti · Bernardo |

## 6. Nhánh tuỳ chọn

| Nhánh | Màu | Sách |
|---|---|---|
| Introduction to Physics | Optional (vàng) | Serway & Jewett · Shipman/Wilson/Higgins · Knight |
| Introduction to Programming with Python | Optional (vàng) | Barry *Head First Python* · Hunt *A Beginners Guide to Python 3* · Downey *Think Python* |

Python được nối vào **Numerical Analysis** và **Discrete Mathematics** — sơ đồ coi lập trình là công cụ của toán tính toán, không phải điều kiện tiên quyết.

## 7. Đọc sơ đồ này thế nào

1. **Đừng đọc như một checklist.** Đây là ~40 môn, nhiều năm học toàn thời gian. Nó là bản đồ, không phải lịch trình.
2. **Chọn một đích, đi ngược mũi tên.** Muốn Stochastic Calculus? Đường tối thiểu: Calculus → Proofs → Real Analysis → Probability → Advanced Probability → Stochastic Calculus. Bốn nút, không phải bốn mươi.
3. **Mỗi nút chọn *một* sách.** Nhiều sách cho một nút là **lựa chọn thay thế**, không phải danh sách phải đọc hết. Ba cuốn cùng lúc = ba hệ ký hiệu = tốn công dịch hơn học ([[Reading Mathematics]] cạm bẫy 4).
4. **Đừng bỏ qua nút chặn.** Bỏ Proofs để nhảy thẳng vào Real Analysis là con đường thất bại phổ biến nhất.
5. **Sơ đồ này không có ngày tháng và không có nguồn.** Danh sách sách là ý kiến của ai đó, không phải chuẩn mực. Dùng nó làm điểm khởi đầu, kiểm chứng bằng syllabus thật của các trường.

## Liên kết
[[Learning Resources]] · [[Computational vs Rigorous Mathematics]] · [[Math for Quant and ML]] · [[Reading Mathematics]] · [[Proof Techniques]] · [[Math]]
