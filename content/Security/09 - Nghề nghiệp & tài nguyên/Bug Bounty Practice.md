---
tags: [security, nghề-nghiệp]
status: growing
---
# Bug Bounty Practice

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] và [[Disclosure Ethics]] trước.** Scope của chương trình **là** uỷ quyền của bạn — ra ngoài scope là truy cập trái phép, kể cả khi có safe harbor.

> Bug bounty là đường xây portfolio và kiếm thu nhập từ săn lỗ hổng thật. Note này tập trung vào **kinh tế thật** của nó — không phải ảnh chụp payout khủng mà mạng xã hội hay khoe.

## 1. Cách hoạt động

Tổ chức công bố chương trình (qua HackerOne, Bugcrowd, Intigriti, hoặc tự chạy) với: **scope** (được test gì), **safe harbor** (cam kết không kiện nếu tuân thủ), và **thang thưởng** theo mức độ. Bạn tìm lỗ hổng trong scope, báo cáo, và được thưởng nếu hợp lệ và mới.

## 2. Kinh tế thật — điều mạng xã hội không cho thấy

| Ảo tưởng | Thực tế |
|---|---|
| Payout khủng thường xuyên | Phân phối đuôi cực dày; ít người kiếm nhiều, phần lớn kiếm ít |
| Tìm được bug nhanh | Hàng giờ recon cho một phát hiện; nhiều giờ không ra gì |
| Mọi báo cáo được trả | Duplicate (người khác báo trước) và out-of-scope không được trả |
| Thu nhập ổn định | Bất định cao; không phù hợp làm thu nhập chính lúc đầu |

> [!warning] Duplicate là thực tế đau nhất
> Bạn có thể bỏ 10 giờ tìm một lỗ hổng thật, viết báo cáo hoàn hảo, và nhận được "duplicate" — ai đó đã báo trước bạn vài giờ. Không thưởng. Đây là rủi ro cố hữu; nó khiến bug bounty gần với một hoạt động **đuôi dày, nhiều nỗ lực bỏ phí** hơn là một công việc lương đều — cùng dạng phân phối rủi ro trong [[Security Risk Management]].

## 3. Bug bounty vs pentest — khác biệt gốc

| | Bug bounty | Pentest |
|---|---|---|
| Trả tiền theo | Kết quả (bug hợp lệ) | Thời gian (engagement) |
| Scope | Rộng, công khai | Hẹp, hợp đồng |
| Độ phủ | Không đảm bảo | Có hệ thống — [[Penetration Testing Lifecycle]] |
| Rủi ro thu nhập | Cao (duplicate, không ra bug) | Thấp (lương/hợp đồng) |
| Sản phẩm | Báo cáo từng lỗ hổng | Báo cáo phủ toàn scope |

Với tổ chức: bug bounty **bổ sung** pentest, không thay thế — nó không đảm bảo độ phủ.

## 4. Nguyên tắc

1. **Đọc scope trước, hack sau.** Scope là uỷ quyền; ra ngoài mất safe harbor và thành trái phép — [[Disclosure Ethics]].
2. **Recon là khác biệt.** Người kiếm được đầu tư mạnh vào recon và tự động hoá — [[Reconnaissance and Enumeration]].
3. **Chuyên một lớp lỗ hổng.** Sâu về [[Broken Access Control]]/[[Business Logic Flaws]]/SSRF thắng nông về mọi thứ.
4. **Nhắm lớp scanner mù.** IDOR, logic flaw, chuỗi — nơi con người thắng công cụ.
5. **Viết báo cáo tốt.** Báo cáo tái hiện được, có tác động rõ, được trả cao hơn và nhanh hơn — [[Penetration Testing Lifecycle]].
6. **Coi là học + portfolio trước, thu nhập sau.** Nhất là lúc đầu; đừng bỏ việc để "làm bug bounty toàn thời gian" chưa có track record.
7. **Không đủ điều kiện thì đừng ép.** Chương trình cấm công bố, scope hẹp, hoặc yêu cầu KYC — đọc kỹ.

## 5. Cạm bẫy

- **Hack ngoài scope.** Mất safe harbor, thành truy cập trái phép.
- **Tin payout mạng xã hội.** Sinh tồn bias; phần lớn không kiếm được nhiều.
- **Bỏ recon.** Nhảy vào tìm bug mà không lập bản đồ → cạnh tranh ở chỗ ai cũng nhìn.
- **Chase mọi lớp lỗ hổng.** Chuyên sâu hiệu quả hơn.
- **Nhắm cái scanner bắt được.** Bị duplicate ngay vì ai cũng chạy scanner đó.
- **Báo cáo kém.** Chậm được trả hoặc bị từ chối dù bug thật.
- **Bỏ việc quá sớm.** Thu nhập bất định; xây track record trước.
- **Bỏ qua [[Disclosure Ethics]].** Chương trình có điều khoản cấm công bố — vi phạm có hậu quả pháp lý.

## 6. Checklist áp dụng

- [ ] Tôi đã đọc kỹ scope và safe harbor của chương trình chưa?
- [ ] Tôi có đang giữ trong scope không?
- [ ] Tôi đã đầu tư recon trước khi tìm bug chưa?
- [ ] Tôi có nhắm lớp lỗ hổng scanner mù (IDOR/logic/chain) không?
- [ ] Báo cáo của tôi có tái hiện được và nêu tác động rõ không?
- [ ] Tôi có kỳ vọng thực tế về thu nhập (đuôi dày, duplicate) không?
- [ ] Tôi có đang coi đây là portfolio/học trước thu nhập không?
- [ ] Tôi đã đọc điều khoản công bố ([[Disclosure Ethics]]) chưa?

## 7. Nền tảng

| Tên | Ghi chú |
|---|---|
| **HackerOne** | Lớn nhất, nhiều chương trình |
| **Bugcrowd** | Lớn, có VDP và bounty |
| **Intigriti** | Mạnh ở châu Âu |
| **YesWeHack** | Châu Âu/châu Á |
| **VDP tự chạy** | Nhiều công ty có `security.txt` — [[Disclosure Ethics]] |

## Tham khảo

- [HackerOne](https://www.hackerone.com/) · [Bugcrowd](https://www.bugcrowd.com/) · [Intigriti](https://www.intigriti.com/)
- [Bug Bounty Bootcamp — Vickie Li](https://nostarch.com/bug-bounty-bootcamp)
- [disclose.io — safe harbor](https://disclose.io/)
- [PortSwigger Academy](https://portswigger.net/web-security) — nền kỹ năng

## Liên kết

[[Disclosure Ethics]] · [[Authorization and Rules of Engagement]] · [[Web Attack Surface]] · [[Broken Access Control]] · [[CTF and Practice Platforms]] · [[Certification vs Competence]] · [[Security]]
