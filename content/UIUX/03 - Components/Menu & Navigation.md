---
tags: [uiux, component, navigation]
status: growing
---
# Menu & Navigation

> Điều hướng phải trả lời ba câu hỏi: **Tôi đang ở đâu? Tôi đi được đâu? Làm sao quay lại?**
> Cấu trúc nội dung nằm ở [[Information Architecture]]; note này nói về *component*.

## 1. Các loại menu
- **Basic drop-down menu** — danh sách lựa chọn đơn giản, chọn một tại một thời điểm.
- **Cascade menu** — menu nhiều tầng, tốt cho nội dung đã phân loại; nhưng khó rê chuột (Steering Law) → cân nhắc mega menu thay thế.
- **Contextual menu** — hiện khi tương tác với một phần tử cụ thể (chuột phải, nhấn giữ, nút ⋯).
- **Single-select menu** — chọn một trong danh sách.
- **Multiselect menu** — chọn nhiều, kèm chip hiển thị lựa chọn.
- **Search menu** — có ô tìm trong menu, bắt buộc khi >15 mục.
- **Inline menu** — dẫn dắt người dùng ngay trong dòng nội dung, không phá vỡ bố cục.
- **Mega menu** — bảng lớn nhiều cột, hợp e-commerce nhiều danh mục.
- **Command palette (⌘K)** — lối tắt cho người dùng thạo, không thay thế điều hướng nhìn thấy được.

## 2. 12 best practice (menu)
1. Mọi mục menu quan trọng phải **hiển thị đầy đủ**, không bị cắt.
2. **Dễ bỏ chọn** — luôn có đường về trạng thái không chọn.
3. **Cân nhắc vị trí cascade menu** — tự lật hướng khi gần mép màn hình.
4. **Ưu tiên thứ tự mục** — quan trọng/hay dùng lên trên (Serial Position Effect).
5. **Đủ khoảng cách trong menu** — mỗi mục cao ít nhất 40–44px.
6. **Cắt nhãn quá dài** bằng ellipsis, nhưng giữ tooltip đầy đủ.
7. **Thêm elevation** để menu tách khỏi nền, hướng sự chú ý.
8. **Hành xử dự đoán được** — mở/đóng nhất quán, có "safe triangle" cho submenu.
9. **Nhãn ngắn và hữu ích**.
10. **Icon quen thuộc** cho lựa chọn đã chọn (dấu ✓).
11. **Chỉ báo trạng thái** — mục đang active phải khác biệt rõ.
12. **Dùng divider** để gom nhóm hành động tương tự.

Thêm: **icon đặt trước nhãn**; **phím tắt** chỉ tạo cho các hành động thật sự thường dùng, hiện bên phải nhãn.

## 3. Navigation theo nền tảng
| Pattern | Ghi chú |
|---|---|
| **Bottom tab bar** (mobile) | 3–5 mục, đều là đích đến chính, luôn hiển thị, icon + nhãn |
| **Top nav** (web) | ≤7 mục, logo trái, hành động tài khoản phải |
| **Sidebar** | App phức tạp; cho phép thu gọn; giữ trạng thái mở/đóng |
| **Hamburger** | Chôn mục ở đây làm tần suất dùng giảm mạnh — chỉ dùng cho mục phụ |
| **Breadcrumb** | Cấu trúc sâu ≥3 tầng, hiện đường về |
| **Tabs** | Chuyển giữa các khung nhìn *cùng cấp* của **cùng một đối tượng** |

**Tabs vs Navigation:** tab đổi nội dung trong cùng một trang; nav chuyển sang trang khác. Đừng dùng tab để điều hướng toàn cục.

## 4. Chỉ báo vị trí hiện tại
Đây là thứ bị quên nhiều nhất. Mục đang active cần **ít nhất 2 tín hiệu**: màu + thanh chỉ báo, hoặc màu + icon filled. Chỉ đổi màu chữ là không đủ cho người mù màu.

## 5. Accessibility & bàn phím
- `<nav>` với `aria-label` phân biệt khi có nhiều vùng nav.
- Mục hiện tại: `aria-current="page"`.
- Menu bật lên: `aria-expanded`, đóng bằng **Esc**, trả focus về nút mở.
- Điều hướng trong menu bằng **phím mũi tên**, Tab để thoát ra.
- **Skip to content** link ở đầu trang.

## 6. Checklist
- [ ] Người dùng có biết mình đang ở đâu không?
- [ ] Menu chính có quá 7 mục không?
- [ ] Mục active có ≥2 tín hiệu thị giác không?
- [ ] Submenu có tự lật khi gần mép màn hình không?
- [ ] Menu đóng được bằng Esc và bằng click ra ngoài chứ?
- [ ] Mục menu cao ≥44px chưa?
- [ ] Trên mobile, các đích đến chính có nằm trong tầm ngón cái không?

## Tham khảo
- NN/g — *Menu Design: Checklist of 15 UX Guidelines*: https://www.nngroup.com/articles/menu-design/
- NN/g — *Hamburger Menus and Hidden Navigation Hurt UX*: https://www.nngroup.com/articles/hamburger-menus/
- NN/g — *Mega Menus Work Well*: https://www.nngroup.com/articles/mega-menus-work-well/
- Material Design 3 — *Navigation bar / rail / drawer*: https://m3.material.io/components
- WAI-ARIA APG — *Menu, Menubar, Disclosure*: https://www.w3.org/WAI/ARIA/apg/patterns/

## Liên kết
[[Information Architecture]] · [[Iconography & Imagery]] · [[Accessibility]] · [[UIUX]]
