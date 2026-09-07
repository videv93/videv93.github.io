---
tags: [backend, language, rust]
status: growing
---
# Rust Backend

> Ngôn ngữ biên dịch cấp thấp, **an toàn bộ nhớ tuyệt đối không cần Garbage Collector** nhờ Ownership và Borrow Checker. Đổi tốc độ viết lấy tốc độ chạy và sự chắc chắn ở compile-time.

## 1. Ba khái niệm phải hiểu trước khi viết dòng nào
| Khái niệm | Nội dung | Hệ quả cho backend |
|---|---|---|
| **Ownership** | Mỗi giá trị có đúng một chủ; chủ hết scope thì giải phóng | Không GC → không có GC pause → p99 rất ổn định |
| **Borrowing** | Nhiều `&` đọc **hoặc** một `&mut` ghi, không đồng thời | Data race bị chặn ngay lúc biên dịch |
| **Lifetime** | Compiler chứng minh tham chiếu không sống lâu hơn dữ liệu | Không dangling pointer, không use-after-free |

Hệ quả tổng: **"Fearless Concurrency"** — trình biên dịch kiểm tra chéo giúp **triệt tiêu hoàn toàn lỗi Data Race ở compile-time**. Kết hợp runtime bất đồng bộ **Tokio**.

## 2. Axum vs Actix-web
| | **Axum** | **Actix-web** |
|---|---|---|
| Nguồn gốc | Team **Tokio** | Dự án độc lập, từng dựa trên actor model |
| Nền tảng | `tower` + `hyper` — middleware dùng chung hệ sinh thái tower | Runtime riêng trên Tokio |
| Ergonomics | Extractor theo type, ít macro | Nhiều macro attribute |
| Hiệu năng | Rất cao | Rất cao — thường đứng đầu benchmark |
| Chọn khi | Muốn đi cùng hệ sinh thái Tokio/tower chuẩn | Cần tối đa throughput, đã quen API |

Cả hai đều thuộc nhóm web framework có **throughput cao hàng đầu thế giới hiện nay**.

## 3. Hệ sinh thái tối thiểu
| Việc | Crate |
|---|---|
| Async runtime | `tokio` |
| HTTP server | `axum` / `actix-web` |
| HTTP client | `reqwest` |
| Serialize | `serde` + `serde_json` |
| DB | `sqlx` (kiểm tra SQL lúc compile) / `sea-orm` / `diesel` |
| Error | `thiserror` (thư viện) + `anyhow` (ứng dụng) |
| Log/trace | `tracing` + `tracing-subscriber` → [[Observability]] |
| Config | `figment` / `config` |
| Test | `cargo test`, `wiremock` |

## 4. Cạm bẫy
- **Blocking trong async task** — `std::fs`, `std::thread::sleep`, CPU nặng → dùng `tokio::task::spawn_blocking`.
- **Lạm dụng `.clone()` và `Arc<Mutex<_>>`** để làm vừa lòng borrow checker → mất đúng thứ mình trả tiền để có.
- **`.unwrap()` trong đường xử lý request** → panic; panic trong task Tokio làm hỏng request đó (và dễ trở thành DoS).
- **Thời gian biên dịch** — CI chậm nếu không cache (`sccache`, cache `~/.cargo` và `target/`).
- **Chọn Rust cho CRUD** — trả giá học tập mà không đổi lại lợi ích nào đo được. → [[Choosing a Backend Language]]
- **`async` trait và lifetime** — nguồn ma sát lớn nhất khi thiết kế abstraction; giữ interface đơn giản.

## 5. Checklist
- [ ] Có `.unwrap()`/`.expect()` nào nằm trong đường xử lý request không?
- [ ] Mọi tác vụ blocking/CPU nặng đã bọc `spawn_blocking` chưa?
- [ ] Error type có implement `IntoResponse` để map ra HTTP status đúng chưa? → [[HTTP and Networking]]
- [ ] Build release (`--release`) và có `cargo clippy -D warnings` trong CI?
- [ ] `cargo audit` / `cargo deny` quét lỗ hổng dependency?
- [ ] Có graceful shutdown (`axum::serve(...).with_graceful_shutdown`)?
- [ ] Pool DB (`sqlx::PgPool`) được share qua state, không tạo mới mỗi request?

## Tham khảo
- The Rust Book: https://doc.rust-lang.org/book/
- Tokio Tutorial: https://tokio.rs/tokio/tutorial
- Axum: https://docs.rs/axum/latest/axum/
- Actix-web: https://actix.rs/
- *Zero To Production In Rust* — Luca Palmieri: https://www.zero2prod.com/
- Rust Async Book: https://rust-lang.github.io/async-book/

## Liên kết
[[Concurrency Models]] · [[Choosing a Backend Language]] · [[Go Backend]] · [[Backend]]
