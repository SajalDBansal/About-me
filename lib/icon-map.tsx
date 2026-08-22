import { HomeIcon, NotebookIcon } from "lucide-react";
import { Icons } from "@/components/icons";

/** Keyed by the `icon` string used in data/registry.json's navbar entries. */
export const navIconMap = {
  home: HomeIcon,
  notebook: NotebookIcon,
} as const;

/** Keyed by the social platform name used as keys in data/registry.json's profile.social. */
export const socialIconMap = {
  GitHub: Icons.github,
  LinkedIn: Icons.linkedin,
  Email: Icons.email,
} as const;

/** Keyed by the `type` string used in data/registry.json's project links. */
export const linkIconMap = {
  GitHub: Icons.github,
  Demo: Icons.globe,
} as const;
