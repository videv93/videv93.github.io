---
tags: [security, supply-chain]
status: growing
---
# Software Supply Chain Attacks

> Bạn không viết phần lớn code chạy trong sản phẩm của mình — bạn nhập nó. Mỗi dependency, mỗi base image, mỗi bước CI/CD là một chỗ kẻ tấn công có thể chèn code độc **trước khi nó tới bạn**. Tấn công một nhà cung cấp để tới hàng nghìn nạn nhân là mô hình có đòn bẩy cao nhất.

## 1. Vì sao đây là bề mặt tấn công lớn nhất mà ít ai kiểm

Một ứng dụng hiện đại điển hình: code bạn viết là thiểu số; phần lớn là dependency, transitive dependency (dependency của dependency), base image, và công cụ build. Bạn tin tất cả — thường mù quáng. Đây là "tin cậy bắc cầu" của [[Third-Party and Supply Chain Risk]] ở dạng kỹ thuật.

## 2. Các vector — học qua case thật

| Vector | Case kinh điển |
|---|---|
| **Build system compromise** | SolarWinds (2020) — code độc chèn vào bản build hợp lệ, ký hợp lệ |
| **Dependency độc** | xz-utils (2024) — cửa hậu cài công phu qua nhiều năm vào thư viện nén |
| **Typosquatting** | Package tên gần giống (`python-dateutil` vs `python-dateutils`) |
| **Dependency confusion** | Package public trùng tên package nội bộ, bị kéo về thay bản nội bộ |
| **Compromised maintainer** | Chiếm tài khoản maintainer npm/PyPI, đẩy bản độc |
| **Malicious base image** | Image Docker chứa cửa hậu |

> [!note] xz-utils và SolarWinds dạy hai bài khác nhau
> **SolarWinds**: bản build được ký hợp lệ vẫn có thể độc nếu **build system** bị chiếm — chữ ký không cứu bạn nếu chèn xảy ra trước khi ký. **xz-utils**: một maintainer kiên nhẫn (hoặc bị chiếm) có thể cài cửa hậu qua nhiều năm vào một thư viện mà hàng triệu hệ thống tin — social engineering ở tầng dự án mã nguồn mở. Cả hai đều vượt qua "quét lỗ hổng" thông thường vì code độc không phải "lỗ hổng đã biết".

## 3. Phòng thủ

| Biện pháp | Chống |
|---|---|
| **SBOM** (CycloneDX, SPDX) | Biết mình dùng gì — điều kiện tiên quyết |
| **Pin version + lockfile** | Chống bản độc đẩy ngầm |
| **Quét dependency** (SCA) | Lỗ hổng đã biết trong dependency |
| **Verify signature / provenance** | SLSA, Sigstore — chứng minh nguồn gốc |
| **Scoped registry, chống dependency confusion** | Ưu tiên registry nội bộ đúng cách |
| **Bảo vệ build pipeline** | SolarWinds-class; build system là tài sản trọng yếu |
| **Review dependency mới** | Chống typosquat, package độc |

## 4. Nguyên tắc

1. **Biết mình dùng gì (SBOM) trước.** Không thể bảo vệ chuỗi mình không thấy.
2. **Pin và lock.** Version trôi nổi cho phép bản độc vào ngầm.
3. **Bảo vệ build pipeline như tài sản trọng yếu.** SolarWinds: build system bị chiếm phá mọi chữ ký sau đó.
4. **Verify provenance, không chỉ quét lỗ hổng.** Code độc chèn không phải "CVE"; cần chứng minh nguồn gốc (SLSA/Sigstore).
5. **Cảnh giác dependency mới và maintainer đổi.** Typosquat và compromised maintainer là vector người.
6. **Least privilege cho CI/CD.** Token pipeline quyền rộng biến một bước CI thành toàn bộ hạ tầng — [[Cloud Security Posture]].

## 5. Cạm bẫy

- **Không có SBOM.** Không biết transitive dependency; xz-class ẩn ở tầng sâu.
- **Chỉ quét lỗ hổng đã biết.** Code độc chèn không phải CVE; SCA không bắt.
- **Version trôi nổi.** `^1.2.0` cho phép bản độc vào.
- **Tin chữ ký mù.** SolarWinds: ký hợp lệ vẫn độc nếu build bị chiếm.
- **Bỏ qua dependency confusion.** Registry cấu hình sai kéo package public thay nội bộ.
- **CI/CD token quyền rộng.** Một bước build bị chiếm → toàn hạ tầng.
- **Không review dependency mới.** Typosquat trượt vào.

## 6. Checklist áp dụng

- [ ] Tôi có SBOM đầy đủ (gồm transitive dependency) không?
- [ ] Dependency có được pin version + lockfile không?
- [ ] Tôi có quét SCA cho lỗ hổng đã biết không?
- [ ] Tôi có verify provenance/signature (SLSA/Sigstore) không?
- [ ] Registry có cấu hình chống dependency confusion không?
- [ ] Build pipeline có được bảo vệ như tài sản trọng yếu không?
- [ ] CI/CD token có least privilege không?
- [ ] Dependency mới có được review trước khi thêm không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **Trivy / Grype / Snyk** | Quét dependency và image (SCA) |
| **Syft / CycloneDX** | Sinh SBOM |
| **Sigstore (cosign)** | Ký và verify artefact |
| **SLSA framework** | Mức đảm bảo provenance |
| **Dependabot / Renovate** | Cập nhật dependency |
| **OSV / GitHub Advisory** | Cơ sở lỗ hổng dependency |

## Tham khảo

- [SLSA framework](https://slsa.dev/)
- [Sigstore](https://www.sigstore.dev/)
- [OWASP — Software Component Verification Standard (SCVS)](https://owasp.org/www-project-software-component-verification-standard/)
- [CISA — Software Bill of Materials](https://www.cisa.gov/sbom)
- [OWASP CI/CD Top 10](https://owasp.org/www-project-top-10-ci-cd-security-risks/)

## Liên kết

[[Third-Party and Supply Chain Risk]] · [[Insecure Deserialization]] · [[Cloud Security Posture]] · [[Container and Kubernetes Attack Surface]] · [[Vulnerability Management]] · [[DevSecOps]] · [[Security]]
