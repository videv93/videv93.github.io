---
tags: [frontend, note-bản-lề]
status: evergreen
---
# ⚠️ Framework Churn vs Platform Longevity

> **Note bản lề thứ hai.** Mâu thuẫn này độc lập với [[Utility-First vs Cascade]] — nó có tập note liên quan khác và không giải quyết được bằng cùng một câu trả lời.

## 1. Mâu thuẫn là gì

Seed frontend chứa hai loại tài liệu với **chu kỳ bán rã hoàn toàn khác nhau**:

| | Tài liệu nền tảng | Tài liệu stack |
|---|---|---|
| Nguồn | MDN: `CSS reference`, `CSS guides`, `HTML reference`, `Web APIs` | `React Tech Stack 2025`, `NextJS/`, `TailwindCSS/`, `Shadcn UI`, PostHog |
| Kích thước trong seed | 2.810 dòng | ~1.200 dòng |
| Ai quyết định | Nhóm chuẩn (W3C, WHATWG, TC39) | Một công ty hoặc một người |
| Đổi bằng cách | Thêm, gần như không bao giờ bỏ | Breaking change theo phiên bản |
| Còn đúng sau 10 năm | Gần như chắc chắn | Gần như chắc chắn **không** |

Và seed **tự nó** thừa nhận mâu thuẫn này, nhiều lần:

> *"Luôn có công nghệ mới ra trong hệ sinh thái React... **Mỗi năm tôi đánh giá lại tech stack** mình dùng."*
> *"Tôi thích tech stack đã chọn hồi đó, nhưng **tôi sẽ chọn một tech stack khác nếu bắt đầu dự án mới hôm nay.**"*
> *"**UI library đến rồi đi**, nhưng Shadcn UI đã hot hơn một năm nay... là lựa chọn tốt **cho hiện tại**, cho tới khi có thứ lớn tiếp theo."*
> *"ESLint (**có thể là Biome trong tương lai**)"*
> *"Lucia... **mặc dù nó đã deprecated** với tư cách một thư viện."*

> [!note] Đây là loại mâu thuẫn "trong cùng một nguồn"
> Không phải hai tác giả cãi nhau. Một tài liệu duy nhất vừa đưa ra 25 khuyến nghị cụ thể, vừa nói rằng danh sách đó sẽ sai trong vòng một năm. Cả hai vế đều đúng. Vấn đề là **bạn phải làm gì với một danh sách tự khai báo là tạm thời**.

Con số cụ thể từ chính seed: bài viết ghi ngày **2024-12-10**, tự đặt tên là *"[2025]"*, và đã liệt kê một thư viện auth **đã deprecated** (Lucia) làm lựa chọn chính. Đó là chu kỳ bán rã dưới một năm, đo được.

## 2. Vì sao khung "chọn stack" không bị bác bỏ

Công bằng với nó trước — lời phê bình "đừng chạy theo trend, hãy học nền tảng" nghe khôn ngoan nhưng phần lớn là vô dụng khi phải giao sản phẩm:

| Phê bình | Vì sao nó không đủ |
|---|---|
| *"Học nền tảng, đừng học framework"* | Không ai giao được SaaS bằng DOM API thuần trong thời gian hợp lý |
| *"Framework rồi sẽ chết"* | Đúng, nhưng dự án của bạn cũng có thể chết trước — tối ưu cho 10 năm khi chưa sống nổi 1 năm là sai |
| *"Chọn thứ nhàm chán"* | Thứ nhàm chán hôm nay từng là thứ mới hôm qua; "nhàm chán" chỉ có nghĩa khi kèm tiêu chí |
| *"Không có buy-in"* | Mọi lựa chọn đều là buy-in; khác nhau ở **chi phí thoát**, không ở việc có hay không |

Và khung này giải quyết một bài toán có thật: **quyết định là tốn kém**. Một danh sách 25 lựa chọn đã cân nhắc, từ người đã dùng chúng trong sản phẩm thật có doanh thu, tiết kiệm hàng tuần nghiên cứu. Giá trị của nó không nằm ở tính vĩnh cửu mà ở việc **loại bỏ một tập lựa chọn tồi**.

## 3. Chỗ hai khung đồng thuận

