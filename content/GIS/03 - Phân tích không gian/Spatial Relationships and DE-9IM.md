---
tags: [gis, phân-tích, nền-tảng]
status: evergreen
---
# Spatial Relationships and DE-9IM

> Mọi predicate không gian bạn từng dùng — `ST_Intersects`, `ST_Within`, `ST_Touches`, "Select By Location" trong ArcGIS — đều là **cùng một mô hình toán học** bên dưới: ma trận 3×3 của Egenhofer & Clementini. Học mô hình một lần, không bao giờ phải tra bảng predicate nữa.

## 1. Mô hình

Mỗi hình học được chia làm ba phần: **Interior (I)**, **Boundary (B)**, **Exterior (E)**.

DE-9IM (Dimensionally Extended 9-Intersection Model) xét **giao của từng cặp** giữa hai hình A và B → ma trận 3×3:

|  | B: Interior | B: Boundary | B: Exterior |
|---|---|---|---|
| **A: Interior** | I∩I | I∩B | I∩E |
| **A: Boundary** | B∩I | B∩B | B∩E |
| **A: Exterior** | E∩I | E∩B | E∩E |

Mỗi ô ghi **số chiều** của phần giao: `F` (rỗng), `0` (điểm), `1` (đường), `2` (mặt). Viết liền thành chuỗi 9 ký tự, ví dụ `212101212`.

**Mọi predicate chỉ là một mẫu (pattern) trên ma trận này** — `T` nghĩa là "khác rỗng", `*` là "không quan tâm".

## 2. Bảng predicate

| Predicate | Nghĩa trực giác | Boundary chạm nhau tính không? |
|---|---|---|
| `ST_Intersects` | Có bất kỳ điểm chung nào | **Có** |
| `ST_Disjoint` | Không có điểm chung nào | — (phủ định của trên) |
| `ST_Contains` | A chứa B, và B chạm được biên A | Có (một phần) |
| `ST_Within` | Ngược của Contains | Có |
| `ST_Covers` / `ST_CoveredBy` | Như Contains nhưng **dễ dãi hơn ở biên** | Có |
| `ST_Touches` | **Chỉ** chạm biên, interior không giao | **Chỉ** biên |
| `ST_Overlaps` | Giao nhau, **cùng số chiều**, không cái nào chứa cái nào | — |
| `ST_Crosses` | Giao nhau, **khác số chiều** (đường cắt mặt) | — |
| `ST_Equals` | Cùng vùng không gian (không cần cùng thứ tự đỉnh) | — |

> [!warning] `Contains` vs `Covers` — khác biệt nhỏ, hậu quả lớn
> `ST_Contains(A, B)` là **false** nếu B nằm hoàn toàn **trên biên** của A. `ST_Covers(A, B)` là **true**.
> Ví dụ thật: đếm số điểm trong mỗi tỉnh. Một điểm nằm đúng trên ranh giới tỉnh sẽ **không được đếm vào tỉnh nào** nếu bạn dùng `Contains` — tổng bị hụt và không ai biết vì sao. Với việc phân loại phủ kín, **`ST_Covers` thường là cái bạn muốn**.

## 3. Nguyên tắc

1. **`ST_Intersects` là predicate mặc định đúng trong hầu hết trường hợp** — và là cái duy nhất được index tối ưu tốt ở mọi CSDL. Xem [[Spatial Indexing with GiST]].
2. **`ST_Intersects(A,B)` = `NOT ST_Disjoint(A,B)`** — luôn viết dạng khẳng định, vì `Disjoint` **không dùng được index**.
3. **Chọn predicate theo *câu hỏi nghiệp vụ*, không theo thói quen.** "Thửa đất nào giáp đường?" là `Touches`. "Thửa nào bị đường cắt qua?" là `Crosses`. Hai câu trả lời hoàn toàn khác nhau.
4. **Với hình học không hợp lệ, predicate cho kết quả không xác định.** Kiểm hợp lệ trước — [[Geometry Validity and Topology]].
5. **Dùng `ST_Relate` khi không predicate nào diễn đạt đúng ý.** Nó cho phép viết thẳng mẫu DE-9IM.

```sql
-- Predicate tuỳ chỉnh: A và B giao nhau ở interior, nhưng biên không chạm
SELECT * FROM a, b WHERE ST_Relate(a.geom, b.geom, 'T*F**F***');

-- Xem ma trận DE-9IM thật giữa hai hình để debug
SELECT ST_Relate(a.geom, b.geom) FROM a, b LIMIT 1;   -- ví dụ: '212101212'
```

## 4. Cạm bẫy

- **Điểm nằm đúng trên biên** — xem callout. Nguyên nhân số một của "tổng không khớp" trong join theo vùng.
- **Số dấu phẩy động khiến "chạm nhau" trở nên bấp bênh.** Hai polygon "cùng biên" nhập từ hai nguồn hầu như không bao giờ khớp chính xác tới bit cuối. Với dữ liệu thật, `ST_Touches` mong manh hơn bạn tưởng — cân nhắc `ST_DWithin` với dung sai nhỏ.
- **`ST_Disjoint` chậm khủng khiếp** trên bảng lớn vì không dùng được index.
- **Predicate trên CRS khác nhau** → lỗi hoặc kết quả rỗng. Xem [[Reprojection Pitfalls]].
- **`ST_Overlaps` không có nghĩa "có chồng lấn".** Nó loại trừ trường hợp cái này chứa cái kia. Muốn "có chồng lấn bất kỳ" thì dùng `ST_Intersects`.
- **`ST_Equals` khác `=`.** `=` so byte; `ST_Equals` so về không gian.

## 5. Checklist áp dụng

- [ ] Câu hỏi nghiệp vụ của tôi ứng với predicate nào — tôi diễn đạt được bằng lời chứ?
- [ ] Đối tượng nằm **trên biên** nên được tính hay không? (`Contains` vs `Covers`)
- [ ] Tổng số sau join có khớp với tổng số trước không? (phép kiểm bắt lỗi biên)
- [ ] Tôi có dùng `ST_Disjoint` ở chỗ có thể viết `NOT ST_Intersects` không?
- [ ] Hình học đầu vào có hợp lệ không?
- [ ] Hai lớp có cùng CRS không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ST_Relate` | Xem/đặt mẫu DE-9IM trực tiếp | [postgis.net](https://postgis.net/docs/ST_Relate.html) |
| Shapely predicates | Cùng mô hình trong Python | [[Shapely]] |
| JTS TestBuilder | Vẽ tay hai hình và xem ma trận | [github.com/locationtech/jts](https://github.com/locationtech/jts) |

## Tham khảo

- [PostGIS — Spatial Relationships reference](https://postgis.net/docs/reference.html#Spatial_Relationships) — bảng predicate đầy đủ kèm hình minh hoạ
- [OGC Simple Feature Access](https://www.ogc.org/standard/sfa/) — nơi DE-9IM được chuẩn hoá
- [Clementini & Felice — DE-9IM](https://en.wikipedia.org/wiki/DE-9IM) — tổng quan mô hình và mọi mẫu predicate
- [JTS Topology Suite documentation](https://locationtech.github.io/jts/) — hiện thực tham chiếu mà GEOS port sang C++

## Liên kết

[[Spatial Joins]] · [[Overlay Operations]] · [[Geometry Validity and Topology]] · [[Spatial Indexing with GiST]] · [[Shapely]] · [[GIS]]
