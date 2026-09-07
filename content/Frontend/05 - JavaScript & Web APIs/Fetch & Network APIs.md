---
tags: [frontend, javascript, network]
status: evergreen
---
# Fetch & Network APIs

> `fetch()` không throw khi server trả 404 hay 500. Đây là quyết định thiết kế gây nhiều bug nhất trong API này, và là thứ đầu tiên cần biết.

## 1. Khái niệm cốt lõi

### `fetch` cơ bản

```js
const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
  signal: AbortSignal.timeout(5000),
  credentials: 'same-origin',
  cache: 'no-store',
})

if (!res.ok) throw new Error(`HTTP ${res.status}`)   // ⚠️ bắt buộc
return res.json()
```

> [!warning] `fetch` chỉ reject khi lỗi **mạng**
> 404, 500, 403 đều là response **thành công** với `res.ok === false`. Promise chỉ reject khi không kết nối được, DNS hỏng, CORS chặn, hoặc bị abort. **Mọi wrapper fetch phải kiểm `res.ok`.**

### Response body — chỉ đọc được một lần

`res.json()` · `res.text()` · `res.blob()` · `res.arrayBuffer()` · `res.formData()` · `res.bytes()`

Body là stream, đọc xong là hết. Cần đọc hai lần thì `res.clone()` trước.

### Huỷ và timeout

```js
const c = new AbortController()
fetch(url, { signal: c.signal })
c.abort()

AbortSignal.timeout(5000)                    // timeout dựng sẵn
AbortSignal.any([c.signal, AbortSignal.timeout(5000)])   // kết hợp
```

Cùng `AbortSignal` này gỡ được listener DOM — xem [[DOM & Events]].

### CORS

| Loại request | Điều kiện | Preflight |
|---|---|---|
| **Simple** | GET/HEAD/POST + Content-Type là `text/plain`, `multipart/form-data`, hoặc `application/x-www-form-urlencoded` | Không |
| **Preflighted** | Mọi thứ khác — kể cả `Content-Type: application/json` | `OPTIONS` trước |

| Header | Nghĩa |
|---|---|
| `Access-Control-Allow-Origin` | Origin nào được đọc response |
| `Access-Control-Allow-Credentials` | Cho gửi cookie |
| `Access-Control-Allow-Headers` / `-Methods` | Cho phép gì sau preflight |
| `Access-Control-Max-Age` | Cache preflight bao lâu |

`credentials: 'include'` **không tương thích** với `Access-Control-Allow-Origin: *` — phải ghi origin cụ thể.

### Chọn giao thức realtime

| Nhu cầu | Dùng |
|---|---|
| Request/response một lần | `fetch` |
| Server đẩy một chiều, text | **SSE** (`EventSource`) — tự reconnect, chạy trên HTTP |
| Hai chiều, độ trễ thấp | **WebSocket** |
| Hai chiều, không cần thứ tự, trên HTTP/3 | **WebTransport** |
| Peer-to-peer audio/video | **WebRTC** |
| Gửi analytics khi rời trang | **`navigator.sendBeacon()`** hoặc `fetch(..., { keepalive: true })` |

SSE bị đánh giá thấp: với thông báo, cập nhật tiến độ, và stream token từ LLM, nó đơn giản hơn WebSocket nhiều và tự kết nối lại.

### Streams

```js
const res = await fetch(url)
for await (const chunk of res.body.pipeThrough(new TextDecoderStream())) {
  render(chunk)          // hiển thị dần, không chờ hết
}
```

`ReadableStream` / `WritableStream` / `TransformStream`, cùng `CompressionStream` / `DecompressionStream` (gzip, deflate).

### URL & điều hướng

`new URL(href, base)`, `URLSearchParams`, `URLPattern` (khớp route theo mẫu).
`history.pushState()` / `replaceState()`; **Navigation API** (`navigation.navigate()`, event `navigate`) là bản thay thế hiện đại, xử lý được cả nút back và cuộn.

## 2. Nguyên tắc

1. **Luôn kiểm `res.ok`.** Bọc `fetch` trong một hàm dùng chung để không quên.
2. **Luôn có timeout.** `fetch` không có timeout mặc định — request có thể treo mãi.
3. **Huỷ request khi component unmount** để tránh cập nhật state đã chết.
4. **`Content-Type: application/json` kích hoạt preflight** — cân nhắc khi tối ưu độ trễ.
5. **`sendBeacon` cho analytics lúc `visibilitychange`**, không phải `unload` (nhiều trình duyệt bỏ qua `unload`).
6. **Retry có exponential backoff + jitter**, và **chỉ retry với method idempotent** (GET, PUT, DELETE — không POST).
7. **Đừng tự viết lớp cache.** React Query / SWR đã giải request deduplication, revalidation, retry — xem [[Frontend State Management]].
8. **Stream cho response dài** để hiển thị dần.
9. **`credentials` mặc định là `same-origin`** — cookie không tự gửi cross-origin.

## 3. Cạm bẫy

- **Quên `res.ok`.** Callout mục 1 — hậu quả là `res.json()` throw một lỗi parse khó hiểu thay vì lỗi HTTP rõ ràng.
- **Đọc body hai lần** → `TypeError: body stream already read`.
- **Không có timeout** → spinner quay mãi.
- **CORS lỗi nhìn như lỗi mạng.** Trình duyệt cố tình không tiết lộ chi tiết; phải xem tab Network để thấy preflight hỏng.
- **`mode: 'no-cors'` như cách "sửa" CORS.** Nó cho request đi nhưng response thành **opaque** — không đọc được gì. Hầu như luôn sai.
- **Race condition khi gõ tìm kiếm.** Response cũ về sau response mới ghi đè kết quả đúng. Sửa: abort request trước, hoặc kiểm tra request id.
- **Retry POST tạo bản ghi trùng.** Cần idempotency key.
- **`JSON.stringify` với `undefined`** làm mất field im lặng.
- **WebSocket không tự reconnect.** Phải tự viết backoff — hoặc dùng SSE nếu chỉ cần một chiều.
- **`sendBeacon` giới hạn ~64KB** và không đọc được response.
- **Header phân biệt hoa thường trong một số proxy** dù spec nói không.

## 4. Checklist áp dụng

- [ ] Có kiểm `res.ok` không?
- [ ] Có timeout không?
- [ ] Request có bị huỷ khi component unmount không?
- [ ] Tìm kiếm gõ liên tục có race condition không?
- [ ] Retry có chỉ áp dụng cho method idempotent không?
- [ ] Lỗi này là CORS hay lỗi mạng thật?
- [ ] Realtime này cần WebSocket hay SSE là đủ?
- [ ] Có nên dùng React Query thay vì tự quản lý không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → Network | Xem preflight, header, timing | https://developer.chrome.com/docs/devtools/network |
| MSW | Mock network ở tầng service worker | https://mswjs.io/ |
| React Query / SWR | Cache, dedupe, revalidate | https://tanstack.com/query |
| ky / ofetch | Wrapper fetch có retry và kiểm `ok` sẵn | https://github.com/sindresorhus/ky |

## Tham khảo

- MDN — *Fetch API*: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN — *Cross-Origin Resource Sharing (CORS)*: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- MDN — *Server-sent events*: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- MDN — *Streams API*: https://developer.mozilla.org/en-US/docs/Web/API/Streams_API
- MDN — *Navigation API*: https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API

## Liên kết

[[Web APIs Map]] · [[Frontend State Management]] · [[Next.js Data Fetching]] · [[Browser Storage APIs]] · [[Frontend]]
