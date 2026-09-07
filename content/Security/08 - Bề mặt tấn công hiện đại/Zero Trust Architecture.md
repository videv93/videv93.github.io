---
tags: [security, kiến-trúc]
status: growing
---
# Zero Trust Architecture

> Nguyên lý thật, và cái được bán dưới cùng cái tên. "Zero Trust" là một trong những thuật ngữ bị marketing lạm dụng nhất trong bảo mật — note này tách nguyên lý kiến trúc khỏi sản phẩm được dán nhãn.

## 1. Nguyên lý cốt lõi

Zero Trust bác bỏ mô hình "tường thành và hào nước" — nơi mọi thứ trong mạng được tin. Thay vào đó: **không tin cậy ngầm dựa trên vị trí mạng; xác thực và phân quyền mọi truy cập.**

| Mô hình cũ (perimeter) | Zero Trust |
|---|---|
| Trong mạng = tin cậy | Không có "trong mạng đáng tin" |
| Xác thực một lần ở biên | Xác thực/phân quyền mọi request |
| Ranh giới = mạng | Ranh giới = danh tính + thiết bị + ngữ cảnh |

Đây là câu trả lời kiến trúc cho "assume breach" của [[Security Mental Models]], và cho thực tế rằng ranh giới mạng đã tan trong cloud — [[Cloud Security Posture]].

## 2. Các trụ cột (NIST SP 800-207)

| Trụ cột | Nội dung |
|---|---|
| **Danh tính** | Xác thực mạnh mọi principal (người và máy) |
| **Thiết bị** | Tư thế thiết bị là yếu tố quyết định truy cập |
| **Least privilege** | Quyền tối thiểu, tức thời, theo phiên |
| **Micro-segmentation** | Phân vùng nhỏ, giới hạn lateral movement |
| **Quyết định động** | Phân quyền theo ngữ cảnh (ai, ở đâu, thiết bị nào, hành vi) |
| **Giám sát liên tục** | Tin cậy được đánh giá lại liên tục, không cấp vĩnh viễn |

## 3. Nguyên tắc

1. **Zero Trust là kiến trúc/nguyên lý, không phải sản phẩm mua được.** Không có "hộp Zero Trust"; nó là cách thiết kế.
2. **Danh tính là ranh giới mới.** Xác thực mạnh (MFA chống phishing) là nền — [[Password Attacks and Credential Access]].
3. **Least privilege + micro-segmentation giới hạn blast radius.** Chống lateral movement — [[Post-Exploitation and Lateral Movement]].
4. **Quyết định theo ngữ cảnh, đánh giá lại liên tục.** Tin cậy không cấp một lần rồi quên.
5. **Áp dụng dần, theo rủi ro.** Không "big bang"; bắt đầu từ tài sản/danh tính quan trọng nhất.
6. **Zero Trust không thay được các biện pháp khác.** Nó là mô hình tổ chức chúng, không phải phép màu.

## 4. Cạm bẫy

- **Mua "sản phẩm Zero Trust".** Nhà cung cấp dán nhãn ZT lên mọi thứ; nó là kiến trúc, không phải SKU.
- **Coi ZT là phép màu.** Vẫn cần vá, detection, IR — ZT tổ chức chúng, không thay thế.
- **Big bang.** Cố chuyển toàn bộ cùng lúc thất bại; áp dụng dần theo rủi ro.
- **ZT nhưng MFA yếu.** Danh tính là nền; MFA push bị bypass phá cả kiến trúc.
- **Micro-segmentation trên giấy.** Không thực thi bằng policy thật thì chỉ là sơ đồ.
- **Quên máy (non-human identity).** Service account, workload cũng là principal cần ZT.
- **Bỏ giám sát liên tục.** Cấp tin cậy một lần rồi quên là quay lại mô hình cũ.

## 5. Checklist áp dụng

- [ ] Tôi hiểu ZT là kiến trúc, không phải sản phẩm để mua không?
- [ ] Xác thực có mạnh (MFA chống phishing) cho mọi principal không?
- [ ] Truy cập có được phân quyền theo request, không theo vị trí mạng không?
- [ ] Có least privilege + micro-segmentation giới hạn lateral movement không?
- [ ] Quyết định truy cập có tính ngữ cảnh (thiết bị, hành vi) không?
- [ ] Tin cậy có được đánh giá lại liên tục không?
- [ ] Non-human identity (service account) có nằm trong mô hình không?
- [ ] Tôi áp dụng dần theo rủi ro, không big bang chứ?

## 6. Công cụ & khái niệm

| Tên | Vai trò |
|---|---|
| **IdP + MFA** (Okta, Entra ID) | Danh tính, nền của ZT |
| **ZTNA** | Thay VPN bằng truy cập theo danh tính |
| **Micro-segmentation** (Illumio, Cilium) | Phân vùng workload |
| **Policy engine** (OPA) | Quyết định phân quyền động |
| **Device posture / EDR** | Tư thế thiết bị làm yếu tố truy cập |

## Tham khảo

- [NIST SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [CISA — Zero Trust Maturity Model](https://www.cisa.gov/zero-trust-maturity-model)
- [Google BeyondCorp](https://cloud.google.com/beyondcorp)
- [NCSC — Zero Trust principles](https://www.ncsc.gov.uk/collection/zero-trust-architecture)

## Liên kết

[[Security Mental Models]] · [[Cloud Security Posture]] · [[Post-Exploitation and Lateral Movement]] · [[Password Attacks and Credential Access]] · [[Container and Kubernetes Attack Surface]] · [[Security]]
