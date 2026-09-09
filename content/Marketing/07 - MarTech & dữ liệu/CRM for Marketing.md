---
tags: [marketing, martech]
status: evergreen
---
# CRM for Marketing

> CRM là nơi marketing và sales **buộc phải** đồng ý với nhau về sự thật. Phần lớn tranh cãi "lead của marketing rác" thực chất là tranh cãi về mô hình dữ liệu trong CRM.

## 1. Mô hình dữ liệu — bốn đối tượng

| Đối tượng | Là gì | Sai lầm phổ biến |
|---|---|---|
| **Lead** | Người chưa xác thực | Để lead sống mãi không chuyển đổi hoặc không loại |
| **Contact** | Người đã xác thực, gắn với account | Trùng lặp tràn lan |
| **Account** | Công ty | ⚠️ Không phân cấp công ty mẹ/con → đếm sai |
| **Opportunity** | Cơ hội bán hàng có giá trị và giai đoạn | Giai đoạn định nghĩa mơ hồ |

**Với B2B, account là đơn vị thật**, không phải lead. Một buying group 8 người tạo ra 8 lead — nếu tính là 8 cơ hội thì mọi chỉ số đều sai. Xem [[B2B vs B2C Marketing]] và [[Marketing Personas and ICP]].

## 2. Marketing cần gì từ CRM

| Nhu cầu | Trường dữ liệu bắt buộc |
|---|---|
| Biết chiến dịch nào ra doanh thu | Nguồn gốc gốc (original source) — **không được ghi đè** |
| Biết lead nào bị từ chối và vì sao | Lý do từ chối, bắt buộc chọn |
| Đo tốc độ theo giai đoạn | Dấu thời gian mỗi lần đổi giai đoạn |
| Tính CAC theo phân khúc | Firmographic trên account |
| Báo cáo được | Danh sách giá trị chuẩn hoá, không phải trường text tự do |

> [!warning] Trường nguồn gốc bị ghi đè
> Lỗi dữ liệu tốn kém nhất trong CRM: lần chạm cuối ghi đè lên nguồn gốc đầu tiên. Kết quả là mọi khách hàng trông như đến từ "direct" hoặc "sales outbound", và marketing không chứng minh được gì. Cần **hai** trường tách biệt: nguồn gốc gốc (khoá, không đổi) và nguồn gần nhất.

## 3. Vệ sinh dữ liệu

1. **Chống trùng lặp ngay lúc nhập**, không dọn định kỳ — dọn sau luôn tốn hơn.
2. **Danh sách giá trị chuẩn hoá.** Trường text tự do không báo cáo được.
3. **Trường bắt buộc ở mức tối thiểu.** Bắt buộc nhiều quá thì người dùng điền bậy.
4. **Phân cấp account.** Công ty con phải nối được lên công ty mẹ.
5. **Chính sách vòng đời dữ liệu.** Giữ bao lâu, xoá thế nào — nghĩa vụ pháp lý, xem [[Marketing Privacy and Consent]].
6. **Kiểm chất lượng tự động** với cảnh báo.

## 4. Cạm bẫy

- **Nguồn gốc bị ghi đè.**
- **Trường text tự do cho dữ liệu cần báo cáo.**
- **Không có phân cấp account.**
- **Marketing và Sales dùng hai hệ thống khác nhau** — [[Marketing and Sales Alignment]].
- **Không có lý do từ chối bắt buộc.** Vòng phản hồi đứt.
- **Đồng bộ một chiều** từ công cụ automation sang CRM mà không có chiều ngược lại → marketing không thấy doanh thu.
- **Consent không được lưu trong CRM.** Không chứng minh được cơ sở pháp lý khi cần.
- **Quá nhiều trường tuỳ chỉnh** không ai dùng.

## 5. Checklist áp dụng

- [ ] Có trường **nguồn gốc gốc** được khoá không?
- [ ] Lý do từ chối lead có bắt buộc không?
- [ ] Có phân cấp account không?
- [ ] Dữ liệu doanh thu có chảy **ngược** về marketing không?
- [ ] Trạng thái consent có lưu ở cấp contact không?
- [ ] Có chống trùng lặp lúc nhập không?
- [ ] Trường dùng để báo cáo có phải danh sách chuẩn hoá không?
- [ ] Có chính sách lưu giữ và xoá dữ liệu không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Salesforce | Chuẩn doanh nghiệp, tuỳ biến sâu | https://www.salesforce.com/ |
| HubSpot | Marketing + CRM tích hợp sẵn | https://www.hubspot.com/ |
| Pipedrive | Nhẹ, hợp đội nhỏ | https://www.pipedrive.com/ |

## Tham khảo

- Salesforce — Data model & campaign attribution documentation — https://help.salesforce.com/
- Gartner — B2B Buying Journey (vì sao account là đơn vị đúng) — https://www.gartner.com/en/sales/insights/b2b-buying-journey
- EU GDPR — nghĩa vụ chứng minh consent — https://gdpr.eu/
- Kotler & Keller — *Marketing Management* 16e, ch. 14 (Personal Selling and Direct Marketing)

## Liên kết

[[Marketing and Sales Alignment]] · [[Lead Generation and Nurture]] · [[Marketing Data Governance]] · [[Customer Data Platform]] · [[Marketing]]
