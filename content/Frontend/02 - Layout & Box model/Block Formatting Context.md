---
tags: [frontend, css, layout]
status: evergreen
---
# Block Formatting Context

> BFC là **vùng layout biệt lập**: bên trong nó, các box tự sắp xếp với nhau và không tương tác với bên ngoài. Ba lỗi CSS cổ điển — float không đẩy cha, margin thoát ra ngoài, text quấn quanh float — đều là cùng một lời giải: tạo một BFC.

## 1. Khái niệm cốt lõi

### BFC làm gì

| Hiệu ứng | Chữa được lỗi gì |
|---|---|
| Chứa float bên trong | Cha có chiều cao 0 khi con đều float |
| Chặn margin collapsing qua biên | Margin của con đầu tiên "thoát" ra đẩy cha |
| Không chồng lên float bên ngoài | Text quấn quanh ảnh float khi bạn muốn nó thành cột |

### Cách tạo BFC

| Cách | Tác dụng phụ |
|---|---|
| **`display: flow-root`** | **Không có — đây là cách đúng** |
| `overflow: hidden` / `auto` / `scroll` | Cắt nội dung tràn, có thể sinh scrollbar |
| `display: inline-block` | Element thành inline-level |
| `display: flex` / `grid` / `table-cell` | Đổi hẳn layout mode của con |
| `position: absolute` / `fixed` | Rời khỏi flow |
| `float: left` / `right` | Rời khỏi flow |
| `contain: layout` / `content` / `paint` | Cũng chặn nhiều thứ khác |
| `column-count` khác `auto` | Chia cột |

> [!note] `display: flow-root` tồn tại chính vì mục đích này
> Trước 2018, cách duy nhất để tạo BFC "sạch" là `overflow: hidden` — một hack, vì bạn phải chấp nhận cắt nội dung để đổi được layout. `flow-root` được thêm vào spec để làm **đúng một việc**: tạo BFC, không kèm gì khác. Nếu đang viết `overflow: hidden` mà không thực sự muốn cắt gì, hãy đổi sang `flow-root`.

### Các formatting context khác

BFC chỉ là một loại. Mỗi loại có luật riêng cho con của nó:

| Context | Tạo bởi | Con được sắp thế nào |
|---|---|---|
| **Block** (BFC) | `display: block`, `flow-root` | Xếp dọc, margin collapse |
| **Inline** (IFC) | Nội dung inline | Xếp ngang thành line box — xem [[CSS Typography]] |
| **Flex** | `display: flex` | Theo main/cross axis — [[CSS Flexbox]] |
| **Grid** | `display: grid` | Theo track — [[CSS Grid]] |
| **Table** | `display: table` | Theo hàng/cột |

Khi một element tạo flex/grid context, **con của nó không còn là block box** — margin collapsing biến mất, `float` bị bỏ qua, `vertical-align` vô nghĩa.

## 2. Nguyên tắc

1. **`display: flow-root` là câu trả lời mặc định** khi cần BFC. `overflow: hidden` chỉ khi bạn thực sự muốn cắt.
2. **Clearfix hack đã chết.** `.clearfix::after { content: ""; display: table; clear: both }` là di sản; `flow-root` thay thế hoàn toàn.
3. **Layout hiện đại hiếm khi cần BFC thủ công** — flex và grid tự tạo formatting context riêng. Nếu bạn đang debug BFC nhiều, có thể layout nên là grid.
4. **Muốn hai cột cạnh float mà không quấn**, cho cột kia BFC.
5. **BFC không phải stacking context.** Hai khái niệm độc lập — xem [[Stacking Context]]. Nhưng nhiều cách tạo cái này *cũng* tạo cái kia, gây nhầm lẫn.

## 3. Cạm bẫy

- **`overflow: hidden` cắt mất dropdown/tooltip.** Bạn thêm nó để chứa float, sáu tháng sau popover bị cắt cụt và không ai nhớ vì sao có dòng đó.
- **`overflow: auto` sinh scrollbar ngoài ý muốn** khi con lệch vài pixel.
- **Nghĩ BFC ngăn được `position: absolute` của con.** Không — cái đó do containing block quyết định, xem [[Containing Block & Positioned Layout]].
- **`contain: paint` chặn cả những thứ bạn cần vẽ ra ngoài**, như `box-shadow` của con.
- **Nhầm BFC với stacking context** khi debug `z-index`.
- **Flex/grid container không collapse margin của con** — hành vi này *đúng*, nhưng người quen block layout hay bất ngờ khi khoảng cách đột nhiên cộng dồn thay vì gộp.

## 4. Checklist áp dụng

- [ ] Cha có chiều cao 0 dù có con — con có float hết không?
- [ ] Margin của con đang đẩy cha — cha có BFC hoặc padding/border chưa?
- [ ] Có `overflow: hidden` nào chỉ để chứa float không? → đổi `flow-root`
- [ ] Có `overflow: hidden` nào đang cắt popover không?
- [ ] Layout này có nên là grid thay vì float + BFC không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → Layout | Đánh dấu flex/grid container | https://developer.chrome.com/docs/devtools/css/grid |
| caniuse `flow-root` | Hỗ trợ toàn diện từ 2018 | https://caniuse.com/flow-root |

## Tham khảo

- MDN — *Block formatting context*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context
- MDN — *Visual formatting model*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Visual_formatting_model
- MDN — *CSS display module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display
- CSSWG — *CSS Display Level 3*: https://drafts.csswg.org/css-display/

## Liên kết

[[CSS Box Model]] · [[Stacking Context]] · [[CSS Flexbox]] · [[Containing Block & Positioned Layout]] · [[Frontend]]
