import { careerGuides } from "@/content/career"
import { interviewGuides } from "@/content/interview"
import { libraryGuides } from "@/content/library"
import { ossProjects } from "@/content/oss"
import type { Guide, OssProject } from "@/lib/types"

export const guides: Guide[] = [...careerGuides, ...libraryGuides, ...interviewGuides]

export function guideHref(guide: Guide) {
  if (guide.kind === "career") return `/career/${guide.slug}`
  if (guide.kind === "interview") return `/interview/${guide.slug}`
  return `/library/${guide.slug}`
}

export function getGuide(kind: Guide["kind"], slug: string) {
  return guides.find((guide) => guide.kind === kind && guide.slug === slug)
}

export type Match = {
  guide?: Guide
  project?: OssProject
  title: string
  href: string
  dek: string
}

export function matchQuestion(question: string): Match[] {
  const text = question.toLowerCase()
  const found: Match[] = []
  const seen = new Set<string>()

  if (/open source|contribute|good first/.test(text)) {
    const project = ossProjects.find((item) => text.includes(item.slug.replace("-", " ")) || text.includes(item.name.toLowerCase()))
    const pick = project ?? ossProjects[0]
    if (!seen.has("/open-source")) {
      found.unshift({
        project: pick,
        title: "Open source projects",
        href: "/open-source",
        dek: "Projects you can join, with a first step that is smaller than a rewrite.",
      })
      seen.add("/open-source")
    }
  }

  return found.slice(0, 3)
}
