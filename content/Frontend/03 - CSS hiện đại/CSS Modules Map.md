---
tags: [frontend, css, catalogue]
status: evergreen
---
# CSS Modules Map

> Catalogue toàn bộ ~70 **module** CSS. Đây là note tra cứu, không phải bài học — dùng nó để biết *khái niệm mình cần nằm ở module nào*, rồi đi vào note tương ứng hoặc spec.

> [!note] Ghi chú nguồn
> Seed gốc chứa file `CSS guides.md` — một clipping MDN liệt kê mọi module CSS kèm một đoạn mô tả. Đó là ~70 lời hứa chưa trả. Note này giữ **toàn bộ** danh sách, gắn mỗi module vào note đã hệ thống hoá trong vault, và đánh dấu rõ cái nào chưa có nhà.

CSS không phải một spec. Nó là **hàng chục module độc lập**, mỗi module có mức trưởng thành riêng. Hiểu điều này giải thích vì sao `:has()` và `float` cùng tồn tại, và vì sao hỗ trợ trình duyệt lại lệch nhau đến vậy.

## Cú pháp & mô hình giá trị

| Module | Nội dung | Note |
|---|---|---|
| **CSS syntax** | Cấu trúc stylesheet, quy tắc parse | [[CSS Syntax & At-rules]] |
| **CSS cascading and inheritance** | Cascade, layer, inheritance, shorthand, specificity | [[CSS Cascade & Specificity]] · [[CSS Inheritance & Value Processing]] |
| **CSS values and units** | Data type, đơn vị, value definition syntax | [[CSS Values & Units]] |
| **CSS custom properties for cascading variables** | Biến `--x`, `var()` | [[CSS Custom Properties]] |
| **CSS properties and values API** | `@property` — đăng ký kiểu cho custom property (Houdini) | [[CSS Custom Properties]] |
| **CSS environment variables** | `env()` — biến toàn document do UA cấp | [[CSS Custom Properties]] |
| **CSS custom functions and mixins** | Khối CSS tái sử dụng nhận tham số, có logic | *mới, chưa có note riêng* |
| **CSS conditional rules** | `@media`, `@supports` | [[Responsive Layout]] |
| **CSS namespaces** | Cú pháp namespace (XML/SVG) | *hiếm dùng* |

## Selector & phạm vi

| Module | Nội dung | Note |
|---|---|---|
| **CSS selectors** | >60 selector, 5 combinator, specificity | [[CSS Selectors]] |
| **CSS pseudo-elements** | `::before`, `::marker`, `::selection`… | [[CSS Selectors]] |
| **CSS scoping** | Shadow DOM scoping, `@scope` | [[CSS Architecture]] · [[Web Components]] |
| **CSS shadow parts** | `::part()` — mở element trong shadow tree cho style ngoài | [[Web Components]] |
| **CSS custom highlight API** | `::highlight()` — tô range text không đụng DOM | [[DOM & Events]] |

## Mô hình hộp & layout

| Module | Nội dung | Note |
|---|---|---|
| **CSS box model** | `margin`, `padding` | [[CSS Box Model]] |
| **CSS box sizing** | `width`/`height`/`min`/`max`, intrinsic sizing | [[CSS Box Model]] |
| **CSS display** | Sinh box tree từ element tree | [[Block Formatting Context]] |
| **CSS box alignment** | `justify-*`/`align-*` cho mọi layout mode | [[CSS Box Alignment]] |
| **CSS gaps** | `gap` và gap decoration cho grid/flex/multicol | [[CSS Box Alignment]] |
| **CSS flexible box layout** | Flexbox | [[CSS Flexbox]] |
| **CSS grid layout** | Grid | [[CSS Grid]] |
| **CSS positioned layout** | `position`, thứ tự vẽ, stacking | [[Containing Block & Positioned Layout]] · [[Stacking Context]] |
| **CSS anchor positioning** | Buộc element vào element khác | [[Containing Block & Positioned Layout]] |
| **CSS multi-column layout** | Chia nội dung thành cột | [[CSS Typography]] |
| **CSS inline layout** | Line box, drop-cap, căn theo trục block | [[CSS Typography]] |
| **CSS logical properties and values** | `inline-start`, `block-end`… | [[CSS Box Model]] |
| **CSS containment** | `contain`, container query | [[Responsive Layout]] |
| **CSS fragmentation** | Ngắt nội dung qua trang/cột/region | [[CSS Typography]] |
| **CSS paged media** | `@page`, style cho in | [[CSS Typography]] |
| **CSS table** | Layout dữ liệu bảng | [[Table & Data Display]] |
| **CSS overflow** | Xử lý nội dung tràn | [[CSS Overflow & Scrolling]] |
| **CSS overscroll behavior** | Hành vi khi chạm biên cuộn | [[CSS Overflow & Scrolling]] |
| **CSS scroll snap** | Điểm dừng khi cuộn | [[CSS Overflow & Scrolling]] |
| **CSS scroll anchoring** | Chống nhảy trang khi DOM đổi phía trên | [[CSS Overflow & Scrolling]] |
| **CSS scrollbars styling** | `scrollbar-width`, `scrollbar-color` | [[CSS Overflow & Scrolling]] |
| **CSSOM view** | Đo vị trí/kích thước, cuộn bằng script | [[DOM & Events]] |
| **CSS viewport** | Kích thước, zoom, hướng của ICB | [[Responsive Layout]] |
| **CSS round display** | Mở rộng cho màn hình tròn (đồng hồ) | *chuyên biệt* |

