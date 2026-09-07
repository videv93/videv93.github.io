---
tags: [frontend, performance]
status: evergreen
---
# Core Web Vitals

> Ba số đo Google dùng để mô tả trải nghiệm thật: **tải nhanh không (LCP)**, **phản hồi nhanh không (INP)**, **có nhảy lung tung không (CLS)**. Chúng đáng quan tâm không phải vì SEO, mà vì chúng đo đúng ba thứ người dùng thực sự cảm nhận.

## 1. Khái niệm cốt lõi

### Ba số đo và ngưỡng

| Số đo | Đo gì | Tốt | Cần cải thiện | Kém |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | Khi nào phần tử lớn nhất hiện ra | ≤ 2,5s | ≤ 4,0s | > 4,0s |
| **INP** (Interaction to Next Paint) | Độ trễ từ tương tác tới khung hình kế | ≤ 200ms | ≤ 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Tổng độ dịch chuyển layout ngoài ý muốn | ≤ 0,1 | ≤ 0,25 | > 0,25 |

Ngưỡng tính ở **phân vị 75** của người dùng thật, tách riêng mobile và desktop.

INP thay thế FID từ tháng 3/2024. Khác biệt quan trọng: FID chỉ đo **độ trễ tới khi bắt đầu xử lý** tương tác **đầu tiên**; INP đo **toàn bộ** thời gian tới khung hình tiếp theo, trên **mọi** tương tác. Nhiều trang có FID tốt nhưng INP tệ.

### LCP — ba giai đoạn

| Giai đoạn | Chiếm bao nhiêu | Sửa bằng |
|---|---|---|
| **TTFB** | Thường 40% | CDN, cache, static/ISR |
| **Load delay** | Thường 30% | `preload`, bỏ resource chặn |
| **Load + render** | Phần còn lại | Nén ảnh, `fetchpriority` |

Cách sửa hiệu quả nhất, theo thứ tự:
1. `<img fetchpriority="high">` cho ảnh LCP, và **đừng** `loading="lazy"` nó
2. Preconnect tới origin chứa ảnh
3. Nén ảnh: AVIF/WebP, `srcset` đúng kích thước
4. Bỏ resource chặn render trong `<head>`
5. Static hoặc ISR thay dynamic — xem [[Next.js Rendering Strategies]]

### INP — nguyên nhân

| Nguyên nhân | Sửa |
|---|---|
| Long task chặn main thread | Cắt bằng `scheduler.yield()`, xem [[Web Workers & Background APIs]] |
| Event handler nặng | Đẩy sang worker, hoặc debounce |
| Hydration chậm | Giảm bundle client, xem [[React Client Components]] |
| Re-render lớn | `useTransition`, memo hoá |
| Cập nhật DOM lớn | Ảo hoá danh sách dài |

```jsx
const [isPending, startTransition] = useTransition()
startTransition(() => setFilter(value))   // giữ input phản hồi
```

### CLS — nguyên nhân

| Nguyên nhân | Sửa |
|---|---|
| Ảnh không có kích thước | `width`/`height` hoặc `aspect-ratio` |
| Font đổi | `size-adjust`, khớp metric — xem [[CSS Typography]] |
| Nội dung chèn động (banner, quảng cáo) | Giữ chỗ sẵn bằng `min-height` |
| Skeleton không khớp nội dung thật | Đo và khớp |
| `scrollbar-gutter` | `stable` — xem [[CSS Overflow & Scrolling]] |
| Animate `width`/`height`/`top` | Dùng `transform` |

### Lab vs Field

| | Lab (Lighthouse) | Field (RUM / CrUX) |
|---|---|---|
| Nguồn | Máy bạn, điều kiện giả lập | Người dùng thật |
| INP | ⚠️ **Không đo được** | ✅ |
| Dùng để | Debug, so sánh thay đổi | **Quyết định** |

> [!warning] Lighthouse không đo được INP
> INP cần tương tác thật của người dùng; Lighthouse chỉ tải trang. Điểm Lighthouse 100 hoàn toàn tương thích với INP tệ. Nếu chỉ nhìn Lighthouse, bạn đang bỏ qua một trong ba số đo.
>
> Phải có RUM: `web-vitals` gửi về analytics, hoặc Vercel Speed Insights, hoặc CrUX.

### Số đo phụ hữu ích

