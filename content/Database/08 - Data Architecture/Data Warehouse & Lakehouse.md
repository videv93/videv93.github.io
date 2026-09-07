---
tags: [database, architecture, analytics]
status: growing
---
# Data Warehouse & Lakehouse

> Nơi dữ liệu từ nhiều nguồn hội tụ để phân tích. Ba thế hệ kiến trúc — warehouse, lake, lakehouse — mỗi thế hệ sửa một điểm yếu của thế hệ trước.

## 1. Ba kiến trúc
| | **Data Warehouse** | **Data Lake** | **Lakehouse** |
|---|---|---|---|
| Dữ liệu | Có cấu trúc, đã làm sạch | Thô, mọi định dạng | Thô + có cấu trúc |
| Schema | **Schema-on-write** | **Schema-on-read** | Schema-on-read + có ràng buộc |
| Lưu trữ | Trong DB chuyên dụng | Object storage (S3) | Object storage + **table format** |
| Transaction | ACID | Không | **ACID** (Delta/Iceberg/Hudi) |
| Chi phí | Cao | Thấp | Thấp |
| Rủi ro | Cứng nhắc, chậm thay đổi | Thành **data swamp** | Ecosystem còn đang chuyển động |
| Đại diện | Snowflake, BigQuery, Redshift | S3 + Parquet | Databricks, Iceberg + Trino |

**Table format** (Apache Iceberg, Delta Lake, Hudi) là mảnh ghép biến lake thành lakehouse: chúng thêm metadata layer cho phép ACID, time travel, schema evolution, và partition evolution trên các file Parquet nằm trong object storage.

## 2. Dimensional modeling — Star schema
```
        dim_date
            │
dim_customer ── fact_sales ── dim_product
            │
        dim_store
```
| Loại bảng | Nội dung | Đặc điểm |
|---|---|---|
| **Fact** | Sự kiện đo được: `amount`, `quantity` + các FK | Rất nhiều dòng, hẹp |
| **Dimension** | Ngữ cảnh: tên, danh mục, vùng | Ít dòng, rộng, **phá chuẩn có chủ đích** |

- **Star schema**: dimension phá chuẩn hoàn toàn — ít JOIN, nhanh nhất, dễ hiểu.
- **Snowflake schema**: dimension được chuẩn hoá — tiết kiệm chỗ, thêm JOIN. Thường không đáng.
- **Grain** (độ hạt) của bảng fact phải được tuyên bố rõ ngay đầu: "một dòng = một dòng hàng trên một hoá đơn". Đây là quyết định thiết kế quan trọng nhất.

## 3. Slowly Changing Dimensions (SCD)
| Type | Cách xử lý khi dimension đổi | Dùng khi |
|---|---|---|
| **Type 1** | Ghi đè | Sửa lỗi chính tả |
| **Type 2** | Thêm dòng mới + `valid_from`/`valid_to`/`is_current` | ✅ Cần lịch sử — mặc định |
| **Type 3** | Thêm cột `previous_value` | Chỉ cần biết giá trị trước đó |

→ Cùng ý tưởng với temporal pattern trong [[Schema Design Patterns]].

## 4. Kiến trúc phân tầng (medallion)
```
Bronze (thô, y hệt nguồn)  →  Silver (đã làm sạch, chuẩn hoá kiểu, dedupe)  →  Gold (mô hình nghiệp vụ, sẵn cho BI)
```
- **Bronze bất biến** — luôn tái tạo lại được Silver/Gold từ nó khi phát hiện lỗi logic.
- Transform bằng SQL có version (dbt), không phải script rời rạc.
- → [[ETL & ELT]]

## 5. Cạm bẫy hay gặp
1. **Data swamp** — đổ mọi thứ vào lake mà không catalog, không owner, không schema ⇒ vài năm sau không ai biết bảng nào tin được.
2. **Không tuyên bố grain của bảng fact** ⇒ tổng bị nhân đôi mà không ai phát hiện.
3. **Chuẩn hoá kho dữ liệu như OLTP** ⇒ JOIN đắt trên tỉ dòng. → [[OLTP vs OLAP]]
4. **Không có SCD** ⇒ báo cáo lịch sử thay đổi khi dimension đổi (doanh thu năm ngoái tự nhiên khác).
5. **Chi phí bùng nổ**: BigQuery/Snowflake tính theo dữ liệu quét ⇒ một `SELECT *` trên bảng lớn có thể tốn hàng trăm đô. Bắt buộc partition + clustering + quota.
6. **Nhiều file nhỏ** trong lake ⇒ metadata overhead khủng khiếp. Compaction định kỳ.
7. **Không có data quality test** ⇒ báo cáo sai âm thầm. dbt tests / Great Expectations.
8. **Không có lineage** ⇒ không trả lời được "con số này đến từ đâu".

## 6. Checklist áp dụng
- [ ] Bảng fact đã tuyên bố grain rõ ràng chưa?
- [ ] Dimension nào cần lịch sử (SCD Type 2)?
- [ ] Lớp Bronze có bất biến và tái tạo được lớp trên không?
- [ ] Bảng lớn đã partition + cluster theo cột hay lọc nhất chưa?
- [ ] Có quota/alert chi phí query chưa?
- [ ] Có data quality test tự động cho bảng quan trọng không?
- [ ] Mỗi dataset có owner và mô tả trong catalog không?
- [ ] Có lineage từ báo cáo ngược về nguồn không?
- [ ] Có job compaction file nhỏ không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| dbt | Transform bằng SQL có version, test, lineage | https://docs.getdbt.com/ |
| Apache Iceberg | Table format mở, chuẩn đang thắng thế | https://iceberg.apache.org/ |
| Delta Lake | Table format của Databricks | https://delta.io/ |
| Trino / Presto | Query engine liên kết nhiều nguồn | https://trino.io/ |
| DuckDB | OLAP nhúng, đọc Parquet cực nhanh | https://duckdb.org/ |
| DataHub / OpenMetadata | Catalog & lineage | https://datahubproject.io/ |

## Tham khảo
- Ralph Kimball — *The Data Warehouse Toolkit*: https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/
- Kimball Group — *Dimensional Modeling Techniques*: https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/
- Databricks — *What is a Lakehouse?*: https://www.databricks.com/glossary/data-lakehouse
- Apache Iceberg — *Table Spec*: https://iceberg.apache.org/spec/
- dbt — *Best Practices*: https://docs.getdbt.com/best-practices

## Liên kết
[[OLTP vs OLAP]] · [[ETL & ELT]] · [[Change Data Capture]] · [[Denormalization]] · [[Database]]
