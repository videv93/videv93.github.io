---
tags: [frontend, react, state]
status: evergreen
---
# Frontend State Management

> Câu hỏi không phải "dùng Redux hay Zustand". Câu hỏi là **state này thuộc loại nào** — vì mỗi loại có một nơi ở đúng, và chọn sai nơi là nguồn gốc của phần lớn độ phức tạp.

> [!note] Ghi chú nguồn
> Seed nêu ba lựa chọn và một xu hướng:
> - **nuqs** — *"giải pháp mặc định của tôi cho URL state có kiểu (tìm kiếm, sắp xếp, phân trang) trong Next.js... tôi nghĩ quan trọng là phải có một giải pháp cho URL state."*
> - **Zustand** — *"lựa chọn **tuỳ chọn** cho client-side state. Tuy nhiên tôi **hiếm khi** dùng client state ngày nay, vì URL state, client-side data caching (React Query) và ứng dụng React server-driven (Server Components) đã giảm nhu cầu đó trong nhiều trường hợp."*
> - **React Query** — *"giải pháp **tuỳ chọn** cho data fetching phía client khi cần cho các trường hợp phức tạp hơn (ví dụ infinite scrolling). Khi độ phức tạp dự án thấp, tôi sẽ chỉ dùng Server Components."*
>
> Note này hệ thống hoá cái khung đứng sau ba lựa chọn đó.

## 1. Khái niệm cốt lõi

### Năm loại state

| Loại | Ví dụ | Nơi ở đúng | Công cụ |
|---|---|---|---|
| **Server state** | Danh sách bài viết, hồ sơ user | Server, có cache ở client | Server Component, React Query, SWR |
| **URL state** | Tìm kiếm, filter, sort, trang, tab | **URL** | `searchParams`, nuqs |
| **Form state** | Giá trị đang gõ | Component / form lib | `useState`, native form |
| **UI state cục bộ** | Dropdown mở/đóng, hover | Component | `useState` |
| **UI state toàn cục** | Theme, sidebar, toast queue | Store nhỏ | Context, Zustand |

> [!warning] Sai lầm phổ biến nhất: coi server state là client state
> `useState` + `useEffect` + `fetch` để giữ dữ liệu server là tái tạo thủ công một cache — và bạn sẽ phải tự viết: loading, error, retry, dedupe, revalidate khi focus, invalidate sau mutation, race condition. Đó là hàng trăm dòng để làm lại một thư viện đã có, thường là sai.
>
> Server state **không phải state của bạn** — nó là bản sao cache của state ở nơi khác. Hãy đối xử với nó như cache.

### URL state — bị đánh giá thấp nhất

Đưa filter, sort, phân trang lên URL cho bạn **miễn phí**:
- Chia sẻ được bằng link
- Nút back/forward hoạt động đúng
- Refresh không mất trạng thái
- Bookmark được
- Server đọc được trực tiếp (`searchParams` trong Server Component)

```ts
// nuqs — URL state có kiểu
const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))
const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
```

Đây là lý do seed gọi nó là "quan trọng phải có một giải pháp cho URL state" — không phải vì thư viện, mà vì **loại state này thường bị nhét nhầm vào `useState`**.

### Thang leo cho UI state

Leo từng bậc, chỉ lên khi bậc dưới thật sự không đủ:

```
useState                     → hầu hết mọi thứ
  ↓ cần chia sẻ giữa anh em
nâng state lên cha chung
  ↓ prop drilling quá sâu
composition (children)       → thử cái này trước Context
  ↓ vẫn không đủ
Context                      → giá trị ít đổi (theme, user)
  ↓ re-render quá nhiều
Zustand / Jotai              → store có selector
```

Phần lớn app không bao giờ cần leo quá bậc ba.

### So sánh thư viện client state

| | Zustand | Jotai | Redux Toolkit | Context |
|---|---|---|---|---|
| Mô hình | Store + selector | Atom nguyên tử | Store + reducer | Cây React |
| Boilerplate | Rất ít | Ít | Trung bình | Ít |
| Re-render | Theo selector | Theo atom | Theo selector | **Mọi consumer** |
| DevTools | ✅ | ✅ | ✅ tốt nhất | React DevTools |
| Kích thước | ~1KB | ~3KB | ~12KB | 0 |
| Dùng ngoài React | ✅ | ⚠️ | ✅ | ❌ |

