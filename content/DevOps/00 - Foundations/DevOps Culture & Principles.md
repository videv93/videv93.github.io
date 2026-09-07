---
tags: [devops, foundation, culture]
status: growing
---
# DevOps Culture & Principles

> DevOps không phải một chức danh, một team, hay một bộ công cụ. Nó là **cách rút ngắn vòng lặp từ ý tưởng → production → phản hồi**, bằng cách xoá bức tường giữa người viết code và người vận hành code.

## 1. Vấn đề gốc: "wall of confusion"
| | Dev muốn | Ops muốn |
|---|---|---|
| Động lực | Ship tính năng nhanh | Giữ hệ thống ổn định |
| Thay đổi | Càng nhiều càng tốt | Càng ít càng tốt |
| Kết quả khi tách rời | Ném code qua tường, đổ lỗi khi sập | Đóng băng release, ship chậm |

DevOps giải quyết bằng cách cho **cùng một nhóm chịu trách nhiệm cả hai** — *"you build it, you run it"* (Werner Vogels, Amazon).

## 2. CALMS — 5 trụ cột
| Trụ             | Nội dung                                | Dấu hiệu làm đúng                                                   |
| --------------- | --------------------------------------- | ------------------------------------------------------------------- |
| **C**ulture     | Trách nhiệm chung, không đổ lỗi         | Postmortem không nêu tên người → [[Incident Response & Postmortem]] |
| **A**utomation  | Mọi việc lặp lại đều phải được code hoá | Deploy = 1 lệnh, không có checklist thủ công                        |
| **L**ean        | Giảm batch size, giảm work-in-progress  | PR nhỏ, release hằng ngày thay vì hằng quý                          |
| **M**easurement | Quyết định bằng số, không bằng cảm tính | Có [[Observability]] và DORA metrics                                |
| **S**haring     | Kiến thức không nằm trong đầu một người | Runbook, docs, pairing                                              |

## 3. Three Ways (The DevOps Handbook)
1. **Flow** — tối ưu dòng chảy từ Dev → Ops → khách hàng. Nhìn toàn hệ thống, không tối ưu cục bộ từng phòng ban.
2. **Feedback** — tạo vòng phản hồi nhanh và liên tục từ phải sang trái. Lỗi phải hiện ra càng sớm càng rẻ.
3. **Continual Learning** — văn hoá thử nghiệm, chấp nhận rủi ro có kiểm soát, học từ sự cố.

## 4. DORA — 4 chỉ số đo năng lực giao hàng
| Metric | Elite | Low | Ý nghĩa |
|---|---|---|---|
| **Deployment Frequency** | Nhiều lần/ngày | < 1 lần/tháng | Batch size nhỏ tới đâu |
| **Lead Time for Changes** | < 1 giờ | > 6 tháng | Từ commit đến production |
| **Change Failure Rate** | 0–15% | 46–60% | Chất lượng của pipeline |
| **Failed Deployment Recovery Time** | < 1 giờ | > 6 tháng | Khả năng phục hồi |

> Nghiên cứu DORA (*Accelerate*) chỉ ra: tốc độ và độ ổn định **không đánh đổi nhau** — đội giỏi giỏi cả hai. Ship chậm không làm hệ thống an toàn hơn.

## 5. Cạm bẫy hay gặp
- ❌ **Lập "DevOps Team" riêng** → tạo ra bức tường thứ ba. DevOps là cách làm việc, không phải phòng ban. (Nếu cần team, hãy gọi đúng tên: *Platform Team* — xây nền tảng cho team khác tự phục vụ.)
- ❌ **Mua công cụ trước, sửa quy trình sau** → Jenkins + Kubernetes không cứu được quy trình duyệt release 3 tuần.
- ❌ **Tự động hoá một quy trình tồi** → chỉ làm cái tồi chạy nhanh hơn. Sửa quy trình rồi mới automate.
- ❌ **Đo "số dòng code" hoặc "số ticket"** → đo output thay vì outcome, sinh hành vi lệch lạc.
- ❌ **Đổi tên Sysadmin thành DevOps Engineer** rồi không đổi gì khác.

## 6. Checklist tự đánh giá đội
- [ ] Một người mới vào có deploy được lên production trong tuần đầu không?
- [ ] Deploy có cần ai đó thức đêm cuối tuần không?
- [ ] Rollback mất bao lâu? Có ai đã thử trong 30 ngày qua chưa?
- [ ] Sự cố gần nhất có postmortem viết ra không? Có action item nào đã đóng chưa?
- [ ] Dev có xem được log/metric production của chính service mình không?
- [ ] Có bao nhiêu bước thủ công giữa `git push` và production? Đếm được không?

## Tham khảo
- Gene Kim et al. — *The DevOps Handbook* (Three Ways, value stream)
- Forsgren, Humble, Kim — *Accelerate* (DORA): https://dora.dev/
- Báo cáo DORA State of DevOps: https://dora.dev/research/
- Atlassian — DevOps culture: https://www.atlassian.com/devops/what-is-devops/devops-culture
- Google Cloud — DORA capabilities catalog: https://dora.dev/capabilities/

## Liên kết
[[SRE & Reliability Engineering]] · [[CI-CD Pipeline]] · [[Incident Response & Postmortem]] · [[DevOps Learning Roadmap]] · [[DevOps]]
