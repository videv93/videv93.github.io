---
tags: [frontend, react, component]
status: evergreen
---
# Component Library Strategy

> Ba mô hình phân phối component, và một câu hỏi quyết định: **khi thư viện không làm đúng thứ bạn cần, bạn có sửa được không?** Câu trả lời cho câu hỏi đó là toàn bộ luận điểm của Shadcn UI.

> [!note] Ghi chú nguồn
> Seed ghi: *"**Shadcn UI**: UI library đến rồi đi, nhưng Shadcn UI đã hot hơn một năm nay. Đó là lựa chọn phổ biến, hoạt động mượt với Tailwind CSS và mang lại cách tiếp cận mới mẻ cho việc quản lý UI với hệ thống **versionless** của nó. Tôi cho rằng đó là lựa chọn tốt cho hiện tại, cho tới khi có thứ lớn tiếp theo, hoặc nếu mọi thứ bắt đầu trông giống nhau quá."*
>
> Seed cũng chứa catalogue 46 component của Shadcn — được giữ lại ở mục 3.

## 1. Ba mô hình

| Mô hình | Ví dụ | Bạn nhận được | Sửa được không |
|---|---|---|---|
| **Styled library** | MUI, Ant Design, Chakra | Component có sẵn giao diện | Chỉ qua theme API; khó thoát |
| **Headless library** | Radix, React Aria, Headless UI | Hành vi + a11y, **không** style | Style tự do; hành vi thì không |
| **Copy-in** | **Shadcn UI** | Source code vào repo bạn | **Toàn quyền** |

### Versionless nghĩa là gì

Shadcn không phải dependency. `npx shadcn add button` **chép file vào repo bạn**. Không có `node_modules/shadcn`, không có breaking change, không chờ maintainer merge PR.

| Được | Mất |
|---|---|
| Sửa bất cứ gì, ngay lập tức | Không nhận bugfix tự động |
| Không lo breaking change | Phải tự bảo trì |
| Không phụ thuộc lịch trình của ai | Nâng cấp là thủ công |
| Đọc được toàn bộ code | Repo phình ra |

**Nó không miễn phí — nó chuyển chi phí bảo trì sang cho bạn.** Đó là đánh đổi đúng khi bạn cần tuỳ biến sâu, và sai khi bạn muốn "cài rồi quên".

Bên dưới, Shadcn là **Radix** (hành vi + a11y) + **Tailwind** (style) + **cva** (biến thể). Nó không phát minh gì; nó đóng gói một tổ hợp và giao source cho bạn.

### `cva` — API biến thể

```ts
const button = cva('inline-flex items-center rounded-md font-medium', {
  variants: {
    variant: { default: 'bg-primary text-white', ghost: 'hover:bg-accent' },
    size: { sm: 'h-8 px-3 text-sm', lg: 'h-11 px-6' },
  },
  defaultVariants: { variant: 'default', size: 'sm' },
})
```

Đây là câu trả lời của utility-first cho câu hỏi "làm sao trừu tượng hoá mà không dùng `@apply`" — xem [[Utility-First vs Cascade]] và [[Component API & Variants]].

## 2. Nguyên tắc

1. **Chọn mô hình theo nhu cầu tuỳ biến**, không theo độ phổ biến. Cần khớp brand chặt → copy-in hoặc headless. Cần dựng nhanh dashboard nội bộ → styled library ổn.
2. **Đừng bao giờ tự viết component có a11y phức tạp.** Combobox, date picker, menu, dialog có hàng trăm chi tiết bàn phím và ARIA. Dùng Radix hoặc React Aria — xem [[Accessible Markup & ARIA]].
3. **Bọc thư viện bên thứ ba trong component của bạn.** `<Button>` của bạn bọc `<RadixButton>`; đổi thư viện chỉ sửa một file.
4. **Token trước component.** Xem [[Design Tokens]] và [[Tailwind Theme & Configuration]].
5. **Style bằng `data-*` variant** mà thư viện headless phát ra (`data-state="open"`) thay vì đồng bộ class thủ công — xem [[Tailwind Variants & States]].
6. **`cva` + `tailwind-merge` cho biến thể**, không `@apply`.
7. **Component nhận `className` và `...props`**, và forward `ref`. Không có chúng, component không tái sử dụng được.
8. **Tài liệu hoá bằng Storybook** — cũng là nơi test trạng thái khó dựng (loading, error, rỗng).
9. **Đừng dùng nhiều thư viện component cùng lúc.** Hai design system trong một app là hai design system.

