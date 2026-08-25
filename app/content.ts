export type Publication = {
  featured?: boolean;
  topic: string;
  date: string;
  publishedAt: string;
  title: string;
  text: string;
  links: Array<{ label: string; href: string }>;
};

export const publications: Publication[] = [
  {
    featured: true,
    topic: "Responsible AI",
    date: "July 2026",
    publishedAt: "2026-07-02",
    title: "Your AI Chat Is Private Until the Moment You Share It",
    text: "A practical look at how shared AI conversations become public pages, and how teams can exchange useful knowledge without exposing raw chat history.",
    links: [
      {
        label: "Read on Medium",
        href: "https://anoopt0106.medium.com/your-ai-chat-is-private-until-the-moment-you-share-it-7dec1a8c81da",
      },
      {
        label: "Read on LinkedIn",
        href: "https://www.linkedin.com/pulse/your-ai-chat-private-until-moment-you-share-anooptej-thotapalli-dyjhc",
      },
    ],
  },
  {
    featured: true,
    topic: "DevOps practice",
    date: "July 2026",
    publishedAt: "2026-07-01",
    title: "DevOps Is Not Just Tools: Learning the Tool vs Practising the Job",
    text: "Why certifications open the door, while architecture thinking, ownership, release judgement and recovery planning build real capability.",
    links: [
      {
        label: "Read on Medium",
        href: "https://medium.com/towards-artificial-intelligence/devops-is-not-just-tools-learning-the-tool-vs-practising-the-job-4f7fa252b883",
      },
      {
        label: "Read on LinkedIn",
        href: "https://www.linkedin.com/pulse/devops-just-tools-learning-tool-vs-practising-job-anooptej-thotapalli-jmljc",
      },
    ],
  },
  {
    topic: "Education",
    date: "June 2026",
    publishedAt: "2026-06-02",
    title: "Are We Feeding Our Children Intellectual Junk Food, And Calling It Progress?",
    text: "A reflection on micro-learning, deep education and the quiet erosion of our capacity to think difficult things through.",
    links: [
      {
        label: "Read on Medium",
        href: "https://anoopt0106.medium.com/are-we-feeding-our-children-intellectual-junk-food-and-calling-it-progress-28398ef7f7cb",
      },
    ],
  },
  {
    topic: "Education",
    date: "June 2026",
    publishedAt: "2026-06-01",
    title: "Why I Chose IB for My Kids Even Though I Grew Up in the Indian Curriculum System",
    text: "A personal perspective on choosing an education model around curiosity, application and learning how to think.",
    links: [
      {
        label: "Read on Medium",
        href: "https://anoopt0106.medium.com/why-i-chose-ib-for-my-kids-even-though-i-grew-up-in-the-indian-curriculum-system-3f02d57c8c37",
      },
      {
        label: "Read on LinkedIn",
        href: "https://www.linkedin.com/pulse/why-i-chose-ib-my-kids-even-though-grew-up-indian-anooptej-thotapalli-xmpac",
      },
    ],
  },
  {
    featured: true,
    topic: "Agentic operations",
    date: "April 2026",
    publishedAt: "2026-04-01",
    title: "When AI Stopped Watching and Started Acting",
    text: "How DevOps is moving from reactive observation toward predictive, context-aware and carefully governed action.",
    links: [
      {
        label: "Read on Medium",
        href: "https://medium.com/towards-agentic-ai/when-ai-stopped-watching-and-started-acting-c6aa1d646683",
      },
    ],
  },
  {
    topic: "AIOps",
    date: "January 2026",
    publishedAt: "2026-01-01",
    title: "From Red Alerts to Green Lights: A DevOps Engineer’s Journey with AI",
    text: "A practitioner’s journey from late-night incident response toward systems that diagnose, recommend and recover with human oversight.",
    links: [
      {
        label: "Read on Medium",
        href: "https://medium.com/towards-agentic-ai/from-red-alerts-to-green-lights-a-devops-engineers-journey-with-ai-8dd51ac9d997",
      },
    ],
  },
  {
    topic: "Spinnaker",
    date: "February 2021",
    publishedAt: "2021-02-02",
    title: "Integrate AWS ECS with Spinnaker",
    text: "A technical guide to connecting an AWS ECS delivery target with a Spinnaker deployment workflow.",
    links: [
      {
        label: "Read on Medium",
        href: "https://anoopt0106.medium.com/integrate-aws-ecs-with-spinnaker-99b53e5da9d6",
      },
    ],
  },
  {
    topic: "Spinnaker",
    date: "February 2021",
    publishedAt: "2021-02-01",
    title: "How to Integrate AWS with Spinnaker",
    text: "A foundational walkthrough for configuring AWS services as part of a Spinnaker continuous-delivery environment.",
    links: [
      {
        label: "Read on Medium",
        href: "https://anoopt0106.medium.com/how-to-integrate-aws-with-spinnaker-8a5c9652dc8f",
      },
    ],
  },
].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

