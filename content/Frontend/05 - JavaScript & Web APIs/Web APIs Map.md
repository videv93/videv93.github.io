---
tags: [frontend, web-api, catalogue]
status: evergreen
---
# Web APIs Map

> Catalogue ~150 Web API, sắp theo **mục đích** thay vì bảng chữ cái. Đây là note tra cứu: dùng nó để biết *nền tảng đã có sẵn thứ tôi định cài thư viện về làm chưa*.

> [!note] Ghi chú nguồn
> Seed gốc chứa `Web APIs.md` — clipping MDN 1.357 dòng, liệt kê mọi API và mọi interface theo bảng chữ cái, không có mô tả nào. Sắp theo alphabet thì không tra cứu được: bạn phải *biết tên* mới tìm ra. Note này giữ toàn bộ danh sách và sắp lại theo câu hỏi *"tôi đang cần làm gì"*.

## Tương tác với tài liệu

| API | Dùng để | Note |
|---|---|---|
| **DOM** | Cây node, query, thao tác | [[DOM & Events]] |
| **HTML DOM API** | Interface cho từng element HTML | [[DOM & Events]] |
| **UI Events** | Chuột, bàn phím, focus | [[DOM & Events]] |
| **Pointer events** | Chuột + chạm + bút, thống nhất | [[DOM & Events]] |
| **Touch events** | Cảm ứng (cũ, ưu tiên Pointer) | [[DOM & Events]] |
| **Force Touch events** | Áp lực chạm (Safari) | |
| **Selection API** | Vùng text đang được chọn | [[DOM & Events]] |
| **EditContext API** | Nhập text nâng cao, IME | |
| **HTML Drag and Drop API** | Kéo thả gốc | [[DOM & Events]] |
| **HTML Sanitizer API** | Làm sạch HTML không tin cậy | [[DOM & Events]] |
| **Trusted Types API** | Chặn XSS ở tầng DOM sink | [[DOM & Events]] |
| **Invoker Commands API** | `command`/`commandfor` — nút điều khiển element khác không cần JS | |
| **Popover API** | Popover gốc, top layer | [[Stacking Context]] |
| **Web Components** | Custom element, shadow DOM | [[Web Components]] |
| **Fullscreen API** | Toàn màn hình | |
| **Clipboard API** | Đọc/ghi clipboard | |
| **VirtualKeyboard API** | Bàn phím ảo mobile | |
| **Keyboard API** | Keyboard lock, layout map | |

## CSS từ JavaScript

| API | Dùng để | Note |
|---|---|---|
| **CSSOM** | Đọc/sửa stylesheet bằng script | [[CSS Syntax & At-rules]] |
| **CSSOM view API** | Đo vị trí, kích thước, cuộn | [[DOM & Events]] |
| **CSS Typed OM** | Giá trị CSS có kiểu, không phải chuỗi | |
| **CSS Properties and Values API** | `@property` từ JS | [[CSS Custom Properties]] |
| **CSS Font Loading API** | Tải font động, biết khi nào xong | [[CSS Typography]] |
| **CSS Custom Highlight API** | Tô range text không đụng DOM | |
| **CSS Painting API** | Vẽ background bằng canvas (Houdini) | |
| **Houdini APIs** | Nhóm API mở rộng engine CSS | |
| **Web Animations API** | Điều khiển animation bằng JS | [[CSS Transitions & Animations]] |
| **View Transition API** | Chuyển cảnh có animation | [[CSS Transitions & Animations]] |

## Mạng & dữ liệu

| API | Dùng để | Note |
|---|---|---|
| **Fetch API** | HTTP request | [[Fetch & Network APIs]] |
| **XMLHttpRequest API** | HTTP kiểu cũ (còn dùng cho upload progress) | [[Fetch & Network APIs]] |
| **Streams API** | Xử lý dữ liệu theo luồng | [[Fetch & Network APIs]] |
| **Compression Streams API** | Nén/giải nén gzip, deflate | [[Fetch & Network APIs]] |
| **Encoding API** | `TextEncoder` / `TextDecoder` | [[Fetch & Network APIs]] |
| **Server-sent events** | Server đẩy một chiều | [[Fetch & Network APIs]] |
| **WebSocket API** | Hai chiều, full-duplex | [[Fetch & Network APIs]] |
| **WebTransport API** | Hai chiều trên HTTP/3 | [[Fetch & Network APIs]] |
| **WebRTC API** | Peer-to-peer audio/video/data | [[Fetch & Network APIs]] |
| **Beacon API** | Gửi analytics khi rời trang | [[Fetch & Network APIs]] |
| **Broadcast Channel API** | Nhắn giữa các tab cùng origin | [[Browser Storage APIs]] |
| **Channel Messaging API** | Kênh hai chiều giữa context | [[Web Workers & Background APIs]] |
| **URL API** · **URL Pattern API** | Parse và khớp URL | [[Fetch & Network APIs]] |
| **URL Fragment Text Directives** | Link tới đoạn text cụ thể (`#:~:text=`) | |
| **Network Information API** | Loại kết nối, tốc độ ước lượng | [[Frontend Performance Budget]] |
| **Speculation Rules API** | Prefetch/prerender khai báo | [[Frontend Performance Budget]] |
| **Reporting API** | Nhận báo cáo vi phạm, deprecation | |
| **Fenced Frame API** · **Topics API** · **Attribution Reporting API** · **Private State Token API** · **Shared Storage API** | Privacy Sandbox — thay thế cookie bên thứ ba | |

