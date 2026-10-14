import type { Guide } from "@/lib/types"

export const interviewGuides: Guide[] = [
  {
    slug: "yaml-judgment",
    kind: "interview",
    title: "The YAML question",
    dek: "An interviewer shows you a manifest and asks if you would deploy it. The useful answer is what you need to know before you say yes.",
    minutes: 8,
    eyebrow: "Interview prep",
    askPrompt: "Help me practice the interview question: an AI wrote this YAML. Would you deploy it?",
    takeaway: "Syntax is the start of the conversation. Production judgment is the rest.",
    sections: [
      {
        heading: "How the question arrives",
        paragraphs: [
          "You are shown a Kubernetes Deployment, a GitHub Actions workflow, or a Terraform plan. It looks tidy. The interviewer asks whether you would ship it.",
          "Read it. Name the fields you recognize. Then move to the missing facts.",
        ],
      },
      {
        heading: "What to ask before yes",
        paragraphs: ["Use a short list, and say it in your own order."],
        bullets: [
          "What changed, and who owns the service?",
          "Where did the image or module come from, and is it pinned?",
          "What proves it is ready, and what happens if that check is wrong?",
          "What identity does it run as, and what could that identity reach?",
          "What is the rollback, and has anyone used it?",
          "What must a person approve even if the file is valid?",
        ],
      },
      {
        heading: "How to practice",
        paragraphs: [
          "Take any sample manifest from the Kubernetes docs. Give yourself ten minutes. Write the questions you would ask, not a rewritten file. Then compare with the Kubernetes guide on this desk.",
          "If a friend can play interviewer, ask them to stay silent until you have said what you would refuse.",
        ],
      },
    ],
  },
  {
    slug: "tools-you-have-not-used",
    kind: "interview",
    title: "Tools you have not used",
    dek: "You will be asked about a system you have not operated. Prepare the honest sentence, then the adjacent experience.",
    minutes: 6,
    eyebrow: "Interview prep",
    askPrompt: "How do I answer interview questions about OpenShift, Spinnaker, or Argo CD if I have not run them in production?",
    takeaway: "Say what you have done. Then say how you would learn the unfamiliar tool without pretending.",
    sections: [
      {
        heading: "The honest sentence",
        paragraphs: [
          "I have not run OpenShift in production. I have run Kubernetes, and I understand that OpenShift adds stricter security defaults, Routes, and an opinion about builds. Here is how I would learn the difference on a real service before I changed anything.",
          "That sentence is stronger than a borrowed war story.",
        ],
      },
      {
        heading: "Map the unfamiliar tool to one you know",
        paragraphs: [
          "Argo CD maps to the question of desired state. Spinnaker maps to the question of promotion and approval. GitHub Actions maps to the question of what a credential can do. Docker maps to the question of what artifact you are about to trust.",
          "Study one guide on this desk for the tool you lack. Practice a local install or a careful reading of a public pipeline. In the interview, separate reading from operating.",
        ],
      },
      {
        heading: "What not to do",
        paragraphs: [
          "Do not invent an outage, a metric, or a title. Interviewers who have done the work can hear a borrowed scene. Talk about a decision you actually made, even if the system was small.",
        ],
      },
    ],
  },
  {
    slug: "one-week-plan",
    kind: "interview",
    title: "A one-week practice plan",
    dek: "Seven short sessions. Each one produces something you can say out loud.",
    minutes: 6,
    eyebrow: "Interview prep",
    askPrompt: "I have one week before interviews. What should I practice for a DevOps or platform role?",
    takeaway: "Practice decisions and explanations, not a pile of new tools.",
    sections: [
      {
        heading: "The week",
        paragraphs: ["Keep each session under an hour. Write four lines at the end."],
        bullets: [
          "Day 1. Draw one system you have worked on: build, deploy, observe, roll back.",
          "Day 2. Do the YAML question with a public manifest. List what you would need before deploying it.",
          "Day 3. Read the Kubernetes and Docker guides. Explain a probe and an image digest to a patient friend, or to a blank page.",
          "Day 4. Read either Argo CD or GitHub Actions, matching the role. Write the permission or sync decision you would not automate.",
          "Day 5. Prepare the tool you have not used. Honest sentence, adjacent experience, how you would learn it.",
          "Day 6. Write the visibility note for one piece of work: problem, constraint, decision, result.",
          "Day 7. Restate your Tuesday. Which role are you asking for, and what will you own?",
        ],
      },
      {
        heading: "After the week",
        paragraphs: [
          "If a gap is still sharp, send me the question from the ask desk. Tell me the role, the date if you have one, and which guide you already read. I would rather answer the missing piece than repeat the page.",
        ],
      },
    ],
  },
]
