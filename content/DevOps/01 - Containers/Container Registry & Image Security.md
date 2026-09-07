---
tags: [devops, container, security, supply-chain]
status: growing
---
# Container Registry & Image Security

> Registry là **kho artifact của toàn bộ pipeline**. Nếu ai đó đẩy được image độc vào đó, mọi lớp bảo mật phía sau đều vô nghĩa — vì chính bạn sẽ tự tay deploy nó.

## 1. Registry — chọn cái nào
| Registry | Đặc điểm | Khi nào chọn |
|---|---|---|
| Docker Hub | Phổ biến, có rate limit cho anonymous pull | Public image, dự án nhỏ |
| Amazon ECR | Tích hợp IAM, scan sẵn, gần EKS | Đang ở AWS → [[AWS Security & Identity]] |
| GitHub Container Registry (ghcr.io) | Gắn với repo và GitHub Actions | CI trên GitHub |
| GitLab Container Registry | Đi kèm GitLab CI | CI trên GitLab |
| Harbor | Self-hosted, có scan + signing + replication | On-prem, yêu cầu tuân thủ |

> ⚠️ **Rate limit Docker Hub** là nguyên nhân kinh điển làm CI/cluster fail hàng loạt lúc cao điểm. Giải pháp: pull-through cache hoặc mirror image nền vào registry riêng.

## 2. Chiến lược tag — quy tắc vàng
```
myorg/api:1.4.2              ✅ semantic version, bất biến
myorg/api:1.4.2-a3f9c1d      ✅ version + git sha, truy vết tuyệt đối
myorg/api@sha256:9f2a…       ✅ digest — không thể giả mạo, dùng cho production manifest
myorg/api:main               ⚠️ tag di động, chỉ cho môi trường dev
myorg/api:latest             ❌ không bao giờ ở production
```
Nguyên tắc:
1. **Tag production là bất biến** — không bao giờ build đè lên một tag đã tồn tại. Bật *tag immutability* trên registry (ECR/Harbor hỗ trợ).
2. **Build một lần, deploy nhiều nơi** — cùng một digest đi qua dev → staging → prod. Build lại cho từng môi trường là phá vỡ đảm bảo "cái đã test chính là cái đang chạy". → [[CI-CD Pipeline]]
3. Gắn `git sha` vào tag hoặc label để truy về đúng commit.

## 3. Bốn lớp phòng thủ cho image
| Lớp | Trả lời câu hỏi | Công cụ |
|---|---|---|
| **Scan CVE** | Image có lỗ hổng đã biết không? | Trivy, Grype, Snyk, ECR scanning |
| **SBOM** | Trong image có chính xác những package nào? | Syft, `docker sbom` |
| **Signing & attestation** | Image này có đúng do pipeline của ta build không? | Cosign / Sigstore, Notary v2 |
| **Admission policy** | Cluster có từ chối image không đạt chuẩn không? | Kyverno, OPA Gatekeeper, Ratify |

```bash
# Scan trong CI, fail pipeline nếu có lỗi nghiêm trọng
trivy image --severity HIGH,CRITICAL --exit-code 1 myorg/api:1.4.2

# Sinh SBOM
syft myorg/api:1.4.2 -o spdx-json > sbom.json

# Ký và xác minh (keyless, dùng OIDC của CI)
cosign sign myorg/api@sha256:9f2a…
cosign verify --certificate-identity-regexp '.*' myorg/api@sha256:9f2a…
```

## 4. Làm cứng image
1. **Non-root** — `USER app` và `runAsNonRoot: true` trong K8s.
2. **Read-only root filesystem** — `readOnlyRootFilesystem: true`, ghi vào `emptyDir` nếu cần.
3. **Drop capabilities** — `capabilities.drop: ["ALL"]`, chỉ thêm lại cái thật sự cần.
4. **Base image tối giản** — distroless/slim → ít package = ít CVE. → [[Dockerfile & Image Optimization]]
5. **Rebuild định kỳ** — CVE mới xuất hiện trên image cũ dù code không đổi. Lên lịch rebuild + rescan hằng tuần.
6. **Pin base image theo digest** trong Dockerfile để chặn tấn công thay tag.

## 5. Cạm bẫy
- ❌ **Scan một lần lúc build rồi thôi** → image chạy 8 tháng, CVE mới không ai biết.
- ❌ **Bật scan nhưng không fail pipeline** → báo cáo đẹp, không ai đọc.
- ❌ **Fail mọi CVE kể cả LOW** → team học cách bỏ qua toàn bộ cảnh báo. Chỉ chặn HIGH/CRITICAL *có bản vá*, còn lại đưa vào backlog.
- ❌ **Registry credential nằm trong image hoặc trong Git** → dùng short-lived token / IAM role.
- ❌ **Không có lifecycle policy** → registry phình vài TB, tiền lưu trữ tăng đều. Đặt rule giữ N image gần nhất + mọi image đang chạy.
- ❌ **Pull image công khai bất kỳ vào production** (`some-random/nginx`) → typosquatting là thật. Chỉ dùng official/verified image hoặc mirror nội bộ.

## 6. Checklist supply chain
- [ ] Tag production bất biến và bật tag immutability trên registry?
- [ ] Cùng một digest đi qua tất cả các môi trường?
- [ ] CI có bước scan CVE và **fail** khi CRITICAL có bản vá?
- [ ] Image được ký, và cluster có admission policy chỉ nhận image đã ký?
- [ ] SBOM được sinh và lưu cùng artifact?
- [ ] Base image ghim theo digest, có job rebuild định kỳ?
- [ ] Registry có lifecycle policy dọn image cũ?
- [ ] Quyền push vào registry chỉ cấp cho CI, không cấp cho cá nhân?
- [ ] Có mirror/cache cho image nền để không phụ thuộc rate limit Docker Hub?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Trivy | Scan image/IaC/secret, nhanh, miễn phí | https://trivy.dev/ |
| Grype + Syft | Scan CVE + sinh SBOM | https://github.com/anchore/grype |
| Cosign (Sigstore) | Ký image keyless bằng OIDC | https://docs.sigstore.dev/cosign/ |
| Harbor | Registry self-hosted có scan + policy | https://goharbor.io/ |
| Kyverno / OPA Gatekeeper | Admission policy trên K8s | https://kyverno.io/ · https://open-policy-agent.github.io/gatekeeper/ |

## Tham khảo
- SLSA — Supply chain levels for software artifacts: https://slsa.dev/
- Sigstore documentation: https://docs.sigstore.dev/
- NIST SP 800-190 — Application Container Security Guide: https://csrc.nist.gov/pubs/sp/800/190/final
- CIS Docker Benchmark: https://www.cisecurity.org/benchmark/docker
- Docker Docs — Content trust & image security: https://docs.docker.com/engine/security/

## Liên kết
[[Dockerfile & Image Optimization]] · [[DevSecOps]] · [[Secrets Management]] · [[CI-CD Pipeline]] · [[Kubernetes Operations & Security]] · [[DevOps]]