## Lưu trữ

| API | Dùng để | Note |
|---|---|---|
| **Web Storage API** | `localStorage` / `sessionStorage` | [[Browser Storage APIs]] |
| **IndexedDB API** | CSDL có giao dịch, dung lượng lớn | [[Browser Storage APIs]] |
| **Cookie Store API** | Cookie bất đồng bộ | [[Browser Storage APIs]] |
| **Storage API** | Quota, persistence | [[Browser Storage APIs]] |
| **Storage Access API** | Truy cập storage trong iframe bên thứ ba | [[Browser Storage APIs]] |
| **File API** | `File`, `Blob`, `FileReader` | [[Browser Storage APIs]] |
| **File System API** | Đọc/ghi file hệ thống thật | [[Browser Storage APIs]] |
| **File and Directory Entries API** | Duyệt thư mục kéo thả | [[Browser Storage APIs]] |
| **Content Index API** | Đăng ký nội dung offline | [[Web Workers & Background APIs]] |

## Chạy nền & vòng đời

| API                                             | Dùng để                          | Note                              |
| ----------------------------------------------- | -------------------------------- | --------------------------------- |
| **Web Workers API**                             | Chạy JS trên thread khác         | [[Web Workers & Background APIs]] |
| **Service Worker API**                          | Proxy mạng, offline, cache       | [[Web Workers & Background APIs]] |
| **Push API** · **Notifications API**            | Thông báo đẩy                    | [[Web Workers & Background APIs]] |
| **Background Fetch API**                        | Tải lớn khi tab đóng             | [[Web Workers & Background APIs]] |
| **Background Synchronization API**              | Đồng bộ khi có mạng lại          | [[Web Workers & Background APIs]] |
| **Web Periodic Background Synchronization API** | Đồng bộ định kỳ                  | [[Web Workers & Background APIs]] |
| **Background Tasks API**                        | `requestIdleCallback`            | [[Web Workers & Background APIs]] |
| **Prioritized Task Scheduling API**             | `scheduler.postTask()`           | [[Web Workers & Background APIs]] |
| **Page Visibility API**                         | Tab đang hiện hay ẩn             | [[Web Workers & Background APIs]] |
| **Web Locks API**                               | Khoá tài nguyên giữa các tab     | [[Web Workers & Background APIs]] |
| **Launch Handler API**                          | Điều khiển cách PWA mở           |                                   |
| **Navigation API**                              | Điều hướng SPA gốc, thay History | [[Fetch & Network APIs]]          |
| **History API**                                 | `pushState`, `replaceState`      | [[Fetch & Network APIs]]          |

## Quan sát & đo lường

| API | Dùng để | Note |
|---|---|---|
| **Intersection Observer API** | Element vào/ra viewport | [[Observer APIs]] |
| **Resize Observer API** | Element đổi kích thước | [[Observer APIs]] |
| **Mutation Observer** (trong DOM) | DOM thay đổi | [[Observer APIs]] |
| **Performance APIs** | Đo timing, Core Web Vitals | [[Observer APIs]] · [[Core Web Vitals]] |
| **JS Self-Profiling API** | Profile JS ngoài thực địa | [[Frontend Performance Budget]] |
| **Compute Pressure API** | Áp lực CPU/nhiệt | |
| **Device Memory API** | RAM ước lượng của máy | [[Frontend Performance Budget]] |

## Đồ hoạ & media

| API | Dùng để |
|---|---|
| **Canvas API** | Vẽ 2D bitmap |
| **WebGL API** · **WebGPU API** | 3D và tính toán trên GPU |
| **SVG API** | Thao tác SVG bằng script |
| **Geometry interfaces** | `DOMMatrix`, `DOMRect`, `DOMPoint` |
| **Web Audio API** | Xử lý và tổng hợp âm thanh |
| **Media Capture and Streams API** | Camera, micro |
| **MediaStream Recording API** | Ghi âm/ghi hình |
| **MediaStream Image Capture API** | Chụp ảnh từ stream |
| **Media Source API** | Streaming thích ứng |
| **Encrypted Media Extensions API** | DRM |
| **Media Session API** | Metadata cho điều khiển media của OS |
| **Media Capabilities API** | Thiết bị giải mã được định dạng nào |
| **WebCodecs API** | Truy cập codec cấp thấp |
| **Picture-in-Picture API** · **Document Picture-in-Picture API** | Cửa sổ nổi |
| **Remote Playback API** | Phát trên thiết bị khác |
| **Presentation API** | Trình chiếu ra màn hình thứ hai |
| **Screen Capture API** | Chia sẻ màn hình |
| **WebVTT API** | Phụ đề |
| **Insertable Streams for MediaStreamTrack** | Xử lý frame media |
| **Audio Output Devices API** · **Audio Session API** | Chọn thiết bị ra, quản lý phiên |
| **EyeDropper API** | Lấy màu từ màn hình |

