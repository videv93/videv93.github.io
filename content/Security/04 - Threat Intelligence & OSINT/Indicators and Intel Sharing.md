---
tags: [security, cti]
status: growing
---
# Indicators and Intel Sharing

> IOC (Indicator of Compromise) là dấu vết cụ thể của tấn công: hash, IP, domain, đường registry. Chúng dễ chia sẻ và dễ tự động hoá — và cũng là tầng **dễ né nhất** của [[Detection Engineering]]. Biết dùng IOC đúng chỗ là chìa khoá.

## 1. IOC là gì và vị trí của nó

| Loại IOC | Ví dụ | Tuổi thọ |
|---|---|---|
| Hash file | MD5/SHA-256 của malware | Rất ngắn (đổi 1 byte) |
| IP address | C2 server | Ngắn (vài ngày) |
| Domain | Domain phishing/C2 | Ngắn–trung |
| URL pattern | Đường dẫn đặc trưng | Trung |
| Email/sender | Địa chỉ phishing | Ngắn |
| Registry/file path | Artefact host | Dài hơn |
| **TTP** (không phải IOC nhưng liên quan) | Hành vi | Rất dài — [[MITRE ATTACK Framework]] |

> [!note] Pyramid of Pain lại xuất hiện ở đây
> IOC nằm ở đáy Pyramid of Pain: dễ chia sẻ, dễ chặn, nhưng kẻ tấn công đổi trong vài giây. Chúng hữu ích để **chặn nhanh cái đã biết** và **tìm dấu quá khứ** (retrospective hunt), nhưng detection bền phải dựa trên hành vi — xem [[Detection Engineering]]. IOC là chiến thuật, không phải chiến lược.

## 2. IOC vs IOA

| | IOC (Indicator of Compromise) | IOA (Indicator of Attack) |
|---|---|---|
| Nói về | Dấu vết đã xảy ra | Hành vi đang diễn ra |
| Ví dụ | Hash malware đã biết | "Process này đang inject vào process khác" |
| Bền | Ngắn | Dài (khó đổi hành vi) |
| Phát hiện | Cái đã biết | Cái mới, chưa có IOC |

Chuyển từ tư duy IOC sang IOA là bước trưởng thành của phòng thủ.

## 3. Chuẩn chia sẻ

| Chuẩn | Vai trò |
|---|---|
| **STIX** | Ngôn ngữ biểu diễn threat intel có cấu trúc (object, quan hệ) |
| **TAXII** | Giao thức trao đổi STIX giữa các bên |
| **MISP format** | Định dạng của nền MISP, phổ biến trong cộng đồng chia sẻ |
| **OpenIOC** | Định dạng cũ hơn, vẫn gặp |
| **Sigma** | Cho detection rule (không phải IOC) — [[Detection Engineering]] |
| **YARA** | Mẫu nhận diện file/malware — [[Static and Dynamic Analysis]] |

## 4. TLP — Traffic Light Protocol

Chia sẻ intel cần quy ước ai được đọc:

| TLP | Được chia sẻ với |
|---|---|
| **TLP:RED** | Chỉ người nhận trực tiếp, không chuyển tiếp |
| **TLP:AMBER** | Trong tổ chức và khách hàng cần biết |
| **TLP:GREEN** | Cộng đồng, không công khai |
| **TLP:CLEAR** | Công khai tự do |

Tôn trọng TLP là điều kiện để được tham gia cộng đồng chia sẻ (ISAC, CERT). Vi phạm = bị loại.

## 5. Nguyên tắc

1. **Dùng IOC để chặn nhanh và hunt quá khứ, không làm chiến lược phát hiện chính.** Chúng hết hạn nhanh.
2. **Ưu tiên IOA/behavior cho detection bền.** Nối với Pyramid of Pain.
3. **Làm giàu IOC trước khi hành động.** Một IP thô không đủ; ngữ cảnh (thuộc ai, khi nào, liên quan campaign nào) mới cho quyết định.
4. **Chia sẻ hai chiều.** Nhận từ cộng đồng và đóng góp lại; ISAC ngành, CERT quốc gia (VNCERT tại VN).
5. **Tôn trọng TLP.** Quy ước chia sẻ là điều kiện tham gia.
6. **Hết hạn IOC tự động.** IOC cũ trong detection tạo false positive — [[Blue Team Operations]].

## 6. Cạm bẫy

- **Nhồi triệu IOC vào SIEM.** Alert fatigue, chi phí, và phần lớn đã chết.
- **Không hết hạn IOC.** IP tái phân bổ cho dịch vụ hợp pháp → false positive.
- **IOC không ngữ cảnh.** Chặn một IP mà không biết vì sao dẫn tới chặn nhầm dịch vụ thật.
- **Chỉ nhận, không chia sẻ.** Cộng đồng chia sẻ hoạt động theo có đi có lại.
- **Vi phạm TLP.** Chuyển tiếp intel TLP:RED phá lòng tin và bị loại khỏi cộng đồng.
- **Tin IOC mù.** Nguồn có thể sai; false positive trong feed lan sang mọi người dùng.
- **Bỏ qua IOA.** Chỉ chặn cái đã biết, mù với biến thể mới.

## 7. Checklist áp dụng

- [ ] Tôi dùng IOC cho chặn nhanh/hunt quá khứ, và IOA/behavior cho phát hiện bền chứ?
- [ ] IOC có được làm giàu ngữ cảnh trước khi hành động không?
- [ ] IOC trong detection có cơ chế hết hạn không?
- [ ] Tôi có tham gia chia sẻ hai chiều (ISAC/CERT) không?
- [ ] Tôi có tôn trọng TLP của intel nhận được không?
- [ ] Tôi dùng chuẩn (STIX/TAXII/MISP) để trao đổi tự động không?
- [ ] Tôi có kiểm độ tin cậy nguồn IOC không?

## 8. Công cụ

| Tên | Vai trò |
|---|---|
| **MISP** | Chia sẻ IOC, cộng đồng lớn, hỗ trợ TLP |
| **OpenCTI** | Quản lý tri thức, ánh xạ STIX/ATT&CK |
| **STIX/TAXII** | Biểu diễn và trao đổi chuẩn |
| **YARA** | Mẫu nhận diện file/malware |
| **VirusTotal / urlscan / GreyNoise** | Làm giàu và giảm nhiễu IOC |

## Tham khảo

- [OASIS STIX/TAXII](https://oasis-open.github.io/cti-documentation/)
- [FIRST — Traffic Light Protocol (TLP 2.0)](https://www.first.org/tlp/)
- [MISP Project](https://www.misp-project.org/)
- [Pyramid of Pain — David Bianco](https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html)
- [YARA](https://virustotal.github.io/yara/)

## Liên kết

[[Cyber Threat Intelligence]] · [[MITRE ATTACK Framework]] · [[Detection Engineering]] · [[Threat Hunting]] · [[Static and Dynamic Analysis]] · [[Security]]
