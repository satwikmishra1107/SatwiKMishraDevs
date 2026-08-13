import { Project, Experience, Social } from "./types";
import ProjectOne from "./assets/ProjectOne.png";
import ProjectTwo from "./assets/ProjectTwo.png";

export const MANIFESTO = {
  title: "SOFTWARE, SYSTEMS & CURIOSITY",
  body1:
    "Software engineering with a focus on backend systems, full-stack applications, and solving problems that are a little more complicated than they first appear",
  highlightPhrase: "Performance. Reliability. Simplicity.",
  // body2: "My methodology is centered around performance constraints, extreme legacy modernization, and decentralized scalability. By blending high-fidelity visuals with rigid microservices orchestration, I define the sweet spot of creative systems engineering."
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Systems Engineer",
    company: "TCS",
    period: "2024 — PRESENT",
    highlights: [
      "Enterprise software modernization across backend architecture, performance optimization, legacy migration, and production tooling.",
    ],
    techStack: ["Java", "Spring Boot", "PL/SQL", "RestAPI", "Linux RHEL"],
    metrics: [
      { label: "LATENCY REDUCTION", value: "90%" },
      { label: "LEGACY MODERNIZATION", value: "CORE SYSTEM" },
      { label: "THROUGHPUT STABILITY", value: "99.999%" },
    ],
  },
  {
    id: "exp-2",
    role: "B.Tech. — ECE",
    company: "IIIT Tiruchirappalli",
    period: "2020 — 2024",
    highlights: [
      "A foundation in electronics, communication systems, and engineering that eventually led toward software and systems development.",
    ],
    techStack: [
      "C/C++",
      "MERN",
      "Algorithms",
      "System Design",
      "Data Structures",
    ],
    metrics: [
      { label: "PROCESS SPEEDUP", value: "4.2X" },
      { label: "EVENT CONCURRENCY", value: "50K/sec" },
      { label: "MONITORING AUDIT", value: "REAL-TIME" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "CHUNKY DISCORD",
    description: `Was running out of storage and that led to a simple question: why build another storage server when Discord already stores files for free? \n Chunky Discord splits large files into chunks, as there's a rate limit in discord, tags them with a SHA-256 hash for identification and integrity checks, and stores them in a private Discord server. So that you are left with the lightweight metadata which stays on the server, allowing files to be located, verified, reassembled, and retrieved on demand and in realtime.`,
    tags: [
      "ReactJS",
      "NodeJS",
      "AWS EC2",
      "Distributed Storage",
      "Rate Limiting",
    ],
    thumbnail: ProjectOne,
    demoUrl: "#",
    githubUrl: "https://github.com",
    stats: [
      { label: "Maximum chunk size", value: "99.998%" },
      { label: "BLOCK READ LATENCY", value: "1.4ms" },
      { label: "NODE LIMIT", value: "INFINITE" },
    ],
  },
  {
    id: "proj-2",
    title: "PDN Tracker (ERMS)",
    description:
      "When the existing PDN tracking tool had to be retired because of security concerns, the workflow temporarily fell back to Excel. PDN Tracker was built from scratch to replace it with a role-based system for developers, reviewers, testers, and deployers, taking each delivery from submission through review and deployment while keeping every handoff traceable.",
    tags: ["Go", "Kubernetes API", "GraphQL", "TypeScript", "GSAP"],
    thumbnail: ProjectTwo,
    demoUrl: "#",
    githubUrl: "https://github.com",
    stats: [
      { label: "BUILD DEPLOY TIME", value: "<12s" },
      { label: "ROLLBACK ACCURACY", value: "100.0%" },
      { label: "TELEMETRY OVERHEAD", value: "<0.8%" },
    ],
  },
];

export const SOCIALS: Social[] = [
  {
    id: "soc-1",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/satwik-mishra-1107-/",
    iconName: "Linkedin",
    terminalCommand: "cat /dev/social/linkedin",
  },
  {
    id: "soc-2",
    name: "GitHub",
    url: "https://github.com/satwikmishra1107",
    iconName: "Github",
    terminalCommand: "cat /dev/social/github",
  },
  {
    id: "soc-3",
    name: "LeetCode",
    url: "https://leetcode.com/u/satwik_mishra11/",
    iconName: "Code",
    terminalCommand: "cat /dev/social/leetcode",
  },
];
