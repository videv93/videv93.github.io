---
tags: [frontend, javascript, component]
status: evergreen
---
# Web Components

> Component gốc của trình duyệt: không cần framework, không cần build, sống lâu hơn mọi thư viện. Đổi lại, chúng thô sơ hơn React ở gần như mọi mặt — biết chọn đúng chỗ dùng mới có giá trị.

## 1. Khái niệm cốt lõi

### Ba trụ cột

| Phần | Cho |
|---|---|
| **Custom Elements** | Định nghĩa thẻ HTML mới có hành vi |
| **Shadow DOM** | Cách ly DOM và CSS thật sự |
| **`<template>` / `<slot>`** | Khuôn mẫu và chèn nội dung |

```js
class UserCard extends HTMLElement {
  static observedAttributes = ['name']

  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>:host { display: block } h3 { color: var(--card-color, black) }</style>
      <h3><slot name="title"></slot></h3>
    `
  }
  attributeChangedCallback(name, oldV, newV) { ... }
  disconnectedCallback() { ... }
}
customElements.define('user-card', UserCard)
```

Tên custom element **bắt buộc có dấu gạch ngang** — đó là cách trình duyệt phân biệt với thẻ chuẩn.

### Lifecycle callbacks

| Callback | Khi nào |
|---|---|
| `constructor` | Tạo instance — **không** được đụng attribute hay con |
| `connectedCallback` | Gắn vào DOM — chỗ để render |
| `disconnectedCallback` | Gỡ khỏi DOM — chỗ để dọn dẹp |
| `attributeChangedCallback` | Attribute trong `observedAttributes` đổi |
| `adoptedCallback` | Chuyển sang document khác |

### Shadow DOM — cách ly hai chiều

CSS bên ngoài **không** vào được; CSS bên trong **không** ra được. Ba lối đi có chủ đích:

| Cơ chế | Cho phép |
|---|---|
| **Custom property** | `var(--card-color)` xuyên qua ranh giới — kế thừa vẫn hoạt động |
| **`::part(name)`** | Component mở một element cụ thể cho style bên ngoài |
| **`:host` / `:host-context()`** | Component tự style chính nó theo ngữ cảnh |
| **`<slot>`** | Nội dung được chèn giữ style của **document ngoài**, không phải của shadow |

`mode: 'open'` cho phép JS ngoài truy cập `el.shadowRoot`; `mode: 'closed'` thì không (nhưng đây không phải cơ chế bảo mật).

### Slot

```html
<user-card>
  <span slot="title">Alice</span>     <!-- vào <slot name="title"> -->
  <p>Nội dung mặc định</p>            <!-- vào <slot> không tên -->
