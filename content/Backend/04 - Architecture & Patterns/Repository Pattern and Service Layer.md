---
tags: [backend, architecture, pattern]
status: growing
---
# Repository Pattern and Service Layer

> **Phân rã tầng truy vấn dữ liệu và tầng xử lý nghiệp vụ để dễ unit test.** Repository trả lời *"lấy dữ liệu ở đâu"*, Service trả lời *"làm gì với nó"*. Trộn hai thứ này là lý do phổ biến nhất khiến code không test được.

## 1. Ai chịu trách nhiệm gì
| Tầng | Làm | **Không** làm |
|---|---|---|
| **Controller / Handler** | Parse request, gọi service, map response, chọn status code | Chứa quy tắc nghiệp vụ, truy vấn DB |
| **Service / Use case** | Điều phối nghiệp vụ, quyết định, mở transaction | Biết về HTTP, biết về SQL cụ thể |
| **Repository** | Truy vấn và lưu, map row ↔ domain object | Chứa quyết định nghiệp vụ |
| **Domain entity** | Quy tắc bất biến của chính nó (`order.cancel()` từ chối nếu đã ship) | Biết mình được lưu ở đâu |

## 2. Repository — hình dạng đúng
```python
# Port: interface do tầng trong định nghĩa
class OrderRepository(Protocol):
    def get(self, order_id: OrderId) -> Order | None: ...
    def save(self, order: Order) -> None: ...
    def find_pending_older_than(self, ts: datetime) -> list[Order]: ...
```
Ba điều đáng chú ý:
1. **Interface nói bằng ngôn ngữ nghiệp vụ**, không phải ngôn ngữ SQL (`find_pending_older_than`, không phải `query(where, order, limit)`).
2. **Trả về domain object**, không trả về ORM model hay row.
3. Không có `Repository.update_where(...)` chung chung — repository "vạn năng" chỉ là ORM đội lốt.

**Một repository cho một aggregate**, không phải cho một bảng. → [[Domain-Driven Design]]

## 3. Service layer — hình dạng đúng
```python
class CancelOrder:
    def __init__(self, orders: OrderRepository, payments: PaymentGateway, uow: UnitOfWork):
        ...
    def __call__(self, order_id: OrderId, reason: str) -> None:
        with self.uow:                     # ranh giới transaction ở ĐÂY
            order = self.orders.get(order_id) or raise NotFound()
            order.cancel(reason)           # quy tắc nằm trong entity
            self.payments.refund(order.payment_id)
            self.orders.save(order)
```
- **Transaction thuộc về service (Unit of Work)**, không thuộc về repository — một use case thường chạm nhiều repository.
- Dependency được **tiêm vào** → test chỉ cần fake repository trong bộ nhớ. → [[Testing Backend]]
- Service không import gì từ tầng HTTP. → [[Clean Architecture]]

## 4. Khi nào **không** cần repository
| Tình huống | Ghi chú |
|---|---|
| CRUD thuần, không có nghiệp vụ | ActiveRecord/Django ORM trực tiếp là đủ và rõ hơn |
| Query đọc phức tạp cho báo cáo | Cho phép query object đọc thẳng DB (CQRS phía đọc) — ép qua repository sẽ thành N+1 hoặc SQL méo mó |
| Team nhỏ, app ngắn hạn | Chi phí abstraction > lợi ích |

Với Rails, biến thể thực tế hay dùng là **service object / interactor** (một class, một `#call`) + để ActiveRecord làm repository — chấp nhận đánh đổi có ý thức. → [[Ruby on Rails]]

## 5. Cạm bẫy
- **Repository rò ORM ra ngoài** — trả về `QuerySet`/`ActiveRecord::Relation` lười biếng → truy vấn thực sự chạy ở tầng view, N+1 xuất hiện ở nơi không ai ngờ. → [[Database Access and ORM]]
- **Anemic domain model** — entity chỉ có getter/setter, mọi logic dồn vào service dài 500 dòng. Quy tắc bất biến của một object thuộc về chính object đó.
- **Transaction trong repository** — mỗi `save` một transaction → không nguyên tử được ở mức use case.
- **Service gọi service gọi service** — chuỗi sâu khó suy luận; ưu tiên use case gọi domain + repository.
- **Mock repository quá chi tiết** trong test (`expect(repo).to receive(:find_by).with(...)`) → test khoá chặt vào cách triển khai. Dùng **fake in-memory** thay vì mock.
- **Tạo interface cho mọi thứ** — chỉ tạo port ở nơi thật sự cần thay thế hoặc cần test.

## 6. Checklist
- [ ] Controller có dòng nào chứa điều kiện nghiệp vụ không?
- [ ] Có thể chạy test của use case chính mà không cần DB không?
- [ ] Repository trả về domain object hay trả về object của ORM?
- [ ] Ranh giới transaction có nằm ở tầng use case không?
- [ ] Method của repository có tên theo ngôn ngữ nghiệp vụ không?
- [ ] Entity có method thể hiện hành vi, hay chỉ là túi dữ liệu?
- [ ] Có fake in-memory cho từng repository để test không?

## Tham khảo
- Martin Fowler — *Repository*: https://martinfowler.com/eaaCatalog/repository.html
- Martin Fowler — *Service Layer*: https://martinfowler.com/eaaCatalog/serviceLayer.html
- Martin Fowler — *AnemicDomainModel*: https://martinfowler.com/bliki/AnemicDomainModel.html
- *Architecture Patterns with Python* — ch. Repository & Unit of Work: https://www.cosmicpython.com/book/chapter_02_repository.html
- *Patterns of Enterprise Application Architecture* — Martin Fowler

## Liên kết
[[Clean Architecture]] · [[Domain-Driven Design]] · [[Database Access and ORM]] · [[Backend]]
