---
tags: [uiux, component]
status: growing
---
# Modal & Dialog

> Modal **chặn** người dùng lại. Đó là hành động thô bạo nhất trong kho công cụ UI — chỉ dùng khi thật sự cần.

## 1. Khi nào dùng modal
✅ **Nên dùng:**
- **Xác nhận hành động huỷ hoại** (xoá, huỷ đơn, đăng xuất khỏi mọi thiết bị)
- **Thu thập thông tin** ngắn mà không muốn mất ngữ cảnh trang hiện tại
- **Hiển thị thông tin tối quan trọng** cần được thấy trước khi đi tiếp

❌ **Không nên dùng:**
- Khuyến mãi/newsletter bật ra ngay khi vào trang
- Nội dung dài (dùng trang riêng)
- Thông báo không quan trọng (dùng toast/inline message)
- Nhiều bước phức tạp (dùng wizard trên trang riêng)

**Modal vs Non-modal:** *Modal* chặn tương tác với phần còn lại; *non-modal* (popover, toast) không chặn. Nếu người dùng vẫn cần nhìn nội dung phía sau → chọn non-modal.

## 2. Các dạng
- **Popup modal** — hộp thoại giữa màn hình, phổ biến nhất
- **Fullscreen desktop modal** — nội dung lớn, chỉnh sửa phức tạp
- **Fullscreen mobile modal** — chuẩn trên mobile khi nội dung nhiều
- **Bottom sheet** — chuẩn mobile hiện đại, trong tầm ngón cái, kéo để đóng
- **Popover modal** — nhỏ, neo vào phần tử kích hoạt
- **Lightbox** — xem ảnh/video toàn màn

**Vị trí:** căn giữa màn hình (desktop). Trên mobile ưu tiên bottom sheet.
**iOS vs Android:** iOS alert căn giữa, nút xếp ngang/dọc theo số lượng; Android dùng dialog Material căn nhãn về phải. Tuân theo nền tảng thay vì áp một kiểu cho cả hai.

## 3. 13 best practice
1. Dùng modal cho **thông tin tối quan trọng** thôi.
2. **Hạn chế modal do hệ thống tự bật** — modal do người dùng chủ động mở luôn được chấp nhận hơn.
3. **Đặt mục đích vào tiêu đề** — tiêu đề nói rõ chuyện gì đang xảy ra, không phải "Thông báo".
4. **Nội dung phần thân phải hữu ích** — nêu hậu quả cụ thể: "3 tệp sẽ bị xoá vĩnh viễn."
5. **Nhãn nút tường minh** — ✅ [Xoá tệp] [Giữ lại] ❌ [OK] [Cancel]
6. **Overlay tối** để hướng chú ý và tách khỏi nền.
7. **Luôn có nút đóng nhìn thấy được** (✕ góc trên).
8. **Cho phép đóng bằng click ra ngoài** — trừ khi có dữ liệu chưa lưu (khi đó hỏi xác nhận).
9. **Bẫy focus bàn phím** trong modal trên desktop; Esc để đóng; trả focus về phần tử đã mở modal.
10. **Tránh modal chồng modal** — nếu cần, thiết kế lại luồng.
11. **Tối đa 2 nút hành động** (có thể thêm một link phụ).
12. **Dùng thị giác thể hiện mức nghiêm trọng** cho alert (icon + màu đỏ cho destructive).
13. **Dùng modal báo thành công thật tiết kiệm** — phần lớn trường hợp toast là đủ.

## 4. Xác nhận hành động huỷ hoại
Ba mức, chọn theo mức độ nghiêm trọng:
1. **Undo** (tốt nhất) — làm luôn, hiện toast "Đã xoá — Hoàn tác". Không cản trở, vẫn an toàn.
2. **Modal xác nhận** — cho hành động không hoàn tác được.
3. **Xác nhận bằng gõ chữ** — gõ tên repo/tài khoản để xác nhận. Chỉ cho hành động thảm hoạ.

> Nếu hoàn tác được thì đừng hỏi. Nếu phải hỏi thì nói rõ **cái gì** bị mất và **có lấy lại được không**.

## 5. Accessibility
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` trỏ tới tiêu đề.
- Focus chuyển vào modal khi mở (vào tiêu đề hoặc phần tử focus được đầu tiên), **không** vào nút destructive.
- Bẫy focus: Tab không được thoát ra nền.
- Đóng bằng Esc, trả focus về nút trigger.
- Nền phía sau: `aria-hidden` hoặc dùng `<dialog>` native / `inert`.

## 6. Checklist
- [ ] Modal này có thay được bằng inline hoặc trang riêng không?
- [ ] Tiêu đề có nói rõ mục đích không?
- [ ] Nhãn nút có phải động từ cụ thể không?
- [ ] Đóng được bằng ✕, Esc và click ngoài chứ?
- [ ] Focus có bị bẫy trong modal không? Có trả về đúng chỗ khi đóng không?
- [ ] Trên mobile có bị che bởi bàn phím không?
- [ ] Có dữ liệu chưa lưu bị mất khi đóng nhầm không?

## Tham khảo
- NN/g — *Modal & Nonmodal Dialogs: When (& When Not) to Use Them*: https://www.nngroup.com/articles/modal-nonmodal-dialog/
- NN/g — *Confirmation Dialogs Can Prevent User Errors*: https://www.nngroup.com/articles/confirmation-dialog/
- Material Design 3 — *Dialogs*: https://m3.material.io/components/dialogs/overview
- WAI-ARIA APG — *Dialog (Modal)*: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- MDN — thẻ `<dialog>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

## Liên kết
[[Button]] · [[Empty & Error States]] · [[Accessibility]] · [[UX Writing]] · [[UIUX]]
