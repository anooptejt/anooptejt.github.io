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

const rules: { pattern: RegExp; slug: string; kind: Guide["kind"] }[] = [
  { pattern: /visib|promotion|credit|manager|resume|cv\b|portfolio/, slug: "make-the-work-visible", kind: "career" },
  { pattern: /which role|next role|sre|platform engineer|career path|mlops|what should i become/, slug: "choose-the-next-role", kind: "career" },
  { pattern: /accountab|human gate|guardrail|where ai|bounded/, slug: "keep-the-decision-human", kind: "career" },
  { pattern: /yaml|manifest|would you deploy/, slug: "yaml-judgment", kind: "interview" },
  { pattern: /have not used|haven't used|never used|unfamiliar|not run/, slug: "tools-you-have-not-used", kind: "interview" },
  { pattern: /one week|interview plan|practice plan|prep/, slug: "one-week-plan", kind: "interview" },
  { pattern: /interview/, slug: "yaml-judgment", kind: "interview" },
  { pattern: /openshift|okd/, slug: "openshift", kind: "library" },
  { pattern: /argo/, slug: "argocd", kind: "library" },
  { pattern: /spinnaker|halyard/, slug: "spinnaker", kind: "library" },
  { pattern: /github action|workflow|oidc/, slug: "github-actions", kind: "library" },
  { pattern: /kubernetes|\bk8s\b|kubectl|probe/, slug: "kubernetes", kind: "library" },
  { pattern: /docker|container image|dockerfile/, slug: "docker", kind: "library" },
  { pattern: /ci\/?cd|pipeline|jenkins|tekton/, slug: "cicd", kind: "library" },
  { pattern: /\bai\b|llm|agent|copilot|model/, slug: "ai", kind: "library" },
  { pattern: /devops|delivery/, slug: "devops", kind: "library" },
  { pattern: /open source|contribute|good first/, slug: "devops", kind: "library" },
]

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

  for (const rule of rules) {
    if (!rule.pattern.test(text)) continue
    const guide = getGuide(rule.kind, rule.slug)
    if (!guide) continue
    const href = guideHref(guide)
    if (seen.has(href)) continue
    seen.add(href)
    found.push({ guide, title: guide.title, href, dek: guide.dek })
  }

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
