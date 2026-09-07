---
tags: [database, nosql, cache]
status: growing
---
# Key-Value Store

> Lưu trữ dạng **cặp khóa - giá trị** đơn giản, tốc độ đọc/ghi cực nhanh trên RAM. Đại diện: **Redis, Amazon DynamoDB, Memcached**. Dùng cho **Caching, Session Management, Rate Limiting, Leaderboard**.

## 1. Redis — không chỉ là cache
Điểm khác biệt lớn nhất so với Memcached: Redis có **cấu trúc dữ liệu** phía server, nên nhiều thao tác nguyên tố không cần round-trip.

| Kiểu | Lệnh tiêu biểu | Dùng cho |
|---|---|---|
| String | `SET`, `GET`, `INCR`, `SETEX` | Cache, counter, feature flag |
| Hash | `HSET`, `HGETALL`, `HINCRBY` | Object nhiều field, cập nhật từng field |
| List | `LPUSH`, `BRPOP` | Queue đơn giản, activity feed |
| Set | `SADD`, `SINTER`, `SISMEMBER` | Tag, unique visitor, bạn chung |
| **Sorted Set** | `ZADD`, `ZRANGE`, `ZRANGEBYSCORE` | **Leaderboard**, priority queue, sliding window |
| Bitmap / Bitfield | `SETBIT`, `BITCOUNT` | Daily active user cực tiết kiệm RAM |
| HyperLogLog | `PFADD`, `PFCOUNT` | Đếm unique **xấp xỉ** với 12KB cố định |
| Stream | `XADD`, `XREADGROUP` | Event log có consumer group |
| Geo | `GEOADD`, `GEOSEARCH` | Tìm quanh đây |

```redis
# Rate limit: 100 request / 60 giây — nguyên tố, không race
MULTI
INCR    rate:user:42
EXPIRE  rate:user:42 60 NX
EXEC

# Leaderboard
ZADD    board 9500 "user:42"
ZREVRANGE board 0 9 WITHSCORES     # top 10
ZREVRANK  board "user:42"          # hạng của tôi

# Khoá phân tán (chống stampede) — nhớ token để unlock đúng chủ
SET lock:job:7 <random-token> NX EX 30
```

## 2. Persistence — mức độ bền vững chọn được
| Chế độ | Cơ chế | Mất dữ liệu khi crash |
|---|---|---|
| Không bật | Chỉ RAM | Mất tất cả |
| **RDB** | Snapshot định kỳ | Tới snapshot gần nhất (phút) |
| **AOF** (`appendfsync everysec`) | Ghi log lệnh | ~1 giây |
| AOF (`always`) | fsync mỗi lệnh | ~0, nhưng chậm hẳn |
| RDB + AOF | Cả hai | Khuyến nghị khi cần bền vững |

> Ngay cả với AOF, **Redis không phải nguồn chân lý**. Nó là state tạm có thể tái tạo. → [[Caching Strategies]]

## 3. Eviction policy — phải chọn đúng
| Policy | Hành vi |
|---|---|
| `noeviction` | Từ chối ghi khi đầy (mặc định) — **an toàn cho queue/lock, nguy hiểm cho cache** |
| `allkeys-lru` / `allkeys-lfu` | Loại key ít dùng nhất — ✅ cho cache thuần |
| `volatile-lru` / `volatile-ttl` | Chỉ loại key **có TTL** |

⚠️ Trộn cache và dữ liệu quan trọng trong cùng một instance là sai lầm phổ biến: eviction sẽ ăn mất khoá phân tán hoặc job queue của bạn. **Tách instance.**

## 4. DynamoDB — mô hình khác hẳn
- Khoá: **partition key** (+ optional sort key). Query **chỉ** theo khoá; muốn khác thì cần **GSI/LSI**.
- Tính tiền theo RCU/WCU hoặc on-demand ⇒ thiết kế sai = hoá đơn sai.
- **Single-table design**: nhồi nhiều loại entity vào một bảng bằng cách mã hoá `PK`/`SK` — hiệu quả nhưng khó đọc và khó đổi.
- Hot partition là vấn đề số 1. → [[Sharding & Partitioning]]

## 5. Cạm bẫy hay gặp
1. **Dùng Redis làm nguồn chân lý.** Mất dữ liệu là hành vi bình thường của nó.
2. **`KEYS *` trên production** ⇒ **khoá toàn bộ server** (Redis đơn luồng). Dùng `SCAN`.
3. **Lệnh O(N) trên tập lớn**: `SMEMBERS`, `HGETALL`, `LRANGE 0 -1` trên hàng triệu phần tử.
4. **Không set TTL** ⇒ RAM đầy dần rồi bị evict bất ngờ.
5. **`noeviction` cho cache** ⇒ ghi bắt đầu lỗi khi đầy.
6. **Khoá phân tán không có token/fencing** ⇒ process chậm giải phóng khoá của người khác. Đọc bài "How to do distributed locking" của Kleppmann trước khi tự viết.
7. **N+1 với Redis** — gọi `GET` trong vòng lặp thay vì `MGET`/pipeline. → [[N+1 Query Problem]]
8. **Một instance chung cho cache + queue + lock** — xem mục 3.
9. **Redis đơn luồng**: một lệnh chậm chặn tất cả. Bật `slowlog`.

## 6. Checklist áp dụng
- [ ] Dữ liệu ở đây có tái tạo lại được từ nguồn khác không? (Nếu không — sai chỗ lưu)
- [ ] Mọi key có TTL và naming convention (`app:entity:id:v`)?
- [ ] `maxmemory` và `maxmemory-policy` đã set đúng mục đích chưa?
- [ ] Cache, queue, lock có tách instance/DB riêng không?
- [ ] Có lệnh O(N) nào chạy trên tập lớn không? Đã bật `slowlog` chưa?
- [ ] Dùng pipeline/`MGET` thay cho vòng lặp chưa?
- [ ] Khoá phân tán có TTL và token kiểm tra chủ sở hữu chưa?
- [ ] Persistence đã cấu hình đúng mức RPO mong muốn chưa?
- [ ] Có monitor hit ratio, evicted_keys, used_memory, blocked_clients không?

## Tham khảo
- Redis Docs — *Data types*: https://redis.io/docs/latest/develop/data-types/
- Redis Docs — *Key eviction*: https://redis.io/docs/latest/develop/reference/eviction/
- Redis Docs — *Distributed locks (Redlock)*: https://redis.io/docs/latest/develop/use/patterns/distributed-locks/
- Martin Kleppmann — *How to do distributed locking*: https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html
- AWS — *DynamoDB best practices*: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html

## Liên kết
[[Caching Strategies]] · [[Database Paradigms]] · [[Sharding & Partitioning]] · [[Database]]
