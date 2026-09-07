---
tags: [physics, mathematics, formalism]
status: evergreen
---
# Three Equivalent Formulations

> Định luật hấp dẫn viết được theo **ba cách có triết lý chỏi nhau hoàn toàn**, cho ra **hệ quả giống hệt nhau**. Feynman coi đây là một trong những sự thật kỳ lạ nhất về vật lý — và là chỗ ông giải thích vì sao ta phải giữ cả ba trong đầu.

## 1. Ba cách

| | **1. Lực (Newton)** | **2. Trường / thế** | **3. Tác dụng tối thiểu** |
|---|---|---|---|
| Phát biểu | Vật A tác dụng lực lên vật B ở xa; $F = Gm_1m_2/r^2$; $a = F/m$ | Có một **số** (thế năng) tại mỗi điểm không gian. Lực theo hướng số đó đổi nhanh nhất | Trong mọi đường đi từ A tới B trong thời gian cho trước, vật chọn đường làm **trung bình (động năng − thế năng)** nhỏ nhất |
| Cục bộ về **không gian**? | ❌ Tác dụng từ xa | ✅ Chỉ cần biết lân cận | ❌ Cần biết **toàn bộ** đường đi |
| Cục bộ về **thời gian**? | ✅ Từng khoảnh khắc | ✅ Từng khoảnh khắc | ❌ Nói về cả hành trình |
| Có nhân quả? | ✅ | ✅ | ❌ Vật như thể "ngửi" mọi đường rồi chọn |
| Triết lý | Vật đẩy nhau | Không gian có tính chất | Tự nhiên tối ưu hoá |

### Cách 2 diễn đạt chính xác hơn

Feynman phát biểu dạng trường bằng **tính chất giá trị trung bình**, chứ không bằng phương trình vi phân — để tránh phải giả định gì về xa:

> "You don't have to know what's going on anywhere outside of a little ball. The potential at the center is equal to the **average of the potential on the little ball surface**, minus a constant divided by twice the radius of the ball, multiplied by the mass that's inside the ball — if the ball is small enough."

Đây chính là phương trình Poisson $\nabla^2\phi = 4\pi G\rho$ viết dưới dạng không cần đạo hàm. Điểm mấu chốt: **chỉ cần thông tin trong một quả cầu nhỏ tuỳ ý** — không cần nhìn ra ngoài. Đó là ý nghĩa của "cục bộ".

### Cách 3 và sự mất mát nhân quả

> "We have **lost the idea of causality** — that the particle is here, it sees the pull, it moves to here. Instead of that, in some grand fashion, it 'smells' all the curves around here — all the possibilities — and 'decides' which one to take."

## 2. Tương đương khoa học, khác biệt tâm lý

Ba cách cho **cùng mọi hệ quả đo được**. Vậy chọn cái nào?

> "You will read in all the books that we therefore cannot decide scientifically on one or the other. That's true."

Nhưng Feynman nói chúng **không** tương đương về mặt tâm lý, theo hai nghĩa — và nghĩa thứ hai mới là nghĩa quan trọng:

1. **Sở thích triết học.** Bạn thích hay ghét tác dụng từ xa. Feynman gạt phăng: *"training is the only thing you can do to beat that disease."*
2. **Khả năng đoán định luật mới.** ⭐ Đây mới là điểm chính:

> "They're completely unequivalent when you go to **guess at a new law**. As long as physics is incomplete... the different possible formulations give clues as to what might happen in another circumstance."

## 3. Bằng chứng: Einstein

Feynman đưa một ví dụ lịch sử cụ thể chứ không nói chung chung.

Einstein đoán rằng tín hiệu không thể nhanh hơn ánh sáng — đúng với điện từ, ông **đoán** nó đúng với mọi thứ, kể cả hấp dẫn. (Cùng kiểu đoán vượt quá chứng minh như [[Theorems Beyond Their Derivation]].)

Hệ quả cho ba cách viết:

| Cách viết | Số phận dưới thuyết tương đối |
|---|---|
| **Lực tức thời** | ❌ *"hopelessly inadequate and enormously complicated"* |
| **Trường** | ✅ Sống, và trở thành ngôn ngữ của thuyết tương đối rộng |
| **Tác dụng tối thiểu** | ✅ Sống, gọn gàng |

