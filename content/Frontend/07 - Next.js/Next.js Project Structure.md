---
tags: [frontend, nextjs]
status: evergreen
---
# Next.js Project Structure

> Danh mục file và folder mà framework hiểu, cùng cách tổ chức phần còn lại — thứ framework **không** quy định và vì vậy hay trở thành mớ hỗn độn.

> [!note] Ghi chú nguồn
> File `Project Structure.md` trong seed là một danh sách trần: hai heading (`Top-level folders`, `Top-level files`) và 21 tên file, không một dòng giải thích. Note này giữ nguyên toàn bộ danh sách và trả lời từng mục.

## 1. Top-level folders

| Folder | Vai trò |
|---|---|
| `app` | **App Router** — route, layout, page. Xem [[Next.js App Router]] |
| `pages` | **Pages Router** — API cũ. Dùng chung được với `app` khi migrate dần |
| `public` | Asset tĩnh phục vụ từ gốc. `public/logo.png` → `/logo.png` |
| `src` | Folder gốc **tuỳ chọn** cho mã nguồn. `src/app` thay `app` |

`public` không qua bundler — không có hash, không tối ưu. File cần cache-busting nên import qua JS để bundler xử lý.

## 2. Top-level files

### Cấu hình framework

| File | Vai trò |
|---|---|
| `next.config.js` | Cấu hình Next: image domain, redirect, rewrite, header, experimental |
| `package.json` | Dependency và script |
| `instrumentation.ts` | Chạy **một lần khi server khởi động** — nơi đặt OpenTelemetry, Sentry init |
| `middleware.ts` | Chạy trước mỗi request khớp matcher. Xem [[Next.js Routing Patterns]] |

### Biến môi trường

| File | Nạp khi | Commit? |
|---|---|---|
| `.env` | Mọi môi trường | ⚠️ chỉ khi không có secret |
| `.env.local` | Mọi môi trường, **ghi đè** các file khác | ❌ **không bao giờ** |
| `.env.development` | `next dev` | ✅ |
| `.env.production` | `next build` / `next start` | ✅ |

> [!warning] `NEXT_PUBLIC_` nghĩa là công khai thật
> Biến có prefix `NEXT_PUBLIC_` được **nhúng thẳng vào bundle JavaScript** lúc build. Chúng nằm trong file JS mà bất kỳ ai cũng tải và đọc được. Không bao giờ đặt prefix này lên API key, database URL, hay bất cứ thứ gì là secret.
>
> Hệ quả thứ hai: chúng được **cố định lúc build**, không đọc lúc runtime — đổi giá trị đòi hỏi build lại.

### Lint, type, ignore

| File | Vai trò |
|---|---|
| `.eslintrc.json` | Cấu hình ESLint (bản mới: `eslint.config.mjs`) |
| `.gitignore` | Phải có `.env*.local`, `node_modules`, `.next` |
| `next-env.d.ts` | Khai báo type của Next — **tự sinh, không sửa** |
| `tsconfig.json` | Cấu hình TypeScript |
| `jsconfig.json` | Bản JavaScript của tsconfig, khi không dùng TS |

Path alias trong `tsconfig.json` là thứ đáng cấu hình đầu tiên:

```json
{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
```

### Configuring — `next.config.js`

> [!note] Ghi chú nguồn
> `NextJS.md` trong seed liệt kê `Configuring`, `Fast Refresh`, `Supported Browsers` và `next.config.js Options` như những mục chưa viết. Phần này trả bốn mục đó.

Các nhóm option hay dùng nhất:

| Option | Dùng để |
|---|---|
| `images.remotePatterns` | Cho phép domain ảnh ngoài cho `next/image` |
| `redirects()` / `rewrites()` | Chuyển hướng và proxy ở tầng framework |
| `headers()` | Security header — xem [[Frontend Deployment]] |
| `output: 'standalone'` | Build chạy được bằng `node server.js`, container hoá được |
| `transpilePackages` | Transpile package trong monorepo |
| `serverExternalPackages` | Loại package khỏi bundle server (driver native) |
| `experimental` | Tính năng chưa ổn định — ⚠️ đọc changelog trước khi nâng cấp |
| `logging.fetches` | Log mọi fetch kèm trạng thái cache — xem [[Next.js Caching Layers]] |
| `typedRoutes` | `<Link href>` được kiểm kiểu theo route có thật |

