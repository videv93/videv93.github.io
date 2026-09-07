---
title: Projects
tags: [moc]
---

> Những thứ đang xây. Phần lớn còn ở repo riêng — mô tả ở đây là bản rút gọn của README.

### Vietnam Streets Database

Province (34) → Ward (3,321) → Street hierarchy for all of Vietnam, built from OpenStreetMap and restructured onto the post-2025-merger administrative divisions. Every street carries its `osm_id` and a direct OSM link for visual verification.

*PostgreSQL · PostGIS · Python · OpenStreetMap · Docker — chưa phát hành*

---

### Vietnamese Address Standardizer

Turns `"285 cmt8, q10, hcm"` into a standardized, geocoded address. A working CRF-parsing + fuzzy-matching + street-DB pipeline today, with a fine-tuned Qwen2.5 geocoder that predicts coordinates straight from address text as the next step.

*Python · CRF · Qwen2.5 · PostGIS — chưa phát hành*

---

### Audit Contest Monitor

Every morning: scrape Daily Warden for new or changed smart-contract audit contests, run an automated `x-ray` pass over the ones whose code is reachable, write a markdown report, and push a Telegram digest with a triage verdict per contest.

*Python · SQLite · Claude Code · Telegram Bot API — repo riêng tư*

---

### Web2 Security Contest Monitor

Polls HackerOne, Bugcrowd, Intigriti and YesWeHack daily, diffs the board against yesterday, and reports what is new, what changed, and what is about to close — as a markdown report, a Telegram digest, and an on-demand bot answering `/active`, `/new` and `/closing`.

*Python · SQLite · Telegram Bot API — repo riêng tư*

---

### Code Duel

Real-time 1v1 competitive programming, ranked separately by whether you used AI. Login → pick tier and difficulty → matchmake → duel on a server-authoritative clock → judge → ELO result screen with a public replay.

*TypeScript · Node 22 · pnpm · WebSockets · Docker — chưa phát hành*

---

### snip

A link shortener with accounts and AdSense. Templates, stylesheet and `robots.txt` are compiled into the binary with `embed`, so the runtime image is `FROM scratch` — roughly 15MB, no shell, no filesystem.

*Go 1.23 · net/http · pgx/v5 · htmx · Docker — repo riêng tư*

---

### Propr Donchian-Physics Trading System

A supervised live trading system running a Donchian-breakout strategy on Hyperliquid through the official Propr SDK, wrapped in a challenge-survival risk layer. Defaults to dry-run and requires two explicit environment flags to place a real order.

*Python · Hyperliquid · propr-sdk — chưa phát hành*
