---
tags: [os, security]
status: evergreen
---
# OS Security Fundamentals

> OS là **trọng tài cuối cùng** của mọi truy cập tài nguyên trên máy. Nếu nó bị phá, mọi biện pháp bảo mật ở tầng ứng dụng đều vô nghĩa. Ba chương an ninh của OSTEP (Peter Reiher) xoay quanh: dựng ranh giới, xác định *ai*, quyết định *được làm gì*.

## 1. Bộ ba mục tiêu và ba câu hỏi
| Mục tiêu (CIA) | Câu hỏi | Note |
|---|---|---|
| **Confidentiality** | ai được *đọc*? | [[Access Control]], [[Cryptography in OS]] |
| **Integrity** | ai được *sửa*? | [[Data Integrity and Protection]] |
| **Availability** | dịch vụ còn chạy không? | giới hạn tài nguyên, cgroup |

| Câu hỏi | Cơ chế |
|---|---|
| Bạn là ai? | **Authentication** → [[Authentication]] |
| Bạn được làm gì? | **Authorization** → [[Access Control]] |
| Bạn đã làm gì? | **Auditing** — log không sửa được |

## 2. Các nguyên tắc thiết kế (Saltzer & Schroeder, 1975)
| Nguyên tắc | Nghĩa thực tế |
|---|---|
| **Economy of mechanism** | Cơ chế bảo mật phải **đơn giản đủ để kiểm tra được**. Code phức tạp = lỗ hổng |
| **Fail-safe defaults** | Mặc định **từ chối**; cấp quyền là hành động tường minh |
| **Complete mediation** | **Mọi** truy cập đều phải qua kiểm tra — không có đường tắt |
| **Open design** | An toàn không dựa vào việc giấu thiết kế (Kerckhoffs) |
| **Separation of privilege** | Cần nhiều điều kiện mới cho phép (2FA, two-man rule) |
| **Least privilege** | Chỉ cấp quyền tối thiểu cần thiết, trong thời gian tối thiểu |
| **Least common mechanism** | Càng ít tài nguyên dùng chung càng ít kênh rò rỉ |
| **Psychological acceptability** | Nếu khó dùng, người ta sẽ vô hiệu hoá nó |

> 50 năm sau, các nguyên tắc này vẫn là danh sách kiểm tra tốt nhất khi review thiết kế bảo mật.

## 3. Ranh giới bảo vệ trong OS
| Ranh giới | Cơ chế | Ghi chú |
|---|---|---|
| user ↔ kernel | mode bit, trap | [[User Mode vs Kernel Mode]] |
| process ↔ process | page table, [[Address Space]] | rò rỉ qua side channel |
| user ↔ user | uid/gid, quyền file | [[Access Control]] |
| container ↔ host | namespace + cgroup + seccomp | **ranh giới yếu hơn VM** → [[Containers]] |
| VM ↔ host | hypervisor, EPT/NPT | [[Virtual Machine Monitor]] |

Ranh giới càng thấp trong stack càng khó vượt qua — nhưng cũng càng khó vá khi hỏng.

## 4. Threat model — bước bị bỏ qua nhiều nhất
Trước khi chọn cơ chế phải trả lời:
1. **Bảo vệ cái gì?** (dữ liệu người dùng? khoá ký? tính sẵn sàng?)
2. **Chống ai?** (script kiddie? người dùng nội bộ? nhà nước?)
3. **Kẻ tấn công có gì?** (truy cập mạng? tài khoản local? truy cập vật lý?)
4. **Chấp nhận mất gì?**

> Không có "an toàn" tuyệt đối, chỉ có "an toàn trước mô hình đe doạ X với chi phí Y".

## 5. Các lớp tấn công vào OS
| Lớp | Ví dụ | Phòng thủ |
|---|---|---|
| **Memory safety** | buffer overflow, use-after-free | ASLR, NX, stack canary, ngôn ngữ an toàn bộ nhớ (Rust) |
| **Privilege escalation** | lỗi trong syscall, setuid binary | seccomp, giảm attack surface, least privilege |
| **TOCTOU / race** | kiểm tra rồi dùng, symlink attack | `openat`, `O_NOFOLLOW`, thao tác nguyên tử |
| **Side channel** | Spectre/Meltdown, cache timing, power | KPTI, cách ly core, constant-time crypto |
| **Supply chain** | thư viện/driver độc hại | secure boot, ký mã, SBOM |
| **Vật lý** | DMA attack, cold boot | IOMMU, mã hoá đĩa đầy đủ |

## 6. Checklist áp dụng
- [ ] Threat model đã viết ra chưa? Ai là kẻ tấn công?
- [ ] Dịch vụ có chạy với **quyền tối thiểu** không (non-root, capability hẹp, seccomp)?
- [ ] Mặc định là **từ chối** hay **cho phép**?
- [ ] Có đường nào **vòng qua** kiểm tra quyền không (complete mediation)?
- [ ] Log audit có đủ để trả lời "ai đã làm gì" không, và có chống sửa không?
- [ ] Bề mặt tấn công: syscall nào thực sự cần? Cổng nào thực sự phải mở?

## Tham khảo
- OSTEP — *Introduction to Operating System Security*: https://pages.cs.wisc.edu/~remzi/OSTEP/security-intro.pdf
- Saltzer & Schroeder — *The Protection of Information in Computer Systems* (1975): https://web.mit.edu/Saltzer/www/publications/protection/
- OWASP — Threat Modeling: https://owasp.org/www-community/Threat_Modeling
- Linux security docs (seccomp, LSM): https://docs.kernel.org/userspace-api/seccomp_filter.html
- Meltdown & Spectre: https://meltdownattack.com/

## Liên kết
[[Authentication]] · [[Access Control]] · [[Cryptography in OS]] · [[User Mode vs Kernel Mode]] · [[Containers]] · [[OS]]
