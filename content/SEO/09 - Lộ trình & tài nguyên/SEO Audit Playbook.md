---
tags: [seo, audit, process]
status: evergreen
---
# SEO Audit Playbook

> Quy trình audit đầy đủ, dùng lại được, xếp theo **thứ tự chẩn đoán** — không theo thứ tự chủ đề. Nguyên tắc: mỗi bước chỉ chạy khi bước trước đã sạch, vì lỗi ở tầng dưới làm mọi phân tích ở tầng trên vô nghĩa.

## Bước 0 — Chuẩn bị (30 phút)

- [ ] Truy cập [[Google Search Console]] (mọi property), [[GA4 for SEO]], log server/CDN
- [ ] **Kiểm GSC → Manual Actions và Security Issues ngay** — nếu có, dừng audit và xử lý theo [[Penalty Diagnosis and Recovery]]
- [ ] Ghi baseline: traffic organic 12 tháng, số trang index, top 100 truy vấn
- [ ] Lấy danh sách thay đổi lớn 12 tháng qua (deploy, migration, redesign)
- [ ] Đánh dấu ngày core update trên biểu đồ — [[Google Algorithm Updates]]

---

## Bước 1 — Chặn hoàn toàn (1 giờ) 🔴

Những thứ có thể xoá sổ traffic ngay. Kiểm trước mọi thứ khác.

- [ ] `robots.txt` — có `Disallow: /` hoặc chặn nhầm không? — [[Robots Exclusion]]
- [ ] `noindex` sót trên trang quan trọng (kiểm cả `<meta>` và `X-Robots-Tag`)
- [ ] Lỗi 5xx trong GSC Crawl Stats
- [ ] Redirect loop
- [ ] Staging/dev bị index (`site:staging.example.com`)
- [ ] Site có bị hack không (GSC Security Issues, kiểm `site:` tìm trang lạ)
- [ ] CSS/JS bị chặn
- [ ] WAF/CDN chặn Googlebot (kiểm GSC live test)

---

## Bước 2 — Crawl & index (2 giờ) 🔴

- [ ] Chạy [[Crawl Auditing]] — user-agent Googlebot smartphone, hai lần (JS bật/tắt)
- [ ] GSC Page Indexing: phân loại từng trạng thái — [[Indexing and Index Bloat]]
- [ ] Tỷ lệ Indexed/Submitted theo từng sitemap — [[XML Sitemaps]]
- [ ] Có "Crawled – currently not indexed" tăng đều không?
- [ ] Index bloat: tìm kiếm nội bộ, tag/archive, URL tham số có bị index không?
- [ ] Trang mồ côi (so sitemap với crawl)
- [ ] Crawl depth >4 cho trang quan trọng
- [ ] [[Log File Analysis]] nếu có quyền truy cập

---

## Bước 3 — Tín hiệu kỹ thuật (2 giờ) 🟠

- [ ] Canonical: self-canonical, không mâu thuẫn, GSC "Google-selected canonical" khớp — [[Canonicalization]]
- [ ] Redirect: 1 hop, `301`, không redirect về trang chủ — [[HTTP Status Codes for SEO]]
- [ ] Soft 404
- [ ] Nội dung chính có trong HTML thô không — [[JavaScript Rendering and SEO]]
- [ ] Parity mobile vs desktop — [[Mobile and Responsive SEO]]
- [ ] Core Web Vitals **field data** theo nhóm URL — [[Core Web Vitals for SEO]]
- [ ] Structured data: GSC Enhancements có lỗi không, loại schema còn được hỗ trợ không — [[Structured Data and Rich Results]]
- [ ] hreflang nếu đa ngôn ngữ — [[International SEO and hreflang]]
- [ ] Facet/pagination nếu ecommerce — [[Pagination and Faceted Navigation]]

---

## Bước 4 — Nội dung & intent (4 giờ) 🟠

