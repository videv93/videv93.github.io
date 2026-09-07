---
tags: [frontend, javascript, dom]
status: evergreen
---
# DOM & Events

> DOM là cây object trình duyệt dựng từ HTML — **không phải** HTML bạn viết. Trình duyệt sửa markup sai, script thêm node, framework thay thế cả nhánh. Debug DOM bắt đầu từ việc chấp nhận điều đó.

## 1. Khái niệm cốt lõi

### Truy vấn

| Cách | Trả về | Live? |
|---|---|---|
| `querySelector(sel)` | Element đầu tiên hoặc `null` | — |
| `querySelectorAll(sel)` | **NodeList tĩnh** | ❌ |
| `getElementById(id)` | Element | — |
| `getElementsByClassName()` | **HTMLCollection sống** | ✅ |
| `getElementsByTagName()` | HTMLCollection sống | ✅ |
| `closest(sel)` | Tổ tiên gần nhất khớp (kể cả chính nó) | — |
| `matches(sel)` | boolean | — |

**Live collection cập nhật khi DOM đổi** — lặp qua nó trong khi thêm/xoá node là vòng lặp vô hạn kinh điển.

### Thao tác

| Cách | Ghi chú |
|---|---|
| `textContent` | An toàn, nhanh |
| `innerHTML` | ⚠️ **Vector XSS** nếu dữ liệu không tin cậy |
| `insertAdjacentHTML(pos, html)` | Chèn không phá node hiện có; vẫn có rủi ro XSS |
| `append()` / `prepend()` | Nhận nhiều node **và chuỗi**; chuỗi được escape an toàn |
| `replaceChildren()` | Xoá hết rồi thêm |
| `cloneNode(deep)` | Nhân bản |
| `<template>` + `content.cloneNode(true)` | Nhân bản cấu trúc hiệu quả |
| `DocumentFragment` | Gom nhiều thay đổi thành một lần chèn |

### Event flow — ba pha

```
window → document → html → body → … → target     (1. CAPTURE)
                                       target      (2. TARGET)
target → … → body → html → document → window      (3. BUBBLE)
```

`addEventListener(type, handler, options)`:

| Option | Nghĩa |
|---|---|
| `capture: true` | Bắt ở pha capture thay vì bubble |
| `once: true` | Tự gỡ sau lần đầu |
| `passive: true` | Hứa không gọi `preventDefault()` → **cuộn không bị chặn** |
| `signal: AbortSignal` | Gỡ listener bằng `controller.abort()` |

`signal` là cách gỡ listener tốt nhất hiện nay — một `AbortController` gỡ được hàng chục listener cùng lúc, không cần giữ tham chiếu tới từng hàm.

### `stopPropagation` vs `preventDefault`

| | Làm gì |
|---|---|
| `preventDefault()` | Huỷ **hành vi mặc định** (submit form, theo link) |
| `stopPropagation()` | Chặn event **đi tiếp** lên cây |
| `stopImmediatePropagation()` | Chặn cả listener khác **trên cùng element** |

Chúng độc lập. `preventDefault()` không dừng bubble; `stopPropagation()` không huỷ hành vi mặc định.

### Event delegation

Gắn **một** listener trên cha thay vì n listener trên con:

```js
list.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]')
  if (!btn || !list.contains(btn)) return
  handle(btn.dataset.action)
})
```

Hoạt động với node thêm sau, và tốn một listener thay vì n.

### Custom events

```js
el.dispatchEvent(new CustomEvent('item:selected', {
  detail: { id }, bubbles: true, composed: true,
}))
```

`composed: true` để event thoát ra khỏi shadow DOM — xem [[Web Components]].

### Đo lường (CSSOM view)

| Thuộc tính | Trả về |
|---|---|
| `getBoundingClientRect()` | Vị trí + kích thước so với viewport, **có tính transform** |
| `offsetWidth/Height` | Kích thước layout kể cả border, làm tròn số nguyên |
| `clientWidth/Height` | Kích thước trong padding, không kể scrollbar |
| `scrollWidth/Height` | Kích thước nội dung kể cả phần tràn |

