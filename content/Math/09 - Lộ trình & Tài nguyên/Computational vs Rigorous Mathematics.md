---
tags: [math, meta, bridge-note]
type: bridge
status: evergreen
---
# Computational vs Rigorous Mathematics

> ⚠️ **Note bản lề.** Seed của vault này chứa **hai hệ giá trị mâu thuẫn** về câu hỏi *"biết một môn toán nghĩa là gì"*. Note này không chọn phe và không làm mượt mâu thuẫn đi — nó ghi lại cả hai một cách trung thực, chỉ ra chỗ chúng đồng thuận, chỗ mỗi bên gãy, và cách dùng cả hai.

> [!note] Ghi chú nguồn
> Mâu thuẫn nằm ngay trong ba file seed:
> - `You Can Learn Calculus 1 in One Video (Full Course).md` — **60 mục** trong **5 giờ 20 phút**, không có một chứng minh nào trong danh sách mục, sách gợi ý là Stewart và Larson (sách bài tập).
> - `mathematics-roadmap.jpg` — đặt **Naive Set Theory, Proofs, and Discrete Mathematics** làm nút chặn trước gần như mọi thứ, và xếp Real Analysis (Bartle, Rudin, Abbott) là bước bắt buộc **sau** calculus.
> - `stirling formular - Google Search.md` — cùng một công thức xuất hiện ở HyperPhysics (một dòng, không chứng minh) và ở Terry Tao / Conrad (nhiều trang, chứng minh đầy đủ).
>
> Ba nguồn này không nói chuyện với nhau. Chúng có thể **cùng đúng**, và note này giải thích khi nào.

## 1. Hai khung, phát biểu bằng từ vựng của chính nó

**Khung tính toán (computational).**
> Toán là một bộ công cụ. Biết calculus nghĩa là **giải được bài**: tính giới hạn, lấy đạo hàm, tính tích phân, xử lý bài toán tối ưu và related rates. Chứng minh $\varepsilon$–$\delta$ không giúp bạn tính $\int x e^{x^2}dx$. Học nhanh, làm nhiều bài, xây phản xạ. 5 giờ là đủ để có công cụ dùng được cho vật lý, kỹ thuật, kinh tế, machine learning.

**Khung chặt chẽ (rigorous).**
> Toán là một hệ thống suy luận. Biết calculus nghĩa là **biết vì sao mỗi công thức đúng và khi nào nó sai**: giả thiết nào cần thiết, phản ví dụ nào phá vỡ nó. Không có nền chứng minh thì bạn không phát hiện được khi công cụ bị dùng ngoài phạm vi. Con đường là Proofs → Real Analysis, và nó mất nhiều năm chứ không phải nhiều giờ.

## 2. Vì sao khung tính toán không bị bác bỏ

Công bằng với nó trước — vì nó thắng ở nhiều chỗ hơn người ta thừa nhận:

1. **Phần lớn người dùng toán không cần chứng minh.** Kỹ sư, nhà phân tích, lập trình viên ML dùng đạo hàm và tích phân hàng ngày mà không bao giờ cần chứng minh MVT.
2. **Trực giác thường đi trước hình thức trong lịch sử.** Newton và Euler làm calculus hai thế kỷ trước khi Cauchy và Weierstrass làm cho nó chặt chẽ. Chờ có $\varepsilon$–$\delta$ mới dùng đạo hàm thì mất 200 năm.
3. **Thành thạo tính toán là điều kiện cần cho hiểu chặt chẽ.** Không thể hiểu tại sao FTC đáng ngạc nhiên nếu chưa từng tự tính một tổng Riemann.
4. **Chi phí cơ hội là thật.** Ba năm học analysis để hiểu calculus "cho đúng" là ba năm không làm việc khác. Với đa số mục tiêu, đó là đánh đổi tồi.
5. **Terence Tao — người đại diện tiêu biểu của khung chặt chẽ — đồng ý.** Bài *"There's more to mathematics than rigour and proofs"* của ông mô tả ba giai đoạn: tiền-chặt-chẽ (trực giác), chặt-chẽ (hình thức), và **hậu-chặt-chẽ** (dùng trực giác trở lại, nhưng đã có hình thức làm lưới an toàn). Khung tính toán là giai đoạn 1, không phải một sai lầm.

