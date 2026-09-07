---
tags: [security, nền-tảng, quy-trình]
status: evergreen
---
# Threat Modeling Practice

> Ai cũng có một mô hình đe doạ trong đầu. Threat modeling chỉ là **viết nó ra**, để người khác chỉ ra được chỗ nó sai.

> [!note] Phân biệt với note cùng chủ đề ở area khác
> [[Threat Model & Attacks]] (Networking) nói về *các loại tấn công ở tầng mạng*. Note này nói về **quy trình** dựng mô hình đe doạ cho một hệ thống bất kỳ — ai ngồi vào phòng, hỏi gì, ra sản phẩm gì.

## 1. Khái niệm cốt lõi

### Bốn câu hỏi của Shostack — khung xương của mọi phương pháp

| Câu hỏi | Sản phẩm | Sai lầm hay gặp |
|---|---|---|
| **1. Ta đang xây cái gì?** | Data flow diagram, ranh giới tin cậy | Vẽ sơ đồ kiến trúc thay vì luồng dữ liệu |
| **2. Cái gì có thể sai?** | Danh sách đe doạ | Dừng ở đe doạ hiển nhiên |
| **3. Ta sẽ làm gì với nó?** | Quyết định: giảm/chuyển/tránh/chấp nhận | Chỉ liệt kê, không quyết |
| **4. Ta đã làm tốt chưa?** | Rà lại, và kiểm chứng biện pháp | Bỏ hẳn bước này |

Câu 3 và 4 là chỗ phần lớn buổi threat modeling thất bại — chúng cho ra một danh sách đẹp rồi không ai làm gì cả.

### STRIDE — bộ gợi ý, không phải phân loại

| Chữ | Đe doạ | Vi phạm | Biện pháp điển hình |
|---|---|---|---|
| **S**poofing | Giả danh | Authenticity | Xác thực mạnh, MFA |
| **T**ampering | Sửa dữ liệu | Integrity | Chữ ký, checksum, WORM log |
| **R**epudiation | Chối bỏ hành vi | Non-repudiation | Audit log không sửa được |
| **I**nformation disclosure | Rò rỉ | Confidentiality | Mã hoá, [[Broken Access Control]] |
| **D**enial of service | Từ chối dịch vụ | Availability | Rate limit, quota, autoscale |
| **E**levation of privilege | Leo thang | Authorization | Least privilege, [[Privilege Escalation]] |

Cách dùng đúng: đi qua **từng phần tử** trong DFD (process, data store, data flow, external entity) và hỏi cả sáu chữ. Nó là công cụ chống bỏ sót, không phải bảng phân loại để cãi nhau xem một đe doạ thuộc chữ nào.

### So sánh các phương pháp

| Phương pháp | Trọng tâm | Chi phí | Hợp với |
|---|---|---|---|
| **STRIDE** | Hệ thống, theo phần tử | Trung bình | Đội phát triển, dùng thường xuyên |
| **Attack tree** | Một mục tiêu, nhiều đường | Trung bình | Đào sâu một kịch bản cụ thể |
| **PASTA** | Rủi ro, gắn với kinh doanh | Cao (7 giai đoạn) | Tổ chức có quy trình GRC trưởng thành |
| **LINDDUN** | **Quyền riêng tư**, không phải bảo mật | Trung bình | Hệ thống xử lý dữ liệu cá nhân |
| **Attack trees + ATT&CK** | Đối chiếu với kỹ thuật thật | Thấp | Đội có [[Detection Engineering]] |
| **Card game (Elevation of Privilege)** | Dạy người mới | Rất thấp | Buổi đầu tiên của một đội chưa quen |

### Ranh giới tin cậy — thứ quan trọng nhất trên sơ đồ

Đe doạ không nằm ở các hộp; chúng nằm ở chỗ dữ liệu **vượt qua ranh giới tin cậy**: internet → DMZ, người dùng → server, service → database, code của bạn → thư viện bên thứ ba, container → host. Một DFD không vẽ ranh giới tin cậy thì không dùng được để threat model.

## 2. Nguyên tắc

