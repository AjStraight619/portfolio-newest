export type ExperienceKind =
  | "work"
  | "teaching"
  | "education"
  | "research"
  | "freelance";

export type Experience = {
  title: string;
  org: string;
  location: string;
  date: string;
  kind: ExperienceKind;
  current?: boolean;
  summary?: string;
  metrics?: { value: string; label: string }[];
  groups?: { name: string; status?: string; bullets: string[] }[];
  bullets?: string[];
  tech?: string[];
};

// Most recent first.
export const experiencesData: Experience[] = [
  {
    title: "Software Engineer",
    org: "Sansay Inc.",
    location: "San Diego, CA",
    date: "June 2025 - Present",
    kind: "work",
    current: true,
    summary:
      "Sole engineer behind Sansay\u2019s AI support agent, used in production by customers and internal support engineers, and a telecom fraud-detection system currently in development.",
    metrics: [
      { value: "977 \u2192 61 ms", label: "median call processing, JS workers to Go" },
      { value: "~500M", label: "call records aggregated per month" },
      { value: "800+", label: "technical docs in the RAG index" },
    ],
    groups: [
      {
        name: "AI Support Agent",
        bullets: [
          "Built and deployed a production AI support agent in TypeScript, using LangGraph for agentic orchestration and self-hosted LLMs served with vLLM, used to diagnose telecom issues.",
          "Integrated the agent into VSXi, Sansay\u2019s main product, using Java 8 Servlets.",
          "Designed a tool layer of read-only tools that query live customer systems, replacing manual checks and documentation searches during troubleshooting.",
          "Built a hybrid RAG pipeline over 800+ technical documents and thousands of past support tickets, combining full-text search, vector search, and a reranking model.",
          "Automated SIP Message Conversion profile creation, replacing a multi-hour manual process that support ran several times a week.",
        ],
      },
      {
        name: "Fraud Detection System",
        status: "In development",
        bullets: [
          "Architecting a telecom fraud-detection system in Go that scores live call metadata against aggregated historical records and exposes results through a REST API.",
          "Built a pipeline that aggregates ~500M call records per month by customer and carrier to drive false answer supervision (FAS) detection and anomaly scoring.",
          "Rewrote call processing from JavaScript workers to Go goroutines, cutting median processing time from 977 ms to 61 ms on an 80,000-active-call benchmark.",
        ],
      },
    ],
    tech: ["TypeScript", "LangGraph", "vLLM", "Go", "Java", "RAG"],
  },
  {
    title: "Teaching Assistant",
    org: "San Diego State University",
    location: "San Diego, CA",
    date: "Aug 2024 - May 2025",
    kind: "teaching",
    summary: "Data Structures & Algorithms",
    bullets: [
      "Led tutoring sessions on data structures, graph traversal, and complexity analysis for students at varied levels.",
      "Graded assignments and exams with feedback on code correctness and algorithmic reasoning.",
    ],
  },
  {
    title: "B.S. Computer Science",
    org: "San Diego State University",
    location: "San Diego, CA",
    date: "2021 - May 2025",
    kind: "education",
    metrics: [
      { value: "3.8", label: "major GPA" },
      { value: "3x", label: "Dean\u2019s List" },
    ],
  },
  {
    title: "Freelance Full-Stack Engineer",
    org: "Oak Outlet Plus",
    location: "San Diego, CA",
    date: "2024",
    kind: "freelance",
    summary:
      "Designed and built a full-stack website for a local business, with S3 for file storage.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "AWS"],
  },
  {
    title: "Frontend Developer Intern",
    org: "AcademicAssist",
    location: "San Diego, CA",
    date: "2024",
    kind: "work",
    summary:
      "Led the redesign of the landing page and shipped new features for the web app.",
  },
  {
    title: "Research Assistant",
    org: "San Diego State University",
    location: "San Diego, CA",
    date: "2023",
    kind: "research",
    summary:
      "Optimized non-orthogonal multiple access (NOMA) systems with intelligent reflecting surfaces (IRS), using the BFGS algorithm to improve data rates. Ran the analysis and simulations in Python and MATLAB.",
    tech: ["Python", "MATLAB"],
  },
  {
    title: "Computer Science Tutor",
    org: "Southwestern College",
    location: "Chula Vista, CA",
    date: "2021 - 2022",
    kind: "teaching",
    summary:
      "Tutored computer science students through programming assignments and projects, and ran workshops on programming languages and core topics.",
  },
];

export const projectsData = [
  {
    title: "Pictionary",
    subtitle: "Still in development",
    description:
      "Multiplayer game inspired by Skribbl.io. Using Go for WebSocket communication with the client.",
    tags: [
      "TypeScript",
      "Next.js",
      "Go",
      "Tailwind",
      "Prisma",
      "Framer Motion",
      "Zod",
    ],
    imageUrl: "/pictionary.png",
    href: "https://pictionary-tan.vercel.app/",
  },
  {
    title: "Pathfinding Visualizer",
    subtitle: "Completed",
    description: "Visualize pathfinding algorithms.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    imageUrl: "/pathfinding.png",
    href: "https://algo-visualizer-nine.vercel.app/",
  },
  {
    title: "Link Tree Clone",
    subtitle: "Still in development",
    description: "Link Tree Clone is a clone of the popular Link Tree website.",
    tags: [
      "TypeScript",
      "Next.js",
      "Postgres",
      "Tailwind",
      "Prisma",
      "Framer Motion",
    ],
    imageUrl: "/link-tree-clone.png",
    href: "https://ltree-clone.vercel.app/",
  },
] as const;
