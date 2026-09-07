---
tags: [devops, aws, cloud, networking]
status: growing
---
# AWS Global Infrastructure & Networking

> Mọi quyết định kiến trúc trên AWS bắt đầu từ hai câu hỏi: **đặt ở đâu** (Region/AZ) và **ai gọi được vào** (VPC, Subnet, Security Group). Sai ở tầng này thì không sửa được bằng tầng ứng dụng.

## 1. Hạ tầng toàn cầu
| Khái niệm | Định nghĩa | Hệ quả thiết kế |
|---|---|---|
| **Region** | Vùng địa lý chứa nhiều Availability Zones độc lập (`ap-southeast-1` = Singapore) | Chọn theo độ trễ tới người dùng, luật dữ liệu, giá, và độ sẵn có dịch vụ |
| **Availability Zone (AZ)** | Một hoặc nhiều Data Center cách biệt về **điện, mạng, nước** | **Luôn triển khai ≥ 2 AZ.** Đây là đơn vị chống lỗi cơ bản nhất |
| **Edge Location** | Điểm hiện diện cho dịch vụ CDN, giảm độ trễ (latency) | Dùng cho CloudFront, Route 53, Global Accelerator |
| **Local Zone / Wavelength** | Mở rộng Region tới thành phố / mạng 5G | Workload cần latency cực thấp tại chỗ |

> Giá và tính năng khác nhau giữa Region. Region mới thường thiếu dịch vụ. Data transfer **giữa các AZ có tính tiền** — kiến trúc chatty cross-AZ là một khoản chi phí ẩn phổ biến.

## 2. Amazon VPC (Virtual Private Cloud) — mạng riêng ảo
```
VPC 10.0.0.0/16
├── Public Subnet  10.0.1.0/24  (AZ-a) ──> Internet Gateway
├── Public Subnet  10.0.2.0/24  (AZ-b) ──> Internet Gateway
├── Private Subnet 10.0.11.0/24 (AZ-a) ──> NAT Gateway ──> IGW
├── Private Subnet 10.0.12.0/24 (AZ-b) ──> NAT Gateway ──> IGW
└── DB Subnet      10.0.21.0/24 (AZ-a,b) ──> không ra Internet
```
| Thành phần | Vai trò |
|---|---|
| **Subnet** | Phân đoạn mạng trong VPC, gắn với **đúng một AZ**. `Public Subnet` có route ra Internet Gateway; `Private Subnet` không nối mạng trực tiếp |
| **Route Table** | Bảng định hướng luồng dữ liệu giữa Subnet và các Gateway. *Chính route table quyết định subnet là public hay private*, không phải cái tên |
| **Internet Gateway (IGW)** | Cổng ra/vào Internet hai chiều cho public subnet |
| **NAT Gateway** | Cho tài nguyên trong Private Subnet **đi ra** Internet (update patch, tải library) nhưng **chặn chiều ngược lại** |
| **VPC Endpoint** | Truy cập dịch vụ AWS (S3, ECR, Secrets Manager) không qua Internet — rẻ hơn NAT và an toàn hơn |
| **VPC Peering / Transit Gateway** | Nối nhiều VPC; Transit Gateway là hub khi số VPC lớn |

> 💸 **NAT Gateway đắt**: phí giờ + phí mỗi GB đi qua. Traffic tới S3/ECR nên đi **VPC Endpoint** (Gateway Endpoint cho S3 là miễn phí). Đây thường là một trong 3 dòng lớn nhất của hoá đơn. → [[Cloud Cost Optimization]]

### Thiết kế CIDR
- Chọn `/16` cho VPC và chia `/24` cho subnet là mặc định an toàn.
- **Không để CIDR các VPC chồng nhau** — sau này peering/Transit Gateway sẽ không nối được, và đổi CIDR nghĩa là dựng lại VPC.
- Chừa dư địa: mỗi subnet AWS giữ 5 IP (network, VPC router, DNS, dự phòng, broadcast).
- Với EKS, pod chiếm IP thật trong subnet ⇒ tính dư dả. → [[Kubernetes Networking]]

## 3. Security Group vs Network ACL
| | Security Group | Network ACL |
|---|---|---|
| Cấp độ | **Instance / ENI** | **Subnet** |
| Trạng thái | **Stateful** — cho vào thì tự cho ra | **Stateless** — phải mở cả inbound và outbound |
| Rule | Chỉ có **allow** | Có cả **allow và deny**, xét theo số thứ tự |
| Mặc định | Chặn hết inbound, mở hết outbound | Cho hết hai chiều |
| Dùng chính | Kiểm soát chính hằng ngày | Chặn thô ở biên (block IP xấu) |

