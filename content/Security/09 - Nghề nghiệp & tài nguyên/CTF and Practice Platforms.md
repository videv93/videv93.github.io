---
tags: [security, nghề-nghiệp, reference, catalogue]
status: growing
---
# CTF and Practice Platforms

> Nơi luyện kỹ năng thực hành hợp pháp — và là đường xây năng lực mà seed nhắc tới (HTB, THM, VulnHub, Proving Grounds) nhưng không nói nó cũng là **portfolio thay thế chứng chỉ** — xem [[Certification vs Competence]].
>
> *Note catalogue — miễn Checklist theo quy ước playbook.*

## 1. Nền theo mục đích

| Nền | Cho | Miễn phí? |
|---|---|---|
| [PortSwigger Web Security Academy](https://portswigger.net/web-security) | Web security, lab tốt nhất | 🟢 Miễn phí |
| [TryHackMe](https://tryhackme.com/) | Người mới, lộ trình có hướng dẫn | 🟡 Freemium |
| [Hack The Box](https://www.hackthebox.com/) | Trung–cao, [[Active Directory Attacks]] | 🟡 Freemium |
| [OffSec Proving Grounds](https://www.offsec.com/labs/) | Giống đề OSCP nhất | 🔴 Trả phí |
| [VulnHub](https://www.vulnhub.com/) | Máy tải về, offline | 🟢 Miễn phí |
| [pwn.college](https://pwn.college/) | Binary exploitation — [[Binary Exploitation Basics]] | 🟢 Miễn phí |
| [OverTheWire](https://overthewire.org/wargames/) | Cơ bản Linux/bảo mật | 🟢 Miễn phí |
| [CryptoHack](https://cryptohack.org/) | Mật mã học | 🟢 Miễn phí |

## 2. Các loại CTF

| Loại | Nội dung |
|---|---|
| **Jeopardy** | Thử thách theo hạng mục (web, pwn, crypto, forensics, reverse) |
| **Attack-Defense** | Vừa tấn công đội khác vừa bảo vệ hệ thống mình |
| **King of the Hill** | Chiếm và giữ máy |
| **Boot2root** | Từ không quyền tới root một máy (giống pentest) |

## 3. CTF luyện kỹ năng gì

| Hạng mục CTF | Ánh xạ vào vault |
|---|---|
| **Web** | Thư mục `02` — [[Web Attack Surface]] |
| **Pwn (binary)** | [[Binary Exploitation Basics]] |
| **Reverse** | [[Reverse Engineering Basics]] |
| **Crypto** | [[Cryptographic Building Blocks]] (Networking) |
| **Forensics** | [[Digital Forensics]] |
| **OSINT** | [[OSINT Techniques]] |
| **Boot2root** | Toàn thư mục `01` |

> [!note] CTF ≠ pentest thật, nhưng bổ sung cho nhau
> CTF có lời giải xác định và tối ưu cho "aha moment"; pentest thật có nhiều nhiễu, nhiều false positive, và sản phẩm là báo cáo — [[Penetration Testing Lifecycle]]. CTF rèn kỹ thuật và tư duy; nó **không** rèn báo cáo, giao tiếp, hay làm việc trong scope. Dùng CTF để học kỹ thuật, không nhầm nó với công việc thật.

## 4. Nguyên tắc dùng

1. **Hợp pháp và có scope sẵn.** Ưu điểm lớn của CTF/lab: bạn được phép tấn công — không cần lo [[Authorization and Rules of Engagement]] cho hạ tầng ban tổ chức.
2. **Portfolio thật.** Thứ hạng CTF, máy HTB đã giải, writeup là bằng chứng năng lực — [[Certification vs Competence]].
3. **Viết writeup.** Rèn kỹ năng ghi chép và giải thích — thứ CTF không tự dạy nhưng bạn nên tự thêm.
4. **Chọn nền theo trình độ.** THM cho người mới, HTB trung–cao, PG cho luyện OSCP — [[OSCP Preparation Path]].
5. **Đừng chỉ chase flag.** Hiểu *vì sao* lỗ hổng hoạt động quan trọng hơn lấy được flag.

## 5. Cạm bẫy

- **Nhầm CTF với pentest thật.** CTF không có nhiễu, không cần báo cáo/scope.
- **Chỉ chase flag.** Bỏ qua hiểu cơ chế; kỹ năng không chuyển sang việc thật.
- **Không viết writeup.** Bỏ lỡ cơ hội rèn giao tiếp và tạo portfolio.
- **Tấn công hạ tầng ban tổ chức.** Vi phạm ở mọi giải — chỉ tấn công máy mục tiêu.
- **Nền quá khó quá sớm.** Nản; chọn theo trình độ.
- **Bỏ qua CTF vì "không phải công việc thật".** Nó là đường xây kỹ năng và portfolio rẻ nhất.

## Tham khảo

- [CTFtime](https://ctftime.org/) — lịch và xếp hạng CTF
- [PortSwigger Academy](https://portswigger.net/web-security) · [TryHackMe](https://tryhackme.com/) · [Hack The Box](https://www.hackthebox.com/)
- [pwn.college](https://pwn.college/) · [OverTheWire](https://overthewire.org/wargames/)
- [picoCTF](https://picoctf.org/) — CTF nhập môn tốt

## Liên kết

[[Security Learning Resources]] · [[Bug Bounty Practice]] · [[Security Lab Setup]] · [[OSCP Preparation Path]] · [[Certification vs Competence]] · [[Security]]
