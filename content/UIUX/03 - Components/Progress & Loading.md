---
tags: [uiux, component, feedback]
status: growing
---
# Progress & Loading

> Người dùng chịu được chờ đợi. Cái họ không chịu được là **không biết chuyện gì đang xảy ra**.
> Nielsen heuristic #1: *Visibility of system status*.

## 1. Ngưỡng thời gian (Nielsen)
| Thời gian | Cảm nhận | Cần gì |
|---|---|---|
| **< 0.1s** | Tức thì | Không cần chỉ báo |
| **< 1s** | Liền mạch, có nhận ra độ trễ | Đổi trạng thái nút là đủ |
| **1–10s** | Cần giữ chú ý | Spinner / skeleton |
| **> 10s** | Người dùng sẽ đi làm việc khác | Progress bar có %, ước tính thời gian, thông báo khi xong |

**Doherty Threshold**: phản hồi dưới **400ms** giữ người dùng ở trạng thái tập trung.

## 2. Chọn đúng chỉ báo
- **Skeleton screen** — khi biết trước cấu trúc nội dung (danh sách, card, trang chi tiết). Tốt nhất cho cảm nhận về tốc độ vì mắt đã "thấy" trang trước khi dữ liệu về. Skeleton phải **khớp kích thước thật** để không gây layout shift.
- **Spinner** — thao tác ngắn, không rõ cấu trúc kết quả. Dùng dè.
- **Progress bar xác định (%)** — khi biết tiến độ: upload, xuất file, cài đặt.
- **Progress bar không xác định** — biết đang chạy nhưng không biết bao lâu.
- **Optimistic UI** — hiện kết quả ngay như thể đã thành công, âm thầm gọi API, hoàn nguyên + báo lỗi nếu thất bại. Hợp cho like, đánh dấu xong, gửi tin nhắn.
- **Inline loading** — chỉ vùng bị ảnh hưởng loading, không phải cả trang. Gần như luôn tốt hơn full-page spinner.

## 3. Progress tracker (nhiều bước)
Cho quy trình nhiều bước: checkout, onboarding, đăng ký dài.
- Hiện **bước hiện tại / tổng số bước** ("Bước 2/4").
- Nhãn bước phải mô tả nội dung, không phải "Bước 2".
- Cho phép **quay lại** bước trước mà không mất dữ liệu.
- Đánh dấu bước đã hoàn thành bằng ✓ (không chỉ bằng màu).
- **Goal-Gradient Effect**: hiện tiến độ làm tăng tỉ lệ hoàn thành. Có thể "tặng" bước đầu ("Đã hoàn thành 1/4" ngay khi bắt đầu).
- Ngang (desktop) hay dọc (mobile, nhiều bước).

## 4. Nguyên tắc thực chiến
- **Đừng để layout nhảy.** Chừa sẵn không gian cho nội dung sắp tải (đây là nguyên nhân chính của điểm CLS xấu).
- **Khoá nút sau khi bấm** để tránh submit hai lần, nhưng giữ nguyên kích thước nút.
- **Với thao tác dài, cho phép làm việc khác** hoặc chạy nền + thông báo khi xong.
- **Cho phép huỷ** thao tác dài.
- Progress bar **không được lùi** hoặc dừng ở 99% mãi — thà chậm đều còn hơn nhanh rồi treo.
- **Chờ tối thiểu ~300ms** trước khi hiện spinner — nếu dữ liệu về nhanh, spinner nhấp nháy còn khó chịu hơn.
- Với chờ dài, đổi thông điệp theo thời gian ("Đang tải dữ liệu…" → "Sắp xong rồi…") để cảm giác có tiến triển.

## 5. Accessibility
- `role="progressbar"` với `aria-valuenow/min/max`.
- Vùng nội dung đang tải: `aria-busy="true"`.
- Thông báo hoàn thành qua `role="status"` (lịch sự) hoặc `role="alert"` (khẩn).
- Tôn trọng `prefers-reduced-motion` — spinner quay liên tục có thể gây khó chịu → [[Motion & Animation]].

## 6. Checklist
- [ ] Mọi thao tác > 1s có chỉ báo không?
- [ ] Skeleton có đúng kích thước nội dung thật không?
- [ ] Layout có nhảy khi dữ liệu về không?
- [ ] Bấm nút hai lần có tạo hai bản ghi không?
- [ ] Thao tác dài có huỷ được không?
- [ ] Đã thiết kế trạng thái *tải thất bại* chưa? → [[Empty & Error States]]

## Tham khảo
- NN/g — *Response Times: The 3 Important Limits*: https://www.nngroup.com/articles/response-times-3-important-limits/
- NN/g — *Progress Indicators Make a Slow System Less Insufferable*: https://www.nngroup.com/articles/progress-indicators/
- NN/g — *Skeleton Screens*: https://www.nngroup.com/articles/skeleton-screens/
- Material Design 3 — *Progress indicators*: https://m3.material.io/components/progress-indicators/overview
- web.dev — *Cumulative Layout Shift*: https://web.dev/articles/cls

## Liên kết
[[Empty & Error States]] · [[Micro-interactions]] · [[Laws of UX]] · [[UIUX]]
