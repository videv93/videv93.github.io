---
tags: [frontend, react, rsc]
status: evergreen
---
# React Server Functions

> Một hàm bạn gọi từ component nhưng nó **chạy trên server**. Về mặt trải nghiệm là một RPC có kiểu; về mặt an ninh, nó là một **endpoint HTTP công khai** — và quên điều thứ hai là lỗ hổng nghiêm trọng nhất trong mô hình này.

> [!note] Ghi chú nguồn
> Seed ghi: *"Server Functions là một tính năng React nữa được bật trong Next.js mà tôi muốn nhắc tới, vì chúng cho bạn khả năng thực thi code server-side từ component React chỉ bằng cách gọi một hàm. Nó hành xử như một remote procedure call (RPC) có kiểu, nhưng bên dưới có một API endpoint được tạo ra cho bạn."*
>
> Và về Server Actions: *"Có vài thư viện thêm một lớp trừu tượng để dùng chúng thân thiện hơn. Cá nhân tôi chưa thấy cần dùng, vì bạn có thể tự cài đặt lớp trừu tượng riêng chỉ với vài dòng code. Tuy nhiên nếu muốn giải pháp có sẵn, xem next-safe-actions hoặc zsa."*

## 1. Khái niệm cốt lõi

### Cú pháp

```ts
'use server'                                    // cả file là server function

export async function createPost(formData: FormData) {
  const session = await auth()                  // ⚠️ BẮT BUỘC
  if (!session) throw new Error('Unauthorized')

  const parsed = schema.parse({                 // ⚠️ BẮT BUỘC
    title: formData.get('title'),
  })

  await db.post.create({ data: { ...parsed, userId: session.user.id } })
  revalidatePath('/posts')
}
```

Dùng trực tiếp trong form — **hoạt động cả khi JavaScript chưa tải xong**:

```jsx
<form action={createPost}>
  <input name="title" />
  <button>Tạo</button>
</form>
```

Đây là điểm mạnh thật sự: progressive enhancement miễn phí. Xem [[HTML Forms & Validation]].

### `"use server"` ≠ `"use client"`

| Directive | Nghĩa |
|---|---|
| `"use client"` | Đánh dấu ranh giới — code này đi **xuống client** |
| `"use server"` | Đánh dấu hàm này **chỉ chạy trên server**, và **phơi bày một endpoint** |

Hai directive không đối xứng. `"use server"` **không** biến file thành Server Component.

> [!warning] Mỗi Server Function là một endpoint HTTP công khai
> Bên dưới, `"use server"` tạo một route mà **bất kỳ ai cũng gọi được** bằng `curl`, với bất kỳ payload nào. Việc nó chỉ được gọi từ một nút mà người dùng phải đăng nhập mới thấy **không bảo vệ gì cả**.
>
> Nghĩa là: **mọi Server Function phải tự kiểm tra xác thực và phân quyền, và tự validate mọi input** — như một API route thật. Không có ngoại lệ.

### Server Actions

Server Action là **tập con** của Server Function: những cái được dùng làm `action` của form hoặc trong transition.

`useActionState` để lấy kết quả, pending và lỗi:

```jsx
'use client'
const [state, action, pending] = useActionState(createPost, { error: null })
return (
  <form action={action}>
    <input name="title" />
    {state.error && <p role="alert">{state.error}</p>}
    <button disabled={pending}>Tạo</button>
  </form>
)
```

`useFormStatus` để component con biết form cha đang submit; `useOptimistic` để cập nhật UI trước khi server trả lời.

### Revalidation

| Hàm | Làm gì |
|---|---|
| `revalidatePath('/posts')` | Xoá cache một đường dẫn |
| `revalidateTag('posts')` | Xoá cache mọi fetch gắn tag đó |
| `redirect('/posts/1')` | Điều hướng sau khi xong |

Xem [[Next.js Caching Layers]].

### Lớp trừu tượng

Seed nói đúng: một wrapper tự viết chỉ vài dòng.

