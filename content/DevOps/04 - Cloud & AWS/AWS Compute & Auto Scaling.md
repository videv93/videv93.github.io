---
tags: [devops, aws, cloud, compute]
status: growing
---
# AWS Compute & Auto Scaling

> Bốn mô hình compute — EC2, Container, Lambda, và các biến thể serverless — khác nhau ở **ai chịu trách nhiệm phần nào**. Chọn sai không làm hệ thống sập, nhưng làm chi phí vận hành tăng gấp nhiều lần.

## 1. Phổ trách nhiệm
```
EC2            → bạn lo: OS, patch, scaling, HA, runtime
ECS/EKS on EC2 → bạn lo: node, patch node, capacity
Fargate        → bạn lo: container image, resource size
Lambda         → bạn lo: code và cấu hình. Hết.
```
Nguyên tắc chọn: **đi xuống dưới danh sách này đến khi gặp giới hạn kỹ thuật thật sự.** (Đây chính là "Democratize advanced technologies" của [[AWS Well-Architected Framework|Performance Efficiency]].)

## 2. Amazon EC2 (Elastic Compute Cloud) — máy chủ ảo
### Các hình thức mua — đòn bẩy chi phí lớn nhất
| Mô hình | Giảm giá | Cam kết | Dùng cho |
|---|---|---|---|
| **On-Demand** | 0% | Không | Tải khó đoán, môi trường ngắn hạn |
| **Reserved Instances / Savings Plans** | ~30–72% | 1–3 năm | Baseline ổn định (chạy 24/7) |
| **Spot Instances** | tới **90%** | Không, nhưng có thể bị thu hồi trong 2 phút | Batch, CI runner, worker chịu gián đoạn, node K8s stateless |
| Dedicated Host | — | Có | Yêu cầu licensing/tuân thủ |

Chiến lược phổ biến: **baseline bằng Savings Plans + đỉnh tải bằng Spot + phần còn lại On-Demand**.

### Chọn instance family
`m` (cân bằng) · `c` (CPU cao) · `r`/`x` (RAM cao) · `t` (burstable, có CPU credit) · `g`/`p` (GPU) · `i` (NVMe local).
> ⚠️ `t3/t4g` dùng hết CPU credit sẽ bị bóp mạnh — nguyên nhân kinh điển của "server tự nhiên chậm sau vài giờ". Cân nhắc `unlimited` mode (tính thêm tiền) hoặc chuyển sang `m`.
> Họ **Graviton (ARM: `t4g`, `m7g`, `c7g`)** thường rẻ hơn ~20% và hiệu năng/watt tốt hơn — miễn là image build được multi-arch. → [[Dockerfile & Image Optimization]]

## 3. AWS Lambda — serverless compute
Chạy code theo sự kiện (event-driven) mà không cần quản lý máy chủ.
- Trigger: API Gateway, S3, SQS, EventBridge, DynamoDB Stream…
- Tính tiền theo **số lần gọi × thời gian × bộ nhớ cấp phát**. Không chạy = không trả tiền.
- Giới hạn cần nhớ: timeout tối đa **15 phút**, `/tmp` giới hạn, package size giới hạn, RAM tối đa 10GB (CPU tỉ lệ thuận với RAM).
- **Cold start** — đáng kể với JVM/.NET, nhỏ với Go/Python/Node. Giảm bằng *Provisioned Concurrency* (mất tiền) hoặc chọn runtime nhẹ.
> Lambda cực hợp: glue code, xử lý sự kiện, cron, API lưu lượng thấp/bùng nổ. Ít hợp: workload chạy liên tục ở tải cao (khi đó container thường rẻ hơn), tác vụ dài, yêu cầu latency ổn định tuyệt đối.

## 4. Container trên AWS
| Dịch vụ | Bản chất | Chọn khi |
|---|---|---|
| **Amazon ECS** | Điều phối container **native của AWS** | Chỉ ở AWS, muốn đơn giản, tích hợp IAM/ALB sẵn, ít thứ phải vận hành |
| **Amazon EKS** | Kubernetes managed, hỗ trợ chuẩn K8s | Cần hệ sinh thái K8s, đa cloud, đội đã biết K8s → [[Kubernetes Architecture]] |
| **AWS Fargate** | Serverless compute engine **cho container** — chạy ECS/EKS mà **không cần quản lý EC2 Node** | Không muốn vá và scale node; đắt hơn EC2 trên mỗi vCPU nhưng rẻ hơn về công vận hành |
| App Runner | Từ image/repo tới URL public | Prototype, service đơn giản |

> ECS vs EKS: nếu câu trả lời cho "team có ai thạo K8s không?" là *không*, và bạn chỉ ở AWS — **ECS + Fargate** cho ra hệ thống production ổn định nhanh hơn nhiều.