## Chữ & typography

| Module | Nội dung | Note |
|---|---|---|
| **CSS fonts** | `font-*`, tải font | [[CSS Typography]] |
| **CSS font loading** | Event và interface tải font động | [[CSS Typography]] |
| **CSS text** | Ngắt dòng, căn đều, white space, transform | [[CSS Typography]] |
| **CSS text decoration** | Gạch chân, text-shadow, emphasis mark | [[CSS Typography]] |
| **CSS writing modes** | Hướng viết ngang/dọc, ltr/rtl | [[CSS Typography]] |
| **CSS ruby layout** | Chú âm kiểu Đông Á | [[CSS Typography]] |
| **CSS lists and counters** | Marker, counter | [[CSS Typography]] |
| **CSS counter styles** | `@counter-style` — tự định nghĩa kiểu đánh số | [[CSS Typography]] |
| **CSS generated content** | `content`, thay thế nội dung | [[CSS Typography]] |

## Màu & hiệu ứng

| Module | Nội dung | Note |
|---|---|---|
| **CSS colors** | Color type, blending, opacity | [[CSS Color & Theming]] |
| **CSS color adjustment** | `color-scheme`, điều chỉnh tự động của UA | [[CSS Color & Theming]] |
| **CSS compositing and blending** | `mix-blend-mode`, `background-blend-mode` | [[CSS Color & Theming]] |
| **CSS backgrounds and borders** | Background, border, radius, box-shadow | [[CSS Transforms & Effects]] |
| **CSS borders and box decorations** | `corner-shape`, `border-shape`, border từng phần | [[CSS Transforms & Effects]] |
| **CSS images** | `<image>`, gradient, resize, replaced content | [[CSS Transforms & Effects]] |
| **CSS filter effects** | `filter`, `backdrop-filter` | [[CSS Transforms & Effects]] |
| **CSS masking** | `mask`, `clip-path` | [[CSS Transforms & Effects]] |
| **CSS shapes** | `shape-outside` — hình học vùng float | [[CSS Transforms & Effects]] |
| **CSS transforms** | 2D/3D transform | [[CSS Transforms & Effects]] |

## Chuyển động

| Module | Nội dung | Note |
|---|---|---|
| **CSS animations** | `@keyframes`, `animation-*` | [[CSS Transitions & Animations]] |
| **CSS transitions** | Chuyển tiếp giữa hai giá trị | [[CSS Transitions & Animations]] |
| **CSS easing functions** | `linear()`, `cubic-bezier()`, `steps()` | [[CSS Transitions & Animations]] |
| **CSS scroll-driven animations** | Animation theo tiến độ cuộn thay vì thời gian | [[CSS Transitions & Animations]] |
| **CSS motion path** | `offset-path` — animate dọc theo đường bất kỳ | [[CSS Transitions & Animations]] |
| **CSS view transitions** | Chuyển cảnh có animation giữa hai trạng thái/trang | [[CSS Transitions & Animations]] |
| **CSS will-change** | Gợi ý tối ưu trước cho trình duyệt | [[Browser Rendering Pipeline]] |

## Giao diện & khác

| Module | Nội dung | Note |
|---|---|---|
| **CSS basic user interface** | `outline`, `cursor`, `appearance`, `accent-color` | [[CSS Transforms & Effects]] · [[Interaction States]] |
| **CSS nesting** | Lồng rule, `&` | [[CSS Syntax & At-rules]] |
| **WebXR DOM overlays** | HTML overlay trong phiên VR/AR | *chuyên biệt* |

## Cách dùng bảng này

1. **Không biết property nằm đâu** → tìm module ở trên → mở note.
2. **Cần biết mức hỗ trợ** → tên module là từ khoá tra trên caniuse và Baseline.
3. **Cần chi tiết ngoài phạm vi vault** → mỗi module có một trang MDN `Web/CSS/Guides/<Tên>` và một spec ở `drafts.csswg.org`.

## Tham khảo

- MDN — *CSS guides (danh sách module gốc)*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides
- MDN — *CSS reference (index bảng chữ cái)*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
- CSSWG — *Current work / mọi spec*: https://www.w3.org/Style/CSS/current-work
- Baseline — *Mức hỗ trợ theo tính năng*: https://web.dev/baseline

## Liên kết

[[CSS Syntax & At-rules]] · [[CSS Cascade & Specificity]] · [[CSS Grid]] · [[CSS Typography]] · [[CSS Architecture]] · [[Frontend]]
