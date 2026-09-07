---
tags: [frontend, nextjs, data]
status: evergreen
---
# Next.js Data Fetching

> Câu hỏi đầu tiên luôn là **server hay client**, và câu trả lời phụ thuộc vào *loại UI bạn đang xây*, không vào thói quen.

> [!note] Ghi chú nguồn
> Seed ghi nguyên văn: *"Quyết định fetch dữ liệu ở server hay client phụ thuộc vào loại UI bạn đang xây dựng. Với hầu hết trường hợp, khi bạn không cần dữ liệu realtime (ví dụ polling), bạn có thể fetch trên server bằng Server Components. Tuy nhiên, fetch phía server sẽ khiến **toàn bộ trang re-render trên server**. Trong trường hợp bạn cần mutate/revalidate những mảnh UI nhỏ hơn hoặc liên tục lấy dữ liệu realtime (ví dụ live view), fetch phía client có thể phù hợp hơn, vì nó cho phép re-render đúng mảnh UI đó trên client."*
>
> Seed liệt kê **4 cách fetch** và **2 pattern** — giữ nguyên và mở rộng bên dưới.

## 1. Khái niệm cốt lõi

### Bốn cách fetch

| Cách | Ở đâu | Dùng khi |
|---|---|---|
| **`fetch` API** | Server | Gọi REST/GraphQL bên ngoài |
| **ORM hoặc database client** | Server | Truy cập DB trực tiếp (Prisma, Drizzle) |
| **Route Handlers** | Server, gọi từ client | Client cần endpoint HTTP |
| **Thư viện data fetching** | Client | React Query, SWR — realtime, infinite |

Hai cách đầu là mặc định trong App Router. Cách thứ ba chỉ cần khi client thực sự phải gọi HTTP. Cách thứ tư khi client cần quản lý cache.

### Server hay client

| | Server Component | Client fetch |
|---|---|---|
| Bảo mật | Secret an toàn | Mọi thứ lộ |
| Bundle | 0 JS | Thư viện + code |
| Waterfall | Có thể tránh | Thường có |
| Realtime | ❌ | ✅ |
| Cập nhật một phần UI | ❌ cả trang re-render trên server | ✅ |
| Infinite scroll | ❌ khó | ✅ |
| Truy cập DB trực tiếp | ✅ | ❌ |

### Parallel vs Sequential

Khi fetch bên trong component, có hai pattern cần phân biệt:

- **Sequential** — request trong cây component **phụ thuộc lẫn nhau**. Cái sau phải chờ cái trước. Dẫn tới thời gian tải lâu hơn.
- **Parallel** — request trong một route được **khởi tạo sớm** và tải cùng lúc. Giảm tổng thời gian.

```tsx
// ❌ Sequential — 300ms
const user = await getUser(id)
const posts = await getPosts(id)
const stats = await getStats(id)

// ✅ Parallel — 100ms
const [user, posts, stats] = await Promise.all([
  getUser(id), getPosts(id), getStats(id),
])
```

Khi thực sự **phụ thuộc** (cần `user.teamId` để lấy team), tuần tự là bắt buộc — nhưng hãy khởi tạo mọi thứ không phụ thuộc song song trước.

**Preload pattern** để bắt đầu sớm mà không chặn:

```ts
export const preload = (id: string) => { void getUser(id) }
// gọi preload(id) ở đầu layout, await getUser(id) ở component sâu
// request memoization đảm bảo chỉ một lần gọi thật
```

### Request memoization

Trong **một request**, `fetch` cùng URL + options được React dedupe tự động — gọi ở năm component chỉ đi một lần. Điều này khiến việc "prop drilling dữ liệu" trở nên không cần thiết: fetch ngay tại nơi dùng.

Với ORM (không phải `fetch`), dùng `cache()` của React:

```ts
import { cache } from 'react'
export const getUser = cache(async (id: string) => db.user.findUnique(...))
```

### Streaming và Suspense

```tsx
export default function Page() {
  return (
    <>
      <Profile />                       {/* nhanh */}
      <Suspense fallback={<Skeleton />}>
        <Feed />                        {/* chậm — không chặn phần trên */}
      </Suspense>
    </>
  )
}
```

