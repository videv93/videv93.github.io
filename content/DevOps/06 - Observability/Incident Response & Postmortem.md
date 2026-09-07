---
tags: [devops, observability, incident, sre]
status: growing
---
# Incident Response & Postmortem

> Sự cố là **điều chắc chắn sẽ xảy ra**. Điều phân biệt đội tốt và đội kém không phải số sự cố, mà là **thời gian phục hồi** và **hệ thống có học được gì không**.

## 1. Vòng đời một sự cố
```
Detect → Triage → Mitigate → Resolve → Learn
  ↑                                       │
  └───── cải tiến quay lại hệ thống ──────┘
```
| Giai đoạn | Mục tiêu | Sai lầm hay gặp |
|---|---|---|
| **Detect** | Biết trước khách hàng | Chỉ biết qua ticket khách hàng |
| **Triage** | Đánh giá mức độ, gọi đúng người | Tranh luận severity trong khi hệ thống đang cháy |
| **Mitigate** | **Cầm máu trước**, chữa bệnh sau | Cố tìm root cause trong khi user đang chịu ảnh hưởng |
| **Resolve** | Sửa nguyên nhân, xác nhận ổn định | Đóng sự cố quá sớm |
| **Learn** | Postmortem, action item có chủ | Viết postmortem rồi không ai đọc |

> Nguyên tắc quan trọng nhất: **mitigation đi trước diagnosis.** Rollback, chuyển traffic, tắt feature flag, scale up — làm ngay. Hiểu vì sao là việc của sau đó.

## 2. Vai trò trong sự cố lớn
| Vai trò | Trách nhiệm |
|---|---|
| **Incident Commander (IC)** | Điều phối, ra quyết định, **không tự tay debug** |
| **Operations / Subject Expert** | Người thật sự thao tác hệ thống |
| **Communications Lead** | Cập nhật status page, thông báo nội bộ và khách hàng |
| **Scribe** | Ghi timeline theo thời gian thực (vô giá cho postmortem) |
> Đội nhỏ có thể gộp vai, nhưng **luôn phải có một IC được xác định rõ**. Sự cố không có người chỉ huy sẽ trở thành 5 người cùng sửa 5 thứ khác nhau.

## 3. Severity — định nghĩa trước, không tranh luận lúc cháy
| Sev | Ảnh hưởng | Phản ứng |
|---|---|---|
| **SEV1** | Mất dịch vụ toàn bộ, mất dữ liệu, rò rỉ bảo mật | Page ngay 24/7, IC, war room, cập nhật khách hàng mỗi 30 phút |
| **SEV2** | Tính năng chính suy giảm nặng, một phần khách hàng | Page trong giờ mở rộng, xử lý ngay |
| **SEV3** | Suy giảm nhẹ, có workaround | Ticket, xử lý trong ngày làm việc |
| **SEV4** | Lỗi nhỏ, không ảnh hưởng người dùng | Backlog |

## 4. On-call bền vững
- **Rotation đủ người** (tối thiểu 6–8 người cho lịch 24/7) để không ai kiệt sức.
- **Mọi alert đều có runbook** — nếu không có thì alert đó phải bị xoá hoặc phải viết runbook. → [[Metrics & Prometheus]]
- **Đo và cắt giảm alert noise**: theo dõi số alert/ca trực và tỉ lệ actionable. Ngưỡng lành mạnh: **≤ 2 lần bị đánh thức mỗi ca**.
- **Handoff rõ ràng** giữa các ca: cái gì đang mở, cái gì đang theo dõi.
- **Bù đắp thời gian on-call** và cho nghỉ sau đêm bị gọi — đây là vấn đề vận hành, không phải phúc lợi.
- Người mới **shadow** vài ca trước khi trực chính.

## 5. Blameless Postmortem
### Vì sao "blameless"
Con người không gây ra sự cố; **hệ thống cho phép sai lầm của con người trở thành sự cố**. Nếu một cú gõ nhầm lệnh xoá được cả database production, vấn đề nằm ở chỗ *lệnh đó không có xác nhận và không có backup*, không nằm ở người gõ. Đổ lỗi làm người ta giấu thông tin, và giấu thông tin làm sự cố tiếp theo tệ hơn.

