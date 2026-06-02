import { createContext, useContext, useState, type ReactNode } from "react";
import type { KpiKey } from "./atlas-data";

type Selection =
  | { type: "none" }
  | { type: "project"; projectId: string }
  | { type: "kpi"; kpiKey: KpiKey };

interface SelectionStore {
  selection: Selection;
  openProject: (projectId: string) => void;
  openKpi: (kpiKey: KpiKey) => void;
  close: () => void;
}

const Ctx = createContext<SelectionStore | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection>({ type: "none" });
  return (
    <Ctx.Provider
      value={{
        selection,
        openProject: (projectId) => setSelection({ type: "project", projectId }),
        openKpi: (kpiKey) => setSelection({ type: "kpi", kpiKey }),
        close: () => setSelection({ type: "none" }),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSelection must be used inside SelectionProvider");
  return ctx;
}
