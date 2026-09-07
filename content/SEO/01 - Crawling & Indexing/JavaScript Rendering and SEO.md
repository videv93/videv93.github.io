---
tags: [seo, technical, javascript]
status: evergreen
---
# JavaScript Rendering and SEO

> Googlebot **có** chạy JavaScript — nhưng ở một **pha thứ hai, xếp hàng, có độ trễ và có ngân sách**. Mọi vấn đề JS SEO đều bắt nguồn từ việc đối xử với pha hai như thể nó là pha một.

## 1. Hai pha xử lý của Googlebot

```
Crawl (fetch HTML thô)
   │
   ├──► Index ngay phần có trong HTML thô        ← pha 1, nhanh
   │
   └──► Hàng đợi render (Web Rendering Service)
              │
              └──► Chạy JS, index phần mới xuất hiện   ← pha 2, trễ
```

Hệ quả trực tiếp:

| Thứ | Nên nằm ở pha nào | Vì sao |
|---|---|---|
| `<title>`, meta description | **Pha 1** | Ảnh hưởng snippet ngay — [[Title Tags and Meta Descriptions]] |
| `rel=canonical` | **Pha 1** | [[Canonicalization]] rất nhạy với độ trễ |
| Nội dung chính | **Pha 1** | Quyết định trang có được index không |
| Internal link | **Pha 1** | Link chỉ xuất hiện sau JS sẽ được khám phá muộn hơn nhiều |
| `hreflang` | **Pha 1** | [[International SEO and hreflang]] |
| Structured data | Pha 1 tốt hơn, pha 2 chấp nhận được | [[Structured Data and Rich Results]] |
| Widget phụ, comment, related posts | Pha 2 là ổn | Không ảnh hưởng đánh giá chính |

> [!warning] Độ trễ pha 2 không cố định
> Google từng nói trung vị là vài giây, nhưng đuôi phân phối rất dài — có site chờ nhiều ngày. Với [[News and Publisher SEO]] hay trang thương mại theo mùa, độ trễ đó là mất doanh thu.

## 2. Chiến lược render, nhìn từ crawler

| Chiến lược | HTML thô có nội dung? | Rủi ro SEO | Khi nào dùng |
|---|---|---|---|
| **SSG / static** | ✅ Đầy đủ | Thấp nhất | Nội dung ít đổi — blog, docs |
| **SSR** | ✅ Đầy đủ | Thấp | Nội dung động, cá nhân hoá nhẹ |
| **ISR** (incremental) | ✅ Đầy đủ | Thấp | Catalog lớn — xem [[Next.js Rendering Strategies]] |
| **CSR** (client-side) | ❌ Rỗng | **Cao** | App sau đăng nhập, không cần SEO |
| **Dynamic rendering** | ✅ (cho bot) | Trung bình | Google gọi là **giải pháp tạm**, không khuyến nghị |
| **Hydration một phần / RSC** | ✅ Phần lớn | Thấp | Xem [[Next.js Rendering Strategies]] |

**Quy tắc thực dụng:** nếu `curl` URL và không thấy nội dung chính trong HTML trả về, bạn đang đặt cược vào pha 2.

```bash
curl -sL "https://example.com/trang" | grep -o '<title>[^<]*' 
curl -sL "https://example.com/trang" | wc -c   # so với kích thước rendered
```

## 3. Những gì Googlebot **không** làm

- **Không click.** Nội dung chỉ hiện sau `onclick` sẽ không được thấy — trừ khi nó có trong DOM sẵn.
- **Không cuộn.** Infinite scroll không được kích hoạt. Phải có link phân trang thật — [[Pagination and Faceted Navigation]].
- **Không điền form.** Nội dung sau form là vô hình.
- **Không giữ state giữa các trang.** Mỗi URL được render sạch, không có `localStorage`/cookie từ trang trước.
- **Từ chối xin quyền** — geolocation, notification, camera đều bị deny. Nội dung phụ thuộc chúng sẽ không hiện.
- **Không index nội dung trong Shadow DOM đóng.**

## 4. Các crawler khác nghiêm khắc hơn nhiều

| Crawler | Chạy JS? | Hệ quả |
|---|---|---|
| Googlebot | ✅ (pha 2) | Như trên |
| Bingbot | Một phần, hạn chế | SSR an toàn hơn hẳn |
| GPTBot / ClaudeBot / PerplexityBot | ❌ | CSR = vô hình với AI Search — [[Generative Engine Optimization]] |
| Facebook / Twitter crawler | ❌ | OG tag phải ở HTML thô |

Đây là một lập luận **mới và mạnh** cho SSR: kể cả khi Googlebot xử lý được CSR, các crawler AI thì không, và tỷ trọng của chúng đang tăng — xem [[AI Search and Zero Click]].

## 5. Cạm bẫy

- **Link bằng `<div onclick>` hoặc `<span>`.** Googlebot chỉ theo `<a href="...">` thật. `router.push()` trong onClick không tạo link khám phá được.
- **Chặn JS/CSS trong `robots.txt`.** Pha 2 render ra trang vỡ — xem [[Robots Exclusion]].
- **Fetch dữ liệu từ API bị chặn hoặc chậm.** Nếu API timeout trong lúc render, nội dung mất hẳn.
- **Soft 404 do CSR.** Route không tồn tại trả HTML `200` rỗng rồi JS mới hiện "Not found" ⇒ Google thấy `200` trống. Phải trả `404` thật từ server — [[HTTP Status Codes for SEO]].
- **Thay đổi canonical/title bằng JS.** Rủi ro cao, độ trễ cao.
- **Kiểm bằng "View source" và kết luận sai.** View source = HTML thô (pha 1); DevTools Elements = DOM đã render (pha 2). Cần xem **cả hai** và biết mình đang xem cái nào.

## 6. Checklist áp dụng

- [ ] `curl` URL — nội dung chính có trong HTML thô không?
- [ ] `<title>`, meta description, canonical có trong HTML thô không?
- [ ] Mọi link điều hướng là `<a href>` thật không?
- [ ] Route không tồn tại có trả `404` từ server không?
- [ ] JS/CSS có bị chặn trong `robots.txt` không?
- [ ] GSC URL Inspection → "View crawled page" có hiện đủ nội dung không?
- [ ] Infinite scroll có link phân trang thay thế cho crawler không?
- [ ] Đã kiểm site có hiện gì với crawler **không chạy JS** chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC URL Inspection (Live test) | Xem đúng DOM Googlebot render | [GSC](https://search.google.com/search-console) |
| Rich Results Test | Render nhanh, xem HTML sau JS | [Test](https://search.google.com/test/rich-results) |
| Screaming Frog (JS rendering mode) | So HTML thô vs rendered toàn site | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| `curl` / "Disable JavaScript" trong DevTools | Rẻ nhất, dùng đầu tiên | — |

## Tham khảo
- [Google — Understand the JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google — Fix search-related JavaScript problems](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript)
- [Google — Dynamic rendering as a workaround](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering)
- [Google — Lazy-loading content](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading)

## Liên kết
[[Browser Rendering Pipeline]] · [[Next.js Rendering Strategies]] · [[Crawling and Crawl Budget]] · [[HTTP Status Codes for SEO]] · [[Generative Engine Optimization]] · [[SEO]]
