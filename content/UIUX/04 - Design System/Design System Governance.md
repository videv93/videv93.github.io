---
tags: [uiux, designsystem, process]
status: growing
---
# Design System Governance

> Xây design system là phần dễ. Giữ cho nó **sống** mới là phần khó. Đa số design system chết vì không ai sở hữu, không phải vì thiết kế kém.

## 1. Audit — điểm khởi đầu và việc lặp lại
**Gather everything that exists** — chụp mọi màn hình, mọi biến thể.
**Sort and categorize** — gom theo loại component; đây là lúc phát hiện "17 sắc xanh, 9 kiểu nút".
**Identify opportunities** — xếp theo (tần suất dùng × mức độ không nhất quán) để chọn việc làm trước.

Audit nên lặp lại **mỗi 6–12 tháng**, hoặc trước mỗi lần nâng cấp lớn.

## 2. Mô hình sở hữu
| Mô hình | Cách hoạt động | Hợp với |
|---|---|---|
| **Solitary** | Một người/nhóm nhỏ làm tất cả | Team nhỏ, giai đoạn đầu |
| **Centralized** | Một đội chuyên trách sở hữu và phục vụ | Công ty vừa, nhiều sản phẩm |
| **Federated** | Đại diện từ nhiều team cùng đóng góp, có hội đồng duyệt | Công ty lớn |
| **Hybrid** | Đội lõi giữ nền tảng + team sản phẩm đóng góp | Phổ biến nhất khi trưởng thành |

Dù mô hình nào, phải trả lời được: **ai quyết định cuối cùng khi có bất đồng?**

## 3. Quy trình đóng góp
```
Nhu cầu mới
   ↓
Đã có gì tương tự chưa?  → Có → dùng cái có sẵn (hoặc đề xuất mở rộng)
   ↓ Chưa
Đây là trường hợp riêng hay pattern chung?  → Riêng → làm cục bộ ở sản phẩm
   ↓ Chung
Đề xuất (RFC): vấn đề, ví dụ ≥3 chỗ dùng, phương án
   ↓
Duyệt → Thiết kế → Review a11y → Code → Tài liệu → Phát hành
```
**Quy tắc số 3:** chỉ đưa vào hệ thống thứ đã cần ở ít nhất 3 nơi.

Cần có kênh rõ ràng (Slack channel, Linear project) và **SLA phản hồi** — đề xuất bị bỏ lơ là cách nhanh nhất khiến team quay lại tự làm riêng.

## 4. Versioning & thay đổi phá vỡ
- Dùng **semver**: `major.minor.patch`.
  - **patch** — sửa lỗi, không đổi API
  - **minor** — thêm component/prop mới, tương thích ngược
  - **major** — thay đổi phá vỡ
- **Deprecation** phải có lộ trình: đánh dấu deprecated → thông báo → cung cấp codemod/hướng dẫn migrate → xoá sau ≥1 chu kỳ.
- **Changelog** viết cho người đọc, không phải log git: "Button giờ có size `xs`; `variant=flat` đã deprecated, dùng `variant=ghost`."
- Đừng phá vỡ API vì lý do thẩm mỹ nhỏ.

## 5. Tài liệu
Mỗi component cần:
1. **Ảnh/demo tương tác**
2. **Khi nào dùng / khi nào KHÔNG dùng** ← phần giá trị nhất, hay bị bỏ qua
3. **Anatomy** có đánh số
4. **Variants & props** dạng bảng
5. **Ví dụ đúng ✅ / sai ❌** cạnh nhau
6. **Quy tắc accessibility** cụ thể
7. **Hướng dẫn nội dung** — nhãn nên viết thế nào
8. **Code snippet**

Công cụ: **Storybook** (https://storybook.js.org/), **Zeroheight** (https://zeroheight.com/), Notion, hoặc trang docs tự dựng.

## 6. Đo lường sức khoẻ hệ thống
- **Tỉ lệ áp dụng (adoption)** — % thành phần trong sản phẩm đến từ hệ thống. Figma có thống kê library analytics; phía code có thể quét import.
- **Detach rate** — designer tách rời instance bao nhiêu lần (mỗi lần tách là một lời phàn nàn thầm lặng về API).
- **Số component "tự chế"** trùng chức năng với component có sẵn.
- **Thời gian dựng một màn hình mới**.
- **Số lỗi accessibility** trong sản phẩm.
- Khảo sát định kỳ với designer/dev: "hệ thống đang cản bạn ở đâu?"

## 7. Vì sao design system thất bại
1. Không ai sở hữu sau khi launch.
2. Xây theo lý tưởng, không theo nhu cầu thật của sản phẩm.
3. Không có quy trình đóng góp → team tự làm riêng.
4. Tài liệu lỗi thời hơn code.
5. Design và code lệch nhau.
6. Quá cứng nhắc, không cho phép thoát ra khi cần.
7. Không đo lường nên không chứng minh được giá trị với lãnh đạo.

## Tham khảo
- Nathan Curtis — *Team Models for Scaling a Design System*: https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0
- Figma — *Design system governance*: https://www.figma.com/resource-library/design-system-governance/
- Zeroheight — *Design System Maturity Model*: https://zeroheight.com/
- Sparkbox — *Design Systems Survey*: https://sparkbox.com/foundry
- Storybook docs: https://storybook.js.org/docs

## Liên kết
[[Design System]] · [[Component API & Variants]] · [[Design Critique]] · [[Design Handoff]] · [[UIUX]]
