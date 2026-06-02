export type Severity = "info" | "warn" | "critical";
export type StageStatus = "ok" | "running" | "pending" | "queued" | "failed";

export interface VerificationSource {
  key: string;
  label: string;
  verified: boolean;
  weight: number; // 0..1 contribution to confidence
}

export interface PipelineStage {
  key: string;
  label: string;
  status: StageStatus;
  detail: string;
  ts?: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  detail?: string;
  blockchainTx?: string;
  ok?: boolean;
}

export interface FinancialFlow {
  step: string;
  party: string;
  amount: string;
  txHash?: string;
}

export interface Project {
  id: string;
  name: string;
  region: string;
  layer:
    | "Reforestation"
    | "Water Mesh"
    | "Energy Grid"
    | "Healthcare"
    | "Education"
    | "Agriculture"
    | "Humanitarian";
  coords: { top: string; left: string };
  headlineMetric: string;
  headlineLabel: string;
  confidence: number; // 0..100
  contributesTo: Array<KpiKey>;
  iotNodes: number;
  satelliteCadence: string;
  satellitePrompt: string;
  sources: VerificationSource[];
  pipeline: PipelineStage[];
  timeline: TimelineEvent[];
  financialFlow: FinancialFlow[];
  recentSensors: Array<{ code: string; metric: string; value: string }>;
}

export type KpiKey =
  | "impact_usd"
  | "carbon"
  | "trees"
  | "water"
  | "people"
  | "projects";

export interface Kpi {
  key: KpiKey;
  label: string;
  value: string;
  delta: string;
  confidence: number;
  trend: number[]; // 12 points 0..100
  sources: string[];
  description: string;
}

export const KPIS: Kpi[] = [
  {
    key: "impact_usd",
    label: "Verified Impact / 24h",
    value: "$2,481,204",
    delta: "+12.4%",
    confidence: 99.4,
    trend: [62, 70, 64, 78, 82, 75, 88, 84, 91, 88, 96, 94],
    sources: ["Financial Ledger", "Smart Contracts", "AI Validator"],
    description: "USD-denominated outcomes verified across all active projects in the past 24h.",
  },
  {
    key: "carbon",
    label: "Carbon Removed",
    value: "124,320 t",
    delta: "+1,204t",
    confidence: 97.2,
    trend: [40, 44, 48, 52, 55, 60, 64, 70, 74, 78, 82, 86],
    sources: ["LIDAR", "Sentinel-2", "Ground IoT"],
    description: "Net CO₂-equivalent sequestration cross-validated by satellite biomass and ground sensors.",
  },
  {
    key: "trees",
    label: "Trees Verified",
    value: "8,431,224",
    delta: "+8,212",
    confidence: 98.8,
    trend: [30, 38, 42, 51, 58, 62, 68, 72, 79, 84, 90, 95],
    sources: ["Drone Photogrammetry", "Satellite", "Community"],
    description: "Individual canopy crowns confirmed via drone + satellite stereoscopy and community audits.",
  },
  {
    key: "water",
    label: "Water Restored",
    value: "42.1M Liters",
    delta: "+0.4M",
    confidence: 84.1,
    trend: [55, 60, 58, 64, 62, 68, 65, 72, 70, 75, 80, 84],
    sources: ["IoT Flow Meters", "Community"],
    description: "Restored watershed throughput. Flow-meter telemetry pending secondary cross-validation.",
  },
  {
    key: "people",
    label: "People Impacted",
    value: "1.24M",
    delta: "+3,420",
    confidence: 92.0,
    trend: [50, 55, 60, 58, 65, 70, 72, 76, 80, 84, 88, 92],
    sources: ["Biometric Oracle", "Clinic API", "School API"],
    description: "Unique individuals served, deduplicated via privacy-preserving biometric oracle.",
  },
  {
    key: "projects",
    label: "Projects Monitored",
    value: "2,423",
    delta: "+12",
    confidence: 100,
    trend: [70, 70, 72, 74, 76, 78, 80, 82, 84, 90, 96, 100],
    sources: ["Global Monitoring Mesh"],
    description: "Active projects with at least one live verification source online.",
  },
];

const xinguPipeline: PipelineStage[] = [
  { key: "ingest", label: "Raw Ingest", status: "ok", detail: "412 packets / min", ts: "14:31:58" },
  { key: "validate", label: "AI Validation", status: "ok", detail: "Model atlas-v4.2 · 99.2% match", ts: "14:32:01" },
  { key: "anomaly", label: "Anomaly Detection", status: "ok", detail: "0 outliers · σ=0.31", ts: "14:32:02" },
  { key: "cross", label: "Cross-Source Match", status: "ok", detail: "Sentinel-2 ✓ · Drone ✓ · IoT ✓", ts: "14:32:03" },
  { key: "audit", label: "Human Audit", status: "running", detail: "Auditor #44 reviewing parcel 4-G" },
  { key: "chain", label: "Blockchain Attestation", status: "queued", detail: "Awaiting audit sign-off" },
];

