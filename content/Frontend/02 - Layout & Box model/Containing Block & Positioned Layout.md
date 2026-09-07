---
tags: [frontend, css, layout]
status: evergreen
---
# Containing Block & Positioned Layout

> `position: absolute` không định vị so với "cha" — nó định vị so với **containing block**, và biết cái nào là containing block là toàn bộ trò chơi.

## 1. Khái niệm cốt lõi

### Containing block được xác định thế nào

| `position` của element | Containing block là |
|---|---|
| `static` / `relative` / `sticky` | **Content box** của tổ tiên block-level gần nhất |
| `absolute` | **Padding box** của tổ tiên gần nhất có `position` ≠ `static` |
| `fixed` | **Viewport** (hoặc containing block đặc biệt — xem dưới) |

**Ngoại lệ quan trọng cho `absolute`/`fixed`:** một tổ tiên `static` vẫn trở thành containing block nếu nó có:
- `transform`, `perspective`, `rotate`, `scale`, `translate` khác `none`
- `filter`, `backdrop-filter` khác `none`
- `will-change` liệt kê một trong các property trên
- `contain: layout` / `paint` / `content` / `strict`
- `container-type` khác `normal`

> [!warning] `transform` phá `position: fixed`
> Đặt `transform: translateZ(0)` lên một tổ tiên (thủ thuật "bật GPU" rất phổ biến) sẽ khiến mọi `position: fixed` bên trong nó **neo vào tổ tiên đó thay vì viewport**. Modal, header cố định, tooltip đột nhiên cuộn theo trang. Cạm bẫy này rất khó lần ra vì nguyên nhân nằm cách xa triệu chứng.

### Năm giá trị `position`

| Giá trị | Trong flow | Neo vào | Ghi chú |
|---|---|---|---|
| `static` | ✅ | — | Mặc định; `top/left` bị bỏ qua |
| `relative` | ✅ | Vị trí gốc của chính nó | **Vẫn chiếm chỗ cũ**; tạo containing block |
| `absolute` | ❌ | Containing block gần nhất | Rời flow hoàn toàn |
| `fixed` | ❌ | Viewport | Không cuộn theo |
| `sticky` | ✅ | Ancestor scroll container | Lai giữa relative và fixed |

### Inset properties

`top` `right` `bottom` `left` — hoặc logic: `inset-block-start`, `inset-inline-end`… Shorthand: `inset: 0`, `inset-block: 0`, `inset-inline: auto`.

Đặt **cả hai** cạnh đối diện (`left: 0; right: 0`) với `width: auto` sẽ **kéo giãn** element. Đây là cách phủ kín:

```css
.overlay { position: absolute; inset: 0; }
```

Và cách căn giữa tuyệt đối hiện đại:

```css
.centered {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
}
```

### `position: sticky`

Cần **ba** điều kiện, thiếu một là không hoạt động:
1. Có ít nhất một giá trị inset (`top: 0`)
2. Có một **scroll container** tổ tiên
3. Cha trực tiếp **không** có `overflow: hidden/auto/scroll`

Element sticky bị giới hạn trong phạm vi cha — nó dừng lại khi cha cuộn hết.

### Anchor positioning

Cơ chế mới: buộc một element vào một element khác bất kỳ trên trang, không cần quan hệ cha-con.

```css
.tooltip-target { anchor-name: --tip; }
.tooltip {
  position: absolute;
  position-anchor: --tip;
  top: anchor(bottom);
  left: anchor(center);
  position-try-fallbacks: flip-block;
}
```

Đây là lời giải chuẩn cho tooltip/popover/dropdown — thay thế Popper.js. Kết hợp với [[Web Components]] và Popover API.

## 2. Nguyên tắc

1. **`position: relative` trên cha là cách khai báo "tôi là mốc".** Đặt nó có chủ đích, không rải bừa.
2. **`inset: 0` thay bốn dòng `top/right/bottom/left`.**
3. **Absolute positioning là công cụ cho lớp phủ, không phải cho layout.** Layout dùng flex/grid.
4. **Kiểm tra ba điều kiện của `sticky`** trước khi debug tiếp — 90% lỗi sticky là điều kiện 3.
5. **Cẩn thận với `transform` trên tổ tiên** — xem callout.
6. **Ưu tiên anchor positioning + Popover API** hơn thư viện định vị JS, ở nơi hỗ trợ trình duyệt cho phép.
7. **`fixed` cần `dvh` cho layout toàn màn hình mobile** — xem [[CSS Values & Units]].

## 3. Cạm bẫy

- **`transform` trên tổ tiên phá `fixed`** — callout ở trên.
- **`sticky` không hoạt động vì cha có `overflow: hidden`.** Cực kỳ phổ biến, và `overflow: hidden` thường được thêm vì lý do khác (xem [[Block Formatting Context]]).
- **`sticky` "không dính" vì cha quá thấp.** Nó chỉ dính trong phạm vi cha; cha cao bằng chính nó thì không có gì để dính.
- **Quên `z-index` cho element positioned.** Element positioned vẽ trên element static, nhưng giữa các positioned với nhau thì thứ tự DOM quyết định — xem [[Stacking Context]].
- **`position: absolute` trên flex/grid item bỏ qua vị trí grid** trừ khi containing block là chính grid area đó.
- **`fixed` bên trong element có `filter`** — cùng vấn đề với `transform`.
- **Dùng `absolute` để căn giữa khi flex làm được.** `display: grid; place-items: center` ngắn hơn và không rời flow.
- **`sticky` + `overflow-x: auto` trên cùng một tổ tiên** hay xung đột trên bảng.

## 4. Checklist áp dụng

- [ ] Element absolute này neo vào cái gì — tôi có chắc containing block là đâu không?
- [ ] Có tổ tiên nào mang `transform`/`filter`/`contain` không?
- [ ] `sticky` đã đủ ba điều kiện chưa?
- [ ] Có dùng `inset: 0` thay bốn dòng được không?
- [ ] Có dùng `place-items: center` thay absolute centering được không?
- [ ] Lớp phủ có tham gia đúng stacking context không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → Elements badge `scroll` | Đánh dấu scroll container cho sticky | https://developer.chrome.com/docs/devtools/css |
| CSS Anchor Positioning polyfill | Cho trình duyệt chưa hỗ trợ | https://github.com/oddbird/css-anchor-positioning |

## Tham khảo

- MDN — *Containing block*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Containing_block
- MDN — *CSS positioned layout*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout
- MDN — *CSS anchor positioning*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning
- CSSWG — *CSS Positioned Layout Level 3*: https://drafts.csswg.org/css-position-3/

## Liên kết

[[Stacking Context]] · [[CSS Box Model]] · [[Block Formatting Context]] · [[Tailwind Layout Utilities]] · [[Frontend]]
