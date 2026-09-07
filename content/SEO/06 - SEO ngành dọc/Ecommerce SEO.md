---
tags: [seo, ecommerce]
status: evergreen
---
# Ecommerce SEO

> Ecommerce có ba vấn đề riêng mà site nội dung không có: **trang danh mục là tài sản chính** (không phải blog), **hàng nghìn URL gần trùng lặp**, và **vòng đời sản phẩm** (hết hàng, ngừng bán).

## 1. Phân tầng trang và intent

| Loại trang | Intent phục vụ | Ưu tiên SEO |
|---|---|---|
| **Danh mục** (`/giay-chay-bo/`) | Commercial — "mua giày chạy bộ" | 🔴 **Cao nhất** |
| **Danh mục con** (`/giay-chay-bo/nam/`) | Commercial cụ thể hơn | 🔴 Cao |
| **Sản phẩm** (`/giay-abc-x1/`) | Transactional, brand cụ thể | 🟡 Trung bình |
| **Blog / hướng dẫn** | Informational | 🟡 Trung bình — hỗ trợ, không bán |
| **Trang thương hiệu** (`/thuong-hieu/nike/`) | Navigational + commercial | 🟡 Trung bình |
| **Tìm kiếm nội bộ** | — | ⚪ Không index |

> [!warning] Sai lầm chiến lược phổ biến nhất
> Đổ toàn bộ ngân sách vào blog trong khi trang danh mục thin content. Truy vấn "mua X" — nơi có tiền — được Google trả về **trang danh mục**, không phải bài blog. Kiểm SERP và bạn sẽ thấy ngay. Xem [[Intent Mapping]].

## 2. Trang danh mục — làm cho đúng

- **Nội dung riêng thật**, không chỉ danh sách sản phẩm. Mô tả danh mục, tiêu chí chọn, câu hỏi thường gặp.
- **Đặt nội dung dài phía dưới** danh sách sản phẩm — người mua cần thấy sản phẩm trước.
- **`<h1>` mô tả danh mục**, không phải tên brand.
- **Facet có nhu cầu tìm kiếm được index có chọn lọc** — [[Pagination and Faceted Navigation]].
- **Phân trang self-canonical**, link `<a href>` thật.
- **Breadcrumb có schema** — [[Site Architecture and URL Design]].
- **Không để danh mục rỗng trả `200`** — soft 404, xem [[HTTP Status Codes for SEO]].

## 3. Trang sản phẩm

| Yếu tố | Ghi chú |
|---|---|
| **Mô tả duy nhất** | Mô tả của nhà sản xuất bị dùng bởi hàng trăm shop ⇒ trùng lặp. Viết lại. |
| **`Product` + `Offer` schema** | Giá, `availability`, `sku` — [[Structured Data and Rich Results]] |
| **Review thật** | `AggregateRating` — không bịa |
| **Ảnh chất lượng, nhiều góc** | [[Image and Video SEO]] |
| **Biến thể (size/màu)** | Một URL chính + tham số, canonical về URL chính — [[Canonicalization]] |
| **Thông số dạng bảng** | Dễ trích, dễ đọc |
| **Câu hỏi từ khách** | Nội dung duy nhất, miễn phí |

**Biến thể sản phẩm** là quyết định kiến trúc quan trọng: một URL cho mọi biến thể (canonical đơn giản, tín hiệu tập trung) hay URL riêng mỗi biến thể (bắt được truy vấn "giày abc size 42" nhưng sinh nhiều trang mỏng). Mặc định nên chọn **một URL**, trừ khi có nhu cầu tìm kiếm rõ ràng cho từng biến thể.

## 4. Vòng đời sản phẩm — quyết định theo tình huống