export const PROJECTS: Project[] = [
  {
    id: "amz-04",
    name: "Xingu Basin Reforestation",
    region: "Amazonas, Brazil",
    layer: "Reforestation",
    coords: { top: "62%", left: "30%" },
    headlineMetric: "+14.2%",
    headlineLabel: "Biomass Q3",
    confidence: 99.1,
    contributesTo: ["impact_usd", "carbon", "trees"],
    iotNodes: 1240,
    satelliteCadence: "Daily · Sentinel-2",
    satellitePrompt: "A sharp high-resolution top-down satellite view of dense tropical rainforest canopy in the Amazon basin, cinematic",
    sources: [
      { key: "sat", label: "Satellite Imagery", verified: true, weight: 0.28 },
      { key: "drone", label: "Drone Photogrammetry", verified: true, weight: 0.22 },
      { key: "iot", label: "IoT Ground Mesh", verified: true, weight: 0.2 },
      { key: "community", label: "Community Validators", verified: true, weight: 0.15 },
      { key: "ai", label: "AI Anomaly Engine", verified: true, weight: 0.15 },
    ],
    pipeline: xinguPipeline,
    timeline: [
      { date: "Jan 01", title: "Project Created", detail: "Onboarded by Xingu Indigenous Council" },
      { date: "Jan 05", title: "Sensors Installed", detail: "1,240 ground IoT nodes deployed" },
      { date: "Jan 18", title: "AI Validation Passed", detail: "atlas-v4.2 model confidence 99.2%" },
      { date: "Feb 01", title: "Satellite Verified", detail: "Sentinel-2 biomass +14.2% confirmed" },
      { date: "Feb 12", title: "Independent Audit", detail: "BVerify Labs cross-checked parcels" },
      { date: "Feb 13", title: "Impact Token Minted", detail: "12,420 tCO₂e attested", blockchainTx: "0x4f72…a18c", ok: true },
    ],
    financialFlow: [
      { step: "Investor", party: "Pacific Climate Fund", amount: "$1,200,000" },
      { step: "Fund Allocation", party: "Atlas Sanctum Treasury", amount: "$1,200,000", txHash: "0x91a…2c4" },
      { step: "Project Drawdown", party: "Xingu Council Ops", amount: "$842,300", txHash: "0xbb1…d09" },
      { step: "Verified Outcome", party: "12,420 tCO₂e attested", amount: "$1,089,400" },
    ],
    recentSensors: [
      { code: "SNSR-492-AMZ", metric: "Soil Moisture", value: "42.1%" },
      { code: "SNSR-318-BRA", metric: "Canopy NDVI", value: "0.71" },
      { code: "SNSR-902-AMZ", metric: "Sap Flow", value: "Steady" },
    ],
  },
  {
    id: "ken-12",
    name: "Mara Borehole Mesh",
    region: "Narok, Kenya",
    layer: "Water Mesh",
    coords: { top: "58%", left: "56%" },
    headlineMetric: "14.2 L/min",
    headlineLabel: "Avg flow",
    confidence: 84.1,
    contributesTo: ["impact_usd", "water", "people"],
    iotNodes: 184,
    satelliteCadence: "Weekly · Planet",
    satellitePrompt: "High-resolution top-down satellite view of arid savanna with scattered boreholes and trails in East Africa",
    sources: [
      { key: "iot", label: "IoT Flow Meters", verified: true, weight: 0.4 },
      { key: "community", label: "Community Validators", verified: true, weight: 0.25 },
      { key: "ai", label: "AI Anomaly Engine", verified: true, weight: 0.2 },
      { key: "sat", label: "Satellite Imagery", verified: false, weight: 0.15 },
    ],
    pipeline: [
      { key: "ingest", label: "Raw Ingest", status: "ok", detail: "184 nodes · 3.1k packets/min" },
      { key: "validate", label: "AI Validation", status: "ok", detail: "Model atlas-water-v2" },
      { key: "anomaly", label: "Anomaly Detection", status: "running", detail: "Reviewing flow drift on node 044" },
      { key: "cross", label: "Cross-Source Match", status: "pending", detail: "Awaiting Planet weekly tile" },
      { key: "audit", label: "Human Audit", status: "queued", detail: "Scheduled Feb 20" },
      { key: "chain", label: "Blockchain Attestation", status: "queued", detail: "Awaiting audit" },
    ],
    timeline: [
      { date: "Nov 14", title: "Project Created" },
      { date: "Dec 02", title: "Boreholes Commissioned", detail: "184 IoT flow meters online" },
      { date: "Jan 10", title: "AI Validation Passed" },
      { date: "Feb 02", title: "Community Audit", detail: "Maasai liaison signed off 174/184 nodes" },
    ],
    financialFlow: [
      { step: "Investor", party: "Horizon Water Trust", amount: "$420,000" },
      { step: "Fund Allocation", party: "Atlas Sanctum Treasury", amount: "$420,000", txHash: "0x12c…ff0" },
      { step: "Project Drawdown", party: "Mara Water Co-op", amount: "$298,400" },
    ],
    recentSensors: [
      { code: "SNSR-204-KEN", metric: "Borehole Flow", value: "14.2 L/min" },
      { code: "SNSR-205-KEN", metric: "Turbidity", value: "1.2 NTU" },
    ],
  },
  {
    id: "idn-03",
    name: "Borneo Mangrove Belt",
    region: "Kalimantan, Indonesia",
    layer: "Reforestation",
    coords: { top: "64%", left: "78%" },
    headlineMetric: "428k",
    headlineLabel: "Saplings",
    confidence: 96.7,
    contributesTo: ["carbon", "trees", "impact_usd"],
    iotNodes: 612,
    satelliteCadence: "Daily · Sentinel-2",
    satellitePrompt: "Aerial satellite view of dense green mangrove coastline in Borneo with winding tidal channels",
    sources: [
      { key: "sat", label: "Satellite Imagery", verified: true, weight: 0.3 },
      { key: "drone", label: "Drone Photogrammetry", verified: true, weight: 0.25 },
      { key: "iot", label: "IoT Ground Mesh", verified: true, weight: 0.2 },
      { key: "ai", label: "AI Anomaly Engine", verified: true, weight: 0.15 },
      { key: "community", label: "Community Validators", verified: true, weight: 0.1 },
    ],
    pipeline: xinguPipeline.map((s) => ({ ...s })),
    timeline: [
      { date: "Sep 01", title: "Project Created" },
      { date: "Sep 18", title: "Saplings Planted", detail: "428,000 mangrove saplings" },
      { date: "Oct 04", title: "Satellite Verified" },
      { date: "Dec 11", title: "Impact Token Minted", blockchainTx: "0x88e…4a1", ok: true },
    ],
    financialFlow: [
      { step: "Investor", party: "Coastal Carbon DAO", amount: "$680,000" },
      { step: "Project Drawdown", party: "Kalimantan Restoration", amount: "$512,000" },
    ],
    recentSensors: [
      { code: "SNSR-661-IDN", metric: "Air Quality", value: "+0.8σ" },
      { code: "SNSR-662-IDN", metric: "Salinity", value: "31 PSU" },
    ],
  },
  {
    id: "ind-08",
    name: "Deccan Solar Microgrid",
    region: "Telangana, India",
    layer: "Energy Grid",
    coords: { top: "48%", left: "70%" },
    headlineMetric: "4.21 kW",
    headlineLabel: "Avg output",
    confidence: 95.4,
    contributesTo: ["impact_usd", "people"],
    iotNodes: 96,
    satelliteCadence: "Weekly",
    satellitePrompt: "Aerial top-down view of a rural Indian village with solar panel arrays installed on rooftops",
    sources: [
      { key: "iot", label: "Smart Meters", verified: true, weight: 0.5 },
      { key: "ai", label: "AI Anomaly Engine", verified: true, weight: 0.2 },
      { key: "community", label: "Community Validators", verified: true, weight: 0.15 },
      { key: "sat", label: "Satellite Imagery", verified: true, weight: 0.15 },
    ],
    pipeline: xinguPipeline.map((s) => ({ ...s })),
    timeline: [
      { date: "Mar 10", title: "Microgrid Commissioned" },
      { date: "Apr 02", title: "AI Validation Passed" },
      { date: "May 14", title: "Impact Token Minted", blockchainTx: "0x44a…b21", ok: true },
    ],
    financialFlow: [
      { step: "Investor", party: "South Asia Energy Fund", amount: "$210,000" },
      { step: "Project Drawdown", party: "Deccan Power Co-op", amount: "$184,000" },
    ],
    recentSensors: [{ code: "SNSR-445-COL", metric: "Solar Output", value: "4.21 kW" }],
  },
  {
    id: "per-02",
    name: "Andes Highland Watershed",
    region: "Cusco, Peru",
    layer: "Water Mesh",
    coords: { top: "70%", left: "26%" },
    headlineMetric: "8.4 mm",
    headlineLabel: "Rainfall 24h",
    confidence: 89.5,
    contributesTo: ["water", "people"],
    iotNodes: 142,
    satelliteCadence: "Daily",
    satellitePrompt: "High altitude satellite view of Andean mountain terraces with terraced agriculture",
    sources: [
      { key: "iot", label: "Rain Gauges", verified: true, weight: 0.35 },
      { key: "sat", label: "Satellite Imagery", verified: true, weight: 0.25 },
      { key: "community", label: "Community Validators", verified: true, weight: 0.2 },
      { key: "ai", label: "AI Anomaly Engine", verified: true, weight: 0.2 },
    ],
    pipeline: xinguPipeline.map((s) => ({ ...s })),
    timeline: [
      { date: "Jan 12", title: "Project Created" },
      { date: "Feb 02", title: "Community Audit" },
    ],
    financialFlow: [{ step: "Investor", party: "Andes Climate Trust", amount: "$160,000" }],
    recentSensors: [{ code: "SNSR-552-PER", metric: "Rainfall", value: "8.4mm" }],
  },
  {
    id: "ngr-01",
    name: "Lagos Clinic Network",
    region: "Lagos, Nigeria",
    layer: "Healthcare",
    coords: { top: "55%", left: "50%" },
    headlineMetric: "+12",
    headlineLabel: "Check-ins / hr",
    confidence: 91.8,
    contributesTo: ["people", "impact_usd"],
    iotNodes: 48,
    satelliteCadence: "Monthly",
    satellitePrompt: "Aerial top-down satellite view of a dense urban Lagos neighborhood with rooftops",
    sources: [
      { key: "clinic", label: "Clinic API", verified: true, weight: 0.5 },
      { key: "biometric", label: "Biometric Oracle", verified: true, weight: 0.3 },
      { key: "ai", label: "AI Anomaly Engine", verified: true, weight: 0.2 },
    ],
    pipeline: xinguPipeline.map((s) => ({ ...s })),
    timeline: [
      { date: "Aug 04", title: "Project Created" },
      { date: "Sep 22", title: "Clinic API Integrated" },
      { date: "Dec 01", title: "Impact Token Minted", blockchainTx: "0x77c…910", ok: true },
    ],
    financialFlow: [
      { step: "Investor", party: "West Africa Health Fund", amount: "$340,000" },
      { step: "Project Drawdown", party: "Lagos Clinic Co-op", amount: "$291,000" },
    ],
    recentSensors: [{ code: "SNSR-991-NGA", metric: "Clinic Check-ins", value: "+12" }],
  },
  {
    id: "col-04",
    name: "Chocó Cloud Forest",
    region: "Chocó, Colombia",
    layer: "Reforestation",
    coords: { top: "60%", left: "27%" },
    headlineMetric: "+9.4%",
    headlineLabel: "Canopy gain",
    confidence: 97.8,
    contributesTo: ["carbon", "trees"],
    iotNodes: 388,
    satelliteCadence: "Daily",
    satellitePrompt: "Aerial top-down view of misty cloud forest in Colombia with dense green canopy",
    sources: [
      { key: "sat", label: "Satellite Imagery", verified: true, weight: 0.35 },
      { key: "drone", label: "Drone Photogrammetry", verified: true, weight: 0.2 },
      { key: "iot", label: "IoT Ground Mesh", verified: true, weight: 0.2 },
      { key: "community", label: "Community Validators", verified: true, weight: 0.15 },
      { key: "ai", label: "AI Anomaly Engine", verified: true, weight: 0.1 },
    ],
    pipeline: xinguPipeline.map((s) => ({ ...s })),
    timeline: [
      { date: "Oct 10", title: "Project Created" },
      { date: "Nov 02", title: "Satellite Verified" },
      { date: "Jan 14", title: "Impact Token Minted", blockchainTx: "0x21d…ee4", ok: true },
    ],
    financialFlow: [
      { step: "Investor", party: "Pacific Climate Fund", amount: "$510,000" },
      { step: "Project Drawdown", party: "Chocó Stewards", amount: "$412,000" },
    ],
    recentSensors: [{ code: "SNSR-318-COL", metric: "Canopy NDVI", value: "0.74" }],
  },
];

