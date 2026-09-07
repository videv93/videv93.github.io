---
tags: [backend, concurrency, go]
status: growing
---
# Goroutines and Channels

> Mô hình concurrency đỉnh cao của Go: **goroutine siêu nhẹ (chỉ vài KB RAM)** để chạy việc, **channel** để truyền dữ liệu an toàn. Triết lý: *"Do not communicate by sharing memory; instead, share memory by communicating."*

## 1. Goroutine khác thread ở đâu
| | OS Thread | **Goroutine** |
|---|---|---|
| Stack ban đầu | ~1–8 MB cố định | **~2–8 KB, tự lớn/thu** |
| Ai lập lịch | Kernel | Runtime Go (M:N, work-stealing) |
| Chi phí chuyển ngữ cảnh | Cao (syscall) | Rất thấp (user space) |
| Số lượng khả thi | Hàng nghìn | **Hàng triệu** |

`go f()` là một câu lệnh, không phải một loại hàm — không có "function coloring" như async/await. → [[Event Loop and Async IO]]

## 2. Channel — bốn hình thái
| Dạng | Ngữ nghĩa |
|---|---|
| `make(chan T)` — unbuffered | Gửi **chặn** tới khi có người nhận → đồng bộ hoá hai goroutine |
| `make(chan T, n)` — buffered | Gửi chặn khi đầy → là một **cơ chế backpressure** có sẵn |
| `chan<- T` / `<-chan T` | Channel một chiều — dùng ở chữ ký hàm để nói rõ ý định |
| `close(ch)` | Báo "hết dữ liệu"; đọc từ channel đã đóng trả zero value ngay |

Quy tắc: **bên gửi đóng channel**, bên nhận không bao giờ đóng. Gửi vào channel đã đóng → panic.

## 3. Mẫu cốt lõi
```go
// Worker pool có giới hạn + huỷ bằng context
func run(ctx context.Context, jobs <-chan Job, n int) error {
    g, ctx := errgroup.WithContext(ctx)     // golang.org/x/sync/errgroup
    for i := 0; i < n; i++ {
        g.Go(func() error {
            for {
                select {
                case <-ctx.Done():           // huỷ lan xuống mọi worker
                    return ctx.Err()
                case j, ok := <-jobs:
                    if !ok {
                        return nil           // hết việc
                    }
                    if err := handle(ctx, j); err != nil {
                        return err           // lỗi đầu tiên huỷ cả nhóm
                    }
                }
            }
        })
    }
    return g.Wait()
}
```
- **`select`** — chờ nhiều channel; thêm `case <-ctx.Done()` để mọi goroutine đều thoát được.
- **`errgroup`** — thay `sync.WaitGroup` khi cần thu lỗi và huỷ nhóm.
- **`context`** — cách chuẩn để truyền deadline và cancel xuyên suốt. → [[Go Backend]]

## 4. Khi nào dùng mutex thay vì channel
Channel hợp cho **truyền quyền sở hữu dữ liệu** và điều phối. Với một biến đếm hay một map cache đơn giản, `sync.Mutex`/`sync.RWMutex`/`atomic` **rõ ràng hơn và nhanh hơn**. Lời khuyên chính thống của Go: *"Use whichever is most expressive."*

## 5. Cạm bẫy
- **Goroutine leak** — goroutine chờ trên channel không ai gửi/đóng; sống tới khi process chết. Theo dõi metric `go_goroutines`, dump bằng `pprof`.
- **Deadlock** — mọi goroutine đều chờ nhau; unbuffered channel không có người nhận là nguyên nhân số 1.
- **Data race** — hai goroutine chạm cùng biến; `go test -race` và `go build -race` ở staging.
- **`WaitGroup.Add` bên trong goroutine** — phải `Add` **trước** khi `go`.
- **Biến vòng lặp bị chia sẻ** (Go < 1.22): `for _, v := range xs { go func(){ use(v) }() }` → truyền `v` làm tham số.
- **Fan-out không giới hạn** — 100.000 goroutine cùng gọi DB có pool 20 → timeout dây chuyền. Dùng worker pool hoặc `semaphore.Weighted`.
- **Quên `defer wg.Done()`** → `Wait()` treo vĩnh viễn.

## 6. Checklist
- [ ] Mọi goroutine đều có **điều kiện kết thúc** rõ ràng (context, channel đóng)?
- [ ] Hàm dài chạy đều nhận `ctx` và có `case <-ctx.Done()`?
- [ ] Fan-out có bị chặn trên bởi worker pool/semaphore không?
- [ ] `go test -race` chạy trong CI?
- [ ] Có metric số goroutine để phát hiện leak không? → [[Observability]]
- [ ] Channel do **bên gửi** đóng, đúng một lần?
- [ ] Có chỗ nào dùng channel mà mutex sẽ đơn giản hơn không?

## Tham khảo
- Go Blog — *Go Concurrency Patterns: Pipelines and cancellation*: https://go.dev/blog/pipelines
- Go Blog — *Share Memory By Communicating*: https://go.dev/blog/codelab-share
- Go Blog — *Context*: https://go.dev/blog/context
- `golang.org/x/sync/errgroup`: https://pkg.go.dev/golang.org/x/sync/errgroup
- *Concurrency in Go* — Katherine Cox-Buday (O'Reilly)
- Go Race Detector: https://go.dev/doc/articles/race_detector

## Liên kết
[[Go Backend]] · [[Concurrency Models]] · [[Resilience Patterns]] · [[Backend]]
