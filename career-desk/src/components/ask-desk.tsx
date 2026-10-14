"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { matchQuestion } from "@/lib/catalog"
import { profile } from "@/lib/profile"
import { RelayDesk } from "@/components/relay-desk"

const prompts = [
  "I have an interview next week for a platform role.",
  "Which open source project should I start with?",
  "I know Docker. What should I learn next?",
  "How do I talk about work my manager already understands, when nobody else does?",
]

export function AskDesk() {
  const searchParams = useSearchParams()
  const initialQuestion = (searchParams.get("q") ?? "").slice(0, 3000)
  return <QuestionDesk key={initialQuestion} initialQuestion={initialQuestion} />
}

function QuestionDesk({ initialQuestion }: { initialQuestion: string }) {
  const [question, setQuestion] = useState(initialQuestion)
  const [submitted, setSubmitted] = useState(initialQuestion.trim().length > 0)
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle")
  const matches = useMemo(() => submitted ? matchQuestion(question) : [], [question, submitted])
  const seen = matches.map((match) => match.title)
  const preview = [question.trim(), seen.length ? `\n\nRelated guides: ${seen.join(", ")}` : ""].join("")

  function submit(next = question) {
    setQuestion(next)
    setSubmitted(next.trim().length > 0)
    setCopyStatus("idle")
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(preview)
      setCopyStatus("copied")
    } catch {
      setCopyStatus("failed")
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Ask me</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Start with a question. Find your next step.</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Tell me what you need. Explore related guides, or send me your question and read my reply here.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <label className="block text-sm font-medium" htmlFor="question">
          What do you need guidance on?
        </label>
        <Textarea
          id="question"
          value={question}
          onChange={(event) => { setQuestion(event.target.value); setCopyStatus("idle"); setSubmitted(false) }}
          placeholder="Example: I can write a pipeline, but I freeze when the interviewer asks whether I would deploy it."
          rows={5}
          maxLength={3000}
        />
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="rounded-full border border-border bg-card px-3 py-1.5 text-left text-sm hover:bg-muted"
              onClick={() => submit(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
        <Button type="submit" size="lg">
          Look through the desk
        </Button>
      </form>

      <RelayDesk question={question} />

      {submitted ? (
        <section className="mt-10 space-y-4" aria-live="polite">
          <h2 className="font-serif text-2xl">
            {matches.length > 0 ? "Start with these" : "I do not have a page for that yet"}
          </h2>
          {matches.length === 0 ? (
            <p className="leading-7 text-muted-foreground">
              The library does not cover this in enough detail yet. You can copy your question below and contact me on LinkedIn.
            </p>
          ) : (
            <ul className="space-y-3">
              {matches.map((match) => (
                <li key={match.href} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                  <Badge variant="secondary">On the desk</Badge>
                  <h3 className="mt-2 font-serif text-xl">
                    <Link href={match.href} className="hover:underline">{match.title}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{match.dek}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="rounded-2xl bg-accent p-5">
            <h2 className="font-serif text-2xl">Continue on LinkedIn</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Copy this note, open my LinkedIn profile, and paste it into a message or connection request. This is an alternative if website messaging is offline. Replies to LinkedIn messages stay on LinkedIn.
            </p>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-background p-4 text-sm leading-6">{preview}</pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button nativeButton={false} render={<a href={profile.linkedin} target="_blank" rel="noreferrer" />} size="lg">
                Contact Anoop on LinkedIn
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={copyMessage}>
                {copyStatus === "copied" ? "Copied" : "Copy the message"}
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground" role="status">
              {copyStatus === "failed" ? "Copy is unavailable in this browser. Select the note above and copy it manually." : copyStatus === "copied" ? "Copied. Paste the note into LinkedIn when you are ready." : "This copied note is only sent when you choose to send it on LinkedIn."}
            </p>
          </div>

        </section>
      ) : null}

    </div>
  )
}
