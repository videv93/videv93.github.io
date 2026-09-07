---
tags: [devops, kubernetes, architecture]
status: growing
---
# Kubernetes Architecture

> K8s là một **control loop khổng lồ**: bạn khai báo *trạng thái mong muốn* (desired state), hệ thống liên tục so sánh với *trạng thái thực tế* và tự hành động để hai thứ khớp nhau. Mọi thành phần dưới đây chỉ tồn tại để phục vụ vòng lặp đó.

## 1. Control Plane (Master Node) — bộ não điều khiển cụm
| Thành phần | Vai trò | Khi nó chết thì sao |
|---|---|---|
| `kube-apiserver` | Cổng giao tiếp trung tâm (REST API), tiếp nhận mọi lệnh từ `kubectl` hoặc các thành phần khác. Là **thành phần duy nhất** nói chuyện với etcd | Không ai thay đổi được gì; workload đang chạy **vẫn chạy** |
| `etcd` | CSDL key-value phân tán lưu **toàn bộ state** của cụm | Mất etcd = mất cụm. Phải backup định kỳ |
| `kube-scheduler` | Chọn Worker Node phù hợp cho Pod mới dựa trên tài nguyên và cấu hình (affinity, taint, topology) | Pod mới kẹt ở `Pending` |
| `kube-controller-manager` | Chạy các control loop giữ trạng thái thực tế khớp desired state (Node, ReplicaSet, Job, EndpointSlice, ServiceAccount controller…) | Pod chết không được tạo lại |
| `cloud-controller-manager` | Nối với cloud provider: tạo Load Balancer, volume, route | Service `LoadBalancer` không được cấp IP |

## 2. Worker Node — nơi ứng dụng thật sự chạy
| Thành phần | Vai trò |
|---|---|
| `kubelet` | Agent trên từng node; nhận lệnh từ API server, quản lý vòng đời container, báo cáo trạng thái node/pod |
| `kube-proxy` | Quản lý quy tắc mạng (iptables/IPVS/eBPF) cho phép Pod giao tiếp với nhau và ra ngoài qua [[Kubernetes Networking|Service]] |
| Container Runtime | Môi trường thực thi container qua chuẩn CRI: `containerd`, `CRI-O` |

## 3. Reconciliation loop — ý tưởng cốt lõi
```
        ┌──────────────── watch ────────────────┐
        ↓                                        │
  desired state (etcd)                    actual state (node)
        │                                        ↑
        └─────── controller hành động ───────────┘
```
Hệ quả thực tế cần nhớ:
- **Declarative, không imperative.** Bạn không ra lệnh "tạo 3 pod"; bạn khai báo "phải có 3 pod" và hệ thống tự lo. Xoá một pod bằng tay → nó mọc lại.
- **Level-triggered, không edge-triggered.** Bỏ lỡ một sự kiện không sao, vòng lặp sau vẫn hội tụ về đúng trạng thái.
- **Mọi thứ là API object** — kể cả node, quyền hạn, cấu hình. Vì thế K8s mở rộng được bằng **CRD + Operator** (custom controller cho domain riêng, ví dụ Postgres Operator).

## 4. Đường đi của một lệnh `kubectl apply`
1. `kubectl` gửi YAML tới **apiserver**.
2. Apiserver: xác thực (**AuthN**) → phân quyền (**AuthZ/RBAC**) → **admission controller** (mutating rồi validating: gán default, kiểm policy) → ghi vào **etcd**.
3. **Deployment controller** thấy object mới → tạo **ReplicaSet**.
4. **ReplicaSet controller** → tạo các **Pod** ở trạng thái `Pending` (chưa có node).
5. **Scheduler** thấy pod chưa gán node → lọc (filter) node đủ điều kiện → chấm điểm (score) → ghi `nodeName` vào pod.
6. **kubelet** của node đó thấy pod thuộc về mình → gọi CRI kéo image và khởi chạy container → gọi CNI cấp IP.
7. kubelet báo cáo trạng thái ngược về apiserver; **kube-proxy** cập nhật rule mạng khi pod vào Endpoints.

> Nắm chuỗi này là nắm cách debug: pod `Pending` → nghi scheduler/tài nguyên; `ImagePullBackOff` → nghi registry/credential; `CrashLoopBackOff` → nghi ứng dụng.

## 5. Cạm bẫy
- ❌ **Không backup etcd** → một sự cố là mất toàn bộ cụm. `etcdctl snapshot save` phải nằm trong cronjob và **đã được thử restore**.
- ❌ **Control plane một node ở production** → mất quorum là mất khả năng thay đổi. Cần 3 (hoặc 5) node etcd để chịu lỗi.
- ❌ **Coi K8s như nơi chạy VM** → deploy một pod duy nhất, không replica, không probe.
- ❌ **Dùng `kubectl edit`/`kubectl patch` trực tiếp ở production** → drift so với Git, lần apply sau bị ghi đè. Xem [[GitOps]].
- ❌ **Nghĩ apiserver chết là cụm sập** → không; workload vẫn chạy, chỉ là không điều khiển và không self-heal được.
- ❌ **Tự dựng cụm từ đầu khi mới học** → dùng managed (EKS/GKE) hoặc `kind` local; tự dựng chỉ khi có lý do rõ ràng.

## 6. Checklist một cụm production
- [ ] Control plane có ≥ 3 node (hoặc dùng managed service)?
- [ ] etcd có snapshot tự động, mã hoá at-rest, và **đã test restore** trong 90 ngày?
- [ ] Bật `EncryptionConfiguration` để Secret không nằm plaintext trong etcd? → [[Secrets Management]]
- [ ] Có node group tách riêng cho workload hệ thống và workload ứng dụng?
- [ ] Audit log của apiserver có được thu thập không?
- [ ] Phiên bản K8s còn được hỗ trợ (K8s chỉ support ~3 minor gần nhất, mỗi bản ~1 năm)?
- [ ] Có kế hoạch nâng cấp: control plane trước, node sau, một minor version một lần?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| `kind` / `minikube` | Cụm local để học và test CI | https://kind.sigs.k8s.io/ |
| `k9s` | TUI điều hướng cụm cực nhanh | https://k9scli.io/ |
| `kubectx` / `kubens` | Đổi context/namespace nhanh | https://github.com/ahmetb/kubectx |
| `kubeadm` | Dựng cụm chuẩn upstream | https://kubernetes.io/docs/reference/setup-tools/kubeadm/ |
| Lens / Headlamp | GUI xem cụm | https://k8slens.dev/ · https://headlamp.dev/ |

## Tham khảo
- Kubernetes Docs — Cluster Architecture: https://kubernetes.io/docs/concepts/architecture/
- Kubernetes Docs — Controllers & reconciliation: https://kubernetes.io/docs/concepts/architecture/controller/
- Kubernetes Docs — Operating etcd clusters: https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/
- *Kubernetes Up & Running* — Kelsey Hightower, Brendan Burns, Joe Beda
- Kelsey Hightower — Kubernetes The Hard Way: https://github.com/kelseyhightower/kubernetes-the-hard-way

## Liên kết
[[Kubernetes Workloads]] · [[Kubernetes Networking]] · [[Kubernetes Operations & Security]] · [[What is Kubernetes (k8s)?]] · [[Container Fundamentals]] · [[DevOps]]
