import { useState } from "react";

const modules = [
  { id: "command", label: "Command Center" },
  { id: "twin", label: "Digital Twin" },
  { id: "iot", label: "IoT Monitor" },
  { id: "verify", label: "AI Verification" },
  { id: "capital", label: "Capital Flow" },
  { id: "risk", label: "Risk Radar" },
  { id: "market", label: "Marketplace" },
];

export function ModuleRail() {
  const [active, setActive] = useState("command");
  return (
    <nav
      className="w-14 border-r border-border flex flex-col items-center py-6 gap-2 bg-background shrink-0"
      aria-label="Modules"
    >
      {modules.map((m) => {
        const isActive = m.id === active;
        return (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            title={m.label}
            aria-label={m.label}
            className={`size-9 rounded-sm grid place-items-center transition-colors ring-1 ${
              isActive
                ? "text-truth bg-truth/10 ring-truth/30"
                : "text-muted-foreground ring-white/5 hover:text-foreground hover:bg-surface"
            }`}
          >
            <span
              className={`size-4 rounded-sm ${isActive ? "bg-current" : "bg-current opacity-30"}`}
            />
          </button>
        );
      })}
      <div className="mt-auto flex flex-col items-center gap-2 pt-6 border-t border-border w-8">
        <div className="size-1 bg-truth rounded-full" />
        <div className="size-1 bg-border-strong rounded-full" />
        <div className="size-1 bg-border-strong rounded-full" />
      </div>
    </nav>
  );
}
