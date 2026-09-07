---
tags: [backend, performance]
status: growing
---
# Performance Optimization

> Quy tắc số một: **đo trước khi tối ưu.** Trực giác về chỗ chậm sai gần như mọi lần — trong backend, thời gian hầu như luôn nằm ở I/O (DB, network), không phải ở CPU của ngôn ngữ.

## 1. Đo cái gì — percentile, không phải trung bình
| Chỉ số | Ý nghĩa |
|---|---|
| p50 | Trải nghiệm "điển hình" — dễ đẹp, ít giá trị |
| **p95 / p99** | Nơi người dùng thật sự đau; là mục tiêu tối ưu |
| p99.9 | Khách hàng lớn nhất (nhiều request nhất) sống ở đây |
| Throughput (RPS) | Ràng buộc năng lực |
| **Saturation** | Mức đầy của tài nguyên (pool, CPU, queue depth) — báo trước sự cố |

> Trung bình che giấu mọi thứ. Một API "trung bình 80ms" có thể có 1% request mất 8 giây — và người dùng gặp 1% đó nhiều lần trong một phiên. → [[Observability]]

## 2. Quy trình 5 bước
1. **Đặt mục tiêu bằng số**: "p99 của `GET /orders` < 300ms ở 200 RPS". Không có số thì không biết khi nào dừng.
2. **Đo trên môi trường giống thật** (dữ liệu thật về khối lượng, không phải 100 dòng seed).
3. **Tìm nút thắt** bằng profiler/trace, không bằng suy đoán.
4. **Sửa một thứ**, đo lại.
5. **Đặt regression test/alert** để nó không quay lại.

## 3. Bậc thang chi phí — sửa theo thứ tự này
| Bậc | Việc | Lợi ích điển hình |
|---|---|---|
| 1 | **Sửa truy vấn**: N+1, thiếu index, `SELECT *` | 10–100× → [[Database Access and ORM]] |
| 2 | **Bỏ việc thừa**: field không ai dùng, serialize dữ liệu không cần | 2–10× |
| 3 | **Đẩy việc ra khỏi request**: email, PDF, webhook | Giảm p99 mạnh → [[Background Jobs and Queues]] |
| 4 | **Cache** đúng chỗ | 10× nhưng thêm rủi ro dữ liệu cũ → [[Caching Strategies]] |
| 5 | **Song song hoá** các lời gọi độc lập | Latency = max thay vì tổng → [[Concurrency Models]] |
| 6 | Tối ưu thuật toán/cấp phát bộ nhớ trong code | Thường < 2× |
| 7 | Đổi ngôn ngữ/rewrite | Đắt nhất, hiếm khi là câu trả lời → [[Choosing a Backend Language]] |

## 4. Latency budget
Chia ngân sách cho một request và kiểm tra thực tế có khớp không:
```
300ms tổng = 5ms LB + 20ms auth/middleware + 120ms DB (3 truy vấn)
           + 80ms gọi service ngoài + 40ms serialize + 35ms dự phòng
```
Nếu một mục vượt ngân sách → đó là chỗ phải sửa. Nếu tổng ngân sách không khả thi → phải đổi thiết kế (cache, precompute, async), không phải "tối ưu thêm".

## 5. Cạm bẫy
- **Tối ưu theo cảm tính** — sửa vòng lặp trong khi 95% thời gian ở một truy vấn.
- **Benchmark không giống production**: dữ liệu nhỏ, cache nóng sẵn, chạy trên máy dev, không có concurrency.
- **Đo trung bình** thay vì percentile.
- **Coordinated omission** trong load test — công cụ chờ response mới gửi request tiếp → giấu mất phần đuôi. Dùng công cụ giữ tốc độ gửi cố định (`k6` với `constant-arrival-rate`, `wrk2`).
- **Thêm cache để che truy vấn tệ** — nợ kỹ thuật kép: vẫn chậm khi miss, thêm rủi ro dữ liệu cũ.
- **Tăng pool/thread khi bão hoà** — thường làm latency tệ hơn vì hàng đợi dài hơn. → [[Scaling and Load Balancing]]
- **Song song hoá mà không giới hạn** — nhanh cho một request, sập hệ thống khi có tải.
- **Không đo lại sau khi sửa** — không biết mình đã sửa đúng cái gì.

## 6. Checklist một cuộc điều tra hiệu năng
- [ ] Mục tiêu đã viết thành số (metric + percentile + tải) chưa?
- [ ] Có trace của một request chậm thật từ production không?
- [ ] Đã xem top truy vấn theo tổng thời gian (`pg_stat_statements`) chưa?
- [ ] Số truy vấn mỗi endpoint có phải hằng số không?
- [ ] Có lời gọi ngoài nào nằm trong đường đồng bộ mà đáng lẽ nên async?
- [ ] Các lời gọi độc lập đã chạy song song chưa?
- [ ] Đã kiểm tra saturation (pool DB, CPU, queue depth) chưa?
- [ ] Đã đo lại và ghi lại kết quả trước/sau?
- [ ] Có alert để bắt hồi quy hiệu năng không?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| k6 | Load test có kiểm soát tốc độ gửi | https://k6.io/ |
| `pg_stat_statements` | Xếp hạng truy vấn tốn kém | https://www.postgresql.org/docs/current/pgstatstatements.html |
| py-spy / rbspy | Profile Python/Ruby đang chạy | https://github.com/benfred/py-spy |
| Go pprof | CPU/heap/goroutine profile | https://go.dev/blog/pprof |
| Clinic.js | Chẩn đoán Node | https://clinicjs.org/ |
| Flame graphs (Brendan Gregg) | Đọc profile trực quan | https://www.brendangregg.com/flamegraphs.html |

## Tham khảo
- Google SRE Book — Monitoring Distributed Systems (Four Golden Signals): https://sre.google/sre-book/monitoring-distributed-systems/
- Brendan Gregg — USE Method: https://www.brendangregg.com/usemethod.html
- Gil Tene — *How NOT to Measure Latency* (coordinated omission): https://www.youtube.com/watch?v=lJ8ydIuPFeU
- *Systems Performance* — Brendan Gregg
- *Designing Data-Intensive Applications*, ch.1 (percentile): https://dataintensive.net/

## Liên kết
[[Observability]] · [[Caching Strategies]] · [[Database Access and ORM]] · [[Scaling and Load Balancing]] · [[Backend]]
