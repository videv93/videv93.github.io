---
tags: [devops, gitops, kubernetes, delivery]
status: growing
---
# GitOps

> **Git là nguồn sự thật duy nhất về trạng thái hệ thống**, và một agent chạy trong cluster liên tục kéo về, so sánh, và tự sửa cho khớp. Nó là ý tưởng reconciliation loop của [[Kubernetes Architecture|Kubernetes]] mở rộng ra toàn bộ quy trình deploy.

## 1. Bốn nguyên tắc (OpenGitOps)
1. **Declarative** — toàn bộ trạng thái mong muốn được mô tả bằng khai báo, không bằng lệnh.
2. **Versioned & Immutable** — trạng thái lưu trong Git: có lịch sử, có tác giả, có thể quay lại.
3. **Pulled automatically** — agent trong cluster **tự kéo** thay đổi về, không ai đẩy vào.
4. **Continuously reconciled** — agent liên tục so sánh và sửa drift, không chỉ lúc deploy.

## 2. Push vs Pull — điểm khác biệt then chốt
| | **Push** (CI truyền thống) | **Pull** (GitOps) |
|---|---|---|
| Ai deploy | CI runner chạy `kubectl apply` từ bên ngoài | Agent **bên trong** cluster kéo về |
| Credential cluster | CI phải giữ kubeconfig/quyền admin | **Không rời khỏi cluster** ✅ |
| Drift do sửa tay | Không phát hiện | Tự phát hiện và **tự sửa** ✅ |
| Trạng thái thật | Phải đi hỏi cluster | Luôn khớp với Git (hoặc báo OutOfSync) |
| Nhiều cluster | Mỗi cluster một bộ credential trong CI | Mỗi cluster tự kéo — mở rộng tuyến tính ✅ |

> Lợi ích bảo mật thường bị đánh giá thấp: **CI không cần bất kỳ quyền nào trên cluster production.** CI chỉ build image và mở PR sửa manifest.

## 3. Kiến trúc chuẩn — hai repo
```
repo: app-source                  repo: infra-manifests (GitOps repo)
  code + Dockerfile                 environments/
       │ CI build & push              ├── dev/kustomization.yaml
       ↓                              ├── staging/…
  registry (image@sha256:…)           └── prod/…
       │                                    ↑
       └── CI mở PR cập nhật image tag ──────┘
                                             │ Argo CD / Flux watch & sync
                                             ↓
                                        Kubernetes cluster
```
Vì sao **tách hai repo**: thay đổi ở manifest không kích hoạt lại pipeline build (tránh vòng lặp vô hạn), và quyền hạn tách bạch — ai được sửa production manifest khác với ai được sửa code.

## 4. Argo CD vs Flux
| | **Argo CD** | **Flux** |
|---|---|---|
| Giao diện | Web UI mạnh, trực quan diff | CLI-first, không UI mặc định |
| Mô hình | `Application` CRD | Bộ controller (source, kustomize, helm, image) |
| Multi-tenancy | AppProject, RBAC chi tiết | Qua namespace + RBAC K8s |
| Image update tự động | Argo CD Image Updater (tách rời) | Image Automation tích hợp sẵn |
| Hợp với | Đội muốn UI, nhiều team dùng chung | Đội thích thuần GitOps, tự động hoá sâu |

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata: { name: api-prod, namespace: argocd }
spec:
  project: production
  source:
    repoURL: https://github.com/acme/infra-manifests
    targetRevision: main
    path: environments/prod/api
  destination: { server: https://kubernetes.default.svc, namespace: prod }
  syncPolicy:
    automated:
      prune: true        # xoá resource đã bị bỏ khỏi Git
      selfHeal: true     # hoàn tác thay đổi thủ công trên cluster
    syncOptions: [CreateNamespace=true]
```

## 5. Cạm bẫy
- ❌ **Secret plaintext trong GitOps repo** → GitOps đòi mọi thứ ở Git, nhưng secret thì không. Dùng **Sealed Secrets**, **SOPS**, hoặc **External Secrets Operator**. → [[Secrets Management]]
- ❌ **Bật `selfHeal` khi team vẫn quen sửa tay** → thay đổi khẩn cấp bị hoàn tác giữa lúc xử lý sự cố. Phải thống nhất quy trình *trước*, và biết cách tạm dừng sync (`argocd app set --sync-policy none`).
- ❌ **`prune: true` với manifest tạo động bởi thứ khác** (HPA sửa replicas, controller khác gắn label) → cuộc chiến giữa hai controller. Dùng `ignoreDifferences`.
- ❌ **Một repo khổng lồ cho tất cả cluster** → PR nào cũng đụng mọi người. Chia theo môi trường/team.
- ❌ **Dùng tag di động (`:latest`, `:main`) trong manifest** → Git nói một đằng, cluster chạy một nẻo. **Luôn dùng digest hoặc tag bất biến.** → [[Container Registry & Image Security]]
- ❌ **Nghĩ GitOps thay thế CI** → không. CI vẫn build, test, scan; GitOps chỉ lo phần deploy. → [[CI-CD Pipeline]]
- ❌ **Không giám sát chính agent** → Argo CD chết âm thầm, không ai biết deploy đã ngừng hoạt động.

## 6. Checklist triển khai GitOps
- [ ] Có repo manifest riêng, tách khỏi repo source code?
- [ ] Mỗi môi trường có thư mục/branch riêng với quyền review khác nhau?
- [ ] Manifest luôn dùng image digest hoặc tag bất biến?
- [ ] Secret được xử lý bằng SOPS/Sealed Secrets/ESO, không plaintext?
- [ ] CI **không** còn giữ credential cluster production?
- [ ] `selfHeal` và `prune` được bật có ý thức, team đã đồng thuận quy trình?
- [ ] Có quy trình "break-glass" cho sự cố (tạm dừng sync, ai được phép)?
- [ ] Có alert khi Application ở trạng thái `OutOfSync` hoặc `Degraded` quá N phút?
- [ ] Rollback = revert commit — đã thử thật chưa?
- [ ] Bản thân Argo CD/Flux có được cài đặt và quản lý bằng GitOps (app-of-apps) không?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Argo CD | GitOps controller có UI mạnh | https://argo-cd.readthedocs.io/ |
| Flux CD | GitOps toolkit của CNCF | https://fluxcd.io/ |
| Kustomize | Overlay theo môi trường | https://kustomize.io/ |
| SOPS + age | Mã hoá secret trong Git | https://github.com/getsops/sops |
| External Secrets Operator | Đồng bộ secret từ Vault/AWS SM | https://external-secrets.io/ |
| Argo Rollouts | Canary/blue-green theo GitOps | https://argo-rollouts.readthedocs.io/ |

## Tham khảo
- OpenGitOps — Principles v1.0: https://opengitops.dev/
- Weaveworks — GitOps: What you need to know (bài gốc đặt ra thuật ngữ): https://www.weave.works/technologies/gitops/
- Argo CD — Best Practices: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/
- Flux — GitOps repository structure guide: https://fluxcd.io/flux/guides/repository-structure/
- CNCF — GitOps Working Group: https://github.com/cncf/tag-app-delivery

## Liên kết
[[CI-CD Pipeline]] · [[Deployment Strategies]] · [[Helm & Kubernetes Packaging]] · [[Infrastructure as Code]] · [[Secrets Management]] · [[DevOps]]
