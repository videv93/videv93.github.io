---
tags: [uiux, foundation, psychology]
status: growing
---
# Laws of UX — Tâm lý học thiết kế

> Các định luật giải thích **vì sao** người dùng hành động như vậy. Dùng để tranh luận thiết kế bằng lý lẽ thay vì cảm tính.

## 1. Về tốc độ & thao tác
- **Fitts's Law** — Thời gian chạm một mục tiêu tỉ lệ thuận với khoảng cách và tỉ lệ nghịch với kích thước.
  → Nút chính phải **to** và **gần ngón cái**; nút nguy hiểm nên nhỏ và ở xa. Vùng chạm tối thiểu 44×44pt (iOS) / 48×48dp (Android).
- **Steering Law** — Đi qua "đường hầm" hẹp thì chậm và dễ trượt. → Tránh cascade menu nhiều tầng, dropdown quá hẹp.
- **Doherty Threshold** — Phản hồi dưới **400ms** giữ người dùng ở trạng thái tập trung. → Dùng skeleton/optimistic UI. Xem [[Progress & Loading]].

## 2. Về trí nhớ & quyết định
- **Hick's Law** — Càng nhiều lựa chọn, quyết định càng lâu (log theo số lựa chọn). → Giới hạn lựa chọn, dùng **progressive disclosure**, gợi ý "phổ biến nhất".
- **Miller's Law** — Trí nhớ ngắn hạn giữ được khoảng **7±2** (thực tế an toàn: 4–5) đơn vị. → Chia nhỏ (chunking): số điện thoại `0912 345 678`.
- **Cognitive Load** — Tổng tải nhận thức = intrinsic + extraneous. Ta chỉ có thể cắt phần *extraneous* (rối do thiết kế).
- **Zeigarnik Effect** — Việc dở dang bị nhớ dai hơn. → Thanh tiến trình hồ sơ "hoàn thành 60%".

## 3. Về nhận thức & thẩm mỹ
- **Jakob's Law** — Người dùng dành phần lớn thời gian ở *các trang khác*, nên họ muốn trang của bạn hoạt động **giống những trang kia**. → Đừng sáng tạo ở chỗ điều hướng, giỏ hàng, form đăng nhập.
- **Aesthetic–Usability Effect** — Giao diện đẹp được cảm nhận là dễ dùng hơn, và người dùng khoan dung hơn với lỗi nhỏ. Mặt trái: nó *che giấu* vấn đề khả dụng khi test.
- **Von Restorff (Isolation) Effect** — Vật khác biệt nhất sẽ được nhớ. → Chỉ một CTA nổi bật mỗi màn hình.
- **Serial Position Effect** — Nhớ đầu và cuối danh sách rõ nhất. → Đặt mục quan trọng ở đầu và cuối nav.
- **Peak–End Rule** — Người ta đánh giá trải nghiệm qua **đỉnh cảm xúc** và **kết thúc**. → Đầu tư vào màn hình thành công, onboarding, và thông báo lỗi.
- **Law of Prägnanz** — Não chọn cách diễn giải đơn giản nhất của một hình.

## 4. Về hành vi hệ thống
- **Postel's Law (Robustness)** — Khoan dung với đầu vào, nghiêm ngặt với đầu ra. → Chấp nhận `0912345678`, `+84 912 345 678`; tự chuẩn hoá thay vì báo lỗi.
- **Tesler's Law (Conservation of Complexity)** — Mỗi hệ thống có một lượng phức tạp không thể loại bỏ; câu hỏi chỉ là **ai gánh** — người dùng hay hệ thống. Hãy để hệ thống gánh.
- **Occam's Razor** — Giữa nhiều thiết kế thoả mãn cùng yêu cầu, chọn cái ít thành phần nhất.
- **Parkinson's Law** — Công việc giãn nở lấp đầy thời gian cho phép. → Rút ngắn quy trình bằng autofill, giá trị mặc định thông minh.
- **Goal-Gradient Effect** — Càng gần đích càng nỗ lực. → Thẻ tích điểm tặng sẵn 2 ô đầu.

## 5. Cách dùng trong thực tế
Khi review thiết kế, thay vì nói *"nhìn rối"*, hãy nói:
> "Dropdown này có 18 lựa chọn ngang hàng — theo **Hick's Law** thời gian quyết định tăng đáng kể. Đề xuất gom thành 4 nhóm và ghim 3 mục hay dùng lên đầu."

## Tham khảo
- **Laws of UX** (Jon Yablonski) — trang tra cứu chính: https://lawsofux.com/
- Sách *Laws of UX* — Jon Yablonski, O'Reilly
- NN/g — *Hick's Law*: https://www.nngroup.com/articles/hicks-law/
- NN/g — *Jakob's Law of Internet UX*: https://www.nngroup.com/videos/jakobs-law-internet-ux/
- Susan Weinschenk — *100 Things Every Designer Needs to Know About People*

## Liên kết
[[Design Principles]] · [[Nielsen Heuristics]] · [[Button]] · [[UIUX]]
