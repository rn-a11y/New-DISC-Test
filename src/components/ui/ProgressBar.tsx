interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({ value, max, color, label, showValue = true }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>}
          {showValue && (
            <span className="text-xs font-bold" style={{ color }}>{value}/{max}</span>
          )}
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