## 3. Chỗ hai khung đồng thuận — nhiều hơn bạn tưởng

| Điểm | Cả hai đồng ý |
|---|---|
| Phải làm bài tập | Đọc thụ động không tạo ra hiểu ở bất kỳ khung nào |
| Giới hạn là khái niệm nền | Chỉ khác ở mức hình thức hoá |
| Ví dụ và phản ví dụ quan trọng | Rigorous gọi là "kiểm giả thiết", computational gọi là "cạm bẫy" |
| Trực giác cần thiết | Không ai học được analysis mà không có trực giác trước |
| Thứ tự chủ đề gần như giống nhau | Limits → derivatives → integrals ở cả hai |
| Cạm bẫy là phần giá trị nhất | Xem mọi mục "Cạm bẫy" trong vault này |
| Ký hiệu phải hiểu đúng | Lượng từ sai = khái niệm khác |

**Điều đáng chú ý:** phần lớn "cạm bẫy" trong các note calculus của vault này ($f'(c)=0$ không kéo theo cực trị; FTC sai nếu có gián đoạn; EVT cần khoảng đóng) **là** nội dung chặt chẽ được viết bằng từ vựng tính toán. Hai khung gặp nhau ở đúng chỗ đó.

## 4. Chỗ mỗi khung gãy

### ⚠️ Khung tính toán gãy ở đâu

1. **Không phát hiện được khi công cụ dùng sai phạm vi.** $\int_{-1}^1\frac{dx}{x^2}=-2$ — một kết quả **âm** cho một hàm **luôn dương**. Người chỉ có phản xạ tính toán sẽ viết ra và không thấy gì sai. Người biết giả thiết liên tục của FTC thì dừng ngay. → [[Fundamental Theorem of Calculus]]
2. **Không mở rộng được.** Calculus tính toán không dẫn tới đo lường, tích phân Lebesgue, hay xác suất chặt chẽ. Muốn đọc [[Prob&Stats]] ở mức Billingsley thì phải quay lại làm nền.
3. **Định lý biến thành thần chú.** "EVT: hàm liên tục trên khoảng đóng đạt max min" — thuộc mà không biết vì sao cần chữ *đóng* thì không dùng được định lý trong tình huống mới.
4. **Không tự kiểm được.** Khung này dựa vào đáp án có sẵn. Ngoài đời không có đáp án.
5. **"Học calculus trong một video" là quảng cáo, không phải mô tả.** 60 mục / 5h20 = **5 phút một chủ đề**. Không ai học được related rates trong 5 phút. Video là một **bản đồ nội dung tốt** — và vault này dùng nó đúng như vậy, biến 60 mục thành 35 note — nhưng nó không phải một khoá học.

### ⚠️ Khung chặt chẽ gãy ở đâu

1. **Chi phí khởi động khổng lồ.** Roadmap trong seed có ~40 nút. Người cần tính đạo hàm cho công việc tuần sau không đi đường đó được.
2. **Rigor mortis.** Tao mô tả trực tiếp: mắc kẹt ở giai đoạn 2, không dám kết luận gì nếu chưa chứng minh được, mất khả năng ước lượng và đoán.
3. **Chặt chẽ không bảo đảm hiểu.** Đọc trọn Rudin mà không biết đạo hàm dùng để làm gì là chuyện có thật.
4. **Thứ tự trong roadmap là lý tưởng hoá.** Thực tế nhiều người học đo lường **sau** khi cần nó, và học tốt hơn vì đã có động lực.
5. **"Phải đọc Rudin" là một chuẩn mực xã hội, không phải một sự thật toán học.** Abbott hoặc Tao dạy cùng nội dung dễ tiếp cận hơn.

## 5. Cách dùng cả hai một cách trung thực

| Dùng khung tính toán như | **Không** dùng nó như |
|---|---|
| công cụ làm việc hàng ngày | bằng chứng bạn "biết" calculus |
| bản đồ nội dung để biết cần học gì | thay thế cho việc tự làm bài |
| giai đoạn 1 (tiền-chặt-chẽ) của Tao | điểm dừng cuối cùng nếu bạn cần mở rộng |

| Dùng khung chặt chẽ như | **Không** dùng nó như |
|---|---|
| lưới an toàn: biết công cụ hỏng ở đâu | điều kiện tiên quyết để bắt đầu |
| nền cho mọi thứ sau đại học | thước đo giá trị con người |
| cách kiểm tra trực giác của mình | lý do trì hoãn việc dùng toán |

**Quy tắc thực dụng rút ra:** với mỗi công cụ bạn dùng, biết **giả thiết** của nó và **một phản ví dụ** khi giả thiết hỏng. Đó là mức chặt chẽ tối thiểu có ích, và nó rẻ hơn nhiều so với học full analysis. Mọi note trong thư mục `01`–`04` của vault này được viết theo đúng nguyên tắc đó: công thức theo khung tính toán, mục "Cạm bẫy" theo khung chặt chẽ.

## 6. Phép kiểm bạn tự chạy được

Biến tranh cãi thành việc làm được. Với một chủ đề bạn nghĩ mình đã biết:

1. **Phát biểu lại định lý** mà không nhìn sách. Có nêu đủ giả thiết không?
2. **Bỏ một giả thiết, tìm phản ví dụ.** Không tìm được ⟹ bạn chưa biết giả thiết đó để làm gì.
3. **Tính một bài mà công cụ chuẩn cho kết quả sai** (như $\int_{-1}^1 x^{-2}dx$). Bạn có bắt được không?
4. **Giải thích cho người khác trong 3 phút**, không dùng công thức.
5. **Kiểm bằng số.** Xấp xỉ của bạn có đúng ở $n=10$ không? → [[Stirling's Approximation]]

Trượt bài 1–2 ⟹ thiếu nền chặt chẽ. Trượt bài 3–5 ⟹ thiếu thành thạo tính toán. Cả hai đều sửa được, và sửa hai cái khác nhau.

## 7. Vault này đứng ở đâu

Không ở phe nào. Cụ thể:

- Thư mục `00 - Nền tảng & Chứng minh` tồn tại vì **roadmap** đòi, dù seed calculus không có.
- Thư mục `01`–`04` theo **cấu trúc và nội dung** của video calculus — trả đủ 60 lời hứa.
- Nhưng mỗi note trong đó có mục **"Cạm bẫy"** và **"Checklist"**, và phần lớn nội dung hai mục đó là nội dung chặt chẽ.
- Mỗi note trong `01`–`04` mở đầu bằng một dòng ⚠️ trỏ về note này.
- Thư mục `08` giữ **cả hai** bản của Stirling: bản dùng được ([[Stirling's Approximation]]) và bản chứng minh ([[Proving Stirling's Formula]]).

## Tham khảo
- Terence Tao — *There's more to mathematics than rigour and proofs* (ba giai đoạn): https://terrytao.wordpress.com/career-advice/theres-more-to-mathematics-than-rigour-and-proofs/
- Paul Lockhart — *A Mathematician's Lament*: https://www.maa.org/external_archive/devlin/LockhartsLament.pdf
- William Thurston — *On Proof and Progress in Mathematics*: https://arxiv.org/abs/math/9404236
- Abbott — *Understanding Analysis* (bản dễ tiếp cận của khung chặt chẽ): https://link.springer.com/book/10.1007/978-1-4939-2712-8
- The Math Sorcerer — *Calculus 1 Full Course* (nguồn seed, khung tính toán): https://www.youtube.com/watch?v=G-ti56DEXE8

## Liên kết
[[Mathematics Roadmap]] · [[Reading Mathematics]] · [[Proof Techniques]] · [[Learning Resources]] · [[Stirling's Approximation]] · [[Fundamental Theorem of Calculus]] · [[Math]]
