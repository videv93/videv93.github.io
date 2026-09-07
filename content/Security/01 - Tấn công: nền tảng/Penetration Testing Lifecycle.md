---
tags: [security, tấn-công, quy-trình]
status: evergreen
---
# Penetration Testing Lifecycle

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước mọi note trong thư mục này.**
> ⚠️ Đọc [[Offense vs Defense Bias]] trước khi dùng thư mục này để ra quyết định nghề nghiệp.

> Pentest không phải "tìm shell". Nó là một quy trình có sản phẩm giao, và sản phẩm giao đó là **một báo cáo làm cho tổ chức an toàn hơn** — không phải một ảnh chụp màn hình `root`.

## 1. Bảy pha (PTES)

| Pha | Nội dung | Tỉ lệ thời gian thực tế | Sai lầm hay gặp |
|---|---|---|---|
| **1. Pre-engagement** | Scope, RoE, hợp đồng, đầu mối | 5% | Bỏ qua, rồi trả giá về sau |
| **2. Intelligence gathering** | OSINT, bề mặt tấn công — [[Reconnaissance and Enumeration]] | 20–30% | Làm ẩu; đây là pha quyết định kết quả |
| **3. Threat modeling** | Đường tấn công nào đáng theo — [[Threat Modeling Practice]] | 5% | Bỏ qua, dẫn tới quét mù |
| **4. Vulnerability analysis** | Xác nhận lỗ hổng có thật, không phải false positive | 15% | Tin scanner |
| **5. Exploitation** | Chứng minh tác động — [[Exploitation Fundamentals]] | 15% | Pha *duy nhất* mà người mới coi là pentest |
| **6. Post-exploitation** | Tác động thật là gì — [[Post-Exploitation and Lateral Movement]] | 15% | Dừng ở shell, không trả lời "rồi sao?" |
| **7. Reporting** | Sản phẩm giao | **20–25%** | Bị dồn vào đêm cuối |

> [!note] Con số đáng nhớ
> Pha 5 — cái mà mọi khoá học tập trung vào — chiếm khoảng **một phần bảy** thời gian. Pha 2 và pha 7 cộng lại chiếm gần một nửa. Đây là khoảng cách lớn nhất giữa cách pentest *được dạy* và cách nó *được làm*.

## 2. Các loại engagement — chọn sai loại là hỏng từ đầu

| Loại | Kiến thức cho trước | Câu hỏi nó trả lời | Không trả lời được |
|---|---|---|---|
| **Black-box** | Không có gì | "Kẻ ngoài có vào được không?" | Lỗi sâu trong code; tốn thời gian recon |
| **Grey-box** | Tài khoản, sơ đồ | "Người dùng thường leo được tới đâu?" | — mặc định hợp lý cho phần lớn hợp đồng |
| **White-box** | Mã nguồn, kiến trúc | "Lỗi thật nằm ở đâu?" — [[Source Code Review for Vulnerabilities]] | Không mô phỏng kẻ tấn công thật |
| **Red team** | Không, và **blue team không biết** | "Ta phát hiện được không?" | Không phủ hết bề mặt; đo detection, không đo lỗ hổng |
| **Purple team** | Hợp tác công khai | "Detection nào thiếu?" — [[Purple Team Exercises]] | Không đo được phản ứng thật |
| **Vulnerability assessment** | Thường có quyền truy cập | "Có bao nhiêu lỗ hổng?" | **Không** khai thác; rẻ hơn nhiều, và thường là thứ khách hàng thật sự cần |

> [!warning] Nhầm lẫn đắt nhất trong ngành
> Khách hàng nói "pentest" nhưng cần **vulnerability assessment**; hoặc mua pentest khi chưa vá nổi kết quả của lần quét trước. Pentest cho một tổ chức chưa có [[Vulnerability Management]] là mua một danh sách sẽ không ai đọc.

## 3. Nguyên tắc

1. **Báo cáo là sản phẩm, shell là bằng chứng.** Nếu người đọc báo cáo không sửa được gì sau khi đọc, engagement đã thất bại dù bạn đã domain admin.
2. **Ghi lại khi đang làm, không phải sau khi làm.** Mốc thời gian, lệnh chạy, ảnh chụp. Ký ức sẽ hỏng, và bạn cần chứng minh mình *không* gây ra sự cố khác.
3. **Ưu tiên theo tác động kinh doanh, không theo độ khó kỹ thuật.** Một IDOR nhàm chán lộ toàn bộ dữ liệu khách hàng xếp trên một chuỗi RCE tinh vi trên máy in phòng họp.
4. **Xác nhận mọi phát hiện của scanner bằng tay.** False positive trong báo cáo phá huỷ uy tín nhanh hơn bất cứ thứ gì.
5. **Đừng gây thiệt hại để chứng minh có thể gây thiệt hại.** Chứng minh quyền ghi bằng một file test có tên rõ ràng, không bằng cách xoá gì đó.
6. **Debrief trực tiếp quan trọng ngang báo cáo.** Đây là lúc đội kỹ thuật hỏi được "vậy chúng tôi sửa thế nào".
7. **Retest nằm trong phạm vi.** Phát hiện không được xác nhận đã sửa thì chỉ là giả định đã sửa.

