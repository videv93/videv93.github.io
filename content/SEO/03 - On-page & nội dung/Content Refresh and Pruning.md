---
tags: [seo, content, maintenance]
status: evergreen
---
# Content Refresh and Pruning

> Nội dung có **chu kỳ bán rã**. Với site đã có vài trăm bài, cập nhật và cắt tỉa nội dung cũ thường cho ROI cao hơn viết bài mới — và gần như luôn bị ưu tiên thấp hơn.

## 1. Content decay — nhận diện

**Content decay** = traffic của một trang giảm dần theo thời gian dù không có sự cố gì.

Nguyên nhân:

| Nguyên nhân | Dấu hiệu | Xử lý |
|---|---|---|
| Nội dung lỗi thời | Nhắc phiên bản/giá/công cụ đã cũ | Cập nhật nội dung |
| Đối thủ viết tốt hơn | Thứ hạng tụt đều, SERP có bài mới | Mở rộng, thêm information gain |
| Intent đổi | SERP đổi định dạng — [[Search Intent]] | Đổi loại trang |
| Truy vấn cần freshness | Top 10 toàn bài tháng này | Cập nhật định kỳ, ngày thật |
| Cannibalization | Bài mới cướp truy vấn — [[Intent Mapping]] | Gộp hoặc phân định lại |
| Mất backlink | Referring domain giảm | [[Link Building Tactics]] |
| SERP feature chiếm chỗ | Impression giữ nguyên, click giảm | [[AI Search and Zero Click]] |

> [!note] Phân biệt hai triệu chứng trong GSC
> **Impression giảm** ⇒ vấn đề thứ hạng/nội dung. **Impression giữ, click giảm** ⇒ vấn đề SERP (AI Overview, feature mới) hoặc snippet. Hai chẩn đoán khác nhau hoàn toàn.

## 2. Quy trình audit nội dung

Với mỗi URL, gom 5 số liệu:

1. Click + impression 3 tháng gần nhất (GSC)
2. Click + impression cùng kỳ năm trước
3. Số truy vấn có vị trí ≤20
4. Số referring domain ([[Backlink Fundamentals]])
5. Chuyển đổi / giá trị kinh doanh

Rồi phân loại:

| Nhóm | Điều kiện | Hành động |
|---|---|---|
| **Đang tốt** | Traffic ổn/tăng | Không động vào |
| **Đang mục** | Traffic giảm >30% so cùng kỳ, vẫn có tiềm năng | **Refresh** — ưu tiên cao nhất |
| **Sát ngưỡng** | Vị trí 11–20, impression cao | Mở rộng + [[Internal Linking]] |
| **Trùng lặp** | Cùng intent với trang khác | Gộp, `301` về trang mạnh |
| **Chết nhưng có link** | 0 traffic, có backlink | `301` về trang liên quan |
| **Chết hoàn toàn** | 0 traffic, 0 link, 0 giá trị | `noindex` hoặc `410` |

## 3. Refresh — làm gì cụ thể

Refresh **không phải** đổi ngày và thêm một đoạn. Thứ tự việc:

1. **Đọc lại SERP hiện tại** — intent còn như cũ không?
2. **So dàn ý của bạn với top 10 hiện tại** — thiếu khía cạnh nào? ([[Heading Structure and Content Outline]])
3. **Sửa mọi thông tin lỗi thời** — số liệu, phiên bản, giá, ảnh chụp màn hình.
4. **Kiểm link ra ngoài** — link chết làm giảm Trust.
5. **Thêm information gain mới** — [[SEO Content Writing]].
6. **Cập nhật [[Internal Linking]]** — link từ bài mới về bài này.
7. **Đổi ngày cập nhật — chỉ khi thay đổi thật sự đáng kể.**
8. **Ghi lại ngày refresh** để đo tác động sau 4–8 tuần.

## 4. Pruning — cắt tỉa

Cắt nội dung giá trị thấp giúp:
- Giảm [[Indexing and Index Bloat]]
- Tập trung [[Crawling and Crawl Budget]]
- Nâng chất lượng trung bình của site — quan trọng với [[Helpful Content and Core Updates]]

> [!warning] Kiểm backlink **trước** khi xoá
> Trang 0 traffic vẫn có thể mang link equity đáng kể. Quy tắc: có backlink chất lượng ⇒ `301` về trang liên quan, không bao giờ `410`.

Thứ tự an toàn: `noindex` trước → theo dõi 4–8 tuần → nếu không có tác động tiêu cực thì mới `410`/xoá.

## 5. Cạm bẫy

- **Đổi ngày mà không đổi nội dung.** Vi phạm Trust ([[E-E-A-T]]), và Google so được nội dung giữa các lần crawl.
- **Refresh trang đang tốt.** Rủi ro làm hỏng thứ hạng đang có. Chỉ động vào trang đang mục.
- **Xoá hàng loạt sau một bài blog về "content pruning".** Xoá không hồi lại được. Làm từng đợt nhỏ và đo.
- **Gộp trang khác intent.** Tạo một trang không phục vụ ai.
- **Không đo tác động.** Ghi ngày mọi thay đổi; không có ngày thì không học được gì.
- **Bỏ qua trang không phải blog.** Trang sản phẩm, danh mục cũng mục.
- **Chỉ nhìn traffic.** Trang traffic thấp nhưng chuyển đổi cao là trang quan trọng nhất site.

## 6. Checklist áp dụng

- [ ] Đã so traffic với **cùng kỳ năm trước**, không chỉ tháng trước?
- [ ] Đã phân biệt "impression giảm" với "click giảm" chưa?
- [ ] Danh sách refresh đã xếp theo tiềm năng, không theo mức giảm?
- [ ] Trước khi xoá — đã kiểm backlink chưa?
- [ ] Có dùng `noindex` trước rồi mới `410` không?
- [ ] Ngày cập nhật có phản ánh thay đổi thật không?
- [ ] Có ghi ngày mọi thay đổi để đo sau 4–8 tuần không?
- [ ] Có lịch audit định kỳ (2 lần/năm) không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC Performance (so sánh cùng kỳ) | Phát hiện decay chính xác nhất | [GSC](https://search.google.com/search-console) |
| Screaming Frog + GSC/GA4 API | Ghép crawl với traffic để audit hàng loạt | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Ahrefs — Top pages (traffic theo thời gian) | Thấy đường cong decay | [Ahrefs](https://ahrefs.com/) |
| Wayback Machine | So nội dung trang trước/sau | [Archive](https://web.archive.org/) |

## Tham khảo
- [Google — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Ahrefs — Content Decay: What It Is and How to Fix It](https://ahrefs.com/blog/content-decay/)
- [Google — Remove a page hosted on your site from Google](https://developers.google.com/search/docs/crawling-indexing/remove-information)
- [Moz — Content Audit](https://moz.com/blog/content-audit)

## Liên kết
[[Indexing and Index Bloat]] · [[SEO Content Writing]] · [[Intent Mapping]] · [[HTTP Status Codes for SEO]] · [[Helpful Content and Core Updates]] · [[SEO]]
