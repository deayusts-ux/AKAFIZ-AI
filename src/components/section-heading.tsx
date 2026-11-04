import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  href,
  linkLabel,
  className,
  align = "left",
}: {
  label?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {label ? (
          <p className="section-label mb-2">
            <span className="h-px w-5 bg-gradient-to-r from-iris to-aqua" aria-hidden="true" />
            {label}
          </p>
        ) : null}
        <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[15px]">{description}</p>
        ) : null}
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-line/10 bg-line/[0.03] px-4 py-2 text-xs font-semibold text-muted transition-all duration-300 hover:border-line/20 hover:bg-line/[0.07] hover:text-ink sm:self-auto"
        >
          {linkLabel}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}
