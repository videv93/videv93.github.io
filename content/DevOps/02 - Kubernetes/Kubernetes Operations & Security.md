---
tags: [devops, kubernetes, operations, security]
status: growing
---
# Kubernetes Operations & Security

> Deploy được ứng dụng chỉ là ngày đầu tiên. Note này là **Day-2 operations**: cô lập, cấp phát tài nguyên, health check, phân quyền và co giãn — những thứ quyết định cụm sống được bao lâu.

## 1. Namespace — cô lập logic
Phân chia không gian ảo trong cụm để cô lập tài nguyên giữa các team/môi trường (Dev, Staging, Prod).
- Cho phép: đặt tên trùng nhau ở namespace khác nhau, áp RBAC theo namespace, áp `ResourceQuota` và `LimitRange`, áp NetworkPolicy theo namespace.
- **Không** cho phép: cách ly mạng mặc định (phải tự thêm NetworkPolicy → [[Kubernetes Networking]]), cách ly node.
> ⚠️ Namespace **không phải ranh giới bảo mật cứng**. Prod và Dev nên ở **cụm khác nhau**, không chỉ namespace khác nhau.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata: { name: team-quota, namespace: team-a }
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    limits.memory: 80Gi
    persistentvolumeclaims: "10"
    count/pods: "100"
```

## 2. Resource Requests & Limits — thứ bị hiểu sai nhiều nhất
| | Request | Limit |
|---|---|---|
| Ý nghĩa | Mức **tối thiểu** được bảo đảm; scheduler dùng con số này để chọn node | Mức **tối đa** được phép dùng |
| Vượt CPU | — | Bị **throttle** (chậm, không chết) |
| Vượt Memory | — | Bị **OOMKilled** (exit 137) |

### QoS class — quyết định ai bị evict trước khi node thiếu tài nguyên
| Class | Điều kiện | Thứ tự bị giết |
|---|---|---|
| `Guaranteed` | requests **=** limits cho mọi container | Cuối cùng |
| `Burstable` | Có requests, requests < limits | Giữa |
| `BestEffort` | Không đặt gì | **Đầu tiên** |

**Khuyến nghị thực chiến:**
- Luôn đặt **memory request = memory limit** (memory không nén được — burst rồi bị giết là tệ nhất).
- Đặt **CPU request**, cân nhắc **bỏ CPU limit** cho workload nhạy latency (throttling gây p99 tệ hơn nhiều so với lợi ích).
- Đặt request dựa trên số đo thật (p95 usage), không đoán. Dùng **VPA ở chế độ recommend** để lấy con số.

## 3. Probes — ba loại, ba mục đích khác nhau
| Probe | Câu hỏi | Fail thì sao | Cạm bẫy |
|---|---|---|---|
| `LivenessProbe` / `livenessProbe` | Pod còn **sống** không? | **Restart container** | Trỏ vào endpoint kiểm tra cả DB → DB chậm ⇒ restart hàng loạt ⇒ sự cố lan rộng |
| `ReadinessProbe` / `readinessProbe` | Pod **sẵn sàng nhận traffic** chưa? | Gỡ pod khỏi Endpoints (không restart) | Thiếu nó ⇒ traffic vào pod chưa warm-up |
| `startupProbe` | App đã **khởi động xong** chưa? | Restart, nhưng hoãn liveness/readiness | Bắt buộc cho app khởi động chậm (JVM), nếu không sẽ bị liveness giết trong vòng lặp |

```yaml
startupProbe:   { httpGet: {path: /healthz, port: 3000}, failureThreshold: 30, periodSeconds: 5 }  # cho tối đa 150s
readinessProbe: { httpGet: {path: /readyz,  port: 3000}, periodSeconds: 5 }
livenessProbe:  { httpGet: {path: /healthz, port: 3000}, periodSeconds: 10, failureThreshold: 3 }
```
> Nguyên tắc: **liveness kiểm tra process của chính mình; readiness được phép kiểm tra dependency.**

## 4. RBAC (Role-Based Access Control) — phân quyền truy cập K8s API
Bốn object, ghép theo hai trục (namespace / cluster):
| | Định nghĩa quyền | Gán quyền |
|---|---|---|
| Trong 1 namespace | `Role` | `RoleBinding` |
| Toàn cụm | `ClusterRole` | `ClusterRoleBinding` |

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata: { namespace: prod, name: app-reader }
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
```
Nguyên tắc: **least privilege**.
- Không gán `cluster-admin` cho ServiceAccount ứng dụng.
- Mỗi workload một ServiceAccount riêng; tắt `automountServiceAccountToken` nếu app không gọi API.
- Kiểm tra nhanh: `kubectl auth can-i --list --as=system:serviceaccount:prod:api`.

