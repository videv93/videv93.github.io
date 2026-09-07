---
tags: [frontend, nextjs, cache]
status: evergreen
---
# Next.js Caching Layers

> Bốn tầng cache độc lập, hai ở server và hai liên quan tới client. Gần như mọi bug "dữ liệu không cập nhật" là do **xoá nhầm tầng** — nên bước đầu tiên luôn là xác định dữ liệu cũ đang nằm ở tầng nào.

> [!note] Ghi chú nguồn
> Toàn bộ file `Caching.md` trong seed là đúng một bảng bốn dòng, không có chữ nào khác. Bảng đó được giữ nguyên ở mục 1.

## 1. Bốn tầng — bảng gốc từ seed

| Cơ chế | Cache cái gì | Ở đâu | Mục đích | Thời hạn |
|---|---|---|---|---|
| **Request Memoization** | Giá trị trả về của hàm | Server | Dùng lại dữ liệu trong một cây React Component | Vòng đời một request |
| **Data Cache** | Dữ liệu | Server | Lưu dữ liệu qua nhiều request và nhiều lần deploy | Bền vững (revalidate được) |
| **Full Route Cache** | HTML và RSC payload | Server | Giảm chi phí render, tăng hiệu năng | Bền vững (revalidate được) |
| **Router Cache** | RSC Payload | Client | Giảm request tới server khi điều hướng | Phiên người dùng hoặc theo thời gian |

### Đọc bảng theo hướng debug

| Triệu chứng | Tầng nghi ngờ | Cách xoá |
|---|---|---|
| Cùng query chạy nhiều lần trong một trang | Request Memoization (thiếu) | Bọc `cache()` |
| Sửa DB xong, F5 vẫn thấy dữ liệu cũ | Data Cache | `revalidateTag` / `revalidatePath` |
| Deploy xong trang vẫn cũ | Full Route Cache | `revalidatePath`, hoặc route là dynamic |
| Click link quay lại thấy dữ liệu cũ, F5 thì đúng | **Router Cache** | `router.refresh()` |

> [!warning] Router Cache là tầng gây bất ngờ nhất
> Nó nằm **trong bộ nhớ trình duyệt** và không bị `revalidatePath` trên server chạm tới. Kịch bản điển hình: bạn sửa dữ liệu, server đã revalidate đúng, nhưng người dùng bấm nút back và vẫn thấy bản cũ — vì client phục vụ từ Router Cache.
>
> Sửa: gọi `router.refresh()` sau mutation ở client, hoặc dùng `revalidatePath` **trong một Server Action** (Server Action tự làm mới Router Cache của client gọi nó — route handler thì không).

### Điều khiển Data Cache

```ts
// mặc định Next 15: fetch KHÔNG cache
await fetch(url)                                   // no-store
await fetch(url, { cache: 'force-cache' })          // cache
await fetch(url, { next: { revalidate: 60 } })      // ISR
await fetch(url, { next: { tags: ['posts'] } })     // gắn tag
```

> [!warning] Mặc định đã đảo ngược giữa các phiên bản
> Next 13/14: `fetch` **cache mặc định**. Next 15: `fetch` **không cache mặc định**. Đây là breaking change lớn nhất khi nâng cấp và là nguyên nhân của rất nhiều hồi quy hiệu năng âm thầm sau khi upgrade. Luôn khai báo tường minh thay vì dựa vào mặc định.

### Revalidation

| Cách | Phạm vi |
|---|---|
| `revalidateTag('posts')` | Mọi fetch gắn tag đó — **chính xác nhất** |
| `revalidatePath('/posts')` | Một đường dẫn |
| `revalidatePath('/posts/[id]', 'page')` | Một pattern route |
| `export const revalidate = 60` | Cả route, theo thời gian |
| `router.refresh()` | Router Cache phía client |

**Tag là công cụ tốt nhất** — nó cho phép một mutation xoá đúng những gì bị ảnh hưởng, xuyên qua nhiều route.

### `use cache` (Next 15+)

Directive mới cho phép cache **bất kỳ hàm hoặc component nào**, không chỉ `fetch`:

```ts
'use cache'
export async function getPosts() {
  return db.post.findMany()
}
cacheTag('posts')
cacheLife('hours')
```

