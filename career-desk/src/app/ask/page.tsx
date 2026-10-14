import type { Metadata } from "next"
import { Suspense } from "react"
import { AskDesk } from "@/components/ask-desk"
import { profile } from "@/lib/profile"

export const metadata: Metadata = {
  title: "Ask me",
  description: "Ask about anything on your mind and get a personal reply from Anoop Tej.",
}

export default function AskPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-12"><h1 className="font-serif text-4xl">Ask Anoop Tej</h1><p className="mt-4">Explore the guides or <a href={profile.linkedin} className="underline">contact Anoop on LinkedIn</a>. Enable JavaScript to match your question to a guide.</p></div>}>
      <AskDesk />
    </Suspense>
  )
}
