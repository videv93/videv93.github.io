---
tags: [frontend, css]
status: evergreen
---
# CSS Inheritance & Value Processing

> Giá trị bạn viết trong stylesheet và giá trị `getComputedStyle()` trả về là **hai thứ khác nhau**, cách nhau bốn giai đoạn xử lý. Hầu hết những lúc CSS "cư xử kỳ lạ" là vì bạn đang nghĩ về sai giai đoạn.

## 1. Khái niệm cốt lõi

### Sáu loại giá trị — theo thứ tự xử lý

| # | Loại | Là gì | Ví dụ với `width: 50%` |
|---|---|---|---|
| 1 | **Declared** | Mọi giá trị được khai báo cho property đó | tất cả rule cùng nhắm element |
| 2 | **Cascaded** | Kẻ thắng sau cascade | `50%` |
| 3 | **Specified** | Cascaded, hoặc giá trị kế thừa/khởi tạo nếu không có | `50%` |
| 4 | **Computed** | Đã giải quyết mọi thứ **không cần layout** | `50%` (vẫn là %) |
| 5 | **Used** | Đã có layout — ra pixel thật | `320px` |
| 6 | **Actual** | Sau khi thiết bị làm tròn | `320px` |

Điểm quan trọng nhất: **computed value là thứ được kế thừa xuống con**, không phải used value.

| Property | Computed value là gì |
|---|---|
| `font-size: 1.5em` | Pixel tuyệt đối (em đã giải quyết) |
| `width: 50%` | Vẫn là `50%` |
| `color: currentColor` | Màu tuyệt đối |
| `line-height: 1.5` | Vẫn là `1.5` (unitless) |
| `line-height: 150%` | Pixel tuyệt đối |

> [!warning] `line-height: 150%` vs `line-height: 1.5`
> `150%` được **tính thành pixel ngay ở element cha** rồi mới kế thừa — nên con có `font-size` khác vẫn nhận đúng số pixel đó, và chữ bị chồng. `1.5` là unitless: nó kế thừa **hệ số**, và mỗi con tự nhân với `font-size` của mình. **Luôn dùng unitless.**

### Inheritance

| Nhóm | Có kế thừa | Không kế thừa |
|---|---|---|
| Text | `color`, `font-*`, `line-height`, `letter-spacing`, `text-align`, `text-indent`, `white-space`, `word-break` | `text-decoration`, `vertical-align` |
| Danh sách | `list-style-*` | — |
| Khác | `visibility`, `cursor`, `direction`, `quotes` | box model, layout, background, border |

Quy tắc chung: **property liên quan đến text thì kế thừa, property liên quan đến hộp thì không.** Nếu không thì mọi `<div>` con đều có border của cha.

### Bốn từ khoá toàn cục

| Từ khoá | Nghĩa |
|---|---|
| `inherit` | Lấy computed value của cha, kể cả property không kế thừa |
| `initial` | Giá trị khởi tạo của **spec**, không phải của trình duyệt |
| `unset` | `inherit` nếu property kế thừa được, ngược lại `initial` |
| `revert` | Quay về giá trị của origin trước đó (thường là user-agent stylesheet) |
| `revert-layer` | Quay về giá trị của cascade layer trước |

`all: unset` xoá sạch mọi style tác giả trên một element — hữu ích khi reset `<button>`.

> [!note] `initial` không phải "mặc định trông thấy"
> `display: initial` là `inline`, **không** phải `block` — kể cả trên `<div>`. Giá trị "mặc định" của `<div>` đến từ user-agent stylesheet, không phải từ spec. Muốn quay về mặc định của trình duyệt, dùng `revert`.

## 2. Nguyên tắc

1. **`line-height` luôn unitless.** Xem callout ở trên.
2. **Kế thừa là công cụ, không phải tai nạn.** Đặt `font-family`, `color` một lần trên `:root` thay vì lặp lại khắp nơi.
3. **Dùng `revert` khi muốn "như trình duyệt", `initial` khi muốn "như spec".** Chúng khác nhau và nhầm lẫn hai cái này rất hay xảy ra.
4. **`currentColor` để liên kết màu với text.** Border, SVG `fill`, `box-shadow` dùng `currentColor` sẽ tự đi theo `color` kế thừa.
5. **`em` nhân dồn, `rem` thì không.** `font-size: 0.9em` lồng ba tầng cho `0.729em`. Dùng `rem` cho font-size, `em` cho khoảng cách *tương đối với chính text đó* (như `padding` của button).
6. **`getComputedStyle()` trả về resolved value** — với hầu hết property là *used* value (pixel), với một số là *computed*. Đừng giả định là thứ bạn đã viết.
7. **Custom property kế thừa và được giải quyết muộn** — xem [[CSS Custom Properties]].

## 3. Cạm bẫy

- **`line-height: 150%` trên `body`.** Xem callout. Lỗi kinh điển, hậu quả chỉ lộ ra ở heading.
- **`font-size` bằng `em` lồng nhau.** Danh sách lồng nhau với `li { font-size: 0.9em }` teo dần theo cấp.
- **`inherit` trên property không kế thừa vẫn hợp lệ** và rất hữu ích — nhiều người không biết dùng được.
- **`width: 100%` khác `width: inherit`.** `inherit` lấy đúng giá trị của cha (có thể là `auto`), không phải 100% của cha.
- **`all: unset` cũng xoá `display`.** Button sau khi `all: unset` thành `inline` — nhớ đặt lại.
- **Percentage giải quyết theo trục khác nhau.** `padding-top: 10%` tính theo **chiều rộng** containing block, không phải chiều cao. Đây là cách làm aspect-ratio trước khi có `aspect-ratio`.
- **`height: 100%` không ăn khi cha là `auto`.** Percentage cần cha có chiều cao xác định — xem [[Containing Block & Positioned Layout]].
- **Tưởng computed value đã là pixel.** `width` computed vẫn có thể là `50%`; chỉ used value mới là pixel.

## 4. Checklist áp dụng

- [ ] `line-height` của tôi có unitless không?
- [ ] Có `font-size` bằng `em` nào bị lồng nhiều tầng không?
- [ ] Khi reset, tôi muốn `initial`, `unset`, hay `revert`?
- [ ] Percentage này giải quyết theo trục nào, so với containing block nào?
- [ ] Đã đặt `color`/`font` ở `:root` để tận dụng kế thừa chưa?
- [ ] Có chỗ nào dùng được `currentColor` thay vì lặp lại mã màu không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → Computed | Xem computed value thật, có filter | https://developer.chrome.com/docs/devtools/css/reference |
| `getComputedStyle()` | Đọc resolved value từ JS | https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle |

## Tham khảo

- MDN — *CSS property value processing*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Property_value_processing
- MDN — *Inheritance*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance
- MDN — *CSS-wide keywords*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/CSS_wide_keywords
- CSSWG — *CSS Cascading and Inheritance Level 5*: https://drafts.csswg.org/css-cascade-5/#value-stages

## Liên kết

[[CSS Cascade & Specificity]] · [[CSS Values & Units]] · [[CSS Custom Properties]] · [[CSS Typography]] · [[Frontend]]
