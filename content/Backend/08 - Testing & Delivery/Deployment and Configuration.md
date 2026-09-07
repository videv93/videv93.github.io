---
tags: [backend, deployment, ops]
status: growing
---
# Deployment and Configuration

> Cùng một artifact chạy ở mọi môi trường; **chỉ config thay đổi**. Đây là điều kiện để "chạy được trên máy tôi" ngừng là một câu nói.

## 1. Twelve-Factor — những điều thật sự quan trọng cho backend
| Factor | Nghĩa thực tế |
|---|---|
| **Config trong môi trường** | Không hardcode, không file config theo môi trường trong repo |
| **Backing services là tài nguyên gắn kèm** | DB/Redis/S3 đổi bằng URL, không đổi bằng code |
| **Build – Release – Run tách biệt** | Một image, nhiều release; không build lại khi deploy |
| **Process stateless** | → [[Scaling and Load Balancing]] |
| **Log là stream ra stdout** | Không tự ghi file, không tự xoay file → [[Observability]] |
| **Dev/prod parity** | Cùng version Postgres, cùng runtime, cùng OS |
| **Disposability** | Khởi động nhanh, tắt êm (graceful shutdown) |

## 2. Config và secret
| Loại | Nơi lưu | Ghi chú |
|---|---|---|
| Config không nhạy cảm | Biến môi trường / ConfigMap | Có trong repo được (giá trị mặc định dev) |
| **Secret** | Secret manager (Vault, AWS/GCP SM), k8s Secret + KMS | Không vào repo, không vào image, không vào log |
| Feature flag | Dịch vụ flag hoặc bảng trong DB | Đổi hành vi không cần deploy |

Nguyên tắc:
- **Validate config lúc khởi động** và **fail fast** — thiếu biến bắt buộc thì chết ngay, đừng chạy nửa vời (Pydantic Settings, envconfig, Zod).
- Không có giá trị mặc định "an toàn" cho secret — thiếu là lỗi.
- Coi mọi secret từng commit vào git là **đã lộ**; xoay khoá. → [[Backend Security]]

## 3. Chiến lược release
| Chiến lược | Cách hoạt động | Đánh đổi |
|---|---|---|
| **Rolling** | Thay dần từng instance | Mặc định; **hai version chạy đồng thời** |
| **Blue-Green** | Hai môi trường, chuyển traffic một lần | Rollback tức thì; tốn gấp đôi tài nguyên |
| **Canary** | 1% → 10% → 100% theo metric | An toàn nhất; cần observability tốt → [[Observability]] |
| **Feature flag** | Deploy code tắt sẵn, bật sau | Tách deploy khỏi release; nợ flag nếu không dọn |

> Hệ quả quan trọng nhất của rolling/canary: **code cũ và code mới chạy cùng lúc.** Mọi thay đổi schema, format message, và API đều phải tương thích hai chiều trong một khoảng thời gian. → [[API Versioning and Contracts]]

## 4. Migration khi deploy — expand & contract
```
Release 1: thêm cột mới (nullable) + code ghi cả cũ lẫn mới
Release 2: backfill theo batch (job nền, không khoá bảng)
Release 3: code đọc cột mới
Release 4: xoá cột cũ
```
Không bao giờ: đổi tên cột trong một release, hay xoá cột mà code cũ còn `SELECT`. Chi tiết kỹ thuật (index concurrently, lock timeout): → [[Database Access and ORM]]

## 5. Container & vòng đời process
- **Multi-stage build**, image nhỏ, chạy bằng **non-root user**, không cài công cụ thừa.
- Ghim version base image, quét lỗ hổng (Trivy) trong CI.
- **Graceful shutdown**: nhận `SIGTERM` → ngừng nhận request mới → hoàn thành việc đang chạy → đóng pool → thoát. Đặt `terminationGracePeriodSeconds` dài hơn request lâu nhất.
- **Liveness vs readiness** phân biệt rõ; readiness phải `false` ngay khi bắt đầu shutdown. → [[Scaling and Load Balancing]]
- Đặt resource request/limit; hiểu rằng chạm memory limit là bị **OOMKilled**, không phải chậm dần.

## 6. Cạm bẫy
- **Config file theo môi trường trong repo** — sớm muộn cũng lệch với thực tế.
- **Migration chạy tự động lúc container khởi động** với nhiều replica → chạy đồng thời, khoá lẫn nhau. Chạy như một job riêng, một lần.
- **Không có đường rollback** — đặc biệt khi migration không đảo ngược được. Luôn hỏi: "hỏng thì quay lại thế nào?"
- **Deploy làm rơi request** vì thiếu graceful shutdown.
- **Secret trong image / trong biến môi trường in ra log lúc khởi động.**
- **Dev dùng SQLite, prod dùng Postgres** — bug chỉ xuất hiện ở production. → [[Testing Backend]]
- **Nợ feature flag** — flag chết nằm lại trong code hàng năm.
- **Không ghim version dependency/base image** — build hôm nay khác build hôm qua.

## 7. Checklist trước khi deploy
- [ ] Cùng một artifact đã chạy qua staging chưa?
- [ ] Config bắt buộc được validate lúc khởi động và fail fast?
- [ ] Migration có tương thích với **cả** version code cũ đang chạy không?
- [ ] Migration có chạy như job riêng biệt, không phải trong mọi replica?
- [ ] Có kế hoạch rollback cụ thể (kể cả cho dữ liệu)?
- [ ] Graceful shutdown đã có và đã test bằng cách kill pod chưa?
- [ ] Readiness probe phản ánh đúng trạng thái sẵn sàng?
- [ ] Secret không nằm trong repo/image/log?
- [ ] Có dashboard + alert để quan sát 15 phút sau deploy? → [[Observability]]
- [ ] Có feature flag để tắt nhanh tính năng mới mà không rollback không?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| Docker multi-stage | Image nhỏ, tách build/runtime | https://docs.docker.com/build/building/multi-stage/ |
| Trivy | Quét lỗ hổng image | https://trivy.dev/ |
| Argo Rollouts / Flagger | Canary & blue-green tự động | https://argo-rollouts.readthedocs.io/ |
| Vault / AWS Secrets Manager | Quản lý secret | https://developer.hashicorp.com/vault |
| Unleash / OpenFeature | Feature flag | https://openfeature.dev/ |

## Tham khảo
- The Twelve-Factor App: https://12factor.net/
- Google SRE Book — Release Engineering: https://sre.google/sre-book/release-engineering/
- Kubernetes — Pod lifecycle & termination: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
- Martin Fowler — *BlueGreenDeployment*: https://martinfowler.com/bliki/BlueGreenDeployment.html
- Martin Fowler — *Feature Toggles*: https://martinfowler.com/articles/feature-toggles.html
- *Accelerate* — Forsgren, Humble, Kim (DORA metrics)

## Liên kết
[[Testing Backend]] · [[Scaling and Load Balancing]] · [[Observability]] · [[Backend Security]] · [[Backend]]
