---
tags: [seo, technical, crawling]
status: evergreen
---
# Crawling and Crawl Budget

> Crawl budget là khái niệm bị lo lắng thái quá nhiều nhất trong SEO. Với **hầu hết site dưới ~10.000 URL, nó không phải vấn đề.** Note này nói rõ khi nào nó *thật sự* là vấn đề, và khi đó phải làm gì.

## 1. Hai thành phần, hai cách sửa khác nhau

| Thành phần | Google định nghĩa | Cái gì làm nó thấp | Cách nâng |
|---|---|---|---|
| **Crawl rate limit** | Số kết nối song song Googlebot dám mở mà không hại server | Server chậm, nhiều 5xx, timeout | Sửa hạ tầng, giảm TTFB, bỏ rate-limit sai |
| **Crawl demand** | Google *muốn* crawl bao nhiêu | URL ít giá trị, ít cập nhật, ít link trỏ tới | [[Internal Linking]], [[Backlink Fundamentals]], cập nhật nội dung thật |

> [!warning] Crawl budget không phải một hạn ngạch bạn "tiêu hết"
> Nó là kết quả của hai đại lượng trên. "Tiết kiệm crawl budget" bằng cách chặn lung tung thường làm **giảm** crawl demand chứ không giải phóng gì cả.

## 2. Khi nào crawl budget thật sự là vấn đề

Google nói rõ: chỉ đáng lo khi site có **hơn ~1 triệu URL** thay đổi ít, hoặc **hơn ~10.000 URL** thay đổi hàng ngày. Ngoài ra:

- Site sinh URL không giới hạn từ filter/sort — xem [[Pagination and Faceted Navigation]]
- Site ecommerce lớn với biến thể sản phẩm — [[Ecommerce SEO]]
- Site [[Programmatic SEO]] hàng trăm nghìn trang
- Site có tỷ lệ 5xx cao hoặc TTFB > 1s

**Phép kiểm trước khi lo:** vào GSC → Settings → Crawl stats. Nếu "Average response time" ổn và số request/ngày lớn hơn tổng số URL cần index nhiều lần, bạn **không** có vấn đề crawl budget.

## 3. Cái gì thật sự đốt crawl

Xếp theo mức độ hay gặp trong audit thật:

1. **URL tham số vô hạn** — `?sort=`, `?filter=`, `?sessionid=`. Nguồn số một.
2. **Chuỗi redirect dài** — mỗi hop là một request. Xem [[HTTP Status Codes for SEO]].
3. **Soft 404** — trả 200 cho trang trống, Google vẫn phải crawl và đánh giá.
4. **Trang trùng lặp không canonical** — xem [[Canonicalization]].
5. **Tài nguyên nặng khi render JS** — mỗi trang kéo theo hàng chục request. Xem [[JavaScript Rendering and SEO]].
6. **Sitemap sai** — liệt kê URL 404/redirect/noindex. Xem [[XML Sitemaps]].
7. **Calendar/lịch vô hạn** — `?date=2099-01-01` sinh không giới hạn.

## 4. Công cụ điều khiển crawl, xếp theo độ mạnh

| Công cụ | Ngăn crawl? | Ngăn index? | Truyền link equity? | Dùng khi |
|---|---|---|---|---|
| `robots.txt: Disallow` | ✅ | ❌ | ❌ | Chặn vùng vô nghĩa quy mô lớn |
| `<meta robots noindex>` | ❌ | ✅ | ✅ (vẫn theo link) | Muốn gỡ khỏi index |
| `rel=canonical` | ❌ | Gộp | ✅ | Trùng lặp thật |
| `410 Gone` | ❌ (lần sau ít hơn) | ✅ | ❌ | Xoá vĩnh viễn |
| `nofollow` trên link | Giảm khám phá | ❌ | ❌ | Hiếm khi đúng để quản crawl |
| `Crawl-delay` | Bing có, **Google bỏ qua** | ❌ | — | Chỉ cho Bing |

Xem chi tiết ở [[Robots Exclusion]].

## 5. Cạm bẫy

- **Chặn `robots.txt` để gỡ index.** Sai chiều: Googlebot không đọc được `noindex` bên trong nữa. Phải `noindex` **trước**, chờ deindex, rồi mới chặn.
- **Chặn CSS/JS.** Googlebot cần chúng để render; chặn = Google thấy trang vỡ. Xem [[JavaScript Rendering and SEO]].
- **Tin số "Crawl budget" của công cụ bên thứ ba.** Chỉ log server và GSC Crawl stats mới là dữ liệu thật — xem [[Log File Analysis]].
- **Nhầm crawl spike với vấn đề.** Google tăng crawl khi phát hiện site thay đổi nhiều; đó thường là tín hiệu tốt.
- **Quên các crawler khác.** GPTBot, ClaudeBot, Bytespider có thể chiếm phần lớn băng thông. Quyết định chặn hay không là quyết định *kinh doanh* — xem [[Generative Engine Optimization]].

## 6. Checklist áp dụng

- [ ] Đã xem GSC → Crawl stats trước khi kết luận có vấn đề chưa?
- [ ] Tổng số URL site có thật sự vượt ngưỡng Google nêu không?
- [ ] Có URL tham số nào sinh không giới hạn không (thử `site:` + `inurl:?`)?
- [ ] Sitemap có chứa URL 404/redirect/noindex không?
- [ ] Average response time trong Crawl stats có < 500ms không?
- [ ] Có chuỗi redirect nào dài hơn 1 hop không?
- [ ] CSS/JS có bị chặn trong `robots.txt` không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC Crawl Stats | Dữ liệu crawl chính thức, 90 ngày | [GSC](https://search.google.com/search-console) |
| Screaming Frog | Phát hiện redirect chain, tham số, soft 404 | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Log analyzer (Screaming Frog Log File Analyser, GoAccess) | Sự thật về hành vi bot | [SF Log](https://www.screamingfrog.co.uk/log-file-analyser/) |

## Tham khảo
- [Google — Large site owner's guide to managing crawl budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)
- [Google — Crawl Stats report](https://support.google.com/webmasters/answer/9679690)
- [Google — Googlebot and other crawlers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)
- [Ahrefs — Crawl Budget: What It Is and Why It Matters](https://ahrefs.com/blog/crawl-budget/)

## Liên kết
[[Robots Exclusion]] · [[XML Sitemaps]] · [[Log File Analysis]] · [[Indexing and Index Bloat]] · [[Pagination and Faceted Navigation]] · [[Caching Strategies]] · [[SEO]]
