import { CELL, GAP } from "@/components/section/github-contributions";

const WEEK_COUNT = 53;
const DAY_COUNT = 7;
const LABEL_WIDTHS = [28, 24, 28, 26, 30, 26, 28, 30, 28, 30, 32, 28];

export default function GithubContributionsSkeleton() {
  return (
    <div
      className="w-full overflow-x-auto"
      aria-busy="true"
      aria-label="Loading GitHub contributions"
    >
      <div className="inline-flex flex-col gap-2 min-w-max">
        <div className="flex items-center" style={{ gap: 24, height: CELL }}>
          {LABEL_WIDTHS.map((width, i) => (
            <div
              key={i}
              className="h-2.5 animate-pulse rounded-sm bg-muted"
              style={{ width, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
        <div className="flex" style={{ gap: GAP }}>
          {Array.from({ length: WEEK_COUNT }).map((_, wi) => (
            <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
              {Array.from({ length: DAY_COUNT }).map((_, di) => (
                <div
                  key={di}
                  className="animate-pulse rounded-[2px] bg-muted"
                  style={{
                    width: CELL,
                    height: CELL,
                    animationDelay: `${(wi * DAY_COUNT + di) * 5}ms`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
