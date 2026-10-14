import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Guide } from "@/lib/types"

export function GuideView({ guide }: { guide: Guide }) {
  const askHref = `/ask?q=${encodeURIComponent(guide.askPrompt)}`
  const back =
    guide.kind === "career"
      ? { href: "/career", label: "Back to career" }
      : guide.kind === "interview"
        ? { href: "/interview", label: "Back to interview prep" }
        : { href: "/library", label: "Back to the library" }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{guide.eyebrow}</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">{guide.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{guide.dek}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="secondary">{guide.minutes} min read</Badge>
      </div>
      <div className="mt-10 space-y-10">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-2xl">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-[1.05rem] leading-7">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.bullets ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-7">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
      <aside className="mt-12 rounded-2xl bg-accent px-5 py-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Keep this</p>
        <p className="mt-2 font-serif text-2xl leading-snug">{guide.takeaway}</p>
      </aside>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href={askHref} />} size="lg">
          Ask for more on this
        </Button>
        <Button nativeButton={false} render={<Link href={back.href} />} variant="outline" size="lg">
          {back.label}
        </Button>
      </div>
    </article>
  )
}
