---
tags: [devops, cicd, delivery]
status: growing
---
# CI-CD Pipeline

> Pipeline là **dây chuyền biến commit thành phần mềm đang chạy**. Giá trị của nó tỉ lệ thuận với mức độ bạn dám tin nó: một pipeline mà ai cũng phải kiểm tra lại bằng tay thì không phải CI/CD.

## 1. Ba chữ viết tắt, ba mức độ tự động
| | Continuous Integration | Continuous Delivery | Continuous Deployment |
|---|---|---|---|
| Tự động tới đâu | Build + test mọi commit | Sẵn sàng release bất cứ lúc nào, **bấm nút** để lên prod | **Tự động** lên prod, không ai bấm |
| Điều kiện tiên quyết | Test tự động đáng tin | + môi trường staging giống prod, rollback tự động | + [[Deployment Strategies\|canary]] + [[Observability\|observability]] tốt |
> Đa số team dừng ở **Continuous Delivery**, và đó là lựa chọn hợp lý. Chỉ chuyển sang Continuous Deployment khi vòng phản hồi từ production đã đủ nhanh để tự phát hiện hồi quy.

## 2. Các stage chuẩn
```
commit
  → 1. Lint & static analysis          (giây)
  → 2. Unit test                       (< 2 phút — cửa ngõ nhanh nhất)
  → 3. Build artifact / image          (build MỘT LẦN duy nhất)
  → 4. Security scan (SCA, SAST, image CVE, IaC)
  → 5. Integration / contract test     (docker compose, testcontainers)
  → 6. Push image (tag bất biến + digest)
  → 7. Deploy staging  → smoke test → E2E
  → 8. [Manual approval]               (nếu Continuous Delivery)
  → 9. Deploy production (canary/rolling)
  → 10. Verify: metric, error rate, SLO burn → tự rollback nếu xấu
```

### Nguyên tắc "Build once, deploy many"
Artifact được build **một lần** ở stage 3 và **cùng một digest** đi qua staging rồi production. Khác biệt giữa các môi trường nằm hoàn toàn ở **cấu hình runtime**, không ở artifact.
> Build lại cho từng môi trường phá vỡ đảm bảo cốt lõi: *cái đã test chính là cái đang chạy*. → [[Container Registry & Image Security]]

## 3. Bảy nguyên tắc pipeline tốt
1. **Fail fast** — xếp stage rẻ và nhanh lên trước. Không ai đợi 20 phút để biết mình quên format code.
2. **Nhanh dưới 10 phút cho CI** — trên ngưỡng đó, người ta bắt đầu bỏ qua kết quả và gộp commit.
3. **Pipeline as code**, nằm cùng repo, review qua PR. Không cấu hình bằng cách click UI.
4. **Idempotent và tái lập được** — chạy lại cùng commit cho cùng kết quả. Ghim version của mọi tool và action.
5. **Không secret dài hạn** — dùng **OIDC federation** (GitHub Actions → IAM Role), short-lived token. → [[AWS Security & Identity]]
6. **Quyền tối thiểu cho pipeline** — job build không cần quyền deploy production.
7. **Rollback nhanh hơn fix forward** — và phải được test định kỳ, không chỉ tồn tại trên giấy.

## 4. Ví dụ GitHub Actions
```yaml
name: ci-cd
on:
  push: { branches: [main] }
  pull_request:

permissions:
  contents: read
  id-token: write          # cần cho OIDC, KHÔNG cần secret AWS

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    outputs:
      digest: ${{ steps.push.outputs.digest }}
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::1234:role/gha-deploy
          aws-region: ap-southeast-1
      - uses: aws-actions/amazon-ecr-login@v2
      - uses: docker/build-push-action@v6
        id: push
        with:
          push: true
          tags: ${{ vars.ECR }}/api:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      - name: Scan image
        run: trivy image --severity HIGH,CRITICAL --exit-code 1 ${{ vars.ECR }}/api:${{ github.sha }}

  deploy-prod:
    needs: build-and-push
    environment: production     # gate approval nằm ở đây
    runs-on: ubuntu-latest
    steps:
      - run: ./scripts/deploy.sh ${{ needs.build-and-push.outputs.digest }}
```

## 5. Cạm bẫy
- ❌ **Test flaky** → team học cách bấm "re-run" theo phản xạ, và pipeline mất hết giá trị. Flaky test phải bị quarantine và sửa, không bị bỏ qua.
- ❌ **Pipeline chậm** → dev gộp nhiều thay đổi vào một PR lớn, tức là đi ngược lại chính mục tiêu của CI.
- ❌ **Secret trong biến môi trường của CI** rồi in ra log khi debug. Dùng OIDC + masked secret.
- ❌ **Deploy bằng script chạy trên máy cá nhân** → không audit, không tái lập.
- ❌ **Build khác nhau cho từng môi trường** → xem lại "build once".
- ❌ **Không có bước verify sau deploy** → biết mình hỏng qua ticket của khách hàng.
- ❌ **Migration database chạy tự động không kiểm soát** → rollback code được, rollback schema thì không. Dùng chiến lược **expand → migrate → contract** để mọi thay đổi schema tương thích ngược ít nhất một version.
- ❌ **Runner tự quản chạy với quyền admin và không cách ly** → một PR độc hại chiếm được hạ tầng CI (một hướng tấn công supply chain thực tế). → [[DevSecOps]]

## 6. Checklist một pipeline production
- [ ] CI chạy dưới 10 phút? Biết stage nào chậm nhất không?
- [ ] Mọi PR đều chạy đủ: lint, test, security scan?
- [ ] Artifact build một lần, dùng digest xuyên suốt các môi trường?
- [ ] Không có credential dài hạn nào trong CI (đã dùng OIDC)?
- [ ] Quyền của mỗi job là tối thiểu (job test không có quyền deploy)?
- [ ] Có smoke test tự động sau deploy?
- [ ] Có cơ chế rollback tự động khi metric xấu, và đã test nó?
- [ ] Migration DB tương thích ngược, tách khỏi deploy code?
- [ ] Pipeline definition nằm trong Git, được review như code?
- [ ] Có đo DORA metrics từ chính pipeline này không? → [[DevOps Culture & Principles]]

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| GitHub Actions | Tích hợp sâu với GitHub, marketplace lớn | https://docs.github.com/actions |
| GitLab CI | All-in-one, mạnh ở self-hosted | https://docs.gitlab.com/ee/ci/ |
| Jenkins | Linh hoạt tối đa, chi phí vận hành cao | https://www.jenkins.io/doc/ |
| Argo Workflows / Tekton | CI native trên Kubernetes | https://tekton.dev/ |
| Dagger | Pipeline chạy được y hệt ở local | https://dagger.io/ |
| Testcontainers | Dependency thật trong integration test | https://testcontainers.com/ |

## Tham khảo
- Jez Humble & David Farley — *Continuous Delivery*
- Google Cloud — DevOps tech: Continuous Delivery: https://dora.dev/capabilities/continuous-delivery/
- GitHub Docs — Security hardening for GitHub Actions: https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions
- Martin Fowler — Continuous Integration: https://martinfowler.com/articles/continuousIntegration.html
- CNCF — Software Supply Chain Best Practices: https://github.com/cncf/tag-security

## Liên kết
[[Deployment Strategies]] · [[GitOps]] · [[Git Branching & Trunk-Based Development]] · [[Container Registry & Image Security]] · [[DevOps Culture & Principles]] · [[DevOps]]