## 3. Catalogue Shadcn UI

Toàn bộ danh sách trong seed, cùng khái niệm UIUX tương ứng:

| Component | Mô tả | Khái niệm |
|---|---|---|
| Accordion | Tiêu đề xếp chồng, mỗi cái mở một phần nội dung | [[Menu & Navigation]] |
| Alert | Hiển thị callout thu hút chú ý | [[Empty & Error States]] |
| Alert Dialog | Modal ngắt người dùng và đòi phản hồi | [[Modal & Dialog]] |
| Aspect Ratio | Giữ nội dung theo tỉ lệ mong muốn | [[Tailwind Layout Utilities]] |
| Avatar | Ảnh có fallback, đại diện người dùng | [[Iconography & Imagery]] |
| Badge | Nhãn nhỏ | |
| Breadcrumb | Đường dẫn tới tài nguyên hiện tại | [[Menu & Navigation]] |
| Button | Nút | [[Button]] |
| Calendar | Trường ngày cho phép nhập và sửa ngày | [[Slider & Picker]] |
| Card | Thẻ có header, content, footer | [[Card]] |
| Carousel | Băng chuyền có chuyển động và vuốt, dựng bằng Embla | |
| Chart | Biểu đồ, dựng bằng Recharts | [[Table & Data Display]] |
| Checkbox | Bật/tắt trạng thái đã chọn | [[Selection Controls]] |
| Collapsible | Panel mở/đóng | |
| Combobox | Ô nhập tự động hoàn thành, kèm command palette | [[Input & Form]] |
| Command | Menu lệnh nhanh, không style, ghép được | |
| Context Menu | Menu hành động, kích hoạt bằng nút | [[Menu & Navigation]] |
| Data Table | Bảng và datagrid mạnh, dựng bằng TanStack Table | [[Table & Data Display]] |
| Date Picker | Chọn ngày có khoảng và preset | [[Slider & Picker]] |
| Dialog | Cửa sổ phủ lên, làm phần dưới bất hoạt | [[Modal & Dialog]] |
| Drawer | Ngăn kéo | [[Modal & Dialog]] |
| Dropdown Menu | Menu hành động từ một nút | [[Menu & Navigation]] |
| Form | Dựng form bằng React Hook Form và Zod | [[HTML Forms & Validation]] |
| Hover Card | Xem trước nội dung sau một link | [[Tooltip]] |
| Input | Trường nhập | [[Input & Form]] |
| Input OTP | Nhập mật khẩu một lần, dán được | [[Input & Form]] |
| Label | Nhãn gắn với control, truy cập được | [[Input & Form]] |
| Menubar | Thanh menu kiểu ứng dụng desktop | [[Menu & Navigation]] |
| Navigation Menu | Tập link điều hướng website | [[Menu & Navigation]] |
| Pagination | Phân trang có next/prev | [[Frontend State Management]] |
| Popover | Nội dung phong phú trong portal, từ một nút | [[Stacking Context]] |
| Progress | Chỉ báo tiến độ hoàn thành | [[Progress & Loading]] |
| Radio Group | Nhóm nút chọn một | [[Selection Controls]] |
| Resizable | Nhóm panel co giãn được, hỗ trợ bàn phím | |
| Scroll Area | Cuộn tuỳ biến, đồng nhất giữa trình duyệt | [[CSS Overflow & Scrolling]] |
| Select | Danh sách lựa chọn từ một nút | [[Selection Controls]] |
| Separator | Phân tách thị giác hoặc ngữ nghĩa | |
| Sheet | Mở rộng Dialog, hiện nội dung bổ trợ | [[Modal & Dialog]] |
| Skeleton | Chỗ giữ trong khi tải | [[Progress & Loading]] |
| Slider | Chọn giá trị trong một khoảng | [[Slider & Picker]] |
| Sonner | Toast có quan điểm cho React | [[Empty & Error States]] |
| Switch | Bật/tắt | [[Selection Controls]] |
| Table | Bảng responsive | [[Table & Data Display]] |
| Tabs | Các panel nội dung xếp lớp, hiện một lúc một | [[Menu & Navigation]] |
| Textarea | Vùng nhập nhiều dòng | [[Input & Form]] |
| Toast | Tin nhắn ngắn hiện tạm thời | [[Empty & Error States]] |
| Toggle | Nút hai trạng thái | [[Interaction States]] |
| Toggle Group | Nhóm nút hai trạng thái | [[Selection Controls]] |
| Tooltip | Thông tin hiện khi hover hoặc focus | [[Tooltip]] |