### Cấu trúc một postmortem
```markdown
# Postmortem: Checkout không khả dụng — 2026-08-20

## Tóm tắt
Trong 47 phút, 100% request tới /checkout trả 503. Ước tính 12.400 đơn hàng bị ảnh hưởng.

## Ảnh hưởng
- Thời gian: 14:03 – 14:50 UTC+7
- Người dùng: ~18% MAU
- Error budget đã tiêu: 62% ngân sách tháng

## Timeline (giờ địa phương)
14:03  Deploy v2.8.0 lên production (canary 5%)
14:05  Canary analysis không bắt lỗi vì chỉ đo HTTP 5xx, lỗi này trả 200 kèm body rỗng
14:09  Promote lên 100%
14:11  Alert "checkout error rate" bắn
14:14  IC được chỉ định, war room mở
14:22  Xác định liên quan tới deploy, quyết định rollback
14:31  Rollback hoàn tất
14:50  Metric trở lại bình thường, sự cố đóng

## Nguyên nhân gốc
Connection pool tới payment gateway đặt max=10, thấp hơn nhu cầu thực tế...

## Cái gì đã diễn ra tốt
- Alert bắn trong 2 phút
- Rollback chạy đúng như thiết kế, mất 9 phút

## Cái gì đã diễn ra tệ
- Canary analysis không phát hiện được lỗi (đo sai chỉ số)
- Không ai biết ai là IC trong 3 phút đầu

## Action items
| # | Việc | Chủ | Hạn | Loại |
|---|---|---|---|---|
| 1 | Thêm chỉ số nghiệp vụ (đơn hàng/phút) vào canary analysis | @an | 2026-08-27 | Phòng ngừa |
| 2 | Load test connection pool trước mỗi release lớn | @binh | 2026-09-10 | Phòng ngừa |
| 3 | Tự động chỉ định IC khi SEV1 được khai báo | @chi | 2026-09-03 | Giảm MTTR |
```

### Quy tắc
- Viết trong **vòng 48 giờ**, khi trí nhớ còn tươi.
- **Timeline dựa trên bằng chứng** (log, dashboard, tin nhắn), không dựa trên trí nhớ.
- **Action item phải có chủ và deadline** — mục không có chủ là mục sẽ không xảy ra.
- Ưu tiên action **phòng ngừa** và **giảm thời gian phát hiện/phục hồi** hơn là "nhắc nhau cẩn thận hơn".
- **Công khai trong công ty** — postmortem đọc được là tài sản học tập lớn nhất của kỹ thuật.

## 6. Cạm bẫy
- ❌ **Tìm root cause trong khi đang cháy** → kéo dài downtime. Mitigate trước.
- ❌ **Không ai là IC** → hỗn loạn, nhiều người sửa xung đột nhau.
- ❌ **Postmortem quy trách nhiệm cá nhân** → lần sau không ai báo cáo sự cố sớm nữa.
- ❌ **Action item chung chung** ("cải thiện monitoring") → không bao giờ hoàn thành.
- ❌ **Không theo dõi việc đóng action item** → sự cố y hệt lặp lại sau 4 tháng.
- ❌ **Chỉ làm postmortem cho SEV1** → near-miss là bài học rẻ nhất, đừng bỏ.
- ❌ **Alert quá nhiều** → người trực mất nhạy cảm, bỏ qua đúng cái quan trọng.
- ❌ **Không có status page** → support ngập trong ticket trùng lặp, khách hàng mất niềm tin vì im lặng.

## 7. Checklist năng lực xử lý sự cố
- [ ] Có định nghĩa severity viết ra và mọi người biết?
- [ ] Có lịch on-call, escalation policy, và người thay thế?
- [ ] Mọi alert đang bật đều có runbook?
- [ ] Có kênh sự cố chuẩn (Slack channel tự tạo, war room) và template khai báo?
- [ ] Có status page cho khách hàng?
- [ ] Rollback được thực hiện trong bao lâu? Đã test tháng này chưa?
- [ ] Postmortem có được viết trong 48h và công khai nội bộ?
- [ ] Action item có được đưa vào backlog và theo dõi tới khi đóng?
- [ ] Có chạy **game day / chaos drill** để tập dượt không? → [[SRE & Reliability Engineering]]
- [ ] Đo được MTTD (phát hiện) và MTTR (phục hồi) theo thời gian không?

## Công cụ
| Công cụ | Vai trò | Link |
|---|---|---|
| PagerDuty / Opsgenie / Grafana OnCall | On-call, escalation | https://www.pagerduty.com/ · https://grafana.com/products/oncall/ |
| incident.io / FireHydrant | Điều phối sự cố trong Slack, tự sinh timeline | https://incident.io/ |
| Statuspage / Instatus | Trang trạng thái cho khách hàng | https://www.atlassian.com/software/statuspage |
| Chaos Mesh / AWS FIS | Chủ động tạo lỗi để tập dượt | https://chaos-mesh.org/ · https://aws.amazon.com/fis/ |

## Tham khảo
- Google SRE Book — Managing Incidents: https://sre.google/sre-book/managing-incidents/
- Google SRE Book — Postmortem Culture: Learning from Failure: https://sre.google/sre-book/postmortem-culture/
- Google SRE Workbook — Incident Response: https://sre.google/workbook/incident-response/
- PagerDuty Incident Response Documentation (mở, rất thực dụng): https://response.pagerduty.com/
- Etsy — Debriefing Facilitation Guide (blameless postmortem): https://extfiles.etsy.com/DebriefingFacilitationGuide.pdf
- John Allspaw — Blameless PostMortems: https://www.etsy.com/codeascraft/blameless-postmortems/

## Liên kết
[[SRE & Reliability Engineering]] · [[Observability]] · [[Metrics & Prometheus]] · [[DevOps Culture & Principles]] · [[Deployment Strategies]] · [[DevOps]]
