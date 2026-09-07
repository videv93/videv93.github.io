---
tags: [frontend, react, rsc]
status: evergreen
---
# React Server Components

> Component chạy **trên server** và không bao giờ gửi JavaScript xuống client. Đây là thay đổi lớn nhất trong mô hình React kể từ hook — nó dịch chuyển ranh giới giữa frontend và backend.

> [!note] Ghi chú nguồn
> Seed ghi: *"Server Components không có ở mọi framework React, nhưng có trong Next. Chúng thay đổi cách xây dựng ứng dụng full-stack React. Ở dạng cơ bản nhất, chúng cho phép viết component thực thi trên server và do đó truy cập được server (ví dụ database)."* Note này khai triển hệ quả của câu đó.

## 1. Khái niệm cốt lõi

### RSC làm được và không làm được

| Làm được | Không làm được |
|---|---|
| `async` component, `await` trực tiếp | `useState`, `useReducer` |
| Truy cập database, filesystem, secret | `useEffect`, `useLayoutEffect` |
| Import thư viện nặng mà không tốn bundle | Event handler (`onClick`) |
| Render trên server và cache | Browser API (`window`, `localStorage`) |
| Stream từng phần qua Suspense | Context (dùng được nhưng không có provider client) |

```jsx
// Server Component — mặc định trong App Router
export default async function Posts() {
  const posts = await db.post.findMany()      // truy cập DB trực tiếp
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

Không có `useEffect`, không có loading state, không có API route, không có JavaScript gửi xuống client cho component này.

### Ba chiến lược render trên server

| Chiến lược | Khi nào | Đặc điểm |
|---|---|---|
| **Static** | Không có dữ liệu động | Render lúc build, cache vĩnh viễn |
| **Dynamic** | Có cookie, header, searchParams | Render mỗi request |
| **Streaming** | Có phần chậm | Gửi HTML dần, phần chậm bọc trong Suspense |

### RSC payload và quy trình render

Trên server, việc render chia thành từng chunk theo **route segment** và **Suspense boundary**. Mỗi chunk qua hai bước:

1. React render Server Component thành **RSC Payload** — một định dạng dữ liệu đặc biệt mô tả cây UI.
2. Next.js dùng RSC Payload + chỉ dẫn JavaScript của Client Component để render **HTML** trên server.

Trên client:

1. HTML dùng để hiện ngay một bản xem trước **không tương tác** — chỉ cho lần tải đầu.
2. RSC Payload dùng để hoà giải cây Client và Server, cập nhật DOM.
3. Chỉ dẫn JavaScript dùng để **hydrate** Client Component, làm trang tương tác được.

Điểm quan trọng: **RSC Payload không phải HTML.** Ở lần điều hướng sau, Next.js chỉ tải payload chứ không tải HTML — đó là lý do điều hướng giữ được state của Client Component.

### Streaming với Suspense

```jsx
export default function Page() {
  return (
    <>
      <Header />                              {/* gửi ngay */}
      <Suspense fallback={<Skeleton />}>
        <SlowFeed />                          {/* stream khi xong */}
      </Suspense>
    </>
  )
}
```

Suspense boundary là **đơn vị streaming**. Không có boundary thì cả trang chờ phần chậm nhất.

### Composition — quy tắc quan trọng nhất

```jsx
// ❌ Client Component không import được Server Component
'use client'
import ServerThing from './server-thing'

// ✅ nhưng nhận được nó qua children/props
'use client'
export function Panel({ children }) { return <div>{children}</div> }

// server component cha
<Panel><ServerThing /></Panel>
```

Server Component **truyền xuống được** qua slot; Client Component **import lên không được**. Hiểu điều này giải quyết phần lớn lỗi "Module not found: can't resolve fs".

Props truyền từ Server sang Client phải **serialize được**: không hàm, không class instance, không `Date` phức tạp (thực ra `Date`, `Map`, `Set` được; hàm thì không — trừ Server Function).

## 2. Nguyên tắc

1. **Server Component là mặc định.** Chỉ thêm `"use client"` khi thực sự cần tương tác.
2. **Đẩy `"use client"` xuống lá.** Đặt nó ở component nhỏ nhất cần nó, không ở layout.
3. **Fetch dữ liệu ở nơi dùng nó.** Không cần nâng lên cha rồi truyền xuống — request được dedupe tự động, xem [[Next.js Caching Layers]].
4. **Fetch song song, không tuần tự.** `await Promise.all([a(), b()])` — xem [[Next.js Data Fetching]].
5. **Đặt Suspense boundary quanh mọi phần chậm.**
6. **Không bao giờ truyền secret qua props xuống Client Component** — chúng nằm trong RSC payload gửi tới trình duyệt.
7. **Dùng `server-only` package** để chặn code server lọt vào bundle client:
   ```ts
   import 'server-only'
   ```
   Nó biến một lỗi runtime khó hiểu thành lỗi build rõ ràng.
8. **Composition qua `children`** để giữ nhiều thứ ở server nhất có thể.

## 3. Cạm bẫy

- **Đặt `"use client"` ở layout gốc** biến toàn bộ app thành client — mất hết lợi ích. Cạm bẫy số một.
- **Truyền hàm làm prop sang Client Component** → lỗi serialize.
- **Truyền secret trong props.** RSC payload đi tới trình duyệt; API key trong props là API key bị lộ.
- **`await` tuần tự** biến ba query 100ms thành 300ms.
- **Quên Suspense** → cả trang chờ phần chậm nhất.
- **Import Server Component vào Client Component.** Dùng `children`.
- **Dùng thư viện chỉ chạy client mà không có `"use client"`** — lỗi thường không rõ ràng.
- **Nghĩ Server Component chạy lại theo tương tác.** Chúng không có state; muốn cập nhật phải điều hướng hoặc revalidate.
- **`useState` trong Server Component** → lỗi build.
- **Context provider phải là Client Component** — bọc nó rồi đặt ở layout.
- **Nhầm RSC với SSR.** SSR render HTML rồi hydrate *toàn bộ*; RSC không gửi JS cho phần server chút nào. Một app có thể dùng cả hai.

## 4. Checklist áp dụng

- [ ] `"use client"` có ở lá thay vì ở gốc không?
- [ ] Có secret nào trong props gửi xuống Client Component không?
- [ ] Các query độc lập có chạy song song không?
- [ ] Phần chậm có Suspense boundary chưa?
- [ ] Có `import 'server-only'` trong module truy cập DB không?
- [ ] Client Component có đang import Server Component không?
- [ ] Props truyền qua ranh giới có serialize được không?
- [ ] Component này có thực sự cần tương tác không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `server-only` / `client-only` | Chặn code lọt sai phía | https://www.npmjs.com/package/server-only |
| `@next/bundle-analyzer` | Xem component nào vào bundle client | https://www.npmjs.com/package/@next/bundle-analyzer |
| React DevTools | Phân biệt Server và Client Component | https://react.dev/learn/react-developer-tools |

## Tham khảo

- React — *Server Components*: https://react.dev/reference/rsc/server-components
- Next.js — *Server Components*: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js — *Rendering: Server Components*: https://nextjs.org/docs/app/building-your-application/rendering/server-components
- React Working Group — *RSC discussions*: https://github.com/reactwg/server-components/discussions

## Liên kết

[[React Client Components]] · [[React Server Functions]] · [[Next.js Rendering Strategies]] · [[Next.js Data Fetching]] · [[React Mental Model]] · [[Frontend]]
