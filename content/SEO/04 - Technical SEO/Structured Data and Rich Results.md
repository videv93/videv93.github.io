---
tags: [seo, technical, structured-data]
status: evergreen
---
# Structured Data and Rich Results

> Structured data **không nâng thứ hạng**. Nó cho phép Google hiểu trang chính xác hơn và hiển thị trang dưới dạng **rich result** — tăng CTR, không tăng vị trí. Nhầm hai điều này là nguồn của phần lớn công sức lãng phí.

## 1. Định dạng và cú pháp

Google hỗ trợ ba định dạng; **JSON-LD là khuyến nghị chính thức**:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tiêu đề đúng như hiển thị trên trang",
  "author": { "@type": "Person", "name": "Tên thật", "url": "https://example.com/tac-gia/ten/" },
  "datePublished": "2026-09-02",
  "dateModified": "2026-09-02",
  "image": ["https://example.com/anh.jpg"]
}
</script>
```

| Định dạng | Ưu | Nhược |
|---|---|---|
| **JSON-LD** | Tách khỏi HTML, dễ sinh, dễ sửa | Phải giữ đồng bộ với nội dung |
| Microdata | Gắn trực tiếp vào HTML | Rối, khó bảo trì |
| RDFa | Chuẩn W3C | Ít dùng, ít công cụ |

## 2. Loại schema đáng làm — và trạng thái hiện tại

| Loại | Rich result | Trạng thái (2026-09) |
|---|---|---|
| `Organization` | Knowledge panel, logo | ✅ Nên có trên mọi site |
| `Person` (tác giả) | Hỗ trợ entity — [[E-E-A-T]] | ✅ |
| `BreadcrumbList` | Breadcrumb trong SERP | ✅ Rẻ, hiệu quả |
| `Article` / `NewsArticle` | Top Stories — [[News and Publisher SEO]] | ✅ |
| `Product` + `Offer` | Giá, tình trạng hàng — [[Ecommerce SEO]] | ✅ |
| `Review` / `AggregateRating` | Sao đánh giá | ✅ nhưng bị siết chặt chống lạm dụng |
| `LocalBusiness` | Local pack — [[Local SEO]] | ✅ |
| `VideoObject` | Video rich result — [[Image and Video SEO]] | ✅ |
| `Recipe`, `JobPosting`, `Event`, `Course` | Rich result riêng | ✅ theo ngành |
| `FAQPage` | ⚠️ Google **thu hẹp mạnh 8/2023** — chỉ còn site chính phủ/y tế | ⚠️ Kiểm lại trước khi làm |
| `HowTo` | ⚠️ **Đã bỏ** trên desktop và mobile | ❌ |
| `SoftwareApplication` | Không có rich result phổ biến | ⚪ Làm cho entity, không cho hiển thị |

> [!warning] Đây là bảng có chu kỳ bán rã ngắn nhất trong technical SEO
> `FAQPage` và `HowTo` là bằng chứng: từng là chiến thuật được khuyên khắp nơi, bị Google thu hẹp trong một thông báo. **Luôn kiểm [Search Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) chính thức trước khi triển khai**, đừng tin bài blog. Xem [[SEO Tactics Half-Life]].

## 3. Quy tắc bắt buộc

1. **Structured data phải khớp nội dung người dùng nhìn thấy.** Đánh dấu thông tin không hiển thị là vi phạm [[Google Spam Policies]] và bị manual action.
2. **Chỉ đánh dấu nội dung chính của trang.**
3. **Không đánh dấu review do chính bạn viết về chính mình** (self-serving review) — Google cấm rõ ràng.
4. **Trường bắt buộc phải đủ.** Thiếu trường bắt buộc ⇒ không đủ điều kiện rich result.
5. **Đặt trong HTML thô nếu được.** Google có đọc JSON-LD sinh bằng JS nhưng chậm hơn — [[JavaScript Rendering and SEO]].
6. **Nối entity bằng `@id` và `sameAs`** để Google hiểu các thực thể liên quan — [[Brand Signals and Entity SEO]].

## 4. Structured data cho AI Search

Một lý do **mới** để làm structured data: crawler của mô hình ngôn ngữ đọc dữ liệu có cấu trúc dễ hơn văn xuôi, và chúng thường **không chạy JS**. Dữ liệu rõ ràng về sản phẩm, giá, tác giả, ngày giúp nội dung được trích dẫn chính xác hơn — xem [[Generative Engine Optimization]].

Đây là lập luận bậc C (chưa có xác nhận chính thức) — xem [[Ranking Signals Overview]].

## 5. Cạm bẫy

- **Nhồi schema cho loại đã bị Google bỏ.** `HowTo`, `FAQPage` — xem bảng ở mục 2.
- **Đánh dấu giá/tình trạng hàng không khớp trang.** Rất dễ bị phát hiện với ecommerce.
- **Bịa `AggregateRating`.** Vi phạm rõ ràng, hay bị report.
- **JSON-LD trùng lặp/mâu thuẫn** — nhiều plugin cùng sinh schema. Kiểm bằng Rich Results Test.
- **Coi structured data là ranking factor.** Nó không phải.
- **Không theo dõi GSC → Enhancements.** Lỗi schema xuất hiện âm thầm sau khi đổi template.
- **Đánh dấu `Organization` khác nhau ở mỗi trang.** Phải nhất quán toàn site.

## 6. Checklist áp dụng

- [ ] Loại schema định dùng **còn** trong Search Gallery chính thức không?
- [ ] Mọi trường bắt buộc đã đủ chưa (kiểm Rich Results Test)?
- [ ] Dữ liệu đánh dấu có khớp 100% nội dung hiển thị không?
- [ ] Có JSON-LD trùng lặp từ nhiều plugin không?
- [ ] `Organization` có nhất quán toàn site không?
- [ ] Có `sameAs` trỏ tới hồ sơ chính thức (LinkedIn, Wikipedia, Wikidata) không?
- [ ] GSC → Enhancements có lỗi nào không?
- [ ] Schema có trong HTML thô không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Rich Results Test | Kiểm đủ điều kiện rich result | [Test](https://search.google.com/test/rich-results) |
| Schema Markup Validator | Kiểm cú pháp schema.org tổng quát | [Validator](https://validator.schema.org/) |
| GSC → Enhancements | Lỗi schema toàn site, theo thời gian | [GSC](https://search.google.com/search-console) |
| Schema.org | Từ điển đầy đủ mọi type | [schema.org](https://schema.org/) |

## Tham khảo
- [Google — Structured data markup that Google Search supports](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Google — Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google Search Central Blog — Changes to HowTo and FAQ rich results (2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Schema.org — Full hierarchy](https://schema.org/docs/full.html)

## Liên kết
[[SERP Feature Targeting]] · [[E-E-A-T]] · [[Brand Signals and Entity SEO]] · [[Google Spam Policies]] · [[SEO Tactics Half-Life]] · [[SEO]]
