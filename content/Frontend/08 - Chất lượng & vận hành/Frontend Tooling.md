---
tags: [frontend, tooling]
status: evergreen
---
# Frontend Tooling

> Công cụ tốt biến quy ước thành **ràng buộc tự động**. Bất kỳ quy tắc nào chỉ tồn tại trong tài liệu hoặc trong code review sẽ bị vi phạm — câu hỏi chỉ là khi nào.

> [!note] Ghi chú nguồn
> Seed ghi: *"TypeScript: Tôi nghĩ không có nhiều để nói về lựa chọn này. TypeScript đã trở thành tiêu chuẩn ngành cho dự án JavaScript và là lựa chọn tốt để có trải nghiệm developer tốt hơn, ít bug hơn và code dễ bảo trì hơn."*
> Và: *"Cho tooling, tôi khuyến nghị dùng ESLint (có thể là Biome trong tương lai) và Prettier. Dù tôi mong có một giải pháp thay thế Storybook tốt, nó vẫn là lựa chọn của tôi cho tài liệu UI. Ngoài ra tôi dùng tsx để thực thi TypeScript (ví dụ seed database) từ terminal."*

## 1. Khái niệm cốt lõi

### TypeScript

Cấu hình đáng bật ngay từ đầu:

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noUnusedLocals": true,
  "verbatimModuleSyntax": true,
  "paths": { "@/*": ["./src/*"] }
}
```

`noUncheckedIndexedAccess` là tuỳ chọn bị bỏ qua nhiều nhất và có giá trị cao nhất: nó làm `arr[0]` có kiểu `T | undefined` thay vì `T`, bắt đúng loại bug mà `strict` một mình bỏ sót.

| Nên | Không nên |
|---|---|
| `unknown` rồi thu hẹp | `any` |
| Type từ schema (Zod `infer`) | Định nghĩa type hai lần |
| Discriminated union cho state | Object với field optional lung tung |
| `satisfies` để kiểm mà giữ kiểu hẹp | `as` |
| `as const` cho literal | |

**Type không phải validation.** TypeScript biến mất lúc runtime; dữ liệu từ API và form phải validate bằng schema — xem [[React Server Functions]].

### Lint & format

| Công cụ | Vai trò | Ghi chú |
|---|---|---|
| **ESLint** | Lint | Hệ sinh thái plugin lớn nhất |
| **Biome** | Lint + format | Nhanh hơn nhiều (Rust), một công cụ thay hai |
| **Prettier** | Format | Chuẩn thực tế |
| **oxlint** | Lint | Rất nhanh, dùng kèm ESLint |

Plugin ESLint đáng có:

| Plugin | Bắt |
|---|---|
| `eslint-plugin-react-hooks` | Hook rules, dependency thiếu |
| `eslint-plugin-jsx-a11y` | Lỗi a11y trong JSX |
| `@typescript-eslint` | Quy tắc theo kiểu |
| `eslint-plugin-import` | Thứ tự import, vòng lặp phụ thuộc |
| `eslint-plugin-boundaries` | Ép kiến trúc tầng |
| `prettier-plugin-tailwindcss` | Thứ tự class Tailwind |

### Git hooks

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md,json}": ["prettier --write"]
  }
}
```

`husky` + `lint-staged` chạy lint chỉ trên file đã stage — đủ nhanh để không ai muốn `--no-verify`.

> [!note] Hook không thay thế CI
> Hook có thể bị bỏ qua bằng `--no-verify` và không chạy trên máy CI. Chúng là **phản hồi nhanh**, không phải cổng chất lượng. Cổng thật nằm ở CI.

### CI tối thiểu

```yaml
- typecheck    # tsc --noEmit
- lint         # eslint .
- test         # vitest run
- build        # next build
- size         # size-limit
```

Năm bước này chặn được phần lớn hồi quy. Thêm Lighthouse CI và Playwright khi dự án lớn hơn.

### Công cụ khác trong seed

| Công cụ | Dùng để |
|---|---|
| **tsx** | Chạy file TypeScript từ terminal — seed database, script một lần |
| **Storybook** | Tài liệu UI, dựng trạng thái khó tái tạo, visual test |

Storybook đáng giá nhất ở chỗ nó buộc component phải **dựng được độc lập** — một component không cho vào Storybook được thường là component gắn kết quá chặt.

