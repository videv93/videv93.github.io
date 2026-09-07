---
tags: [frontend, css]
status: evergreen
---
# CSS Selectors

> Hơn 60 selector và 5 combinator. Bạn dùng khoảng tám cái mỗi ngày — nhưng chính những cái còn lại (`:is`, `:where`, `:has`, `:focus-visible`) mới là thứ xoá được cả trăm dòng JavaScript.

## 1. Khái niệm cốt lõi

### Basic selectors

| Selector | Cú pháp | Specificity |
|---|---|---|
| Universal | `*` | (0,0,0) |
| Type | `elementname` | (0,0,1) |
| Class | `.classname` | (0,1,0) |
| ID | `#idname` | (1,0,0) |
| Attribute | `[attr=value]` | (0,1,0) |

### Grouping

**Selector list** `A, B` — chọn cả `A` lẫn `B`. ⚠️ Một thành viên hỏng giết cả rule (xem [[CSS Syntax & At-rules]]).

### Combinators — quan hệ giữa element

| Combinator | Cú pháp | Nghĩa |
|---|---|---|
| Descendant | `A B` | `B` là hậu duệ của `A`, không nhất thiết trực tiếp |
| Child | `A > B` | `B` là con **trực tiếp** của `A` |
| Next-sibling | `A + B` | `B` đứng **ngay sau** `A`, cùng cha |
| Subsequent-sibling | `A ~ B` | `B` đứng sau `A` (không nhất thiết ngay sau), cùng cha |
| Column | `A \|\| B` | `B` nằm trong cột bảng `A`; element span nhiều cột thuộc về mọi cột đó |

### Attribute selectors

| Cú pháp | Khớp khi |
|---|---|
| `[attr]` | Có attribute |
| `[attr="v"]` | Bằng đúng `v` |
| `[attr~="v"]` | Danh sách cách nhau bởi space có chứa `v` |
| `[attr\|="v"]` | Bằng `v` hoặc bắt đầu bằng `v-` (dùng cho `lang`) |
| `[attr^="v"]` | Bắt đầu bằng |
| `[attr$="v"]` | Kết thúc bằng |
| `[attr*="v"]` | Chứa chuỗi con |
| `[attr="v" i]` | Không phân biệt hoa thường |

### Pseudo-class `:` vs pseudo-element `::`

- **Pseudo-class** — một **trạng thái đặc biệt** của element đã có: `:hover`, `:checked`, `:nth-child()`.
- **Pseudo-element** `::` — một **thực thể không có trong HTML**: `::before`, `::after`, `::marker`, `::placeholder`, `::selection`, `::first-line`, `::first-letter`, `::backdrop`, `::part()`, `::highlight()`.

Bốn pseudo-class đáng học nhất:

| Selector | Làm được gì |
|---|---|
| `:is(a, b, c)` | Rút gọn selector list; lấy specificity cao nhất; **forgiving** |
| `:where(a, b, c)` | Như `:is()` nhưng specificity **luôn 0** |
| `:has(> img)` | **Parent selector** — chọn cha dựa vào con. Xoá vô số JS |
| `:focus-visible` | Chỉ hiện focus ring cho người dùng bàn phím |

Nhóm trạng thái form: `:checked`, `:disabled`, `:required`, `:invalid`, `:user-invalid`, `:in-range`, `:placeholder-shown`, `:autofill`, `:indeterminate`, `:read-only` — xem [[HTML Forms & Validation]].

Nhóm cấu trúc: `:first-child`, `:last-child`, `:only-child`, `:nth-child(An+B [of S])`, `:nth-of-type()`, `:empty`, `:root`, `:target`, `:not()`.

## 2. Nguyên tắc

1. **Chọn theo ngữ nghĩa, không theo vị trí.** `.card__title` bền hơn `div > div:nth-child(2) > span`.
2. **`:where()` cho mọi thứ cần dễ ghi đè**; `:is()` khi muốn giữ trọng lượng.
3. **`:has()` trước khi viết JS.** "Style cái cha khi có con thế này" giờ là CSS thuần.
4. **`:focus-visible` thay `:focus`** — bỏ focus ring khi click chuột nhưng giữ cho bàn phím. Xem [[Accessible Markup & ARIA]].
5. **Attribute selector là cầu nối với state.** `[data-state="open"]`, `[aria-expanded="true"]` — style trực tiếp từ trạng thái a11y, khỏi đồng bộ class riêng.
6. **`:nth-child(n of .selector)`** lọc trước rồi mới đếm — giải quyết bài toán "phần tử `.item` thứ 3" mà `:nth-of-type` không làm được.
7. **Giữ selector nông.** Mỗi tầng lồng thêm là một ràng buộc vào cấu trúc DOM.

## 3. Cạm bẫy

- **`:nth-child` vs `:nth-of-type`.** `p:nth-child(2)` nghĩa là "element con thứ 2, **và** nó phải là `<p>`" — nếu con thứ 2 là `<div>` thì không khớp gì cả. `p:nth-of-type(2)` là "`<p>` thứ hai".
- **`::before`/`::after` không hoạt động trên replaced element.** `<img>`, `<input>`, `<br>` không có content box để chèn vào.
- **Quên `content` cho `::before`.** Không có `content: ""` thì pseudo-element không tồn tại.
- **`:not()` mang theo specificity của đối số** — `:not(#a)` là (1,0,0).
- **`A ~ B` chỉ đi xuôi.** Không có "sibling đứng trước" — nhưng `:has()` giải quyết được: `A:has(+ B)`.
- **`[class*="col-"]` chậm và mong manh** khi kết hợp với utility class.
- **`:visited` bị giới hạn nghiêm ngặt.** Chỉ đổi được màu, vì lý do bảo mật lịch sử duyệt web.
- **`*` trong selector con** (`.a *`) buộc kiểm tra mọi node — hiếm khi cần thiết.
- **`::first-letter` bỏ qua dấu câu mở đầu** theo cách khác nhau giữa các trình duyệt.

## 4. Checklist áp dụng

- [ ] Selector này có phụ thuộc vào cấu trúc DOM có thể đổi không?
- [ ] Tôi muốn `:nth-child` hay `:nth-of-type`?
- [ ] Có chỗ nào dùng `:has()` để bỏ JS được không?
- [ ] Đã dùng `:focus-visible` thay `:focus` chưa?
- [ ] Style state có đọc trực tiếp từ `data-*` / `aria-*` được không?
- [ ] Rule này có bị specificity ngoài ý muốn do `:is()`/`:not()` không?
- [ ] Mọi `::before`/`::after` đã có `content` chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → `$$('selector')` | Thử selector ngay trên trang | https://developer.chrome.com/docs/devtools/console/utilities |
| CSS Selector Tester | Trực quan hoá cái gì được chọn | https://www.w3schools.com/cssref/trysel.php |
| caniuse | Kiểm tra hỗ trợ `:has()`, `:nth-child(of)` | https://caniuse.com/ |

## Tham khảo

- MDN — *CSS selectors module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors
- MDN — *Pseudo-classes*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes
- MDN — *Pseudo-elements*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-elements
- CSSWG — *Selectors Level 4*: https://drafts.csswg.org/selectors/
- CSSWG — *CSS Pseudo-Elements Level 4*: https://drafts.csswg.org/css-pseudo/

## Liên kết

[[CSS Cascade & Specificity]] · [[CSS Syntax & At-rules]] · [[Tailwind Variants & States]] · [[HTML Forms & Validation]] · [[Frontend]]
