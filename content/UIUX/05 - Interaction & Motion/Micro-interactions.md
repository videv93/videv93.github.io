---
tags: [uiux, interaction]
status: growing
---
# Micro-interactions

> Các tương tác nhỏ (hiệu ứng nút bấm, thanh tải, thả tim...) cung cấp **phản hồi tức thì** giúp người dùng biết hệ thống đã nhận lệnh hay chưa.
> Chúng là thứ tạo ra cảm giác sản phẩm "sống" và "chỉn chu".

## 1. Cấu trúc 4 phần (Dan Saffer)
1. **Trigger** — cái khởi động: người dùng (bấm, kéo, hover) hoặc hệ thống (nhận tin nhắn, hết pin).
2. **Rules** — chuyện gì được phép xảy ra: bấm tim → tăng đếm, không cho bấm hai lần.
3. **Feedback** — người dùng thấy/nghe/cảm nhận gì: tim đổi màu + nảy nhẹ + rung haptic.
4. **Loops & Modes** — hành vi lặp lại và theo thời gian: sau 100 like thì có hiệu ứng đặc biệt? Trạng thái đã like được nhớ ra sao?

## 2. Micro-interaction làm được gì
- **Xác nhận hành động** — nút lún xuống, checkbox tick, toast "Đã lưu".
- **Cho thấy trạng thái hệ thống** — spinner, thanh tiến trình, chấm "đang gõ".
- **Ngăn lỗi** — rung ngang khi mật khẩu sai, khoá nút khi đang xử lý.
- **Hướng sự chú ý** — badge nảy nhẹ khi có thông báo mới.
- **Dạy cách dùng** — bounce nhẹ gợi ý có thể vuốt.
- **Tạo cảm xúc** — hiệu ứng pháo giấy khi hoàn thành mục tiêu. Dùng cực kỳ tiết kiệm.

## 3. Nguyên tắc thiết kế
- **Phản hồi trong 100ms.** Chậm hơn thì cảm giác đứt gãy.
- **Ngắn: 100–300ms** cho phần lớn micro-interaction. Dài hơn 500ms là gây khó chịu khi lặp lại 50 lần/ngày.
- **Phục vụ mục đích**, không trang trí. Hỏi: *"nếu bỏ hiệu ứng này, người dùng có mất thông tin gì không?"*
- **Càng dùng nhiều thì càng phải kín đáo.** Hiệu ứng cho hành động hằng ngày phải gần như vô hình; hiệu ứng ăn mừng chỉ dành cho khoảnh khắc hiếm.
- **Nhất quán** — cùng loại hành động thì cùng loại phản hồi trên toàn sản phẩm.
- **Đừng chặn người dùng** — hiệu ứng không được cản thao tác tiếp theo.
- **Cân nhắc haptic** trên mobile: nhẹ cho xác nhận, mạnh cho lỗi. Đừng lạm dụng.

## 4. Những chỗ đáng đầu tư nhất
| Chỗ | Vì sao |
|---|---|
| Trạng thái nút (hover/active/loading) | Gặp nhiều nhất |
| Chuyển trạng thái form (lỗi → hợp lệ) | Trấn an người dùng |
| Kéo để làm mới (pull to refresh) | Cảm giác trực tiếp |
| Thêm vào giỏ hàng | Xác nhận hành động có giá trị kinh doanh |
| Chuyển tab / chuyển màn | Giữ ngữ cảnh không gian |
| Xoá + hoàn tác | Giảm sợ hãi |
| Trạng thái rỗng → có dữ liệu đầu tiên | Khoảnh khắc "peak" trong Peak–End Rule |

## 5. Sai lầm hay gặp
- Hiệu ứng đẹp nhưng làm chậm thao tác.
- Hiệu ứng chỉ thấy được một lần rồi thành phiền toái.
- Không tôn trọng `prefers-reduced-motion`.
- Dùng animation để che giấu hệ thống chậm thay vì làm nó nhanh hơn.
- Hiệu ứng khác nhau cho cùng một loại hành động ở các màn khác nhau.

## 6. Checklist
- [ ] Mọi hành động của người dùng có phản hồi trong 100ms không?
- [ ] Hiệu ứng có dưới 300ms không?
- [ ] Bỏ hiệu ứng đi thì có mất thông tin gì không?
- [ ] Xem 50 lần liên tiếp có còn chịu được không?
- [ ] Có tôn trọng `prefers-reduced-motion` không?
- [ ] Cùng hành động ở các màn khác nhau có phản hồi giống nhau không?

## Tham khảo
- Dan Saffer — *Microinteractions* (sách gốc của khái niệm): https://www.oreilly.com/library/view/microinteractions/9781491945957/
- NN/g — *Microinteractions in User Experience*: https://www.nngroup.com/articles/microinteractions/
- Material Design 3 — *Motion: transitions*: https://m3.material.io/styles/motion/overview
- Rauno Freiberg — *Interaction details*: https://rauno.me/craft
- Emil Kowalski — *Animations on the Web*: https://animations.dev/

## Liên kết
[[Motion & Animation]] · [[Interaction States]] · [[Progress & Loading]] · [[UIUX]]
