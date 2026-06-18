import type { ReactNode } from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  subtitle?: string;
}

export function KpiCard({ label, value, icon, color, subtitle }: KpiCardProps) {
  return (
    <div className="card-hover bg-white rounded-xl shadow-lg border border-slate-100 p-6 flex items-start gap-4 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: color, opacity: 0.4 }} />
      <div
        className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: color + '15', color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-4xl font-bold mt-0.5 tracking-tight" style={{ color }}>{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1.5 font-medium">{subtitle}</p>}
      </div>
    </div>
  );
}
