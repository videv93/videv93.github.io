---
tags: [frontend, devops]
status: evergreen
---
# Frontend Deployment

> Quyết định deploy là quyết định về **mức độ khoá vào nhà cung cấp** bạn chấp nhận đổi lấy tốc độ. Đó là một đánh đổi hợp lệ — nhưng nó phải là lựa chọn có ý thức, không phải mặc định.

> [!note] Ghi chú nguồn
> Seed ghi: *"**Vercel (Hosting)**: Tôi đã dùng Vercel nhiều năm. Hồi đó nó tên là Zeit và dịch vụ tên là Now. Họ cung cấp giải pháp tuyệt vời để host ứng dụng full-stack, tuy nhiên tôi cũng hiểu vì sao nhiều người ngần ngại dùng nó. Nếu bạn tìm giải pháp self-host, tôi khuyến nghị dùng Hetzner/DigitalOcean với Coolify."*
> Và: *"**CloudFlare (Domain)**: Tôi đã dùng nhiều nhà cung cấp qua các năm, nhưng khá hài lòng với CloudFlare để quản lý mọi domain hiện nay."*

## 1. Khái niệm cốt lõi

### Lựa chọn hosting

| | Vercel | Netlify | Cloudflare | Self-host (Coolify) | Container (ECS/K8s) |
|---|---|---|---|---|---|
| Setup | Vài phút | Vài phút | Vài phút | Vài giờ | Vài ngày |
| Hỗ trợ Next | Tốt nhất (họ làm ra nó) | Tốt | Tốt (OpenNext) | Đầy đủ | Đầy đủ |
| Chi phí ở quy mô nhỏ | Miễn phí | Miễn phí | Rất rẻ | ~\$5/tháng VPS | Cao hơn |
| Chi phí ở quy mô lớn | **Có thể rất cao** | Cao | Thấp | Dự đoán được | Dự đoán được |
| Khoá nhà cung cấp | Cao | Trung bình | Trung bình | Thấp | Thấp |
| Vận hành | Không | Không | Không | Bạn lo | Bạn lo |

**Vercel đúng khi:** team nhỏ, ưu tiên tốc độ ra sản phẩm, lưu lượng vừa phải, dùng nhiều tính năng Next mới nhất.
**Self-host đúng khi:** chi phí đã thành vấn đề, có yêu cầu tuân thủ, có người vận hành, hoặc muốn tránh khoá.

Con đường thoát rẻ nhất: **container hoá từ đầu**. `output: 'standalone'` trong `next.config.js` sinh một build chạy được bằng `node server.js` — nghĩa là chạy được ở bất cứ đâu.

### Môi trường

| Môi trường | Mục đích |
|---|---|
| Preview (mỗi PR) | Review thay đổi trên URL thật |
| Staging | Test tích hợp với dữ liệu giống production |
| Production | |

Preview deployment mỗi PR là tính năng có giá trị cao nhất của các nền tảng này — nó biến code review thành review sản phẩm.

### CDN & cache header

| Loại tài nguyên | `Cache-Control` |
|---|---|
| Asset có hash (`/_next/static/*`) | `public, max-age=31536000, immutable` |
| HTML | `public, max-age=0, must-revalidate` (dùng ISR/CDN cache) |
| API response | Theo nhu cầu, thường `no-store` |
| Ảnh đã tối ưu | `public, max-age=60, stale-while-revalidate=86400` |

`stale-while-revalidate` là header đáng dùng nhất: phục vụ bản cũ ngay lập tức trong khi lấy bản mới ngầm.

### Security headers

```js
// next.config.js
headers: async () => [{
  source: '/:path*',
  headers: [
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    { key: 'Content-Security-Policy', value: csp },
  ],
}]
```

**CSP** là header quan trọng nhất và khó nhất — nó chặn XSS ở tầng trình duyệt. Triển khai bằng `Content-Security-Policy-Report-Only` trước, thu báo cáo, rồi mới ép.

### Domain & DNS

Cloudflare cho DNS: proxy (chống DDoS, ẩn IP gốc), SSL tự động, và ghi chú được trên từng record.

| Việc | Ghi chú |
|---|---|
| Chuyển `www` ↔ apex | Chọn một cái làm chính, redirect cái kia |
| TTL thấp trước khi migrate | Đặt 60s vài ngày trước để đổi nhanh |
| CAA record | Giới hạn CA nào được cấp cert cho domain |
| Đăng ký domain ở nơi khác nơi host | Tránh mất cả hai cùng lúc |

