---
tags: [uiux, interaction, motion]
status: growing
---
# Motion & Animation

> Chuyển động có bốn nhiệm vụ: **giữ ngữ cảnh không gian**, **hướng sự chú ý**, **thể hiện quan hệ nhân quả**, **thể hiện tính cách thương hiệu** — theo đúng thứ tự ưu tiên đó.

## 1. Thời lượng (duration)
| Loại | Thời lượng |
|---|---|
| Micro (hover, đổi màu, ripple) | **100–150ms** |
| Chuyển trạng thái nhỏ (mở dropdown, tooltip) | **150–250ms** |
| Chuyển thành phần vừa (modal, drawer, bottom sheet) | **250–350ms** |
| Chuyển màn hình / phần tử lớn | **300–500ms** |
| Ngoại lệ có chủ đích (onboarding, ăn mừng) | 500ms+ |

Nguyên tắc: **vật càng lớn, di chuyển càng xa thì thời lượng càng dài** — nhưng không tuyến tính. Trên mobile thường ngắn hơn desktop.

**Vào nhanh, ra nhanh hơn.** Phần tử biến mất nên nhanh hơn khi xuất hiện (~2/3 thời lượng) vì người dùng đã quyết định xong.

## 2. Easing
| Easing | CSS | Dùng cho |
|---|---|---|
| **Ease-out** | `cubic-bezier(0, 0, 0.2, 1)` | **Phần tử đi vào** — nhanh rồi chậm dần. Mặc định tốt nhất |
| **Ease-in** | `cubic-bezier(0.4, 0, 1, 1)` | Phần tử đi ra khỏi màn hình |
| **Ease-in-out / standard** | `cubic-bezier(0.4, 0, 0.2, 1)` | Di chuyển trong màn hình |
| **Spring** | `spring(mass, stiffness, damping)` | Cảm giác vật lý, tương tác trực tiếp (kéo thả) |
| **Linear** | `linear` | **Chỉ** cho chuyển động liên tục: spinner, progress bar |

> **Không bao giờ dùng `linear` cho phần tử xuất hiện/biến mất** — trong thế giới thật không có vật nào khởi động và dừng lại tức thì. Đây là lỗi phân biệt animation nghiệp dư với chuyên nghiệp.

## 3. Nguyên tắc
- **Chuyển động phải có nguồn gốc và đích đến.** Modal nên nở ra từ nút đã mở nó, không phải xuất hiện từ hư không.
- **Duy trì liên tục không gian.** Nếu trang B nằm "bên phải" trang A thì animation phải trượt sang trái.
- **Animate ít thuộc tính**: chỉ `transform` và `opacity` chạy trên GPU. Animate `width`, `height`, `top`, `left` gây giật (layout reflow).
- **Stagger** (lệch pha 20–50ms giữa các mục danh sách) tạo cảm giác mượt, nhưng danh sách >8 mục thì bỏ.
- **Chuyển động không được che nội dung** người dùng đang đọc.
- **Không animate thứ ở ngoài tầm nhìn.**
- Định nghĩa duration và easing thành **token** → [[Design Tokens]].

## 4. Các pattern phổ biến
- **Shared element transition** — ảnh trong danh sách phóng to thành ảnh trang chi tiết. Mạnh nhất để giữ ngữ cảnh.
- **Fade + slide nhẹ (8–16px)** — mặc định an toàn cho phần tử xuất hiện. Fade thuần cảm giác "trôi".
- **Skeleton → nội dung**: fade nhẹ, đừng nhấp nháy.
- **Nảy ngang (shake)** cho lỗi nhập sai — ngắn, 3 lần, biên độ nhỏ.
- **Auto-animate/Smart Animate** trong Figma để prototype nhanh → [[Prototyping]].

## 5. Accessibility — bắt buộc
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Chuyển động lớn có thể gây **chóng mặt, buồn nôn** với người rối loạn tiền đình. Đặc biệt nguy hiểm: parallax, zoom lớn, chuyển động toàn màn hình, tự động phát.
- WCAG 2.3.3 — Animation from Interactions.
- WCAG 2.2.2 — nội dung tự chuyển động >5s phải có nút tạm dừng.
- Không có gì nhấp nháy quá **3 lần/giây** (nguy cơ động kinh).
- Khi giảm chuyển động, thay bằng **fade** thay vì bỏ hẳn phản hồi.

## 6. Checklist
- [ ] Chuyển động này giải quyết vấn đề gì?
- [ ] Duration có nằm trong thang không?
- [ ] Easing có phải linear không? (nếu có, lý do là gì?)
- [ ] Chỉ animate transform/opacity chứ?
- [ ] Xem 20 lần liên tiếp có thấy chậm không?
- [ ] `prefers-reduced-motion` đã xử lý chưa?
- [ ] Trên máy yếu có mượt không?

## Tham khảo
- Material Design 3 — *Motion*: https://m3.material.io/styles/motion/overview
- Apple HIG — *Motion*: https://developer.apple.com/design/human-interface-guidelines/motion
- Val Head — *Designing Interface Animation*: https://valhead.com/
- Emil Kowalski — *Animations on the Web* (khoá học rất thực chiến): https://animations.dev/
- web.dev — *Animations guide*: https://web.dev/articles/animations-guide
- WCAG — *2.3.3 Animation from Interactions*: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

## Liên kết
[[Micro-interactions]] · [[Accessibility]] · [[Design Tokens]] · [[Prototyping]] · [[UIUX]]
