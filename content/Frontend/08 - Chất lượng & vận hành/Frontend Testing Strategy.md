---
tags: [frontend, testing]
status: evergreen
---
# Frontend Testing Strategy

> Câu hỏi không phải "unit hay E2E" mà là **test này bảo vệ khỏi lỗi gì, và nó có gãy khi tôi refactor không**. Test gãy vì refactor là test đo cài đặt, không đo hành vi.

> [!note] Ghi chú nguồn
> Seed ghi: *"Testing & Tooling: Tôi không có khuyến nghị cứng nào cho testing và tooling. Tôi cho rằng ngày nay một hỗn hợp React Testing Library và Cypress/Playwright là lựa chọn tốt cho testing."* Một câu, không giải thích. Note này khai triển cái khung đứng sau lựa chọn đó.

## 1. Khái niệm cốt lõi

### Testing Trophy

Với frontend, hình dạng đúng không phải kim tự tháp mà là **cúp** (Kent C. Dodds):

| Tầng | Tỉ lệ | Công cụ | Bảo vệ khỏi |
|---|---|---|---|
| **Static** | Nền | TypeScript, ESLint | Typo, sai kiểu, lỗi API |
| **Unit** | Ít | Vitest | Logic thuần: format, tính toán, reducer |
| **Integration** | **Nhiều nhất** | RTL + MSW | Component + state + network cùng làm việc |
| **E2E** | Vài | Playwright | Luồng quan trọng qua toàn hệ thống |

Lý do integration được ưu tiên: nó cho **niềm tin trên mỗi dòng test** cao nhất. Unit test một component React hiếm khi bắt được bug thật; E2E bắt được nhiều nhưng chậm và hay flaky.

### Nguyên tắc của Testing Library

> *"Test càng giống cách phần mềm được sử dụng, càng cho bạn nhiều niềm tin."*

Thứ tự ưu tiên của query — **theo đúng thứ tự này**:

| Ưu tiên | Query | Vì sao |
|---|---|---|
| 1 | `getByRole('button', { name: 'Lưu' })` | Giống cách screen reader và người dùng thấy |
| 2 | `getByLabelText` | Cách người dùng tìm trường form |
| 3 | `getByPlaceholderText` | |
| 4 | `getByText` | |
| 5 | `getByDisplayValue` | |
| 6 | `getByAltText` / `getByTitle` | |
| 7 | `getByTestId` | **Lối thoát cuối cùng** |

`getByRole` được ưu tiên vì nó test luôn cả accessibility: nếu không query được bằng role và tên, screen reader cũng không tìm thấy nó. **Test viết đúng cách là một bài kiểm tra a11y miễn phí.**

```jsx
await userEvent.click(screen.getByRole('button', { name: 'Xoá' }))
expect(await screen.findByText('Đã xoá')).toBeInTheDocument()
```

`userEvent` thay `fireEvent` — nó mô phỏng chuỗi sự kiện thật (pointerdown, focus, keydown…).

### Mock network ở tầng mạng

```ts
// MSW — chặn ở service worker, không mock module
export const handlers = [
  http.get('/api/posts', () => HttpResponse.json([{ id: 1 }])),
]
```

Ưu điểm so với mock `fetch`: dùng chung được cho test, Storybook, và dev; và code ứng dụng không biết là đang bị mock.

### Test cái gì trong React

| Test | Không test |
|---|---|
| Người dùng thấy gì | State nội bộ |
| Người dùng làm được gì | Tên hàm, props truyền |
| Trạng thái lỗi và rỗng | Số lần render |
| Điều kiện biên | Cài đặt cụ thể |
| Trạng thái loading | Snapshot của cả cây |

### Test Server Component

RTL chưa hỗ trợ đầy đủ RSC. Chiến lược thực tế:

| Loại | Cách test |
|---|---|
| Server Component | Tách logic ra hàm thuần → unit test; UI → E2E |
| Server Function | Gọi trực tiếp như hàm thường, mock DB |
| Client Component | RTL bình thường |
| Route | Playwright |

### E2E

```ts
test('người dùng tạo được bài viết', async ({ page }) => {
  await page.goto('/posts/new')
  await page.getByLabel('Tiêu đề').fill('Xin chào')
  await page.getByRole('button', { name: 'Đăng' }).click()
  await expect(page.getByText('Xin chào')).toBeVisible()
})
```

