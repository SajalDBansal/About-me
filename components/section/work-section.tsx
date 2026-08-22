"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/lib/registry";

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.experience.map((work) => (
        <AccordionItem
          key={work.company}
          value={work.company}
          className="w-full border-b-0 grid gap-2"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none [&>svg]:size-4 [&>svg]:text-muted-foreground">
            <div className="flex items-center gap-x-3 justify-between w-full text-left">
              <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                <div className="font-semibold leading-none">
                  {work.company}
                </div>
                <div className="font-sans text-sm text-muted-foreground">
                  {work.title} · {work.type}
                </div>
                <div className="sm:hidden text-xs tabular-nums text-muted-foreground">
                  {work.start} - {work.end ?? "Present"}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                <span>
                  {work.start} - {work.end ?? "Present"}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 text-xs sm:text-sm text-muted-foreground">
            <ul className="list-disc space-y-1.5 pl-4">
              {work.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
