---
tags: [frontend, css, tailwind, note-bản-lề]
status: evergreen
---
# ⚠️ Utility-First vs Cascade

> **Note bản lề.** Seed của area này chứa hai hệ giá trị chỏi nhau trực tiếp, và không hoà tan được.

## 1. Mâu thuẫn là gì

Seed frontend gồm hai khối:

| Khối A — nền tảng | Khối B — utility |
|---|---|
| `CSS reference.md`, `CSS guides.md` (MDN) | ~45 file TailwindCSS, `Tailwind CSS.md` |
| Coi **cascade, specificity, inheritance, selector** là khái niệm trung tâm — chúng được liệt kê ngay trong mục "Concepts" của MDN | Vô hiệu hoá gần như toàn bộ chúng: mọi utility cùng specificity, không ai kế thừa từ ai, không có selector nào để suy luận |
| Class mang **nghĩa**: `.card__title` mô tả nội dung | Class mang **hình dáng**: `text-lg font-semibold` mô tả trình bày |
| Tách biệt mối quan tâm: HTML là cấu trúc, CSS là trình bày | Bác bỏ chính sự tách biệt đó |

Và seed còn có một tiếng nói thứ ba, từ `React Tech Stack 2025.md`:

> *"Tailwind vẫn chia rẽ cộng đồng developer, nhưng tôi tin nó là lựa chọn tốt nhất hiện nay... một khi quen Tailwind sau một tuần, khó tưởng tượng quay lại cách CSS truyền thống."*

Đây không phải khác biệt về sở thích cú pháp. **Utility-first bác bỏ chính cơ chế mà CSS được thiết kế xoay quanh.** Cascade là tên của ngôn ngữ — *Cascading* Style Sheets — và utility-first cố tình không dùng nó.

## 2. Vì sao utility-first không bị bác bỏ dứt điểm

Công bằng với nó trước. Những lời phê bình thường gặp phần lớn không đứng vững:

| Phê bình | Vì sao nó không đủ mạnh |
|---|---|
| *"Giống inline style"* | Sai về mặt kỹ thuật. Inline style không làm được `hover:`, `md:`, `dark:`, `group-*`, `peer-*`, `::before`. Utility ràng buộc vào một **thang thiết kế**; inline style thì vô hạn |
| *"Markup xấu"* | Đúng, nhưng đây là thẩm mỹ, không phải kỹ thuật. Và nó được đánh đổi lấy thứ đo được: CSS không phình |
| *"Không tách biệt mối quan tâm"* | Tách biệt **file** khác tách biệt **mối quan tâm**. Một `.card__title` chỉ dùng ở một chỗ đã ghép chặt với HTML rồi — chỉ là ghép qua một sợi dây vô hình |
| *"Không học được CSS"* | Đây là phê bình *người dùng*, không phải phê bình *công cụ* |

Và nó giải được một bài toán **có thật, đo được**: CSS truyền thống chỉ tăng, không giảm. Coverage 8% ở codebase lớn là con số thật. Không ai dám xoá một class vì không biết ai còn dùng. Utility-first làm cho CSS **có thể xoá được** — xoá markup là xoá style.

## 3. Chỗ hai khung đồng thuận — nhiều hơn bạn tưởng

| Điểm | Cascade nói | Utility-first nói |
|---|---|---|
| Specificity phẳng là tốt | BEM tồn tại chính để đạt điều này | Mọi utility cùng một mức |
| Token tập trung | Custom property ở `:root` | `@theme` |
| Cascade layer hữu ích | `@layer` giải chiến tranh specificity | Tailwind **được xây trên** `@layer` |
| Colocate style với component | CSS Modules, `@scope` | Class nằm ngay trong markup |
| Thang thiết kế > giá trị tuỳ ý | Design token | Thang spacing/màu |
| Phải hiểu box model, flex, grid, stacking context | Hiển nhiên | **Cũng hiển nhiên** — utility chỉ đổi tên |

> [!note] Điểm đồng thuận quan trọng nhất
> Tailwind **không** thay thế kiến thức CSS. `flex-1` vẫn có `min-width: auto` gây tràn; `z-50` vẫn thua stacking context; `backdrop-blur` vẫn phá `position: fixed`. Mọi cạm bẫy trong [[CSS Flexbox]], [[Stacking Context]], [[CSS Box Model]] tồn tại y nguyên, chỉ đổi tên. Người dùng Tailwind mà không biết CSS sẽ bị chặn ở đúng những chỗ đó — và không có từ khoá để tìm kiếm.

## 4. Chỗ nó gãy

⚠️ **Nội dung không do bạn đặt class.** Markdown từ CMS, HTML từ API, email template. Không có markup để gắn utility. Cần `prose`, tức là quay lại CSS truyền thống dưới lớp áo khác.

⚠️ **Style theo ngữ cảnh sâu.** "Mọi `<a>` trong `<footer>` khi trang ở chế độ in" — utility không diễn đạt được vì không có nơi nào đặt class. Arbitrary variant `[&_a]:` giải quyết được nhưng nhanh chóng trở nên khó đọc hơn CSS thường.

⚠️ **Animation phức tạp.** `@keyframes` nhiều bước, motion path, scroll-driven timeline — không có utility, phải viết CSS.

