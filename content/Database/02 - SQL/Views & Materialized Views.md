---
tags: [database, sql]
status: growing
---
# Views & Materialized Views

> **View** = một query được đặt tên (không lưu dữ liệu). **Materialized view** = kết quả query được lưu thật, phải làm mới. Một cái đổi *cách diễn đạt*, cái kia đổi *thời điểm tính toán*.

## 1. So sánh
| | View | Materialized View |
|---|---|---|
| Lưu dữ liệu | Không — chạy lại mỗi lần gọi | Có — lưu như một bảng |
| Dữ liệu | Luôn mới nhất | Cũ tới lần refresh gần nhất |
| Chi phí đọc | = chi phí query gốc | Rẻ như đọc bảng |
| Index riêng | Không | **Có** — và đây là điểm mạnh chính |
| Ghi qua nó | Được nếu view "đơn giản" (hoặc dùng `INSTEAD OF` trigger) | Không |
| Hỗ trợ | Mọi RDBMS | Postgres, Oracle, SQL Server (indexed view); **MySQL không có** |

## 2. View — dùng để làm gì
```sql
CREATE VIEW active_customer AS
SELECT id, name, email FROM customer
WHERE deleted_at IS NULL AND status = 'active';
```
1. **Đặt tên nghiệp vụ cho logic lặp lại** — thay vì copy `WHERE deleted_at IS NULL` khắp nơi.
2. **Lớp bảo mật**: `GRANT SELECT` trên view, thu hồi trên bảng gốc để giấu cột nhạy cảm. → [[Database Security]]
3. **Lớp tương thích** khi đổi schema: giữ tên cột cũ qua view trong lúc [[Zero-downtime Migration]].

⚠️ View **không** tăng tốc gì cả. View lồng view lồng view là cách chắc chắn tạo ra query khổng lồ mà không ai đọc nổi plan.

## 3. Materialized view
```sql
CREATE MATERIALIZED VIEW daily_revenue AS
SELECT date_trunc('day', created_at) AS day,
       count(*) AS orders, sum(total) AS revenue
FROM "order" WHERE status = 'paid'
GROUP BY 1;

-- Bắt buộc có UNIQUE index thì mới refresh CONCURRENTLY được
CREATE UNIQUE INDEX ON daily_revenue (day);

REFRESH MATERIALIZED VIEW daily_revenue;               -- ❌ khoá ghi toàn bộ MV
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_revenue;  -- ✅ đọc vẫn chạy, nhưng chậm hơn
```

### Chiến lược refresh
| Cách | Độ trễ | Ghi chú |
|---|---|---|
| Cron định kỳ | phút–giờ | Đơn giản nhất, đủ cho báo cáo |
| Sau ghi (trigger/app) | ~0 | Đắt nếu ghi nhiều |
| Incremental thủ công (bảng tổng hợp + upsert theo delta) | phút | Kiểm soát tốt nhất ở quy mô lớn |
| `pg_ivm` extension | gần thời gian thực | Incremental view maintenance cho Postgres |

## 4. Khi nào dùng gì
| Nhu cầu | Chọn |
|---|---|
| Bớt lặp logic, dữ liệu phải luôn mới | View |
| Dashboard/báo cáo, trễ vài phút là ổn | Materialized view |
| Cần index trên kết quả tổng hợp | Materialized view |
| Kết quả theo từng người dùng, TTL ngắn | [[Caching Strategies]] (Redis) |
| Bảng tổng hợp lớn cần cập nhật tăng dần | Bảng thật + job upsert → [[Denormalization]] |

## 5. Cạm bẫy hay gặp
1. **View lồng nhiều tầng** — plan bùng nổ, optimizer không đẩy điều kiện xuống được.
2. **Tưởng view giúp nhanh hơn.** Không. Chỉ materialized view mới đổi chi phí.
3. **`REFRESH` không `CONCURRENTLY`** trên MV lớn ⇒ khoá đọc suốt thời gian refresh.
4. **Quên `UNIQUE` index** ⇒ không dùng được `CONCURRENTLY`.
5. **MV phình theo thời gian** mà không có retention — chiếm đĩa như một bảng thật, và bị tính vào backup.
6. **MySQL không có MV** — người ta hay giả lập bằng bảng + trigger/event, tự chịu trách nhiệm đồng bộ. → [[MySQL]]
7. **`REFRESH` toàn bộ khi chỉ 1% dữ liệu đổi** — chuyển sang incremental.

## 6. Checklist áp dụng
- [ ] View này có đang giấu một query đắt mà người gọi không biết không?
- [ ] Có tầng view nào lồng quá 2 cấp không?
- [ ] MV: đã có `UNIQUE` index để refresh `CONCURRENTLY` chưa?
- [ ] Độ trễ dữ liệu bao lâu là chấp nhận được — đã ghi vào tài liệu chưa?
- [ ] Refresh mất bao lâu, và có chồng lấn với lần refresh sau không?
- [ ] Đã monitor thời gian refresh và độ tuổi dữ liệu chưa?
- [ ] MV có index phù hợp với query đọc nó không?

## Tham khảo
- PostgreSQL Docs — *CREATE VIEW*: https://www.postgresql.org/docs/current/sql-createview.html
- PostgreSQL Docs — *Materialized Views*: https://www.postgresql.org/docs/current/rules-materializedviews.html
- PostgreSQL Docs — *REFRESH MATERIALIZED VIEW*: https://www.postgresql.org/docs/current/sql-refreshmaterializedview.html
- pg_ivm — incremental view maintenance: https://github.com/sraoss/pg_ivm
- Microsoft — *Materialized View pattern*: https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view

## Liên kết
[[Denormalization]] · [[Caching Strategies]] · [[Query Optimization]] · [[OLTP vs OLAP]] · [[Database]]
