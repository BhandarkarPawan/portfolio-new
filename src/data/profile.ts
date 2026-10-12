// Single source of truth for the site's résumé content. Facts mirror the
// latest LaTeX résumé; keep them in sync when that changes.

export const PROFILE = {
  name: "Pawan Bhandarkar",
  role: "Member of Technical Staff",
  company: "Thinking Machines Lab",
  location: "Redwood City, CA",
  timeZone: "America/Los_Angeles",
  coordinates: { lat: "37.4852° N", lon: "122.2364° W" },
  email: "pawan@bhandarkar.me",
  resumeUrl: "/files/Resume.pdf",
  description:
    "Software engineer building the instruments researchers use to see inside frontier models: RL run dashboards, rollout and dataset viewers, human-data platforms, and tools that let AI agents do research. Member of Technical Staff at Thinking Machines Lab, previously xAI.",
} as const;

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/BhandarkarPawan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bhandarkar" },
  { label: "X", href: "https://x.com/BhandarkarPawan" },
] as const;

export type Metric =
  | { kind: "count"; value: number; decimals?: number; prefix?: string; suffix?: string; label: string }
  | { kind: "text"; display: string; label: string };

export type Role = {
  id: string;
  company: string;
  title: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  metric?: Metric;
  current?: boolean;
};