Đây là hướng thống nhất của Next: một mô hình cache cho cả `fetch`, ORM, và tính toán.

### Opt-out

Route thành **dynamic** (bỏ Full Route Cache) khi dùng `cookies()`, `headers()`, `searchParams`, hoặc `dynamic = 'force-dynamic'` — xem [[Next.js Rendering Strategies]].

## 2. Nguyên tắc

1. **Khai báo hành vi cache tường minh.** Đừng dựa vào mặc định — nó đã đổi một lần và có thể đổi nữa.
2. **Tag mọi fetch có thể bị mutate**, rồi `revalidateTag` sau mutation.
3. **`revalidateTag` chính xác hơn `revalidatePath`.**
4. **Revalidate trong Server Action**, không trong route handler, để Router Cache client cũng được làm mới.
5. **`router.refresh()` sau mutation ở client.**
6. **`cache()` cho hàm ORM** dùng nhiều nơi trong một request.
7. **Xác định tầng trước khi sửa.** Bảng debug ở mục 1 tiết kiệm hàng giờ.
8. **Cache thời gian ngắn vẫn có giá trị.** `revalidate: 10` đã chặn được phần lớn tải đột biến.
9. **Đừng cache dữ liệu theo user ở tầng route.** Dùng dynamic hoặc cache theo tag có user id.

## 3. Cạm bẫy

- **Router Cache giữ dữ liệu cũ sau khi server đã revalidate.** Callout mục 1.
- **Mặc định cache đảo ngược giữa Next 14 và 15.** Callout mục 1.
- **Cache dữ liệu riêng tư ở Full Route Cache** → người dùng A thấy dữ liệu của B. Lỗi bảo mật nghiêm trọng; tránh bằng cách để route có dữ liệu user là dynamic.
- **Quên revalidate sau mutation** → UI hiện dữ liệu cũ.
- **`revalidatePath` trong route handler không làm mới Router Cache** của client.
- **`export const revalidate` không áp dụng cho `fetch` có `revalidate` riêng** — cái cụ thể hơn thắng.
- **Nghĩ `no-store` trên một fetch tắt cache cho cả route.** Nó chỉ tắt cho fetch đó, nhưng **cũng** làm route thành dynamic.
- **Cache header từ upstream bị bỏ qua** — Data Cache dùng cấu hình của Next, không phải `Cache-Control` của API.
- **Build cache dữ liệu build-time rồi tưởng nó tự mới.** Static không tự làm mới nếu không có `revalidate`.
- **Debug cache ở dev environment.** Dev có hành vi cache khác production; luôn kiểm bằng `next build && next start`.

## 4. Checklist áp dụng

- [ ] Dữ liệu cũ đang nằm ở tầng nào trong bốn tầng?
- [ ] Fetch có khai báo `cache`/`revalidate` tường minh không?
- [ ] Fetch có thể bị mutate đã được gắn tag chưa?
- [ ] Có `revalidateTag` sau mọi mutation không?
- [ ] Revalidate có chạy trong Server Action không?
- [ ] Client có `router.refresh()` khi cần không?
- [ ] Có dữ liệu riêng tư nào bị cache ở tầng route không?
- [ ] Đã kiểm bằng `next build && next start` chưa (không phải dev)?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `next build` | Xem route nào static/dynamic | https://nextjs.org/docs/app/api-reference/cli/next |
| `logging.fetches.fullUrl` trong `next.config` | Log mọi fetch kèm trạng thái cache | https://nextjs.org/docs/app/api-reference/config/next-config-js/logging |
| DevTools → Network → `x-nextjs-cache` | Header cho biết HIT/MISS/STALE | https://developer.chrome.com/docs/devtools/network |

## Tham khảo

- Next.js — *Caching*: https://nextjs.org/docs/app/deep-dive/caching
- Next.js — *`revalidateTag`*: https://nextjs.org/docs/app/api-reference/functions/revalidateTag
- Next.js — *`use cache`*: https://nextjs.org/docs/app/api-reference/directives/use-cache
- Next.js — *Upgrading to version 15 (caching changes)*: https://nextjs.org/docs/app/guides/upgrading/version-15

## Liên kết

[[Next.js Data Fetching]] · [[Next.js Rendering Strategies]] · [[React Server Functions]] · [[Next.js App Router]] · [[Frontend]]
