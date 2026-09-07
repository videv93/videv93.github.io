---
tags: [database, modeling, integrity]
status: evergreen
---
# Keys & Constraints

> Ràng buộc là **luật nghiệp vụ được database cưỡng chế**. Luật nằm trong code chỉ đúng khi mọi đường ghi đều đi qua code đó — điều không bao giờ xảy ra lâu dài (script vá dữ liệu, job nền, service khác, DBA gõ tay lúc 2h sáng).

## 1. Các loại khoá
| Loại | Vai trò | Lưu ý |
|---|---|---|
| **Primary key** | Định danh duy nhất một dòng | Không NULL, **không bao giờ đổi** |
| **Natural key** | Khoá từ nghiệp vụ (email, SKU, CCCD) | Đặt `UNIQUE`, **đừng** làm PK — nghiệp vụ đổi thì FK vỡ |
| **Surrogate key** | Khoá nhân tạo (`bigint`, UUID) | Mặc định nên dùng làm PK |
| **Composite key** | PK ghép nhiều cột | Hợp lý cho bảng nối (`order_item`) |
| **Foreign key** | Trỏ tới PK bảng khác | Cưỡng chế referential integrity |

### Chọn kiểu cho surrogate PK
| Kiểu | Ưu | Nhược |
|---|---|---|
| `BIGINT` identity/serial | Nhỏ (8B), tăng dần, index đẹp | Lộ quy mô nghiệp vụ; khó merge đa nguồn |
| `UUIDv4` | Sinh ở client, không đụng độ | 16B, **ngẫu nhiên** ⇒ page split, phình index |
| `UUIDv7` / ULID | Sinh ở client **và** tăng dần theo thời gian | Chuẩn còn mới, cần thư viện |
| Snowflake ID | Tăng dần, có thông tin shard | Cần dịch vụ sinh ID |

> Trong InnoDB (clustered index), PK ngẫu nhiên là **rất** đắt vì nó nằm trong mọi secondary index. → [[Storage Engines]], [[MySQL]]

## 2. Các ràng buộc
| Ràng buộc | Đảm bảo | Ví dụ |
|---|---|---|
| `NOT NULL` | Bắt buộc có giá trị | `email NOT NULL` |
| `UNIQUE` | Không trùng | `UNIQUE (tenant_id, email)` |
| `CHECK` | Điều kiện logic | `CHECK (quantity > 0)`, `CHECK (valid_to > valid_from)` |
| `FOREIGN KEY` | Tham chiếu tồn tại | `REFERENCES customer(id)` |
| `DEFAULT` | Giá trị mặc định | `created_at timestamptz DEFAULT now()` |
| `EXCLUDE` (Postgres) | Không chồng lấn khoảng | Chống double-booking phòng |
| `GENERATED` | Cột tính tự động | `total GENERATED ALWAYS AS (qty*price) STORED` |

```sql
-- Chống đặt trùng phòng bằng EXCLUDE + GiST (tính năng bị đánh giá thấp nhất của Postgres)
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE booking ADD CONSTRAINT no_overlap
  EXCLUDE USING gist (room_id WITH =, during WITH &&);
```

## 3. Hành vi FK khi xoá/sửa
| Hành vi | Ý nghĩa | Dùng khi |
|---|---|---|
| `RESTRICT` / `NO ACTION` | Cấm xoá cha khi còn con | **Mặc định an toàn** |
| `CASCADE` | Xoá cha ⇒ xoá con | Quan hệ sở hữu thật sự (`order` → `order_item`) |
| `SET NULL` | Con trỏ về NULL | Quan hệ tuỳ chọn (`post.author_id`) |
| `SET DEFAULT` | Về giá trị mặc định | Hiếm dùng |

⚠️ `ON DELETE CASCADE` xoá âm thầm theo dây chuyền. Chỉ dùng khi con **không thể tồn tại độc lập**.

## 4. Chọn kiểu dữ liệu đúng
| Nhu cầu | ✅ Dùng | ❌ Tránh |
|---|---|---|
| Tiền | `NUMERIC(19,4)` (+ cột currency) | `FLOAT`, `DOUBLE` — sai số làm lệch sổ sách |
| Thời điểm | `TIMESTAMPTZ` (lưu UTC) | `TIMESTAMP` không timezone, `VARCHAR` |
| Chuỗi | `TEXT` (Postgres không phạt độ dài) + `CHECK (length(x) <= n)` | `CHAR(n)` (đệm khoảng trắng) |
| Đúng/sai | `BOOLEAN` | `CHAR(1) 'Y'/'N'`, `INT 0/1` |
| Tập giá trị cố định | `ENUM` hoặc `CHECK IN (...)` | chuỗi tự do |
| Dữ liệu bán cấu trúc | `JSONB` (có index được) | `JSON`/`TEXT` |
| IP, MAC, khoảng | `INET`, `MACADDR`, `TSTZRANGE` | chuỗi |
| Số lượng lớn | `BIGINT` | `INT` — 2.1 tỉ đến nhanh hơn bạn nghĩ |

## 5. Cạm bẫy hay gặp
1. **Bỏ FK "vì hiệu năng"** — chi phí FK rất nhỏ so với chi phí dữ liệu mồ côi. Nếu thật sự bỏ, phải có job phát hiện mồ côi.
2. **Quên index cho cột FK.** Postgres **không** tự tạo index cho FK ⇒ mỗi lần xoá cha là một seq scan bảng con. → [[Index Fundamentals]]
3. **Dùng email làm PK.** Người ta đổi email.
4. **`UNIQUE` một cột trong hệ multi-tenant** — phải là `UNIQUE (tenant_id, email)`.
5. **NULL và UNIQUE**: nhiều NULL **không** bị coi là trùng (chuẩn SQL) ⇒ soft delete + unique thường cần **partial unique index**:
   ```sql
   CREATE UNIQUE INDEX ON users (email) WHERE deleted_at IS NULL;
   ```
6. **`INT` cho PK bảng lớn** — tràn ở 2.147.483.647 và việc sửa kiểu lúc production là một đêm dài.
7. **Ràng buộc chỉ nằm ở tầng ORM.** Migration, script, và service khác không biết đến nó.

## 6. Checklist áp dụng
- [ ] Mọi bảng có PK, và PK là surrogate không đổi?
- [ ] Mọi natural key có `UNIQUE`?
- [ ] Mọi quan hệ có FK khai báo thật trong DB?
- [ ] Mọi cột FK có index?
- [ ] Hành vi `ON DELETE` của từng FK là có chủ đích, không phải mặc định copy-paste?
- [ ] Cột tiền dùng `NUMERIC`, cột thời gian dùng `TIMESTAMPTZ`?
- [ ] Đã đặt `CHECK` cho các bất biến nghiệp vụ (số lượng > 0, ngày kết thúc > ngày bắt đầu)?
- [ ] PK kiểu `INT` — có bảng nào sắp chạm 2 tỉ không?

## Tham khảo
- PostgreSQL Docs — *Constraints*: https://www.postgresql.org/docs/current/ddl-constraints.html
- PostgreSQL Docs — *Data Types*: https://www.postgresql.org/docs/current/datatype.html
- MySQL Docs — *FOREIGN KEY Constraints*: https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html
- RFC 9562 — *UUID versions 6, 7, 8*: https://www.rfc-editor.org/rfc/rfc9562.html
- *SQL Antipatterns* — Bill Karwin (chương về keys & EAV): https://pragprog.com/titles/bksqla/sql-antipatterns/

## Liên kết
[[Relational Model]] · [[ERD & Data Modeling]] · [[Normalization]] · [[Index Fundamentals]] · [[Database]]
