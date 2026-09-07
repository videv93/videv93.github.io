---
tags: [backend, architecture, ddd]
status: growing
---
# Domain-Driven Design

> DDD không phải là một bộ pattern để copy — nó là **kỷ luật giữ cho mô hình trong code khớp với ngôn ngữ của người làm nghiệp vụ**. Phần lớn giá trị nằm ở nhóm "strategic", không phải ở `Entity`/`ValueObject`.

## 1. Strategic — phần quan trọng hơn
| Khái niệm | Nghĩa | Vì sao quan trọng |
|---|---|---|
| **Ubiquitous Language** | Một từ vựng chung giữa dev và domain expert, **dùng nguyên trong code** | Bug lớn nhất thường là hiểu sai từ, không phải sai code |
| **Bounded Context** | Ranh giới mà một mô hình và một từ vựng có hiệu lực | "Customer" ở Sales ≠ "Customer" ở Billing — đừng ép thành một class |
| **Context Map** | Quan hệ giữa các context | Ai phụ thuộc ai, ai dịch dữ liệu cho ai |
| **Anti-Corruption Layer (ACL)** | Lớp dịch ở biên giới | Ngăn mô hình của hệ thống ngoài (legacy, vendor) nhiễm vào domain của bạn |
| **Core / Supporting / Generic subdomain** | Phân loại theo giá trị kinh doanh | Chỉ đầu tư DDD nặng vào **core**; phần generic (auth, email) thì mua/dùng thư viện |

> **Bounded context là ứng viên tự nhiên cho ranh giới service.** → [[Monolith vs Microservices]]

## 2. Tactical — bộ xây dựng bên trong một context
| Khối | Đặc điểm | Ví dụ |
|---|---|---|
| **Entity** | Có định danh, thay đổi theo thời gian | `Order(id)` |
| **Value Object** | Không có id, so sánh theo giá trị, **bất biến** | `Money(50000, "VND")`, `EmailAddress` |
| **Aggregate** | Cụm object có một **Aggregate Root** làm cửa duy nhất; ranh giới **nhất quán và transaction** | `Order` + `OrderLine` |
| **Domain Event** | Sự thật nghiệp vụ đã xảy ra | `OrderPlaced` → [[Event-Driven Architecture]] |
| **Domain Service** | Nghiệp vụ không thuộc riêng entity nào | `TransferMoney(from, to)` |
| **Repository** | Nạp/lưu **một aggregate** | → [[Repository Pattern and Service Layer]] |
| **Factory** | Tạo aggregate ở trạng thái hợp lệ | |

### Ba luật về aggregate (Vaughn Vernon)
1. **Bảo vệ tính bất biến trong một aggregate**, mọi thứ khác là eventual consistency.
2. **Aggregate nhỏ** — càng lớn càng dễ xung đột khi ghi đồng thời.
3. **Tham chiếu aggregate khác bằng id**, không bằng con trỏ trực tiếp.
4. **Một transaction = một aggregate.** Cần đổi nhiều aggregate → dùng domain event/saga.

## 3. Value Object bị đánh giá thấp
Thay `float amount` + `string currency` rời rạc bằng `Money` là cách rẻ nhất để diệt cả một lớp bug: đơn vị lẫn lộn, validation rải rác, so sánh sai. Áp dụng cho `Email`, `PhoneNumber`, `OrderId`, `DateRange`. Với ngôn ngữ có kiểu mạnh (Go, Rust, TS) thì gần như miễn phí.

## 4. Khi nào **không** dùng DDD
| Tình huống | Nên |
|---|---|
| CRUD, nghiệp vụ mỏng | Framework thẳng, đừng dựng tầng |
| Domain generic (auth, thanh toán, gửi mail) | Mua/dùng thư viện, không mô hình hoá |
| Không tiếp cận được domain expert | Không có ubiquitous language thì DDD chỉ còn là boilerplate |
| Team chưa quen | Bắt đầu từ ubiquitous language + bounded context, bỏ qua tactical patterns |

## 5. Cạm bẫy
- **Chỉ lấy tactical patterns** — tạo `Entity`, `ValueObject`, `Repository` nhưng vẫn nói bằng ngôn ngữ của database → DDD hình thức.
- **Một mô hình chung cho toàn công ty** — "Canonical data model" là phản đề của bounded context; nó luôn phình và luôn sai với ai đó.
- **Aggregate khổng lồ** (`Customer` chứa mọi thứ) → khoá lớn, xung đột ghi, load chậm.
- **Anemic model** — logic trôi hết vào service. → [[Repository Pattern and Service Layer]]
- **Ép Event Sourcing đi kèm** — DDD **không** yêu cầu event sourcing; đó là quyết định riêng, đắt và khó đảo ngược.
- **Đặt tên theo kỹ thuật** (`OrderManager`, `DataProcessor`) — nếu domain expert không dùng từ đó thì từ đó sai.
- **Bỏ qua ACL khi tích hợp hệ thống ngoài** — schema của vendor nhiễm dần vào domain.

## 6. Checklist
- [ ] Tên class/method trong domain có xuất hiện trong cuộc nói chuyện với người nghiệp vụ không?
- [ ] Đã vẽ được ranh giới các bounded context và quan hệ giữa chúng chưa?
- [ ] Mỗi transaction chỉ chạm **một** aggregate?
- [ ] Aggregate tham chiếu nhau bằng id chứ không bằng object?
- [ ] Có value object cho tiền, id, email... hay vẫn là primitive?
- [ ] Có ACL ở mọi biên giới với hệ thống ngoài không?
- [ ] Phần được đầu tư mô hình hoá kỹ có đúng là **core domain** không?
- [ ] Đọc một entity có thấy hành vi nghiệp vụ, hay chỉ thấy getter/setter?

## Tham khảo
- Eric Evans — *Domain-Driven Design* (Blue Book); bản tóm tắt miễn phí: https://www.domainlanguage.com/ddd/reference/
- Vaughn Vernon — *Effective Aggregate Design* (3 phần PDF): https://www.dddcommunity.org/library/vernon_2011/
- Martin Fowler — *BoundedContext*: https://martinfowler.com/bliki/BoundedContext.html
- Martin Fowler — *UbiquitousLanguage*: https://martinfowler.com/bliki/UbiquitousLanguage.html
- *Architecture Patterns with Python* (DDD + Python): https://www.cosmicpython.com/
- Event Storming — Alberto Brandolini: https://www.eventstorming.com/

## Liên kết
[[Clean Architecture]] · [[Repository Pattern and Service Layer]] · [[Monolith vs Microservices]] · [[Event-Driven Architecture]] · [[Backend]]
