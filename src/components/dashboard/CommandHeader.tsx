import { useEffect, useState } from "react";
import { KpiCard } from "./KpiCard";

function utcNow() {
  return new Date().toISOString().slice(11, 19);
}

export function CommandHeader() {
  const [clock, setClock] = useState(utcNow());
  useEffect(() => {
    const t = setInterval(() => setClock(utcNow()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="border-b border-border bg-background px-6 py-4 shrink-0">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="size-8 bg-truth/20 ring-1 ring-truth/50 rounded grid place-items-center">
            <div className="size-2 bg-truth rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-medium tracking-tight text-foreground uppercase">
              Atlas Sanctum{" "}
              <span className="text-muted-foreground">// Operational Command</span>
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Synchronized with 12,421 ground nodes · 7 satellite constellations
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-surface ring-1 ring-white/5 rounded">
            <span className="text-[10px] font-mono text-muted-foreground">UTC</span>
            <span className="text-[10px] font-mono text-foreground">{clock}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-surface ring-1 ring-white/5 rounded">
            <span className="text-[10px] font-mono text-muted-foreground">LATENCY:</span>
            <span className="text-[10px] font-mono text-truth">14MS</span>
          </div>
          <button className="text-xs bg-truth text-primary-foreground font-medium px-4 py-1.5 rounded ring-1 ring-truth/50 hover:brightness-110 transition uppercase tracking-wider">
            Force Audit Re-Sync
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard
          label="Verified Impact / 24h"
          value="$2,481,204"
          confidence="99.4% CONF"
          showBar
          barPct={94}
        />
        <KpiCard
          label="Carbon Removed"
          value="124,320 t"
          confidence="97.2% CONF"
          source="Source: LIDAR + Sentinel-2"
        />
        <KpiCard
          label="Trees Verified"
          value="8,431,224"
          confidence="98.8% CONF"
          source="Source: Drone Photogrammetry"
        />
        <KpiCard
          label="Water Restored"
          value="42.1M Liters"
          confidence="84.1% CONF"
          confidenceTone="caution"
          source="Source: IoT Flow Meters"
        />
        <KpiCard
          label="People Impacted"
          value="1.24M"
          confidence="92.0% CONF"
          source="Source: Biometric Oracle"
        />
        <KpiCard
          label="Projects Monitored"
          value="2,423"
          confidence="LIVE"
          confidenceTone="neutral"
          source="Global Monitoring Mesh"
        />
      </div>
    </header>
  );
}