**Mẹo quan trọng:** Security Group có thể tham chiếu **Security Group khác** làm nguồn:
```
sg-web   inbound  443 từ 0.0.0.0/0
sg-app   inbound  8080 từ sg-web        ← không cần biết IP
sg-db    inbound  5432 từ sg-app
```
Đây là cách viết firewall theo *vai trò*, không theo IP — bền vững khi hạ tầng co giãn.

## 4. Amazon Route 53 — DNS
Dịch vụ DNS đám mây và quản lý tên miền, hỗ trợ **Routing Policies**:
| Policy | Hành vi | Dùng khi |
|---|---|---|
| Simple | Một bản ghi | Mặc định |
| **Latency** | Trả về endpoint có độ trễ thấp nhất | Multi-region |
| **Failover** | Chuyển sang bản dự phòng khi health check fail | DR active-passive |
| **Geolocation / Geoproximity** | Theo vị trí người dùng | Nội dung theo vùng, tuân thủ pháp lý |
| Weighted | Chia traffic theo tỉ lệ | Canary, A/B → [[Deployment Strategies]] |
| Multivalue | Trả nhiều IP khoẻ mạnh | Load balancing đơn giản |

**Alias record** (đặc thù AWS): trỏ tới ALB/CloudFront/S3 ở **đỉnh domain** (`acme.com`, nơi CNAME không dùng được) và **miễn phí truy vấn**.

## 5. AWS CloudFront — CDN
Mạng phân phối nội dung toàn cầu giúp tăng tốc truyền tải dữ liệu, video, API.
- Cache tại Edge Location gần người dùng ⇒ giảm latency và giảm tải origin.
- Tích hợp **AWS WAF** (chặn tấn công L7), **Shield** (DDoS), **ACM** (TLS cert miễn phí — cert cho CloudFront phải ở region `us-east-1`).
- **Origin Access Control (OAC)** cho phép S3 bucket private mà vẫn phục vụ qua CloudFront.
- Data transfer ra Internet qua CloudFront **rẻ hơn** đi thẳng từ EC2/S3.

## 6. Cạm bẫy
- ❌ **Dùng default VPC ở production** → CIDR trùng lặp, subnet đều public, không kiểm soát được.
- ❌ **Chỉ một AZ** → AZ đó lỗi là toàn bộ hệ thống chết.
- ❌ **Mở `0.0.0.0/0` cho port 22/3389/5432** → bot quét thấy trong vài phút. Dùng SSM Session Manager thay cho SSH bastion.
- ❌ **Một NAT Gateway cho nhiều AZ** → tiết kiệm tiền nhưng tạo single point of failure **và** phát sinh phí cross-AZ. Mỗi AZ một NAT (hoặc chấp nhận rủi ro có ý thức).
- ❌ **Không dùng VPC Endpoint cho S3/ECR** → trả tiền NAT cho traffic lẽ ra miễn phí.
- ❌ **CIDR chồng nhau giữa các VPC/on-prem** → chặn đường mở rộng vĩnh viễn.
- ❌ **Đặt database ở public subnet** "cho dễ kết nối".
- ❌ **Quên bật VPC Flow Logs** → sự cố mạng không có gì để điều tra.

## 7. Checklist thiết kế mạng
- [ ] VPC tự tạo (không dùng default), CIDR đã lên kế hoạch toàn công ty, không chồng lấn?
- [ ] Tối thiểu 2 AZ, mỗi tier (public/app/data) có subnet ở mỗi AZ?
- [ ] Database nằm ở subnet không có route ra Internet?
- [ ] Security Group tham chiếu SG khác thay vì hard-code IP?
- [ ] Không có SG nào mở 0.0.0.0/0 ngoài 80/443?
- [ ] Có VPC Endpoint cho S3, ECR, Secrets Manager, CloudWatch Logs?
- [ ] Bật VPC Flow Logs và gửi về CloudWatch/S3?
- [ ] TLS cert quản lý bằng ACM, tự động gia hạn?
- [ ] Đã kiểm tra chi phí NAT Gateway và cross-AZ transfer trong Cost Explorer?

## Tham khảo
- AWS — Global Infrastructure: https://aws.amazon.com/about-aws/global-infrastructure/
- AWS Docs — VPC User Guide: https://docs.aws.amazon.com/vpc/latest/userguide/
- AWS Docs — Security Groups vs Network ACLs: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-comparison.html
- AWS Docs — Route 53 routing policies: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html
- AWS Docs — CloudFront Developer Guide: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/
- AWS Architecture Center: https://aws.amazon.com/architecture/

## Liên kết
[[AWS Compute & Auto Scaling]] · [[AWS Security & Identity]] · [[AWS Well-Architected Framework]] · [[Cloud Cost Optimization]] · [[Linux & Networking for DevOps]] · [[DevOps]]
