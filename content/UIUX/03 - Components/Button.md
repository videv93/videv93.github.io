---
tags: [uiux, component]
status: growing
---
# Button

> Nút bấm là nơi ý định của người dùng biến thành hành động. Sai ở đây thì mọi thứ phía trên vô nghĩa.

## 1. Phân cấp nút
| Cấp | Hình thức | Dùng khi |
|---|---|---|
| **Primary** | Nền đặc, màu accent | Hành động chính — **tối đa 1 cái** mỗi màn hình/khu vực |
| **Secondary** | Viền, nền trong suốt | Hành động thay thế ngang hàng |
| **Tertiary / Ghost** | Chỉ chữ, không viền | Hành động phụ, ít quan trọng |
| **Destructive** | Đỏ (đặc hoặc viền) | Xoá, huỷ, hành động không hoàn tác được |
| **Link** | Chữ gạch chân | Điều hướng, không phải hành động |

> Quy tắc: **Nút ≠ Link.** Nút *làm gì đó*; link *đưa đi đâu đó*. Trong code phải đúng thẻ (`<button>` vs `<a>`) vì nó ảnh hưởng đến bàn phím và screen reader.

## 2. Kích thước & vùng chạm
- Thang cỡ: `sm` 32px · `md` 40px · `lg` 48px chiều cao.
- Vùng chạm tối thiểu **44×44pt (iOS)** / **48×48dp (Android)** — mở rộng bằng padding trong suốt nếu nút nhỏ.
- Padding ngang thường gấp 2–3 lần padding dọc.
- **Fitts's Law**: nút quan trọng thì to hơn và đặt gần ngón cái (vùng dưới màn hình trên mobile).

## 3. Trạng thái bắt buộc
`default · hover · focus (focus-visible) · active/pressed · disabled · loading`
- **Focus ring không được xoá** — đó là cách người dùng bàn phím định vị. → [[Accessibility]]
- **Disabled là cạm bẫy**: nút xám không nói vì sao nó xám. Ưu tiên **để nút bật** và hiện lỗi khi bấm, hoặc kèm giải thích ngay cạnh.
- **Loading**: giữ nguyên kích thước nút (không để layout nhảy), khoá thao tác lặp, đổi label thành "Đang lưu…". → [[Progress & Loading]]

## 4. Nhãn nút (label)
- **Động từ + danh từ**, mô tả kết quả: ✅ "Lưu thay đổi", "Đặt hàng — 250.000đ" ❌ "OK", "Submit", "Yes"
- Nhãn phải trả lời được câu hỏi: *"Bấm cái này thì chuyện gì xảy ra?"*
- Ngắn: 1–3 từ lý tưởng, tối đa ~4.
- Trong hộp thoại xác nhận, nhãn phải cụ thể: ❌ "Bạn có chắc không? [Có] [Không]" ✅ "Xoá 3 tệp này? [Xoá tệp] [Giữ lại]" → [[Modal & Dialog]]
- → Xem thêm [[UX Writing]]

## 5. Bố trí nhóm nút
- **Thứ tự**: trên web/Android thường là `[Huỷ] [Xác nhận]` (chính bên phải); iOS đặt hành động chính bên phải trong alert. **Chọn một quy ước và giữ nhất quán.**
- Không đặt hai nút primary cạnh nhau — người dùng không biết chọn gì.
- Nút destructive nên **cách xa** nút thường dùng.
- Trên mobile, nút full-width xếp dọc dễ chạm hơn hai nút cạnh nhau.

## 6. Icon trong nút
- Icon **trước** chữ cho hành động (➕ Thêm mới); icon **sau** chữ cho điều hướng/mở rộng (Tiếp tục →).
- Icon-only button **bắt buộc** có `aria-label` + [[Tooltip]].
- Khoảng cách icon–chữ: 4–8px.

## 7. Checklist
- [ ] Màn hình này có đúng 1 nút primary không?
- [ ] Nhãn nút có phải động từ mô tả kết quả không?
- [ ] Đã thiết kế đủ 6 trạng thái chưa?
- [ ] Focus ring còn không?
- [ ] Vùng chạm ≥ 44px chưa?
- [ ] Nút destructive có tách khỏi nút thường không?
- [ ] Nút loading có làm layout nhảy không?
- [ ] Nếu đang dùng disabled — người dùng có hiểu vì sao không?

## Tham khảo
- NN/g — *Button States and the Disabled State*: https://www.nngroup.com/articles/disabled-inputs-usability/
- NN/g — *Ok–Cancel or Cancel–Ok? Button order*: https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/
- Material Design 3 — *Buttons*: https://m3.material.io/components/buttons/overview
- Apple HIG — *Buttons*: https://developer.apple.com/design/human-interface-guidelines/buttons
- WAI-ARIA Authoring Practices — *Button pattern*: https://www.w3.org/WAI/ARIA/apg/patterns/button/

## Liên kết
[[Interaction States]] · [[UX Writing]] · [[Laws of UX]] · [[Accessibility]] · [[UIUX]]
