import { spawn, execFileSync } from 'node:child_process'
import { open, readFile, writeFile, mkdir, unlink, access } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
process.chdir(root)
const runtime = resolve('.relay/runtime.json')
const action = process.argv[2] || 'status'
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
const alive = pid => { try { process.kill(pid, 0); return true } catch { return false } }
async function state() { try { return JSON.parse(await readFile(runtime, 'utf8')) } catch { return null } }
function matches(item) {
  if (!alive(item.pid)) return false
  try { return execFileSync('ps', ['-p', String(item.pid), '-o', 'args='], { encoding: 'utf8' }).includes(item.marker) } catch { return false }
}
async function stop(current) {
  for (const item of [...(current?.processes || [])].reverse()) if (matches(item)) process.kill(item.pid, 'SIGTERM')
  await unlink(runtime).catch(() => {})
}
async function start() {
  await mkdir('.relay', { recursive: true, mode: 0o700 })
  const lock = await open('.relay/start.lock', 'wx', 0o600).catch(() => { throw Error('Another start is in progress. Inspect .relay/start.lock if a previous start was interrupted.') })
  const processes = []
  try {
    const existing = await state()
    if (existing?.processes.some(matches)) throw Error('Relay processes are already running. Use npm run relay:status or relay:stop first.')
    await access('.relay/config.json'); await access('.relay/signing-key.txt'); await access('.relay/bin/cloudflared')
    async function launch(executable, args, log, marker) {
      const output = await open(log, 'w', 0o600)
      const child = spawn(executable, args, { cwd: root, detached: true, stdio: ['ignore', output.fd, output.fd] })
      await new Promise((yes, no) => { child.once('spawn', yes); child.once('error', no) })
      await output.close(); child.unref()
      processes.push({ pid: child.pid, marker })
    }
    const server = resolve('gateway/server.mjs')
    await launch(process.execPath, [server], '.relay/gateway.log', server)
    for (let i = 0; ; i++) {
      if (i > 30 || !alive(processes[0].pid)) throw Error('Gateway failed to start. Inspect .relay/gateway.log.')
      try {
        const check = await fetch('http://127.0.0.1:38473/health', { headers: { Origin: 'https://anooptejt.github.io' }, signal: AbortSignal.timeout(1000) })
        if (check.ok) break
      } catch {}
      await pause(200)
    }
    const binary = resolve('.relay/bin/cloudflared')
    await launch(binary, ['tunnel', '--no-autoupdate', '--url', 'http://127.0.0.1:38473'], '.relay/tunnel.log', binary)
    if (process.platform === 'darwin') await launch('/usr/bin/caffeinate', ['-i', '-w', String(processes[0].pid)], '.relay/awake.log', `caffeinate -i -w ${processes[0].pid}`)
    let gateway
    for (let i = 0; i < 90; i++) {
      gateway = (await readFile('.relay/tunnel.log', 'utf8')).match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/)?.[0]
      if (gateway) break
      if (!alive(processes[1].pid)) throw Error('Tunnel stopped. Inspect .relay/tunnel.log.')
      await pause(500)
    }
    if (!gateway) throw Error('No tunnel URL received. Inspect .relay/tunnel.log.')
    await writeFile(runtime, JSON.stringify({ gateway, processes }, null, 2), { mode: 0o600 })
    await writeFile('public/relay-config.json', JSON.stringify({ gateway }, null, 2) + '\n')
    console.log(`Gateway started: ${gateway}\nPublic configuration updated. Publish career-desk/public/relay-config.json to apply this URL to GitHub Pages.\nKeep Docker/n8n running and this Mac online with its lid open. Idle sleep is prevented while the gateway runs.`)
  } catch (error) {
    if (processes.length) await stop({ processes })
    throw error
  } finally { await lock.close(); await unlink('.relay/start.lock').catch(() => {}) }
}
if (action === 'start') await start()
else if (action === 'stop') { await stop(await state()); console.log('Website gateway and tunnel stopped. n8n and its data are unchanged.') }
else if (action === 'status') {
  const current = await state()
  console.log(current ? JSON.stringify({ gateway: current.gateway, processes: current.processes.map(item => ({ pid: item.pid, running: matches(item) })) }, null, 2) : 'Website relay is stopped.')
} else throw Error('Use start, stop, or status.')
