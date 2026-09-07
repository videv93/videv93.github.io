---
tags: [security, nền-tảng, bản-lề]
status: evergreen
---
# Offense vs Defense Bias

> ⚠️ **Note bản lề.** Đọc note này trước khi dùng thư mục `01 - Tấn công` hoặc `09 - Nghề nghiệp` để ra quyết định về sự nghiệp hay về ngân sách.

> Seed của vault này chỉ nói về tấn công. Ngành thì trả tiền chủ yếu cho phòng thủ. Note này không chọn phe — nó chỉ ra vì sao **cái được viết ra** và **cái được trả tiền** lệch nhau một cách có hệ thống, và cách đọc phần còn lại của vault khi biết điều đó.

## 1. Mâu thuẫn là gì

Seed gốc (`_archive-seed/OSCP & OSWE...md`, 250 dòng) là toàn bộ nội dung khởi đầu của area này. Nó nói về: chứng chỉ tấn công, kỹ thuật khai thác, tinh thần "Try Harder", lương pentester. Nó **không nhắc một lần nào** tới SOC, detection, forensics, GRC, quyền riêng tư, hay quản lý lỗ hổng.

Nếu xây vault theo đúng hình dạng của seed, ta sẽ có một vault mô tả **khoảng 15–20% của ngành** và trình bày nó như thể là toàn bộ. Sáu trong mười thư mục của vault này không tồn tại trong seed.

## 2. Vì sao góc nhìn tấn công không bị bác bỏ

Công bằng với nó trước — nó đúng ở nhiều điểm quan trọng:

- **Kiểm chứng được.** Một exploit chạy được là bằng chứng nhị phân. "Chúng tôi đã cải thiện tư thế bảo mật" thì không. Đây là ưu thế nhận thức luận thật sự, và là lý do [[Purple Team Exercises]] có giá trị.
- **Hiểu tấn công là điều kiện để phòng thủ tốt.** Không thể viết detection cho kỹ thuật mình chưa từng thấy chạy. [[Detection Engineering]] phụ thuộc trực tiếp vào kiến thức trong thư mục `01`.
- **Nó dạy được.** Đường học tấn công có phản hồi tức thời (shell hoặc không có shell). Đường học phòng thủ có phản hồi mờ và chậm. Điều này giải thích vì sao **tài liệu học** thiên về tấn công, không nhất thiết vì thị trường thiên về tấn công.
- **Nó chống được sự tự huyễn.** Một tổ chức chưa từng bị đội đỏ tấn công thường đánh giá quá cao khả năng của mình — trực tiếp phục vụ nguyên tắc "assume breach" trong [[Security Mental Models]].

## 3. Chỗ hai bên đồng thuận

Đây là phần lớn hơn người ta tưởng:

| Điểm | Phía tấn công nói | Phía phòng thủ nói |
|---|---|---|
| Recon là quan trọng nhất | "Enumeration quyết định kết quả" | "Kiểm kê tài sản là điều kiện tiên quyết" |
| Credential là vector số 1 | Password spraying, pass-the-hash | MFA, phát hiện đăng nhập bất thường |
| Cơ bản quan trọng hơn 0-day | Phần lớn máy bị chiếm bằng lỗi cấu hình | Vá và cấu hình đúng thắng mọi công cụ đắt tiền |
| Tài liệu hoá là công việc thật | Báo cáo là sản phẩm giao, không phải shell | Runbook, chain of custody |
| Ranh giới tin cậy là nơi có lỗi | Chỗ để pivot | Chỗ để đặt cảm biến |

**Cả hai phía đều đồng ý rằng thứ nhàm chán mới hiệu quả.** Bất đồng nằm ở chỗ *ai được trả tiền để làm nó*.

## 4. Chỗ góc nhìn seed gãy

