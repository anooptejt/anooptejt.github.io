import Image from "next/image"
import Link from "next/link"
import { ProfileLinks } from "@/components/profile-links"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/profile"

const doors = [
  {
    href: "/career",
    index: "01",
    title: "Career guidance",
    text: "No articles published yet. New writing will appear here.",
  },
  {
    href: "/library",
    index: "02",
    title: "Library",
    text: "No articles published yet. New writing will appear here.",
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
    text: "No articles published yet. New writing will appear here.",
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
          <Badge variant="secondary" className="mt-6">Ask about anything</Badge>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
            When the next step needs a person, start here.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            I am Anoop. Bring me whatever is on your mind: life, work, learning, technology, or an idea you want to explore. I will share what I know, help you think it through, or point you toward a useful next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button nativeButton={false} render={<Link href="/ask" />} size="lg">
              Ask me a question
            </Button>
            <Button nativeButton={false} render={<Link href="/library" />} variant="outline" size="lg">
              Visit the library
            </Button>
          </div>
        </div>
        <aside className="rounded-3xl bg-primary px-6 py-6 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.16em] text-primary-foreground/70">A conversation starts here</p>
          <p className="mt-3 font-serif text-3xl leading-tight">Your question does not need a category.</p>
          <p className="mt-3 text-sm leading-6 text-primary-foreground/85">
            A question about everyday life, a difficult choice, a new interest, or something entirely different. Send it to me for a personal reply here.
          </p>
          <Button nativeButton={false} render={<Link href="/ask" />} variant="secondary" className="mt-6" size="lg">
            Open the ask desk
          </Button>
        </aside>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-4 pb-8 sm:grid-cols-2" aria-labelledby="current-guides">
        <div className="sm:col-span-2">
          <h2 id="current-guides" className="font-serif text-3xl">Explore the sections</h2>
          <p className="mt-2 text-muted-foreground">New writing will appear here as I add it. Your questions can go anywhere.</p>
        </div>
        {doors.map((door) => (
          <Link key={door.href} href={door.href} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10 transition hover:bg-accent">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{door.index}</p>
            <h2 className="mt-2 font-serif text-2xl">{door.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{door.text}</p>
          </Link>
        ))}
      </section>


    </div>
  )
}
