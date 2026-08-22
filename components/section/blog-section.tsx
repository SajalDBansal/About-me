import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;
const RECENT_POSTS = 3;

export default function BlogSection() {
  const sortedPosts = [...allPosts]
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) return -1;
      return 1;
    })
    .slice(0, RECENT_POSTS);

  if (sortedPosts.length === 0) return null;

  return (
    <section id="blog">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">From the Blog</h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
            >
              View all posts
              <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </BlurFade>
        <div className="flex flex-col gap-4">
          {sortedPosts.map((post, id) => {
            const slug = post._meta.path.replace(/\.mdx$/, "");
            return (
              <BlurFade key={slug} delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
                <Link
                  href={`/blog/${slug}`}
                  className="flex flex-col gap-1 group border border-border rounded-xl p-4 hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium tracking-tight group-hover:text-foreground transition-colors">
                      {post.title}
                    </h3>
                    <time className="text-xs text-muted-foreground shrink-0">
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {post.summary}
                  </p>
                </Link>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
