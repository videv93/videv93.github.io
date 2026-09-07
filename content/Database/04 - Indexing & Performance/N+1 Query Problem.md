---
tags: [database, performance, orm]
status: evergreen
---
# N+1 Query Problem

> Một query lấy N bản ghi, rồi N query nữa lấy dữ liệu liên quan của từng bản ghi. Tổng: **N+1 round-trip**. Nguyên nhân hiệu năng phổ biến nhất trong ứng dụng dùng ORM — và cũng dễ chữa nhất.

## 1. Vì sao nó chết người
Mỗi round-trip tốn ~0.5–2ms mạng + parse + plan, kể cả khi query chỉ mất 0.05ms trong DB.

| N | Thời gian (1ms/round-trip) |
|---|---|
| 20 | ~21 ms — không ai để ý |
| 500 | ~500 ms — trang chậm |
| 5.000 | ~5 s — timeout |

Nó **không hiện ra ở môi trường dev** (10 dòng dữ liệu) và **không hiện ra trong slow query log** (mỗi query đều nhanh). Chỉ `pg_stat_statements` xếp theo `calls` hoặc `total_exec_time` mới bắt được.

## 2. Ví dụ
```python
# ❌ N+1
posts = Post.objects.all()[:100]          # 1 query
for p in posts:
    print(p.author.name)                  # +100 query

# ✅ Eager loading
posts = Post.objects.select_related('author')[:100]        # 1 query (JOIN)
posts = Post.objects.prefetch_related('comments')[:100]    # 2 query (IN)
```

| ORM | Eager loading |
|---|---|
| Django | `select_related` (JOIN, quan hệ 1–1/N–1) · `prefetch_related` (query thứ 2 với `IN`) |
| Rails ActiveRecord | `includes`, `preload`, `eager_load` |
| SQLAlchemy | `joinedload`, `selectinload`, `subqueryload` |
| Hibernate/JPA | `JOIN FETCH`, `@EntityGraph`, `@BatchSize` |
| Prisma | `include`, `select` |
| Sequelize | `include` |
| GORM | `Preload`, `Joins` |

## 3. Hai chiến lược eager loading — chọn đúng
| | JOIN (`select_related`, `joinedload`) | Query thứ hai với `IN` (`prefetch_related`, `selectinload`) |
|---|---|---|
| Số query | 1 | 2 |
| Quan hệ N–1, 1–1 | ✅ Tốt nhất | Được |
| Quan hệ 1–N, N–N | ⚠️ **Nhân dòng** (fan-out) | ✅ Tốt nhất |
| Nhiều quan hệ 1–N cùng lúc | ❌ Tích Descartes | ✅ |

> Quy tắc: **N–1 thì JOIN, 1–N thì IN.** Eager load hai quan hệ 1–N bằng JOIN cùng lúc là cách tạo ra 10.000 dòng từ 100 bản ghi.

## 4. N+1 ẩn — những chỗ hay bị bỏ sót
| Nguồn | Biểu hiện |
|---|---|
| **GraphQL resolver** | Mỗi field tự query ⇒ dùng **DataLoader** để gom theo batch |
| **Serializer / template** | Truy cập `obj.related.x` trong vòng lặp render |
| **Lazy loading trong REST list endpoint** | `/orders?limit=100` ⇒ 100 query lấy customer |
| **Đếm trong vòng lặp** | `for p in posts: p.comments.count()` ⇒ dùng annotate/`COUNT` + `GROUP BY` |
| **Cây phân cấp** | Duyệt đệ quy từng tầng ⇒ dùng recursive CTE → [[Subquery & CTE]] |
| **Correlated subquery trong `SELECT`** | N+1 **bên trong** DB, không thấy trong log ứng dụng |
| **Cache miss theo từng key** | Dùng `MGET`/pipeline → [[Caching Strategies]] |

## 5. Phát hiện
```sql
-- Query nào bị gọi nhiều lần bất thường
SELECT calls, total_exec_time, query
FROM pg_stat_statements ORDER BY calls DESC LIMIT 20;
```
| Công cụ | Ngôn ngữ | Link |
|---|---|---|
| django-silk / nplusone | Python/Django | https://github.com/jmcarp/nplusone |
| Bullet | Ruby on Rails | https://github.com/flyerhzm/bullet |
| Hibernate statistics | Java | `hibernate.generate_statistics=true` |
| Laravel Debugbar | PHP | https://github.com/barryvdh/laravel-debugbar |
| OpenTelemetry span count | Mọi ngôn ngữ | Đếm span `db.query` trong một request |

> **Biện pháp phòng thủ tốt nhất:** thêm một assertion trong test tích hợp — "endpoint này không được vượt quá K query". Nó bắt regression trước khi lên production.

## 6. Cạm bẫy hay gặp
1. **Eager load *mọi* quan hệ** để "cho chắc" ⇒ kéo về hàng MB dữ liệu không dùng. Ngược của N+1 cũng là một vấn đề.
2. **Dùng JOIN cho nhiều quan hệ 1–N** ⇒ fan-out. → [[Joins]]
3. **Chữa N+1 bằng cache** thay vì sửa query — che triệu chứng, thêm một tầng phải invalidate.
4. **Chỉ test với ít dữ liệu** ⇒ không bao giờ thấy vấn đề.
5. **Không đếm số query trong CI** ⇒ N+1 quay lại sau mỗi refactor.
6. **Quên phân trang.** Eager loading không cứu được một endpoint trả về 50.000 bản ghi.

## 7. Checklist áp dụng
- [ ] Endpoint list có eager load các quan hệ nó render không?
- [ ] Chọn đúng chiến lược (JOIN cho N–1, `IN` cho 1–N)?
- [ ] Có test tích hợp giới hạn số query cho endpoint nóng không?
- [ ] Đã kiểm tra `pg_stat_statements` sắp theo `calls` chưa?
- [ ] GraphQL — đã dùng DataLoader chưa?
- [ ] Có vòng lặp nào gọi `.count()` / `.exists()` từng phần tử không?
- [ ] Endpoint có phân trang bắt buộc (max limit) không?
- [ ] Đang eager load cái gì mà response không dùng đến không?

## Tham khảo
- Martin Fowler — *Lazy Load* pattern (PoEAA): https://martinfowler.com/eaaCatalog/lazyLoad.html
- Django Docs — *select_related & prefetch_related*: https://docs.djangoproject.com/en/stable/ref/models/querysets/#select-related
- SQLAlchemy Docs — *Relationship Loading Techniques*: https://docs.sqlalchemy.org/en/20/orm/queryguide/relationships.html
- GraphQL DataLoader: https://github.com/graphql/dataloader
- Bill Karwin — *SQL Antipatterns*: https://pragprog.com/titles/bksqla/sql-antipatterns/

## Liên kết
[[Query Optimization]] · [[Joins]] · [[Database Tooling]] · [[Caching Strategies]] · [[Database]]
