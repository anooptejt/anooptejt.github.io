import type { Metadata } from "next"
import Link from "next/link"
import { interviewGuides } from "@/content/interview"

export const metadata: Metadata = {
  title: "Interview prep",
  description: "Practice options for DevOps and platform interviews: the YAML question, unfamiliar tools, and a one-week plan.",
}

export default function InterviewPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Interview prep</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Practice the judgment, then the tools.</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        Pick one option. Do it out loud. If you want a question that is specific to your role, send it to me.
      </p>
      <ul className="mt-10 space-y-4">
        {interviewGuides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/interview/${guide.slug}`} className="block rounded-2xl bg-card p-5 ring-1 ring-foreground/10 hover:bg-accent">
              <h2 className="font-serif text-2xl">{guide.title}</h2>
              <p className="mt-2 text-muted-foreground">{guide.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
