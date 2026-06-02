import { PROJECT_INDEX } from "@/lib/atlas-data";
import type { PipelineStage } from "@/lib/atlas-data";
import { ConfidenceMeter } from "./ConfidenceMeter";

const statusTone: Record<PipelineStage["status"], string> = {
  ok: "text-truth",
  running: "text-truth animate-pulse",
  pending: "text-caution italic",
  queued: "text-muted-foreground",
  failed: "text-critical",
};
const statusDot: Record<PipelineStage["status"], string> = {
  ok: "bg-truth",
  running: "bg-truth animate-pulse",
  pending: "bg-caution",
  queued: "bg-border-strong",
  failed: "bg-critical",
};
const statusLabel: Record<PipelineStage["status"], string> = {
  ok: "OK",
  running: "RUNNING",
  pending: "PENDING",
  queued: "QUEUED",
  failed: "FAILED",
};

export function ProjectSheet({ projectId }: { projectId: string }) {
  const p = PROJECT_INDEX[projectId];
  if (!p) return null;

  return (
    <div className="flex flex-col">
      <div className="p-5 border-b border-border">
        <div className="text-[10px] font-mono text-truth uppercase tracking-widest mb-1">
          {p.layer} · {p.region}
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-medium tracking-tight">{p.name}</h2>
          <div className="text-right">
            <div className="text-[9px] font-mono uppercase text-muted-foreground tracking-widest">{p.headlineLabel}</div>
            <div className="text-base font-mono text-foreground">{p.headlineMetric}</div>
          </div>
        </div>
      </div>

      <Section label="Trust Score">
        <ConfidenceMeter confidence={p.confidence} sources={p.sources} />
      </Section>

      <Section label="Live Sensor Data">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Stat k="IoT Nodes" v={p.iotNodes.toLocaleString()} />
          <Stat k="Satellite" v={p.satelliteCadence} />
          <Stat k="Confidence" v={`${p.confidence.toFixed(1)}%`} />
        </div>
        <div className="divide-y divide-border ring-1 ring-white/5 rounded-sm overflow-hidden bg-surface/40">
          {p.recentSensors.map((s) => (
            <div key={s.code} className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-truth" />
                <span className="text-[10px] font-mono text-foreground">{s.code}</span>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">
                {s.metric}: <span className="text-foreground">{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Satellite View">
        <div className="aspect-video bg-surface ring-1 ring-white/5 rounded-sm overflow-hidden relative grid place-items-center">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,var(--color-border)_0_1px,transparent_1px_60px),repeating-linear-gradient(0deg,var(--color-border)_0_1px,transparent_1px_60px)] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-truth/10 via-transparent to-transparent" />
          <div className="absolute top-2 left-2 text-[9px] font-mono text-truth/70 uppercase tracking-widest">
            {p.satelliteCadence} · {new Date().toISOString().slice(0, 10)}
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-muted-foreground">
            Δ NDVI +0.04
          </div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest relative">
            Tile loaded · zoom 12
          </span>
        </div>
      </Section>

      <Section label="AI Verification Pipeline">
        <ol className="space-y-2">
          {p.pipeline.map((s, i) => (
            <li key={s.key} className="flex items-start gap-3 p-3 bg-surface/40 ring-1 ring-white/5 rounded-sm">
              <span className="text-[10px] font-mono text-muted-foreground w-4 mt-0.5">{i + 1}</span>
              <span className={`size-2 rounded-full mt-1.5 ${statusDot[s.status]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium">{s.label}</span>
                  <span className={`text-[9px] font-mono uppercase tracking-wider ${statusTone[s.status]}`}>
                    {statusLabel[s.status]}
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{s.detail}</div>
                {s.ts && (
                  <div className="text-[9px] font-mono text-muted-foreground/60 mt-0.5">{s.ts}</div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Financial Flow">
        <ol className="relative border-l border-border-strong/40 ml-2 space-y-3">
          {p.financialFlow.map((f, i) => (
            <li key={i} className="ml-4 relative">
              <span className="absolute -left-[21px] top-1.5 size-2 bg-truth rounded-full ring-2 ring-background" />
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{f.step}</div>
              <div className="flex justify-between items-baseline gap-3">
                <span className="text-xs text-foreground">{f.party}</span>
                <span className="text-xs font-mono text-truth">{f.amount}</span>
              </div>
              {f.txHash && (
                <div className="text-[9px] font-mono text-muted-foreground/70 mt-0.5">
                  tx: {f.txHash}
                </div>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Verification History">
        <ol className="relative border-l border-border-strong/40 ml-2 space-y-3 pb-6">
          {p.timeline.map((e, i) => (
            <li key={i} className="ml-4 relative">
              <span
                className={`absolute -left-[21px] top-1.5 size-2 rounded-full ring-2 ring-background ${e.ok ? "bg-truth" : "bg-border-strong"}`}
              />
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono text-muted-foreground w-12">{e.date}</span>
                <span className={`text-xs ${e.ok ? "text-truth" : "text-foreground"}`}>{e.title}</span>
              </div>
              {e.detail && <div className="text-[10px] text-muted-foreground ml-14">{e.detail}</div>}
              {e.blockchainTx && (
                <div className="text-[9px] font-mono text-truth/80 ml-14 mt-0.5">⛓ {e.blockchainTx}</div>
              )}
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="p-5 border-b border-border">
      <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
        {label}
      </h3>
      {children}
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="p-2 bg-surface ring-1 ring-white/5 rounded">
      <div className="text-[9px] text-muted-foreground uppercase mb-0.5">{k}</div>
      <div className="text-xs font-mono">{v}</div>
    </div>
  );
}
