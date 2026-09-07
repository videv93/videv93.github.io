---
tags: [database, nosql]
status: growing
---
# Document Database

> Lưu trữ dữ liệu linh hoạt dạng **JSON/BSON, Schema-less**, dễ mở rộng chiều ngang (Horizontal Scaling). Đại diện: **MongoDB, Couchbase**. Dùng cho **CMS, User Profile, Catalog sản phẩm có thuộc tính biến đổi liên tục**.

## 1. Ý tưởng cốt lõi: aggregate
Một document chứa **toàn bộ** thứ cần cho một thao tác đọc — không JOIN. Đổi lại, ranh giới document trở thành ranh giới transaction tự nhiên và cũng là ranh giới thiết kế quan trọng nhất.

```javascript
// Một document = một "aggregate"
{
  _id: ObjectId("..."),
  sku: "A1", name: "Bàn gỗ",
  attributes: { material: "oak", width_cm: 120 },   // schema khác nhau mỗi loại
  variants: [ { color: "nâu", stock: 12 }, { color: "đen", stock: 3 } ],
  updated_at: ISODate("2026-08-27T00:00:00Z")
}
```

## 2. Embed vs Reference — quyết định thiết kế số 1
| | **Embed** (lồng vào) | **Reference** (trỏ id) |
|---|---|---|
| Đọc | 1 lần, rất nhanh | Cần `$lookup` hoặc 2 query |
| Cập nhật con | Ghi lại cả document | Độc lập |
| Giới hạn | Document tối đa **16MB** (MongoDB) | Không |
| Hợp khi | Quan hệ 1–ít, đọc cùng nhau, con không tồn tại độc lập | 1–nhiều **không giới hạn**, con dùng chung, con đổi thường xuyên |

> Quy tắc thực dụng: **1–ít thì embed, 1–nhiều-không-giới-hạn thì reference.** Mảng phình vô hạn (comment, log) là anti-pattern kinh điển — nó biến mỗi lần ghi thành viết lại cả document.

## 3. Query & aggregation
```javascript
db.product.find({ "attributes.material": "oak", price: { $lt: 500 } })
          .sort({ price: 1 }).limit(20)

db.order.aggregate([
  { $match:   { status: "paid", created_at: { $gte: ISODate("2026-01-01") } } },  // lọc SỚM
  { $unwind:  "$items" },
  { $group:   { _id: "$items.product_id", qty: { $sum: "$items.quantity" } } },
  { $sort:    { qty: -1 } },
  { $limit:   10 },
  { $lookup:  { from: "product", localField: "_id", foreignField: "_id", as: "p" } }
])
```
- Index: single, compound (tuân **ESR** như [[Composite Index]]), multikey (trên mảng), text, geo, TTL, partial, wildcard.
- `.explain("executionStats")` là `EXPLAIN ANALYZE` của MongoDB. Cần thấy `IXSCAN`, không phải `COLLSCAN`. → [[Execution Plan & EXPLAIN]]
- Đặt `$match` và `$sort` **sớm nhất có thể** trong pipeline để dùng được index.

## 4. Những điều MongoDB hiện đại **có** (nhưng nhiều người vẫn nghĩ là không)
- **Transaction ACID đa document** (từ v4.0 replica set, v4.2 sharded cluster) — nhưng đắt, đừng thiết kế dựa vào nó.
- **Schema validation** bằng JSON Schema — nên bật, luôn.
- **Change Streams** — nghe thay đổi realtime → [[Change Data Capture]].
- Read/write concern chỉnh được theo query → [[BASE & Eventual Consistency]].

## 5. JSONB trong PostgreSQL — đối thủ đáng cân nhắc
```sql
CREATE INDEX ON product USING gin (attributes jsonb_path_ops);
SELECT * FROM product WHERE attributes @> '{"material":"oak"}';
```
| Chọn Postgres + JSONB khi | Chọn MongoDB khi |
|---|---|
| Đã có Postgres; cần JOIN với dữ liệu quan hệ | Sharding ngang là yêu cầu chính từ đầu |
| Cần ràng buộc/transaction mạnh | Team đã quen hệ sinh thái Mongo |
| Chỉ một phần dữ liệu là bán cấu trúc | Aggregation pipeline hợp với bài toán |

## 6. Cạm bẫy hay gặp
1. **"Schema-less" nghĩa là không cần thiết kế schema.** Sai. Schema chuyển vào code, nơi không ai cưỡng chế nó. **Luôn bật schema validation.**
2. **Mảng phình vô hạn** ⇒ chạm 16MB, hoặc mỗi update viết lại megabyte.
3. **Dùng `$lookup` như JOIN của SQL** — nó chậm hơn nhiều và không có optimizer mạnh như RDBMS. `$lookup` nhiều tầng là dấu hiệu bạn cần một RDBMS.
4. **Không tạo index** rồi kết luận "Mongo chậm".
5. **Dữ liệu trùng lặp do embed** mà không có kế hoạch đồng bộ. → [[Denormalization]]
6. **Chọn shard key sai** ⇒ hot shard, không sửa được dễ. → [[Sharding & Partitioning]]
7. **`_id` mặc định là ObjectId** (có timestamp) — ổn, nhưng đừng dùng nó làm shard key theo range vì mọi ghi mới dồn về một shard.
8. **Không đặt `readConcern`/`writeConcern`** ⇒ mặc định có thể yếu hơn bạn tưởng (`w:1` = mất dữ liệu khi primary chết).

## 7. Checklist áp dụng
- [ ] Đã liệt kê các access pattern **trước** khi thiết kế document chưa?
- [ ] Mỗi quan hệ: embed hay reference — quyết định đã có lý do viết ra chưa?
- [ ] Có mảng nào có thể phình vô hạn không?
- [ ] Đã bật JSON Schema validation chưa?
- [ ] Mọi query nóng đã có index và xác nhận `IXSCAN` bằng `explain` chưa?
- [ ] `writeConcern` có phải `majority` cho dữ liệu quan trọng không?
- [ ] Nếu shard: shard key có mặt trong hầu hết query không?
- [ ] Postgres + JSONB có đủ dùng không — đã cân nhắc chưa?

## Tham khảo
- MongoDB Docs — *Data Modeling*: https://www.mongodb.com/docs/manual/data-modeling/
- MongoDB Docs — *Aggregation Pipeline*: https://www.mongodb.com/docs/manual/core/aggregation-pipeline/
- MongoDB — *Schema Design Anti-Patterns*: https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-massive-arrays/
- PostgreSQL Docs — *JSON Types & Functions*: https://www.postgresql.org/docs/current/datatype-json.html
- Kleppmann — *DDIA*, ch.2: https://dataintensive.net/

## Liên kết
[[Database Paradigms]] · [[Key-Value Store]] · [[Sharding & Partitioning]] · [[PostgreSQL]] · [[Database]]
