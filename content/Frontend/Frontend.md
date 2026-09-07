---
tags: [frontend, moc]
type: moc
status: evergreen
created: 2026-09-01
updated: 2026-09-01
---
# Frontend

> Bản đồ kiến thức frontend: từ **nền tảng trình duyệt** → **CSS lõi** → **layout** → **utility-first** → **Web APIs** → **React/Next.js** → **chất lượng & vận hành**.
> Sinh ra từ 67 file seed (~4.000 dòng clipping MDN/Tailwind/Next.js) theo [[Knowledge Seed Playbook]].

## Cách dùng vault này

- Thư mục đánh số theo **thứ tự học**, không theo bảng chữ cái. Đọc từ `00` nếu muốn xây nền; nhảy thẳng vào `04`/`07` nếu đang cần tra cứu.
- `status`: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- Tiếng Việt để giải thích, **giữ nguyên thuật ngữ tiếng Anh** — vì tài liệu và đồng nghiệp đều dùng tiếng Anh.
- ⚠️ đánh dấu **note bản lề**: chỗ hai hệ giá trị va nhau. Đọc chúng trước khi áp dụng cả cụm.
- Tên note **có tiền tố khi cần** (`CSS Cascade & Specificity`, `Next.js Caching Layers`, `Tailwind Spacing & Sizing`) để không cướp wikilink của area khác — xem [[#Ghi chú về đặt tên]].

## 00 — Nền tảng web

| Note | Nội dung |
|---|---|
| [[Browser Rendering Pipeline]] | Parse → style → layout → paint → composite, và chỗ nào bạn làm chậm nó |
| [[HTML Document Anatomy]] | `<head>`, metadata, thứ tự tải, content categories |
| [[Semantic HTML]] | Chọn thẻ theo nghĩa; dos & don'ts của W3C |
| [[Accessible Markup & ARIA]] | Tầng implementation của a11y — bổ sung cho [[Accessibility]] bên UIUX |
| [[HTML Forms & Validation]] | Native validation, `<input>` types, date/time formats |

## 01 — CSS lõi

| Note | Nội dung |
|---|---|
| [[CSS Syntax & At-rules]] | Cú pháp rule, at-rule, comment, lỗi cú pháp huỷ cả rule |
| [[CSS Cascade & Specificity]] | Origin, layer, specificity, `!important` — vì sao style của bạn không ăn |
| [[CSS Inheritance & Value Processing]] | 6 giai đoạn giá trị: specified → computed → used → actual |
| [[CSS Selectors]] | 5 basic selector, 5 combinator, pseudo-class vs pseudo-element |
| [[CSS Values & Units]] | Data type, functional notation, value definition syntax |
| [[CSS Custom Properties]] | Biến cascading, `@property`, `env()` |

## 02 — Layout & Box model

| Note | Nội dung |
|---|---|
| [[CSS Box Model]] | Content/padding/border/margin, `box-sizing`, margin collapsing |
| [[Block Formatting Context]] | BFC là gì, tạo bằng cách nào, chữa float/margin ra sao |
| [[Containing Block & Positioned Layout]] | `position`, containing block, anchor positioning |
| [[Stacking Context]] | `z-index` chỉ hoạt động trong ngữ cảnh — và ai tạo ngữ cảnh mới |
| [[CSS Flexbox]] | Layout một chiều: axis, grow/shrink/basis, alignment |
| [[CSS Grid]] | Layout hai chiều: track, line, area, subgrid |
| [[CSS Box Alignment]] | `justify-*` / `align-*` / `place-*` dùng chung cho flex, grid, block |
| [[Responsive Layout]] | Media query, container query, breakpoint, fluid sizing |

## 03 — CSS hiện đại

| Note | Nội dung |
|---|---|
| [[CSS Modules Map]] | Catalogue ~70 module CSS — bản đồ tra cứu, không phải bài học |
| [[CSS Typography]] | `@font-face`, font loading, text/inline layout, writing modes |
| [[CSS Color & Theming]] | Color space, `color-scheme`, dark mode, blending |
| [[CSS Transitions & Animations]] | Keyframe, easing, scroll-driven animation, view transitions |
| [[CSS Transforms & Effects]] | Transform, filter, mask, clip, shape |
| [[CSS Overflow & Scrolling]] | Overflow, overscroll, scroll snap, scrollbar styling |
| [[CSS Architecture]] | BEM / ITCSS / CSS Modules / scoping / cascade layers |

## 04 — Utility-first & Tailwind

| Note | Nội dung |
|---|---|
| [[Tailwind Utility Model]] | Vì sao utility-first, build pipeline, arbitrary value |
| [[Tailwind Layout Utilities]] | display, position, float, overflow, isolation, z-index, aspect |
| [[Tailwind Flexbox & Grid]] | flex-*, grid-*, gap, justify/align/place |
| [[Tailwind Spacing & Sizing]] | p/m/space, w/h/size/min/max, container |
| [[Tailwind Typography Utilities]] | font, text, leading, tracking, list, wrap |
| [[Tailwind Visual Utilities]] | background, border, ring, shadow, filter, opacity, table, svg |
| [[Tailwind Variants & States]] | hover/focus/group/peer/has/data/dark/supports |
| [[Tailwind Theme & Configuration]] | theme, screens, colors, spacing, plugin, preset |
| ⚠️ [[Utility-First vs Cascade]] | **Note bản lề** — Tailwind vứt bỏ đúng thứ mà CSS lõi coi là trung tâm |

## 05 — JavaScript & Web APIs

| Note | Nội dung |
|---|---|
| [[DOM & Events]] | Node tree, event flow, delegation, custom event |
| [[Web APIs Map]] | Catalogue ~150 Web API theo nhóm mục đích |
| [[Fetch & Network APIs]] | fetch, streams, SSE, WebSocket, WebTransport, Beacon |
| [[Browser Storage APIs]] | localStorage, IndexedDB, Cookie Store, Cache, Storage quota |
| [[Observer APIs]] | Intersection / Resize / Mutation / Performance Observer |
| [[Web Workers & Background APIs]] | Worker, Service Worker, Background Sync, Scheduler |
| [[Web Components]] | Custom element, shadow DOM, `::part()`, template |

## 06 — React & thành phần

| Note | Nội dung |
|---|---|
| [[React Mental Model]] | Component, state, reconciliation, hook rules |
| [[React Server Components]] | Chạy trên server, RSC payload, ba chiến lược render |
| [[React Client Components]] | `"use client"`, ranh giới mạng, hydration |
| [[React Server Functions]] | RPC có kiểu, Server Actions, validation biên |
| [[Frontend State Management]] | URL state / server state / client state — chọn cái nào |
| [[Component Library Strategy]] | Shadcn UI, versionless, quan hệ với [[Design System]] bên UIUX |

## 07 — Next.js

| Note | Nội dung |
|---|---|
| [[Next.js App Router]] | File-system routing, route segment, component hierarchy |
| [[Next.js Routing Patterns]] | Dynamic / parallel / intercepting route, route group, middleware |
| [[Next.js Rendering Strategies]] | Static, dynamic, streaming, PPR |
| [[Next.js Data Fetching]] | Server vs client, parallel vs sequential, 4 cách fetch |
| [[Next.js Caching Layers]] | 4 tầng cache và cách vô hiệu hoá đúng tầng |
| [[Next.js Project Structure]] | Top-level folder/file, colocation, tổ chức dự án |

## 08 — Chất lượng & vận hành

| Note | Nội dung |
|---|---|
| [[Core Web Vitals]] | LCP, INP, CLS — đo bằng gì, sửa bằng gì |
| [[Frontend Performance Budget]] | Bundle, image, font, hydration cost |
| [[Frontend Testing Strategy]] | RTL, Playwright/Cypress, tầng nào test cái gì |
| [[Frontend Tooling]] | TypeScript, ESLint/Biome, Prettier, Storybook, tsx |
| [[Product Analytics & Surveys]] | PostHog, survey prebuilt vs custom UI, event capture |
| [[Frontend Deployment]] | Vercel, self-host, CDN, domain, edge runtime |
| ⚠️ [[Framework Churn vs Platform Longevity]] | **Note bản lề** — stack 2025 sẽ hết hạn, MDN thì không |

## 09 — Lộ trình & Tài nguyên

| Note | Nội dung |
|---|---|
| [[Frontend Learning Path]] | Thứ tự học, mốc kiểm tra năng lực |
| [[Frontend Tech Stack 2025]] | 25 lựa chọn công nghệ của seed, kèm đánh giá lại |
| [[Frontend Learning Resources]] | Catalogue nguồn: MDN, spec, blog, khoá học |

## Nguồn học nền tảng

| Nguồn | Dùng cho | Link |
|---|---|---|
| MDN Web Docs | Chuẩn tra cứu HTML/CSS/API | https://developer.mozilla.org/ |
| CSS Working Group Drafts | Spec gốc, khi MDN chưa đủ | https://drafts.csswg.org/ |
| WHATWG HTML Standard | Spec HTML sống | https://html.spec.whatwg.org/ |
| web.dev | Performance, Core Web Vitals | https://web.dev/ |
| Baseline / caniuse | Hỗ trợ trình duyệt | https://web.dev/baseline · https://caniuse.com/ |
| Josh W. Comeau | Giải thích cơ chế CSS sâu | https://www.joshwcomeau.com/ |
| Tailwind CSS Docs | Class reference | https://tailwindcss.com/docs |
| Next.js Docs | App Router | https://nextjs.org/docs |
| React Docs | Hook, RSC | https://react.dev/ |

## Ghi chú về đặt tên

Obsidian phân giải `[[wikilink]]` theo **tên file trên toàn vault**. Seed frontend đầy tên chung chung — `Caching`, `Routing`, `Container`, `Isolation`, `Position`, `Display`, `Size`, `Overflow`, `Gap`, `Order`, `Clear`. Các area khác trong vault **đã trỏ tới những tên này**: `[[Caching]]` từ [[Database]], `[[Routing]]` từ [[Networking]], `[[Container]]` từ DevOps.

Nếu đặt note frontend đúng tên đó, chúng sẽ **cướp** link của area khác. Vì vậy mọi note ở đây đều mang tiền tố định danh (`CSS …`, `Tailwind …`, `Next.js …`, `Frontend …`, `React …`).

Cùng lý do, các khái niệm **đã có nhà ở area khác** thì ở đây chỉ được **link tới**, không định nghĩa lại:
[[Accessibility]] · [[Design System]] · [[Design Tokens]] · [[Typography]] · [[Button]] · [[Input & Form]] · [[Selection Controls]] · [[Slider & Picker]] · [[Modal & Dialog]] · [[Table & Data Display]] · [[Interaction States]] · [[Component API & Variants]] — tất cả sống ở [[UIUX]].

## `_archive-seed/`

67 file seed gốc (4 clipping MDN ở gốc + `NextJS/` + `TailwindCSS/` + `Libraries/` + 2 bài viết) nằm nguyên vẹn trong `_archive-seed/`. Không nội dung nào bị vứt đi — mọi class list, mọi bảng, mọi link đều đã được hấp thụ và mở rộng vào các note trên. Dùng nó để đối chiếu khi nghi ngờ.

## Liên kết

[[Knowledge Seed Playbook]] · [[UIUX]] · [[Database]] · [[Networking]]
