import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Faq({
  items,
  className,
}: {
  items: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group card-surface overflow-hidden px-5 py-4 transition-colors open:border-iris/25"
        >
          <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-ink">
            <span>{item.question}</span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line/10 bg-line/[0.04] text-muted transition-colors group-open:border-iris/30 group-open:text-aqua">
              <Plus className="faq-plus h-3.5 w-3.5 transition-transform duration-300" aria-hidden="true" />
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
