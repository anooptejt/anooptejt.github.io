"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { basePath } from "@/lib/site"
import { profile } from "@/lib/profile"

type Reply = { cursor: number; text: string; created_at: string }
type Conversation = { client_message_id: string; display_name: string; message: string; conversation_id?: string; status: string; replies: Reply[]; cursor: number }
type Saved = { token: string; expires_at: number; conversations: Conversation[] }
const STORAGE = "anoop-human-relay-v1"
const labels: Record<string, string> = {
  pending: "Not confirmed yet. Retry below to check or send this same question.",
  queued: "Queued. Waiting to be forwarded to Anoop.",
  sending: "Forwarding to Anoop…",
  awaiting_reply: "Delivered to Anoop’s Telegram. Waiting for his reply.",
  answered: "Anoop replied.",
  failed: "Delivery failed. Please contact Anoop on LinkedIn.",
  delivery_unknown: "Delivery could not be confirmed. Please wait or contact Anoop on LinkedIn.",
}

function read(): Saved | null {
  const value = localStorage.getItem(STORAGE)
  return value ? JSON.parse(value) : null
}

export function RelayDesk({ question }: { question: string }) {
  const [endpoint, setEndpoint] = useState("")
  const [saved, setSaved] = useState<Saved | null>(null)
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const busyRef = useRef(false)
  const endpointRef = useRef("")

  const save = useCallback((value: Saved) => {
    localStorage.setItem(STORAGE, JSON.stringify(value))
    setSaved(value)
  }, [])
  const update = useCallback((conversation: Conversation) => {
    const current = read()
    if (!current) throw Error("Your visitor session is missing. Reload this page.")
    const index = current.conversations.findIndex(item => item.client_message_id === conversation.client_message_id)
    if (index < 0) current.conversations.unshift(conversation)
    else current.conversations[index] = conversation
    save(current)
  }, [save])
  async function request(path: string, token?: string, body?: unknown) {
    const response = await fetch(`${endpointRef.current}${path}`, {
      method: body === undefined ? "GET" : "POST",
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      signal: AbortSignal.timeout(20_000), cache: "no-store", credentials: "omit",
    })
    const data = await response.json()
    if (!response.ok) throw Error(data.error || "Messaging is unavailable. Please try again later.")
    return data
  }

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    async function init() {
      try {
        localStorage.setItem(`${STORAGE}-check`, "1")
        localStorage.removeItem(`${STORAGE}-check`)
        const current = read()
        if (!cancelled) setSaved(current)
        const response = await fetch(`${basePath}/relay-config.json`, { cache: "no-store", signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]) })
        if (!response.ok) throw Error("Messaging is not available yet. Please use LinkedIn.")
        const config = await response.json()
        const url = new URL(config.gateway)
        if (url.protocol !== "https:" || url.pathname !== "/" || url.username || url.password || url.search || url.hash) throw Error("Messaging is not configured. Please use LinkedIn.")
        if (!cancelled) { endpointRef.current = url.origin; setEndpoint(url.origin); setReady(true) }
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error && !["TypeError", "TimeoutError"].includes(cause.name) ? cause.message : "Messaging is offline. Please try again later or use LinkedIn. Browser storage is needed to receive replies.")
      }
    }
    void init()
    return () => { cancelled = true; controller.abort() }
  }, [])

  useEffect(() => {
    if (!endpoint) return
    let stopped = false
    let timer: ReturnType<typeof setTimeout>
    async function poll() {
      try {
        if (!document.hidden && !busyRef.current) {
          const current = read()
          if (current && current.expires_at <= Date.now()) throw Error("Your 30-day visitor session has expired. Your saved replies remain below. Use LinkedIn for follow-up.")
          for (const conversation of current?.conversations ?? []) {
            if (stopped || !conversation.conversation_id || conversation.status === "failed") continue
            const data = await request(`/v1/conversations/${conversation.conversation_id}/replies?after=${conversation.cursor}`, current!.token)
            if (stopped) return
            // Store replies and cursor together before the next request; stable IDs deduplicate retries.
            const latest = read()?.conversations.find(item => item.client_message_id === conversation.client_message_id)
            if (!latest) continue
            const replies = [...new Map([...latest.replies, ...data.replies].map(reply => [reply.cursor, reply])).values()]
            update({ ...latest, status: data.status, replies, cursor: Math.max(latest.cursor, data.next_cursor) })
          }
          if (!stopped && current?.conversations.some(item => item.conversation_id)) setError("")
        }
      } catch (cause) {
        if (!stopped) setError(cause instanceof Error && cause.name === "Error" ? cause.message : "Messaging is offline. Your question and saved replies are kept in this browser. Reconnecting automatically…")
      } finally {
        if (!stopped) timer = setTimeout(poll, 5000)
      }
    }
    void poll()
    return () => { stopped = true; clearTimeout(timer) }
  }, [endpoint, update])

  async function send(retry?: Conversation) {
    if (busyRef.current || !ready) return
    busyRef.current = true; setBusy(true); setError("")
    try {
      let current = read()
      if (current && current.expires_at <= Date.now()) throw Error("Your visitor session expired. Please use LinkedIn for follow-up.")
      if (!current) {
        const session = await request("/v1/session", undefined, {})
        current = { ...session, conversations: [] }
        save(current!)
      }
      if (!retry && current!.conversations.length >= 20) throw Error("This browser has reached its 20-question limit. Please use LinkedIn for further questions.")
      const conversation: Conversation = retry ?? { client_message_id: crypto.randomUUID(), display_name: name.trim() || "Website visitor", message: question.trim(), status: "pending", replies: [], cursor: 0 }
      // Save the request ID before network activity. An uncertain POST always retries with this ID.
      update(conversation)
      const result = await request("/v1/conversations", current!.token, { client_message_id: conversation.client_message_id, display_name: conversation.display_name, message: conversation.message })
      update({ ...conversation, conversation_id: result.conversation_id, status: result.status })
    } catch (cause) {
      setError(cause instanceof Error && cause.name === "Error" ? cause.message : "Could not confirm sending. Use Retry below for this question; it will not create a duplicate.")
    } finally { busyRef.current = false; setBusy(false) }
  }

  const pending = saved?.conversations.some(item => !item.conversation_id)
  return <section className="mt-8 rounded-2xl border border-border bg-card p-5" aria-labelledby="message-heading">
    <h2 id="message-heading" className="font-serif text-2xl">Send your question to Anoop</h2>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">I receive your question on Telegram and reply here personally. This is not an AI answer. Messaging is available while my local service is online; replies may take time.</p>
    <label htmlFor="visitor-name" className="mt-4 block text-sm font-medium">Your name (optional)</label>
    <input id="visitor-name" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2" value={name} maxLength={80} onChange={event => setName(event.target.value.replace(/[\r\n]/g, ""))} placeholder="How should I address you?" autoComplete="given-name" />
    <Button className="mt-4" size="lg" disabled={!ready || busy || !question.trim() || !!pending} onClick={() => void send()}>{busy ? "Sending…" : "Send question to Anoop"}</Button>
    <p className="mt-3 text-xs leading-5 text-muted-foreground">Your question and reply are stored by the relay and in this browser. Return here using the same browser to read replies. Clearing browser data loses access. Please leave out passwords and other sensitive information.</p>
    {error && <p role="alert" className="mt-4 text-sm leading-6">{error} <a href={profile.linkedin} className="underline" target="_blank" rel="noreferrer">Contact Anoop on LinkedIn</a>.</p>}
    {!!saved?.conversations.length && <div className="mt-6 space-y-4"><h3 className="font-serif text-xl">Your conversations</h3>{saved.conversations.map(item => <article key={item.client_message_id} className="rounded-xl border border-border bg-background p-4">
      <p className="text-xs text-muted-foreground">You{item.display_name !== "Website visitor" ? ` · ${item.display_name}` : ""}</p>
      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6">{item.message}</p>
      <p role="status" className="mt-3 text-xs text-muted-foreground">{labels[item.status] ?? "Checking delivery…"}</p>
      {!item.conversation_id && <Button className="mt-3" variant="outline" disabled={busy || !ready} onClick={() => void send(item)}>Retry this question</Button>}
      {item.replies.map(reply => <div key={reply.cursor} className="mt-4 rounded-lg bg-accent p-3"><p className="text-xs font-medium">Anoop</p><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6">{reply.text}</p></div>)}
    </article>)}</div>}
  </section>
}
