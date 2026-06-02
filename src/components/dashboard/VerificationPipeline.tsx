const stages = [
  { label: "Raw Ingest", status: "ok" as const },
  { label: "AI Validation", status: "ok" as const },
  { label: "Anomaly Det.", status: "ok" as const },
  { label: "Cross-Source", status: "ok" as const },
  { label: "Human Audit", status: "pending" as const },
  { label: "Chain Attest.", status: "queued" as const },
];

const toneFor = (s: (typeof stages)[number]["status"]) =>
  s === "ok"
    ? "text-truth"
    : s === "pending"
      ? "text-caution italic"
      : "text-muted-foreground";

export function VerificationPipeline() {
  return (
    <footer className="h-12 border-t border-border bg-background flex items-center px-6 shrink-0">
      <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mr-8 whitespace-nowrap">
        AI Verification Pipeline
      </div>
      <div className="flex-1 flex items-center justify-between max-w-5xl">
        <div className="flex items-center gap-2">
          {stages.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`text-[10px] font-mono uppercase ${toneFor(s.status)}`}>
                {s.label}
                {s.status === "pending" && " [Pending]"}
              </span>
              {i < stages.length - 1 && <div className="w-8 h-px bg-border-strong/40" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 ml-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground">THROUGHPUT:</span>
            <span className="text-[10px] font-mono text-foreground">1.2GB/s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground">GLOBAL TRUST:</span>
            <span className="text-[10px] font-mono text-truth">98.4%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
