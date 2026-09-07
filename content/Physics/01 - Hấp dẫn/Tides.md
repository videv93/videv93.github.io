---
tags: [physics, gravitation, application]
status: evergreen
---
# Tides

> Feynman chọn thuỷ triều làm ví dụ vì nó cho thấy một **lời giải thích nghe hợp lý vẫn có thể sai** — và cách phát hiện ra điều đó là đếm: hai lần triều mỗi ngày, không phải một.

## 1. Ba lời giải thích, hai cái sai

| Giải thích | Cơ chế | Tiên đoán | Kết quả |
|---|---|---|---|
| **A** — Mặt Trăng hút nước lên | Nước phía dưới Mặt Trăng bị kéo lồi lên | **1** lần triều/ngày | ❌ Sai |
| **B** — Mặt Trăng kéo Trái Đất khỏi nước | Đất bị kéo đi, nước ở lại | **1** lần triều/ngày (phía đối diện) | ❌ Sai |
| **C** — Newton: **chênh lệch** lực | Nước gần bị hút mạnh hơn đất; nước xa bị hút yếu hơn đất | **2** lần triều/ngày | ✅ Đúng |

Feynman kể chuyện này như một bài học về phương pháp: A và B đều là những giả thuyết nghiêm túc, từng có người tin. Cả hai chết vì **cùng một dữ liệu đơn giản mà ai cũng biết** — thuỷ triều lên xuống khoảng 12 tiếng một lần.

## 2. Cơ chế đúng

Điểm mấu chốt: lực hấp dẫn của Mặt Trăng **không đồng đều trên Trái Đất**, vì nó phụ thuộc khoảng cách.

- Nước ở phía **gần** Mặt Trăng: gần hơn tâm Trái Đất → bị hút **mạnh hơn** trung bình → trồi về phía Mặt Trăng.
- Nước ở phía **xa**: xa hơn tâm Trái Đất → bị hút **yếu hơn** trung bình → bị "bỏ lại" → trồi ra phía đối diện.
- Kết quả: **hai** bướu nước, ở hai phía đối diện. Trái Đất quay dưới hai bướu đó → mỗi điểm gặp triều cao hai lần một ngày.

> Feynman diễn đạt vế thứ hai bằng ngôn ngữ hệ quay: *"this water is thrown off by centrifugal force more than the earth is, and this water's attracted more than this average of the earth."*
> ⚠️ Ông đang mô tả trong hệ quy chiếu quay quanh khối tâm Trái Đất–Mặt Trăng. Trong hệ quán tính thì không có "lực ly tâm" — chỉ có chênh lệch lực hút. Xem [[Inertia and Force]].

Chi tiết Feynman thêm vào, hay bị bỏ sót: **Trái Đất cũng quay quanh một tâm chung** với Mặt Trăng, và tâm đó nằm *bên trong* Trái Đất (cách tâm ~4.700 km). Không phải Mặt Trăng quay quanh Trái Đất đứng yên.

## 3. Cùng cơ chế, các hệ quả khác

Feynman liệt kê một loạt hệ quả "bỗng nhiên rõ ràng" sau khi có định luật hấp dẫn:

- **Vì sao Trái Đất tròn** — mọi thứ bị kéo vào tâm.
- **Vì sao nó *không* tròn hẳn** — nó quay, phần xích đạo bị đẩy ra một chút, và cân bằng ở hình cầu dẹt.
- **Vì sao Mặt Trời và Mặt Trăng tròn** — cùng lý do.

> [!note] Lực triều là ý tưởng có tầm xa hơn thuỷ triều nhiều
> Cùng cơ chế chênh lệch lực giải thích: vành đai Saturn (giới hạn Roche), núi lửa trên Io, khoá thuỷ triều của Mặt Trăng (luôn quay một mặt về Trái Đất), và spaghettification gần lỗ đen. Đây là ví dụ mẫu của [[Theorems Beyond Their Derivation]].

## 4. Cạm bẫy

> [!warning] "Mặt Trăng hút nước lên"
> Đây là giải thích A ở mục 1 — nó **sai**, và nó là giải thích phổ biến nhất trong sách phổ thông. Phép kiểm để tự bắt lỗi mình: nếu đúng thì phải có mấy lần triều mỗi ngày?

- **Quên Mặt Trời.** Mặt Trời cũng gây triều, khoảng 46% cường độ triều Mặt Trăng. Khi hai thứ thẳng hàng → triều cường (spring tide); vuông góc → triều kém (neap tide).
- **Tưởng Mặt Trời gây triều mạnh hơn vì nó nặng hơn nhiều.** Lực hút của Mặt Trời lên Trái Đất mạnh hơn Mặt Trăng ~178 lần, nhưng lực **triều** ∝ $M/r^3$ chứ không phải $M/r^2$ — và Mặt Trời quá xa. Đây là chỗ hay sai nhất.
- **Tưởng triều là hiện tượng thuần thiên văn.** Thời điểm và độ cao triều thực tế phụ thuộc rất mạnh vào hình dạng bờ biển, độ sâu, cộng hưởng vịnh. Vịnh Fundy có triều 16 m; Địa Trung Hải gần như không có.
- **Bỏ qua rằng đây là ứng dụng hiếm hoi.** Feynman nói thẳng hấp dẫn *atypical* vì ít ứng dụng thực tiễn; ông chỉ liệt kê được: thăm dò địa vật lý, dự báo triều, tính quỹ đạo vệ tinh — và, mỉa mai, cung cấp số liệu cho các nhà chiêm tinh in tử vi.

## 5. Checklist áp dụng

- [ ] Tôi giải thích được vì sao có **hai** bướu nước chứ không phải một?
- [ ] Tôi nói rõ được mình đang mô tả trong hệ quy chiếu nào khi dùng từ "ly tâm"?
- [ ] Tôi biết lực triều ∝ $1/r^3$ chứ không phải $1/r^2$, và giải thích được tại sao?
- [ ] Tôi tính được tỉ số lực triều Mặt Trời/Mặt Trăng và ra ~0,46?
- [ ] Khi gặp một lời giải thích nghe hợp lý, tôi có tìm một con số đếm được để kiểm nó không?

## Tham khảo

- [Messenger Lecture #1](https://www.feynmanlectures.caltech.edu/fml.html#1)
- [The Feynman Lectures, Vol I Ch. 7-4 — Newton's law of gravitation](https://www.feynmanlectures.caltech.edu/I_07.html)
- Newton, *Principia* (1687), Book III, Propositions 24–37
- [NOAA — Tides and Water Levels tutorial](https://oceanservice.noaa.gov/education/tutorial_tides/) — phần hải dương học mà Newton không cover

## Liên kết

[[Newton's Law of Gravitation]] · [[Inertia and Force]] · [[Theorems Beyond Their Derivation]] · [[Why Wrong Theories Are Rejected]] · [[Physics]]
