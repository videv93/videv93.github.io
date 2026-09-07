---
tags: [frontend, nền-tảng]
status: evergreen
---
# Semantic HTML

> Chọn thẻ theo **nghĩa của nội dung**, không theo hình dáng bạn muốn — vì hành vi bàn phím, screen reader và SEO đều đến miễn phí từ nghĩa, còn hình dáng thì CSS lo được.

> [!note] Ghi chú nguồn
> Danh sách dos & don'ts ở mục 2 đến từ hướng dẫn W3C, được ghi lại trong seed qua bài *HTML Dos and Don'ts* (Uxcel) trong `0. Readwise/Articles/`. Note này trả lời đầy đủ danh sách đó.

## 1. Khái niệm cốt lõi

### Chọn thẻ theo nghĩa

| Nội dung là gì | Dùng | Đừng dùng |
|---|---|---|
| Điều hướng tới nơi khác | `<a href>` | `<div onclick>` |
| Kích hoạt hành động | `<button>` | `<a href="#">` |
| Nhóm điều hướng | `<nav>` | `<div class="nav">` |
| Nội dung độc lập, tái sử dụng được | `<article>` | `<div class="post">` |
| Nhóm chủ đề có heading | `<section>` | `<div>` |
| Nội dung phụ, tách được | `<aside>` | `<div class="sidebar">` |
| Danh sách | `<ul>` / `<ol>` / `<dl>` | `<div>` lặp |
| Dữ liệu dạng bảng | `<table>` + `<th scope>` | `<div class="grid">` |
| Đóng/mở nội dung | `<details><summary>` | `<div>` + JS |
| Nhấn mạnh giọng | `<em>` | `<i>` |
| Quan trọng | `<strong>` | `<b>` |
| Chỉ để móc CSS | `<div>` / `<span>` | — đây mới là chỗ của chúng |

**Nguyên tắc chọn nhanh:** nếu bạn phải thêm `tabindex`, `role` và một handler bàn phím để làm cho nó hoạt động, thì đã có sẵn một element làm đúng việc đó rồi.

### `<div>` không xấu

`<div>` và `<span>` là element **không có nghĩa** — và đó chính xác là mục đích của chúng. Dùng chúng khi bạn cần một cái móc để tạo layout hoặc style. Sai lầm không phải là dùng `<div>`, mà là dùng `<div>` ở chỗ đã có element mang nghĩa.

### Modularity

Khi site lớn hơn vài trang, phải nghĩ theo **module**: header, nav, footer, logo, card được viết một lần và dùng lại khắp nơi.

Lợi ích kép:
- **Không lặp lại chính mình** — viết một lần, link đi mọi nơi.
- **Dễ bảo trì** — sửa một chỗ, đổi mọi nơi.

Chi phí: tốn công hơn lúc đầu. Đổi lại là một codebase sạch, dễ mở rộng. Đây chính là mầm mống của tư duy component ([[React Mental Model]]) và của [[Design System]] bên UIUX.

## 2. Nguyên tắc — dos & don'ts của W3C

1. **Viết thường tên element.** `<div>` không phải `<DIV>`.
2. **Đóng mọi element.** Kể cả `<li>` và `<p>` mà spec cho phép bỏ.
3. **Viết thường tên attribute.** `href` không phải `HREF`.
4. **Luôn bọc giá trị attribute trong dấu nháy.** Bắt buộc khi giá trị có khoảng trắng: `class="btn primary"`.
5. **Luôn có `alt`, `width`, `height` cho ảnh.** `alt` cho a11y; `width`/`height` để trình duyệt giữ chỗ và tránh CLS.
6. **Không thêm khoảng trắng quanh dấu `=`.** `class="x"` chứ không `class = "x"`.
7. **Tránh dòng code quá dài.** Người đọc không nên phải cuộn ngang.
8. **Dùng dòng trống và thụt lề có chủ đích.** Một dòng trống giữa các khối logic; đừng thụt lề vô tội vạ.
9. **Không bao giờ bỏ `<title>`.**
10. **Không bỏ `<html>`, `<head>`, `<body>`** dù spec cho phép.
11. **`alt=""` cho ảnh trang trí** — khác hẳn việc thiếu `alt`. Rỗng có nghĩa "bỏ qua tôi"; thiếu có nghĩa screen reader sẽ đọc tên file.

## 3. Cạm bẫy

- **`<a>` giả làm button.** `<a href="#" onclick>` phản hồi Enter nhưng không phản hồi Space, và bị công bố là "link" — người dùng screen reader tưởng sẽ đi đâu đó.
- **`<button>` giả làm link.** Ngược lại: mất Ctrl-click, mở tab mới, copy địa chỉ.
- **`<section>` không có heading.** Nếu không có `<h*>`, dùng `<div>`.
- **Dùng heading để chỉnh cỡ chữ.** `<h4>` vì nó nhỏ hơn là phá vỡ outline; dùng `<h2>` + CSS.
- **`<br>` để tạo khoảng cách.** Đó là việc của `margin`.
- **Bảng để làm layout.** Screen reader sẽ đọc nó như dữ liệu bảng.
- **`<i>` cho icon vẫn phổ biến nhưng nên bọc `aria-hidden="true"`** và đặt nhãn thật ở nơi khác.
- **Nghĩ rằng semantic HTML là chuyện SEO.** SEO chỉ là hệ quả; lý do chính là hành vi bàn phím và trợ năng đến sẵn.

## 4. Checklist áp dụng

- [ ] Mỗi element tương tác có phải là `<a>` hoặc `<button>` thật không?
- [ ] Có `<section>` nào thiếu heading không?
- [ ] Thứ tự heading có nhảy cấp không?
- [ ] Mọi `<img>` có `alt` (rỗng nếu trang trí) và `width`/`height` chưa?
- [ ] Bỏ hết CSS đi, trang có còn đọc hiểu được theo thứ tự không?
- [ ] Chỉ dùng bàn phím, có tới được mọi chức năng không?
- [ ] Các khối lặp lại đã tách thành module dùng lại chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| W3C Markup Validator | Kiểm tra tính hợp lệ | https://validator.w3.org/ |
| axe DevTools | Bắt lỗi semantic ảnh hưởng a11y | https://www.deque.com/axe/devtools/ |
| Chrome Accessibility Tree | Xem trang dưới mắt screen reader | https://developer.chrome.com/docs/devtools/accessibility/reference |

## Tham khảo

- MDN — *HTML element reference*: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements
- WHATWG — *Sections*: https://html.spec.whatwg.org/multipage/sections.html
- W3C — *HTML style guide & coding conventions*: https://www.w3schools.com/html/html5_syntax.asp
- MDN — *HTML: A good basis for accessibility*: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML

## Liên kết

[[HTML Document Anatomy]] · [[Accessible Markup & ARIA]] · [[HTML Forms & Validation]] · [[Accessibility]] · [[Frontend]]
