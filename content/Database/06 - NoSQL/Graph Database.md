---
tags: [database, nosql, graph]
status: growing
---
# Graph Database

> Lưu trữ dạng **Node (thực thể) và Edge (mối quan hệ)**, tối ưu cho các truy vấn quan hệ phức tạp **nhiều tầng**. Đại diện: **Neo4j, AWS Neptune**. Dùng cho **Mạng xã hội, Hệ thống gợi ý (Recommendation Engine), Phát hiện gian lận (Fraud Detection)**.

## 1. Vì sao nhanh hơn SQL ở traversal
| | RDBMS | Graph DB |
|---|---|---|
| Đi 1 tầng quan hệ | JOIN + tra index — nhanh | Theo con trỏ — nhanh |
| Đi 5 tầng | 5 JOIN, chi phí **nhân lên** theo kích thước bảng | **Index-free adjacency**: mỗi node giữ con trỏ trực tiếp tới hàng xóm ⇒ chi phí phụ thuộc số hàng xóm, **không** phụ thuộc tổng số node |
| Độ sâu biến thiên | Recursive CTE, khó tối ưu | Cú pháp gốc: `-[:KNOWS*1..5]->` |

> Điểm mấu chốt: chi phí traversal **cục bộ**. Đây là lý do "bạn của bạn của bạn" chạy trong mili giây trên đồ thị hàng tỉ cạnh.

## 2. Mô hình property graph & Cypher
```cypher
// Node có label + property; edge có type + property + hướng
CREATE (a:Person {name:'An', age:30})-[:FRIEND {since:2020}]->(b:Person {name:'Bình'})

// Bạn của bạn, chưa phải bạn tôi — gợi ý kết bạn
MATCH (me:Person {name:'An'})-[:FRIEND*2]-(fof:Person)
WHERE NOT (me)-[:FRIEND]-(fof) AND me <> fof
RETURN fof.name, count(*) AS mutual
ORDER BY mutual DESC LIMIT 10;

// Đường đi ngắn nhất — một dòng
MATCH p = shortestPath((a:Person {name:'An'})-[:FRIEND*..6]-(b:Person {name:'Chi'}))
RETURN p;

// Fraud: nhiều tài khoản dùng chung thiết bị/địa chỉ
MATCH (a:Account)-[:USED]->(d:Device)<-[:USED]-(b:Account)
WHERE a <> b
WITH d, collect(DISTINCT a.id) AS accounts
WHERE size(accounts) > 5
RETURN d.id, accounts;
```
Ngôn ngữ: **Cypher** (Neo4j; chuẩn hoá thành **GQL** — ISO/IEC 39075:2024), **Gremlin** (TinkerPop, Neptune), **SPARQL** (RDF).

## 3. Khi nào **không** cần graph DB
| Tình huống | Dùng gì |
|---|---|
| Quan hệ chỉ 1–2 tầng | RDBMS với FK + index |
| Cây phân cấp cố định | Recursive CTE, `ltree`, closure table → [[Subquery & CTE]] |
| Chỉ cần "ai kết nối với ai" đơn giản | Bảng nối trong RDBMS |
| Cần phân tích đồ thị **theo lô** (PageRank trên toàn bộ) | Spark GraphX, NetworkX |
| Đồ thị nhỏ (<1 triệu cạnh) | Nạp vào RAM, xử lý trong ứng dụng |

> Một graph DB thêm vào kiến trúc nghĩa là thêm backup, monitoring, đồng bộ dữ liệu từ nguồn chân lý, và một ngôn ngữ query nữa cho team học. Chỉ đáng khi traversal sâu là **năng lực cốt lõi** của sản phẩm.

## 4. Cạm bẫy hay gặp
1. **Traversal không giới hạn độ sâu** (`-[:FRIEND*]-`) ⇒ bùng nổ tổ hợp. **Luôn** đặt cận: `*1..4`.
2. **Supernode** — một node có hàng triệu cạnh (tài khoản celebrity) làm mọi traversal qua nó chậm khủng khiếp. Xử lý riêng, hoặc chia nhỏ theo thời gian/loại cạnh.
3. **Thiếu index cho node khởi đầu.** Traversal nhanh, nhưng *tìm điểm bắt đầu* vẫn cần index.
4. **Coi graph DB là nguồn chân lý duy nhất** — thường nó là view dẫn xuất từ RDBMS, đồng bộ qua [[Change Data Capture]].
5. **Ghi hàng loạt qua từng transaction nhỏ** ⇒ rất chậm. Dùng bulk import (`neo4j-admin import`).
6. **Mô hình hoá property thành node** không cần thiết ⇒ đồ thị phình vô ích.
7. **Scale ngang khó**: chia đồ thị (graph partitioning) là bài toán khó vì cạnh cắt ngang shard rất đắt.

## 5. Checklist áp dụng
- [ ] Query quan trọng nhất có đi sâu **≥3 tầng** với độ sâu biến thiên không?
- [ ] Recursive CTE trong Postgres đã thử và thật sự không đủ chưa?
- [ ] Mọi traversal có giới hạn độ sâu tối đa chưa?
- [ ] Có supernode nào không? Xử lý ra sao?
- [ ] Node khởi đầu của query đã có index/constraint chưa?
- [ ] Graph là nguồn chân lý hay bản dẫn xuất? Đồng bộ bằng gì, độ trễ bao nhiêu?
- [ ] Ai trong team viết được Cypher/Gremlin?
- [ ] Backup và restore đã thử chưa?

## Tham khảo
- Neo4j — *Graph Database Concepts*: https://neo4j.com/docs/getting-started/current/appendix/graphdb-concepts/
- Neo4j — *Cypher Manual*: https://neo4j.com/docs/cypher-manual/current/
- *Graph Databases* (O'Reilly, Robinson/Webber/Eifrem) — bản free: https://neo4j.com/graph-databases-book/
- ISO GQL standard: https://www.iso.org/standard/76120.html
- AWS Neptune Docs: https://docs.aws.amazon.com/neptune/latest/userguide/

## Liên kết
[[Database Paradigms]] · [[Subquery & CTE]] · [[Database Selection Guide]] · [[Change Data Capture]] · [[Database]]
