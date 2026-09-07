---
tags: [devops, aws, cloud, security, iam]
status: growing
---
# AWS Security & Identity

> IAM là **hệ thần kinh bảo mật của AWS**: mọi API call đều đi qua nó. Hiểu sai IAM thì mọi lớp bảo vệ khác chỉ là trang trí. Ba dịch vụ đi kèm trả lời ba câu hỏi: khoá ở đâu (**KMS**), chuyện gì đang xảy ra (**CloudWatch**), ai đã làm gì (**CloudTrail**).

## 1. AWS IAM (Identity and Access Management) — quản lý quyền truy cập
| Thành phần | Là gì | Ghi chú |
|---|---|---|
| **User** | Danh tính con người/ứng dụng lâu dài | Hạn chế tối đa; ưu tiên SSO (IAM Identity Center) |
| **Group** | Tập hợp User để gán policy chung | Gán quyền qua group, không gán trực tiếp cho user |
| **Role** (`Roles`) | Danh tính **tạm thời**, được *assume* — **cấp quyền cho dịch vụ** (EC2, Lambda, EKS pod) hoặc cho user cross-account | ✅ Cách đúng để cấp quyền cho workload |
| **Policy** | Mã **JSON** định nghĩa `Effect` / `Action` / `Resource` (+ `Condition`) | Có thể gắn vào identity hoặc vào resource |

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "ReadAppBucketOnly",
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": ["arn:aws:s3:::acme-app-prod", "arn:aws:s3:::acme-app-prod/*"],
    "Condition": {
      "Bool": { "aws:SecureTransport": "true" },
      "StringEquals": { "aws:PrincipalTag/Environment": "prod" }
    }
  }]
}
```

### Nguyên tắc: *Least Privilege*
Cấp đúng quyền tối thiểu để hoàn thành công việc, không hơn.
Cách thực hiện được trong thực tế:
1. Bắt đầu bằng policy hẹp, mở rộng dần khi có lỗi `AccessDenied` cụ thể.
2. Dùng **IAM Access Analyzer** để sinh policy từ log CloudTrail thực tế.
3. Dùng **SCP (Service Control Policy)** ở tầng AWS Organizations làm trần quyền cho cả account (ví dụ: cấm tạo tài nguyên ngoài region cho phép).
4. Dùng **permission boundary** để giới hạn quyền tối đa mà một role có thể tự cấp.

### Cách một request được đánh giá
```
Explicit DENY ở bất kỳ đâu  → TỪ CHỐI (thắng tất cả)
   ↓ không có
SCP có cho phép không?      → không → TỪ CHỐI
   ↓ có
Có ALLOW ở identity/resource policy? → không → TỪ CHỐI (mặc định deny)
   ↓ có
→ CHO PHÉP
```

### Bảy quy tắc IAM
1. **Không dùng root account** cho việc hằng ngày; bật MFA phần cứng, khoá đi.
2. **Không tạo access key dài hạn** — dùng Role + STS. Với CI dùng **OIDC federation** (GitHub Actions → IAM Role, không cần secret nào). → [[CI-CD Pipeline]]
3. **MFA bắt buộc** cho mọi người dùng.
4. **Nhiều account** (Organizations): prod / staging / dev / security tách biệt — ranh giới bảo mật mạnh nhất trên AWS.
5. **Role cho workload**: EC2 instance profile, Lambda execution role, **IRSA / EKS Pod Identity** cho pod K8s.
6. **Rà soát định kỳ**: IAM Credential Report, Access Advisor (quyền nào chưa từng dùng thì gỡ).
7. **Đặt tên và tag** role/policy theo chuẩn để biết ai sở hữu.

## 2. AWS KMS (Key Management Service) — quản lý khoá mã hoá
Dịch vụ quản lý khoá mã hoá dữ liệu (**encryption at rest / in transit**).
- **AWS-managed key** (miễn phí, ít kiểm soát) vs **Customer-managed key / CMK** (tính tiền theo khoá + API call, có key policy, rotation, audit riêng).
- **Envelope encryption**: KMS mã hoá data key, data key mã hoá dữ liệu ⇒ mã hoá được khối lượng lớn hiệu quả.
- **Key policy** là nguồn quyền chính của khoá — IAM policy không tự đủ để dùng khoá.
- Bật **automatic key rotation** hằng năm.
- Xoá khoá có **thời gian chờ 7–30 ngày** — mất khoá là mất vĩnh viễn dữ liệu đã mã hoá.

## 3. AWS CloudWatch — giám sát
Giám sát metrics, thu thập logs và thiết lập cảnh báo (**Alarms**).
- **Metrics** — mặc định 5 phút; *detailed monitoring* 1 phút; **custom metric** cho chỉ số nghiệp vụ.
- ⚠️ **RAM và disk của EC2 không có sẵn** — phải cài CloudWatch Agent.
- **Logs** — Log Group / Log Stream; **luôn đặt retention** (mặc định là *Never expire* = trả tiền vĩnh viễn).
- **Logs Insights** — truy vấn log bằng ngôn ngữ riêng.
- **Alarms** → SNS → email/Slack/PagerDuty; **Composite Alarm** để giảm nhiễu.
- **EventBridge** — bus sự kiện, phản ứng tự động với thay đổi tài nguyên.
> So sánh và cách thiết kế alert có ý nghĩa: [[Metrics & Prometheus]] và [[Observability]].

## 4. AWS CloudTrail — audit
Ghi lại nhật ký **toàn bộ API call** trong tài khoản AWS để audit và kiểm tra an ninh.
- Bật **organization trail**, ghi vào **S3 bucket ở account security riêng**, bật Object Lock ⇒ kẻ tấn công không xoá được dấu vết.
- **Management events** (mặc định) vs **Data events** (S3 object, Lambda invoke — tốn tiền, bật có chọn lọc).
- **CloudTrail Lake / Athena** để truy vấn lịch sử.
- Câu hỏi CloudTrail trả lời: *"Ai đã xoá security group lúc 3h sáng?"*

### Bộ dịch vụ bảo mật nên bật ngay
| Dịch vụ | Trả lời câu hỏi |
|---|---|
| **GuardDuty** | Có hành vi bất thường/độc hại nào không? (bật là chạy, chi phí thấp) |
| **AWS Config** | Cấu hình có lệch chuẩn tuân thủ không? Lịch sử thay đổi tài nguyên? |
| **Security Hub** | Tổng hợp phát hiện từ mọi dịch vụ theo chuẩn CIS/AWS FSBP |
| **Inspector** | EC2/ECR/Lambda có CVE nào? → [[Container Registry & Image Security]] |
| **Macie** | Có dữ liệu nhạy cảm (PII) trong S3 không? |
| **WAF + Shield** | Chặn tấn công L7 và DDoS |

## 5. Cạm bẫy
- ❌ **Access key trong code/Git** → nguyên nhân #1 của tài khoản bị chiếm. Bot quét GitHub trong vài giây. Nếu lỡ: **rotate ngay**, kiểm CloudTrail, giả định đã bị dùng.
- ❌ **Gắn `AdministratorAccess` "tạm thời"** rồi quên gỡ.
- ❌ **Không bật MFA cho root**.
- ❌ **CloudTrail ghi vào bucket cùng account** → kẻ tấn công có quyền admin sẽ xoá log.
- ❌ **Không đặt retention cho CloudWatch Logs** → hoá đơn log tăng đều mãi mãi.
- ❌ **Wildcard `"Resource": "*"` + `"Action": "s3:*"`** trong policy production.
- ❌ **Nhầm resource policy với identity policy** — S3 bucket policy, KMS key policy có thể chặn kể cả khi IAM cho phép.
- ❌ **Một AWS account cho tất cả môi trường** → không có ranh giới thật giữa dev và prod.

## 6. Checklist bảo mật account
- [ ] Root account: MFA bật, không có access key, không dùng hằng ngày?
- [ ] Dùng IAM Identity Center (SSO) thay cho IAM user cá nhân?
- [ ] Không còn access key dài hạn nào cho CI (đã chuyển sang OIDC)?
- [ ] Workload dùng Role, không dùng key nhúng?
- [ ] Multi-account với SCP chặn hành vi nguy hiểm?
- [ ] CloudTrail bật ở mọi region, ghi sang account security, bật Object Lock?
- [ ] GuardDuty + Security Hub + Config bật?
- [ ] Mọi dữ liệu mã hoá at-rest bằng KMS, có rotation?
- [ ] CloudWatch Logs có retention hợp lý cho từng log group?
- [ ] Có billing alarm và anomaly detection? → [[Cloud Cost Optimization]]
- [ ] Có rà soát quyền chưa dùng (Access Advisor) định kỳ hằng quý?

## Tham khảo
- AWS Docs — IAM User Guide & best practices: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
- AWS Docs — How IAM policies are evaluated: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html
- AWS Docs — KMS Developer Guide: https://docs.aws.amazon.com/kms/latest/developerguide/
- AWS Docs — CloudTrail User Guide: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/
- AWS — Security Pillar whitepaper: https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html
- AWS — Startup Security Baseline: https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-startup-security-baseline/welcome.html

## Liên kết
[[AWS Well-Architected Framework]] · [[AWS Global Infrastructure & Networking]] · [[Secrets Management]] · [[DevSecOps]] · [[Observability]] · [[DevOps]]
