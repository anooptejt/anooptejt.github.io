import type { Metadata } from "next"
import { Suspense } from "react"
import { GuidePage } from "@/components/guide-page"
import { libraryGuides } from "@/content/library"
import { getGuide } from "@/lib/catalog"

export const dynamicParams = false

export function generateStaticParams() {
  return libraryGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide("library", slug)
  if (!guide) return {}
  return { title: guide.title, description: guide.dek }
}

export default function LibraryGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="mx-auto max-w-3xl px-4 py-12 text-muted-foreground">Opening the guide.</p>}>
      <GuidePage kind="library" params={params} />
    </Suspense>
  )
}
