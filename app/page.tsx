const capabilities = [
  {
    number: "01",
    title: "Engineering Front Door",
    text: "A unified, governed entry point for services, golden paths, platform knowledge, infrastructure and operational insight.",
  },
  {
    number: "02",
    title: "DevOps Architecture",
    text: "Target-state CI/CD, GitOps and release architectures shaped around an enterprise’s constraints, not a preferred tool.",
  },
  {
    number: "03",
    title: "Platform Engineering",
    text: "Self-service developer platforms that reduce cognitive load while preserving security, reliability and ownership.",
  },
  {
    number: "04",
    title: "AIOps & Intelligent Automation",
    text: "Context-aware agents for release governance, anomaly triage, knowledge discovery and human-guided remediation.",
  },
  {
    number: "05",
    title: "MLOps & AI Governance",
    text: "Reproducible model delivery with versioning, validation, drift controls, observability and responsible AI guardrails.",
  },
  {
    number: "06",
    title: "Solution Consulting",
    text: "Discovery workshops, architecture options, proofs of concept and executive proposals that turn ambiguity into action.",
  },
];

const projects = [
  {
    id: "front-door",
    index: "01",
    label: "Platform strategy",
    title: "Engineering Front Door",
    statement:
      "One intelligent, governed entry point for the engineering ecosystem.",
    challenge:
      "Developers navigate fragmented tools, inconsistent onboarding, manual requests and disconnected documentation. This adds friction to every delivery.",
    approach:
      "Designed a composable front door that connects a service catalog, golden paths, platform APIs, delivery workflows, knowledge and operational signals. A context-aware assistant guides teams without bypassing human or policy controls.",
    outcomes: [
      "Faster onboarding",
      "Lower cognitive load",
      "Governed self-service",
      "Measurable platform adoption",
    ],
    stack: [
      "Developer Portal",
      "Kubernetes",
      "Argo CD",
      "Terraform",
      "OpenTelemetry",
      "RAG",
    ],
    featured: true,
  },
  {
    id: "aiops-agent",
    index: "02",
    label: "AIOps",
    title: "Intelligent DevOps Agent",
    statement:
      "Operational context transformed into timely release decisions.",
    challenge:
      "Release teams needed a simpler way to understand deployment health, governance risk, anomalies and the next best remediation step.",
    approach:
      "Architected a modular agent using retrieval-augmented generation, semantic search and operational telemetry to support release governance, triage, knowledge retrieval and human-approved remediation.",
    outcomes: [
      "65% triage automation",
      "40% lower MTTR",
      "3× release throughput",
      "72% → 91% accuracy",
    ],
    stack: [
      "Python",
      "LLMs",
      "Vector Search",
      "Microservices",
      "Kubernetes",
      "Observability",
    ],
    featured: true,
  },
  {
    id: "gitops",
    index: "03",
    label: "GitOps at scale",
    title: "Enterprise Delivery Modernization",
    statement:
      "Declarative, self-healing delivery for a very large application estate.",
    challenge:
      "Fragmented pipelines and operationally expensive deployment patterns limited reliability and platform-scale governance.",
    approach:
      "Defined a phased migration architecture for 300K+ application delivery entities, incorporating declarative configuration, automated reconciliation, event-driven workflows and progressive rollout strategies.",
    outcomes: [
      "300K+ entities migrated",
      "Self-healing delivery",
      "Safer rollouts",
      "Consistent governance",
    ],
    stack: [
      "Argo CD",
      "Argo Rollouts",
      "Kubernetes",
      "Git",
      "Helm",
      "Prometheus",
    ],
    featured: true,
  },
  {
    id: "multicloud",
    index: "04",
    label: "Cloud architecture",
    title: "Unified Multi-Cloud CI/CD",
    statement:
      "A common delivery control plane across four cloud environments.",
    challenge:
      "Different delivery patterns across cloud providers created duplicated effort, inconsistent controls and operational complexity.",
    approach:
      "Designed a reference architecture that standardizes build, promotion, artifact flow, secrets, policy, telemetry and release governance while retaining cloud-specific implementation where it adds value.",
    outcomes: [
      "4 cloud environments",
      "Reusable delivery patterns",
      "Stronger controls",
      "Faster adoption",
    ],
    stack: [
      "AWS",
      "Azure",
      "Google Cloud",
      "IBM Cloud",
      "Tekton",
      "Terraform",
    ],
    featured: true,
  },
  {
    id: "devsecops",
    index: "05",
    label: "DevSecOps",
    title: "AI-Assisted Vulnerability Remediation",
    statement:
      "Security context and code intelligence brought into the developer flow.",
    challenge:
      "Manual vulnerability analysis and remediation extended risk exposure and consumed specialist engineering time.",
    approach:
      "Designed an LLM-assisted capability for vulnerability enrichment, secure-code recommendations, remediation workflows and continuous security intelligence, with human approval for sensitive changes.",
    outcomes: ["60% lower MTTR", "50% fewer manual fixes"],
    stack: ["LLMs", "RAG", "Trivy", "Harbor", "Git", "CI/CD"],
  },
  {
    id: "mlops",
    index: "06",
    label: "MLOps",
    title: "Governed Model Delivery",
    statement:
      "Reproducibility, promotion and drift management built into model operations.",
    challenge:
      "Machine-learning teams needed consistent controls for versioning, validation, deployment, monitoring and rollback.",
    approach:
      "Created a GitOps-oriented governance framework spanning the model lifecycle, from experiment traceability to controlled promotion and drift response.",
    outcomes: ["40% lower model drift", "Faster model delivery"],
    stack: ["MLflow", "DVC", "GitOps", "Kubernetes", "Python"],
  },
  {
    id: "observability",
    index: "07",
    label: "Reliability",
    title: "Observability Modernization",
    statement:
      "Metrics, logs, traces and release events assembled into one operational view.",
    challenge:
      "Fragmented monitoring delayed detection and made it difficult to connect platform symptoms with delivery events.",
    approach:
      "Designed a telemetry architecture connecting service health, deployment context, alerts and reliability objectives.",
    outcomes: ["50% faster detection", "30% lower MTTR"],
    stack: ["Prometheus", "Grafana", "OpenTelemetry", "EFK", "Dynatrace"],
  },
  {
    id: "iac",
    index: "08",
    label: "Automation",
    title: "Infrastructure as a Product",
    statement:
      "Reusable modules and automated environments in place of ticket-driven provisioning.",
    challenge:
      "Environment creation took days of coordination and produced inconsistent results.",
    approach:
      "Designed reusable provisioning modules, deployment packages and automated workflows for Kubernetes platforms and application environments.",
    outcomes: ["3 days → 2 hours", "Repeatable environments"],
    stack: ["Terraform", "Helm", "Ansible", "Docker", "Linux"],
  },
  {
    id: "regulated-delivery",
    index: "09",
    label: "Regulated systems",
    title: "Highly Available Delivery",
    statement:
      "Controlled releases for critical systems where availability and evidence matter.",
    challenge:
      "Regulated workloads required faster delivery without weakening auditability, operational resilience or production controls.",
    approach:
      "Architected resilient CI/CD and operating patterns with controlled promotion, monitoring, rollback and incident-response readiness.",
    outcomes: ["99.9% availability", "40% faster deployments"],
    stack: ["Jenkins", "AWS", "Java", "Middleware", "Monitoring"],
  },
  {
    id: "enterprise-platforms",
    index: "10",
    label: "Enterprise platforms",
    title: "Governance & Middleware Platforms",
    statement:
      "Repeatable rollout and reliable operation across complex enterprise estates.",
    challenge:
      "Large-scale governance and middleware systems needed secure integration, clustering and consistent operations across environments.",
    approach:
      "Created scalable deployment and operational patterns spanning installation, upgrades, identity integration, clustering, automation and incident management.",
    outcomes: ["99%+ uptime", "40% faster deployments"],
    stack: ["WebSphere", "WebLogic", "JBoss", "AIX", "LDAP", "Java"],
  },
];