export const PROJECT_INDEX: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p]),
);

export interface SensorTick {
  id: string;
  code: string;
  projectId: string;
  metric: string;
  value: string;
  severity: Severity;
  time: string;
}

export interface AiAlert {
  id: string;
  projectId: string;
  severity: Severity;
  title: string;
  explanation: string;
  ts: string;
}

const SENSOR_POOL: Omit<SensorTick, "id" | "time">[] = [
  { code: "SNSR-492-AMZ", projectId: "amz-04", metric: "Soil Moisture", value: "42.1%", severity: "info" },
  { code: "SNSR-881-COG", projectId: "amz-04", metric: "Carbon Flux", value: "+0.42 mg/m²", severity: "info" },
  { code: "SNSR-112-IND", projectId: "ind-08", metric: "Tampering Detected", value: "Ch. 04", severity: "critical" },
  { code: "SNSR-902-AMZ", projectId: "amz-04", metric: "Sap Flow", value: "Steady", severity: "info" },
  { code: "SNSR-204-KEN", projectId: "ken-12", metric: "Borehole Flow", value: "14.2 L/min", severity: "info" },
  { code: "SNSR-661-IDN", projectId: "idn-03", metric: "Air Quality drift", value: "+0.8σ", severity: "warn" },
  { code: "SNSR-318-BRA", projectId: "amz-04", metric: "Canopy NDVI", value: "0.71", severity: "info" },
  { code: "SNSR-445-COL", projectId: "ind-08", metric: "Solar Output", value: "4.21 kW", severity: "info" },
  { code: "SNSR-991-NGA", projectId: "ngr-01", metric: "Clinic check-ins", value: "+12", severity: "info" },
  { code: "SNSR-552-PER", projectId: "per-02", metric: "Rainfall", value: "8.4 mm", severity: "info" },
  { code: "SNSR-318-COL", projectId: "col-04", metric: "Canopy NDVI drift", value: "-0.4σ", severity: "warn" },
];

