---
tags: [devops, kubernetes, helm, packaging]
status: growing
---
# Helm & Kubernetes Packaging

> Một ứng dụng K8s thật có 8–15 file YAML × 4 môi trường = 60 file gần giống nhau. Packaging tồn tại để giải bài toán đó — **và chỉ bài toán đó**.

## 1. Ba cách và khi nào dùng cái nào
| Cách | Cơ chế | Mạnh ở | Yếu ở |
|---|---|---|---|
| **YAML thuần** | Viết tay | Minh bạch, không phụ thuộc | Trùng lặp khủng khiếp khi nhiều môi trường |
| **Kustomize** (`kubectl -k`, có sẵn) | **Overlay/patch** trên base YAML | Không template, YAML luôn hợp lệ, dễ đọc diff | Không có version/dependency/rollback |
| **Helm** | **Template Go** + package + release tracking | Đóng gói phân phối được, quản lý version & rollback, hệ sinh thái chart khổng lồ | Template lồng nhau khó đọc, dễ lạm dụng logic |

> Kinh nghiệm chung: **dùng Helm để cài phần mềm của người khác** (Prometheus, ingress-nginx, cert-manager); **dùng Kustomize cho ứng dụng của chính mình**. Nhiều team dùng cả hai (`helm template | kustomize`).

## 2. Giải phẫu một Helm chart
```
mychart/
├── Chart.yaml          # tên, version chart, appVersion, dependencies
├── values.yaml         # giá trị mặc định
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── _helpers.tpl    # hàm dùng lại (naming, labels)
│   └── NOTES.txt       # in ra sau khi cài
└── charts/             # subchart / dependency
```
```yaml
# templates/deployment.yaml (trích)
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    metadata:
      annotations:
        checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          resources: {{- toYaml .Values.resources | nindent 12 }}
```

## 3. Lệnh dùng thật
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm template myapp ./mychart -f values-prod.yaml   # render ra YAML, KHÔNG cài — dùng để review
helm install myapp ./mychart -f values-prod.yaml --atomic --timeout 5m
helm upgrade myapp ./mychart -f values-prod.yaml --atomic --wait
helm diff upgrade myapp ./mychart -f values-prod.yaml   # plugin helm-diff, xem trước thay đổi
helm history myapp
helm rollback myapp 3
helm uninstall myapp
```
- `--atomic` = tự rollback nếu upgrade thất bại. **Nên bật mặc định ở production.**
- `helm template` + `kubectl diff` là cặp đôi để review trước khi apply.

## 4. Nguyên tắc viết chart
1. **`values.yaml` là API công khai của chart** — đặt tên ổn định, đổi tên là breaking change.
2. **Mọi thứ có thể khác nhau giữa môi trường đều phải là value** (replicas, resources, image tag, ingress host).
3. **Không nhét secret vào `values.yaml`** — dùng External Secrets / SOPS. → [[Secrets Management]]
4. **Ghim version chart và dependency** trong `Chart.lock`, commit nó vào Git.
5. **Dùng `_helpers.tpl` cho label chuẩn** (`app.kubernetes.io/name`, `version`, `managed-by`).
6. **Gắn `checksum/config` annotation** để đổi ConfigMap là pod tự rollout. → [[Kubernetes Storage & Configuration]]
7. **Hạn chế `if/range` lồng nhau** — chart nào phải đọc 3 lần mới hiểu thì đã quá phức tạp.
8. **Tách `values-dev/staging/prod.yaml`**, không dùng một file khổng lồ với đầy cờ bật/tắt.

## 5. Cạm bẫy
- ❌ `helm upgrade --force` → xoá và tạo lại resource, gây downtime bất ngờ.
- ❌ Sửa resource bằng `kubectl edit` sau khi cài bằng Helm → lần upgrade sau ghi đè hoặc conflict. Một nguồn sự thật duy nhất → [[GitOps]].
- ❌ Cài chart bên thứ ba mà không đọc `values.yaml` → chart mặc định thường có replicas=1, không resource limit, và bật service `LoadBalancer`.
- ❌ Dùng tag chart di động (`--version` bỏ trống) → mỗi lần chạy CI ra một version khác nhau.
- ❌ Helm release bị kẹt `pending-upgrade` (CI bị huỷ giữa chừng) → phải `helm rollback` để gỡ.
- ❌ Nhồi logic nghiệp vụ vào template Go → Helm không phải ngôn ngữ lập trình.
- ❌ Xoá chart bằng `helm uninstall` mà quên PVC không nằm trong release → volume mồ côi vẫn tính tiền.

## 6. Checklist trước khi `helm upgrade` production
- [ ] Đã chạy `helm diff upgrade` và đọc từng thay đổi?
- [ ] Thay đổi nào là **destructive** (đổi selector, đổi PVC, đổi StatefulSet volumeClaimTemplates)?
- [ ] Chart version và image tag đều ghim cụ thể?
- [ ] Có `--atomic --timeout` để tự rollback?
- [ ] Values production đã review, không lẫn giá trị dev?
- [ ] Secret không nằm trong values được commit?
- [ ] Đã thử trên staging với cùng chart version?
- [ ] Biết lệnh rollback và số revision cần quay về?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Helm | Package manager cho K8s | https://helm.sh/docs/ |
| helm-diff | Xem trước thay đổi khi upgrade | https://github.com/databus23/helm-diff |
| Kustomize | Overlay không template | https://kustomize.io/ |
| Artifact Hub | Tìm chart công khai | https://artifacthub.io/ |
| `helm-unittest` | Test chart | https://github.com/helm-unittest/helm-unittest |
| Timoni / cdk8s | Thay thế hiện đại (CUE / code) | https://timoni.sh/ · https://cdk8s.io/ |

## Tham khảo
- Helm Docs — Chart Best Practices: https://helm.sh/docs/chart_best_practices/
- Helm Docs — Charts: https://helm.sh/docs/topics/charts/
- Kubernetes Docs — Declarative management with Kustomize: https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/
- Kubernetes Docs — Recommended Labels: https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
- Artifact Hub — đọc chart mẫu chất lượng cao (bitnami, prometheus-community)

## Liên kết
[[Kubernetes Workloads]] · [[GitOps]] · [[CI-CD Pipeline]] · [[Kubernetes Storage & Configuration]] · [[DevOps]]
