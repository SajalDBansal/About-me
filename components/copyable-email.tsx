"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyableEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access denied — silently ignore, nothing else we can do
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className
      )}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <span>{email}</span>
      {copied ? (
        <Check className="size-3.5 shrink-0" aria-hidden />
      ) : (
        <Copy
          className="size-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden
        />
      )}
    </button>
  );
}
