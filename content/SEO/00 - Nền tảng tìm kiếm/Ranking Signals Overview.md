---
tags: [seo, foundations]
status: evergreen
---
# Ranking Signals Overview

> ⚠️ **Đọc [[Google Guidance vs Observed Behavior]] trước khi dùng note này.** Mọi phát biểu về "ranking factor" đều đến từ một trong ba nguồn có độ tin cậy rất khác nhau, và note này gắn nhãn nguồn cho từng tín hiệu.

> Không tồn tại "danh sách 200 ranking factor". Cái tồn tại là **các hệ thống xếp hạng** (ranking systems) mà Google công bố tên, cộng với các tín hiệu suy ra từ quan sát và từ tài liệu rò rỉ.

## 1. Bậc thang bằng chứng

Trước khi tin bất kỳ "ranking factor" nào, xếp nó vào một trong bốn bậc:

| Bậc | Nguồn | Ví dụ | Mức tin |
|---|---|---|---|
| **A** | Google xác nhận công khai, có tài liệu | HTTPS, mobile-friendly, [[Core Web Vitals for SEO]], nội dung khớp truy vấn | Cao |
| **B** | Google mô tả *hệ thống* nhưng không mô tả cơ chế | Helpful content system, reviews system, link analysis | Trung bình–cao |
| **C** | Tài liệu rò rỉ / hồ sơ toà án | `siteAuthority`, `navBoost` (click), `hostAge` — từ leak 2024 | Trung bình, **không xác nhận** |
| **D** | Tương quan ngành / folklore | "độ dài bài 1.890 từ", "keyword density 2%", "LSI keywords" | Thấp tới sai |

**Quy tắc làm việc:** chỉ đầu tư lớn vào bậc A và B. Dùng C để *giải thích* hiện tượng, không để *dựng chiến lược*. Bỏ qua D.

## 2. Các hệ thống xếp hạng Google công bố

Google duy trì một trang liệt kê chính thức. Những hệ thống đáng nhớ:

| Hệ thống | Làm gì | Note liên quan |
|---|---|---|
| **BERT / MUM** | Hiểu ngôn ngữ tự nhiên của truy vấn và trang | [[Search Intent]] |
| **Helpful content system** | Hạ trang viết cho máy tìm kiếm thay vì cho người | [[Helpful Content and Core Updates]] |
| **Link analysis / PageRank** | Đánh giá liên kết trỏ tới | [[Backlink Fundamentals]] |
| **Reviews system** | Ưu tiên review có trải nghiệm thật | [[E-E-A-T]] |
| **Page experience** | CWV, HTTPS, không interstitial phiền | [[Core Web Vitals for SEO]] |
| **Freshness systems** | Ưu tiên nội dung mới khi truy vấn cần | [[Content Refresh and Pruning]] |
| **Spam detection (SpamBrain)** | Phát hiện nội dung/link spam | [[Google Spam Policies]] |
| **Neural matching** | Khớp khái niệm chứ không khớp chuỗi | [[Topical Authority]] |
| **Deduplication** | Chọn một trang đại diện | [[Canonicalization]] |
| **Local news / Local systems** | Kết quả địa phương | [[Local SEO]] |

## 3. Ba nhóm tín hiệu, xếp theo mức kiểm soát được

| Nhóm | Bạn kiểm soát được | Ví dụ | Đòn bẩy thực tế |
|---|---|---|---|
| **On-page & technical** | Gần như hoàn toàn | Khớp intent, [[Internal Linking]], [[Site Architecture and URL Design]], tốc độ, [[Structured Data and Rich Results]] | Cao — làm trước |
| **Off-page** | Gián tiếp | [[Backlink Fundamentals]], [[Brand Signals and Entity SEO]], nhắc tới thương hiệu | Cao nhưng chậm và đắt |
| **Query/user-level** | Không | Tương tác người dùng (bậc C), địa điểm, lịch sử, thiết bị | Không tối ưu trực tiếp được |

> [!note] Thứ tự công việc suy ra từ bảng này
> Sửa nhóm 1 trước — rẻ, nhanh, chắc chắn có tác dụng. Chỉ đầu tư nhóm 2 khi nhóm 1 đã sạch. Đừng bao giờ mua dịch vụ hứa can thiệp nhóm 3 (CTR bot, click farm) — xem [[Black Hat vs White Hat SEO]].

## 4. Cạm bẫy

- **Coi tương quan là nhân quả.** "Trang top 10 trung bình có 3.400 từ" không có nghĩa viết dài giúp lên top; nó có nghĩa chủ đề cạnh tranh cần bao phủ nhiều.
- **Tin "Domain Authority" là tín hiệu Google.** DA/DR là **chỉ số của Moz/Ahrefs**, tính từ đồ thị link riêng của họ. Google không dùng nó. (Leak 2024 có `siteAuthority` — bậc C, khác bản chất.)
- **Tối ưu cho tín hiệu bậc D.** Keyword density, LSI keyword, "meta keywords" đều đã chết từ lâu.
- **Tưởng có trọng số cố định.** Trọng số tín hiệu **khác nhau theo truy vấn** — YMYL khác truy vấn giải trí, truy vấn tin khác truy vấn định nghĩa.
- **Bỏ qua tín hiệu tiêu cực.** Nhiều lúc vấn đề không phải thiếu tín hiệu tốt mà là có một tín hiệu xấu ([[Penalty Diagnosis and Recovery]]).

## 5. Checklist áp dụng

- [ ] Với mỗi "ranking factor" bạn định hành động — đã gán bậc A/B/C/D chưa?
- [ ] Có nguồn Google chính thức cho việc bạn sắp đầu tư nhiều tháng vào không?
- [ ] Nhóm 1 (on-page/technical) đã sạch trước khi động vào nhóm 2 chưa?
- [ ] Bạn có đang dùng DA/DR như thể nó là tín hiệu của Google không?
- [ ] Có kiểm tra tín hiệu tiêu cực (spam, trùng lặp, thin content) trước khi thêm tín hiệu tích cực?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google ranking systems guide | Danh sách chính thức, cập nhật | [Google](https://developers.google.com/search/docs/appearance/ranking-systems-guide) |
| Search Quality Rater Guidelines | Google *muốn* xếp hạng cái gì | [PDF](https://services.google.com/fh/files/misc/hsw-sqrg.pdf) |
| Ahrefs/Semrush correlation studies | Bậc D — đọc để biết, không để làm | [Ahrefs](https://ahrefs.com/blog/) |

## Tham khảo
- [Google — A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
- [Google — Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google Search Quality Rater Guidelines](https://services.google.com/fh/files/misc/hsw-sqrg.pdf)
- [SparkToro — Leaked Google Search API documents (2024)](https://sparktoro.com/blog/an-anonymous-source-shared-thousands-of-leaked-google-search-api-documents-with-me-everyone-in-seo-should-see-them/)

## Liên kết
[[Google Guidance vs Observed Behavior]] · [[How Search Engines Work]] · [[Google Algorithm Updates]] · [[Backlink Fundamentals]] · [[E-E-A-T]] · [[SEO]]
