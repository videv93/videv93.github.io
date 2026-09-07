---
tags: [devops, kubernetes, storage, config]
status: growing
---
# Kubernetes Storage & Configuration

> Container là ephemeral. Hai câu hỏi phải trả lời trước khi đưa bất cứ thứ gì lên K8s: **dữ liệu sống ở đâu khi pod chết**, và **cấu hình vào container bằng đường nào**.

## 1. Storage — chuỗi PV / PVC / StorageClass
| Object | Vai trò | Ai tạo |
|---|---|---|
| **PersistentVolume (PV)** | Tài nguyên lưu trữ **thực tế** trong cụm (EBS volume, NFS export, disk) | Admin, hoặc tự sinh |
| **PersistentVolumeClaim (PVC)** | **Yêu cầu** xin cấp phát dung lượng từ Pod tới PV | Developer |
| **StorageClass** | Cơ chế **cấp phát tự động** (dynamic provisioning) khi có PVC | Admin / cloud provider |

```
Pod → PVC ("tôi cần 20Gi, mode RWO, class gp3")
        ↓ StorageClass gọi CSI driver
      PV (EBS volume vừa được tạo thật)
```
Không có StorageClass thì admin phải tạo PV bằng tay (static provisioning) — hiếm gặp ngoài on-prem.

### Access Mode — nguồn gốc nhiều hiểu lầm
| Mode | Nghĩa | Ví dụ |
|---|---|---|
| `ReadWriteOnce` (RWO) | Mount đọc-ghi bởi **một node** | AWS EBS — pod ở node khác **không** mount được |
| `ReadOnlyMany` (ROX) | Nhiều node đọc | Dữ liệu tĩnh dùng chung |
| `ReadWriteMany` (RWX) | Nhiều node cùng đọc-ghi | AWS EFS, NFS, CephFS |
| `ReadWriteOncePod` | Đúng **một pod** duy nhất | Chống hai writer, K8s ≥ 1.27 |

> ⚠️ Đây là lý do Deployment nhiều replica + EBS thường kẹt `Multi-Attach error`. Cần nhiều pod ghi chung ⇒ dùng **EFS/RWX**, hoặc dùng StatefulSet với volume riêng cho mỗi pod. → [[AWS Storage]]

### `reclaimPolicy` — hai chữ quyết định sống chết dữ liệu
- `Delete` (mặc định của hầu hết StorageClass cloud): xoá PVC → **xoá luôn volume và dữ liệu**.
- `Retain`: xoá PVC → giữ volume lại, phải dọn tay.
> Với mọi thứ chứa dữ liệu thật: đặt `reclaimPolicy: Retain`.

### Volume tạm
- `emptyDir` — sống cùng pod, mất khi pod bị xoá. Dùng cho cache, scratch, hoặc ghi tạm khi bật `readOnlyRootFilesystem`.
- `emptyDir` với `medium: Memory` — tmpfs trên RAM (tính vào memory limit).

## 2. Configuration — ConfigMap & Secret
| | ConfigMap | Secret |
|---|---|---|
| Nội dung | Cấu hình **không nhạy cảm** dạng key-value | Thông tin nhạy cảm: password, token, SSH key, TLS cert |
| Mã hoá | Không | **Chỉ base64** — *không phải mã hoá* |
| Giới hạn | ~1 MiB | ~1 MiB |
| Cách dùng | Biến môi trường hoặc file mount | Như trên |

> 🚨 **base64 không phải mã hoá.** Ai `kubectl get secret -o yaml` được là đọc được. Bảo vệ thật cần: RBAC chặt + bật encryption-at-rest cho etcd + external secret manager. → [[Secrets Management]]

### Hai cách đưa vào container
```yaml
# a) Biến môi trường — đơn giản, nhưng KHÔNG cập nhật khi ConfigMap đổi
envFrom:
  - configMapRef: { name: app-config }
  - secretRef:    { name: app-secrets }

# b) Mount thành file — TỰ ĐỘNG cập nhật (trễ ~60s), giữ được cấu trúc
volumes:
  - name: config
    configMap: { name: app-config }
volumeMounts:
  - { name: config, mountPath: /etc/app, readOnly: true }
```
> Quy tắc: **giá trị đơn giản → env; file cấu hình (nginx.conf, application.yml) → mount.** Và nhớ: đổi ConfigMap dạng env **không** làm pod restart — phải chủ động rollout.

### Mẹo bắt pod restart khi config đổi
Gắn hash của config vào annotation của pod template (Helm: `checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}`) → config đổi ⇒ template đổi ⇒ rolling update tự chạy. → [[Helm & Kubernetes Packaging]]

## 3. Cạm bẫy
- ❌ **Xoá PVC để "dọn dẹp"** với `reclaimPolicy: Delete` → mất dữ liệu vĩnh viễn, không undo.
- ❌ Tưởng Secret được mã hoá → commit `kubectl get secret -o yaml` vào Git.
- ❌ Sửa ConfigMap rồi ngồi chờ ứng dụng tự nhận (khi dùng env) → không bao giờ xảy ra.
- ❌ Dùng RWO cho Deployment nhiều replica → pod thứ hai kẹt `ContainerCreating` mãi.
- ❌ Không có **backup ứng dụng-mức** cho PV (snapshot volume ≠ backup DB nhất quán). Dùng công cụ của chính DB + Velero cho object.
- ❌ Nhét cả file JSON 900KB vào ConfigMap → chạm giới hạn etcd, làm chậm apiserver.
- ❌ Đặt secret vào ConfigMap "cho tiện".

## 4. Checklist
- [ ] Mọi PVC chứa dữ liệu thật có `reclaimPolicy: Retain`?
- [ ] Access mode có khớp với số replica và loại storage không?
- [ ] Có VolumeSnapshot / backup định kỳ và **đã test restore**?
- [ ] StorageClass mặc định là gì? Có `allowVolumeExpansion: true` để mở rộng disk sau này không?
- [ ] Secret có được mã hoá at-rest trong etcd (`EncryptionConfiguration`) không?
- [ ] RBAC có hạn chế ai `get secrets` trong namespace production không?
- [ ] Config file mount read-only? Container chạy `readOnlyRootFilesystem` được không?
- [ ] Đổi config có cơ chế làm pod rollout tự động không?
- [ ] Đã theo dõi metric `kubelet_volume_stats_available_bytes` để biết disk sắp đầy chưa? → [[Metrics & Prometheus]]

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Velero | Backup/restore object + PV của cụm | https://velero.io/ |
| External Secrets Operator | Đồng bộ secret từ Vault/AWS SM vào K8s | https://external-secrets.io/ |
| Sealed Secrets | Secret mã hoá, commit vào Git an toàn | https://sealed-secrets.netlify.app/ |
| CSI drivers (EBS/EFS) | Cấp phát volume trên AWS | https://github.com/kubernetes-sigs/aws-ebs-csi-driver |
| Longhorn / Rook-Ceph | Storage phân tán cho on-prem | https://longhorn.io/ |

## Tham khảo
- Kubernetes Docs — Storage: https://kubernetes.io/docs/concepts/storage/
- Kubernetes Docs — Persistent Volumes: https://kubernetes.io/docs/concepts/storage/persistent-volumes/
- Kubernetes Docs — ConfigMaps: https://kubernetes.io/docs/concepts/configuration/configmap/
- Kubernetes Docs — Encrypting Secret Data at Rest: https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/
- CSI Specification: https://github.com/container-storage-interface/spec

## Liên kết
[[Kubernetes Workloads]] · [[Kubernetes Operations & Security]] · [[Secrets Management]] · [[AWS Storage]] · [[DevOps]]