const ALERT_POOL: Omit<AiAlert, "id" | "ts">[] = [
  {
    projectId: "ind-08",
    severity: "critical",
    title: "Sensor tampering on Deccan Solar Ch. 04",
    explanation:
      "atlas-v4.2 detected accelerometer signature inconsistent with installed mount. Cross-source: Sentinel weekly tile shows no panel displacement — likely physical interference. Auto-quarantined node 04 from KPI roll-up pending audit.",
  },
  {
    projectId: "idn-03",
    severity: "warn",
    title: "Air quality drift over Borneo Belt",
    explanation:
      "PM2.5 +0.8σ over 4h window. Cross-checked against MERRA-2 reanalysis: regional smoke advection. Not project-attributable; confidence on biomass unchanged.",
  },
  {
    projectId: "ken-12",
    severity: "warn",
    title: "Flow anomaly on Mara node 044",
    explanation:
      "Steady downward drift of 0.6 L/min over 12h. Possible silt accumulation. Field team auto-paged; awaiting community validator inspection.",
  },
  {
    projectId: "col-04",
    severity: "info",
    title: "NDVI sensor recalibration recommended",
    explanation:
      "Drift of -0.4σ on SNSR-318-COL relative to neighboring nodes. Not affecting aggregated canopy index. Scheduled recalibration in next maintenance window.",
  },
];

