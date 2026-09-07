---
tags: [backend, concurrency]
status: growing
---
# Concurrency Models

> **Concurrency là cấu trúc, parallelism là thực thi.** Concurrency = xử lý nhiều việc *đan xen*; parallelism = chạy nhiều việc *cùng lúc* trên nhiều core. Chọn sai mô hình cho đúng loại tải là nguồn gốc của hầu hết vấn đề throughput.

## 1. Câu hỏi đầu tiên: I/O-bound hay CPU-bound?
| | **I/O-bound** | **CPU-bound** |
|---|---|---|
| Thời gian đi đâu | Chờ DB, API, đĩa, mạng | Tính toán, nén, mã hoá, parse lớn |
| Cần gì | **Concurrency** — nhiều việc chờ cùng lúc | **Parallelism** — nhiều core |
| Công cụ đúng | async/event loop, thread, goroutine | process, worker thread, core khác, ngôn ngữ khác |
| Sai lầm | Dùng process nặng nề cho việc chỉ ngồi chờ | Dùng thread trong Python/Ruby (GIL/GVL chặn) |

Phần lớn backend là **I/O-bound** — đó là lý do Node và asyncio đủ nhanh dù single-threaded.

## 2. Bốn mô hình chính
| Mô hình | Cách hoạt động | Chi phí mỗi đơn vị | Ngôn ngữ tiêu biểu |
|---|---|---|---|
| **Process** | Không gian nhớ riêng, OS lập lịch | Rất nặng (MB) | Gunicorn worker, Puma cluster, `multiprocessing` |
| **Thread** | Chung bộ nhớ, OS lập lịch | Nặng (~1MB stack) | Puma thread, Java, `ThreadPoolExecutor` |
| **Event loop / coroutine** | Một thread, chuyển việc tại điểm `await` | Rất rẻ (KB) | Node.js, `asyncio`, Tokio → [[Event Loop and Async IO]] |
| **Green thread (M:N)** | Runtime tự lập lịch nhiều "thread nhẹ" lên ít thread OS | Rẻ (~2–8KB) | **Goroutine** → [[Goroutines and Channels]] |

Mô hình thứ năm ít gặp hơn: **Actor** (Erlang/Elixir, Akka) — mỗi actor có state riêng, giao tiếp bằng message; là nền của khả năng chịu lỗi kiểu "let it crash".

## 3. Bản đồ 5 ngôn ngữ
| Ngôn ngữ | Mô hình mặc định | Cách đạt parallelism thật |
|---|---|---|
| Python | `asyncio` (I/O); thread bị **GIL** chặn | `multiprocessing`, nhiều worker, C/Rust ext → [[Python GIL and Asyncio]] |
| Ruby | Thread (bị GVL chặn) qua Puma | Puma **cluster** (nhiều process), Sidekiq → [[Ruby on Rails]] |
| Node.js | Event Loop, single-thread | `cluster`, Worker Threads, nhiều container → [[Nodejs and TypeScript Backend]] |
| Go | **Goroutine + Channel** (M:N) | Sẵn có: runtime trải goroutine lên mọi core |
| Rust | `async` + Tokio (work-stealing) | Sẵn có; borrow checker chặn data race lúc compile → [[Rust Backend]] |

## 4. Hai trường phái chia sẻ dữ liệu
1. **Shared memory + lock** (mutex, semaphore, atomic) — nhanh nhưng dễ deadlock, race, và rất khó test.
2. **Message passing** — CSP (Go channel), actor, queue. Triết lý Go:
   > *"Do not communicate by sharing memory; instead, share memory by communicating."*

Nguyên tắc thực hành: **ưu tiên message passing**; chỉ dùng lock khi phạm vi nhỏ và đo được lợi ích.

## 5. Cạm bẫy chung mọi ngôn ngữ
- **Race condition** — hai luồng đọc-sửa-ghi cùng một chỗ. Bắt bằng `go test -race`, TSan; hoặc đẩy tính nhất quán xuống DB (transaction, `SELECT ... FOR UPDATE`, atomic increment).
- **Deadlock** — luôn khoá theo **cùng một thứ tự**, và luôn có timeout khi lấy khoá.
- **Không giới hạn concurrency** — spawn 10.000 goroutine/promise bắn vào DB có pool 20 → hàng đợi ngầm và timeout dây chuyền. Dùng **semaphore/worker pool**.
- **Chặn luồng chính** — bất kỳ lời gọi blocking nào trong event loop giết throughput của *toàn bộ* process.
- **Thứ tự không đảm bảo** — code concurrency đúng khi chạy 10 lần vẫn có thể sai ở lần thứ 10.000.
- **Bỏ qua backpressure** — nhận nhanh hơn xử lý thì hàng đợi phình tới khi hết RAM. → [[Resilience Patterns]]

## 6. Checklist thiết kế phần concurrency
- [ ] Đã xác định tải là I/O-bound hay CPU-bound bằng **đo đạc** chưa?
- [ ] Mức concurrency tối đa có bị chặn trên (pool/semaphore) không?
- [ ] Con số concurrency có khớp với giới hạn của downstream (pool DB, rate limit API) không?
- [ ] Mọi việc chạy nền đều có **timeout** và **đường huỷ** (context/AbortSignal)?
- [ ] Có state chia sẻ nào không được bảo vệ không? Có thể loại bỏ nó thay vì khoá nó không?
- [ ] Có backpressure khi upstream nhanh hơn downstream không?
- [ ] Test có chạy với race detector không?

## Tham khảo
- Rob Pike — *Concurrency is not Parallelism*: https://go.dev/blog/waza-talk
- Go Blog — *Go Concurrency Patterns: Pipelines*: https://go.dev/blog/pipelines
- Python `asyncio` — Developing with asyncio: https://docs.python.org/3/library/asyncio-dev.html
- Tokio — *Async in depth*: https://tokio.rs/tokio/tutorial/async
- *The Little Book of Semaphores* — Allen Downey: https://greenteapress.com/wp/semaphores/
- *Designing Data-Intensive Applications*, ch.7 (Transactions): https://dataintensive.net/

## Liên kết
[[Event Loop and Async IO]] · [[Goroutines and Channels]] · [[Python GIL and Asyncio]] · [[Background Jobs and Queues]] · [[Backend]]
