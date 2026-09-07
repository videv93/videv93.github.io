---
tags: [uiux, a11y]
status: growing
---
# Accessibility (a11y)

> Đảm bảo ứng dụng dùng được cho **tất cả mọi người**, gồm người thị lực kém, mù màu, người lớn tuổi, người khiếm thính, người khó vận động, người khó tập trung.
> Thực tế: phần lớn cải thiện a11y cũng làm sản phẩm tốt hơn cho người bình thường (đi tàu xóc, cầm điện thoại một tay, ngoài nắng chói).

## 1. Bốn nguyên tắc POUR (WCAG)
- **Perceivable** — thông tin phải cảm nhận được: tương phản đủ, alt text cho ảnh, phụ đề cho video, không dùng màu làm kênh duy nhất.
- **Operable** — thao tác được: dùng được bằng bàn phím, đủ thời gian, không gây động kinh, vùng chạm đủ lớn.
- **Understandable** — hiểu được: ngôn ngữ rõ ràng, hành vi dự đoán được, hỗ trợ sửa lỗi.
- **Robust** — tương thích: HTML ngữ nghĩa đúng, hoạt động với công nghệ hỗ trợ.

**Mức tuân thủ:** A (tối thiểu) · **AA (mục tiêu thực tế của hầu hết sản phẩm)** · AAA (rất khắt khe, thường chỉ áp dụng cho một phần).

## 2. Những tiêu chí thực hành hằng ngày
| Hạng mục | Yêu cầu |
|---|---|
| Tương phản chữ thường | ≥ **4.5:1** |
| Tương phản chữ lớn (≥24px hoặc ≥18.66px bold) | ≥ **3:1** |
| Tương phản UI component & icon có nghĩa | ≥ **3:1** |
| Vùng chạm | ≥ 24×24px (AA 2.2), khuyến nghị 44×44 |
| Focus indicator | Nhìn thấy được, tương phản ≥3:1 |
| Phóng to | Zoom 200% không mất nội dung/chức năng |
| Reflow | Dùng được ở 320px không cuộn ngang |
| Chuyển động | Tôn trọng `prefers-reduced-motion` |

## 3. Bàn phím — kiểm tra rẻ nhất và hiệu quả nhất
Cất chuột đi, dùng **Tab / Shift+Tab / Enter / Space / Esc / mũi tên** đi hết một luồng chính.
- Mọi thứ bấm được phải **tới được bằng Tab**.
- Thứ tự Tab phải khớp thứ tự thị giác.
- Focus phải **luôn nhìn thấy**.
- Không có "bẫy focus" ngoài ý muốn (chỉ modal mới được bẫy, và phải thoát bằng Esc).
- Có link **"Bỏ qua tới nội dung chính"** ở đầu trang.
- Menu/dropdown điều hướng bằng phím mũi tên.

## 4. HTML ngữ nghĩa trước, ARIA sau
> **Luật đầu tiên của ARIA: đừng dùng ARIA nếu HTML gốc làm được.**

- `<button>` cho hành động, `<a href>` cho điều hướng — đừng dùng `<div onclick>`.
- `<h1>`–`<h6>` theo đúng thứ bậc, không nhảy cấp, không dùng heading để làm chữ to.
- Landmark: `<header> <nav> <main> <aside> <footer>`.
- `<label for>` cho mọi input.
- `<table>` với `<th scope>` cho dữ liệu bảng.
- ARIA dùng cho: `aria-label` (icon-only button), `aria-describedby` (helper/error), `aria-expanded`, `aria-current`, `role="alert"`/`role="status"` cho thông báo động, `aria-live` cho vùng cập nhật.

## 5. Nội dung & thị giác
- **Alt text**: mô tả *nội dung và chức năng*, không viết "hình ảnh về…". Ảnh trang trí → `alt=""`.
- **Không dùng màu làm kênh thông tin duy nhất** — luôn kèm icon/chữ/hoa văn.
- **Link phải tự mô tả** — ❌ "Xem thêm" (khi đọc riêng ra khỏi ngữ cảnh) ✅ "Xem chính sách hoàn tiền".
- **Không khoá cỡ chữ** — dùng `rem`, tôn trọng cài đặt hệ thống.
- **Ngôn ngữ đơn giản** — câu ngắn, tránh từ chuyên ngành → [[UX Writing]].
- Đặt `lang="vi"` đúng cho trang tiếng Việt (ảnh hưởng đến cách screen reader phát âm).

## 6. Quy trình kiểm thử
1. **Tự động** (bắt ~30–40% vấn đề): axe DevTools, Lighthouse, WAVE, `eslint-plugin-jsx-a11y`.
2. **Thủ công**: đi bằng bàn phím, zoom 200%, xem dưới chế độ mù màu, tắt CSS.
3. **Screen reader**: VoiceOver (macOS/iOS: ⌘F5), NVDA (Windows, miễn phí), TalkBack (Android).
4. **Người dùng thật có khuyết tật** — không có gì thay thế được bước này.

## 7. Checklist tối thiểu trước khi release
- [ ] Đi hết luồng chính bằng bàn phím được không?
- [ ] Focus có luôn nhìn thấy không?
- [ ] Mọi ảnh có alt phù hợp chưa?
- [ ] Mọi input có label chưa?
- [ ] Tương phản chữ ≥4.5:1 chưa?
- [ ] Thông tin nào chỉ truyền bằng màu không?
- [ ] Heading có đúng thứ bậc không?
- [ ] Thông báo lỗi có được screen reader đọc không?
- [ ] Zoom 200% có vỡ layout không?
- [ ] `prefers-reduced-motion` đã xử lý chưa?

## Công cụ
- **axe DevTools** (extension): https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Stark** (plugin Figma): https://www.getstark.co/
- **Lighthouse** trong Chrome DevTools

## Tham khảo
- **WCAG 2.2 Quick Reference**: https://www.w3.org/WAI/WCAG22/quickref/
- **WAI-ARIA Authoring Practices** — mẫu chuẩn cho mọi component: https://www.w3.org/WAI/ARIA/apg/
- A11y Project Checklist: https://www.a11yproject.com/checklist/
- Inclusive Components — Heydon Pickering: https://inclusive-components.design/
- GOV.UK — *Accessibility personas & posters*: https://accessibility.blog.gov.uk/2016/09/02/dos-and-donts-on-designing-for-accessibility/
- Microsoft — *Inclusive Design Toolkit*: https://inclusive.microsoft.design/

## Liên kết
[[Color Theory]] · [[Interaction States]] · [[Input & Form]] · [[Motion & Animation]] · [[UIUX]]
