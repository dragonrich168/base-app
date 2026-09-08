import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface BadgeProps {
  tone?: "neutral" | "accent" | "mint" | "amber" | "rose" | "violet";
  children: ReactNode;
}

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return <span className={cn("badge", `badge-${tone}`)}>{children}</span>;
}
