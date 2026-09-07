---
tags: [devops, aws, cloud, finops, cost]
status: growing
---
# Cloud Cost Optimization

> Trên cloud, **mỗi quyết định kỹ thuật là một quyết định tài chính**. Hoá đơn không tăng vì một sai lầm lớn — nó tăng vì hàng trăm quyết định nhỏ không ai chịu trách nhiệm.

## 1. FinOps — ba giai đoạn
| Giai đoạn | Câu hỏi | Việc cần làm |
|---|---|---|
| **Inform** | Tiền đang đi đâu? | Tagging, cost allocation, dashboard cho từng team |
| **Optimize** | Cắt được chỗ nào? | Right-sizing, commitment, xoá tài nguyên nhàn rỗi |
| **Operate** | Làm sao không tái diễn? | Budget alert, cost trong PR review, KPI đơn vị |

**Chỉ số quan trọng nhất không phải tổng hoá đơn, mà là *unit cost***: chi phí trên mỗi 1000 request / mỗi người dùng hoạt động / mỗi đơn hàng. Hoá đơn tăng 30% trong khi unit cost giảm 10% là **tin tốt**.

## 2. Bảy đòn bẩy, xếp theo tỉ lệ lợi ích/công sức
| # | Đòn bẩy | Tiết kiệm điển hình | Công sức |
|---|---|---|---|
| 1 | **Xoá tài nguyên nhàn rỗi** (EBS mồ côi, EIP không gắn, snapshot cũ, LB không target, môi trường bỏ quên) | 5–15% | Rất thấp |
| 2 | **Tắt non-prod ngoài giờ** (12h/ngày × 5 ngày = ~70% thời gian) | 10–20% tổng | Thấp |
| 3 | **Right-sizing** dựa trên metric thật (Compute Optimizer) | 10–30% | Thấp |
| 4 | **Savings Plans / Reserved Instances** cho baseline | 30–72% phần cam kết | Thấp (nhưng cần dự báo) |
| 5 | **Spot** cho batch/CI/worker stateless | tới 90% phần đó | Trung bình |
| 6 | **Storage lifecycle** (S3 tiering, xoá log cũ, CloudWatch retention) | 5–20% chi phí lưu trữ | Thấp |
| 7 | **Sửa data transfer** (NAT Gateway, cross-AZ, egress) | 5–15% | Trung bình–cao |

## 3. Bốn thủ phạm chi phí ẩn hay bị bỏ sót
1. **NAT Gateway** — phí giờ + phí mỗi GB. Traffic tới S3/ECR/DynamoDB nên đi **VPC Endpoint**. → [[AWS Global Infrastructure & Networking]]
2. **Cross-AZ data transfer** — kiến trúc chatty giữa các AZ tính tiền cả hai chiều. Ưu tiên topology-aware routing.
3. **CloudWatch Logs không có retention** — mặc định *Never expire*. Một log group ồn ào có thể tốn hơn cả EC2 sinh ra nó. → [[Logging & Log Aggregation]]
4. **Incomplete multipart upload trong S3** — không hiện trong danh sách object nhưng vẫn tính tiền. Đặt lifecycle rule dọn sau 7 ngày.

Bổ sung thường gặp: snapshot EBS tích tụ nhiều năm, môi trường staging nhân bản y hệt prod, Kubernetes node overprovision vì requests đặt quá cao, và data egress ra Internet.

## 4. Tagging — nền móng của mọi thứ
Không có tag thì không quy được trách nhiệm, và không quy được trách nhiệm thì không ai tối ưu.
```
Environment  = prod | staging | dev
Owner        = team-payments
CostCenter   = CC-4417
Application  = checkout-api
ManagedBy    = terraform
```
Cách thực thi:
- `default_tags` trong provider Terraform ⇒ mọi resource tự có tag. → [[Terraform]]
- **SCP / AWS Config rule** từ chối hoặc đánh dấu tài nguyên thiếu tag.
- Bật **Cost Allocation Tags** trong Billing để tag hiện ra trong Cost Explorer (phải bật thủ công, và chỉ áp dụng từ lúc bật trở đi).