- ⚠️ **Cơ cấu việc làm lệch mạnh về phòng thủ.** Ước lượng ngành đều đặn đặt tỉ lệ vào khoảng **một vị trí offensive cho mỗi 5–10 vị trí defensive/GRC**. Danh mục vai trò của NIST NICE có 7 categories, trong đó *Protect and Defend*, *Oversee and Govern*, *Analyze* chiếm phần lớn; toàn bộ tấn công gói trong một phần nhỏ của *Analyze*. Một người đọc seed sẽ tin điều ngược lại.
- ⚠️ **Số lương trong seed là quốc tế, áp lên bối cảnh Việt Nam.** Con số `$71.000–$130.000/năm` là dữ liệu thị trường Mỹ. Seed có ghi chú "tại Việt Nam có thể thấp hơn" nhưng không đưa con số — đó là chỗ mà một dòng cảnh báo nhẹ không cân được một con số lớn in đậm. Xem [[Certification vs Competence]].
- ⚠️ **Pentest là *đầu vào* của một quy trình, không phải kết quả.** Một báo cáo pentest tạo ra giá trị bằng không cho tới khi ai đó vá. Toàn bộ chuỗi giá trị nằm ở [[Vulnerability Management]] — thứ seed không nhắc tới.
- ⚠️ **Đường sự nghiệp offensive hẹp và bão hoà ở đầu vào.** Số người luyện OSCP nhiều hơn hẳn số vị trí junior pentester. Cùng thời gian đó, vị trí SOC analyst, GRC analyst, cloud security engineer thường tuyển nhiều hơn và ít cạnh tranh hơn.
- ⚠️ **Kỹ năng tấn công thuần khó chuyển thành ảnh hưởng tổ chức.** Thăng tiến trong bảo mật, từ mức senior trở lên, phụ thuộc vào khả năng nói chuyện rủi ro với người không kỹ thuật — [[Security Metrics and Reporting]], [[Security Culture]]. Đây là kỹ năng seed không hề đề cập.
- ⚠️ **Tấn công có trần trải nghiệm.** Sau vài năm, phần lớn engagement lặp lại cùng các lớp lỗi. Người ở lại lâu thường chuyển sang research, tooling, hoặc dựng chương trình — tức là chuyển sang xây dựng.

## 5. Cách dùng vault này một cách trung thực

| Dùng thư mục `01`, `02`, `05` như | **Không** dùng như |
|---|---|
| Nền tảng để hiểu đối thủ | Bản đồ nghề nghiệp |
| Nguồn giả thuyết cho [[Threat Hunting]] | Bằng chứng rằng offense là con đường duy nhất |
| Đầu vào cho [[Detection Engineering]] | Lý do bỏ qua thư mục `03` và `07` |
| Kỹ năng kiểm chứng biện pháp phòng thủ | Mục tiêu tự thân |

**Quy tắc đọc:** với mỗi kỹ thuật tấn công bạn học trong thư mục `01`/`02`, hỏi ngay hai câu — *"detection nào bắt được nó?"* và *"biện pháp nào làm nó không chạy được?"* Mỗi note tấn công trong vault này đều có mục trả lời hai câu đó. Học một chiều là cách biến kiến thức thành sở thích thay vì thành năng lực.

## 6. Phép kiểm bạn tự chạy được

Không cần tin note này. Ba phép kiểm rẻ, làm trong một buổi:

1. **Đếm tin tuyển dụng.** Lọc tin tuyển bảo mật trên LinkedIn/ITviec/TopCV trong 30 ngày ở thị trường bạn nhắm tới. Phân loại thành offensive / defensive-ops / GRC-compliance / engineering. Đếm. So tỉ lệ với ấn tượng bạn có sau khi đọc seed.
2. **Đối chiếu với danh mục vai trò chuẩn.** Mở [NIST NICE Framework](https://niccs.cisa.gov/workforce-development/nice-framework) và đánh dấu vai trò nào seed có nhắc tới. Tỉ lệ phủ là thước đo trực tiếp cho độ lệch của seed.
3. **Đọc một báo cáo sự cố thật.** Lấy một báo cáo DFIR công khai (Mandiant M-Trends, CISA advisory). Đếm xem bao nhiêu phần trăm công việc trong đó là tấn công, bao nhiêu là phát hiện, phân tích, khắc phục và báo cáo.

Nếu ba phép kiểm này cho ra kết quả ngược với note này, hãy sửa note này — đó chính là điều nó tồn tại để cho phép.

## Tham khảo

- [NIST NICE Workforce Framework for Cybersecurity (SP 800-181r1)](https://csrc.nist.gov/pubs/sp/800/181/r1/final) — danh mục vai trò chuẩn, dùng làm đối chứng
- [(ISC)² Cybersecurity Workforce Study](https://www.isc2.org/research) — dữ liệu thường niên về cơ cấu nhân lực
- [Verizon DBIR](https://www.verizon.com/business/resources/reports/dbir/) — dữ liệu vector xâm nhập thật, đối trọng với truyền thông
- [Mandiant M-Trends](https://www.mandiant.com/m-trends) — dwell time và cơ cấu công việc trong sự cố thật
- [CISA Known Exploited Vulnerabilities](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## Liên kết

[[Certification vs Competence]] · [[Security Career Paths]] · [[Blue Team Operations]] · [[Detection Engineering]] · [[Purple Team Exercises]] · [[Vulnerability Management]] · [[Security]]
