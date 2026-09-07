---
tags: [frontend, javascript, performance]
status: evergreen
---
# Web Workers & Background APIs

> JavaScript trên web là **một luồng**. Mọi thứ — sự kiện, layout, paint, animation — chia nhau một main thread. Worker là cách duy nhất để thực sự chạy song song; phần còn lại của note này là cách nhường lại main thread cho người dùng.

## 1. Khái niệm cốt lõi

### Các loại worker

| Loại | Phạm vi | Dùng để |
|---|---|---|
| **Dedicated Worker** | Một trang | Tính toán nặng, parse dữ liệu lớn |
| **Shared Worker** | Nhiều tab cùng origin | State dùng chung, một kết nối WebSocket cho mọi tab |
| **Service Worker** | Origin, sống ngoài trang | Proxy mạng, offline, push |
| **Worklet** | Rất hẹp, hiệu năng cao | Audio (`AudioWorklet`), CSS Paint |

### Worker không có gì

Worker **không** truy cập được: `window`, `document`, DOM, `localStorage`, `alert`.
Worker **có**: `fetch`, `IndexedDB`, `WebSocket`, `Cache`, `OPFS`, `postMessage`, hầu hết API tính toán.

```js
// main
const w = new Worker(new URL('./heavy.js', import.meta.url), { type: 'module' })
w.postMessage(data)
w.onmessage = (e) => render(e.data)

// heavy.js
onmessage = (e) => { postMessage(process(e.data)) }
```

Dữ liệu qua `postMessage` được **structured clone** (sao chép). Với dữ liệu lớn, dùng **transferable** để chuyển quyền sở hữu thay vì sao chép:

```js
w.postMessage(buffer, [buffer])   // buffer không dùng được ở main nữa
```

### Service Worker — vòng đời

```
install → (waiting) → activate → fetch/push/sync
```

```js
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r ?? fetch(e.request))
  )
})
```

| Chiến lược cache | Dùng cho |
|---|---|
| Cache first | Asset có hash trong tên (bất biến) |
| Network first | HTML, dữ liệu hay đổi |
| Stale-while-revalidate | Avatar, dữ liệu chấp nhận cũ một chút |
| Network only | Request có tác dụng phụ (POST) |

> [!warning] Service Worker có thể "khoá" người dùng vào phiên bản cũ
> Service worker mới chỉ **activate** sau khi mọi tab dùng bản cũ đã đóng. Một service worker cache HTML sai cách có thể phục vụ bản cũ **mãi mãi**, kể cả sau khi deploy. Luôn có đường thoát: `self.skipWaiting()` + `clients.claim()`, và một cơ chế cho phép người dùng buộc cập nhật. Đây là lỗi production khó sửa nhất trong nhóm này, vì bạn không thể deploy bản vá cho người đang bị kẹt.

### API chạy nền

| API | Dùng để |
|---|---|
| **Background Fetch** | Tải file lớn, tiếp tục khi tab đóng, có UI của trình duyệt |
| **Background Sync** | Chạy lại tác vụ khi có mạng trở lại |
| **Periodic Background Sync** | Đồng bộ định kỳ (chỉ PWA đã cài) |
| **Push API** + **Notifications API** | Thông báo đẩy từ server |
| **Content Index API** | Đăng ký nội dung offline cho trình duyệt biết |

### Nhường main thread

| Cách | Khi nào |
|---|---|
| `requestIdleCallback(fn)` | Việc không gấp, chạy khi rảnh |
| `scheduler.postTask(fn, { priority })` | Ưu tiên rõ ràng: `user-blocking` / `user-visible` / `background` |
| `scheduler.yield()` | Cắt một task dài thành nhiều mảnh, nhường giữa chừng |
| `requestAnimationFrame(fn)` | Việc gắn với frame kế tiếp |
| `queueMicrotask(fn)` | Sau task hiện tại, trước render |

**Long task** = task > 50ms. Chúng là nguyên nhân trực tiếp của INP kém — xem [[Core Web Vitals]].

### Vòng đời trang

| API | Dùng để |
|---|---|
| **Page Visibility API** | `document.visibilityState` — dừng animation/polling khi tab ẩn |
| `visibilitychange` | Điểm đáng tin cậy để lưu state và gửi analytics |
| **Web Locks API** | Đảm bảo chỉ một tab làm một việc (refresh token) |
| **bfcache** | Trang được giữ nguyên trong bộ nhớ khi back — đừng phá nó |

