import { getGithubUsername } from "@/lib/registry";
import { cn } from "@/lib/utils";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export const CELL = 11;
export const GAP = 3;

const LEVEL_CLASSES = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

async function fetchContributions(
  username: string
): Promise<ContributionsResponse | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as ContributionsResponse;
    if (!data.contributions?.length) return null;
    return data;
  } catch {
    return null;
  }
}

/** Pads the front of the year with nulls so day-of-week rows line up, then chunks into 7-day week columns. */
function buildWeeks(
  days: ContributionDay[]
): (ContributionDay | null)[][] {
  const firstDayOfWeek = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const padded: (ContributionDay | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...days,
  ];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

/** One label per week column where a new month begins; empty string elsewhere. */
function buildMonthLabels(weeks: (ContributionDay | null)[][]): string[] {
  let lastMonth = -1;
  return weeks.map((week) => {
    const firstDay = week.find((d) => d !== null);
    if (!firstDay) return "";
    const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      return MONTH_LABELS[month];
    }
    return "";
  });
}

export default async function GithubContributions() {
  const username = getGithubUsername();
  if (!username) return null;

  const data = await fetchContributions(username);
  if (!data) return null;

  const weeks = buildWeeks(data.contributions);
  const labels = buildMonthLabels(weeks);
  const total = data.contributions.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full overflow-x-auto">
        <div className="inline-flex flex-col gap-2 min-w-max">
          <div className="flex" style={{ gap: GAP }}>
            {labels.map((label, i) => (
              <div
                key={i}
                style={{ width: CELL }}
                className="text-[10px] text-muted-foreground leading-none whitespace-nowrap"
              >
                {label}
              </div>
            ))}
          </div>
          <div className="flex" style={{ gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={
                      day
                        ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                        : undefined
                    }
                    className={cn(
                      "rounded-[2px]",
                      day ? LEVEL_CLASSES[day.level] : "bg-transparent"
                    )}
                    style={{ width: CELL, height: CELL }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        {total} contributions in the last year on GitHub
      </a>
    </div>
  );
}
