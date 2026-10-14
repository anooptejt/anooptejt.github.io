import { notFound } from "next/navigation"
import { GuideView } from "@/components/guide-view"
import { getGuide } from "@/lib/catalog"
import type { Guide } from "@/lib/types"

export async function GuidePage({
  kind,
  params,
}: {
  kind: Guide["kind"]
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuide(kind, slug)
  if (!guide) notFound()
  return <GuideView guide={guide} />
}
