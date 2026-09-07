---
tags: [uiux, component, form]
status: growing
---
# Input & Form

> Form là nơi người dùng bỏ nhiều công sức nhất và bỏ cuộc nhiều nhất. Mỗi trường bạn thêm vào là một lý do để họ rời đi.

## 1. Cấu trúc một trường input
```
[Label]                      ← luôn hiển thị, phía trên
[  Ô nhập    ] [icon]        ← chiều cao ≥ 44px
[Helper text hoặc thông báo lỗi]
```
- **Label luôn ở trên, luôn hiển thị.** Đừng dùng placeholder thay label — placeholder biến mất khi gõ, người dùng quên mình đang điền gì, và tương phản thường không đạt chuẩn.
- **Placeholder** chỉ để làm ví dụ định dạng: `VD: 0912 345 678`.
- **Helper text** đặt trước khi gõ (yêu cầu mật khẩu), không phải sau khi lỗi.
- Độ rộng ô nên **gợi ý độ dài dữ liệu**: ô mã bưu điện ngắn, ô địa chỉ dài.

## 2. Loại input và khi nào dùng
| Loại | Dùng khi |
|---|---|
| Text field | Dữ liệu tự do ngắn |
| Textarea | Nội dung nhiều dòng, cho phép resize |
| Number / Stepper | Số nhỏ, tăng giảm từng bước |
| Date picker | Ngày — nhưng luôn cho phép **gõ tay** song song |
| Select / Dropdown | 5–15 lựa chọn → [[Selection Controls]] |
| Combobox / Autocomplete | >15 lựa chọn, có thể tìm |
| File upload | Kéo thả + bấm chọn, hiện tiến trình và huỷ được |
| Password | Có nút hiện/ẩn mật khẩu |
| Search | Icon kính lúp, nút xoá nhanh, gợi ý |

## 3. Validation
- **Thời điểm**: validate khi **rời khỏi trường (on blur)**, không phải khi đang gõ từng ký tự. Ngoại lệ: chỉ báo độ mạnh mật khẩu và kiểm tra tên đăng nhập trùng thì nên real-time.
- **Sau khi đã lỗi một lần**, chuyển sang validate real-time để người dùng thấy mình đã sửa đúng.
- **Thông báo lỗi** đặt ngay dưới trường, màu đỏ **+ icon** (không chỉ màu), nói rõ *sai gì* và *sửa thế nào*:
  - ❌ "Email không hợp lệ"
  - ✅ "Email cần có dấu @, ví dụ: ten@vidu.com"
- Khi submit lỗi: cuộn tới trường lỗi đầu tiên và focus vào đó; hiện tổng kết lỗi ở đầu form nếu form dài.
- **Postel's Law** — khoan dung với đầu vào: tự bỏ khoảng trắng, chấp nhận `0912345678` và `+84 912 345 678`, tự nhận diện định dạng thẻ.

## 4. Giảm ma sát
- **Hỏi ít nhất có thể.** Với mỗi trường, hỏi: "bỏ nó đi thì sao?" và "lấy được về sau không?"
- **Một cột.** Form nhiều cột làm người dùng nhảy lung tung và sót trường.
- **Đánh dấu trường tuỳ chọn** thay vì đánh dấu trường bắt buộc, nếu đa số là bắt buộc.
- **Autofill**: đặt đúng `autocomplete` và `inputmode` — bàn phím số cho số điện thoại, bàn phím email cho email. Đây là cải thiện UX mobile lớn nhất mà tốn ít công nhất.
- **Định dạng thông minh**: tự chèn dấu cách cho số thẻ, tự viết hoa tên.
- **Lưu nháp** cho form dài, và **cảnh báo trước khi rời trang** khi có dữ liệu chưa lưu.
- Form dài → chia bước, có [[Progress & Loading]] chỉ báo tiến trình.
- **Không tự động xoá dữ liệu** khi submit lỗi. Không bao giờ.

## 5. Trạng thái
`empty · focused · filled · disabled · read-only · error · success · loading`
Phân biệt **disabled** (không thể tương tác, mờ) và **read-only** (nhìn được, chọn copy được, không sửa được).

## 6. Accessibility
- Mỗi input phải có `<label for>` liên kết đúng.
- Lỗi phải nối bằng `aria-describedby` và vùng lỗi có `role="alert"`.
- Chuyển giữa các trường bằng Tab theo đúng thứ tự thị giác.
- Không dùng chỉ màu để báo lỗi.

## 7. Checklist
- [ ] Có trường nào bỏ được không?
- [ ] Label có luôn hiển thị không?
- [ ] Bàn phím mobile có đúng loại không?
- [ ] Thông báo lỗi có nói được cách sửa không?
- [ ] Submit lỗi có giữ nguyên dữ liệu đã nhập không?
- [ ] Tab qua toàn form có thấy focus rõ ràng không?
- [ ] Form dài có lưu nháp / cảnh báo rời trang chưa?

## Tham khảo
- NN/g — *Website Forms Usability: Top 10 Recommendations*: https://www.nngroup.com/articles/web-form-design/
- NN/g — *Placeholders in Form Fields Are Harmful*: https://www.nngroup.com/articles/form-design-placeholders/
- Baymard Institute — nghiên cứu checkout form (rất chi tiết): https://baymard.com/blog/checkout-form-design
- Adam Silver — *Form Design Patterns*: https://formdesignpatterns.com/
- MDN — thuộc tính `autocomplete`: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

## Liên kết
[[Selection Controls]] · [[Empty & Error States]] · [[UX Writing]] · [[Accessibility]] · [[UIUX]]
