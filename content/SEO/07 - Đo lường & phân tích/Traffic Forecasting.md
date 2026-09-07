---
tags: [seo, analytics, business]
status: growing
---
# Traffic Forecasting

> Dự báo SEO gần như luôn sai theo hướng **lạc quan quá mức**, vì công thức phổ biến nhất (`volume × CTR curve`) bỏ qua ba thứ: xác suất đạt vị trí, zero-click, và độ trễ.

## 1. Công thức sai và công thức đúng

**Công thức sai** (dùng khắp nơi):
```
Traffic = search volume × CTR ở vị trí mục tiêu
```
Nó giả định bạn **chắc chắn** đạt vị trí đó, **ngay lập tức**, và CTR ngành áp dụng được cho SERP của bạn.

**Công thức làm việc được:**
```
Traffic_kỳ_vọng = Σ [ volume × CTR_thật_của_bạn × P(đạt_vị_trí) × (1 − tỷ_lệ_zero_click) ]
                  × hệ_số_độ_trễ(tháng)
```

| Thành phần | Lấy ở đâu |
|---|---|
| `volume` | Công cụ keyword — biết sai số của nó, [[Keyword Difficulty and Volume]] |
| `CTR_thật_của_bạn` | GSC: CTR trung bình của **chính site bạn** ở vị trí đó cho cụm tương tự |
| `P(đạt_vị_trí)` | Ước lượng từ khoảng cách authority với top 10 |
| `tỷ_lệ_zero_click` | Kiểm SERP: có AI Overview / featured snippet không |
| `hệ_số_độ_trễ` | 0 trong 3 tháng đầu, tăng dần tới 1 ở tháng 9–12 |

## 2. Lấy CTR thật của bạn

Đây là bước cải thiện độ chính xác nhiều nhất và ít người làm:

```
GSC → Performance → lọc theo nhóm truy vấn tương tự (ví dụ path /blog/)
   → xuất dữ liệu → nhóm theo position (làm tròn) → tính CTR trung bình mỗi vị trí
```

Kết quả là **đường CTR của riêng site bạn**, phản ánh đúng ngành, loại SERP, và độ mạnh của brand bạn. Nó thường khác đáng kể CTR curve ngành.

## 3. Ước lượng xác suất đạt vị trí

Không có công thức chính xác. Cách ước lượng trung thực:

| Tình huống | P(top 10) trong 12 tháng |
|---|---|
| Đã ở vị trí 11–20, nội dung ngang top 10 | 60–80% |
| Đã có trang, nội dung yếu hơn, authority ngang | 30–50% |
| Trang mới, authority ngang top 10 | 20–40% |
| Trang mới, authority thấp hơn hẳn | 5–15% |
| SERP bị brand khổng lồ / Reddit thống trị | <10% |

**Ghi rõ ước lượng này trong dự báo.** Việc buộc phải viết ra một con số khiến người dự báo trung thực hơn.

## 4. Kịch bản, không phải một con số

Luôn đưa ba kịch bản:

| Kịch bản | Giả định |
|---|---|
| **Thận trọng** | P thấp, độ trễ dài, zero-click cao |
| **Cơ sở** | Ước lượng trung tâm |
| **Lạc quan** | P cao, không có sự cố thuật toán |

Và một dòng rủi ro: *"kịch bản mất 40% traffic sau một core update"* — [[Google Algorithm Updates]].

Một con số duy nhất tạo ảo giác chính xác và luôn bị nhớ như một lời hứa.

## 5. Độ trễ — thường bị bỏ qua hoàn toàn

| Thời điểm | Tỷ lệ traffic kỳ vọng đạt được |
|---|---|
| Tháng 1–2 | ~0% — index và crawl |
| Tháng 3–4 | 10–20% |
| Tháng 5–6 | 30–50% |
| Tháng 7–9 | 60–80% |
| Tháng 10–12 | 80–100% |

Bảng này là ước lượng thô cho site có authority trung bình. Site mạnh nhanh hơn; domain mới chậm hơn nhiều.

## 6. Cạm bẫy

- **`volume × CTR curve`.** Xem mục 1.
- **Không tính zero-click.** Trên SERP có AI Overview, tỷ lệ mất click có thể rất lớn — [[AI Search and Zero Click]].
- **Bỏ qua độ trễ.** Hứa kết quả quý này cho việc làm quý này.
- **Dùng volume công cụ cho tiếng Việt.** Cơ sở dữ liệu thưa; đối chiếu với GSC.
- **Dự báo cho từng keyword thay vì cả cụm.** Một trang xếp hạng cho hàng trăm truy vấn — dự báo theo keyword đơn lẻ đánh giá thấp.
- **Không cập nhật dự báo.** Sau 3 tháng có dữ liệu thật, dự báo phải được hiệu chỉnh.
- **Không ghi lại giả định.** Khi sai, không biết sai ở đâu để học.

## 7. Checklist áp dụng

- [ ] Đã tính CTR thật của site từ GSC, không dùng CTR curve ngành?
- [ ] Đã ghi rõ `P(đạt_vị_trí)` cho từng cụm?
- [ ] Đã kiểm SERP xem có AI Overview / featured snippet không?
- [ ] Có hệ số độ trễ theo tháng không?
- [ ] Có ba kịch bản, không phải một con số?
- [ ] Có kịch bản rủi ro thuật toán không?
- [ ] Mọi giả định có được ghi lại thành văn bản không?
- [ ] Có lịch hiệu chỉnh dự báo sau 3 tháng không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC + Sheets | Tính đường CTR riêng của site — bước quan trọng nhất | [GSC](https://search.google.com/search-console) |
| Ahrefs Traffic Potential | Ước lượng traffic cả cụm, không phải một keyword | [Ahrefs](https://ahrefs.com/keywords-explorer) |
| Google Trends | Điều chỉnh theo mùa vụ | [Trends](https://trends.google.com/) |
| Advanced Web Ranking CTR study | Đối chiếu tham khảo (không dùng thay CTR riêng) | [AWR](https://www.advancedwebranking.com/ctrstudy/) |

## Tham khảo
- [Google — Performance report in Search Console](https://support.google.com/webmasters/answer/7042828)
- [Ahrefs — How to Forecast SEO Traffic](https://ahrefs.com/blog/seo-forecasting/)
- [Sistrix — Zero-click searches study](https://www.sistrix.com/blog/zero-clicks-study/)
- [Advanced Web Ranking — Google Organic CTR Study](https://www.advancedwebranking.com/ctrstudy/)

## Liên kết
[[SEO Business Case]] · [[Keyword Difficulty and Volume]] · [[Google Search Console]] · [[AI Search and Zero Click]] · [[SEO KPIs and Reporting]] · [[SEO]]
