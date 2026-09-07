---
tags: [backend, architecture, distributed]
status: growing
---
# Monolith vs Microservices

> Microservice không phải là kiến trúc tốt hơn — nó là **đánh đổi độ phức tạp trong code lấy độ phức tạp trong vận hành**, để mua lại quyền deploy độc lập cho nhiều team. Nếu chỉ có một team, bạn đang trả tiền mà không mua gì.

## 1. Bảng đánh đổi
| Tiêu chí | **Monolith** | **Microservices** |
|---|---|---|
| Gọi hàm | In-process, an toàn kiểu | Qua mạng — có thể timeout, mất gói, chậm |
| Transaction | ACID một DB | **Không có** transaction phân tán thực dụng → saga |
| Deploy | Một lần, toàn bộ | Độc lập từng service |
| Refactor xuyên biên giới | Rename an toàn bằng IDE | Điều phối nhiều repo, nhiều version |
| Debug | Một stack trace | Cần distributed tracing → [[Observability]] |
| Scale | Scale cả khối | Scale đúng phần nóng |
| Ranh giới lỗi | Một bug OOM giết cả app | Cô lập (nếu làm đúng) |
| Chi phí hạ tầng & ops | Thấp | Cao: CI×N, monitoring, service mesh, on-call |
| Yêu cầu tổ chức | Không | **Nhiều team tự chủ** — nếu không thì đừng |

## 2. Con đường nên đi
```
Monolith → Modular Monolith → tách service ở nơi ĐAU THẬT → nhiều service
```
**Modular monolith**: một deploy, nhưng bên trong chia module có ranh giới rõ, giao tiếp qua interface công khai, mỗi module sở hữu bảng của mình và **không truy vấn chéo bảng của module khác**. Đây là 90% lợi ích của microservice với 10% chi phí. → [[Domain-Driven Design]]

Kiểm chứng độ sẵn sàng: **nếu chưa tách được thành module trong monolith, tách thành service sẽ chỉ biến lỗi compile thành lỗi runtime lúc 3h sáng.**

## 3. Khi nào tách một service ra
Tách khi có **lý do cụ thể**, không phải vì "kiến trúc hiện đại":
- Phần này cần **scale khác hẳn** phần còn lại (ví dụ xử lý ảnh, ML inference).
- Cần **ngôn ngữ/runtime khác** (đường nóng viết bằng Go/Rust). → [[Choosing a Backend Language]]
- **Nhịp deploy khác hẳn** (thay đổi hàng giờ vs hàng tháng).
- **Ranh giới tổ chức** rõ ràng: một team sở hữu trọn vẹn.
- **Yêu cầu tuân thủ/cách ly** (dữ liệu thanh toán, PII).

Không tách vì: file quá dài, "muốn thử k8s", "để dễ tuyển người".

## 4. Những thứ bắt buộc phải có trước khi lên microservice
| Hạ tầng | Vì sao |
|---|---|
| CI/CD tự động cho từng service | Deploy tay N service là không khả thi |
| **Distributed tracing** + log tập trung có correlation ID | Không có thì không debug được → [[Observability]] |
| Service discovery + LB tầng L7 | → [[Scaling and Load Balancing]] |
| Timeout / retry / circuit breaker chuẩn hoá | Một service chậm sẽ kéo sập chuỗi → [[Resilience Patterns]] |
| Quản lý schema/contract có kiểm tra breaking change | → [[API Versioning and Contracts]] |
| Message broker cho giao tiếp bất đồng bộ | → [[Event-Driven Architecture]] |

## 5. Cạm bẫy
- **Distributed monolith** — tách service nhưng vẫn phải deploy đồng thời, vẫn chung một DB. Tệ hơn cả monolith.
- **Chia sẻ database giữa các service** — mất tự chủ schema; đây là biên giới thật sự, không phải mã nguồn.
- **Chia theo tầng kỹ thuật** (service-auth, service-db, service-api) thay vì theo **năng lực nghiệp vụ**.
- **Chuỗi gọi đồng bộ sâu** A→B→C→D: latency cộng dồn, xác suất lỗi nhân lên. Dùng bất đồng bộ hoặc gộp lại.
- **Giả định mạng đáng tin** — 8 nguỵ biện của tính toán phân tán.
- **Nano-service** — mỗi service 200 dòng, chi phí vận hành nuốt hết lợi ích.
- **Không có ownership rõ ràng** — service mồ côi không ai vá.

## 6. Checklist trước khi tách service đầu tiên
- [ ] Đã thử modular monolith và thất bại vì lý do cụ thể nào chưa?
- [ ] Ranh giới định tách có trùng với **bounded context** nghiệp vụ không?
- [ ] Service mới có **DB riêng** không? Nếu không thì đừng tách.
- [ ] Đã có tracing xuyên service và log correlation chưa?
- [ ] Có team cụ thể sở hữu và trực service này không?
- [ ] Dữ liệu cần nhất quán mạnh có bị cắt đôi qua hai service không?
- [ ] Có kế hoạch cho lỗi từng phần (service kia chết thì UX ra sao)?
- [ ] Có đo được chi phí thêm (hạ tầng + thời gian dev) và thấy đáng không?

## Tham khảo
- Martin Fowler — *MonolithFirst*: https://martinfowler.com/bliki/MonolithFirst.html
- Martin Fowler — *Microservice Trade-Offs*: https://martinfowler.com/articles/microservice-trade-offs.html
- Chris Richardson — Microservices patterns: https://microservices.io/patterns/microservices.html
- Sam Newman — *Building Microservices* (2nd ed.), O'Reilly
- Shopify — *Deconstructing the Monolith* (modular monolith thực chiến): https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity
- Fallacies of Distributed Computing: https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing

## Liên kết
[[Domain-Driven Design]] · [[Event-Driven Architecture]] · [[Resilience Patterns]] · [[Backend]]
