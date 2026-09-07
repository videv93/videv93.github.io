---
tags: [security, cti]
status: growing
---
# Cyber Threat Intelligence

> [!note] Ghi chú nguồn
> Trong seed gốc, file `7onezcti-expert...md` là một clipping **rỗng hoàn toàn** — chỉ có frontmatter, không một dòng nội dung. Nó hứa "CTI & OSINT". Cả thư mục `04` này trả lời lời hứa đó, tổng hợp từ các nguồn chuẩn ngành.

> CTI biến dữ liệu thô về mối đe doạ thành **quyết định**. Phần lớn cái được bán dưới tên "threat intelligence" là dữ liệu, không phải intelligence — và biết khác biệt là điều quan trọng nhất về chủ đề này.

## 1. Data → Information → Intelligence

| Tầng | Là gì | Ví dụ |
|---|---|---|
| **Data** | Sự kiện rời rạc | Một IP, một hash |
| **Information** | Data có ngữ cảnh | "IP này là C2 của malware X" |
| **Intelligence** | Information + phân tích + **khuyến nghị hành động** | "Nhóm này nhắm ngành bạn bằng kỹ thuật Y; nên ưu tiên detection Z" |

> [!warning] Phần lớn "threat feed" dừng ở tầng data
> Một feed hàng triệu IOC không phải intelligence — nó là data, và thường là data hết hạn. Intelligence trả lời *"tôi nên làm gì khác đi"*. Nếu một sản phẩm không thay đổi được quyết định nào của bạn, nó không phải intelligence dù nhãn ghi thế.

## 2. Bốn cấp CTI

| Cấp | Người dùng | Câu hỏi | Ví dụ |
|---|---|---|---|
| **Strategic** | Lãnh đạo | "Rủi ro dài hạn của chúng ta là gì?" | Xu hướng ngành, động cơ actor, địa chính trị |
| **Operational** | Quản lý phòng thủ | "Chiến dịch nào đang nhắm vào ta?" | TTP của campaign đang hoạt động |
| **Tactical** | SOC, detection | "Kẻ địch hành động thế nào?" | TTP cụ thể → [[Detection Engineering]] |
| **Technical** | Công cụ, tự động | "Chặn/phát hiện cái gì?" | IOC → [[Indicators and Intel Sharing]] |

Sai lầm phổ biến: mua CTI kỹ thuật (feed IOC) và tưởng đã có CTI chiến lược. Chúng phục vụ người khác nhau, trả lời câu hỏi khác nhau.

## 3. Vòng đời tình báo (Intelligence Cycle)

1. **Direction** — lãnh đạo đặt câu hỏi cần trả lời (requirements). Bỏ qua bước này → thu thập mù.
2. **Collection** — thu dữ liệu từ OSINT, feed, dark web, telemetry nội bộ — [[OSINT Techniques]].
3. **Processing** — chuẩn hoá, khử trùng, dịch.
4. **Analysis** — biến thông tin thành intelligence: đánh giá, tương quan, dự đoán.
5. **Dissemination** — đưa tới đúng người, đúng định dạng, đúng lúc.
6. **Feedback** — nó có hữu ích không? Điều chỉnh requirements.

## 4. Nguyên tắc

1. **Bắt đầu từ requirements, không từ feed.** Hỏi "tôi cần biết gì để quyết định gì" trước khi thu thập.
2. **Intelligence phải thay đổi được hành động.** Nếu không, nó là dữ liệu tốn tiền.
3. **Relevance quan trọng hơn volume.** Mười IOC liên quan tới threat actor của ngành bạn giá trị hơn mười triệu IOC chung chung.
4. **Đánh giá độ tin cậy tường minh.** Dùng thang (Admiralty code, hoặc confidence high/medium/low); nói rõ cái gì là fact, cái gì là suy luận.
5. **Nối CTI vào phòng thủ.** Tactical CTI → detection; operational → hunt; technical → chặn — nếu không nối, CTI là báo cáo đọc rồi quên.
6. **Cẩn thận quy kết.** Attribution khó và dễ sai — [[Threat Actor Profiling]].

## 5. Cạm bẫy

- **Feed IOC = CTI.** Nhầm data với intelligence; mua volume thay vì relevance.
- **Thu thập không có requirements.** Ngập dữ liệu không trả lời câu hỏi nào.
- **IOC hết hạn.** IP/domain C2 sống vài ngày; feed cũ tạo false positive và alert fatigue — [[Blue Team Operations]].
- **Không đánh giá độ tin cậy.** Trình bày tin đồn ngang với fact xác minh.
- **CTI không nối vào hành động.** Báo cáo đẹp không ai dùng để quyết định gì.
- **Quy kết vội.** "Chắc chắn là APT X" dựa trên một IOC yếu — sai lầm phổ biến và tốn kém.
- **Bỏ qua telemetry nội bộ.** Nguồn CTI giá trị nhất thường là chính log của bạn — cái gì đang thật sự tấn công bạn.

## 6. Checklist áp dụng

- [ ] Tôi có requirements rõ ràng trước khi thu thập không?
- [ ] Mỗi sản phẩm CTI có thay đổi được một quyết định cụ thể không?
- [ ] Intel có liên quan tới threat model của tổ chức tôi không?
- [ ] Tôi đã gán độ tin cậy cho mỗi kết luận chưa?
- [ ] CTI tactical có được nối vào detection không?
- [ ] IOC tôi dùng còn hiệu lực (chưa hết hạn) không?
- [ ] Tôi có tránh quy kết vượt bằng chứng không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **MISP** | Nền chia sẻ threat intel mã nguồn mở |
| **OpenCTI** | Nền quản lý tri thức CTI, ánh xạ ATT&CK |
| **MITRE ATT&CK** | Khung TTP chung — [[MITRE ATTACK Framework]] |
| **VirusTotal / urlscan** | Làm giàu IOC |
| **STIX/TAXII** | Chuẩn biểu diễn và trao đổi — [[Indicators and Intel Sharing]] |

## Tham khảo

- [MITRE ATT&CK](https://attack.mitre.org/)
- [SANS FOR578 — Cyber Threat Intelligence](https://www.sans.org/cyber-security-courses/cyber-threat-intelligence/)
- [The Diamond Model of Intrusion Analysis](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf)
- [Recorded Future — The Threat Intelligence Handbook](https://www.recordedfuture.com/threat-intelligence-handbook)
- [MISP Project](https://www.misp-project.org/)

## Liên kết

[[OSINT Techniques]] · [[MITRE ATTACK Framework]] · [[Threat Actor Profiling]] · [[Indicators and Intel Sharing]] · [[Threat Hunting]] · [[Detection Engineering]] · [[Security]]
