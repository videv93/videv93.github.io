---
tags: [frontend, css, animation]
status: evergreen
---
# CSS Transitions & Animations

> Transition là **phản ứng** với một thay đổi state; animation là một **kịch bản** chạy độc lập. Chọn sai loại là lý do bạn phải viết JS cho thứ CSS làm được.

## 1. Khái niệm cốt lõi

### Transition vs Animation

| | Transition | Animation |
|---|---|---|
| Kích hoạt bởi | Đổi giá trị property | Tự chạy, hoặc class |
| Số trạng thái | 2 (từ → đến) | Bao nhiêu keyframe cũng được |
| Lặp | Không | `animation-iteration-count` |
| Chạy khi load | Không | Có |
| Dùng cho | Hover, focus, mở/đóng | Loading spinner, hiệu ứng chú ý |

### Transition

```css
.btn {
  transition: background-color 200ms ease-out,
              transform 150ms ease-out;
}
```

`transition-property` · `-duration` · `-timing-function` · `-delay` · `transition-behavior: allow-discrete`.

`allow-discrete` là bổ sung quan trọng: nó cho phép transition những property **rời rạc** như `display` và `content-visibility` — mở khoá việc fade-out một element rồi mới `display: none`, thứ trước đây bắt buộc phải dùng JS.

Kết hợp với `@starting-style` để có transition khi element **vừa xuất hiện**:

```css
@starting-style { .popover { opacity: 0; } }
.popover { opacity: 1; transition: opacity 200ms, display 200ms allow-discrete; }
```

### Animation

```css
@keyframes pulse {
  from { opacity: 1 }
  50%  { opacity: 0.4 }
  to   { opacity: 1 }
}
.dot { animation: pulse 1.5s ease-in-out infinite; }
```

`animation-name` · `-duration` · `-timing-function` · `-delay` · `-iteration-count` · `-direction` (`normal` `reverse` `alternate` `alternate-reverse`) · `-fill-mode` (`none` `forwards` `backwards` `both`) · `-play-state` · `-composition` · `-timeline` · `-range`.

`animation-fill-mode: forwards` giữ trạng thái cuối — thiếu nó thì element bật về giá trị gốc khi animation kết thúc.

### Easing

| Hàm | Dùng khi |
|---|---|
| `linear` | Chuyển động cơ học, loading bar |
| `ease-out` | **Mặc định tốt nhất cho UI** — nhanh rồi chậm dần, cảm giác phản hồi tức thì |
| `ease-in` | Element rời khỏi màn hình |
| `ease-in-out` | Di chuyển từ A đến B, cả hai đầu nhìn thấy |
| `cubic-bezier(...)` | Tuỳ chỉnh |
| `linear(0, 0.25 50%, 1)` | Xấp xỉ đường cong phức tạp (spring, bounce) |
| `steps(n)` | Sprite animation, hiệu ứng gõ chữ |

### Scroll-driven animations

Animation chạy theo **tiến độ cuộn** thay vì thời gian:

```css
@keyframes grow { to { scale: 1 } }
.reveal {
  animation: grow linear both;
  animation-timeline: view();       /* theo element trong viewport */
  animation-range: entry 0% cover 40%;
}
```

`scroll()` cho tiến độ của scroll container; `view()` cho vị trí element trong viewport. Đây là thứ thay thế phần lớn Intersection Observer + JS cho hiệu ứng reveal — và nó chạy **off main thread**.

### View Transitions

```css
@view-transition { navigation: auto; }     /* cross-document */
.card { view-transition-name: card-1; }
```

Trình duyệt chụp ảnh trạng thái cũ và mới rồi animate giữa hai cái. Dùng được cả trong một trang (`document.startViewTransition()`) lẫn giữa các trang. Xem [[Next.js App Router]].

### Motion path

`offset-path`, `offset-distance`, `offset-rotate` — animate dọc theo một đường bất kỳ, không chỉ đường thẳng.

## 2. Nguyên tắc

