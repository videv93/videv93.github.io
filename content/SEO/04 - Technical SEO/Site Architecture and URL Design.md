---
tags: [seo, technical, architecture]
status: evergreen
---
# Site Architecture and URL Design

> Kiến trúc site quyết định **cái gì được crawl, cái gì nhận link equity, và cái gì Google hiểu là quan trọng**. Nó là quyết định khó sửa nhất trong SEO — sửa sau khi site đã lớn nghĩa là [[Site Migration]].

## 1. Nguyên tắc kiến trúc

| Nguyên tắc | Vì sao | Cách kiểm |
|---|---|---|
| **Độ sâu ≤3 click từ trang chủ** cho trang quan trọng | Crawl depth tương quan mạnh với tần suất crawl và thứ hạng | Screaming Frog → cột Crawl Depth |
| **Cấu trúc phẳng và rộng**, không sâu và hẹp | Link equity chảy xuống ít tầng hơn | Sơ đồ site |
| **Mỗi trang có ít nhất một inlink** | Trang mồ côi không được index — [[Internal Linking]] | So sitemap vs crawl |
| **Nhóm theo chủ đề, không theo phòng ban** | Google hiểu chủ đề qua cụm URL — [[Topic Clusters]] | Đọc cây URL |
| **Một trang cho một intent** | Chống cannibalization — [[Intent Mapping]] | GSC Query→Pages |
| **Breadcrumb trên mọi trang con** | Vừa cho người dùng, vừa cho sitelink | `BreadcrumbList` schema |

Xem [[Information Architecture]] (UIUX) cho phần IA từ góc nhìn người dùng; note này nói phần **ràng buộc từ crawler**.

## 2. Thiết kế URL

```
https://example.com/danh-muc/ten-san-pham/
        │           │          │
        │           │          └── slug mô tả, gạch nối
        │           └── phân cấp phản ánh chủ đề
        └── HTTPS, một host duy nhất
```

Quy tắc:

1. **Ngắn và đọc được.** URL là một phần của snippet SERP.
2. **Gạch nối `-`, không gạch dưới `_`.** Google tách từ ở `-`, không tách ở `_`.
3. **Chữ thường.** Server phân biệt hoa/thường ⇒ sinh trùng lặp ([[Canonicalization]]).
4. **Không ID vô nghĩa** nếu tránh được: `/p/12345` kém hơn `/giay-chay-bo-nam/`.
5. **Nhất quán dấu `/` cuối.** Chọn một kiểu và redirect kiểu kia.
6. **Không nhồi từ khoá.** `/seo-dich-vu-seo-cong-ty-seo/` phản tác dụng.
7. **Tiếng Việt: dùng slug không dấu.** URL có dấu bị encode thành `%C3%A1...` — xấu và dài.
8. **Tránh đổi URL.** Mỗi lần đổi là một lần mất mát và một chuỗi redirect.

> [!warning] Phân cấp URL không tự tạo phân cấp thứ hạng
> `/a/b/c/` không làm Google coi `c` thuộc `b`. Cái tạo phân cấp thật là **link nội bộ và breadcrumb**. URL chỉ giúp con người (và bạn) hiểu cấu trúc.

## 3. Subdomain vs subfolder

| | `blog.example.com` | `example.com/blog/` |
|---|---|---|
| Google coi là | Có thể là site riêng | Chắc chắn cùng site |
| Chia sẻ authority | Không đảm bảo | Đảm bảo |
| Quản trị GSC | Property riêng | Cùng property |
| Kỹ thuật | Dễ tách stack | Cần reverse proxy/rewrite |

**Khuyến nghị mặc định: subfolder.** Trừ khi có lý do kỹ thuật bắt buộc, subfolder gần như luôn tốt hơn cho SEO. Nhiều case study công khai ghi nhận tăng traffic đáng kể chỉ từ việc chuyển blog từ subdomain sang subfolder.

Ngoại lệ hợp lý: sản phẩm hoàn toàn khác thương hiệu, hoặc site đa quốc gia dùng ccTLD — [[International SEO and hreflang]].

## 4. Trang danh mục và trang hub

- **Trang danh mục phải có nội dung riêng**, không chỉ là danh sách link. Nếu không, nó là thin content.
- Trang danh mục thường phục vụ intent commercial tốt hơn bài blog — [[Ecommerce SEO]].
- **Hub/pillar page** cần intent riêng, không chỉ là mục lục — [[Topic Clusters]].

## 5. Cạm bẫy

- **Cấu trúc theo sơ đồ tổ chức công ty.** Người dùng không quan tâm phòng ban nào sở hữu nội dung.
- **Menu quá nhiều tầng.** Mega menu với 200 link trên mọi trang làm loãng tín hiệu.
- **Sinh URL từ filter.** Nguồn index bloat lớn nhất — [[Pagination and Faceted Navigation]].
- **Đổi cấu trúc URL "cho đẹp".** Chi phí luôn cao hơn lợi ích ước lượng.
- **Ngày trong URL** (`/2019/03/bai-viet/`). Làm nội dung trông cũ và khoá bạn vào định dạng blog.
- **Trang quan trọng chỉ tới được qua tìm kiếm nội bộ.** Googlebot không dùng form.
- **Breadcrumb chỉ là CSS, không có markup.** Mất cơ hội rich result.

## 6. Checklist áp dụng

- [ ] Mọi trang quan trọng có nằm trong ≤3 click từ trang chủ không?
- [ ] Có trang mồ côi nào không?
- [ ] URL dùng chữ thường, gạch nối, không dấu?
- [ ] Dấu `/` cuối có nhất quán và có redirect không?
- [ ] Blog nằm ở subfolder chứ không subdomain?
- [ ] Trang danh mục có nội dung riêng không?
- [ ] Breadcrumb có markup `BreadcrumbList` không?
- [ ] Có filter/sort nào sinh URL index được không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog | Crawl depth, orphan page, cây URL | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Sitebulb | Trực quan hoá kiến trúc site | [Sitebulb](https://sitebulb.com/) |
| GSC Page Indexing (lọc theo path) | Tỷ lệ index theo nhánh | [GSC](https://search.google.com/search-console) |

## Tham khảo
- [Google — Keep a simple URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure)
- [Google — Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Moz — Site Architecture](https://moz.com/learn/seo/site-architecture)
- [Ahrefs — Website Architecture for SEO](https://ahrefs.com/blog/website-architecture/)

## Liên kết
[[Internal Linking]] · [[Pagination and Faceted Navigation]] · [[Canonicalization]] · [[Information Architecture]] · [[Site Migration]] · [[SEO]]
