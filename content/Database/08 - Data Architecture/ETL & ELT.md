---
tags: [database, architecture, pipeline]
status: growing
---
# ETL & ELT

> Đưa dữ liệu từ nguồn vào kho. Khác biệt nằm ở **thứ tự chữ T** — và thứ tự đó thay đổi toàn bộ kiến trúc pipeline.

## 1. ETL vs ELT
| | **ETL** (Extract → Transform → Load) | **ELT** (Extract → Load → Transform) |
|---|---|---|
| Transform ở đâu | Máy trung gian (Spark, Informatica) | **Trong warehouse**, bằng SQL |
| Dữ liệu thô | Không lưu | **Lưu lại** (lớp Bronze) |
| Đổi logic transform | Phải extract lại từ nguồn | **Chạy lại SQL** trên dữ liệu đã có |
| Kỹ năng cần | Kỹ sư dữ liệu chuyên sâu | SQL — nhiều người làm được |
| Chi phí | Hạ tầng transform riêng | Tính vào compute của warehouse |
| Thời kỳ | Khi lưu trữ đắt | Khi lưu trữ rẻ (hiện nay) |

> **ELT thắng thế** vì object storage rẻ và warehouse mạnh. Giữ dữ liệu thô nghĩa là mọi lỗi logic transform đều **sửa được bằng cách chạy lại**, không phải extract lại. → [[Data Warehouse & Lakehouse]]

## 2. Extract — bốn chiến lược
| Chiến lược | Cơ chế | Ưu / Nhược |
|---|---|---|
| **Full snapshot** | Copy toàn bộ bảng mỗi lần | Đơn giản, đúng chắc chắn / Đắt, chậm |
| **Incremental theo timestamp** | `WHERE updated_at > last_run` | Rẻ / **Bỏ sót dòng bị xoá cứng**; lệch đồng hồ; cần index |
| **Incremental theo id tăng dần** | `WHERE id > last_id` | Rẻ / Không bắt được `UPDATE` |
| **CDC** (log-based) | Đọc WAL/binlog | Gần thời gian thực, bắt cả DELETE, **không tải nguồn** / Phức tạp hơn → [[Change Data Capture]] |

⚠️ Incremental theo timestamp là lựa chọn mặc định của rất nhiều team — và nó **âm thầm bỏ sót dữ liệu xoá**. Phải có full refresh định kỳ để đối soát.

## 3. Nguyên tắc thiết kế pipeline
1. **Idempotent** — chạy lại cùng một khoảng phải cho cùng kết quả. Dùng `MERGE`/upsert theo khoá, không `INSERT` mù.
2. **Có thể backfill** — tham số hoá theo khoảng thời gian, chạy lại quá khứ được.
3. **Chia theo partition thời gian** — mỗi lần chạy xử lý một cửa sổ độc lập.
4. **Xử lý dữ liệu đến muộn** — cửa sổ nhìn lại (lookback window) vài giờ/ngày.
5. **Không transform trong lúc extract** — giữ Bronze thô, y hệt nguồn.
6. **Fail loud** — pipeline lỗi phải báo động, không được lặng lẽ ghi 0 dòng.
7. **Kiểm thử dữ liệu**, không chỉ kiểm thử code: not-null, unique, khoảng giá trị, độ tươi, số dòng so với hôm qua.

## 4. Orchestration
| Công cụ | Đặc điểm |
|---|---|
| **Airflow** | Chuẩn de-facto, DAG bằng Python, ecosystem lớn nhất |
| **Dagster** | Tư duy **asset-based**, lineage và data quality là công dân hạng nhất |
| **Prefect** | Nhẹ, pythonic, dễ bắt đầu |
| **dbt** | Không phải orchestrator — là lớp **T** trong ELT (SQL + test + docs + lineage) |
| **Airbyte / Fivetran** | Lớp **E** và **L** — connector dựng sẵn cho hàng trăm nguồn |

Kết hợp phổ biến nhất hiện nay: **Airbyte/Fivetran (EL) → dbt (T) → Airflow/Dagster (orchestration)**.

## 5. Cạm bẫy hay gặp
1. **Pipeline không idempotent** ⇒ chạy lại là nhân đôi dữ liệu.
2. **Incremental bỏ sót DELETE** — xem mục 2.
3. **Không xử lý schema drift** ⇒ nguồn thêm cột, pipeline vỡ (hoặc âm thầm bỏ cột).
4. **Múi giờ lẫn lộn** giữa nguồn, pipeline và warehouse ⇒ mất/nhân đôi dữ liệu ở ranh giới ngày. Chuẩn hoá về UTC ngay ở Bronze.
5. **Extract trực tiếp từ primary OLTP** ⇒ ảnh hưởng người dùng thật. Đọc từ replica hoặc dùng CDC.
6. **Không có data quality test** ⇒ báo cáo sai mà không ai biết trong nhiều tháng.
7. **Không có alert độ tươi (freshness)** ⇒ pipeline chết 3 ngày, dashboard vẫn hiển thị số cũ như thật.
8. **Hardcode ngày chạy** thay vì tham số ⇒ không backfill được.
9. **Transform trong extract** ⇒ mất khả năng sửa lỗi bằng cách chạy lại.

## 6. Checklist áp dụng
- [ ] Pipeline có idempotent không? (chạy lại 2 lần cho kết quả giống nhau?)
- [ ] Có backfill được một khoảng bất kỳ trong quá khứ không?
- [ ] Chiến lược extract có bắt được `DELETE` không?
- [ ] Có full refresh định kỳ để đối soát với incremental không?
- [ ] Schema drift được xử lý thế nào?
- [ ] Mọi timestamp đã chuẩn hoá UTC ở lớp Bronze chưa?
- [ ] Extract có đọc từ replica/CDC thay vì primary không?
- [ ] Có test not-null / unique / freshness / row-count anomaly chưa?
- [ ] Có alert khi pipeline fail **và** khi dữ liệu quá cũ chưa?
- [ ] Có lineage từ bảng đích ngược về nguồn không?

## Tham khảo
- dbt — *Best Practices*: https://docs.getdbt.com/best-practices
- Airflow — *Best Practices*: https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html
- Dagster — *Software-defined assets*: https://docs.dagster.io/concepts/assets/software-defined-assets
- Airbyte — *Incremental sync modes*: https://docs.airbyte.com/using-airbyte/core-concepts/sync-modes/
- *Fundamentals of Data Engineering* — Reis & Housley (O'Reilly)

## Liên kết
[[Data Warehouse & Lakehouse]] · [[Change Data Capture]] · [[OLTP vs OLAP]] · [[Replication]] · [[Database]]