1. **Chỉ animate `transform` và `opacity`** khi có thể. Xem [[Browser Rendering Pipeline]].
2. **Thời lượng: 150–300ms cho UI.** Dưới 100ms không nhận ra, trên 400ms cảm thấy chậm chạp.
3. **`ease-out` là mặc định.** Nó ưu tiên cảm giác phản hồi.
4. **Luôn tôn trọng `prefers-reduced-motion`:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
   Chú ý: giảm về gần-0 chứ **không** `none` — để `transitionend`/`animationend` vẫn bắn, tránh làm hỏng logic phụ thuộc event.
5. **Liệt kê property tường minh, đừng dùng `transition: all`.** `all` transition cả những property bạn không lường (kể cả `height` gây reflow).
6. **`@starting-style` + `allow-discrete`** để làm enter/exit animation thuần CSS.
7. **Scroll-driven animation thay Intersection Observer** cho hiệu ứng thuần trang trí.
8. **Animation thắng declaration thường trong cascade** — xem [[CSS Cascade & Specificity]].

## 3. Cạm bẫy

- **`transition: all`.** Chậm, khó đoán, và transition cả những thứ mới thêm sau này.
- **Transition `height: auto` không hoạt động.** `auto` không nội suy được. Cách chữa: `grid-template-rows: 0fr → 1fr`, hoặc `interpolate-size: allow-keywords` (mới), hoặc animate `max-height` (xấu, easing sai).
- **Quên `animation-fill-mode: forwards`** → element bật ngược về trạng thái đầu.
- **Animation trên element vừa mount không chạy** vì trình duyệt chưa có "giá trị trước". Cần `@starting-style` hoặc một frame trễ.
- **`prefers-reduced-motion: none` thay vì gần-0** làm gãy code chờ `transitionend`.
- **Animation infinite ngốn pin** và giữ compositor bận. Dừng khi tab ẩn — xem Page Visibility trong [[Web APIs Map]].
- **`will-change` để mãi** ngốn RAM GPU. Xem [[Browser Rendering Pipeline]].
- **Animate `box-shadow`** gây repaint mỗi frame. Thay bằng lớp `::after` có shadow và animate `opacity` của nó.
- **`view-transition-name` phải duy nhất** trên toàn document tại một thời điểm — trùng thì transition bị bỏ im lặng.
- **Nhấp nháy 3D trên Safari** — thêm `backface-visibility: hidden`.

## 4. Checklist áp dụng

- [ ] Chỉ animate `transform`/`opacity` chưa?
- [ ] Thời lượng có trong khoảng 150–300ms không?
- [ ] Đã xử lý `prefers-reduced-motion` chưa (giảm về gần-0, không phải none)?
- [ ] Có `transition: all` nào không?
- [ ] Animation kết thúc có giữ đúng trạng thái (`fill-mode`) không?
- [ ] Animation vô hạn có dừng khi tab ẩn không?
- [ ] Có hiệu ứng scroll nào thay được bằng `animation-timeline` không?
- [ ] Có JS nào chỉ để fade-out rồi ẩn — thay được bằng `allow-discrete` không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools Animations panel | Chậm lại, tua, sửa keyframe trực tiếp | https://developer.chrome.com/docs/devtools/css/animations |
| easing.dev / cubic-bezier.com | Dựng đường cong easing | https://cubic-bezier.com/ |
| Linear easing generator | Sinh `linear()` cho spring/bounce | https://linear-easing-generator.netlify.app/ |
| Motion (Framer Motion) | Khi thực sự cần animation điều khiển bằng JS | https://motion.dev/ |

## Tham khảo

- MDN — *CSS animations module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations
- MDN — *CSS transitions module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions
- MDN — *CSS scroll-driven animations*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
- MDN — *CSS view transitions*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/View_transitions
- MDN — *CSS easing functions*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Easing_functions

## Liên kết

[[Browser Rendering Pipeline]] · [[Motion & Animation]] · [[Micro-interactions]] · [[Accessible Markup & ARIA]] · [[CSS Transforms & Effects]] · [[Frontend]]