const principles = [
  "Start with the problem, not the tool.",
  "Make the secure path the easiest path.",
  "Treat platforms as products.",
  "Build observability into the architecture.",
  "Keep humans accountable for high-risk AI decisions.",
  "Measure outcomes, adoption and developer experience.",
];

const publications = [
  {
    topic: "Responsible AI",
    date: "July 2026",
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
    topic: "DevOps practice",
    date: "July 2026",
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
    topic: "Agentic operations",
    date: "April 2026",
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
    title: "How to Integrate AWS with Spinnaker",
    text: "A foundational walkthrough for configuring AWS services as part of a Spinnaker continuous-delivery environment.",
    links: [
      {
        label: "Read on Medium",
        href: "https://anoopt0106.medium.com/how-to-integrate-aws-with-spinnaker-8a5c9652dc8f",
      },
    ],
  },
];

const fieldNotes = [
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

const appearances = [
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

const professionalProfiles = [
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

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);
  const additionalProjects = projects.filter((project) => !project.featured);

  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Anoop Tej Thotapalli, home">
          <span className="brand-mark">AT</span>
          <span className="brand-name">
            Anoop Tej
            <small>Independent DevOps & AIOps Architect</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#expertise">Expertise</a>
          <a href="#work">Selected work</a>
          <a href="#approach">Approach</a>
          <a href="#insights">Insights</a>
          <a
            href="https://www.linkedin.com/in/anooptej-t-a3754b77"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="nav-cta"
            href="mailto:anooptejthotapalli@gmail.com?subject=Freelance%20Architecture%20Enquiry"
          >
            Start a conversation
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            DevOps · Platform Engineering · AIOps
          </p>
          <h1>
            Engineering systems,
            <br />
            <em>designed with intent.</em>
          </h1>
          <p className="hero-intro">
            I translate complex enterprise problem statements into secure,
            scalable and intelligent platforms, from Engineering Front Doors to
            multi-cloud delivery and AI-assisted operations.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore the work <span aria-hidden="true">↘</span>
            </a>
            <a className="text-link" href="#approach">
              How I architect solutions <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-proof" aria-label="Experience highlights">
            <div>
              <strong>17+</strong>
              <span>Years in engineering</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Cloud ecosystems</span>
            </div>
            <div>
              <strong>20+</strong>
              <span>Engineers mentored</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-stage">
          <figure className="portrait-card">
            <div className="portrait-frame">
              <img
                src="/anoop-portrait.jpg"
                alt="Anoop Tej Thotapalli"
                width="960"
                height="1200"
              />
              <span className="portrait-accent" aria-hidden="true" />
            </div>
            <figcaption>
              <span>Independent architect</span>
              <strong>Anoop Tej Thotapalli</strong>
              <small>Bengaluru · Working globally</small>
            </figcaption>
          </figure>

          <div
            className="frontdoor-visual"
            aria-label="Engineering Front Door connecting discover, build, deliver, operate and improve"
          >
            <div className="visual-label">
              <span>Reference architecture</span>
              <strong>Engineering Front Door</strong>
            </div>
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="door-core">
              <span className="door-icon">↳</span>
              <small>ONE ENTRY POINT</small>
              <strong>Front Door</strong>
              <p>Context · Control · Clarity</p>
            </div>
            <div className="node node-discover">
              <span>01</span>
              <strong>Discover</strong>
            </div>
            <div className="node node-build">
              <span>02</span>
              <strong>Build</strong>
            </div>
            <div className="node node-deliver">
              <span>03</span>
              <strong>Deliver</strong>
            </div>
            <div className="node node-operate">
              <span>04</span>
              <strong>Operate</strong>
            </div>
            <div className="node node-improve">
              <span>05</span>
              <strong>Improve</strong>
            </div>
            <div className="visual-footer">
              <span>SELF-SERVICE</span>
              <span>GUARDRAILS</span>
              <span>INTELLIGENCE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Core technology themes">
        <div>
          <span>Kubernetes</span>
          <span>GitOps</span>
          <span>Terraform</span>
          <span>Observability</span>
          <span>Developer Experience</span>
          <span>Responsible AI</span>
        </div>
      </section>

      <div id="content">
        <section className="section expertise" id="expertise">
          <div className="section-heading">
            <p className="eyebrow">Architecture practice</p>
            <h2>From problem statement to an operable platform.</h2>
            <p>
              Strategy only matters when teams can adopt it. I connect
              enterprise intent with the architecture, controls and enablement
              needed to run it well.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article className="capability-card" key={capability.number}>
                <span className="card-number">{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
                <span className="card-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="frontdoor-section">
          <div className="frontdoor-copy">
            <p className="eyebrow">Signature focus</p>
            <h2>The Engineering Front Door is an experience, not another portal.</h2>
            <p>
              It brings the engineering ecosystem into one coherent journey:
              discover what exists, create from approved patterns, deliver with
              confidence, understand production and continuously improve.
            </p>
            <blockquote>
              “The goal is not one more interface. It is one clear way into the
              platform.”
            </blockquote>
          </div>
          <ol className="journey-list">
            <li>
              <span>01</span>
              <div>
                <strong>Discover</strong>
                <p>Services, ownership, documentation and platform capabilities.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Create</strong>
                <p>Golden paths, templates and policy-aware infrastructure.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Deliver</strong>
                <p>GitOps workflows, progressive rollout and release evidence.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Operate</strong>
                <p>Health, telemetry, ownership and actionable reliability context.</p>
              </div>
            </li>
            <li>
              <span>05</span>
              <div>
                <strong>Improve</strong>
                <p>AIOps recommendations, scorecards and measurable feedback loops.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="section work" id="work">
          <div className="section-heading work-heading">
            <div>
              <p className="eyebrow">Selected systems & solutions</p>
              <h2>Architecture measured by what changed.</h2>
            </div>
            <p>
              Projects are anonymized to respect client and employer
              confidentiality. They focus on the challenge, architecture,
              technology and outcomes.
            </p>
          </div>

          <div className="featured-projects">
            {featuredProjects.map((project) => (
              <article className="project-card" id={project.id} key={project.id}>
                <div className="project-topline">
                  <span>{project.index}</span>
                  <span>{project.label}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-statement">{project.statement}</p>
                <div className="project-body">
                  <div>
                    <h4>Problem</h4>
                    <p>{project.challenge}</p>
                  </div>
                  <div>
                    <h4>Architecture</h4>
                    <p>{project.approach}</p>
                  </div>
                </div>
                <div className="outcome-list">
                  {project.outcomes.map((outcome) => (
                    <span key={outcome}>{outcome}</span>
                  ))}
                </div>
                <div className="stack-list" aria-label="Technology stack">
                  {project.stack.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="project-archive">
            {additionalProjects.map((project) => (
              <article className="archive-card" id={project.id} key={project.id}>
                <div className="archive-index">{project.index}</div>
                <div className="archive-main">
                  <span className="archive-label">{project.label}</span>
                  <h3>{project.title}</h3>
                  <p className="archive-statement">{project.statement}</p>
                  <details>
                    <summary>
                      View architecture note <span aria-hidden="true">+</span>
                    </summary>
                    <div className="detail-content">
                      <p>
                        <strong>Problem:</strong> {project.challenge}
                      </p>
                      <p>
                        <strong>Approach:</strong> {project.approach}
                      </p>
                    </div>
                  </details>
                </div>
                <div className="archive-meta">
                  <div>
                    {project.outcomes.map((outcome) => (
                      <strong key={outcome}>{outcome}</strong>
                    ))}
                  </div>
                  <p>{project.stack.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="approach-intro">
            <p className="eyebrow">How I work with clients</p>
            <h2>Clarity before complexity.</h2>
            <p>
              I make the problem, constraints and decisions visible. Then I build
              the smallest credible path from current state to target state.
            </p>
          </div>
          <div className="process-track">
            <article>
              <span>01</span>
              <h3>Discover</h3>
              <p>Clarify the problem, users, operating model and non-negotiables.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Frame</h3>
              <p>Assess the current state, risks, dependencies and success measures.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Design</h3>
              <p>Compare options and define the reference and target architecture.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Prove</h3>
              <p>Turn assumptions into evidence through focused prototypes and PoCs.</p>
            </article>
            <article>
              <span>05</span>
              <h3>Enable</h3>
              <p>Plan adoption, governance, production readiness and team capability.</p>
            </article>
          </div>
        </section>

        <section className="principles-section">
          <div className="principles-panel">
            <p className="eyebrow">Design principles</p>
            <h2>Decisions that hold when the diagram meets production.</h2>
          </div>
          <ol className="principles-list">
            {principles.map((principle, index) => (
              <li key={principle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{principle}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="technology-section">
          <div>
            <p className="eyebrow">Technology landscape</p>
            <h2>Broad enough to choose. Deep enough to deliver.</h2>
          </div>
          <div className="technology-groups">
            <p>
              <strong>Cloud</strong>
              AWS · Azure · Google Cloud · IBM Cloud
            </p>
            <p>
              <strong>Platform</strong>
              Kubernetes · Docker · Helm · Linux
            </p>
            <p>
              <strong>Delivery</strong>
              Argo CD · Tekton · Spinnaker · Jenkins
            </p>
            <p>
              <strong>Automation</strong>
              Terraform · Ansible · Python · Shell
            </p>
            <p>
              <strong>Intelligence</strong>
              LLMs · RAG · Vector Search · MLflow · DVC
            </p>
            <p>
              <strong>Reliability</strong>
              Prometheus · Grafana · OpenTelemetry · EFK · Dynatrace
            </p>
          </div>
        </section>

        <section className="insights-section" id="insights">
          <div className="insights-intro">
            <div>
              <p className="eyebrow">Insights & speaking</p>
              <h2>Ideas tested in real engineering environments.</h2>
            </div>
            <p>
              Long-form writing, practical field notes and technical sessions
              covering DevOps, platform engineering, AIOps, responsible AI and
              the human side of technology.
            </p>
          </div>

          <div className="publication-grid">
            {publications.map((publication, index) => (
              <article className="publication-card" key={publication.title}>
                <div className="publication-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{publication.topic}</span>
                  <time>{publication.date}</time>
                </div>
                <h3>{publication.title}</h3>
                <p>{publication.text}</p>
                <div className="publication-links">
                  {publication.links.map((link) => (
                    <a
                      href={link.href}
                      key={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="insight-columns">
            <section className="field-notes" aria-labelledby="field-notes-title">
              <div className="subsection-heading">
                <p className="eyebrow">LinkedIn field notes</p>
                <h3 id="field-notes-title">Short observations from the work.</h3>
              </div>
              <ol>
                {fieldNotes.map((note, index) => (
                  <li key={note.href}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <a href={note.href} target="_blank" rel="noreferrer">
                      <small>{note.topic}</small>
                      <strong>{note.title}</strong>
                    </a>
                    <span aria-hidden="true">↗</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="appearances" aria-labelledby="appearances-title">
              <div className="subsection-heading">
                <p className="eyebrow">Talks & webinars</p>
                <h3 id="appearances-title">Sharing the architecture behind delivery.</h3>
              </div>
              <div className="appearance-list">
                {appearances.map((appearance) => (
                  <article key={appearance.href}>
                    <div>
                      <span>{appearance.type}</span>
                      <time>{appearance.year}</time>
                    </div>
                    <h4>{appearance.title}</h4>
                    <p>{appearance.text}</p>
                    <a
                      href={appearance.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {appearance.action} <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section className="professional-presence" aria-labelledby="presence-title">
            <div>
              <p className="eyebrow">Elsewhere</p>
              <h3 id="presence-title">Professional presence across the web.</h3>
            </div>
            <div className="profile-links">
              {professionalProfiles.map((profile) => (
                <a
                  href={profile.href}
                  key={profile.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>{profile.label}</strong>
                  <span>{profile.value}</span>
                  <small aria-hidden="true">↗</small>
                </a>
              ))}
            </div>
          </section>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Start with the problem</p>
            <h2>What engineering challenge are you trying to unlock?</h2>
            <p>
              Let’s turn it into an architecture your teams can understand,
              adopt and operate.
            </p>
          </div>
          <div className="contact-actions">
            <a
              className="contact-button"
              href="mailto:anooptejthotapalli@gmail.com?subject=Freelance%20Architecture%20Enquiry"
            >
              <span>Email Anoop</span>
              <strong aria-hidden="true">↗</strong>
            </a>
            <a
              className="contact-secondary"
              href="https://www.linkedin.com/in/anooptej-t-a3754b77"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              className="contact-secondary"
              href="mailto:anooptejthotapalli@gmail.com?subject=Freelance%20Architecture%20Enquiry"
            >
              anooptejthotapalli@gmail.com
            </a>
          </div>
        </section>
      </div>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">AT</span>
          <p>
            <strong>Anoop Tej Thotapalli</strong>
            Independent DevOps · Platform Engineering · AIOps
          </p>
        </div>
        <p className="footer-note">
          Independent architecture consulting for engineering platforms,
          delivery transformation and intelligent operations. Bengaluru, India.
        </p>
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/anooptej-t-a3754b77"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
