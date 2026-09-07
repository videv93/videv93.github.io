---
tags: [math, foundations, workflow]
status: evergreen
---
# Reading Mathematics

> Toán không đọc được với tốc độ đọc văn xuôi. Một trang sách analysis tốt tốn một tiếng, và đó là **đúng tốc độ**, không phải dấu hiệu bạn kém.

> [!note] Ghi chú nguồn
> Note này trả lời một câu hỏi mà cả hai nguồn seed đều né: *"học calculus trong một video 5 tiếng"* ngầm giả định toán đọc được như văn; `mathematics-roadmap.jpg` ngầm giả định ngược lại — nó xếp ~40 cuốn sách thành một đồ thị nhiều năm. Xem [[Computational vs Rigorous Mathematics]].

## 1. Bốn loại văn bản, bốn tốc độ

| Loại | Tốc độ | Cách đọc |
|---|---|---|
| **Định nghĩa** | Chậm nhất | Đọc lượng từ từng cái một. Viết lại bằng ký hiệu. Nghĩ **một ví dụ** và **một phản ví dụ**. |
| **Định lý** | Chậm | Tách giả thiết / kết luận. Hỏi: bỏ giả thiết nào thì định lý sai? Tìm phản ví dụ cho phiên bản yếu hơn. |
| **Chứng minh** | Vừa | Đọc lần 1 lấy **chiến lược** ([[Proof Techniques]]). Lần 2 kiểm từng bước. |
| **Ví dụ / bài tập giải sẵn** | Nhanh | Che lời giải, tự làm trước. Nếu không tự làm thì gần như không thu được gì. |

## 2. Quy trình đọc một định lý

1. **Đọc phát biểu, gấp sách lại, phát biểu lại bằng lời của mình.** Không làm được ⟹ chưa hiểu, quay lại định nghĩa.
2. **Thử với trường hợp nhỏ nhất.** $n=1$, ma trận $2\times2$, hàm $f(x)=x$.
3. **Tấn công từng giả thiết.** "Nếu $f$ liên tục trên $[a,b]$" — bỏ chữ *đóng* thì sao? Bỏ *liên tục* thì sao? Đây là chỗ [[Extreme Value Theorem]] trở nên có nghĩa thay vì là một câu thần chú.
4. **Đọc chứng minh tìm ý chính**, không phải tìm từng dấu bằng.
5. **Ghi lại đúng một câu**: định lý này cho phép làm được gì mà trước đó không làm được.

## 3. Đọc chủ động vs bị động

| ❌ Bị động | ✅ Chủ động |
|---|---|
| Xem video, gật đầu | Dừng video trước lời giải, tự làm |
| Đọc chứng minh từ đầu tới cuối | Đọc phát biểu → tự thử chứng minh 10 phút → mới đọc |
| Highlight | Viết lại định nghĩa từ trí nhớ |
| "Hiểu rồi" | Giải thích được cho người khác, hoặc viết vào note này |
| Làm bài tập có đáp án ngay dưới | Cách đáp án ít nhất một ngày |

## 4. Vì sao bút và giấy không thay được

Toán là hoạt động **viết**, không phải hoạt động **đọc**. Mọi bước "hiển nhiên" trong sách là một bước tác giả đã viết ra rồi xoá đi. Không viết lại thì bạn đang đọc phần đã bị lược, không đọc phần thật.

Dấu hiệu bạn đang đọc bị động: đọc xong một mục mà tay chưa viết chữ nào.

## 5. Cạm bẫy

1. **Nhầm quen mặt với hiểu.** Xem video lần thứ ba thấy dễ hơn — đó là *fluency illusion*, không phải hiểu thêm.
2. **Bỏ qua ký hiệu lạ.** Một ký hiệu chưa tra là một lỗ hổng sẽ nổ ở chương sau.
3. **Đọc tuyến tính bắt buộc.** Được phép nhảy tới ứng dụng để có động lực, miễn là đánh dấu chỗ nợ.
4. **Đọc quá nhiều nguồn cùng lúc.** Ba cuốn sách mỗi cuốn một ký hiệu ⟹ tốn công dịch hơn học.
5. **Không làm bài tập vì "đã hiểu lý thuyết".** Bài tập là chỗ duy nhất kiểm chứng được điều đó.
6. **Học thuộc công thức mà không biết giả thiết.** Đây chính là failure mode mà [[Computational vs Rigorous Mathematics]] mô tả.

## 6. Checklist áp dụng
- [ ] Đã phát biểu lại định nghĩa/định lý bằng lời của mình chưa?
- [ ] Đã có **một ví dụ** và **một phản ví dụ** cho định nghĩa vừa đọc chưa?
- [ ] Đã thử bỏ từng giả thiết xem định lý còn đúng không?
- [ ] Đã tự thử chứng minh trước khi đọc chứng minh chưa?
- [ ] Tay có viết gì trong 20 phút vừa rồi không?
- [ ] Có ký hiệu nào trong trang này mình chưa định nghĩa được không?
- [ ] Sau khi đóng sách, còn nhớ định lý này *dùng để làm gì* không?

## Tham khảo
- Ashley Reiter (MIT) — *Writing a Research Paper in Mathematics* / how to read math: https://web.mit.edu/jrickert/www/mathadvice.html
- Terence Tao — *There's more to mathematics than rigour and proofs*: https://terrytao.wordpress.com/career-advice/theres-more-to-mathematics-than-rigour-and-proofs/
- Polya — *How to Solve It*: https://press.princeton.edu/books/paperback/9780691164076/how-to-solve-it
- Su (Harvey Mudd) — *Teaching and learning tips*: https://www.francissu.com/post/teaching-tidbits

## Liên kết
[[Proof Techniques]] · [[Mathematical Logic Basics]] · [[Computational vs Rigorous Mathematics]] · [[Mathematics Roadmap]] · [[Math]]
