---
tags: [marketing, martech]
status: growing
---
# Customer Data Platform

> CDP hợp nhất dữ liệu khách từ nhiều nguồn thành hồ sơ thống nhất rồi đẩy phân khúc ra các kênh. Nó giải quyết một vấn đề thật — nhưng nó **không** làm sạch dữ liệu bẩn, và đó là điều phần lớn người mua tưởng nó làm.

## 1. Nó làm gì và không làm gì

| ✅ Làm được | ❌ Không làm được |
|---|---|
| Hợp nhất danh tính từ nhiều nguồn | Sửa dữ liệu nhập sai từ đầu |
| Xây phân khúc theo hành vi thời gian thực | Cho bạn chiến lược phân khúc |
| Đẩy phân khúc ra kênh (kích hoạt) | Thay thế kho dữ liệu |
| Quản lý consent tập trung | Miễn trừ nghĩa vụ pháp lý |
| Hồ sơ thống nhất cho cá nhân hoá | Làm cá nhân hoá tự có ý nghĩa |

> [!warning] CDP không sửa được dữ liệu bẩn
> Hợp nhất ba nguồn dữ liệu bẩn cho ra một hồ sơ thống nhất bẩn — và giờ nó bẩn ở quy mô lớn hơn, với vẻ ngoài đáng tin hơn. Làm sạch trước, mua sau: [[Marketing Data Governance]].

## 2. Giải quyết danh tính — phần lõi

| Cách khớp | Cơ chế | Độ chính xác |
|---|---|---|
| **Deterministic** | Khớp định danh chung (email, ID người dùng) | ✅ Cao |
| **Probabilistic** | Suy đoán từ thiết bị, IP, hành vi | ⚠️ Thấp hơn; rủi ro pháp lý ở một số thị trường |

Ưu tiên deterministic. Khớp probabilistic tạo ra hồ sơ sai — và hồ sơ sai dẫn tới cá nhân hoá sai, thứ gây hại nhiều hơn không cá nhân hoá.

## 3. Có cần CDP không?

CDP **đáng** khi cả ba đúng:
1. Nhiều nguồn dữ liệu khách thật sự tách rời (≥4–5 hệ thống)
2. Cần kích hoạt phân khúc theo thời gian thực ra nhiều kênh
3. Đã có kỷ luật dữ liệu — taxonomy, quy ước, người sở hữu

**Không cần** khi: đội nhỏ, ít kênh, hoặc dữ liệu chưa sạch. Với nhiều tổ chức, **kho dữ liệu + reverse ETL** làm được phần lớn việc với chi phí và độ khoá thấp hơn nhiều.

| Lựa chọn | Hợp khi |
|---|---|
| CDP đóng gói | Cần nhanh, đội kỹ thuật mỏng, nhiều kênh |
| **Composable (warehouse + reverse ETL)** | Đã có kho dữ liệu, muốn kiểm soát và tránh khoá |
| Không dùng gì | Ít kênh, dữ liệu tập trung sẵn trong CRM |

## 4. Cạm bẫy

- **Mua CDP để tránh việc dọn dữ liệu.** Không hoạt động.
- **Không ai sở hữu định nghĩa phân khúc** → sinh sôi hàng trăm phân khúc trùng lặp.
- **Bỏ qua consent trong hồ sơ thống nhất.** Hợp nhất dữ liệu qua các nguồn có cơ sở pháp lý khác nhau là rủi ro thật — [[Marketing Privacy and Consent]].
- **Khớp probabilistic cho quyết định quan trọng.**
- **CDP thành kho dữ liệu bất đắc dĩ.** Nó không được thiết kế cho phân tích.
- **Không đo tác động.** Cá nhân hoá từ CDP phải chứng minh được bằng holdout — [[Incrementality Testing]].

## 5. Checklist áp dụng

- [ ] Dữ liệu của tôi đã đủ sạch để hợp nhất chưa?
- [ ] Tôi có ≥4 nguồn dữ liệu khách thật sự tách rời không?
- [ ] Tôi đã cân nhắc phương án kho dữ liệu + reverse ETL chưa?
- [ ] Khớp danh tính có ưu tiên deterministic không?
- [ ] Trạng thái consent có nằm trong hồ sơ thống nhất không?
- [ ] Ai sở hữu định nghĩa phân khúc?
- [ ] Tôi có holdout để đo tác động của cá nhân hoá không?

## Công cụ

| Tên | Loại | Link |
|---|---|---|
| Adobe Real-Time CDP | CDP doanh nghiệp | [[Adobe Experience Cloud Overview]] |
| Segment | CDP thu thập & định tuyến | https://segment.com/ |
| Hightouch / Census | Reverse ETL (composable) | https://hightouch.com/ |

## Tham khảo

- CDP Institute — định nghĩa và phân loại CDP — https://www.cdpinstitute.org/
- Adobe — Real-Time CDP documentation — https://experienceleague.adobe.com/docs/experience-platform/rtcdp/home.html
- Gartner — Market Guide for Customer Data Platforms — https://www.gartner.com/en/marketing
- EU GDPR — nguyên tắc giới hạn mục đích khi hợp nhất dữ liệu — https://gdpr.eu/

## Liên kết

[[MarTech Stack Architecture]] · [[Marketing Data Governance]] · [[Personalization Engines]] · [[Marketing Privacy and Consent]] · [[Marketing]]
