---
tags: [devops, git, cicd, workflow]
status: growing
---
# Git Branching & Trunk-Based Development

> Chiến lược branch quyết định **kích thước lô hàng (batch size)** của đội. Batch nhỏ ⇒ merge dễ, review kỹ, rủi ro thấp, ship nhanh. Mọi tranh cãi về GitFlow vs trunk-based thực chất là tranh cãi về batch size.

## 1. Ba mô hình
| | **Trunk-Based** | **GitHub Flow** | **GitFlow** |
|---|---|---|---|
| Branch dài hạn | Chỉ `main` | Chỉ `main` | `main`, `develop`, `release/*`, `hotfix/*` |
| Tuổi feature branch | **< 1 ngày** | Vài ngày | Vài tuần |
| Release | Từ `main`, liên tục | Từ `main` | Từ `release/*`, theo đợt |
| Hợp với | Ship liên tục, có test tốt | SaaS web, đội nhỏ–vừa | Phần mềm có version cài đặt, hỗ trợ nhiều bản cùng lúc |
| DORA khuyến nghị | ✅ | ✅ (biến thể) | ❌ với sản phẩm ship liên tục |

> Nghiên cứu DORA chỉ ra tương quan mạnh: **branch tồn tại càng ngắn, hiệu năng giao hàng càng cao**. GitFlow không "sai" — nó chỉ được thiết kế cho bối cảnh khác (phần mềm đóng gói, nhiều version được hỗ trợ song song). → [[DevOps Culture & Principles]]

## 2. Trunk-Based Development thực chiến
```
main ──●──●──●──●──●──●──●──→   (luôn deployable)
        \    /  \    /
         ●──●    ●──●            feature branch sống < 24h
```
Quy tắc:
1. **Branch từ `main`, merge lại `main` trong ngày.** Chưa xong thì tách nhỏ hơn nữa.
2. **`main` luôn ở trạng thái deploy được** — bảo vệ bằng branch protection + CI bắt buộc pass.
3. **Code chưa hoàn thiện vẫn merge được** — giấu sau **feature flag**, thay vì giấu trong branch.
4. **PR nhỏ** (< 400 dòng thay đổi) — vượt ngưỡng đó chất lượng review sụt rõ rệt.
5. **Release bằng tag**, không bằng branch dài hạn.

### Feature flag — thứ làm trunk-based khả thi
```js
if (flags.isEnabled('new-checkout', { userId })) {
  return newCheckout();
}
return legacyCheckout();
```
- Tách **deploy** (đưa code lên) khỏi **release** (bật cho người dùng) — đây mới là ý tưởng cốt lõi.
- Cho phép rollback tính năng **trong vài giây, không cần redeploy**.
- Là nền tảng kỹ thuật của [[Deployment Strategies|A/B Testing và canary theo người dùng]].
- ⚠️ **Flag là nợ kỹ thuật**: đặt ngày hết hạn, và xoá flag ngay sau khi tính năng ổn định. Codebase có 200 flag cũ thì không ai dám xoá cái nào.

## 3. Merge vs Rebase vs Squash
| Cách | Lịch sử | Dùng khi |
|---|---|---|
| **Merge commit** | Giữ nguyên đồ thị, có commit merge | Muốn giữ ngữ cảnh đầy đủ của nhánh |
| **Squash merge** | 1 PR = 1 commit trên `main` | ✅ Mặc định tốt: lịch sử `main` sạch, `git bisect` dễ, revert gọn |
| **Rebase merge** | Lịch sử tuyến tính, giữ từng commit | Đội kỷ luật, commit có ý nghĩa từng cái |
> Quy tắc an toàn: **không bao giờ rebase branch đã push và có người khác dùng** — nó viết lại lịch sử chung.

## 4. Quy ước hỗ trợ
- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `BREAKING CHANGE:`) ⇒ tự sinh CHANGELOG và tự tính semver bằng `semantic-release`.
- **Semantic Versioning** `MAJOR.MINOR.PATCH` — dùng cho artifact và [[Helm & Kubernetes Packaging|chart]].
- **CODEOWNERS** — tự động gán reviewer đúng người.
- **Branch protection**: bắt buộc CI pass, bắt buộc ≥ 1 approval, chặn force-push vào `main`, bắt buộc branch cập nhật trước khi merge.
- **Signed commits** (GPG/SSH) cho repo nhạy cảm.

## 5. Cạm bẫy
- ❌ **Long-lived feature branch** → merge hell: conflict hàng trăm file, review không nổi, và không ai dám merge trước release.
- ❌ **Áp GitFlow cho SaaS web** → thêm hai lớp branch mà chẳng giải quyết vấn đề nào có thật.
- ❌ **Trunk-based mà không có test tự động** → `main` hỏng liên tục, cả team bị chặn.
- ❌ **Feature flag không bao giờ được dọn** → tổ hợp trạng thái bùng nổ, không test nổi.
- ❌ **Commit secret rồi xoá ở commit sau** → vẫn nằm trong lịch sử. Phải **rotate secret**, và cân nhắc `git filter-repo`. → [[Secrets Management]]
- ❌ **PR khổng lồ "vì tất cả liên quan nhau"** → gần như luôn tách được: refactor riêng, tính năng riêng.
- ❌ **Cherry-pick giữa các branch dài hạn** như quy trình thường xuyên → dấu hiệu mô hình branch sai.

## 6. Checklist
- [ ] Feature branch trung bình sống bao lâu? (đo được không?)
- [ ] `main` có branch protection: CI bắt buộc, cấm force-push?
- [ ] PR trung bình bao nhiêu dòng? Có ngưỡng team đồng thuận không?
- [ ] Có hệ thống feature flag, và flag có ngày hết hạn không?
- [ ] Có `.gitignore` chuẩn và secret scanning (gitleaks / GitHub secret scanning) không?
- [ ] Quy ước commit message có được thực thi tự động (commitlint) không?
- [ ] Release có tag và CHANGELOG tự sinh không?
- [ ] Người mới có thể tìm được "commit nào gây ra bug này" bằng `git bisect` không?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| `semantic-release` | Tự động version + CHANGELOG từ commit | https://semantic-release.gitbook.io/ |
| commitlint + husky | Ép quy ước commit ở local | https://commitlint.js.org/ |
| gitleaks | Quét secret trong lịch sử Git | https://github.com/gitleaks/gitleaks |
| Unleash / OpenFeature | Feature flag mã nguồn mở | https://www.getunleash.io/ · https://openfeature.dev/ |
| `git-filter-repo` | Viết lại lịch sử để gỡ file/secret | https://github.com/newren/git-filter-repo |

## Tham khảo
- Trunk Based Development (trang chính thức): https://trunkbaseddevelopment.com/
- DORA — Trunk-based development capability: https://dora.dev/capabilities/trunk-based-development/
- Martin Fowler — Feature Toggles: https://martinfowler.com/articles/feature-toggles.html
- Conventional Commits: https://www.conventionalcommits.org/
- Vincent Driessen — A successful Git branching model (GitFlow gốc, kèm ghi chú của chính tác giả về giới hạn): https://nvie.com/posts/a-successful-git-branching-model/

## Liên kết
[[CI-CD Pipeline]] · [[Deployment Strategies]] · [[GitOps]] · [[DevOps Culture & Principles]] · [[DevOps]]
