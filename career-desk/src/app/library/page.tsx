import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { libraryGuides } from "@/content/library"

export const metadata: Metadata = {
  title: "Library",
  description: "Writing and resources from Anoop Tej Thotapalli.",
}

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Library</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Library</h1>
      {libraryGuides.length === 0 && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl">No articles published yet.</h2>
          <p className="mt-3 text-muted-foreground">New writing from Anoop will appear here.</p>
          <Link href="/ask" className="mt-5 inline-block text-sm underline underline-offset-4">Have a question? Ask Anoop</Link>
        </div>
      )}
      <ul className="mt-10 space-y-4">
        {libraryGuides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/library/${guide.slug}`} className="block rounded-2xl bg-card p-5 ring-1 ring-foreground/10 hover:bg-accent">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl">{guide.title}</h2>
                <Badge variant="outline">{guide.minutes} min</Badge>
              </div>
              <p className="mt-2 text-muted-foreground">{guide.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
