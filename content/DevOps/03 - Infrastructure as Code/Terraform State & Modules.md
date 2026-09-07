---
tags: [devops, iac, terraform, state]
status: growing
---
# Terraform State & Modules

> State là **bộ nhớ** của Terraform — cầu nối giữa code và tài nguyên thật. Gần như mọi sự cố nghiêm trọng với Terraform đều là sự cố về state. Module là cách giữ code không phình ra khi hạ tầng lớn dần.

## 1. State file làm gì
1. **Ánh xạ** `aws_instance.web` trong code ↔ `i-0abc123` ngoài thực tế.
2. Lưu **metadata & dependency** để tính thứ tự tạo/xoá.
3. Làm **cache thuộc tính** để `plan` nhanh hơn.

> 🚨 State chứa **mọi giá trị**, kể cả password RDS, private key, token — ở dạng **plaintext**. Vì thế: không bao giờ commit state vào Git, luôn mã hoá, luôn giới hạn quyền đọc.

## 2. Remote backend — bắt buộc khi làm nhóm
```hcl
terraform {
  backend "s3" {
    bucket       = "acme-tfstate-prod"
    key          = "network/terraform.tfstate"
    region       = "ap-southeast-1"
    encrypt      = true
    use_lockfile = true          # locking bằng S3 (TF ≥ 1.10, thay cho DynamoDB)
    # dynamodb_table = "tf-locks"  # cách cũ, vẫn dùng được
  }
}
```
Ba tính chất bắt buộc của backend production:
| Tính chất | Vì sao |
|---|---|
| **Locking** | Hai người apply cùng lúc ⇒ state hỏng, tài nguyên trùng |
| **Versioning** | State hỏng thì khôi phục bản trước — chốt an toàn cuối cùng |
| **Encryption + IAM chặt** | State là kho secret |

## 3. Chia state — quy tắc "blast radius"
❌ Một state cho toàn bộ công ty → `plan` 10 phút, một lỗi khoá cả team, và một `destroy` nhầm là xoá tất cả.
✅ Chia theo **tốc độ thay đổi** và **quyền sở hữu**:
```
tfstate/
├── prod/network/terraform.tfstate      # VPC, subnet — hiếm đổi
├── prod/data/terraform.tfstate         # RDS, S3 — hiếm đổi, rất nguy hiểm
├── prod/platform/terraform.tfstate     # EKS cluster, IAM
└── prod/apps/api/terraform.tfstate     # đổi hằng ngày
```
Nối các state bằng `data "terraform_remote_state"` hoặc — **tốt hơn** — bằng data source tra cứu theo tag/tên, để giảm phụ thuộc cứng:
```hcl
data "aws_vpc" "main" {
  tags = { Name = "prod-vpc" }
}
```

### Workspace vs thư mục riêng
| | `terraform workspace` | Thư mục/state riêng cho mỗi env |
|---|---|---|
| Ưu | Nhanh, ít lặp | Cách ly thật, khác biệt giữa env thể hiện rõ ràng |
| Nhược | **Cùng backend, cùng code** — dễ apply nhầm env; khó khi env khác cấu trúc | Lặp code hơn (giải bằng module) |
| Khuyến nghị | Cho biến thể ngắn hạn (feature env) | **Cho dev/staging/prod** |

## 4. Lệnh thao tác state (dùng cẩn thận)
```bash
terraform state list                       # liệt kê resource trong state
terraform state show aws_instance.web      # xem chi tiết
terraform state mv <from> <to>             # đổi địa chỉ — ưu tiên dùng `moved` block trong code
terraform state rm aws_instance.web        # bỏ khỏi quản lý, KHÔNG xoá tài nguyên thật
terraform import aws_instance.web i-0abc123   # đưa tài nguyên có sẵn vào state
terraform force-unlock <LOCK_ID>           # ⚠️ chỉ khi chắc chắn không ai đang apply
terraform refresh                          # đồng bộ state với thực tế (nay là -refresh-only)
terraform plan -refresh-only               # phát hiện drift mà không thay đổi gì
```
> Luôn **backup state** trước mọi thao tác `state mv/rm/import`: `terraform state pull > backup.tfstate`.

