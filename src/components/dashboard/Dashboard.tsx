import { useEffect, useState } from "react";
import { CommandHeader } from "./CommandHeader";
import { ModuleRail } from "./ModuleRail";
import { MapCanvas } from "./MapCanvas";
import { SensorFeed } from "./SensorFeed";
import { VerificationPipeline } from "./VerificationPipeline";
import { ProjectSheet } from "./ProjectSheet";
import { KpiSheet } from "./KpiSheet";
import { SelectionProvider, useSelection } from "@/lib/selection-store";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { alertStream, seedAlerts, type AiAlert } from "@/lib/atlas-data";

function AlertsTicker({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const [alerts, setAlerts] = useState<AiAlert[]>(() => seedAlerts());
  useEffect(() => alertStream.subscribe((a) => setAlerts((p) => [a, ...p].slice(0, 25))), []);
  const active = alerts.filter((a) => a.severity !== "info").length;
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 px-3 py-1 bg-surface ring-1 ring-white/5 rounded hover:ring-critical/40 transition"
    >
      <span className="size-1.5 rounded-full bg-critical animate-pulse" />
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
        AI Alerts
      </span>
      <span className="text-[10px] font-mono text-critical">{active}</span>
    </button>
  );
}

function DashboardInner() {
  const { selection, close } = useSelection();
  const [alertsOpen, setAlertsOpen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden">
      <CommandHeader rightSlot={<AlertsTicker onOpen={() => setAlertsOpen(true)} />} />
      <main className="flex-1 flex overflow-hidden">
        <ModuleRail />
        <MapCanvas />
        <SensorFeed onOpenAlerts={() => setAlertsOpen(true)} />
      </main>
      <VerificationPipeline />

      <Sheet
        open={selection.type !== "none"}
        onOpenChange={(o) => {
          if (!o) close();
        }}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl bg-background border-l border-border p-0 overflow-y-auto scrollbar-thin"
        >
          {selection.type === "project" && <ProjectSheet projectId={selection.projectId} />}
          {selection.type === "kpi" && <KpiSheet kpiKey={selection.kpiKey} />}
        </SheetContent>
      </Sheet>

      <AlertsDrawer open={alertsOpen} onClose={() => setAlertsOpen(false)} />
    </div>
  );
}

function AlertsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [alerts, setAlerts] = useState<AiAlert[]>(() => seedAlerts());
  useEffect(() => alertStream.subscribe((a) => setAlerts((p) => [a, ...p].slice(0, 25))), []);
  const { openProject } = useSelection();
  const sevClass = {
    critical: "border-critical/40 bg-critical/5",
    warn: "border-caution/40 bg-caution/5",
    info: "border-border bg-surface/40",
  };
  const sevDot = {
    critical: "bg-critical animate-pulse",
    warn: "bg-caution",
    info: "bg-truth",
  };
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-background border-l border-border p-0 overflow-y-auto scrollbar-thin"
      >
        <div className="p-5 border-b border-border">
          <div className="text-[10px] font-mono text-truth uppercase tracking-widest mb-1">
            Live · AI Risk Intelligence
          </div>
          <h2 className="text-base font-medium">Anomaly & Risk Alerts</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Ranked by severity. Each alert includes the model's explanation.
          </p>
        </div>
        <div className="p-4 space-y-3">
          {alerts.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                onClose();
                openProject(a.projectId);
              }}
              className={`w-full text-left p-3 rounded-sm border ${sevClass[a.severity]} hover:ring-1 hover:ring-truth/30 transition`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`size-1.5 rounded-full ${sevDot[a.severity]}`} />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {a.severity}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/70">{a.ts}</span>
              </div>
              <div className="text-xs font-medium text-foreground mb-1">{a.title}</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{a.explanation}</p>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Dashboard() {
  return (
    <SelectionProvider>
      <DashboardInner />
    </SelectionProvider>
  );
}
