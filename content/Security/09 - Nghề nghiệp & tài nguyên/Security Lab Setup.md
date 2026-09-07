---
tags: [security, nghề-nghiệp, reference]
status: growing
---
# Security Lab Setup

> ⚠️ **Đây là điều kiện tiên quyết cho [[Malware Analysis Fundamentals]], [[Static and Dynamic Analysis]], [[Reverse Engineering Basics]] và mọi thực hành khai thác.** Cách ly không đúng nghĩa là bạn tự lây nhiễm hoặc tấn công nhầm hệ thống thật.

> Một lab an toàn cho phép bạn học tấn công và phân tích malware **mà không gây hại** — cho chính bạn, cho mạng của bạn, hay cho ai khác. Nguyên tắc trung tâm: **cách ly thật, không phải cách ly giả định.**

## 1. Nguyên tắc cách ly

| Nguyên tắc | Vì sao |
|---|---|
| **Mạng cách ly (host-only/internal)** | Malware không gọi C2, không lây, không lộ IP thật |
| **Snapshot trước mỗi thí nghiệm** | Hoàn tác về trạng thái sạch |
| **Không chia sẻ thư mục với host** | Đường lây phổ biến bị bỏ qua |
| **Không credential thật trong lab** | Nếu lab bị chiếm, không mất gì thật |
| **Tách biệt với mạng công ty/nhà** | Một cú sai không chạm hệ thống thật |

> [!warning] "VM là đủ an toàn" là giả định nguy hiểm
> VM giảm rủi ro nhưng không tuyệt đối: có escape (chia sẻ thư mục, clipboard, lỗ hổng hypervisor). Với malware, thêm lớp: mạng host-only hoặc mô phỏng (INetSim), tắt chia sẻ, và cân nhắc máy vật lý riêng cho mẫu nguy hiểm.

## 2. Kiến trúc lab điển hình

| Thành phần | Vai trò |
|---|---|
| **Hypervisor** | VirtualBox (miễn phí), VMware, Proxmox |
| **Máy tấn công** | Kali Linux hoặc Parrot |
| **Máy mục tiêu dễ tổn thương** | Metasploitable, VulnHub, DVWA, OWASP Juice Shop |
| **Lab AD** | GOAD (Game of Active Directory), Ludus — [[Active Directory Attacks]] |
| **Máy phân tích malware** | FLARE VM (Windows), REMnux (Linux) |
| **Giả lập mạng** | INetSim/FakeNet cho dynamic malware analysis |

## 3. Các loại lab theo mục đích

| Mục đích | Cấu hình |
|---|---|
| **Web pentest** | Kali + DVWA/Juice Shop, hoặc dùng [PortSwigger Academy] online |
| **Network/host pentest** | Kali + Metasploitable/VulnHub |
| **Active Directory** | GOAD/Ludus — nhiều máy Windows + DC |
| **Malware analysis** | FLARE VM + REMnux + mạng cách ly + INetSim |
| **Cloud** | Tài khoản cloud riêng, chi phí thấp — cẩn thận [[Cloud Security Posture]] |

## 4. Nguyên tắc

1. **Cách ly mạng là bắt buộc cho malware.** Host-only hoặc mô phỏng; không bao giờ để mẫu ra Internet thật.
2. **Snapshot trước, hoàn tác sau.** Mỗi mẫu/thí nghiệm bắt đầu từ trạng thái sạch.
3. **Không dữ liệu/credential thật.** Lab bị chiếm không được gây mất mát thật.
4. **Tách khỏi mạng thật.** VLAN riêng, hoặc máy vật lý riêng cho công việc nguy hiểm.
5. **Tài nguyên miễn phí đủ cho phần lớn việc học.** VirtualBox + máy dễ tổn thương mã nguồn mở; cloud lab chỉ khi cần.
6. **Ghi lại cấu hình lab.** Tái dựng được, và biết môi trường khi kết luận (malware phát hiện VM).

## 5. Cạm bẫy

- **Lab nối mạng thật.** Malware lây/gọi C2; exploit chạm nhầm hệ thống.
- **Chia sẻ thư mục với host.** Đường escape/lây phổ biến.
- **Không snapshot.** Phải dựng lại sau mỗi mẫu.
- **Credential thật trong lab.** Lab bị chiếm = mất mát thật.
- **Tin VM tuyệt đối an toàn.** Có escape; thêm lớp cho malware nguy hiểm.
- **Cloud lab quên tắt.** Chi phí ngoài dự kiến; tài nguyên lộ.
- **Quên malware phát hiện VM.** Ảnh hưởng kết luận phân tích — [[Static and Dynamic Analysis]].

## 6. Checklist áp dụng

- [ ] Lab có cách ly mạng (host-only/mô phỏng) không?
- [ ] Có snapshot sạch để hoàn tác không?
- [ ] Chia sẻ thư mục với host đã tắt chưa?
- [ ] Có credential/dữ liệu thật nào trong lab không?
- [ ] Lab có tách khỏi mạng công ty/nhà không?
- [ ] Với malware nguy hiểm, tôi có lớp cách ly bổ sung không?
- [ ] Cloud lab (nếu có) có được tắt và không lộ tài nguyên không?

## 7. Tài nguyên

| Tên | Vai trò |
|---|---|
| **VirtualBox / VMware** | Hypervisor |
| **Kali / Parrot** | Máy tấn công |
| **VulnHub / Metasploitable** | Máy mục tiêu offline |
| **GOAD / Ludus** | Lab Active Directory |
| **FLARE VM / REMnux** | Phân tích malware |
| **INetSim / FakeNet** | Giả lập dịch vụ mạng |

## Tham khảo

- [FLARE VM](https://github.com/mandiant/flare-vm) và [REMnux](https://remnux.org/)
- [GOAD — Game of Active Directory](https://github.com/Orange-Cyberdefense/GOAD)
- [VulnHub](https://www.vulnhub.com/)
- [INetSim](https://www.inetsim.org/)

## Liên kết

[[Malware Analysis Fundamentals]] · [[Static and Dynamic Analysis]] · [[Reverse Engineering Basics]] · [[Active Directory Attacks]] · [[CTF and Practice Platforms]] · [[Authorization and Rules of Engagement]] · [[Security]]
