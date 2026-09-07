---
tags: [probability, foundations]
status: evergreen
---
# Sample Space & Events

> Bước khó nhất của mọi bài xác suất không phải là tính, mà là quyết định *cái gì được coi là một kết quả*. Chọn sai sample space thì mọi phép tính sau đều vô nghĩa.

## 1. Ba khái niệm

| Khái niệm | Ký hiệu | Định nghĩa | Ví dụ (tung 2 xúc xắc) |
|---|---|---|---|
| **Sample space** | $S$ | Tập **tất cả** kết quả có thể của một thí nghiệm | 36 cặp $(i,j)$ |
| **Outcome** | $s \in S$ | Một kết quả cụ thể, không chia nhỏ được nữa | $(3,5)$ |
| **Event** | $A \subseteq S$ | Một **tập con** của $S$ | "tổng bằng 8" = $\{(2,6),(3,5),(4,4),(5,3),(6,2)\}$ |

Điểm mấu chốt: **event là tập hợp**, nên toàn bộ ngôn ngữ tập hợp dùng được ngay.

## 2. Từ điển: tiếng Việt ↔ tập hợp

| Câu nói | Ký hiệu |
|---|---|
| A **và** B cùng xảy ra | $A \cap B$ |
| A **hoặc** B xảy ra | $A \cup B$ |
| A **không** xảy ra | $A^c$ |
| A xảy ra **kéo theo** B xảy ra | $A \subseteq B$ |
| A và B **không thể cùng** xảy ra (disjoint / mutually exclusive) | $A \cap B = \emptyset$ |
| **Ít nhất một** trong $A_1,\dots,A_n$ | $\bigcup_i A_i$ |
| **Tất cả** $A_1,\dots,A_n$ | $\bigcap_i A_i$ |
| **Không cái nào** xảy ra | $\left(\bigcup_i A_i\right)^c = \bigcap_i A_i^c$ |

Dòng cuối chính là **De Morgan** — và nó là kỹ thuật giải bài thường dùng nhất: *"ít nhất một"* hầu như luôn nên tính qua phần bù.

## 3. Nguyên tắc chọn sample space

1. **Các outcome phải loại trừ nhau và phủ hết** (exhaustive + mutually exclusive). Thiếu một outcome là sai; đếm trùng một outcome cũng sai.
2. **Chọn sample space sao cho các outcome đồng khả năng**, nếu định dùng [[Naive Definition of Probability]]. Ví dụ tung 2 đồng xu: $S=\{HH,HT,TH,TT\}$ (đồng khả năng) chứ **không** phải $\{0,1,2\}$ mặt ngửa (không đồng khả năng — sai lầm nổi tiếng của d'Alembert).
3. **Phân biệt được/không phân biệt phải nhất quán.** Nếu coi hai xúc xắc là phân biệt được thì phải giữ vậy suốt bài.
4. **Sample space có thể vô hạn.** Đếm được (số lần tung đến khi ra mặt ngửa) hoặc không đếm được (thời gian chờ) — cái sau cần độ đo, không đếm được nữa.
5. **Sample space nhỏ nhất mà vẫn diễn tả được câu hỏi là tốt nhất.** Đừng mô hình hoá thừa chi tiết.

## 4. Cạm bẫy hay gặp

- **Trộn hai sample space trong một bài.** Ví dụ: đếm tay bài theo "tổ hợp không thứ tự" nhưng lại đếm biến cố theo "có thứ tự". Tỉ số ra sai.
- **Cho rằng cái gì có 2 khả năng thì mỗi khả năng 50%.** "Ngày mai hoặc mưa hoặc không" — không đồng khả năng.
- **Quên rằng outcome phải là "nguyên tử".** Nếu một "kết quả" còn chia nhỏ được thành các trường hợp không đồng khả năng thì nó là event, không phải outcome.
- **Bỏ sót outcome ở biên**: 0 lần, tất cả, tập rỗng.
- Với $S$ vô hạn không đếm được, **không thể gán xác suất cho mọi tập con** — cần $\sigma$-algebra. Ở mức Stat 110 có thể bỏ qua, nhưng cần biết là nó tồn tại.

## 5. Checklist trước khi tính bất cứ thứ gì
- [ ] Đã viết ra $S$ (hoặc mô tả được $|S|$) chưa?
- [ ] Các outcome có đồng khả năng không? Nếu không, đã bỏ [[Naive Definition of Probability]] chưa?
- [ ] Event cần tính đã viết được dưới dạng tập hợp chưa?
- [ ] Câu hỏi có chữ "ít nhất" không? → cân nhắc phần bù.
- [ ] "Được phân biệt / không phân biệt" có nhất quán giữa tử số và mẫu số không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, Ch.1: http://probabilitybook.net
- Stat 110 Lecture 1: https://www.youtube.com/watch?v=KbB0FjPg0mw
- Wikipedia — *Sample space*: https://en.wikipedia.org/wiki/Sample_space
- Wikipedia — *De Morgan's laws*: https://en.wikipedia.org/wiki/De_Morgan%27s_laws

## Liên kết
[[Naive Definition of Probability]] · [[Axioms of Probability]] · [[Properties of Probability]] · [[Random Variable]] · [[Prob&Stats]]
