---
tags: [frontend, stack]
status: growing
---
# Frontend Tech Stack 2025

> ⚠️ **Đọc [[Framework Churn vs Platform Longevity]] trước khi áp dụng note này.** Đây là một bản ghi có ngày hết hạn, không phải một khuyến nghị vĩnh cửu.

> [!note] Ghi chú nguồn
> Note này ghi lại **nguyên vẹn** 25 lựa chọn công nghệ trong `React Tech Stack 2025.md` (Robin Wieruch, xuất bản **2024-12-10**), kèm cột đánh giá lại. Nguyên tắc 2 của [[Knowledge Seed Playbook]]: không vứt gì của seed đi. Nhưng nguyên tắc 7 cũng áp dụng — nên mỗi mục có thêm ghi chú về độ bền.
>
> Bối cảnh tác giả tự khai: đã làm freelance nhiều năm và là solo founder; đã xây một SaaS **có lãi** trong gần một năm; **đánh giá lại stack mỗi năm**; và đã viết một khoá học full-stack (*The Road to Next*) trong suốt 2024 mà stack này phản ánh. Tác giả nói rõ: *"Tôi thích tech stack đã chọn hồi đó, nhưng tôi sẽ chọn một stack khác nếu bắt đầu dự án mới hôm nay."*

## 1. Danh sách gốc — 25 lựa chọn

### Framework & render

| Lựa chọn | Lý do trong seed | Độ bền |
|---|---|---|
| **Next.js** | Framework trên React; nhiều tính năng sẵn có (routing, caching), **nhiều chiến lược render trong cùng một app**, và mọi tính năng React mới | 🟢 Mô hình bền, API đổi thường xuyên — [[Next.js App Router]] |
| **Astro** *(optional)* | Cho landing page nếu không dùng Next làm monolith. Dẫn tới subdomain (`app.example.com`) nhưng cho landing page nhanh và DX tốt | 🟡 Tuỳ chọn, không ràng buộc |
| **Server Components** | Không có ở mọi framework React nhưng có ở Next. **Thay đổi cách xây app full-stack React**; cho phép component chạy trên server, truy cập được database | 🟢 Đã vào React core — [[React Server Components]] |
| **Server Functions** | Thực thi code server từ component React chỉ bằng gọi hàm; như **RPC có kiểu**, bên dưới có API endpoint được tạo tự động | 🟢 Đã vào React core — [[React Server Functions]] |
| **Server Actions** | Tập con của Server Functions. Có thư viện thêm lớp trừu tượng; tác giả **chưa thấy cần** vì tự viết được bằng vài dòng. Nếu muốn sẵn: `next-safe-action`, `zsa` | 🟢 |

### Style & UI

| Lựa chọn | Lý do trong seed | Độ bền |
|---|---|---|
| **Tailwind CSS** | Vẫn chia rẽ cộng đồng, nhưng là lựa chọn tốt nhất cho phát triển nhanh và bảo trì CSS lâu dài. Quen sau một tuần thì khó quay lại | 🟡 Đang thịnh; ⚠️ [[Utility-First vs Cascade]] |
| **Shadcn UI** | **UI library đến rồi đi**, nhưng Shadcn hot hơn một năm. Hợp với Tailwind, cách tiếp cận **versionless** mới mẻ. Tốt *cho hiện tại*, tới khi có thứ lớn tiếp theo hoặc mọi thứ trông giống nhau quá | 🟡 Tác giả tự đặt hạn — [[Component Library Strategy]] |
| **Lucide React** | Đã đi kèm Shadcn UI nên không cần thay. **Không có buy-in lớn** với nó | 🟢 Chi phí thoát thấp |

### Ngôn ngữ & dữ liệu

