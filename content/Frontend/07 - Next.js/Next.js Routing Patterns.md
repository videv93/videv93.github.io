---
tags: [frontend, nextjs]
status: evergreen
---
# Next.js Routing Patterns

> Bốn quy ước nâng cao — route group, dynamic route, parallel route, intercepting route — cùng middleware, route handler và i18n. Chúng giải những bài toán mà routing phẳng không giải được.

> [!note] Ghi chú nguồn
> File `Routing.md` trong seed kết thúc bằng **15 wikilink không trỏ tới đâu**: `Defining Routes`, `Pages`, `Layouts and Templates`, `Linking and Navigating`, `Error Handling`, `Loading UI and Streaming`, `Redirecting`, `Route Groups`, `Project Organization`, `Dynamic Routes`, `Parallel Routes`, `Intercepting Routes`, `Route Handlers`, `Middleware`, `Internationalization` — mười lăm header rỗng. Note này cùng [[Next.js App Router]] và [[Next.js Project Structure]] trả hết mười lăm lời hứa đó.

## 1. Khái niệm cốt lõi

### Route groups — `(name)`

Tổ chức file **mà không ảnh hưởng URL**:

```
app/
  (marketing)/
    layout.tsx        ← layout riêng cho marketing
    page.tsx          → /
    about/page.tsx    → /about
  (app)/
    layout.tsx        ← layout riêng cho app, có sidebar
    dashboard/page.tsx → /dashboard
```

Dùng để: nhiều layout gốc khác nhau, nhóm theo team, tách phần có auth và không có auth.

### Dynamic routes

| Cú pháp | Khớp | `params` |
|---|---|---|
| `[id]` | `/post/1` | `{ id: '1' }` |
| `[...slug]` | `/docs/a/b/c` | `{ slug: ['a','b','c'] }` |
| `[[...slug]]` | `/docs` **và** `/docs/a/b` | `{ slug: undefined \| [...] }` |

```ts
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(p => ({ id: p.id }))     // prerender lúc build
}
export const dynamicParams = true            // param mới → render on-demand
```

Trong Next 15+, `params` và `searchParams` là **Promise** — phải `await`.

### Parallel routes — `@slot`

Hiện **hai hoặc nhiều trang cùng lúc trong một view**, điều hướng độc lập. Dùng cho dashboard có nhiều vùng, hoặc split view có sub-navigation riêng.

```
app/dashboard/
  layout.tsx        ← nhận { children, team, analytics }
  page.tsx
  @team/page.tsx
  @analytics/page.tsx
  @analytics/loading.tsx
  @team/default.tsx  ← BẮT BUỘC cho hard navigation
```

```tsx
export default function Layout({ children, team, analytics }) {
  return <>{children}<aside>{team}{analytics}</aside></>
}
```

Mỗi slot có `loading` và `error` riêng → **stream độc lập**. Đây là lý do chính để dùng chúng.

### Intercepting routes — `(.)` `(..)` `(...)`

Chặn một route và hiện nó **trong ngữ cảnh của route hiện tại**, giữ nguyên nền phía sau. Dùng khi giữ ngữ cảnh trang hiện tại là quan trọng — ví dụ xem tất cả task trong khi sửa một task, hoặc phóng to một ảnh trong feed.

| Cú pháp | Chặn |
|---|---|
| `(.)` | Cùng cấp |
| `(..)` | Một cấp trên |
| `(..)(..)` | Hai cấp trên |
| `(...)` | Từ gốc `app` |

**Pattern modal ảnh** — click từ feed mở modal, share URL hoặc F5 mở trang đầy đủ:

```
app/
  feed/page.tsx
  photo/[id]/page.tsx          ← trang đầy đủ
  @modal/(.)photo/[id]/page.tsx ← modal khi điều hướng client
  @modal/default.tsx
```

### Route handlers — `route.ts`

```ts
export async function GET(req: Request) {
  return Response.json({ ok: true })
}
export async function POST(req: Request) { ... }
```

Hỗ trợ GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. **Không** đặt cùng folder với `page.tsx` ở cùng segment.

Khi nào cần route handler, khi nào không:

| Cần | Không cần |
|---|---|
| Webhook từ bên thứ ba | Fetch dữ liệu cho trang → Server Component |
| Public API cho client khác | Mutation từ form → Server Function |
| OAuth callback | |
| Trả về file, image, RSS | |

### Middleware

Chạy **trước** khi request tới route, ở edge:

