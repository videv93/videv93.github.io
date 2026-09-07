---
tags: [uiux, visual, layout]
status: growing
---
# Spacing & Grid

> Cách sắp xếp khoảng trống để giao diện gọn gàng, không rối mắt. Người mới thường sửa màu và font trước — nhưng **spacing mới là thứ tạo ra cảm giác "chuyên nghiệp"**.

## 1. Hệ 8pt (8-Point Grid)
Mọi kích thước và khoảng cách đều là bội số của 8: `8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96`.
Cho phép thêm **4px** làm nửa bậc cho chi tiết nhỏ (khoảng cách icon–chữ, padding của tag).

**Vì sao 8?** Phần lớn kích thước màn hình chia hết cho 8, nên tỉ lệ scale (@1x/@1.5x/@2x/@3x) luôn ra số nguyên, không bị nhoè.

**Thang spacing khuyến nghị (đặt tên theo bậc, không theo px):**
| Token | px | Dùng cho |
|---|---|---|
| `space-1` | 4 | icon ↔ chữ, padding tag |
| `space-2` | 8 | trong một component |
| `space-3` | 12 | giữa các dòng liên quan |
| `space-4` | 16 | padding chuẩn của card/nút |
| `space-6` | 24 | giữa các nhóm nội dung |
| `space-8` | 32 | giữa các block |
| `space-12` | 48 | giữa các section |
| `space-16` | 64 | lề section trang landing |

## 2. Quy tắc khoảng cách quan trọng nhất
> **Khoảng cách bên trong nhóm phải nhỏ hơn khoảng cách giữa các nhóm.**

Đây là nguyên lý **Proximity** của Gestalt. Ví dụ điển hình: label phải sát ô input của nó (8px) hơn là sát ô input phía trên (24px). Sai chỗ này thì form nhìn "loạn" dù mọi thứ khác đúng.

Hệ quả: khi giao diện nhìn rối, việc đầu tiên nên thử là **tăng khoảng cách giữa các nhóm**, không phải thêm đường kẻ.

## 3. Grid hệ thống
**Web/Desktop — 12 cột** (chia được cho 2, 3, 4, 6):
- Gutter: 24px (desktop), 16px (tablet)
- Margin: 24–80px tuỳ độ rộng
- Max content width: 1200–1440px

**Mobile — 4 cột**, margin 16px, gutter 16px.

**Ba loại grid:**
- **Column grid** — bố cục ngang, phổ biến nhất
- **Baseline grid** — căn chữ theo đường cơ sở dọc (4px), dùng cho sản phẩm nhiều nội dung
- **Modular grid** — ô lưới cả ngang lẫn dọc, dùng cho dashboard/gallery

## 4. Breakpoint tham chiếu
| Tên | Width | Thiết bị |
|---|---|---|
| `sm` | 640px | điện thoại ngang |
| `md` | 768px | tablet dọc |
| `lg` | 1024px | tablet ngang / laptop nhỏ |
| `xl` | 1280px | desktop |
| `2xl` | 1536px | màn hình lớn |

Nguyên tắc: **mobile-first**. Thiết kế màn hẹp trước, mở rộng dần — ép mình ưu tiên nội dung.

## 5. Khoảng trắng (White Space)
- **Micro white space** — giữa dòng chữ, giữa icon và text. Ảnh hưởng đến tính dễ đọc.
- **Macro white space** — giữa các section. Ảnh hưởng đến cảm nhận "cao cấp".
- Khoảng trắng **không phải chỗ trống lãng phí** — nó là công cụ tạo phân cấp. Sản phẩm cao cấp luôn thoáng hơn.
- Sai lầm phổ biến: nhồi nội dung để "khỏi phải cuộn". Người dùng cuộn rất tự nhiên; họ không chịu được sự lộn xộn.

## 6. Touch target
- iOS: tối thiểu **44×44pt** · Android: **48×48dp** · WCAG 2.2 AA: **24×24px**, AAA: 44×44px
- Vùng chạm có thể **lớn hơn** phần nhìn thấy (dùng padding trong suốt).
- Khoảng cách giữa hai target chạm được: ít nhất 8px. → [[Laws of UX]] (Fitts's Law)

## 7. Checklist
- [ ] Mọi khoảng cách có nằm trong thang không, hay có số lẻ như 13px, 27px?
- [ ] Khoảng cách trong nhóm < khoảng cách giữa nhóm chứ?
- [ ] Có bao nhiêu đường căn lề dọc trên màn hình? Giảm được không?
- [ ] Padding của các card/nút cùng loại có bằng nhau không?
- [ ] Touch target ≥ 44px chưa?
- [ ] Nội dung có `max-width` để không dài lê thê trên màn rộng chứ?

## Tham khảo
- *Refactoring UI* — chương Spacing & Layout
- Material Design 3 — *Layout & Applying layout*: https://m3.material.io/foundations/layout/understanding-layout/overview
- Bootstrap grid (tham chiếu 12 cột): https://getbootstrap.com/docs/5.3/layout/grid/
- Tailwind spacing scale: https://tailwindcss.com/docs/margin
- Intuit — *The 8-Point Grid*: https://spec.fm/specifics/8-pt-grid

## Liên kết
[[Layout & Composition]] · [[Design Tokens]] · [[Design Principles]] · [[Figma]] · [[UIUX]]
