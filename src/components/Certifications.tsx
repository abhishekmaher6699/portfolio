import data from "@/data/certifications.json";
import { certificationsSchema } from "@/lib/schemas";
import { Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Certifications() {
  const certs = certificationsSchema.parse(data).certifications;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="title text-2xl sm:text-3xl">certifications</h2>
      <div className="border-border border-t">
        <ul className="flex flex-col">
          {certs.map((cert, idx) => {
            const hasLink = cert.href && cert.href.trim().length > 0;
            const content = (
              <div className="hover:bg-muted/10 flex items-center gap-4 rounded-lg py-4 pr-2 transition-colors">
                {/* Left Icon */}
                <div className="border-border bg-muted/30 text-muted-foreground/80 flex size-8 shrink-0 items-center justify-center rounded-lg border">
                  <Award className="size-4.5" />
                </div>

                {/* Central Info */}
                <div className="border-border flex-1 space-y-0.5 border-l border-dashed pl-4">
                  <h3 className="text-foreground/95 text-sm leading-snug font-semibold">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground font-mono text-xs">
                    <span className="text-muted-foreground/45 select-none">
                      @
                    </span>{" "}
                    {cert.issuer}
                  </p>
                </div>

                {/* Right Arrow (if link exists) */}
                {hasLink && (
                  <ArrowUpRight className="text-muted-foreground/60 size-4" />
                )}
              </div>
            );

            return (
              <li key={idx} className="border-border border-b last:border-none">
                {hasLink ? (
                  <Link
                    href={cert.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
