import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { libraryGuides } from "@/content/library"

export const metadata: Metadata = {
  title: "Library",
  description: "Practical guides to DevOps, AI, CI/CD, Kubernetes, Docker, OpenShift, Argo CD, Spinnaker, and GitHub Actions.",
}

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Library</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Documents for people who have to operate the system.</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        Each note says what to learn, which decision matters, how to practice, and what an interviewer is listening for. They are starting points, not certifications.
      </p>
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
