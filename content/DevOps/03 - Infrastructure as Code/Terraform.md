---
tags: [devops, iac, terraform]
status: growing
---
# Terraform

> Công cụ provisioning declarative đa cloud. Ba khái niệm — **provider, resource, state** — giải thích gần như mọi hành vi của nó. Phần khó không phải cú pháp HCL, mà là **state** (→ [[Terraform State & Modules]]).

> ℹ️ Từ 2023 Terraform chuyển sang license BUSL; **OpenTofu** là bản fork mã nguồn mở, tương thích cú pháp, do Linux Foundation quản lý. Mọi kiến thức dưới đây áp dụng cho cả hai.

## 1. Vòng đời làm việc
```bash
terraform init      # tải provider + module, cấu hình backend
terraform fmt -recursive
terraform validate  # kiểm cú pháp và kiểu dữ liệu
terraform plan -out=tfplan   # so state ↔ thực tế ↔ code, in ra diff
terraform apply tfplan       # thi hành đúng plan đã duyệt
terraform destroy            # ⚠️ xoá toàn bộ tài nguyên trong state
```
Đọc plan theo ký hiệu:
| Ký hiệu | Nghĩa | Mức nguy hiểm |
|---|---|---|
| `+` | create | Thấp |
| `~` | update in-place | Thấp–trung bình |
| `-/+` | **replace** (destroy rồi create) | 🔴 Cao — mất dữ liệu, đổi IP, downtime |
| `-` | destroy | 🔴 Cao |

> Quy tắc sống còn: **luôn đọc số cuối** `Plan: 2 to add, 1 to change, 0 to destroy` — bất kỳ số destroy nào ngoài dự kiến là dừng lại.

## 2. Các khối cấu trúc
```hcl
terraform {
  required_version = "~> 1.9"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.60" }   # luôn ghim version
  }
  backend "s3" { ... }   # xem note State & Modules
}

provider "aws" {
  region = var.region
  default_tags { tags = { Environment = var.env, ManagedBy = "terraform" } }
}

variable "instance_type" {
  type        = string
  default     = "t3.small"
  description = "Loại EC2 cho web tier"
  validation {
    condition     = can(regex("^t3\\.", var.instance_type))
    error_message = "Chỉ cho phép họ t3."
  }
}

locals {
  name_prefix = "${var.project}-${var.env}"
}

data "aws_ami" "al2023" {          # data source: đọc thứ đã tồn tại
  most_recent = true
  owners      = ["amazon"]
  filter { name = "name", values = ["al2023-ami-*-x86_64"] }
}

resource "aws_instance" "web" {    # resource: thứ Terraform quản lý vòng đời
  count         = 2
  ami           = data.aws_ami.al2023.id
  instance_type = var.instance_type
  tags          = { Name = "${local.name_prefix}-web-${count.index}" }

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [ami]   # không thay instance chỉ vì có AMI mới
  }
}

output "web_ips" {
  value = aws_instance.web[*].private_ip
}
```

### `count` vs `for_each`
| | `count` | `for_each` |
|---|---|---|
| Địa chỉ | `aws_instance.web[0]` | `aws_instance.web["api"]` |
| Xoá phần tử giữa | **Đánh số lại ⇒ tạo lại các tài nguyên phía sau** 🔴 | Chỉ xoá đúng phần tử đó ✅ |
| Dùng khi | Tập đồng nhất, số lượng thuần tuý | Tập có định danh (map/set) — **mặc định nên chọn cái này** |

## 3. Meta-argument đáng nhớ
- `depends_on` — khi phụ thuộc không suy ra được từ tham chiếu.
- `lifecycle.prevent_destroy = true` — chốt an toàn cho RDS, S3 bucket production.
- `lifecycle.create_before_destroy` — tránh downtime khi phải replace.
- `lifecycle.ignore_changes` — bỏ qua thay đổi do bên ngoài (autoscaling desired_count, tag do tool khác gắn).
- `moved` block — đổi tên/tái cấu trúc resource **không** phải destroy/create.
- `import` block (TF ≥ 1.5) — đưa tài nguyên tạo tay vào quản lý, khai báo được trong code.

## 4. Cạm bẫy
- ❌ **Không ghim version provider** → `terraform init` tuần sau kéo bản mới, plan bỗng đầy thay đổi lạ.
- ❌ **Sửa tay trên Console** rồi apply → Terraform hoàn tác thay đổi đó.
- ❌ **`terraform destroy` nhầm workspace/môi trường** — luôn kiểm tra `terraform workspace show` và profile AWS trước.
- ❌ **Bỏ qua dòng `-/+`** → đổi `subnet_id` của RDS = tạo DB mới, mất dữ liệu.
- ❌ **Secret trong `.tfvars` commit vào Git** → và nhớ: secret dùng trong Terraform **luôn nằm plaintext trong state**.
- ❌ **Dùng `local-exec`/`remote-exec` provisioner làm cấu hình** → phá vỡ tính declarative, không idempotent. Dùng [[Ansible]], cloud-init, hoặc user-data thay thế.
- ❌ **Apply từ máy cá nhân** với credential admin → không có audit, dễ đè lên nhau.
- ❌ **`terraform apply -auto-approve`** ở production.

## 5. Checklist trước khi apply lên production
- [ ] `terraform plan` đã được review bởi người thứ hai (qua PR comment)?
- [ ] Số `to destroy` có đúng như dự kiến không?
- [ ] Có resource nào `-/+ replace` chứa dữ liệu (RDS, EBS, S3) không?
- [ ] Provider và module đều ghim version?
- [ ] Đang ở đúng workspace / đúng AWS account? (`aws sts get-caller-identity`)
- [ ] Tài nguyên trạng thái quan trọng có `prevent_destroy`?
- [ ] Đã chạy `tfsec`/`checkov` chưa?
- [ ] Có kế hoạch rollback (Terraform không có `undo` — rollback = apply lại code cũ)?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| `tflint` | Lint HCL, bắt lỗi provider-specific | https://github.com/terraform-linters/tflint |
| `terraform-docs` | Sinh docs từ variable/output | https://terraform-docs.io/ |
| `tfsec` / Checkov | Quét cấu hình bất an | https://aquasecurity.github.io/tfsec/ |
| Infracost | Ước tính chi phí ngay trong PR | https://www.infracost.io/ |
| Atlantis | Chạy plan/apply từ pull request | https://www.runatlantis.io/ |
| `terragrunt` | Giảm lặp lại khi nhiều môi trường | https://terragrunt.gruntwork.io/ |

## Tham khảo
- Terraform Documentation: https://developer.hashicorp.com/terraform/docs
- Terraform Registry (provider + module chuẩn): https://registry.terraform.io/
- HashiCorp — Terraform style guide: https://developer.hashicorp.com/terraform/language/style
- Yevgeniy Brikman — *Terraform: Up & Running* (3rd ed.)
- OpenTofu: https://opentofu.org/docs/

## Liên kết
[[Infrastructure as Code]] · [[Terraform State & Modules]] · [[AWS Global Infrastructure & Networking]] · [[CI-CD Pipeline]] · [[DevOps]]