```ts
export function middleware(req: NextRequest) {
  if (!req.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
export const config = { matcher: ['/dashboard/:path*'] }
```

Dùng cho: redirect, rewrite, đặt header, A/B test, i18n routing.
**Không** dùng cho: truy vấn database, xử lý nặng, và **không** dùng làm lớp phân quyền duy nhất.

> [!warning] Middleware không phải lớp bảo mật đủ
> Middleware chạy trên mọi request khớp matcher, nhưng nó **không** bảo vệ Server Function hay Route Handler được gọi trực tiếp, và cấu hình matcher rất dễ để lọt. Phân quyền thật phải nằm ở tầng truy cập dữ liệu — mỗi Server Function và mỗi query tự kiểm tra. Xem [[React Server Functions]].

### Internationalization

Hai chiến lược:

| Cách | URL | Ghi chú |
|---|---|---|
| Sub-path | `/vi/about`, `/en/about` | Dùng `[lang]` dynamic segment; SEO tốt |
| Domain | `example.vn`, `example.com` | Tách bạch hơn |

Middleware phát hiện locale từ `Accept-Language` hoặc cookie rồi rewrite. Dictionary tải trong Server Component để không vào bundle client.

## 2. Nguyên tắc

1. **Route group để tổ chức, không để đổi URL.**
2. **`generateStaticParams` cho mọi dynamic route có tập giá trị biết trước.**
3. **Parallel route khi các vùng cần **loading state độc lập**.** Nếu chỉ để bố cục, dùng component thường.
4. **Luôn có `default.tsx` cho parallel route** — thiếu nó thì hard navigation 404.
5. **Intercepting route cho modal có URL riêng** — được cả deep link lẫn trải nghiệm modal.
6. **Route handler chỉ khi thực sự cần HTTP endpoint.**
7. **Middleware mỏng và nhanh.** Nó chạy trên mọi request khớp.
8. **Phân quyền ở tầng dữ liệu, không ở middleware.** Xem callout.
9. **`await params`** trong Next 15+.

## 3. Cạm bẫy

- **Middleware là lớp bảo mật duy nhất.** Callout mục 1.
- **Thiếu `default.tsx`** trong parallel route → 404 khi F5.
- **Intercepting route không hoạt động khi F5** — đúng theo thiết kế: chặn chỉ áp dụng cho **client navigation**. Đó là lý do phải có cả trang đầy đủ.
- **Quên `await params`** trong Next 15 → `params.id` là `undefined`.
- **Hai route group cùng khớp một đường dẫn** → lỗi build.
- **Route handler và `page.tsx` cùng segment** → xung đột.
- **Matcher regex sai** để lọt route cần bảo vệ.
- **Route handler `GET` được cache mặc định** trong một số phiên bản — kiểm tra `dynamic` và `revalidate`.
- **Catch-all `[...slug]` nuốt cả route cụ thể** nếu đặt sai cấp — route cụ thể phải ưu tiên.
- **Middleware chạy trên asset tĩnh** nếu matcher không loại `_next/static`.
- **Dictionary i18n import ở Client Component** kéo mọi ngôn ngữ vào bundle.

## 4. Checklist áp dụng

- [ ] Phân quyền có ở tầng dữ liệu, không chỉ middleware không?
- [ ] Parallel route có `default.tsx` chưa?
- [ ] Intercepting route có trang đầy đủ tương ứng chưa?
- [ ] `params` có được `await` không?
- [ ] Dynamic route có `generateStaticParams` khi biết trước không?
- [ ] Matcher middleware có loại asset tĩnh không?
- [ ] Endpoint này thực sự cần route handler, hay Server Function là đủ?
- [ ] Dictionary i18n có ở phía server không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `next build` | Bảng route với ký hiệu static/dynamic | https://nextjs.org/docs/app/api-reference/cli/next |
| next-intl | i18n cho App Router | https://next-intl.dev/ |
| DevTools → Network | Kiểm tra rewrite/redirect của middleware | https://developer.chrome.com/docs/devtools/network |

## Tham khảo

- Next.js — *Parallel routes*: https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
- Next.js — *Intercepting routes*: https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
- Next.js — *Route handlers*: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Next.js — *Middleware*: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Next.js — *Internationalization*: https://nextjs.org/docs/app/building-your-application/routing/internationalization

## Liên kết

[[Next.js App Router]] · [[Next.js Project Structure]] · [[React Server Functions]] · [[Next.js Caching Layers]] · [[Frontend]]
