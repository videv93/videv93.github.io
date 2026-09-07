---
tags: [security, tấn-công, windows]
status: growing
---
# Active Directory Attacks

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Gần như mọi doanh nghiệp chạy Active Directory, và gần như mọi red team engagement đều đi qua nó. Từ 11/2024, OSCP đưa AD thành trọng tâm: bắt đầu từ **một tài khoản người dùng thường** và phải chiếm **toàn bộ domain**.

## 1. Vì sao AD là mục tiêu trung tâm

AD là hệ thống danh tính tập trung: một nơi quản lý xác thực và phân quyền cho toàn tổ chức. Điều làm nó mạnh cũng làm nó nguy hiểm — **chiếm được domain controller là chiếm được mọi thứ**. AD tích luỹ hàng chục năm cấu hình, quan hệ tin cậy và tài khoản cũ, tạo ra một bề mặt tấn công khổng lồ theo *quan hệ*, không chỉ theo lỗ hổng.

## 2. Chuỗi tấn công điển hình

| Pha | Kỹ thuật | Công cụ |
|---|---|---|
| **Recon không cần credential** | Liệt kê user, chính sách qua null session, LLMNR/NBT-NS poisoning | responder, enum4linux-ng |
| **Có credential đầu tiên** | Kerberoasting, AS-REP roasting | Rubeus, impacket-GetUserSPNs |
| **Lập bản đồ** | Thu thập quan hệ, tìm đường tới DA | **BloodHound** / SharpHound |
| **Lateral movement** | Pass-the-Hash, Pass-the-Ticket | mimikatz, CrackMapExec — [[Post-Exploitation and Lateral Movement]] |
| **Leo thang domain** | ACL abuse, delegation, ADCS (ESC1-ESC16) | Certipy, PowerView |
| **Thống trị** | DCSync, Golden/Silver Ticket | mimikatz, Rubeus |
| **Persistence** | Golden Ticket, Skeleton Key, ACL cửa hậu | — (dọn sạch sau!) |

## 3. Các kỹ thuật lõi — hiểu cơ chế, không học vẹt lệnh

| Kỹ thuật | Cơ chế | Vì sao hiệu quả |
|---|---|---|
| **Kerberoasting** | Xin vé service (TGS) cho tài khoản có SPN, bẻ offline | Mọi user xin được vé; mật khẩu service account thường yếu và ít đổi |
| **AS-REP Roasting** | Tài khoản tắt pre-auth → xin được hash bẻ offline | Không cần credential nào |
| **Pass-the-Hash** | NTLM hash = mật khẩu về mặt giao thức | Không cần bẻ hash |
| **DCSync** | Giả làm DC yêu cầu đồng bộ, lấy mọi hash | Cần quyền replication; cho ngay krbtgt |
| **Golden Ticket** | Có hash krbtgt → tự ký TGT bất kỳ | Kiểm soát toàn bộ Kerberos; cực bền |
| **ADCS abuse (ESC1+)** | Template chứng chỉ cấu hình sai → mạo danh | Bề mặt tấn công lớn, hay bị bỏ quên |
| **Delegation abuse** | Unconstrained/constrained/RBCD | Máy được uỷ quyền có thể mạo danh user |

> [!note] BloodHound là thứ đổi cuộc chơi
> AD phức tạp tới mức con người không giữ nổi bản đồ quan hệ trong đầu. BloodHound biến nó thành đồ thị và tìm **đường ngắn nhất tới Domain Admin** tự động. Blue team dùng chính công cụ đó để **tìm và cắt** những đường ấy trước — ví dụ điển hình của [[Purple Team Exercises]].

## 4. Nguyên tắc

1. **Bản đồ trước, tấn công sau.** Chạy BloodHound sớm; nó cho biết nên nhắm vào đâu thay vì thử mù.
2. **Service account là mắt xích yếu.** Mật khẩu ít đổi, thường quyền cao, hay bị Kerberoast. Bắt đầu từ đó.
3. **Golden/Silver Ticket và DCSync là "hết game" — dùng có kỷ luật.** Chúng cho quyền tối cao và persistence cực bền; mọi thứ tạo ra phải được dọn.
4. **Ưu tiên đường lỗi cấu hình hơn đường exploit.** ACL sai, delegation sai, ADCS sai là chuẩn mực — và không làm sập gì.
5. **Ghi lại đường đi cho báo cáo.** Giá trị với khách hàng nằm ở *"cắt cạnh nào thì đường này đứt"*, không ở việc bạn đã tới DA.

## 5. Cạm bẫy

- **Bỏ qua ADCS.** Bề mặt tấn công lớn và mới; ESC1-ESC16 là mỏ vàng thường không được kiểm.
- **Ồn không cần thiết.** Kerberoasting hàng loạt, DCSync tạo sự kiện đặc trưng — trong red team đó có thể là mục tiêu, ngoài đó là tự lộ.
- **Không dọn Golden Ticket.** Để lại quyền ký vé vĩnh viễn là lỗi nghiêm trọng.
- **Học lệnh mà không hiểu Kerberos.** Khi lệnh không chạy (đồng hồ lệch, SPN sai) bạn sẽ bế tắc nếu không hiểu giao thức. Xem [[Authentication Protocols]] (Networking) cho nền Kerberos.
- **Bỏ qua tài khoản máy (machine account).** Chúng cũng là principal, cũng khai thác được (RBCD).

## 6. Checklist áp dụng

- [ ] Đã chạy BloodHound và xác định đường tới Domain Admin chưa?
- [ ] Đã thử Kerberoasting và AS-REP roasting chưa?
- [ ] Đã kiểm ADCS (Certipy `find`) chưa?
- [ ] Đã kiểm cấu hình delegation chưa?
- [ ] Tôi có hiểu Kerberos đủ để gỡ lỗi khi vé không hoạt động không?
- [ ] Mọi ticket/persistence đã vào danh sách dọn dẹp chưa?
- [ ] Báo cáo có nêu **cạnh nào cần cắt** để phá đường tấn công không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **BloodHound / SharpHound** | Bản đồ quan hệ, tìm đường tấn công |
| **Impacket** | secretsdump, GetUserSPNs, ntlmrelayx |
| **Rubeus** | Kerberos: roast, ticket, delegation |
| **Certipy** | Tấn công ADCS |
| **mimikatz** | Credential, DCSync, Golden Ticket |
| **NetExec (CrackMapExec)** | Quét và lateral movement quy mô lớn |
| **responder** | LLMNR/NBT-NS poisoning |
| **PingCastle / PurpleKnight** | Đánh giá tư thế AD (phía phòng thủ) |

## Tham khảo

- [The Hacker Recipes — Active Directory](https://www.thehacker.recipes/) — tham chiếu kỹ thuật đầy đủ
- [BloodHound docs](https://bloodhound.readthedocs.io/)
- [Microsoft — Best Practices for Securing Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory)
- [ADCS attacks — SpecterOps "Certified Pre-Owned"](https://posts.specterops.io/certified-pre-owned-d95910965cd2)
- [MITRE ATT&CK — Kerberoasting T1558.003](https://attack.mitre.org/techniques/T1558/003/)

## Liên kết

[[Post-Exploitation and Lateral Movement]] · [[Password Attacks and Credential Access]] · [[Privilege Escalation]] · [[Detection Engineering]] · [[OSCP Preparation Path]] · [[Security]]