Không `await` ở cấp page; để component tự `await` bên trong Suspense boundary.

### Kết hợp cả hai

Pattern phổ biến nhất trong thực tế: **fetch lần đầu trên server, cập nhật trên client**.

```tsx
// server component
const initial = await getPosts()
return <PostList initialData={initial} />

// client component
const { data } = useQuery({ queryKey: ['posts'], initialData })
```

Được cả tốc độ lần đầu lẫn khả năng cập nhật từng phần.

## 2. Nguyên tắc

1. **Server Component là mặc định.** Chỉ fetch ở client khi cần realtime, infinite, hoặc cập nhật một mảnh UI.
2. **`Promise.all` cho mọi request độc lập.**
3. **Fetch tại nơi dùng dữ liệu** — memoization lo phần trùng lặp.
4. **Bọc `cache()` quanh mọi hàm truy cập DB** dùng ở nhiều component.
5. **Suspense quanh mọi phần chậm.**
6. **Đừng `await` ở cấp page nếu có thể đẩy xuống.**
7. **`import 'server-only'` cho module truy cập DB** — xem [[React Server Components]].
8. **Xử lý lỗi và trạng thái rỗng**, không chỉ happy path.
9. **Mutation dùng Server Function** — xem [[React Server Functions]].

## 3. Cạm bẫy

- **Waterfall do `await` tuần tự.** Cạm bẫy phổ biến nhất và tốn kém nhất.
- **Waterfall ẩn qua component lồng nhau** — cha `await` xong mới render con, con lại `await`. Sửa: khởi tạo promise ở cha, truyền xuống, `await` ở con; hoặc dùng preload.
- **Fetch trong `useEffect` khi Server Component làm được** — thêm waterfall, thêm bundle, lộ endpoint.
- **Quên `cache()` với ORM** → cùng query chạy năm lần.
- **`Promise.all` với request phụ thuộc** → lỗi vì thiếu dữ liệu.
- **`Promise.all` fail hết khi một cái lỗi** — dùng `Promise.allSettled` khi chấp nhận thiếu một phần.
- **Không có Suspense** → trang trắng chờ query chậm nhất.
- **Fetch trong layout** rồi mong nó cập nhật khi điều hướng — xem [[Next.js App Router]].
- **Truyền toàn bộ object DB xuống Client Component** — lộ field nhạy cảm qua RSC payload.
- **Không xử lý `notFound()`** → hiện trang rỗng thay vì 404.
- **Nghĩ request memoization là cache lâu dài.** Nó chỉ sống trong **một** request — cache lâu hơn là Data Cache, xem [[Next.js Caching Layers]].

## 4. Checklist áp dụng

- [ ] Request độc lập có chạy song song không?
- [ ] Có waterfall ẩn qua component lồng nhau không?
- [ ] Hàm truy cập DB có bọc `cache()` không?
- [ ] Phần chậm có Suspense không?
- [ ] Dữ liệu này có cần realtime không? Nếu không, sao lại fetch ở client?
- [ ] Có field nhạy cảm nào truyền xuống client không?
- [ ] Đã xử lý lỗi, rỗng, và `notFound()` chưa?
- [ ] Module DB có `server-only` chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → Network → Waterfall | Nhìn thấy request tuần tự | https://developer.chrome.com/docs/devtools/network |
| Prisma logging | Đếm số query thật chạy | https://www.prisma.io/docs/orm/prisma-client/observability-and-logging |
| OpenTelemetry trong Next | Trace từ request tới query | https://nextjs.org/docs/app/guides/open-telemetry |
| TanStack Query | Client cache | https://tanstack.com/query |

## Tham khảo

- Next.js — *Data fetching patterns*: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
- Next.js — *Sequential and parallel data fetching*: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#parallel-and-sequential-data-fetching
- React — *`cache`*: https://react.dev/reference/react/cache
- Next.js — *Loading UI and Streaming*: https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

## Liên kết

[[React Server Components]] · [[Next.js Caching Layers]] · [[Frontend State Management]] · [[Fetch & Network APIs]] · [[Frontend]]
