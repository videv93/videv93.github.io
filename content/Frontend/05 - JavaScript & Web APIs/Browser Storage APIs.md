---
tags: [frontend, javascript, storage]
status: evergreen
---
# Browser Storage APIs

> Bốn cơ chế lưu trữ, khác nhau ở **dung lượng, tính đồng bộ, và ai đọc được**. Chọn sai thì hoặc chặn main thread, hoặc rò token cho script bên thứ ba.

## 1. Khái niệm cốt lõi

### Bảng so sánh

| | `localStorage` | `sessionStorage` | IndexedDB | Cookie |
|---|---|---|---|---|
| Dung lượng | ~5–10MB | ~5–10MB | Theo quota (thường GB) | **~4KB** |
| Kiểu dữ liệu | Chỉ chuỗi | Chỉ chuỗi | Object, Blob, File | Chuỗi |
| API | **Đồng bộ** ⚠️ | **Đồng bộ** ⚠️ | Bất đồng bộ | Đồng bộ (`document.cookie`) |
| Vòng đời | Tới khi xoá | Tới khi đóng tab | Tới khi xoá | Theo `Expires`/`Max-Age` |
| Phạm vi | Origin | Origin + tab | Origin | Domain + path |
| Gửi lên server | ❌ | ❌ | ❌ | ✅ **mọi request** |
| Dùng trong Worker | ❌ | ❌ | ✅ | ❌ |
| JS đọc được | ✅ | ✅ | ✅ | ✅ trừ khi `HttpOnly` |

### Khi nào dùng cái nào

| Nhu cầu | Dùng |
|---|---|
| Sở thích UI (theme, sidebar mở/đóng) | `localStorage` |
| State của một tab (bước wizard) | `sessionStorage` |
| Dữ liệu offline, cache lớn, file | IndexedDB |
| Session token | **Cookie `HttpOnly` `Secure` `SameSite`** |
| Chia sẻ giữa các tab | `BroadcastChannel` + IndexedDB |

> [!warning] Không bao giờ để token xác thực trong `localStorage`
> `localStorage` đọc được bởi **mọi** JavaScript chạy trên origin đó — kể cả script bên thứ ba và payload XSS. Một lỗ XSS duy nhất là mất toàn bộ session. Cookie `HttpOnly` thì JavaScript không đọc được, nên XSS không lấy được token ra ngoài. Đây là khác biệt an ninh cơ bản, không phải sở thích.

### Cookie attributes

| Attribute | Nghĩa |
|---|---|
| `HttpOnly` | JS không đọc được |
| `Secure` | Chỉ gửi qua HTTPS |
| `SameSite=Strict` | Không gửi khi điều hướng từ site khác |
| `SameSite=Lax` | Mặc định — gửi khi điều hướng top-level GET |
| `SameSite=None` | Cross-site, **bắt buộc kèm `Secure`** |
| `Max-Age` / `Expires` | Thời hạn |
| `Path` / `Domain` | Phạm vi |

**Cookie Store API** (`cookieStore.get/set/delete`) là bản bất đồng bộ, dùng được trong service worker.

### IndexedDB

Object store có index, hỗ trợ giao dịch. API gốc dựa trên event và rất rườm rà — hầu như luôn nên dùng wrapper:

```js
import { get, set } from 'idb-keyval'
await set('draft', { title, body })
const draft = await get('draft')
```

`idb-keyval` cho key-value đơn giản; `Dexie` khi cần query và index thật.

### Quota & persistence

```js
const { usage, quota } = await navigator.storage.estimate()
const persisted = await navigator.storage.persist()   // xin không bị xoá tự động
```

Trình duyệt **xoá storage khi thiếu dung lượng** trừ khi đã `persist()`. Không có gì trong trình duyệt là lưu trữ vĩnh viễn.

### File API & File System API

| API | Dùng để |
|---|---|
| `File` / `Blob` / `FileReader` | Đọc file người dùng chọn |
| `URL.createObjectURL()` | Tạo URL tạm cho Blob — **nhớ `revokeObjectURL()`** |
| **File System Access API** | Đọc/ghi file thật trên máy (cần cấp quyền) |
| **OPFS** (Origin Private File System) | Hệ thống file riêng của origin, rất nhanh, dùng được trong Worker |

### Chia sẻ giữa tab