### Rollback & observability

| Việc | Công cụ |
|---|---|
| Rollback tức thì | Promote lại deployment trước |
| Error tracking | Sentry — có source map |
| Log | Nền tảng, hoặc Axiom / Better Stack |
| Uptime | Better Stack, Checkly |
| Feature flag | PostHog, Flagsmith — tách deploy khỏi release |

**Feature flag là cơ chế rollback tốt hơn deploy rollback**: tắt một tính năng mất một giây và không cần build lại.

## 2. Nguyên tắc

1. **Container hoá từ đầu** (`output: 'standalone'`) để giữ đường thoát.
2. **Preview deployment cho mọi PR.**
3. **Upload source map cho Sentry** nhưng đừng phục vụ chúng công khai.
4. **Security header ngay từ ngày đầu.** Thêm CSP vào codebase đã lớn rất khổ.
5. **CSP dạng report-only trước.**
6. **Secret trong nền tảng, không trong repo.** Xem [[Next.js Project Structure]].
7. **Feature flag để tách deploy khỏi release.**
8. **Rollback phải là một cú click**, và phải được thử ít nhất một lần khi không có sự cố.
9. **Theo dõi chi phí theo tháng**, không đợi hoá đơn bất ngờ.
10. **Đăng ký domain tách khỏi hosting.**

## 3. Cạm bẫy

- **Hoá đơn bất ngờ.** Bandwidth và function invocation ở nền tảng serverless có thể tăng phi tuyến. Đặt cảnh báo chi tiêu.
- **`NEXT_PUBLIC_` chứa secret** — chúng nằm trong bundle. Xem [[Next.js Project Structure]].
- **Không có CSP** → mọi lỗ XSS đều khai thác được tối đa.
- **CSP quá chặt phá trang** → luôn report-only trước.
- **Cache HTML quá lâu** → người dùng thấy bản cũ sau deploy.
- **Không cache asset có hash** → mất băng thông vô ích.
- **Source map công khai** → lộ mã nguồn.
- **Function region xa database** → mỗi query một round-trip xuyên lục địa. Đặt cùng region.
- **Cold start ở serverless** — đáng kể với bundle lớn.
- **Không thử rollback bao giờ** → lần đầu thử là lúc đang có sự cố.
- **Migrate DNS mà không giảm TTL trước** → sự cố kéo dài nhiều giờ.
- **Middleware chạy trên mọi request** kể cả asset tĩnh — tốn tiền. Xem [[Next.js Routing Patterns]].

## 4. Checklist áp dụng

- [ ] Build có chạy được ngoài nền tảng hiện tại không (`standalone`)?
- [ ] Mỗi PR có preview URL không?
- [ ] Security header đã đặt chưa? Có CSP không?
- [ ] Secret có nằm ngoài repo và không có `NEXT_PUBLIC_` không?
- [ ] Cache header có đúng cho từng loại tài nguyên không?
- [ ] Function có cùng region với database không?
- [ ] Rollback có được thử chưa?
- [ ] Có cảnh báo chi tiêu chưa?
- [ ] Source map có bị phơi công khai không?
- [ ] Có error tracking và uptime monitor chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Vercel | Nền tảng của chính team Next | https://vercel.com/ |
| Coolify | PaaS self-host, chạy trên VPS | https://coolify.io/ |
| Hetzner / DigitalOcean | VPS rẻ | https://www.hetzner.com/ · https://www.digitalocean.com/ |
| Cloudflare | DNS, CDN, Workers | https://www.cloudflare.com/ |
| Sentry | Error tracking có source map | https://sentry.io/ |
| securityheaders.com | Chấm điểm header | https://securityheaders.com/ |
| OpenNext | Chạy Next ngoài Vercel | https://opennext.js.org/ |

## Tham khảo

- Next.js — *Deploying*: https://nextjs.org/docs/app/getting-started/deploying
- Next.js — *Content Security Policy*: https://nextjs.org/docs/app/guides/content-security-policy
- MDN — *HTTP caching*: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching
- OWASP — *Secure Headers Project*: https://owasp.org/www-project-secure-headers/
- web.dev — *Content security policy*: https://web.dev/articles/csp

## Liên kết

[[Next.js Project Structure]] · [[Frontend Performance Budget]] · [[Frontend Tooling]] · [[Framework Churn vs Platform Longevity]] · [[Frontend]]
