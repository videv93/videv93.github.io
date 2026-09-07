---
tags: [backend, performance, cache]
status: growing
---
# Caching Strategies

> Cache là cách rẻ nhất để nhanh hơn và là cách nhanh nhất để có dữ liệu sai. Câu hỏi thiết kế không phải "cache ở đâu" mà **"dữ liệu này được phép cũ bao lâu, và điều gì xảy ra khi nó cũ?"**

## 1. Các tầng cache
| Tầng | Ví dụ | Độ trễ | Rủi ro |
|---|---|---|---|
| Client/Browser | `Cache-Control`, `ETag` | 0 | Không xoá được từ xa |
| CDN / Edge | Cloudflare, Fastly | ~ms | Purge phải chủ động → [[HTTP and Networking]] |
| Reverse proxy | nginx, Varnish | ~ms | |
| **Ứng dụng (chia sẻ)** | **Redis**, Memcached | ~1ms | Điểm lỗi chung nếu làm sai |
| In-process | LRU trong RAM | ~µs | Không nhất quán giữa các instance |
| Database | buffer pool, materialized view | | Refresh tốn kém |

Nguyên tắc: **cache càng gần người dùng càng nhanh, càng khó vô hiệu hoá.**

## 2. Bốn chiến lược
| Chiến lược | Cách hoạt động | Dùng khi |
|---|---|---|
| **Cache-aside (lazy)** | App đọc cache → miss thì đọc DB → ghi lại cache | Mặc định, 90% trường hợp |
| **Read-through** | Cache tự nạp từ DB | Khi thư viện/cache layer hỗ trợ |
| **Write-through** | Ghi cache và DB cùng lúc | Đọc ngay sau ghi, chấp nhận ghi chậm hơn |
| **Write-behind** | Ghi cache trước, đẩy xuống DB sau | Throughput ghi cao, **chấp nhận rủi ro mất dữ liệu** |

## 3. Vô hiệu hoá — hai cách và một quy tắc
1. **TTL** — đơn giản, chịu được lỗi, luôn có giới hạn trên cho độ cũ. **Mặc định nên chọn.**
2. **Explicit invalidation / versioned key** — chính xác nhưng dễ sót đường ghi. Mẹo: **đưa version vào key** (`user:42:v7`) thay vì xoá key — ghi key mới thì key cũ tự hết hạn.

> Quy tắc: **mọi key đều phải có TTL.** Cache không TTL là một cơ sở dữ liệu thứ hai không ai quản lý.

## 4. Ba vấn đề kinh điển
| Vấn đề | Triệu chứng | Cách xử lý |
|---|---|---|
| **Cache stampede** | Key hot hết hạn → hàng nghìn request cùng đánh DB | Lock/single-flight, **jitter cho TTL**, làm mới sớm (probabilistic early expiration) |
| **Cache penetration** | Truy vấn key không tồn tại liên tục xuyên xuống DB | Cache cả kết quả rỗng (TTL ngắn), bloom filter |
| **Hot key** | Một key chiếm phần lớn traffic, nghẽn một node Redis | Nhân bản key (`key:shard-N`), thêm cache in-process ngắn hạn |

## 5. Cạm bẫy
- **Cache trở thành dependency cứng** — Redis chết là service chết. Cache miss phải **degrade**, không phải fail. → [[Resilience Patterns]]
- **Cache dữ liệu theo người dùng ở tầng CDN** — rò rỉ dữ liệu người này sang người khác. Đây là sự cố bảo mật, không phải bug hiệu năng. → [[Backend Security]]
- **Không đưa mọi biến số vào key** — quên locale, quên user role → trả sai nội dung.
- **Cache trước khi đo** — thường nguyên nhân thật là thiếu index hoặc N+1. → [[Database Access and ORM]]
- **TTL đồng loạt bằng nhau** — hết hạn cùng lúc gây sóng tải; luôn thêm jitter.
- **Cache ghi đè lẫn nhau khi ghi đồng thời** — dữ liệu cũ đè dữ liệu mới; ưu tiên **xoá/version key** thay vì cập nhật key.
- **Không đo hit rate** — cache hit rate < ~80% thường nghĩa là chiến lược sai chỗ.

## 6. Checklist
- [ ] Dữ liệu này được phép cũ bao lâu? (con số cụ thể, viết vào code)
- [ ] Mọi key có TTL + jitter chưa?
- [ ] Key có chứa **mọi** biến ảnh hưởng kết quả (user, locale, version, quyền)?
- [ ] Redis chết thì service còn chạy (chậm hơn) không? Có timeout khi gọi Redis không?
- [ ] Có bảo vệ chống stampede cho key nóng không?
- [ ] Có metric hit/miss rate và độ trễ cache không? → [[Observability]]
- [ ] Có bao giờ cache dữ liệu riêng tư ở tầng dùng chung/CDN không?
- [ ] Kích thước giá trị cache có hợp lý (không nhét object khổng lồ)?

## Tham khảo
- RFC 9111 — HTTP Caching: https://www.rfc-editor.org/rfc/rfc9111.html
- Redis — Key eviction & TTL: https://redis.io/docs/latest/develop/reference/eviction/
- AWS — Caching best practices: https://aws.amazon.com/caching/best-practices/
- Facebook — *Scaling Memcache at Facebook* (NSDI'13): https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf
- Vattani et al. — *Optimal Probabilistic Cache Stampede Prevention* (XFetch): https://cseweb.ucsd.edu/~avattani/papers/cache_stampede.pdf
- Google SRE Book — Handling Overload: https://sre.google/sre-book/handling-overload/

## Liên kết
[[Database Access and ORM]] · [[Performance Optimization]] · [[HTTP and Networking]] · [[Backend]]