</user-card>
```

Nội dung slot vẫn nằm trong **light DOM** — nó được *chiếu* vào shadow, không bị chuyển. Đó là lý do nó giữ style bên ngoài.

### Form-associated custom elements

```js
static formAssociated = true
#internals = this.attachInternals()
// this.#internals.setFormValue(v)
// this.#internals.setValidity({ valueMissing: true }, 'Bắt buộc')
// this.#internals.role = 'textbox'
```

`ElementInternals` cho phép custom element tham gia form thật (submit, validation, `FormData`) và khai báo role/state cho accessibility tree. Không có nó, một `<my-input>` là vô hình với `<form>`.

### Khi nào dùng Web Components

| Dùng khi | Không dùng khi |
|---|---|
| Component chia sẻ giữa nhiều framework | App đã dùng một framework duy nhất |
| Design system cho tổ chức nhiều stack | Cần state phức tạp, data fetching |
| Widget nhúng vào site của người khác | Cần SSR đơn giản |
| Cần cách ly CSS thật (nội dung không tin cậy) | Team đã quen React và không có lý do đổi |
| Cần sống lâu hơn framework hiện tại | Đang tối ưu trải nghiệm developer |

## 2. Nguyên tắc

1. **Dùng thư viện, đừng viết tay.** API gốc rất thô. **Lit** (~5KB) thêm reactive property, template hiệu quả, và xoá phần lớn code lắp ghép.
2. **Attribute cho dữ liệu đơn giản, property cho object.** Attribute chỉ nhận chuỗi.
3. **Phơi bày API style qua custom property và `::part()`** ngay từ đầu. Thêm sau rất khó vì không ai biết cần mở cái gì.
4. **`composed: true` cho custom event** cần thoát ra khỏi shadow — xem [[DOM & Events]].
5. **`ElementInternals` cho mọi component dạng form control.**
6. **`:host { display: block }`** — custom element mặc định là `inline`, gây bất ngờ về layout.
7. **Progressive enhancement**: viết HTML có nghĩa bên trong thẻ, nâng cấp bằng JS. Nếu JS hỏng, vẫn còn nội dung.
8. **Đừng dùng shadow DOM nếu không cần cách ly.** Custom element không có shadow vẫn hợp lệ và dễ style hơn nhiều.

## 3. Cạm bẫy

- **Không style xuyên vào được từ ngoài.** Đây vừa là tính năng vừa là cạm bẫy — Tailwind và design system bên ngoài **không** áp dụng được vào shadow DOM. Phải nhân bản CSS vào shadow hoặc dùng `adoptedStyleSheets`.
- **FOUC trước khi custom element định nghĩa xong.** Dùng `:not(:defined) { visibility: hidden }` hoặc `customElements.whenDefined()`.
- **Đụng attribute trong `constructor`** vi phạm spec và crash khi trình duyệt nâng cấp element có sẵn.
- **SSR khó.** Declarative Shadow DOM đã có nhưng hỗ trợ framework còn lệch.
- **React (trước v19) truyền mọi thứ thành attribute** — object thành `"[object Object]"`. React 19 đã sửa; các phiên bản trước cần `ref` để set property.
- **Event không `composed` không thoát ra ngoài.**
- **Custom element mặc định `display: inline`.**
- **Form không thấy `<my-input>`** nếu thiếu `formAssociated`.
- **Accessibility phải tự làm hết.** Không có role, không có quản lý focus miễn phí. `ElementInternals` giúp một phần.
- **`mode: 'closed'` không phải bảo mật** — nó chỉ gây khó cho debug và test.
- **Slot content không style được từ shadow CSS** trừ qua `::slotted()`, thứ chỉ chọn được con trực tiếp.

## 4. Checklist áp dụng

- [ ] Đây có thực sự là chỗ cần Web Component thay vì component framework không?
- [ ] Có cần shadow DOM không, hay custom element trần là đủ?
- [ ] Đã phơi bày custom property và `::part()` cho việc style chưa?
- [ ] `:host` có `display` tường minh chưa?
- [ ] Custom event có `composed: true` khi cần không?
- [ ] Component dạng form có `formAssociated` và `ElementInternals` chưa?
- [ ] Có xử lý FOUC trước khi định nghĩa xong không?
- [ ] Role, nhãn và focus đã tự làm chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Lit | Base class nhẹ cho web component | https://lit.dev/ |
| Custom Elements Manifest | Mô tả API component cho công cụ đọc | https://custom-elements-manifest.open-wc.org/ |
| Shoelace / Web Awesome | Thư viện component sẵn dùng | https://shoelace.style/ |
| DevTools → Elements | Bật "Show user agent shadow DOM" | https://developer.chrome.com/docs/devtools/dom |

## Tham khảo

- MDN — *Web Components*: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
- MDN — *Using shadow DOM*: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
- MDN — *CSS shadow parts / `::part()`*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Shadow_parts
- MDN — *ElementInternals*: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
- web.dev — *Declarative Shadow DOM*: https://web.dev/articles/declarative-shadow-dom

## Liên kết

[[DOM & Events]] · [[Component Library Strategy]] · [[CSS Architecture]] · [[Web APIs Map]] · [[Frontend]]
