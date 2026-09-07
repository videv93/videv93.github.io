---
tags: [physics, thermodynamics, statistical-mechanics]
status: evergreen
---
# Entropy and the Second Law

> Entropy **không phải** "sự lộn xộn". Nó là **logarit của số cách sắp xếp vi mô** cho ra cùng một trạng thái vĩ mô. Nắm được định nghĩa đếm này là nắm được toàn bộ nội dung của định luật 2.

$$S = k_B \ln W$$

trong đó $W$ = số vi trạng thái tương ứng với vĩ trạng thái đang xét. Công thức khắc trên bia mộ Boltzmann.

## 1. Vì sao định nghĩa đếm quan trọng hơn ẩn dụ "lộn xộn"

| Câu hỏi | Trả lời bằng "lộn xộn" | Trả lời bằng "đếm vi trạng thái" |
|---|---|---|
| Vì sao entropy tăng? | "Vì mọi thứ có xu hướng lộn xộn" — vòng vo | Vì có **nhiều hơn hẳn** cách để hệ ở trạng thái phổ biến |
| Entropy của phòng bừa bộn? | "Cao" | **Không định nghĩa được** cho tới khi bạn nói vĩ trạng thái là gì |
| Có ngoại lệ không? | "Không" | **Có** — chỉ là hiếm đến mức không quan sát được |
| Bao nhiêu? | Không có số | Tính được, ra J/K |

Ví dụ cụ thể: 100 đồng xu. Vĩ trạng thái "50 ngửa" có $\binom{100}{50} \approx 10^{29}$ vi trạng thái. Vĩ trạng thái "100 ngửa" có đúng **1**. Không có lực nào ngăn 100 mặt ngửa; chỉ là nó ít khả năng hơn $10^{29}$ lần.

Với $10^{23}$ phân tử, tỉ số này lớn đến mức "ít khả năng" trở thành "không bao giờ trong tuổi vũ trụ".

## 2. Định luật 2, ba cách phát biểu

| Cách | Phát biểu |
|---|---|
| **Clausius** | Nhiệt không tự truyền từ vật lạnh sang vật nóng |
| **Kelvin** | Không thể biến toàn bộ nhiệt thành công trong một chu trình |
| **Boltzmann** | Entropy của hệ kín không giảm: $\Delta S \ge 0$ |

Ba cách tương đương. Cách thứ ba là cách giải thích *vì sao* hai cách đầu đúng.

> [!note] Định luật 2 là định luật thống kê, không phải định luật cơ học
> Đây là điểm phân biệt nó với mọi định luật khác trong vault này. Định luật Newton đúng cho **một** hạt. Định luật 2 không có nghĩa gì với một hạt — nó chỉ xuất hiện khi có nhiều hạt đến mức thống kê áp đảo. Feynman gọi entropy tăng không phải một sự bắt buộc mà là một **áp đảo về số lượng**.

## 3. Bánh cóc và chốt hãm — thí nghiệm tưởng tượng của Feynman

Bài giảng nổi tiếng nhất của Feynman về chủ đề này (*Lectures* Vol I Ch. 46), và nó phá một ảo tưởng rất dai:

**Thiết bị.** Một bánh cóc (ratchet) có chốt hãm (pawl) chỉ cho quay một chiều, nối với một cánh quạt nhỏ đặt trong chất khí. Phân tử khí va vào cánh quạt ngẫu nhiên theo mọi hướng — nhưng bánh cóc chỉ cho quay một chiều. Vậy nó sẽ quay đều và **sinh công từ chuyển động nhiệt**. Động cơ vĩnh cửu loại hai.

**Vì sao nó không hoạt động.** Nếu chốt hãm đủ nhỏ để bị va chạm phân tử làm quay, thì **chính chốt hãm cũng chịu chuyển động nhiệt**. Ở cùng nhiệt độ, chốt thỉnh thoảng tự nảy lên và cho bánh trượt ngược — đúng bằng tần suất cần thiết để triệt tiêu.

**Nó *có* hoạt động nếu hai đầu ở nhiệt độ khác nhau** — và khi đó nó chỉ là một động cơ nhiệt bình thường, tuân thủ giới hạn Carnot.

Bài học: **không thể thắng định luật 2 bằng cách khéo léo thiết kế.** Mọi cơ chế "lọc" chuyển động nhiệt đều tự chịu chuyển động nhiệt.

Cùng bài học áp dụng cho **con quỷ Maxwell**: con quỷ phải *đo* và *ghi nhớ* trạng thái phân tử, và việc xoá bộ nhớ đó tốn entropy đúng bằng phần nó tiết kiệm được (nguyên lý Landauer).

## 4. Cạm bẫy

> [!warning] "Sự sống vi phạm định luật 2"
> Sinh vật giảm entropy cục bộ — bằng cách **tăng entropy môi trường** nhiều hơn. Trái Đất không phải hệ kín; nó nhận photon năng lượng cao từ Mặt Trời và thải nhiều photon năng lượng thấp hơn ra không gian. Cân entropy tổng vẫn tăng.

- **Quên điều kiện hệ kín.** Lỗi phổ biến nhất, giống hệt [[The Great Conservation Principles]].
- **Nhầm entropy với "thông tin bị mất".** Có liên hệ (entropy Shannon), nhưng dùng lẫn lộn thì sai. Entropy nhiệt động có đơn vị J/K.
- **Coi $\Delta S \ge 0$ là tuyệt đối.** Nó là phát biểu thống kê. Thăng giáng làm entropy giảm tạm thời, và ở hệ nhỏ điều đó **đo được** (fluctuation theorems, Evans & Searles 1994).
- **Nhầm entropy với năng lượng.** Năng lượng bảo toàn; entropy tăng. Xem [[Conservation of Energy]] mục 4.
- **Tưởng định luật 2 giải thích chiều thời gian.** Nó cần giả thuyết quá khứ. Xem [[The Distinction of Past and Future]].

## 5. Checklist áp dụng

- [ ] Tôi định nghĩa được entropy bằng đếm vi trạng thái, không dùng từ "lộn xộn"?
- [ ] Với bài toán đang xét: **vĩ trạng thái** là gì, và **vi trạng thái** là gì?
- [ ] Hệ có kín không? Nếu không, cái gì đi qua biên?
- [ ] Tôi giải thích được vì sao bánh cóc của Feynman không sinh công?
- [ ] Tôi phân biệt được "vi phạm định luật 2" và "thăng giáng thống kê ở hệ nhỏ"?

## Tham khảo

- [The Feynman Lectures, Vol I Ch. 46 — Ratchet and Pawl](https://www.feynmanlectures.caltech.edu/I_46.html) — **nguồn của thí nghiệm bánh cóc**
- [The Feynman Lectures, Vol I Ch. 44 — The Laws of Thermodynamics](https://www.feynmanlectures.caltech.edu/I_44.html)
- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 5
- Feynman, *Statistical Mechanics: A Set of Lectures* (W. A. Benjamin, 1972). ISBN 0-8053-2509-3
- Landauer, "Irreversibility and Heat Generation in the Computing Process", *IBM J. Res. Dev.* 5 (1961) — lời giải cho con quỷ Maxwell

## Liên kết

[[The Distinction of Past and Future]] · [[The Arrow of Time]] · [[Conservation of Energy]] · [[The Great Conservation Principles]] · [[Feynman and Computation]] · [[Physics]]
