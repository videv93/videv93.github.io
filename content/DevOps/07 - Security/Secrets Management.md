---
tags: [devops, security, secrets]
status: growing
---
# Secrets Management

> Secret bị lộ là loại sự cố **không thể rollback**: bạn không lấy lại được cái đã bị đọc. Vì thế chiến lược đúng không phải "giấu thật kỹ", mà là **giảm thời gian sống của secret và tự động hoá việc thay nó**.

## 1. Thang tiến hoá — bạn đang ở đâu?
| Mức | Cách làm | Đánh giá |
|---|---|---|
| 0 | Hard-code trong source | 🔴 Thảm hoạ |
| 1 | File `.env` trong Git | 🔴 Vẫn là hard-code, chỉ đổi tên file |
| 2 | `.env` ngoài Git, chia sẻ qua chat | 🟠 Không audit, không rotate, lan truyền không kiểm soát |
| 3 | Biến môi trường từ CI secret store | 🟡 Chấp nhận được, nhưng vẫn là secret dài hạn |
| 4 | Secret manager (Vault, AWS SM) + inject lúc runtime | 🟢 Tốt: có audit, có rotation |
| 5 | **Dynamic secret ngắn hạn + identity-based auth (OIDC/IRSA)** | 🟢🟢 Đích đến: không có secret dài hạn nào tồn tại |

> Mục tiêu cuối không phải "quản lý secret tốt hơn" mà là **có ít secret hơn**. IAM Role cho EC2, IRSA cho pod, OIDC cho GitHub Actions — đều là cách xoá bỏ secret thay vì cất giữ nó.

## 2. Ba nguyên tắc
1. **Secret không bao giờ ở trạng thái nghỉ trong Git, image, hay log.**
2. **Mỗi secret có thời hạn** — dynamic credential 1 giờ tốt hơn static credential 1 năm.
3. **Rotation phải tự động** — quy trình rotate thủ công nghĩa là quy trình sẽ không được thực hiện.

## 3. Công cụ theo bối cảnh
| Bối cảnh | Giải pháp | Ghi chú |
|---|---|---|
| AWS | **Secrets Manager** (có auto-rotation, đắt hơn) hoặc **Parameter Store** (rẻ, đủ dùng cho config) | → [[AWS Security & Identity]] |
| Đa cloud / on-prem | **HashiCorp Vault** | Mạnh nhất: dynamic secret, PKI, transit encryption |
| Kubernetes | **External Secrets Operator** đồng bộ từ Vault/AWS vào K8s Secret | → [[Kubernetes Storage & Configuration]] |
| GitOps (secret phải nằm trong Git) | **SOPS + age/KMS** hoặc **Sealed Secrets** | Mã hoá trước khi commit → [[GitOps]] |
| CI/CD | **OIDC federation** — không lưu secret nào | → [[CI-CD Pipeline]] |
| Local dev | `direnv` + `.env` đã gitignore, hoặc `aws-vault` | Không dùng chung secret production |

### Vault dynamic secret — ý tưởng cốt lõi
Thay vì cấp cho ứng dụng một mật khẩu database cố định, Vault **tạo user database mới cho mỗi lần request**, với TTL 1 giờ, rồi tự xoá.
- Lộ credential ⇒ nó hết hạn trong vòng một giờ.
- Audit log biết chính xác ai lấy credential nào, lúc nào.
- Không còn khái niệm "rotate mật khẩu DB" — nó tự rotate liên tục.

## 4. K8s Secret — nói rõ một lần
```bash
kubectl get secret db -o jsonpath='{.data.password}' | base64 -d   # đọc trong 2 giây
```
**base64 là mã hoá biểu diễn, không phải mã hoá bảo mật.** Để K8s Secret thật sự an toàn cần:
- [ ] Bật `EncryptionConfiguration` để etcd mã hoá at-rest (mặc định **không** bật).
- [ ] RBAC hạn chế nghiêm ngặt ai được `get`/`list` secrets trong namespace production.
- [ ] Không mount secret vào pod không cần nó; tắt `automountServiceAccountToken`.
- [ ] Ưu tiên **External Secrets Operator** hoặc **CSI Secrets Store driver** để secret không nằm lâu trong etcd.

