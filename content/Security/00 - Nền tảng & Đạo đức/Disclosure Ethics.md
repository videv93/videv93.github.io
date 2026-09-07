---
tags: [security, nền-tảng, bản-lề, đạo-đức]
status: evergreen
---
# Disclosure Ethics

> ⚠️ **Note bản lề.** Đọc trước [[Bug Bounty Practice]], [[Vulnerability Management]] và bất kỳ lúc nào bạn tìm ra một lỗ hổng trong phần mềm của người khác.

> Bạn vừa tìm ra một lỗ hổng. Không có câu trả lời đúng phổ quát cho câu hỏi tiếp theo. Note này ghi lại ba lập trường một cách trung thực, thay vì giả vờ rằng ngành đã đồng thuận — vì ngành **chưa** đồng thuận, và tranh cãi này đã kéo dài hơn hai mươi năm.

## 1. Ba lập trường

| | **Full disclosure** | **Coordinated disclosure** (CVD) | **Non-disclosure / private** |
|---|---|---|---|
| Làm gì | Công bố công khai ngay, đầy đủ chi tiết | Báo riêng cho vendor, cho thời hạn, rồi công bố | Không công bố; bán, giữ, hoặc dùng nội bộ |
| Lập luận chính | Người dùng có quyền biết mình đang gặp rủi ro **ngay bây giờ** | Cân bằng giữa quyền được biết và thời gian vá | Chi tiết công khai giúp kẻ tấn công nhiều hơn giúp người phòng thủ |
| Ai ủng hộ | Truyền thống hacker, Bugtraq/full-disclosure list | Phần lớn ngành, CERT/CC, ISO 29147 | Chính phủ, nhà thầu, thị trường exploit |
| Điểm mạnh | Tạo áp lực duy nhất thực sự hiệu quả lên vendor chây ì | Trong đa số trường hợp, cho kết quả tốt nhất cho người dùng | Đúng trong một số ít trường hợp hạ tầng trọng yếu |
| Điểm gãy | Người dùng bị phơi ra trước khi có bản vá | **Vendor có thể lợi dụng thời hạn để trì hoãn vô hạn** | Không kiểm chứng được; lỗ hổng có thể đã bị bên khác tìm ra |

**Không bên nào sai một cách hiển nhiên.** Full disclosure ra đời chính vì coordinated disclosure bị lạm dụng: vendor nhận báo cáo rồi im lặng hàng năm. Coordinated disclosure ra đời chính vì full disclosure có lúc gây hại thật cho người dùng không liên quan.

## 2. Chỗ ba bên đồng thuận

| Điểm | Ghi chú |
|---|---|
| Báo cho vendor trước là mặc định hợp lý | Cả ba lập trường đều chấp nhận, khác nhau ở *chờ bao lâu* |
| Không bao giờ tống tiền | "Trả tiền không thì tôi công bố" là tội phạm ở mọi lập trường |
| Không truy cập dữ liệu thật của người dùng | Chứng minh lỗ hổng ≠ khai thác nó — xem [[Authorization and Rules of Engagement]] |
| Thời hạn phải công bố trước, không đặt sau | Thay đổi luật giữa cuộc chơi làm hỏng lòng tin cả hai chiều |
| Lỗ hổng đang bị khai thác thật đổi mọi tính toán | Có bằng chứng khai thác trong tự nhiên → rút ngắn thời hạn mạnh |

## 3. Thời hạn trên thực tế

| Bên | Thời hạn | Ghi chú |
|---|---|---|
| **Google Project Zero** | 90 ngày, +14 ngày gia hạn; **7 ngày** nếu đang bị khai thác | Chính sách có ảnh hưởng lớn nhất tới chuẩn ngành |
| **CERT/CC** | 45 ngày | Ngắn hơn, mặc định công bố kể cả khi chưa có vá |
| **ZDI** | 120 ngày | Dài hơn vì mua lại lỗ hổng |
| **ISO/IEC 29147 & 30111** | Không quy định số ngày | Quy định **quy trình** vendor phải có, không quy định thời hạn |

> [!note] Vì sao Project Zero chuyển sang "90+30" (2021)
> Chính sách cũ cho phép công bố ngay khi có bản vá. Kết quả ngoài dự kiến: người dùng bị phơi ra trong khoảng giữa *bản vá phát hành* và *bản vá được cài*. Chính sách mới giữ đủ 90 ngày rồi mới công bố chi tiết, ưu tiên **thời gian triển khai vá**, không chỉ thời gian tạo vá. Bài học chuyển được: thời hạn tốt phải tính tới bên chậm nhất trong chuỗi, không chỉ vendor.