| Tình huống | Xử lý |
|---|---|
| **Hết hàng tạm thời** | Giữ trang `200`, schema `OutOfStock`, hiện ngày về hàng, gợi ý thay thế. **Đừng xoá.** |
| **Ngừng bán, có sản phẩm kế nhiệm** | `301` sang sản phẩm mới |
| **Ngừng bán, không có kế nhiệm, có traffic/link** | Giữ trang, ghi rõ "ngừng kinh doanh", link sang danh mục |
| **Ngừng bán, không traffic, không link** | `410` — [[Indexing and Index Bloat]] |
| **Sản phẩm theo mùa** | Giữ trang cả năm, cập nhật nội dung |

> [!note] Xoá trang sản phẩm hết hàng là sai lầm tốn kém
> Trang đó có thể đã tích luỹ thứ hạng và link nhiều năm. Trả `404` mất tất cả. Với ecommerce lớn, mẫu "hết hàng → 404" tự động là một trong những nguồn mất traffic lớn nhất.

## 5. Vấn đề quy mô

- **[[Crawling and Crawl Budget]]** — site 100.000 sản phẩm cần quản crawl nghiêm túc.
- **Sitemap chia theo loại** để chẩn đoán tỷ lệ index — [[XML Sitemaps]].
- **Mô tả sản phẩm sinh tự động** từ thuộc tính thật là chấp nhận được; sinh bằng AI không có dữ liệu gốc thì không — [[AI Generated Content and SEO]].
- **Merchant Center feed** cho Shopping và product grid trong SERP.
- **Hiệu năng** — trang danh mục nhiều ảnh dễ trượt [[Core Web Vitals for SEO]].

## 6. Cạm bẫy

- **Dùng mô tả của nhà sản xuất.** Trùng lặp với hàng trăm shop khác.
- **Xoá sản phẩm hết hàng.** Xem mục 4.
- **Facet sinh URL không giới hạn.** [[Pagination and Faceted Navigation]].
- **Giá trong schema không khớp giá trên trang.** Vi phạm chính sách, mất rich result.
- **Trang danh mục chỉ có danh sách sản phẩm.** Thin content.
- **Tìm kiếm nội bộ bị index.** Index bloat và trải nghiệm SERP tệ.
- **Bỏ qua truy vấn "gần tôi"** nếu có cửa hàng vật lý — [[Local SEO]].
- **Đo bằng traffic thay vì doanh thu.** Với ecommerce, doanh thu organic là KPI duy nhất đáng báo cáo — [[SEO KPIs and Reporting]].

## 7. Checklist áp dụng

- [ ] Trang danh mục có nội dung riêng, không chỉ danh sách sản phẩm?
- [ ] Đã kiểm SERP cho truy vấn "mua X" — Google trả về loại trang nào?
- [ ] Mô tả sản phẩm có duy nhất không?
- [ ] `Product`/`Offer` schema có khớp giá và tình trạng hàng thật không?
- [ ] Sản phẩm hết hàng có bị 404 tự động không?
- [ ] Facet nào đang được index? Có chọn lọc không?
- [ ] Tìm kiếm nội bộ có bị index không?
- [ ] Sitemap có chia theo loại trang không?
- [ ] Có đo doanh thu organic (không chỉ traffic) không?
- [ ] Biến thể sản phẩm có chiến lược URL rõ ràng không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog | Tìm mô tả trùng, URL facet, soft 404 | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Google Merchant Center | Feed sản phẩm, Shopping | [Merchant](https://merchants.google.com/) |
| GSC (Shopping/Merchant listings report) | Hiệu suất product rich result | [GSC](https://search.google.com/search-console) |
| GA4 Ecommerce | Doanh thu theo kênh organic | [GA4](https://analytics.google.com/) |

## Tham khảo
- [Google — Ecommerce SEO documentation](https://developers.google.com/search/docs/specialty/ecommerce)
- [Google — Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Google — Faceted navigation best practices](https://developers.google.com/search/docs/crawling-indexing/crawling-managing-faceted-navigation)
- [Google — Ecommerce: pagination and incremental page loading](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading)

## Liên kết
[[Pagination and Faceted Navigation]] · [[Structured Data and Rich Results]] · [[Intent Mapping]] · [[Crawling and Crawl Budget]] · [[Local SEO]] · [[SEO]]
