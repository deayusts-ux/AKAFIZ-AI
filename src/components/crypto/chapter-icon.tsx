import {
  Activity,
  BarChart3,
  Bitcoin,
  BookOpen,
  ChartCandlestick,
  Layers,
  Layers2,
  LineChart,
  Newspaper,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  Bitcoin,
  CandlestickChart: ChartCandlestick,
  ChartCandlestick,
  Layers,
  Layers2,
  LineChart,
  Newspaper,
  ShieldCheck,
};

export function chapterIcon(name: string): LucideIcon {
  return iconMap[name] ?? BookOpen;
}
