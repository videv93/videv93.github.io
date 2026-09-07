---
tags: [security, tấn-công]
status: evergreen
---
# Reconnaissance and Enumeration

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.** Recon thụ động thường hợp pháp; recon chủ động là **chạm vào hệ thống người khác** và cần uỷ quyền.

> Câu nói đúng nhất trong pentest: *"enumeration là chìa khoá"*. Nó nhàm chán, tốn thời gian, không ai quay video về nó — và nó quyết định kết quả của toàn bộ engagement.

## 1. Hai loại recon

| | **Thụ động (passive)** | **Chủ động (active)** |
|---|---|---|
| Định nghĩa | Không gửi gói tin nào tới mục tiêu | Tương tác trực tiếp |
| Ví dụ | DNS công khai, chứng chỉ CT, GitHub, Shodan, WHOIS | Port scan, banner grab, directory brute force |
| Rủi ro pháp lý | Thấp, thường hợp pháp | Cần uỷ quyền |
| Bị phát hiện | Gần như không | Có, và đó là điều blue team **nên** thấy |
| Sản phẩm | Bề mặt tấn công tiềm năng | Bề mặt tấn công xác nhận |

Nguyên tắc thứ tự: **vắt kiệt thụ động trước khi chạm chủ động.** Nó rẻ hơn, an toàn hơn, và thường cho ra thứ mà quét chủ động không thấy — subdomain quên lãng, credential trong lịch sử Git.

## 2. Bản đồ recon theo lớp

| Lớp | Tìm gì | Nguồn/kỹ thuật |
|---|---|---|
| **Tổ chức** | Nhân sự, email format, nhà cung cấp | LinkedIn, tin tuyển dụng (lộ tech stack), [[OSINT Techniques]] |
| **Tên miền** | Subdomain, domain liên quan | Certificate Transparency (crt.sh), amass, subfinder, DNS brute |
| **IP & ASN** | Dải địa chỉ thật sự thuộc mục tiêu | WHOIS, BGP, ASN lookup — **xác minh quyền sở hữu trước khi quét** |
| **Dịch vụ** | Port mở, phiên bản, công nghệ | nmap, masscan, Shodan/Censys (thụ động) |
| **Ứng dụng web** | Endpoint, tham số, công nghệ | ffuf, katana, Wappalyzer, JS file parsing |
| **Danh tính** | Email, tài khoản, credential rò rỉ | HaveIBeenPwned, dump công khai — [[Password Attacks and Credential Access]] |
| **Code** | Secret, logic nội bộ | GitHub/GitLab, trufflehog, gitleaks |
| **Cloud** | Bucket, tenant, tài nguyên lộ | Tên bucket đoán được, DNS CNAME — [[Cloud Security Posture]] |

### Mỏ vàng hay bị bỏ qua

- **Certificate Transparency logs** — mọi chứng chỉ TLS phát hành đều công khai. Đây là cách nhanh nhất để tìm subdomain, kể cả cái không có bản ghi DNS công khai.
- **File JavaScript của ứng dụng.** Chứa endpoint API, feature flag, đôi khi cả khoá. Grep chúng trước khi brute force bất cứ thứ gì.
- **Tin tuyển dụng.** "Yêu cầu kinh nghiệm Jenkins, Kubernetes, Okta" là bản mô tả hạ tầng do chính mục tiêu công bố.
- **Lịch sử Git, không chỉ HEAD.** Secret bị xoá vẫn nằm trong commit cũ.
- **Subdomain trỏ tới dịch vụ đã huỷ** → subdomain takeover. Chi phí thấp, tác động cao.

## 3. Nguyên tắc

1. **Quay lại recon mỗi khi bế tắc.** Bế tắc gần như luôn có nghĩa là bạn chưa liệt kê đủ, không phải bạn cần exploit tinh vi hơn. Đây là ý nghĩa thật của "Try Harder".
2. **Ghi chép có cấu trúc từ đầu.** Một file cho mỗi host, cập nhật liên tục. Cuối engagement bạn sẽ không nhớ port 8443 ở máy nào.
3. **Quét đủ dải cổng.** Mặc định nmap chỉ 1000 cổng phổ biến. Dịch vụ thú vị nhất thường nằm ngoài đó.
4. **Enumerate mọi dịch vụ tìm được, kể cả dịch vụ nhàm chán.** SMB, SNMP, NFS, LDAP thường cho ra thông tin mà HTTP không cho.
5. **Xác minh quyền sở hữu trước khi quét.** IP đổi chủ. Quét nhầm là truy cập trái phép.
6. **Recon thụ động cũng cần cân nhắc đạo đức.** Thu thập thông tin cá nhân nhân viên có ràng buộc pháp lý riêng — xem [[Privacy and Data Protection]].
7. **Điều chỉnh tốc độ theo mục tiêu.** Quét nhanh làm sập thiết bị cũ và hệ thống công nghiệp là chuyện thật.