> [!note] Khái niệm component sống ở UIUX
> Cột phải trỏ sang [[UIUX]], nơi *Button*, *Input & Form*, *Modal & Dialog*… đã được hệ thống hoá về mặt thiết kế và hành vi. Note này chỉ nói về **cách phân phối và lắp ráp** chúng. Nguyên tắc "một khái niệm, một nhà" — xem [[Frontend]].

## 4. Cạm bẫy

- **Chọn styled library rồi phải fight nó.** Ghi đè MUI bằng `!important` là dấu hiệu chọn sai mô hình từ đầu.
- **Tự viết combobox/date picker.** Bạn sẽ bỏ sót Home/End/PageUp, typeahead, `aria-activedescendant`, quản lý focus, và hành vi màn hình cảm ứng.
- **Dùng Shadcn rồi không bao giờ đọc code.** Nếu không định sửa, bạn đang chịu chi phí bảo trì mà không hưởng lợi ích.
- **Sửa file Shadcn tuỳ tiện không ghi lại** → sau này không biết đã lệch upstream chỗ nào. Ghi chú lại các thay đổi.
- **Trộn hai thư viện component** → hai design system.
- **Component không nhận `className`** → không tái sử dụng được.
- **Quên forward `ref`** → thư viện định vị và focus không hoạt động (React 19 đã đỡ hơn).
- **Bọc component headless mà nuốt mất props ARIA** của nó.
- **Copy component rồi không cập nhật khi upstream vá lỗi a11y** — đây là chi phí thật của versionless.
- **"Mọi thứ trông giống nhau"** — chính seed cảnh báo điều này. Shadcn mặc định có diện mạo rất dễ nhận ra; nếu brand quan trọng, phải thực sự tuỳ biến token.

## 5. Checklist áp dụng

- [ ] Mô hình này (styled / headless / copy-in) có khớp nhu cầu tuỳ biến không?
- [ ] Component phức tạp có dùng thư viện headless đã kiểm chứng a11y không?
- [ ] Thư viện bên thứ ba có được bọc trong component của tôi không?
- [ ] Component có nhận `className` và forward `ref` không?
- [ ] Biến thể dùng `cva` thay `@apply` chưa?
- [ ] Token có tách khỏi component chưa?
- [ ] Có đang dùng hơn một thư viện component không?
- [ ] Với Shadcn: có ghi lại chỗ đã sửa lệch upstream không?
- [ ] Giao diện có còn khác biệt so với mặc định không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Shadcn UI | Copy-in, dựng trên Radix + Tailwind | https://ui.shadcn.com/ |
| Radix Primitives | Headless, a11y tốt | https://www.radix-ui.com/primitives |
| React Aria | Headless của Adobe, a11y sâu nhất | https://react-spectrum.adobe.com/react-aria/ |
| cva | API biến thể có kiểu | https://cva.style/ |
| Storybook | Tài liệu và test component | https://storybook.js.org/ |

## Tham khảo

- Shadcn UI — *Introduction*: https://ui.shadcn.com/docs
- Radix — *Introduction*: https://www.radix-ui.com/primitives/docs/overview/introduction
- W3C — *ARIA Authoring Practices Guide*: https://www.w3.org/WAI/ARIA/apg/patterns/
- Robin Wieruch — *React Tech Stack*: https://www.robinwieruch.de/react-tech-stack/

## Liên kết

[[Design System]] · [[Component API & Variants]] · [[Design Tokens]] · [[Utility-First vs Cascade]] · [[Web Components]] · [[UIUX]] · [[Frontend]]
