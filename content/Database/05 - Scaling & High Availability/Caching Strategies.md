---
tags: [database, scaling, performance]
status: evergreen
---
# Caching Strategies

> Cache là cách rẻ nhất để giảm tải database — và là nguồn bug khó chịu nhất nếu invalidation làm sai. Câu nói kinh điển của Phil Karlton: *"There are only two hard things in Computer Science: cache invalidation and naming things."*

## 1. Các tầng cache
```
Browser → CDN → API/HTTP cache → Application cache (Redis) → DB buffer pool → OS page cache → Disk
```
Cache càng gần người dùng càng rẻ, càng khó invalidate. Đừng quên tầng rẻ nhất: **buffer pool** của chính DB. → [[Storage Engines]]

## 2. Các pattern
| Pattern | Cơ chế | Ưu | Nhược |
|---|---|---|---|
| **Cache-aside (lazy loading)** | App đọc cache; miss ⇒ đọc DB ⇒ ghi cache | Phổ biến nhất, chỉ cache cái được dùng | Lần đầu luôn miss; dễ lệch dữ liệu |
| **Read-through** | Cache tự đọc DB khi miss | App đơn giản hơn | Cần thư viện/cache hỗ trợ |
| **Write-through** | Ghi cache **và** DB đồng bộ | Cache luôn mới | Chậm ghi; cache cả thứ không ai đọc |
| **Write-behind (write-back)** | Ghi cache trước, DB sau (async) | Ghi rất nhanh | **Mất dữ liệu** nếu cache chết |
| **Refresh-ahead** | Làm mới trước khi hết hạn | Tránh miss ở key nóng | Đoán sai thì tốn công vô ích |

```python
# Cache-aside chuẩn
def get_user(uid):
    key = f"user:{uid}:v2"          # ✅ version trong key: đổi schema = đổi key
    if (v := redis.get(key)) is not None:
        return json.loads(v)
    u = db.query("SELECT ... WHERE id=%s", uid)
    redis.setex(key, 300 + random.randint(0, 60), json.dumps(u))  # ✅ TTL + jitter
    return u
```

## 3. Invalidation — chọn một chiến lược và ghi rõ
| Chiến lược | Độ tươi | Độ phức tạp |
|---|---|---|
| **TTL** | Trễ tối đa = TTL | Thấp nhất — **mặc định nên dùng** |
| **Xoá khi ghi (write-invalidate)** | Gần tức thì | Trung bình; phải biết mọi đường ghi |
| **Cập nhật khi ghi (write-update)** | Tức thì | Dễ race condition giữa hai lần ghi |
| **Versioned key** (`user:42:v7`) | Tức thì | Không cần xoá; key cũ tự hết hạn |
| **Event/CDC-driven** | Giây | Cao → [[Change Data Capture]] |

> **Luôn có TTL**, kể cả khi đã có invalidation chủ động. TTL là lưới an toàn cho mọi đường ghi bạn quên mất.

## 4. Ba vấn đề kinh điển
| Vấn đề | Mô tả | Cách chữa |
|---|---|---|
| **Cache stampede** (thundering herd) | Key nóng hết hạn ⇒ hàng nghìn request cùng đánh vào DB | TTL + jitter; khoá phân tán (chỉ 1 request rebuild); refresh-ahead; serve-stale-while-revalidate |
| **Cache penetration** | Query key **không tồn tại** liên tục ⇒ luôn miss ⇒ luôn xuống DB | Cache cả giá trị rỗng (TTL ngắn); bloom filter |
| **Cache avalanche** | Nhiều key hết hạn cùng lúc | Rải TTL bằng jitter; warm-up sau khi restart |

## 5. Cache cái gì
| ✅ Nên cache | ❌ Không nên |
|---|---|
| Dữ liệu đọc nhiều, đổi ít (cấu hình, catalog) | Dữ liệu đổi liên tục, đọc một lần |
| Kết quả tính toán đắt (tổng hợp, report) | Số dư tài khoản, tồn kho khi bán (cần chính xác) |
| Kết quả API bên thứ ba | Dữ liệu nhạy cảm chưa lọc quyền |
| Session, rate-limit counter → [[Key-Value Store]] | Thứ mà một index đúng đã giải quyết được |

> ⚠️ **Đừng dùng cache để che một query chưa tối ưu.** Thử [[Index Fundamentals]] và [[Query Optimization]] trước — sửa gốc rẻ hơn nuôi một tầng cache mãi mãi.

## 6. Cạm bẫy hay gặp
1. **Không có TTL** ⇒ dữ liệu cũ tồn tại mãi.
2. **Cache key không có version/tenant** ⇒ rò rỉ dữ liệu giữa các tenant hoặc giữa các phiên bản schema. Đây là lỗi bảo mật thật.
3. **Cache dữ liệu đã lọc quyền** rồi phục vụ cho user khác.
4. **TTL đồng nhất** ⇒ avalanche. Luôn thêm jitter.
5. **Coi Redis là nguồn chân lý.** Nó có thể mất dữ liệu. → [[Key-Value Store]]
6. **Cache-aside với ghi song song** ⇒ race: đọc DB (giá trị cũ) → có ai đó ghi + xoá cache → mình ghi giá trị cũ vào cache. Chữa bằng versioned key hoặc `SET NX` + TTL ngắn.
7. **Không đo hit ratio.** Cache hit <80% thường nghĩa là đang cache sai thứ.
8. **Cache toàn bộ object lớn** khi chỉ cần vài field ⇒ tốn mạng và RAM.

## 7. Checklist áp dụng
- [ ] Đã thử tối ưu query/index **trước** khi thêm cache chưa?
- [ ] Mọi key đều có TTL, và TTL có jitter?
- [ ] Key có chứa version schema và tenant/user scope không?
- [ ] Chiến lược invalidation đã viết vào tài liệu chưa? Ai chịu trách nhiệm?
- [ ] Có bảo vệ chống stampede cho key nóng không?
- [ ] Có cache giá trị "không tồn tại" để chống penetration không?
- [ ] Hệ thống có chạy đúng khi cache **hoàn toàn trống** (sau restart) không?
- [ ] Có monitor hit ratio, eviction rate, memory usage không?
- [ ] Dữ liệu trong cache có nhạy cảm không? Đã cân nhắc mã hoá/TTL ngắn chưa?

## Tham khảo
- AWS — *Caching strategies (ElastiCache)*: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Strategies.html
- Redis — *Client-side caching & patterns*: https://redis.io/docs/latest/develop/use/client-side-caching/
- Microsoft — *Cache-Aside pattern*: https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside
- Facebook — *Scaling Memcache at Facebook* (NSDI'13): https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf
- Kleppmann — *DDIA*, ch.11 (derived data): https://dataintensive.net/

## Liên kết
[[Key-Value Store]] · [[Views & Materialized Views]] · [[Query Optimization]] · [[Denormalization]] · [[Database]]
