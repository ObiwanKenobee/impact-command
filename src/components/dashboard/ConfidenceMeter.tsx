import type { VerificationSource } from "@/lib/atlas-data";

export function ConfidenceMeter({
  confidence,
  sources,
}: {
  confidence: number;
  sources: VerificationSource[];
}) {
  const tone = confidence >= 95 ? "truth" : confidence >= 85 ? "caution" : "critical";
  const toneClass = {
    truth: "text-truth",
    caution: "text-caution",
    critical: "text-critical",
  }[tone];
  const barClass = {
    truth: "bg-truth",
    caution: "bg-caution",
    critical: "bg-critical",
  }[tone];

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-mono font-medium ${toneClass}`}>
            {confidence.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground font-mono">%</span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest ml-1">
            confidence
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase">
          Atlas Trust Score
        </span>
      </div>
      <div className="w-full h-1.5 bg-border-strong/40 rounded-full overflow-hidden">
        <div className={`h-full ${barClass} transition-all duration-700`} style={{ width: `${confidence}%` }} />
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {sources.map((s) => (
          <div
            key={s.key}
            className="flex items-center justify-between text-[10px] px-2 py-1.5 bg-surface/60 ring-1 ring-white/5 rounded"
          >
            <span className="flex items-center gap-2">
              <span
                className={`font-mono ${s.verified ? "text-truth" : "text-muted-foreground"}`}
              >
                {s.verified ? "✓" : "○"}
              </span>
              <span className="text-foreground/90">{s.label}</span>
            </span>
            <span className="font-mono text-muted-foreground">
              {Math.round(s.weight * 100)}% weight
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
