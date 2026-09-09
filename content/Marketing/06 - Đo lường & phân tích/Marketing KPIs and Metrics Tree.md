---
tags: [marketing, đo-lường]
status: evergreen
---
# Marketing KPIs and Metrics Tree

> ⚠️ **Đọc [[Attributed vs Incremental]] trước khi áp dụng note này.**

> Cây chỉ số tồn tại để trả lời một câu: *"con số này đổi thì cái gì ở trên đổi theo?"* Chỉ số không nối được lên doanh thu là chỉ số để trang trí báo cáo.

## 1. Cấu trúc cây

```
Doanh thu
├── Khách hàng mới
│   ├── Reach × tỉ lệ chuyển đổi từng bước
│   └── CAC  ──► [[Unit Economics CAC LTV Payback]]
├── Doanh thu trên mỗi khách
│   ├── Giá  ──► [[Marketing Mix and Pricing]]
│   └── Tần suất / mở rộng
└── Giữ chân
    └── Churn theo cohort ──► [[Lifecycle and Retention Marketing]]
```

**Quy tắc:** mỗi chỉ số trong báo cáo phải nối được lên nút cha trong ≤3 bước. Không nối được → bỏ khỏi báo cáo (có thể vẫn theo dõi để chẩn đoán, nhưng không báo cáo).

## 2. Ba loại chỉ số — đừng trộn

| Loại | Ví dụ | Dùng để | Sai lầm |
|---|---|---|---|
| **Kết quả (lagging)** | Doanh thu, thị phần, penetration | Đánh giá | Phản hồi chậm, không chỉ đạo hành động |
| **Dẫn dắt (leading)** | Share of search, pipeline, nhận biết | Điều chỉnh sớm | Bị nhầm là kết quả |
| **Chẩn đoán** | CTR, CPM, tỉ lệ thoát | Tìm chỗ hỏng | ⚠️ **Bị dùng làm KPI** — lỗi phổ biến nhất |

> [!warning] CTR không phải KPI
> CTR, CPM, engagement rate là chỉ số **chẩn đoán**. Tối ưu trực tiếp vào chúng dẫn tới clickbait và tương tác vô nghĩa. Chúng trả lời "vì sao", không trả lời "có tốt không".

## 3. Chỉ số theo tầng thời gian

| Tầng | Chỉ số | Nhịp đọc |
|---|---|---|
| Ngắn (activation) | Chuyển đổi, CAC, ROAS *(có kiểm chứng)* | Tuần |
| Trung (demand) | Pipeline, lead khớp ICP, chi phí trên cơ hội | Tháng |
| Dài (brand) | Share of search, unaided awareness theo CEP, penetration, price premium | Quý — [[Brand Equity Measurement]] |

Thiếu tầng dài là lý do brand luôn thua trong họp ngân sách — nó không có chỗ trong báo cáo.

## 4. Nguyên tắc

1. **Ít chỉ số.** Báo cáo điều hành nên có ≤7 con số. Hơn nữa thì không ai đọc.
2. **Mỗi chỉ số có người sở hữu và ngưỡng hành động.** "Nếu tụt dưới X, ta làm Y."
3. **Định nghĩa viết ra và không đổi.** Đổi công thức giữa chừng là mất chuỗi thời gian.
4. **Luôn kèm mẫu số.** "1.200 lượt click" vô nghĩa nếu không biết trên bao nhiêu lượt hiển thị và tốn bao nhiêu.
5. **Kèm khoảng bất định.** Con số không có sai số bị đọc như sự thật tuyệt đối.
6. **Định luật Goodhart:** chỉ số bị gắn thưởng sẽ bị thao túng. Đừng gắn thưởng vào chỉ số dễ giả — [[Lead Generation and Nurture]].

## 5. Cạm bẫy

- **Vanity metrics.** Lượt thích, follower, impression tổng — không nối lên doanh thu.
- **Chỉ số chẩn đoán làm KPI.**
- **Cộng chuyển đổi từ nhiều nền tảng.** Mỗi nền tảng nhận công cho cùng một đơn hàng → tổng lớn hơn thực tế. Xem [[Attributed vs Incremental]].
- **Báo cáo trung bình che mất phân bố.** Trung bình LTV vô dụng khi phân bố lệch mạnh.
- **So với tháng trước thay vì so với đối chứng.**
- **Không có tầng brand.**
- **Đổi định nghĩa để số đẹp hơn.**

## 6. Checklist áp dụng

- [ ] Mỗi chỉ số trong báo cáo có nối lên doanh thu trong ≤3 bước không?
- [ ] Báo cáo điều hành có ≤7 con số không?
- [ ] Mỗi chỉ số có người sở hữu và ngưỡng hành động không?
- [ ] Định nghĩa có được viết ra và giữ ổn định không?
- [ ] Tôi có tầng chỉ số **dài hạn** không?
- [ ] Tôi có đang cộng chuyển đổi từ nhiều nền tảng không?
- [ ] Chỉ số nào đang gắn thưởng — nó có dễ giả không?

## Tham khảo

- Avinash Kaushik — *Web Analytics 2.0* & See-Think-Do-Care framework — https://www.kaushik.net/avinash/
- Marketing Accountability Standards Board (MASB) — chuẩn về chỉ số marketing — https://themasb.org/
- Les Binet & Peter Field — *The Long and the Short of It* (chỉ số ngắn vs dài hạn) — https://ipa.co.uk/knowledge/publications-reports/the-long-and-the-short-of-it
- Charles Goodhart / Marilyn Strathern — định luật Goodhart

## Liên kết

[[Unit Economics CAC LTV Payback]] · [[Marketing Reporting and Dashboards]] · [[Attributed vs Incremental]] · [[Brand Equity Measurement]] · [[Marketing]]
