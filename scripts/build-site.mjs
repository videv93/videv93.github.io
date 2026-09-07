#!/usr/bin/env node
// Assemble the deployable site into public/:
//   public/           <- the existing hand-written pages, served at the same URLs as before
//   public/notes/     <- the Quartz-rendered knowledge garden
//
//   node scripts/build-site.mjs

import { cp, mkdir, rm, readdir } from "node:fs/promises"
import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const out = path.join(repo, "public")

// Everything at the repo root that is part of the pre-Quartz static site.
const STATIC_DIRS = ["assets"]
const STATIC_EXT = new Set([".html", ".pdf", ".ico", ".txt", ".xml", ".png", ".svg"])

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: repo, stdio: "inherit", shell: false })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

await rm(out, { recursive: true, force: true })

// Quartz writes straight into public/notes so internal links resolve under the subpath.
run("npx", ["quartz", "build", "-d", "content", "-o", "public/notes"])

for (const entry of await readdir(repo, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    if (!STATIC_DIRS.includes(entry.name)) continue
    await cp(path.join(repo, entry.name), path.join(out, entry.name), { recursive: true })
  } else if (STATIC_EXT.has(path.extname(entry.name).toLowerCase())) {
    await mkdir(out, { recursive: true })
    await cp(path.join(repo, entry.name), path.join(out, entry.name))
  }
}

console.log(`\n✓ site assembled → public/`)
