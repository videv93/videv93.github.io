---
tags: [frontend, nextjs, rendering]
status: evergreen
---
# Next.js Rendering Strategies

> Điểm mạnh của Next không phải "render trên server" — mà là **nhiều chiến lược render cùng tồn tại trong một ứng dụng**, chọn theo từng route.

> [!note] Ghi chú nguồn
> File `Rendering.md` trong seed chỉ có đúng hai dòng — `[[Server Components]]` và `[[Client Components]]`. File `Server Components.md` liệt kê ba chiến lược *"Static Rendering, Dynamic Rendering, Streaming"* rồi dừng lại. Đây là ba header rỗng; note này trả chúng.
>
> Seed cũng ghi lời của Robin Wieruch về vì sao chọn Next: *"nó đi kèm rất nhiều tính năng sẵn có (routing, caching), **nhiều chiến lược render trong cùng một ứng dụng để tối ưu cho các mục tiêu khác nhau**, và mọi tính năng mới của React."*

## 1. Khái niệm cốt lõi

### Bốn chiến lược

| Chiến lược | Render khi nào | Cache | Dùng cho |
|---|---|---|---|
| **Static** (SSG) | Lúc build | Vĩnh viễn tới khi revalidate | Blog, docs, marketing |
| **ISR** | Lúc build + làm mới định kỳ | Theo `revalidate` | Catalogue sản phẩm, tin tức |
| **Dynamic** (SSR) | Mỗi request | Không | Dashboard, nội dung theo user |
| **Streaming** | Mỗi request, gửi dần | — | Trang có phần nhanh và phần chậm |

### Cái gì làm route thành dynamic

Next tự chuyển sang dynamic khi route dùng:
- `cookies()`, `headers()`, `draftMode()`
- `searchParams` trong `page`
- `connection()`
- `fetch` với `cache: 'no-store'`
- `export const dynamic = 'force-dynamic'`

> [!warning] Một `cookies()` làm cả route thành dynamic
> Gọi `cookies()` ở bất kỳ đâu trong cây — kể cả trong một component nhỏ ở sâu, hoặc trong một thư viện phân tích — sẽ **opt-out toàn bộ route khỏi static rendering**. Kết quả: trang lẽ ra được cache ở CDN giờ render lại mỗi request, và bạn không nhận được cảnh báo nào.
>
> Cách kiểm: chạy `next build` và đọc bảng route. `○` là static, `ƒ` là dynamic. Nếu một route bạn nghĩ là static hiện `ƒ`, đi tìm cái gọi động.

### ISR

```ts
export const revalidate = 3600            // toàn route, mỗi giờ

// hoặc theo từng fetch
await fetch(url, { next: { revalidate: 60, tags: ['posts'] } })
```

On-demand: `revalidatePath('/posts')` hoặc `revalidateTag('posts')` từ Server Function hoặc webhook — xem [[Next.js Caching Layers]].

### Streaming

Hai cách bật:

```tsx
// 1. loading.tsx — tự động bọc cả segment
// 2. <Suspense> thủ công — kiểm soát phạm vi
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
```

Streaming thay đổi số đo hiệu năng: **TTFB giảm mạnh** vì shell gửi đi ngay, còn LCP phụ thuộc phần nào chứa nội dung lớn nhất. Xem [[Core Web Vitals]].

### PPR (Partial Prerendering)

Kết hợp cả hai trong **một** route: shell tĩnh phục vụ ngay từ CDN, phần động stream vào các lỗ Suspense.

```ts
export const experimental_ppr = true
```

Đây là hướng đi của Next: thay vì chọn static **hoặc** dynamic cho cả trang, chọn theo từng vùng.

### `dynamic` và `revalidate` ở cấp route

| Export | Giá trị | Nghĩa |
|---|---|---|
| `dynamic` | `'auto'` (mặc định) | Next tự quyết |
| | `'force-dynamic'` | Luôn render mỗi request |
| | `'force-static'` | Ép static, `cookies()` trả rỗng |
| | `'error'` | Lỗi build nếu có gì đó làm nó dynamic — **hữu ích để bảo vệ** |
| `revalidate` | `false` \| `0` \| số giây | |
| `fetchCache` | | Ghi đè hành vi cache của `fetch` |
| `runtime` | `'nodejs'` \| `'edge'` | |

