import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createGateway } from './server.mjs'

const origin = 'https://anooptejt.github.io'
const calls = [], conversations = new Map()
let address, server, clock = Date.now(), offline = false
const uid = 'a1234567-1234-4567-8912-123456789abc'
before(async () => {
  server = createGateway({ apiKey: 'private-test-key', signingKey: 'x'.repeat(64), origins: [origin], now: () => clock,
    fetchImpl: async (url, options) => {
      calls.push({ url, options })
      assert.equal(options.headers['X-Agent-Key'], 'private-test-key')
      if (offline) throw Error('Private upstream stack or credential')
      if (options.method === 'POST') {
        const body = JSON.parse(options.body)
        const existing = conversations.get(body.client_message_id)
        if (existing && JSON.stringify(existing) !== JSON.stringify(body)) return Response.json({}, { status: 409 })
        conversations.set(body.client_message_id, body)
        return Response.json({ conversation_id: uid, status: 'queued', duplicate: !!existing, private_field: 'secret' }, { status: existing ? 200 : 202 })
      }
      const query = new URL(url)
      if (query.searchParams.get('user_id') !== conversations.values().next().value?.user_id) return Response.json({}, { status: 404 })
      return Response.json({ conversation_id: uid, status: 'answered', replies: Number(query.searchParams.get('after')) ? [] : [{ cursor: 1, text: 'Human reply', created_at: '2026-10-15T00:00:00Z' }], next_cursor: 1, has_more: false, private_field: 'secret' })
    },
  })
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve) })
  address = `http://127.0.0.1:${server.address().port}`
})
after(() => new Promise(resolve => server.close(resolve)))
const request = (path, { token, body, method, requestOrigin = origin } = {}) => fetch(address + path, { method: method || (body ? 'POST' : 'GET'), headers: { Origin: requestOrigin, ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined })
const session = async () => (await (await request('/v1/session', { body: {} })).json()).token
let token
const body = { client_message_id: 'message-1', display_name: 'Test visitor', message: 'A question' }

test('CORS is exact; private n8n routes are inaccessible', async () => {
  assert.equal((await request('/v1/session', { body: {}, requestOrigin: 'https://evil.example' })).status, 403)
  assert.equal((await request('/rest/workflows')).status, 404)
  const preflight = await request('/v1/conversations', { method: 'OPTIONS' })
  assert.equal(preflight.status, 204)
  assert.equal(preflight.headers.get('access-control-allow-origin'), origin)
  assert.equal(preflight.headers.get('access-control-allow-credentials'), null)
})
test('bearer identity is required and cannot be forged', async () => {
  token = await session()
  assert.equal((await request('/v1/conversations', { body })).status, 401)
  assert.equal((await request('/v1/conversations', { token: token + 'x', body })).status, 401)
  assert.equal((await request('/v1/conversations', { token, body: { ...body, user_id: 'someone-else' } })).status, 400)
})
test('trusted backend derives identity and exact retries preserve conversation', async () => {
  const first = await request('/v1/conversations', { token, body })
  assert.equal(first.status, 202)
  assert.deepEqual(await first.json(), { conversation_id: uid, status: 'queued', duplicate: false })
  assert.match(conversations.get('message-1').user_id, /^web:/)
  const retry = await request('/v1/conversations', { token, body })
  assert.equal(retry.status, 200)
  assert.equal((await retry.json()).duplicate, true)
  assert.equal((await request('/v1/conversations', { token, body: { ...body, message: 'Changed' } })).status, 409)
})
test('replies are isolated by visitor; stable cursor prevents duplicates', async () => {
  const other = await session()
  assert.equal((await request(`/v1/conversations/${uid}/replies`, { token: other })).status, 404)
  const data = await (await request(`/v1/conversations/${uid}/replies`, { token })).json()
  assert.equal(data.replies[0].text, 'Human reply')
  assert.equal(data.private_field, undefined)
  const next = await (await request(`/v1/conversations/${uid}/replies?after=1`, { token })).json()
  assert.deepEqual(next.replies, [])
  assert.equal((await request(`/v1/conversations/${uid}/replies?after=-1`, { token })).status, 400)
})
test('invalid and oversized messages never reach n8n', async () => {
  const count = calls.length
  assert.equal((await request('/v1/conversations', { token, body: { ...body, message: 'x'.repeat(3001) } })).status, 400)
  assert.equal((await request('/v1/conversations', { token, body: { ...body, display_name: 'a\nb' } })).status, 400)
  assert.equal((await request('/v1/conversations', { token, body: { ...body, message: 'x'.repeat(17000) } })).status, 413)
  assert.equal(calls.length, count)
})
test('offline upstream errors are sanitized, never falsely marked delivered', async () => {
  offline = true
  const response = await request('/v1/conversations', { token, body: { ...body, client_message_id: 'offline' } })
  assert.equal(response.status, 503)
  assert.doesNotMatch(await response.text(), /private-test-key|stack|credential/)
  offline = false
})
test('send limits and session expiry are enforced', async () => {
  for (let i = 0; i < 2; i++) await request('/v1/conversations', { token, body })
  assert.equal((await request('/v1/conversations', { token, body })).status, 429)
  clock += 31 * 24 * 3_600_000
  assert.equal((await request(`/v1/conversations/${uid}/replies`, { token })).status, 401)
})
