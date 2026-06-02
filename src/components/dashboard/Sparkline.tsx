interface SparklineProps {
  points: number[];
  className?: string;
  stroke?: string;
  fill?: string;
  height?: number;
}

export function Sparkline({
  points,
  className,
  stroke = "var(--color-truth)",
  fill = "color-mix(in oklab, var(--color-truth) 20%, transparent)",
  height = 28,
}: SparklineProps) {
  if (points.length === 0) return null;
  const w = 100;
  const h = height;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={className}
      style={{ width: "100%", height }}
      aria-hidden
    >
      <path d={area} fill={fill} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.25" />
    </svg>
  );
}
