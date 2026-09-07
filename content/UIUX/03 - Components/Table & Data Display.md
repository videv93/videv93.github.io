---
tags: [uiux, component, data]
status: growing
---
# Table & Data Display

> Bảng dùng khi người dùng cần **so sánh** và **quét theo cột**. Nếu chỉ cần duyệt thì [[Card]] tốt hơn.

## 1. Nguyên tắc trình bày bảng
- **Căn lề theo kiểu dữ liệu**: chữ căn **trái**, số căn **phải**, ngày căn trái (hoặc phải nếu cùng định dạng), tiêu đề cột căn cùng chiều với dữ liệu.
- **Số dùng tabular figures** (`font-variant-numeric: tabular-nums`) để các chữ số thẳng cột.
- **Đơn vị** đặt ở tiêu đề cột, không lặp ở từng ô: `Giá (đ)` thay vì "250.000đ" ×100 dòng.
- **Ít đường kẻ nhất có thể** — thường chỉ cần đường kẻ ngang nhạt. Zebra striping chỉ hữu ích với bảng rất rộng.
- **Chiều cao dòng**: compact (32px) cho phân tích, comfortable (48px+) cho thao tác.
- **Sticky header** (và sticky cột đầu nếu cuộn ngang).
- **Cắt bớt thông minh**: ellipsis + tooltip đầy đủ, hoặc mở rộng dòng.

## 2. Tính năng cần có theo quy mô
| Số dòng | Cần |
|---|---|
| < 25 | Hiển thị hết, sắp xếp cơ bản |
| 25–500 | Sắp xếp + tìm kiếm + phân trang |
| 500–10k | + Bộ lọc, chọn cột hiển thị, chọn nhiều dòng |
| > 10k | + Lọc phía server, virtual scroll, xuất file |

**Sắp xếp**: chỉ báo rõ cột nào đang sắp và theo chiều nào; nhớ trạng thái khi quay lại.
**Lọc**: hiện các bộ lọc đang áp dụng dưới dạng chip bỏ được; luôn có "Xoá tất cả bộ lọc".
**Phân trang vs cuộn vô hạn**: bảng dữ liệu → phân trang (biết mình ở đâu, quay lại được). Feed nội dung → cuộn vô hạn.
**Hành động hàng loạt**: checkbox chọn dòng, thanh hành động xuất hiện khi có mục được chọn, hiện rõ "Đã chọn 12".

## 3. Bảng trên mobile
Bốn cách xử lý, chọn theo nhu cầu:
1. **Cuộn ngang** với cột đầu cố định — giữ nguyên cấu trúc bảng.
2. **Chuyển thành card list** — mỗi dòng thành một card, nhãn cột thành label. Tốt nhất khi cần thao tác.
3. **Ưu tiên cột** — chỉ hiện 2–3 cột quan trọng, mở rộng dòng để xem thêm.
4. **Xoay bảng** — chỉ hợp khi rất ít dòng.

## 4. Hiển thị số liệu khác
- **Stat card / KPI** — số lớn + nhãn + so sánh kỳ trước (mũi tên + %). Luôn nêu **kỳ so sánh**.
- **Biểu đồ**: cột cho so sánh hạng mục, đường cho xu hướng theo thời gian, tròn chỉ khi ≤5 phần và tổng = 100%. Trục Y **phải bắt đầu từ 0** với biểu đồ cột.
- **Badge / tag trạng thái** — kèm icon hoặc chữ, không chỉ màu.
- **Sparkline** trong bảng để thấy xu hướng nhanh.
- Luôn kèm **trạng thái rỗng** và **trạng thái đang tải (skeleton)** cho mọi biểu đồ/bảng.

## 5. Accessibility
- Dùng `<table>` thật với `<th scope="col|row">` và `<caption>`.
- Không dùng div-grid cho dữ liệu bảng nếu không tự cài đầy đủ `role="grid"`.
- Nút sắp xếp: `aria-sort="ascending|descending|none"`.
- Đảm bảo bảng cuộn ngang được bằng bàn phím (container có `tabindex="0"`).

## 6. Checklist
- [ ] Số có căn phải và thẳng cột không?
- [ ] Người dùng có biết đang sắp theo cột nào không?
- [ ] Bộ lọc đang áp dụng có nhìn thấy và bỏ được không?
- [ ] Có cột nào xoá đi mà không ai nhớ không?
- [ ] Trên mobile bảng này dùng được không?
- [ ] Đã có trạng thái rỗng / đang tải / lỗi chưa?
- [ ] Trạng thái (badge) có phân biệt được khi in đen trắng không?

## Tham khảo
- NN/g — *Data Tables: Four Major User Tasks*: https://www.nngroup.com/articles/data-tables/
- Material Design — *Data tables*: https://m2.material.io/components/data-tables
- Andrew Coyle — *Design Better Data Tables*: https://uxdesign.cc/design-better-data-tables-4ecc99d23356
- Carbon Design System — *Data table*: https://carbondesignsystem.com/components/data-table/usage/
- Edward Tufte — *The Visual Display of Quantitative Information* (nền tảng về data-ink ratio)

## Liên kết
[[Card]] · [[Layout & Composition]] · [[Empty & Error States]] · [[Typography]] · [[UIUX]]
