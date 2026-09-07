---
tags: [database, modeling, patterns]
status: growing
---
# Schema Design Patterns

> Các mẫu thiết kế lặp đi lặp lại trong mọi hệ thống thật — và cái giá của từng mẫu. Biết trước để không phát minh lại (thường là phát minh tệ hơn).

## 1. Soft Delete
Đánh dấu xoá thay vì xoá thật.
```sql
ALTER TABLE users ADD COLUMN deleted_at timestamptz;
CREATE UNIQUE INDEX users_email_live ON users (email) WHERE deleted_at IS NULL;
```
| ✅ Được | ❌ Mất |
|---|---|
| Khôi phục được, giữ lịch sử, FK không vỡ | **Mọi** query phải nhớ `WHERE deleted_at IS NULL` |
| | Unique constraint phải là partial index |
| | Bảng phình mãi, index kém chọn lọc |
| | Xung đột với quyền "được lãng quên" (GDPR) |

> Cân nhắc thay bằng **bảng lưu trữ** (`users_archived`) — chuyển dòng sang rồi xoá thật. Query hằng ngày sạch, dữ liệu vẫn còn.

## 2. Audit Log / History
| Cách | Mô tả | Dùng khi |
|---|---|---|
| Cột `created_at/updated_at/updated_by` | Rẻ nhất | Luôn luôn nên có |
| Bảng shadow `<table>_history` | Trigger copy dòng cũ mỗi lần UPDATE | Cần lịch sử đầy đủ từng cột |
| Bảng event chung `audit_log(table, row_id, action, diff JSONB, actor, at)` | Một bảng cho cả hệ thống | Compliance, điều tra |
| Đọc từ WAL | Không đụng đường ghi | → [[Change Data Capture]] |
| Sự kiện là nguồn chân lý | → [[Event Sourcing & CQRS]] | Nghiệp vụ vốn là dòng sự kiện |

## 3. Temporal / Slowly Changing Data
Lưu giá trị "đúng trong khoảng thời gian nào":
```sql
CREATE TABLE price_history (
  product_id  bigint REFERENCES product(id),
  price       numeric(19,4) NOT NULL,
  valid       tstzrange NOT NULL,
  EXCLUDE USING gist (product_id WITH =, valid WITH &&)  -- không chồng lấn
);
SELECT price FROM price_history
WHERE product_id = 42 AND valid @> '2026-01-15'::timestamptz;
```
Trong kho dữ liệu, đây là **SCD Type 2**. → [[Data Warehouse & Lakehouse]]

## 4. Multi-tenancy
| Mô hình | Cách ly | Chi phí vận hành | Dùng khi |
|---|---|---|---|
| `tenant_id` trên mọi bảng | Thấp (dựa vào query đúng) | Thấp nhất | SaaS nhiều tenant nhỏ |
| Schema riêng mỗi tenant | Trung bình | Migration ×N schema | Vài trăm tenant |
| Database riêng mỗi tenant | Cao | Cao nhất | Enterprise, yêu cầu compliance |

Với mô hình `tenant_id`: bật **Row-Level Security** để DB tự chặn, đừng tin code. → [[Database Security]]

## 5. Trạng thái & State Machine
❌ `is_active`, `is_paid`, `is_cancelled`, `is_refunded` — 16 tổ hợp, phần lớn vô nghĩa.
✅ Một cột `status` + bảng chuyển trạng thái:
```sql
CREATE TABLE order_status_transition (
  order_id bigint, from_status text, to_status text,
  changed_by bigint, changed_at timestamptz DEFAULT now()
);
ALTER TABLE "order" ADD CONSTRAINT valid_status
  CHECK (status IN ('pending','paid','shipped','delivered','cancelled'));
```

## 6. Các anti-pattern kinh điển
| Tên | Vấn đề | Thay bằng |
|---|---|---|
| **EAV** (Entity-Attribute-Value) | Mất kiểu, mất ràng buộc, query địa ngục | `JSONB` có index, hoặc bảng riêng cho từng loại |
| **Polymorphic FK** (`owner_type` + `owner_id`) | Không khai báo FK được | Bảng nối riêng cho từng loại cha |
| **Comma-separated list** | Vi phạm 1NF | Bảng nối |
| **Bảng `settings` một dòng khổng lồ** | Mỗi setting mới là một `ALTER TABLE` | `key/value` có typing, hoặc JSONB |
| **Adjacency list cho cây sâu** | Đệ quy tốn kém | `ltree`, closure table, hoặc recursive CTE → [[Subquery & CTE]] |
| **Cột `data JSONB` chứa tất cả** | Schema biến mất | Cột thật cho thứ hay query, JSONB cho phần đuôi |

## 7. Checklist áp dụng
- [ ] Mỗi bảng có `created_at` / `updated_at`?
- [ ] Dùng soft delete? Đã có partial unique index và quy ước lọc chưa?
- [ ] Dữ liệu nhạy cảm (tiền, quyền) có audit trail chưa?
- [ ] Giá trị đổi theo thời gian — có lưu lịch sử không?
- [ ] Multi-tenant: đã bật RLS hay chỉ dựa vào `WHERE tenant_id` trong code?
- [ ] Có cột `is_*` boolean nào thực ra là một state machine không?
- [ ] Có anti-pattern nào ở mục 6 trong schema hiện tại không?

## Tham khảo
- Bill Karwin — *SQL Antipatterns*: https://pragprog.com/titles/bksqla/sql-antipatterns/
- Martin Fowler — *Temporal Patterns*: https://martinfowler.com/eaaDev/timeNarrative.html
- PostgreSQL Docs — *Row Security Policies*: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- PostgreSQL Docs — *Range Types & Exclusion Constraints*: https://www.postgresql.org/docs/current/rangetypes.html
- Microsoft — *Multi-tenant SaaS database tenancy patterns*: https://learn.microsoft.com/en-us/azure/azure-sql/database/saas-tenancy-app-design-patterns

## Liên kết
[[ERD & Data Modeling]] · [[Keys & Constraints]] · [[Denormalization]] · [[Event Sourcing & CQRS]] · [[Database]]
