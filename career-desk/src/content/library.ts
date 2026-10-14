import type { Guide } from "@/lib/types"

export const libraryGuides: Guide[] = [
  {
    slug: "devops",
    kind: "library",
    title: "DevOps",
    dek: "DevOps is the agreement between changing software and keeping it running. Learn one service end to end before you collect tools.",
    minutes: 8,
    eyebrow: "Library",
    askPrompt: "I want a practical DevOps path for my career, not a tool list.",
    takeaway: "If you can explain build, deploy, observe, and roll back for one service, you can learn the next tool on purpose.",
    sections: [
      {
        heading: "What you should be able to walk through",
        paragraphs: [
          "Pick a service you can talk about without slides. Say how code is reviewed, how an artifact is built, how it reaches an environment, how you know it is healthy, and how you undo it.",
          "That walkthrough is the job. Jenkins, GitHub Actions, Argo CD, Spinnaker, and Tekton are ways to hold the same agreement.",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "Do not add a platform because a conference made it sound current. Add it when the current path hides risk, repeats toil, or cannot show evidence.",
          "Write down what the new tool receives, who is allowed to change it, and what a human still approves.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Take a small application and put it through a pipeline you can read. Break the health check on purpose. Roll back. Write the four-line note from the career guide: problem, constraint, decision, result.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Expect a follow-up after every tool name: what failed, what you measured, and what you refused to automate. A calm story about a rollback is stronger than a list of logos.",
        ],
      },
    ],
  },
  {
    slug: "ai",
    kind: "library",
    title: "AI in delivery",
    dek: "Use AI where it reduces toil. Keep the outcome with a person who can explain the change.",
    minutes: 8,
    eyebrow: "Library",
    askPrompt: "Where should AI sit in a DevOps or platform career, and where should it stop?",
    takeaway: "Give the model a bounded task. Check the answer. A person approves anything that can reach users.",
    sections: [
      {
        heading: "Useful places to start",
        paragraphs: [
          "AI is already helpful for drafts: a pipeline sketch, a runbook paragraph, a first pass on a log summary, a test you still have to read. It is a poor owner of production authority.",
          "In a platform, the valuable pattern is retrieval plus a gate. The model sees the service, the diff, the policy, and similar past changes. A deterministic check and a person decide what happens next.",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "Ask what the model is allowed to do if it is wrong. If the answer is 'open a pull request,' design the identity, the branch rules, and the review. If the answer is 'change production,' you need a risk level, an approval, and a rollback before you let it act.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Take one repetitive task from your week. Write the prompt, the context you will allow, and the check that must pass before anyone uses the output. Keep a note of one time the suggestion was fluent and wrong.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Say the boundary out loud. Hiring managers remember the candidate who can explain why a generated manifest is not yet a deployment.",
        ],
      },
    ],
  },
  {
    slug: "cicd",
    kind: "library",
    title: "CI/CD",
    dek: "A pipeline is a sequence of evidence. Green is not the same as understood.",
    minutes: 7,
    eyebrow: "Library",
    askPrompt: "How do I get better at CI/CD in a way that shows up in interviews and at work?",
    takeaway: "Every stage should answer a question a reviewer could ask later.",
    sections: [
      {
        heading: "The questions a pipeline should answer",
        paragraphs: [
          "What commit is this? Did the tests that matter actually run? Was the artifact scanned and signed? Which environment received it? Who approved production? How do we know the new version is healthy? How do we return to the last good one?",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "Separate continuous integration from continuous delivery. Integration proves the change can be built and tested. Delivery decides where it may go. Teams get into trouble when a merge silently means production, and nobody can point to the approval.",
          "Promotion should be deliberate: dev, then a shared test environment, then production, with different permissions.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Draw your current pipeline from memory. Mark the stages that produce evidence and the stages that only save time. Add one missing check, or remove one stage nobody can explain.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Be ready to compare two tools without pretending they are religions. GitHub Actions, Jenkins, Tekton, and Spinnaker can all hold a good pipeline. The interviewer wants the controls, not the logo.",
        ],
      },
    ],
  },
  {
    slug: "kubernetes",
    kind: "library",
    title: "Kubernetes",
    dek: "Learn the objects you will be asked to defend, and the failure you will be asked to explain.",
    minutes: 9,
    eyebrow: "Library",
    askPrompt: "What Kubernetes knowledge is enough for a platform or DevOps interview?",
    takeaway: "A correct-looking manifest is not a reason to deploy it.",
    sections: [
      {
        heading: "The set to know cold",
        paragraphs: [
          "Pod, Deployment, Service, Ingress or Gateway, ConfigMap, Secret, Namespace, ServiceAccount, resource requests and limits, liveness and readiness probes, and what a rolling update does to traffic.",
          "Then the cluster pieces you do not manage every day, but must respect: the scheduler, the kubelet, etcd, and the fact that a node can disappear.",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "When someone hands you a manifest, ask what you would need before saying yes. Image provenance. Probes that match the real ready state. A memory limit that will not kill the process under ordinary load. A service account that is not cluster-admin. A rollback that does not depend on a person remembering a command at the wrong moment.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Run a local cluster. Deploy a small app. Break the readiness probe, watch the Service stop sending traffic, and fix it. Read one page of the Kubernetes docs for the object you just used, and one issue labeled good first issue if you want to contribute.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Practice saying 'I would not deploy this yet' and then listing the missing facts. Syntax is the easy part.",
        ],
      },
    ],
  },
  {
    slug: "docker",
    kind: "library",
    title: "Docker",
    dek: "An image is a build artifact with a history. Treat the tag, the user, and the contents as part of the release.",
    minutes: 6,
    eyebrow: "Library",
    askPrompt: "What should I know about Docker before I spend more time on Kubernetes?",
    takeaway: "If you cannot say what is inside the image and who it runs as, you are not ready to schedule it.",
    sections: [
      {
        heading: "What to be able to explain",
        paragraphs: [
          "A Dockerfile builds layers. A good one uses a small base, copies only what the process needs, pins versions, and runs as a user who is not root. The tag should point at an immutable digest in production, not at a floating latest.",
          "A container is a process with isolation, not a small virtual machine you patch by hand.",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "Before an image runs for users, know the base image's update path, the secrets that must not be baked in, the port and health check, and whether the registry is the one your platform trusts.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Build an image for a tiny service. Run it. Inspect the history. Rebuild with a non-root user. Push it to a registry you control, and deploy that digest, not a nickname.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Be ready for the difference between an image, a container, and a pod. Also be ready for why a multi-stage build exists: the compiler does not need to ship.",
        ],
      },
    ],
  },
  {
    slug: "openshift",
    kind: "library",
    title: "OpenShift",
    dek: "OpenShift is Kubernetes with stronger defaults. Learn which guardrails the platform already enforces, and which choices remain yours.",
    minutes: 7,
    eyebrow: "Library",
    askPrompt: "How is OpenShift different from Kubernetes for someone building a career in enterprise platforms?",
    takeaway: "Know the platform's security default, then say what your team still has to decide.",
    sections: [
      {
        heading: "What changes from plain Kubernetes",
        paragraphs: [
          "OpenShift and OKD add Routes, projects, a stricter security context, an integrated registry, and an opinion about who may run as root. Builds can happen on the cluster. Operators carry a lot of the platform.",
          "If you already know Kubernetes, do not relearn pods. Learn the constraints: restricted pod security, Routes versus Ingress, and how a developer asks for a change without becoming a cluster admin.",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "Enterprise teams adopt OpenShift because someone has to own identity, policy, and upgrades. Your value is showing which control belongs to the platform and which still belongs to the application team: probes, resources, release approval, and the meaning of ready.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Read the OKD documentation for Routes and security constraints. If you can use a cluster, deploy the same small app you used for Kubernetes and note what the platform rejected. That rejection is the lesson.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Say what you have operated and what you have only read. Then explain one default you would keep because it prevents a class of mistakes.",
        ],
      },
    ],
  },
  {
    slug: "argocd",
    kind: "library",
    title: "Argo CD",
    dek: "Git holds the desired state. The cluster is reconciled toward it. Drift is a fact you handle, not a surprise you ignore.",
    minutes: 7,
    eyebrow: "Library",
    askPrompt: "How should I learn Argo CD so I can talk about GitOps with judgment?",
    takeaway: "Auto-sync is a privilege for low risk. Production still needs a person and a rollback.",
    sections: [
      {
        heading: "What you should be able to show",
        paragraphs: [
          "An Application points at a repo, a path, and a cluster. Sync makes the cluster match Git. Health is not the same as sync. A diff tells you what would change. An AppProject limits where an app may land.",
          "Helm, Kustomize, and plain manifests can all be the source. Pick one and be able to read it.",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "Automatic sync is reasonable for a development namespace with a tight project allow-list. For production, decide what may sync itself, what needs a manual sync, and what a failed health check should do. Pruning can delete resources. Treat prune as a production decision, not a checkbox you discovered later.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Install Argo CD on a local cluster. Point it at a repo you control. Change a replica count in Git and watch the diff. Then change the cluster by hand and find the drift. Repair it from Git, not from memory.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Describe a change you would refuse to auto-sync: a database migration, a network policy, a secret, or anything you cannot roll back by reverting one commit.",
        ],
      },
    ],
  },
  {
    slug: "spinnaker",
    kind: "library",
    title: "Spinnaker",
    dek: "Spinnaker is a delivery control plane. The value is the pipeline judgment, not the number of cloud providers you can name.",
    minutes: 7,
    eyebrow: "Library",
    askPrompt: "Is Spinnaker still worth learning, and how should I talk about it in a career conversation?",
    takeaway: "A stage can bake and deploy. A person still decides whether the artifact is allowed to move.",
    sections: [
      {
        heading: "What it is for",
        paragraphs: [
          "Spinnaker models applications, pipelines, and cloud accounts. A pipeline can bake an image, run a deployment strategy, and gate the next stage on a judgment or a metric. It grew up in organizations that needed one delivery view across clouds.",
          "I spent years with it as a delivery tool. The part that stayed useful was not the screen. It was the habit of making promotion explicit.",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "If a team already has GitOps and a small cluster, Spinnaker may be more platform than they need. If a team promotes artifacts across accounts, regions, and manual approvals, a pipeline engine still earns its place. Say which world you are in before you recommend it.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Read one pipeline as a document: expected artifact, bake or find image, deploy, and a manual judgment stage. Explain what evidence each stage adds. If you contribute, start with documentation or a small provider test, not a rewrite of Orca.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Compare it with Argo CD without dismissing either. One is strong when Git is the desired state of Kubernetes. The other is strong when the release is a promoted artifact with stages and approvals. Many mature teams use more than one.",
        ],
      },
    ],
  },
  {
    slug: "github-actions",
    kind: "library",
    title: "GitHub Actions",
    dek: "A workflow is code with credentials. The career skill is knowing what that token can do.",
    minutes: 7,
    eyebrow: "Library",
    askPrompt: "What GitHub Actions skills should I show for a DevOps or platform role?",
    takeaway: "Least privilege on the workflow token matters as much as a green check.",
    sections: [
      {
        heading: "What to be able to read",
        paragraphs: [
          "A workflow has triggers, jobs, permissions, and steps. Reusable workflows and composite actions keep repetition down. Environments can hold protection rules and secrets. Concurrency can stop two production deploys from racing.",
          "Prefer GitHub's OIDC for cloud credentials over long-lived keys stored as secrets.",
        ],
      },
      {
        heading: "A decision that matters",
        paragraphs: [
          "A pull request from a fork should not receive your production secrets. Read the trigger. pin third-party actions to a commit SHA when the workflow can write to the repo or to cloud. Ask what happens if the workflow is changed in the same pull request that it runs.",
        ],
      },
      {
        heading: "Practice",
        paragraphs: [
          "Write a workflow that tests a small project, uploads an artifact, and stops. Then add a second workflow that deploys only from the default branch, with permissions set to the smallest scope that works. Remove any permission you cannot explain.",
        ],
      },
      {
        heading: "If you are interviewing",
        paragraphs: [
          "Bring one workflow you can annotate. Be ready to say which secret it can see, which branch can run it, and how you would revoke a cloud role.",
        ],
      },
    ],
  },
]
