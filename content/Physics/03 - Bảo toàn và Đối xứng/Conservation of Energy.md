---
tags: [physics, conservation, energy]
status: evergreen
---
# Conservation of Energy

> Feynman mở chương này trong *The Feynman Lectures* bằng một câu thẳng thắn đến khó chịu: **chúng ta không biết năng lượng *là* gì.**

> "There is a fact, or if you wish, a *law*, governing all natural phenomena that are known to date. There is no known exception to this law — it is exact so far as we know. The law is called the conservation of energy. It states that there is a certain quantity, which we call energy, that does not change in the manifold changes which nature undergoes. **That is a most abstract idea, because it is a mathematical principle; it says that there is a numerical quantity which does not change when something happens. It is not a description of a mechanism, or anything concrete; it is just a strange fact.**"

Đó là [[Physical Law vs Mechanism]] phát biểu ở dạng cực đoan nhất.

## 1. Câu chuyện Dennis the Menace

Ẩn dụ nổi tiếng nhất của Feynman, và nó chứa toàn bộ cấu trúc logic của định luật:

Một đứa trẻ có **28 khối gỗ** không phá được. Mẹ nó đếm mỗi tối: luôn 28.

Rồi một hôm chỉ còn 26. Điều tra:
- 2 khối dưới thảm → **thêm số đếm trực tiếp**
- 1 khối ngoài cửa sổ → **mở rộng biên hệ**
- Hộp đồ chơi bị khoá. Không mở được, nhưng: cân hộp. Mỗi khối nặng 100 g, hộp rỗng nặng 400 g. → $\dfrac{W_{\text{hộp}} - 400\ \text{g}}{100\ \text{g}}$ = số khối trong hộp. **Đại lượng gián tiếp, tính từ thứ đo được.**
- Bồn tắm đầy nước đục. Không nhìn thấy đáy. Nhưng mực nước dâng 6 mm mỗi khối. → $\dfrac{h - h_0}{6\ \text{mm}}$. **Thêm một số hạng nữa.**

Công thức cuối cùng:

$$\text{số khối thấy được} + \frac{W_{\text{hộp}} - 400}{100} + \frac{h - h_0}{6} = \text{28, luôn luôn}$$

> [!note] Vì sao ẩn dụ này chính xác chứ không chỉ dễ thương
> Nó nắm đúng ba đặc điểm của định luật thật:
> 1. **Mỗi dạng năng lượng là một số hạng tính gián tiếp**, không phải thứ nhìn thấy được. Không ai "thấy" nhiệt năng hay thế năng.
> 2. **Ta chỉ biết công thức, không biết "khối gỗ" là gì.** Đây là điểm Feynman nhấn: không có khối gỗ thật nào. Chỉ có công thức luôn cho ra cùng một số.
> 3. **Khi số không khớp, ta thêm một số hạng mới** — và đó chính xác là cách neutrino được phát hiện. Xem [[The Great Conservation Principles]].

## 2. Các dạng năng lượng

| Dạng | Công thức | Ghi chú |
|---|---|---|
| Động năng | $\tfrac12 mv^2$ | Dạng tương đối tính: $(\gamma-1)mc^2$ |
| Thế năng hấp dẫn | $mgh$ (gần mặt đất); $-GMm/r$ (tổng quát) | |
| Nhiệt năng | $\propto T$ | Thực ra là động năng chuyển động hỗn loạn của phân tử |
| Năng lượng đàn hồi | $\tfrac12 kx^2$ | |
| Năng lượng điện từ | $\propto E^2 + B^2$ | Trường mang năng lượng thật |
| **Năng lượng khối lượng nghỉ** | $mc^2$ | Số hạng cuối cùng được thêm vào — Einstein, 1905 |

Số hạng cuối là ví dụ đẹp nhất về "thêm số hạng khi số không khớp": phản ứng hạt nhân *có vẻ* vi phạm bảo toàn năng lượng cho tới khi ta tính khối lượng như một dạng năng lượng.

## 3. Nguồn gốc: đối xứng thời gian

Định luật này không phải tiên đề. Theo định lý Noether:

**Định luật vật lý không đổi theo thời gian ⟹ năng lượng bảo toàn.**

Nghĩa là: nếu bạn làm cùng một thí nghiệm hôm nay và ngày mai, kết quả như nhau — thì tồn tại một đại lượng bảo toàn, và ta gọi nó là năng lượng. Xem [[Symmetry and Conservation Laws]].

Hệ quả gây bối rối: **trong vũ trụ đang giãn nở, đối xứng đó không có** — vũ trụ hôm nay khác vũ trụ hôm qua. Nên "năng lượng toàn vũ trụ" không được định nghĩa tốt trong thuyết tương đối rộng. Photon từ vũ trụ xa đến ta bị dịch đỏ, mất năng lượng, và năng lượng đó không đi đâu cả.

## 4. Cạm bẫy

> [!warning] "Năng lượng không tự sinh ra và không tự mất đi"
> Câu này đúng trong khung cơ học cổ điển và hệ kín. Nó **không** đúng ở thang vũ trụ học. Đừng dùng nó như một chân lý siêu hình.

- **Quên hệ phải kín.** Xem [[The Great Conservation Principles]] mục 5.
- **Tưởng ta hiểu năng lượng là gì.** Feynman nói thẳng là không. Ta có công thức, và công thức luôn đúng. Chỉ vậy thôi.
- **Nhầm năng lượng với công hữu ích.** Năng lượng bảo toàn, nhưng **entropy tăng** — nghĩa là phần năng lượng chuyển được thành công giảm dần. Đây mới là thứ giới hạn động cơ nhiệt. Xem [[Entropy and the Second Law]].
- **Dùng "bảo toàn năng lượng" trong ngữ cảnh ẩn dụ.** "Năng lượng tinh thần", "năng lượng vũ trụ" — không liên quan gì tới định luật này.
- **Quên $mc^2$.** Trong mọi bài toán hạt nhân hay hạt cơ bản, bỏ số hạng này là sai ngay.

## 5. Checklist áp dụng

- [ ] Tôi liệt kê được đầy đủ các số hạng năng lượng trong bài toán đang xét?
- [ ] Biên hệ ở đâu, và có gì đi qua biên?
- [ ] Tôi kể lại được ẩn dụ 28 khối gỗ và ánh xạ từng phần sang định luật thật?
- [ ] Tôi phân biệt được "năng lượng bảo toàn" và "công hữu ích giảm"?
- [ ] Tôi biết đối xứng nào sinh ra định luật này, và khi nào đối xứng đó không có?

## Tham khảo

- [The Feynman Lectures, Vol I Ch. 4 — Conservation of Energy](https://www.feynmanlectures.caltech.edu/I_04.html) — **nguồn của ẩn dụ 28 khối gỗ**
- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 3
- [Messenger Lecture #3](https://www.feynmanlectures.caltech.edu/fml.html#3)
- Noether, "Invariante Variationsprobleme" (1918)
- Carroll, "Energy Is Not Conserved" (2010), *Preposterous Universe* — vì sao vũ trụ học phá vỡ định luật này

## Liên kết

[[The Great Conservation Principles]] · [[Symmetry and Conservation Laws]] · [[Entropy and the Second Law]] · [[Conservation of Momentum]] · [[Physical Law vs Mechanism]] · [[Physics]]
