import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-surface flex flex-col items-center px-6 py-16 text-center sm:py-20",
        className,
      )}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line/10 bg-gradient-to-br from-iris/15 via-plasma/10 to-aqua/15 text-aqua">
        {icon}
      </span>
      <h2 className="mt-5 font-display text-xl font-bold tracking-[-0.02em] text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{description}</p>
      {action ? <div className="mt-6 flex flex-wrap justify-center gap-2">{action}</div> : null}
    </div>
  );
}
