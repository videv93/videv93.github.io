---
tags: [devops, kubernetes, workload]
status: growing
---
# Kubernetes Workloads
<!-- Core Objects — mở rộng từ mục 2 của Kubernetes SEED -->

> Sáu object để chạy ứng dụng. Chọn đúng loại ngay từ đầu quan trọng hơn mọi tinh chỉnh sau đó — vì chuyển từ Deployment sang StatefulSet giữa chừng là làm lại.

## 1. Bảng chọn nhanh (Core Objects)
| Object | Dùng cho | Đặc trưng quyết định |
|---|---|---|
| **Pod** | Đơn vị nhỏ nhất | Hiếm khi tạo trực tiếp; luôn để controller quản lý |
| **Deployment** | Ứng dụng **stateless** (web, API) | Rolling update, rollback, scaling; pod thay thế được, tên ngẫu nhiên |
| **ReplicaSet** | Giữ đúng số bản sao Pod | Do Deployment tạo ra, gần như không dùng trực tiếp |
| **StatefulSet** | Ứng dụng **stateful** (MySQL, PostgreSQL, Kafka, Elasticsearch) | Định danh ổn định (`db-0`, `db-1`), khởi tạo/xoá theo thứ tự, mỗi pod một PVC riêng |
| **DaemonSet** | Đúng **một pod trên mỗi node** | Agent logging, monitoring, CNI, storage driver |
| **Job / CronJob** | Tác vụ ngắn hạn / định kỳ | Chạy đến khi hoàn thành; CronJob theo lịch cron |

## 2. Pod — chi tiết cần nhớ
Pod chứa một hoặc nhiều container **chia sẻ chung Network Namespace và Storage Volume** ⇒ các container trong cùng pod gọi nhau qua `localhost` và luôn ở cùng một node.
- **Init container** — chạy tuần tự tới khi xong, trước container chính. Dùng để migrate DB, chờ dependency, tải config.
- **Sidecar** — chạy song song container chính: log shipper, service mesh proxy, cert refresher.
- ⚠️ Chỉ nhét nhiều container vào một pod khi chúng **thật sự phải cùng vòng đời**. Web + database trong một pod là sai — chúng scale khác nhau.

### Vòng đời & trạng thái hay gặp
| Trạng thái | Nghĩa | Hướng điều tra |
|---|---|---|
| `Pending` | Chưa được gán node | Thiếu tài nguyên, taint, PVC chưa bound → `kubectl describe pod` xem Events |
| `ContainerCreating` | Đang kéo image / mount volume | Registry chậm, secret sai, volume không attach được |
| `ImagePullBackOff` | Không kéo được image | Sai tag, thiếu `imagePullSecrets`, rate limit registry |
| `CrashLoopBackOff` | Container start rồi chết lặp lại | `kubectl logs --previous`; thường là lỗi config/env/DB |
| `OOMKilled` (exit 137) | Vượt memory limit | Tăng limit hoặc sửa memory leak |
| `Evicted` | Node hết tài nguyên | Đặt requests đúng, xem node pressure |
| `Terminating` mãi không xong | Finalizer treo, app không nhận SIGTERM | Kiểm tra `preStop`, `terminationGracePeriodSeconds` |

## 3. Deployment — cấu hình tối thiểu nên có
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # tạo thêm tối đa 1 pod khi update
      maxUnavailable: 0    # không cho phép giảm capacity → zero downtime
  selector:
    matchLabels: { app: api }
  template:
    metadata:
      labels: { app: api }
    spec:
      terminationGracePeriodSeconds: 30
      containers:
        - name: api
          image: myorg/api@sha256:9f2a...   # digest, không phải :latest
          ports: [{ containerPort: 3000 }]
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits:   { memory: "512Mi" }
          readinessProbe:
            httpGet: { path: /readyz, port: 3000 }
            periodSeconds: 5
          livenessProbe:
            httpGet: { path: /healthz, port: 3000 }
            initialDelaySeconds: 20
          lifecycle:
            preStop:
              exec: { command: ["sleep", "5"] }   # kịp rút khỏi Endpoints
