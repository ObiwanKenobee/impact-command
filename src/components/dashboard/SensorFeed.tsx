import { useEffect, useState } from "react";

interface SensorEvent {
  id: string;
  code: string;
  time: string;
  message: string;
  tone: "truth" | "caution" | "critical";
}

const POOL: Omit<SensorEvent, "id" | "time">[] = [
  { code: "SNSR-492-AMZ", message: "Soil Moisture: 42.1% (Nominal)", tone: "truth" },
  { code: "SNSR-881-COG", message: "Carbon Flux: +0.42mg/m²", tone: "truth" },
  { code: "SNSR-112-IND", message: "Tampering Detected: Ch. 04", tone: "critical" },
  { code: "SNSR-902-AMZ", message: "Sap Flow: Steady", tone: "truth" },
  { code: "SNSR-204-KEN", message: "Borehole Flow: 14.2 L/min", tone: "truth" },
  { code: "SNSR-661-IDN", message: "Air Quality drift +0.8σ", tone: "caution" },
  { code: "SNSR-318-BRA", message: "Canopy NDVI: 0.71", tone: "truth" },
  { code: "SNSR-445-COL", message: "Solar Output: 4.21 kW", tone: "truth" },
  { code: "SNSR-991-NGA", message: "Clinic check-ins +12", tone: "truth" },
  { code: "SNSR-552-PER", message: "Rainfall accumulated 8.4mm", tone: "truth" },
];

const toneDot: Record<SensorEvent["tone"], string> = {
  truth: "bg-truth",
  caution: "bg-caution",
  critical: "bg-critical animate-ping",
};
const toneText: Record<SensorEvent["tone"], string> = {
  truth: "text-foreground",
  caution: "text-caution",
  critical: "text-critical",
};
const toneBg: Record<SensorEvent["tone"], string> = {
  truth: "",
  caution: "bg-caution/5",
  critical: "bg-critical/5",
};

function nowTime() {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}

export function SensorFeed() {
  const [events, setEvents] = useState<SensorEvent[]>(() =>
    POOL.slice(0, 8).map((p, i) => ({
      ...p,
      id: `seed-${i}`,
      time: nowTime(),
    })),
  );

  useEffect(() => {
    const t = setInterval(() => {
      const pick = POOL[Math.floor(Math.random() * POOL.length)];
      setEvents((prev) => [
        { ...pick, id: `${Date.now()}`, time: nowTime() },
        ...prev.slice(0, 20),
      ]);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <aside className="w-80 border-l border-border flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest">
            Sensor Network
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
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-border">
        {events.map((e, i) => (
          <div
            key={e.id}
            className={`p-3 hover:bg-surface/40 transition-colors ${toneBg[e.tone]} ${i === 0 ? "animate-ticker-in" : ""}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-mono ${toneText[e.tone]}`}>{e.code}</span>
              <span className="text-[9px] font-mono text-muted-foreground/60">{e.time}</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className={`size-1.5 rounded-full ${toneDot[e.tone]}`} />
              <span className="text-xs text-muted-foreground">{e.message}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
