import { ToolLogo } from "@/components/tool-logo";
import { getCategory } from "@/data/categories";
import { trendingTools } from "@/data/tools";
import { cn } from "@/lib/utils";

export function LogoMarquee({ className }: { className?: string }) {
  const picks = trendingTools.slice(0, 22);

  return (
    <div className={cn("group relative overflow-hidden py-1", className)}>
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-3 group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-3"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {picks.map((tool) => {
                const category = getCategory(tool.category);
                if (!category) return null;
                return (
                  <span
                    key={`${copy}-${tool.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line/[0.07] bg-cell/40 py-1.5 pl-1.5 pr-3.5 backdrop-blur-sm"
                  >
                    <ToolLogo
                      slug={tool.slug}
                      name={tool.name}
                      accent={category.accent}
                      size="xs"
                    />
                    <span className="whitespace-nowrap text-xs font-medium text-muted">
                      {tool.name}
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
