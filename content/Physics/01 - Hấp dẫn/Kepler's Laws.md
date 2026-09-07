---
tags: [physics, gravitation, orbital-mechanics]
status: evergreen
---
# Kepler's Laws

> Ba định luật **mô tả** quỹ đạo hành tinh, rút ra thuần tuý từ dữ liệu quan sát của Tycho Brahe bằng thử-sai — trước khi có bất kỳ khái niệm nào về lực.

Giá trị của chúng với vault này không nằm ở nội dung (ai cũng thuộc), mà ở chỗ chúng là **ví dụ mẫu về việc cùng một sự thật vật lý có thể phát biểu theo hai ngôn ngữ hoàn toàn khác nhau** — hình học quỹ đạo, hoặc lực. Xem [[Three Equivalent Formulations]].

## 1. Ba định luật, và mỗi cái tương đương với gì

| # | Kepler phát biểu (ngôn ngữ hình học) | Newton dịch (ngôn ngữ lực) |
|---|---|---|
| **1** | Hành tinh đi theo **ellipse**, Mặt Trời ở một **tiêu điểm** | Hệ quả của lực xuyên tâm ∝ $1/r^2$ (không phải luật khác) |
| **2** | Đường nối Mặt Trời–hành tinh quét **diện tích bằng nhau trong thời gian bằng nhau** | Lực hướng **thẳng về Mặt Trời** — không cần biết độ lớn |
| **3** | $T \propto a^{3/2}$ — chu kỳ tỉ lệ căn bậc hai của lập phương kích thước quỹ đạo | Lực giảm theo **nghịch đảo bình phương** |

> [!note] Định luật 2 là cái sâu nhất, không phải định luật 1
> Định luật 2 chỉ cần lực **xuyên tâm** — bất kể độ lớn thế nào. Vì thế nó tổng quát hơn hai cái kia rất nhiều, và tổng quát hoá của nó là [[Conservation of Angular Momentum]] — thứ vẫn đúng trong cơ học lượng tử, nơi khái niệm "quỹ đạo" đã không còn tồn tại. Feynman dựng lại chứng minh hình học của Newton cho định luật này trong bài #2; xem [[Equal Areas from a Central Force]].

## 2. Feynman kể chuyện này thế nào

Ba chi tiết ông chọn kể, và vì sao mỗi cái đáng giữ:

1. **Ellipse là thứ ai cũng biết.** *"An ellipse is a curve all artists know about, because it's a foreshortened circle; children know about it because somebody told them that if you take a string and tie it to two tacks and put a pencil in there, it'll make an ellipse."* — Feynman luôn neo khái niệm vào thứ người nghe đã có sẵn.
2. **Định luật 2 nghĩa là hành tinh đi nhanh khi gần.** Không phải "vì nó bị hút mạnh hơn" — mà vì để quét cùng một diện tích với bán kính ngắn hơn thì phải quét nhanh hơn. Cùng logic với vận động viên trượt băng thu tay.
3. **Kepler mất nhiều năm cho định luật 3.** Nó khác hai cái đầu về loại: hai cái đầu nói về *một* hành tinh, cái thứ ba nối *các* hành tinh với nhau. Đó là bước đầu tiên hướng tới ý tưởng "cùng một luật cho mọi vật".

## 3. Giới hạn — nơi Kepler hỏng

Đây là phần hay bị bỏ qua, và là phần dẫn thẳng tới các khám phá lớn:

- **Ellipse chỉ đúng cho bài toán hai vật.** Hành tinh cũng hút lẫn nhau. Jupiter, Saturn, Uranus lệch khỏi ellipse hoàn hảo — và chính việc tính toán độ lệch đó dẫn tới **Neptune**. Xem [[Predictive Triumphs of Gravitation]].
- **Định luật 2 hỏng khi có nhiều vật.** Nhưng nó không biến mất, nó *tổng quát hoá*: tổng diện tích quét có trọng số khối lượng thì bảo toàn. Feynman dùng đúng ví dụ này để minh hoạ [[Theorems Beyond Their Derivation]].
- **Mercury không khớp.** 43 giây cung mỗi thế kỷ — quá nhỏ để bỏ qua, quá lớn để đổ cho sai số. Cần thuyết tương đối rộng.

## 4. Cạm bẫy

> [!warning] "Định luật 1 chứng minh lực nghịch đảo bình phương"
> Không hoàn toàn. Ellipse **với Mặt Trời tại tiêu điểm** thì có; ellipse với Mặt Trời tại **tâm** lại tương ứng với lực $F \propto r$ (dao động điều hoà). Vị trí Mặt Trời là chi tiết quyết định, không phải hình dạng.

- **Nhìn ảnh quỹ đạo và tưởng định luật sai.** Feynman kể chuyện ảnh sao đôi năm 1905: tâm quỹ đạo *không* nằm ở tiêu điểm. Lý do: quỹ đạo bị nghiêng trong không gian, ta nhìn hình chiếu. *"God hasn't presented us with this orbit face on."*
- **Tưởng Kepler suy ra từ nguyên lý.** Ông thử-sai trên bảng số. Feynman dùng chuyện này để nói: *"It's only through such hard work that we can find out anything."*
- **Học thuộc ba định luật mà không biết chúng tương đương gì.** Đó chính là kiểu học Feynman phê phán trong [[Against Rote Learning]].

## 5. Checklist áp dụng

- [ ] Tôi nói được mỗi định luật Kepler tương đương với phát biểu nào về lực?
- [ ] Tôi giải thích được vì sao định luật 2 tổng quát hơn hai cái còn lại?
- [ ] Tôi biết ba chỗ Kepler hỏng, và mỗi chỗ dẫn tới khám phá gì?
- [ ] Cho chu kỳ Trái Đất và bán kính quỹ đạo, tôi tính được chu kỳ của một hành tinh ở 4 AU?
- [ ] Tôi phân biệt được "Mặt Trời ở tiêu điểm" và "Mặt Trời ở tâm" dẫn tới luật lực khác nhau?

## Tham khảo

- [Messenger Lecture #1](https://www.feynmanlectures.caltech.edu/fml.html#1)
- [The Feynman Lectures, Vol I Ch. 7](https://www.feynmanlectures.caltech.edu/I_07.html)
- Feynman, *Feynman's Lost Lecture: The Motion of Planets Around the Sun* (Vintage, 1997) — ông chứng minh quỹ đạo ellipse bằng hình học thuần tuý. ISBN 0-09-973621-7
- Kepler, *Astronomia Nova* (1609) và *Harmonices Mundi* (1619)

## Liên kết

[[Newton's Law of Gravitation]] · [[Equal Areas from a Central Force]] · [[Conservation of Angular Momentum]] · [[Predictive Triumphs of Gravitation]] · [[Theorems Beyond Their Derivation]] · [[Physics]]
