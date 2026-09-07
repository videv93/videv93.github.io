---
tags: [frontend, analytics]
status: evergreen
---
# Product Analytics & Surveys

> Analytics trả lời **cái gì đang xảy ra**; survey trả lời **vì sao**. Chúng bổ sung nhau, và cả hai đều vô dụng nếu tên sự kiện không có quy ước — dữ liệu bẩn không sửa được về sau.

> [!note] Ghi chú nguồn
> Seed chứa `How to set up surveys in Next.js - PostHog.md` — một tutorial 196 dòng. Đáng chú ý: **mọi code block trong file đều rỗng** — clipping chỉ giữ được văn xuôi. Note này khôi phục lại code từ mô tả còn nguyên, và đặt tutorial vào một khung rộng hơn.

## 1. Khái niệm cốt lõi

### Ba tầng đo lường

| Tầng | Trả lời | Công cụ |
|---|---|---|
| **Số đo kỹ thuật** | Trang có nhanh không | [[Core Web Vitals]], RUM |
| **Analytics hành vi** | Người dùng làm gì | PostHog, Amplitude, Plausible |
| **Phản hồi định tính** | Vì sao họ làm vậy | Survey, phỏng vấn — xem [[User Research]] |

### Đặt tên sự kiện

Chọn **một** quy ước và ép nó bằng TypeScript:

```ts
// object_action, snake_case
type Event =
  | { name: 'post_created'; props: { length: number } }
  | { name: 'checkout_completed'; props: { value: number; currency: string } }

export function track<E extends Event>(e: E) { posthog.capture(e.name, e.props) }
```

Union có kiểu ngăn được hai vấn đề lớn nhất của analytics: tên sự kiện lệch nhau (`post_created` / `postCreated` / `created_post`) và property thiếu.

| Nên | Không nên |
|---|---|
| `object_action` nhất quán | Trộn nhiều kiểu đặt tên |
| Property mô tả ngữ cảnh | Nhồi mọi thứ vào tên sự kiện |
| Ít sự kiện, có chủ đích | Track mọi click |
| Tài liệu hoá trong code | Chỉ có trong đầu ai đó |

### Tích hợp trong Next.js App Router

Provider phải là Client Component — đây chính là pattern trong seed:

```tsx
// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/ingest',              // reverse proxy, xem mục 3
    capture_pageview: false,          // App Router cần tự bắt
  })
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

```tsx
// app/layout.tsx  — Server Component, chỉ bọc
import { PHProvider } from './providers'
export default function RootLayout({ children }) {
  return <html lang="vi"><body><PHProvider>{children}</PHProvider></body></html>
}
```

> [!warning] Pageview không tự bắt trong App Router
> Client-side navigation không tải lại trang, nên thư viện analytics không thấy gì. Phải tự bắt bằng `usePathname()` + `useSearchParams()` trong một Client Component, và bọc nó trong `<Suspense>` — `useSearchParams()` làm cả route thành dynamic nếu không. Xem [[Next.js Rendering Strategies]].

### Survey — hai lựa chọn

Seed trình bày hai đường, và sự đánh đổi giữa chúng đúng cho mọi công cụ survey:

| | Prebuilt UI | Custom UI |
|---|---|---|
| Công sức | Cấu hình trong dashboard, xong | Viết component, fetch, hiển thị, gửi event |
| Kiểm soát giao diện | Hạn chế theo theme | Toàn quyền |
| Chi phí bundle | Script của nhà cung cấp | Code của bạn |
| A11y | Phụ thuộc nhà cung cấp | Bạn chịu trách nhiệm |
| Khi nào | Mặc định — dùng cái này trước | Khi brand hoặc luồng đòi hỏi |

**Prebuilt** (theo seed): tạo survey trong dashboard, chọn display mode `Popover`, chọn kiểu câu hỏi `Rating`, đặt tiêu đề, display type `number`, thang `1-10`, lưu nháp rồi launch. Không cần code.

**Custom** (display mode `API`) — bốn phần:

1. **Dựng UI survey** — component của bạn.
2. **Lấy survey từ PostHog** — `posthog.getActiveMatchingSurveys()` trong `useEffect`, qua hook `usePostHog()`. Nó trả về object survey mà bạn dùng để cấu hình component.
3. **Logic hiện/ẩn** — dùng `localStorage` để không hiện lại cho người đã trả lời hoặc đã bỏ qua.
4. **Bắt tương tác** — ba sự kiện: `"survey shown"`, `"survey dismissed"`, `"survey sent"` (cho câu trả lời), gửi bằng `posthog.capture()`.

```tsx
'use client'
const posthog = usePostHog()
const [survey, setSurvey] = useState(null)

useEffect(() => {
  posthog?.getActiveMatchingSurveys((surveys) => {
    const s = surveys.find(s => s.type === 'api')
    if (!s) return
    if (localStorage.getItem(`survey_${s.id}`)) return   // đã trả lời
    setSurvey(s)
    posthog.capture('survey shown', { $survey_id: s.id })
  })
}, [posthog])