`TTFB` · `FCP` · `TBT` (proxy lab cho INP) · `Long Animation Frames` (LoAF — cho biết *script nào* gây long task).

## 2. Nguyên tắc

1. **Đo field trước, lab sau.** Field cho biết *có vấn đề không*; lab cho biết *vấn đề ở đâu*.
2. **Ảnh LCP: `fetchpriority="high"`, không `lazy`.** Lỗi phổ biến nhất là lazy-load chính ảnh hero.
3. **Mọi ảnh và iframe có kích thước hoặc `aspect-ratio`.**
4. **Cắt mọi task > 50ms.**
5. **`useTransition` cho cập nhật state nặng.**
6. **Giữ chỗ cho mọi nội dung chèn sau.**
7. **Đo trên mobile tầm trung với mạng 4G chậm**, không trên máy dev.
8. **Đặt ngân sách và chặn CI khi vượt** — xem [[Frontend Performance Budget]].
9. **Sửa theo thứ tự tác động**, không theo thứ tự dễ.

## 3. Cạm bẫy

- **Lazy-load ảnh LCP** làm LCP tệ đi rõ rệt.
- **Chỉ nhìn Lighthouse.** Callout mục 1.
- **Tối ưu trung bình thay vì p75.** Vài người dùng rất chậm kéo p75 lên trong khi trung bình vẫn đẹp.
- **CLS chỉ đo lúc load.** Nó tích luỹ suốt vòng đời trang — một dropdown đẩy nội dung ở giây thứ 30 vẫn tính.
- **Thêm `will-change` khắp nơi** để "tăng tốc" — ngốn RAM GPU, xem [[Browser Rendering Pipeline]].
- **Preload quá nhiều** — mọi thứ ưu tiên cao nghĩa là không có gì ưu tiên cao.
- **Script bên thứ ba** (analytics, chat, quảng cáo) thường là nguyên nhân INP lớn nhất, và không sửa được từ code của bạn — chỉ có thể tải lười hoặc bỏ.
- **`next/image` không có `sizes` đúng** tải ảnh lớn hơn cần thiết.
- **Font preload sai `crossorigin`** → tải hai lần, xem [[CSS Typography]].
- **Đo ở dev mode** — bundle dev lớn hơn nhiều và có overhead của HMR.

## 4. Checklist áp dụng

- [ ] Có dữ liệu field (RUM) không, hay chỉ có Lighthouse?
- [ ] Ảnh LCP có `fetchpriority="high"` và **không** lazy không?
- [ ] Mọi ảnh/iframe có kích thước hoặc `aspect-ratio` chưa?
- [ ] Có task nào > 50ms không?
- [ ] Script bên thứ ba đóng góp bao nhiêu vào INP?
- [ ] Nội dung chèn động có giữ chỗ chưa?
- [ ] Font có gây CLS không?
- [ ] Đã đo trên mobile tầm trung, mạng chậm chưa?
- [ ] p75 là bao nhiêu (không phải trung bình)?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `web-vitals` | Thư viện đo field chuẩn | https://github.com/GoogleChrome/web-vitals |
| PageSpeed Insights | Lab + field CrUX cùng một chỗ | https://pagespeed.web.dev/ |
| CrUX Dashboard | Dữ liệu field lịch sử | https://developer.chrome.com/docs/crux |
| DevTools → Performance | Long task, LoAF, layout shift | https://developer.chrome.com/docs/devtools/performance |
| Web Vitals extension | Số đo trực tiếp khi duyệt | https://chromewebstore.google.com/detail/web-vitals |
| Vercel Speed Insights | RUM theo route | https://vercel.com/docs/speed-insights |

## Tham khảo

- web.dev — *Web Vitals*: https://web.dev/articles/vitals
- web.dev — *Optimize INP*: https://web.dev/articles/optimize-inp
- web.dev — *Optimize LCP*: https://web.dev/articles/optimize-lcp
- web.dev — *Optimize CLS*: https://web.dev/articles/optimize-cls
- Chrome — *Long Animation Frames API*: https://developer.chrome.com/docs/web-platform/long-animation-frames

## Liên kết

[[Frontend Performance Budget]] · [[Browser Rendering Pipeline]] · [[CSS Typography]] · [[Web Workers & Background APIs]] · [[Next.js Rendering Strategies]] · [[Frontend]]