### Server state: React Query

Nó giải các bài toán bạn sẽ phải tự viết:

| Tính năng | Nghĩa |
|---|---|
| Dedupe | Ba component cùng hỏi một key → một request |
| Stale-while-revalidate | Hiện dữ liệu cũ, lấy dữ liệu mới ngầm |
| Refetch on focus/reconnect | Tự làm mới khi quay lại tab |
| Retry có backoff | |
| Optimistic update + rollback | |
| Infinite query | Đúng trường hợp seed nhắc tới |
| Cache invalidation theo key | |

Với RSC, phần lớn nhu cầu này biến mất — dữ liệu đã fetch trên server. React Query còn đúng cho: infinite scroll, polling, dữ liệu realtime, mutation phức tạp, và app không dùng RSC.

## 2. Nguyên tắc

1. **Phân loại state trước khi chọn công cụ.** Bảng ở mục 1 là bước đầu tiên, luôn luôn.
2. **URL state cho mọi thứ người dùng có thể muốn chia sẻ hoặc quay lại.**
3. **Đừng dùng client state cho server state.**
4. **Leo thang từ từ.** `useState` cho tới khi thực sự đau.
5. **Composition trước Context.** Truyền `children` giải quyết prop drilling mà không thêm phụ thuộc.
6. **Tách context nhỏ theo tần suất đổi.** `ThemeContext` và `UserContext` riêng, không gộp một `AppContext`.
7. **Với RSC, mặc định là không có client state.** Fetch trên server, mutate bằng Server Function — xem [[React Server Functions]].
8. **State phái sinh thì tính, đừng lưu.** Xem [[React Mental Model]].

## 3. Cạm bẫy

- **`useEffect` + `fetch` + ba `useState`.** Callout mục 1.
- **Filter/sort trong `useState`** thay vì URL — mất link chia sẻ, mất nút back.
- **Một `AppContext` khổng lồ** làm mọi component render lại khi bất kỳ field nào đổi.
- **Nhét mọi thứ vào global store** vì "biết đâu sau này cần".
- **Đồng bộ hai nguồn sự thật** bằng `useEffect` — chúng sẽ lệch nhau.
- **`localStorage` là store toàn cục** — không reactive, không đồng bộ giữa tab (trừ `storage` event), throw ở private mode. Xem [[Browser Storage APIs]].
- **Optimistic update không rollback** khi server từ chối.
- **Zustand store dùng ở Server Component** — nó là client-only, cần `"use client"`.
- **Cache key không đủ cụ thể** trong React Query → hai query khác nhau dùng chung cache.
- **Không invalidate sau mutation** → UI hiện dữ liệu cũ.
- **Redux cho app 10 trang** — boilerplate nhiều hơn lợi ích.

## 4. Checklist áp dụng

- [ ] State này thuộc loại nào trong năm loại?
- [ ] Có nên nằm ở URL không?
- [ ] Đây có phải server state đang bị quản lý như client state không?
- [ ] Tôi đã thử `useState` và composition trước chưa?
- [ ] Context này có bị đổi quá thường xuyên không?
- [ ] Có hai chỗ cùng lưu một sự thật không?
- [ ] Với RSC — có cần client state ở đây không?
- [ ] Optimistic update có đường rollback không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| nuqs | URL state có kiểu cho Next.js | https://nuqs.47ng.com/ |
| TanStack Query | Server state | https://tanstack.com/query |
| Zustand | Client state nhỏ gọn | https://zustand.docs.pmnd.rs/ |
| Jotai | State nguyên tử | https://jotai.org/ |
| Redux DevTools | Time-travel debugging | https://github.com/reduxjs/redux-devtools |

## Tham khảo

- TanStack Query — *Does this replace Redux?*: https://tanstack.com/query/latest/docs/framework/react/guides/does-this-replace-client-state
- Kent C. Dodds — *Application State Management with React*: https://kentcdodds.com/blog/application-state-management-with-react
- React — *Choosing the state structure*: https://react.dev/learn/choosing-the-state-structure
- nuqs — *Why URL state*: https://nuqs.47ng.com/docs

## Liên kết

[[React Mental Model]] · [[React Server Components]] · [[Fetch & Network APIs]] · [[Next.js Data Fetching]] · [[Frontend Tech Stack 2025]] · [[Frontend]]