## Thiết bị & phần cứng

| API | Dùng để |
|---|---|
| **Geolocation API** | Vị trí |
| **Sensor APIs** | Gia tốc kế, con quay, ánh sáng |
| **Device orientation events** | Hướng thiết bị |
| **Device Posture API** · **Viewport Segments API** | Thiết bị gập |
| **Screen Orientation API** · **Window Management API** · **Window Controls Overlay API** | Màn hình và cửa sổ |
| **Screen Wake Lock API** | Giữ màn hình sáng |
| **Vibration API** | Rung |
| **Battery Status API** | Mức pin |
| **Gamepad API** | Tay cầm |
| **Web Bluetooth API** · **Web NFC API** · **Web Serial API** · **WebHID API** · **WebUSB API** · **Web MIDI API** | Kết nối phần cứng |
| **Idle Detection API** | Người dùng rời máy |
| **Pointer Lock API** | Khoá con trỏ (game) |
| **InputDeviceCapabilities API** | Đặc tính thiết bị nhập |
| **Ink API** | Vẽ bằng bút độ trễ thấp |
| **WebXR Device API** | VR/AR |
| **WebVR API** | ⚠️ Đã bị thay bởi WebXR |

## Danh tính, thanh toán, bảo mật

| API | Dùng để |
|---|---|
| **Web Authentication API** | Passkey, khoá bảo mật |
| **Credential Management API** | Lưu và lấy thông tin đăng nhập |
| **Federated Credential Management (FedCM) API** | Đăng nhập liên kết không cần cookie bên thứ ba |
| **WebOTP API** | Tự điền OTP từ SMS |
| **Payment Request API** · **Web-based Payment Handler API** | Thanh toán |
| **Web Crypto API** | Băm, ký, mã hoá |
| **Permissions API** | Trạng thái quyền |
| **Contact Picker API** | Chọn danh bạ |

## Khác

| API | Dùng để |
|---|---|
| **Console API** | `console.*` |
| **Web Share API** | Chia sẻ qua sheet của OS |
| **Badging API** | Badge trên icon app |
| **Barcode Detection API** | Quét mã vạch/QR |
| **User Preferences API** | Đọc sở thích (theme, motion) |
| **User-Agent Client Hints API** | Thay UA string |
| **Translator and Language Detector APIs** · **Summarizer API** · **Prompt API** | AI trên thiết bị |
| **WebXR DOM overlays** | HTML trong phiên XR |

## Cách dùng bảng này

1. **Trước khi cài thư viện, tra ở đây.** Rất nhiều thư viện phổ biến chỉ bọc một API đã có sẵn: lazy-load ảnh (Intersection Observer), reveal khi cuộn (scroll-driven animation), tooltip (anchor positioning + Popover), modal (`<dialog>`).
2. **Mọi API đều có trang MDN `Web/API/<Tên>`.**
3. **Luôn kiểm tra hỗ trợ trên caniuse** — bảng này liệt kê cả API mới và API đã lỗi thời.

> [!warning] Nhiều API trong bảng này chưa được hỗ trợ rộng
> Danh sách gốc của MDN trộn lẫn API đã ổn định (Fetch, DOM) với API chỉ có ở Chromium (Web Bluetooth, Idle Detection), API đang thử nghiệm (Prompt API) và API đã chết (WebVR). Bảng này giữ nguyên danh sách để tra cứu — **không** phải để giả định rằng dùng được.

## Tham khảo

- MDN — *Web APIs (danh sách gốc)*: https://developer.mozilla.org/en-US/docs/Web/API
- MDN — *Web API interfaces index*: https://developer.mozilla.org/en-US/docs/Web/API#interfaces
- Baseline — *Mức hỗ trợ theo tính năng*: https://web.dev/baseline
- caniuse — *Bảng hỗ trợ trình duyệt*: https://caniuse.com/
- Chrome Platform Status — *Trạng thái triển khai*: https://chromestatus.com/

## Liên kết

[[DOM & Events]] · [[Fetch & Network APIs]] · [[Browser Storage APIs]] · [[Observer APIs]] · [[Web Workers & Background APIs]] · [[Frontend]]
