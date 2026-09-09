---
tags: [marketing, đo-lường]
status: evergreen
---
# Unit Economics CAC LTV Payback

> Đây là chỗ marketing gặp tài chính, và là chỗ phần lớn tranh cãi về ngân sách thực sự được giải quyết. Ba con số: **chi bao nhiêu để có một khách, khách đó đáng bao nhiêu, và bao lâu thì hoàn vốn.**

## 1. Ba con số

| Chỉ số | Công thức | Bẫy phổ biến |
|---|---|---|
| **CAC** | Tổng chi phí thu hút ÷ số khách mới | ⚠️ Quên lương, công cụ, chiết khấu, hoa hồng |
| **LTV** | Biên lợi nhuận gộp mỗi kỳ × thời gian sống | ⚠️ Dùng **doanh thu** thay vì **biên lợi nhuận gộp** |
| **Payback** | CAC ÷ biên lợi nhuận gộp mỗi tháng | Chỉ số quan trọng nhất và ít được dùng nhất |

> [!warning] LTV tính bằng doanh thu là con số vô nghĩa
> LTV phải dùng **biên lợi nhuận gộp**, sau chi phí phục vụ. Một khách hàng doanh thu 100tr với biên 15% không giống khách doanh thu 60tr với biên 80%. Sai lầm này làm cả mô hình sai theo hướng lạc quan.

## 2. Tính CAC đúng

```
CAC = ( chi phí media + lương marketing + lương sales + công cụ
        + hoa hồng + chiết khấu khuyến mãi + chi phí agency )
      ÷ số khách hàng MỚI trong kỳ
```

Hai biến thể phải tách:
- **Blended CAC** — chia cho tất cả khách mới, kể cả khách đến tự nhiên. Dùng cho bức tranh tổng.
- **Paid CAC** — chỉ chi phí paid ÷ khách từ paid. Dùng để quyết định chi tiêu.

Blended CAC che mất việc kênh paid đang xấu đi khi lượng khách tự nhiên đang tăng — bẫy đo lường phổ biến ở công ty đang tăng trưởng.

## 3. Các ngưỡng — và giới hạn của chúng

| Quy tắc lưu truyền | Đánh giá |
|---|---|
| LTV/CAC ≥ 3 | ⚠️ Quy tắc ngón tay cái cho SaaS, **không phải luật**. Phụ thuộc biên lợi nhuận, chi phí vốn, tốc độ tăng trưởng |
| Payback < 12 tháng | ⚠️ Tương tự — hợp lý cho nhiều mô hình B2B, sai cho nhiều mô hình khác |
| **LTV/CAC quá cao (>5)** | Thường là dấu hiệu **chi tiêu quá ít**, không phải hiệu quả xuất sắc |

> [!note] Payback quan trọng hơn LTV/CAC
> LTV là dự báo về tương lai xa, đầy giả định. Payback dùng dữ liệu ngắn hạn hơn và trực tiếp quyết định nhu cầu vốn lưu động. Khi hai chỉ số mâu thuẫn, tin payback.

## 4. Cạm bẫy

- **LTV bằng doanh thu.**
- **LTV ngoại suy từ cohort quá trẻ.** Cohort 3 tháng không cho biết thời gian sống 3 năm.
- **Dùng LTV trung bình.** Phân bố thường rất lệch; trung vị và phân vị hữu ích hơn.
- **Bỏ lương và chi phí gián tiếp khỏi CAC.**
- **Dùng blended CAC để quyết định tăng chi paid.**
- **Bỏ qua thời gian trễ.** Chi tháng này, khách đến tháng sau — chia hai số cùng kỳ làm sai lệch khi chi tiêu đang thay đổi nhanh.
- **Giả định CAC không đổi khi tăng quy mô.** CAC tăng theo quy mô — [[Marketing Mix Modeling]] cho biết đường cong bão hoà.
- **Không phân tách theo kênh và phân khúc.** Trung bình che mất kênh đang lỗ.

## 5. Checklist áp dụng

- [ ] LTV của tôi dùng **biên lợi nhuận gộp** chứ không phải doanh thu?
- [ ] CAC có gồm lương, công cụ, hoa hồng, chiết khấu không?
- [ ] Tôi có tách blended CAC và paid CAC không?
- [ ] Tôi có tính **payback** không, không chỉ LTV/CAC?
- [ ] Tôi có phân tách theo kênh và phân khúc không?
- [ ] LTV có dựa trên cohort đủ trưởng thành không?
- [ ] Tôi có dùng trung vị/phân vị thay vì chỉ trung bình không?
- [ ] Tôi có tính tới việc CAC tăng khi tăng quy mô không?

## Tham khảo

- David Skok — "SaaS Metrics 2.0" — https://www.forentrepreneurs.com/saas-metrics-2/
- Bessemer Venture Partners — State of the Cloud / efficiency benchmarks — https://www.bvp.com/atlas
- Peter Fader & Bruce Hardie — nghiên cứu học thuật về mô hình CLV (BTYD) — https://www.brucehardie.com/
- Marketing Accountability Standards Board — chuẩn về chỉ số tài chính marketing — https://themasb.org/

## Liên kết

[[Marketing KPIs and Metrics Tree]] · [[Lifecycle and Retention Marketing]] · [[Marketing Mix and Pricing]] · [[Marketing Channel Portfolio]] · [[Marketing]]
