// Post-build step for the single-file bundle: inlines every /assets/* image
// and video referenced in dist/index.html as a base64 data URI, producing a
// fully self-contained dist/axon-careers.html that runs from file://.
// Run after: VITE_SINGLEFILE=1 vite build   (see `npm run build:single`)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'

const root = process.cwd()
const htmlPath = `${root}/dist/index.html`
const assetsDir = `${root}/public/assets`
const outPath = `${root}/dist/axon-careers.html`

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// list files recursively, returning paths relative to assetsDir (e.g. team/ness.jpg)
function walk(dir, base = '') {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = `${dir}/${entry}`
    const rel = base ? `${base}/${entry}` : entry
    if (statSync(full).isDirectory()) out.push(...walk(full, rel))
    else out.push(rel)
  }
  return out
}

let html = readFileSync(htmlPath, 'utf8')
let inlined = 0
for (const rel of walk(assetsDir)) {
  const ext = rel.slice(rel.lastIndexOf('.')).toLowerCase()
  const mime = MIME[ext]
  if (!mime) continue
  const pattern = new RegExp('[.]?/assets/' + esc(rel), 'g')
  if (!pattern.test(html)) continue
  const b64 = readFileSync(`${assetsDir}/${rel}`).toString('base64')
  html = html.replace(
    new RegExp('[.]?/assets/' + esc(rel), 'g'),
    `data:${mime};base64,${b64}`,
  )
  inlined++
}

const leftovers = [...new Set([...html.matchAll(/[.]?\/assets\/[\w.-]+/g)].map((m) => m[0]))]
writeFileSync(outPath, html)
console.log(`Inlined ${inlined} assets -> ${outPath} (${(html.length / 1048576).toFixed(2)} MB)`)
if (leftovers.length) console.warn('WARNING leftover asset refs:', leftovers)
