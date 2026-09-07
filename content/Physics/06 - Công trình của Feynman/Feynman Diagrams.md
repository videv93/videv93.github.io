---
tags: [physics, qed, feynman, tools]
status: evergreen
---
# Feynman Diagrams

> Cách biểu diễn bằng hình vẽ cho các biểu thức toán học mô tả hành vi hạt hạ nguyên tử. Công cụ nhận diện được nhiều nhất trong vật lý thế kỷ 20 — và là đối tượng của một phê bình có nội dung từ chính người đồng giải Nobel với Feynman.

Seed mô tả gọn: *"Feynman developed a pictorial representation scheme for the mathematical expressions describing the behavior of subatomic particles, which later became known as Feynman diagrams and remains widely used."*

## 1. Cách đọc một giản đồ

| Yếu tố | Nghĩa |
|---|---|
| Trục | Thường: thời gian theo một chiều, không gian theo chiều kia |
| **Đường thẳng** (fermion) | Electron, quark... — có mũi tên chỉ chiều dòng hạt |
| **Đường lượn sóng** | Photon |
| **Đỉnh** (vertex) | Nơi các đường gặp nhau — một tương tác. Mỗi đỉnh đóng góp hệ số $\sqrt{\alpha}$ |
| **Đường ngoài** | Hạt thật, đo được |
| **Đường trong** | Hạt **ảo** — không đo được, không thoả mãn $E^2 = p^2c^2 + m^2c^4$ |
| **Vòng lặp** (loop) | Bậc cao hơn trong khai triển nhiễu loạn; nguồn của các tích phân cần [[Renormalization]] |

**Mỗi giản đồ tương ứng chính xác với một biểu thức toán học.** Đây là điểm cốt lõi: giản đồ không phải minh hoạ, nó là **ký hiệu**. Có quy tắc dịch xuôi (giản đồ → tích phân) hoàn toàn máy móc.

Ví dụ trong seed: *"Feynman diagram of electron/positron annihilation"* — electron gặp positron, huỷ nhau, sinh ra bức xạ gamma.

## 2. Vì sao chúng thắng thế

Seed kể diễn biến: tại Pocono 1948, giản đồ khiến cả hội trường bối rối, Dirac–Teller–Bohr đều phản đối. Nhưng:

> "Students learned and used the powerful new tool that Feynman had created. **Computer programs were later written to evaluate Feynman diagrams**, enabling physicists to use quantum field theory to make high-precision predictions."

Ba lý do cụ thể:

1. **Chúng biến kế toán thành hình học.** Ở bậc cao, số hạng cần cộng lên tới hàng nghìn. Giản đồ cho phép **liệt kê có hệ thống**: vẽ mọi hình có thể với số đỉnh cho trước.
2. **Chúng dạy được.** Sinh viên năm nhất cao học học được quy tắc trong vài tuần. Hình thức luận của Schwinger thì không.
3. **Chúng tự động hoá được.** Vì quy tắc dịch là máy móc, máy tính làm được. Đây là điều quyết định ở kỷ nguyên tính toán chính xác cao.

Điểm 3 là ví dụ mẫu về giá trị của **ký hiệu tốt** — cùng luận điểm Feynman nêu ở [[Equal Areas from a Central Force]]: ký hiệu tốt cho phép người ta *"be quite more stupid"* mà vẫn làm được việc.

## 3. Phê bình của Schwinger

Seed ghi lại nguyên văn:

> "To Schwinger, however, the Feynman diagram was **'pedagogy, not physics'**."

Đây không phải sự cay cú. Nội dung phê bình:

- Giản đồ gợi ý một **câu chuyện thời gian** (hạt này đi tới đó, phát ra photon, rồi...) mà lý thuyết **không** khẳng định.
- Hạt ảo trong đường trong không tồn tại theo nghĩa hạt thật. Chúng là số hạng trong một khai triển toán học.
- Giản đồ gắn chặt với **lý thuyết nhiễu loạn**. Với hiện tượng phi nhiễu loạn (giam cầm quark, phá vỡ đối xứng tự phát) chúng không dùng được.

