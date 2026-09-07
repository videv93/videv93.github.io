---
tags: [physics, symmetry, conservation, noether]
status: evergreen
---
# Symmetry and Conservation Laws

> **Định lý Noether**: mỗi đối xứng liên tục của định luật vật lý sinh ra một đại lượng bảo toàn. Đây là câu trả lời cho câu hỏi Feynman đặt ra nhưng không trả lời được trong bài giảng #2 — *vì sao* một số định lý sống sót lâu hơn chứng minh của chúng.

## 1. Bảng đối chiếu

| Đối xứng của định luật | Diễn giải | Đại lượng bảo toàn |
|---|---|---|
| Tịnh tiến không gian | Dời chỗ thí nghiệm không đổi kết quả | [[Conservation of Momentum]] |
| Tịnh tiến thời gian | Làm thí nghiệm hôm nay hay mai đều thế | [[Conservation of Energy]] |
| Quay | Xoay hướng thí nghiệm không đổi kết quả | [[Conservation of Angular Momentum]] |
| Boost Lorentz | Quan sát từ hệ chuyển động đều | Chuyển động khối tâm |
| Pha U(1) toàn cục | Đổi pha hàm sóng đồng loạt | **Điện tích** |
| Gauge SU(3) | Đối xứng màu | Điện tích màu (QCD) |

Ba dòng đầu là ba đối xứng của **không-thời gian**. Ba dòng cuối là đối xứng **nội tại** — không liên quan gì tới hình học, và chúng là nền của toàn bộ Mô hình Chuẩn.

## 2. Vì sao đây là câu trả lời cho câu hỏi của Feynman

Trong bài giảng #2, Feynman kể một chuyện ông thấy khó hiểu:

> "We can deduce, from one part of physics like the law of gravitation, a principle which turns out to be much more valid than the derivation! **This doesn't happen in mathematics.**"

Ông chứng minh bảo toàn mômen động lượng *từ* định luật hấp dẫn. Rồi cơ học lượng tử tới, xoá sổ lực và quỹ đạo — và định luật bảo toàn vẫn đứng, chính xác.

Định lý Noether giải thích: **định luật bảo toàn không đến từ hấp dẫn.** Nó đến từ tính đẳng hướng của không gian. Hấp dẫn chỉ là một trong vô số lý thuyết *tình cờ* cũng tôn trọng đối xứng đó.

> [!note] Cách dùng thực tế của kết luận này
> Khi bạn có một kết quả, hãy hỏi: *nó bám vào cơ chế hay bám vào đối xứng?*
> - Bám cơ chế → sẽ chết khi cơ chế bị thay.
> - Bám đối xứng → sống sót qua cách mạng.
> Đây là phiên bản chính xác của [[Theorems Beyond Their Derivation]].

## 3. Chiều ngược lại: dùng bảo toàn để tìm đối xứng

Định lý đi được hai chiều, và chiều ngược mới là chiều dùng trong nghiên cứu hiện đại:

**Thấy một đại lượng bảo toàn ⟹ đi tìm đối xứng sinh ra nó.**

- Điện tích bảo toàn → phải có đối xứng pha → dẫn tới điện động lực học gauge.
- Số baryon *gần như* bảo toàn → có đối xứng gần đúng nào đó → và nếu nó chỉ gần đúng thì proton phải phân rã (chưa quan sát được).
- Ngược lại: **parity không bảo toàn** → không có đối xứng gương → dẫn thẳng tới cấu trúc V−A của tương tác yếu. Xem [[Parity Violation]] và [[V-A Theory of Weak Interaction]].

Đây là cách vật lý hạt hiện đại được xây: **đoán đối xứng trước, suy ra động lực học sau.** Xem [[How to Guess a New Law]].

## 4. Emmy Noether

Chứng minh công bố năm 1918, ở Göttingen, theo yêu cầu của Hilbert và Klein — họ đang vướng một nghịch lý về bảo toàn năng lượng trong thuyết tương đối rộng của Einstein. Noether giải quyết nó và đồng thời cho ra một trong những định lý tổng quát nhất của vật lý lý thuyết.

Bà bị từ chối vị trí giảng dạy chính thức tại Göttingen vì là phụ nữ; Hilbert phải cho bà giảng dưới tên ông. Einstein viết về bà, sau khi bà mất năm 1935:

> "the most significant creative mathematical genius thus far produced since the higher education of women began."

> [!warning] Định lý cần đối xứng **liên tục**
> Đối xứng rời rạc (phản xạ gương P, đảo thời gian T, liên hợp điện tích C) **không** sinh ra đại lượng bảo toàn theo định lý Noether. Chúng cho quy tắc chọn lọc (selection rules) trong cơ học lượng tử, không cho đại lượng bảo toàn liên tục. Đây là điểm kỹ thuật quan trọng và hay bị nói sai.

## 5. Cạm bẫy

- **Áp dụng cho đối xứng rời rạc.** Xem callout trên.
- **Quên đối xứng phải là của **định luật**, không phải của **trạng thái**.** Từ tính phá vỡ đối xứng quay ở trạng thái, nhưng định luật vẫn đối xứng — và mômen động lượng vẫn bảo toàn. Xem [[Symmetry in Physical Law]] mục 3.
- **Tưởng mọi đại lượng bảo toàn đều có đối xứng tương ứng đã biết.** Một số (như số baryon trong Mô hình Chuẩn) là đối xứng "ngẫu nhiên" — hệ quả tình cờ của cấu trúc lý thuyết, không phải nguyên lý được đặt vào.
- **Dùng ở nơi đối xứng không có.** Vũ trụ giãn nở không có đối xứng tịnh tiến thời gian → không có bảo toàn năng lượng toàn cục. Xem [[Conservation of Energy]] mục 3.

## 6. Checklist áp dụng

- [ ] Với mỗi đại lượng bảo toàn trong bài toán: tôi chỉ ra được đối xứng sinh ra nó?
- [ ] Đối xứng đó liên tục hay rời rạc?
- [ ] Đó là đối xứng của định luật hay của trạng thái?
- [ ] Nếu một đại lượng **không** bảo toàn, đối xứng nào đã bị phá?
- [ ] Kết quả tôi đang dùng bám vào cơ chế hay bám vào đối xứng?

## Tham khảo

- Noether, "Invariante Variationsprobleme", *Nachr. d. König. Gesellsch. d. Wiss. zu Göttingen* (1918) — bài gốc
- [The Feynman Lectures, Vol I Ch. 52 — Symmetry in Physical Laws](https://www.feynmanlectures.caltech.edu/I_52.html)
- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 4
- Wigner, "Symmetry and Conservation Laws", *PNAS* 51 (1964)
- Byers, "E. Noether's Discovery of the Deep Connection Between Symmetries and Conservation Laws", arXiv:physics/9807044

## Liên kết

[[Symmetry in Physical Law]] · [[The Great Conservation Principles]] · [[Conservation of Energy]] · [[Conservation of Momentum]] · [[Conservation of Angular Momentum]] · [[Theorems Beyond Their Derivation]] · [[Parity Violation]] · [[Physics]]
