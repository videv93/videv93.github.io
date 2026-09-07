---
tags: [seo, off-page, brand, entity]
status: growing
---
# Brand Signals and Entity SEO

> Google chuyển từ khớp **chuỗi ký tự** sang hiểu **thực thể** (entity) — người, tổ chức, sản phẩm, địa điểm có danh tính riêng trong Knowledge Graph. Với site, điều này nghĩa là: trở thành một entity Google nhận diện được là nền móng cho mọi thứ khác.

## 1. Entity là gì và vì sao nó quan trọng

**Entity** = một thực thể có định danh duy nhất, không phụ thuộc cách viết. "Apple" (công ty) và "apple" (quả) là hai entity khác nhau dù cùng chuỗi ký tự.

Hệ quả cho SEO:

| Trước (khớp chuỗi) | Sau (hiểu entity) |
|---|---|
| Phải chứa đúng từ khoá | Google hiểu khái niệm liên quan |
| Trang về "xe hơi" khác trang về "ô tô" | Cùng entity |
| Authority theo domain | Authority theo **entity và chủ đề** |
| Brand chỉ là một từ khoá | Brand là một entity có thuộc tính |

Điều này liên kết trực tiếp với [[Topical Authority]] và [[E-E-A-T]] — cả hai đều là cách nói về việc Google nhận diện được bạn *là ai* và *giỏi về cái gì*.

## 2. Brand signal — cái gì đếm được

| Tín hiệu | Cách xây | Bậc bằng chứng |
|---|---|---|
| **Truy vấn brand** (người tìm tên bạn) | Marketing ngoài search, PR, sản phẩm tốt | B — Google mô tả brand search là tín hiệu quan tâm |
| **Nhắc tới không link** | [[Digital PR]] | C |
| **Hồ sơ nhất quán** trên các nền tảng | Điền đủ, đúng, giống nhau | B |
| **Knowledge Panel** | Nhiều nguồn uy tín xác nhận sự tồn tại | B |
| **Wikipedia / Wikidata** | Đủ notability thật | B |
| **Review và đánh giá** | Sản phẩm tốt, yêu cầu review thật | B |
| **`sameAs` structured data** | Nối các hồ sơ chính thức | A — Google tài liệu hoá |

> [!note] Truy vấn brand tăng là tín hiệu sức khoẻ tốt nhất
> Theo dõi trong [[Google Search Console]]: tách truy vấn chứa tên brand khỏi non-brand. Brand search tăng nghĩa là thị trường biết tới bạn — và nó thường kéo theo cả hiệu suất non-brand.

## 3. Việc làm được cụ thể

Xếp theo tỷ lệ tác động / công sức:

1. **`Organization` schema đầy đủ** trên trang chủ, với `sameAs` trỏ tới mọi hồ sơ chính thức:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Organization",
     "name": "Tên chính thức",
     "url": "https://example.com/",
     "logo": "https://example.com/logo.png",
     "sameAs": [
       "https://www.linkedin.com/company/...",
       "https://github.com/...",
       "https://www.wikidata.org/wiki/Q..."
     ]
   }
   ```
   Xem [[Structured Data and Rich Results]].
2. **Trang "Về chúng tôi" đầy đủ** — lịch sử, pháp nhân, đội ngũ, địa chỉ. Đây là nguồn Google đọc để hiểu bạn là ai.
3. **Hồ sơ nhất quán** trên LinkedIn, GitHub, Crunchbase, hồ sơ ngành — cùng tên, cùng mô tả, cùng logo.
4. **[[Google Business Profile]]** nếu có địa điểm vật lý.
5. **Trang tác giả** cho từng người viết, có `Person` schema và `sameAs` — [[E-E-A-T]].
6. **Wikidata entry** — dễ tạo hơn Wikipedia nhiều, và Google đọc Wikidata.
7. **[[Digital PR]]** để được các nguồn uy tín nhắc tới cùng chủ đề của bạn.

## 4. Cạm bẫy

- **Cố tạo Wikipedia page không đủ notability.** Bị xoá, và có thể gây chú ý tiêu cực.
- **Thông tin không nhất quán** giữa các hồ sơ — tên khác nhau, địa chỉ khác nhau. Làm yếu tín hiệu entity.
- **`sameAs` trỏ tới hồ sơ không phải của bạn** hoặc hồ sơ bỏ hoang.
- **Mua review.** Vi phạm chính sách nền tảng và bị phát hiện.
- **Coi brand signal là thứ SEO tự làm được.** Phần lớn là sản phẩm, marketing, và PR.
- **Bỏ qua truy vấn brand khi báo cáo.** Trộn brand vào non-brand làm sai lệch mọi kết luận — [[SEO KPIs and Reporting]].
- **Đổi tên brand.** Chi phí SEO của việc này rất cao và kéo dài nhiều năm.

## 5. Checklist áp dụng

- [ ] Có `Organization` schema với `sameAs` đầy đủ trên trang chủ không?
- [ ] Tên, mô tả, logo có nhất quán trên mọi hồ sơ chính thức không?
- [ ] Có Wikidata entry không?
- [ ] Trang "Về chúng tôi" có thông tin pháp nhân đầy đủ không?
- [ ] Mỗi tác giả có trang riêng với `Person` schema không?
- [ ] Đã tách truy vấn brand vs non-brand trong GSC chưa?
- [ ] Truy vấn brand có tăng theo tháng không?
- [ ] Google có hiện Knowledge Panel cho brand không? Nếu có, thông tin đúng chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Wikidata | Tạo entity, Google đọc trực tiếp | [Wikidata](https://www.wikidata.org/) |
| GSC (lọc truy vấn brand) | Đo brand search | [GSC](https://search.google.com/search-console) |
| Google Knowledge Panel (đề nghị sửa) | Yêu cầu sửa thông tin sai | [Google](https://support.google.com/knowledgepanel) |
| Rich Results Test | Kiểm `Organization`/`Person` schema | [Test](https://search.google.com/test/rich-results) |

## Tham khảo
- [Google — Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google — Knowledge panels](https://support.google.com/knowledgepanel/answer/9163198)
- [Google — How Search works: Knowledge Graph](https://www.google.com/search/howsearchworks/)
- [Schema.org — sameAs](https://schema.org/sameAs)

## Liên kết
[[E-E-A-T]] · [[Topical Authority]] · [[Digital PR]] · [[Structured Data and Rich Results]] · [[Google Business Profile]] · [[SEO]]
