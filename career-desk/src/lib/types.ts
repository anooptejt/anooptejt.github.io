export type Section = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type Guide = {
  slug: string
  kind: "career" | "library" | "interview"
  title: string
  dek: string
  minutes: number
  eyebrow: string
  sections: Section[]
  takeaway: string
  askPrompt: string
}

export type OssProject = {
  slug: string
  name: string
  summary: string
  why: string
  firstStep: string
  repo: string
  contribute: string
  issues: string
}
