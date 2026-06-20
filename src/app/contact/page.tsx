import Icon from "@/components/Icon";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <article className="mt-8 flex flex-col gap-6 pb-16">
      <h1 className="title">contact me.</h1>

      <p className="text-muted-foreground max-w-lg text-sm leading-relaxed sm:text-base">
        Feel free to reach out for collaborations, career opportunities, or just
        to say hi!
      </p>

      {/* Inline Contact Info */}
      <div className="border-border mt-4 flex flex-col gap-3.5 border-t pt-6 font-mono text-sm">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Mail className="text-muted-foreground/60 mr-1 size-4" />
          <span className="text-muted-foreground/50 select-none">email:</span>
          <a
            href="mailto:abhishekmaher2004@gmail.com"
            className="link text-foreground font-semibold hover:underline"
          >
            abhishekmaher2004@gmail.com
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Icon
            name="github"
            className="text-muted-foreground/60 mr-1 size-4"
          />
          <span className="text-muted-foreground/50 select-none">github:</span>
          <a
            href="https://github.com/abhishekmaher6699"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-foreground font-semibold hover:underline"
          >
            abhishekmaher6699
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Icon
            name="linkedin"
            className="text-muted-foreground/60 mr-1 size-4"
          />
          <span className="text-muted-foreground/50 select-none">
            linkedin:
          </span>
          <a
            href="https://linkedin.com/in/abhishek-maher-yo"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-foreground font-semibold hover:underline"
          >
            abhishek-maher-yo
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Icon
            name="twitter"
            className="text-muted-foreground/60 mr-1 size-4"
          />
          <span className="text-muted-foreground/50 select-none">twitter:</span>
          <a
            href="https://twitter.com/abhiuwu"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-foreground font-semibold hover:underline"
          >
            @abhiuwu
          </a>
        </div>
      </div>
    </article>
  );
}