```
Chi tiết về probe, requests/limits, HPA → [[Kubernetes Operations & Security]]. Chi tiết chiến lược cập nhật → [[Deployment Strategies]].

```bash
kubectl rollout status deploy/api
kubectl rollout history deploy/api
kubectl rollout undo deploy/api --to-revision=3   # rollback
kubectl scale deploy/api --replicas=5
```

## 4. StatefulSet — khác Deployment ở đâu
| | Deployment | StatefulSet |
|---|---|---|
| Tên pod | `api-7d9f-xk2p` (ngẫu nhiên) | `db-0`, `db-1` (ổn định, đoán trước được) |
| Thứ tự tạo/xoá | Song song | Tuần tự `0 → 1 → 2`, xoá ngược lại |
| Storage | Chung hoặc không có | Mỗi pod một PVC riêng qua `volumeClaimTemplates` |
| DNS | Qua Service | Mỗi pod có DNS riêng qua headless Service |
| Khi scale down | Pod nào cũng được | Luôn pod có index cao nhất |

> ⚠️ StatefulSet **không tự động** làm ứng dụng thành cluster-aware. Replication, election, backup của Postgres vẫn phải tự cấu hình — đó là lý do nên dùng **Operator** (CloudNativePG, Strimzi cho Kafka) thay vì tự viết StatefulSet cho database.

## 5. Job & CronJob
```yaml
apiVersion: batch/v1
kind: CronJob
metadata: { name: nightly-report }
spec:
  schedule: "0 2 * * *"
  concurrencyPolicy: Forbid        # không cho 2 lần chạy chồng nhau
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  startingDeadlineSeconds: 300
  jobTemplate:
    spec:
      backoffLimit: 2
      activeDeadlineSeconds: 3600  # giết job treo
      template:
        spec:
          restartPolicy: OnFailure
          containers: [{ name: report, image: myorg/report:1.2.0 }]
```
- `concurrencyPolicy: Allow` (mặc định) là nguyên nhân kinh điển của **job chồng nhau làm sập DB**.
- Job phải **idempotent** — K8s có thể chạy lại pod khi node chết.

## 6. Cạm bẫy
- ❌ Tạo Pod trần (không có controller) → node chết là mất luôn, không có gì tạo lại.
- ❌ `replicas: 1` cho service quan trọng → mọi rolling update và mọi lần drain node đều gây downtime.
- ❌ Không đặt `maxUnavailable: 0` → rolling update giảm capacity đúng lúc cao điểm.
- ❌ Không có `PodDisruptionBudget` → `kubectl drain` khi nâng cấp node có thể xoá hết replica cùng lúc.
- ❌ Dùng Deployment cho database "vì nó đơn giản hơn" → hai pod cùng ghi một volume, hỏng dữ liệu.
- ❌ Không set `revisionHistoryLimit` → etcd tích tụ hàng trăm ReplicaSet cũ.
- ❌ Quên `preStop` + graceful shutdown → request đang xử lý bị cắt giữa chừng khi rolling update.

## 7. Checklist một workload production
- [ ] Đúng loại object cho tính chất ứng dụng (stateless/stateful/per-node/batch)?
- [ ] `replicas ≥ 2` và có `podAntiAffinity` để không dồn hết vào một node?
- [ ] Có `PodDisruptionBudget` (`minAvailable`)?
- [ ] Có `readinessProbe` **và** `livenessProbe`, hai endpoint khác nhau?
- [ ] Có `resources.requests` (bắt buộc để scheduler làm việc đúng)?
- [ ] Image dùng tag bất biến/digest?
- [ ] App xử lý `SIGTERM` + có `preStop` để rút khỏi load balancer trước khi chết?
- [ ] CronJob có `concurrencyPolicy: Forbid` và `activeDeadlineSeconds`?
- [ ] Đã thử `kubectl rollout undo` trên môi trường staging chưa?

## Tham khảo
- Kubernetes Docs — Workloads: https://kubernetes.io/docs/concepts/workloads/
- Kubernetes Docs — Pod Lifecycle: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
- Kubernetes Docs — StatefulSet Basics: https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/
- Kubernetes Docs — Pod Disruption Budget: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/
- Kubernetes Docs — Configuration best practices: https://kubernetes.io/docs/concepts/configuration/overview/

## Liên kết
[[Kubernetes Architecture]] · [[Kubernetes Networking]] · [[Kubernetes Storage & Configuration]] · [[Kubernetes Operations & Security]] · [[Deployment Strategies]] · [[DevOps]]
