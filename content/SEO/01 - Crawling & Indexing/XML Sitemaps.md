---
tags: [seo, technical, crawling]
status: evergreen
---
# XML Sitemaps

> Sitemap là **gợi ý khám phá**, không phải lệnh index. Nó giúp Google *tìm thấy* URL nhanh hơn; nó không làm URL được index, và nó không sửa được vấn đề chất lượng.

## 1. Sitemap làm gì và không làm gì

| Sitemap **có** | Sitemap **không** |
|---|---|
| Giúp khám phá URL không có link nội bộ tốt | Ép Google index |
| Báo `lastmod` để ưu tiên crawl lại | Nâng thứ hạng |
| Cho GSC một tập URL để báo cáo theo nhóm | Thay thế [[Internal Linking]] |
| Khai báo ảnh, video, phiên bản ngôn ngữ | Sửa nội dung mỏng hoặc trùng lặp |

> [!note] Giá trị bị đánh giá thấp nhất của sitemap
> Trong GSC, **Page indexing report lọc được theo từng sitemap**. Chia sitemap theo loại trang (`/products`, `/blog`, `/categories`) biến nó thành **công cụ chẩn đoán**: bạn thấy ngay nhóm nào có tỷ lệ index thấp. Đây thường là lý do tốt nhất để chia nhỏ sitemap.

## 2. Giới hạn kỹ thuật và cấu trúc

- Tối đa **50.000 URL** và **50MB chưa nén** mỗi file. Vượt thì tách và dùng **sitemap index**.
- Nén `.gz` được chấp nhận và nên dùng.
- URL trong sitemap phải **tuyệt đối** và cùng host với sitemap (trừ khi khai qua `robots.txt` hoặc GSC cross-submit).
- Khai báo trong `robots.txt`: `Sitemap: https://example.com/sitemap_index.xml`, **và** submit trong [[Google Search Console]].

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/bai-viet/</loc>
    <lastmod>2026-09-02</lastmod>
  </url>
</urlset>
```

`<changefreq>` và `<priority>`: **Google bỏ qua cả hai.** Đừng tốn công.

## 3. `lastmod` — trường duy nhất còn giá trị thật

Google xác nhận có dùng `lastmod`, **với điều kiện nó nhất quán và chính xác**.

- ✅ Cập nhật `lastmod` khi nội dung thật sự thay đổi có nghĩa.
- ❌ Đặt `lastmod = hôm nay` cho toàn bộ site mỗi lần build. Google phát hiện rất nhanh và **ngừng tin trường này trên toàn site** — bạn mất vĩnh viễn một tín hiệu miễn phí.
- Định dạng W3C Datetime; chỉ ngày (`2026-09-02`) là hợp lệ.

## 4. Các loại sitemap chuyên biệt

| Loại | Dùng khi | Note liên quan |
|---|---|---|
| **Image sitemap** | Ảnh load bằng JS, hoặc ảnh là nội dung chính | [[Image and Video SEO]] |
| **Video sitemap** | Có video tự host, cần metadata thời lượng/thumbnail | [[Image and Video SEO]] |
| **News sitemap** | Site tin, chỉ chứa bài **48 giờ gần nhất**, tối đa 1.000 URL | [[News and Publisher SEO]] |
| **hreflang trong sitemap** | Site đa ngôn ngữ, tránh nhồi thẻ vào `<head>` | [[International SEO and hreflang]] |

## 5. Cạm bẫy

- **Sitemap chứa URL không index được** — 404, redirect, `noindex`, URL bị canonical sang chỗ khác. Đây là lỗi phổ biến nhất và nó **làm giảm độ tin cậy của cả sitemap**. Quy tắc: sitemap chỉ chứa URL trả `200`, self-canonical, và index được.
- **Sitemap tĩnh không được cập nhật.** Sinh động theo dữ liệu thật; sitemap sinh tay sẽ lệch sau vài tuần.
- **Coi sitemap là thuốc chữa index.** Nếu Google báo "Discovered – currently not indexed", vấn đề là *chất lượng/độ ưu tiên*, không phải khám phá. Xem [[Indexing and Index Bloat]].
- **Sitemap bị `Disallow` trong `robots.txt`.** Nghe vô lý nhưng gặp thường xuyên.
- **Chỉ có một sitemap khổng lồ cho site lớn.** Mất hoàn toàn khả năng chẩn đoán theo nhóm (mục 1).
- **Quên xoá sitemap của domain cũ sau migration.** Xem [[Site Migration]].

## 6. Checklist áp dụng

- [ ] Mọi URL trong sitemap trả `200` và self-canonical?
- [ ] Không có URL `noindex` nào trong sitemap?
- [ ] Sitemap được sinh tự động từ dữ liệu thật?
- [ ] `lastmod` phản ánh thay đổi thật, không phải ngày build?
- [ ] Đã chia sitemap theo loại trang để chẩn đoán được trong GSC?
- [ ] Đã khai trong `robots.txt` **và** submit trong GSC?
- [ ] Sitemap có bị chặn bởi `robots.txt` không?
- [ ] Tỷ lệ "Indexed / Submitted" của từng sitemap là bao nhiêu — nhóm nào thấp bất thường?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC Sitemaps report | Tỷ lệ index theo từng sitemap | [GSC](https://search.google.com/search-console) |
| Screaming Frog | Sinh sitemap và kiểm URL trong sitemap | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| next-sitemap | Sinh sitemap cho Next.js | [npm](https://www.npmjs.com/package/next-sitemap) |

## Tham khảo
- [Google — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [sitemaps.org — Protocol](https://www.sitemaps.org/protocol.html)
- [Google — Sitemaps report in Search Console](https://support.google.com/webmasters/answer/7451001)
- [Google Search Central Blog — lastmod is used](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)

## Liên kết
[[Crawling and Crawl Budget]] · [[Indexing and Index Bloat]] · [[Google Search Console]] · [[International SEO and hreflang]] · [[Site Migration]] · [[SEO]]