```ts
export function action<S extends ZodSchema>(schema: S, fn) {
  return async (prev, formData: FormData) => {
    const session = await auth()
    if (!session) return { error: 'Chưa đăng nhập' }
    const parsed = schema.safeParse(Object.fromEntries(formData))
    if (!parsed.success) return { error: parsed.error.issues[0].message }
    try { return await fn(parsed.data, session) }
    catch (e) { return { error: 'Có lỗi xảy ra' } }
  }
}
```

Wrapper này đưa ba việc bắt buộc — auth, validate, bắt lỗi — vào một chỗ, nên không thể quên. Nếu không muốn tự viết: `next-safe-action`, `zsa`.

## 2. Nguyên tắc

1. **Kiểm tra auth trong **mỗi** Server Function.** Không tin gọi từ đâu.
2. **Validate mọi input bằng schema.** Zod ở biên server — đúng như lựa chọn trong seed.
3. **Dùng một wrapper dùng chung** để không quên hai điều trên.
4. **Trả về lỗi, đừng throw** cho lỗi nghiệp vụ — throw để lộ stack trace và không hiển thị đẹp được.
5. **Revalidate sau mọi mutation.**
6. **`useOptimistic` cho tương tác cần phản hồi tức thì** (like, toggle).
7. **Không đặt Server Function trong file có `"use client"`** — tách file riêng.
8. **Rate limit** những action tốn kém hoặc gửi email.
9. **Chỉ trả về dữ liệu serialize được.**

## 3. Cạm bẫy

- **Không kiểm auth.** Callout mục 1 — đây là lỗ hổng phổ biến nhất khi mới dùng Server Actions.
- **Chỉ validate ở client.** `curl` bỏ qua toàn bộ form của bạn.
- **IDOR:** nhận `postId` rồi xoá mà không kiểm post đó có thuộc về người gọi không.
- **Throw lỗi thật cho người dùng** → lộ chi tiết nội bộ.
- **Quên revalidate** → UI hiện dữ liệu cũ sau khi sửa.
- **Truyền hàm hoặc class instance** qua ranh giới → lỗi serialize.
- **Dùng Server Action cho việc đọc.** Chúng chạy **tuần tự** và là POST; đọc dữ liệu nên làm trong Server Component.
- **Gọi từ event handler mà không có `startTransition`** → mất pending state.
- **Server Action trong vòng lặp** — mỗi lần là một round-trip.
- **Không rate limit** action gửi email hoặc gọi API tính phí.
- **`redirect()` trong `try/catch`** — nó hoạt động bằng cách throw, nên `catch` sẽ nuốt mất.

## 4. Checklist áp dụng

- [ ] Có kiểm tra session không?
- [ ] Có kiểm tra người dùng **sở hữu** tài nguyên này không?
- [ ] Input có được validate bằng schema ở server không?
- [ ] Có wrapper chung để không quên auth/validate không?
- [ ] Có revalidate sau mutation không?
- [ ] Lỗi trả về có an toàn để hiển thị không?
- [ ] Đây là mutation hay là đọc? (đọc → Server Component)
- [ ] Action tốn kém có rate limit chưa?
- [ ] Form còn hoạt động khi tắt JavaScript không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Zod | Schema validation | https://zod.dev/ |
| next-safe-action | Wrapper có kiểu cho Server Action | https://next-safe-action.dev/ |
| zsa | Wrapper thay thế | https://zsa.vercel.app/ |
| Upstash Ratelimit | Rate limit ở edge | https://github.com/upstash/ratelimit |

## Tham khảo

- React — *Server Functions*: https://react.dev/reference/rsc/server-functions
- Next.js — *Server Actions and Mutations*: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- React — *`useActionState`*: https://react.dev/reference/react/useActionState
- Next.js — *Security thinking about Server Actions*: https://nextjs.org/blog/security-nextjs-server-components-actions
- OWASP — *Authorization Cheat Sheet*: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

## Liên kết

[[React Server Components]] · [[HTML Forms & Validation]] · [[Next.js Caching Layers]] · [[Next.js Data Fetching]] · [[Frontend]]
