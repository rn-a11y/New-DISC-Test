import type { StandardScore, DiscDimension } from '../../data/types';

const dimColors: Record<DiscDimension, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };
const dimNames: Record<DiscDimension, string> = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Compliance' };

const angles: Record<DiscDimension, number> = { D: -90, I: 0, S: 90, C: 180 };
const order: DiscDimension[] = ['D', 'I', 'S', 'C'];

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 140;
const INNER_R = 18;

function scoreToRadius(score: number): number {
  const clamped = Math.max(-10, Math.min(10, score));
  return INNER_R + ((clamped + 10) / 20) * (OUTER_R - INNER_R);
}

function polar(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function gridPath(radius: number): string {
  return order.map((d, i) => {
    const p = polar(angles[d], radius);
    return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
  }).join(' ') + 'Z';
}

const gridRadii = [35, 70, 105, OUTER_R];

export function DiscCircleChart({ scores }: { scores: StandardScore[] }) {
  const legendY = SIZE + 28;

  return (
    <svg width={SIZE} height={SIZE + 80} viewBox={`0 0 ${SIZE} ${SIZE + 80}`} className="mx-auto">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
      </defs>

      <circle cx={CX} cy={CY} r={OUTER_R} fill="url(#bgGrad)" stroke="#e2e8f0" strokeWidth={1.5} />

      {gridRadii.map((r, i) => (
        <path key={i} d={gridPath(r)} fill="none" stroke={i === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth={i === 0 ? 1.5 : 1} />
      ))}

      <line x1={CX - OUTER_R - 12} y1={CY} x2={CX + OUTER_R + 12} y2={CY} stroke="#e2e8f0" strokeWidth={1} />
      <line x1={CX} y1={CY - OUTER_R - 12} x2={CX} y2={CY + OUTER_R + 12} stroke="#e2e8f0" strokeWidth={1} />

      {/* Axis labels */}
      <text x={CX} y={CY - OUTER_R - 18} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="Arial, sans-serif" fontWeight={600}>Assertive / Fast-paced</text>
      <text x={CX} y={CY + OUTER_R + 28} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="Arial, sans-serif" fontWeight={600}>Reserved / Reflective</text>
      <text x={CX - OUTER_R - 14} y={CY + 4} textAnchor="end" fill="#64748b" fontSize={10} fontFamily="Arial, sans-serif" fontWeight={600}>Task-focused</text>
      <text x={CX + OUTER_R + 14} y={CY + 4} textAnchor="start" fill="#64748b" fontSize={10} fontFamily="Arial, sans-serif" fontWeight={600}>People-focused</text>

      {/* Dimension labels */}
      {order.map(d => {
        const p = polar(angles[d], OUTER_R + 20);
        return (
          <g key={d}>
            <circle cx={p.x} cy={p.y} r={18} fill={dimColors[d]} opacity={0.12} />
            <text x={p.x} y={p.y + 6} textAnchor="middle" fill={dimColors[d]} fontSize={15} fontWeight={800} fontFamily="Arial, sans-serif">
              {d}
            </text>
          </g>
        );
      })}

      {/* Score dots */}
      {order.map(d => {
        const ss = scores.find(s => s.dimension === d);
        const v = ss?.value ?? 0;
        const r = scoreToRadius(v);
        const p = polar(angles[d], r);
        return (
          <g key={`dot-${d}`}>
            <circle cx={p.x} cy={p.y} r={10} fill={dimColors[d]} fillOpacity={0.15} stroke="none" />
            <circle cx={p.x} cy={p.y} r={7} fill={dimColors[d]} fillOpacity={0.85} stroke="#fff" strokeWidth={2.5} />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#fff" fontSize={9} fontWeight={800} fontFamily="Arial, sans-serif">{v > 0 ? '+' : ''}{v}</text>
          </g>
        );
      })}

      {/* D/I/S/C - dim name under each */}
      {order.map(d => {
        const p = polar(angles[d], OUTER_R + 40);
        return (
          <text key={`name-${d}`} x={p.x} y={p.y} textAnchor="middle" fill="#64748b" fontSize={8} fontFamily="Arial, sans-serif" fontWeight={500}>
            {dimNames[d]}
          </text>
        );
      })}

      <text x={CX} y={CY + 4} textAnchor="middle" fill="#94a3b8" fontSize={12} fontFamily="Arial, sans-serif" fontWeight={700}>
        DISC
      </text>

      {/* Legend */}
      <text x={SIZE / 2} y={legendY} textAnchor="middle" fill="#475569" fontSize={10} fontFamily="Arial, sans-serif" fontWeight={600}>
        Hidden Self (Difference Score) — each dot shows the standard score
      </text>
    </svg>
  );
}

export function ScoreBars({ line1, line2, line3 }: {
  line1: StandardScore[];
  line2: StandardScore[];
  line3: StandardScore[];
}) {
  return (
    <div className="space-y-4">
      {order.map(d => {
        const s1 = line1.find(s => s.dimension === d)!.value;
        const s2 = line2.find(s => s.dimension === d)!.value;
        const s3 = line3.find(s => s.dimension === d)!.value;
        const max = 10;
        const pct = (v: number) => Math.min(100, ((v + max) / (max * 2)) * 100);

        return (
          <div key={d}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ backgroundColor: dimColors[d] }}>
                {d}
              </div>
              <span className="text-xs font-medium text-slate-500">{dimNames[d]}</span>
            </div>
            <div className="space-y-0.5 ml-8">
              {[
                { label: 'Public', v: s1, color: dimColors[d] },
                { label: 'Pressure', v: s2, color: '#94A3B8' },
                { label: 'Hidden', v: s3, color: '#1E293B' },
              ].map(({ label, v, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-14 text-[10px] text-slate-400 text-right">{label}</span>
                  <div className="flex-1 h-[6px] rounded-full bg-slate-100 overflow-hidden relative">
                    <div className="h-full rounded-full" style={{ width: `${pct(v)}%`, backgroundColor: color, opacity: 0.7 }} />
                  </div>
                  <span className="w-7 text-right text-[10px] font-bold tabular-nums text-slate-400">{v > 0 ? '+' : ''}{v}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