⚠️ **`@apply` là cửa hậu phá vỡ mô hình.** Nó khôi phục đúng những vấn đề Tailwind sinh ra để giải: đặt tên, phạm vi toàn cục, CSS chỉ tăng. Chính tác giả Tailwind khuyến nghị tránh nó. Nếu codebase của bạn đầy `@apply`, bạn đang trả giá của cả hai mô hình và không hưởng lợi ích của cái nào.

⚠️ **Diff và code review kém.** Đổi một class trong chuỗi 30 class rất khó thấy trong diff.

⚠️ **Ràng buộc vào build tool.** CSS chạy được ở mọi nơi; Tailwind cần bước build và một `content` glob đúng. Class ghép chuỗi động **âm thầm biến mất trong production**.

⚠️ **Không có utility cho mọi thứ.** `@container` phức tạp, `@property`, `@scope`, `mask-composite`, một số filter SVG — vẫn cần CSS.

⚠️ **Chi phí học không nằm ở Tailwind mà ở việc phải biết CSS *và* biết ánh xạ.** Bạn phải nhớ `content-*` là `align-content` còn `items-*` là `align-items`.

## 5. Cách dùng cả hai một cách trung thực

**Đây không phải chọn phe. Đây là phân tầng.**

| Tầng | Dùng gì | Vì sao |
|---|---|---|
| **Reset & base** | CSS thường trong `@layer base` | Style thẻ trần, không có markup để gắn class |
| **Token** | Custom property trong `@theme` | Cả hai khung đồng ý |
| **Layout & component** | Utility | Chỗ utility mạnh nhất |
| **Biến thể component** | `cva` + `tailwind-merge` | Trừu tượng hoá bằng **component**, không phải `@apply` |
| **Nội dung dài** | `prose` / CSS thường | Không đặt được class |
| **Animation phức tạp** | `@keyframes` trong CSS | Utility không phủ |

**Dùng utility như:** ngôn ngữ để *lắp ráp* component.
**Không dùng utility như:** ngôn ngữ để *định nghĩa* component dùng lại — cái đó là việc của component trong React/Vue.

Nguyên tắc phân biệt: nếu bạn thấy mình **sao chép một chuỗi utility**, đó là lúc cần một component, không phải một `@apply`.

## 6. Phép kiểm bạn tự chạy được

Thay vì tranh luận, chạy những phép kiểm này trên codebase thật:

1. **Kiểm tra CSS chết.** DevTools → Coverage, tải trang chính. Bao nhiêu % CSS không dùng? Trên 60% là dấu hiệu CSS truyền thống đang mất kiểm soát; đây là bài toán utility-first giải.

2. **Kiểm tra chi phí xoá.** Chọn một component sắp xoá. Hỏi: *xoá file component xong, tôi có phải tìm CSS mồ côi ở đâu khác không?* Nếu có — bạn đang trả giá của CSS toàn cục.

3. **Kiểm tra `@apply`.**
   ```bash
   grep -rc '@apply' src/ | grep -v ':0'
   ```
   Nhiều kết quả nghĩa là bạn đang ở giữa hai mô hình, chịu chi phí của cả hai.

4. **Kiểm tra class trùng lặp.** Tìm chuỗi utility xuất hiện hơn ba lần. Mỗi cái là một component còn thiếu.

5. **Kiểm tra kiến thức thật.** Hỏi: *vì sao `flex-1` không co được khi nội dung dài?* Nếu không trả lời được `min-width: auto`, thì vấn đề không phải Tailwind hay CSS — mà là bạn chưa biết CSS.

6. **Kiểm tra production.** So class có trong dev với class có trong CSS build ra. Chênh lệch = `content` glob thiếu hoặc class ghép chuỗi động.

7. **Kiểm tra tách nội dung khỏi nguồn.** Với mọi lời khuyên về stack trong seed: *kết luận này có phụ thuộc vào việc tác giả bán khoá học về chính stack đó không?* Robin Wieruch trung thực về việc mình dạy khoá "The Road to Next" — điều đó không làm lời khuyên sai, nhưng nó giải thích vì sao danh sách nghiêng về một stack duy nhất thay vì trình bày đánh đổi. Xem [[Framework Churn vs Platform Longevity]].

## Tham khảo

- Adam Wathan — *CSS Utility Classes and "Separation of Concerns"*: https://adamwathan.me/css-utility-classes-and-separation-of-concerns/
- Tailwind — *Styling with utility classes (mục "Why not @apply")*: https://tailwindcss.com/docs/styling-with-utility-classes
- MDN — *CSS cascading and inheritance*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade
- Nicolas Gallagher — *About HTML semantics and front-end architecture*: https://nicolasgallagher.com/about-html-semantics-front-end-architecture/
- Heydon Pickering — *On Utility Classes* (phía phản biện): https://heydonworks.com/article/naming-things-is-easy/
- CSSWG — *CSS Cascading and Inheritance Level 5*: https://drafts.csswg.org/css-cascade-5/

## Liên kết

[[CSS Cascade & Specificity]] · [[CSS Architecture]] · [[Tailwind Utility Model]] · [[Component Library Strategy]] · [[Framework Churn vs Platform Longevity]] · [[Frontend]]
