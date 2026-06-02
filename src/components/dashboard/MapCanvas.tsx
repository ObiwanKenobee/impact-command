import { useState } from "react";
import mapImg from "@/assets/digital-twin-map.jpg";

const layers = [
  "Reforestation",
  "Water Mesh",
  "Energy Grid",
  "Healthcare",
  "Education",
  "Agriculture",
  "Humanitarian",
];

const pins = [
  { id: "amz-04", top: "62%", left: "30%", label: "Xingu Basin", active: true },
  { id: "ken-12", top: "58%", left: "56%", label: "Mara Borehole" },
  { id: "idn-03", top: "64%", left: "78%", label: "Borneo Mangrove" },
  { id: "ind-08", top: "48%", left: "70%", label: "Deccan Solar" },
  { id: "per-02", top: "70%", left: "26%", label: "Andes Water" },
  { id: "ngr-01", top: "55%", left: "50%", label: "Lagos Clinic Net" },
  { id: "col-04", top: "60%", left: "27%", label: "Chocó Forest" },
];

export function MapCanvas() {
  const [active, setActive] = useState("Reforestation");
  const [selected, setSelected] = useState(pins[0].id);
  const project = pins.find((p) => p.id === selected) ?? pins[0];

  return (
    <section className="flex-1 relative bg-surface/20 overflow-hidden">
      {/* Map */}
      <img
        src={mapImg}
        alt="Digital twin of Earth with verified impact project locations"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60 pointer-events-none" />

      {/* Pins */}
      {pins.map((p) => (
        <button
          key={p.id}
          onClick={() => setSelected(p.id)}
          style={{ top: p.top, left: p.left }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group"
          aria-label={`Select project ${p.label}`}
        >
          <span className="relative flex size-3 items-center justify-center">
            <span
              className={`absolute inline-flex size-full rounded-full ${
                p.id === selected ? "bg-truth/60 animate-ping" : "bg-truth/30"
              }`}
            />
            <span
              className={`relative inline-flex size-1.5 rounded-full ${
                p.id === selected ? "bg-truth ring-2 ring-truth/40" : "bg-truth/80"
              }`}
            />
          </span>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-mono text-truth/80 opacity-0 group-hover:opacity-100 transition-opacity">
            {p.label}
          </span>
        </button>
      ))}

      {/* Selected project card */}
      <div className="absolute top-6 left-6 p-4 bg-background/80 backdrop-blur-md ring-1 ring-white/10 rounded-sm w-72">
        <div className="text-[10px] font-mono text-truth mb-3 tracking-wider">
          PRIMARY SECTOR: {project.id.toUpperCase()}
        </div>
        <h2 className="text-sm font-medium text-foreground mb-1">
          {project.label} Verification
        </h2>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Verified biomass increase of 14.2% across 4,200 hectares in Q3, cross-validated
          by Sentinel-2 imagery and 1,240 ground IoT nodes.
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-[10px] font-mono uppercase">
            <span className="text-muted-foreground">Confidence Score</span>
            <span className="text-truth">99.1%</span>
          </div>
          <div className="w-full h-1 bg-border-strong/40 rounded-full overflow-hidden">
            <div className="w-[99%] h-full bg-truth" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2 bg-surface ring-1 ring-white/5 rounded">
            <div className="text-[9px] text-muted-foreground uppercase mb-1">IoT Nodes</div>
            <div className="text-xs font-mono">1,240</div>
          </div>
          <div className="p-2 bg-surface ring-1 ring-white/5 rounded">
            <div className="text-[9px] text-muted-foreground uppercase mb-1">Satellite</div>
            <div className="text-xs font-mono">Daily · S2</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Verified By
          </div>
          {[
            "Satellite Imagery",
            "Drone Photogrammetry",
            "IoT Ground Mesh",
            "Community Validators",
            "AI Anomaly Engine",
          ].map((v) => (
            <div key={v} className="flex items-center gap-2 text-[10px] text-foreground/80">
              <span className="text-truth font-mono">✓</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Layer toggles */}
      <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 max-w-3xl">
        {layers.map((l) => {
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

      {/* Timeline ribbon */}
      <div className="absolute bottom-6 right-6 p-3 bg-background/80 backdrop-blur-md ring-1 ring-white/10 rounded-sm w-72">
        <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">
          Proof Timeline · {project.label}
        </div>
        <ol className="relative border-l border-border-strong/40 ml-1.5 space-y-2">
          {[
            { d: "Jan 01", t: "Project Created" },
            { d: "Jan 05", t: "Sensors Installed" },
            { d: "Jan 18", t: "AI Validation Passed" },
            { d: "Feb 01", t: "Satellite Verified" },
            { d: "Feb 12", t: "Independent Audit" },
            { d: "Feb 13", t: "Impact Token Minted", ok: true },
          ].map((e) => (
            <li key={e.d} className="ml-3 flex items-baseline gap-3">
              <span
                className={`absolute -left-[5px] size-2 rounded-full ${
                  e.ok ? "bg-truth ring-2 ring-truth/30" : "bg-border-strong"
                }`}
              />
              <span className="text-[9px] font-mono text-muted-foreground w-12">{e.d}</span>
              <span className={`text-[10px] ${e.ok ? "text-truth" : "text-foreground/80"}`}>
                {e.t}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