export const fieldNotes = [
  {
    title: "Old-School Log Analysis Challenge",
    topic: "Troubleshooting",
    href: "https://www.linkedin.com/posts/anooptej-thotapalli-a3754b77_devops-sre-troubleshooting-activity-7483860873472598016-PzKj",
  },
  {
    title: "AI Finds Vulnerabilities, But Who Governs the Fix?",
    topic: "AI governance",
    href: "https://www.linkedin.com/posts/anooptej-thotapalli-a3754b77_agenticai-cybersecurity-devsecops-activity-7483425681456906240-6eAC",
  },
  {
    title: "Micro-Learning vs Foundational Education in the Future of Work",
    topic: "Learning",
    href: "https://www.linkedin.com/posts/anooptej-thotapalli-a3754b77_continuouslearning-techleadership-futureofwork-activity-7470167960192512000-RX4R",
  },
  {
    title: "The Hidden Complexity of Platform Simplicity",
    topic: "Platform engineering",
    href: "https://www.linkedin.com/posts/anooptej-thotapalli-a3754b77_devops-platformengineering-gitops-activity-7465043580512780289-0AWh",
  },
  {
    title: "TOON: A Game-Changer for LLMs and Multi-Agent Systems",
    topic: "AI engineering",
    href: "https://www.linkedin.com/posts/anooptej-thotapalli-a3754b77_aiengineering-multiagentsystems-promptoptimization-activity-7394781288957698048-XVxx",
  },
];

export const appearances = [
  {
    type: "Conference session",
    year: "2021",
    title: "Deploy Spinnaker CD Pipelines in Kubernetes",
    text: "OSCONF session within a full-day cloud-native engineering conference.",
    href: "https://www.youtube.com/watch?v=gbJvMcVgPkg",
    action: "Watch full conference",
  },
  {
    type: "Speaker introduction",
    year: "2021",
    title: "OSCONF 2021: Anooptej Thotapalli",
    text: "A short introduction to the conference session and its focus.",
    href: "https://www.youtube.com/watch?v=5PZspd6eI-o",
    action: "Watch on YouTube",
  },
  {
    type: "Webinar",
    year: "Archive",
    title: "Integrating Jenkins and Spinnaker to Gain the Best of Both Worlds",
    text: "Connecting established CI workflows with progressive continuous delivery.",
    href: "https://www.opsmx.com/webinars/integrating-jenkins-and-spinnaker-to-gain-the-best-of-both-worlds/",
    action: "View webinar",
  },
  {
    type: "Webinar",
    year: "Archive",
    title: "Blue-Green Deployments into AWS EKS Using Spinnaker",
    text: "Designing safer Kubernetes releases with controlled traffic transition.",
    href: "https://www.opsmx.com/webinars/simplifying-deployments-with-a-blue-green-strategy-on-spinnaker/",
    action: "View webinar",
  },
  {
    type: "Webinar",
    year: "Archive",
    title: "ArgoCD for Continuous Delivery: A Migration Blueprint",
    text: "A practical migration approach for moving application delivery toward GitOps.",
    href: "https://www.opsmx.com/webinars/argocd-for-continuous-delivery-a-migration-blueprint/",
    action: "View webinar",
  },
  {
    type: "Webinar",
    year: "2019",
    title: "Integrating Terraform with OSS Spinnaker for Application Deployments",
    text: "Using infrastructure provisioning as a governed stage within a delivery pipeline.",
    href: "https://go.opsmx.com/how-to-integrate-terraform-with-oss-spinnaker-for-app-deployments-december-2019",
    action: "View webinar",
  },
];

export const professionalProfiles = [
  {
    label: "Fiverr",
    value: "DevOps, platform engineering and AI automation consulting",
    href: "https://www.fiverr.com/anooptejt",
  },
  {
    label: "LinkedIn",
    value: "Articles, field notes and professional updates",
    href: "https://www.linkedin.com/in/anooptej-t-a3754b77",
  },
  {
    label: "Medium",
    value: "Long-form writing on engineering, AI and learning",
    href: "https://anoopt0106.medium.com/",
  },
  {
    label: "GitHub",
    value: "Public code and portfolio source",
    href: "https://github.com/anooptejt",
  },
  {
    label: "PaperCall",
    value: "Conference speaker profile",
    href: "https://www.papercall.io/speakers/73756",
  },
];
