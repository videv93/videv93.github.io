---
tags: [database, security, ops]
status: growing
---
# Database Security

> Database là nơi tập trung mọi thứ đáng giá nhất — nên nó là mục tiêu cuối cùng của mọi cuộc tấn công. Bảo mật ở đây là **nhiều lớp**: kiểm soát truy cập, mã hoá, chống injection, và **kiểm toán được**.

## 1. Least privilege — nền tảng
```sql
-- ❌ Ứng dụng chạy bằng superuser (phổ biến đến đáng sợ)
-- ✅ Role riêng cho từng mục đích, quyền tối thiểu
CREATE ROLE app_rw LOGIN PASSWORD '...';
GRANT CONNECT ON DATABASE shop TO app_rw;
GRANT USAGE  ON SCHEMA public TO app_rw;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_rw;
-- ⚠️ Không GRANT quyền DDL cho app: migration dùng role riêng
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_rw;

CREATE ROLE app_ro LOGIN PASSWORD '...';   -- cho báo cáo, replica
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_ro;

REVOKE CREATE ON SCHEMA public FROM PUBLIC;   -- Postgres 15+ đã mặc định
```
Phân tách role: `app_rw` (ứng dụng) · `app_ro` (đọc/báo cáo) · `migrator` (DDL) · `backup` · `monitor` · người thật (qua SSO, không dùng chung tài khoản).

## 2. Row-Level Security — cách ly multi-tenant do DB cưỡng chế
```sql
ALTER TABLE invoice ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice FORCE ROW LEVEL SECURITY;   -- áp dụng cả cho owner

CREATE POLICY tenant_isolation ON invoice
  USING (tenant_id = current_setting('app.tenant_id')::bigint);

-- Ứng dụng set biến này mỗi khi mượn connection từ pool
SET LOCAL app.tenant_id = '42';
```
> RLS biến "nhớ thêm `WHERE tenant_id`" từ **kỷ luật của lập trình viên** thành **ràng buộc của hệ thống**. Một câu query quên điều kiện không còn là sự cố rò rỉ dữ liệu. → [[Schema Design Patterns]]

## 3. SQL Injection
```python
# ❌ Nối chuỗi — lỗ hổng
cur.execute(f"SELECT * FROM users WHERE email = '{email}'")

# ✅ Parameterized query — DB tách rõ lệnh và dữ liệu
cur.execute("SELECT * FROM users WHERE email = %s", (email,))
```
- ORM **không** tự động an toàn: `raw()`, `extra()`, `literal()`, và mọi chỗ nối chuỗi vẫn dính.
- **Tên bảng/cột không tham số hoá được** ⇒ phải whitelist, không bao giờ nội suy trực tiếp từ input.
- Phòng thủ chiều sâu: least privilege (injection vào role read-only ít thiệt hại hơn nhiều), `statement_timeout`, tắt thông báo lỗi chi tiết ra client.

## 4. Mã hoá
| Lớp | Cách | Bảo vệ khỏi |
|---|---|---|
| **In transit** | TLS bắt buộc (`sslmode=verify-full`) | Nghe lén, MITM |
| **At rest** | Mã hoá đĩa/volume (LUKS, EBS encryption, TDE) | Mất đĩa vật lý, snapshot bị lộ |
| **Column-level** | `pgcrypto`, hoặc mã hoá ở tầng ứng dụng | DBA đọc trộm, dump bị lộ |
| **Backup** | Mã hoá file backup, khoá lưu nơi khác | Backup bị lộ → [[Backup & Recovery]] |

⚠️ `sslmode=require` **không** kiểm chứng certificate ⇒ vẫn bị MITM. Dùng `verify-full`.

## 5. Dữ liệu nhạy cảm & quyền riêng tư
- **Mật khẩu**: chỉ lưu hash (Argon2id/bcrypt), không bao giờ mã hoá đối xứng.
- **PII**: liệt kê rõ cột nào là PII; hạn chế cột trả về bằng view.
- **Môi trường staging/dev**: **luôn** mask/ẩn danh dữ liệu khi copy từ production. Đây là con đường rò rỉ dữ liệu bị bỏ qua nhiều nhất.
- **Quyền được lãng quên (GDPR)**: soft delete xung đột với nó — phải có quy trình xoá cứng. → [[Schema Design Patterns]]
- **Audit log** cho mọi truy cập vào dữ liệu nhạy cảm (`pgaudit`).

## 6. Cạm bẫy hay gặp
1. **App chạy bằng superuser / `postgres`.**
2. **Database mở ra Internet** (`0.0.0.0/0`). Đặt trong private subnet, chỉ cho phép qua bastion/VPN/security group.
3. **Mật khẩu trong code hoặc biến môi trường không mã hoá** ⇒ dùng secret manager, xoay vòng định kỳ.
4. **`sslmode=require` thay vì `verify-full`.**
5. **Dump production về máy dev.**
6. **Không có audit log** ⇒ không trả lời được "ai đã đọc dữ liệu này".
7. **Quyền không bị thu hồi** khi người rời team.
8. **`SECURITY DEFINER` function không set `search_path`** ⇒ leo thang quyền. → [[Stored Procedure & Trigger]]
9. **Backup không mã hoá** trong bucket có quyền quá rộng.
10. **Extension không cần thiết** được cài (mở rộng bề mặt tấn công).

## 7. Checklist áp dụng
- [ ] Ứng dụng chạy bằng role không phải superuser, không có quyền DDL?
- [ ] Có role riêng cho migration, backup, monitoring, báo cáo chưa?
- [ ] Database có nằm trong private network không?
- [ ] TLS `verify-full` đã bắt buộc chưa?
- [ ] Mã hoá at-rest đã bật (bao gồm backup và snapshot)?
- [ ] Mọi query đều parameterized? Đã grep tìm chỗ nối chuỗi SQL chưa?
- [ ] Multi-tenant: đã bật RLS chưa, hay chỉ dựa vào code?
- [ ] Dữ liệu staging/dev đã được mask chưa?
- [ ] Có audit log cho truy cập dữ liệu nhạy cảm không?
- [ ] Credential có được xoay vòng định kỳ và lưu trong secret manager không?
- [ ] Quy trình thu hồi quyền khi người rời team đã có chưa?
- [ ] Ai có quyền xoá backup?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| pgaudit | Audit log chi tiết cho Postgres | https://www.pgaudit.org/ |
| pg_anonymizer / postgresql_anonymizer | Mask dữ liệu khi copy sang staging | https://postgresql-anonymizer.readthedocs.io/ |
| pgcrypto | Mã hoá mức cột | https://www.postgresql.org/docs/current/pgcrypto.html |
| HashiCorp Vault | Quản lý & xoay vòng credential động | https://developer.hashicorp.com/vault |
| sqlmap | Kiểm thử injection (chỉ trên hệ thống được phép) | https://sqlmap.org/ |

## Tham khảo
- PostgreSQL Docs — *Client Authentication & Roles*: https://www.postgresql.org/docs/current/user-manag.html
- PostgreSQL Docs — *Row Security Policies*: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- OWASP — *SQL Injection Prevention Cheat Sheet*: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
- OWASP — *Database Security Cheat Sheet*: https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html
- CIS Benchmark for PostgreSQL: https://www.cisecurity.org/benchmark/postgresql

## Liên kết
[[Backup & Recovery]] · [[Schema Design Patterns]] · [[Stored Procedure & Trigger]] · [[SQL Fundamentals]] · [[Database]]