## 5. Module — đóng gói và tái dùng
```
modules/
└── ecs-service/
    ├── main.tf
    ├── variables.tf     # input — API của module
    ├── outputs.tf       # output — thứ module trả ra
    ├── versions.tf
    └── README.md
```
```hcl
module "api" {
  source  = "git::https://github.com/acme/tf-modules.git//ecs-service?ref=v1.4.0"  # ghim ref!
  name          = "api"
  cpu           = 512
  memory        = 1024
  desired_count = var.env == "prod" ? 4 : 1
  subnet_ids    = data.aws_subnets.private.ids
}
```
**Nguyên tắc thiết kế module:**
1. **Một module = một khối kiến trúc có nghĩa** (một VPC, một ECS service), không phải một resource lẻ (`aws_s3_bucket` bọc lại chẳng thêm giá trị gì).
2. **Không hard-code** account id, region, tên môi trường bên trong module.
3. **Không đặt `provider` block trong module** — provider phải do root truyền xuống.
4. **Luôn ghim `?ref=` hoặc `version =`** — module không ghim là bom hẹn giờ.
5. **Output đủ để nối module khác** — id, arn, name.
6. **README + `terraform-docs`** sinh bảng input/output tự động.
7. **Ưu tiên module cộng đồng đã trưởng thành** (`terraform-aws-modules/vpc/aws`) trước khi tự viết.

## 6. Cạm bẫy
- ❌ **Commit `terraform.tfstate` vào Git** → lộ secret + conflict merge không thể giải.
- ❌ **Không có locking** → hai apply song song làm state mất đồng bộ với thực tế.
- ❌ **`terraform state rm` nhầm** → tài nguyên thành mồ côi, vẫn chạy, vẫn tính tiền, không ai quản.
- ❌ **`force-unlock` khi người khác đang apply thật** → state hỏng nghiêm trọng nhất.
- ❌ **Module quá tổng quát** với 60 biến và đầy `count = var.enabled ? 1 : 0` → khó hiểu hơn viết thẳng.
- ❌ **`source` trỏ nhánh `main`** → mỗi lần `init` là một phiên bản khác.
- ❌ **Xoá resource khỏi code mà quên nó vẫn nằm trong state** → lần apply sau sẽ destroy nó (đôi khi đúng, đôi khi thảm hoạ).

## 7. Checklist
- [ ] State ở remote backend, bật versioning + encryption + locking?
- [ ] Quyền đọc state chỉ cấp cho CI và một nhóm nhỏ?
- [ ] State được chia theo blast radius, mỗi env một state riêng?
- [ ] `.gitignore` có `*.tfstate*`, `.terraform/`, `*.tfvars` chứa secret?
- [ ] Mọi module ghim version/ref cụ thể?
- [ ] Có backup state trước khi làm `state mv/rm/import`?
- [ ] Có job `plan -refresh-only` định kỳ để phát hiện drift?
- [ ] Đổi tên resource dùng `moved` block thay vì destroy/create?

## Tham khảo
- Terraform Docs — State: https://developer.hashicorp.com/terraform/language/state
- Terraform Docs — Backend configuration (S3): https://developer.hashicorp.com/terraform/language/backend/s3
- Terraform Docs — Modules & standard structure: https://developer.hashicorp.com/terraform/language/modules/develop
- Terraform Docs — `moved` and `import` blocks: https://developer.hashicorp.com/terraform/language/moved
- Gruntwork — How to manage Terraform state: https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa

## Liên kết
[[Terraform]] · [[Infrastructure as Code]] · [[Secrets Management]] · [[CI-CD Pipeline]] · [[DevOps]]