| Điểm | Cả hai đều nói |
|---|---|
| TypeScript | Tiêu chuẩn, không phải trend |
| Kiến thức CSS/DOM là bắt buộc | Framework không thay thế nó — xem [[Utility-First vs Cascade]] |
| Validation ở server | Zod hay gì cũng được; nguyên tắc là bất biến |
| Semantic HTML và a11y | Không đổi theo framework |
| Hiểu render/cache/network | Next chỉ đóng gói lại các khái niệm HTTP có sẵn |
| Đánh giá lại định kỳ | Seed nói "mỗi năm"; phía nền tảng nói "khi có lý do" |

Điểm đồng thuận sâu nhất: **những gì framework che giấu vẫn tồn tại**. Cache của Next là HTTP cache đội lốt. RSC là câu trả lời cho một bài toán network. `useEffect` cleanup là gỡ event listener. Người biết tầng dưới debug được tầng trên; người chỉ biết tầng trên thì bị chặn.

## 4. Chỗ nó gãy

⚠️ **Danh sách có ngày hết hạn nhưng không ghi ngày hết hạn.** Bài viết tên "[2025]" viết tháng 12/2024, khuyến nghị một thư viện đã deprecated. Đọc nó năm 2026 mà không kiểm chứng lại là lỗi.

⚠️ **Xung đột lợi ích không được tính vào.** Tác giả trung thực khai báo mình dạy khoá "The Road to Next" về đúng stack này. Điều đó **không** làm lời khuyên sai — nhưng nó giải thích vì sao bài viết trình bày *một* stack thay vì *các đánh đổi*. Một tài liệu so sánh sẽ khó bán khoá học hơn.

⚠️ **"Optional" bị đọc thành "bắt buộc".** Seed đánh dấu rõ Astro, Zustand, React Query là *optional*, và nói *"tôi hiếm khi dùng client state ngày nay"*. Người đọc lướt sẽ cài cả 25 thứ.

⚠️ **Chi phí thoát không được nêu.** Danh sách nói nên dùng gì, không nói **rời khỏi nó tốn bao nhiêu**. Prisma → Drizzle là vài ngày; Vercel → self-host là vài tuần; RSC → SPA là viết lại.

⚠️ **Số lượng quyết định bị đánh giá thấp.** 25 lựa chọn là 25 thứ phải nâng cấp, 25 nơi có lỗ hổng bảo mật, 25 tài liệu phải đọc. Mỗi cái riêng lẻ đều hợp lý; tổng thì không ai review.

⚠️ **Kiến thức framework không chuyển được.** Biết `revalidateTag` không giúp gì ở Remix. Biết HTTP cache thì giúp ở mọi nơi.

⚠️ **Ngược lại: chủ nghĩa thuần tuý nền tảng cũng gãy.** Tự viết combobox có a11y đầy đủ, tự viết cache có dedupe và revalidate, tự viết router có prefetch — đó là hàng tháng công sức để làm lại thứ đã có và kém hơn. Xem [[Component Library Strategy]].

## 5. Cách dùng cả hai một cách trung thực

**Phân tầng theo tốc độ thay đổi.** Đây là cùng một kỹ thuật với [[Utility-First vs Cascade]], áp dụng lên trục thời gian thay vì trục kiến trúc:

| Tầng | Tốc độ đổi | Đầu tư học | Ví dụ |
|---|---|---|---|
| **Nền tảng** | Thập kỷ | **Sâu, một lần** | HTTP, DOM, CSS cascade, event loop, a11y |
| **Mô hình** | ~5 năm | Sâu | Component, declarative UI, server/client boundary, cache invalidation |
| **Framework** | ~2 năm | Vừa đủ để dùng tốt | Next App Router, RSC |
| **Thư viện** | ~1 năm | Nông, đọc doc khi cần | Zustand, nuqs, cva |
| **Công cụ** | ~1 năm | Rất nông | Biome vs ESLint, pnpm vs npm |

**Phân bổ thời gian học ngược với tốc độ thay đổi.** Một giờ học cascade có giá trị dài hơn một giờ học cú pháp `revalidateTag` — nhưng bạn vẫn cần cả hai, chỉ là không cùng mức đầu tư.

**Quy tắc cụ thể:**

