const COLORS = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };

export function DiscWheel({ size = 280 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const innerR = size * 0.16;
  const segments: { dim: keyof typeof COLORS; start: number; end: number }[] = [
    { dim: 'D', start: -45, end: 45 },
    { dim: 'I', start: 45, end: 135 },
    { dim: 'S', start: 135, end: 225 },
    { dim: 'C', start: 225, end: 315 },
  ];

  function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
    const s = polarToCartesian(cx, cy, r, end);
    const e = polarToCartesian(cx, cy, r, start);
    const large = end - start > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-xl">
      <defs>
        {segments.map((seg) => (
          <filter key={seg.dim} id={`shadow-${seg.dim}`}>
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={COLORS[seg.dim]} floodOpacity="0.3" />
          </filter>
        ))}
      </defs>
      <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="#e5e7eb" strokeWidth="2" />
      {segments.map((seg) => (
        <g key={seg.dim}>
          <path d={describeArc(cx, cy, r, seg.start, seg.end)} fill={COLORS[seg.dim]} opacity={0.9} filter={`url(#shadow-${seg.dim})`} />
          <path d={describeArc(cx, cy, r, seg.start, seg.end)} fill={COLORS[seg.dim]} opacity={0.9} />
        </g>
      ))}
      <circle cx={cx} cy={cy} r={innerR} fill="white" className="drop-shadow-sm" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="26" fontWeight="900" fill="#0F172A" fontFamily="Inter, sans-serif">DISC</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="600" letterSpacing="2">ASSESSMENT</text>
      {(Object.keys(COLORS) as Array<keyof typeof COLORS>).map((dim) => {
        const midAngles: Record<string, number> = { D: 0, I: 90, S: 180, C: 270 };
        const ang = midAngles[dim];
        const labelR = r * 0.6;
        const p = polarToCartesian(cx, cy, labelR, ang);
        return (
          <text key={dim} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="900" fill="white" fontFamily="Inter, sans-serif">
            {dim}
          </text>
        );
      })}
    </svg>
  );
}
