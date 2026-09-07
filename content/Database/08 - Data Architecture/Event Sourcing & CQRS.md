---
tags: [database, architecture, patterns]
status: growing
---
# Event Sourcing & CQRS

> Hai pattern **khác nhau** thường bị nhắc chung. **Event Sourcing**: lưu chuỗi sự kiện thay vì trạng thái hiện tại. **CQRS**: tách mô hình đọc khỏi mô hình ghi. Dùng được độc lập — và CQRS thì thường nên dùng một mình.

## 1. Event Sourcing
```
Thay vì:  account { id: 7, balance: 150 }

Lưu:      AccountOpened      { id: 7 }
          MoneyDeposited     { id: 7, amount: 200 }
          MoneyWithdrawn     { id: 7, amount:  50 }
          → balance = 150 (tính bằng cách replay)
```
| ✅ Được | ❌ Mất |
|---|---|
| Lịch sử **hoàn chỉnh**, audit miễn phí | Query trạng thái hiện tại khó — cần projection |
| Trả lời được câu hỏi chưa nghĩ ra lúc thiết kế | Event schema **bất biến** — versioning là vĩnh viễn |
| Debug bằng cách replay | Xoá dữ liệu cá nhân (GDPR) rất khó |
| Time travel về bất kỳ thời điểm nào | Độ phức tạp cao hơn hẳn CRUD |
| Sự kiện là contract tự nhiên giữa service | Cần snapshot khi stream dài |

**Snapshot**: lưu trạng thái mỗi N sự kiện để không phải replay từ đầu.

## 2. CQRS
```
        ┌──── Command ────▶ Write model (chuẩn hoá, ràng buộc chặt)
Client ─┤                        │ (sự kiện / CDC / trigger)
        └──── Query ──────▶ Read model (phá chuẩn, tối ưu cho từng màn hình)
```
- Read model có thể là materialized view, bảng phá chuẩn, Elasticsearch, hoặc Redis.
- Đồng bộ qua [[Change Data Capture]], sự kiện, hoặc [[Views & Materialized Views]].
- ⚠️ Read model gần như luôn là **eventual consistent** ⇒ UI phải xử lý độ trễ. → [[BASE & Eventual Consistency]]

> **CQRS "nhẹ" rất đáng dùng và ít rủi ro**: cùng một database, ghi vào bảng chuẩn hoá, đọc từ materialized view. Không cần event sourcing, không cần hạ tầng mới.

## 3. Khi nào đáng dùng
| Dùng Event Sourcing khi | Đừng dùng khi |
|---|---|
| Nghiệp vụ **vốn dĩ** là dòng sự kiện (kế toán, giao dịch, kho) | CRUD đơn giản |
| Audit trail là yêu cầu pháp lý | Team chưa từng làm |
| Cần trả lời câu hỏi lịch sử tuỳ ý | Không có thời gian đầu tư vào tooling |
| Cần replay để dựng lại view mới | Chỉ vì thấy nó "hiện đại" |

| Dùng CQRS khi | Đừng dùng khi |
|---|---|
| Tỉ lệ đọc/ghi rất lệch | Tải đọc và ghi tương đương |
| Read model phục vụ nhiều màn hình rất khác nhau | Một model phục vụ tốt cả hai |
| Cần scale đọc độc lập | Chưa gặp vấn đề scale |

## 4. Event store
| Lựa chọn | Ghi chú |
|---|---|
| **PostgreSQL** (bảng `events` + `stream_id`, `version`, unique) | ✅ Bắt đầu ở đây; `UNIQUE (stream_id, version)` cho optimistic concurrency |
| **EventStoreDB** | Chuyên dụng, có subscription và projection sẵn |
| **Kafka** | Không phải event store đúng nghĩa (khó đọc theo stream, retention), nhưng tốt để **phân phối** sự kiện |
| **Marten** (.NET trên Postgres) | Event store + document store |

```sql
CREATE TABLE events (
  stream_id  uuid    NOT NULL,
  version    int     NOT NULL,
  event_type text    NOT NULL,
  payload    jsonb   NOT NULL,
  metadata   jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (stream_id, version)   -- ✅ chặn ghi đồng thời xung đột
);
```

## 5. Cạm bẫy hay gặp
1. **Dùng vì thấy "hay"** — đây là pattern tốn kém nhất trong danh sách. Cần lý do nghiệp vụ rõ ràng.
2. **Nhầm CQRS = Event Sourcing.** Dùng CQRS trước, riêng lẻ, và thường là đủ.
3. **Event schema versioning** — sự kiện cũ **không sửa được**. Cần upcaster hoặc versioned event type ngay từ đầu.
4. **Không có snapshot** ⇒ stream 100k sự kiện phải replay mỗi lần đọc.
5. **Sự kiện mang tên CRUD** (`OrderUpdated`) ⇒ mất hết giá trị. Đặt tên theo **ý định nghiệp vụ**: `OrderCancelledByCustomer`.
6. **GDPR**: không xoá được sự kiện ⇒ dùng **crypto-shredding** (mã hoá PII bằng khoá riêng mỗi người, xoá khoá là xoá dữ liệu).
7. **Read model lệch** mà không có cách rebuild ⇒ phải luôn rebuild được từ event store.
8. **Bỏ qua eventual consistency ở UI** ⇒ người dùng ghi xong không thấy kết quả.

## 6. Checklist áp dụng
- [ ] Nghiệp vụ này có thật sự là dòng sự kiện, hay chỉ là CRUD?
- [ ] CQRS nhẹ (materialized view) có đủ không, trước khi đến event sourcing?
- [ ] Chiến lược versioning sự kiện là gì?
- [ ] Sự kiện đặt tên theo ý định nghiệp vụ, không phải thao tác CRUD?
- [ ] Có snapshot cho stream dài không?
- [ ] Read model có rebuild lại được từ đầu không? Mất bao lâu?
- [ ] Optimistic concurrency đã có (`UNIQUE (stream_id, version)`) chưa?
- [ ] UI xử lý độ trễ read model ra sao?
- [ ] Kế hoạch xoá dữ liệu cá nhân (GDPR) là gì?
- [ ] Team đã có người từng làm pattern này chưa?

## Tham khảo
- Martin Fowler — *Event Sourcing*: https://martinfowler.com/eaaDev/EventSourcing.html
- Martin Fowler — *CQRS*: https://martinfowler.com/bliki/CQRS.html
- Greg Young — *CQRS Documents*: https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf
- Microsoft — *Event Sourcing pattern*: https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
- EventStoreDB Docs: https://developers.eventstore.com/

## Liên kết
[[Change Data Capture]] · [[Distributed Transactions]] · [[Views & Materialized Views]] · [[Schema Design Patterns]] · [[BASE & Eventual Consistency]] · [[Database]]