## 4. Chỗ mọi thứ thực sự khó

- **Vendor không có kênh tiếp nhận.** Rất phổ biến ngoài mảng phần mềm lớn. Thử `security.txt`, `security@`, CERT quốc gia (VNCERT tại Việt Nam), hoặc CERT/CC làm bên điều phối.
- **Vendor phản ứng bằng luật sư.** Xảy ra thật, và nhiều lần. Đây là lúc safe harbor và [[Authorization and Rules of Engagement]] quan trọng hơn mọi lập luận đạo đức.
- **Lỗ hổng trong hệ thống bạn không được phép chạm.** Tìm ra một cách tình cờ không tạo ra quyền xác minh nó. Báo cáo cái bạn quan sát được, đừng đào sâu thêm.
- **Lỗ hổng ảnh hưởng nhiều vendor.** Cần bên điều phối; tự làm sẽ hoặc lộ sớm, hoặc kéo dài vô hạn theo vendor chậm nhất.
- **Bạn ở trong một chương trình bug bounty có điều khoản cấm công bố.** Nhiều chương trình mua **sự im lặng** chứ không chỉ mua báo cáo. Đọc kỹ trước khi nộp — xem [[Bug Bounty Practice]].
- **Hạ tầng trọng yếu, thiết bị y tế, xe.** Chu kỳ vá tính bằng năm, không phải tuần, và hậu quả là vật lý. Thời hạn 90 ngày có thể không phù hợp; điều phối qua CISA/ICS-CERT.

## 5. Cách hành xử trung thực

1. **Quyết định lập trường và thời hạn *trước khi* liên hệ**, rồi nói rõ trong email đầu tiên.
2. **Gửi báo cáo tái hiện được**: phiên bản, môi trường, các bước, tác động. Báo cáo mơ hồ là lý do phổ biến nhất khiến vendor im lặng.
3. **Ghi lại toàn bộ trao đổi kèm mốc thời gian.** Đây là bằng chứng của bạn nếu có tranh chấp về việc ai biết gì lúc nào.
4. **Xin CVE** qua CNA của vendor hoặc MITRE. CVE làm lỗ hổng theo dõi được ở [[Vulnerability Management]] của hàng nghìn tổ chức khác.
5. **Gia hạn khi vendor đang thật sự làm việc; giữ thời hạn khi họ chỉ đang im lặng.** Phân biệt hai thứ đó bằng bằng chứng tiến độ, không bằng lời hứa.
6. **Khi công bố, cân nhắc tách PoC khỏi mô tả.** Mô tả giúp người phòng thủ đánh giá và phát hiện; PoC đầy đủ chủ yếu giúp người tấn công trong cửa sổ trước khi vá được triển khai.

## 6. Phép kiểm tự chạy được

Trước khi hành động, trả lời bằng chữ:

- *Nếu lỗ hổng này được công bố hôm nay, ai bị hại và trong bao lâu?*
- *Nếu tôi im lặng thêm 90 ngày, ai bị hại nếu người khác đã biết nó?*
- *Quyết định của tôi có thay đổi không nếu tôi không được ghi công?* — nếu có, động cơ đang lái, không phải nguyên tắc.
- *Tôi có chấp nhận được việc toàn bộ email của mình về vụ này bị công khai không?*

## Tham khảo

- [Google Project Zero — Vulnerability Disclosure Policy](https://googleprojectzero.blogspot.com/p/vulnerability-disclosure-policy.html)
- [ISO/IEC 29147:2018 — Vulnerability disclosure](https://www.iso.org/standard/72311.html) và [ISO/IEC 30111:2019 — Vulnerability handling](https://www.iso.org/standard/69725.html)
- [CERT Guide to Coordinated Vulnerability Disclosure (CMU/SEI)](https://insights.sei.cmu.edu/library/the-cert-guide-to-coordinated-vulnerability-disclosure/)
- [CISA Coordinated Vulnerability Disclosure Process](https://www.cisa.gov/coordinated-vulnerability-disclosure-process)
- [security.txt — RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)

## Liên kết

[[Authorization and Rules of Engagement]] · [[Bug Bounty Practice]] · [[Vulnerability Management]] · [[Cyber Threat Intelligence]] · [[Security]]
