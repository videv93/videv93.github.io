---
tags: [frontend, react, rsc]
status: evergreen
---
# React Client Components

> `"use client"` không có nghĩa "chỉ chạy trên client". Nó đánh dấu một **ranh giới mạng** — mọi thứ từ đó trở xuống đi vào bundle gửi tới trình duyệt. Hiểu sai điều này là nguyên nhân số một khiến bundle phình to.

> [!note] Ghi chú nguồn
> Seed ghi: *"Client Component cho phép viết UI tương tác được prerender trên server và dùng JavaScript phía client để chạy trong trình duyệt... `"use client"` dùng để khai báo một **ranh giới** giữa module Server và Client. Nghĩa là khi định nghĩa `"use client"` trong một file, mọi module khác được import vào nó, kể cả component con, đều được coi là phần của bundle client."*

## 1. Khái niệm cốt lõi

### `"use client"` là ranh giới, không phải nhãn

```jsx
'use client'                      // ← ranh giới bắt đầu tại đây
import Chart from 'heavy-chart'   // ← vào bundle client
import { Button } from './button' // ← cũng vào bundle client
```

Mọi import **truyền dẫn** từ file này đều thành client. Đặt `"use client"` ở một layout gốc là đưa toàn bộ ứng dụng vào bundle.

Directive chỉ cần ở **điểm vào** ranh giới — component con không cần lặp lại.

### Client Component vẫn được prerender trên server

Đây là điểm hay bị hiểu nhầm. Client Component:
1. Được render thành **HTML trên server** (prerender)
2. HTML gửi xuống → người dùng thấy nội dung ngay
3. JavaScript tải về → **hydrate** → trang tương tác được

Nên code trong thân component **chạy cả trên server**. `window` không tồn tại ở bước 1.

### Hai kiểu render

| Tình huống | Cách render |
|---|---|
| **Tải trang lần đầu** (hoặc F5) | Prerender HTML trên server → hydrate |
| **Điều hướng tiếp theo** | Render hoàn toàn trên client từ RSC payload |

Đây là lý do một bug chỉ xuất hiện khi F5 chứ không khi click link — đường đi khác nhau.

### Hydration mismatch

HTML server sinh ra phải **khớp chính xác** với lần render đầu trên client. Không khớp → React cảnh báo và vẽ lại.

Nguyên nhân thường gặp:

| Nguyên nhân | Sửa |
|---|---|
| `new Date()`, `Math.random()` | Tính ở effect, hoặc truyền từ server |
| `localStorage`, `window` | Đọc trong `useEffect` |
| `typeof window !== 'undefined'` trong render | Dùng state + effect |
| Extension trình duyệt sửa DOM | `suppressHydrationWarning` |
| Locale/timezone khác nhau | Format ở client hoặc cố định timezone |
| HTML không hợp lệ (`<div>` trong `<p>`) | Sửa markup — trình duyệt tự sửa nên cây lệch |

```jsx
// Pattern chuẩn cho giá trị chỉ có ở client
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return <Skeleton />
```

### Giảm kích thước bundle

| Cách | Ví dụ |
|---|---|
| Đẩy ranh giới xuống lá | Chỉ nút Like là client, cả bài viết là server |
| Dynamic import | `const Chart = dynamic(() => import('./chart'), { ssr: false })` |
| Truyền server content qua `children` | `<ClientPanel><ServerContent /></ClientPanel>` |
| Chọn thư viện nhẹ hơn | `date-fns` thay `moment` |

## 2. Nguyên tắc

1. **`"use client"` ở lá, không ở gốc.**
2. **Provider phải là Client Component** — bọc nó trong một file riêng có `"use client"`, rồi dùng ở layout server:
   ```jsx
   // providers.tsx
   'use client'
   export function Providers({ children }) {
     return <ThemeProvider>{children}</ThemeProvider>
   }
   ```
   Đây chính là pattern trong seed PostHog: tạo `providers.js` export `PHProvider`, rồi import vào `layout.js` và bọc app.
3. **Mọi truy cập browser API phải trong `useEffect`** hoặc trong event handler.
4. **`dynamic(..., { ssr: false })` cho component thực sự không prerender được** (map, chart phụ thuộc kích thước).
5. **Đừng dùng `typeof window` để phân nhánh khi render** — nó tạo hydration mismatch theo định nghĩa.
6. **Truyền dữ liệu từ Server Component xuống qua props** thay vì fetch lại ở client.
7. **Đo bundle thường xuyên** — xem [[Frontend Performance Budget]].
8. **Client Component có thể nhận Server Component qua `children`** — dùng nó để giữ nội dung ở server.

## 3. Cạm bẫy

- **`"use client"` ở `app/layout.tsx`.** Toàn bộ app thành client. Cạm bẫy số một.
- **Hydration mismatch từ `new Date()`.** Server render 10:00:00, client hydrate 10:00:01.
- **`localStorage` trong thân component** → `ReferenceError` khi prerender. Xem [[Browser Storage APIs]].
- **Nghĩ Client Component không chạy trên server.** Nó có chạy — bước prerender.
- **`window` trong module scope** (ngoài component) chạy ngay khi import — còn sớm hơn.
- **Bug chỉ xuất hiện khi F5** — vì đường render khác với điều hướng client.
- **Import thư viện nặng ở đỉnh ranh giới** kéo cả nó vào bundle dù chỉ dùng ở một chỗ.
- **`suppressHydrationWarning` để giấu vấn đề thật.** Nó chỉ nên dùng cho DOM bị bên ngoài can thiệp.
- **Context re-render toàn bộ cây** khi value đổi — xem [[React Mental Model]].
- **Fetch ở client cái mà server đã có.** Waterfall thừa.
- **Quên `key` khi map ở client** cũng gây mismatch.

## 4. Checklist áp dụng

- [ ] `"use client"` có ở lá không?
- [ ] Có `window`/`localStorage`/`document` nào ngoài `useEffect` không?
- [ ] Có `Date`/`Math.random()` nào trong render không?
- [ ] Provider có được tách ra file riêng không?
- [ ] Bundle client nặng bao nhiêu? Import nào lớn nhất?
- [ ] Có thể truyền nội dung server qua `children` thay vì fetch ở client không?
- [ ] Đã test cả điều hướng client **và** F5 chưa?
- [ ] Có `suppressHydrationWarning` nào che giấu bug thật không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `@next/bundle-analyzer` | Xem gì trong bundle client | https://www.npmjs.com/package/@next/bundle-analyzer |
| `client-only` | Chặn module client lọt vào server | https://www.npmjs.com/package/client-only |
| React DevTools | Đánh dấu Client vs Server Component | https://react.dev/learn/react-developer-tools |
| DevTools → Network → JS | Đo JS thật tải về | https://developer.chrome.com/docs/devtools/network |

## Tham khảo

- Next.js — *Server and Client Components*: https://nextjs.org/docs/app/getting-started/server-and-client-components
- React — *`"use client"`*: https://react.dev/reference/rsc/use-client
- Next.js — *Hydration error*: https://nextjs.org/docs/messages/react-hydration-error
- React Working Group — *How Client Components are rendered*: https://github.com/reactwg/server-components/discussions/4

## Liên kết

[[React Server Components]] · [[React Mental Model]] · [[Browser Storage APIs]] · [[Frontend Performance Budget]] · [[Product Analytics & Surveys]] · [[Frontend]]
