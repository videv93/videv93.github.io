---
tags: [devops, security, devsecops]
status: growing
---
# DevSecOps

> Bảo mật là **thuộc tính của quy trình**, không phải một cổng kiểm duyệt ở cuối. Ý tưởng "shift-left" đơn giản là: lỗi được phát hiện càng sớm càng rẻ — sửa lúc viết code rẻ hơn sửa lúc review, rẻ hơn nhiều lần sửa ở production.

## 1. Shift-left — chi phí sửa lỗi theo giai đoạn
```
IDE / pre-commit  →  Pull Request  →  CI  →  Staging  →  Production
     1×                  ~5×          ~10×     ~50×        ~100×+
```
Không phải "kiểm tra sớm hơn rồi thôi" — mà là **đưa phản hồi bảo mật vào đúng nơi lập trình viên đang làm việc**, để họ sửa ngay thay vì nhận báo cáo PDF sau ba tuần.

## 2. Bốn nhóm quét, bốn câu hỏi khác nhau
| Loại | Quét cái gì | Trả lời | Công cụ |
|---|---|---|---|
| **SAST** | Mã nguồn tĩnh | Code của tôi có pattern nguy hiểm không? (SQL injection, XSS) | Semgrep, CodeQL, SonarQube |
| **SCA** | Dependency | Thư viện tôi dùng có CVE không? Có license nào cấm không? | Dependabot, Renovate, Snyk, `npm audit` |
| **DAST** | Ứng dụng đang chạy | Tấn công thật vào endpoint có ăn không? | OWASP ZAP, Burp |
| **Secret scanning** | Git repo & lịch sử | Có credential nào bị commit không? | gitleaks, TruffleHog, GitHub secret scanning |
Bổ sung cho hạ tầng: **IaC scanning** (Checkov, tfsec, KICS) và **container scanning** (Trivy, Grype) → [[Container Registry & Image Security]].

> Thực tế quan trọng: **SCA thường tìm ra nhiều rủi ro thật hơn SAST.** Phần lớn code trong ứng dụng hiện đại là dependency của người khác.

## 3. Đặt vào pipeline ở đâu
```
pre-commit hook   → gitleaks, format            (giây, chặn secret ngay)
Pull Request      → SAST (chỉ diff), SCA, IaC scan  (phút, có comment inline)
CI sau build      → image scan, SBOM, ký image
Staging           → DAST, integration security test
Production        → runtime security (Falco), CVE rescan định kỳ
```
**Nguyên tắc phân biệt "chặn" và "cảnh báo":**
- 🔴 **Chặn merge**: secret bị commit, CVE **CRITICAL có bản vá**, IaC mở `0.0.0.0/0` cho port quản trị.
- 🟡 **Cảnh báo, tạo ticket**: CVE MEDIUM/LOW, phát hiện SAST có độ tin cậy thấp.
> Chặn quá nhiều thứ ⇒ team học cách bypass ⇒ toàn bộ chương trình bảo mật mất giá trị. Đây là thất bại phổ biến nhất của DevSecOps.

## 4. Supply chain security
Đây là mặt trận nóng nhất hiện nay (SolarWinds, `event-stream`, `xz-utils`, các đợt tấn công npm/PyPI liên tục).
| Lớp phòng thủ | Việc cần làm |
|---|---|
| **Ghim dependency** | Lockfile commit vào Git; ghim GitHub Action theo **commit SHA**, không theo tag |
| **SBOM** | Sinh cho mọi artifact (Syft) và lưu cùng release |
| **Ký artifact** | Cosign/Sigstore, verify ở admission controller |
| **SLSA levels** | Build có thể tái lập, chạy trên runner cách ly, có provenance |
| **Cách ly runner CI** | Runner tự quản không được có quyền admin và phải ephemeral |
| **Kiểm duyệt nguồn** | Proxy/mirror nội bộ cho npm/PyPI/Docker Hub |
> ⚠️ Rủi ro cụ thể hay bị bỏ qua: `uses: some/action@v3` — tag có thể bị dịch chuyển sang commit độc hại. Ghim `@a1b2c3d...`.

