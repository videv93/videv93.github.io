---
tags: [devops, foundation, roadmap]
status: growing
---
# DevOps Learning Roadmap

> Lộ trình 6 chặng. Nguyên tắc xuyên suốt: **mỗi chặng phải kết thúc bằng một thứ chạy được**, không phải bằng một khoá học xem hết.

## 1. Bản đồ 6 chặng
| #   | Chặng               | Học gì                                                   | Sản phẩm chứng minh                                                    |
| --- | ------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | Nền tảng            | Linux, mạng, Git, một ngôn ngữ script (Bash + Python/Go) | Script tự động backup + restore, có log và exit code đúng              |
| 2   | Container           | Docker, Dockerfile, Compose                              | App 3 service (web + api + db) chạy bằng 1 lệnh `docker compose up`    |
| 3   | CI/CD               | GitHub Actions/GitLab CI, test tự động, artifact         | Push code → tự build, test, push image lên registry                    |
| 4   | Cloud               | AWS core: IAM, VPC, EC2, S3, RDS                         | Deploy app chặng 2 lên EC2 trong VPC tự dựng, có ALB                   |
| 5   | IaC                 | Terraform, Ansible                                       | Xoá sạch tài khoản rồi dựng lại toàn bộ hạ tầng bằng `terraform apply` |
| 6   | Orchestration + Ops | Kubernetes, Helm, Prometheus, GitOps                     | App chạy trên EKS, có HPA, dashboard, alert, deploy bằng Argo CD       |

## 2. Chi tiết từng chặng
### Chặng 1 — Nền tảng (4–6 tuần)
→ [[Linux & Networking for DevOps]]
- Thành thạo shell: pipe, redirect, `grep/sed/awk`, `find`, exit code, `set -euo pipefail`.
- Git: branch, rebase vs merge, resolve conflict, tag. → [[Git Branching & Trunk-Based Development]]
- Mạng: CIDR, DNS, TLS, HTTP.
- ✋ **Đừng bỏ qua chặng này.** Mọi lỗi khó ở chặng 6 đều truy về đây.

### Chặng 2 — Container (3–4 tuần)
→ [[Container Fundamentals]] · [[Docker Engine]] · [[Dockerfile & Image Optimization]] · [[Docker Compose]]
- Hiểu namespace/cgroup trước khi học lệnh `docker run`.
- Bài tập: giảm image Node/Python từ ~1GB xuống < 150MB bằng multi-stage.

### Chặng 3 — CI/CD (3 tuần)
→ [[CI-CD Pipeline]] · [[Deployment Strategies]]
- Pipeline as code từ ngày đầu, không click UI.
- Bài tập: pipeline có cache dependency, chạy test song song, build image một lần và tái dùng cho mọi môi trường.

### Chặng 4 — Cloud (6–8 tuần)
→ [[AWS Global Infrastructure & Networking]] · [[AWS Compute & Auto Scaling]] · [[AWS Storage]] · [[AWS Databases]] · [[AWS Security & Identity]]
- Học theo thứ tự: IAM → VPC → EC2 → S3 → RDS → ALB/ASG.
- **Bật billing alert ngay ngày đầu** (\$5) — xem [[Cloud Cost Optimization]].
- Chứng chỉ tuỳ chọn: AWS Solutions Architect Associate (SAA-C03) là mốc kiểm tra tốt.

### Chặng 5 — IaC (4 tuần)
→ [[Infrastructure as Code]] · [[Terraform]] · [[Terraform State & Modules]] · [[Ansible]]
- Bài tập chốt chặng: `terraform destroy` toàn bộ rồi `apply` lại — nếu dựng lại được y nguyên, bạn đã hiểu IaC.

### Chặng 6 — Orchestration & Ops (8–12 tuần)
→ [[Kubernetes Architecture]] → [[Kubernetes Workloads]] → [[Kubernetes Networking]] → [[Kubernetes Storage & Configuration]] → [[Kubernetes Operations & Security]] → [[Helm & Kubernetes Packaging]] → [[GitOps]]
- Song song: [[Observability]], [[Metrics & Prometheus]], [[Logging & Log Aggregation]].
- Bắt đầu bằng `kind`/`minikube` local, chỉ lên EKS khi đã hiểu object.

## 3. Nguyên tắc học
1. **Học theo sự cố, không theo mục lục.** Cố tình làm hỏng (xoá pod, đầy disk, hết quota) rồi sửa — kiến thức từ đó mới dính.
2. **Mỗi công cụ mới, hỏi 3 câu:** Nó thay thế việc gì làm tay? Trạng thái nó lưu ở đâu? Khi nó chết thì sao?
3. **Viết lại bằng lời của mình** vào chính vault này ngay sau khi làm xong — nếu viết không nổi thì chưa hiểu.
4. **Đọc source of truth**, không đọc blog tổng hợp: docs chính thức của K8s/Terraform/AWS đều rất tốt.
5. **Đừng học 3 cloud cùng lúc.** Giỏi sâu AWS rồi chuyển sang GCP/Azure chỉ mất vài tuần vì khái niệm ánh xạ gần 1-1.

## 4. Cạm bẫy của người tự học
- ❌ Nhảy thẳng vào Kubernetes khi chưa vững Docker và mạng → học vẹt `kubectl`, gặp lỗi CrashLoopBackOff là bế tắc.
- ❌ Sưu tầm công cụ (tutorial hell) thay vì đào sâu một stack.
- ❌ Chỉ làm lab, không bao giờ vận hành thứ gì có người dùng thật — thiếu hoàn toàn kỹ năng on-call.
- ❌ Học chứng chỉ để thi, không để làm → quên sau 3 tháng.
- ❌ Quên tắt tài nguyên AWS sau lab → hoá đơn bất ngờ.

## 5. Checklist "đã sẵn sàng đi làm DevOps"
- [ ] Debug được một service chết mà chỉ có SSH và log?
- [ ] Viết được Dockerfile production-grade (non-root, multi-stage, healthcheck)?
- [ ] Dựng lại toàn bộ hạ tầng từ số 0 bằng code trong < 1 giờ?
- [ ] Giải thích được request đi từ trình duyệt tới container qua những chặng nào?
- [ ] Đọc được `terraform plan` và biết thay đổi nào là destructive?
- [ ] Biết rollback một deployment K8s và biết khi nào **không** nên rollback (đã migrate DB)?
- [ ] Thiết lập được một alert có ý nghĩa (dựa trên SLO) thay vì alert CPU > 80%?

## Tham khảo
- roadmap.sh — DevOps Roadmap: https://roadmap.sh/devops
- Kubernetes — Learn Kubernetes Basics: https://kubernetes.io/docs/tutorials/kubernetes-basics/
- AWS Skill Builder (free tier): https://skillbuilder.aws/
- KodeKloud / Killercoda labs miễn phí: https://killercoda.com/
- *The Phoenix Project* — đọc để hiểu vì sao, trước khi học cái gì

## Liên kết
[[DevOps Culture & Principles]] · [[Linux & Networking for DevOps]] · [[Container Fundamentals]] · [[DevOps]]
