---
tags: [seo, keywords, serp]
status: growing
---
# SERP Feature Targeting

> Nhắm SERP feature là cách rẻ nhất để tăng hiển thị mà không cần tăng thứ hạng — và cũng là cách nhanh nhất để **tăng hiển thị mà mất click**. Luôn tính cả hai chiều.

## 1. Bảng chiến thuật

| Feature | Điều kiện tiên quyết | Chiến thuật | Rủi ro zero-click |
|---|---|---|---|
| **Featured snippet** | Đã ở top 10 | Trả lời trực tiếp trong 40–60 từ, ngay dưới heading dạng câu hỏi | **Cao** — snippet có thể đủ cho người đọc |
| **People Also Ask** | Không cần top | Có mục H2/H3 là chính câu hỏi PAA + trả lời ngắn | Trung bình |
| **Image pack** | Ảnh gốc, alt tốt | [[Image and Video SEO]] | Thấp |
| **Video** | Video trên YouTube hoặc tự host có schema | [[Image and Video SEO]] | Thấp |
| **Review stars** | Review thật của người dùng | `Review`/`AggregateRating` schema — [[Structured Data and Rich Results]] | Thấp (tăng CTR) |
| **FAQ rich result** | ⚠️ Google **đã thu hẹp mạnh** từ 2023 | Chỉ còn cho site chính phủ/y tế | — |
| **Sitelinks** | Cấu trúc site rõ, brand mạnh | [[Site Architecture and URL Design]] | Thấp |
| **Local pack** | GBP đã xác minh | [[Google Business Profile]] | Trung bình |
| **Top Stories** | Site tin đủ điều kiện | [[News and Publisher SEO]] | Thấp |
| **Product grid** | Merchant Center feed | [[Ecommerce SEO]] | Trung bình |
| **AI Overview** | Không "nhắm" trực tiếp được | [[Generative Engine Optimization]] | **Rất cao** |

> [!warning] Bảng này hết hạn nhanh
> FAQ rich result là ví dụ sống: từng là chiến thuật phổ biến nhất 2019–2022, Google thu hẹp gần hết tháng 8/2023. Mọi hướng dẫn viết trước đó vẫn khuyên nhồi FAQ schema. Xem [[SEO Tactics Half-Life]].

## 2. Featured snippet — chi tiết vì nó đáng giá nhất

**Ba định dạng và cách viết cho từng loại:**

| Định dạng | Kích hoạt bởi | Cách viết |
|---|---|---|
| **Đoạn văn** | "là gì", "vì sao", "khi nào" | Đoạn 40–60 từ ngay sau heading, định nghĩa trước, không lan man |
| **Danh sách** | "cách làm", "các bước", "top N" | `<ol>`/`<ul>` sạch, mỗi mục ngắn, heading là chính truy vấn |
| **Bảng** | "so sánh", "giá", "kích thước" | `<table>` HTML thật, không phải ảnh, header rõ |

**Quy tắc quan trọng nhất:** bạn phải **đã ở top 10** thì mới có cơ hội. Google chọn snippet từ các kết quả đang xếp hạng. Nhắm snippet cho truy vấn bạn đứng thứ 40 là lãng phí.

**Cách tìm cơ hội:**
```
GSC → Performance → lọc position 1–10
   → giao với danh sách truy vấn có featured snippet (Ahrefs/Semrush)
   → ưu tiên nơi đối thủ đang giữ snippet
```

## 3. Cái giá của việc thắng

Đây là phần bị bỏ qua trong hầu hết hướng dẫn:

- **Chiếm featured snippet có thể giảm tổng click.** Nếu snippet trả lời trọn vẹn, người dùng không cần click. Nghiên cứu ngành cho thấy điều này xảy ra với truy vấn định nghĩa ngắn.
- **Cách giảm rủi ro:** viết snippet trả lời *đủ để đúng* nhưng *không đủ để xong* — trả lời câu hỏi trực tiếp rồi mở ra bước tiếp theo cần đọc thêm. Đây là ranh giới đạo đức mỏng: đừng cố tình giấu thông tin, hãy chọn truy vấn mà câu trả lời **thật sự** cần chiều sâu.
- **Đo trước/sau.** Khi chiếm được snippet, so click của truy vấn đó trong GSC trước và sau. Nếu impression tăng mà click giảm, cân nhắc `data-nosnippet` hoặc `max-snippet` — xem [[Robots Exclusion]].

## 4. Cạm bẫy

- **Nhồi schema cho feature đã bị Google bỏ.** FAQ, HowTo đều đã thu hẹp. Kiểm tài liệu Google trước khi làm.
- **Đánh dấu structured data không khớp nội dung hiển thị.** Vi phạm chính sách, có thể bị manual action — [[Google Spam Policies]].
- **Nhắm snippet cho truy vấn không có snippet.** Kiểm SERP trước.
- **Bịa review/rating để lấy sao.** Vi phạm rõ ràng và bị phát hiện.
- **Tối ưu cho feature thay vì cho người dùng.** Trang bị bẻ vụn thành các khối tối ưu snippet đọc rất tệ.
- **Không theo dõi khi mất feature.** Feature thay đổi chủ liên tục; đặt cảnh báo.

## 5. Checklist áp dụng

- [ ] Truy vấn mục tiêu **thật sự có** feature đó không (kiểm SERP)?
- [ ] Bạn đã ở top 10 cho truy vấn đó chưa (điều kiện của featured snippet)?
- [ ] Định dạng nội dung có khớp định dạng snippet hiện tại không?
- [ ] Structured data có khớp 100% nội dung hiển thị không?
- [ ] Feature đó còn được Google hỗ trợ không (kiểm tài liệu chính thức, không kiểm blog cũ)?
- [ ] Đã đo click **trước và sau** khi chiếm feature chưa?
- [ ] Có cảnh báo khi mất feature không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Ahrefs / Semrush — lọc SERP feature | Tìm truy vấn có feature, biết ai đang giữ | [Ahrefs](https://ahrefs.com/) |
| Rich Results Test | Kiểm trang có đủ điều kiện rich result | [Test](https://search.google.com/test/rich-results) |
| GSC — Search Appearance | Báo cáo hiệu suất theo từng loại rich result | [GSC](https://search.google.com/search-console) |

## Tham khảo
- [Google — Search results features gallery](https://developers.google.com/search/docs/appearance/visual-elements-gallery)
- [Google — Featured snippets and your website](https://developers.google.com/search/docs/appearance/featured-snippets)
- [Google Search Central — Changes to FAQ and HowTo rich results (2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Ahrefs — Featured Snippets Study](https://ahrefs.com/blog/featured-snippets-study/)

## Liên kết
[[SERP Anatomy]] · [[Structured Data and Rich Results]] · [[AI Search and Zero Click]] · [[SEO Tactics Half-Life]] · [[Search Intent]] · [[SEO]]
