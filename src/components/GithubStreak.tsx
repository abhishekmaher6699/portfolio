import Link from "next/link";

const username = "abhishekmaher6699";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type ApiResponse = {
  total: Record<string, number>;
  contributions: Day[];
};

// Uses your theme's tokens, so it follows light/dark automatically.
const LEVEL_CLASSES = [
  "bg-muted",
  "bg-green-500/25",
  "bg-green-500/50",
  "bg-green-500/75",
  "bg-green-500",
];

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

async function getContributions(): Promise<ApiResponse | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 60 * 60 * 6 } } // refresh every 6 hours
    );
    if (!res.ok) return null;
    return (await res.json()) as ApiResponse;
  } catch {
    return null;
  }
}

// Group days into week columns (Sun → Sat), padding the first/last week.
function toWeeks(days: Day[]) {
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = Array(
    new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
  ).fill(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function monthLabels(weeks: (Day | null)[][]) {
  let prev = -1;
  return weeks.map((week, i) => {
    const first = week.find(Boolean);
    if (!first) return null;
    const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    if (month === prev || i === weeks.length - 1) return null;
    prev = month;
    return MONTHS[month];
  });
}

export default async function GithubStreak() {
  const data = await getContributions();
  const total = data ? Object.values(data.total)[0] ?? 0 : 0;
  const weeks = data ? toWeeks(data.contributions) : [];
  const labels = monthLabels(weeks);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="title text-2xl sm:text-3xl">github contributions</h2>
        <Link
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="link shrink-0 text-sm"
        >
          view profile →
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {data ? (
          <>
            <div
              className="overflow-x-auto p-4 sm:p-5"
              role="region"
              aria-label="Scrollable GitHub contribution calendar"
              tabIndex={0}
            >
              <div className="mx-auto flex w-max gap-[3px]">
                {/* weekday labels */}
                <div className="flex flex-col gap-[3px] pr-1.5 text-[10px] text-muted-foreground">
                  <div className="h-4" />
                  {["", "mon", "", "wed", "", "fri", ""].map((d, i) => (
                    <div key={i} className="h-[11px] leading-[11px]">
                      {d}
                    </div>
                  ))}
                </div>

                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    <div className="relative h-4 w-[11px] text-[10px] text-muted-foreground">
                      {labels[wi] && (
                        <span className="absolute left-0 whitespace-nowrap">
                          {labels[wi]}
                        </span>
                      )}
                    </div>
                    {week.map((day, di) =>
                      day ? (
                        <div
                          key={di}
                          title={`${day.count} contribution${
                            day.count === 1 ? "" : "s"
                          } on ${day.date}`}
                          className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_CLASSES[day.level]}`}
                        />
                      ) : (
                        <div key={di} className="h-[11px] w-[11px]" />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2.5 text-xs text-muted-foreground sm:px-5">
              <span>{total.toLocaleString()} contributions in the last year</span>
              <div className="flex items-center gap-1.5">
                <span>less</span>
                {LEVEL_CLASSES.map((c) => (
                  <div key={c} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />
                ))}
                <span>more</span>
              </div>
            </div>
          </>
        ) : (
          <p className="p-5 text-sm text-muted-foreground">
            couldn't load contributions right now.{" "}
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              view on github →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}