## 2. Nguyên tắc

1. **Worker cho tính toán, không cho I/O.** `fetch` đã bất đồng bộ; đưa nó vào worker không giúp gì. Worker giúp khi có **CPU work** thật: parse CSV lớn, xử lý ảnh, mã hoá, diff.
2. **Dùng Comlink thay `postMessage` thô.** Nó biến worker thành object gọi được bằng `await`, xoá bỏ toàn bộ code lắp ghép message.
3. **Transferable cho dữ liệu lớn.**
4. **Chia task dài bằng `scheduler.yield()`.** Bất kỳ vòng lặp nào chạy quá 50ms nên nhường.
5. **`visibilitychange` để lưu state, không phải `unload`.** `unload` không đáng tin trên mobile và phá bfcache.
6. **Đừng phá bfcache** — tránh `unload` listener và `Cache-Control: no-store` trên HTML nếu không cần.
7. **Service worker phải có chiến lược cập nhật rõ ràng.** Xem callout.
8. **Dừng polling và animation khi tab ẩn.**
9. **Dùng Workbox thay vì tự viết service worker.** Vòng đời có quá nhiều cạm bẫy.

## 3. Cạm bẫy

- **Service worker phục vụ HTML cũ vĩnh viễn.** Callout ở mục 1.
- **Đưa `fetch` vào worker rồi tưởng nhanh hơn.** Không có tác dụng.
- **`postMessage` với object lớn** — structured clone tốn thời gian trên main thread, đôi khi lâu hơn cả việc tính toán.
- **Worker không `terminate()`** — mỗi worker là một thread thật, tốn RAM.
- **Nghĩ `requestIdleCallback` đảm bảo chạy.** Nó có thể không bao giờ được gọi nếu trang luôn bận; luôn đặt `timeout`.
- **`setTimeout(fn, 0)` không nhường thật** — nó vẫn tạo một task mới trên cùng thread và có clamp tối thiểu ~4ms.
- **Push API cần server và VAPID key** — không phải giải pháp chỉ-frontend.
- **Xin quyền notification ngay khi load trang.** Tỉ lệ chấp nhận rất thấp và nhiều trình duyệt phạt. Xin sau một hành động có ngữ cảnh.
- **Worker không debug được bằng `console.log` trong một số setup** — dùng tab Sources → Threads của DevTools.
- **Background Sync chỉ có ở Chromium.**
- **Long task từ thư viện bên thứ ba** không sửa được bằng `yield` của bạn — phải bỏ hoặc tải lười thư viện đó.

## 4. Checklist áp dụng

- [ ] Việc này là CPU-bound không? Nếu không, worker không giúp.
- [ ] Có task nào chạy quá 50ms không?
- [ ] Worker có `terminate()` khi xong không?
- [ ] Dữ liệu lớn có dùng transferable không?
- [ ] Service worker có cơ chế cập nhật và thoát hiểm không?
- [ ] Polling/animation có dừng khi tab ẩn không?
- [ ] State có lưu ở `visibilitychange` thay vì `unload` không?
- [ ] Trang có còn dùng được bfcache không?
- [ ] Xin quyền notification có đúng ngữ cảnh không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Comlink | Gọi hàm trong worker như gọi hàm thường | https://github.com/GoogleChromeLabs/comlink |
| Workbox | Bộ công cụ service worker | https://developer.chrome.com/docs/workbox |
| DevTools → Application → Service Workers | Update, unregister, bypass | https://developer.chrome.com/docs/devtools/progressive-web-apps |
| DevTools → Performance → Main | Nhìn thấy long task | https://developer.chrome.com/docs/devtools/performance |
| bfcache tester | Kiểm tra trang có vào bfcache không | https://developer.chrome.com/docs/devtools/application/back-forward-cache |

## Tham khảo

- MDN — *Web Workers API*: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
- MDN — *Service Worker API*: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- MDN — *Page Visibility API*: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- MDN — *Prioritized Task Scheduling API*: https://developer.mozilla.org/en-US/docs/Web/API/Prioritized_Task_Scheduling_API
- web.dev — *Optimize long tasks*: https://web.dev/articles/optimize-long-tasks

## Liên kết

[[Web APIs Map]] · [[Core Web Vitals]] · [[Frontend Performance Budget]] · [[Browser Storage APIs]] · [[Frontend]]
