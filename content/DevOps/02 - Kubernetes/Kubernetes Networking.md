---
tags: [devops, kubernetes, networking]
status: growing
---
# Kubernetes Networking

> Pod là thứ **hay chết và luôn đổi IP**. Toàn bộ networking của K8s tồn tại để trả lời một câu: *làm sao gọi được một nhóm pod mà không cần biết chúng ở đâu.*

## 1. Bốn quy tắc nền của mô hình mạng K8s
1. Mỗi Pod có **một IP riêng**, dùng chung cho mọi container trong pod.
2. Mọi Pod gọi được mọi Pod khác **không qua NAT**, kể cả khác node.
3. Node gọi được Pod và ngược lại, không qua NAT.
4. IP mà Pod tự thấy chính là IP mà Pod khác thấy.

Việc hiện thực hoá 4 quy tắc này là của **CNI plugin** (Calico, Cilium, Flannel, AWS VPC CNI). Với [[AWS Compute & Auto Scaling|EKS]], AWS VPC CNI cấp cho pod IP thật trong VPC — nghĩa là **số pod trên mỗi node bị giới hạn bởi số ENI/IP của instance type**.

## 2. Service — điểm truy cập cố định
Service là abstraction layer đại diện cho một nhóm Pods, chọn pod bằng **label selector**, và có một IP ảo ổn định.
| Type | Phạm vi | Cơ chế | Dùng khi |
|---|---|---|---|
| `ClusterIP` (mặc định) | Chỉ nội bộ cụm | IP ảo + iptables/IPVS | Giao tiếp giữa các service |
| `NodePort` | Mở port cố định (30000–32767) trên **mọi** Worker Node | Forward về ClusterIP | Test, hoặc đứng sau LB tự quản |
| `LoadBalancer` | Ra Internet | Cloud provider tạo LB thật (ELB/NLB) | Public endpoint trên cloud |
| `ExternalName` | — | Trả về CNAME | Trỏ tới dịch vụ ngoài cụm |
| **Headless** (`clusterIP: None`) | — | DNS trả thẳng IP từng pod | StatefulSet, client tự load balance |

> 💸 Mỗi Service `LoadBalancer` = một LB tính tiền riêng. 20 service = 20 hoá đơn. Đây là lý do **Ingress** tồn tại.

### DNS trong cụm
CoreDNS phân giải: `<service>.<namespace>.svc.cluster.local`
- Cùng namespace: gọi `api` là đủ. Khác namespace: `api.backend`.
- Pod của StatefulSet qua headless service: `db-0.db.backend.svc.cluster.local`.

## 3. Ingress & Ingress Controller — Layer 7
**Ingress** là object khai báo rule routing HTTP/HTTPS (host, path, TLS). Nó chỉ là **cấu hình** — phải có **Ingress Controller** (NGINX Ingress, Traefik, HAProxy, AWS Load Balancer Controller) thực sự chạy trong cụm để thi hành.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts: [app.example.com]
      secretName: app-tls
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend: { service: { name: api, port: { number: 80 } } }
          - path: /
            pathType: Prefix
            backend: { service: { name: web, port: { number: 80 } } }
```
Ingress lo: **HTTP routing theo host/path, SSL termination, một LB dùng chung cho nhiều service**.

> **Gateway API** là thế hệ kế nhiệm của Ingress (GA từ K8s 1.31): tách vai trò infra/app, hỗ trợ đầy đủ TCP/UDP/gRPC, traffic splitting chuẩn hoá. Dự án mới nên cân nhắc bắt đầu bằng Gateway API.

## 4. NetworkPolicy — tường lửa L3/L4 bằng code
Mặc định trong K8s: **mọi pod gọi được mọi pod**. NetworkPolicy dùng để siết lại.
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata: { name: default-deny-ingress, namespace: backend }
spec:
  podSelector: {}          # áp cho mọi pod trong namespace
  policyTypes: [Ingress]
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata: { name: allow-api-to-db, namespace: backend }
spec:
  podSelector: { matchLabels: { app: db } }
  policyTypes: [Ingress]
  ingress:
    - from:
        - podSelector: { matchLabels: { app: api } }
      ports:
        - { protocol: TCP, port: 5432 }
```
Nguyên tắc: bắt đầu bằng **default-deny** cho từng namespace, rồi mở đúng đường cần thiết (zero-trust nội bộ).
> ⚠️ NetworkPolicy **chỉ có tác dụng nếu CNI hỗ trợ**. Flannel thuần không thực thi policy — khai báo vẫn apply thành công nhưng không chặn gì cả. Kiểm tra bằng cách thử kết nối thật.

