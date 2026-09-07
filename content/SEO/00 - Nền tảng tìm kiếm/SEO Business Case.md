---
tags: [seo, foundations, business]
status: evergreen
---
# SEO Business Case

> Câu hỏi đầu tiên không phải *"làm SEO thế nào"* mà **"SEO có phải kênh đúng cho tình huống này không"**. Với nhiều sản phẩm, câu trả lời trung thực là *không*, và biết điều đó sớm là giá trị lớn nhất của note này.

## 1. Khi nào SEO thắng, khi nào SEO thua

| SEO là kênh tốt khi                                    | SEO là kênh tồi khi                                         |
| ------------------------------------------------------ | ----------------------------------------------------------- |
| Có nhu cầu tìm kiếm **đã tồn tại** cho vấn đề bạn giải | Sản phẩm tạo ra một danh mục chưa ai biết để tìm            |
| Vòng đời khách hàng dài, LTV cao                       | Bán một lần, giá trị nhỏ                                    |
| Chịu được độ trễ 6–12 tháng                            | Cần doanh thu trong quý này                                 |
| Có năng lực sản xuất nội dung liên tục                 | Không ai trong team viết được                               |
| Nội dung không hết hạn quá nhanh                       | Sản phẩm/giá đổi hàng tháng                                 |
| Cạnh tranh phân mảnh                                   | SERP bị 3 gã khổng lồ + Reddit chiếm hết ([[SERP Anatomy]]) |

> [!warning] Cái bẫy chi phí chìm của SEO
> SEO có chi phí trả trước cao và hồi vốn chậm, nên nó **rất dễ bị bảo vệ bằng chi phí chìm**: "đã đầu tư 8 tháng rồi, dừng thì phí". Đặt tiêu chí dừng **trước khi bắt đầu** (mục 4).

## 2. Mô hình hoá giá trị — công thức tối thiểu

```
Traffic kỳ vọng   = Σ (volume_truy_vấn × CTR_vị_trí_kỳ_vọng × xác_suất_đạt_vị_trí)
Giá trị hàng tháng = Traffic × tỷ_lệ_chuyển_đổi × giá_trị_mỗi_chuyển_đổi
Hoàn vốn (tháng)  = Tổng_chi_phí_tới_lúc_đó / Giá_trị_hàng_tháng
```

Ba con số hay bị bịa nhất, và cách lấy trung thực:

1. **`xác_suất_đạt_vị_trí`** — không phải 100%. Ước lượng từ [[Keyword Difficulty and Volume]] và số backlink của top 10. Với chủ đề cạnh tranh cao, 20–40% là thực tế.
2. **`CTR_vị_trí`** — dùng CTR thật của chính site từ [[Google Search Console]], **không** dùng CTR curve ngành. Xem [[Traffic Forecasting]].
3. **`tỷ_lệ_chuyển_đổi`** — organic informational chuyển đổi thấp hơn paid transactional một bậc. Tách theo [[Search Intent]], đừng dùng một con số chung.

## 3. So với các kênh khác

| Kênh | Độ trễ | Chi phí biên khi scale | Rủi ro chính |
|---|---|---|---|
| **SEO** | 6–12 tháng | Giảm dần (nội dung là tài sản) | Một core update xoá 40% traffic sau một đêm |
| **Paid search** | Ngay | Không đổi hoặc tăng | Ngừng trả tiền = ngừng traffic |
| **Social/community** | 1–3 tháng | Không đổi | Thuật toán nền tảng đổi |
| **Outbound** | Ngay | Tăng tuyến tính | Không scale được |

**Điểm mạnh thật của SEO** là chi phí biên giảm dần: một bài xếp hạng tốt tiếp tục sinh traffic mà không tốn thêm. **Điểm yếu thật** là bạn thuê tài sản đó từ Google — xem [[Google Algorithm Updates]] và [[AI Search and Zero Click]].

## 4. Tiêu chí dừng — viết trước khi bắt đầu

Ghi lại 4 con số này vào tài liệu dự án ngay ngày đầu:

- [ ] Sau **3 tháng**: số trang được index và số truy vấn có impression phải đạt ≥ ___
- [ ] Sau **6 tháng**: số truy vấn ở top 20 phải đạt ≥ ___
- [ ] Sau **9 tháng**: traffic organic phải đạt ≥ ___ /tháng
- [ ] Sau **12 tháng**: giá trị quy đổi phải ≥ ___ × chi phí

Không đạt hai mốc liên tiếp ⇒ dừng hoặc đổi chiến lược, **không** "đầu tư thêm cho bõ".

## 5. Cạm bẫy

- **Báo cáo traffic thay vì báo cáo tiền.** Xem [[SEO KPIs and Reporting]]. Traffic tăng 200% ở truy vấn không mua hàng là con số vô nghĩa.
- **Bỏ qua chi phí nội dung.** Chi phí SEO chủ yếu **không** phải công cụ, mà là giờ viết và giờ engineering. Tính đủ.
- **Dự báo bằng volume nhân CTR curve.** Cách nhanh nhất để hứa 10× và giao 1×.
- **Không dự phòng rủi ro thuật toán.** Mô hình tài chính nên có kịch bản "mất 40% traffic trong một tháng".
- **Coi brand search là thành tích SEO.** Traffic brand thường đến từ kênh khác; tách nó ra khi báo cáo.

## 6. Checklist áp dụng

- [ ] Đã kiểm nhu cầu tìm kiếm **có tồn tại** chưa (không phải giả định)?
- [ ] Đã xem SERP thật và xác định mình có cơ hội cấu trúc không?
- [ ] Mô hình dự báo có dùng CTR thật của site không?
- [ ] Đã tách traffic brand khỏi non-brand trong mọi báo cáo?
- [ ] Đã viết tiêu chí dừng với con số cụ thể và ngày cụ thể?
- [ ] Mô hình tài chính có kịch bản mất 40% traffic không?
- [ ] Đã so SEO với kênh rẻ hơn/nhanh hơn trước khi cam kết?

## Tham khảo
- [Ahrefs — How to Calculate SEO ROI](https://ahrefs.com/blog/seo-roi/)
- [Google — Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)
- [Moz — Measuring SEO ROI](https://moz.com/blog/measuring-seo-roi)
- [Sistrix — Zero-click searches study](https://www.sistrix.com/blog/zero-clicks-study/)

## Liên kết
[[SEO KPIs and Reporting]] · [[Traffic Forecasting]] · [[Keyword Research]] · [[SEO Tactics Half-Life]] · [[Business Mindset]] · [[SEO]]
