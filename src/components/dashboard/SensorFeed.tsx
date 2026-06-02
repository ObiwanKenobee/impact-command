import { useEffect, useState } from "react";
import { sensorStream, type SensorTick } from "@/lib/atlas-data";
import { useSelection } from "@/lib/selection-store";

const sevDot: Record<SensorTick["severity"], string> = {
  info: "bg-truth",
  warn: "bg-caution",
  critical: "bg-critical animate-ping",
};
const sevText: Record<SensorTick["severity"], string> = {
  info: "text-foreground",
  warn: "text-caution",
  critical: "text-critical",
};
const sevBg: Record<SensorTick["severity"], string> = {
  info: "",
  warn: "bg-caution/5",
  critical: "bg-critical/5",
};

export function SensorFeed({ onOpenAlerts }: { onOpenAlerts: () => void }) {
  const [events, setEvents] = useState<SensorTick[]>([]);
  const { openProject } = useSelection();

  useEffect(() => sensorStream.subscribe((tick) => {
    setEvents((prev) => [tick, ...prev].slice(0, 50));
  }), []);

  return (
    <aside className="w-80 border-l border-border flex flex-col bg-background shrink-0">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest">
            Sensor Network · MQTT
          </h3>
          <span className="text-[9px] font-mono text-truth px-1.5 py-0.5 bg-truth/10 rounded">
            LIVE FEED
          </span>
        </div>
        <div className="flex gap-4">
          <div>
            <div className="text-lg font-mono text-foreground">12,421</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">
              Online
            </div>
          </div>
          <div className="border-l border-border pl-4">
            <div className="text-lg font-mono text-muted-foreground">143</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">
              Offline
            </div>
          </div>
          <div className="border-l border-border pl-4">
            <div className="text-lg font-mono text-foreground">28.3k</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">
              Streams/min
            </div>
          </div>
        </div>
        <button
          onClick={onOpenAlerts}
          className="mt-3 w-full flex items-center justify-between px-3 py-2 bg-critical/5 ring-1 ring-critical/30 rounded hover:bg-critical/10 transition"
        >
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-critical animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-critical">
              AI Alerts
            </span>
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">Open panel →</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-border">
        {events.length === 0 && (
          <div className="p-4 text-[10px] font-mono text-muted-foreground/60 uppercase">
            Awaiting telemetry…
          </div>
        )}
        {events.map((e, i) => (
          <button
            key={e.id}
            onClick={() => openProject(e.projectId)}
            className={`w-full text-left p-3 hover:bg-surface/40 transition-colors ${sevBg[e.severity]} ${i === 0 ? "animate-ticker-in" : ""}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-mono ${sevText[e.severity]}`}>{e.code}</span>
              <span className="text-[9px] font-mono text-muted-foreground/60">{e.time}</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className={`size-1.5 rounded-full ${sevDot[e.severity]}`} />
              <span className="text-xs text-muted-foreground truncate">
                {e.metric}: <span className="text-foreground/80">{e.value}</span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
