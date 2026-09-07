---
tags: [networking, foundation, roadmap]
status: growing
---
# Learning Roadmap

> Thứ tự đọc để đi từ "biết ping" đến "debug được sự cố production và thiết kế được hệ thống phân tán". Bám theo cấu trúc sách [[Computer Networks - A Systems Approach (Book TOC)|Peterson & Davie]], có bổ sung phần thực hành hiện đại.

## 1. Lộ trình theo giai đoạn

| Giai đoạn | Mục tiêu | Đọc gì | Thời lượng gợi ý |
|---|---|---|---|
| **A. Nền tảng** | Hiểu vì sao mạng được thiết kế như vậy | `00 - Foundations` toàn bộ | 1 tuần |
| **B. Đủ dùng để làm việc** | Debug được 80% sự cố thường ngày | [[IP Addressing & Subnetting]], [[TCP]], [[DNS]], [[HTTP]], [[TLS]], [[Packet Capture]] | 2 tuần |
| **C. Chiều sâu tầng dưới** | Hiểu link + routing | `01 - Link Layer`, `02 - Internetworking` | 3 tuần |
| **D. Quy mô Internet** | Hiểu vì sao Internet không sập | `03 - Scaling the Internet` | 2 tuần |
| **E. Hiệu năng** | Tối ưu có căn cứ | `05 - Congestion Control`, [[Network Performance Tuning]] | 2 tuần |
| **F. An toàn** | Không tự bắn vào chân | `07 - Network Security` | 2 tuần |
| **G. Vận hành** | Làm chủ stack Linux/cloud | `08 - Practice & Tools` | liên tục |

## 2. Nếu chỉ có 1 tuần (fast path cho backend dev)
1. [[OSI & TCP-IP Model]] — để định vị sự cố
2. [[Bandwidth & Latency]] — để không tối ưu nhầm chỗ
3. [[IP Addressing & Subnetting]] — CIDR, private range, NAT
4. [[TCP]] + [[TCP State Machine]] — handshake, TIME_WAIT, backlog
5. [[DNS]] — TTL, resolver, cache
6. [[HTTP]] + [[HTTP-2 & HTTP-3]] — keep-alive, head-of-line blocking
7. [[TLS]] — handshake, chứng chỉ, SNI
8. [[Network Troubleshooting Playbook]] — quy trình khi có sự cố

## 3. Bài tập thực hành bắt buộc
- [ ] Bắt và đọc trọn một TCP handshake + teardown bằng `tcpdump` → [[Packet Capture]]
- [ ] Tự tính subnet: cho `10.42.0.0/20`, có bao nhiêu host, dải nào?
- [ ] Dựng 2 network namespace trên Linux, nối bằng veth, ping qua lại → [[Linux Network Stack]]
- [ ] Dùng `tc netem` thêm 200 ms trễ + 1% mất gói, quan sát throughput TCP tụt thế nào
- [ ] `dig +trace example.com` và giải thích từng bước → [[DNS]]
- [ ] Đọc chứng chỉ TLS của một site bằng `openssl s_client` và xác minh chuỗi tin cậy
- [ ] Viết một chương trình UDP echo và một TCP echo bằng socket thô → [[Socket API]]

## 4. Nguồn học nền tảng
| Nguồn | Loại | Dùng khi |
|---|---|---|
| Peterson & Davie — *Systems Approach* | sách, miễn phí | hiểu **vì sao** |
| Kurose & Ross — *Top-Down Approach* | sách giáo trình | học lần đầu, nhiều bài tập |
| Stevens — *TCP/IP Illustrated Vol.1* | sách tra cứu | xem đúng từng byte header |
| Grigorik — *High Performance Browser Networking* | sách, miễn phí | tối ưu web/latency |
| Beej's Guide to Network Programming | tutorial | viết socket lần đầu |
| RFC Editor | chuẩn gốc | khi tranh luận cần nguồn cuối cùng |

## 5. Checklist tự đánh giá
- [ ] Giải thích được điều gì xảy ra từ lúc gõ `example.com` đến lúc trang hiện ra — đủ 7 bước?
- [ ] Phân biệt được lỗi ở L3 / L4 / L7 chỉ bằng triệu chứng?
- [ ] Biết vì sao có TIME_WAIT và khi nào nó thành vấn đề?
- [ ] Đọc được output `tcpdump` mà không cần Google?
- [ ] Tính nhẩm được BDP và nói được cửa sổ cần bao nhiêu?

## Tham khảo
- Peterson & Davie: https://book.systemsapproach.org/
- Kurose & Ross — companion site: https://gaia.cs.umass.edu/kurose_ross/
- Grigorik — *High Performance Browser Networking*: https://hpbn.co/
- Beej's Guide to Network Programming: https://beej.us/guide/bgnet/
- *What happens when you type google.com*: https://github.com/alex/what-happens-when

## Liên kết
[[Network Fundamentals]] · [[Network Troubleshooting Playbook]] · [[Networking]]
