---
tags: [devops, aws, cloud, database]
status: growing
---
# AWS Databases

> Bốn dịch vụ phủ gần hết nhu cầu: **RDS/Aurora** (quan hệ), **DynamoDB** (NoSQL key-value), **ElastiCache** (in-memory). Chọn theo *hình dạng truy vấn*, không theo *độ phổ biến của công nghệ*.

## 1. Bảng chọn nhanh
| Dịch vụ | Mô hình | Chọn khi | Tránh khi |
|---|---|---|---|
| **Amazon RDS** | Quan hệ, managed (PostgreSQL, MySQL, MariaDB, SQL Server, Oracle) | Cần SQL, JOIN, transaction, schema rõ ràng | Cần scale ghi vượt một node |
| **Amazon Aurora** | Quan hệ chuẩn Enterprise, tương thích MySQL/PostgreSQL, do AWS tối ưu (**nhanh gấp 3–5 lần RDS thông thường**) | Cần HA mạnh, đọc nhiều, storage tự co giãn | Ngân sách rất chặt ở quy mô nhỏ |
| **Amazon DynamoDB** | NoSQL key-value **serverless**, độ trễ **single-digit millisecond ở mọi quy mô** | Access pattern biết trước, throughput cực lớn, không cần JOIN | Truy vấn ad-hoc, analytics, quan hệ phức tạp |
| **Amazon ElastiCache** | In-memory (Redis / Memcached) | Cache, session, leaderboard, rate limit, pub/sub | Nguồn dữ liệu duy nhất (RAM là ephemeral) |

Bổ sung khi cần: **Redshift** (data warehouse), **OpenSearch** (tìm kiếm/log), **DocumentDB** (MongoDB-compatible), **Neptune** (graph), **Timestream** (time-series).

## 2. RDS — hai cơ chế phải phân biệt
| | **Multi-AZ** | **Read Replica** |
|---|---|---|
| Mục đích | **High Availability** | **Read Scaling** |
| Cơ chế | Standby đồng bộ ở AZ khác | Bản sao bất đồng bộ (có lag) |
| Có phục vụ đọc không? | Không (standby ẩn) | **Có** |
| Khi primary chết | **Tự động failover** (~60–120s), DNS endpoint không đổi | Không tự failover (phải promote thủ công) |
| Cross-region? | Multi-AZ cluster trong region | **Có** — dùng cho DR |

> Đây là câu hỏi phỏng vấn kinh điển và cũng là lỗi thiết kế thật: **Multi-AZ không giúp scale đọc, Read Replica không đảm bảo HA.** Production thường cần **cả hai**.

### Vận hành RDS
- **Automated backup** + **PITR** (point-in-time recovery) trong khoảng retention (tối đa 35 ngày). Snapshot thủ công thì giữ vô hạn.
- **Maintenance window / minor version upgrade** — chọn giờ thấp điểm, bật auto minor upgrade.
- **Parameter Group** để chỉnh `max_connections`, `work_mem`… (một số tham số cần reboot).
- **Performance Insights** — nhìn được truy vấn nào tốn tài nguyên nhất.
- **RDS Proxy** — gom connection pool, cực cần khi client là [[AWS Compute & Auto Scaling|Lambda]] hoặc nhiều pod K8s.
- **Aurora Serverless v2** — co giãn ACU theo tải, hợp môi trường dev và tải thất thường.

## 3. DynamoDB — thiết kế ngược với SQL
Nguyên tắc: **thiết kế bảng từ access pattern**, không chuẩn hoá dữ liệu.
- **Partition key** quyết định phân bổ; chọn key có *high cardinality* để tránh **hot partition**.
- **Sort key** cho phép truy vấn theo dải (range).
- **GSI/LSI** để hỗ trợ pattern truy vấn khác — mỗi GSI tốn thêm dung lượng và write capacity.
- **Capacity mode**: *On-Demand* (không đoán được tải, không lo throttle) vs *Provisioned + Auto Scaling* (rẻ hơn khi tải ổn định).
- **DynamoDB Streams** → kích hoạt Lambda cho event-driven.
- **TTL** tự động xoá item hết hạn — miễn phí và rất hữu ích.
- **PITR** phải bật thủ công.
> ⚠️ `Scan` quét toàn bảng — tốn tiền và chậm. Nếu thấy mình phải `Scan`, gần như chắc chắn data model sai.

