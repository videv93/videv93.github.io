# videv93.github.io

CV, blog, and a knowledge garden of ~900 notes synced from an Obsidian vault.

| Path | What it is | Authored in |
| --- | --- | --- |
| `/` | CV homepage | `index.html`, hand-written |
| `/blog.html`, `/blog-*.html` | Long-form posts | hand-written HTML |
| `/professional-experience.html`, `/audit.html` | Detail pages | hand-written HTML |
| `/notes/` | Knowledge garden | Obsidian vault, rendered by [Quartz](https://quartz.jzhao.xyz) |

The hand-written pages are standalone HTML with inline CSS and stay that way.
Quartz only owns `/notes/`.

## Publishing

Notes live in the Obsidian vault (`2. Areas/`), not in this repo. CI has no
access to the vault, so the sync is run locally and `content/` is committed.

```bash
npm ci
npm run sync        # vault -> content/   (also regenerates content/projects.md)
npm run build:site  # content/ + root HTML -> public/
npm run publish     # both of the above

git add content && git commit -m "notes: sync" && git push
```

Pushing to `main` runs `.github/workflows/static.yml`, which builds `public/`
and deploys it to GitHub Pages.

To preview the garden alone with live reload:

```bash
npx quartz build --serve -d content
```

Serving `public/` with a plain static server works too, but extensionless URLs
(`/notes/projects`) 404 locally — GitHub Pages resolves them, `http.server`
does not. Add `.html` when previewing that way.

### What syncs, and what doesn't

`scripts/sync-vault.mjs` copies every `.md` under `2. Areas/` except:

- `_archive-seed/` — raw capture dumps, not written for readers
- any note with `publish: false` in its frontmatter

It also repairs two markdown-vs-KaTeX collisions on the way through, leaving the
vault untouched:

- a price like `$5.000` pairs with the next `$` on the line and swallows the
  prose between them into a formula — escaped to `\$`
- a `\$` written *inside* a formula closes the span early and leaves a trailing
  backslash that KaTeX rejects — rewritten to `\char36`

Both are detected structurally (real inline math never holds bare Vietnamese
outside `\text{}`), so new notes are handled without a list to maintain.

### Project cards

`/notes/projects` is generated from `scripts/projects.json` — edit that file and
re-run `npm run sync`. Set `"url"` on an entry once its repo is public and the
card grows a source link.

## License

MIT