// Chronological: the experience track reads like a training run, oldest checkpoint first.
export const ROLES: Role[] = [
  {
    id: "aibod",
    company: "Team AIBOD",
    title: "Software Engineer",
    location: "Fukuoka, Japan",
    period: "Feb 2020 — Apr 2022",
    summary: "Shipped full-stack products for clients across Japan, from internal search to payments.",
    highlights: [
      "Built an information management system serving up to 150,000 users a day with Python, SQL and GraphQL.",
      "Led a payment microservice (gRPC, Flask, PostgreSQL), and built and documented 30+ REST APIs with Apiary and Postman.",
      "Created an accessible, mobile-first React component library, and set up Jenkins CI/CD automating 100+ weekly builds on AWS.",
    ],
    stack: ["Python", "GraphQL", "React", "gRPC", "PostgreSQL", "AWS"],
    metric: { kind: "count", value: 150, suffix: "K", label: "daily users on one system" },
  },
  {
    id: "tunein",
    company: "TuneIn",
    title: "Software Engineer Intern, Platform",
    location: "San Francisco, CA",
    period: "Jun 2023 — Aug 2023",
    summary: "Real-time infrastructure for one of the largest audio platforms on the internet.",
    highlights: [
      "Enhanced real-time delivery for up to 7.5 million monthly users with WebSocket subscription APIs in a Go GraphQL gateway.",
      "Built pipelines processing 2M+ messages a day under 30 ms with ActiveMQ and Redis Streams.",
      "Extended the C# (.NET Core) monolith with live-streaming metadata for 120,000+ radio stations, and automated deploys with Terraform and Kubernetes.",
    ],
    stack: ["Go", "GraphQL", "WebSockets", "Redis Streams", "Kubernetes", "Terraform"],
    metric: { kind: "count", value: 7.5, decimals: 1, suffix: "M", label: "monthly users reached" },
  },
  {
    id: "converge",
    company: "Converge Lab",
    title: "Founding Engineer",
    location: "Sunnyvale, CA",
    period: "Jan 2024 — Dec 2024",
    summary:
      "Built and launched an LLM hardware co-designer that helps field application engineers find and compare components.",
    highlights: [
      "Built the Next.js and TypeScript frontend: generative UI over server-sent events, human-in-the-loop feedback for AI evaluation, and tiered access control.",
      "Contributed to a FastAPI RAG backend (Pinecone, Elasticsearch, DynamoDB, LangChain) and Python pipelines that parse PDF datasheets for LLM context.",
      "Helped secure a partnership with Nvidia and the first 100 users.",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "LangChain", "Pinecone", "Elasticsearch"],
    metric: { kind: "count", value: 100, label: "first users, plus an Nvidia partnership" },
  },
  {
    id: "xai",
    company: "xAI",
    title: "Member of Technical Staff",
    location: "Palo Alto, CA",
    period: "Dec 2024 — Mar 2026",
    summary:
      "Built the platforms behind Grok's post-training data and the tools researchers used to inspect agent behavior.",
    highlights: [
      "Built and maintained Starfleet, xAI's human data collection platform, enabling high-quality post-training data for Grok 3 and Grok 4 across personality, multilingual audio and process supervision.",
      "Developed Nebula, whose dashboards and trace viewers cut researchers' manual review of agent behavior from hours to seconds, and Nebula Notebooks, an in-house Colab over cluster data.",
      "Built the Nebula Agent and Trace Tools MCP server to analyze RL runs and large data collections through a Cursor-like interface with @mentions.",
    ],
    stack: ["TypeScript", "React", "Python", "MCP", "Notebooks"],
    metric: { kind: "text", display: "hrs → sec", label: "researchers' manual review of model behavior" },
  },
  {
    id: "tml",
    company: "Thinking Machines Lab",
    title: "Member of Technical Staff",
    location: "San Francisco, CA",
    period: "Apr 2026 — Now",
    summary:
      "Created and lead the lab's research acceleration platform for inspecting training runs, RL rollouts, datasets and evals.",
    highlights: [
      "Built RL run dashboards and eval leaderboards: reward, loss and eval curves, checkpoint comparisons across benchmarks, cost accounting, alerts and live rollout streaming.",
      "Shipped training-data tooling: dataset viewers with rendered token views, large-scale regex search, dataset diffs and lineage across datasets, jobs and checkpoints.",
      "Built an unsupervised conversation-clustering pipeline that surfaces themes and failure modes, and opened research artifacts to AI agents.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "ClickHouse", "Kafka", "BigQuery"],
    current: true,
  },
];

export const EDUCATION = [
  {
    school: "Carnegie Mellon University",
    degree: "M.S. Software Engineering",
    place: "Mountain View, CA",
    year: "2023",
    note: "Graduate Teaching Assistant · Research Associate",
  },
  {
    school: "Visvesvaraya Technological University",
    degree: "B.E. Computer Science & Engineering",
    place: "Nitte, India",
    year: "2020",
    note: "Sakura Science Fellow",
  },
] as const;

export const RECOGNITION = [
  {
    title: "Sakura Science Fellow",
    detail: "Japan Science and Technology Agency–funded research internship at Ritsumeikan University.",
  },
  {
    title: "Graduate Teaching Assistant",
    detail:
      "Foundations of Software Engineering; Software Requirements & Interaction Design; Introduction to Graduate Studies at Carnegie Mellon.",
  },
  {
    title: "Student Leader",
    detail: "ECE Graduate Organization, Carnegie Mellon, Fall 2022.",
  },
  {
    title: "Youth Icon",
    detail: "First place among 5,000 participants in a national public speaking competition, 2019.",
  },
] as const;

export const SKILLS = [
  {
    group: "Languages & frameworks",
    items: ["Python", "TypeScript", "Go", "SQL", "React", "FastAPI", "Node.js", "GraphQL", "Next.js"],
  },
  {
    group: "AI & ML infrastructure",
    items: ["RL rollout analysis", "LLM evaluation", "Training-data tooling", "MCP", "Agent SDKs", "RAG", "LangChain"],
  },
  {
    group: "Data & infrastructure",
    items: [
      "ClickHouse",
      "Spanner",
      "BigQuery",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "GCP",
      "AWS",
      "Kubernetes",
      "Docker",
      "Terraform",
    ],
  },
] as const;

export type Project = {
  name: string;
  org: string;
  blurb: string;
  stack: string[];
  image: string;
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Seeker",
    org: "Converge Lab",
    blurb:
      "An AI copilot for hardware engineers to search, compare and analyze electronic components in natural language.",
    stack: ["React", "FastAPI", "LangChain", "Pinecone", "Elasticsearch"],
    image: "/images/seeker.png",
    href: "https://app.convergelab.ai",
  },
  {
    name: "BOM Optimizer",
    org: "Converge Lab",
    blurb:
      "LLM-parsed bills of materials with cost trends and distributor checkout, so engineers can optimize designs for cost and availability.",
    stack: ["Recharts", "FastAPI", "LangChain", "DynamoDB"],
    image: "/images/bom-optimizer.png",
  },
  {
    name: "Journey",
    org: "Side project",
    blurb:
      "Personalized learning journeys generated from your interests and goals, with on-the-go podcasts generated from long-form reading.",
    stack: ["GenAI", "Exa", "Next.js", "Supabase"],
    image: "/images/journey.png",
    href: "https://getjourney.app/home",
  },
  {
    name: "Emergency Social Network",
    org: "Carnegie Mellon",
    blurb: "Real-time SOS messaging for earthquakes, designed in Figma and built by a team of five.",
    stack: ["Node.js", "MongoDB", "HTML & CSS", "Figma"],
    image: "/images/esn-app.png",
    href: "https://esn.onrender.com",
  },
  {
    name: "Kanban",
    org: "Personal",
    blurb:
      "An accessible drag-and-drop task manager with dynamic theming, deployed on AWS behind an application load balancer.",
    stack: ["React", "Node.js", "MongoDB", "Docker", "AWS"],
    image: "/images/kanban.png",
    href: "https://github.com/BhandarkarPawan/kanban-task-management",
  },
  {
    name: "Refriendo",
    org: "Freelance",
    blurb:
      "A social app for hosting neighborhood events. I designed it end to end in Figma and built it with React, Go and MongoDB.",
    stack: ["React", "Go", "MongoDB", "Figma"],
    image: "/images/refriendo-project.png",
    href: "https://github.com/BhandarkarPawan/refriendo",
  },
];

export const ARCHIVE = [
  {
    name: "AgentDocs",
    kind: "Collaborative editor where you @-tag AI agents to summarize, translate or illustrate",
    href: undefined,
  },
  {
    name: "Incident Response",
    kind: "Mobile-first platform for citizens and first responders · frontend lead",
    href: undefined,
  },
  { name: "Rock Paper Scissors Lizard Spock", kind: "Next.js game", href: "https://jankengu.vercel.app/" },
  { name: "WhatsApp UI clone", kind: "Pixel-perfect, for no reason at all", href: "https://notwhatsapp.netlify.app/" },
  { name: "Splitter", kind: "Tip calculator", href: "https://tipped.netlify.app/" },
  { name: "Skilled Learning", kind: "Landing page", href: "https://skilledlearning.netlify.app" },
  {
    name: "Portfolio v1 design",
    kind: "Figma",
    href: "https://www.figma.com/file/AhZNeemQhvbr9sf25PwA57/Portfolio-NEW?node-id=1%3A2",
  },
] as const;
