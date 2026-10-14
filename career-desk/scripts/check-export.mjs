import assert from "node:assert/strict"
import { readFile, readdir, stat } from "node:fs/promises"
import { resolve, join } from "node:path"

const root = resolve("out")
const base = "/askanooptejthotapalli"
const files = await readdir(root, { recursive: true })
const pages = files.filter((file) => file.endsWith(".html"))
assert(pages.length >= 23, "All guides and index pages must be exported")
assert(!files.some((file) => file.startsWith("api/")), "No server API should ship to Pages")
await stat(join(root, ".nojekyll"))
let checked = 0
for (const page of pages) {
  const html = await readFile(join(root, page), "utf8")
  assert(!/X-Agent-Key|signing-key|api-key\.txt|\/api\/ask/.test(html), `Private backend information in ${page}`)
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!value.startsWith("/")) continue
    const path = new URL(value.replaceAll("&amp;", "&"), "https://anooptejt.github.io").pathname
    assert(path.startsWith(`${base}/`), `Unprefixed link or asset in ${page}: ${value}`)
    let file = join(root, decodeURIComponent(path.slice(base.length)))
    const info = await stat(file).catch(() => null)
    assert(info, `Missing link or asset in ${page}: ${value}`)
    if (info.isDirectory()) file = join(file, "index.html")
    await stat(file)
    checked++
  }
}
console.log(`Verified ${pages.length} HTML pages and ${checked} local link/asset references under ${base}/.`)
