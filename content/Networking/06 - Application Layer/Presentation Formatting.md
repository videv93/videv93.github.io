---
tags: [networking, application, data]
status: growing
---
# Presentation Formatting

> Biến cấu trúc dữ liệu trong bộ nhớ thành byte gửi được, rồi dựng lại ở đầu kia. Vấn đề thật không phải tốc độ mã hoá, mà là **tương thích khi hai đầu nâng cấp không cùng lúc**.

## 1. So sánh định dạng

| Định dạng | Kiểu | Kích thước | Schema | Dùng khi |
|---|---|---|---|---|
| **JSON** | Text | Lớn | Không (JSON Schema là tuỳ chọn) | API công khai, dễ debug |
| **Protobuf** | Nhị phân | Nhỏ | **Bắt buộc**, có IDL | RPC nội bộ, hiệu năng → [[RPC & gRPC]] |
| **Avro** | Nhị phân | Nhỏ | Schema đi kèm hoặc trong registry | Data pipeline, Kafka |
| **MessagePack / CBOR** | Nhị phân | Nhỏ | Không | JSON nhỏ gọn hơn, IoT |
| **FlatBuffers / Cap'n Proto** | Nhị phân | Nhỏ | Có | **Zero-copy**, đọc không cần parse |
| **XML** | Text | Rất lớn | XSD | Hệ thống cũ, SOAP |

## 2. Vấn đề nền tảng
1. **Endianness**: big-endian là "network byte order" (`htons`/`htonl`). Định dạng nhị phân tự định nghĩa phải nói rõ thứ tự byte.
2. **Chiến lược mã hoá**: **tagged** (mỗi giá trị kèm nhãn kiểu — JSON, Protobuf) vs **untagged** (chỉ dữ liệu, người đọc phải biết schema — Avro, cấu trúc C).
3. **Số**: JSON không phân biệt int/float và mất chính xác với số nguyên >2^53 → **ID lớn phải gửi dạng chuỗi**.
4. **Thời gian**: luôn dùng UTC theo RFC 3339, kèm offset. Timestamp không có timezone là bug chờ nổ.
5. **Kích thước tối đa**: luôn giới hạn — parse dữ liệu không giới hạn là lỗ hổng DoS.

## 3. Tương thích schema
| Kiểu | Nghĩa |
|---|---|
| **Backward compatible** | Code mới đọc được dữ liệu cũ |
| **Forward compatible** | Code cũ đọc được dữ liệu mới (bỏ qua field lạ) |
| **Full** | Cả hai |

**Quy tắc Protobuf**: không đổi số field, không đổi kiểu, không xoá rồi tái sử dụng số (dùng `reserved`), thêm field mới luôn optional. **Quy tắc JSON**: người đọc phải bỏ qua field không biết, không được lỗi.

## 4. Cạm bẫy hay gặp
- **ID 64-bit trong JSON** bị JavaScript làm tròn → mất dữ liệu âm thầm. Gửi dạng string.
- **Tái sử dụng số field trong Protobuf** → dữ liệu cũ được đọc thành field mới, sai hoàn toàn mà không lỗi.
- **Parser nghiêm ngặt (strict)** với field lạ → không thể deploy dần dần.
- **Deserialization không an toàn** (Java serialization, `pickle`, YAML `!!python`) → RCE. Không bao giờ deserialize dữ liệu không tin cậy bằng các cơ chế này.
- **Nén rồi mới mã hoá hay ngược lại**: nén dữ liệu có phần bí mật + có phần do kẻ tấn công điều khiển → rò rỉ (CRIME/BREACH) → [[TLS]].
- **Float cho tiền tệ** — dùng số nguyên (đơn vị nhỏ nhất) hoặc decimal.

## 5. Checklist áp dụng
- [ ] Thay đổi schema này có backward **và** forward compatible không?
- [ ] Có kiểm tra breaking change tự động trong CI không? (`buf breaking`)
- [ ] ID lớn, tiền tệ, thời gian đã dùng kiểu an toàn chưa?
- [ ] Parser có giới hạn kích thước và độ sâu lồng nhau không?
- [ ] Có deserialize dữ liệu từ nguồn không tin cậy không? Bằng cơ chế nào?

## Tham khảo
- Peterson & Davie — 7.1 Presentation Formatting: https://book.systemsapproach.org/data/presentation.html
- Kleppmann — *Designing Data-Intensive Applications*, Ch.4 Encoding and Evolution
- Protocol Buffers — Schema evolution: https://protobuf.dev/programming-guides/proto3/#updating
- RFC 3339 — *Date and Time on the Internet*: https://www.rfc-editor.org/rfc/rfc3339

## Liên kết
[[RPC & gRPC]] · [[HTTP]] · [[Multimedia & Compression]] · [[Networking]]