### Pod Security & hardening
`Pod Security Admission` (thay cho PodSecurityPolicy đã bị xoá từ 1.25) — gắn nhãn cho namespace:
```bash
kubectl label ns prod pod-security.kubernetes.io/enforce=restricted
```
`securityContext` nên có ở mọi workload production:
```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 10001
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities: { drop: ["ALL"] }
  seccompProfile: { type: RuntimeDefault }
```

## 5. Autoscaling — ba tầng
| Loại | Co giãn cái gì | Dựa trên |
|---|---|---|
| **HPA** (Horizontal Pod Autoscaler) | **Số lượng Pod** | CPU/RAM hoặc custom/external metrics (queue length, RPS) |
| **VPA** (Vertical Pod Autoscaler) | requests/limits của Pod | Lịch sử sử dụng |
| **Cluster Autoscaler / Karpenter** | **Số lượng Node** | Pod `Pending` không xếp được chỗ |

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: api }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: api }
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300   # tránh thrashing
```
> ⚠️ **HPA và VPA không dùng chung trên cùng một metric** (cả hai cùng chỉnh theo CPU sẽ đánh nhau). HPA cần `metrics-server` và cần pod có `resources.requests` thì mới tính được % utilization.

## 6. Cạm bẫy vận hành
- ❌ Không đặt requests → scheduler xếp chỗ mù, node overcommit rồi evict lung tung.
- ❌ Đặt memory limit quá sát → OOMKill ngẫu nhiên lúc traffic cao.
- ❌ Liveness probe quá nhạy (`failureThreshold: 1`, timeout 1s) → restart dây chuyền lúc hệ thống đang tải cao, làm sự cố nặng thêm.
- ❌ Cấp `cluster-admin` "cho nhanh" rồi quên thu hồi.
- ❌ HPA `minReplicas: 1` cho service quan trọng.
- ❌ Không có Cluster Autoscaler → HPA scale lên nhưng pod kẹt `Pending` vì hết node.
- ❌ Không giới hạn `ResourceQuota` cho namespace dev → một job lỗi ăn hết tài nguyên cụm.
- ❌ Bỏ qua nâng cấp phiên bản → tụt khỏi vòng hỗ trợ, phải nhảy nhiều minor một lúc (rất rủi ro).

## 7. Checklist audit một namespace production
- [ ] Mọi workload có requests/limits, memory request = limit?
- [ ] Mọi workload có readiness + liveness (+ startup nếu khởi động chậm)?
- [ ] `securityContext` non-root, drop ALL capabilities, read-only rootfs?
- [ ] Pod Security Admission ở mức `restricted` hoặc `baseline`?
- [ ] Không có ServiceAccount nào bind `cluster-admin`?
- [ ] Có `ResourceQuota` và `LimitRange`?
- [ ] Có `NetworkPolicy` default-deny?
- [ ] Có `PodDisruptionBudget` cho mọi service ≥ 2 replica?
- [ ] HPA có `minReplicas ≥ 2`, có `behavior` chống thrashing?
- [ ] Audit log apiserver được thu thập và lưu ≥ 90 ngày?
- [ ] Phiên bản cụm còn trong vòng hỗ trợ?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| `metrics-server` | Nguồn metric cho HPA và `kubectl top` | https://github.com/kubernetes-sigs/metrics-server |
| Karpenter | Autoscale node nhanh và tiết kiệm trên AWS | https://karpenter.sh/ |
| Goldilocks (VPA) | Gợi ý requests/limits hợp lý | https://goldilocks.docs.fairwinds.com/ |
| kube-bench | Kiểm tra CIS Benchmark cho cụm | https://github.com/aquasecurity/kube-bench |
| Polaris / kubescape | Audit cấu hình workload theo best practice | https://polaris.docs.fairwinds.com/ · https://kubescape.io/ |
| Kyverno | Policy-as-code, chặn workload không đạt chuẩn | https://kyverno.io/ |

## Tham khảo
- Kubernetes Docs — Managing Resources for Containers: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
- Kubernetes Docs — Configure Liveness, Readiness and Startup Probes: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
- Kubernetes Docs — RBAC Authorization: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
- Kubernetes Docs — Pod Security Standards: https://kubernetes.io/docs/concepts/security/pod-security-standards/
- Kubernetes Docs — Horizontal Pod Autoscaling: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
- NSA/CISA — Kubernetes Hardening Guide: https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF

## Liên kết
[[Kubernetes Workloads]] · [[Kubernetes Networking]] · [[Kubernetes Storage & Configuration]] · [[DevSecOps]] · [[SRE & Reliability Engineering]] · [[DevOps]]