Chỉ viết E2E cho **luồng mất tiền nếu hỏng**: đăng ký, đăng nhập, thanh toán, tạo nội dung chính.

## 2. Nguyên tắc

1. **TypeScript strict là tầng test rẻ nhất.** Nó bắt lỗi trước khi test chạy.
2. **`getByRole` trước, `getByTestId` cuối.**
3. **Test hành vi, không test cài đặt.** Phép kiểm: refactor nội bộ mà không đổi hành vi — test có gãy không? Gãy = test sai.
4. **MSW thay vì mock `fetch`.**
5. **`userEvent` thay `fireEvent`.**
6. **`findBy*` cho nội dung bất đồng bộ**, không `waitFor` + `getBy`.
7. **E2E ít mà ổn định** hơn nhiều mà flaky. Một test flaky làm cả suite mất uy tín.
8. **Test trạng thái lỗi và rỗng** — chúng là chỗ bug thật sống.
9. **Chạy axe trong test** để bắt hồi quy a11y:
   ```ts
   expect(await axe(container)).toHaveNoViolations()
   ```
10. **Visual regression cho design system**, không cho mọi trang.

## 3. Cạm bẫy

- **Test cài đặt.** Test gọi `wrapper.state()` hay đếm số lần render gãy mỗi lần refactor và không bắt được bug nào.
- **`getByTestId` khắp nơi** → mất lợi ích a11y, và test không phản ánh cách người dùng dùng.
- **Snapshot test cả cây component.** Chúng gãy mọi lúc và không ai đọc diff — người ta chỉ `-u`.
- **Mock quá nhiều** cho tới khi test chỉ còn kiểm tra chính các mock.
- **`fireEvent.click` bỏ qua chuỗi sự kiện thật** → test pass nhưng người dùng thật gặp lỗi.
- **`waitFor` với assertion sai** → timeout 5 giây rồi báo lỗi khó hiểu.
- **E2E flaky do `waitForTimeout`** — dùng auto-waiting của Playwright, không `sleep`.
- **Test phụ thuộc thứ tự chạy** vì chia sẻ state.
- **Không test dark mode, RTL, mobile viewport** — ba chỗ hay vỡ nhất.
- **Coverage 100% làm mục tiêu.** Nó khuyến khích test vô nghĩa cho getter; coverage là chẩn đoán, không phải mục tiêu.
- **Không test được vì component quá gắn kết** — đó là phản hồi về thiết kế, không phải về testing.

## 4. Checklist áp dụng

- [ ] Test này có gãy khi refactor nội bộ không?
- [ ] Có dùng `getByRole` thay `getByTestId` không?
- [ ] Network có mock bằng MSW không?
- [ ] Trạng thái lỗi và rỗng có được test không?
- [ ] E2E chỉ phủ luồng quan trọng chứ?
- [ ] Có test nào flaky không? (sửa hoặc xoá ngay)
- [ ] Có kiểm a11y tự động trong test không?
- [ ] Test có chạy độc lập, không phụ thuộc thứ tự không?
- [ ] TypeScript có `strict: true` không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Vitest | Test runner nhanh, API như Jest | https://vitest.dev/ |
| React Testing Library | Test theo hành vi người dùng | https://testing-library.com/react |
| MSW | Mock ở tầng mạng | https://mswjs.io/ |
| Playwright | E2E đa trình duyệt, auto-waiting | https://playwright.dev/ |
| jest-axe / axe-playwright | Kiểm a11y trong test | https://github.com/nickcolley/jest-axe |
| Storybook | Tài liệu + test tương tác + visual | https://storybook.js.org/ |
| Chromatic | Visual regression | https://www.chromatic.com/ |

## Tham khảo

- Kent C. Dodds — *The Testing Trophy and Testing Classifications*: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications
- Testing Library — *Guiding Principles*: https://testing-library.com/docs/guiding-principles
- Testing Library — *About Queries (thứ tự ưu tiên)*: https://testing-library.com/docs/queries/about#priority
- Playwright — *Best Practices*: https://playwright.dev/docs/best-practices
- Next.js — *Testing*: https://nextjs.org/docs/app/guides/testing

## Liên kết

[[Frontend Tooling]] · [[Accessible Markup & ARIA]] · [[Component Library Strategy]] · [[React Mental Model]] · [[Frontend]]
