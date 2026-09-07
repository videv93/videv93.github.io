---
tags: [uiux, designsystem]
status: growing
---
# Design System

> Một design system truyền đạt **cái gì**, **như thế nào** và **vì sao**.
> Ẩn dụ Lego 🧱: thay vì vẽ lại từng nút bấm mỗi màn hình, ta xây sẵn một bộ linh kiện chuẩn để lắp ráp nhanh và chính xác — cho cả Designer lẫn Developer.

## 1. Design system gồm gì
| Thành phần | Nội dung |
|---|---|
| **Design Tokens 🎨** | Đơn vị nhỏ nhất: màu, font, spacing, bo góc, shadow → [[Design Tokens]] |
| **Components 🧩** | Button, Input, Card, Modal… có API rõ ràng → [[Component API & Variants]] |
| **Patterns** | Cách ghép component để giải quyết bài toán lặp lại (form đăng ký, bảng có bộ lọc, luồng xác nhận) |
| **Guidelines 📜** | Khi nào dùng cái gì, viết chữ ra sao, quy tắc accessibility |
| **Style guide** | Chuẩn về *hình thức*: màu, chữ, giọng điệu — sản phẩm *trông* thế nào |
| **Component library** | Chuẩn về *hành vi*: asset *hoạt động* thế nào trong sản phẩm |

**Phân biệt:** *Style guide* nói về ngôn ngữ thị giác. *Component library* nói về hành vi. *Design system* = cả hai + lý do + quy trình quản trị.

## 2. Bạn có cần design system không?
**Có, khi:** nhiều người cùng thiết kế/code giao diện · nhiều sản phẩm hoặc nền tảng · giao diện đang thiếu nhất quán rõ rệt · team mất thời gian vẽ lại thứ đã có.
**Chưa cần, khi:** sản phẩm còn đang tìm product-market fit · một người làm tất cả · dưới ~10 màn hình.

> Sai lầm phổ biến: xây design system trước khi có sản phẩm. Design system nên được **rút ra** từ sản phẩm thật, không phải tưởng tượng ra trước.

Mức đầu tư có thể tăng dần: **Sketch file chung → thư viện component → design system có tài liệu → design system có đội sở hữu**.

## 3. Quy trình xây (4 bước)
**Bước 1 — Audit sản phẩm hiện có**
- *Gather everything that exists*: chụp lại mọi màn hình, mọi biến thể của mọi component.
- *Sort and categorize*: gom theo loại — bạn sẽ phát hiện mình có 17 sắc xanh và 9 kiểu nút.
- *Identify opportunities*: chỗ nào trùng lặp nhất thì làm trước.

**Bước 2 — Định nghĩa nền tảng**
Bắt đầu từ token: bảng màu, thang chữ, thang spacing, bo góc, shadow. Đây là phần trả lại giá trị nhanh nhất.

**Bước 3 — Xây component theo thứ tự ưu tiên**
Thứ tự thực dụng: Button → Input & Form → Typography styles → Card → Modal → Table → Navigation. Làm theo tần suất sử dụng, không theo thứ tự bảng chữ cái.

**Bước 4 — Tài liệu hoá & vận hành**
Mỗi component cần: **khi nào dùng / khi nào không dùng**, anatomy, các variant, quy tắc accessibility, ví dụ đúng-sai. → [[Design System Governance]]

## 4. Nguyên tắc thiết kế hệ thống
- **Rút ra từ thực tế, đừng bịa trước.** Chỉ đưa vào hệ thống thứ đã xuất hiện ≥3 lần.
- **Ràng buộc là tính năng.** Ít lựa chọn hơn ⇒ quyết định nhanh hơn và nhất quán hơn.
- **Đặt tên theo vai trò, không theo hình thức.** `color-danger` chứ không phải `color-red`; `space-lg` chứ không phải `space-24`.
- **Design và code phải khớp tên nhau.** Nếu Figma gọi là `Button/Primary/Large` thì code cũng phải vậy.
- **Accessibility nằm sẵn trong component**, không phải việc phải nhớ ở mỗi lần dùng.
- **Design system là sản phẩm**, người dùng của nó là các designer và developer trong công ty. Nó cần roadmap, phiên bản, hỗ trợ.

## 5. Các design system nên đọc
| Hệ thống | Điểm mạnh |
|---|---|
| **Material Design 3** (Google) | Đầy đủ nhất, có lý luận đằng sau: https://m3.material.io/ |
| **Apple HIG** | Chuẩn nền tảng Apple: https://developer.apple.com/design/human-interface-guidelines |
| **Shopify Polaris** | Tài liệu content & UX writing xuất sắc: https://polaris.shopify.com/ |
| **IBM Carbon** | Mạnh về data, enterprise: https://carbondesignsystem.com/ |
| **Atlassian Design System** | Cân bằng, thực dụng: https://atlassian.design/ |
| **GOV.UK Design System** | Chuẩn mực về accessibility và ngôn ngữ đơn giản: https://design-system.service.gov.uk/ |
| **Primer** (GitHub) | Gần với dev: https://primer.style/ |
| **shadcn/ui** | Cách tiếp cận "copy vào repo" thay vì cài thư viện: https://ui.shadcn.com/ |

## 6. Checklist sức khoẻ
- [ ] Có bao nhiêu màu/cỡ chữ/spacing đang thực sự dùng trong sản phẩm?
- [ ] Designer và developer có gọi cùng một tên cho cùng một thứ không?
- [ ] Component mới nhất được thêm khi nào? Ai quyết định?
- [ ] Có tài liệu về *khi nào không nên dùng* mỗi component không?
- [ ] Component có sẵn accessibility chưa?
- [ ] Người mới vào team mất bao lâu để dựng một màn hình?

## Tham khảo
- Figma — *Design Systems 101* (khoá miễn phí): https://www.figma.com/resource-library/design-systems/
- Brad Frost — *Atomic Design*: https://atomicdesign.bradfrost.com/
- Nathan Curtis — *EightShapes* (loạt bài sâu về vận hành DS): https://medium.com/eightshapes-llc
- InVision — *Design Systems Handbook*: https://www.designbetter.co/design-systems-handbook
- NN/g — *Design Systems 101*: https://www.nngroup.com/articles/design-systems-101/

## Liên kết
[[Design Tokens]] · [[Component API & Variants]] · [[Design System Governance]] · [[Figma]] · [[UIUX]]
