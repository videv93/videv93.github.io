---
tags: [database, tool, workflow]
status: growing
---
# Database Tooling

> Bộ công cụ quanh database: ORM, migration, client, benchmark, local dev. Chọn đúng công cụ tiết kiệm nhiều thời gian hơn hầu hết các tối ưu vi mô.

## 1. ORM & query builder
| Tầng | Ví dụ | Đánh đổi |
|---|---|---|
| **Driver thuần** | psycopg, pgx, mysql2 | Kiểm soát tối đa, code lặp nhiều |
| **Query builder** | Knex, jOOQ, SQLAlchemy Core, sqlc | ✅ Cân bằng tốt: type-safe, SQL vẫn nhìn thấy |
| **ORM đầy đủ** | Django ORM, ActiveRecord, Hibernate, Prisma, SQLAlchemy ORM | Năng suất cao, **giấu SQL** ⇒ dễ sinh [[N+1 Query Problem]] |

**Quy tắc sống chung với ORM:**
1. **Luôn log SQL thật** trong môi trường dev.
2. ORM cho CRUD, **SQL thuần cho query phức tạp/report**. Đừng ép ORM diễn đạt window function.
3. Biết cách chạy raw query — và luôn parameterized. → [[Database Security]]
4. Đọc `EXPLAIN` của SQL do ORM sinh ra, không phải SQL bạn tưởng tượng.
5. Đặt giới hạn số query cho endpoint trong test tích hợp.

`sqlc` (Go), `jOOQ` (Java), `Kysely` (TS) đại diện cho hướng ngược lại: **viết SQL, sinh code type-safe từ nó** — thường là điểm cân bằng tốt nhất cho hệ thống nặng dữ liệu.

## 2. Migration
| Công cụ | Ngữ cảnh |
|---|---|
| Flyway | JVM, SQL thuần, đơn giản và ổn định |
| Liquibase | JVM, khai báo XML/YAML/SQL |
| Alembic | Python/SQLAlchemy |
| Django migrations / ActiveRecord | Gắn với framework |
| golang-migrate | Go, nhẹ |
| **Atlas** | Khai báo + **linter phát hiện thao tác nguy hiểm** |
| **squawk** | Chỉ là linter — cắm vào CI để chặn migration khoá bảng |
| pgroll | Zero-downtime cho Postgres, versioned schema |

**Nguyên tắc:** migration nằm trong git, chạy tự động trong CI/CD, **không bao giờ sửa migration đã merge**, và luôn chạy qua kết nối trực tiếp (không qua pooler transaction mode). → [[Zero-downtime Migration]], [[Connection Pooling]]

## 3. Client & GUI
| Tên | Đặc điểm |
|---|---|
| `psql` / `mysql` | ✅ CLI gốc — nhanh nhất, luôn có sẵn, học nó trước |
| DBeaver | Đa DB, miễn phí, ERD, so sánh schema |
| TablePlus | Nhẹ, đẹp (macOS) |
| pgAdmin | Chuyên Postgres |
| DataGrip | Của JetBrains, refactor & autocomplete tốt nhất |
| pgcli / mycli | CLI có autocomplete, syntax highlight |
| Beekeeper Studio | Mã nguồn mở, gọn |

## 4. Local development & test
| Nhu cầu | Công cụ |
|---|---|
| DB local giống production | Docker Compose (cùng **major version** với production) |
| DB trong test tích hợp | **Testcontainers** — DB thật, tự dọn |
| Test SQL/PLpgSQL | pgTAP |
| Sinh dữ liệu giả | Faker, `generate_series()`, pgbench, mockaroo |
| Mask dữ liệu production cho staging | postgresql_anonymizer |
| Nhánh DB cho mỗi PR | Neon, Supabase branching |

```sql
-- Sinh 10 triệu dòng test — thấy được bài học index thật sự
INSERT INTO metric (ts, device_id, value)
SELECT now() - (i || ' seconds')::interval,
       (random()*1000)::int, random()*100
FROM generate_series(1, 10000000) i;
```
> **Dùng SQLite/H2 cho test còn Postgres cho production là sai lầm phổ biến.** Hành vi khác nhau ở đúng những chỗ quan trọng: kiểu dữ liệu, isolation, constraint. Testcontainers giải quyết triệt để.

## 5. Benchmark & phân tích
| Tên | Dùng để |
|---|---|
| pgbench | Benchmark Postgres, viết script tuỳ chỉnh được |
| sysbench | Benchmark MySQL/Postgres |
| pgbadger | Log Postgres → báo cáo HTML |
| pt-query-digest | Slow log MySQL → xếp hạng query |
| explain.dalibo.com | Trực quan hoá plan → [[Execution Plan & EXPLAIN]] |
| HypoPG | Thử index giả trước khi tạo thật → [[Index Fundamentals]] |

## 6. Cạm bẫy hay gặp
1. **Test trên DB khác production.**
2. **Không log SQL do ORM sinh ra.**
3. **Sửa migration đã merge** ⇒ môi trường của mọi người phân kỳ.
4. **Không có linter migration trong CI** ⇒ `CREATE INDEX` không `CONCURRENTLY` lọt lên production.
5. **Dữ liệu test quá nhỏ** ⇒ mọi bài học hiệu năng vô hình.
6. **GUI client kết nối thẳng production** với quyền ghi ⇒ tai nạn. Dùng role read-only mặc định.
7. **Dump production về máy dev.** → [[Database Security]]
8. **Benchmark bằng dữ liệu phân phối đều** trong khi dữ liệu thật lệch.

## 7. Checklist áp dụng
- [ ] DB local/test cùng loại và cùng major version với production?
- [ ] Test tích hợp dùng Testcontainers (DB thật) chưa?
- [ ] SQL do ORM sinh có được log trong dev không?
- [ ] Migration nằm trong git, chạy trong CI/CD, có linter chưa?
- [ ] Có bộ dữ liệu test đủ lớn (≥ 1 triệu dòng) không?
- [ ] Kết nối GUI tới production mặc định là read-only chứ?
- [ ] Dữ liệu staging đã mask chưa?
- [ ] Có test giới hạn số query cho endpoint nóng không?

## Tham khảo
- Testcontainers: https://testcontainers.com/
- Atlas — *Migration linting*: https://atlasgo.io/versioned/lint
- Squawk — rule migration nguy hiểm: https://squawkhq.com/docs/
- sqlc — sinh code type-safe từ SQL: https://sqlc.dev/
- PostgreSQL Docs — *pgbench*: https://www.postgresql.org/docs/current/pgbench.html

## Liên kết
[[N+1 Query Problem]] · [[Zero-downtime Migration]] · [[Execution Plan & EXPLAIN]] · [[PostgreSQL]] · [[MySQL]] · [[Database]]