### Package manager & monorepo

`pnpm` (nhanh, tiết kiệm ổ đĩa, strict về phantom dependency) · `Turborepo` hoặc `Nx` cho monorepo · `changesets` cho versioning.

## 2. Nguyên tắc

1. **`strict: true` + `noUncheckedIndexedAccess` từ ngày đầu.** Thêm sau vào codebase lớn gần như không khả thi.
2. **Không bao giờ tắt cảnh báo `react-hooks` — hãy sửa nguyên nhân.**
3. **Format tự động, đừng tranh luận.** Prettier hoặc Biome, cấu hình một lần rồi thôi.
4. **Lint ràng buộc kiến trúc**, không chỉ style. `eslint-plugin-boundaries` ép được luồng phụ thuộc.
5. **Hook cho phản hồi nhanh, CI làm cổng.**
6. **Cùng phiên bản Node ở local và CI** — dùng `.nvmrc` hoặc `engines`.
7. **Đóng băng dependency bằng lockfile**, và review lockfile diff.
8. **Cập nhật dependency đều đặn hàng tuần**, không dồn một lần mỗi năm.
9. **Type suy ra từ schema**, không viết hai lần.

## 3. Cạm bẫy

- **`any` để "tạm cho qua".** Nó lan ra và vô hiệu hoá kiểm tra kiểu ở mọi nơi nó chạm tới.
- **`as` thay vì thu hẹp kiểu** — nói dối compiler, và bug xuất hiện ở runtime.
- **Tin TypeScript validate dữ liệu runtime.** Type không tồn tại lúc chạy.
- **Tắt `react-hooks/exhaustive-deps`** vì "tôi biết mình đang làm gì". Gần như luôn dẫn tới stale closure.
- **Prettier và ESLint đá nhau** — dùng `eslint-config-prettier` để tắt rule format của ESLint.
- **Hook chậm** → mọi người dùng `--no-verify`.
- **CI không chạy `tsc --noEmit`** vì "build đã typecheck" — Next bỏ qua lỗi type khi build trừ khi cấu hình.
- **`ignoreBuildErrors: true` trong `next.config`** — nó tắt hẳn kiểm tra type lúc build.
- **Phiên bản Node khác nhau** giữa local và CI gây lỗi chỉ xuất hiện ở CI.
- **Không review lockfile diff** — dependency gián tiếp thay đổi âm thầm.
- **Storybook không được bảo trì** → story chết, không ai tin nữa.

## 4. Checklist áp dụng

- [ ] `strict: true` và `noUncheckedIndexedAccess` đã bật chưa?
- [ ] Có `any` hoặc `as` nào không cần thiết không?
- [ ] Dữ liệu ngoài có validate bằng schema không?
- [ ] `react-hooks` và `jsx-a11y` đã bật chưa?
- [ ] CI có chạy typecheck riêng không?
- [ ] Có `ignoreBuildErrors` ở đâu không?
- [ ] Hook có đủ nhanh để không ai bỏ qua không?
- [ ] Node version có khớp giữa local và CI không?
- [ ] Lockfile diff có được review không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| TypeScript | https://www.typescriptlang.org/ | |
| Biome | Lint + format trong một, rất nhanh | https://biomejs.dev/ |
| ESLint | https://eslint.org/ | |
| Prettier | https://prettier.io/ | |
| tsx | Chạy TypeScript từ terminal | https://www.npmjs.com/package/tsx |
| Storybook | https://storybook.js.org/ | |
| husky + lint-staged | Git hook | https://typicode.github.io/husky/ |
| Renovate | Cập nhật dependency tự động | https://docs.renovatebot.com/ |

## Tham khảo

- TypeScript — *tsconfig reference*: https://www.typescriptlang.org/tsconfig
- Matt Pocock — *TSConfig Cheat Sheet*: https://www.totaltypescript.com/tsconfig-cheat-sheet
- Next.js — *ESLint*: https://nextjs.org/docs/app/api-reference/config/eslint
- Biome — *Getting started*: https://biomejs.dev/guides/getting-started/

## Liên kết

[[Frontend Testing Strategy]] · [[Next.js Project Structure]] · [[Frontend Performance Budget]] · [[Frontend Tech Stack 2025]] · [[Frontend]]