1. **Làm sớm, làm nhỏ, làm thường xuyên.** Một buổi 90 phút lúc thiết kế đáng giá hơn một báo cáo 60 trang sau khi ship.
2. **Người xây hệ thống phải ngồi trong phòng.** Threat model do đội bảo mật viết một mình sẽ sai về cách hệ thống thật sự hoạt động, và sẽ không được ai thực hiện.
3. **Sản phẩm là các mục việc có chủ, không phải tài liệu.** Mỗi đe doạ được giữ lại phải thành một ticket hoặc một dòng trong [[Security Risk Management]].
4. **Bám vào tài sản và luồng dữ liệu, không bám vào công nghệ.** "Ta dùng Kubernetes" không phải điểm khởi đầu; "dữ liệu thẻ đi từ đâu tới đâu" mới là.
5. **Ghi cả những đe doạ bạn quyết định không xử lý, kèm lý do.** Sáu tháng sau sẽ có người hỏi lại đúng câu đó.
6. **Kiểm chứng biện pháp, đừng giả định.** Câu hỏi 4 của Shostack nối thẳng sang [[Purple Team Exercises]] và [[Penetration Testing Lifecycle]].
7. **Có dữ liệu cá nhân thì chạy thêm LINDDUN.** STRIDE không bắt được đe doạ riêng tư như linkability hay non-compliance — xem [[Privacy and Data Protection]].

## 3. Cạm bẫy

- **Vẽ sơ đồ kiến trúc thay vì DFD.** Sơ đồ kiến trúc cho biết *cái gì tồn tại*; DFD cho biết *dữ liệu chảy đâu*. Chỉ cái thứ hai lộ ra ranh giới tin cậy.
- **Threat model một lần rồi thôi.** Hệ thống đổi hàng tuần; mô hình đứng yên trở thành sai lệch có tổ chức.
- **Cãi nhau về nhãn STRIDE.** Một đe doạ thuộc S hay E không quan trọng; nó có được xử lý hay không mới quan trọng.
- **Mô hình đe doạ không có tác nhân.** "Dữ liệu có thể rò rỉ" là vô dụng. *Ai* làm rò rỉ, với năng lực nào, động cơ gì? Nối vào [[Threat Actor Profiling]].
- **Phạm vi quá lớn.** "Threat model toàn bộ công ty" luôn thất bại. Chọn một dịch vụ, một luồng dữ liệu.
- **Bỏ qua đe doạ nội bộ và bên thứ ba.** Ranh giới tin cậy quan trọng nhất thường nằm bên trong tổ chức — [[Insider Threat]], [[Third-Party and Supply Chain Risk]].
- **Nhầm threat modeling với pentest.** Threat modeling tìm *cái có thể sai theo thiết kế*; pentest tìm *cái đang sai trong hiện thực*. Cả hai đều cần; không cái nào thay được cái kia.
- **Không tính tới AI/LLM trong hệ thống.** Một component LLM tạo ra ranh giới tin cậy mới rất phản trực giác — xem [[AI and LLM Security]].

## 4. Checklist áp dụng

- [ ] Tôi có DFD với **ranh giới tin cậy được vẽ rõ** không?
- [ ] Người viết code hệ thống này có mặt trong buổi không?
- [ ] Tôi đã đi qua cả sáu chữ STRIDE cho **từng** phần tử chưa?
- [ ] Mỗi đe doạ giữ lại có chủ sở hữu và ticket chưa?
- [ ] Đe doạ bị bác bỏ có ghi **lý do** chưa?
- [ ] Có tác nhân cụ thể cho mỗi đe doạ không, hay chỉ là "kẻ tấn công" chung chung?
- [ ] Hệ thống có dữ liệu cá nhân — tôi có chạy thêm góc nhìn riêng tư không?
- [ ] Tôi có kế hoạch **kiểm chứng** ít nhất ba biện pháp quan trọng nhất không?
- [ ] Mô hình này sẽ được xem lại vào lúc nào, do sự kiện gì kích hoạt?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| **OWASP Threat Dragon** | Mã nguồn mở, vẽ DFD + STRIDE, chạy web hoặc desktop | [owasp.org](https://owasp.org/www-project-threat-dragon/) |
| **Microsoft Threat Modeling Tool** | Miễn phí, mạnh về STRIDE tự động, chỉ Windows | [microsoft.com](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool) |
| **pytm** | Threat model dạng code, diff được trong Git | [github.com/izar/pytm](https://github.com/izar/pytm) |
| **Elevation of Privilege** | Bộ bài dạy STRIDE, in ra chơi được | [github.com/adamshostack/eop](https://github.com/adamshostack/eop) |
| **LINDDUN GO** | Bộ card cho threat modeling quyền riêng tư | [linddun.org](https://linddun.org/) |

## Tham khảo

- [Adam Shostack — *Threat Modeling: Designing for Security*](https://shostack.org/books/threat-modeling-book) — sách tiêu chuẩn của lĩnh vực
- [Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org/) — bản đồng thuận của các tác giả chính
- [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
- [LINDDUN privacy threat modeling](https://linddun.org/)
- [Microsoft — STRIDE reference](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)

## Liên kết

[[Security Mental Models]] · [[Security Risk Management]] · [[Threat Actor Profiling]] · [[Web Attack Surface]] · [[Purple Team Exercises]] · [[Security]]
