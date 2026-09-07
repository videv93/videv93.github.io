---
tags: [security, cti]
status: growing
---
# Threat Actor Profiling

> Hiểu **ai** tấn công và **vì sao** để dự đoán họ tấn công **thế nào**. Nhưng quy kết (attribution) là một trong những việc dễ sai nhất trong bảo mật — và note này dành nửa dung lượng cho bẫy quy kết vì đó là chỗ người ta hay ngã.

## 1. Phân loại theo động cơ và năng lực

| Loại actor | Động cơ | Năng lực | Ví dụ |
|---|---|---|---|
| **Script kiddie** | Danh tiếng, nghịch | Thấp, dùng công cụ có sẵn | — |
| **Hacktivist** | Chính trị, ý thức hệ | Thấp–trung | Anonymous-style |
| **Tội phạm có tổ chức** | Tiền | Trung–cao, vận hành như doanh nghiệp | Nhóm ransomware, RaaS |
| **APT (nhà nước tài trợ)** | Gián điệp, phá hoại | Rất cao, kiên nhẫn, ngân sách lớn | APT tên theo quốc gia |
| **Insider** | Trả thù, tiền, bất cẩn | Biến thiên, có quyền truy cập sẵn | [[Insider Threat]] |

Động cơ quyết định hành vi: actor vì tiền tối ưu ROI (dừng khi hết lợi nhuận); APT tối ưu mục tiêu (kiên nhẫn tới khi đạt). Điều này đổi cả phép tính phòng thủ — xem mô hình kinh tế trong [[Security Mental Models]].

## 2. Hai mô hình phân tích

| Mô hình | Bốn đỉnh/thành phần | Dùng để |
|---|---|---|
| **Diamond Model** | Adversary — Capability — Infrastructure — Victim | Cấu trúc một sự kiện xâm nhập |
| **Cyber Kill Chain** (Lockheed) | 7 bước từ recon tới action | Hiểu tiến trình một cuộc tấn công |

Diamond Model kết hợp tốt với ATT&CK: capability và infrastructure ánh xạ lên technique — [[MITRE ATTACK Framework]].

## 3. ⚠️ Bẫy quy kết — phần quan trọng nhất

Quy kết ("đây là APT X") cực khó và cực dễ sai:

| Bẫy | Vì sao |
|---|---|
| **False flag** | Actor cố tình để lại dấu vết của actor khác |
| **Công cụ dùng chung** | Nhiều nhóm dùng cùng malware/framework (Cobalt Strike ai cũng dùng) |
| **IOC tái sử dụng** | Hạ tầng bị nhiều nhóm dùng lại |
| **Naming hỗn loạn** | Mỗi vendor đặt tên khác nhau cho cùng nhóm (APT29 = Cozy Bear = Nobelium = Midnight Blizzard) |
| **Thiên kiến chính trị** | Áp lực quy kết cho một quốc gia vì lý do ngoài kỹ thuật |
| **Confirmation bias** | Thấy cái mình muốn thấy — Feynman: *"you must not fool yourself"* |

> [!warning] Quy kết là việc của rất ít tổ chức
> Với phần lớn đội phòng thủ, câu hỏi "ai làm" **không đổi được hành động**: bạn vẫn phải chặn, phát hiện, khắc phục như nhau. Quy kết chính xác cần nguồn lực tình báo mà hầu hết không có (và đôi khi cả nguồn tình báo ngoài mạng). Với đa số, dừng ở TTP là đủ và trung thực hơn — "actor dùng những technique này" thay vì "chắc chắn là nhóm X".

## 4. Nguyên tắc

1. **Mô tả bằng TTP trước, bằng tên sau.** TTP thay đổi được hành động (viết detection); cái tên thì không.
2. **Gán độ tin cậy cho mọi quy kết.** "High/medium/low confidence" — và nói rõ dựa trên gì.
3. **Cảnh giác với công cụ dùng chung và false flag.** Một IOC hay một tool không đủ để quy kết.
4. **Dùng attribution để dự đoán, không để đổ lỗi.** Giá trị của profiling là biết actor *sẽ làm gì tiếp*, phục vụ [[Threat Hunting]] và [[Purple Team Exercises]].
5. **Chống confirmation bias chủ động.** Hỏi "bằng chứng nào sẽ chứng minh tôi sai?" — nối với phép kiểm "tách nội dung khỏi nguồn".
6. **Naming: dùng bản đồ tên chéo.** Biết APT29/Cozy Bear/Midnight Blizzard là một để không đếm trùng.

## 5. Cạm bẫy

- **Quy kết vượt bằng chứng.** "Chắc chắn nhà nước X" dựa trên một IOC — sai lầm phổ biến và có hậu quả (chính trị, pháp lý).
- **Bỏ qua false flag.** Actor tinh vi cố tình gây hiểu lầm.
- **Coi tên như fact.** Attribution của một vendor là đánh giá, không phải chân lý.
- **Attribution không đổi hành động.** Tốn nguồn lực quy kết trong khi phòng thủ vẫn như nhau.
- **Confirmation bias.** Diễn giải mọi dấu vết theo giả thuyết ban đầu.
- **Đếm trùng do naming.** Tưởng ba nhóm trong khi là một, vì ba vendor ba tên.

## 6. Checklist áp dụng

- [ ] Tôi đã mô tả actor bằng TTP (ánh xạ ATT&CK) chưa?
- [ ] Nếu quy kết, tôi có gán độ tin cậy và nêu cơ sở không?
- [ ] Tôi có đủ bằng chứng, hay chỉ dựa vào công cụ/IOC dùng chung?
- [ ] Tôi đã cân nhắc khả năng false flag chưa?
- [ ] Quy kết này có thay đổi được hành động phòng thủ không? Nếu không, tôi có cần nó không?
- [ ] Tôi đã hỏi "bằng chứng nào chứng minh tôi sai" chưa?
- [ ] Tôi có dùng bản đồ tên chéo để tránh đếm trùng không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **MITRE ATT&CK Groups** | Hồ sơ actor theo technique |
| **Diamond Model** | Cấu trúc phân tích xâm nhập |
| **MISP galaxy** | Bản đồ tên actor chéo giữa vendor |
| **OpenCTI** | Quản lý tri thức actor |
| **Malpedia** | Tham chiếu malware và nhóm |

## Tham khảo

- [The Diamond Model of Intrusion Analysis](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf)
- [Lockheed Martin — Cyber Kill Chain](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html)
- [MITRE ATT&CK Groups](https://attack.mitre.org/groups/)
- [MISP threat actor galaxy](https://www.misp-project.org/galaxy.html)
- [Rid & Buchanan — Attributing Cyber Attacks](https://www.tandfonline.com/doi/full/10.1080/01402390.2014.977382)

## Liên kết

[[Cyber Threat Intelligence]] · [[MITRE ATTACK Framework]] · [[Indicators and Intel Sharing]] · [[Insider Threat]] · [[Threat Hunting]] · [[Security]]
