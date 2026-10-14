# Temporary website messaging

The public GitHub Pages site calls a narrow HTTPS gateway on this Mac. The gateway calls the existing private n8n Human Relay, which forwards questions to the configured Telegram owner. Quoted Telegram replies are polled back into the visitor's browser. No AI model is used.

## Current operation

Run from the local project directory:

```sh
npm run relay:status
npm run relay:stop
npm run relay:start
```

Keep Docker, n8n, the gateway and tunnel running, with the Mac online and its lid open. The startup script prevents idle sleep while the gateway runs; it does not provide availability during lid closure, logout, reboot or a network outage. Gateway processes are detached from the terminal. The stop command stops only this gateway, tunnel and sleep assertion. It leaves n8n and its Docker volume intact.

Cloudflare Quick Tunnels have a temporary hostname. Every fresh start writes the new URL to `public/relay-config.json`. Publish that file in the parent site's `career-desk/` source and wait for the GitHub Pages deployment before expecting the public site to reconnect. Existing browser sessions remain valid across gateway restarts as long as the signing key is preserved. Runtime logs and PIDs are in `.relay/`.

To stop accepting website messages immediately, run `npm run relay:stop`. Existing queued messages may still be processed by n8n. The static guides and LinkedIn links remain available.

## Private local configuration

`.relay/` is ignored by Git. It contains the verified tunnel client, process logs, a persistent random signing key, and `config.json`. The configuration references the original private relay API-key file; no copy is embedded in the frontend. Do not publish this folder or its logs. Do not delete the n8n Docker volume.

A new machine needs Node 22.13+, the existing Human Relay installation and key, and the official `cloudflared` executable at `.relay/bin/cloudflared`. Create `.relay/config.json` with `port: 38473`, an absolute `apiKeyFile`, and `origins` containing `https://anooptejt.github.io` (plus local preview origins if needed). Generate `.relay/signing-key.txt` from at least 32 random bytes and restrict both files to mode 0600. Preserve the signing key when migrating if existing visitor access should survive.

## Boundaries and limitations

- n8n remains bound to 127.0.0.1:5678. Only the gateway at 127.0.0.1:38473 is tunneled. It exposes session creation, question submission, and scoped reply retrieval. It cannot proxy the n8n editor or arbitrary endpoints.
- HTTPS protects browser traffic. The shared n8n API key stays on the backend. A signed, 30-day anonymous visitor capability supplies the trusted `user_id`; callers cannot select another user's identity. It authenticates possession of that browser session, not a verified person or account.
- The browser stores its own bearer token, questions, replies and cursor. Keep that token private. Shared devices and scripts running on the same GitHub Pages origin can access local storage. Clearing browser data loses access; sessions have no account recovery. Up to 20 questions are retained per browser.
- CORS allows the configured site origins; it is not an authentication boundary against scripts outside browsers. Message, session and IP rate limits limit casual abuse, with a global limit of 60 submissions per hour. Counters reset on gateway restart. This is a temporary public prototype, not hardened hosting.
- Question IDs are persisted before POST and reused on uncertain retries. A queued response is distinct from Telegram acceptance. Unknown deliveries are never blindly re-sent. Replies are deduplicated by stable cursor and saved together with that cursor.
- n8n stores messages and replies in its existing SQLite database with no automatic retention deletion. Gateway logs do not record message bodies or credentials.
- Reply to the specific forwarded message using Telegram's quoted Reply action. Ordinary unquoted messages cannot identify a website conversation. Only the configured owner can reply.

Run `npm run test:gateway` for HTTP boundary tests. The n8n relay's existing routing tests remain with its original installation. `npm test` also lints, builds the static site, and checks exported paths. Future always-online deployment should add durable abuse controls, account/recovery decisions, monitoring, backups and a stable hostname.
