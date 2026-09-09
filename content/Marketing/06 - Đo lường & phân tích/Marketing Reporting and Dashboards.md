---
tags: [marketing, đo-lường]
status: evergreen
---
# Marketing Reporting and Dashboards

> ⚠️ **Đọc [[Attributed vs Incremental]] trước khi áp dụng note này.**

> Báo cáo tồn tại để **thay đổi một quyết định**. Dashboard không ai mở, hoặc mở mà không ai làm gì khác đi, là chi phí thuần — kể cả khi nó đẹp.

## 1. Ba loại báo cáo — đừng gộp

| Loại | Người đọc | Câu hỏi | Nhịp | Nội dung |
|---|---|---|---|---|
| **Điều hành** | Ban lãnh đạo | Ta có đang thắng không | Tháng/quý | ≤7 số, có ngữ cảnh, có kết luận bằng chữ |
| **Vận hành** | Đội marketing | Cần chỉnh gì tuần này | Tuần/ngày | Chi tiết theo kênh, có ngưỡng cảnh báo |
| **Chẩn đoán** | Phân tích | Vì sao chuyện đó xảy ra | Theo yêu cầu | Đào sâu, tạm thời, không cần đẹp |

Lỗi phổ biến: một dashboard duy nhất phục vụ cả ba → không phục vụ ai.

## 2. Nguyên tắc trình bày

1. **Kết luận đứng đầu, không phải dữ liệu.** Tiêu đề nên là *"CAC tăng 22% do CPM Meta tăng"*, không phải *"Tổng quan hiệu quả marketing"*.
2. **Luôn có mốc so sánh.** Một con số đứng một mình không diễn giải được: so với kỳ trước, mục tiêu, hoặc đối chứng.
3. **Kèm khoảng bất định** cho mọi ước lượng từ mô hình hay thí nghiệm.
4. **Ghi rõ nguồn và định nghĩa** ngay trên báo cáo.
5. **Nêu giới hạn.** Nếu số dựa trên attribution, nói rõ nó không phải nhân quả — [[Attributed vs Incremental]].
6. **Mỗi chỉ số có ngưỡng hành động.**
7. **Ba câu tóm tắt bằng chữ.** Chuyện gì xảy ra, vì sao, ta làm gì tiếp.

> [!warning] Dashboard không thay được diễn giải
> Con số không tự nói. Báo cáo không có phần diễn giải bằng chữ sẽ được mỗi người đọc theo một cách, thường là cách có lợi cho đội mình.

## 3. Báo cáo cho ban lãnh đạo

Cấu trúc một trang:

```
1. Kết luận       — 3 câu: gì, vì sao, làm gì tiếp
2. Chỉ số chính   — ≤7 số, kèm so sánh mục tiêu và kỳ trước
3. Chỉ số dài hạn — brand, share of search  ([[Brand Equity Measurement]])
4. Cái đã học     — thí nghiệm nào chạy, kết quả gì (kể cả thua)
5. Quyết định cần — cái gì cần lãnh đạo quyết
```

Mục 3 và 4 là hai mục hay bị bỏ nhất và là hai mục làm báo cáo đáng đọc.

## 4. Cạm bẫy

- **Dashboard 40 biểu đồ.** Không ai đọc; nó tồn tại để trông có vẻ chăm chỉ.
- **Không có kết luận bằng chữ.**
- **Chỉ báo cáo cái tốt.** Phá niềm tin khi sự thật lộ ra, và làm mất khả năng xin nguồn lực khi thực sự cần.
- **Đổi định nghĩa chỉ số giữa các kỳ.**
- **Báo cáo attribution như sự thật.**
- **Không có mốc so sánh.**
- **Biểu đồ trục y không bắt đầu từ 0** cho dữ liệu dạng lượng — phóng đại thay đổi.
- **Không ai sở hữu báo cáo.** Nó chạy tự động và mục dần cho tới khi sai hoàn toàn.

## 5. Checklist áp dụng

- [ ] Báo cáo này sẽ thay đổi **quyết định nào**?
- [ ] Có kết luận bằng chữ ở đầu không?
- [ ] Mỗi số có mốc so sánh không?
- [ ] Định nghĩa và nguồn có ghi trên báo cáo không?
- [ ] Giới hạn của phương pháp có được nêu không?
- [ ] Có mục chỉ số dài hạn không?
- [ ] Có mục "cái đã học", kể cả thí nghiệm thất bại không?
- [ ] Có ai sở hữu và rà soát báo cáo định kỳ không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Looker Studio | Miễn phí, nối GA4/BigQuery | https://lookerstudio.google.com/ |
| Metabase | Mã nguồn mở, dựng trên warehouse | https://www.metabase.com/ |
| Adobe Analytics Workspace | Phân tích sâu trong hệ Adobe | [[Adobe Experience Cloud Overview]] |

## Tham khảo

- Cole Nussbaumer Knaflic — *Storytelling with Data* — https://www.storytellingwithdata.com/
- Edward Tufte — *The Visual Display of Quantitative Information*
- Avinash Kaushik — Digital marketing dashboards & the "So what?" test — https://www.kaushik.net/avinash/
- Stephen Few — *Information Dashboard Design* — https://www.perceptualedge.com/

## Liên kết

[[Marketing KPIs and Metrics Tree]] · [[Marketing Analytics Stack]] · [[Attributed vs Incremental]] · [[Brand Equity Measurement]] · [[Marketing]]
