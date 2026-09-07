---
tags: [devops, cicd, delivery, deployment]
status: growing
---
# Deployment Strategies

> Sáu cách đưa version mới ra production. Mỗi chiến lược là một điểm đánh đổi giữa **downtime**, **chi phí hạ tầng**, **độ phức tạp** và **mức độ rủi ro bạn chấp nhận cho người dùng thật**.
> Nguồn gốc note: clipping [[Kubernetes Deployment Strategies]] (ByteByteGo) — mở rộng thêm cơ chế, cạm bẫy và checklist.

## 1. Bảng so sánh
| Chiến lược | Downtime | Chi phí hạ tầng | Độ phức tạp | Use case |
|---|---|---|---|---|
| **Recreate** | **Có** | 1× | Rất thấp | Ứng dụng không quan trọng, giai đoạn phát triển ban đầu, hoặc khi hai version không thể cùng tồn tại |
| **Rolling Update** | Không | ~1.1× | Thấp | Release định kỳ — **mặc định của Kubernetes** |
| **Blue-Green** | Không | **2×** | Trung bình | Cập nhật rủi ro cao, cần rollback tức thì |
| **Canary** | Không | ~1.1× | Trung bình–cao | Kiểm chứng tác động trên một tập nhỏ người dùng |
| **Shadow** | Không | 2× + mock service | **Cao nhất** | Kiểm chứng hiệu năng/hành vi của version mới trong môi trường thật |
| **A/B Testing** | Không | ~1.2× | Cao (cần phân tích) | So sánh hiệu quả kinh doanh/UX giữa nhiều version |

## 2. Chi tiết từng chiến lược

### Recreate
Tất cả instance hiện tại bị **kết thúc cùng lúc**, rồi instance mới với version cập nhật được tạo ra.
- Downtime: **Có**
- Use case: ứng dụng không quan trọng, hoặc trong giai đoạn phát triển ban đầu.
- Vẫn hữu ích khi: hai version **không thể** chạy song song (ví dụ dùng chung một volume `ReadWriteOnce`, hoặc schema DB không tương thích ngược).
```yaml
spec: { strategy: { type: Recreate } }
```

### Rolling Update
Các instance được cập nhật **lần lượt từng cái một**, đảm bảo tính sẵn sàng cao trong suốt quá trình.
- Downtime: Không · Use case: release định kỳ.
- Điều khiển bằng `maxSurge` (tạo thêm bao nhiêu) và `maxUnavailable` (được phép thiếu bao nhiêu).
- ⚠️ Trong lúc rolling, **hai version cùng phục vụ traffic** ⇒ API và schema DB phải tương thích ngược.
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }   # zero downtime
```

### Blue-Green
- Duy trì **hai môi trường giống hệt nhau**: một chạy version hiện tại (**blue**), một chạy version cập nhật (**green**).
- Traffic bắt đầu ở blue, sau đó **chuyển sang** môi trường green đã chuẩn bị sẵn.
- Downtime: Không · Use case: **cập nhật rủi ro cao** (high-stake updates).
- **Ưu điểm lớn nhất:** rollback = chuyển traffic ngược lại, mất vài giây.
- Chuyển traffic bằng: đổi `selector` của Service, đổi target group của ALB, hoặc weighted DNS.
- ⚠️ Giữ blue chạy thêm ít nhất một chu kỳ quan sát trước khi xoá. Và chú ý: database thường **dùng chung** giữa blue và green — đó là phần không rollback được.

### Canary
Version mới được phát hành cho **một tập con người dùng hoặc server** để kiểm thử trước khi triển khai rộng hơn.
- Downtime: Không · Use case: kiểm chứng tác động trên một tập nhỏ người dùng.
- Tiến trình điển hình: **1% → 5% → 25% → 50% → 100%**, mỗi bước quan sát 10–30 phút.
- **Điều kiện bắt buộc:** phải có metric để quyết định đi tiếp hay quay lại (error rate, latency p99, tỉ lệ chuyển đổi). Canary không có [[Observability|observability]] chỉ là rolling update chậm hơn.
- Tự động hoá bằng **Argo Rollouts** hoặc **Flagger** với *analysis template* đọc Prometheus và tự abort.

### Shadow
Một **bản sao của traffic thật** được chuyển hướng sang version mới để kiểm thử **mà không ảnh hưởng tới người dùng production**.
- Đây là **chiến lược phức tạp nhất**, và liên quan tới việc thiết lập các **mock service** để tương tác với version mới của deployment.
- Downtime: Không · Use case: kiểm chứng hiệu năng và hành vi của version mới trong môi trường thực tế.
- 🚨 Cạm bẫy chí mạng: shadow traffic **không được gây side effect thật** — không ghi DB thật, không gửi email, không trừ tiền. Đó chính là lý do phải có mock service.

### A/B Testing
**Nhiều version được kiểm thử đồng thời trên các nhóm người dùng khác nhau** để so sánh hiệu năng hoặc trải nghiệm người dùng.
- Khác canary ở **mục đích**: canary hỏi *"version mới có hỏng không?"* (kỹ thuật); A/B hỏi *"version nào tốt hơn cho kinh doanh?"* (sản phẩm).
- Cần: phân nhóm ổn định theo user id, cỡ mẫu đủ lớn, và ý nghĩa thống kê — không phải "nhìn thấy tăng thì chốt".
- Thường triển khai bằng **feature flag** ở tầng ứng dụng, không phải bằng hạ tầng. → [[Git Branching & Trunk-Based Development]]

## 3. Cây quyết định
```
Hai version chạy song song được không?
├── Không → Recreate (chấp nhận downtime, chọn giờ thấp điểm)
└── Có
    ├── Cần rollback tức thì, có ngân sách 2× → Blue-Green
    ├── Thay đổi rủi ro cao, cần bằng chứng từ traffic thật → Canary
    ├── Cần kiểm chứng hiệu năng mà không chạm người dùng → Shadow
    ├── Cần so sánh hiệu quả kinh doanh → A/B Testing
    └── Còn lại (đa số) → Rolling Update
