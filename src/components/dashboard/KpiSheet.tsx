import { KPIS, projectsForKpi, type KpiKey } from "@/lib/atlas-data";
import { useSelection } from "@/lib/selection-store";
import { Sparkline } from "./Sparkline";

export function KpiSheet({ kpiKey }: { kpiKey: KpiKey }) {
  const kpi = KPIS.find((k) => k.key === kpiKey);
  const projects = projectsForKpi(kpiKey);
  const { openProject } = useSelection();
  if (!kpi) return null;

  return (
    <div className="flex flex-col">
      <div className="p-5 border-b border-border">
        <div className="text-[10px] font-mono text-truth uppercase tracking-widest mb-1">
          KPI Drilldown
        </div>
        <h2 className="text-lg font-medium tracking-tight">{kpi.label}</h2>
        <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat k="Current" v={kpi.value} />
          <Stat k="24h Δ" v={kpi.delta} tone="truth" />
          <Stat k="Confidence" v={`${kpi.confidence.toFixed(1)}%`} tone="truth" />
        </div>

        <div className="mt-4 p-3 bg-surface/50 ring-1 ring-white/5 rounded-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Confidence Trend · 12h
            </span>
            <span className="text-[10px] font-mono text-truth">
              {kpi.trend.at(-1)?.toFixed(0)}%
            </span>
          </div>
          <Sparkline points={kpi.trend} height={48} />
        </div>

        <div className="mt-4">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">
            Verification Sources
          </div>
          <div className="flex flex-wrap gap-1.5">
            {kpi.sources.map((s) => (
              <span
                key={s}
                className="text-[10px] font-mono text-truth/90 px-2 py-1 bg-truth/5 ring-1 ring-truth/20 rounded"
              >
                ✓ {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="p-5 border-b border-border">
        <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
          Contributing Projects ({projects.length})
        </h3>
        <div className="space-y-2">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => openProject(p.id)}
              className="w-full text-left p-3 bg-surface/40 ring-1 ring-white/5 rounded-sm hover:ring-truth/30 transition"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-sm font-medium">{p.name}</span>
                <span
                  className={`text-[10px] font-mono ${p.confidence >= 95 ? "text-truth" : p.confidence >= 85 ? "text-caution" : "text-critical"}`}
                >
                  {p.confidence.toFixed(1)}% CF
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>{p.region}</span>
                <span>
                  {p.headlineLabel}: <span className="text-foreground">{p.headlineMetric}</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="p-5">
        <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
          Proof Timeline · Rolled-up Attestations
        </h3>
        <ol className="relative border-l border-border-strong/40 ml-2 space-y-3 pb-4">
          {projects
            .flatMap((p) => p.timeline.filter((t) => t.ok).map((t) => ({ ...t, project: p.name })))
            .slice(0, 8)
            .map((e, i) => (
              <li key={i} className="ml-4 relative">
                <span className="absolute -left-[21px] top-1.5 size-2 bg-truth rounded-full ring-2 ring-background" />
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground w-12">{e.date}</span>
                  <span className="text-xs text-truth">{e.title}</span>
                </div>
                <div className="text-[10px] text-muted-foreground ml-14">{e.project}</div>
                {e.blockchainTx && (
                  <div className="text-[9px] font-mono text-truth/80 ml-14 mt-0.5">
                    ⛓ {e.blockchainTx}
                  </div>
                )}
              </li>
            ))}
        </ol>
      </section>
    </div>
  );
}

function Stat({ k, v, tone }: { k: string; v: string; tone?: "truth" }) {
  return (
    <div className="p-2 bg-surface ring-1 ring-white/5 rounded">
      <div className="text-[9px] text-muted-foreground uppercase mb-0.5">{k}</div>
      <div className={`text-xs font-mono ${tone === "truth" ? "text-truth" : "text-foreground"}`}>
        {v}
      </div>
    </div>
  );
}
