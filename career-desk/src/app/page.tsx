import Image from "next/image"
import Link from "next/link"
import { ProfileLinks } from "@/components/profile-links"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { libraryGuides } from "@/content/library"
import { profile } from "@/lib/profile"

const doors = [
  {
    href: "/career",
    index: "01",
    title: "Career guidance",
    text: "How to make finished work visible, choose a next role, and keep AI inside a decision you can defend.",
  },
  {
    href: "/library",
    index: "02",
    title: "The tools, with judgment",
    text: "DevOps, AI, CI/CD, Kubernetes, Docker, OpenShift, Argo CD, Spinnaker, and GitHub Actions.",
  },
  {
    href: "/open-source",
    index: "03",
    title: "Open source you can join",
    text: "Projects with a first step smaller than a rewrite, so a contribution can become a story you own.",
  },
  {
    href: "/interview",
    index: "04",
    title: "Interview practice",
    text: "The YAML question, the tool you have not used, and a one-week plan.",
  },
]

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 lg:grid-cols-[1.3fr_0.7fr] lg:py-20">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={400}
              height={400}
              priority
              className="size-20 rounded-full object-cover ring-1 ring-foreground/10 sm:size-24"
            />
            <div>
              <p className="font-serif text-xl">{profile.name}</p>
              <ProfileLinks className="mt-1" />
            </div>
          </div>
          <Badge variant="secondary" className="mt-6">For people building a software career</Badge>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
            When the next step needs a person, start here.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            I am Anoop. I have spent more than 17 years on delivery platforms. This desk is where you come for career guidance, the systems you operate, and interview practice that asks for judgment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button nativeButton={false} render={<Link href="/career" />} size="lg">
              Start with career
            </Button>
            <Button nativeButton={false} render={<Link href="/ask" />} variant="outline" size="lg">
              Ask me a question
            </Button>
          </div>
        </div>
        <aside className="rounded-3xl bg-primary px-6 py-6 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.16em] text-primary-foreground/70">If the library stops</p>
          <p className="mt-3 font-serif text-3xl leading-tight">Send me the missing topic.</p>
          <p className="mt-3 text-sm leading-6 text-primary-foreground/85">
            Find a guide for your question, or send it to me for a personal reply here.
          </p>
          <Button nativeButton={false} render={<Link href="/ask" />} variant="secondary" className="mt-6" size="lg">
            Open the ask desk
          </Button>
        </aside>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-4 pb-8 sm:grid-cols-2">
        {doors.map((door) => (
          <Link key={door.href} href={door.href} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10 transition hover:bg-accent">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{door.index}</p>
            <h2 className="mt-2 font-serif text-2xl">{door.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{door.text}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-3xl">Read the tool the way an interviewer will ask about it</h2>
        <ul className="mt-6 divide-y divide-border rounded-2xl bg-card ring-1 ring-foreground/10">
          {libraryGuides.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/library/${guide.slug}`} className="flex flex-col gap-1 px-5 py-4 hover:bg-muted/60 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-medium">{guide.title}</span>
                <span className="text-sm text-muted-foreground sm:max-w-md sm:text-right">{guide.takeaway}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
