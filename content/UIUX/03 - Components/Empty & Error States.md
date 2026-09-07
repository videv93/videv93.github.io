---
tags: [uiux, component, states]
status: growing
---
# Empty & Error States

> Những màn hình mà designer hay quên nhưng người dùng gặp nhiều nhất. Thiết kế tốt ở đây tạo khác biệt lớn hơn thiết kế đẹp ở happy path.

## 1. Ba loại trạng thái rỗng
**a. First use (chưa có gì)** — cơ hội onboarding tốt nhất.
- Giải thích *vùng này để làm gì*
- Một CTA rõ ràng để tạo mục đầu tiên
- Có thể kèm dữ liệu mẫu hoặc template
- ❌ "Không có dữ liệu" ✅ "Chưa có dự án nào. Tạo dự án đầu tiên để bắt đầu theo dõi công việc. [+ Tạo dự án]"

**b. User cleared (đã làm hết)** — ăn mừng, không để trống.
- "Tuyệt vời, không còn việc nào 🎉"

**c. No results (tìm không thấy)** — giúp thoát khỏi ngõ cụt.
- Nhắc lại từ khoá đã tìm
- Gợi ý sửa chính tả, bỏ bớt bộ lọc
- Nút **Xoá bộ lọc**
- Đề xuất nội dung liên quan

## 2. Thông báo lỗi
Công thức: **Chuyện gì xảy ra → Vì sao → Làm gì tiếp theo.**

| Nguyên tắc | ❌ | ✅ |
|---|---|---|
| Nói ngôn ngữ người dùng | "Error 500: Internal Server Error" | "Không lưu được. Vui lòng thử lại sau ít phút." |
| Không đổ lỗi cho người dùng | "Bạn nhập sai mật khẩu" | "Mật khẩu chưa đúng. Thử lại hoặc [đặt lại mật khẩu]." |
| Có lối thoát | "Không tải được dữ liệu." | "Không tải được dữ liệu. [Thử lại]" |
| Cụ thể | "Thông tin không hợp lệ" | "Số điện thoại cần 10 chữ số." |
| Giữ được công sức | Xoá sạch form | Giữ nguyên dữ liệu đã nhập |

**Đặt lỗi đúng chỗ:** lỗi của một trường → ngay dưới trường đó. Lỗi của cả trang → banner ở đầu vùng nội dung. Lỗi hệ thống → trang lỗi riêng.

**Với người dùng kỹ thuật**, cho phép mở rộng xem chi tiết kỹ thuật + mã lỗi để gửi hỗ trợ — nhưng đừng để nó là thứ đầu tiên nhìn thấy.

## 3. Phân loại mức độ
| Mức | Màu | Kiểu hiển thị |
|---|---|---|
| **Info** | Xanh dương | Inline banner, toast |
| **Success** | Xanh lá | Toast, tự biến mất |
| **Warning** | Vàng/cam | Inline, không tự biến mất |
| **Error** | Đỏ | Inline hoặc banner, không tự biến mất |
| **Critical** | Đỏ + modal | Chỉ khi phải chặn người dùng → [[Modal & Dialog]] |

**Toast/snackbar**: chỉ cho thông báo không quan trọng; ≥5s cho toast có hành động; luôn có cách đóng; không dùng toast cho lỗi cần xử lý (nó biến mất mất).

## 4. Trạng thái offline / mất kết nối
- Báo rõ đang offline, phân biệt với "đang tải".
- Cho phép xem dữ liệu đã cache.
- Xếp hàng thao tác và tự đồng bộ khi có mạng lại.
- Đừng để người dùng gõ xong một form dài rồi mới báo mất mạng.

## 5. Trang lỗi toàn cục
- **404** — nêu rõ trang không tồn tại, kèm ô tìm kiếm + link về trang chủ + link tới các trang phổ biến.
- **500** — trấn an rằng lỗi thuộc về hệ thống, cho nút thử lại, cho đường liên hệ hỗ trợ.
- **403** — giải thích vì sao không có quyền và cách xin quyền.

## 6. Checklist
- [ ] Mỗi danh sách/bảng đã có trạng thái rỗng riêng chưa?
- [ ] Trạng thái rỗng có CTA không?
- [ ] Mọi thông báo lỗi có nói được "làm gì tiếp theo" không?
- [ ] Có mã lỗi kỹ thuật nào lộ ra cho người dùng thường không?
- [ ] Lỗi có kèm icon, không chỉ màu đỏ chứ?
- [ ] Lỗi có được screen reader thông báo (`role="alert"`) không?
- [ ] Kết quả tìm kiếm rỗng có nút xoá bộ lọc không?

## Tham khảo
- NN/g — *Error Message Guidelines*: https://www.nngroup.com/articles/error-message-guidelines/
- NN/g — *Empty States in Application Design*: https://www.nngroup.com/articles/empty-state-interface-design/
- NN/g — *Indicators, Validations, and Notifications*: https://www.nngroup.com/articles/indicators-validations-notifications/
- Shopify Polaris — *Error messages*: https://polaris.shopify.com/content/error-messages
- Emptystat.es / Pttrns — bộ sưu tập empty state thực tế

## Liên kết
[[Input & Form]] · [[Progress & Loading]] · [[UX Writing]] · [[Modal & Dialog]] · [[UIUX]]
