---
tags: [database, architecture]
status: evergreen
---
# OLTP vs OLAP

> Hai loại workload đối lập nhau ở gần như mọi chiều. Cố ép một hệ thống phục vụ cả hai là nguyên nhân phổ biến nhất khiến "database chậm" — báo cáo giết chết giao dịch.

## 1. So sánh
| | **OLTP** (Online Transaction Processing) | **OLAP** (Online Analytical Processing) |
|---|---|---|
| Mục đích | Vận hành nghiệp vụ | Phân tích, ra quyết định |
| Thao tác | `INSERT`/`UPDATE`/`DELETE` + đọc theo id | `SELECT` gom nhóm khối lượng lớn |
| Số dòng chạm mỗi query | Vài dòng | Hàng triệu–tỉ dòng |
| Số cột chạm | Cả dòng | Vài cột |
| Độ trễ mục tiêu | mili giây | giây–phút (chấp nhận được) |
| Đồng thời | Hàng nghìn user | Hàng chục analyst |
| Bố cục lưu trữ | **Row store** | **Column store** → [[Storage Engines]] |
| Schema | Chuẩn hoá (3NF) → [[Normalization]] | Star/snowflake schema (phá chuẩn) |
| Dữ liệu | Hiện tại | Lịch sử, bất biến |
| Đại diện | PostgreSQL, MySQL | ClickHouse, DuckDB, BigQuery, Snowflake, Redshift |

## 2. Vì sao column store thắng ở OLAP
```sql
SELECT region, sum(amount) FROM sales WHERE year = 2026 GROUP BY region;
```
- **Row store**: phải đọc toàn bộ dòng (50 cột) để lấy 3 cột ⇒ lãng phí ~94% I/O.
- **Column store**: chỉ đọc 3 file cột. Thêm nữa, dữ liệu cùng cột có cùng kiểu và phân phối tương tự ⇒ nén 10–100× ⇒ ít I/O hơn nữa. Và xử lý vector hoá (SIMD) trên mảng liền mạch.

## 3. HTAP và các lựa chọn trung gian
| Giải pháp | Khi nào phù hợp |
|---|---|
| **Read replica cho báo cáo** | Nhanh nhất để triển khai; tách tải nhưng vẫn row store → [[Replication]] |
| **Materialized view / bảng tổng hợp** | Vài báo cáo cố định → [[Views & Materialized Views]] |
| **DuckDB đọc Parquet** | Phân tích cục bộ, dataset tới hàng chục GB — cực nhẹ |
| **ClickHouse** | Analytics thời gian thực, khối lượng rất lớn |
| **Data warehouse** | Nhiều nguồn dữ liệu, nhiều người dùng BI → [[Data Warehouse & Lakehouse]] |
| **HTAP** (TiDB, SingleStore, Citus columnar) | Muốn một hệ cho cả hai — trả giá bằng độ phức tạp |

> Lộ trình thực dụng: **replica báo cáo → materialized view → DuckDB/ClickHouse → warehouse đầy đủ.** Đừng nhảy thẳng tới bước cuối.

## 4. Cạm bẫy hay gặp
1. **Chạy báo cáo nặng trên primary OLTP** ⇒ buffer pool bị đẩy sạch, latency giao dịch tăng vọt.
2. **Chạy báo cáo trên replica sync** ⇒ chặn WAL replay hoặc bị huỷ query (`max_standby_streaming_delay`).
3. **Chuẩn hoá kho dữ liệu.** OLAP **cố tình** phá chuẩn — JOIN nhiều bảng trên tỉ dòng rất đắt.
4. **Dùng column store cho OLTP** ⇒ update từng dòng cực chậm.
5. **Đồng bộ warehouse bằng `SELECT *` mỗi đêm** ⇒ nên dùng incremental hoặc CDC. → [[Change Data Capture]]
6. **Không có ranh giới rõ ràng** ⇒ ai cũng query production tuỳ ý.
7. **Bỏ qua DuckDB.** Rất nhiều nhu cầu "cần data warehouse" thực ra là một file Parquet 20GB và DuckDB trên laptop.

## 5. Checklist áp dụng
- [ ] Query báo cáo có đang chạy trên primary không?
- [ ] Đã đặt `statement_timeout` riêng cho role báo cáo chưa?
- [ ] Báo cáo cần dữ liệu tươi tới mức nào — đã hỏi người dùng thật chưa?
- [ ] Có bảng tổng hợp/materialized view cho các báo cáo lặp lại không?
- [ ] Dữ liệu OLAP đồng bộ bằng gì, độ trễ bao nhiêu?
- [ ] Kích thước dataset phân tích là bao nhiêu — DuckDB có đủ không?
- [ ] Đã tách quyền (role read-only) cho người dùng BI chưa? → [[Database Security]]

## Tham khảo
- Kleppmann — *DDIA*, ch.3 (Transaction Processing or Analytics?): https://dataintensive.net/
- ClickHouse — *Why is ClickHouse fast?*: https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast
- DuckDB Docs: https://duckdb.org/docs/
- Kimball Group — *Dimensional Modeling Techniques*: https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/
- Snowflake — *Architecture*: https://docs.snowflake.com/en/user-guide/intro-key-concepts

## Liên kết
[[Data Warehouse & Lakehouse]] · [[Storage Engines]] · [[ETL & ELT]] · [[Views & Materialized Views]] · [[Database]]
