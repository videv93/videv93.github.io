---
tags: [frontend, javascript, performance]
status: evergreen
---
# Observer APIs

> Bốn observer thay thế mọi lý do chính đáng để gắn listener vào `scroll` và `resize`. Chúng chạy **ngoài main thread hoặc theo nhịp của trình duyệt**, nên không gây layout thrashing.

## 1. Khái niệm cốt lõi

### Bảng đối chiếu

| Observer | Quan sát | Thay thế |
|---|---|---|
| **IntersectionObserver** | Element vào/ra viewport hoặc một element khác | `scroll` + `getBoundingClientRect()` |
| **ResizeObserver** | Element đổi kích thước | `window.resize` |
| **MutationObserver** | DOM thay đổi | polling |
| **PerformanceObserver** | Số đo hiệu năng | timing thủ công |

### IntersectionObserver

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { load(e.target); io.unobserve(e.target) }
  }
}, {
  root: null,               // null = viewport
  rootMargin: '200px 0px',  // kích hoạt sớm 200px
  threshold: 0,             // 0 = chạm mép, 1 = toàn bộ hiện
})
```

Dùng cho: lazy-load, infinite scroll, đo impression quảng cáo, sticky header khi cuộn qua mốc.

**`rootMargin` là công cụ then chốt** — nó cho phép bắt đầu tải *trước* khi người dùng cuộn tới.

> [!note] Nhiều thứ trong nhóm này đã thành CSS thuần
> - Lazy-load ảnh → `<img loading="lazy">`
> - Hiệu ứng reveal khi cuộn → `animation-timeline: view()`, xem [[CSS Transitions & Animations]]
> - Component đổi layout theo kích thước → `@container`, xem [[Responsive Layout]]
>
> Chỉ dùng observer khi cần **chạy JavaScript**, không phải khi chỉ cần đổi style.

### ResizeObserver

```js
const ro = new ResizeObserver((entries) => {
  for (const e of entries) {
    const { inlineSize, blockSize } = e.contentBoxSize[0]
    chart.resize(inlineSize, blockSize)
  }
})
ro.observe(el)
```

Ưu điểm so với `window.resize`: bắt được cả khi element đổi kích thước vì **layout đổi** (sidebar mở, nội dung thêm), không chỉ khi cửa sổ đổi.

`e.borderBoxSize` · `e.contentBoxSize` · `e.devicePixelContentBoxSize` — dùng chúng thay vì gọi `getBoundingClientRect()` bên trong callback.

### MutationObserver

```js
const mo = new MutationObserver((records) => { ... })
mo.observe(el, { childList: true, subtree: true, attributes: true,
                 attributeFilter: ['data-state'] })
```

Dùng khi phải phản ứng với DOM do **code bên ngoài tầm kiểm soát** thay đổi — widget bên thứ ba, extension, CMS. Trong app có framework, gần như luôn có cách tốt hơn.

### PerformanceObserver

```js
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) report(entry)
}).observe({ type: 'largest-contentful-paint', buffered: true })
```

Loại entry: `largest-contentful-paint` · `layout-shift` · `event` (cho INP) · `longtask` · `long-animation-frame` · `navigation` · `resource` · `paint` · `mark` · `measure` · `element`.

`buffered: true` lấy cả entry xảy ra **trước khi** observer được tạo — bắt buộc cho LCP. Xem [[Core Web Vitals]].

## 2. Nguyên tắc

1. **Dùng CSS trước, observer sau.** Xem callout.
2. **`unobserve()` khi xong việc.** Lazy-load xong một ảnh thì thôi quan sát nó.
3. **`disconnect()` khi component unmount** — nếu không, observer giữ tham chiếu tới element đã gỡ khỏi DOM = memory leak.
4. **Một observer cho nhiều element**, không phải một observer mỗi element. Callback nhận mảng entry.
5. **Đọc kích thước từ `entry`**, không gọi `getBoundingClientRect()` trong callback ResizeObserver — sẽ gây layout đồng bộ.
6. **`rootMargin` để tải sớm.**
7. **`buffered: true` cho mọi số đo hiệu năng.**
8. **`attributeFilter` để giới hạn MutationObserver** — quan sát mọi attribute trên subtree lớn rất đắt.

## 3. Cạm bẫy

- **`ResizeObserver loop completed with undelivered notifications`.** Xảy ra khi callback **đổi kích thước** của element đang quan sát → vòng lặp. Sửa: bọc thay đổi trong `requestAnimationFrame`, hoặc đừng ghi vào element đang observe.
- **Observer không disconnect = leak.** Nó giữ element sống trong bộ nhớ.
- **`threshold: 1` không bao giờ kích hoạt** với element cao hơn viewport — không bao giờ hiện 100% được.
- **IntersectionObserver không bắt được element `display: none`** — nó không có box.
- **MutationObserver bắn theo microtask, gộp nhiều thay đổi** — đừng giả định một record một thay đổi.
- **PerformanceObserver không có `buffered: true` bỏ lỡ LCP** vì LCP thường xảy ra trước khi script chạy.
- **`root` phải là tổ tiên của target.** Nếu không, không entry nào bắn và không có lỗi.
- **Callback chạy trên main thread** — làm việc nặng trong đó vẫn gây jank.
- **`rootMargin` với `root: null` không nhận giá trị `%` trong một số trình duyệt.**
- **Quan sát element chưa mount** không có tác dụng và không báo lỗi.

## 4. Checklist áp dụng

- [ ] Việc này có làm được bằng CSS thuần (`loading="lazy"`, `@container`, `animation-timeline`) không?
- [ ] Observer có `disconnect()` khi unmount không?
- [ ] Có dùng một observer cho nhiều element không?
- [ ] Callback ResizeObserver có gọi `getBoundingClientRect()` không?
- [ ] Callback có đổi kích thước element đang quan sát không?
- [ ] PerformanceObserver có `buffered: true` không?
- [ ] MutationObserver có `attributeFilter` để thu hẹp không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `web-vitals` | Bọc PerformanceObserver, đúng chuẩn Google | https://github.com/GoogleChrome/web-vitals |
| DevTools → Performance | Xem long task từ callback observer | https://developer.chrome.com/docs/devtools/performance |
| `usehooks-ts` | Hook React bọc các observer | https://usehooks-ts.com/ |

## Tham khảo

- MDN — *Intersection Observer API*: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN — *Resize Observer API*: https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API
- MDN — *MutationObserver*: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
- MDN — *Performance APIs*: https://developer.mozilla.org/en-US/docs/Web/API/Performance_API
- web.dev — *Debounce your input handlers*: https://web.dev/articles/debounce-your-input-handlers

## Liên kết

[[Web APIs Map]] · [[Browser Rendering Pipeline]] · [[Core Web Vitals]] · [[CSS Transitions & Animations]] · [[Responsive Layout]] · [[Frontend]]
