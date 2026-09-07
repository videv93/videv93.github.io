---
tags: [backend, foundation, decision]
status: growing
---
# Choosing a Backend Language

> Không có ngôn ngữ "tốt nhất", chỉ có ngôn ngữ **trả đúng cái giá bạn sẵn sàng trả**. Ba biến quyết định: tốc độ ra sản phẩm, đặc tính tải (I/O hay CPU), và đội ngũ đang có ai.

## 1. Bảng so sánh 5 ngôn ngữ
| | **Python** | **Ruby** | **JS/TS (Node)** | **Go** | **Rust** |
|---|---|---|---|---|---|
| Kiểu thực thi | Thông dịch | Thông dịch | JIT (V8) | Biên dịch | Biên dịch |
| Kiểu dữ liệu | Động (+ type hint) | Động | Động (+ TS tĩnh) | Tĩnh | Tĩnh, rất mạnh |
| Bộ nhớ | GC | GC | GC | GC | **Không GC** (Ownership) |
| Framework chính | [[Python Backend]] — FastAPI, Django | [[Ruby on Rails]] | [[Nodejs and TypeScript Backend]] — Express, NestJS | [[Go Backend]] — `net/http`, Gin, Fiber | [[Rust Backend]] — Axum, Actix-web |
| Concurrency | `asyncio`, Celery; vướng **GIL** | Thread qua Puma, Sidekiq | Event Loop, Worker Threads | **Goroutine + Channel** | `async` + Tokio, *Fearless Concurrency* |
| Throughput thô | Thấp–TB | Thấp–TB | Trung bình | Cao | **Cao nhất** |
| Tốc độ ra MVP | **Rất nhanh** | **Rất nhanh** | Nhanh | Trung bình | Chậm |
| Chi phí RAM/instance | Cao | Cao | Trung bình | Thấp | **Thấp nhất** |
| Điểm mạnh riêng | Data/ML/AI ecosystem | Năng suất, convention | Chung ngôn ngữ với frontend | Deploy 1 binary, ops đơn giản | An toàn bộ nhớ ở compile-time |
| Điểm yếu riêng | CPU-bound kém | Cộng đồng thu hẹp | Callback/async dễ rối, CPU-bound kém | Ít trừu tượng, verbose | Đường học dốc, compile lâu |

## 2. Chọn theo tình huống
| Tình huống | Chọn | Vì sao |
|---|---|---|
| MVP/SaaS, cần ra sản phẩm trong vài tuần | Rails hoặc Django | Batteries-included, admin/auth/ORM sẵn |
| API dính chặt vào ML/data pipeline | Python (FastAPI) | Ở cùng hệ sinh thái với model |
| Team fullstack nhỏ, dùng React sẵn | TypeScript + NestJS | Một ngôn ngữ, share type giữa FE/BE |
| Service hạ tầng, proxy, nhiều kết nối đồng thời | Go | Goroutine rẻ, binary tĩnh, GC ổn định |
| Đường dữ liệu nóng, latency p99 khắt khe, chi phí RAM lớn | Rust | Không GC pause, throughput cao nhất |
| Tác vụ CPU-bound trong hệ Python/Node | Tách service Go/Rust | Đừng cố chống lại GIL/Event Loop |

## 3. Nguyên tắc quyết định
1. **Tối ưu cho giai đoạn hiện tại.** Trước product-market fit, tốc độ thay đổi quan trọng hơn throughput.
2. **Đội ngũ > benchmark.** Ngôn ngữ nhanh mà không ai trong team đọc được code là chậm nhất.
3. **Đừng chọn ngôn ngữ để giải bài toán kiến trúc.** N+1 query, thiếu index, thiếu cache tốn nhiều ms hơn khoảng cách giữa các ngôn ngữ.
4. **Polyglot có chi phí thật**: CI, log, tracing, thư viện nội bộ, on-call phải nhân đôi. Đổi ngôn ngữ chỉ khi lợi ích rõ ràng và cục bộ.
5. **Đặc tính tải quyết định mô hình concurrency**, và mô hình concurrency mới là thứ phân biệt các ngôn ngữ này nhiều nhất. → [[Concurrency Models]]

## 4. Cạm bẫy
- **Chọn theo benchmark TechEmpower** — benchmark đo "hello world", ứng dụng thật bị chặn ở DB.
- **Viết lại bằng ngôn ngữ nhanh hơn để cứu hiệu năng** — hầu như luôn rẻ hơn nếu đo và sửa truy vấn. → [[Performance Optimization]]
- **Dùng Python/Node cho tác vụ CPU nặng** rồi ngạc nhiên vì latency dựng đứng.
- **Dùng Rust cho CRUD** — trả giá học tập và tốc độ phát triển mà không đổi lại gì.
- **Bỏ qua chi phí vận hành**: Go/Rust cho 1 binary; Python/Ruby kéo theo cả runtime + native extension.

## 5. Checklist trước khi chốt stack
- [ ] Tải chủ yếu là I/O-bound hay CPU-bound? (đo, đừng đoán)
- [ ] Bao nhiêu người trong team viết được ngôn ngữ này ở mức production?
- [ ] Có thư viện chín cho những thứ *bắt buộc* (payment SDK, driver DB, auth) không?
- [ ] Câu chuyện deploy thế nào — container size, cold start, RAM/instance?
- [ ] Tuyển người trên thị trường này dễ tới đâu?
- [ ] Nếu 2 năm nữa sai, cái gì kẹt lại: chỉ một service hay cả hệ thống?

## Tham khảo
- TechEmpower Framework Benchmarks (đọc có phê phán): https://www.techempower.com/benchmarks/
- Stack Overflow Developer Survey — xu hướng dùng & lương: https://survey.stackoverflow.co/
- Go — *Why Go?*: https://go.dev/solutions/
- Rust — *Why Rust?* (Rust Book, ch.1): https://doc.rust-lang.org/book/ch00-00-introduction.html
- Dan McKinley — *Choose Boring Technology*: https://boringtechnology.club/

## Liên kết
[[Backend Fundamentals]] · [[Concurrency Models]] · [[Backend Learning Roadmap]] · [[Backend]]
