---
tags: [database, modeling, performance]
status: evergreen
---
# Denormalization

> Cố tình lưu trùng dữ liệu để **đổi chi phí ghi lấy tốc độ đọc**. Đây là một quyết định kỹ thuật có giá — và cái giá là bạn tự nhận trách nhiệm giữ đồng bộ, thứ mà [[Normalization]] vốn đã cho bạn miễn phí.

## 1. Nguyên tắc vào cuộc
> **Chuẩn hoá tới 3NF trước. Phá chuẩn chỉ khi đã đo, đã thử index, và vẫn chậm.**

Thứ tự thử trước khi phá chuẩn:
1. Đọc [[Execution Plan & EXPLAIN]] — chậm ở đâu thật?
2. Thêm/sửa index → [[Composite Index]]
3. Viết lại query → [[Query Optimization]]
4. [[Views & Materialized Views]]
5. [[Caching Strategies]] ở tầng ứng dụng
6. **Chỉ khi đó** mới phá chuẩn.

## 2. Các kỹ thuật phá chuẩn
| Kỹ thuật | Mô tả | Ví dụ |
|---|---|---|
| **Cột dẫn xuất (precomputed)** | Lưu sẵn kết quả tính | `order.total_amount` thay vì `SUM(order_item)` |
| **Cột đếm (counter cache)** | Lưu số lượng | `post.comment_count` |
| **Nhân bản cột (duplicated column)** | Copy cột từ bảng cha để tránh JOIN | `order_item.product_name` |
| **Gộp bảng 1–1** | Nhập `user_profile` vào `user` | Bỏ một JOIN |
| **Cột tổng hợp dạng mảng/JSON** | `post.tags TEXT[]` song song bảng `post_tag` | Đọc nhanh, vẫn giữ bảng chuẩn để query |
| **Bảng tổng hợp (summary table)** | Bảng thống kê theo ngày, cập nhật định kỳ | `daily_revenue` |
| **Materialized view** | Phá chuẩn *do DB quản lý* — an toàn hơn tự làm | → [[Views & Materialized Views]] |

## 3. Bốn cách giữ đồng bộ (chọn một, và ghi rõ vào tài liệu)
| Cách | Độ trễ | Rủi ro lệch | Ghi chú |
|---|---|---|---|
| Cập nhật trong cùng transaction | 0 | Thấp nhất | Tăng chi phí ghi & khả năng [[Deadlock]] |
| Trigger trong DB | 0 | Thấp | Logic ẩn → [[Stored Procedure & Trigger]] |
| Job nền / cron đồng bộ lại | phút–giờ | Trung bình | Luôn cần, kể cả khi đã dùng cách khác |
| Event / CDC | giây | Trung bình | → [[Change Data Capture]] |

> **Luật bất di bất dịch: luôn có một job đối soát (reconciliation) chạy định kỳ so cột phá chuẩn với nguồn chân lý và báo động khi lệch.** Không có nó, bạn sẽ không biết mình sai cho tới khi kế toán phát hiện.

## 4. Ví dụ
```sql
-- Chuẩn hoá: đếm mỗi lần đọc (chậm khi bảng comment lớn)
SELECT p.*, (SELECT count(*) FROM comment c WHERE c.post_id = p.id) AS cnt
FROM post p ORDER BY p.created_at DESC LIMIT 20;

-- Phá chuẩn: cột đếm + trigger giữ đồng bộ
ALTER TABLE post ADD COLUMN comment_count int NOT NULL DEFAULT 0;

CREATE FUNCTION bump_comment_count() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE post SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE post SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_comment_count
AFTER INSERT OR DELETE ON comment
FOR EACH ROW EXECUTE FUNCTION bump_comment_count();

-- Job đối soát (chạy hằng đêm)
UPDATE post p SET comment_count = x.c
FROM (SELECT post_id, count(*) c FROM comment GROUP BY post_id) x
WHERE x.post_id = p.id AND p.comment_count <> x.c;
```

## 5. Cạm bẫy hay gặp
1. **Phá chuẩn trước khi đo** — tối ưu hoá non, đổi lấy nợ kỹ thuật vĩnh viễn.
2. **Không có job đối soát.** Dữ liệu sẽ lệch; câu hỏi chỉ là khi nào.
3. **Trigger update cùng một dòng cha từ nhiều transaction song song** ⇒ hot row contention và [[Deadlock]]. Cân nhắc bảng delta rồi cộng dồn.
4. **Phá chuẩn cột thay đổi thường xuyên** — mỗi lần đổi phải lan ra hàng nghìn dòng. Chỉ phá chuẩn cái *hiếm đổi, hay đọc*.
5. **Quên rằng phá chuẩn cũng làm chậm ghi** — bảng đọc-nhiều-ghi-ít thì có lợi; bảng ghi nhiều thì lỗ.
6. **Nhầm phá chuẩn với "giá trị lịch sử".** `order_item.unit_price` **không** phải phá chuẩn — nó là dữ kiện riêng. → [[Normalization]]

## 6. Checklist áp dụng
- [ ] Tôi đã có số đo *trước* (EXPLAIN ANALYZE) chưa?
- [ ] Đã thử index và viết lại query chưa?
- [ ] Materialized view có giải quyết được không (để DB tự lo đồng bộ)?
- [ ] Cột phá chuẩn này đọc nhiều hơn ghi bao nhiêu lần?
- [ ] Ai/cái gì giữ đồng bộ — đã viết vào tài liệu schema chưa?
- [ ] Đã có job đối soát + alert khi lệch chưa?
- [ ] Nếu cột này lệch, hậu quả nghiệp vụ là gì? (hiển thị sai vs tính tiền sai)

## Tham khảo
- Kleppmann — *DDIA*, ch.11 (derived data): https://dataintensive.net/
- Martin Fowler — *Materialized View* pattern: https://martinfowler.com/bliki/ReportingDatabase.html
- PostgreSQL Docs — *Materialized Views*: https://www.postgresql.org/docs/current/rules-materializedviews.html
- Microsoft — *Materialized View pattern*: https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view
- Use The Index, Luke! — *Denormalization*: https://use-the-index-luke.com/

## Liên kết
[[Normalization]] · [[Views & Materialized Views]] · [[Caching Strategies]] · [[Performance Tuning]] · [[Database]]