## 5. Khi secret bị lộ — quy trình khẩn cấp
```
1. ROTATE NGAY          — tạo credential mới, vô hiệu hoá cái cũ. Đây là bước ĐẦU TIÊN.
2. Đánh giá phạm vi     — secret này mở được gì? Ai có thể đã đọc?
3. Kiểm tra log truy cập — CloudTrail/audit log: có ai đã dùng nó không?
4. Dọn khỏi lịch sử     — git-filter-repo, xoá cache CI, xoá build artifact
5. Postmortem           — vì sao lọt được? thêm scanner/pre-commit hook nào?
```
> ❌ Sai lầm phổ biến: `git commit --amend` hoặc xoá file rồi coi như xong. **Secret đã ở trong lịch sử Git, trong log CI, trong cache của runner, và có thể đã bị bot quét.** Không rotate = chưa xử lý gì cả.
> Thực tế: secret commit lên public GitHub bị bot quét và sử dụng **trong vòng vài phút**.

## 6. Cạm bẫy
- ❌ **Secret trong Docker `ARG`/`ENV`** → nằm vĩnh viễn trong layer, `docker history` đọc được. Dùng `RUN --mount=type=secret`. → [[Dockerfile & Image Optimization]]
- ❌ **Secret trong `terraform.tfvars` hoặc trong state** → state luôn plaintext. → [[Terraform State & Modules]]
- ❌ **In secret ra log khi debug** → log thường có nhiều người xem hơn database.
- ❌ **Dùng chung một secret cho mọi môi trường** → lộ ở dev là lộ ở prod.
- ❌ **Chia sẻ secret qua Slack/email** → lưu vĩnh viễn ở nơi không kiểm soát.
- ❌ **Secret không có ngày hết hạn** → tồn tại nhiều năm sau khi người tạo đã nghỉ việc.
- ❌ **Không phân biệt config và secret** → nhét cả hai vào một chỗ rồi phải bảo vệ quá mức hoặc bảo vệ quá ít.
- ❌ **Ứng dụng đọc secret một lần lúc khởi động** → rotation không có tác dụng cho tới lần restart tiếp theo. App phải reload được.

## 7. Checklist
- [ ] Có secret scanning trên toàn bộ lịch sử Git (không chỉ commit mới)?
- [ ] Pre-commit hook chặn secret trước khi nó rời máy dev?
- [ ] Không còn access key AWS dài hạn nào trong CI (đã dùng OIDC)?
- [ ] Workload dùng identity (IAM Role/IRSA), không dùng credential nhúng?
- [ ] Secret database có auto-rotation?
- [ ] K8s: etcd mã hoá at-rest, RBAC hạn chế `get secrets`?
- [ ] Secret trong GitOps repo được mã hoá bằng SOPS/Sealed Secrets?
- [ ] Có audit log cho việc truy cập secret?
- [ ] Có quy trình viết ra cho tình huống lộ secret, và mọi người biết bước 1 là **rotate**?
- [ ] Ứng dụng reload được secret mới mà không cần deploy lại?
- [ ] Secret dev/staging/prod hoàn toàn tách biệt?

## Công cụ
| Công cụ | Vai trò | Link |
|---|---|---|
| HashiCorp Vault | Secret manager, dynamic secret, PKI | https://developer.hashicorp.com/vault |
| AWS Secrets Manager / Parameter Store | Managed trên AWS | https://docs.aws.amazon.com/secretsmanager/ |
| External Secrets Operator | Đồng bộ secret vào K8s | https://external-secrets.io/ |
| SOPS + age | Mã hoá file secret để commit an toàn | https://github.com/getsops/sops |
| Sealed Secrets | Secret mã hoá bằng public key của cluster | https://sealed-secrets.netlify.app/ |
| gitleaks / TruffleHog | Quét secret trong repo và lịch sử | https://github.com/gitleaks/gitleaks |
| `aws-vault` / `direnv` | Quản lý credential ở máy dev | https://github.com/99designs/aws-vault |

## Tham khảo
- HashiCorp Vault — Documentation & dynamic secrets: https://developer.hashicorp.com/vault/docs/secrets
- Kubernetes Docs — Good practices for Kubernetes Secrets: https://kubernetes.io/docs/concepts/security/secrets-good-practices/
- Kubernetes Docs — Encrypting Confidential Data at Rest: https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/
- OWASP — Secrets Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- GitHub Docs — Configuring OIDC in AWS: https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
- AWS — Secrets Manager rotation: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html

## Liên kết
[[DevSecOps]] · [[AWS Security & Identity]] · [[Kubernetes Storage & Configuration]] · [[GitOps]] · [[Terraform State & Modules]] · [[DevOps]]
