---
tags: [security, grc]
status: growing
---
# Security Metrics and Reporting

> Số liệu nào lãnh đạo **thật sự dùng để quyết định** — và vì sao phần lớn dashboard bảo mật đo sai thứ. Đây là kỹ năng quyết định việc bảo mật có được đầu tư hay không, và là chỗ [[Offense vs Defense Bias]] nói kỹ năng kỹ thuật thuần chạm trần.

## 1. Vanity metrics vs decision metrics

| Vanity (phù phiếm) | Decision (ra quyết định được) |
|---|---|
| Số cảnh báo/ngày | MTTD, MTTR (thời gian phát hiện/phản ứng) |
| Số lỗ hổng tổng | Xu hướng giảm rủi ro theo thời gian |
| Số email chặn | Tỉ lệ báo cáo phishing của nhân viên |
| Tỉ lệ hoàn thành đào tạo | Thay đổi hành vi (click bền) |
| "Số cuộc tấn công chặn được" | Blast radius nếu control chính thất bại |
| % control đã triển khai | % rủi ro cao đã xử lý |

> [!warning] Vanity metric làm hại theo hai cách
> Thứ nhất, chúng không giúp ra quyết định — "chặn 1 triệu tấn công" không nói nên đầu tư vào đâu. Thứ hai, chúng **khuyến khích hành vi sai**: đo "số cảnh báo đóng" khuyến khích đóng ẩu; đo "số lỗ hổng" khuyến khích giấu. Metric bạn chọn định hình hành vi bạn nhận — chọn cẩn thận.

## 2. Metric tốt theo khán giả

| Khán giả | Quan tâm | Metric |
|---|---|---|
| **Hội đồng/CEO** | Rủi ro kinh doanh, so với ngành | Rủi ro tồn dư của top risk; xu hướng; benchmark |
| **Lãnh đạo kỹ thuật** | Hiệu quả chương trình | MTTD/MTTR, độ phủ ATT&CK, SLA vá |
| **Vận hành (SOC)** | Chất lượng vận hành | Tỉ lệ FP, thời gian triage, backlog |

Sai lầm phổ biến: trình metric vận hành (số cảnh báo) cho hội đồng, hoặc metric kinh doanh mơ hồ cho SOC. Mỗi khán giả cần metric ở đúng tầng.

## 3. Thuộc tính của metric tốt

- **Ra quyết định được** — thay đổi metric này thì thay đổi một quyết định.
- **Đo kết quả, không đo hoạt động** — "rủi ro giảm", không "số việc đã làm".
- **Chống chơi hệ thống** — không khuyến khích hành vi sai để cải thiện con số.
- **Có ngữ cảnh/xu hướng** — một con số đơn lẻ vô nghĩa; xu hướng và benchmark mới nói lên điều gì.
- **Gắn với rủi ro** — nối về [[Security Risk Management]].

## 4. Nguyên tắc

1. **Đo kết quả (rủi ro giảm), không đo hoạt động (việc đã làm).**
2. **Nói ngôn ngữ khán giả.** Hội đồng nghe rủi ro kinh doanh, không nghe CVE — [[Security Culture]].
3. **Metric định hình hành vi — chọn để khuyến khích đúng.** Tránh metric chơi được.
4. **Xu hướng và benchmark, không con số đơn lẻ.** "Giảm 40% quý này" > "3.000 lỗ hổng".
5. **Ít metric thực chất hơn nhiều metric hình thức.** Dashboard 50 biểu đồ không ai quyết định gì.
6. **Nối mọi metric về rủi ro và quyết định.** Nếu một metric không đổi được quyết định nào, bỏ nó.

## 5. Cạm bẫy

- **Vanity metrics.** Đo cái dễ đo thay vì cái quan trọng.
- **Metric khuyến khích hành vi sai.** Số cảnh báo đóng → đóng ẩu; số lỗ hổng → giấu.
- **Sai khán giả.** Metric vận hành cho hội đồng, hoặc ngược lại.
- **Con số không ngữ cảnh.** "500 sự kiện" không nói gì nếu không có xu hướng/benchmark.
- **Quá nhiều metric.** Dashboard ngập, không ai dùng.
- **Đo hoạt động.** "Đã làm X việc" không phải kết quả bảo mật.
- **Không nối về quyết định.** Metric đẹp không ai dùng để quyết định gì.

## 6. Checklist áp dụng

- [ ] Mỗi metric có thay đổi được một quyết định cụ thể không?
- [ ] Tôi đang đo kết quả (rủi ro) hay hoạt động (việc làm)?
- [ ] Metric này có khuyến khích hành vi đúng, không chơi được không?
- [ ] Metric có đúng tầng cho khán giả không (hội đồng/kỹ thuật/vận hành)?
- [ ] Tôi trình xu hướng và benchmark, không con số đơn lẻ chứ?
- [ ] Dashboard có đủ tinh gọn để người ta thật sự dùng không?
- [ ] Mọi metric có nối về rủi ro không?

## 7. Metric tham chiếu hay dùng

| Metric | Đo gì |
|---|---|
| **MTTD / MTTR** | Thời gian phát hiện / phản ứng |
| **Độ phủ ATT&CK** | % technique phát hiện được — [[MITRE ATTACK Framework]] |
| **SLA vá theo mức rủi ro** | Tốc độ xử lý lỗ hổng — [[Vulnerability Management]] |
| **Tỉ lệ báo cáo phishing** | Hiệu quả awareness — [[Security Awareness Programs]] |
| **Rủi ro tồn dư của top risks** | Trạng thái rủi ro chính — [[Security Risk Management]] |

## Tham khảo

- [Douglas Hubbard & Richard Seiersen — How to Measure Anything in Cybersecurity Risk](https://www.howtomeasureanything.com/cybersecurity/)
- [FIRST — EPSS](https://www.first.org/epss/)
- [NIST SP 800-55 — Performance Measurement Guide for Information Security](https://csrc.nist.gov/pubs/sp/800/55/r2/ipd)
- [Verizon DBIR — benchmark ngành](https://www.verizon.com/business/resources/reports/dbir/)

## Liên kết

[[Security Risk Management]] · [[Vulnerability Management]] · [[Blue Team Operations]] · [[Security Culture]] · [[Offense vs Defense Bias]] · [[Security]]