| Lựa chọn | Lý do trong seed | Độ bền |
|---|---|---|
| **TypeScript** | Không có nhiều để bàn. **Tiêu chuẩn ngành**; DX tốt hơn, ít bug hơn, dễ bảo trì hơn | 🟢 Bền nhất trong danh sách — [[Frontend Tooling]] |
| **Zod** | Tiêu chuẩn validation trong dự án React vì hợp với TypeScript. Tác giả **chỉ dùng cho validation phía server**, giữ form client nhẹ bằng native HTML validation → không cần thư viện form bên thứ ba | 🟢 — [[HTML Forms & Validation]] |
| **nuqs** | Giải pháp mặc định cho **URL state có kiểu** (search, sort, pagination) trong Next. Framework khác có thể có sẵn hoặc cần thư viện khác. **Quan trọng là phải có một giải pháp cho URL state** | 🟢 Nguyên tắc bền, thư viện thì không — [[Frontend State Management]] |
| **Zustand** *(optional)* | Cho client-side state. Nhưng tác giả **hiếm khi dùng client state** ngày nay, vì URL state, client-side caching (React Query) và app server-driven (Server Components) đã giảm nhu cầu | 🟡 Optional theo chính seed |
| **React Query** *(optional)* | Cho data fetching client khi cần trường hợp phức tạp (**infinite scrolling**). Khi độ phức tạp thấp, **chỉ dùng Server Components** | 🟢 — [[Frontend State Management]] |

### Backend & hạ tầng

| Lựa chọn | Lý do trong seed | Độ bền |
|---|---|---|
| **Prisma** (ORM) | Luôn là ORM lựa chọn. Có thể thay bằng Drizzle theo trend, nhưng giữ Prisma vì **ổn định và đã dùng nhiều nơi** | 🟡 Xem [[Database]] |
| **Supabase** (Database) | Database-as-a-service; cho Postgres và nhiều thứ khác. **Chỉ dùng database của họ**, tránh buy-in các tính năng khác để giữ linh hoạt — kết nối bằng Prisma, thay bằng Neon lúc nào cũng được | 🟢 Chiến lược tránh buy-in đáng học |
| **Lucia** (Auth) | Dùng Lucia **dù nó đã deprecated** với tư cách thư viện — nó vẫn là **tài nguyên học** dạy khái niệm nền của authentication với Oslo, Argon2, và Arctic. Kết quả là hệ thống auth tự viết, không buy-in vào Clerk hay Kinde | 🔴 **Đã deprecated ngay lúc bài viết ra** |
| **S3** (File upload) | Tự dựng bằng AWS S3 + presigned URL + IAM không khó, và cho phép lưu file rẻ nhất. Không khuyến nghị bên thứ ba — đây là **"làm một lần rồi quên"**. Hầu hết dịch vụ dùng cùng API nên đổi được sau | 🟢 API S3 là chuẩn thực tế |
| **Inngest** (Queue) | Cho dự án cần orchestration tác vụ phức tạp hơn. Dùng cho việc **không gấp về thời gian**, chạy nền. Dễ setup và bảo trì | 🟡 |
| **React Email + Resend** | React Email để tạo template bằng component; Resend để gửi. Trước dùng **Postmark** (cũng dùng được React Email) nhưng hài lòng khi chuyển sang Resend | 🟡 |

### Vận hành

| Lựa chọn | Lý do trong seed | Độ bền |
|---|---|---|
| **Vercel** (Hosting) | Dùng nhiều năm — hồi đó tên Zeit, dịch vụ tên Now. Giải pháp tốt cho app full-stack, **nhưng hiểu vì sao nhiều người ngần ngại**. Self-host thì Hetzner/DigitalOcean + Coolify | 🟡 — [[Frontend Deployment]] |
| **CloudFlare** (Domain) | Đã dùng nhiều nhà cung cấp; hài lòng với CloudFlare — UI tốt, **gắn được thông tin bổ sung vào DNS record** để dễ theo dõi dịch vụ | 🟢 |
| **Stripe** (Payment) | **Không có khuyến nghị cứng**. Dùng nhiều năm và hài lòng. Nhưng hiểu vì sao nhiều người ngần ngại — tài liệu và API tốt, nhưng **bề mặt API và tính năng ngày càng lớn**, dễ ngợp | 🟡 |

