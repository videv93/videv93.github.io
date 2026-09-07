---
tags: [security, nền-tảng, pháp-lý]
status: evergreen
---
# Authorization and Rules of Engagement

> Ranh giới giữa một pentester và một tội phạm **không nằm ở kỹ thuật** — hai người chạy đúng cùng một lệnh. Nó nằm ở một tờ giấy có chữ ký.

> [!warning] Note này là điều kiện tiên quyết
> Mọi note trong `01 - Tấn công`, `02 - Bảo mật ứng dụng web` và `05 - Malware & Reverse Engineering` đều giả định bạn đã đọc note này. Không có uỷ quyền thì không có pentest — chỉ có xâm nhập trái phép.

## 1. Khái niệm cốt lõi

### Bốn cấp uỷ quyền, từ mạnh tới yếu

| Cấp | Hình thức | Bảo vệ bạn tới đâu |
|---|---|---|
| **Hợp đồng có scope** | Statement of Work + Rules of Engagement ký bởi người **có thẩm quyền ký** | Mạnh nhất; là thứ duy nhất nên dựa vào cho công việc trả tiền |
| **Chính sách bug bounty** | Safe harbor công bố công khai (HackerOne, VDP) | Mạnh trong phạm vi công bố; **ra ngoài scope là mất hiệu lực ngay** |
| **Lab riêng của bạn** | Máy bạn sở hữu, mạng cách ly | Tuyệt đối, nếu thật sự cách ly — xem [[Security Lab Setup]] |
| **"Chắc là không sao"** | Không có gì | Không bảo vệ gì cả |

### Rules of Engagement gồm những gì

| Mục | Vì sao bắt buộc |
|---|---|
| **Scope**: IP, domain, tài khoản, ứng dụng | Ngoài scope = không được uỷ quyền, kể cả khi chạm được |
| **Loại trừ tường minh** | Hệ thống production, dữ liệu khách hàng thật, hệ thống bên thứ ba |
| **Cửa sổ thời gian** | Uỷ quyền có hạn; tuần sau là trái phép |
| **Kỹ thuật bị cấm** | DoS, social engineering, tấn công vật lý — mặc định là **cấm** trừ khi cho phép rõ |
| **Xử lý dữ liệu** | Được sao chép gì, lưu ở đâu, xoá khi nào |
| **Đầu mối khẩn cấp** | Số điện thoại gọi được lúc 3h sáng khi làm sập cái gì đó |
| **Điều khoản "get out of jail"** | Thư uỷ quyền mang theo người, có thể xuất trình cho pháp luật |
| **Quy tắc leo thang** | Gặp bằng chứng bị xâm nhập từ trước, hoặc dữ liệu bất hợp pháp — dừng và báo ngay |

### Bối cảnh pháp lý

| Nơi | Văn bản | Điểm phải biết |
|---|---|---|
| **Việt Nam** | Bộ luật Hình sự 2015 (sđ 2017), Điều 285–289 | Điều 289 — truy cập trái phép mạng máy tính; hình phạt tới 12 năm ở khung nặng |
| **Việt Nam** | Luật An ninh mạng 2018; Nghị định 13/2023/NĐ-CP | Nghĩa vụ dữ liệu cá nhân — xem [[Privacy and Data Protection]] |
| **Mỹ** | Computer Fraud and Abuse Act (CFAA) | *Van Buren v. US* (2021) thu hẹp "exceeds authorized access", nhưng truy cập không phép vẫn phạm |
| **Mỹ** | DOJ policy 5/2022 | Không truy tố nghiên cứu bảo mật ngay tình — là **chính sách**, không phải luật; có thể đổi |
| **EU** | Directive 2013/40/EU | Từng quốc gia nội luật hoá khác nhau |

> [!note] Điều dễ hiểu sai nhất
> **Lỗ hổng dễ khai thác không phải là lời mời.** Cửa không khoá vẫn là nhà người khác. "Tôi chỉ muốn giúp" không phải một biện hộ pháp lý ở bất kỳ đâu.

## 2. Nguyên tắc