**Cùng một nội dung vật lý, nhưng cách viết quyết định bạn đoán được gì tiếp theo.** Đó là toàn bộ luận điểm.

Và Feynman thêm một tầng nữa: cơ học lượng tử cho thấy **cả ba, đúng như đã phát biểu, đều không đúng**. Nhưng — và đây là chỗ đẹp — *"the fact that a minimum principle exists turns out to be a **consequence** of the fact that, on a small scale, particles obey quantum mechanics."* Nguyên lý tác dụng tối thiểu không phải tiên đề; nó là hệ quả của [[Path Integral Formulation]]. Hạt thật sự "ngửi mọi đường" — theo nghĩa đen.

## 4. Vì sao ba cách này tồn tại được

Feynman chỉ ra: sự đa dạng đó **không miễn phí**. Nó chỉ có được vì định luật đúng là như vậy:

- Nếu lực là **nghịch đảo lập phương** thay vì bình phương → dạng trường cục bộ **không viết được**.
- Nếu lực tỉ lệ với **vị trí** thay vì vận tốc theo cách hiện tại → dạng tác dụng tối thiểu **không viết được**.

> "If you try to modify the laws much, you find you can only write them in very much fewer ways. I always find that mysterious — that the laws of physics always seem to be able to **get through several wickets at the same time**."

Xem [[Simplicity and Beauty in Physics]].

## 5. Cạm bẫy

> [!warning] "Tương đương nên chọn cái nào cũng được"
> Đúng nếu bạn chỉ **tính toán**. Sai nếu bạn đang **tìm định luật mới** — và đó là toàn bộ điểm của mục 2 và 3.

- **Chọn theo sở thích triết học.** Feynman gọi thẳng là *"disease"*. Trực giác triết học về việc tự nhiên "nên" thế nào chưa bao giờ đúng.
- **Nhầm "tác dụng tối thiểu" với mục đích luận.** Hạt không "muốn" tiết kiệm gì cả. Nguyên lý này là hệ quả toán học của giao thoa biên độ lượng tử — các đường lệch khỏi đường tối ưu triệt tiêu lẫn nhau.
- **Tưởng dạng trường chỉ là mẹo tính toán.** Trường mang năng lượng, mang động lượng, truyền với tốc độ hữu hạn. Trong thuyết tương đối, trường là thực thể vật lý.
- **Học một cách duy nhất.** Đây chính là điểm đơn lỗi mà [[Babylonian vs Euclidean Mathematics]] cảnh báo.
- **Quên rằng "tối thiểu" thực ra là "dừng".** Đường đi thật làm tác dụng **dừng** (stationary), có thể là cực tiểu, cực đại hoặc điểm yên ngựa. Feynman nói "least" cho gọn.

## 6. Checklist áp dụng

- [ ] Tôi phát biểu được cả ba cách cho cùng một bài toán?
- [ ] Tôi nói được cách nào cục bộ về không gian, cách nào về thời gian?
- [ ] Tôi giải thích được vì sao dạng lực tức thời chết dưới thuyết tương đối?
- [ ] Tôi biết nguyên lý tác dụng tối thiểu là **hệ quả** của cái gì?
- [ ] Với bài toán tôi đang làm: tôi có ≥2 cách phát biểu tương đương không?

## Tham khảo

- [Messenger Lecture #2](https://www.feynmanlectures.caltech.edu/fml.html#2)
- [The Feynman Lectures, Vol II Ch. 19 — The Principle of Least Action](https://www.feynmanlectures.caltech.edu/II_19.html) — bài giảng hay nhất Feynman từng viết về chủ đề này
- Feynman & Hibbs, *Quantum Mechanics and Path Integrals* (McGraw Hill, 1965) — mối nối giữa cách 3 và cơ học lượng tử
- Landau & Lifshitz, *Mechanics* (Vol 1) — toàn bộ cơ học dựng từ nguyên lý tác dụng tối thiểu

## Liên kết

[[Physical Law vs Mechanism]] · [[Babylonian vs Euclidean Mathematics]] · [[Path Integral Formulation]] · [[Simplicity and Beauty in Physics]] · [[Theorems Beyond Their Derivation]] · [[Predictive Triumphs of Gravitation]] · [[Physics]]
