---
tags: [physics, symmetry, feynman, empty-header]
status: growing
---
# Symmetry in Physical Law

> [!note] Ghi chú nguồn
> Trong seed gốc, file `The Feynman Messenger Lectures Video Viewer.md` chứa tiêu đề *"Symmetry in Physical Law"* và dòng *"Transcript may not load until video starts playing."* — một **header rỗng**.
> Note này trả lời hứa đó, tổng hợp từ *The Character of Physical Law* Chương 4 (bản in của chính bài giảng này) và *The Feynman Lectures on Physics* Vol I Ch. 52. Video gốc: [Messenger Lecture #4](https://www.feynmanlectures.caltech.edu/fml.html#4).

> Bài giảng Messenger #4. Định nghĩa Feynman dùng, mượn từ Hermann Weyl: **một vật đối xứng nếu ta làm gì đó với nó mà sau đó nó trông y như trước.**

Áp dụng cho định luật thay vì cho vật: **một định luật đối xứng nếu ta thay đổi điều gì đó trong tình huống mà định luật vẫn đúng như cũ.**

## 1. Danh mục đối xứng

| Phép biến đổi | Định luật có bất biến không? | Đại lượng bảo toàn |
|---|---|---|
| **Tịnh tiến trong không gian** | ✅ | Động lượng |
| **Tịnh tiến trong thời gian** | ✅ | Năng lượng |
| **Quay** | ✅ | Mômen động lượng |
| **Chuyển động thẳng đều** (boost) | ✅ | Chuyển động khối tâm |
| **Phản xạ gương** (parity, P) | ❌ **Vi phạm ở tương tác yếu** | — |
| **Đảo thời gian** (T) | ❌ Vi phạm rất nhỏ | — |
| **Đổi hạt ↔ phản hạt** (charge conjugation, C) | ❌ Vi phạm ở tương tác yếu | — |
| **CPT cùng lúc** | ✅ Tin là chính xác | — |
| **Đổi thang đo** | ❌ | — |

## 2. Ba loại đối xứng — phân biệt được là hiểu

Đây là điểm sư phạm quan trọng nhất của bài giảng, và Feynman rất rõ ràng về nó:

1. **Đối xứng đúng chính xác.** Tịnh tiến, quay, CPT. Chưa từng thấy vi phạm.
2. **Đối xứng *gần* đúng.** Đúng với một số tương tác, sai với tương tác khác. Ví dụ: strangeness bảo toàn ở tương tác mạnh, vi phạm ở tương tác yếu. Isospin gần đúng vì khối lượng quark u và d gần nhau, không bằng nhau.
3. **Đối xứng ta *tưởng* đúng nhưng sai.** Parity, cho tới năm 1957. Xem [[Parity Violation]].

> [!note] Loại 3 là loại đáng học nhất
> Parity nằm trong sách giáo khoa suốt nhiều thập kỷ như một đối xứng hiển nhiên. Lee và Yang đơn giản chỉ hỏi: *đã có ai kiểm chưa?* Câu trả lời là chưa. Wu kiểm, và nó sai. Bài học: **một đối xứng "hiển nhiên" chưa được kiểm là một giả định, không phải một sự thật.**

## 3. Đối xứng bị phá — và vì sao đó không phải thất bại

Nhiều đối xứng bị **phá vỡ tự phát** (spontaneous symmetry breaking): định luật có đối xứng, nhưng *trạng thái* thì không.

Ví dụ chuẩn: một cây bút chì dựng đứng trên đầu nhọn. Tình huống đối xứng hoàn hảo theo mọi hướng. Nó đổ — và đổ về **một** hướng cụ thể. Định luật vẫn đối xứng; nghiệm thì không.

Đây là cơ chế trung tâm của:
- **Cơ chế Higgs** — cách các hạt có khối lượng.
- **Từ tính** — spin xếp cùng hướng dù định luật không ưu tiên hướng nào.
- **Siêu dẫn** — xem [[Superfluidity of Helium]] cho hiện tượng họ hàng.

## 4. Đối xứng nào **không** có

Feynman nhấn mạnh chỗ này vì nó dạy nhiều hơn danh sách các đối xứng đúng:

- **Đổi thang đo.** Phóng to mọi thứ lên 10 lần thì vật lý *không* giữ nguyên. Đây là lý do không có động vật khổng lồ như trong phim: thể tích tăng theo $L^3$ còn tiết diện xương chỉ tăng theo $L^2$. (Galileo đã lập luận đúng như vậy trong *Two New Sciences*.)
- **Quay theo góc tuỳ ý trong tinh thể.** Tinh thể chỉ đối xứng với một số góc rời rạc.
- **Đảo thời gian ở thang vĩ mô.** Đây là bài toán lớn nhất — xem [[The Arrow of Time]] và [[The Distinction of Past and Future]].

## 5. Cạm bẫy

> [!warning] "Đối xứng đẹp nên tự nhiên phải có"
> Đây chính là sai lầm Feynman cảnh báo suốt: *"all intuitions about what nature's going to do philosophically fail."* Parity đối xứng đẹp hơn. Tự nhiên vẫn vi phạm nó. Xem [[Simplicity and Beauty in Physics]].

- **Nhầm đối xứng của **định luật** với đối xứng của **trạng thái**.** Xem mục 3. Đây là chỗ khó nhất và cũng là chỗ sâu nhất.
- **Bỏ qua đối xứng gần đúng.** Chúng cực kỳ hữu dụng trong thực hành — isospin, flavor SU(3) — miễn là ta biết chúng gần đúng đến mức nào.
- **Tưởng đối xứng chỉ là công cụ phân loại.** Qua định lý Noether, chúng **sinh ra** các định luật bảo toàn. Xem [[Symmetry and Conservation Laws]].
- **Quên đối xứng gauge.** Đối xứng quan trọng nhất trong vật lý hiện đại là loại *nội tại*, không phải hình học — và toàn bộ Mô hình Chuẩn được xây trên đó.

## 6. Checklist áp dụng

- [ ] Với hệ tôi đang xét: phép biến đổi nào để nguyên định luật?
- [ ] Mỗi đối xứng tôi dùng thuộc loại nào trong ba loại ở mục 2?
- [ ] Đối xứng đó đã được **kiểm** chưa, hay tôi đang giả định?
- [ ] Tôi phân biệt được đối xứng của định luật và của nghiệm chứ?
- [ ] Mỗi đối xứng chính xác trong bài toán cho tôi đại lượng bảo toàn nào?

## Tham khảo

- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 4 — **bản in đầy đủ của chính bài giảng này**
- [Messenger Lecture #4 — video](https://www.feynmanlectures.caltech.edu/fml.html#4)
- [The Feynman Lectures, Vol I Ch. 52 — Symmetry in Physical Laws](https://www.feynmanlectures.caltech.edu/I_52.html)
- Weyl, *Symmetry* (Princeton UP, 1952) — nguồn định nghĩa Feynman dùng
- Gross, "The role of symmetry in fundamental physics", *PNAS* 93 (1996)

## Liên kết

[[Symmetry and Conservation Laws]] · [[Parity Violation]] · [[The Great Conservation Principles]] · [[The Arrow of Time]] · [[Simplicity and Beauty in Physics]] · [[V-A Theory of Weak Interaction]] · [[Physics]]
