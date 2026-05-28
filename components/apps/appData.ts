import { Cpu, Folder, Globe, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppId = "ai-core" | "file-system" | "browser" | "terminal";

export interface AppDefinition {
  id: AppId;
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const apps: AppDefinition[] = [
  {
    id: "ai-core",
    title: "AI Core",
    label: "AI Core",
    description: "Manage AI services, system learning, and predictive diagnostics.",
    icon: Cpu,
  },
  {
    id: "file-system",
    title: "File System",
    label: "Files",
    description: "Browse stored assets, archive views, and quick file actions.",
    icon: Folder,
  },
  {
    id: "browser",
    title: "Browser",
    label: "Browser",
    description: "Explore network feeds, system portals, and secure web layers.",
    icon: Globe,
  },
  {
    id: "terminal",
    title: "Terminal",
    label: "Terminal",
    description: "Run commands, review logs, and inspect the operating shell.",
    icon: Terminal,
  },
];