function nowTime(d = new Date()) {
  return d.toTimeString().slice(0, 8);
}

type Listener<T> = (item: T) => void;

class MockStream<T> {
  private listeners = new Set<Listener<T>>();
  private timer: ReturnType<typeof setInterval> | null = null;
  constructor(
    private readonly produce: () => T,
    private readonly intervalMs: number,
  ) {}

  subscribe(fn: Listener<T>) {
    this.listeners.add(fn);
    if (!this.timer) this.start();
    return () => {
      this.listeners.delete(fn);
      if (this.listeners.size === 0) this.stop();
    };
  }

  private start() {
    this.timer = setInterval(() => {
      const item = this.produce();
      this.listeners.forEach((l) => l(item));
    }, this.intervalMs);
  }
  private stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}

let seq = 0;
export const sensorStream = new MockStream<SensorTick>(() => {
  const pick = SENSOR_POOL[Math.floor(Math.random() * SENSOR_POOL.length)];
  return { ...pick, id: `tick-${++seq}`, time: nowTime() };
}, 2000);

let aseq = 0;
export const alertStream = new MockStream<AiAlert>(() => {
  const pick = ALERT_POOL[Math.floor(Math.random() * ALERT_POOL.length)];
  return { ...pick, id: `alert-${++aseq}`, ts: nowTime() };
}, 9000);

export function seedAlerts(): AiAlert[] {
  return ALERT_POOL.map((p, i) => ({ ...p, id: `seed-${i}`, ts: nowTime() }));
}

export function projectsForKpi(key: KpiKey): Project[] {
  return PROJECTS.filter((p) => p.contributesTo.includes(key));
}
