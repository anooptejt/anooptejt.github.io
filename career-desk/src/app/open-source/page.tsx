import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ossProjects } from "@/content/oss"

export const metadata: Metadata = {
  title: "Open source",
  description: "Open source projects for DevOps and platform engineers, with a realistic first contribution.",
}

export default function OpenSourcePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Open source</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Join a project you can explain later.</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        A small, merged change is more useful to your career than a silent fork. Pick a project near the tools you want to be known for. Read the contributing guide before you open a pull request.
      </p>
      <ul className="mt-10 space-y-5">
        {ossProjects.map((project) => (
          <li key={project.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="font-serif text-2xl">{project.name}</h2>
            <p className="mt-2">{project.summary}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.why}</p>
            <p className="mt-3 text-sm leading-6"><span className="font-medium">First step. </span>{project.firstStep}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button nativeButton={false} render={<a href={project.repo} />} variant="outline" size="sm">Repository</Button>
              <Button nativeButton={false} render={<a href={project.contribute} />} variant="outline" size="sm">Contributing</Button>
              <Button nativeButton={false} render={<a href={project.issues} />} variant="outline" size="sm">Starter issues</Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button nativeButton={false} render={<Link href="/ask?q=Which%20open%20source%20project%20fits%20my%20background%3F" />} size="lg">
          Ask which project fits you
        </Button>
      </div>
    </div>
  )
}
