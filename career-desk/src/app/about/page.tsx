import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ProfileLinks } from "@/components/profile-links"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/profile"

export const metadata: Metadata = {
  title: "About",
  description: "Career guidance, interview preparation, open source, and practical engineering guides from Anoop Tej Thotapalli.",
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">About this desk</p>
      <div className="mt-6 flex items-center gap-4">
        <Image
          src={profile.photo}
          alt={profile.name}
          width={400}
          height={400}
          className="size-24 rounded-full object-cover ring-1 ring-foreground/10"
        />
        <div>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Hello, I am Anoop.</h1>
          <ProfileLinks className="mt-3" />
        </div>
      </div>
      <div className="mt-6 space-y-4 text-[1.05rem] leading-8">
        <p>
          I am Anoop Tej Thotapalli, a father and an engineer. I have spent more than 17 years on delivery, cloud-native platforms, and the judgment around AI in that work.
        </p>
        <p>
          Come here for career guidance, interviews, open source, and the documents on DevOps, CI/CD, Kubernetes, Docker, OpenShift, Argo CD, Spinnaker, GitHub Actions, and AI in delivery.
        </p>
        <p>
          The pages are a starting point. When you need something they do not cover, use Ask me to find related guides or send your question for a personal reply. LinkedIn is also available. I would rather receive a specific question than guess which topic to write next.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href="/ask" />} size="lg">Ask a question</Button>
        <Button nativeButton={false} render={<a href="https://anooptejt.github.io/" />} variant="outline" size="lg">Engineering site</Button>
      </div>
    </article>
  )
}
