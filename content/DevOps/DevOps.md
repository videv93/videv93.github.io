---
tags: [devops, moc]
type: MOC
updated: 2026-08-28
---
# ⚙️ DevOps — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng của toàn bộ khu vực DevOps. Sắp theo **dòng chảy vận hành thật**: văn hoá → đóng gói ứng dụng → điều phối → dựng hạ tầng → cloud → tự động giao hàng → quan sát → bảo mật.

## Cách dùng vault này
- **Học từ 0** → đi theo [[DevOps Learning Roadmap]].
- **Tra cứu nhanh một object K8s** → vào `02 - Kubernetes`.
- **Chuẩn bị phỏng vấn / review kiến trúc** → [[AWS Well-Architected Framework]] + [[SRE & Reliability Engineering]].
- Mỗi note có 3 tầng: **Khái niệm → Nguyên tắc/Cạm bẫy → Checklist**. Học được điều mới thì thêm vào đúng tầng, đừng tạo note mới.
- `status:` trong frontmatter: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- Quy ước: giải thích bằng **tiếng Việt**, giữ nguyên **thuật ngữ tiếng Anh** — vì docs và đồng nghiệp đều dùng tiếng Anh.

---

## 00 — Nền tảng
- [[DevOps Culture & Principles]] — CALMS, Three Ways, vì sao DevOps không phải một chức danh
- [[SRE & Reliability Engineering]] — SLI/SLO/SLA, error budget, toil
- [[Linux & Networking for DevOps]] — process, filesystem, systemd, DNS, TLS, troubleshooting
- [[DevOps Learning Roadmap]] — lộ trình 6 chặng từ Linux đến platform engineering

## 01 — Container
- [[Container Fundamentals]] — namespace, cgroup, union filesystem; container ≠ VM
- [[Docker Engine]] — kiến trúc daemon/CLI, image vs container, volume, network
- [[Dockerfile & Image Optimization]] — layer cache, multi-stage, distroless, giảm image 10×
- [[Docker Compose]] — môi trường dev nhiều service, healthcheck, profile
- [[Docker Swarm]] — orchestrator sẵn có trong Docker: manager quorum, stack file, rolling update
- [[Container Registry & Image Security]] — tag strategy, scan CVE, sign & SBOM

## 02 — Kubernetes
- [[Kubernetes Architecture]] — Control Plane, Worker Node, reconciliation loop
- [[Kubernetes Workloads]] — Pod, Deployment, ReplicaSet, StatefulSet, DaemonSet, Job/CronJob
- [[Kubernetes Networking]] — Service, Ingress, NetworkPolicy, CNI, DNS trong cụm
- [[Kubernetes Storage & Configuration]] — PV/PVC, StorageClass, ConfigMap, Secret
- [[Kubernetes Operations & Security]] — Namespace, requests/limits, Probes, RBAC, HPA
- [[Helm & Kubernetes Packaging]] — chart, values, Kustomize, khi nào dùng cái nào
- [[What is Kubernetes (k8s)?]] — clipping ByteByteGo: tổng quan control plane & node

## 03 — Infrastructure as Code
- [[Infrastructure as Code]] — declarative vs imperative, immutable infrastructure, drift
- [[Terraform]] — provider, resource, plan/apply, HCL cơ bản
- [[Terraform State & Modules]] — remote state, locking, module design, workspace vs folder
- [[Ansible]] — agentless, inventory, playbook, role, idempotency

## 04 — Cloud & AWS
- [[AWS Global Infrastructure & Networking]] — Region/AZ/Edge, VPC, Subnet, SG vs NACL, Route 53, CloudFront
- [[AWS Compute & Auto Scaling]] — EC2 & mô hình mua, Lambda, ECS/EKS, Fargate, ALB
- [[AWS Storage]] — S3 & storage class, EBS, EFS, Snow Family
- [[AWS Databases]] — RDS, Aurora, DynamoDB, ElastiCache; chọn cái nào khi nào
- [[AWS Security & Identity]] — IAM, KMS, CloudWatch, CloudTrail
- [[AWS Well-Architected Framework]] — 6 trụ cột và cách audit một kiến trúc
- [[Cloud Cost Optimization]] — FinOps, 7 đòn bẩy giảm bill, tagging
- 🖼 Cheat sheet: `0082-aws-cloud-services-cheat-sheet.png` · `0093-cloud-comparison-cheat-sheet.png` (AWS ↔ GCP ↔ Azure)

## 05 — CI/CD & Delivery
- [[CI-CD Pipeline]] — stage chuẩn, build once deploy many, pipeline as code
- [[Deployment Strategies]] — recreate, rolling, blue-green, canary, shadow, A/B
- [[Git Branching & Trunk-Based Development]] — GitFlow vs trunk-based, feature flag
- [[GitOps]] — Git là nguồn sự thật, pull vs push, Argo CD / Flux
- [[Kubernetes Deployment Strategies]] — clipping ByteByteGo: nguồn gốc của note Deployment Strategies

## 06 — Observability
- [[Observability]] — 3 pillars, monitoring vs observability, cardinality
- [[Metrics & Prometheus]] — pull model, PromQL, 4 golden signals, RED/USE
- [[Logging & Log Aggregation]] — structured log, level, pipeline, chi phí
- [[Distributed Tracing]] — span, trace context, OpenTelemetry, sampling
- [[Incident Response & Postmortem]] — severity, on-call, blameless postmortem

## 07 — Bảo mật
- [[DevSecOps]] — shift-left, SAST/DAST/SCA, supply chain
- [[Secrets Management]] — vì sao `.env` trong Git là thảm hoạ, Vault, rotation

---

## 📚 Nguồn học nền tảng dùng chung
| Nguồn | Loại | Link |
|---|---|---|
| Kubernetes Documentation | Docs chuẩn | https://kubernetes.io/docs/home/ |
| Docker Documentation | Docs chuẩn | https://docs.docker.com/ |
| AWS Well-Architected Framework | Docs chuẩn | https://aws.amazon.com/architecture/well-architected/ |
| Terraform Registry & Docs | Docs chuẩn | https://developer.hashicorp.com/terraform/docs |
| Ansible Documentation | Docs chuẩn | https://docs.ansible.com/ |
| Google SRE Book (miễn phí) | Sách | https://sre.google/books/ |
| The Phoenix Project / The DevOps Handbook | Sách | Gene Kim, Jez Humble |
| Accelerate (DORA) | Sách + nghiên cứu | https://dora.dev/ |
| CNCF Landscape | Bản đồ công cụ | https://landscape.cncf.io/ |
| Prometheus / OpenTelemetry Docs | Docs chuẩn | https://prometheus.io/docs/ · https://opentelemetry.io/docs/ |
| roadmap.sh — DevOps | Lộ trình | https://roadmap.sh/devops |
| ByteByteGo System Design 101 | Tổng hợp trực quan | https://github.com/ByteByteGoHq/system-design-101 |

## 🗂 Ghi chú về `_archive-seed/`
`_archive-seed/` giữ nguyên bản gốc `AWS-SEEDS.md` và `Kubernetes-SEEDS.md` trước khi tái cấu trúc. Mọi nội dung trong đó đã được **mở rộng** vào các note ở trên, không có gì bị bỏ đi. Dùng để đối chiếu khi nghi ngờ mất nội dung.

## Liên kết
[[Knowledge Seed Playbook]] — quy trình đã dùng để dựng vault này.
