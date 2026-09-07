---
tags: [frontend, performance]
status: evergreen
---
# Frontend Performance Budget

> Hiệu năng không phải một đợt tối ưu — nó là một **ràng buộc được thực thi tự động**. Không có ngân sách và không có CI chặn, mọi cải thiện đều bị ăn mòn trong ba tháng.

## 1. Khái niệm cốt lõi

### Ngân sách khởi điểm hợp lý

| Hạng mục | Ngân sách (gzip) |
|---|---|
| JS cho route quan trọng | ≤ 170KB |
| CSS | ≤ 50KB |
| Ảnh mỗi trang | ≤ 500KB |
| Font | ≤ 100KB (2 file woff2) |
| Tổng lần tải đầu | ≤ 1MB |
| Số request | ≤ 50 |

Con số cụ thể ít quan trọng hơn việc **có một con số và ép nó trong CI**.

### Nguồn gốc kích thước bundle

| Nguyên nhân | Cách tìm | Cách sửa |
|---|---|---|
| Thư viện lớn | bundle analyzer | Thay bằng cái nhẹ hơn |
| Import cả thư viện | `import _ from 'lodash'` | `import debounce from 'lodash/debounce'` |
| Barrel file | `export * from './x'` | Import trực tiếp |
| Ranh giới client quá cao | React DevTools | Đẩy `"use client"` xuống lá |
| Polyfill không cần | build output | Chỉnh browserslist |
| Moment/date-fns đầy đủ locale | analyzer | `date-fns`, hoặc `Intl` gốc |
| Icon import cả bộ | analyzer | Import từng icon |

### Chiến lược tải

| Kỹ thuật | Dùng khi |
|---|---|
| Code splitting theo route | Mặc định của Next |
| `dynamic(() => import(...))` | Component nặng, ít dùng (modal, chart, editor) |
| `{ ssr: false }` | Component không prerender được |
| `<link rel="preload">` | Tài nguyên chắc chắn cần sớm |
| `<link rel="preconnect">` | Origin bên thứ ba sẽ dùng |
| `<link rel="prefetch">` | Có thể cần ở điều hướng sau |
| Speculation Rules | Prerender trang kế tiếp có khả năng cao |

### Ảnh — thường là phần lớn nhất

| Việc | Tác động |
|---|---|
| AVIF/WebP thay JPEG/PNG | Giảm 30–50% |
| `srcset` + `sizes` đúng | Không tải ảnh 2000px cho khung 400px |
| `loading="lazy"` (trừ LCP) | Bỏ tải ảnh dưới màn hình |
| `decoding="async"` | Không chặn main thread |
| `width`/`height` | Chống CLS |
| CDN ảnh | Resize theo yêu cầu |

`next/image` làm phần lớn những việc này tự động — nhưng **chỉ khi `sizes` đúng**.

### Script bên thứ ba

Thường là nguồn chi phí lớn nhất và ít bị kiểm soát nhất.

```jsx
import Script from 'next/script'
<Script src="..." strategy="lazyOnload" />
```

| `strategy` | Khi nào tải |
|---|---|
| `beforeInteractive` | Trước hydration — chỉ cho thứ thực sự tối quan trọng |
| `afterInteractive` | Sau hydration (mặc định) |
| `lazyOnload` | Khi trình duyệt rảnh — **mặc định tốt cho analytics, chat** |
| `worker` | Trong web worker (Partytown) |

## 2. Nguyên tắc

1. **Đặt ngân sách và ép trong CI.** Không ép thì không phải ngân sách.
2. **Đo trên mobile tầm trung, mạng 4G chậm.** Máy dev nói dối.
3. **Kiểm tra bundle trước khi thêm dependency.** Tra bundlephobia trước khi `npm i`.
4. **Import cụ thể, không import barrel.**
5. **Tải lười mọi thứ dưới màn hình đầu.**
6. **Script bên thứ ba mặc định `lazyOnload`.**
7. **Kiểm tra hồi quy mỗi PR**, không mỗi quý.
8. **Xoá code chết định kỳ.** DevTools Coverage — xem [[CSS Architecture]].
9. **Ưu tiên bỏ đi hơn tối ưu.** Tính năng nhẹ nhất là tính năng không tồn tại.

## 3. Cạm bẫy

- **Không có CI check** → mọi cải thiện bị ăn mòn.
- **Barrel file kéo cả thư viện.** `export * from './components'` khiến tree-shaking thất bại — một import kéo về tất cả.
- **`dynamic` cho component luôn hiện ngay** → thêm một round-trip mà không tiết kiệm gì.
- **Preload mọi thứ.** Mất ý nghĩa ưu tiên và cạnh tranh băng thông với thứ thật sự cần.
- **Đo ở dev mode.** Bundle dev lớn hơn nhiều lần.
- **Tối ưu 5KB trong khi có ảnh 2MB.** Sửa theo thứ tự tác động.
- **`next/image` không có `sizes`** → mặc định `100vw`, tải ảnh full width cho thumbnail.
- **Nén gzip thay vì brotli.** Brotli nhỏ hơn ~15–20%.
- **Bundle tăng vì một dependency của dependency** — kiểm tra lockfile diff, không chỉ `package.json`.
- **Nghĩ tree-shaking luôn hoạt động.** Nó cần ESM và không có side effect; nhiều package không đáp ứng.

## 4. Checklist áp dụng

- [ ] Có ngân sách bằng con số cụ thể không?
- [ ] CI có chặn khi vượt ngân sách không?
- [ ] Bundle analyzer nói phần lớn nhất là gì?
- [ ] Có barrel file nào phá tree-shaking không?
- [ ] Script bên thứ ba có `lazyOnload` không?
- [ ] `next/image` có `sizes` đúng không?
- [ ] Đã đo trên mobile tầm trung chưa?
- [ ] Có brotli không?
- [ ] Tính năng này có đáng với kích thước của nó không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `@next/bundle-analyzer` | Treemap bundle | https://www.npmjs.com/package/@next/bundle-analyzer |
| bundlephobia | Kích thước package trước khi cài | https://bundlephobia.com/ |
| size-limit | Ngân sách bundle trong CI | https://github.com/ai/size-limit |
| Lighthouse CI | Ngưỡng hiệu năng trong CI | https://github.com/GoogleChrome/lighthouse-ci |
| Partytown | Chạy script bên thứ ba trong worker | https://partytown.builder.io/ |
| DevTools → Coverage | Code chết | https://developer.chrome.com/docs/devtools/coverage |

## Tham khảo

- web.dev — *Performance budgets 101*: https://web.dev/articles/performance-budgets-101
- web.dev — *Reduce JavaScript payloads with code splitting*: https://web.dev/articles/reduce-javascript-payloads-with-code-splitting
- Next.js — *Optimizing*: https://nextjs.org/docs/app/guides/package-bundling
- web.dev — *Third-party JavaScript*: https://web.dev/articles/third-party-javascript

## Liên kết

[[Core Web Vitals]] · [[React Client Components]] · [[Frontend Tooling]] · [[Frontend Deployment]] · [[Frontend]]
