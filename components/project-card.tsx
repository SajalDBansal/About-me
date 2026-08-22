"use client";

import { Badge } from "@/components/ui/badge";
import { linkIconMap } from "@/lib/icon-map";
import { type ProjectLink } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: readonly string[];
  links?: readonly ProjectLink[];
  className?: string;
}

export function ProjectCard({
  slug,
  title,
  tagline,
  description,
  tags,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200",
        className
      )}
    >
      <Link
        href={`/projects/${slug}`}
        className="flex flex-col gap-3 flex-1 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
      >
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold flex items-center gap-1">
            {title}
            <ArrowUpRight
              className="size-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              aria-hidden
            />
          </h3>
          <p className="text-xs text-muted-foreground">{tagline}</p>
        </div>
        <p className="text-xs flex-1 text-pretty font-sans leading-relaxed text-muted-foreground">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Link>
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pb-4">
          {links.map((link) => {
            const LinkIcon = linkIconMap[link.type as keyof typeof linkIconMap];
            return (
              <Link
                href={link.href.trim() || "#"}
                key={link.type}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  variant="default"
                >
                  {LinkIcon && <LinkIcon className="size-3" />}
                  {link.type}
                </Badge>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
