---
tags: [marketing, rủi-ro, quyền-riêng-tư]
status: growing
---
# Marketing Privacy and Consent

> Quyền riêng tư không còn là việc của phòng pháp chế. Nó quyết định **dữ liệu nào bạn được phép có**, và vì thế quyết định luôn giới hạn của đo lường, nhắm mục tiêu, và cá nhân hoá. Đây là ràng buộc nền của cả area.

> [!warning] Note này không phải tư vấn pháp lý
> Quy định khác nhau theo thị trường và thay đổi thường xuyên. Dùng note này để biết **cần hỏi cái gì**, rồi hỏi luật sư cho tình huống cụ thể của bạn.

## 1. Các khung pháp lý chính

| Khung | Phạm vi | Yêu cầu cốt lõi |
|---|---|---|
| **GDPR** (EU/EEA) | Người ở EU | Cơ sở pháp lý cho mọi xử lý; quyền của chủ thể dữ liệu; giới hạn mục đích & lưu trữ |
| **ePrivacy** (EU) | Cookie & thiết bị đầu cuối | **Consent trước** khi đặt cookie không thiết yếu |
| **CCPA/CPRA** (California) | Cư dân California | Quyền từ chối "bán/chia sẻ"; quyền xoá |
| **PIPL** (Trung Quốc), **LGPD** (Brazil)… | Theo lãnh thổ | Tương tự GDPR, khác chi tiết |
| **Nghị định 13/2023/NĐ-CP** (Việt Nam) | Dữ liệu cá nhân tại VN | Yêu cầu về consent, hồ sơ đánh giá tác động, thông báo |

## 2. Cơ sở pháp lý — khái niệm quan trọng nhất

Theo GDPR, mọi xử lý dữ liệu cá nhân cần **một** cơ sở pháp lý. Với marketing, thực tế chỉ có hai:

| Cơ sở | Dùng khi | Điều kiện |
|---|---|---|
| **Consent** | Cookie theo dõi, email marketing, quảng cáo nhắm mục tiêu | Tự nguyện, cụ thể, có thông tin, rõ ràng; **rút lại dễ như khi cho** |
| **Lợi ích chính đáng** | Một số phân tích, marketing tới khách hàng hiện có | Phải làm **đánh giá cân bằng** và ghi lại; không dùng được cho cookie theo dõi ở EU |

**Consent hợp lệ phải:**
- Là hành động chủ động — ô đã tick sẵn **không** hợp lệ
- Tách bạch theo mục đích — không gộp "đồng ý tất cả" cho mọi việc
- Từ chối phải dễ ngang chấp nhận — banner có nút "Chấp nhận" to mà "Từ chối" giấu trong menu đã bị phạt nhiều lần
- Được ghi lại — bạn phải **chứng minh được** đã có consent, khi nào, cho việc gì

## 3. Hệ quả thực tế cho marketing

| Thay đổi | Hệ quả |
|---|---|
| Cookie bên thứ ba bị chặn | Retargeting xuyên miền và attribution suy yếu — [[Marketing Attribution Models]] |
| Apple ATT | Mất phần lớn tín hiệu trên iOS |
| Consent mode | Dữ liệu chỉ có cho người đồng ý → mẫu **thiên lệch có hệ thống**, không chỉ nhỏ hơn |
| Quyền xoá | Phải xoá được xuyên toàn stack, kể cả bản sao trong kho dữ liệu |
| Giới hạn mục đích | Dữ liệu thu cho việc A không tự động dùng được cho việc B |

> [!note] Vì sao MMM quay lại
> Chính những ràng buộc này làm [[Marketing Mix Modeling]] trở nên hấp dẫn lại: nó chạy trên dữ liệu tổng hợp, không cần định danh cá nhân.

## 4. Cạm bẫy

- **Coi banner cookie là xong.** Consent phải chảy xuyên suốt stack, tới cả kho dữ liệu và công cụ đối tác.
- **Dark pattern trong banner.** Là vi phạm và đã bị xử phạt — [[Marketing Ethics and Dark Patterns]].
- **Gộp consent.** Đồng ý nhận cập nhật dịch vụ ≠ đồng ý nhận marketing ≠ đồng ý quảng cáo nhắm mục tiêu.
- **Không ghi lại consent.** Không chứng minh được = coi như không có.
- **Chia sẻ dữ liệu với đối tác mà không có DPA.**
- **Giữ dữ liệu vô thời hạn** — [[Marketing Data Governance]].
- **Bỏ qua thiên lệch consent khi đọc số liệu.** Nếu 55% đồng ý, dashboard của bạn mô tả 55% đó, không mô tả thị trường.
- **Nạp dữ liệu khách vào công cụ AI chưa duyệt** — [[Generative AI in Marketing Creative]].

## 5. Checklist áp dụng

- [ ] Mỗi hoạt động xử lý dữ liệu có cơ sở pháp lý được ghi lại không?
- [ ] Consent có tách theo **mục đích** không?
- [ ] Nút từ chối có dễ ngang nút chấp nhận không?
- [ ] Tôi có ghi lại và truy xuất được bằng chứng consent không?
- [ ] Trạng thái consent có chảy tới **mọi** hệ thống, kể cả kho dữ liệu, không?
- [ ] Tôi thực hiện được quyền xoá xuyên toàn stack không?
- [ ] Có DPA với mọi đối tác nhận dữ liệu không?
- [ ] Tôi biết tỉ lệ consent của mình và có tính tới thiên lệch đó khi đọc số không?

## Tham khảo

- EU — General Data Protection Regulation, toàn văn — https://gdpr-info.eu/
- European Data Protection Board — Guidelines on consent & dark patterns — https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en
- California Privacy Protection Agency — CCPA/CPRA regulations — https://cppa.ca.gov/regulations/
- Google — Consent Mode & EU user consent policy — https://support.google.com/google-ads/answer/10000067

## Liên kết

[[Marketing Data Governance]] · [[Marketing Attribution Models]] · [[Marketing Ethics and Dark Patterns]] · [[Customer Data Platform]] · [[Marketing]]
