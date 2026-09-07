---
tags: [backend, language, python]
status: growing
---
# Python Backend

> Ngôn ngữ thông dịch, cú pháp sạch, **tốc độ phát triển cực nhanh**. Đổi lại: chậm với CPU-bound và bị GIL ràng buộc. Chọn Python khi giá trị nằm ở hệ sinh thái (data/ML) và tốc độ ra sản phẩm, không phải ở throughput thô.

## 1. FastAPI vs Django — chọn cái nào
| | **FastAPI** | **Django** |
|---|---|---|
| Triết lý | Micro, ghép thư viện theo nhu cầu | **Batteries-included** |
| Async | Bất đồng bộ hoàn toàn (async/await), chạy trên ASGI | Có async view, nhưng ORM & ecosystem vẫn thiên sync |
| Validation | **Pydantic** — type hint là schema | Django Forms / DRF Serializer |
| Docs | **Tự sinh OpenAPI/Swagger** từ type hint | Cần `drf-spectacular` |
| Có sẵn | Chỉ router + DI | ORM mạnh, **Admin Panel**, Auth, bảo mật CSRF/XSS sẵn |
| Hợp với | API thuần, service ML, microservice | Sản phẩm có backoffice, CMS, monolith |

Kinh nghiệm chọn nhanh: **cần trang admin cho người không phải dev → Django. Chỉ cần JSON API và async → FastAPI.**

## 2. WSGI vs ASGI
| | WSGI | ASGI |
|---|---|---|
| Mô hình | Đồng bộ, 1 request/worker | Bất đồng bộ, nhiều request/worker |
| Server | Gunicorn + `sync`/`gthread` worker, uWSGI | **Uvicorn**, Hypercorn (thường chạy sau Gunicorn) |
| Hỗ trợ | HTTP | HTTP + WebSocket + SSE + HTTP/2 |
| Dùng khi | Django cổ điển | FastAPI, Starlette, Django async |

Công thức worker thường dùng cho WSGI: `workers ≈ 2 × số core + 1`; ASGI thì thiên về **1 worker/core** và để `asyncio` gánh concurrency. → [[Event Loop and Async IO]]

## 3. Concurrency trong Python
- Bị giới hạn bởi **GIL (Global Interpreter Lock)** với tác vụ nặng CPU — multi-threading **không** tăng tốc CPU-bound.
- I/O-bound: dùng `asyncio` (async/await) — rất hiệu quả.
- CPU-bound: `multiprocessing`, `ProcessPoolExecutor`, đẩy sang C/Rust extension, hoặc tách service.
- Background task: **Celery + Redis/RabbitMQ** là chuẩn công nghiệp; `RQ`/`Dramatiq` nhẹ hơn; `arq` cho hệ async.
- Chi tiết và các lối thoát: → [[Python GIL and Asyncio]] · [[Background Jobs and Queues]]

## 4. Bộ công cụ nên chuẩn hoá
| Việc | Lựa chọn hiện đại | Ghi chú |
|---|---|---|
| Quản lý package/venv | **uv** hoặc Poetry | uv nhanh hơn nhiều lần |
| Lint + format | **Ruff** | Thay được flake8 + isort + black |
| Type check | mypy hoặc pyright | Có type hint mà không check thì chỉ là chú thích |
| Test | pytest | fixture + parametrize |
| ORM | SQLAlchemy 2.0 (FastAPI) / Django ORM | → [[Database Access and ORM]] |
| Migration | Alembic / `manage.py migrate` | |
| Validation & settings | Pydantic v2 / `pydantic-settings` | Đọc config từ env → [[Deployment and Configuration]] |

## 5. Cạm bẫy
- **Gọi hàm blocking trong `async def`** (`requests`, `time.sleep`, driver DB sync) → chặn cả event loop, kill throughput. Dùng `httpx`, `asyncio.sleep`, hoặc `run_in_executor`.
- **Mutable default argument** (`def f(x=[])`) — kinh điển, vẫn cắn người.
- **Dùng thread để tăng tốc CPU-bound** — GIL sẽ vô hiệu hoá.
- **Django ORM lazy queryset trong template/serializer** → N+1; sửa bằng `select_related`/`prefetch_related`.
- **Pydantic v1 vs v2 khác API** — kiểm tra version trước khi copy code trên mạng.
- **`DEBUG=True` lên production** — lộ toàn bộ traceback và settings.

## 6. Checklist một service Python production
- [ ] Chạy ASGI/WSGI server thật (Uvicorn/Gunicorn), **không** dùng dev server?
- [ ] Số worker được đặt theo core và đo bằng load test chưa?
- [ ] Mọi I/O trong đường async đều dùng thư viện async?
- [ ] Có `requirements`/lockfile khoá version chính xác không?
- [ ] Type hint + mypy/pyright chạy trong CI?
- [ ] Connection pool DB có giới hạn khớp với `max_connections` của DB không?
- [ ] Task nặng đã đẩy sang Celery/RQ chưa?

## Tham khảo
- FastAPI docs: https://fastapi.tiangolo.com/
- Django docs: https://docs.djangoproject.com/en/stable/
- Pydantic v2: https://docs.pydantic.dev/latest/
- Python `asyncio`: https://docs.python.org/3/library/asyncio.html
- Celery: https://docs.celeryq.dev/en/stable/
- Ruff & uv (Astral): https://docs.astral.sh/

## Liên kết
[[Python GIL and Asyncio]] · [[Choosing a Backend Language]] · [[Database Access and ORM]] · [[Backend]]
