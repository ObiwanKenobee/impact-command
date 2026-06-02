import { createFileRoute } from "@tanstack/react-router";
import { CommandHeader } from "@/components/dashboard/CommandHeader";
import { ModuleRail } from "@/components/dashboard/ModuleRail";
import { MapCanvas } from "@/components/dashboard/MapCanvas";
import { SensorFeed } from "@/components/dashboard/SensorFeed";
import { VerificationPipeline } from "@/components/dashboard/VerificationPipeline";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Sanctum — Impact Verification Command" },
      {
        name: "description",
        content:
          "Mission-control dashboard for verified global impact. IoT sensors, satellite feeds, AI anomaly detection, community validation, blockchain attestations.",
      },
      { property: "og:title", content: "Atlas Sanctum — Impact Verification Command" },
      {
        property: "og:description",
        content: "Visualize proof, not reports.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden">
      <CommandHeader />
      <main className="flex-1 flex overflow-hidden">
        <ModuleRail />
        <MapCanvas />
        <SensorFeed />
      </main>
      <VerificationPipeline />
    </div>
  );
}