## 4. ElastiCache — cache đúng cách
| Pattern | Cách hoạt động | Lưu ý |
|---|---|---|
| **Cache-aside** (phổ biến nhất) | App đọc cache, miss thì đọc DB rồi ghi lại cache | Đơn giản; cần TTL để tránh dữ liệu cũ |
| Write-through | Ghi DB và cache cùng lúc | Cache luôn mới, ghi chậm hơn |
| Write-behind | Ghi cache trước, đẩy DB sau | Nhanh, rủi ro mất dữ liệu |

Ba vấn đề kinh điển:
- **Cache stampede** — TTL cùng hết một lúc, hàng nghìn request đổ vào DB. Giải: TTL có jitter + lock khi rebuild.
- **Hot key** — một key nhận phần lớn traffic. Giải: replica đọc, hoặc cache tầng ứng dụng.
- **Cache invalidation** — luôn khó. Ưu tiên TTL ngắn hơn là cố invalidate chính xác mọi chỗ.

## 5. Cạm bẫy
- ❌ **Database ở public subnet** → chỉ nên nằm ở private subnet, SG chỉ mở cho SG của app. → [[AWS Global Infrastructure & Networking]]
- ❌ **Không bật Multi-AZ ở production** để tiết kiệm → một AZ lỗi là downtime dài.
- ❌ **Có backup nhưng chưa bao giờ restore thử** → không phải backup.
- ❌ **Đọc từ Read Replica rồi ngạc nhiên vì dữ liệu cũ** → replication lag là bản chất; đọc-sau-ghi phải trỏ primary.
- ❌ **Lambda/pod mở connection trực tiếp tới RDS ở quy mô lớn** → cạn `max_connections`. Dùng RDS Proxy hoặc pooler.
- ❌ **DynamoDB dùng như bảng SQL** (Scan + filter) → hoá đơn tăng vọt, latency tệ.
- ❌ **Coi Redis là kho lưu trữ chính** → mất khi failover/eviction, trừ khi bật AOF và hiểu rõ đánh đổi.
- ❌ **Password DB nhúng trong code/env plaintext** → dùng Secrets Manager với auto-rotation. → [[Secrets Management]]
- ❌ **Không đặt alarm cho `FreeStorageSpace`** → DB đầy disk là sự cố dừng ghi hoàn toàn.

## 6. Checklist một database production
- [ ] Nằm ở private subnet, SG chỉ cho phép nguồn là SG của app?
- [ ] Multi-AZ bật? Đã test failover chưa?
- [ ] Backup tự động + PITR bật, retention đủ dài, **đã restore thử trong 90 ngày**?
- [ ] Snapshot có copy sang region/account khác cho DR?
- [ ] Mã hoá at-rest (KMS) và in-transit (TLS bắt buộc)?
- [ ] `deletion_protection` bật (và `prevent_destroy` trong Terraform)? → [[Terraform]]
- [ ] Credential trong Secrets Manager có rotation tự động?
- [ ] Có alarm cho: CPU, FreeStorageSpace, DatabaseConnections, ReplicaLag, ReadLatency? → [[Metrics & Prometheus]]
- [ ] Performance Insights bật để điều tra truy vấn chậm?
- [ ] Có kế hoạch migration schema an toàn (expand → migrate → contract) để rollback được? → [[Deployment Strategies]]

## Tham khảo
- AWS Docs — RDS User Guide: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/
- AWS Docs — Aurora User Guide: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/
- AWS Docs — DynamoDB Developer Guide & best practices: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html
- Alex DeBrie — *The DynamoDB Book* / https://www.dynamodbguide.com/
- AWS Docs — ElastiCache User Guide: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/
- AWS — Database caching strategies whitepaper: https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/welcome.html

## Liên kết
[[AWS Storage]] · [[AWS Compute & Auto Scaling]] · [[AWS Security & Identity]] · [[SRE & Reliability Engineering]] · [[DevOps]]