```

## 4. Điều kiện tiên quyết cho mọi chiến lược zero-downtime
1. **Graceful shutdown** — app bắt `SIGTERM`, ngừng nhận request mới, xử lý nốt request đang chạy. → [[Container Fundamentals]]
2. **Readiness probe chính xác** — pod chỉ vào load balancer khi thật sự sẵn sàng. → [[Kubernetes Operations & Security]]
3. **API tương thích ngược** ít nhất một version.
4. **Migration DB theo expand → migrate → contract**:
   - *Expand*: thêm cột/bảng mới, code cũ vẫn chạy.
   - *Migrate*: deploy code mới ghi cả hai, backfill dữ liệu.
   - *Contract*: sau khi ổn định, xoá cột cũ ở release sau.
5. **Idempotent** — request bị retry trong lúc chuyển đổi không được gây hậu quả kép.

## 5. Cạm bẫy
- ❌ **Rollback code nhưng không rollback được schema** → đây là lý do #1 khiến "rollback trong 1 phút" thất bại trên thực tế.
- ❌ **Canary không có tiêu chí abort định lượng** → người ta nhìn dashboard và đoán.
- ❌ **Canary 1% quá ngắn** → lỗi chỉ xuất hiện sau vài phút warm-up không kịp lộ ra.
- ❌ **Blue-Green nhưng quên tài nguyên dùng chung** (DB, cache, queue) → green làm hỏng dữ liệu của blue.
- ❌ **Shadow traffic gây side effect thật** → gửi email trùng, tính tiền hai lần.
- ❌ **Sticky session không xử lý** → user bị đá ra khi pod cũ biến mất.
- ❌ **Deploy vào chiều thứ Sáu mà không có ai trực** — không phải mê tín, chỉ là toán học về thời gian phát hiện sự cố.

## 6. Checklist trước một lần deploy production
- [ ] Chiến lược đã chọn có phù hợp với mức rủi ro của thay đổi này không?
- [ ] Có thay đổi schema DB không? Đã tương thích ngược chưa?
- [ ] App xử lý `SIGTERM` và có readiness probe đúng chưa?
- [ ] Tiêu chí abort được định nghĩa bằng số (error rate > X%, p99 > Yms) chưa?
- [ ] Rollback mất bao lâu? Ai được quyền quyết định rollback?
- [ ] Có dashboard theo dõi riêng cho version mới (tách metric theo label version) không?
- [ ] Feature flag có sẵn để tắt tính năng mà không cần redeploy không?
- [ ] Đã thông báo cho những team phụ thuộc chưa?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Argo Rollouts | Canary/blue-green có phân tích tự động cho K8s | https://argo-rollouts.readthedocs.io/ |
| Flagger | Progressive delivery với service mesh | https://flagger.app/ |
| Istio / Linkerd | Traffic splitting theo % ở tầng mesh | https://istio.io/ |
| LaunchDarkly / Unleash / OpenFeature | Feature flag | https://www.getunleash.io/ · https://openfeature.dev/ |
| AWS CodeDeploy | Blue-green cho ECS/Lambda/EC2 | https://docs.aws.amazon.com/codedeploy/ |

## Tham khảo
- ByteByteGo — Kubernetes Deployment Strategies: https://bytebytego.com/guides/kubernetes-deployment-strategies/
- Kubernetes Docs — Deployment strategies: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy
- Martin Fowler — BlueGreenDeployment: https://martinfowler.com/bliki/BlueGreenDeployment.html
- Martin Fowler — CanaryRelease: https://martinfowler.com/bliki/CanaryRelease.html
- Argo Rollouts — Canary analysis: https://argo-rollouts.readthedocs.io/en/stable/features/canary/
- Google SRE Workbook — Canarying Releases: https://sre.google/workbook/canarying-releases/

## Liên kết
[[CI-CD Pipeline]] · [[Kubernetes Workloads]] · [[GitOps]] · [[Observability]] · [[Kubernetes Deployment Strategies]] · [[DevOps]]
