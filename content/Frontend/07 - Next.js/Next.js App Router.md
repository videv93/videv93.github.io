---
tags: [frontend, nextjs]
status: evergreen
---
# Next.js App Router

> Router dựa trên hệ thống file: **thư mục định nghĩa route, file định nghĩa UI**. Bộ file đặc biệt (`layout`, `page`, `loading`, `error`…) không phải quy ước tuỳ tiện — chúng ánh xạ trực tiếp sang cấu trúc Suspense và Error Boundary của React.

> [!note] Ghi chú nguồn
> Seed ghi: *"Mặc định, component bên trong `app` là React Server Component. Đây là tối ưu hoá hiệu năng và cho phép bạn dễ dàng áp dụng chúng, và bạn cũng có thể dùng Client Component."*
> Seed cũng chứa bảng file convention và cây phân cấp component — được giữ nguyên và mở rộng ở đây.

## 1. Khái niệm cốt lõi

### Vai trò của folder và file

- **Folder** định nghĩa **route**. Một route là một đường dẫn folder lồng nhau, từ root folder xuống tới leaf folder có chứa file `page.js`.
- **File** tạo UI hiển thị cho một **route segment**.

Mỗi folder trong route là một **route segment**, ánh xạ sang một segment trong **URL path**. Lồng folder vào nhau tạo **nested route** — thêm `app/dashboard/settings/` là tạo `/dashboard/settings`.

### File conventions

| File | Vai trò |
|---|---|
| `layout` | UI dùng chung cho một segment và các con của nó |
| `page` | UI riêng của một route, và làm route **truy cập công khai được** |
| `loading` | UI loading cho segment và con — bọc trong Suspense |
| `not-found` | UI không tìm thấy cho segment và con |
| `error` | UI lỗi cho segment và con — React Error Boundary |
| `global-error` | UI lỗi toàn cục |
| `route` | API endpoint phía server |
| `template` | Layout được render lại mỗi lần điều hướng |
| `default` | UI dự phòng cho Parallel Routes |