| Việc | Nguyên tắc |
|---|---|
| Thêm dependency | Hỏi *"gỡ nó ra tốn bao lâu?"* trước khi hỏi *"nó có tốt không?"* |
| Chọn giữa hai thư viện tương đương | Chọn cái bám sát API nền tảng hơn |
| Học một tính năng framework | Hỏi *"nó đóng gói khái niệm nền tảng nào?"* |
| Đọc một danh sách stack | Kiểm ngày viết trước khi đọc nội dung |
| Đánh giá lại stack | Theo lịch, không theo cảm hứng — seed nói mỗi năm, đó là con số hợp lý |
| Viết code ở biên | Giữ biên với framework mỏng và tường minh |

**Dùng danh sách stack như:** một điểm khởi đầu đã lọc, kèm ngày hết hạn.
**Không dùng nó như:** một danh sách kiểm để làm theo, hoặc bằng chứng rằng lựa chọn là đúng.

## 6. Phép kiểm bạn tự chạy được

1. **Kiểm ngày.** Với mọi bài viết khuyến nghị stack: tìm ngày xuất bản. Rồi kiểm **từng** thư viện được nêu — còn được bảo trì không? Commit gần nhất bao giờ? Với seed này, phép kiểm đó phát hiện Lucia đã deprecated ngay tại thời điểm viết.

2. **Kiểm chi phí thoát.** Với mỗi dependency lớn: *"nếu nó bị bỏ ngày mai, tôi mất bao lâu để thay?"* Câu trả lời tính bằng tuần thì cần một lớp trừu tượng ở biên. Tính bằng tháng thì đó là quyết định kiến trúc, không phải quyết định thư viện.

3. **Kiểm tính chuyển được.** Với mỗi thứ bạn học tuần này: *"kiến thức này còn dùng được nếu tôi đổi framework không?"* Nếu tỉ lệ "không" quá cao trong nhiều tháng liền, bạn đang tích luỹ kiến thức khấu hao nhanh.

4. **Kiểm tầng dưới.** Chọn một tính năng framework bạn dùng hằng ngày. Giải thích nó bằng khái niệm nền tảng. *Data Cache của Next là gì, nói bằng ngôn ngữ HTTP?* Không trả lời được nghĩa là bạn sẽ bị chặn khi nó hỏng.

5. **Đếm dependency.** `cat package.json | jq '.dependencies | length'`. Với mỗi cái, hỏi có còn dùng không. Con số thường gây bất ngờ.

6. **Kiểm tách nội dung khỏi nguồn.** Với mọi khuyến nghị: *"kết luận này có phụ thuộc vào việc tác giả bán gì không?"* Áp dụng cho seed này: tác giả bán khoá học về stack này, Vercel viết doc khuyên dùng tính năng Vercel, PostHog viết tutorial khuyên dùng PostHog. **Không cái nào trong đó khiến nội dung sai** — nhưng nó cho biết vì sao bạn không thấy phần đánh đổi, và bạn phải tự đi tìm phần đó.

7. **Kiểm bằng seed của chính bạn.** Mở `_archive-seed/React Tech Stack 2025.md`. So 25 lựa chọn đó với thực tế hôm nay. Cái nào còn đúng, cái nào đã đổi? Đó là dữ liệu trực tiếp về chu kỳ bán rã, đo trên chính nguồn bạn đã tin.

## Tham khảo

- Robin Wieruch — *React Tech Stack [2025]*: https://www.robinwieruch.de/react-tech-stack/
- Dan McKinley — *Choose Boring Technology*: https://boringtechnology.club/
- MDN — *Web platform (nền tảng không đổi)*: https://developer.mozilla.org/en-US/docs/Web
- Baseline — *Tính năng nào đã an toàn để dùng*: https://web.dev/baseline
- Jeremy Keith — *The Layers of the Web*: https://adactio.com/journal/17501
- Alex Russell — *The Market for Lemons* (chi phí thật của framework): https://infrequently.org/2023/02/the-market-for-lemons/

## Liên kết

[[Frontend Tech Stack 2025]] · [[Utility-First vs Cascade]] · [[Frontend Learning Path]] · [[Component Library Strategy]] · [[Frontend Deployment]] · [[Frontend]]
