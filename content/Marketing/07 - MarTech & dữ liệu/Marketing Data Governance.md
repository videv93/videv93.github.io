---
tags: [marketing, martech, dữ-liệu]
status: evergreen
---
# Marketing Data Governance

> Quản trị dữ liệu nghe như việc hành chính cho tới lần đầu bạn phải giải thích vì sao ba báo cáo cho ba con số khác nhau về cùng một chiến dịch. Nó là **điều kiện tiên quyết** cho mọi thứ trong cụm đo lường.

## 1. Bốn thứ phải quản trị

| Hạng mục | Nội dung | Hỏng thì sao |
|---|---|---|
| **Taxonomy** | Tên chiến dịch, sự kiện, kênh | Không gộp báo cáo được |
| **Định nghĩa chỉ số** | "Khách hàng mới" nghĩa là gì | Tranh cãi về số thay vì về quyết định |
| **Chất lượng dữ liệu** | Trùng lặp, thiếu, sai định dạng | Quyết định dựa trên số sai |
| **Quyền & vòng đời** | Ai xem được gì, giữ bao lâu | Rủi ro pháp lý — [[Marketing Privacy and Consent]] |

## 2. Quy ước UTM — nơi bắt đầu rẻ nhất

UTM lộn xộn là nguyên nhân phổ biến nhất của báo cáo kênh không dùng được.

```
utm_source    = nền tảng          (google, meta, linkedin)     — chữ thường, danh sách cố định
utm_medium    = loại              (cpc, email, social, organic) — danh sách cố định
utm_campaign  = <năm>_<quý>_<tên chiến dịch>_<thị trường>
utm_content   = <biến thể creative>
utm_term      = <từ khoá, nếu có>
```

Quy tắc:
- **Luôn chữ thường.** `Facebook` và `facebook` là hai kênh khác nhau trong báo cáo.
- **Danh sách giá trị cố định** cho source và medium — không cho nhập tự do.
- **Một công cụ tạo link duy nhất** (bảng tính có validation là đủ), không ai tự gõ tay.
- **Kiểm tự động**: cảnh báo khi xuất hiện giá trị source/medium ngoài danh sách.

## 3. Định nghĩa chỉ số

Mỗi chỉ số quan trọng cần một mục có: **tên · công thức · nguồn dữ liệu · người sở hữu · ngày cập nhật · giới hạn đã biết**.

Ví dụ:
> **Khách hàng mới** = số account có opportunity đầu tiên chuyển sang closed-won trong kỳ. Nguồn: CRM. Sở hữu: Marketing Ops. Cập nhật: 2026-09. Giới hạn: không tính khách quay lại sau >18 tháng ngừng.

Không có mục này thì mỗi báo cáo tự định nghĩa lại, và không ai phát hiện ra.

## 4. Cạm bẫy

- **UTM nhập tay.**
- **Đổi định nghĩa chỉ số mà không ghi lại và không thông báo.**
- **Không ai sở hữu chất lượng dữ liệu.** "Ai cũng chịu trách nhiệm" = không ai.
- **Quản trị quá nặng.** 40 trang quy định không ai đọc còn tệ hơn một trang được tuân thủ.
- **Không có kiểm tự động.** Quản trị dựa vào kỷ luật con người sẽ trôi trong 3 tháng.
- **Bỏ qua vòng đời dữ liệu.** Giữ dữ liệu cá nhân vô thời hạn là vi phạm nguyên tắc giới hạn lưu trữ.
- **Quyền truy cập quá rộng.** Mọi người xem được mọi thứ là rủi ro và cũng là nguồn rò rỉ.

## 5. Checklist áp dụng

- [ ] Có quy ước UTM viết ra và có công cụ tạo link không?
- [ ] Có kiểm tự động cho giá trị source/medium ngoài danh sách không?
- [ ] Có từ điển chỉ số với công thức và người sở hữu không?
- [ ] Ai sở hữu chất lượng dữ liệu marketing?
- [ ] Có chính sách lưu giữ và xoá dữ liệu cá nhân không?
- [ ] Quyền truy cập có theo nguyên tắc tối thiểu cần thiết không?
- [ ] Tài liệu quản trị có ngắn tới mức người ta thực sự đọc không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google Campaign URL Builder | Tạo UTM chuẩn | https://ga-dev-tools.google/campaign-url-builder/ |
| dbt | Định nghĩa chỉ số tập trung, có test | https://www.getdbt.com/ |
| Great Expectations | Kiểm chất lượng dữ liệu tự động | https://greatexpectations.io/ |

## Tham khảo

- Google Analytics Help — Custom campaigns & UTM parameters — https://support.google.com/analytics/answer/10917952
- DAMA International — Data Management Body of Knowledge (DMBOK) — https://www.dama.org/
- EU GDPR — nguyên tắc giới hạn lưu trữ (Art. 5) — https://gdpr.eu/article-5-how-to-process-personal-data/
- dbt Labs — Testing and documentation best practices — https://docs.getdbt.com/docs/build/tests

## Liên kết

[[Marketing Analytics Stack]] · [[CRM for Marketing]] · [[Marketing KPIs and Metrics Tree]] · [[Marketing Privacy and Consent]] · [[Marketing]]
