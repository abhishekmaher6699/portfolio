import { Experience } from "@/lib/schemas";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import Icon from "./Icon";

interface Props {
  experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
  const { name, href, logo, positions } = experience;

  return (
    <li className="relative ml-10 py-4">
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="absolute top-4 -left-16 flex items-center justify-center rounded-full bg-white"
      >
        <Avatar className="size-12 border">
          <AvatarImage
            src={logo}
            alt={name}
            loading="lazy"
            decoding="async"
            className="bg-background object-contain"
          />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-1 flex-col justify-start gap-2">
        <Link href={href} target="_blank" rel="noreferrer" className="w-fit">
          <h2 className="text-base leading-none font-semibold">{name}</h2>
        </Link>
        <div className="flex flex-col gap-2">
          {positions.map((position) => (
            <div key={`${position.title}-${position.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-muted-foreground text-sm leading-none font-medium">
                  {position.title}
                </p>
                <time className="text-muted-foreground pr-8 text-xs whitespace-nowrap tabular-nums">
                  <span>{position.start}</span>
                  <span>{" - "}</span>
                  <span>{position.end ?? "Present"}</span>
                </time>
              </div>
              {position.description && (
                <ul className="mt-2 ml-4 list-outside list-disc">
                  {position.description.map((desc, i) => (
                    <li
                      key={i}
                      className="prose dark:prose-invert pr-8 text-sm"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
              {position.links && position.links.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                  {position.links.map((link) => (
                    <Link href={link.href} key={link.href}>
                      <Badge title={link.name} className="flex gap-2">
                        <Icon
                          name={link.icon}
                          aria-hidden="true"
                          className="size-3"
                        />
                        {link.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}
