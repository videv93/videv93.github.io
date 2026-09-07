---
tags: [frontend, react]
status: evergreen
---
# React Mental Model

> UI là một **hàm của state**. Bạn không mô tả cách đi từ trạng thái A sang B; bạn mô tả B trông thế nào và để React tìm đường. Mọi bug React khó chịu đều đến từ việc tạm quên điều này.

## 1. Khái niệm cốt lõi

### Ba ý tưởng nền

| Ý tưởng | Nghĩa |
|---|---|
| **Declarative** | Mô tả kết quả, không mô tả các bước |
| **Component** | Hàm nhận props, trả về mô tả UI |
| **Unidirectional data flow** | Dữ liệu chảy xuống qua props, sự kiện đi lên qua callback |

### State vs derived value

```jsx
// ❌ state thừa — hai nguồn sự thật, sẽ lệch nhau
const [items, setItems] = useState([])
const [count, setCount] = useState(0)

// ✅ dẫn xuất
const [items, setItems] = useState([])
const count = items.length
```

**Quy tắc:** nếu một giá trị tính được từ props hoặc state khác, **đừng đưa nó vào state**. Đây là nguồn gốc phổ biến nhất của UI không đồng bộ.

### Khi nào cần state

Hỏi bốn câu:
1. Nó có đổi theo thời gian không? Không → hằng số.
2. Tính được từ props/state khác không? Được → dẫn xuất.
3. Nhiều component cần nó không? Có → nâng lên cha chung.
4. Nó thuộc về URL không? Có → URL state. Xem [[Frontend State Management]].

### Reconciliation & key

React so sánh cây cũ và mới:
- **Khác kiểu element** → huỷ cả cây con, dựng lại
- **Cùng kiểu** → giữ instance, cập nhật props
- **Danh sách** → so theo `key`

```jsx
{items.map(item => <Row key={item.id} />)}   // ✅ id ổn định
{items.map((item, i) => <Row key={i} />)}    // ❌ index
```

> [!warning] `key={index}` phá state của component con
> Với `key` là index, khi bạn xoá phần tử đầu, React nghĩ mọi phần tử chỉ *đổi props* chứ không bị xoá. Kết quả: input đang gõ dở, checkbox đã tick, focus — tất cả gắn nhầm sang hàng khác. Chỉ dùng index khi danh sách **không bao giờ** sắp xếp lại, thêm, hay xoá.
>
> Ngược lại, đổi `key` là cách **cố ý** reset state của một component — `<Form key={userId} />` tạo form mới khi đổi user.

### Hook rules

1. Chỉ gọi hook **ở cấp cao nhất** — không trong điều kiện, vòng lặp, hàm lồng.
2. Chỉ gọi trong component hoặc custom hook.

Lý do: React nhận diện hook **theo thứ tự gọi**, không theo tên.

### `useEffect` — dùng ít hơn bạn nghĩ

Effect là để **đồng bộ với hệ thống bên ngoài React**: DOM ngoài, subscription, timer, analytics.

| Bạn định làm | Nên dùng |
|---|---|
| Tính giá trị từ props/state | Tính trực tiếp khi render |
| Cache tính toán nặng | `useMemo` |
| Phản ứng với sự kiện người dùng | Handler sự kiện |
| Reset state khi prop đổi | Đổi `key` |
| Fetch dữ liệu | React Query, hoặc Server Component |
| Đăng ký external store | `useSyncExternalStore` |
| Đồng bộ với API ngoài (map, chart, socket) | ✅ `useEffect` |

### React 19 — những thứ đổi cách viết

| API | Cho |
|---|---|
| `use(promise)` | Đọc promise trong render, tích hợp Suspense |
| `useActionState` | State cho form action, kèm pending và error |
| `useOptimistic` | Cập nhật lạc quan |
| `useFormStatus` | Trạng thái submit từ component con |
| **React Compiler** | Tự memo hoá — làm `useMemo`/`useCallback` thủ công gần như không cần |
| `ref` là prop thường | Không cần `forwardRef` |
| Document metadata | `<title>`, `<meta>` render được ở bất kỳ đâu |

