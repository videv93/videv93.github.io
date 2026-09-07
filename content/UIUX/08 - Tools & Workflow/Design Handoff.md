---
tags: [uiux, process, handoff]
status: growing
---
# Design Handoff

> Xuất tài nguyên (icon, hình ảnh) và chuẩn bị thông số (spec, màu, font size) để lập trình viên tiến hành viết code 📦.
> Handoff tốt **không phải là một sự kiện** — nó là kết quả của việc dev đã tham gia từ sớm.

## 1. Chuẩn bị file
- **Dọn file**: xoá frame nháp, gom vào section, đặt tên frame theo `[Flow] / [Bước] / [Trạng thái]`.
- **Đặt tên layer có nghĩa** — dev đọc tên layer để đặt tên biến.
- **Mọi giá trị đi qua variable/style**, không có màu rời rạc. → [[Design Tokens]]
- **Auto layout ở mọi nơi** — dev đọc được ý định về flex/gap/padding từ đó. → [[Figma]]
- **Dev Mode**: đánh dấu frame "Ready for dev", dev thấy spec, code snippet, so sánh phiên bản.

## 2. Những thứ **phải** bàn giao ngoài màn hình đẹp
Đây là chỗ handoff hay thiếu nhất:
- [ ] Tất cả [[Interaction States]] của mọi thành phần tương tác
- [ ] [[Empty & Error States]] — rỗng, lỗi, không kết quả, offline
- [ ] Trạng thái **đang tải** (skeleton) → [[Progress & Loading]]
- [ ] **Responsive**: ít nhất 375 / 768 / 1440, và quy tắc co giãn
- [ ] **Trường hợp biên**: chữ dài nhất, chữ ngắn nhất, số 0, số rất lớn, ảnh thiếu, tên tiếng Việt có dấu dài
- [ ] **Nội dung động**: text truncate ở đâu, wrap ra sao
- [ ] **Quy tắc quyền**: người dùng không có quyền thì thấy gì
- [ ] **Chuyển động**: duration + easing → [[Motion & Animation]]
- [ ] **Yêu cầu accessibility**: thứ tự tab, aria-label, focus → [[Accessibility]]
- [ ] **Nội dung chữ** chính xác, kể cả lỗi → [[UX Writing]]

## 3. Export tài nguyên
- **Icon → SVG**, đã outline stroke, dùng `currentColor` để thừa hưởng màu.
- **Ảnh raster → WebP/AVIF**, xuất @1x/@2x/@3x nếu cần, đặt tên `kebab-case`.
- **Illustration → SVG** nếu phẳng, PNG nếu có gradient phức tạp.
- Tối ưu SVG (SVGO) trước khi giao.
- Nếu dùng icon system thì đừng export lẻ — chỉ tên icon trong bộ.

## 4. Phối hợp với developer
- **Mời dev vào từ giai đoạn wireframe**, không phải lúc bàn giao. Dev sẽ chỉ ra ràng buộc kỹ thuật khi sửa còn rẻ.
- **Walkthrough 30 phút** khi bàn giao — đi qua từng luồng, nói cả *vì sao*, không chỉ *cái gì*.
- **Design review khi code xong** — so sánh implementation với thiết kế, ghi chú lệch bằng ảnh chụp có chú thích.
- **Ngôn ngữ chung**: nếu design gọi component là `Button/Primary` thì code cũng vậy → [[Component API & Variants]].
- Chấp nhận đánh đổi: một số chi tiết không đáng chi phí kỹ thuật. Phân loại rõ đâu là "must" đâu là "nice to have".

## 5. Cạm bẫy
- Giao Figma link rồi biến mất.
- Thiết kế theo pixel mà không nói quy tắc co giãn → dev đoán sai ở mọi kích thước khác.
- Không giao trạng thái lỗi → dev tự bịa hoặc bỏ qua.
- Sửa design sau khi dev đã bắt đầu mà không thông báo.
- Không kiểm tra lại sản phẩm sau khi code xong.

## 6. Checklist trước khi bấm "bàn giao"
- [ ] Mọi frame đã đặt tên và sắp xếp chưa?
- [ ] Có màu/spacing nào không đến từ variable không?
- [ ] Đã có đủ trạng thái (hover, focus, disabled, loading, error, empty) chưa?
- [ ] Đã có bản mobile chưa?
- [ ] Nội dung đã là bản cuối chưa?
- [ ] Asset đã export và tối ưu chưa?
- [ ] Đã hẹn buổi walkthrough với dev chưa?

## Tham khảo
- Figma — *Dev Mode*: https://www.figma.com/dev-mode/
- NN/g — *Collaboration Between Designers and Developers*: https://www.nngroup.com/articles/design-developer-collaboration/
- Storybook — nơi design và code gặp nhau: https://storybook.js.org/
- Zeplin (thay thế/bổ trợ): https://zeplin.io/

## Liên kết
[[Figma]] · [[Interaction States]] · [[Design System Governance]] · [[Accessibility]] · [[UIUX]]