## 5. Runtime & policy
- **Policy as code**: Kyverno/OPA Gatekeeper chặn pod chạy privileged, chặn image không ký, bắt buộc resource limits. → [[Kubernetes Operations & Security]]
- **Runtime detection**: Falco/Tetragon phát hiện hành vi bất thường (shell mở trong container, đọc `/etc/shadow`, kết nối ra ngoài lạ).
- **Zero-trust nội bộ**: NetworkPolicy default-deny + mTLS qua service mesh. → [[Kubernetes Networking]]
- **Threat modeling** cho tính năng mới: đơn giản là hỏi *"kẻ tấn công sẽ làm gì với chức năng này?"* — STRIDE là khung tốt để bắt đầu.

## 6. Cạm bẫy
- ❌ **Bật mọi scanner cùng lúc ở chế độ blocking** → hàng nghìn phát hiện ngày đầu, team tê liệt rồi tắt hết. Bắt đầu bằng: secret scanning (chặn) + CVE CRITICAL (chặn), phần còn lại chỉ cảnh báo.
- ❌ **Không có ai phân loại kết quả** → false positive tích tụ, không ai tin công cụ nữa.
- ❌ **Bảo mật là phòng ban riêng gác cổng cuối** → quay lại chính mô hình DevOps đã xoá bỏ. Security cần là **enabler**: cung cấp template an toàn, thư viện chuẩn, paved road.
- ❌ **Chỉ quét lúc build, không quét lại** → CVE mới xuất hiện trên image cũ mỗi ngày.
- ❌ **Rotate secret bị lộ bằng cách xoá commit** → secret đã ở trong lịch sử, trong log CI, trong cache. **Phải rotate.** → [[Secrets Management]]
- ❌ **Bỏ qua bảo mật của chính pipeline** → CI thường có quyền cao nhất trong tổ chức mà lại được bảo vệ ít nhất.
- ❌ **Tuân thủ (compliance) thay cho bảo mật** → pass audit không có nghĩa là an toàn.

## 7. Checklist DevSecOps
- [ ] Secret scanning chạy ở pre-commit **và** trên toàn bộ lịch sử repo?
- [ ] SCA tự động mở PR cập nhật dependency (Renovate/Dependabot)?
- [ ] SAST chạy trên diff của PR với comment inline, không phải báo cáo hàng tháng?
- [ ] Image scan trong CI, **fail** khi CRITICAL có bản vá?
- [ ] IaC scan (Checkov/tfsec) trên mọi PR hạ tầng?
- [ ] GitHub Actions ghim theo commit SHA?
- [ ] SBOM sinh và lưu cho mọi release?
- [ ] Image được ký và cluster verify chữ ký?
- [ ] Có admission policy chặn workload không đạt chuẩn bảo mật?
- [ ] Có runtime detection ở production?
- [ ] Có quy trình xử lý khi phát hiện lỗ hổng (ai triage, SLA vá theo severity)?
- [ ] Có định kỳ rescan image đang chạy, không chỉ image mới build?

## Công cụ
| Công cụ | Vai trò | Link |
|---|---|---|
| Semgrep | SAST nhanh, viết rule dễ | https://semgrep.dev/ |
| Trivy | Scan image, IaC, secret, SBOM — tất cả trong một | https://trivy.dev/ |
| Renovate / Dependabot | Tự động cập nhật dependency | https://docs.renovatebot.com/ |
| gitleaks | Quét secret trong Git | https://github.com/gitleaks/gitleaks |
| Checkov | Quét IaC đa framework | https://www.checkov.io/ |
| Falco | Phát hiện hành vi bất thường lúc chạy | https://falco.org/ |
| Kyverno | Policy as code cho K8s | https://kyverno.io/ |
| OWASP ZAP | DAST mã nguồn mở | https://www.zaproxy.org/ |

## Tham khảo
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP — DevSecOps Guideline: https://owasp.org/www-project-devsecops-guideline/
- SLSA Framework: https://slsa.dev/
- NIST — Secure Software Development Framework (SSDF, SP 800-218): https://csrc.nist.gov/Projects/ssdf
- CNCF — Cloud Native Security Whitepaper: https://github.com/cncf/tag-security/tree/main/community/resources/security-whitepaper
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/

## Liên kết
[[Secrets Management]] · [[Container Registry & Image Security]] · [[Kubernetes Operations & Security]] · [[AWS Security & Identity]] · [[CI-CD Pipeline]] · [[DevOps]]
