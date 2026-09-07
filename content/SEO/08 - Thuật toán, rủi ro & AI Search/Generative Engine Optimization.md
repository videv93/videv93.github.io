---
tags: [seo, ai, strategy]
status: seed
---
# Generative Engine Optimization

> ⚠️ **Đọc [[SEO Tactics Half-Life]] trước.** GEO/AEO là lĩnh vực **có nhiều hype nhất và ít bằng chứng nhất** trong SEO hiện nay. Note này tách rõ ba nhóm: cái có bằng chứng, cái hợp lý nhưng chưa chứng minh, và cái là hype.

> **GEO** (Generative Engine Optimization) / **AEO** (Answer Engine Optimization): tối ưu để được **trích dẫn** bởi AI Overview, ChatGPT Search, Perplexity, Claude, Copilot — thay vì để xếp hạng trong 10 link xanh.

## 1. Ba nhóm — phân loại trước khi hành động

### 🟢 Có bằng chứng / gần như chắc chắn

| Việc | Vì sao chắc |
|---|---|
| **Nội dung phải truy cập được không cần JS** | GPTBot, ClaudeBot, PerplexityBot **không chạy JavaScript**. Kiểm chứng được bằng `curl` — [[JavaScript Rendering and SEO]] |
| **Xếp hạng tốt trong Google** | AI Overview trích chủ yếu từ trang đang xếp hạng — điều kiện cần |
| **`robots.txt` quyết định có được dùng hay không** | Chặn `GPTBot`/`Google-Extended` là chặn thật — [[Robots Exclusion]] |
| **Cấu trúc rõ ràng, dữ liệu có cấu trúc** | Dễ trích xuất hơn văn xuôi — [[Structured Data and Rich Results]] |
| **Tốc độ phản hồi** | Crawler AI có timeout ngắn |

### 🟡 Hợp lý nhưng chưa chứng minh

| Giả thuyết | Trạng thái |
|---|---|
| Câu trả lời trực tiếp, ngắn gọn ngay dưới heading dễ được trích hơn | Hợp lý, khớp với cách LLM trích xuất, chưa có nghiên cứu quy mô |
| Số liệu và trích dẫn cụ thể tăng khả năng được dùng làm nguồn | Hợp lý |
| Được nhắc tới nhiều nơi (entity strength) tăng khả năng xuất hiện | Hợp lý — [[Brand Signals and Entity SEO]] |
| Nội dung mới hơn được ưu tiên trong AI search | Tuỳ engine, chưa nhất quán |
| `llms.txt` | Đề xuất cộng đồng; **chưa nhà cung cấp lớn nào cam kết hỗ trợ** |

### 🔴 Hype / chưa có cơ sở

- "GEO score" của công cụ bên thứ ba — không có API nào để đo thật
- "Tối ưu cho ChatGPT" bằng nhồi cụm từ — không có cơ chế nào cho thấy điều này hoạt động
- Dịch vụ hứa "đưa brand bạn vào câu trả lời AI" — không kiểm chứng được
- Coi GEO là kênh riêng cần ngân sách riêng — hiện tại nó chủ yếu là SEO tốt

> [!warning] Phép kiểm cho mọi lời khuyên GEO
> Hỏi: **"tuyên bố này kiểm chứng được bằng cách nào?"** Nếu không có cách kiểm — không có API, không có báo cáo, không có thí nghiệm lặp lại được — đó là suy đoán. Phần lớn nội dung GEO hiện nay không vượt qua phép kiểm này.

## 2. Khác biệt cơ bản với SEO

| | SEO truyền thống | GEO |
|---|---|---|
| Mục tiêu | Xếp hạng URL | Được trích dẫn trong câu trả lời |
| Đơn vị | Trang | Đoạn / khẳng định |
| Đo được không? | ✅ GSC | ⚠️ Rất hạn chế |
| Traffic | Click trực tiếp | Thường không có click |
| Kiểm soát | Trung bình | Rất thấp |

**Vấn đề đo lường là vấn đề lớn nhất.** Không có "GSC cho AI search". Cách đo hiện có đều thủ công hoặc gián tiếp.

