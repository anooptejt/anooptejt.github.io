import http from 'node:http'
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const ID = /^[A-Za-z0-9._:@-]{1,128}$/
const STATES = new Set(['queued', 'sending', 'awaiting_reply', 'answered', 'failed', 'delivery_unknown'])
const fail = (status, message) => Object.assign(new Error(message), { status })

export function createGateway({ apiKey, signingKey, upstream = 'http://127.0.0.1:5678', origins, fetchImpl = fetch, now = Date.now }) {
  if (!apiKey || signingKey.length < 32 || !origins?.length) throw Error('Gateway configuration is incomplete')
  const buckets = new Map()
  const sign = value => createHmac('sha256', signingKey).update(value).digest('base64url')
  function limit(key, max, window = 60_000) {
    const time = now()
    for (const [id, item] of buckets) if (item.until <= time) buckets.delete(id)
    if (!buckets.has(key)) {
      if (buckets.size >= 10_000) throw fail(429, 'Messaging is busy. Please try again later.')
      buckets.set(key, { count: 0, until: time + window })
    }
    if (++buckets.get(key).count > max) throw fail(429, 'Please wait a minute before trying again.')
  }
  function identity(req) {
    const token = (req.headers.authorization || '').replace(/^Bearer /, '')
    const [payload, signature, extra] = token.split('.')
    if (!payload || !signature || extra || token.length > 1024) throw fail(401, 'Your messaging session is unavailable or expired.')
    const expected = Buffer.from(sign(payload))
    const actual = Buffer.from(signature)
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) throw fail(401, 'Your messaging session is unavailable or expired.')
    let data
    try { data = JSON.parse(Buffer.from(payload, 'base64url').toString()) } catch { throw fail(401, 'Invalid session.') }
    if (!UUID.test(data.sub) || !Number.isFinite(data.exp) || data.exp <= now()) throw fail(401, 'Your messaging session has expired.')
    return `web:${data.sub}`
  }
  async function jsonBody(req) {
    if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) throw fail(415, 'Send a JSON request.')
    const chunks = []; let size = 0
    for await (const chunk of req) {
      size += chunk.length
      if (size > 16_384) throw fail(413, 'Message is too large.')
      chunks.push(chunk)
    }
    try { return JSON.parse(Buffer.concat(chunks).toString()) } catch { throw fail(400, 'Invalid request.') }
  }
  async function relay(path, options = {}) {
    let response
    try {
      response = await fetchImpl(`${upstream}${path}`, { ...options, headers: { 'X-Agent-Key': apiKey, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(12_000), redirect: 'error' })
    } catch { throw fail(503, 'Messaging is temporarily offline. Retry this same question later, or use LinkedIn.') }
    if (!response.ok) {
      if (response.status === 404) throw fail(404, 'Conversation not found for this visitor.')
      if (response.status === 409) throw fail(409, 'This message ID already has different content.')
      if (response.status === 429) throw fail(429, 'Messaging is busy. Please try again later.')
      throw fail(503, 'Messaging is temporarily unavailable. Please try again later.')
    }
    let data
    try { data = await response.json() } catch { throw fail(502, 'Messaging returned an invalid response.') }
    if (!UUID.test(data.conversation_id) || !STATES.has(data.status)) throw fail(502, 'Messaging returned an invalid response.')
    return { response, data }
  }
  const server = http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'no-referrer')
    res.setHeader('Vary', 'Origin')
    const send = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)) }
    try {
      const origin = req.headers.origin
      if (!origins.includes(origin)) throw fail(403, 'This origin is not allowed.')
      res.setHeader('Access-Control-Allow-Origin', origin)
      const url = new URL(req.url, 'http://gateway.local')
      const replies = url.pathname.match(/^\/v1\/conversations\/([0-9a-f-]+)\/replies$/i)
      const route = ['/v1/session', '/v1/conversations', '/health'].includes(url.pathname) || (replies && UUID.test(replies[1]))
      if (!route) throw fail(404, 'Not found.')
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
        res.setHeader('Access-Control-Max-Age', '600')
        res.writeHead(204); res.end(); return
      }
      // The server is loopback-only, reached through cloudflared. Never trust arbitrary X-Forwarded-For.
      const ip = req.headers['cf-connecting-ip'] || req.socket.remoteAddress
      limit(`all:${ip}`, 360)
      if (url.pathname === '/health' && req.method === 'GET') return send(200, { status: 'online' })
      if (url.pathname === '/v1/session' && req.method === 'POST') {
        await jsonBody(req)
        limit(`sessions:${ip}`, 10, 3_600_000)
        limit('sessions:global', 100, 3_600_000)
        const expires_at = now() + 30 * 24 * 3_600_000
        const payload = Buffer.from(JSON.stringify({ sub: randomUUID(), exp: expires_at })).toString('base64url')
        return send(201, { token: `${payload}.${sign(payload)}`, expires_at })
      }
      const user_id = identity(req)
      if (url.pathname === '/v1/conversations' && req.method === 'POST') {
        const body = await jsonBody(req)
        if (!body || Object.keys(body).some(key => !['client_message_id', 'display_name', 'message'].includes(key)) || typeof body.message !== 'string' || !body.message.trim() || body.message.length > 3000 || typeof body.display_name !== 'string' || !body.display_name.trim() || body.display_name.length > 80 || /[\r\n]/.test(body.display_name) || typeof body.client_message_id !== 'string' || !ID.test(body.client_message_id)) throw fail(400, 'Use a name (1–80 characters) and a question (1–3000 characters).')
        limit(`send:${user_id}`, 6)
        limit(`send-ip:${ip}`, 10)
        limit('send:global', 60, 3_600_000)
        const { response, data } = await relay('/webhook/conversations', { method: 'POST', body: JSON.stringify({ ...body, user_id }) })
        return send(response.status, { conversation_id: data.conversation_id, status: data.status, duplicate: Boolean(data.duplicate) })
      }
      if (replies && req.method === 'GET') {
        const after = url.searchParams.get('after') ?? '0'
        if (!/^\d{1,15}$/.test(after) || !Number.isSafeInteger(Number(after))) throw fail(400, 'Invalid reply cursor.')
        const { data } = await relay(`/webhook/conversations/${replies[1]}/replies?user_id=${encodeURIComponent(user_id)}&after=${after}`)
        if (!Array.isArray(data.replies) || data.replies.length > 100 || !Number.isSafeInteger(data.next_cursor) || data.next_cursor < Number(after) || data.replies.some(reply => !Number.isSafeInteger(reply.cursor) || reply.cursor <= Number(after) || typeof reply.text !== 'string' || typeof reply.created_at !== 'string')) throw fail(502, 'Messaging returned invalid replies.')
        return send(200, { conversation_id: data.conversation_id, status: data.status, replies: data.replies.map(({ cursor, text, created_at }) => ({ cursor, text, created_at })), next_cursor: data.next_cursor, has_more: Boolean(data.has_more) })
      }
      throw fail(405, 'Method not allowed.')
    } catch (error) {
      if (!res.headersSent) {
        if (error.status === 429) res.setHeader('Retry-After', '60')
        send(error.status || 500, { error: error.status ? error.message : 'Messaging is unavailable.' })
      }
    }
  })
  server.requestTimeout = 20_000
  server.headersTimeout = 15_000
  return server
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const config = JSON.parse(await readFile(resolve('.relay/config.json'), 'utf8'))
  const apiKey = (await readFile(config.apiKeyFile, 'utf8')).trim()
  const signingKey = (await readFile(resolve('.relay/signing-key.txt'), 'utf8')).trim()
  const server = createGateway({ ...config, apiKey, signingKey })
  server.listen(config.port || 38473, '127.0.0.1', () => console.log('Messaging gateway listening on 127.0.0.1:38473'))
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)))
}
