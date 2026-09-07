---
tags: [security, cti, osint]
status: growing
---
# OSINT Techniques

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.** OSINT chủ yếu dùng nguồn công khai nên rủi ro pháp lý thấp — **nhưng không bằng không**: thu thập dữ liệu cá nhân có ràng buộc riêng, và một số kỹ thuật vượt ranh giới "công khai".

> OSINT (Open Source Intelligence) là thu thập tình báo từ nguồn công khai. Nó phục vụ cả tấn công (recon — [[Reconnaissance and Enumeration]]), phòng thủ (giám sát bề mặt lộ), và [[Cyber Threat Intelligence]].

## 1. Nguồn OSINT theo loại

| Loại | Nguồn | Dùng cho |
|---|---|---|
| **Hạ tầng** | DNS, WHOIS, Certificate Transparency, Shodan/Censys, BGP | Bản đồ tài sản, bề mặt tấn công |
| **Con người** | LinkedIn, mạng xã hội, hồ sơ công khai | Social engineering, email format |
| **Tổ chức** | Tin tuyển dụng, hồ sơ công ty, báo cáo | Tech stack, cơ cấu |
| **Rò rỉ** | HaveIBeenPwned, dump công khai, paste site | Credential lộ, dữ liệu vi phạm |
| **Code** | GitHub, GitLab, GitHub Gist | Secret, logic nội bộ, tên hạ tầng |
| **Địa lý** | Ảnh vệ tinh, geotag, Street View | Điều tra vị trí (GEOINT) |
| **Dark web** | Diễn đàn, chợ (thận trọng) | Threat intel, dữ liệu bị bán |

## 2. Hai mặt của OSINT

| Mặt tấn công | Mặt phòng thủ |
|---|---|
| Recon mục tiêu trước pentest | Tự OSINT chính mình — biết mình lộ gì |
| Tìm credential rò rỉ để dùng | Giám sát credential nhân viên bị lộ |
| Lập bản đồ nhân sự cho phishing | Đào tạo nhân viên về dấu chân số |
| Tìm tài sản quên lãng | Quản lý bề mặt tấn công (ASM) |

Điểm quan trọng: **defensive OSINT là kỹ năng bị đánh giá thấp.** Tự chạy OSINT lên tổ chức mình cho thấy chính xác cái kẻ tấn công thấy — rẻ và hiệu quả.

## 3. Nguyên tắc

1. **Thụ động trước, và ưu tiên thụ động.** OSINT đúng nghĩa không chạm mục tiêu; ngay khi bạn tương tác (đăng nhập thử, kết nối), bạn rời khỏi "open source".
2. **Ghi nguồn cho mọi phát hiện.** Intelligence không kiểm chứng được là tin đồn — nối với kỷ luật của [[Cyber Threat Intelligence]].
3. **Tôn trọng ranh giới pháp lý và đạo đức.** Dữ liệu công khai không có nghĩa là dùng tự do; thu thập dữ liệu cá nhân có ràng buộc — [[Privacy and Data Protection]].
4. **OPSEC cho chính bạn.** Điều tra để lại dấu; dùng hạ tầng tách bạch cho công việc nhạy cảm.
5. **Tương quan nhiều nguồn.** Một nguồn cho một góc; xác nhận chéo trước khi kết luận.
6. **Tự OSINT mình định kỳ.** Bề mặt lộ đổi theo thời gian (nhân viên mới, repo mới, cert mới).

## 4. Cạm bẫy

- **Rơi vào rabbit hole.** OSINT vô tận; đặt requirements cụ thể trước khi bắt đầu — kỷ luật của Intelligence Cycle.
- **Nhầm "công khai" với "được phép dùng".** Ranh giới pháp lý về dữ liệu cá nhân tồn tại kể cả với dữ liệu công khai.
- **Không OPSEC.** Xem LinkedIn mục tiêu bằng tài khoản thật là để lại danh thiếp; kết nối/tương tác là chạm mục tiêu.
- **Tin dữ liệu rò rỉ mù.** Dump có thể cũ, giả, hoặc trộn nhiều nguồn.
- **Bỏ qua defensive OSINT.** Chỉ dùng OSINT để tấn công, quên tự kiểm mình lộ gì.
- **Vượt ranh giới thành truy cập trái phép.** Thử credential rò rỉ trên hệ thống thật là hết OSINT và cần uỷ quyền — [[Authorization and Rules of Engagement]].
- **Điều tra người thật vượt phạm vi.** OSINT lên cá nhân dễ trượt sang quấy rối/stalking; giữ trong scope công việc.

## 5. Checklist áp dụng

- [ ] Tôi có requirements cụ thể, tránh rabbit hole không?
- [ ] Tôi đang giữ thụ động, không chạm mục tiêu chứ?
- [ ] Tôi có OPSEC (hạ tầng tách bạch) cho việc nhạy cảm không?
- [ ] Tôi ghi nguồn cho mọi phát hiện chưa?
- [ ] Tôi có đang tôn trọng ranh giới pháp lý về dữ liệu cá nhân không?
- [ ] Tôi đã tương quan nhiều nguồn trước khi kết luận chưa?
- [ ] (Phòng thủ) Tôi có tự OSINT tổ chức mình định kỳ không?

## 6. Công cụ

| Tên | Vai trò |
|---|---|
| **Maltego** | Đồ thị quan hệ, tương quan đa nguồn |
| **SpiderFoot** | Tự động hoá OSINT đa nguồn |
| **theHarvester** | Email, subdomain, tên |
| **Shodan / Censys** | Tài sản Internet lộ |
| **crt.sh** | Certificate Transparency |
| **HaveIBeenPwned** | Credential/email rò rỉ |
| **Google dorking** | Truy vấn nâng cao tìm dữ liệu lộ |
| **OSINT Framework** | Danh mục nguồn theo loại |

## Tham khảo

- [OSINT Framework](https://osintframework.com/)
- [Bellingcat's Online Investigation Toolkit](https://www.bellingcat.com/resources/)
- [Michael Bazzell — OSINT Techniques](https://inteltechniques.com/book1.html)
- [Trace Labs OSINT VM](https://www.tracelabs.org/)
- Nền recon tấn công: [[Reconnaissance and Enumeration]]

## Liên kết

[[Cyber Threat Intelligence]] · [[Reconnaissance and Enumeration]] · [[Social Engineering]] · [[Threat Actor Profiling]] · [[Privacy and Data Protection]] · [[Security]]