## 3. Đo lường — cái làm được hiện nay

1. **Kiểm thủ công định kỳ.** Hỏi 20 câu hỏi quan trọng nhất trong ChatGPT/Perplexity/Google AI mode. Brand bạn có xuất hiện không? Ghi lại theo tháng.
2. **Referral traffic từ AI.** GA4: lọc referrer `chat.openai.com`, `perplexity.ai`, `claude.ai`… Lượng nhỏ nhưng đang tăng và tỷ lệ chuyển đổi thường cao.
3. **Log server**: tần suất GPTBot/ClaudeBot/PerplexityBot crawl — [[Log File Analysis]].
4. **GSC**: dấu hiệu gián tiếp qua impression/click — [[AI Search and Zero Click]].

## 4. Quyết định chặn hay cho phép AI crawler

Đây là quyết định kinh doanh, không phải kỹ thuật:

| Cho phép | Chặn |
|---|---|
| Nội dung được trích dẫn ⇒ hiển thị brand | Bảo vệ nội dung khỏi bị dùng làm dữ liệu huấn luyện |
| Có thể có referral traffic | Tránh bị tổng hợp thay thế |
| Xuất hiện trong câu trả lời AI ngày càng quan trọng | Tiết kiệm băng thông |

**Lưu ý phân biệt:** `Google-Extended` điều khiển Gemini/AI Overview grounding, **không** ảnh hưởng xếp hạng Google Search. `GPTBot` là crawler huấn luyện của OpenAI; `OAI-SearchBot` là crawler tìm kiếm — chúng khác nhau và có thể cấu hình riêng.

## 5. Cạm bẫy

- **Bỏ SEO để làm GEO.** Điều kiện cần của GEO vẫn là xếp hạng tốt.
- **Mua "dịch vụ GEO".** Xem mục 1, nhóm 🔴.
- **Triển khai `llms.txt` và coi là xong.** Chưa nhà cung cấp lớn nào cam kết hỗ trợ.
- **CSR.** Crawler AI không chạy JS — đây là lỗi kỹ thuật nghiêm trọng nhất cho GEO.
- **Chặn hết AI crawler theo phản xạ** rồi thắc mắc vì sao không xuất hiện.
- **Không đo gì cả.** Ít nhất hãy kiểm thủ công 20 câu hỏi mỗi tháng.
- **Coi bảng ở mục 1 là ổn định.** Nó sẽ đổi trong vài tháng.

## 6. Phép kiểm tự chạy được

- [ ] `curl` một URL quan trọng — nội dung chính có trong HTML thô không?
- [ ] `robots.txt` hiện đang cho phép hay chặn `GPTBot`, `Google-Extended`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`? Quyết định đó có ý thức không?
- [ ] Hỏi 20 câu hỏi quan trọng trong 3 engine AI — brand bạn xuất hiện bao nhiêu lần?
- [ ] Log có ghi nhận AI crawler không? Tần suất bao nhiêu?
- [ ] GA4 có referral từ domain AI không? Xu hướng ra sao?
- [ ] Với mỗi lời khuyên GEO bạn định làm — **kiểm chứng được bằng cách nào?**
- [ ] Nếu bỏ toàn bộ công việc GEO, SEO nền tảng của bạn có còn vững không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `curl` | Kiểm nội dung có trong HTML thô — rẻ và quyết định | — |
| Log server / CDN | Đo AI crawler thật | [[Log File Analysis]] |
| GA4 (lọc referrer AI) | Đo referral traffic từ AI | [GA4](https://analytics.google.com/) |
| Kiểm thủ công trong ChatGPT/Perplexity | Cách đo trực tiếp duy nhất hiện có | — |

## Tham khảo
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google — Google-Extended crawler](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)
- [OpenAI — GPTBot documentation](https://platform.openai.com/docs/bots)
- [Anthropic — Claude crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web)

## Liên kết
[[AI Search and Zero Click]] · [[Robots Exclusion]] · [[JavaScript Rendering and SEO]] · [[Structured Data and Rich Results]] · [[SEO Tactics Half-Life]] · [[SEO]]
