---
tags: [uiux, component, form]
status: growing
---
# Slider & Picker

> Hai họ component để chọn **giá trị trong một dải liên tục** hoặc **một điểm trong tập có cấu trúc** (ngày, giờ, màu).

## 1. Slider
**Dùng khi:** giá trị tương đối quan trọng hơn giá trị chính xác — âm lượng, độ sáng, khoảng giá, mức lọc.
**Không dùng khi:** cần con số chính xác (tuổi, số tiền cụ thể) → dùng input số.

**Quy tắc thiết kế:**
- Luôn **hiện giá trị hiện tại** bằng số, cạnh hoặc trên đầu kéo (thumb).
- Hiện **giá trị min/max** ở hai đầu.
- Đầu kéo tối thiểu **44px** vùng chạm; track có thể mỏng.
- **Cho phép bấm vào track** để nhảy tới vị trí đó, không bắt kéo.
- **Bước (step)** hợp lý — slider giá 0–100 triệu mà bước 1đ là vô nghĩa.
- **Range slider (2 đầu)**: xử lý trường hợp hai đầu chạm nhau; cho phép vượt qua nhau hoặc chặn — quyết định rõ và nhất quán.
- Kèm ô nhập số song song cho người muốn chính xác (pattern tốt cho bộ lọc giá).
- Bàn phím: ←/→ đổi 1 bước, PageUp/PageDown đổi bước lớn, Home/End về min/max.

## 2. Date Picker
Component khó nhất trong nhóm này.
- **Luôn cho phép gõ tay** bên cạnh lịch. Người dùng nhập ngày sinh 1985 không muốn bấm lùi 40 năm.
- Nêu rõ **định dạng mong đợi**: `dd/mm/yyyy`. Lưu ý người Việt dùng `dd/mm`, khác Mỹ `mm/dd` — mơ hồ ở đây gây lỗi thật.
- **Chặn ngày không hợp lệ** (ngày quá khứ cho lịch hẹn, ngày tương lai cho ngày sinh) — *error prevention* tốt hơn *error message*.
- Đánh dấu **hôm nay** rõ ràng, tách biệt với **ngày đang chọn**.
- **Chọn khoảng ngày**: hiện 2 tháng cạnh nhau, tô sáng khoảng đang chọn, có preset ("7 ngày qua", "Tháng này").
- Điều hướng nhanh: dropdown chọn tháng/năm, không chỉ mũi tên ‹ ›.
- Mobile: cân nhắc dùng picker native.

## 3. Time Picker
- Rõ ràng 12h (AM/PM) hay 24h — theo locale, mặc định VN là 24h.
- Bước phút hợp ngữ cảnh: đặt lịch hẹn thì 15/30 phút, không phải từng phút.
- Hiện **múi giờ** khi có người dùng ở nhiều nơi.
- Combo tốt nhất cho đặt lịch: chọn ngày → hiện **các khung giờ còn trống** dạng chip, không phải picker giờ tự do.

## 4. Các picker khác
- **Color picker** — luôn kèm ô nhập HEX; hiện các màu đã dùng gần đây; hiện preview trên nền thật.
- **Rating (sao)** — vùng chạm đủ lớn, hover preview, cho phép bỏ chọn.
- **Stepper (− 1 +)** — số lượng nhỏ (1–20); >20 thì cho nhập tay. Nút − phải disabled ở giá trị min và giải thích được.

## 5. Accessibility
- Slider: `role="slider"` với `aria-valuemin/max/now/text`.
- Date picker: dialog phải bẫy focus, đóng bằng Esc, điều hướng lưới ngày bằng phím mũi tên.
- Giá trị phải đọc được bằng screen reader, không chỉ nhìn thấy.

## 6. Checklist
- [ ] Giá trị hiện tại có hiển thị bằng số không?
- [ ] Người dùng có gõ tay được không (thay vì bắt buộc kéo/bấm lịch)?
- [ ] Định dạng ngày có ghi rõ không?
- [ ] Ngày/giá trị không hợp lệ đã bị chặn trước chưa?
- [ ] Điều khiển được bằng bàn phím không?
- [ ] Bước nhảy có hợp lý với ngữ cảnh không?

## Tham khảo
- NN/g — *Slider Design Rules*: https://www.nngroup.com/articles/gui-slider-controls/
- NN/g — *Date-Input Form Fields*: https://www.nngroup.com/articles/date-input/
- Baymard — nghiên cứu date picker trong booking: https://baymard.com/blog/date-picker-usability
- WAI-ARIA APG — *Slider* & *Date Picker Dialog*: https://www.w3.org/WAI/ARIA/apg/patterns/

## Liên kết
[[Selection Controls]] · [[Input & Form]] · [[Accessibility]] · [[UIUX]]
