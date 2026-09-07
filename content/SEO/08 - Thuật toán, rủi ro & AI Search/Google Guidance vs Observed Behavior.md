---
tags: [seo, bridge-note, epistemics]
status: evergreen
---
# Google Guidance vs Observed Behavior

> **Note bản lề.** SEO là lĩnh vực hiếm hoi mà **người ra đề cũng là người chấm thi, và họ công bố hướng dẫn ôn tập** — nhưng hướng dẫn đó không mô tả đầy đủ đề thi. Note này không chọn phe giữa "tin Google" và "tin dữ liệu ngành"; nó dựng một khung để dùng cả hai một cách trung thực.

## 1. Ba nguồn tri thức, ba động cơ khác nhau

| Nguồn | Nói gì | **Động cơ** của nguồn đó |
|---|---|---|
| **Google chính thức** (docs, blog, phát ngôn viên) | Nên làm gì để phục vụ người dùng | Giảm spam, không tiết lộ cách khai thác hệ thống, bảo vệ chất lượng kết quả |
| **Dữ liệu ngành** (Ahrefs, Semrush, Moz, nghiên cứu tương quan) | Cái gì tương quan với thứ hạng | Bán công cụ; cần kết luận hấp dẫn và có thể chia sẻ |
| **Tài liệu rò rỉ / hồ sơ toà án** (leak API 2024, phiên toà chống độc quyền) | Tên các trường dữ liệu và tín hiệu nội bộ | Không có động cơ marketing — nhưng cũng không có ngữ cảnh |

**Không nguồn nào là nguồn trung lập.** Google có động cơ không nói hết; công cụ có động cơ nói quá; leak không có động cơ nhưng thiếu ngữ cảnh nghiêm trọng.

## 2. Nơi ba nguồn **đồng thuận** — thường nhiều hơn ta tưởng

Đây là phần quan trọng và hay bị bỏ qua trong các tranh cãi:

| Điểm đồng thuận | Google nói | Dữ liệu ngành thấy | Leak/toà án cho thấy |
|---|---|---|---|
| Link quan trọng | "link analysis system" | Tương quan mạnh với thứ hạng | Nhiều trường liên quan tới link |
| Nội dung khớp intent là nền tảng | ✅ | ✅ | ✅ |
| Chất lượng đánh giá ở **cấp site**, không chỉ trang | ✅ (helpful content) | ✅ | `siteAuthority`, site-level signals |
| Kỹ thuật (crawl/index) là điều kiện cần | ✅ | ✅ | ✅ |
| Freshness quan trọng với một số truy vấn | ✅ | ✅ | Trường liên quan tới ngày |
| Brand/entity quan trọng | ✅ (gián tiếp) | ✅ | Trường liên quan tới site và entity |

**Hệ quả thực dụng:** ~80% công việc SEO nằm trong vùng đồng thuận này. Tranh cãi về 20% còn lại không nên làm bạn bỏ bê 80% kia.

## 3. Nơi chúng **mâu thuẫn** — cụ thể từng điểm

| Chủ đề | Google nói công khai | Bằng chứng khác |
|---|---|---|
| **Click / tương tác người dùng** | Nhiều lần nói không dùng CTR làm ranking factor | Leak 2024 chứa `navBoost` và các trường liên quan tới click; hồ sơ toà án nhắc tới hệ thống dùng dữ liệu tương tác |
| **"Domain authority"** | "Chúng tôi không có domain authority" | Leak chứa trường tên `siteAuthority` |
| **Tuổi domain** | "Tuổi domain không phải ranking factor" | Leak chứa `hostAge`; ngữ cảnh sử dụng không rõ |
| **Sandbox cho site mới** | Phủ nhận tồn tại | Leak chứa trường gợi ý phân loại site mới |
| **E-E-A-T** | "Không phải ranking factor" | Đúng về mặt kỹ thuật — nhưng hệ thống *cố* xấp xỉ nó |
| **Subdomain vs subfolder** | "Chúng tôi xử lý như nhau" | Nhiều case study cho thấy chuyển sang subfolder tăng traffic |
| **HCU 2023** | "Cải thiện nội dung sẽ hồi phục" | Nhiều site chất lượng cao không hồi phục sau nhiều lần cải thiện |

> [!warning] Cảnh báo về leak 2024 — quan trọng
> Tài liệu rò rỉ là **định nghĩa schema nội bộ**, không phải mô tả hệ thống đang chạy. Một trường tên `siteAuthority` tồn tại **không** chứng minh: (a) nó đang được dùng, (b) nó dùng trong xếp hạng chứ không phải chống spam hay đánh giá nội bộ, (c) nó nghĩa như tên gọi. Nhiều diễn giải phổ biến của leak vượt xa bằng chứng thực tế.
>
> Đồng thời, sự tồn tại của các trường này **có** làm suy yếu các phủ nhận tuyệt đối của Google. Cả hai điều trên cùng đúng.

