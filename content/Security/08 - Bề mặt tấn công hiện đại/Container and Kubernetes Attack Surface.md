---
tags: [security, cloud, container]
status: growing
---
# Container and Kubernetes Attack Surface

> [!note] Ranh giới với DevOps
> [[Kubernetes Operations & Security]] và [[Container Registry & Image Security]] (DevOps) nói về *vận hành và cấu hình an toàn*. Note này nói từ **phía tấn công**: kẻ tấn công làm gì khi có chỗ đứng trong container hoặc cluster.

> Container không phải ranh giới bảo mật mạnh như VM. Kubernetes thêm một mặt phẳng điều khiển phức tạp với nhiều điểm cấu hình sai. Cùng nhau, chúng tạo một bề mặt tấn công theo tầng.

## 1. Ba tầng bề mặt tấn công

| Tầng | Kẻ tấn công tìm gì |
|---|---|
| **Image** | Base image lỗ hổng, secret trong layer, dependency độc — [[Software Supply Chain Attacks]] |
| **Container runtime** | Container escape ra host, privileged container, mount nhạy cảm |
| **Orchestration (K8s)** | RBAC sai, API server lộ, secret, service account, network policy thiếu |

## 2. Container escape — vì sao container không phải VM

Container chia sẻ kernel với host. Cấu hình sai cho phép thoát ra host:

| Vector escape | Cơ chế |
|---|---|
| **Privileged container** | `--privileged` gần như = root trên host |
| **Mount nhạy cảm** | Mount `/`, docker socket, `/proc` vào container |
| **Capability thừa** | `CAP_SYS_ADMIN` và tương tự |
| **Kernel exploit** | Chia sẻ kernel → lỗ hổng kernel = escape |
| **hostPID/hostNetwork** | Truy cập namespace của host |

## 3. Kubernetes — các điểm tấn công

| Điểm | Rủi ro |
|---|---|
| **API server lộ** | Không xác thực/RBAC yếu → kiểm soát cluster |
| **RBAC quá rộng** | Service account quyền cao → leo thang — cùng logic [[Broken Access Control]] |
| **Secret** | K8s secret chỉ base64, không mã hoá mặc định |
| **Service account token** | Token mount vào pod → lateral movement |
| **Không network policy** | Pod nói chuyện tự do → lateral movement dễ |
| **etcd lộ** | Chứa toàn bộ state, gồm secret |
| **Kubelet API** | Cổng 10250 lộ → chạy lệnh trong pod |

## 4. Nguyên tắc

1. **Container không phải ranh giới tin cậy mạnh.** Với workload đa tенant thù địch, cân nhắc cách ly mạnh hơn (VM, gVisor, Kata).
2. **Không privileged container, không mount docker socket.** Đây là hai đường escape phổ biến nhất.
3. **Least privilege RBAC.** Service account chỉ quyền cần; đây là biện pháp gốc như trong [[Cloud Security Posture]].
4. **Network policy mặc định deny.** Không có nó, một pod chiếm được nói chuyện với mọi pod — [[Zero Trust Architecture]].
5. **Quét image và giảm bề mặt.** Image tối thiểu (distroless), quét lỗ hổng, không chạy root trong container.
6. **Bảo vệ mặt phẳng điều khiển.** API server, etcd, kubelet không lộ ra Internet.

## 5. Cạm bẫy

- **Coi container như VM.** Chia sẻ kernel; escape là thật.
- **Privileged container "cho tiện".** Gần như = root trên host.
- **Mount docker socket vào container.** Kiểm soát docker = kiểm soát host.
- **RBAC `cluster-admin` cho tiện.** Bất kỳ pod chiếm được → toàn cluster.
- **K8s secret coi như đã mã hoá.** Chỉ base64; cần bật encryption at rest.
- **Không network policy.** Lateral movement tự do trong cluster.
- **Chạy root trong container.** Tăng tác động khi container bị chiếm.
- **API server/kubelet lộ.** Đường vào trực tiếp cluster.

## 6. Checklist áp dụng

- [ ] Có privileged container hoặc mount docker socket nào không?
- [ ] Container có chạy non-root và drop capability thừa không?
- [ ] RBAC có least privilege, không service account nào `cluster-admin` thừa không?
- [ ] Có network policy mặc định deny không?
- [ ] K8s secret có được mã hoá at rest không?
- [ ] API server, etcd, kubelet có bị chặn khỏi Internet không?
- [ ] Image có được quét lỗ hổng và tối giản không?
- [ ] Với workload đa tenant, cách ly có đủ mạnh (VM/gVisor) không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **kube-hunter** | Tìm lỗ hổng cluster (phía tấn công) |
| **kube-bench** | Kiểm CIS Benchmark K8s |
| **Trivy / Grype** | Quét lỗ hổng image |
| **Peirates / kdigger** | Khai thác K8s từ trong pod |
| **Falco** | Phát hiện hành vi runtime bất thường |
| **Kubescape** | Đánh giá tư thế cluster |

## Tham khảo

- [MITRE ATT&CK for Containers](https://attack.mitre.org/matrices/enterprise/containers/)
- [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes)
- [NSA/CISA Kubernetes Hardening Guide](https://www.cisa.gov/news-events/alerts/2022/03/15/updated-kubernetes-hardening-guide)
- [HackTricks Cloud — Kubernetes](https://cloud.hacktricks.xyz/pentesting-cloud/kubernetes-security)
- Nền vận hành: [[Kubernetes Operations & Security]] (DevOps)

## Liên kết

[[Cloud Security Posture]] · [[Software Supply Chain Attacks]] · [[Zero Trust Architecture]] · [[Privilege Escalation]] · [[Kubernetes Operations & Security]] · [[Security]]
