import { Project, Experience, Social } from './types';

export const MANIFESTO = {
  title: "AESTHETIC ARCHITECTURE, BULLETPROOF INTEGRITY",
  subtitle: "We build digital structures that transcend standard software constraints.",
  body1: "I am a Senior Systems Developer focused on crafting high-throughput, fault-tolerant software. I bridge the gap between elegant interface design and hard-metal systems performance, ensuring every pixel is synchronized with robust backend infrastructure.",
  highlightPhrase: "Engineering Solutions, Not Just Code.",
  body2: "My methodology is centered around performance constraints, extreme legacy modernization, and decentralized scalability. By blending high-fidelity visuals with rigid microservices orchestration, I define the sweet spot of creative systems engineering."
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Systems Engineer",
    company: "TCS",
    period: "2024 — PRESENT",
    highlights: [
      "Architected the migration of critical core banking workflows, delivering modern reactive microservices to replace monolithic legacy bottlenecks.",
      "Spearheaded distributed storage optimization and custom caching layers, achieving a 90% Latency Reduction across API ingestion gateways.",
      "Established strict SLA compliance frameworks and automatic self-healing routines for multi-region active-active clusters."
    ],
    techStack: ["Java/Spring Boot", "Rust", "Apache Kafka", "PostgreSQL", "Kubernetes", "gRPC"],
    metrics: [
      { label: "LATENCY REDUCTION", value: "90%" },
      { label: "LEGACY MODERNIZATION", value: "CORE SYSTEM" },
      { label: "THROUGHPUT STABILITY", value: "99.999%" }
    ]
  },
  {
    id: "exp-2",
    role: "Systems Engineer",
    company: "TCS",
    period: "2021 — 2024",
    highlights: [
      "Executed comprehensive legacy modernization modules for high-availability enterprise services handling 10M+ daily transactions.",
      "Pioneered an internal telemetry toolkit that diagnosed real-time JVM thread starvation issues, accelerating debugging cycles by 40%.",
      "Designed event-driven transaction logs via Apache Kafka, eliminating message loss and increasing synchronization consistency."
    ],
    techStack: ["Java", "Docker", "Apache Kafka", "Elasticsearch", "Prometheus", "Spring Cloud"],
    metrics: [
      { label: "PROCESS SPEEDUP", value: "4.2X" },
      { label: "EVENT CONCURRENCY", value: "50K/sec" },
      { label: "MONITORING AUDIT", value: "REAL-TIME" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Distributed Storage Layer",
    description: "A secure, resilient peer-to-peer storage fabric built to optimize dynamic block indexing, featuring autonomous node discovery, zero-knowledge metadata consensus, and a real-time reactive admin HUD.",
    tags: ["Rust", "gRPC", "WebAssembly", "React", "Tailwind CSS"],
    thumbnail: "/src/assets/images/distributed_storage_1784107493202.jpg",
    demoUrl: "#",
    githubUrl: "https://github.com",
    stats: [
      { label: "UPTIME RATIO", value: "99.998%" },
      { label: "BLOCK READ LATENCY", value: "1.4ms" },
      { label: "NODE LIMIT", value: "INFINITE" }
    ]
  },
  {
    id: "proj-2",
    title: "Enterprise Release Management System",
    description: "An automated multi-cloud CI/CD deployment orchestrator. Safely routes compiled artifact bundles across staging grids using predictive health telemetry, rolling container restarts, and granular rollback gates.",
    tags: ["Go", "Kubernetes API", "GraphQL", "TypeScript", "GSAP"],
    thumbnail: "/src/assets/images/release_system_1784107506739.jpg",
    demoUrl: "#",
    githubUrl: "https://github.com",
    stats: [
      { label: "BUILD DEPLOY TIME", value: "<12s" },
      { label: "ROLLBACK ACCURACY", value: "100.0%" },
      { label: "TELEMETRY OVERHEAD", value: "<0.8%" }
    ]
  }
];

export const SOCIALS: Social[] = [
  {
    id: "soc-1",
    name: "LinkedIn",
    url: "https://linkedin.com",
    iconName: "Linkedin",
    terminalCommand: "cat /dev/social/linkedin"
  },
  {
    id: "soc-2",
    name: "GitHub",
    url: "https://github.com",
    iconName: "Github",
    terminalCommand: "cat /dev/social/github"
  },
  {
    id: "soc-3",
    name: "LeetCode",
    url: "https://leetcode.com",
    iconName: "Code",
    terminalCommand: "cat /dev/social/leetcode"
  }
];
