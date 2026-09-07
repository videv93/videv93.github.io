#!/usr/bin/env node
// Sync the Obsidian vault's "2. Areas" into content/ for the Quartz build,
// and generate the Projects page from scripts/projects.json.
//
//   node scripts/sync-vault.mjs [--vault <path>]
//
// Defaults to the vault two levels up from the repo (the repo lives inside it).
// Excludes _archive-seed/ — raw capture dumps, not written for readers.

import { readFile, writeFile, mkdir, rm, readdir } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const argv = process.argv.slice(2)
const vaultFlag = argv.indexOf("--vault")
const vault = vaultFlag !== -1 ? path.resolve(argv[vaultFlag + 1]) : path.resolve(repo, "../..")

const areas = path.join(vault, "2. Areas")
const content = path.join(repo, "content")

const EXCLUDE_DIRS = new Set(["_archive-seed", ".obsidian", ".trash"])
const EXCLUDE_FILES = new Set([".DS_Store", "BLOG_SOURCE.md"])

// Topic folder -> the blurb shown on the garden index.
const TOPICS = {
  Math: "Giải tích một biến, đại số tuyến tính, tiệm cận — nền của cả ba vault dưới.",
  "Prob&Stats": "Xác suất, biến ngẫu nhiên, suy luận thống kê.",
  Quant: "Định giá, mô hình thị trường, quản trị rủi ro.",
  ML: "Học máy: tối ưu, mô hình, đánh giá.",
  "DS&AL": "Cấu trúc dữ liệu và giải thuật.",
  Blockchain: "Smart contract, EVM, và audit.",
  Backend: "Thiết kế API, hệ thống phân tán, hiệu năng.",
  Frontend: "Trình duyệt, framework, rendering.",
  Database: "Mô hình dữ liệu, chỉ mục, transaction.",
  DevOps: "Container, CI/CD, hạ tầng.",
  Networking: "Giao thức, tầng mạng, hiệu năng truyền tải.",
  OS: "Tiến trình, bộ nhớ, hệ thống file.",
  Security: "Mô hình tấn công và phòng thủ.",
  GIS: "Dữ liệu không gian, chiếu bản đồ, xử lý hình học.",
  Physics: "Cơ học, trường, và các mô hình liên tục.",
  UIUX: "Nguyên tắc thị giác, design system, tương tác.",
  SEO: "Crawl, index, và xếp hạng.",
}

// Notes write prices as a bare `$5.000`. Markdown reads the next `$` on the line
// as a closing math delimiter and swallows the prose between them into KaTeX.
// Real inline math never contains bare Vietnamese outside \text{}, so that is
// the tell that a `$` pair is currency rather than math.
const VN = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i
const TEXT_CMD = /\\(?:text|mathrm|textbf|textit|mathbf|operatorname)\{[^{}]*\}/g
// The body may itself hold an escaped `\$` — a dollar sign typed inside real
// math. Missing that case mispairs every delimiter after it on the line.
const MATH_SPAN = /(?<!\\)\$((?:\\\$|[^$\n]){1,300})(?<!\\)\$/g
// A math span that holds an escaped dollar, e.g. `$p_0(t) \equiv \$1$`.
const MATH_ESCAPED_DOLLAR = /(?<!\\)\$(?:\\\$|[^$\n]){1,300}?\\\$(?:\\\$|[^$\n]){0,300}?(?<!\\)\$/g
// Sentinel for parked inline code. Private-use codepoint: it cannot appear in
// the notes, so restoring can never collide with prose.
const MARK = ""
const PARKED = new RegExp(`${MARK}(\\d+)${MARK}`, "g")

