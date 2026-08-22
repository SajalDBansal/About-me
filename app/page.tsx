import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CopyableEmail } from "@/components/copyable-email";
import { DATA } from "@/lib/registry";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import SkillsSection from "@/components/section/skills-section";
import BlogSection from "@/components/section/blog-section";
import GithubContributions from "@/components/section/github-contributions";
import GithubContributionsSkeleton from "@/components/section/github-contributions-skeleton";
import { Suspense } from "react";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.profile.name.split(" ")[0]}`}
              />
              <BlurFade delay={BLUR_FADE_DELAY}>
                <CopyableEmail
                  email={DATA.profile.email}
                  className="text-base md:text-lg"
                />
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                {DATA.profile.avatarUrl && (
                  <AvatarImage
                    alt={DATA.profile.name}
                    src={DATA.profile.avatarUrl}
                  />
                )}
                <AvatarFallback className="text-2xl font-semibold">
                  {DATA.profile.initials}
                </AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="github-contributions">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <Suspense fallback={<GithubContributionsSkeleton />}>
            <GithubContributions />
          </Suspense>
        </BlurFade>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-2xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <p className="max-w-full text-pretty font-sans leading-relaxed text-muted-foreground">
              {DATA.profile.summary}
            </p>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-2xl font-bold">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <SkillsSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h2 className="text-2xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 12 + index * 0.05}
              >
                <div className="flex items-start gap-x-3 justify-between">
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="font-semibold leading-none">
                      {education.school}
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">
                      {education.degree}
                    </div>
                    {education.cgpa && (
                      <div className="font-sans text-sm text-muted-foreground">
                        CGPA: {education.cgpa}
                      </div>
                    )}
                    {education.courses.length > 0 && (
                      <div className="font-sans text-sm text-muted-foreground">
                        Courses: {education.courses.join(", ")}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <BlogSection />
      </BlurFade>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
