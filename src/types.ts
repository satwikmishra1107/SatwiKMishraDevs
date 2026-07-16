export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  demoUrl?: string;
  githubUrl?: string;
  stats: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
}

export interface Social {
  id: string;
  name: string;
  url: string;
  iconName: string;
  terminalCommand: string;
}
