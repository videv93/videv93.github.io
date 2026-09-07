---
tags: [uiux, visual, typography]
status: growing
---
# Typography

> Font chữ không chỉ để đọc — nó **phân cấp thông tin (Visual Hierarchy)**, giúp người dùng lướt nhanh màn hình mà vẫn hiểu nội dung.

## 1. Ba con số cốt lõi
- **Độ dài dòng (Line Length) 📏** — lý tưởng **45–75 ký tự** (~65 là điểm ngọt). Dòng quá dài khiến mắt mỏi khi tìm điểm bắt đầu dòng tiếp theo. Trong CSS: `max-width: 65ch`.
- **Khoảng cách dòng (Line Height) ↕️** — **130–150%** cỡ chữ cho nội dung dài; tiêu đề lớn có thể xuống **110–120%**. Quy tắc: chữ càng lớn, line-height càng nhỏ tương đối.
- **Số họ font 🔤** — tối đa **1–2 font family** cho một sản phẩm. Muốn phong phú thì dùng nhiều **weight** của cùng một font.

## 2. Thang chữ (Type Scale)
Đừng chọn cỡ chữ tuỳ hứng. Dùng một thang có tỉ lệ:
- Tỉ lệ phổ biến: **1.200** (Minor Third) cho app, **1.250** (Major Third) cho web, **1.333** cho landing page nhiều tương phản.
- Thang thực dụng (đơn giản, chia hết cho 4): `12 · 14 · 16 · 18 · 20 · 24 · 30 · 36 · 48 · 60 · 72`.
- Cỡ chữ nội dung tối thiểu: **16px** trên web, **17pt** trên iOS. Dưới 14px chỉ dành cho caption.

Đặt tên theo vai trò, không theo cỡ: `display / h1 / h2 / h3 / body-lg / body / caption / overline`.

## 3. Chọn và ghép font
**Nguyên tắc:**
- Chọn font có **nhiều weight** (ít nhất Regular 400, Medium 500, Semibold 600, Bold 700) và hỗ trợ **tiếng Việt** đầy đủ dấu.
- Ghép font thì **tương phản rõ**: Serif tiêu đề + Sans nội dung. Ghép hai sans giống nhau chỉ tạo cảm giác lỗi.
- Sans-serif dễ đọc hơn ở cỡ nhỏ trên màn hình; serif hợp nội dung dài, cảm giác trang trọng.

**Font hỗ trợ tiếng Việt tốt (miễn phí):** Inter, Be Vietnam Pro, Manrope, Public Sans, Noto Sans, Nunito Sans, Lora (serif), Merriweather (serif), Source Serif.

**Cặp gợi ý:** Inter + Inter (dùng weight để phân cấp) · Lora + Inter · Be Vietnam Pro + Manrope.

## 4. Chi tiết hay bị bỏ qua
- **Letter-spacing (tracking)**: tiêu đề rất lớn cần **giảm nhẹ** (-1% đến -2%); chữ IN HOA nhỏ cần **tăng** (+5% đến +10%).
- **Font weight thay vì màu** để tạo nhấn — bold hút mắt trước và không phá bảng màu.
- **Không dùng chữ IN HOA cho đoạn dài** — mất hình dạng từ, đọc chậm hơn ~10%.
- **Căn lề trái** cho nội dung; **justify** tạo "dòng sông trắng" xấu trên web vì không có hyphenation tốt.
- **Số liệu dùng `font-variant-numeric: tabular-nums`** để cột số thẳng hàng → [[Table & Data Display]].
- **Chữ trên nền màu**: giảm độ đậm cảm nhận, thường cần weight cao hơn một bậc.

## 5. Phân cấp bằng typography
Với chỉ một font, ta có 4 công cụ: **cỡ · weight · màu (độ đậm nhạt) · khoảng cách**.
Mẹo thực chiến từ *Refactoring UI*: thay vì làm chữ phụ nhỏ đi, hãy làm nó **nhạt màu đi** — giữ được khả năng đọc mà vẫn lùi lại phía sau.

## 6. Responsive
- Không scale chữ tuyến tính theo màn hình. Dùng bậc rời rạc theo breakpoint, hoặc `clamp()`:
  `font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);`
- Trên mobile, tiêu đề lớn nên giảm 20–30% so với desktop.
- Tôn trọng cỡ chữ hệ thống của người dùng (Dynamic Type trên iOS) — đừng khoá `px` cứng. → [[Accessibility]]

## 7. Checklist
- [ ] Đoạn văn có nằm trong 45–75 ký tự/dòng không?
- [ ] Line-height nội dung ≥ 1.4 chưa?
- [ ] Dùng bao nhiêu cỡ chữ khác nhau? Có giảm được không?
- [ ] Font có đủ dấu tiếng Việt ở mọi weight không?
- [ ] Chữ nhỏ nhất trên màn hình là bao nhiêu px? Có ≥ 12px không?
- [ ] Tương phản chữ/nền đạt 4.5:1 chưa?

## Công cụ
- **Type Scale** — sinh thang chữ: https://typescale.com/
- **Google Fonts** (lọc theo bảng chữ Vietnamese): https://fonts.google.com/
- **Fontpair** — gợi ý cặp font: https://www.fontpair.co/
- **Modern Font Stacks** — font hệ thống không cần tải: https://modernfontstacks.com/

## Tham khảo
- *Refactoring UI* — chương Typography
- Material Design 3 — *Typography*: https://m3.material.io/styles/typography/overview
- Butterick — *Practical Typography*: https://practicaltypography.com/
- Erik Kennedy — *The Ultimate Guide to Font Pairing*: https://learnui.design/blog/ultimate-guide-similar-fonts.html
- NN/g — *Typography Guidelines*: https://www.nngroup.com/articles/typography-terms-ux/

## Liên kết
[[Color Theory]] · [[Spacing & Grid]] · [[Design Tokens]] · [[UX Writing]] · [[UIUX]]