## 2. Nguyên tắc

1. **Giảm state tới mức tối thiểu.** Mỗi state là một thứ có thể lệch.
2. **Nâng state lên đúng cha chung gần nhất**, không cao hơn.
3. **`key` ổn định và duy nhất**, không phải index.
4. **Đọc "You Might Not Need an Effect" trước khi viết effect.**
5. **Component thuần: cùng props → cùng output.** Không mutate props, không side effect khi render.
6. **Composition thay vì prop drilling.** Truyền `children` xuống thay vì truyền dữ liệu qua năm tầng.
7. **Custom hook để tái sử dụng *logic*, component để tái sử dụng *UI*.**
8. **Với React 19+, để Compiler lo memo hoá.** `useMemo`/`useCallback` thủ công thường là tối ưu hoá sớm.
9. **Đừng đọc DOM làm nguồn sự thật.** Xem [[DOM & Events]].

## 3. Cạm bẫy

- **`key={index}`.** Callout mục 1.
- **State dẫn xuất bị nhét vào `useState` + `useEffect`** để đồng bộ. Gây thêm một lần render và luôn trễ một nhịp.
- **Mảng dependency thiếu.** Bật `eslint-plugin-react-hooks` và đừng bao giờ tắt cảnh báo — hãy sửa nguyên nhân.
- **Object/array literal trong dependency** đổi mỗi lần render → effect chạy vô hạn.
- **Mutate state trực tiếp.** `items.push(x)` không trigger render; React so sánh bằng tham chiếu.
- **Stale closure.** Effect hoặc callback bắt giữ giá trị cũ. Dùng dạng hàm: `setCount(c => c + 1)`.
- **Fetch trong `useEffect` không huỷ** → race condition và cập nhật state sau unmount.
- **Effect không cleanup** subscription/timer.
- **Đặt hook sau `return` sớm** — vi phạm hook rules, lỗi khó hiểu.
- **`useState` với giá trị khởi tạo đắt** chạy lại mỗi render: dùng `useState(() => expensive())`.
- **Nghĩ `useEffect` chạy sau paint mọi lúc** — `useLayoutEffect` chạy trước, và đó mới là cái cần khi đo DOM.
- **Context làm mọi consumer render lại** khi bất kỳ phần nào của value đổi. Tách context nhỏ hoặc dùng selector.

## 4. Checklist áp dụng

- [ ] State này có tính được từ thứ khác không?
- [ ] `key` có ổn định và không phải index không?
- [ ] Effect này có thực sự đồng bộ với hệ thống ngoài không?
- [ ] Mảng dependency có đầy đủ không?
- [ ] Có mutate state hay props ở đâu không?
- [ ] Fetch có huỷ khi unmount không?
- [ ] Effect có cleanup không?
- [ ] Có prop drilling nào thay bằng `children` được không?
- [ ] State này có nên nằm ở URL không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| React DevTools | Cây component, profiler, xem lý do re-render | https://react.dev/learn/react-developer-tools |
| `eslint-plugin-react-hooks` | Bắt lỗi hook rules và dependency | https://www.npmjs.com/package/eslint-plugin-react-hooks |
| React Compiler | Tự memo hoá | https://react.dev/learn/react-compiler |
| `why-did-you-render` | Tìm re-render thừa | https://github.com/welldone-software/why-did-you-render |

## Tham khảo

- React — *Thinking in React*: https://react.dev/learn/thinking-in-react
- React — *You Might Not Need an Effect*: https://react.dev/learn/you-might-not-need-an-effect
- React — *Preserving and resetting state*: https://react.dev/learn/preserving-and-resetting-state
- React — *Rules of Hooks*: https://react.dev/reference/rules/rules-of-hooks
- React — *React 19 release notes*: https://react.dev/blog/2024/12/05/react-19

## Liên kết

[[React Server Components]] · [[React Client Components]] · [[Frontend State Management]] · [[Component Library Strategy]] · [[Frontend]]
