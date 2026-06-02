interface KpiCardProps {
  label: string;
  value: string;
  confidence?: string;
  confidenceTone?: "truth" | "caution" | "critical" | "neutral";
  source?: string;
  showBar?: boolean;
  barPct?: number;
}

const toneClass: Record<NonNullable<KpiCardProps["confidenceTone"]>, string> = {
  truth: "bg-truth/10 text-truth ring-truth/20",
  caution: "bg-caution/10 text-caution ring-caution/20",
  critical: "bg-critical/10 text-critical ring-critical/20",
  neutral: "bg-surface text-muted-foreground ring-white/5",
};

export function KpiCard({
  label,
  value,
  confidence,
  confidenceTone = "truth",
  source,
  showBar,
  barPct = 80,
}: KpiCardProps) {
  return (
    <div className="p-4 bg-surface/50 ring-1 ring-white/5 rounded-sm">
      <div className="flex justify-between items-start mb-2 gap-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        {confidence && (
          <span
            className={`text-[10px] px-1.5 py-0.5 ring-1 rounded font-mono whitespace-nowrap ${toneClass[confidenceTone]}`}
          >
            {confidence}
          </span>
        )}
      </div>
      <div className="text-xl font-mono font-medium text-foreground">{value}</div>
      {showBar ? (
        <div className="mt-3">
          <div className="w-full h-1 bg-border-strong/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-truth transition-all duration-700"
              style={{ width: `${barPct}%` }}
            />
          </div>
        </div>
      ) : source ? (
        <div className="mt-3 text-[10px] text-muted-foreground">{source}</div>
      ) : null}
    </div>
  );
}
