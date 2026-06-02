import { useState } from "react";
import mapImg from "@/assets/digital-twin-map.jpg";
import { PROJECTS } from "@/lib/atlas-data";
import { useSelection } from "@/lib/selection-store";

const layers = [
  "Reforestation",
  "Water Mesh",
  "Energy Grid",
  "Healthcare",
  "Education",
  "Agriculture",
  "Humanitarian",
];

const sevRing = (c: number) =>
  c >= 95 ? "bg-truth" : c >= 85 ? "bg-caution" : "bg-critical";

export function MapCanvas() {
  const [active, setActive] = useState("All");
  const { openProject } = useSelection();

  const visible =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.layer === active);

  return (
    <section className="flex-1 relative bg-surface/20 overflow-hidden">
      <img
        src={mapImg}
        alt="Digital twin of Earth with verified impact project locations"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60 pointer-events-none" />

      {visible.map((p) => (
        <button
          key={p.id}
          onClick={() => openProject(p.id)}
          style={{ top: p.coords.top, left: p.coords.left }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group"
          aria-label={`Open project ${p.name}`}
        >
          <span className="relative flex size-3 items-center justify-center">
            <span className={`absolute inline-flex size-full rounded-full ${sevRing(p.confidence)} opacity-40 animate-ping`} />
            <span className={`relative inline-flex size-1.5 rounded-full ${sevRing(p.confidence)} ring-2 ring-background`} />
          </span>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-mono text-truth/80 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-1.5 py-0.5 rounded">
            {p.name}
          </span>
        </button>
      ))}

      <div className="absolute top-6 left-6 p-4 bg-background/80 backdrop-blur-md ring-1 ring-white/10 rounded-sm max-w-72">
        <div className="text-[10px] font-mono text-truth mb-2 tracking-wider">DIGITAL TWIN · ACTIVE</div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Click any glowing pin to open the project's verified evidence: sensor data, satellite views,
          funding flow, and verification history.
        </p>
        <div className="mt-3 flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-truth" /><span className="text-muted-foreground">≥95% CF</span></span>
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-caution" /><span className="text-muted-foreground">85–95%</span></span>
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-critical" /><span className="text-muted-foreground">&lt;85%</span></span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 max-w-3xl">
        {(["All", ...layers] as const).map((l) => {
          const isActive = l === active;
          return (
            <button
              key={l}
              onClick={() => setActive(l)}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-sm transition-colors ring-1 ${
                isActive
                  ? "bg-background text-truth ring-truth/50"
                  : "bg-surface text-muted-foreground ring-white/5 hover:text-foreground"
              }`}
            >
              {l}
            </button>
          );
        })}
      </div>
    </section>
  );
}