### Testing & tooling

| Lựa chọn | Lý do trong seed | Độ bền |
|---|---|---|
| **React Testing Library + Cypress/Playwright** | Không có khuyến nghị cứng. Hỗn hợp này là lựa chọn tốt ngày nay | 🟢 — [[Frontend Testing Strategy]] |
| **ESLint (có thể Biome trong tương lai) + Prettier** | Khuyến nghị cho tooling | 🟡 Tác giả tự đặt hạn |
| **Storybook** | Vẫn là lựa chọn cho tài liệu UI, **dù mong có giải pháp thay thế tốt hơn** | 🟡 |
| **tsx** | Thực thi TypeScript từ terminal (ví dụ seed database) | 🟢 |

## 2. Đọc danh sách này thế nào

1. **Đọc cột "Lý do" trước cột "Lựa chọn".** Lý do bền hơn lựa chọn. *"Phải có một giải pháp cho URL state"* còn đúng rất lâu sau khi nuqs không còn.

2. **Chú ý các chữ *optional*.** Seed đánh dấu rõ Astro, Zustand, React Query là tuỳ chọn, và nói *"tôi hiếm khi dùng client state"*. Danh sách thực sự bắt buộc ngắn hơn 25 nhiều.

3. **Chú ý các chiến lược tránh buy-in.** Ba mục dạy cùng một bài học: chỉ dùng database của Supabase; tự dựng S3 vì API là chuẩn chung; dùng Lucia như tài liệu học thay vì như dependency. Đây là phần **có giá trị dài hạn nhất** của bài viết — nó không nói dùng gì, nó nói **cách giữ đường thoát**.

4. **Lucia là ví dụ sống về chu kỳ bán rã.** Nó đã deprecated **tại thời điểm** được khuyến nghị. Đọc kỹ thì tác giả trung thực về điều đó và chuyển nó thành khuyến nghị *học*, không phải khuyến nghị *dùng* — nhưng ai đọc lướt sẽ cài nó.

5. **Kiểm chứng lại trước khi dùng.** Xem mục 6 của [[Framework Churn vs Platform Longevity]].

## 3. Checklist khi áp dụng một stack

- [ ] Bài viết này viết ngày nào? Bao lâu rồi?
- [ ] Mỗi thư viện còn được bảo trì không? Commit gần nhất bao giờ?
- [ ] Mục nào là *optional* mà tôi đang coi là bắt buộc?
- [ ] Gỡ mỗi thứ này ra tốn bao lâu?
- [ ] Tác giả có xung đột lợi ích nào không? (không làm lời khuyên sai, nhưng giải thích chỗ thiếu)
- [ ] Tôi hiểu **lý do** đằng sau, hay chỉ chép **lựa chọn**?
- [ ] Dự án của tôi có cùng ràng buộc với dự án của tác giả không (solo founder, SaaS, có lãi)?
- [ ] Tôi có đang thêm 25 dependency cho một dự án cần 8 không?

## Tham khảo

- Robin Wieruch — *React Tech Stack [2025]*: https://www.robinwieruch.de/react-tech-stack/
- *The Road to Next* (khoá học tác giả nhắc tới): https://www.road-to-next.com/
- Lucia — *tài nguyên học về authentication*: https://lucia-auth.com/
- Inngest: https://www.inngest.com/
- Coolify (self-host): https://coolify.io/
- `_archive-seed/React Tech Stack 2025.md` — bản gốc đầy đủ trong vault này

## Liên kết

[[Framework Churn vs Platform Longevity]] · [[Frontend Learning Path]] · [[Frontend Learning Resources]] · [[Component Library Strategy]] · [[Frontend Deployment]] · [[Frontend]]
