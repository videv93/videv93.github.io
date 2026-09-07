---
tags: [devops, foundation, sre, reliability]
status: growing
---
# SRE & Reliability Engineering

> SRE là **cách Google hiện thực hoá DevOps**: coi vận hành là một bài toán phần mềm, và định lượng "đủ tin cậy là bao nhiêu" thay vì đuổi theo 100%.

## 1. SLI / SLO / SLA — ba khái niệm hay bị lẫn
| Khái niệm | Là gì | Ví dụ | Ai quan tâm |
|---|---|---|---|
| **SLI** (Indicator) | Một **số đo** thực tế về chất lượng dịch vụ | Tỉ lệ request HTTP trả 2xx/3xx trong 5 phút | Engineer |
| **SLO** (Objective) | **Mục tiêu nội bộ** cho SLI đó | 99.9% request thành công trong 30 ngày | Team + Product |
| **SLA** (Agreement) | **Cam kết hợp đồng** với khách, có phạt tiền | 99.5%, dưới mức đó hoàn 10% phí | Legal + Sales |

> Quy tắc: **SLO luôn chặt hơn SLA.** Nếu SLO = SLA thì vi phạm SLO là đã mất tiền, không còn chỗ xoay xở.

## 2. Error Budget — công cụ chính trị mạnh nhất của SRE
```
Error budget = 100% − SLO
SLO 99.9% / 30 ngày  →  ngân sách lỗi = 0.1% = 43 phút 12 giây downtime
```
Cách dùng:
- **Còn budget** → được phép ship nhanh, thử nghiệm, làm canary rộng.
- **Hết budget** → đóng băng feature, cả team chuyển sang làm reliability cho tới khi hồi budget.

Đây là cách biến tranh cãi *"ship nhanh hay ship an toàn"* thành một **con số hai bên cùng đồng ý trước**.

### Bảng quy đổi uptime → downtime cho phép
| SLO | Mỗi tháng (30d) | Mỗi năm |
|---|---|---|
| 99% | 7h 18m | 3d 15h |
| 99.9% ("three nines") | 43m 12s | 8h 45m |
| 99.95% | 21m 36s | 4h 22m |
| 99.99% ("four nines") | 4m 19s | 52m 35s |
| 99.999% | 26s | 5m 15s |

> Mỗi "số 9" thêm vào đắt lên khoảng một bậc độ lớn. Hỏi trước: **người dùng có phân biệt được 99.9% và 99.99% không?** Thường là không, vì mạng của họ còn tệ hơn thế.

## 3. Toil — kẻ thù cần đo
Toil = công việc vận hành **thủ công, lặp lại, tự động hoá được, không tạo giá trị lâu dài, tăng tuyến tính theo quy mô**.

- SRE Google giới hạn toil **≤ 50%** thời gian; phần còn lại dùng để viết phần mềm loại bỏ toil.
- Nếu một việc làm > 2 lần bằng tay → viết script. Làm > 5 lần → đưa vào pipeline.
- Đo toil bằng cách ghi lại thời gian on-call thực tế, không ước lượng bằng cảm giác.

## 4. Nguyên tắc thiết kế độ tin cậy
1. **Loại bỏ single point of failure** — mọi thành phần phải chạy ≥ 2 bản, ở ≥ 2 [[AWS Global Infrastructure & Networking|AZ]].
2. **Graceful degradation** — mất recommendation engine thì vẫn bán được hàng, đừng sập cả trang.
3. **Timeout + retry với exponential backoff + jitter** — retry không jitter tạo *thundering herd* làm sự cố nặng thêm.
4. **Circuit breaker** — ngừng gọi service đang chết để nó có cơ hội hồi phục.
5. **Backpressure & rate limit** — thà từ chối 10% request còn hơn sập 100%.
6. **Idempotency** — mọi thao tác ghi phải an toàn khi retry.
7. **Chaos Engineering** — chủ động giết instance trong giờ hành chính để kiểm chứng auto-healing (Netflix Chaos Monkey).
8. **Test cả quy trình khôi phục**, không chỉ backup. *Backup chưa restore thử = chưa có backup.*

## 5. Cạm bẫy
- ❌ **Đặt SLO 100%** → mọi thay đổi đều vi phạm, error budget bằng 0, team tê liệt.
- ❌ **SLI đo ở phía server** trong khi người dùng đau ở phía client (DNS, CDN, mobile network). Đo càng gần người dùng càng tốt.
- ❌ **Dùng giá trị trung bình** (`avg latency`) → che giấu đuôi. Luôn dùng percentile: p50, p95, p99.
- ❌ **SLO cho mọi endpoint** → chọn vài *critical user journey* (login, checkout), đừng dàn đều.
- ❌ **Có error budget nhưng không có hệ quả** khi cạn → nó chỉ còn là một biểu đồ đẹp.

## 6. Checklist áp dụng cho một service
- [ ] Đã định nghĩa 2–3 SLI phản ánh **trải nghiệm người dùng** (availability, latency p99, correctness)?
- [ ] SLO có con số cụ thể + cửa sổ thời gian (rolling 28/30 ngày) chưa?
- [ ] Error budget có dashboard và có **policy khi cạn** được team đồng thuận chưa?
- [ ] Alert dựa trên **burn rate của error budget**, không phải trên từng spike CPU?
- [ ] Có runbook cho từng alert đang bật không? Alert nào không có runbook thì xoá.
- [ ] Đã thử rollback / restore backup trong 90 ngày gần nhất chưa?
- [ ] Toil chiếm bao nhiêu % thời gian sprint vừa rồi?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Prometheus + Grafana | Tính SLI/SLO bằng recording rule | https://prometheus.io/ |
| Sloth | Sinh SLO rule cho Prometheus từ YAML | https://sloth.dev/ |
| Nobl9 | SLO platform thương mại | https://www.nobl9.com/ |
| Chaos Mesh / LitmusChaos | Chaos engineering trên K8s | https://chaos-mesh.org/ |
| PagerDuty / Opsgenie | On-call, escalation | https://www.pagerduty.com/ |

## Tham khảo
- Google — *Site Reliability Engineering* (miễn phí online): https://sre.google/sre-book/table-of-contents/
- Google — *The Site Reliability Workbook*, chương Implementing SLOs: https://sre.google/workbook/implementing-slos/
- Alex Hidalgo — *Implementing Service Level Objectives* (O'Reilly)
- Google — Eliminating Toil: https://sre.google/sre-book/eliminating-toil/
- AWS — Reliability Pillar whitepaper: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html

## Liên kết
[[DevOps Culture & Principles]] · [[Observability]] · [[Metrics & Prometheus]] · [[Incident Response & Postmortem]] · [[AWS Well-Architected Framework]] · [[DevOps]]