## 4. Cạm bẫy

- **Chuyển sang khai thác quá sớm.** Sai lầm số một của người luyện OSCP: thấy một dịch vụ có CVE là lao vào, bỏ qua bảy dịch vụ còn lại — trong đó có cái dễ hơn nhiều.
- **Tin vào phiên bản trong banner.** Backport bản vá là chuẩn mực ở các bản phân phối Linux; banner nói `2.4.29` không nghĩa là chưa vá.
- **Chỉ quét TCP.** UDP chậm và khó chịu, nên bị bỏ — và đó là nơi SNMP, TFTP, IKE nằm.
- **Không phân giải tên host.** Nhiều web server chỉ trả nội dung thật khi có đúng `Host` header. Quét theo IP sẽ thấy trang mặc định và bạn kết luận sai.
- **Bỏ qua chứng chỉ TLS.** Trường `subjectAltName` liệt kê hostname nội bộ, miễn phí.
- **Wordlist mặc định cho mọi mục tiêu.** Wordlist theo ngữ cảnh (tên sản phẩm, tên nội bộ tìm được lúc recon) hiệu quả hơn danh sách 200.000 từ chung chung.
- **Recon ồn ào trong red team.** Nếu mục tiêu là kiểm tra detection, quét toàn bộ dải cổng ở tốc độ tối đa đã trả lời câu hỏi theo cách vô ích.

## 5. Checklist áp dụng

- [ ] Tôi đã vắt kiệt nguồn thụ động trước khi chạm mục tiêu chưa?
- [ ] Tôi đã xác minh quyền sở hữu mọi IP/domain trong scope chưa?
- [ ] Đã quét **toàn bộ 65535 cổng TCP** chưa? Đã quét UDP các cổng phổ biến chưa?
- [ ] Với mỗi dịch vụ mở, tôi đã chạy enumeration chuyên biệt cho giao thức đó chưa?
- [ ] Đã lấy subdomain từ Certificate Transparency chưa?
- [ ] Đã đọc file JavaScript và tìm endpoint ẩn chưa?
- [ ] Đã tìm secret trong lịch sử Git công khai chưa?
- [ ] Ghi chép của tôi có đủ để người khác tiếp quản engagement không?
- [ ] Khi bế tắc: tôi đã quay lại recon chưa, hay đang cố exploit khó hơn?

## 6. Công cụ

| Tên | Vai trò | Ghi chú |
|---|---|---|
| **nmap** | Quét cổng, phát hiện dịch vụ, NSE script | Chuẩn mực; học `-sV -sC -p-` và cách viết script NSE |
| **masscan** | Quét dải lớn cực nhanh | Dùng để khoanh vùng, rồi nmap kỹ lại |
| **amass / subfinder** | Liệt kê subdomain | Kết hợp nhiều nguồn thụ động |
| **crt.sh** | Certificate Transparency | Truy vấn SQL trực tiếp được |
| **Shodan / Censys** | Bản đồ Internet, thụ động | Thấy được cả thiết bị không nằm trong DNS |
| **ffuf / feroxbuster** | Fuzz đường dẫn và tham số | Nhanh, wordlist là yếu tố quyết định |
| **trufflehog / gitleaks** | Secret trong repo | Quét cả lịch sử commit |
| **BloodHound** | Liệt kê quan hệ Active Directory | Xem [[Active Directory Attacks]] |

## Tham khảo

- [OSINT Framework](https://osintframework.com/)
- [Nmap Network Scanning (Gordon Lyon)](https://nmap.org/book/) — sách chính thức, phần lớn miễn phí online
- [OWASP WSTG — Information Gathering](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/)
- [Certificate Transparency](https://certificate.transparency.dev/)
- [SecLists — wordlist chuẩn](https://github.com/danielmiessler/SecLists)

## Liên kết

[[Penetration Testing Lifecycle]] · [[OSINT Techniques]] · [[Web Attack Surface]] · [[Active Directory Attacks]] · [[Cloud Security Posture]] · [[Security]]