1. **Uỷ quyền phải bằng văn bản, từ người có thẩm quyền.** Trưởng phòng IT thường **không** có thẩm quyền uỷ quyền tấn công hạ tầng công ty. Hỏi ai ký được.
2. **Scope là trần, không phải sàn.** Chạm được thứ ngoài scope không tạo ra quyền chạm nó. Ghi lại, báo cáo, dừng.
3. **Kiểm scope lại theo thời gian thực.** Địa chỉ IP đổi chủ. Một `/24` hôm nay có thể chứa máy của công ty khác vào tuần sau. Xác minh quyền sở hữu trước mỗi đợt quét.
4. **Ghi nhật ký mọi thứ bạn làm, kèm mốc thời gian.** Vừa để viết báo cáo, vừa để chứng minh bạn *không* làm cái mà người khác đã làm.
5. **Dừng khi gặp dấu hiệu xâm nhập có sẵn.** Bạn vừa bước vào hiện trường. Tiếp tục sẽ phá bằng chứng — xem [[Digital Forensics]].
6. **Bug bounty: đọc scope trước, hack sau.** Safe harbor chỉ có hiệu lực trong đúng phạm vi công bố. Xem [[Bug Bounty Practice]].
7. **Không dùng dữ liệu thật của người thật để chứng minh.** Một ảnh chụp danh sách khách hàng biến báo cáo của bạn thành tang vật.

## 3. Cạm bẫy

- **Uỷ quyền miệng.** Sếp gật đầu trong cuộc họp không tồn tại khi mọi thứ đổ vỡ. Người gật đầu sẽ nhớ khác bạn.
- **Scope creep khi đang hào hứng.** Chuỗi khai thác đẹp dẫn qua một hệ thống ngoài scope là cái bẫy phổ biến nhất — và là lúc bạn ít tỉnh táo nhất.
- **Quét từ IP nhà.** Không sai luật, nhưng gắn danh tính thật vào lưu lượng tấn công. Dùng hạ tầng tách bạch cho công việc có uỷ quyền.
- **Bỏ qua nhà cung cấp cloud.** Trước đây AWS/Azure/GCP yêu cầu xin phép; nay phần lớn pentest không cần, **nhưng** stress test và một số dịch vụ vẫn cần. Kiểm chính sách hiện hành, đừng nhớ theo trí nhớ.
- **Test social engineering không có điều khoản riêng.** Lừa nhân viên có thể vi phạm luật lao động và tạo tổn hại thật cho người thật. Cần phê duyệt riêng và cần kế hoạch debrief — xem [[Social Engineering]].
- **Giả định lab CTF miễn trừ mọi thứ.** Tấn công hạ tầng *của ban tổ chức* thay vì máy mục tiêu là vi phạm ở mọi giải.
- **Ảnh chụp màn hình chứa dữ liệu thật trong báo cáo.** Che, hoặc dùng tài khoản test.

## 4. Checklist trước khi gõ lệnh đầu tiên

- [ ] Tôi có văn bản uỷ quyền ký bởi người có thẩm quyền không?
- [ ] Scope có được liệt kê tường minh, và tôi có bản sao không?
- [ ] Cửa sổ thời gian còn hiệu lực hôm nay không?
- [ ] Tôi đã xác minh **quyền sở hữu** các IP/domain trong scope chưa?
- [ ] Kỹ thuật tôi định dùng (DoS, SE, brute force) có được cho phép rõ không?
- [ ] Tôi biết gọi ai lúc 3h sáng nếu làm sập production không?
- [ ] Tôi có kế hoạch xử lý và xoá dữ liệu thu được không?
- [ ] Tôi có thư uỷ quyền mang theo người không?
- [ ] Tôi đã quyết định trước sẽ làm gì nếu gặp dấu hiệu bị xâm nhập từ trước chưa?

## Tham khảo

- [PTES — Pre-engagement Interactions](http://www.pentest-standard.org/index.php/Pre-engagement) — mẫu RoE chi tiết nhất, miễn phí
- [Bộ luật Hình sự 2015 — Điều 289](https://thuvienphapluat.vn/van-ban/Trach-nhiem-hinh-su/Bo-luat-hinh-su-2015-296661.aspx)
- [Van Buren v. United States (2021), 593 U.S. 374](https://www.supremecourt.gov/opinions/20pdf/19-783_k53l.pdf)
- [DOJ — Policy on charging under CFAA (5/2022)](https://www.justice.gov/opa/pr/department-justice-announces-new-policy-charging-cases-under-computer-fraud-and-abuse-act)
- [disclose.io — safe harbor templates](https://disclose.io/)

## Liên kết

[[Disclosure Ethics]] · [[Penetration Testing Lifecycle]] · [[Bug Bounty Practice]] · [[Security Lab Setup]] · [[Privacy and Data Protection]] · [[Security]]
