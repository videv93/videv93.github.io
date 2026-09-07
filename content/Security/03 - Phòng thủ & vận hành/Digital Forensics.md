---
tags: [security, phòng-thủ, dfir]
status: growing
---
# Digital Forensics

> Forensics là khoa học **tái dựng cái đã xảy ra** từ dấu vết còn lại — với kỷ luật đủ để kết luận đứng vững trước toà. Nó khác pentest ở một điểm gốc: bạn không được thay đổi cái mình đang xem xét.

## 1. Hai nguyên tắc nền

| Nguyên tắc | Nội dung | Hệ quả |
|---|---|---|
| **Order of volatility** | Thu thập từ dễ mất nhất tới bền nhất | RAM → kết nối mạng → tiến trình → đĩa → backup |
| **Chain of custody** | Ghi lại ai chạm bằng chứng, khi nào, làm gì | Bằng chứng bị phá vỡ chuỗi = vô giá trị pháp lý |

> [!warning] Order of volatility quyết định thứ tự hành động trong sự cố
> RAM chứa thứ không có ở đâu khác: malware chỉ chạy trong bộ nhớ, khoá mã hoá, kết nối mạng đang mở, tiến trình đã bị xoá khỏi đĩa. **Tắt máy là xoá vĩnh viễn tất cả.** Đây là lý do [[Security Incident Response]] cảnh báo không tắt máy bị nhiễm — cô lập mạng, dump RAM trước.

## 2. Thứ tự thu thập (từ dễ mất tới bền)

1. **Bộ nhớ (RAM)** — dump trước mọi thứ khác; chứa khoá, malware in-memory, state mạng.
2. **State runtime** — tiến trình, kết nối, user đăng nhập, ARP/routing.
3. **Đĩa** — ảnh bit-by-bit, tính hash để chứng minh không đổi.
4. **Log tập trung** — đã forward ra ngoài — [[SIEM and Log Analysis]].
5. **Backup/artefact bền** — ít khẩn.

Nguyên tắc vàng: **làm việc trên bản sao, không bao giờ trên bản gốc.** Tính hash (SHA-256) bản gốc và bản sao để chứng minh chúng giống nhau, và write-blocker khi thu đĩa.

## 3. Nguồn artefact theo nền tảng

| Nền tảng | Artefact giàu thông tin |
|---|---|
| **Windows** | Registry, Event Log, Prefetch, ShimCache, Amcache, MFT, `$UsnJrnl`, SRUM |
| **Linux** | `/var/log`, bash history, `/tmp`, cron, systemd, auditd |
| **Browser** | Lịch sử, cache, cookie, download |
| **Memory** | Tiến trình, injection, khoá, chuỗi C2 |
| **Network** | PCAP, NetFlow, DNS |
| **Cloud** | CloudTrail, log control plane — [[Cloud Security Posture]] |

Kỹ năng lõi là dựng **timeline**: gộp mốc thời gian từ nhiều nguồn thành một dòng thời gian thống nhất để thấy trình tự tấn công.

## 4. Nguyên tắc

1. **Không bao giờ làm việc trên bản gốc.** Ảnh hoá, hash, làm việc trên bản sao. Vi phạm điều này phá huỷ giá trị pháp lý.
2. **Ghi lại mọi thứ bạn làm.** Mỗi lệnh, mỗi mốc thời gian, mỗi công cụ và phiên bản — chain of custody áp cho cả hành động của bạn.
3. **Thu theo order of volatility.** RAM trước, đừng tắt máy.
4. **Dựng timeline từ nhiều nguồn.** Một nguồn cho một góc; timeline hợp nhất cho câu chuyện.
5. **Cẩn thận với anti-forensics.** Kẻ tấn công xoá log, đổi timestamp (timestomping), dùng malware chỉ-trong-RAM. Đối chiếu nhiều nguồn để phát hiện mâu thuẫn.
6. **Biết giới hạn.** Full disk encryption, chống-forensics, log đã xoá — nói rõ cái không kết luận được, đừng đoán.

## 5. Cạm bẫy

- **Tắt máy để "an toàn".** Mất RAM — nơi giá trị nhất. Cô lập mạng thay vì tắt.
- **Làm việc trực tiếp trên bằng chứng gốc.** Phá chain of custody, kết quả vô giá trị pháp lý.
- **Tin timestamp mù.** Timestomping là kỹ thuật phổ biến; đối chiếu `$MFT` với `$UsnJrnl`, log với artefact.
- **Bỏ qua memory forensics.** Nhiều malware hiện đại không chạm đĩa.
- **Không ghi lại hành động của chính mình.** Điều tra viên cũng nằm trong chain of custody.
- **Kết luận vượt bằng chứng.** "Có thể là APT X" khi chỉ có một IOC yếu là cạm bẫy — [[Threat Actor Profiling]] cảnh báo về bẫy quy kết.
- **Không phân biệt IR nhanh và forensics kỹ.** Đôi khi cần chặn nhanh (IR); đôi khi cần bằng chứng toà (forensics). Biết đang làm cái nào.

## 6. Checklist áp dụng

- [ ] Tôi đã dump RAM trước khi làm bất cứ thứ gì có thể mất nó chưa?
- [ ] Tôi đang làm việc trên bản sao, với hash chứng minh không đổi?
- [ ] Tôi có ghi lại mọi hành động kèm mốc thời gian và công cụ không?
- [ ] Tôi thu thập theo đúng order of volatility không?
- [ ] Tôi đã dựng timeline từ nhiều nguồn chưa?
- [ ] Tôi đã đối chiếu để phát hiện anti-forensics (timestomping) chưa?
- [ ] Tôi có nói rõ giới hạn của cái mình kết luận được không?
- [ ] Chain of custody có nguyên vẹn cho mọi bằng chứng không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **Volatility 3** | Phân tích memory dump |
| **Autopsy / The Sleuth Kit** | Phân tích ảnh đĩa, mã nguồn mở |
| **KAPE** | Thu thập artefact nhanh có chọn lọc |
| **Plaso / log2timeline** | Dựng super-timeline |
| **FTK Imager** | Ảnh hoá đĩa, write-blocker mềm |
| **Wireshark / Zeek** | Phân tích network forensics |
| **Velociraptor** | Thu thập và săn DFIR quy mô lớn |

## Tham khảo

- [SANS DFIR resources & posters](https://www.sans.org/posters/?focus-area=digital-forensics)
- [NIST SP 800-86 — Guide to Integrating Forensic Techniques into Incident Response](https://csrc.nist.gov/pubs/sp/800/86/final)
- [Volatility Foundation](https://www.volatilityfoundation.org/)
- [The Art of Memory Forensics (Ligh et al.)](https://www.memoryanalysis.net/amf)

## Liên kết

[[Security Incident Response]] · [[SIEM and Log Analysis]] · [[Malware Analysis Fundamentals]] · [[Threat Actor Profiling]] · [[Blue Team Operations]] · [[Security]]