function escapeCurrency(raw) {
  const lines = raw.split("\n")
  let inFence = false
  let fixed = 0

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence
      continue
    }
    if (inFence || !lines[i].includes("$")) continue

    // A `\$` *inside* math (a price written in a formula) ends the span early:
    // remark-math closes on it before KaTeX ever sees the escape, and the
    // leftover trailing backslash is a parse error. \char36 is the same glyph
    // with no delimiter in it.
    lines[i] = lines[i].replace(MATH_ESCAPED_DOLLAR, (span) => {
      fixed++
      return span.replace(/\\\$/g, "\\char36 ")
    })

    // Park inline code spans so neither the scan nor the rewrite touches them.
    const code = []
    let line = lines[i].replace(/`[^`\n]*`/g, (m) => `${MARK}${code.push(m) - 1}${MARK}`)

    line = line.replace(MATH_SPAN, (span, body) => {
      if (!VN.test(body.replace(TEXT_CMD, ""))) return span
      fixed++
      return `\\$${body}\\$`
    })

    // A price at the end of a line has no partner to pair with; escape the rest.
    if ((line.match(/(?<!\\)\$/g) ?? []).length % 2 === 1) {
      line = line.replace(/(?<!\\)\$(?=[\d.,]*\d(?:\s|$|[^\d$]))/g, () => {
        fixed++
        return "\\$"
      })
    }

    lines[i] = line.replace(PARKED, (_, n) => code[n])
  }
  return { text: lines.join("\n"), fixed }
}

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue
      await walk(path.join(dir, entry.name), out)
    } else if (entry.name.endsWith(".md") && !EXCLUDE_FILES.has(entry.name)) {
      out.push(path.join(dir, entry.name))
    }
  }
  return out
}

// An explicit `publish: false` in frontmatter keeps a note out of the garden.
function shouldPublish(raw) {
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fm) return true
  return !/^publish:\s*false\s*$/m.test(fm[1])
}

async function syncNotes() {
  if (!existsSync(areas)) {
    console.error(`✗ vault not found: ${areas}\n  pass --vault <path to Second Brain>`)
    process.exit(1)
  }
  const files = await walk(areas)
  let copied = 0,
    skipped = 0,
    escaped = 0
  for (const src of files) {
    const raw = await readFile(src, "utf8")
    if (!shouldPublish(raw)) {
      skipped++
      continue
    }
    const { text, fixed } = escapeCurrency(raw)
    escaped += fixed
    const dest = path.join(content, path.relative(areas, src))
    await mkdir(path.dirname(dest), { recursive: true })
    await writeFile(dest, text)
    copied++
  }
  return { copied, skipped, escaped, total: files.length }
}

async function writeProjects() {
  const projects = JSON.parse(await readFile(path.join(repo, "scripts/projects.json"), "utf8"))
  const badge = { private: "repo riêng tư", unreleased: "chưa phát hành", public: "" }
  const body = projects
    .map((p) => {
      const link = p.url ? ` — [mã nguồn →](${p.url})` : ""
      // Keep the status out of the heading: raw HTML there leaks into the
      // table of contents, which renders headings as plain text.
      const meta = [p.stack.join(" · "), badge[p.status]].filter(Boolean).join(" — ")
      return `### ${p.name}\n\n${p.blurb}\n\n*${meta}*${link}`
    })
    .join("\n\n---\n\n")

  await writeFile(
    path.join(content, "projects.md"),
    `---\ntitle: Projects\ntags: [moc]\n---\n\n> Những thứ đang xây. Phần lớn còn ở repo riêng — mô tả ở đây là bản rút gọn của README.\n\n${body}\n`,
  )
  return projects.length
}

async function writeIndex(stats) {
  const topics = (await readdir(areas, { withFileTypes: true }))
    .filter((e) => e.isDirectory() && !EXCLUDE_DIRS.has(e.name))
    .map((e) => e.name)
    .sort()

  const list = topics.map((t) => `- [[${t}/${t}|${t}]] — ${TOPICS[t] ?? ""}`.trimEnd()).join("\n")

  await writeFile(
    path.join(content, "index.md"),
    `---
title: Notes
---

Vườn ghi chú của [Vi Tran](/). ${stats.copied} ghi chú, viết bằng tiếng Việt, **giữ nguyên thuật ngữ tiếng Anh** — vì mọi sách và mọi bài giảng đều dùng tiếng Anh.

Đây không phải blog. Ghi chú ở đây được sửa liên tục, và \`status\` trong mỗi trang cho biết nó đã chín tới đâu: \`seed\` (mới gieo) → \`growing\` (đang mở rộng) → \`evergreen\` (đã hệ thống hoá).

## Chủ đề

${list}

## Khác

- [[projects|Projects]] — những thứ đang xây
- [CV](/) — kinh nghiệm chuyên môn
`,
  )
  return topics.length
}

await rm(content, { recursive: true, force: true })
await mkdir(content, { recursive: true })
const stats = await syncNotes()
const nProjects = await writeProjects()
const nTopics = await writeIndex(stats)

console.log(`✓ ${stats.copied} notes across ${nTopics} topics → content/`)
if (stats.skipped) console.log(`  ${stats.skipped} skipped (publish: false)`)
if (stats.escaped) console.log(`  ${stats.escaped} literal $ escaped (currency, not math)`)
console.log(`✓ ${nProjects} project cards → content/projects.md`)
