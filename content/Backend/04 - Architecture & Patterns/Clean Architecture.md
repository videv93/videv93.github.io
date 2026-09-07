---
tags: [backend, architecture, pattern]
status: growing
---
# Clean Architecture

> **Tách biệt hoàn toàn Business Logic (Domain) khỏi Database, Framework và External API.** Cùng một ý tưởng xuất hiện dưới nhiều tên: Clean Architecture, Hexagonal (Ports & Adapters), Onion Architecture. Lợi ích thật không phải "đổi DB dễ" — mà là **nghiệp vụ test được trong mili-giây, không cần dựng gì cả**.

## 1. Quy tắc duy nhất: The Dependency Rule
```
        ┌─────────────────────────────────────────┐
        │  Frameworks & Drivers                   │  HTTP, DB, Redis, SDK
        │   ┌───────────────────────────────────┐ │
        │   │  Interface Adapters               │ │  Controller, Presenter, Repository impl
        │   │   ┌─────────────────────────────┐ │ │
        │   │   │  Use Cases (Application)    │ │ │  Nghiệp vụ theo kịch bản
        │   │   │   ┌───────────────────────┐ │ │ │
        │   │   │   │  Entities (Domain)    │ │ │ │  Quy tắc nghiệp vụ thuần
        │   │   │   └───────────────────────┘ │ │ │
        │   │   └─────────────────────────────┘ │ │
        │   └───────────────────────────────────┘ │
        └─────────────────────────────────────────┘
     Phụ thuộc chỉ được trỏ VÀO TRONG. Không bao giờ ra ngoài.
```
Nghĩa cụ thể: **domain không `import` ORM, không `import` framework HTTP, không biết JSON là gì.**

## 2. Ports & Adapters
| Khái niệm | Nghĩa | Ví dụ |
|---|---|---|
| **Port** | Interface do tầng trong định nghĩa | `interface OrderRepository { findById(id) }` |
| **Driven adapter** | Triển khai port, ở tầng ngoài | `PostgresOrderRepository` → [[Repository Pattern and Service Layer]] |
| **Driving adapter** | Thứ gọi vào use case | HTTP controller, CLI, worker hàng đợi |
| **Dependency Inversion** | Tầng trong sở hữu interface, tầng ngoài phụ thuộc vào nó | Cốt lõi của cả mô hình |

Kiểm chứng nhanh: **cùng một use case phải gọi được từ HTTP handler, từ rake task, và từ consumer hàng đợi mà không sửa dòng nào.**

## 3. Cấu trúc thư mục ví dụ
```
domain/          entity, value object, quy tắc thuần — không import gì bên ngoài
application/     use case, port (interface), DTO
infrastructure/  repository impl, HTTP client, ORM model, migration
interfaces/      controller, serializer, CLI, job handler
```
Với Go/Rust cấu trúc này rất tự nhiên. Với Rails/Django, cần chủ động hơn vì framework kéo mọi thứ về model. → [[Ruby on Rails]]

## 4. Khi nào **không** dùng
| Tình huống | Nên |
|---|---|
| CRUD thuần, nghiệp vụ ~ không có | Dùng thẳng framework — thêm layer chỉ là chi phí |
| Prototype, MVP đang tìm PMF | Ưu tiên tốc độ, tách sau khi biết cái gì ổn định |
| Service nhỏ một mục đích | Một tầng service mỏng là đủ |
| Nghiệp vụ phức tạp, sống nhiều năm, nhiều đường vào | ✅ Clean Architecture trả lãi |

**Kiến trúc là chi phí trả trước để mua khả năng thay đổi về sau.** Nếu không có gì thay đổi thì đó là chi phí thuần.

## 5. Cạm bẫy
- **Tạo đủ 4 tầng nhưng entity vẫn là ORM model** → mọi thứ vẫn dính chặt vào DB, chỉ thêm file.
- **Mapper bùng nổ**: DTO → domain → ORM → DTO cho một endpoint CRUD. Cho phép "đường tắt" ở phần đọc thuần (query đọc thẳng, chỉ phần ghi đi qua domain — đây là tinh thần CQRS).
- **Interface chỉ có một implementation vĩnh viễn** — trừu tượng không mua được gì; xoá đi.
- **Nghiệp vụ rò ra controller** (`if user.role == 'admin' && order.total > 100`) — kiểm tra: đọc controller có thấy quy tắc nghiệp vụ nào không?
- **Nghiệp vụ rò xuống DB** (trigger, stored procedure quyết định quy tắc) — chia đôi nguồn sự thật.
- **Áp dụng cho mọi service không phân biệt** — giáo điều đắt tiền.

## 6. Checklist
- [ ] Có thể test toàn bộ use case chính mà **không** dựng DB không?
- [ ] Package `domain/` có `import` framework hay ORM nào không? (grep là ra)
- [ ] Một use case có gọi được từ HTTP, CLI và worker mà không sửa không?
- [ ] Interface (port) được định nghĩa ở **phía dùng**, không phải phía triển khai?
- [ ] Controller chỉ làm: parse → gọi use case → map response?
- [ ] Có interface nào chỉ tồn tại để "cho đúng kiến trúc" không?
- [ ] Số tầng có tương xứng với độ phức tạp nghiệp vụ thật không?

## Tham khảo
- Robert C. Martin — *The Clean Architecture*: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- Alistair Cockburn — *Hexagonal Architecture*: https://alistair.cockburn.us/hexagonal-architecture/
- Herberto Graça — *DDD, Hexagonal, Onion, Clean, CQRS… How I put it all together*: https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/
- Martin Fowler — *PresentationDomainDataLayering*: https://martinfowler.com/bliki/PresentationDomainDataLayering.html
- *Architecture Patterns with Python* (Percival & Gregory) — bản online miễn phí: https://www.cosmicpython.com/

## Liên kết
[[Repository Pattern and Service Layer]] · [[Domain-Driven Design]] · [[Testing Backend]] · [[Backend]]
