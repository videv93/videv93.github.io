---
tags: [database, modeling]
status: evergreen
---
# Normalization

> Chuẩn hoá không phải nghi thức học thuật. Nó là quy trình **loại bỏ các bất thường khi thêm/sửa/xoá** bằng cách đảm bảo mỗi dữ kiện chỉ được lưu **một chỗ**. Cùng một tinh thần với nguyên tắc "khử trùng lặp bằng link" trong [[Knowledge Seed Playbook]].

## 1. Ba bất thường mà chuẩn hoá chữa
| Anomaly | Biểu hiện |
|---|---|
| **Insert** | Không thêm được sản phẩm mới vì chưa có đơn hàng nào chứa nó |
| **Update** | Đổi tên nhà cung cấp phải sửa 40.000 dòng; sót một dòng ⇒ dữ liệu mâu thuẫn |
| **Delete** | Xoá đơn hàng cuối cùng ⇒ mất luôn thông tin khách hàng |

## 2. Các dạng chuẩn

### 1NF — Nguyên tử
- Mỗi ô chứa **một giá trị**, không phải danh sách; không có nhóm cột lặp (`phone1`, `phone2`, `phone3`).
- ❌ `tags = "sql,index,perf"` → ✅ bảng `post_tag`.

### 2NF — 1NF + không phụ thuộc bộ phận
- Mọi cột không khoá phải phụ thuộc vào **toàn bộ** PK ghép, không phải một phần.
- ❌ `order_item(order_id, product_id, quantity, product_name)` — `product_name` chỉ phụ thuộc `product_id` → tách sang `product`.

### 3NF — 2NF + không phụ thuộc bắc cầu
- Cột không khoá không được phụ thuộc vào cột không khoá khác.
- ❌ `employee(id, dept_id, dept_name)` — `dept_name` phụ thuộc `dept_id` → tách sang `department`.
- 📌 **3NF là điểm dừng mặc định cho OLTP.**

### BCNF — 3NF chặt hơn
- Mọi determinant đều phải là candidate key. Xử lý ca hiếm: PK ghép chồng lấn nhau.

### 4NF / 5NF
- 4NF: loại phụ thuộc đa trị độc lập (một giảng viên dạy nhiều môn *và* nói nhiều ngôn ngữ ⇒ hai bảng, không phải tích Descartes).
- 5NF: hiếm gặp trong thực tế OLTP.

> Câu thần chú: **"the key, the whole key, and nothing but the key — so help me Codd."**
> (1NF: *the key* · 2NF: *the whole key* · 3NF: *nothing but the key*)

## 3. Ví dụ chuẩn hoá xuyên suốt
```sql
-- ❌ 0NF: một bảng chứa tất cả
orders(id, customer_name, customer_email, customer_city,
       products "iPhone,Case", total)

-- ✅ 3NF
customer(id, name, email UNIQUE, city_id → city)
city(id, name, country_id → country)
"order"(id, customer_id → customer, ordered_at, status,
        shipping_address_id → address)
order_item(order_id, product_id, quantity,
           unit_price,      -- ✅ đóng băng giá tại thời điểm mua
           PRIMARY KEY (order_id, product_id))
product(id, sku UNIQUE, name, current_price)
```
> `unit_price` trông như trùng lặp với `product.current_price` — **không phải**. Nó là một dữ kiện *khác*: "giá tại thời điểm giao dịch". Chuẩn hoá cấm lưu trùng **cùng một dữ kiện**, không cấm lưu hai dữ kiện khác nhau.

## 4. Cạm bẫy hay gặp
1. **Chuẩn hoá quá đà**: tách bảng `country` chỉ để lưu 3 quốc gia ⇒ thêm JOIN mà không giảm bất thường nào.
2. **Nhầm "giá trị lịch sử" với "trùng lặp"** — xem ví dụ trên. Đây là hiểu lầm phổ biến nhất.
3. **Bỏ chuẩn hoá vì "JOIN chậm"** trước khi đo. JOIN trên khoá có index rất rẻ; hãy đo bằng [[Execution Plan & EXPLAIN]] rồi mới quyết định [[Denormalization]].
4. **Chuẩn hoá cho OLAP**: kho dữ liệu cố tình dùng star schema phá chuẩn. → [[Data Warehouse & Lakehouse]]
5. **Chuẩn hoá enum quá sớm**: `status` với 4 giá trị cố định dùng `CHECK` hoặc enum type, không cần bảng riêng.

## 5. Checklist áp dụng
- [ ] Có cột nào chứa danh sách phân tách bằng dấu phẩy không?
- [ ] Có nhóm cột lặp kiểu `addr1/addr2/addr3` không?
- [ ] Với mỗi bảng: mọi cột đều mô tả **chính** thực thể của bảng đó?
- [ ] Nếu sửa một dữ kiện, tôi phải `UPDATE` bao nhiêu dòng? (>1 là dấu hiệu chưa chuẩn hoá)
- [ ] Mọi chỗ trông "trùng lặp" — tôi đã kiểm tra nó có phải giá trị lịch sử không?
- [ ] Đã đạt 3NF trước khi cân nhắc phá chuẩn chưa?

## Tham khảo
- E.F. Codd — *Further Normalization of the Data Base Relational Model* (1971)
- C.J. Date — *Database Design and Relational Theory: Normal Forms and All That Jazz*
- Microsoft — *Description of the database normalization basics*: https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description
- Wikipedia — *Database normalization* (tổng quan các dạng chuẩn): https://en.wikipedia.org/wiki/Database_normalization
- PostgreSQL Docs — *Constraints*: https://www.postgresql.org/docs/current/ddl-constraints.html

## Liên kết
[[Denormalization]] · [[ERD & Data Modeling]] · [[Keys & Constraints]] · [[Relational Model]] · [[Database]]
