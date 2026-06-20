import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Posts from "@/components/Posts";
import PostsSkeleton from "@/components/PostsSkeleton";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Socials from "@/components/Socials";
import SwipeCards from "@/components/SwipeCards";
import { Button } from "@/components/ui/Button";
import homeContent from "@/data/home.json";
import { getPosts } from "@/lib/posts";
import { ArrowRightIcon, FileDown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const LIMIT = 2; // max show 2

async function RecentPosts() {
  const posts = (await getPosts())
    .filter((post) => !post.draft)
    .slice(0, LIMIT);
  return <Posts posts={posts} />;
}

export default function Home() {
  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <SwipeCards className="md:mr-8" />

        <div className="flex max-w-[320px] flex-col sm:max-w-full">
          <h1 className="title text-3xl text-balance sm:text-4xl">
            {homeContent.introduction.greeting}
          </h1>

          <p className="mt-4 max-w-xl text-sm text-balance sm:text-base">
            {homeContent.introduction.description}
          </p>

          {/* Quick Info Grid */}
          <div className="border-border text-muted-foreground mt-6 grid max-w-sm grid-cols-2 gap-4 border-t pt-4 font-mono text-xs">
            <div>
              <span className="text-muted-foreground/50 mb-0.5 block text-[10px] tracking-wider lowercase">
                Location
              </span>
              <span className="text-foreground font-medium">Pune, India</span>
            </div>
            <div>
              <span className="text-muted-foreground/50 mb-0.5 block text-[10px] tracking-wider uppercase">
                Age
              </span>
              <span className="text-foreground font-medium">22y</span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground/50 mb-0.5 block text-[10px] tracking-wider uppercase">
                Languages
              </span>
              <span className="text-foreground font-medium">
                English, Hindi, Marathi
              </span>
            </div>
          </div>

          {/* <p className="mt-6 text-sm sm:text-base">
            {homeContent.introduction.escalation.text}&nbsp;
            <Link
              href={homeContent.escalationLink.href}
              target="_blank"
              className="link font-semibold underline"
              title={homeContent.escalationLink.title}
            >
              {homeContent.introduction.escalation.linkText}
            </Link>
            {homeContent.introduction.escalation.suffix}
          </p> */}

          <section className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <Experience />

      <Skills />

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">featured projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Projects limit={LIMIT} />
      </section>

      <Certifications />

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-3xl">recent posts</h2>
          <LinkWithIcon
            href="/blog"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Suspense fallback={<PostsSkeleton rows={LIMIT} />}>
          <RecentPosts />
        </Suspense>
      </section>
    </article>
  );
}
