import type { Metadata } from "next"
import { Suspense } from "react"
import { GuidePage } from "@/components/guide-page"
import { careerGuides } from "@/content/career"
import { getGuide } from "@/lib/catalog"

export const dynamicParams = false

export function generateStaticParams() {
  return careerGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide("career", slug)
  if (!guide) return {}
  return { title: guide.title, description: guide.dek }
}

export default function CareerGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="mx-auto max-w-3xl px-4 py-12 text-muted-foreground">Opening the guide.</p>}>
      <GuidePage kind="career" params={params} />
    </Suspense>
  )
}
