import { Badge } from "@/components/ui/badge";
import { DATA } from "@/lib/registry";

export default function SkillsSection() {
  return (
    <div className="flex flex-col gap-y-5">
      {DATA.skills.map((group) => (
        <div key={group.category} className="flex flex-col gap-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {group.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="text-xs font-medium border border-border min-h-7 w-fit px-3 py-1.5 leading-snug"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
