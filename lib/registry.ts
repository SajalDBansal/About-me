import registryData from "@/data/registry.json";

export interface SocialLink {
  url: string;
  navbar: boolean;
}

export interface ProjectLink {
  type: string;
  href: string;
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface ServiceEntry {
  name: string;
  description: string;
}

export interface LanguageStat {
  name: string;
  percent: number;
}

export interface SetupStep {
  step: string;
  commands: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Longer, README-sourced explanation of what the project does — shown on the detail page instead of `description`. */
  overview: string;
  /** Core capabilities (README "what it does" style), distinct from `highlights`' quantified resume achievements. */
  features: string[];
  /** Short architecture summary, only rendered when non-empty. */
  architecture: string;
  /** Named services/apps within a monorepo, only rendered when non-empty (e.g. a microservices project). */
  services: ServiceEntry[];
  highlights: string[];
  technologies: string[];
  /** Categorized tech stack for the detail page; `technologies` stays flat for the compact card badges. */
  techStack: TechStackGroup[];
  /** GitHub language breakdown by percent of bytes, only rendered when non-empty. */
  languages: LanguageStat[];
  /** Clone/install/run steps, only rendered when non-empty. */
  setup: SetupStep[];
  links: ProjectLink[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  title: string;
  type: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  cgpa: string;
  courses: string[];
  start: string;
  end: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export interface Profile {
  name: string;
  initials: string;
  url: string;
  role: string;
  location: string;
  description: string;
  summary: string;
  avatarUrl: string;
  resumeUrl: string;
  email: string;
  phone: string;
  social: Record<string, SocialLink>;
}

export interface Registry {
  profile: Profile;
  navbar: NavItem[];
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

export const DATA = registryData as Registry;

export function getProjectBySlug(slug: string): Project | undefined {
  return DATA.projects.find((project) => project.slug === slug);
}

/** GitHub username derived from the registry's GitHub profile URL — one source of truth, no duplicate field. */
export function getGithubUsername(): string {
  const url = DATA.profile.social.GitHub?.url ?? "";
  return url.replace(/\/+$/, "").split("/").pop() ?? "";
}
