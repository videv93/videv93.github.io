---
tags: [backend, concurrency, async]
status: growing
---
# Event Loop and Async IO

> Vì sao một thread duy nhất phục vụ được hàng vạn kết nối: vì 99% thời gian của một request là **ngồi chờ**. Event loop biến thời gian chờ đó thành thời gian làm việc khác.

## 1. Cơ chế
```
        ┌────────────┐
        │ Task queue │ ← callback/promise đã sẵn sàng
        └─────┬──────┘
              ▼
     ┌──────────────────┐   đăng ký I/O    ┌──────────────┐
     │    Event Loop    │ ───────────────► │ OS: epoll /  │
     │ (1 thread duy    │ ◄─────────────── │ kqueue/IOCP  │
     │  nhất chạy code) │   báo sẵn sàng   └──────────────┘
     └──────────────────┘
```
1. Code chạy tới điểm I/O → đăng ký với OS rồi **trả quyền điều khiển** (`await` / callback).
2. Loop lấy task tiếp theo trong hàng đợi mà chạy.
3. OS báo I/O xong → callback/coroutine được đưa vào hàng đợi → chạy tiếp từ đúng chỗ dừng.

**Chỉ một mẩu code chạy tại một thời điểm.** Không có preemption giữa hai điểm `await` → không có data race trong cùng loop, nhưng cũng có nghĩa là một mẩu code chậm chặn tất cả.

## 2. Node.js — các phase trong một vòng lặp
`timers` → `pending callbacks` → `poll` (I/O) → `check` (`setImmediate`) → `close callbacks`.
Xen giữa mọi phase: **microtask queue** (`Promise.then`, `queueMicrotask`) và `process.nextTick` — chúng chạy **hết** trước khi loop đi tiếp, nên microtask vô hạn cũng làm treo server.

## 3. Python asyncio — vài điều cần nhớ
- `async def` chỉ tạo coroutine; **không chạy** cho tới khi `await` hoặc `asyncio.create_task`.
- `asyncio.gather` chạy song song *về mặt logic*; muốn giới hạn thì dùng `asyncio.Semaphore` hoặc `TaskGroup` (3.11+).
- Blocking call → `loop.run_in_executor` / `asyncio.to_thread`.
- Thư viện phải async từ đầu tới cuối: `httpx`/`aiohttp` thay `requests`, `asyncpg` thay `psycopg2` sync. → [[Python GIL and Asyncio]]

## 4. Function coloring — chi phí ẩn của async
Hàm `async` chỉ gọi được từ hàm `async`. Một lời gọi sync nằm giữa chuỗi async sẽ "nhuộm" ngược cả nhánh, hoặc tệ hơn: âm thầm chặn loop. Đây là lý do Go/Rails không có vấn đề này (goroutine/thread đều blocking-look-like), còn Node/Python thì có.

## 5. Cạm bẫy
- **Blocking trong loop**: vòng lặp lớn, `JSON.parse` file 100MB, crypto sync, regex ReDoS, `time.sleep`.
- **Fire-and-forget task**: task không được giữ tham chiếu (Python) có thể bị GC thu; exception trong đó bị nuốt im lặng.
- **Không giới hạn fan-out**: `Promise.all` / `gather` trên hàng nghìn item → sập upstream.
- **Nhầm concurrency với parallelism**: async **không** giúp gì cho CPU-bound.
- **Xử lý lỗi bị bỏ sót**: một promise reject không bắt → crash process (Node hiện đại).
- **Đo sai**: benchmark bằng vòng lặp sync sẽ cho kết luận ngược.

## 6. Checklist
- [ ] Mọi thư viện I/O trong đường async đều là bản async?
- [ ] Có đoạn code nào chạy > 10ms đồng bộ trong request path không? (đo bằng profiler)
- [ ] Fan-out có semaphore/`p-limit` giới hạn không?
- [ ] Task nền có được giữ tham chiếu và có handler lỗi không?
- [ ] Có timeout bao quanh mọi `await` gọi ra ngoài? → [[Resilience Patterns]]
- [ ] Có theo dõi **event loop lag** như một metric không? → [[Observability]]

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| `clinic.js` | Chẩn đoán blocking trong Node | https://clinicjs.org/ |
| `perf_hooks.monitorEventLoopDelay` | Đo event loop lag (Node) | https://nodejs.org/api/perf_hooks.html |
| `asyncio` debug mode (`PYTHONASYNCIODEBUG=1`) | Cảnh báo coroutine chạy quá lâu | https://docs.python.org/3/library/asyncio-dev.html |
| `py-spy` | Profile Python đang chạy, không cần sửa code | https://github.com/benfred/py-spy |

## Tham khảo
- Node.js — Event Loop, Timers, and nextTick: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
- Node.js — Don't Block the Event Loop: https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop
- Python asyncio docs: https://docs.python.org/3/library/asyncio.html
- Bob Nystrom — *What Color is Your Function?*: https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/
- Tokio tutorial — Async in depth: https://tokio.rs/tokio/tutorial/async

## Liên kết
[[Concurrency Models]] · [[Nodejs and TypeScript Backend]] · [[Python GIL and Asyncio]] · [[Backend]]