Thêm: `middleware.ts`, `instrumentation.ts`, và các file metadata (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.tsx`).

### Cây phân cấp component

Component định nghĩa trong các file đặc biệt của một route segment được render theo thứ tự:

```
layout.js
  └─ template.js
       └─ error.js          (React error boundary)
            └─ loading.js   (React suspense boundary)
                 └─ not-found.js  (React error boundary)
                      └─ page.js  hoặc  layout.js lồng bên trong
```

Đọc cây này giải thích nhiều hành vi: `error.js` bọc *bên ngoài* `loading.js`, nên lỗi khi đang load vẫn bắt được; nhưng `error.js` **không** bắt được lỗi trong `layout.js` **cùng cấp** — vì layout nằm ngoài nó. Muốn bắt lỗi của layout, cần `error.js` ở segment cha.

### `layout` vs `template`

| | `layout` | `template` |
|---|---|---|
| Giữ state khi điều hướng | ✅ | ❌ tạo instance mới |
| Chạy lại effect | ❌ | ✅ |
| Dùng cho | Nav, sidebar | Animation vào trang, logger theo trang |

### Colocation

Ngoài file đặc biệt, bạn có thể đặt file của mình (component, style, test) **ngay trong** folder route. An toàn vì tuy folder định nghĩa route, chỉ nội dung trả về bởi `page.js` hoặc `route.js` là **truy cập công khai được**.

```
app/dashboard/
  page.tsx          ← công khai tại /dashboard
  _components/      ← private folder, không thành route
  utils.ts          ← chỉ là file thường
```

Prefix `_` tạo **private folder** — loại folder đó và mọi con khỏi hệ thống route hoàn toàn.

### Điều hướng

| Cách | Dùng khi |
|---|---|
| `<Link href>` | Mặc định — có prefetch tự động |
| `useRouter().push()` | Điều hướng theo sự kiện |
| `redirect()` | Trong Server Component / Server Function |
| `permanentRedirect()` | Chuyển hướng 308 |

`<Link>` prefetch route trong viewport tự động — đây là lý do điều hướng trong Next thường tức thì.

### Metadata

```ts
export const metadata = { title: 'Bài viết', description: '...' }

export async function generateMetadata({ params }) {
  const post = await getPost(params.id)
  return { title: post.title, openGraph: { images: [post.image] } }
}
```

## 2. Nguyên tắc

1. **Layout để chia sẻ UI, không để fetch dữ liệu dùng chung.** Layout **không** re-render khi điều hướng giữa các con — dữ liệu trong đó sẽ cũ.
2. **Mỗi segment chậm nên có `loading.tsx`.** Nó tự động bọc Suspense và bật streaming.
3. **`error.tsx` phải là Client Component** (`"use client"`) và nhận `{ error, reset }`.
4. **Private folder `_name` cho code không phải route.**
5. **Route group `(name)` để tổ chức mà không đổi URL** — xem [[Next.js Routing Patterns]].
6. **Dùng `<Link>` chứ không `<a>`** cho điều hướng nội bộ, để giữ prefetch và client navigation.
7. **`generateMetadata` cho metadata động**, `metadata` tĩnh cho phần còn lại.
8. **Đặt `not-found.tsx` ở gốc** ít nhất một lần.

## 3. Cạm bẫy

- **Layout không re-render khi điều hướng giữa các con.** Fetch user trong layout rồi đổi trang → dữ liệu không cập nhật. Cạm bẫy phổ biến nhất của App Router.
- **`error.tsx` không bắt được lỗi của `layout.tsx` cùng cấp.** Cần error boundary ở cha.
- **`loading.tsx` áp dụng cho cả cây con** — đôi khi tạo loading state rộng hơn ý muốn; dùng `<Suspense>` thủ công cho phạm vi hẹp.
- **Quên `"use client"` trong `error.tsx`** → lỗi build.
- **Folder không có `page.tsx` không tạo route** — dễ nhầm khi tổ chức file.
- **Đặt component dùng chung trong `app/` mà không prefix `_`** vẫn ổn nhưng gây lộn xộn; đường dẫn có `page.tsx` mới thành route.
- **`<a>` thay `<Link>`** làm full page reload, mất state và prefetch.
- **`template.tsx` reset state mỗi lần điều hướng** — dùng nhầm chỗ của `layout` gây mất state form.
- **Nhầm App Router với Pages Router.** `getServerSideProps`, `_app.js`, `next/head` **không** dùng trong App Router.

## 4. Checklist áp dụng

- [ ] Dữ liệu cần cập nhật theo điều hướng có nằm trong layout không?
- [ ] Segment chậm có `loading.tsx` chưa?
- [ ] `error.tsx` có `"use client"` và nút `reset` chưa?
- [ ] Lỗi trong layout có được cha bắt không?
- [ ] Code không phải route có nằm trong folder `_` không?
- [ ] Điều hướng nội bộ có dùng `<Link>` không?
- [ ] Metadata đã đặt cho các trang quan trọng chưa?
- [ ] Tôi cần `layout` hay `template`?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `next build` | Xem bảng route: static / dynamic / size | https://nextjs.org/docs/app/api-reference/cli/next |
| React DevTools | Xem cây Suspense và boundary | https://react.dev/learn/react-developer-tools |
| `@next/bundle-analyzer` | Kích thước từng route | https://www.npmjs.com/package/@next/bundle-analyzer |

## Tham khảo

- Next.js — *Routing fundamentals*: https://nextjs.org/docs/app/building-your-application/routing
- Next.js — *Layouts and templates*: https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates
- Next.js — *Error handling*: https://nextjs.org/docs/app/building-your-application/routing/error-handling
- Next.js — *File conventions*: https://nextjs.org/docs/app/api-reference/file-conventions

## Liên kết

[[Next.js Routing Patterns]] · [[Next.js Rendering Strategies]] · [[Next.js Project Structure]] · [[React Server Components]] · [[Frontend]]
