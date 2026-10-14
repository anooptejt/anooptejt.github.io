import type { Metadata } from "next"
import Link from "next/link"
import { careerGuides } from "@/content/career"

export const metadata: Metadata = {
  title: "Career guidance",
  description: "Guidance on making work visible, choosing a next role, and keeping delivery decisions human.",
}

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Career guidance</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Come here when the work is real and the next step is not obvious.</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        These are the conversations I want people to associate with me: visibility, role choice, and judgment around AI. Read one. If your situation is more specific, ask me.
      </p>
      <ul className="mt-10 space-y-4">
        {careerGuides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/career/${guide.slug}`} className="block rounded-2xl bg-card p-5 ring-1 ring-foreground/10 hover:bg-accent">
              <h2 className="font-serif text-2xl">{guide.title}</h2>
              <p className="mt-2 text-muted-foreground">{guide.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