## 4. Cấu trúc báo cáo dùng được

| Phần | Người đọc | Nội dung |
|---|---|---|
| Executive summary | Lãnh đạo | Rủi ro kinh doanh, 1 trang, **không thuật ngữ** |
| Phạm vi & phương pháp | Kiểm toán | Cái gì được test, cái gì không, khi nào |
| Tổng hợp phát hiện | Quản lý kỹ thuật | Bảng xếp theo mức độ, có xu hướng |
| Chi tiết từng phát hiện | Kỹ sư | Mô tả, bằng chứng tái hiện được, tác động, **khắc phục cụ thể** |
| Phụ lục | Kỹ sư | Log, output công cụ, danh sách máy |

Mỗi phát hiện phải trả lời: *cái gì sai — tôi biết bằng cách nào — nó có hại gì — tôi sửa thế nào — tôi kiểm lại thế nào.*

## 5. Cạm bẫy

- **Scope creep khi tìm được đường đi đẹp.** Cạm bẫy phổ biến nhất, xảy ra đúng lúc bạn kém tỉnh táo nhất. Xem [[Authorization and Rules of Engagement]].
- **Chỉ báo cáo cái khai thác được.** Cấu hình sai chưa khai thác được hôm nay vẫn là phát hiện có giá trị.
- **Copy-paste mô tả từ CVE.** Người đọc cần biết nó có nghĩa gì *trong hệ thống của họ*, không cần định nghĩa chung.
- **Xếp mọi thứ là Critical.** Lạm phát mức độ khiến báo cáo mất khả năng dùng để ưu tiên — đúng vấn đề mà [[Contest Severity vs Real Risk]] mô tả trong lĩnh vực audit blockchain.
- **Không dọn dẹp.** Webshell, tài khoản, file để lại là món quà cho kẻ tấn công thật. Lập danh sách artefact ngay khi tạo ra chúng.
- **Không cảnh báo ngay khi phát hiện nghiêm trọng.** Critical không chờ tới ngày nộp báo cáo — gọi điện.
- **Bỏ qua dấu hiệu hệ thống đã bị xâm nhập từ trước.** Dừng, báo, chuyển sang [[Security Incident Response]].

## 6. Checklist áp dụng

- [ ] RoE ký, scope xác minh, cửa sổ thời gian còn hiệu lực?
- [ ] Tôi đã chọn **đúng loại engagement** cho câu hỏi khách hàng thật sự hỏi chưa?
- [ ] Tôi có đang ghi log song song với việc test không?
- [ ] Mọi phát hiện từ scanner đã được xác nhận thủ công chưa?
- [ ] Mỗi phát hiện có bước tái hiện mà kỹ sư của khách chạy lại được không?
- [ ] Mức độ có phản ánh **tác động kinh doanh** không, hay chỉ CVSS?
- [ ] Tôi đã liệt kê và dọn sạch mọi artefact tạo ra chưa?
- [ ] Có phát hiện critical nào cần báo ngay, không chờ báo cáo không?
- [ ] Có lịch retest không?

## Công cụ

| Tên | Vai trò | Link |
|---|---|---|
| **PTES** | Chuẩn quy trình, miễn phí | [pentest-standard.org](http://www.pentest-standard.org/) |
| **OWASP WSTG** | Checklist kiểm thử web chi tiết nhất | [owasp.org/wstg](https://owasp.org/www-project-web-security-testing-guide/) |
| **NIST SP 800-115** | Hướng dẫn kiểm thử bảo mật kỹ thuật | [csrc.nist.gov](https://csrc.nist.gov/pubs/sp/800/115/final) |
| **Dradis / Faraday / Ghostwriter** | Quản lý bằng chứng và sinh báo cáo | [ghostwriter.wiki](https://www.ghostwriter.wiki/) |
| **OSSTMM** | Phương pháp luận đo lường, khô nhưng nghiêm ngặt | [isecom.org](https://www.isecom.org/OSSTMM.3.pdf) |

## Tham khảo

- [Penetration Testing Execution Standard (PTES)](http://www.pentest-standard.org/index.php/Main_Page)
- [NIST SP 800-115 — Technical Guide to Information Security Testing](https://csrc.nist.gov/pubs/sp/800/115/final)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OSSTMM 3](https://www.isecom.org/OSSTMM.3.pdf)

## Liên kết

[[Authorization and Rules of Engagement]] · [[Reconnaissance and Enumeration]] · [[Exploitation Fundamentals]] · [[Post-Exploitation and Lateral Movement]] · [[Vulnerability Management]] · [[OSCP Preparation Path]] · [[Security]]
