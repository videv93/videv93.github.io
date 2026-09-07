---
tags: [physics, conservation, mechanics]
status: evergreen
---
# Conservation of Momentum

> $\mathbf{p} = m\mathbf{v}$, và tổng động lượng của hệ kín không đổi. Định luật đơn giản nhất trong nhóm bảo toàn — và là định luật cho thấy rõ nhất vì sao **bảo toàn mạnh hơn định luật lực**.

## 1. Phát biểu

$$\sum_i m_i \mathbf{v}_i = \text{const}, \qquad \frac{d\mathbf{p}_{\text{tổng}}}{dt} = \mathbf{F}_{\text{ngoài}}$$

Động lượng là **vector** — bảo toàn theo từng thành phần độc lập. Đây là chỗ hay bị bỏ sót: một hệ có thể bảo toàn động lượng theo phương ngang mà không theo phương dọc (ví dụ: có trọng lực).

## 2. Quan hệ với định luật 3 Newton

Trong khung Newton, bảo toàn động lượng suy ra trực tiếp từ *"lực và phản lực bằng nhau, ngược chiều"*: nội lực triệt tiêu từng cặp, chỉ còn ngoại lực.

Nhưng — và đây là điểm quan trọng — **quan hệ đó chỉ đúng một chiều, và định luật 3 Newton là cái sụp đổ trước**:

| | Định luật 3 Newton | Bảo toàn động lượng |
|---|---|---|
| Cần khái niệm "lực"? | ✅ Bắt buộc | ❌ Không |
| Cần tác dụng **tức thời**? | ✅ Có — hai lực phải bằng nhau *cùng lúc* | ❌ Không |
| Sống sót trong thuyết tương đối? | ❌ Không — "cùng lúc" phụ thuộc hệ quy chiếu | ✅ Có |
| Sống sót trong cơ học lượng tử? | ❌ Không có quỹ đạo, không có lực | ✅ Có, chính xác |

Ví dụ cụ thể của chỗ định luật 3 hỏng: hai điện tích chuyển động vuông góc với nhau. Lực từ mà hạt A tác dụng lên B **không** bằng và ngược chiều lực B tác dụng lên A. Động lượng vẫn bảo toàn — vì **trường điện từ cũng mang động lượng**, và phần chênh lệch nằm ở trường.

> [!note] Đây là [[Theorems Beyond Their Derivation]] ở dạng rõ nhất
> Ta chứng minh bảo toàn động lượng *từ* định luật 3 Newton. Rồi định luật 3 Newton sai. Bảo toàn động lượng thì không — vì nguồn gốc thật của nó nằm ở chỗ khác.

## 3. Nguồn gốc: đối xứng tịnh tiến

**Định luật vật lý không đổi khi ta dời chỗ thí nghiệm ⟹ động lượng bảo toàn.**

Không gian đồng nhất — làm thí nghiệm ở Hà Nội hay ở Sao Hoả đều cho cùng kết quả. Định lý Noether biến sự thật đó thành một đại lượng bảo toàn. Xem [[Symmetry and Conservation Laws]].

Bảng đối chiếu ba định luật bảo toàn cơ học và ba đối xứng không-thời gian:

| Đối xứng | Nghĩa | Đại lượng bảo toàn |
|---|---|---|
| Tịnh tiến **không gian** | Dời chỗ không đổi kết quả | **Động lượng** |
| Tịnh tiến **thời gian** | Dời thời điểm không đổi kết quả | [[Conservation of Energy]] |
| **Quay** | Xoay hướng không đổi kết quả | [[Conservation of Angular Momentum]] |

Ba dòng này là một trong những bảng đẹp nhất trong vật lý.

## 4. Vì sao nó hữu dụng đến vậy

Bảo toàn động lượng cho phép giải bài toán **mà không cần biết gì về lực**. Trong va chạm giữa hai hạt, lực tương tác có thể cực kỳ phức tạp và diễn ra trong 10⁻²³ giây — không ai tính nổi. Nhưng động lượng vào = động lượng ra, và thế là đủ.

Đây là lý do nó là công cụ số một trong vật lý hạt: mọi phân tích va chạm ở LHC bắt đầu bằng việc cân bằng năng lượng–động lượng. **Missing transverse momentum** — động lượng ngang thiếu — chính là dấu vết của các hạt không tương tác với detector (neutrino, hoặc thứ gì chưa biết).

## 5. Cạm bẫy

> [!warning] Nhầm động lượng với động năng
> $p = mv$ và $KE = \tfrac12 mv^2$ là hai đại lượng khác nhau, bảo toàn theo hai điều kiện khác nhau. Trong **va chạm mềm**, động lượng bảo toàn nhưng động năng thì không (chuyển thành nhiệt, biến dạng). Đây là lỗi phổ biến nhất trong cơ học nhập môn.

| | Va chạm đàn hồi | Va chạm mềm |
|---|---|---|
| Động lượng | ✅ Bảo toàn | ✅ Bảo toàn |
| Động năng | ✅ Bảo toàn | ❌ **Không** |

- **Quên tính vector.** Bảo toàn theo từng trục. Hai vật bay ngược chiều với cùng $|p|$ có tổng động lượng bằng 0, không phải $2p$.
- **Quên ngoại lực.** Bóng rơi tự do: động lượng *không* bảo toàn — Trái Đất đang tác dụng lực. (Trừ khi bạn đưa Trái Đất vào hệ.)
- **Bỏ qua động lượng của trường.** Ánh sáng mang động lượng $p = E/c$, dù không có khối lượng. Đó là nguyên lý cánh buồm mặt trời.
- **Tưởng định luật 3 Newton là nền tảng.** Xem mục 2 — nó là cái sụp trước.

## 6. Checklist áp dụng

- [ ] Hệ tôi đang xét có kín theo phương tôi quan tâm không?
- [ ] Tôi phân biệt được bài toán nào bảo toàn động năng, bài toán nào không?
- [ ] Tôi tính động lượng theo **từng thành phần vector** chứ?
- [ ] Tôi có bỏ sót động lượng mang bởi trường hay bức xạ không?
- [ ] Tôi giải được bài toán này mà không cần biết chi tiết lực tương tác không?

## Tham khảo

- [The Feynman Lectures, Vol I Ch. 10 — Conservation of Momentum](https://www.feynmanlectures.caltech.edu/I_10.html)
- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 3
- [Messenger Lecture #3](https://www.feynmanlectures.caltech.edu/fml.html#3)
- [The Feynman Lectures, Vol II Ch. 27 — Field Energy and Field Momentum](https://www.feynmanlectures.caltech.edu/II_27.html) — vì sao trường mang động lượng
- Goldstein, *Classical Mechanics*, 3rd ed., Chương 1

## Liên kết

[[The Great Conservation Principles]] · [[Symmetry and Conservation Laws]] · [[Conservation of Energy]] · [[Conservation of Angular Momentum]] · [[Theorems Beyond Their Derivation]] · [[Physics]]