const submit = (rating: number) => {
  posthog.capture('survey sent', { $survey_id: survey.id, $survey_response: rating })
  localStorage.setItem(`survey_${survey.id}`, 'done')
  setSurvey(null)
}
```

Kết quả xem trong tab surveys: bao nhiêu người **thấy**, bao nhiêu người **bỏ qua**, và các **câu trả lời** — lọc được theo person property, cohort, feature flag.

### Đặt câu hỏi survey

| Nên | Không nên |
|---|---|
| Hỏi về hành vi vừa xảy ra | Hỏi về ý định tương lai |
| Một câu, tối đa hai | Bảng hỏi 10 câu |
| Câu mở sau câu thang đo | Chỉ lấy con số |
| Kích hoạt theo ngữ cảnh | Hiện ngay khi vào trang |
| Cho phép đóng dễ dàng | Bắt buộc trả lời |

Xem thêm [[UX Metrics]] và [[User Research]] bên UIUX.

## 2. Nguyên tắc

1. **Định nghĩa sự kiện có kiểu, ở một chỗ.**
2. **Ít sự kiện, có chủ đích.** Track mọi click tạo dữ liệu không ai phân tích.
3. **Tự bắt pageview trong App Router**, bọc trong Suspense.
4. **Reverse proxy script analytics** qua domain của bạn (`/ingest`) — tránh ad blocker và giữ cookie first-party.
5. **`lazyOnload` cho script analytics** — xem [[Frontend Performance Budget]].
6. **Không gửi PII vào analytics.** Dùng id đã băm.
7. **Xin đồng ý trước khi track** ở nơi luật yêu cầu (GDPR); chuẩn bị cho chế độ cookieless.
8. **Prebuilt survey trước.** Chỉ custom khi có lý do thật.
9. **Ghi lại cả `shown` và `dismissed`**, không chỉ `sent` — tỉ lệ trả lời là dữ liệu.
10. **Kiểm tra survey trên mobile** — popover hay che mất nội dung.

## 3. Cạm bẫy

- **Pageview không được bắt trong App Router.** Callout mục 1.
- **`useSearchParams()` không bọc Suspense** → cả route thành dynamic, mất static rendering.
- **Tên sự kiện lệch nhau** → dữ liệu không gộp được, và không sửa hồi tố được.
- **Track mọi thứ** → chi phí cao, dữ liệu nhiễu.
- **PII trong property** — email, tên trong event là vi phạm và khó gỡ.
- **Script analytics chặn render** — luôn tải lười.
- **Ad blocker chặn ~30% người dùng** → số liệu thấp hơn thực tế một cách có hệ thống. Reverse proxy giúp một phần.
- **Survey hiện ngay khi vào trang** → tỉ lệ trả lời rất thấp và gây khó chịu.
- **Survey không đóng được bằng bàn phím** — nó là modal, cần trap focus và Escape. Xem [[Accessible Markup & ARIA]].
- **`localStorage` throw ở private mode** → survey crash cả trang nếu không bọc try/catch. Xem [[Browser Storage APIs]].
- **Khảo sát nhóm người vẫn ở lại** — người đã bỏ đi mới là nhóm quan trọng nhất, và họ không thấy survey.
- **Thu thập rồi không hành động.** Đây là cạm bẫy tốn kém nhất và ít được nói tới nhất.

## 4. Checklist áp dụng

- [ ] Sự kiện có định nghĩa có kiểu ở một chỗ không?
- [ ] Pageview có được bắt trong App Router không?
- [ ] `useSearchParams()` có bọc Suspense không?
- [ ] Có PII nào trong event không?
- [ ] Script analytics có tải lười không?
- [ ] Có reverse proxy không?
- [ ] Survey có kích hoạt theo ngữ cảnh không?
- [ ] Survey có dùng được bằng bàn phím không?
- [ ] Truy cập `localStorage` có bọc try/catch không?
- [ ] Có ghi lại `shown` và `dismissed` không?
- [ ] Ai sẽ đọc dữ liệu này và ra quyết định gì?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| PostHog | Analytics + survey + feature flag + replay | https://posthog.com/ |
| Plausible / Umami | Analytics nhẹ, không cookie | https://plausible.io/ |
| Vercel Analytics | Tích hợp sẵn Next | https://vercel.com/docs/analytics |
| `next/script` | Tải script bên thứ ba có chiến lược | https://nextjs.org/docs/app/api-reference/components/script |

## Tham khảo

- PostHog — *How to set up surveys in Next.js*: https://posthog.com/tutorials/nextjs-surveys
- PostHog — *Next.js integration (App Router)*: https://posthog.com/docs/libraries/next-js
- PostHog — *Creating surveys*: https://posthog.com/docs/surveys/creating-surveys
- PostHog — *How to write great product survey questions*: https://posthog.com/blog/product-survey-questions
- MDN — *Window.localStorage*: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

## Liên kết

[[React Client Components]] · [[Core Web Vitals]] · [[UX Metrics]] · [[User Research]] · [[Browser Storage APIs]] · [[Frontend]]
