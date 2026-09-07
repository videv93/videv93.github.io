---
tags: [backend, language, go]
status: growing
---
# Go Backend

> Ngôn ngữ biên dịch, kiểu tĩnh, **tối giản cú pháp**, tốc độ thực thi gần C/C++. Điểm bán hàng thật sự: một binary tĩnh + mô hình concurrency rẻ + code ai đọc cũng hiểu giống nhau.

## 1. Vì sao Go hợp với backend hạ tầng
| Đặc tính | Hệ quả thực tế |
|---|---|
| Biên dịch ra **1 binary tĩnh** | Docker image `FROM scratch` vài MB, deploy đơn giản |
| Goroutine siêu nhẹ (~vài KB) | Vạn kết nối đồng thời không cần tuning |
| Thư viện chuẩn phong phú | `net/http` mạnh tới mức **nhiều service không cần framework ngoài** |
| Cú pháp ít lựa chọn | Code của người lạ đọc như code của mình |
| GC latency thấp | p99 ổn định hơn Java/Python |
| Cross-compile sẵn | `GOOS=linux GOARCH=arm64 go build` |

## 2. Framework: cần hay không
- **`net/http` + `chi`/`gorilla-mux`** (hoặc `http.ServeMux` từ Go 1.22 đã có routing theo method/pattern) — đủ cho phần lớn service.
- **Gin** — router nhanh, middleware phong phú, phổ biến nhất.
- **Fiber** — API kiểu Express (trên `fasthttp`); nhanh nhưng lệch chuẩn `net/http`, cân nhắc kỹ.
- Mặc định nên bắt đầu từ stdlib; thêm framework khi có nhu cầu cụ thể.

## 3. Ba thứ định hình code Go
1. **Interface ngầm định** — implement không cần khai báo. Nguyên tắc: *"Accept interfaces, return structs"*; định nghĩa interface ở **phía consumer**, giữ nó nhỏ. Rất hợp với [[Repository Pattern and Service Layer]].
2. **Error là giá trị** — `if err != nil` khắp nơi là chủ đích, không phải thiếu sót. Bọc bằng `fmt.Errorf("...: %w", err)`, kiểm tra bằng `errors.Is`/`errors.As`.
3. **`context.Context`** — tham số **đầu tiên** của mọi hàm có I/O; mang deadline, cancel, và giá trị request-scoped. Là cách Go làm timeout và huỷ việc. → [[Resilience Patterns]]

## 4. Concurrency
Mô hình concurrency đỉnh cao với **Goroutines** và **Channels**, theo triết lý:
> *"Do not communicate by sharing memory; instead, share memory by communicating."*

Chi tiết `select`, worker pool, cạm bẫy leak: → [[Goroutines and Channels]] · [[Concurrency Models]]

## 5. Cạm bẫy
- **Goroutine leak** — spawn mà không có đường thoát (không context, không đóng channel).
- **Bỏ qua `err`** bằng `_` — bug ẩn kinh điển.
- **Biến vòng lặp trong goroutine** (Go < 1.22) — mọi goroutine thấy cùng một biến.
- **Nil interface != nil** — trả `*MyErr` nil vào interface `error` thì `err != nil` là true.
- **`defer` trong vòng lặp** — dồn tới cuối hàm mới chạy, giữ tài nguyên.
- **Không đóng `resp.Body`** → rò connection.
- **Dùng `panic` như exception** — chỉ panic khi thật sự không thể tiếp tục.

## 6. Checklist một service Go
- [ ] Mọi hàm I/O nhận `ctx context.Context` là tham số đầu?
- [ ] `http.Client` được **tái sử dụng** (không tạo mới mỗi request) và có `Timeout`?
- [ ] `http.Server` đã set `ReadTimeout`/`WriteTimeout`/`IdleTimeout`? (mặc định là **không giới hạn**)
- [ ] Có graceful shutdown qua `srv.Shutdown(ctx)`?
- [ ] Chạy `go vet` + `staticcheck` + `go test -race` trong CI?
- [ ] Mọi goroutine đều có điều kiện kết thúc rõ ràng?
- [ ] Error được bọc bằng `%w` để giữ chuỗi nguyên nhân?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| `go test -race` | Bắt data race lúc test | https://go.dev/doc/articles/race_detector |
| staticcheck | Lint sâu | https://staticcheck.dev/ |
| golangci-lint | Gộp nhiều linter | https://golangci-lint.run/ |
| pprof | Profile CPU/heap/goroutine | https://go.dev/blog/pprof |
| sqlc | Sinh code Go từ SQL | https://sqlc.dev/ |

## Tham khảo
- Effective Go: https://go.dev/doc/effective_go
- Go Blog — *Go Concurrency Patterns*: https://go.dev/blog/pipelines
- Go Code Review Comments: https://go.dev/wiki/CodeReviewComments
- *Let's Go* / *Let's Go Further* — Alex Edwards: https://lets-go.alexedwards.net/
- Standard library `net/http`: https://pkg.go.dev/net/http

## Liên kết
[[Goroutines and Channels]] · [[Choosing a Backend Language]] · [[Concurrency Models]] · [[Backend]]
