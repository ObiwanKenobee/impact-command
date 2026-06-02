import { useSelection } from "@/lib/selection-store";
import type { Kpi } from "@/lib/atlas-data";
import { Sparkline } from "./Sparkline";

const toneClass = {
  truth: "bg-truth/10 text-truth ring-truth/20",
  caution: "bg-caution/10 text-caution ring-caution/20",
  critical: "bg-critical/10 text-critical ring-critical/20",
  neutral: "bg-surface text-muted-foreground ring-white/5",
} as const;

function toneFor(conf: number) {
  if (conf >= 95) return "truth";
  if (conf >= 85) return "caution";
  return "critical";
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const { openKpi } = useSelection();
  const tone = toneFor(kpi.confidence);
  return (
    <button
      onClick={() => openKpi(kpi.key)}
      className="text-left p-4 bg-surface/50 ring-1 ring-white/5 rounded-sm hover:ring-truth/30 hover:bg-surface transition-colors group focus:outline-none focus:ring-truth/50"
    >
      <div className="flex justify-between items-start mb-2 gap-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate">
          {kpi.label}
        </span>
        <span
          className={`text-[10px] px-1.5 py-0.5 ring-1 rounded font-mono whitespace-nowrap ${toneClass[tone]}`}
        >
          {kpi.confidence.toFixed(1)}% CF
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-xl font-mono font-medium text-foreground">{kpi.value}</span>
        <span className="text-[10px] font-mono text-truth">{kpi.delta}</span>
      </div>
      <Sparkline points={kpi.trend} height={22} />
      <div className="mt-2 flex flex-wrap gap-1">
        {kpi.sources.slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-[9px] font-mono text-muted-foreground/80 px-1.5 py-0.5 bg-background ring-1 ring-white/5 rounded"
          >
            {s}
          </span>
        ))}
      </div>
    </button>
  );
}
