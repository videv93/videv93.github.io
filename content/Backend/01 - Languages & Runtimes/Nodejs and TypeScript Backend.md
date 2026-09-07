---
tags: [backend, language, javascript, typescript, nodejs]
status: growing
---
# Node.js and TypeScript Backend

> Chạy trên **V8 Engine**: single-threaded, event-driven, non-blocking I/O. Lợi thế lớn nhất không phải tốc độ, mà là **dùng chung một ngôn ngữ và một bộ type với frontend**.

## 1. Express vs NestJS
| | **Express.js** | **NestJS** |
|---|---|---|
| Triết lý | Tối giản, linh hoạt, cộng đồng khổng lồ | **Kiến trúc chuẩn Enterprise** |
| Cấu trúc | Bạn tự quyết (dễ thành mỗi project một kiểu) | Modules / Controllers / Providers áp đặt sẵn |
| DI | Không | **Dependency Injection mạnh mẽ** (lấy cảm hứng từ Angular) |
| TypeScript | Tuỳ chọn | Mặc định, decorator-first |
| Hợp với | Service nhỏ, prototype, middleware layer | Team lớn, codebase sống lâu |
| Cạm bẫy | Không có chuẩn → mỗi người một cách | Nhiều boilerplate, cần hiểu DI |

Các lựa chọn khác: **Fastify** (nhanh hơn Express, schema-based validation — NestJS chạy được trên Fastify adapter), **Hono** (edge/serverless).

## 2. Concurrency: Event Loop
- Xử lý I/O bất đồng bộ **cực kỳ mượt qua Event Loop mà không cần spawn nhiều thread**.
- Với tác vụ nặng CPU: dùng **Worker Threads**, hoặc tách service sang ngôn ngữ khác (Go/Rust).
- Scale ngang trên nhiều core: `cluster`, PM2, hoặc đơn giản là chạy N container. → [[Scaling and Load Balancing]]
- Cơ chế phase-by-phase của event loop: → [[Event Loop and Async IO]]

> **Một hàm đồng bộ nặng chặn *toàn bộ* server**, không chỉ request của nó. Đây là khác biệt lớn nhất so với mô hình thread-per-request của Rails/Django.

## 3. TypeScript ở backend — dùng cho đúng
- **Type là hợp đồng ở compile-time, không phải validation ở runtime.** Dữ liệu từ HTTP body, env, DB phải được **parse** chứ không được `as`.
- Dùng **Zod** (hoặc `class-validator` trong NestJS) để validate ở biên, rồi suy ra type từ schema — một nguồn sự thật.
- Bật `strict: true`. TS không strict gần như vô nghĩa.
- Chia sẻ type với frontend qua package nội bộ hoặc sinh từ OpenAPI. → [[API Versioning and Contracts]]

## 4. Bộ công cụ
| Việc | Lựa chọn | Ghi chú |
|---|---|---|
| Runtime | Node LTS (Bun/Deno nếu chấp nhận rủi ro) | |
| Package manager | pnpm | Nhanh, tiết kiệm đĩa |
| Validation | Zod | Suy type từ schema |
| ORM | Prisma / Drizzle / TypeORM | → [[Database Access and ORM]] |
| Queue | BullMQ (Redis) | → [[Background Jobs and Queues]] |
| Test | Vitest / Jest + Supertest | → [[Testing Backend]] |
| Lint/format | ESLint + Prettier (hoặc Biome) | |
| Log | Pino | JSON log, nhanh → [[Observability]] |

## 5. Cạm bẫy
- **Chặn event loop**: `JSON.parse` file lớn, vòng lặp lớn, `bcrypt` sync, regex catastrophic backtracking (ReDoS).
- **Unhandled promise rejection** → process chết trong Node hiện đại. Luôn `try/catch` trong async handler hoặc dùng wrapper.
- **Không giới hạn concurrency khi fan-out**: `Promise.all` trên 10.000 item sẽ giết cả bạn lẫn upstream. Dùng `p-limit`.
- **`as any` để "cho nó chạy"** — hỏng đúng chỗ mà type đáng lẽ cứu bạn.
- **Nhầm CommonJS/ESM** — `require` vs `import`, `__dirname` thiếu trong ESM.
- **Phụ thuộc chuỗi npm dài** — bề mặt tấn công supply chain lớn. → [[Backend Security]]

## 6. Checklist
- [ ] `strict: true` trong `tsconfig.json`?
- [ ] Mọi input ngoài (body, query, env) đều đi qua schema validation?
- [ ] Có chỗ nào chạy CPU > 50ms đồng bộ trong request path không?
- [ ] Graceful shutdown (`SIGTERM` → ngừng nhận request → đóng pool) đã có chưa?
- [ ] Log dạng JSON, có request ID?
- [ ] `npm audit` / Dependabot bật trong CI?
- [ ] Fan-out có giới hạn concurrency không?

## Tham khảo
- Node.js docs — Event Loop: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
- NestJS docs: https://docs.nestjs.com/
- Express docs: https://expressjs.com/
- Zod: https://zod.dev/
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- Node.js Worker Threads: https://nodejs.org/api/worker_threads.html

## Liên kết
[[Event Loop and Async IO]] · [[Choosing a Backend Language]] · [[Concurrency Models]] · [[Backend]]