| API | Dùng để |
|---|---|
| `BroadcastChannel` | Gửi tin nhắn giữa các tab cùng origin |
| `storage` event | Bắn khi `localStorage` đổi ở **tab khác** (không phải tab hiện tại) |
| **Web Locks API** | Đảm bảo chỉ một tab chạy một tác vụ (refresh token) |

### Storage Access API

Cho iframe bên thứ ba xin quyền dùng storage của chính nó khi trình duyệt chặn cookie bên thứ ba (`document.requestStorageAccess()`).

## 2. Nguyên tắc

1. **Token vào cookie `HttpOnly` `Secure` `SameSite=Lax`.** Xem callout.
2. **`localStorage` là API đồng bộ — nó chặn main thread.** Đọc/ghi nhiều trong vòng lặp gây jank. Với dữ liệu lớn, dùng IndexedDB.
3. **Luôn bọc `JSON.parse` trong `try/catch`.** Dữ liệu trong storage có thể là rác từ phiên bản cũ.
4. **Đặt version cho schema lưu trữ** để migrate được: `{ v: 2, data: ... }`.
5. **Xử lý trường hợp storage không dùng được.** Private mode, cài đặt chặn site data, hoặc quota đầy đều làm `setItem` **throw**. Bọc mọi truy cập.
6. **`revokeObjectURL()` sau khi dùng xong** — không thì Blob giữ trong RAM.
7. **`navigator.storage.persist()` cho app offline thật.**
8. **Đừng lưu PII trong storage của trình duyệt** — nó không được mã hoá.

## 3. Cạm bẫy

- **Token trong `localStorage`.** Cạm bẫy nghiêm trọng nhất.
- **`localStorage.setItem` throw khi đầy quota hoặc ở private mode.** Rất nhiều app crash trắng vì một dòng `setItem` không bọc try/catch.
- **`JSON.parse(null)` trả về `null`, không throw** — nhưng `JSON.parse(undefined)` thì throw. `getItem` trả `null` khi không có key.
- **`localStorage` đồng bộ trong vòng lặp render** gây jank rõ rệt.
- **`storage` event không bắn ở tab hiện tại** — chỉ ở tab khác. Muốn cả hai thì tự dispatch hoặc dùng `BroadcastChannel`.
- **Cookie tính vào **mọi** request** — cookie 3KB nhân với 50 request là 150KB băng thông lãng phí.
- **`SameSite=None` không có `Secure`** bị trình duyệt bỏ qua im lặng.
- **Storage bị xoá không báo trước** nếu chưa `persist()`.
- **IndexedDB trong Safari private mode** từng có hành vi kỳ lạ; luôn có đường lùi.
- **SSR không có `window`.** Truy cập `localStorage` lúc render trên server làm crash — xem [[React Client Components]].
- **Object URL không revoke = memory leak** với ảnh/video lớn.

## 4. Checklist áp dụng

- [ ] Token có nằm trong cookie `HttpOnly` không?
- [ ] Mọi truy cập storage có bọc try/catch không?
- [ ] `JSON.parse` có xử lý dữ liệu hỏng không?
- [ ] Schema lưu trữ có version để migrate không?
- [ ] Dữ liệu lớn có dùng IndexedDB thay `localStorage` không?
- [ ] Object URL có được revoke không?
- [ ] Code này có chạy trên server (SSR) không? Có bảo vệ `window` chưa?
- [ ] Cookie có bao nhiêu byte — nhân với mọi request là bao nhiêu?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → Application → Storage | Xem và xoá mọi loại storage | https://developer.chrome.com/docs/devtools/storage |
| idb-keyval | IndexedDB kiểu key-value | https://github.com/jakearchibald/idb-keyval |
| Dexie | IndexedDB có query và index | https://dexie.org/ |
| `navigator.storage.estimate()` | Xem quota còn lại | https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate |

## Tham khảo

- MDN — *Web Storage API*: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- MDN — *IndexedDB API*: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- MDN — *Storage API / quota*: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API
- MDN — *Using HTTP cookies*: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
- OWASP — *HTML5 Security Cheat Sheet (local storage)*: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html

## Liên kết

[[Web APIs Map]] · [[Fetch & Network APIs]] · [[Web Workers & Background APIs]] · [[React Client Components]] · [[Frontend]]