⚠️ **`typescript.ignoreBuildErrors` và `eslint.ignoreDuringBuilds` tắt hẳn cổng chất lượng.** Chúng tồn tại cho tình huống khẩn cấp; để lại vĩnh viễn là mất luôn tác dụng của TypeScript lúc build — xem [[Frontend Tooling]].

### Fast Refresh

Cập nhật component trong trình duyệt **mà không mất state**, tự động trong `next dev`.

| Tình huống | Hành vi |
|---|---|
| Sửa file **chỉ export component React** | Chỉ component đó render lại, **giữ state** |
| File có export không phải component | Cả module tải lại, **mất state** |
| Sửa file được import bởi file ngoài `app/` | Tải lại cả hai |
| Lỗi runtime | Overlay lỗi; sửa xong tự phục hồi, không cần F5 |
| Sửa `next.config.js`, `.env`, middleware | **Restart server** — không có Fast Refresh |

Giữ state khi làm việc với form nhiều bước là lợi ích lớn nhất. Muốn giữ được, **tách component ra file riêng chỉ export component** — trộn hằng số và hàm tiện ích vào cùng file là lý do phổ biến nhất khiến state bị mất mỗi lần sửa.

Ép reset state bằng comment `// @refresh reset` trong file.

### Supported browsers

Next mặc định hỗ trợ Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+ — và tự polyfill những gì cần cho ngưỡng đó.

Đổi ngưỡng bằng `browserslist` trong `package.json`:

```json
{ "browserslist": ["chrome 111", "edge 111", "firefox 111", "safari 16.4"] }
```

Hạ ngưỡng xuống trình duyệt cũ **tăng kích thước bundle** vì phải thêm polyfill và hạ cấp cú pháp. Kiểm tra người dùng thật trong analytics trước khi hạ — xem [[Product Analytics & Surveys]] và [[Frontend Performance Budget]].

`browserslist` cũng điều khiển Autoprefixer và Tailwind, nên nó là **một nguồn sự thật** cho cả JS lẫn CSS. Đối chiếu ngưỡng với [[CSS Modules Map]] khi dùng tính năng CSS mới.

## 3. Tổ chức phần còn lại

Framework chỉ quy định `app/`. Cách tổ chức component, util, type là của bạn.

### Colocation trong `app/`

```
app/
  (app)/
    dashboard/
      page.tsx
      _components/          ← private folder, không thành route
        chart.tsx
      _lib/
        queries.ts
```

Prefix `_` loại folder khỏi hệ thống route. Đây là cách giữ code gần nơi dùng nó.

### Cấu trúc theo feature — khuyến nghị cho dự án lớn

```
src/
  app/                    ← chỉ route, mỏng
  features/
    posts/
      components/
      queries.ts          ← 'server-only'
      actions.ts          ← 'use server'
      schema.ts           ← zod
      types.ts
  components/ui/          ← component dùng chung (shadcn)
  lib/
    db.ts
    utils.ts              ← cn()
  styles/
```

Nguyên tắc: **`app/` mỏng, feature dày.** File trong `app/` chỉ nên lắp ráp và cấu hình route; logic sống trong `features/`.

### Quy ước đáng có

| Quy ước | Vì sao |
|---|---|
| `queries.ts` có `import 'server-only'` | Chặn code DB lọt vào bundle client |
| `actions.ts` có `'use server'` | Gom Server Function một chỗ, dễ audit auth |
| `schema.ts` riêng | Schema Zod dùng chung client/server |
| `components/ui/` cho primitive | Tách component thư viện khỏi component nghiệp vụ |
| Path alias `@/` | Không còn `../../../` |

## 4. Nguyên tắc