- [ ] Cannibalization: lọc GSC Query → Pages cho 20 truy vấn chủ lực — [[Intent Mapping]]
- [ ] Content decay: so 3 tháng gần nhất với cùng kỳ năm trước — [[Content Refresh and Pruning]]
- [ ] Cơ hội gần: position 11–20 sắp theo impression — [[Competitor Gap Analysis]]
- [ ] CTR bất thường: position ≤5 nhưng CTR thấp — [[Title Tags and Meta Descriptions]]
- [ ] Impression giữ mà click giảm ⇒ vấn đề SERP — [[AI Search and Zero Click]]
- [ ] Bộ câu hỏi helpful content cho **20 URL ngẫu nhiên** — [[Helpful Content and Core Updates]]
- [ ] Title/H1 trùng lặp hàng loạt
- [ ] Tín hiệu tác giả và E-E-A-T — [[E-E-A-T]]

---

## Bước 5 — Kiến trúc & internal link (2 giờ) 🟡

- [ ] Trang quan trọng có ≤3 click từ trang chủ không — [[Site Architecture and URL Design]]
- [ ] Trang cần đẩy có đủ inlink không — [[Internal Linking]]
- [ ] Trang mạnh nhất (nhiều backlink) đang link tới đâu?
- [ ] Link nội bộ tới 404/redirect
- [ ] Anchor text nội bộ có mô tả không — [[Anchor Text]]

---

## Bước 6 — Off-page (1 giờ) 🟡

- [ ] Referring domain: xu hướng 12 tháng, mới vs mất — [[Backlink Fundamentals]]
- [ ] URL 404 có backlink (redirect chúng)
- [ ] Phân bố anchor có tự nhiên không
- [ ] So hồ sơ link với top 10 cho truy vấn mục tiêu
- [ ] Có link nhân tạo do mình/agency tạo không — [[Toxic Links and Disavow]]

---

## Bước 7 — Kinh doanh & báo cáo (1 giờ)

- [ ] Traffic có chuyển thành chuyển đổi không — [[SEO KPIs and Reporting]]
- [ ] Brand vs non-brand đã tách chưa
- [ ] Chi phí mỗi lead organic so với kênh khác — [[SEO Business Case]]
- [ ] Mức tập trung rủi ro: bao nhiêu % doanh thu phụ thuộc organic Google?

---

## Đầu ra của audit

Không phải danh sách 300 lỗi. Đầu ra đúng là:

```
1. Ba vấn đề nghiêm trọng nhất — kèm tác động ước lượng và công sức
2. Danh sách việc xếp theo (tác động ÷ công sức), không theo chủ đề
3. Việc KHÔNG nên làm — và vì sao (quan trọng ngang phần trên)
4. Baseline để đo lại sau 8 tuần
5. Ngày audit lại
```

> [!note] Mục 3 là mục phân biệt audit tốt với audit tự động
> Công cụ liệt kê mọi thứ; người làm audit giỏi nói rõ **cái gì không đáng làm**. "Meta description thiếu ở 400 trang đuôi dài — bỏ qua, để Google tự trích" tiết kiệm nhiều tuần công.

## Checklist áp dụng

- [ ] Đã kiểm Manual Actions **trước** khi bắt đầu chưa?
- [ ] Có chạy các bước theo đúng thứ tự không (không nhảy sang bước 4 khi bước 1 chưa sạch)?
- [ ] Mỗi phát hiện có gắn tác động ước lượng không?
- [ ] Đầu ra có mục "việc không nên làm" không?
- [ ] Có baseline được lưu để đo lại không?
- [ ] Đã đặt ngày audit lại chưa?
- [ ] Đã ghi lại ngày audit và trạng thái để so sánh lần sau chưa?

## Tham khảo
- [Google — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google — Search Console Help](https://support.google.com/webmasters)
- [Google — Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies)
- [Screaming Frog — SEO Audit Guide](https://www.screamingfrog.co.uk/seo-spider/user-guide/)

## Liên kết
[[Crawl Auditing]] · [[Penalty Diagnosis and Recovery]] · [[Google Search Console]] · [[SEO KPIs and Reporting]] · [[SEO Learning Path]] · [[SEO]]
