---
tags: [physics, gravitation, classical-mechanics]
status: evergreen
---
# Newton's Law of Gravitation

> Định luật được Feynman gọi là **"the greatest generalization achieved by the human mind"** — và điều đáng kinh ngạc với ông không phải là con người tìm ra nó, mà là tự nhiên chịu tuân theo một thứ đơn giản đến thế.

$$F = G\,\frac{m_1 m_2}{r^2}$$

## 1. Toàn bộ định luật gói trong hai câu

Feynman nhấn mạnh điều này rất mạnh trong bài giảng #1 — hai phát biểu, không hơn:

| # | Phát biểu | Ký hiệu |
|---|---|---|
| 1 | Hai vật hút nhau bằng một lực **tỉ lệ thuận với tích hai khối lượng** và **nghịch với bình phương khoảng cách** | $F = G m_1 m_2 / r^2$ |
| 2 | Vật phản ứng với lực bằng cách **thay đổi vận tốc**, mức thay đổi **nghịch với khối lượng** | $a = F/m$ |

> "If I add the remark that a body reacts to a force by accelerating... then I have said everything about the law of gravitation that needs to be said: **everything else is a consequence**, a mathematical consequence of those two things that I said."

Mọi thứ còn lại — ba định luật Kepler, thuỷ triều, hình dạng Trái Đất, quỹ đạo vệ tinh, sự hình thành sao — là hệ quả toán học. Đó chính là ý nghĩa của "đơn giản trong khuôn mẫu, phức tạp trong hành vi". Xem [[Simplicity and Beauty in Physics]].

## 2. Ba bước dẫn tới định luật

Feynman kể lịch sử như một chuỗi *thu hẹp giả thuyết bằng dữ liệu*, không phải chuỗi thiên tài loé sáng:

1. **Tycho Brahe** — không lý thuyết gì, chỉ đo. Đêm này qua đêm khác, trên hòn đảo gần Copenhagen, với những vành đồng lớn. Feynman gọi đây là **chìa khoá của khoa học hiện đại**: *"this idea to look at the thing, to record the details, and to hope that in the information thus obtained may lie a clue."*
2. **Kepler** — thử-sai trên dữ liệu Tycho, ra ba định luật mô tả. Xem [[Kepler's Laws]].
3. **Newton** — hỏi *cái gì làm chúng đi như vậy*, và cho thấy hai định luật Kepler đầu tương đương chính xác với hai phát biểu về lực. Xem [[Inertia and Force]].

> [!note] Chi tiết đáng nhớ nhất trong bước 2
> Kepler từng tưởng mình xong: quỹ đạo tròn, Mặt Trời lệch tâm. Một hành tinh lệch **8 phút cung**. Ông kết luận rằng Tycho không thể sai tới mức đó — nên *lý thuyết* sai. Toàn bộ cơ học thiên thể tồn tại vì Kepler tin vào độ chính xác của phép đo hơn tin vào lý thuyết đẹp của mình.

## 3. Newton đã thêm được gì so với Kepler

Đây là chỗ dễ bị nói lướt. Feynman rất sòng phẳng: hai phần đầu của Newton **không mới**, chỉ là dịch lại Kepler sang ngôn ngữ lực.

| Kepler nói | Newton dịch thành |
|---|---|
| Diện tích quét bằng nhau trong thời gian bằng nhau | Lực hướng **thẳng về Mặt Trời** |
| Chu kỳ ∝ (kích thước quỹ đạo)^(3/2) | Lực yếu đi theo **nghịch đảo bình phương** |

Cái **thật sự mới** là bước tổng quát hoá: *mọi vật hút mọi vật*. Từ đó Mặt Trăng phải rơi về Trái Đất giống hệt quả táo — và con số khớp. Đó là [[The Moon Falls Like an Apple]], khoảnh khắc Feynman gọi là *"there was no going back now!"*

## 4. Cạm bẫy

> [!warning] "Trọng lực có biên giới"
> Feynman chế giễu trực tiếp cách báo chí viết *"the planet gets outside the field of gravity"*. **Không có biên.** Trường Trái Đất yếu dần theo $1/r^2$, chia bốn mỗi khi khoảng cách gấp đôi, cho tới khi lẫn vào trường của các sao khác — nhưng không bao giờ kết thúc.

- **Nhầm $G$ với $g$.** $G = 6{,}674\times10^{-11}\ \mathrm{m^3 kg^{-1} s^{-2}}$ là hằng số vũ trụ; $g \approx 9{,}81\ \mathrm{m/s^2}$ là gia tốc *tại bề mặt Trái Đất*, phụ thuộc khối lượng và bán kính Trái Đất.
- **Tưởng phát biểu #2 là phần phụ.** Không có $a = F/m$ thì phát biểu #1 không nói gì về chuyển động. Đúng vì hai hệ số khối lượng ở hai phát biểu **bằng nhau** mà mọi vật mới rơi như nhau — xem [[Equivalence Principle]].
- **Coi định luật này là "đã lỗi thời vì có Einstein".** Nó vẫn là công cụ tính quỹ đạo vệ tinh, tàu thăm dò, thuỷ triều. Sai số ở Mercury là 43 giây cung mỗi **thế kỷ**.
- **Đòi cơ chế đằng sau.** Newton từ chối trả lời; Feynman dành cả bài #2 giải thích vì sao câu từ chối đó là đúng đắn. Xem [[Physical Law vs Mechanism]].

## 5. Checklist áp dụng

- [ ] Tôi phát biểu được **cả hai** mệnh đề, không chỉ công thức lực?
- [ ] Tôi chỉ ra được mỗi định luật Kepler tương đương phần nào của phát biểu Newton?
- [ ] Tôi tính được lực giữa hai vật cụ thể, ra đúng đơn vị?
- [ ] Tôi biết định luật này hỏng ở đâu, và sai bao nhiêu?
- [ ] Khi ai đó nói "ra khỏi trường hấp dẫn", tôi sửa được không?

## Tham khảo

- [Messenger Lecture #1 — The Law of Gravitation](https://www.feynmanlectures.caltech.edu/fml.html#1)
- [The Feynman Lectures, Vol I Ch. 7 — The Theory of Gravitation](https://www.feynmanlectures.caltech.edu/I_07.html)
- Newton, *Philosophiæ Naturalis Principia Mathematica* (1687), Book III
- [CODATA 2022 — giá trị hằng số hấp dẫn G](https://physics.nist.gov/cgi-bin/cuu/Value?bg)

## Liên kết

[[Kepler's Laws]] · [[Inertia and Force]] · [[The Moon Falls Like an Apple]] · [[Cavendish Experiment]] · [[Equivalence Principle]] · [[Characteristics of Physical Law]] · [[Physics]]
