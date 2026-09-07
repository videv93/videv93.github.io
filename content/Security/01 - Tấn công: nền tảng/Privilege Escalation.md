---
tags: [security, tấn-công]
status: evergreen
---
# Privilege Escalation

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Bạn có shell với quyền thấp. Privilege escalation là nghệ thuật biến nó thành quyền cao — và nó gần như luôn là bài toán **liệt kê**, không phải bài toán exploit. Máy chủ tự kể cho bạn cách leo lên, nếu bạn hỏi đủ câu.

## 1. Hai loại leo thang

| | **Vertical** | **Horizontal** |
|---|---|---|
| Nghĩa | user → root/SYSTEM | user A → user B cùng cấp |
| Mục tiêu | Kiểm soát toàn máy | Truy cập dữ liệu/quyền của người khác |
| Ví dụ | Kernel exploit, sudo misconfig | Đọc file user khác, session của họ |

Trong ứng dụng web, horizontal escalation chính là [[Broken Access Control]]. Note này tập trung vào leo thang ở tầng hệ điều hành.

## 2. Bản đồ vector — Linux

| Vector | Tìm bằng | Vì sao tồn tại |
|---|---|---|
| **SUID/SGID binary** | `find / -perm -4000` | Binary chạy quyền chủ sở hữu; nhiều cái lạm dụng được — [GTFOBins](https://gtfobins.github.io/) |
| **sudo misconfig** | `sudo -l` | Cho phép chạy lệnh cụ thể quyền root; nhiều lệnh thoát ra shell được |
| **Cron job** | `/etc/crontab`, `cat` script cron | Script chạy quyền root nhưng ghi được bởi user |
| **Capabilities** | `getcap -r /` | `cap_setuid` trên binary = root |
| **Kernel exploit** | `uname -a` + searchsploit | Nguy hiểm, dễ làm sập — biện pháp cuối |
| **PATH hijacking** | Script gọi binary không đường dẫn tuyệt đối | Đặt binary giả trước trong PATH |
| **Writable service/config** | `find / -writable` trên file hệ thống | systemd unit, config ghi được |
| **Credential nằm rải** | `.bash_history`, config, `.env`, memory | Tái dùng mật khẩu là mặc định |
| **NFS no_root_squash** | `cat /etc/exports` | Tạo SUID binary từ máy khác |

## 3. Bản đồ vector — Windows

| Vector | Tìm bằng | Ghi chú |
|---|---|---|
| **Unquoted service path** | Đường service có khoảng trắng, không ngoặc | Windows thử từng đoạn → chèn binary |
| **Weak service permissions** | `accesschk`, service cấu hình được bởi user | Đổi binPath của service quyền SYSTEM |
| **AlwaysInstallElevated** | Registry key | MSI chạy quyền SYSTEM |
| **Token impersonation** | `SeImpersonatePrivilege` | Họ "Potato" (JuicyPotato, PrintSpoofer) |
| **Credential** | LSASS memory, SAM, DPAPI, Credential Manager | Xem [[Password Attacks and Credential Access]] |
| **Unpatched kernel** | `systeminfo` + Watson/WES-NG | Danh sách hotfix lộ ra cái thiếu |
| **DLL hijacking** | Ứng dụng tải DLL từ đường ghi được | — |
| **Autologon / registry secret** | Registry, Unattend.xml, GPP | Mật khẩu để lộ trong triển khai tự động |

## 4. Nguyên tắc

1. **Chạy liệt kê tự động, rồi kiểm tay.** LinPEAS/WinPEAS tiết kiệm hàng giờ nhưng ồn và có false positive. Chúng gợi ý; bạn xác nhận.
2. **Đọc mọi thứ chạy với quyền cao hơn bạn.** Cron, service, scheduled task — đó là chỗ leo thang nằm.
3. **Credential tái dùng là con đường ngắn nhất.** Trước khi tìm kernel exploit, tìm mật khẩu trong file cấu hình và lịch sử. Con người tái dùng mật khẩu ở mọi nơi.
4. **Kernel exploit là biện pháp cuối.** Chúng làm sập máy. Trong engagement thật, một cú sập ngoài ý muốn có thể chấm dứt quyền truy cập của bạn.
5. **So sánh trạng thái sạch để hiểu bất thường.** Biết cấu hình mặc định của HĐH đó thì mới nhận ra cái gì bị đặt sai.
6. **Sau khi leo lên, ghi lại thay đổi để hoàn tác.** Service bị đổi binPath phải được trả về.

## 5. Cạm bẫy

- **Lao vào kernel exploit đầu tiên.** Ồn, rủi ro, và thường không cần — SUID/sudo/credential dễ hơn và an toàn hơn.
- **Bỏ qua output của `sudo -l`.** Vector số một trên Linux, và nhanh nhất.
- **Tin false positive của PEAS.** Công cụ báo "có thể khai thác" không có nghĩa là khai thác được; xác nhận trước khi báo cáo.
- **Chạy kernel exploit trên production không cảnh báo.** Có thể làm sập máy khách hàng. Nếu bắt buộc, thông báo và có cửa sổ cho phép.
- **Không dọn.** SUID binary bạn tạo, service bạn sửa là lỗ hổng mới bạn để lại.
- **Quên môi trường container.** Trong container, "root" có thể vô nghĩa hoặc ngược lại là đường thoát ra host — xem [[Container and Kubernetes Attack Surface]].

## 6. Checklist áp dụng

- [ ] Tôi đã chạy liệt kê tự động **và** kiểm tra thủ công các điểm nghi ngờ chưa?
- [ ] Đã xem `sudo -l` (Linux) / quyền service (Windows) chưa?
- [ ] Đã tìm credential trong history, config, `.env`, memory chưa?
- [ ] Đã liệt kê mọi tiến trình/tác vụ chạy quyền cao hơn chưa?
- [ ] Tôi có đang tránh kernel exploit trừ khi thật cần không?
- [ ] Tôi có hiểu vector này làm gì trước khi chạy không?
- [ ] Tôi đã ghi lại mọi thay đổi để hoàn tác chưa?

## 7. Công cụ

| Tên | Nền tảng | Vai trò |
|---|---|---|
| **LinPEAS / WinPEAS** | Linux / Windows | Liệt kê toàn diện |
| **GTFOBins / LOLBAS** | Linux / Windows | Binary hợp lệ lạm dụng được |
| **pspy** | Linux | Theo dõi tiến trình không cần root (bắt cron) |
| **accesschk / PowerUp** | Windows | Quyền service, vector leo thang |
| **WES-NG / Watson** | Windows | So systeminfo với CVE |
| **linux-exploit-suggester** | Linux | Gợi ý kernel exploit theo phiên bản |

## Tham khảo

- [GTFOBins](https://gtfobins.github.io/) và [LOLBAS](https://lolbas-project.github.io/)
- [HackTricks — Linux & Windows Privilege Escalation](https://book.hacktricks.xyz/)
- [PayloadsAllTheThings — Privilege Escalation](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [MITRE ATT&CK — Privilege Escalation (TA0004)](https://attack.mitre.org/tactics/TA0004/)
- [OS Security Fundamentals](https://csrc.nist.gov/) — nền lý thuyết ở area OS: [[Access Control]], [[OS Security Fundamentals]]

## Liên kết

[[Exploitation Fundamentals]] · [[Post-Exploitation and Lateral Movement]] · [[Password Attacks and Credential Access]] · [[Active Directory Attacks]] · [[Broken Access Control]] · [[Security]]
