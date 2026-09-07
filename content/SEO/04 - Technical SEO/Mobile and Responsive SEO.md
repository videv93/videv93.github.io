---
tags: [seo, technical, mobile]
status: evergreen
---
# Mobile and Responsive SEO

> Từ 2023, Google index **hoàn toàn bằng Googlebot smartphone**. Không còn "phiên bản desktop" trong index. Hệ quả trực tiếp: **cái gì không có trên mobile thì không tồn tại với Google.**

## 1. Mobile-first indexing nghĩa là gì

| Trước | Sau (hiện tại) |
|---|---|
| Google index bản desktop, mobile là phụ | Google **chỉ** index bản mobile |
| Nội dung ẩn trên mobile vẫn được index | Nội dung ẩn trên mobile **có thể không** được index |
| Có thể tối ưu riêng desktop | Desktop không được index |

> [!warning] Cái bẫy "parity"
> Nhiều site cắt bớt nội dung trên mobile để "gọn": bỏ mô tả dài, ẩn bảng, bỏ breadcrumb, rút gọn menu. Với mobile-first indexing, **những thứ bị cắt đó biến mất khỏi index**. Đây là nguyên nhân mất traffic âm thầm và khó chẩn đoán nhất trong technical SEO.

## 2. Checklist parity — mobile phải có đủ

Mọi thứ dưới đây phải **giống nhau** giữa mobile và desktop:

- [ ] Nội dung chính đầy đủ (không rút gọn)
- [ ] Heading — [[Heading Structure and Content Outline]]
- [ ] `<title>`, meta description — [[Title Tags and Meta Descriptions]]
- [ ] Structured data — [[Structured Data and Rich Results]]
- [ ] Ảnh (và `alt`) — [[Image and Video SEO]]
- [ ] Video
- [ ] Link nội bộ — [[Internal Linking]]
- [ ] `rel=canonical` và `hreflang`
- [ ] Thẻ `robots` — không được `noindex` bản mobile

## 3. Nội dung ẩn sau tab/accordion

Google nói rõ: **nội dung trong tab, accordion, "xem thêm" vẫn được index đầy đủ** miễn là nó có trong DOM khi tải.

Điều **không** được index: nội dung chỉ được **fetch** khi người dùng click (lazy load qua AJAX). Googlebot không click — [[JavaScript Rendering and SEO]].

Phân biệt:
- ✅ `<div class="hidden">nội dung</div>` + CSS toggle → được index
- ❌ `onClick → fetch('/api/noi-dung')` → không được index

## 4. Cấu hình kỹ thuật

| Cấu hình | Khuyến nghị |
|---|---|
| **Responsive design** (một URL, CSS thích ứng) | ✅ Google khuyến nghị mặc định |
| **Dynamic serving** (cùng URL, HTML khác theo UA) | ⚠️ Cần header `Vary: User-Agent`, dễ sai |
| **URL riêng** (`m.example.com`) | ❌ Lỗi thời, cần `rel=alternate`/`canonical` chéo, dễ hỏng |

Với responsive, đảm bảo:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
Thiếu thẻ này là lỗi mobile cơ bản nhất.

Xem [[Responsive Layout]] (Frontend) cho phần kỹ thuật CSS.

## 5. Trải nghiệm mobile ảnh hưởng SEO

- **Interstitial che nội dung** khi vừa vào từ Google — Google giảm hạng rõ ràng. Ngoại lệ: banner cookie theo luật, xác minh tuổi, đăng nhập cần thiết.
- **Vùng chạm quá nhỏ / quá gần nhau** — ảnh hưởng trải nghiệm, gián tiếp ảnh hưởng chỉ số.
- **Chữ quá nhỏ** phải phóng to mới đọc được.
- **Nội dung tràn ngang** phải cuộn ngang.
- **CLS do quảng cáo chèn** — [[Core Web Vitals for SEO]].

## 6. Cạm bẫy

- **Kiểm bằng cách thu nhỏ cửa sổ desktop.** Không tương đương. Dùng GSC URL Inspection (Googlebot smartphone) hoặc thiết bị thật.
- **Chặn tài nguyên chỉ dùng cho mobile trong `robots.txt`** — [[Robots Exclusion]].
- **`noindex` sót trên bản mobile.**
- **Lazy load nội dung chính bằng Intersection Observer.** Googlebot không cuộn — nội dung dưới màn hình đầu có thể không được thấy nếu chỉ load khi cuộn tới.
- **Menu mobile chỉ render sau JS.** Mất link khám phá.
- **Ảnh mobile độ phân giải thấp** — ảnh hưởng Google Images.
- **Quên rằng Google Search Console "Mobile Usability" report đã bị bỏ (2023).** Dùng Lighthouse và thiết bị thật thay thế.

## 7. Checklist áp dụng

- [ ] Đã so nội dung mobile vs desktop từng mục theo checklist mục 2 chưa?
- [ ] Có `<meta name="viewport">` không?
- [ ] Nội dung trong tab/accordion có trong DOM lúc tải không (không phải fetch khi click)?
- [ ] GSC URL Inspection (live test) có hiện đủ nội dung không?
- [ ] Có interstitial nào che nội dung khi vào từ Google không?
- [ ] Structured data có đủ trên bản mobile không?
- [ ] Đã kiểm trên thiết bị thật, không chỉ DevTools?
- [ ] Menu và link nội bộ có hoạt động khi tắt JS không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC URL Inspection (live) | Xem đúng cái Googlebot smartphone thấy | [GSC](https://search.google.com/search-console) |
| Lighthouse (mobile preset) | Kiểm trải nghiệm mobile | Chrome DevTools |
| Chrome DevTools Device Mode | Debug nhanh, không thay thiết bị thật | — |
| Screaming Frog (UA = Googlebot smartphone) | So crawl mobile vs desktop toàn site | [SF](https://www.screamingfrog.co.uk/seo-spider/) |

## Tham khảo
- [Google — Mobile-first indexing best practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)
- [Google — Mobile site and mobile-first indexing overview](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)
- [Google Search Central Blog — Intrusive interstitials](https://developers.google.com/search/blog/2016/08/helping-users-easily-access-content-on)
- [web.dev — Responsive web design basics](https://web.dev/articles/responsive-web-design-basics)

## Liên kết
[[Responsive Layout]] · [[Core Web Vitals for SEO]] · [[JavaScript Rendering and SEO]] · [[Heading Structure and Content Outline]] · [[Crawl Auditing]] · [[SEO]]
