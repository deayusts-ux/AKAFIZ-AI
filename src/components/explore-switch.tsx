import Link from "next/link";
import { Lightbulb, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExploreSwitch({ active }: { active: "ai" | "idea" }) {
  const items = [
    { key: "ai", href: "/explore", label: "Tool AI", icon: Sparkles },
    { key: "idea", href: "/explore-idea", label: "Sumber Ide", icon: Lightbulb },
  ] as const;

  return (
    <nav
      aria-label="Pilih direktori"
      className="inline-flex rounded-full border border-line/10 bg-line/[0.03] p-1"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors",
              isActive ? "bg-ink text-canvas" : "text-muted hover:text-ink",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
