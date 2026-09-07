---
tags: [seo, ai, strategy]
status: seed
---
# AI Search and Zero Click

> ⚠️ **Đọc [[SEO Tactics Half-Life]] trước.** Đây là chủ đề đang thay đổi nhanh nhất trong note này; bối cảnh chụp **2026-09**.

> Đây không phải một thay đổi thuật toán. Đây là thay đổi **mô hình traffic**: Google chuyển từ *"gửi người dùng tới trang web"* sang *"trả lời tại chỗ"*. Không có chiến thuật SEO nào đảo ngược được điều này.

## 1. Zero-click có trước AI

Xu hướng này bắt đầu từ lâu trước AI Overview:

| Thời kỳ | Cái lấy đi click |
|---|---|
| ~2014 | Knowledge Panel, answer box |
| ~2016 | Featured snippet |
| ~2018 | People Also Ask mở rộng |
| ~2020 | Ads chiếm nhiều màn hình đầu hơn |
| ~2024 | **AI Overviews** |

Nghiên cứu ngành (Sistrix, SparkToro) đã ghi nhận tỷ lệ tìm kiếm kết thúc không click ở mức rất cao **từ trước** AI Overview. AI Overview đẩy xu hướng đã có đi xa hơn, không tạo ra nó.

## 2. AI Overview ảnh hưởng thế nào

| Quan sát | Hệ quả |
|---|---|
| Chiếm phần lớn màn hình đầu | Organic #1 có thể nằm dưới fold |
| Xuất hiện nhiều nhất với truy vấn **informational** | Nội dung "là gì / cách làm" bị ảnh hưởng nặng nhất |
| Ít xuất hiện với truy vấn **transactional/navigational** | Trang sản phẩm, trang brand ít bị ảnh hưởng hơn |
| Có trích nguồn và link | Được trích dẫn vẫn có giá trị hiển thị |
| Nội dung được trích thường từ trang **đang xếp hạng tốt** | SEO truyền thống vẫn là điều kiện cần |

> [!note] Hàm ý chiến lược quan trọng nhất
> **Giá trị dịch chuyển từ truy vấn đầu phễu sang truy vấn cuối phễu.** Bài "X là gì" mất giá trị nhanh nhất; trang so sánh, trang giá, trang sản phẩm, và nội dung cần chuyên môn sâu giữ giá trị tốt hơn. Điều chỉnh [[Intent Mapping]] và [[Keyword Research]] theo hướng này.

## 3. Đo tác động trên site của bạn

Google **không** tách riêng traffic từ AI Overview trong GSC. Cách đo gián tiếp:

```
GSC → Performance → so hai kỳ
   → tìm truy vấn có: impression giữ nguyên/tăng, nhưng CLICK giảm mạnh
   → đó là dấu hiệu SERP đã đổi bố cục
```

Rồi mở SERP thật cho các truy vấn đó và xác nhận có AI Overview không.

**Phân biệt với vấn đề chất lượng:** nếu impression **cũng** giảm, đó là vấn đề xếp hạng, không phải zero-click — [[Penalty Diagnosis and Recovery]].

## 4. Chiến lược thích ứng

| Hướng | Cụ thể |
|---|---|
| **Dịch chuyển xuống phễu** | Ưu tiên truy vấn commercial/transactional — [[Intent Mapping]] |
| **Nội dung AI không tổng hợp được** | Dữ liệu gốc, trải nghiệm thật, công cụ, cộng đồng — [[E-E-A-T]] |
| **Xây kênh không phụ thuộc Google** | Newsletter, cộng đồng, YouTube, app |
| **Tối ưu để được trích dẫn** | [[Generative Engine Optimization]] |
| **Tăng giá trị mỗi lượt truy cập** | Ít traffic hơn ⇒ tỷ lệ chuyển đổi phải cao hơn |
| **Đầu tư brand** | Truy vấn brand ít bị AI Overview chiếm — [[Brand Signals and Entity SEO]] |
| **Điều chỉnh dự báo** | [[Traffic Forecasting]] phải trừ zero-click |

## 5. Cạm bẫy

- **Phủ nhận thay đổi.** "SEO vẫn như cũ" không phải chiến lược.
- **Hoảng loạn bỏ SEO.** Search vẫn là kênh lớn; nó chỉ đổi hình dạng. Và nội dung được AI trích dẫn vẫn phải xếp hạng tốt trước.
- **Chặn AI crawler theo phản xạ.** Đó là quyết định đánh đổi (bảo vệ nội dung vs hiển thị), cần cân nhắc — [[Robots Exclusion]].
- **Đo bằng thứ hạng.** Thứ hạng ngày càng ít liên quan tới traffic — [[Rank Tracking]].
- **Không điều chỉnh dự báo và mục tiêu.** Đặt mục tiêu traffic theo mô hình cũ là tự tạo thất bại.
- **Tin các con số tuyệt đối về "AI Overview giảm X% click".** Nghiên cứu ngành cho kết quả rất khác nhau tuỳ phương pháp và tập truy vấn. Đo trên chính site bạn.

## 6. Phép kiểm tự chạy được

- [ ] Với 20 truy vấn quan trọng nhất — bao nhiêu % có AI Overview? (Kiểm thủ công, ẩn danh)
- [ ] Trong 12 tháng qua, có truy vấn nào **impression giữ mà click giảm >30%** không?
- [ ] Tỷ lệ traffic của bạn đến từ truy vấn informational là bao nhiêu? (Đó là phần rủi ro nhất)
- [ ] Bao nhiêu % doanh thu phụ thuộc vào organic Google? (Đó là mức tập trung rủi ro)
- [ ] Bạn có kênh nào không phụ thuộc Google không?
- [ ] Nếu traffic organic giảm 50% trong 12 tháng, doanh nghiệp có sao không?
- [ ] Nội dung của bạn có thứ gì AI **không** tổng hợp lại được không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC (so impression vs click) | Cách đo gián tiếp tốt nhất | [GSC](https://search.google.com/search-console) |
| SERP thủ công, ẩn danh | Xác nhận AI Overview có xuất hiện không | — |
| Ahrefs / Semrush (theo dõi AI Overview) | Theo dõi truy vấn nào có AIO | [Ahrefs](https://ahrefs.com/) |
| Sistrix zero-click study | Dữ liệu nền về xu hướng | [Sistrix](https://www.sistrix.com/blog/zero-clicks-study/) |

## Tham khảo
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search Central Blog — AI Overviews and web traffic](https://developers.google.com/search/blog)
- [Sistrix — Why almost 30% of Google searches end without a click](https://www.sistrix.com/blog/zero-clicks-study/)
- [SparkToro — Zero-click searches research](https://sparktoro.com/blog/)

## Liên kết
[[Generative Engine Optimization]] · [[SERP Anatomy]] · [[Traffic Forecasting]] · [[Intent Mapping]] · [[SEO Tactics Half-Life]] · [[SEO]]
