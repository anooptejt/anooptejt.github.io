import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import { resolve, sep, extname } from "node:path"

const root = resolve("out")
const base = "/askanooptejthotapalli"
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".xml": "application/xml" }
await stat(resolve(root, "index.html")).catch(() => { throw new Error("Run npm run build before npm start.") })

createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405).end()
    return
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname)
    if (pathname === "/" || pathname === base) {
      response.writeHead(302, { Location: `${base}/` }).end()
      return
    }
    if (!pathname.startsWith(`${base}/`)) throw new Error("Not found")
    let file = resolve(root, `.${pathname.slice(base.length)}`)
    if (!file.startsWith(`${root}${sep}`) && file !== root) throw new Error("Not found")
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith("/")) {
        response.writeHead(301, { Location: `${pathname}/${new URL(request.url, "http://localhost").search}` }).end()
        return
      }
      file = resolve(file, "index.html")
    }
    const content = await readFile(file)
    response.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" })
    response.end(request.method === "HEAD" ? undefined : content)
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
    response.end(request.method === "HEAD" ? undefined : await readFile(resolve(root, "404.html")))
  }
}).listen(38471, "127.0.0.1", () => console.log(`Career desk: http://127.0.0.1:38471${base}/`))
