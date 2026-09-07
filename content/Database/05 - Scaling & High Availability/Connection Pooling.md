---
tags: [database, scaling, ops]
status: evergreen
---
# Connection Pooling

> **Duy trì danh sách kết nối tái sử dụng** (như **PgBouncer, HikariCP**) để tránh chi phí tạo/đóng kết nối liên tục đến Database. Thiếu nó, một hệ thống hoàn toàn khoẻ mạnh vẫn có thể sập chỉ vì hết connection slot.

## 1. Vì sao connection đắt
| Chi phí | Postgres | MySQL |
|---|---|---|
| Tạo kết nối | **Fork một OS process** (~1–5ms, vài MB RAM) | Tạo thread (nhẹ hơn) |
| TLS handshake | 1–2 vòng mạng | Tương tự |
| Bộ nhớ mỗi connection | ~5–10MB (cache, catalog) | ~256KB–1MB |
| Chi phí ẩn | Mỗi backend làm chậm snapshot & lock manager | |

⇒ Trong Postgres, **500 connection idle** đã đủ làm hệ thống chậm rõ rệt dù không chạy query nào.

## 2. Hai tầng pool — cần cả hai
```
App (HikariCP / pgxpool / SQLAlchemy pool)  →  PgBouncer  →  PostgreSQL
   pool nội bộ mỗi tiến trình                  pool chung     max_connections
```
- **Client-side pool**: tránh handshake mỗi request. Bắt buộc.
- **Server-side pooler (PgBouncer)**: gom hàng trăm client thành vài chục connection thật. Cần khi có nhiều instance app, serverless, hoặc autoscaling.

## 3. Ba chế độ của PgBouncer
| Chế độ | Connection trả về pool khi | Dùng khi | Mất gì |
|---|---|---|---|
| `session` | Client ngắt kết nối | Mặc định, an toàn nhất | Gộp ít, gần như không tiết kiệm |
| `transaction` | **Kết thúc transaction** | ✅ Phổ biến nhất, tỉ lệ gộp cao | Prepared statement, `SET`, advisory lock, `LISTEN/NOTIFY`, temp table |
| `statement` | Sau mỗi câu lệnh | Chỉ cho autocommit thuần | Không dùng transaction đa lệnh được |

> `transaction` mode là lựa chọn thực tế. Nhớ tắt/điều chỉnh prepared statement ở driver (`prepare_threshold=0`, hoặc dùng PgBouncer ≥1.21 có hỗ trợ protocol-level prepared statements).

## 4. Kích thước pool — nhỏ hơn bạn nghĩ
> Công thức khởi điểm (HikariCP): **`connections = (core_count × 2) + effective_spindle_count`**

Máy 8 core + SSD ⇒ khoảng **17–20** connection *hoạt động*. Nhiều hơn không tăng thông lượng, chỉ tăng độ trễ và cạnh tranh khoá.

Kiểm tra tính nhất quán:
```
tổng pool của mọi app instance  +  connection cho admin/migration/monitoring
                                ≤  max_connections
```
Đây là phép tính hay bị bỏ quên khi hệ thống autoscale: 20 pod × pool 20 = 400 connection, trong khi `max_connections = 100`.

## 5. Timeout — phải set đủ bộ
| Tầng | Tham số | Ý nghĩa |
|---|---|---|
| Pool | `connectionTimeout` / `pool_timeout` | Chờ lấy connection từ pool bao lâu thì bỏ |
| Pool | `idleTimeout`, `maxLifetime` | Tái tạo connection định kỳ (tránh connection "thiu") |
| DB | `statement_timeout` | Giết query chạy quá lâu |
| DB | `idle_in_transaction_session_timeout` | Giết transaction bỏ quên → [[Locking & MVCC]] |
| Mạng | TCP keepalive | Phát hiện đứt kết nối im lặng |

## 6. Cạm bẫy hay gặp
1. **Pool quá lớn.** Thêm connection **không** thêm thông lượng khi CPU/đĩa đã bão hoà — chỉ thêm context switch và chờ khoá.
2. **Quên nhân pool với số instance** ⇒ `FATAL: sorry, too many clients already`.
3. **Dùng `transaction` mode với prepared statement/`SET`** ⇒ lỗi ngẫu nhiên rất khó tái hiện.
4. **Rò rỉ connection** (không đóng, không dùng context manager) ⇒ pool cạn dần rồi treo toàn hệ thống.
5. **Serverless/Lambda nối thẳng vào Postgres** ⇒ bùng nổ connection. Bắt buộc có pooler (PgBouncer, RDS Proxy, Supavisor).
6. **Không set `statement_timeout`** ⇒ một query hoang chiếm connection vô hạn.
7. **Chạy migration qua pooler ở `transaction` mode** ⇒ advisory lock của migration tool không hoạt động. Kết nối trực tiếp cho migration.
8. **Không monitor pool.** Chỉ số quan trọng nhất là **thời gian chờ lấy connection**, không phải số connection đang mở.

## 7. Checklist áp dụng
- [ ] `tổng pool × số instance + dự phòng ≤ max_connections`?
- [ ] Pool size có theo công thức `(core × 2) + spindles` không, hay đặt bừa 100?
- [ ] Đã set đủ bộ timeout ở cả pool và DB chưa?
- [ ] Có monitor thời gian chờ lấy connection và số connection active không?
- [ ] Serverless/autoscaling — đã có pooler phía server chưa?
- [ ] Nếu dùng `transaction` mode: driver đã tắt prepared statement chưa?
- [ ] Migration có kết nối trực tiếp (bypass pooler) không?
- [ ] Đã kiểm tra rò rỉ connection dưới tải chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| PgBouncer | Pooler nhẹ nhất, chuẩn de-facto cho Postgres | https://www.pgbouncer.org/ |
| pgcat | Pooler hiện đại, có load balancing & sharding | https://github.com/postgresml/pgcat |
| HikariCP | Pool JDBC nhanh nhất | https://github.com/brettwooldridge/HikariCP |
| Supavisor | Pooler cho Postgres quy mô lớn (Supabase) | https://github.com/supabase/supavisor |
| ProxySQL | Proxy + pool cho MySQL | https://proxysql.com/ |
| RDS Proxy | Managed pooler của AWS | https://aws.amazon.com/rds/proxy/ |

## Tham khảo
- PgBouncer Docs — *Pool modes*: https://www.pgbouncer.org/features.html
- HikariCP — *About Pool Sizing*: https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing
- PostgreSQL Wiki — *Number of Database Connections*: https://wiki.postgresql.org/wiki/Number_Of_Database_Connections
- AWS — *Amazon RDS Proxy*: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html
- Brandur — *Postgres connection limits*: https://brandur.org/postgres-connections

## Liên kết
[[Performance Tuning]] · [[Replication]] · [[Monitoring & Capacity Planning]] · [[PostgreSQL]] · [[Database]]
