---
tags: [devops, aws, cloud, storage]
status: growing
---
# AWS Storage

> Ba loại lưu trữ, ba bài toán khác nhau: **object** (S3 — file bất biến, truy cập qua API), **block** (EBS — ổ đĩa cho một máy), **file** (EFS — thư mục chia sẻ). Chọn nhầm loại là chi phí và hiệu năng đều sai.

## 1. Bảng chọn nhanh
| | Amazon S3<br>(Simple Storage Service) | Amazon EBS<br>(Elastic Block Store) | Amazon EFS<br>(Elastic File System) |
|---|---|---|---|
| Loại | Object Storage | Block Storage | File System (NFS) |
| Gắn với | Truy cập qua HTTP API, toàn cầu | **Một EC2** tại một thời điểm, trong **một AZ** | Mount đồng thời vào **hàng trăm EC2**, đa AZ |
| Dùng cho | Ảnh, video, backup, data lake, static site, artifact | Ổ Boot, database, dữ liệu cần IOPS cao | Thư mục chia sẻ, CMS, home directory |
| Độ bền | 99.999999999% (11 số 9) | Replicate trong một AZ | Đa AZ |
| Giá tương đối | Rẻ nhất | Trung bình | Đắt nhất |

## 2. Amazon S3 (Simple Storage Service) — Object Storage
Độ bền **99.999999999%** (11 số 9) nhờ replicate qua nhiều thiết bị trong ≥ 3 AZ.

### Storage Classes — chọn theo tần suất truy cập
| Class | Dùng khi | Lưu ý |
|---|---|---|
| **Standard** | Truy cập thường xuyên | Mặc định |
| **Intelligent-Tiering** | Không đoán được pattern truy cập | Tự chuyển tầng, có phí monitoring nhỏ — lựa chọn an toàn nhất |
| Standard-IA / One Zone-IA | Ít truy cập nhưng cần ngay | Phí retrieval; One Zone rẻ hơn nhưng mất khi AZ hỏng |
| **Glacier Instant Retrieval** | Archive nhưng cần lấy tức thì | |
| **Glacier Flexible / Deep Archive** | Archiving dài hạn, tuân thủ pháp lý | Lấy ra mất vài phút → vài giờ; rẻ nhất |

**Lifecycle policy** là công cụ tiết kiệm mạnh nhất:
```
0–30 ngày   → Standard
30–90 ngày  → Standard-IA
90–365 ngày → Glacier Instant
> 365 ngày  → Deep Archive hoặc xoá
```

### Tính năng phải biết
- **Versioning** — chống xoá/ghi đè nhầm. Bật cho mọi bucket quan trọng.
- **Object Lock (WORM)** — chống xoá kể cả bởi admin; là tuyến phòng thủ cuối cùng trước ransomware.
- **Block Public Access** — bật ở cấp **account**, không chỉ cấp bucket.
- **Encryption** — SSE-S3 mặc định; SSE-KMS khi cần kiểm soát và audit khoá. → [[AWS Security & Identity]]
- **Presigned URL** — cho phép upload/download tạm thời mà không cần cấp quyền IAM.
- **S3 Replication** — CRR (cross-region, cho DR) / SRR.
- **Static website + CloudFront + OAC** — bucket private nhưng phục vụ web công khai.

## 3. Amazon EBS (Elastic Block Store) — Block Storage
Ổ đĩa block đính kèm vào EC2 (dùng làm ổ Boot hoặc chứa dữ liệu IOPS cao).
| Loại | Đặc điểm | Dùng cho |
|---|---|---|
| **gp3** | SSD, IOPS và throughput **cấu hình độc lập với dung lượng**, rẻ hơn gp2 ~20% | Mặc định cho gần như mọi thứ |
| gp2 | SSD, IOPS gắn với dung lượng (3 IOPS/GB) | Thế hệ cũ — nên migrate sang gp3 |
| **io2 / io2 Block Express** | IOPS cao, độ bền cao hơn | Database đòi hỏi khắt khe |
| st1 / sc1 | HDD throughput / lạnh | Log, big data tuần tự, backup |

