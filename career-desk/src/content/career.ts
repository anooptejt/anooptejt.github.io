import type { Guide } from "@/lib/types"

export const careerGuides: Guide[] = [
  {
    slug: "make-the-work-visible",
    kind: "career",
    title: "Make the work visible",
    dek: "Delivery is not the same as being understood. Give the work a context someone else can repeat.",
    minutes: 7,
    eyebrow: "Career guidance",
    askPrompt: "How do I talk about work I already did without making it sound like self-promotion?",
    takeaway: "Work has no voice until someone gives it context.",
    sections: [
      {
        heading: "Start from a room that did not know your name",
        paragraphs: [
          "Early in a career it is common to take the unglamorous work, deliver it, and assume people will notice. Sometimes they do. Sometimes a room discusses the outcome and does not know who made it possible.",
          "That is not a reason to perform. It is a reason to write the context down while it is still true: what was stuck, what you changed, what evidence showed it worked, and what you would not do again.",
        ],
      },
      {
        heading: "A note someone else can use",
        paragraphs: [
          "Keep the note short enough to say in a meeting. Four lines are enough.",
        ],
        bullets: [
          "The problem, in the words a user or a teammate would use.",
          "The constraint you were not allowed to ignore.",
          "The decision you made, and the option you rejected.",
          "The result: a time, a risk removed, a rollback that worked, a person who could now do it without you.",
        ],
      },
      {
        heading: "Where to say it",
        paragraphs: [
          "Use the note in a design review, a promotion packet, a pull request description, and a one-to-one. The same facts should survive being told by your manager when you are not in the room.",
          "If the only record is in your head, the work is still invisible.",
        ],
      },
    ],
  },
  {
    slug: "choose-the-next-role",
    kind: "career",
    title: "Choose the next role",
    dek: "DevOps, SRE, platform, and MLOps overlap. Pick the work you want to be accountable for on a Tuesday.",
    minutes: 8,
    eyebrow: "Career guidance",
    askPrompt: "I am unsure whether to aim at DevOps, SRE, platform engineering, or an AI-related role.",
    takeaway: "Choose the accountability, then learn the tools that serve it.",
    sections: [
      {
        heading: "Name the Tuesday",
        paragraphs: [
          "Job titles move. The useful question is what you want to own when something is ordinary, not when a slide is being presented.",
          "A delivery engineer owns how a change gets from a merge to a running service, including the evidence and the rollback. An SRE owns the reliability of a service the business already depends on. A platform engineer owns a path other teams can use without opening a ticket for every environment. An MLOps or AI-platform role owns how a model or an agent is promoted, observed, and stopped.",
        ],
      },
      {
        heading: "A practical way to choose",
        paragraphs: [
          "Look at the last three problems you enjoyed finishing. If they were pipelines, artifacts, and release notes, stay close to CI/CD. If they were alerts, budgets, and user impact, look at SRE. If they were golden paths, templates, and policy, look at platform engineering. If they were evaluations, data, and human approval around a model, look at AI in delivery.",
          "You can learn Kubernetes in all four. The tool does not choose the role.",
        ],
      },
      {
        heading: "What to show a hiring manager",
        paragraphs: [
          "Show one system you can draw: source, build, deploy, observe, roll back. Say which part you owned and which part you would ask for help with. Honesty about the edge is more useful than a long tool list.",
        ],
      },
    ],
  },
  {
    slug: "keep-the-decision-human",
    kind: "career",
    title: "Keep the decision human",
    dek: "AI can draft, correlate, and suggest. Someone still has to own the outcome.",
    minutes: 6,
    eyebrow: "Career guidance",
    askPrompt: "How should I talk about AI in my delivery work without sounding like I handed production to a model?",
    takeaway: "Put AI in a bounded step. Leave policy, approval, and execution with people and deterministic checks.",
    sections: [
      {
        heading: "Capability is not a workflow",
        paragraphs: [
          "A model can read logs, draft Terraform, suggest a pipeline, and propose a remediation. That does not mean it should decide that a change is safe.",
          "When you describe your work, say where the model entered, what context it was given, what checked the answer, and where a person had to say yes.",
        ],
      },
      {
        heading: "A shape you can reuse",
        paragraphs: ["For any AI-assisted change, be ready to walk this order."],
        bullets: [
          "Detect the problem and confirm the impact.",
          "Assemble context you trust: the diff, the service, the policy, the last known good release.",
          "Give the model a bounded question.",
          "Validate the recommendation with a deterministic check: plan, policy, test, or scan.",
          "Pass a human gate for anything that can hurt users, data, or cost.",
          "Execute, verify, and keep a rollback.",
        ],
      },
      {
        heading: "In a career conversation",
        paragraphs: [
          "Interviewers and managers are listening for judgment. Tell them what you would refuse to automate. A person who can say no to a confident suggestion is easier to trust with production.",
        ],
      },
    ],
  },
]
