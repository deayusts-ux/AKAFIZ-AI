import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/types";
import { cn, hostname } from "@/lib/utils";

type VisitVariant = "primary" | "ghost" | "compact" | "link";

export function VisitButton({
  tool,
  variant = "primary",
  className,
  label,
}: {
  tool: Pick<Tool, "website" | "name">;
  variant?: VisitVariant;
  className?: string;
  label?: string;
}) {
  const text = label ?? "Kunjungi Website";
  const base = "group/visit inline-flex items-center justify-center gap-1.5 font-semibold";

  const styles: Record<VisitVariant, string> = {
    primary: "btn-primary h-11 px-5 text-sm",
    ghost: "btn-ghost h-11 px-4 text-sm",
    compact: "btn-ghost h-9 rounded-lg px-3 text-xs",
    link: "text-sm text-aqua hover:text-ink",
  };

  return (
    <a
      href={tool.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Buka situs resmi ${tool.name} (${hostname(tool.website)}) di tab baru`}
      className={cn(base, styles[variant], className)}
    >
      <span>{text}</span>
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