`export const dynamic = 'error'` là công cụ tốt để **khoá** một route ở chế độ static — nó biến việc vô tình thêm `cookies()` thành lỗi build thay vì một hồi quy hiệu năng âm thầm.

## 2. Nguyên tắc

1. **Mặc định static; chỉ dynamic khi thật cần.** Static là rẻ nhất và nhanh nhất.
2. **Đọc bảng route sau `next build`** mỗi lần. Đây là phản hồi trực tiếp nhất.
3. **Cô lập phần động.** Nếu một trang chủ yếu tĩnh nhưng có một widget cần cookie, bọc widget đó trong Suspense và dùng PPR — đừng để nó kéo cả trang thành dynamic.
4. **ISR cho nội dung đổi chậm.** `revalidate` 60s thường đủ và rẻ hơn dynamic rất nhiều.
5. **Streaming cho mọi trang có phần chậm.**
6. **`dynamic = 'error'` để bảo vệ route quan trọng khỏi hồi quy.**
7. **Edge runtime cho middleware và endpoint nhẹ**, Node runtime khi cần thư viện Node.
8. **Đặt Suspense boundary theo ranh giới nội dung, không theo ranh giới component.**

## 3. Cạm bẫy

- **`cookies()` vô tình làm cả route dynamic.** Callout mục 1.
- **Thư viện analytics gọi `headers()`** — cùng hậu quả, khó thấy hơn nhiều.
- **Không có Suspense → cả trang chờ query chậm nhất.**
- **`revalidate` quá ngắn** biến ISR thành SSR kèm chi phí cache.
- **Nghĩ static nghĩa là không đổi được.** `revalidateTag` cập nhật được ngay.
- **`force-dynamic` để "cho chắc"** — vứt bỏ toàn bộ lợi ích cache.
- **Streaming làm hỏng SEO?** Không — crawler nhận HTML đầy đủ. Nhưng nội dung quan trọng cho SEO nên ở trong shell, không sau Suspense.
- **Edge runtime không chạy được thư viện Node** (`fs`, driver database).
- **`generateStaticParams` trả về hàng chục nghìn path** làm build rất lâu; giới hạn rồi để `dynamicParams` lo phần còn lại.
- **Skeleton không khớp layout thật** gây CLS.

## 4. Checklist áp dụng

- [ ] `next build` báo route này là `○` hay `ƒ`?
- [ ] Có `cookies()`/`headers()` nào ngoài ý muốn không?
- [ ] Phần chậm có Suspense boundary chưa?
- [ ] Phần động có được cô lập khỏi phần tĩnh không?
- [ ] `revalidate` có hợp lý với tần suất đổi thật không?
- [ ] Route quan trọng có `dynamic = 'error'` để khoá không?
- [ ] Nội dung SEO có nằm trong shell tĩnh không?
- [ ] Skeleton có khớp kích thước nội dung thật không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `next build` | Bảng route: `○` static, `ƒ` dynamic, `●` SSG | https://nextjs.org/docs/app/api-reference/cli/next |
| DevTools → Network → Timing | Xem TTFB và streaming chunk | https://developer.chrome.com/docs/devtools/network |
| Vercel Speed Insights | Số đo thực địa theo route | https://vercel.com/docs/speed-insights |

## Tham khảo

- Next.js — *Server Components rendering strategies*: https://nextjs.org/docs/app/building-your-application/rendering/server-components
- Next.js — *Partial Prerendering*: https://nextjs.org/docs/app/getting-started/partial-prerendering
- Next.js — *Route segment config*: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
- Next.js — *Incremental Static Regeneration*: https://nextjs.org/docs/app/guides/incremental-static-regeneration

## Liên kết

[[React Server Components]] · [[Next.js Caching Layers]] · [[Next.js Data Fetching]] · [[Core Web Vitals]] · [[Frontend]]
