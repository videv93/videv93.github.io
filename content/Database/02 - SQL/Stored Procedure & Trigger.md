---
tags: [database, sql]
status: growing
---
# Stored Procedure & Trigger

> Đưa logic vào trong database: cực nhanh, cực gần dữ liệu — và cực dễ trở thành logic **vô hình** mà không ai trong team biết là nó tồn tại. Đây là công cụ sắc, dùng có kỷ luật.

## 1. Các dạng code trong DB
| Dạng | Đặc điểm |
|---|---|
| **Function** | Trả về giá trị/bảng, gọi được trong `SELECT` |
| **Procedure** (Postgres 11+) | Gọi bằng `CALL`, **quản lý transaction được** (`COMMIT` bên trong) |
| **Trigger** | Tự động chạy `BEFORE`/`AFTER`/`INSTEAD OF` một sự kiện DML |
| **Event / Scheduled job** | `pg_cron`, MySQL `EVENT` |
| **Rule** (Postgres) | Viết lại query — cổ, tránh dùng |

## 2. Ví dụ
```sql
-- Function: giữ updated_at luôn đúng, không phụ thuộc vào ứng dụng
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_touch BEFORE UPDATE ON "order"
FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- Procedure: xử lý theo lô, commit từng đợt để không giữ khoá quá lâu
CREATE PROCEDURE purge_sessions() LANGUAGE plpgsql AS $$
DECLARE n int;
BEGIN
  LOOP
    DELETE FROM session WHERE ctid IN (
      SELECT ctid FROM session WHERE expires_at < now() LIMIT 10000);
    GET DIAGNOSTICS n = ROW_COUNT;
    COMMIT;                     -- ✅ nhả khoá sau mỗi lô
    EXIT WHEN n = 0;
  END LOOP;
END; $$;
```

## 3. `BEFORE` vs `AFTER`, `ROW` vs `STATEMENT`
| | Dùng để |
|---|---|
| `BEFORE ... FOR EACH ROW` | **Sửa `NEW`** trước khi ghi (normalize, timestamp), huỷ ghi (`RETURN NULL`) |
| `AFTER ... FOR EACH ROW` | Ghi audit, cập nhật bảng khác — dòng đã chắc chắn được ghi |
| `FOR EACH STATEMENT` | Chạy 1 lần cho cả lệnh — rẻ hơn nhiều với batch lớn |
| `INSTEAD OF` (trên view) | Cho phép ghi qua view phức tạp |

## 4. Nên và không nên
| ✅ Hợp lý trong DB | ❌ Nên ở tầng ứng dụng |
|---|---|
| `updated_at`, normalize dữ liệu (lowercase email) | Quy tắc nghiệp vụ phức tạp, hay đổi |
| Audit log không thể bị bỏ qua → [[Schema Design Patterns]] | Gọi API bên ngoài, gửi email |
| Ràng buộc toàn vẹn không diễn đạt được bằng `CHECK` | Orchestration nhiều bước |
| Xử lý theo lô lớn (tránh kéo dữ liệu về client) | Bất cứ thứ gì cần test/deploy theo nhịp của app |
| Cột dẫn xuất → [[Denormalization]] | |

## 5. Cạm bẫy hay gặp
1. **Logic vô hình.** Dev debug 3 ngày vì một trigger không ai nhớ. → Bắt buộc: mọi trigger phải nằm trong migration có version, và được liệt kê trong tài liệu schema.
2. **Trigger gọi trigger** ⇒ đệ quy, hoặc thứ tự thực thi không xác định (Postgres chạy trigger theo **thứ tự tên**).
3. **Trigger làm việc nặng trên `FOR EACH ROW`** ⇒ import 1 triệu dòng thành 1 triệu lần chạy hàm.
4. **Gọi API/gửi mail trong trigger** — nếu transaction rollback thì email đã gửi rồi. Dùng [[Change Data Capture]] hoặc Outbox Pattern.
5. **Trigger tăng nguy cơ [[Deadlock]]** vì nó lấy khoá trên bảng mà lập trình viên không nhìn thấy trong code.
6. **Khó test và version.** Không có unit test cho PL/pgSQL trong CI = quả bom hẹn giờ.
7. **Khó port**: PL/pgSQL, T-SQL, PL/SQL khác nhau hoàn toàn — đây là ràng buộc vendor lock-in thật.
8. **`SECURITY DEFINER` không set `search_path`** ⇒ lỗ hổng leo thang quyền. → [[Database Security]]

## 6. Checklist áp dụng
- [ ] Logic này có **bắt buộc** phải chạy dù ghi từ bất kỳ đường nào không? (Nếu không — để ở app)
- [ ] Trigger đã được khai báo trong migration có version chưa?
- [ ] Đã liệt kê mọi trigger vào tài liệu schema chưa? (`\dS+ table` / `information_schema.triggers`)
- [ ] Có thể dùng `FOR EACH STATEMENT` thay `FOR EACH ROW` không?
- [ ] Trigger có gọi ra ngoài DB (API, mail) không? (Nếu có — bỏ)
- [ ] Có test tự động cho function/trigger này không? (pgTAP)
- [ ] `SECURITY DEFINER` — đã `SET search_path = pg_catalog, public` chưa?
- [ ] Batch job có `COMMIT` theo lô để không giữ khoá dài không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| pgTAP | Unit test cho PostgreSQL | https://pgtap.org/ |
| pg_cron | Chạy job theo lịch trong Postgres | https://github.com/citusdata/pg_cron |
| plprofiler | Profile PL/pgSQL | https://github.com/bigsql/plprofiler |

## Tham khảo
- PostgreSQL Docs — *Triggers*: https://www.postgresql.org/docs/current/triggers.html
- PostgreSQL Docs — *PL/pgSQL*: https://www.postgresql.org/docs/current/plpgsql.html
- PostgreSQL Docs — *Writing SECURITY DEFINER Functions Safely*: https://www.postgresql.org/docs/current/sql-createfunction.html
- MySQL Docs — *Stored Programs and Views*: https://dev.mysql.com/doc/refman/8.0/en/stored-programs-views.html
- Martin Fowler — *Domain Logic and SQL*: https://martinfowler.com/articles/dblogic.html

## Liên kết
[[Denormalization]] · [[Schema Design Patterns]] · [[Deadlock]] · [[Change Data Capture]] · [[Database]]