## 5. Tối ưu chi phí trên Kubernetes
- **Requests quá cao** là nguyên nhân lãng phí lớn nhất — node được cấp phát theo requests, không theo usage thật. Dùng VPA ở chế độ recommend / Goldilocks để chỉnh. → [[Kubernetes Operations & Security]]
- **Karpenter** chọn instance type rẻ nhất phù hợp và consolidate node liên tục.
- **Spot node group** cho workload stateless + PodDisruptionBudget để chịu được thu hồi.
- **Cluster autoscaler phải scale xuống được** — pod không có PDB hoặc dùng local storage sẽ chặn việc gỡ node.
- Đo chi phí theo namespace/team bằng **OpenCost / Kubecost**.

## 6. Cạm bẫy
- ❌ **Chỉ nhìn tổng hoá đơn** → không biết tăng do tăng trưởng hay do lãng phí. Nhìn unit cost.
- ❌ **Mua Reserved 3 năm cho kiến trúc sắp thay đổi** → cam kết bị mắc kẹt. Bắt đầu bằng Compute Savings Plans 1 năm (linh hoạt hơn).
- ❌ **Right-sizing dựa trên đỉnh tuyệt đối** → luôn thừa. Dùng p95/p99 trong 14–30 ngày.
- ❌ **Tối ưu chi phí bằng cách bỏ Multi-AZ** → tiết kiệm vài trăm đô, mất vài chục nghìn khi downtime. Đọc lại đánh đổi ở [[AWS Well-Architected Framework]].
- ❌ **Chỉ một người "lo chi phí"** → team tạo ra chi phí phải là team nhìn thấy chi phí.
- ❌ **Không có budget alert** → biết mình vượt ngân sách vào ngày mùng 3 tháng sau.
- ❌ **Tối ưu chi phí thủ công một lần** → 3 tháng sau lãng phí quay lại y nguyên. Phải tự động hoá và có nhịp review.

## 7. Checklist FinOps hằng tháng
- [ ] Xem Cost Explorer theo tag `Owner`/`Application`: khoản nào tăng > 20% so tháng trước và vì sao?
- [ ] Chạy AWS Compute Optimizer: có bao nhiêu instance over-provisioned?
- [ ] Trusted Advisor / Cost Anomaly Detection có cảnh báo gì?
- [ ] Có EBS volume `available` (không gắn), EIP không dùng, snapshot > 1 năm không?
- [ ] Coverage của Savings Plans/RI là bao nhiêu %? Có phần nào đang trả On-Demand ổn định không?
- [ ] Môi trường non-prod có tự tắt ngoài giờ chưa?
- [ ] Log group nào không có retention?
- [ ] S3: có lifecycle policy và rule dọn multipart chưa?
- [ ] Chi phí NAT Gateway và data transfer là bao nhiêu? Có VPC Endpoint chưa?
- [ ] Unit cost tháng này so với tháng trước: tăng hay giảm?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| AWS Cost Explorer + Budgets | Phân tích và cảnh báo ngân sách | https://aws.amazon.com/aws-cost-management/ |
| AWS Compute Optimizer | Gợi ý right-sizing từ metric thật | https://aws.amazon.com/compute-optimizer/ |
| AWS Trusted Advisor | Kiểm tra lãng phí và rủi ro | https://aws.amazon.com/premiumsupport/technology/trusted-advisor/ |
| Infracost | Ước tính chi phí ngay trong pull request | https://www.infracost.io/ |
| OpenCost / Kubecost | Chi phí theo namespace/pod trên K8s | https://www.opencost.io/ |
| Karpenter | Autoscale node tối ưu chi phí trên AWS | https://karpenter.sh/ |

## Tham khảo
- FinOps Foundation — Framework & principles: https://www.finops.org/framework/
- AWS — Cost Optimization Pillar: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html
- AWS — Savings Plans user guide: https://docs.aws.amazon.com/savingsplans/latest/userguide/
- AWS — Data transfer pricing (đọc kỹ phần NAT & cross-AZ): https://aws.amazon.com/ec2/pricing/on-demand/
- *Cloud FinOps* — J.R. Storment & Mike Fuller (O'Reilly)

## Liên kết
[[AWS Well-Architected Framework]] · [[AWS Compute & Auto Scaling]] · [[AWS Storage]] · [[Kubernetes Operations & Security]] · [[DevOps]]
