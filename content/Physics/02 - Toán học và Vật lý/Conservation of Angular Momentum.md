---
tags: [physics, conservation, mechanics]
status: evergreen
---
# Conservation of Angular Momentum

> Tổng quát hoá của định luật 2 Kepler. Feynman dùng nó làm **ví dụ mẫu** cho một hiện tượng ông thấy kỳ lạ: một định lý chứng minh được trong một miền hẹp lại hoá ra đúng rộng hơn nhiều so với chứng minh cho phép. Xem [[Theorems Beyond Their Derivation]].

## 1. Từ "diện tích bằng nhau" tới định luật bảo toàn

| | Định luật 2 Kepler | Bảo toàn mômen động lượng |
|---|---|---|
| Áp dụng cho | **Một** hành tinh quanh Mặt Trời | **Bất kỳ** hệ nhiều vật |
| Đại lượng | Diện tích quét mỗi giây | Tổng **có trọng số khối lượng** của diện tích quét mỗi giây |
| Điều kiện | Lực xuyên tâm | Không có mômen lực ngoài |
| Còn đúng trong cơ học lượng tử? | ❌ Không có quỹ đạo | ✅ **Có, và chính xác** |

Feynman dựng tổng quát hoá từng bước, không dùng công thức:

> "Look at all these particles — Jupiter, Saturn, the sun, and all these things going around — and look at it from far away, and project it on a plane. Then take **any point at all** — say this point — and calculate how much area is being swept out by the radius to every particle, and add them all together. **But wait**: those masses which are heavier — this is twice as heavy as this one, then this area counts twice as much. So you count each of the areas in proportion to the mass that's doing the sweeping, and the total of all of that **is not changing in time**."

Rồi ông đặt tên: *"Incidentally, the total of that is called the **angular momentum**, and this is called the law of conservation of angular momentum. ('Conservation' just means that it doesn't change.)"*

Dạng hiện đại: $\mathbf{L} = \sum_i m_i\,\mathbf{r}_i \times \mathbf{v}_i$, và $d\mathbf{L}/dt = \boldsymbol{\tau}_{\text{ngoài}}$.

## 2. Hai ứng dụng Feynman chọn

**Tinh vân xoắn ốc.** Đám sao ở xa, chuyển động chậm, quét diện tích trên những "cánh tay" rất dài. Khi hấp dẫn kéo chúng vào, bán kính ngắn lại → để quét cùng diện tích, chúng **phải quay nhanh hơn**. Kết quả: cấu trúc xoắn.

> "Thus we can roughly understand the qualitative shape of the spiral nebulae."

**Vận động viên trượt băng.** Chân dang ra, quay chậm; thu chân vào, quay nhanh. Cùng logic chính xác.

> [!note] Chi tiết Feynman cẩn thận nêu — và nó là bài học phương pháp
> *"But I didn't prove it for the skater: the skater uses **muscle force**; gravity is a different force — yet it's proof for the skater."*
> Ông đã chứng minh định lý **chỉ cho lực hấp dẫn**. Vận động viên dùng lực cơ bắp — nằm ngoài phạm vi chứng minh. Vậy mà kết quả vẫn đúng. Đó chính là hiện tượng ông sắp bàn ở mục 3, và ông cố ý đặt bẫy này để người nghe tự nhận ra.

## 3. Vì sao nó đúng rộng hơn chứng minh

Đây là điểm sâu nhất của cả bài giảng #2:

> "We can deduce, from one part of physics like the law of gravitation, a principle which turns out to be **much more valid than the derivation**! This doesn't happen in mathematics — that theorems come out in places where they're not supposed to be."

Và ông đẩy tới kết luận gây bối rối nhất:

> "Newtonian laws were **wrong**: there's no forces; it's all a lot of baloney; the particles don't have orbits, and so on. **Yet**, the exact transformation of this principle about the area as the conservation of angular momentum is true for the atomic motions in quantum mechanics — and is still, as far as we can tell today, **exact**."

Toàn bộ giàn giáo sụp (lực, quỹ đạo, hạt điểm), nhưng định luật bảo toàn dựng trên giàn giáo đó vẫn đứng — và đứng chính xác hơn.

**Lý do sâu xa, tìm ra sau Feynman phát biểu điều này:** bảo toàn mômen động lượng không phải hệ quả của hấp dẫn. Nó là hệ quả của **tính đẳng hướng của không gian** — định luật vật lý không đổi khi ta xoay hệ. Đó là định lý Noether. Xem [[Symmetry and Conservation Laws]].

Vì đối xứng quay sống sót qua mọi cuộc cách mạng vật lý, định luật bảo toàn cũng sống sót.

## 4. Cạm bẫy

> [!warning] "Bảo toàn mômen động lượng suy ra từ định luật Newton"
> Suy ra được, nhưng đó **không phải nguồn gốc thật** của nó. Nguồn gốc là đối xứng quay. Nhầm chỗ này là nhầm đúng bài học mà Feynman muốn dạy.

- **Quên tổng phải có trọng số khối lượng.** Feynman dừng lại giữa câu để nhấn — *"but wait"* — vì đây là chỗ dễ bỏ sót nhất khi tự dựng lại tổng quát hoá.
- **Tưởng cần "xoay tròn" mới có mômen động lượng.** Một hạt đi thẳng cũng có mômen động lượng khác 0 so với một điểm không nằm trên đường đi của nó.
- **Quên rằng đại lượng này phụ thuộc điểm gốc.** $\mathbf{L}$ tính đối với một điểm cụ thể. Đổi điểm thì đổi giá trị — nhưng vẫn bảo toàn.
- **Áp dụng khi có mômen lực ngoài.** Bảo toàn chỉ đúng cho hệ kín. Con quay hồi chuyển tiến động vì có mômen lực từ trọng lực.
- **Nhầm với bảo toàn động lượng.** Xem [[Conservation of Momentum]] — đó là đối xứng tịnh tiến, một đối xứng khác.

## 5. Checklist áp dụng

- [ ] Tôi dựng lại được đường đi từ "diện tích bằng nhau" tới bảo toàn mômen động lượng, kể cả trọng số khối lượng?
- [ ] Tôi giải thích được cả tinh vân xoắn ốc và vận động viên trượt băng bằng cùng một câu?
- [ ] Tôi nói được vì sao ví dụ vận động viên **nằm ngoài** phạm vi chứng minh của Feynman?
- [ ] Tôi biết nguồn gốc thật của định luật này là đối xứng nào?
- [ ] Với bài toán tôi đang xét: hệ có kín không, và tôi tính $\mathbf{L}$ đối với điểm nào?

## Tham khảo

- [Messenger Lecture #2](https://www.feynmanlectures.caltech.edu/fml.html#2)
- [The Feynman Lectures, Vol I Ch. 18 — Rotation in Two Dimensions](https://www.feynmanlectures.caltech.edu/I_18.html)
- [The Feynman Lectures, Vol I Ch. 20-4 — Conservation of angular momentum](https://www.feynmanlectures.caltech.edu/I_20.html)
- Noether, "Invariante Variationsprobleme", *Nachr. d. König. Gesellsch. d. Wiss. zu Göttingen* (1918)
- Goldstein, *Classical Mechanics*, 3rd ed., Chương 1–2

## Liên kết

[[Equal Areas from a Central Force]] · [[Theorems Beyond Their Derivation]] · [[Symmetry and Conservation Laws]] · [[Kepler's Laws]] · [[Conservation of Momentum]] · [[Physics]]
