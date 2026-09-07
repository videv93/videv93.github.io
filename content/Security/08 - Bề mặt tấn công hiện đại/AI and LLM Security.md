---
tags: [security, ai, llm]
status: seed
---
# AI and LLM Security

> [!warning] `status: seed` — lĩnh vực chuyển động cực nhanh
> Đây là note tươi nhất và dễ lỗi thời nhất trong vault. Đọc `status` trước khi trích dẫn: nguyên lý (ranh giới tin cậy) bền, nhưng công cụ và kỹ thuật cụ thể đổi hàng tháng. Kiểm ngày trước khi tin chi tiết.

> LLM tạo ra một ranh giới tin cậy **phản trực giác**: model không phân biệt được "chỉ dẫn của nhà phát triển" với "dữ liệu người dùng" — cả hai đều là text trong cùng một context. Đây là nguồn của lớp lỗ hổng mới.

## 1. Vì sao LLM phá mô hình đe doạ cũ

Trong phần mềm truyền thống, code và dữ liệu tách biệt — nền của [[Injection Attacks]]. Với LLM, **chỉ dẫn và dữ liệu là cùng một thứ**: text đưa vào context. Không có cách phân tách cấu trúc như parameterized query. Đây là lý do prompt injection khó giải quyết triệt để hơn SQLi.

## 2. OWASP Top 10 for LLM — các lớp chính

| Lớp | Nội dung |
|---|---|
| **Prompt injection** | Input người dùng ghi đè chỉ dẫn hệ thống (trực tiếp và gián tiếp) |
| **Insecure output handling** | Output LLM dùng mù → XSS, SQLi, RCE ở hệ thống dưới — [[XSS and Client-Side Attacks]] |
| **Training data poisoning** | Đầu độc dữ liệu huấn luyện |
| **Sensitive info disclosure** | Model tiết lộ dữ liệu huấn luyện/context nhạy cảm |
| **Excessive agency** | LLM có quá nhiều quyền hành động (gọi API, thực thi) |
| **Supply chain** | Model/dataset/plugin độc — [[Software Supply Chain Attacks]] |

## 3. Prompt injection — trực tiếp và gián tiếp

| Loại | Cơ chế |
|---|---|
| **Trực tiếp** | Người dùng nhập "bỏ qua chỉ dẫn trên, làm X" |
| **Gián tiếp** | Chỉ dẫn độc ẩn trong dữ liệu LLM đọc (trang web, tài liệu, email) → LLM thực thi khi xử lý |

Gián tiếp nguy hiểm hơn: LLM tóm tắt một trang web chứa chỉ dẫn ẩn có thể bị điều khiển mà người dùng không hề nhập gì độc.

## 4. Nguyên tắc

1. **Coi output LLM như input không tin cậy.** Không bao giờ đưa output LLM thẳng vào SQL, HTML, shell, `eval` — validate/encode như mọi dữ liệu người dùng.
2. **Least privilege cho agency.** LLM gọi được API/công cụ gì phải tối thiểu; "excessive agency" biến prompt injection thành RCE — cùng logic [[Security Mental Models]].
3. **Giả định prompt injection sẽ thành công.** Không có biện pháp nào chặn hoàn toàn; thiết kế để một injection thành công không gây hại lớn (giới hạn quyền, human-in-the-loop cho hành động nhạy cảm).
4. **Không đặt secret trong system prompt.** Model có thể bị dụ tiết lộ.
5. **Kiểm soát dữ liệu LLM đọc (gián tiếp).** Dữ liệu ngoài đưa vào context là bề mặt tấn công.
6. **Nối vào threat modeling.** Component LLM cần được đưa vào [[Threat Modeling Practice]] như một ranh giới tin cậy mới.

## 5. Cạm bẫy

- **Tin output LLM.** Dùng thẳng trong query/HTML/shell → injection tầng dưới.
- **Cho LLM quá nhiều quyền.** Agent gọi được mọi API → prompt injection thành hành động thật.
- **Tưởng lọc prompt là đủ.** Injection có vô số biến thể; lọc là giảm, không phải chặn.
- **Secret trong system prompt.** Bị trích qua injection.
- **Bỏ qua injection gián tiếp.** Tập trung input trực tiếp, quên dữ liệu LLM đọc từ ngoài.
- **Không human-in-the-loop cho hành động nguy hiểm.** Agent tự động thực thi hành động không hoàn tác được.
- **Coi đây là vấn đề đã giải quyết.** Lĩnh vực còn non; kỹ thuật mới liên tục.

## 6. Checklist áp dụng

- [ ] Output LLM có được validate/encode trước khi dùng ở hệ thống dưới không?
- [ ] LLM có bị giới hạn least privilege về công cụ/API gọi được không?
- [ ] Hành động nhạy cảm/không hoàn tác có human-in-the-loop không?
- [ ] Có secret nào trong system prompt không?
- [ ] Tôi đã tính tới prompt injection gián tiếp (qua dữ liệu LLM đọc) chưa?
- [ ] Component LLM có nằm trong threat model như ranh giới tin cậy không?
- [ ] Thiết kế có chịu được một prompt injection thành công không?

## 7. Công cụ & tài nguyên

| Tên | Vai trò |
|---|---|
| **OWASP Top 10 for LLM** | Khung lỗ hổng chính |
| **OWASP GenAI / LLM guide** | Hướng dẫn chi tiết |
| **garak** | Quét lỗ hổng LLM |
| **Prompt injection test suites** | Kiểm khả năng chống injection |
| **NIST AI RMF** | Khung quản trị rủi ro AI |

## Tham khảo

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [MITRE ATLAS — adversarial threats to AI](https://atlas.mitre.org/)
- [Simon Willison — prompt injection series](https://simonwillison.net/tags/prompt-injection/)

## Liên kết

[[Injection Attacks]] · [[XSS and Client-Side Attacks]] · [[Threat Modeling Practice]] · [[Software Supply Chain Attacks]] · [[Security Mental Models]] · [[Security]]
