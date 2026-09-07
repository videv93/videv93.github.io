---
tags: [backend, concurrency, python]
status: growing
---
# Python GIL and Asyncio

> **GIL (Global Interpreter Lock)** là một khoá toàn cục cho phép **chỉ một thread thực thi bytecode Python tại một thời điểm**. Hệ quả: multi-threading không tối ưu cho tác vụ CPU-bound — và mọi quyết định concurrency trong Python đều xoay quanh sự thật này.

## 1. GIL làm gì và không làm gì
| Tình huống | GIL có chặn không? |
|---|---|
| 4 thread tính toán số học | ✅ Chặn — chạy tuần tự, thêm cả chi phí chuyển ngữ cảnh |
| 4 thread chờ HTTP/DB | ❌ Không — GIL được nhả khi chờ I/O |
| NumPy/Pandas làm phép trên mảng lớn | ❌ Phần lớn không — C extension nhả GIL |
| 4 process tính toán | ❌ Không — mỗi process có GIL riêng |

Vì sao GIL tồn tại: đơn giản hoá quản lý bộ nhớ (reference counting) và làm C extension dễ viết. Python 3.13 có bản **free-threaded** (PEP 703, tuỳ chọn) — đáng theo dõi nhưng chưa phải mặc định production.

## 2. Chọn công cụ theo loại tải
| Tải | Công cụ | Ghi chú |
|---|---|---|
| I/O-bound, rất nhiều kết nối | `asyncio` | Rẻ nhất, nhưng phải async toàn tuyến |
| I/O-bound, thư viện chỉ có bản sync | `ThreadPoolExecutor` / `asyncio.to_thread` | GIL nhả khi chờ I/O nên vẫn hiệu quả |
| CPU-bound, cùng máy | `ProcessPoolExecutor` / `multiprocessing` | Chi phí serialize dữ liệu qua pickle |
| CPU-bound, nặng và thường xuyên | C/Cython/**Rust (PyO3)** extension, hoặc NumPy vector hoá | Nhả GIL trong phần native |
| CPU-bound, tách được khỏi request | Đẩy sang **Celery worker** riêng | → [[Background Jobs and Queues]] |
| CPU-bound, khối lượng lớn kéo dài | Viết service riêng bằng Go/Rust | → [[Choosing a Backend Language]] |

## 3. Mẫu asyncio hay dùng
```python
import asyncio, httpx

async def fetch_all(urls, limit=10):
    sem = asyncio.Semaphore(limit)                  # giới hạn fan-out
    async with httpx.AsyncClient(timeout=5) as c:   # client dùng lại + timeout
        async def one(u):
            async with sem:
                r = await c.get(u)
                return r.json()
        async with asyncio.TaskGroup() as tg:       # 3.11+: lỗi con làm huỷ cả nhóm
            tasks = [tg.create_task(one(u)) for u in urls]
    return [t.result() for t in tasks]
```
Ba thứ đáng chú ý: **semaphore** (backpressure), **timeout**, **TaskGroup** (huỷ có cấu trúc).

## 4. Cạm bẫy
- **Blocking call trong `async def`** — `requests`, `time.sleep`, `psycopg2` sync, đọc file bằng `open()`. Toàn bộ event loop đứng. → [[Event Loop and Async IO]]
- **Dùng thread để tăng tốc CPU** — GIL biến nó thành chậm hơn cả code tuần tự.
- **`multiprocessing` với dữ liệu lớn** — chi phí pickle có thể lớn hơn phần tính toán.
- **`asyncio.create_task` không giữ tham chiếu** — task có thể bị GC dọn giữa chừng; giữ trong một `set`.
- **Nuốt exception** — task lỗi mà không ai `await` thì chỉ thấy warning lúc thoát.
- **Trộn async với ORM sync** (Django ORM cổ điển trong async view) → `SynchronousOnlyOperation` hoặc chặn loop.
- **Đo bằng `time.sleep` trong test async** — kết quả benchmark sai hoàn toàn.

## 5. Checklist
- [ ] Đã phân loại từng endpoint là I/O-bound hay CPU-bound chưa?
- [ ] Driver DB, HTTP client, file I/O trong đường async đều là bản async?
- [ ] Fan-out có `Semaphore` giới hạn không?
- [ ] Mọi lời gọi ra ngoài có timeout không?
- [ ] Số process worker khớp số core; số thread khớp pool DB?
- [ ] Có bật `PYTHONASYNCIODEBUG=1` ở staging để bắt coroutine chạy quá lâu chưa?
- [ ] Việc nặng đã ra khỏi request path (Celery/RQ) chưa?

## Tham khảo
- Python docs — `asyncio`: https://docs.python.org/3/library/asyncio.html
- Python Wiki — Global Interpreter Lock: https://wiki.python.org/moin/GlobalInterpreterLock
- PEP 703 — Making the GIL Optional: https://peps.python.org/pep-0703/
- Python docs — `concurrent.futures`: https://docs.python.org/3/library/concurrent.futures.html
- David Beazley — *Understanding the Python GIL*: https://www.dabeaz.com/GIL/
- `py-spy` profiler: https://github.com/benfred/py-spy

## Liên kết
[[Python Backend]] · [[Concurrency Models]] · [[Event Loop and Async IO]] · [[Backend]]