**Mọi thuộc tính này đều buộc layout đồng bộ** — xem [[Browser Rendering Pipeline]].

## 2. Nguyên tắc

1. **`textContent` mặc định, `innerHTML` chỉ với dữ liệu bạn kiểm soát.** Với HTML không tin cậy: HTML Sanitizer API hoặc DOMPurify.
2. **`passive: true` cho mọi listener `scroll`, `touchstart`, `wheel`** không gọi `preventDefault()`. Đây là một trong những cải thiện cuộn rẻ nhất.
3. **Dùng `AbortController` để dọn listener.**
4. **Delegation cho danh sách động.**
5. **Gom đọc rồi gom ghi** — tránh layout thrashing.
6. **`DocumentFragment` khi chèn nhiều node.**
7. **Đừng đọc DOM để lưu state trong app có framework.** DOM là output, không phải nguồn sự thật — xem [[React Mental Model]].
8. **Sự kiện bàn phím: kiểm `e.key`, không `e.keyCode`.** `keyCode` đã deprecated.

## 3. Cạm bẫy

- **`innerHTML` với dữ liệu người dùng = XSS.** Cạm bẫy nghiêm trọng nhất trong note này.
- **Live HTMLCollection trong vòng lặp** → vòng lặp vô hạn hoặc bỏ sót phần tử. `querySelectorAll` trả về NodeList **tĩnh**, an toàn hơn.
- **Listener không gỡ = memory leak**, nhất là trong SPA.
- **`stopPropagation()` phá delegation của thư viện khác** — dropdown không đóng khi click ra ngoài. Dùng rất tiết chế.
- **`scroll` listener không `passive`** chặn cuộn mượt; Chrome cảnh báo trong console.
- **Đọc `offsetWidth` trong vòng lặp** = layout thrashing.
- **`e.target` vs `e.currentTarget`.** `target` là nơi event **xuất phát** (có thể là con); `currentTarget` là element **gắn listener**. Nhầm hai cái này là lỗi delegation phổ biến nhất.
- **Event trong shadow DOM bị retarget** — `e.target` từ ngoài chỉ thấy host, trừ khi `composed: true`.
- **`click` trên element không phải button/link không có bàn phím.** Xem [[Accessible Markup & ARIA]].
- **`DOMContentLoaded` vs `load`.** `DOMContentLoaded` khi DOM sẵn sàng; `load` khi mọi ảnh/iframe xong (chậm hơn nhiều).
- **`getBoundingClientRect()` trả số thực và thay đổi khi cuộn** — nó tương đối với viewport, không phải document.

## 4. Checklist áp dụng

- [ ] Có `innerHTML` nào nhận dữ liệu không tin cậy không?
- [ ] Listener `scroll`/`touch` có `passive: true` chưa?
- [ ] Listener có được gỡ khi component unmount không?
- [ ] Đang dùng `e.target` hay `e.currentTarget` — đúng cái cần chưa?
- [ ] Có vòng lặp nào vừa đọc kích thước vừa ghi style không?
- [ ] Danh sách động có dùng delegation không?
- [ ] `stopPropagation()` này có thực sự cần không?
- [ ] Element click được có dùng bằng bàn phím không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → Elements → Event Listeners | Xem mọi listener đang gắn | https://developer.chrome.com/docs/devtools/dom |
| `monitorEvents(el)` | Log mọi event trên element từ console | https://developer.chrome.com/docs/devtools/console/utilities |
| DOMPurify | Làm sạch HTML | https://github.com/cure53/DOMPurify |
| DevTools → Memory | Bắt detached DOM node (leak) | https://developer.chrome.com/docs/devtools/memory-problems |

## Tham khảo

- MDN — *Document Object Model*: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- MDN — *Event bubbling and capture*: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling
- MDN — *EventTarget.addEventListener()*: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- MDN — *CSSOM view API*: https://developer.mozilla.org/en-US/docs/Web/API/CSSOM_view_API
- MDN — *HTML Sanitizer API*: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API

## Liên kết

[[Web APIs Map]] · [[Browser Rendering Pipeline]] · [[Observer APIs]] · [[Web Components]] · [[React Mental Model]] · [[Frontend]]
