import { DATA } from "@/lib/registry";
import { linkIconMap } from "@/lib/icon-map";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/mdx/code-block";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getProjects() {
  return DATA.projects;
}

export async function generateStaticParams() {
  return DATA.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);

  if (!project) return undefined;

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${DATA.profile.url}/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];

  if (!project) {
    notFound();
  }

  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <section id="project">
      <div className="flex justify-start gap-4 items-center">
        <Link
          href="/#projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group"
          aria-label="Back to projects"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Back to projects
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
          {project.title}
        </h1>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {project.links.map((link) => {
              const LinkIcon = linkIconMap[link.type as keyof typeof linkIconMap];
              return (
                <Link
                  href={link.href.trim() || "#"}
                  key={link.type}
                  target="_blank"
                  rel="noopener noreferrer"
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

      <div className="my-6 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>

      <div className="flex flex-col gap-12">
        <p className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          {project.overview || project.description}
        </p>

        <Accordion type="multiple" defaultValue={["highlights"]} className="w-full">
          <AccordionItem value="highlights">
            <AccordionTrigger className="text-xl font-semibold tracking-tight leading-tight">
              Key Highlights
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-3 pl-4 text-base leading-relaxed text-muted-foreground">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {project.features.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight leading-tight">
              What It Does
            </h2>
            <ul className="list-disc space-y-3 pl-4 text-base leading-relaxed text-muted-foreground">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.architecture && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight leading-tight">
              Architecture
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {project.architecture}
            </p>
          </div>
        )}

        {project.services.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight leading-tight">
              Services
            </h2>
            <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
              {project.services.map((service) => (
                <div
                  key={service.name}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4 p-4"
                >
                  <code className="text-xs font-mono font-semibold text-foreground shrink-0 sm:w-44">
                    {service.name}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight leading-tight">
            Tech Stack
          </h2>
          {project.techStack.length > 0 ? (
            <div className="flex flex-col gap-5">
              {project.techStack.map((group) => (
                <div key={group.category} className="flex flex-col gap-2">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="text-xs font-medium border border-border h-7 w-fit px-2.5"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  className="text-xs font-medium border border-border h-7 w-fit px-2.5"
                  variant="outline"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {project.languages.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight leading-tight">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.languages.map((lang) => (
                <Badge
                  key={lang.name}
                  variant="outline"
                  className="text-xs font-medium border border-border h-7 w-fit px-2.5"
                >
                  {lang.name}
                  <span className="text-muted-foreground ml-1">
                    {lang.percent}%
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {project.setup.length > 0 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold tracking-tight leading-tight">
              Getting Started
            </h2>
            <ol className="flex flex-col gap-5">
              {project.setup.map((step, i) => (
                <li key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center size-5 rounded-full bg-muted text-[11px] font-semibold text-muted-foreground shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-base font-medium">{step.step}</span>
                  </div>
                  <div className="ml-7">
                    <CodeBlock>
                      <code className="language-bash">
                        {step.commands.join("\n")}
                      </code>
                    </CodeBlock>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <nav className="mt-12 pt-8 max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {previousProject ? (
            <Link
              href={`/projects/${previousProject.slug}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {previousProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
      </nav>
    </section>
  );
}