- Volume nằm trong **một AZ**; đổi AZ = snapshot rồi tạo lại.
- **Snapshot** lưu tăng dần (incremental) trên S3; dùng **Data Lifecycle Manager** để tự động hoá + xoá snapshot cũ.
- Mở rộng dung lượng online được, nhưng **không thu nhỏ được**.
- Instance store (NVMe local) nhanh hơn nhiều nhưng **mất dữ liệu khi instance stop** — chỉ dùng làm cache/scratch.

## 4. Amazon EFS (Elastic File System) — File System
File system dùng chung (NFS) có thể mount đồng thời vào hàng trăm EC2 Instance.
- Tự co giãn dung lượng, tính tiền theo lượng dùng thật.
- Storage class: Standard và **EFS-IA** (Infrequent Access) + lifecycle tự chuyển.
- Chế độ: **Elastic throughput** (mặc định mới, hợp tải bất định) / Provisioned / Bursting.
- Là lựa chọn cho `ReadWriteMany` trên EKS. → [[Kubernetes Storage & Configuration]]
> ⚠️ EFS **chậm hơn EBS đáng kể với thao tác nhiều file nhỏ** (metadata qua mạng). Đừng đặt thư mục `node_modules` hay database lên EFS.

## 5. Chuyển dịch dữ liệu
| Dịch vụ | Dùng khi |
|---|---|
| **AWS Storage Gateway** | Nối On-Premises với AWS Cloud (File/Volume/Tape Gateway), lai hybrid |
| **AWS Snow Family** (Snowball, Snowmobile) | Chuyển hàng chục TB → hàng PB khi đường truyền không đủ |
| AWS DataSync | Đồng bộ online NFS/SMB/S3 tốc độ cao |
| AWS Transfer Family | SFTP/FTPS quản lý, đổ vào S3 |

> Quy tắc ngón tay cái: > 10 TB qua đường truyền chậm thì Snowball nhanh hơn Internet.

## 6. Cạm bẫy
- ❌ **Bucket public vô tình** → nguyên nhân rò rỉ dữ liệu số 1 trên cloud. Bật Block Public Access ở cấp account.
- ❌ **Không bật versioning** → một lệnh `aws s3 rm --recursive` sai là mất vĩnh viễn.
- ❌ **Không có lifecycle policy** → trả tiền Standard cho log 3 năm tuổi.
- ❌ **Không dọn incomplete multipart upload** → phần dở dang vẫn tính tiền âm thầm, không hiện trong danh sách object.
- ❌ **Coi snapshot EBS là backup ứng dụng** → snapshot lúc DB đang ghi có thể không nhất quán. Dùng backup của chính DB.
- ❌ **Đặt DB lên EFS** → hiệu năng thảm hoạ.
- ❌ **gp2 cho workload IOPS cao** → nghẽn vì IOPS bị buộc theo dung lượng; gp3 rẻ hơn và linh hoạt hơn.
- ❌ **Quên xoá EBS volume và snapshot mồ côi** sau khi terminate instance.

## 7. Checklist
- [ ] Block Public Access bật ở cấp account?
- [ ] Bucket quan trọng có versioning + MFA Delete / Object Lock?
- [ ] Mọi bucket đều mã hoá at-rest và bắt buộc TLS in-transit (bucket policy `aws:SecureTransport`)?
- [ ] Có lifecycle policy chuyển tầng + xoá multipart dở dang?
- [ ] EBS volume dùng gp3, được mã hoá (bật *encryption by default* cho region)?
- [ ] Snapshot tự động qua DLM, có chính sách giữ/xoá, **đã test restore**?
- [ ] Có bucket/vault backup ở **account khác** để chống ransomware?
- [ ] Đã xem báo cáo Storage Lens / Cost Explorer trong 30 ngày qua? → [[Cloud Cost Optimization]]

## Tham khảo
- AWS Docs — S3 User Guide: https://docs.aws.amazon.com/AmazonS3/latest/userguide/
- AWS Docs — S3 storage classes: https://aws.amazon.com/s3/storage-classes/
- AWS Docs — EBS volume types: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html
- AWS Docs — EFS User Guide: https://docs.aws.amazon.com/efs/latest/ug/
- AWS Docs — S3 security best practices: https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html

## Liên kết
[[AWS Databases]] · [[AWS Compute & Auto Scaling]] · [[Kubernetes Storage & Configuration]] · [[Cloud Cost Optimization]] · [[DevOps]]