1. **Dùng `src/`** để tách mã nguồn khỏi cấu hình ở gốc.
2. **`app/` mỏng.** Route file chỉ lắp ráp.
3. **Private folder `_` cho mọi thứ không phải route.**
4. **Nhóm theo feature, không theo loại file.** `components/`, `hooks/`, `utils/` ở cấp cao nhất không mở rộng được — mở một feature phải nhảy bốn folder.
5. **`import 'server-only'` trong mọi module truy cập DB.**
6. **Không bao giờ `NEXT_PUBLIC_` cho secret.**
7. **Path alias ngay từ đầu.**
8. **`instrumentation.ts` cho khởi tạo observability**, không nhét vào layout.
9. **Validate env bằng schema lúc khởi động** (`@t3-oss/env-nextjs`) — thiếu biến nên là lỗi build, không phải lỗi runtime lúc 2 giờ sáng.

## 5. Cạm bẫy

- **Secret trong `NEXT_PUBLIC_`.** Callout mục 2.
- **`.env.local` bị commit.** Kiểm `.gitignore` ngay hôm nay.
- **Sửa `next-env.d.ts`** — nó bị ghi đè mỗi lần build.
- **Đặt component dùng chung trong `app/` không có prefix `_`** — không gây lỗi nhưng làm cây route khó đọc.
- **Nhóm theo loại file** ở dự án lớn → mọi thay đổi chạm năm folder.
- **Env đọc ở client mà không có `NEXT_PUBLIC_`** → `undefined` im lặng.
- **Asset trong `public` không có cache-busting** → người dùng thấy ảnh cũ sau deploy.
- **Import từ `app/` vào `features/`** tạo phụ thuộc ngược; luồng phụ thuộc nên một chiều.
- **Không validate env** → app chạy được ở local, chết ở production vì thiếu một biến.
- **Trộn `pages/` và `app/` cho cùng một route** → xung đột.

## 6. Checklist áp dụng

- [ ] `.env*.local` có trong `.gitignore` không?
- [ ] Có `NEXT_PUBLIC_` nào chứa secret không?
- [ ] Env có được validate bằng schema lúc khởi động không?
- [ ] `app/` có mỏng không, hay logic nằm trong route file?
- [ ] Code không phải route có ở folder `_` hoặc ngoài `app/` không?
- [ ] Module truy cập DB có `server-only` không?
- [ ] Path alias đã cấu hình chưa?
- [ ] Cấu trúc theo feature hay theo loại file?
- [ ] Có `ignoreBuildErrors`/`ignoreDuringBuilds` nào còn sót lại không?
- [ ] Component có nằm ở file chỉ export component (để Fast Refresh giữ state) không?
- [ ] `browserslist` có khớp với trình duyệt người dùng thật không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `@t3-oss/env-nextjs` | Validate env bằng Zod lúc build | https://env.t3.gg/ |
| `eslint-plugin-boundaries` | Ép luồng phụ thuộc giữa các tầng | https://github.com/javierbrea/eslint-plugin-boundaries |
| `next lint` | Lint theo cấu hình Next | https://nextjs.org/docs/app/api-reference/cli/next |
| Turbopack | Bundler mặc định của Next mới | https://nextjs.org/docs/app/api-reference/turbopack |

## Tham khảo

- Next.js — *Project structure and organization*: https://nextjs.org/docs/app/getting-started/project-structure
- Next.js — *Environment variables*: https://nextjs.org/docs/app/guides/environment-variables
- Next.js — *`next.config.js` options*: https://nextjs.org/docs/app/api-reference/config/next-config-js
- Next.js — *Instrumentation*: https://nextjs.org/docs/app/guides/instrumentation
- Next.js — *Fast Refresh*: https://nextjs.org/docs/architecture/fast-refresh
- Next.js — *Supported browsers*: https://nextjs.org/docs/architecture/supported-browsers

## Liên kết

[[Next.js App Router]] · [[Next.js Routing Patterns]] · [[Frontend Tooling]] · [[Frontend Deployment]] · [[Frontend]]