## 5. Service Mesh — khi nào cần
Istio/Linkerd/Cilium thêm mTLS tự động, traffic splitting theo %, retry/timeout/circuit breaking, và telemetry L7 mà không sửa code.
> Chỉ dùng khi bạn đã có **hàng chục service** và đã đau vì những vấn đề đó. Với 5 service, mesh thêm nhiều vận hành hơn giá trị nó mang lại.

## 6. Cạm bẫy
- ❌ Service không match pod nào (label sai) → `kubectl get endpoints <svc>` rỗng. **Đây là lỗi #1** khi "service không gọi được".
- ❌ Nhầm `port` (của Service) với `targetPort` (của container).
- ❌ Tạo `LoadBalancer` cho từng service → tốn tiền và tốn IP. Dùng một Ingress.
- ❌ Apply NetworkPolicy trên CNI không hỗ trợ → tưởng đã an toàn.
- ❌ Quên `readinessProbe` → pod chưa sẵn sàng đã vào Endpoints và nhận traffic lỗi.
- ❌ Trên EKS: chọn instance type nhỏ rồi hết IP pod trước khi hết CPU/RAM.
- ❌ Hard-code IP pod ở bất kỳ đâu → IP đổi mỗi lần pod restart.

## 7. Checklist debug "không gọi được service"
- [ ] `kubectl get endpoints <svc>` — có IP pod nào không? Rỗng ⇒ selector sai hoặc pod chưa Ready.
- [ ] `kubectl get pods -l <selector>` — pod có đúng label và đang `Running`/`Ready`?
- [ ] `port` vs `targetPort` có khớp `containerPort` không?
- [ ] Từ một pod khác: `kubectl run tmp --rm -it --image=nicolaka/netshoot -- bash` rồi `curl`, `dig`, `nc`.
- [ ] DNS resolve đúng chưa? (`nslookup api.backend.svc.cluster.local`)
- [ ] Có NetworkPolicy nào đang chặn không? (`kubectl get netpol -A`)
- [ ] Với Ingress: `ingressClassName` đúng chưa? Controller có log gì? Cert còn hạn?
- [ ] Với LoadBalancer: security group / firewall của cloud có mở port không? → [[AWS Global Infrastructure & Networking]]

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Cilium | CNI dựa trên eBPF, policy L7, thay được kube-proxy | https://cilium.io/ |
| Calico | CNI + NetworkPolicy phổ biến | https://www.tigera.io/project-calico/ |
| ingress-nginx | Ingress controller phổ biến nhất | https://kubernetes.github.io/ingress-nginx/ |
| cert-manager | Tự động cấp và gia hạn TLS cert | https://cert-manager.io/ |
| `netshoot` | Image chứa đủ tool debug mạng | https://github.com/nicolaka/netshoot |

## Tham khảo
- Kubernetes Docs — Services, Load Balancing, Networking: https://kubernetes.io/docs/concepts/services-networking/
- Kubernetes Docs — Network Policies: https://kubernetes.io/docs/concepts/services-networking/network-policies/
- Kubernetes Docs — Gateway API: https://gateway-api.sigs.k8s.io/
- Kubernetes Docs — DNS for Services and Pods: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/
- Learnk8s — Kubernetes networking deep dive: https://learnk8s.io/kubernetes-network-packets

## Liên kết
[[Kubernetes Architecture]] · [[Kubernetes Workloads]] · [[Linux & Networking for DevOps]] · [[AWS Global Infrastructure & Networking]] · [[DevOps]]
