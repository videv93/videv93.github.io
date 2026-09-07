---
tags: [seo, keywords, strategy]
status: evergreen
---
# Competitor Gap Analysis

> Ba loại gap, ba câu hỏi khác nhau: **content gap** (họ xếp hạng cho gì mà mình không), **keyword gap** (mình có trang nhưng thua), **link gap** (ai link cho họ mà không link cho mình).

## 1. Chọn đối thủ cho đúng

Đối thủ SEO **không** phải đối thủ kinh doanh.

| Loại | Cách tìm | Có nên phân tích? |
|---|---|---|
| **Đối thủ SERP** | Xuất hiện ở top 10 cho cụm truy vấn của bạn | ✅ Ưu tiên cao nhất |
| **Đối thủ kinh doanh** | Bán cùng thứ | Chỉ khi họ cũng là đối thủ SERP |
| **Site tổng hợp / affiliate** | Chiếm SERP thương mại | ✅ Để hiểu SERP, ❌ để bắt chước chiến lược |
| **Wikipedia, Reddit, YouTube** | Chiếm nhiều SERP | ❌ Không sao chép được |

> [!note] Phép chọn đối thủ khách quan
> Lấy 20 truy vấn chủ lực, ghi lại mọi domain trong top 10. Domain xuất hiện nhiều lần nhất là đối thủ SEO thật của bạn — bất kể họ có bán cùng thứ hay không.

## 2. Content gap

**Câu hỏi:** đối thủ xếp hạng cho truy vấn nào mà mình không có trang nào?

Quy trình:
1. Chạy Content Gap (Ahrefs) / Keyword Gap (Semrush) với 3–5 đối thủ.
2. Lọc: bỏ truy vấn brand của họ, bỏ truy vấn không liên quan sản phẩm.
3. Nhóm theo cụm — [[Keyword Research]].
4. Với mỗi cụm, kiểm SERP: mình có cơ hội cấu trúc không? — [[Keyword Difficulty and Volume]].
5. Đưa vào backlog theo giá trị × khả năng thắng.

**Cảnh báo:** danh sách thô luôn rất dài (hàng nghìn dòng) và phần lớn vô giá trị. Giá trị nằm ở bước lọc, không ở bước xuất dữ liệu.

## 3. Keyword gap — mình có trang nhưng thua

Loại gap này **rẻ nhất để sửa** và hay bị bỏ qua nhất.

```
GSC → Performance → lọc position 11–20
   → sắp theo impression giảm dần
```

Đây là danh sách trang "sát ngưỡng": đã được Google chấp nhận, chỉ cần đẩy thêm. Với mỗi trang:

| Chẩn đoán | Sửa |
|---|---|
| Nội dung thiếu so với top 10 | Bổ sung phần thiếu — [[Content Refresh and Pruning]] |
| Sai intent | Đổi định dạng trang — [[Intent Mapping]] |
| Ít link nội bộ | [[Internal Linking]] — rẻ và nhanh nhất |
| Thiếu backlink so với top 10 | [[Link Building Tactics]] |
| Nội dung cũ, truy vấn cần freshness | Cập nhật, đổi ngày thật |

## 4. Link gap

**Câu hỏi:** domain nào link cho ≥2 đối thủ nhưng không link cho bạn?

Đó là danh sách mục tiêu link building có tỷ lệ thành công cao nhất — họ đã chứng minh sẵn sàng link cho loại nội dung này. Xem [[Link Building Tactics]] và [[Digital PR]].

Lọc trước khi liên hệ:
- Bỏ directory, site spam, PBN — [[Toxic Links and Disavow]]
- Bỏ link trả tiền rõ ràng (họ sẽ đòi tiền bạn)
- Ưu tiên link biên tập trong nội dung, không phải footer/sidebar

## 5. Cạm bẫy

- **Sao chép chiến lược đối thủ mà không hỏi vì sao nó hiệu quả.** Đối thủ có thể đang thắng nhờ authority tích luỹ 10 năm, không nhờ chiến thuật bạn thấy.
- **Phân tích quá nhiều đối thủ.** 3–5 là đủ. Hơn nữa chỉ tạo nhiễu.
- **Bỏ qua keyword gap (mục 3).** Nó rẻ hơn content gap nhiều lần vì trang đã tồn tại.
- **Coi mọi gap là cơ hội.** Đối thủ xếp hạng cho truy vấn không có giá trị kinh doanh cũng nhiều.
- **Bắt chước đối thủ đang bị phạt.** Kiểm xem traffic của họ có ổn định không trước khi học họ — nếu họ vừa mất 60% traffic sau core update, đừng sao chép.
- **Phân tích một lần.** SERP đổi; chạy lại mỗi quý.

## 6. Checklist áp dụng

- [ ] Đã chọn đối thủ bằng dữ liệu SERP, không bằng cảm nhận thị trường?
- [ ] Đã kiểm xu hướng traffic của đối thủ (họ đang lên hay đang bị phạt)?
- [ ] Đã chạy phân tích position 11–20 trong GSC **trước** khi tìm nội dung mới?
- [ ] Danh sách content gap đã được lọc bỏ truy vấn brand và không liên quan?
- [ ] Link gap đã được lọc bỏ nguồn spam trước khi liên hệ?
- [ ] Mỗi gap đã được đánh giá cơ hội thắng, không chỉ ghi nhận tồn tại?
- [ ] Có lịch chạy lại mỗi quý không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Ahrefs Content Gap / Link Intersect | Ba loại gap trong một công cụ | [Ahrefs](https://ahrefs.com/) |
| Semrush Keyword Gap / Backlink Gap | Tương đương | [Semrush](https://www.semrush.com/) |
| GSC Performance (position 11–20) | Miễn phí, dữ liệu thật của bạn | [GSC](https://search.google.com/search-console) |
| Similarweb | Ước lượng traffic tổng thể của đối thủ | [Similarweb](https://www.similarweb.com/) |

## Tham khảo
- [Ahrefs — Competitor Analysis for SEO](https://ahrefs.com/blog/seo-competitor-analysis/)
- [Semrush — Keyword Gap Analysis](https://www.semrush.com/analytics/keywordgap/)
- [Moz — Competitive Analysis](https://moz.com/blog/competitive-analysis-seo)
- [Google — Search Console Performance report](https://support.google.com/webmasters/answer/7042828)

## Liên kết
[[Keyword Research]] · [[Keyword Difficulty and Volume]] · [[Link Building Tactics]] · [[Content Refresh and Pruning]] · [[Google Search Console]] · [[SEO]]