## 5. Auto Scaling & Load Balancing
**AWS Auto Scaling** tự động tăng/giảm số lượng EC2 dựa trên tải; **ALB (Application Load Balancer)** cân bằng traffic **Layer 7** vào ứng dụng.

### Các loại Load Balancer
| LB | Tầng | Đặc điểm |
|---|---|---|
| **ALB** | L7 (HTTP/HTTPS) | Routing theo host/path/header, WebSocket, gRPC, tích hợp WAF & Cognito |
| **NLB** | L4 (TCP/UDP) | Cực nhanh, giữ IP nguồn, static IP, hợp cho TCP thuần |
| GWLB | L3 | Chèn appliance bảo mật |

### Auto Scaling Group — cấu hình đúng
```
Launch Template (AMI, instance type, user-data, SG)
   ↓
ASG: min=2, desired=3, max=12
   ├── Multi-AZ (subnet ở ≥ 2 AZ)
   ├── Health check type: ELB  ← không phải EC2!
   ├── Target Tracking Policy: ALBRequestCountPerTarget = 1000
   └── Instance refresh khi đổi Launch Template
```
| Loại policy | Cách hoạt động | Khuyến nghị |
|---|---|---|
| **Target Tracking** | Giữ một metric ở mức mục tiêu | ✅ Mặc định nên dùng |
| Step Scaling | Bậc thang theo ngưỡng alarm | Khi cần điều khiển chi tiết |
| Scheduled | Theo lịch | Tải có chu kỳ biết trước |
| Predictive | ML dự báo | Tải theo mùa rõ rệt |

> **Health check type = ELB**, không phải EC2: EC2 health check chỉ biết máy còn sống, không biết ứng dụng còn phục vụ được không. Cùng ý tưởng với `readinessProbe` ở [[Kubernetes Operations & Security]].

## 6. Cạm bẫy
- ❌ **Scale up (máy to hơn) thay vì scale out** → chạm trần và không chịu lỗi tốt hơn chút nào.
- ❌ **ASG health check kiểu EC2** → instance "sống" nhưng app chết vẫn nhận traffic mãi.
- ❌ **Không có warm-up / cooldown** → ASG thrashing: liên tục tạo rồi giết instance.
- ❌ **Instance stateful trong ASG** (lưu session/file cục bộ) → scale-in là mất dữ liệu. Tách state ra RDS/ElastiCache/S3.
- ❌ **Spot cho workload không chịu được gián đoạn**, hoặc dùng Spot mà không xử lý sự kiện thu hồi 2 phút.
- ❌ **Lambda gọi vào RDS ở tải cao** → cạn connection pool. Dùng **RDS Proxy**.
- ❌ **Quên tắt môi trường dev ngoài giờ** → trả tiền 24/7 cho thứ dùng 8 tiếng. → [[Cloud Cost Optimization]]
- ❌ **Đóng gói AMI bằng tay** ("golden image thủ công") → dùng Packer + pipeline. → [[Infrastructure as Code]]

## 7. Checklist một compute tier production
- [ ] Chạy trên ≥ 2 AZ, ASG `min ≥ 2`?
- [ ] Health check của ASG/Target Group kiểm tra endpoint ứng dụng thật?
- [ ] Ứng dụng stateless, state đã đẩy ra dịch vụ managed?
- [ ] Có Target Tracking policy với metric phản ánh tải thật (request/target, không chỉ CPU)?
- [ ] AMI/image build tự động, có version, có patch định kỳ?
- [ ] EC2 dùng **IAM Role**, không phải access key nhúng trong máy? → [[AWS Security & Identity]]
- [ ] Truy cập máy qua SSM Session Manager thay vì mở port SSH?
- [ ] Đã đánh giá Savings Plans/Spot cho phần tải ổn định?
- [ ] ALB bật access log và có WAF cho endpoint public?

## Tham khảo
- AWS Docs — EC2 User Guide: https://docs.aws.amazon.com/ec2/
- AWS Docs — Auto Scaling User Guide: https://docs.aws.amazon.com/autoscaling/ec2/userguide/
- AWS Docs — Lambda Developer Guide: https://docs.aws.amazon.com/lambda/latest/dg/
- AWS Docs — ECS vs EKS vs Fargate: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/
- AWS Docs — Elastic Load Balancing: https://docs.aws.amazon.com/elasticloadbalancing/
- AWS — Instance purchasing options: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html

## Liên kết
[[AWS Global Infrastructure & Networking]] · [[AWS Storage]] · [[AWS Databases]] · [[Kubernetes Architecture]] · [[Cloud Cost Optimization]] · [[DevOps]]