> [!warning] Phê bình này đúng và đáng nhớ
> Giản đồ Feynman là **công cụ tính toán trong khai triển nhiễu loạn**, không phải bức ảnh chụp thứ đang xảy ra. Đọc chúng như một câu chuyện là cạm bẫy trung tâm.

## 4. Positron là electron đi lùi thời gian

Ý tưởng từ luận án Princeton, và nó cho giản đồ tính kinh tế đặc biệt.

Seed ghi: *"A key insight was that positrons behaved like electrons moving backwards in time."*

**Nghĩa kỹ thuật:** propagator (Feynman propagator, giới thiệu trong bài "The Theory of Positrons" 1949) xử lý nghiệm năng lượng âm truyền lùi thời gian *giống hệt* phản hạt truyền xuôi thời gian. Điều này cho phép **một** đường duy nhất trong giản đồ mô tả cả electron lẫn positron — chỉ khác chiều mũi tên.

**Nghĩa nó KHÔNG có:** đây không phải tuyên bố rằng positron thực sự du hành ngược thời gian. Đó là một phát biểu về dạng toán học của propagator.

## 5. Cạm bẫy

- **Đọc giản đồ như phim.** Xem callout mục 3. Không có "trình tự sự kiện" — ta cộng biên độ trên mọi giản đồ, và không có giản đồ nào "thực sự xảy ra". Điều này song song hoàn toàn với [[The Double Slit Experiment]] và [[Path Integral Formulation]].
- **Tưởng hạt ảo là hạt thật chưa quan sát được.** Chúng không thoả mãn hệ thức năng lượng–động lượng. Chúng tồn tại được nhờ $\Delta E \Delta t \ge \hbar/2$ — xem [[The Uncertainty Principle]].
- **Dùng khi lý thuyết nhiễu loạn không hợp lệ.** Trong QCD ở năng lượng thấp, hằng số ghép lớn, khai triển không hội tụ, giản đồ vô dụng.
- **Quên rằng số giản đồ bùng nổ.** Ở bậc cao, số giản đồ tăng nhanh hơn hàm giai thừa. Đó là lý do chuỗi nhiễu loạn QED là chuỗi **tiệm cận**, không hội tụ. Xem [[Renormalization]] mục 4.
- **Coi đây là phát minh riêng lẻ.** Chúng chỉ dùng được nhờ Dyson chứng minh tính tương đương và bổ sung quy tắc tái chuẩn hoá.

## 6. Checklist áp dụng

- [ ] Tôi đọc được một giản đồ đơn giản và nói được mỗi đường, mỗi đỉnh là gì?
- [ ] Tôi phân biệt được đường ngoài (hạt thật) và đường trong (hạt ảo)?
- [ ] Tôi giải thích được vì sao "đọc giản đồ như một câu chuyện" là sai?
- [ ] Tôi nêu được nội dung phê bình của Schwinger, không chỉ trích dẫn nó?
- [ ] Tôi biết khi nào giản đồ Feynman **không** dùng được?

## Tham khảo

- Feynman, "Space-Time Approach to Quantum Electrodynamics", *Phys. Rev.* 76 (1949) 769 — bài giới thiệu giản đồ
- Feynman, "The Theory of Positrons", *Phys. Rev.* 76 (1949) 749 — Feynman propagator
- Feynman, *QED: The Strange Theory of Light and Matter* (Princeton UP, 1985) — giải thích cho công chúng
- Kaiser, *Drawing Theories Apart: The Dispersion of Feynman Diagrams in Postwar Physics* (Chicago UP, 2005) — **lịch sử xã hội học đầy đủ nhất về cách chúng lan rộng**
- Peskin & Schroeder, *An Introduction to Quantum Field Theory*, Chương 4

## Liên kết

[[Quantum Electrodynamics]] · [[Renormalization]] · [[Path Integral Formulation]] · [[The Uncertainty Principle]] · [[The Double Slit Experiment]] · [[The Arrow of Time]] · [[Physics]]
