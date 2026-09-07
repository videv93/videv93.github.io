---
tags: [frontend, nền-tảng]
status: evergreen
---
# HTML Document Anatomy

> `<head>` không phải chỗ để nhét thẻ cho đủ — thứ tự các thẻ trong đó quyết định trang của bạn hiển thị sau bao nhiêu mili-giây.

## 1. Khái niệm cốt lõi

### Ba khối bắt buộc

| Khối | Vai trò | Ghi chú |
|---|---|---|
| `<!DOCTYPE html>` | Bật standards mode | Thiếu nó → quirks mode, box model cũ |
| `<head>` | Metadata, không render | Thứ tự quan trọng, xem mục 2 |
| `<body>` | Nội dung render được | Một document chỉ có một |

### Content categories

Mọi element HTML thuộc một hoặc nhiều **content category** — nhóm này quy định element nào được đặt trong element nào:

| Category | Nghĩa | Ví dụ |
|---|---|---|
| **Metadata** | Mô tả document, không hiển thị | `<title>` `<meta>` `<link>` `<style>` |
| **Flow** | Nội dung chung trong `<body>` | hầu hết element |
| **Sectioning** | Định nghĩa phạm vi outline | `<article>` `<aside>` `<nav>` `<section>` |
| **Heading** | Tiêu đề của section | `<h1>`–`<h6>` `<hgroup>` |
| **Phrasing** | Text và markup trong text | `<span>` `<em>` `<a>` `<code>` |
| **Embedded** | Nhập tài nguyên ngoài | `<img>` `<video>` `<canvas>` `<iframe>` |
| **Interactive** | Người dùng tương tác được | `<a>` `<button>` `<input>` `<details>` |

**Vì sao cần biết:** `<div>` bên trong `<p>` là HTML không hợp lệ, và trình duyệt sẽ *tự sửa* bằng cách đóng `<p>` sớm — DOM bạn nhận được khác hẳn markup bạn viết.

### Global attributes

Áp dụng cho **mọi** element: `id`, `class`, `style`, `title`, `lang`, `dir`, `hidden`, `tabindex`, `role`, `contenteditable`, `draggable`, `inert`, `popover`, `data-*`.

`data-*` là kênh chính thức để gắn dữ liệu tuỳ ý vào markup — đọc bằng `element.dataset`, chọn bằng `[data-state="open"]`. Tailwind khai thác nó qua variant `data-*` (xem [[Tailwind Variants & States]]).

### Ngày giờ trong HTML

`<input type="date|time|datetime-local|month|week">`, cùng `<ins datetime>`, `<del datetime>` và `<time datetime>` đều dùng **định dạng chuẩn** — không phải định dạng hiển thị của người dùng:

| Loại | Định dạng | Ví dụ |
|---|---|---|
| Date | `YYYY-MM-DD` | `2026-09-01` |
| Time | `HH:MM[:SS]` | `14:30` |
| Local datetime | `YYYY-MM-DDTHH:MM` | `2026-09-01T14:30` |
| Month / Week | `YYYY-MM` / `YYYY-Www` | `2026-09` / `2026-W36` |
| Duration | `PnDTnHnMnS` | `P2DT3H` |

## 2. Nguyên tắc

1. **Thứ tự trong `<head>`:** `<meta charset>` → `<meta viewport>` → `<title>` → preconnect/preload → CSS → script `defer`. Charset phải nằm trong **1024 byte đầu**, nếu không trình duyệt phải parse lại từ đầu.
2. **`<title>` không bao giờ được bỏ.** Nó là nhãn tab, nhãn bookmark, tiêu đề kết quả tìm kiếm và là thứ screen reader đọc đầu tiên.
3. **`lang` trên `<html>` là bắt buộc thực tế.** Nó quyết định giọng đọc của screen reader, luật ngắt từ, và font mặc định cho CJK.
4. **`defer` cho script phụ thuộc DOM, `async` cho script độc lập.** Không có cả hai = chặn parse.
5. **`<meta name="viewport" content="width=device-width, initial-scale=1">`** — thiếu nó thì mọi media query mobile đều vô nghĩa.
6. **`<html>`, `<head>`, `<body>` có thể bỏ về mặt spec — nhưng đừng bỏ.** Trình duyệt tự chèn lại, còn công cụ và người đọc thì không đoán được.

## 3. Cạm bẫy

- **CSS đặt sau script chặn.** Một `<script>` đồng bộ ở giữa `<head>` chặn cả CSS phía sau nó tải xong → trang trắng lâu hơn.
- **`preload` sai `as`.** `<link rel="preload" as="font">` thiếu `crossorigin` sẽ tải font **hai lần**.
- **Nhầm `<section>` với `<div>`.** `<section>` không có heading là mùi code — nó tạo mục trong outline nhưng không có tên.
- **Nhiều `<h1>` không còn bị phạt, nhưng heading nhảy cấp thì có.** `<h1>` → `<h3>` làm gãy điều hướng bằng heading của screen reader.
- **Thẻ tự đóng kiểu XHTML (`<br />`) vô hại nhưng vô nghĩa** trong HTML5; điều thực sự quan trọng là **đóng mọi element có thể đóng**.
- **`datetime` viết theo locale.** `datetime="01/09/2026"` là sai — không parse được, và mơ hồ giữa ngày 1/9 và 9/1.

## 4. Checklist áp dụng

- [ ] `<meta charset="utf-8">` có nằm ngay đầu `<head>` không?
- [ ] `<html lang="...">` đã đặt đúng ngôn ngữ nội dung chưa?
- [ ] Có `<title>` mô tả được trang khi đọc rời khỏi ngữ cảnh không?
- [ ] Mọi `<script>` đã có `defer` hoặc `async` chưa?
- [ ] Markup có qua validator W3C không lỗi lồng thẻ không?
- [ ] Mọi `datetime` có đúng định dạng ISO không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| W3C Markup Validator | Bắt lỗi lồng thẻ, attribute sai | https://validator.w3.org/ |
| Chrome DevTools → Elements | Xem DOM *sau khi* trình duyệt tự sửa | https://developer.chrome.com/docs/devtools/dom |
| `htmlhint` / `html-validate` | Lint HTML trong CI | https://html-validate.org/ |

## Tham khảo

- MDN — *HTML reference*: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference
- MDN — *Global attributes*: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes
- MDN — *Date and time formats used in HTML*: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Date_and_time_formats
- WHATWG — *HTML Living Standard, content models*: https://html.spec.whatwg.org/multipage/dom.html#content-models

## Liên kết

[[Semantic HTML]] · [[Accessible Markup & ARIA]] · [[HTML Forms & Validation]] · [[Browser Rendering Pipeline]] · [[Frontend]]
