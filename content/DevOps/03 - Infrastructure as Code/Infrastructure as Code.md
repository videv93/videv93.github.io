---
tags: [devops, iac, foundation]
status: growing
---
# Infrastructure as Code

> Hạ tầng được mô tả bằng file text, đưa vào Git, review như code, và áp dụng bằng máy. Mục tiêu thật sự không phải "tự động hoá cho nhanh" — mà là **xoá sạch rồi dựng lại được y hệt**, và biết chính xác production đang có gì.

## 1. Vì sao cần — bốn vấn đề IaC giải quyết
| Vấn đề khi làm tay | IaC giải quyết thế nào |
|---|---|
| **Snowflake server** — mỗi máy một kiểu, không ai nhớ đã sửa gì | Cấu hình nằm trong Git, có lịch sử, có tác giả |
| **Không tái lập được** — mất region là mất vài tuần dựng lại | `apply` lại ở region khác trong vài chục phút |
| **Không có review** — đổi security group bằng vài cú click | Pull request, review, approve như code |
| **Không biết đang có gì** — tài nguyên mồ côi tính tiền âm thầm | State file là bản kiểm kê chính xác → [[Cloud Cost Optimization]] |

## 2. Hai trục phân loại
### a. Declarative vs Imperative
| | Declarative (khai báo) | Imperative (mệnh lệnh) |
|---|---|---|
| Bạn viết | *Kết quả mong muốn*: "phải có 3 EC2" | *Các bước*: "tạo 1 EC2, rồi 1 nữa…" |
| Chạy lại lần 2 | Không làm gì (đã đúng trạng thái) | Tạo thêm 3 cái nữa |
| Ví dụ | Terraform, CloudFormation, Kubernetes YAML | Script `aws cli`, một số playbook viết sai |
> Declarative thắng vì nó **idempotent**: chạy 1 lần hay 100 lần đều ra cùng kết quả.

### b. Provisioning vs Configuration Management
| | Provisioning | Configuration Management |
|---|---|---|
| Trả lời | *Tạo ra* hạ tầng: VPC, EC2, RDS, cluster | *Cấu hình bên trong* máy đã có: cài package, sửa file, chạy service |
| Công cụ | [[Terraform]], CloudFormation, Pulumi, OpenTofu | [[Ansible]], Chef, Puppet, SaltStack |
| Mô hình | Immutable — thay vì sửa, tạo mới rồi xoá cũ | Mutable — sửa tại chỗ, hội tụ về trạng thái đích |

Kết hợp phổ biến: **Terraform dựng hạ tầng → Ansible/cloud-init cấu hình máy → container hoá dần để bớt phần thứ hai.**

## 3. Bốn nguyên tắc cốt lõi
1. **Immutable infrastructure** — không SSH vào sửa. Cần thay đổi ⇒ sửa code ⇒ tạo instance/image mới ⇒ thay thế cái cũ. Đây là nền tảng của container và của Auto Scaling Group.
2. **Idempotency** — apply nhiều lần cho cùng kết quả. Mọi công cụ IaC tốt đều đảm bảo điều này.
3. **Everything in version control** — kể cả pipeline, policy, dashboard, alert rule. Nếu nó không ở trong Git thì nó không tồn tại.
4. **Plan trước Apply** — luôn xem trước diff. `terraform plan` trong PR là bước review quan trọng nhất của IaC.

## 4. Drift — kẻ thù số một
**Drift** = trạng thái thật khác với trạng thái mô tả trong code. Nguyên nhân: ai đó sửa tay trên Console, hoặc dịch vụ tự thay đổi.
Cách chống:
- **Chặn quyền write trên Console** ở tài khoản production; chỉ CI có quyền apply.
- **Chạy `terraform plan` định kỳ** (nightly) và cảnh báo khi diff khác rỗng — drift detection.
- **Import** những gì tạo tay vào state thay vì để hai nguồn sự thật song song.
- Với K8s, drift được xử lý bằng vòng lặp đồng bộ liên tục → [[GitOps]].

## 5. Cạm bẫy
- ❌ **Copy-paste module giữa các môi trường** → sửa một chỗ quên hai chỗ. Dùng module có tham số.
- ❌ **State/secret trong Git** → xem [[Terraform State & Modules]] và [[Secrets Management]].
- ❌ **Một state khổng lồ cho toàn bộ hạ tầng** → `plan` mất 10 phút, một lỗi nhỏ khoá cả team.
- ❌ **IaC nhưng vẫn sửa tay "chỉ lần này thôi"** → drift, và lần apply sau sẽ hoàn tác thay đổi đó vào lúc bất tiện nhất.
- ❌ **Không có môi trường staging cho hạ tầng** → thử nghiệm thay đổi mạng trực tiếp trên prod.
- ❌ **Bỏ qua `plan` output vì nó dài** → đó chính là chỗ dòng `destroy` ẩn nấp.
- ❌ **Dùng IaC cho mọi thứ ngay từ ngày đầu** khi còn chưa hiểu dịch vụ — hãy click thử một lần để hiểu, rồi mới code hoá.

## 6. Checklist một repo IaC lành mạnh
- [ ] `git clone` + `terraform apply` dựng được toàn bộ môi trường từ số 0?
- [ ] State lưu remote, có locking, có versioning, được mã hoá?
- [ ] Mỗi môi trường có state riêng?
- [ ] CI chạy `fmt`, `validate`, `plan` trên mọi PR và post plan vào comment?
- [ ] Apply chỉ chạy từ CI, không từ máy cá nhân?
- [ ] Có quét bảo mật IaC (tfsec/Checkov) trong pipeline? → [[DevSecOps]]
- [ ] Có drift detection định kỳ?
- [ ] Provider và module đều ghim version?
- [ ] Có tag chuẩn (owner, env, cost-center) áp cho mọi tài nguyên?

## Công cụ
| Công cụ | Loại | Link |
|---|---|---|
| Terraform / OpenTofu | Provisioning đa cloud | https://developer.hashicorp.com/terraform · https://opentofu.org/ |
| Pulumi | IaC bằng ngôn ngữ lập trình thật | https://www.pulumi.com/ |
| AWS CloudFormation / CDK | Native AWS | https://docs.aws.amazon.com/cloudformation/ |
| Ansible | Configuration management | https://docs.ansible.com/ |
| Packer | Build machine image bất biến (AMI) | https://developer.hashicorp.com/packer |
| Checkov / tfsec / Terrascan | Quét bảo mật IaC | https://www.checkov.io/ |
| Atlantis / Terraform Cloud | Chạy plan/apply từ PR | https://www.runatlantis.io/ |

## Tham khảo
- Kief Morris — *Infrastructure as Code* (O'Reilly, 2nd ed.)
- HashiCorp — What is Infrastructure as Code: https://developer.hashicorp.com/terraform/intro
- Martin Fowler — Immutable Server & Phoenix Server: https://martinfowler.com/bliki/ImmutableServer.html
- AWS — Operational Excellence Pillar (IaC practices): https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html
- Google — Infrastructure as code with GitOps: https://cloud.google.com/architecture/managing-infrastructure-as-code

## Liên kết
[[Terraform]] · [[Terraform State & Modules]] · [[Ansible]] · [[GitOps]] · [[AWS Well-Architected Framework]] · [[DevOps]]
