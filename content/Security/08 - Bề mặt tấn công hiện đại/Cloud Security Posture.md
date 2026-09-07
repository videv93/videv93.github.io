---
tags: [security, cloud]
status: growing
---
# Cloud Security Posture

> [!note] Ranh giới với DevOps
> [[AWS Security & Identity]], [[Secrets Management]], [[Container Registry & Image Security]] (DevOps) nói về *cách cấu hình bảo mật cloud từ góc vận hành*. Note này nói từ **phía tấn công và phía đánh giá**: kẻ tấn công tìm gì, và làm sao đánh giá tư thế cloud.

> Trên cloud, nguyên nhân số một của vi phạm **không phải 0-day** — mà là **misconfiguration**. Mô hình đe doạ dịch chuyển: ranh giới không còn là mạng, mà là **danh tính và cấu hình**.

## 1. Shared Responsibility — chỗ trách nhiệm rơi vào khe hở

| Nhà cung cấp lo | Bạn lo |
|---|---|
| Bảo mật *của* cloud (hạ tầng vật lý, hypervisor) | Bảo mật *trên* cloud (cấu hình, danh tính, dữ liệu) |
| Vá dịch vụ managed | Cấu hình đúng dịch vụ đó |

> [!warning] Vi phạm cloud thường rơi vào phần "bạn lo"
> Khách hàng hay giả định cloud provider "lo bảo mật" — nhưng phần lớn vi phạm là do khách hàng cấu hình sai phần *của họ*: S3 bucket public, IAM quá rộng, security group mở. Nhà cung cấp cho công cụ an toàn; dùng sai vẫn thủng.

## 2. Các misconfiguration phổ biến nhất

| Misconfig | Hậu quả |
|---|---|
| **Storage public** (S3, blob) | Rò rỉ dữ liệu — nguyên nhân của rất nhiều vụ lớn |
| **IAM quá rộng** | `*:*`, role quá quyền → leo thang, blast radius lớn |
| **Metadata endpoint lộ** | SSRF → credential IAM — [[SSRF and XXE]] |
| **Security group mở** | Cổng quản trị (SSH/RDP/DB) mở ra Internet |
| **Log tắt** | Không có CloudTrail → mù — [[SIEM and Log Analysis]] |
| **Không MFA cho root/admin** | Chiếm tài khoản dễ |
| **Secret trong code/env** | Key hardcode, `.env` commit — [[Software Supply Chain Attacks]] |
| **Snapshot/AMI public** | Lộ dữ liệu và cấu hình |

## 3. Danh tính là ranh giới mới

Trên cloud, "mạng nội bộ" gần như biến mất; cái quyết định ai chạm được gì là **IAM**. Kẻ tấn công cloud tập trung vào:
- Credential lộ (key trong Git, phishing) → [[Password Attacks and Credential Access]].
- IAM privilege escalation (role có quyền `iam:PassRole`, `sts:AssumeRole` sai).
- Metadata SSRF để lấy credential tạm thời.
- Lateral movement qua trust giữa account/tenant.

Đây là lý do [[Zero Trust Architecture]] sinh ra: khi ranh giới mạng tan, phải xác thực/phân quyền mọi truy cập.

## 4. Nguyên tắc

1. **Least privilege IAM là biện pháp gốc.** Phần lớn blast radius cloud đến từ quyền quá rộng.
2. **Bật logging trước tiên (CloudTrail/audit).** Không log = không phát hiện = không điều tra được.
3. **Bật IMDSv2, chặn metadata SSRF.** Endpoint metadata là mục tiêu SSRF số 1.
4. **Quét cấu hình liên tục (CSPM).** Misconfiguration xuất hiện liên tục khi hạ tầng đổi.
5. **MFA cho mọi tài khoản đặc quyền, không dùng root hằng ngày.**
6. **Đánh giá từ phía tấn công.** Chạy công cụ tấn công cloud để thấy đường leo thang thật, không chỉ checklist.

## 5. Cạm bẫy

- **Giả định provider lo bảo mật.** Phần "trên cloud" là của bạn.
- **IAM `*` cho tiện.** Blast radius khổng lồ khi một credential lộ.
- **Không bật log.** Mù hoàn toàn khi có sự cố.
- **Quên metadata SSRF.** Một SSRF trong app → credential toàn account.
- **Secret trong code.** Key commit vào Git công khai bị quét trong vài phút.
- **Snapshot/bucket public do "tạm thời".** "Tạm" thành vĩnh viễn.
- **Multi-cloud không nhất quán.** Mỗi cloud mô hình IAM khác; cấu hình sai vì áp nhầm.

## 6. Checklist áp dụng

- [ ] IAM có tuân least privilege không? Có role `*:*` nào không?
- [ ] CloudTrail/audit log có bật ở mọi region/account không?
- [ ] IMDSv2 có bật, metadata endpoint có được bảo vệ không?
- [ ] Có storage/snapshot/AMI nào public không?
- [ ] MFA có bật cho root/admin, và root có bị hạn chế dùng không?
- [ ] Có CSPM quét cấu hình liên tục không?
- [ ] Có secret nào hardcode trong code/env/AMI không?
- [ ] Tôi đã đánh giá từ phía tấn công (đường leo thang IAM) chưa?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **Prowler / ScoutSuite** | Đánh giá cấu hình cloud (CSPM mã nguồn mở) |
| **Pacu** | Framework tấn công AWS (phía tấn công) |
| **CloudSploit / Steampipe** | Quét misconfiguration |
| **cartography / CloudMapper** | Bản đồ tài sản và quan hệ cloud |
| **CIS Benchmarks** | Chuẩn cấu hình theo dịch vụ |

## Tham khảo

- [CIS Benchmarks (AWS/Azure/GCP)](https://www.cisecurity.org/cis-benchmarks)
- [OWASP Cloud-Native Security](https://owasp.org/www-project-cloud-native-application-security-top-10/)
- [AWS/Azure/GCP Shared Responsibility Models](https://aws.amazon.com/compliance/shared-responsibility-model/)
- [HackTricks Cloud](https://cloud.hacktricks.xyz/)
- Nền vận hành: [[AWS Security & Identity]] (DevOps)

## Liên kết

[[SSRF and XXE]] · [[Container and Kubernetes Attack Surface]] · [[Zero Trust Architecture]] · [[Software Supply Chain Attacks]] · [[AWS Security & Identity]] · [[Reconnaissance and Enumeration]] · [[Security]]
