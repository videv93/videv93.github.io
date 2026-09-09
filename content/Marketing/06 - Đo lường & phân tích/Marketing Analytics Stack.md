---
tags: [marketing, đo-lường]
status: growing
---
# Marketing Analytics Stack

> Stack phân tích tốt được đánh giá bằng **một** tiêu chí: khi hai người hỏi cùng một câu hỏi, họ có nhận được cùng một câu trả lời không? Phần lớn stack thất bại ở đúng chỗ đó.

## 1. Các tầng

```
Thu thập      web/app SDK, server-side tagging, webhook, import chi phí
    ↓
Lưu trữ       kho dữ liệu (warehouse) — nguồn sự thật duy nhất
    ↓
Mô hình hoá   biến đổi, định nghĩa chỉ số, giải quyết danh tính
    ↓
Kích hoạt     đẩy phân khúc ra kênh (reverse ETL) — [[Customer Data Platform]]
    ↓
Trình bày     dashboard, báo cáo — [[Marketing Reporting and Dashboards]]
```

> [!note] Kho dữ liệu là nguồn sự thật, không phải công cụ phân tích của nền tảng
> Nếu định nghĩa "khách hàng mới" nằm trong GA4, trong công cụ automation, và trong CRM một cách riêng biệt, bạn có ba con số và không có sự thật. Đưa dữ liệu về một kho và định nghĩa chỉ số **một lần** ở tầng mô hình hoá.

## 2. Thu thập — hai kiến trúc

| | Client-side | Server-side |
|---|---|---|
| Cách chạy | Tag chạy trong trình duyệt | Sự kiện gửi từ máy chủ |
| Bị chặn | ✅ Nhiều — ad blocker, ITP | ❌ Ít hơn |
| Chất lượng dữ liệu | Mất mát đáng kể | Tốt hơn |
| Chi phí & phức tạp | Thấp | Cao hơn |
| Kiểm soát quyền riêng tư | Thấp | ✅ Cao hơn — lọc được trước khi gửi đi |

Server-side đã thành mặc định cho tổ chức nghiêm túc, nhưng nó **không** miễn trừ nghĩa vụ consent — [[Marketing Privacy and Consent]].

## 3. Nguyên tắc

1. **Định nghĩa chỉ số một lần, dùng mọi nơi.** Tầng mô hình hoá (dbt hoặc tương đương) là nơi duy nhất.
2. **Đặt tên sự kiện theo quy ước, viết thành tài liệu.** Taxonomy lỏng lẻo là nợ kỹ thuật đắt nhất trong analytics.
3. **UTM có kỷ luật.** Chuẩn hoá chữ thường, danh sách giá trị hợp lệ, kiểm tự động — [[Marketing Data Governance]].
4. **Nhập chi phí vào kho.** Không có dữ liệu chi phí thì không tính được CAC theo kênh.
5. **Consent chảy xuyên suốt stack.** Trạng thái consent phải đi cùng dữ liệu, không phải chỉ chặn ở tag.
6. **Kiểm chất lượng dữ liệu tự động.** Cảnh báo khi lượng sự kiện lệch bất thường.

## 4. Cạm bẫy

- **Nhiều nguồn sự thật.** Nguyên nhân số một của tranh cãi về số liệu.
- **Không có tài liệu taxonomy.** 6 tháng sau không ai biết `signup_v2` khác `signup_new` thế nào.
- **Dữ liệu chi phí không vào kho.**
- **Coi GA4 là kho dữ liệu.** Nó là công cụ phân tích với giới hạn lấy mẫu và giữ dữ liệu.
- **Consent xử lý ở tầng tag rồi quên ở tầng warehouse.**
- **Xây stack quá phức tạp cho quy mô hiện tại.** Đội 3 người không cần CDP.
- **Không ai sở hữu chất lượng dữ liệu.**

## 5. Checklist áp dụng

- [ ] Có **một** nơi định nghĩa chỉ số không?
- [ ] Taxonomy sự kiện có tài liệu không?
- [ ] Dữ liệu chi phí có vào kho không?
- [ ] UTM có được chuẩn hoá và kiểm tự động không?
- [ ] Trạng thái consent có đi cùng dữ liệu xuyên suốt không?
- [ ] Có cảnh báo tự động khi dữ liệu bất thường không?
- [ ] Stack có tương xứng với quy mô đội không?
- [ ] Ai sở hữu chất lượng dữ liệu?

## Công cụ

| Tên | Vai trò | Link |
|---|---|---|
| BigQuery / Snowflake | Kho dữ liệu | https://cloud.google.com/bigquery |
| dbt | Tầng mô hình hoá, định nghĩa chỉ số | https://www.getdbt.com/ |
| Segment / RudderStack | Thu thập & định tuyến sự kiện | https://www.rudderstack.com/ |
| GA4 | Phân tích web/app | [[GA4 for SEO]] |

## Tham khảo

- Google — GA4 BigQuery export documentation — https://support.google.com/analytics/answer/9358801
- dbt Labs — Analytics engineering guide — https://www.getdbt.com/analytics-engineering/
- Google — Server-side tagging documentation — https://developers.google.com/tag-platform/tag-manager/server-side
- Avinash Kaushik — *Web Analytics 2.0* — https://www.kaushik.net/avinash/

## Liên kết

[[Marketing Data Governance]] · [[Customer Data Platform]] · [[Marketing Reporting and Dashboards]] · [[Marketing Privacy and Consent]] · [[Marketing]]