## 4. Vì sao Google nói không đầy đủ — không phải vì họ nói dối

Hiểu động cơ giúp diễn giải tốt hơn là buộc tội:

1. **Tiết lộ cơ chế = tạo ra cách khai thác.** Nếu Google mô tả chính xác cách dùng dữ liệu click, ngành công nghiệp click farm sẽ ra đời trong một tuần.
2. **Phát ngôn viên trả lời câu hỏi cụ thể theo nghĩa hẹp.** "CTR không phải ranking factor" có thể đúng theo nghĩa "không có một trường CTR đưa thẳng vào công thức xếp hạng", trong khi dữ liệu tương tác vẫn được dùng ở nơi khác trong hệ thống.
3. **Hướng dẫn là quy phạm, không phải mô tả.** Google nói *"nên làm gì"*, không phải *"hệ thống làm gì"*. Hai loại phát biểu khác nhau.
4. **Hệ thống quá phức tạp để mô tả đúng.** Hàng trăm hệ thống, trọng số thay đổi theo truy vấn.

## 5. Khung làm việc — cách dùng cả ba nguồn

Gán mỗi tuyên bố vào một bậc, và cho phép mỗi bậc một loại hành động:

| Bậc | Nguồn | Hành động được phép |
|---|---|---|
| **A** | Google tài liệu hoá | Đầu tư mạnh, dài hạn |
| **B** | Google mô tả hệ thống nhưng không cơ chế | Đầu tư, nhưng theo tinh thần chứ không theo chữ |
| **C** | Leak / toà án / quan sát lặp lại | Dùng để **giải thích** hiện tượng và **ưu tiên thử nghiệm**; không dựng chiến lược |
| **D** | Tương quan / folklore | Bỏ qua |

**Quy tắc vàng:** *"Đừng bao giờ làm việc gì mà lý do duy nhất để làm nó nằm ở bậc C hoặc D."*

## 6. Phép kiểm tự chạy được

Thay cho checklist — đây là những phép kiểm bạn tự chạy được để không bị cuốn theo bất kỳ phe nào:

- [ ] **Tách nội dung khỏi nguồn:** *"Kết luận này có phụ thuộc vào việc ai nói nó không?"* Nếu một tuyên bố chỉ đúng vì Google nói, hoặc chỉ đúng vì một SEO nổi tiếng nói, nó chưa được kiểm chứng.
- [ ] **Kiểm ngày:** tuyên bố này được đưa ra khi nào? Chính sách và hệ thống đã đổi chưa? — [[SEO Tactics Half-Life]]
- [ ] **Hỏi động cơ:** nguồn này được lợi gì khi bạn tin điều đó?
- [ ] **Phân biệt quy phạm vs mô tả:** phát biểu này nói *"nên làm gì"* hay *"hệ thống làm gì"*?
- [ ] **Kiểm phủ nhận có tuyệt đối không:** "chúng tôi không dùng X" mạnh hơn nhiều "X không phải ranking factor" — câu sau thường có nghĩa hẹp hơn bạn tưởng.
- [ ] **Tự thí nghiệm khi có thể:** với thay đổi test được, chạy [[SEO Testing]] thay vì tranh cãi.
- [ ] **Kiểm tương quan vs nhân quả:** nghiên cứu này chứng minh nhân quả hay chỉ ghi nhận tương quan?
- [ ] **Nếu bỏ hết bậc C và D:** kế hoạch SEO của bạn có còn nguyên vẹn không? Nếu không, bạn đang xây trên nền yếu.

## 7. Cách dùng note này

Mọi note trong vault này gán bậc bằng chứng khi nói về ranking. Khi bạn đọc một note và thấy khẳng định mạnh về "cái gì làm tăng thứ hạng", quay lại đây và gán bậc trước khi hành động.

Các note phụ thuộc nhiều nhất vào khung này: [[Ranking Signals Overview]], [[Backlink Fundamentals]], [[Topical Authority]], [[Link Building Tactics]], [[Helpful Content and Core Updates]].

## Tham khảo
- [Google — A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
- [Google — Search Essentials](https://developers.google.com/search/docs/essentials)
- [SparkToro — An anonymous source shared thousands of leaked Google Search API documents (2024)](https://sparktoro.com/blog/an-anonymous-source-shared-thousands-of-leaked-google-search-api-documents-with-me-everyone-in-seo-should-see-them/)
- [iPullRank — Google Search Document Leak analysis](https://ipullrank.com/google-algo-leak)
- [Google Search Quality Rater Guidelines](https://services.google.com/fh/files/misc/hsw-sqrg.pdf)

## Liên kết
[[Ranking Signals Overview]] · [[Backlink Fundamentals]] · [[Topical Authority]] · [[Helpful Content and Core Updates]] · [[SEO Tactics Half-Life]] · [[SEO]]
