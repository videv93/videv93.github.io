---
tags: [database, modeling]
status: evergreen
---
# ERD & Data Modeling

> Data model là **bản dịch** từ ngôn ngữ nghiệp vụ sang ngôn ngữ database. Sai ở đây thì mọi tầng phía trên đều phải bù trừ bằng code xấu — và schema là thứ khó sửa nhất trong hệ thống.

## 1. Ba tầng mô hình
| Tầng | Trả lời câu hỏi | Sản phẩm | Người đọc |
|---|---|---|---|
| **Conceptual** | Nghiệp vụ có những *thứ* gì và liên hệ ra sao? | ERD thực thể trần, không có kiểu dữ liệu | Business |
| **Logical** | Bảng, cột, khoá, quan hệ | ERD đầy đủ, độc lập với DBMS | Dev + Business |
| **Physical** | Kiểu dữ liệu, index, partition, tablespace | DDL chạy được | DBA + Dev |

Đi tuần tự. Nhảy thẳng vào `CREATE TABLE` là cách chắc chắn nhất để bỏ sót một thực thể.

## 2. Ký hiệu Crow's Foot
```
──||     đúng một (one, mandatory)
──o|     không hoặc một (zero or one)
──|<     một hoặc nhiều (one or many)
──o<     không hoặc nhiều (zero or many)
```
Đọc quan hệ **theo cả hai chiều**, thành câu tiếng Việt:
> "Một `order` thuộc về **đúng một** `customer`. Một `customer` có **không hoặc nhiều** `order`."

Nếu câu đó nghe sai với người làm nghiệp vụ, model sai — không phải người ta nói sai.

## 3. Ba loại quan hệ và cách hiện thực
| Quan hệ | Cách làm | Ví dụ |
|---|---|---|
| **1–1** | FK + `UNIQUE` ở bên phụ thuộc; hoặc gộp bảng | `user` ↔ `user_profile` |
| **1–N** | FK ở bên "nhiều" | `customer` → `order` |
| **N–N** | **Bảng nối (junction table)** với PK ghép | `order` ↔ `product` qua `order_item` |

> Bảng nối gần như luôn có thuộc tính riêng (`quantity`, `unit_price`, `created_at`). Khi nó có thuộc tính, nó đã là **một thực thể thật** — hãy đặt tên nghiệp vụ (`order_item`), đừng đặt `order_product`.

## 4. Quy trình dựng model (7 bước)
1. **Thu thập danh từ** từ mô tả nghiệp vụ → ứng viên thực thể.
2. **Thu thập động từ** → ứng viên quan hệ.
3. Xác định **thuộc tính** cho từng thực thể.
4. Chọn **khoá** cho từng thực thể → [[Keys & Constraints]].
5. Xác định **cardinality & optionality** của từng quan hệ.
6. **Chuẩn hoá** tới 3NF → [[Normalization]].
7. Chỉ khi đó mới cân nhắc phá chuẩn có chủ đích → [[Denormalization]].

## 5. Điểm dễ mô hình sai
| Tình huống | Sai | Đúng |
|---|---|---|
| Địa chỉ | Cột `address TEXT` trên `user` | Bảng `address` riêng (user có nhiều địa chỉ, và địa chỉ giao hàng phải "đóng băng" trên đơn) |
| Giá sản phẩm trên đơn | JOIN lấy `product.price` | **Copy** `unit_price` vào `order_item` — giá đổi không được đổi lịch sử |
| Trạng thái | Cột `is_active`, `is_deleted`, `is_banned` | Một cột `status` + bảng lịch sử chuyển trạng thái |
| Tiền tệ | `amount FLOAT` | `amount NUMERIC(19,4)` + `currency CHAR(3)` |
| Đa vai trò (user vừa buyer vừa seller) | Hai bảng trùng lặp | Một `user` + bảng `user_role` |
| Dữ liệu thay đổi theo thời gian | Ghi đè | Bảng temporal (`valid_from`, `valid_to`) → [[Schema Design Patterns]] |

## 6. Cạm bẫy hay gặp
1. **Mô hình theo màn hình UI**, không theo nghiệp vụ. UI đổi mỗi quý; nghiệp vụ thì không.
2. **Quên chiều thời gian.** "Giá hiện tại" và "giá lúc đặt hàng" là hai thứ khác nhau. Đây là lỗi tốn kém nhất và hay gặp nhất.
3. **Dùng khoá nghiệp vụ làm PK** (email, mã số thuế) — chúng đổi, và khi đổi thì FK vỡ. Dùng surrogate key.
4. **Không đặt tên nhất quán** (`userId`, `user_id`, `uid` trong cùng schema).
5. **Nhồi mọi thứ vào JSON** để "sau này linh hoạt" — mất ràng buộc, mất index, mất khả năng query.
6. **Không có bảng audit** cho dữ liệu nhạy cảm; đến khi cần điều tra thì không còn gì.

## 7. Checklist áp dụng
- [ ] Mọi thực thể đều đọc được thành một câu nghiệp vụ có nghĩa?
- [ ] Mọi quan hệ N–N đều có bảng nối được đặt tên nghiệp vụ?
- [ ] Dữ liệu nào cần lịch sử — đã có cách lưu chưa?
- [ ] Giá trị nào cần "đóng băng" tại thời điểm giao dịch — đã copy chưa?
- [ ] Quy ước đặt tên (số ít/số nhiều, snake_case) đã thống nhất và viết ra chưa?
- [ ] Đã đưa ERD cho người làm nghiệp vụ đọc lại chưa?
- [ ] Mỗi bảng đều có `created_at` / `updated_at`?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| dbdiagram.io | Viết DBML → ERD, nhanh nhất để phác thảo | https://dbdiagram.io/ |
| DBeaver | Client đa DB, reverse-engineer ERD | https://dbeaver.io/ |
| Mermaid `erDiagram` | ERD ngay trong markdown/Obsidian | https://mermaid.js.org/syntax/entityRelationshipDiagram.html |
| SchemaSpy | Sinh tài liệu schema từ DB có sẵn | https://schemaspy.org/ |
| pgModeler | Modeling chuyên cho PostgreSQL | https://pgmodeler.io/ |

## Tham khảo
- *Data Modeling Made Simple* — Steve Hoberman
- *The Data Warehouse Toolkit* — Ralph Kimball (dimensional modeling): https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/
- Martin Fowler — *Patterns of Enterprise Application Architecture* (Data Source & Object-Relational patterns): https://martinfowler.com/eaaCatalog/
- PostgreSQL Docs — *Data Definition*: https://www.postgresql.org/docs/current/ddl.html
- Mermaid ER diagram syntax: https://mermaid.js.org/syntax/entityRelationshipDiagram.html

## Liên kết
[[Normalization]] · [[Keys & Constraints]] · [[Schema Design Patterns]] · [[Relational Model]] · [[Database]]
