---
tags: [uiux, moc]
type: MOC
updated: 2026-08-27
---
# 🎨 UI/UX — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng của toàn bộ khu vực UI/UX. Mỗi mục con là một note độc lập, có phần **Tham khảo** riêng để đào sâu.

## Cách dùng vault này
- **Đọc theo lộ trình** → xem [[Learning Roadmap]].
- **Tra cứu nhanh một component** → vào `03 - Components`.
- Mỗi note có 3 tầng: **Khái niệm → Nguyên tắc → Checklist**. Khi học được điều mới, thêm vào đúng tầng thay vì tạo note mới.
- `status:` trong frontmatter: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).

---

## 00 — Nền tảng
- [[UX vs UI]] — phân biệt hai vai trò, ranh giới và phần giao nhau
- [[Design Thinking Process]] — Empathize → Define → Ideate → Prototype → Test
- [[Design Principles]] — Gestalt, phân cấp thị giác, tương phản, nhất quán
- [[Laws of UX]] — Fitts, Hick, Miller, Jakob, Von Restorff…
- [[Nielsen Heuristics]] — 10 nguyên tắc đánh giá khả dụng
- [[Learning Roadmap]] — lộ trình học từ 0 đến làm được sản phẩm

## 01 — UX Research
- [[User Research]] — định tính vs định lượng, khi nào dùng gì
- [[Persona & JTBD]] — chân dung người dùng và "công việc cần hoàn thành"
- [[User Journey & Flow]] — journey map vs user flow
- [[Information Architecture]] — sitemap, navigation, card sorting
- [[Usability Testing]] — kịch bản test, think-aloud, quy tắc 5 người dùng

## 02 — Thiết kế thị giác
- [[Color Theory]] — 60-30-10, sắc độ, màu ngữ nghĩa, contrast
- [[Typography]] — thang chữ, line-height, độ dài dòng, font pairing
- [[Spacing & Grid]] — hệ 8pt, grid 12 cột, breakpoint
- [[Layout & Composition]] — visual hierarchy, F/Z pattern, white space
- [[Iconography & Imagery]] — icon system, ảnh, illustration
- [[Geometric Perception and Design Composition Lesson  Uxcel 1|Geometric Perception (Uxcel)]] — clipping: hình học và bố cục

## 03 — Component
- [[Button]] · [[Input & Form]] · [[Selection Controls]] · [[Slider & Picker]]
- [[Card]] · [[Menu & Navigation]] · [[Modal & Dialog]] · [[Tooltip]]
- [[Progress & Loading]] · [[Table & Data Display]] · [[Empty & Error States]]

## 04 — Design System
- [[Design System]] — bản chất, khi nào cần, quy trình xây
- [[Design Tokens]] — tầng token, đặt tên, theming
- [[Component API & Variants]] — thiết kế props/variant, anatomy
- [[Design System Governance]] — audit, versioning, tài liệu, đóng góp

## 05 — Tương tác & Chuyển động
- [[Micro-interactions]] — trigger, rule, feedback, loop
- [[Motion & Animation]] — duration, easing, purpose
- [[Interaction States]] — default/hover/focus/active/disabled/loading/error

## 06 — Accessibility
- [[Accessibility]] — WCAG, contrast, keyboard, screen reader

## 07 — UX Writing
- [[UX Writing]] — voice & tone, nút bấm, thông báo lỗi, microcopy

## 08 — Công cụ & Quy trình
- [[Figma]] — auto layout, component, variant, variables
- [[Prototyping]] — fidelity, smart animate, kiểm chứng ý tưởng
- [[Design Handoff]] — spec, export, phối hợp với developer
- [[Design Critique]] — cách nhận và đưa phản hồi thiết kế

## 09 — Đo lường & Kinh doanh
- [[UX Metrics]] — HEART, SUS, conversion, drop-off
- [[Business Mindset]] — cân bằng user need và mục tiêu doanh nghiệp

---

## Nguồn học nền tảng (dùng chung cho cả vault)
| Nguồn | Kiểu | Link |
|---|---|---|
| Nielsen Norman Group | Bài viết nghiên cứu, chuẩn mực ngành | https://www.nngroup.com/articles/ |
| Laws of UX | Định luật tâm lý học thiết kế | https://lawsofux.com/ |
| Material Design 3 | Design system tham chiếu (Google) | https://m3.material.io/ |
| Apple HIG | Chuẩn thiết kế iOS/macOS | https://developer.apple.com/design/human-interface-guidelines |
| Refactoring UI | Sách mẹo thực chiến UI cho dev | https://www.refactoringui.com/ |
| WCAG 2.2 (W3C) | Chuẩn accessibility | https://www.w3.org/WAI/WCAG22/quickref/ |
| Smashing Magazine | Bài chuyên sâu | https://www.smashingmagazine.com/category/design/ |
| Mobbin /.design | Thư viện tham khảo giao diện thật | https://mobbin.com/ |
| Growth.Design | Case study UX dạng truyện tranh | https://growth.design/case-studies |

> Note gốc ban đầu được lưu ở `_archive-seed/` để đối chiếu.
