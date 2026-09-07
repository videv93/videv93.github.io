---
tags: [seo, keywords, strategy]
status: evergreen
---
# Intent Mapping

> Cầu nối giữa danh sách từ khoá và kế hoạch nội dung: mỗi **cụm truy vấn** phải được ánh xạ tới **đúng một loại trang**, và mỗi trang phải có **đúng một chủ nhân** trong cụm.

## 1. Ma trận ánh xạ

| Intent | Giai đoạn phễu | Loại trang | Ví dụ URL |
|---|---|---|---|
| Informational — "là gì" | Nhận biết | Bài giải thích / glossary | `/blog/core-web-vitals-la-gi/` |
| Informational — "cách làm" | Nhận biết | Hướng dẫn từng bước | `/blog/cach-toi-uu-lcp/` |
| Commercial — "tốt nhất" | Cân nhắc | Listicle có tiêu chí rõ | `/blog/cong-cu-seo-tot-nhat/` |
| Commercial — "A vs B" | Cân nhắc | Bài so sánh | `/so-sanh/ahrefs-vs-semrush/` |
| Commercial — "review X" | Cân nhắc | Review có trải nghiệm thật — [[E-E-A-T]] | `/review/ahrefs/` |
| Transactional — "giá" | Quyết định | Trang giá | `/pricing/` |
| Transactional — "mua X" | Quyết định | Trang sản phẩm / danh mục | `/san-pham/x/` |
| Local | Quyết định | Trang địa điểm — [[Local SEO]] | `/chi-nhanh/ha-noi/` |
| Navigational — brand | — | Trang chủ / trang tính năng | `/` |

## 2. Quy tắc "một cụm, một trang"

Đây là quy tắc quan trọng nhất của intent mapping, và vi phạm nó gây ra **keyword cannibalization**.

**Triệu chứng cannibalization:**
- Trong GSC, nhiều URL luân phiên xếp hạng cho cùng truy vấn
- Thứ hạng dao động mạnh không rõ lý do
- Trang mới xuất bản làm tụt trang cũ

**Phép kiểm bằng GSC:**
```
GSC → Performance → lọc theo Query = "<truy vấn>" → tab Pages
Nếu có ≥2 URL với impression đáng kể ⇒ nghi cannibalization
```

**Cách xử lý:**

| Tình huống | Xử lý |
|---|---|
| Hai trang cùng intent, một mạnh hơn hẳn | `301` trang yếu về trang mạnh, gộp nội dung |
| Hai trang cùng intent, ngang nhau | Gộp thành một trang đầy đủ hơn |
| Hai trang **khác** intent nhưng chồng từ khoá | Giữ cả hai, làm rõ khác biệt trong title/H1, chỉnh [[Internal Linking]] |
| Trang cũ chỉ còn giá trị lịch sử | `noindex` hoặc `410` — [[Indexing and Index Bloat]] |

## 3. Ánh xạ ngược: kiểm trang hiện có

Với site đã tồn tại, làm ngược lại cũng quan trọng:

1. Xuất mọi URL có impression từ GSC.
2. Với mỗi URL, lấy truy vấn top theo impression.
3. Gán intent cho truy vấn đó.
4. **So với intent trang được thiết kế để phục vụ.**

Lệch pha thường gặp:
- Trang bán hàng nhận toàn truy vấn informational ⇒ traffic không chuyển đổi, và trang khó lên top cho truy vấn transactional.
- Bài blog nhận truy vấn transactional ⇒ mất doanh thu, nên thêm CTA hoặc tạo trang bán hàng riêng.

## 4. Cạm bẫy

- **Ánh xạ theo từ khoá đơn thay vì theo cụm.** Xem [[Keyword Research]] mục 1.
- **Tạo trang mới khi trang cũ đã đủ.** Mỗi trang mới cạnh tranh với trang cũ và chia nhỏ [[Internal Linking]].
- **Giả định intent từ ngữ pháp truy vấn.** *"giá ahrefs"* trông transactional nhưng SERP có thể toàn bài so sánh. **Đọc SERP** — [[Search Intent]].
- **Không ánh xạ lại sau core update.** Google đổi cách hiểu intent; kiểm lại các cụm chủ lực — [[Helpful Content and Core Updates]].
- **Bỏ qua trang danh mục.** Với ecommerce, trang category thường phục vụ intent commercial tốt hơn bài blog. Xem [[Ecommerce SEO]].
- **Coi cannibalization là chuyện nhỏ.** Với site nhiều nội dung, nó là nguyên nhân số một khiến traffic dừng tăng.

## 5. Checklist áp dụng

- [ ] Mỗi cụm trong backlog có đúng một URL chủ nhân chưa?
- [ ] Mỗi URL có đúng một cụm chính chưa?
- [ ] Đã chạy phép kiểm cannibalization trong GSC cho các truy vấn chủ lực?
- [ ] Loại trang được chọn có khớp với ≥7/10 kết quả top của cụm không?
- [ ] Đã ánh xạ ngược: trang hiện có đang nhận intent gì so với thiết kế?
- [ ] Có trang nào nhận truy vấn transactional mà không có CTA không?
- [ ] Có bảng ánh xạ được lưu lại và cập nhật (không nằm trong đầu ai đó) không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC Performance (lọc Query → Pages) | Phát hiện cannibalization chính xác nhất | [GSC](https://search.google.com/search-console) |
| Google Sheets / Airtable | Bảng ánh xạ cụm → URL → trạng thái | — |
| Keyword Insights / Ahrefs clustering | Nhóm theo SERP overlap tự động | [Keyword Insights](https://keywordinsights.ai/) |

## Tham khảo
- [Ahrefs — Keyword Cannibalization: What It Is and How to Fix It](https://ahrefs.com/blog/keyword-cannibalization/)
- [Moz — Search Intent and Content Mapping](https://moz.com/learn/seo/search-intent)
- [Google — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Semrush — How to Map Keywords to Content](https://www.semrush.com/blog/keyword-mapping/)

## Liên kết
[[Search Intent]] · [[Keyword Research]] · [[Topic Clusters]] · [[Internal Linking]] · [[Content Refresh and Pruning]] · [[SEO]]
