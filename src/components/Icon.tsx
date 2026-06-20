import React from "react";
import {
  Globe,
  LucideProps,
  Atom,
  Database,
  Zap,
  Workflow,
  Cloud,
  Terminal,
  Code,
  Container,
  Layers,
  Brain,
  BrainCircuit,
  Bot,
  Sparkles,
  ScanEye,
  Activity,
  Compass,
} from "lucide-react";

// Inlined brand icons because they are removed in lucide-react v1+
const GithubIcon = ({ size, absoluteStrokeWidth, ...props }: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || "24"}
    height={size || "24"}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ size, absoluteStrokeWidth, ...props }: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || "24"}
    height={size || "24"}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size, absoluteStrokeWidth, ...props }: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || "24"}
    height={size || "24"}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PythonIcon = ({ size, absoluteStrokeWidth, ...props }: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size || "14"}
    height={size || "14"}
    fill="currentColor"
    {...props}
  >
    <path d="M14.25.18a.25.25 0 0 0-.25.25v2.45a.25.25 0 0 0 .25.25h3.04a.25.25 0 0 1 .25.25v3.04a.25.25 0 0 1-.25.25h-4.29a2 2 0 0 0-2 2v2.29a2 2 0 0 0 2 2h4.29a2.5 2.5 0 0 0 2.5-2.5V8.42a2.5 2.5 0 0 0-2.5-2.5H16.2a.25.25 0 0 1-.25-.25V3.04a3 3 0 0 0-3-3h-2.28zM9.75 23.82a.25.25 0 0 0 .25-.25v-2.45a.25.25 0 0 0-.25-.25H6.71a.25.25 0 0 1-.25-.25v-3.04a.25.25 0 0 1 .25-.25h4.29a2 2 0 0 0 2-2v-2.29a2 2 0 0 0-2-2H6.71a2.5 2.5 0 0 0-2.5 2.5v4.29a2.5 2.5 0 0 0 2.5 2.5h1.08a.25.25 0 0 1 .25.25v2.63a3 3 0 0 0 3 3h2.21z" />
  </svg>
);

const VercelIcon = ({ size, absoluteStrokeWidth, ...props }: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size || "14"}
    height={size || "14"}
    fill="currentColor"
    {...props}
  >
    <path d="M24 22.525H0L12 1.475L24 22.525Z" />
  </svg>
);

const iconMap = {
  github: GithubIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  globe: Globe,
  python: PythonIcon,
  django: Layers,
  react: Atom,
  vercel: VercelIcon,
  docker: Container,
  postgresql: Database,
  supabase: Zap,
  githubactions: Workflow,
  expressjs: Terminal,
  sql: Database,
  javascript: Code,
  brain: Brain,
  braincircuit: BrainCircuit,
  bot: Bot,
  sparkles: Sparkles,
  scaneye: ScanEye,
  activity: Activity,
  compass: Compass,
} as const;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = iconMap[name as keyof typeof iconMap];
  if (!LucideIcon) return null;

  return <LucideIcon {...props} />;
};

export default Icon;
