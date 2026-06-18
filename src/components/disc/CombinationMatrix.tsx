const combos = [
  { code: 'DI', label: 'Dominance + Influence', desc: 'Pemimpin visioner', d: true, i: true, s: false, c: false },
  { code: 'ID', label: 'Influence + Dominance', desc: 'Motivator karismatik', d: true, i: true, s: false, c: false },
  { code: 'DC', label: 'Dominance + Compliance', desc: 'Pelaksana efisien', d: true, i: false, s: false, c: true },
  { code: 'CD', label: 'Compliance + Dominance', desc: 'Pengawas kualitas', d: true, i: false, s: false, c: true },
  { code: 'IS', label: 'Influence + Steadiness', desc: 'Penghubung tim', d: false, i: true, s: true, c: false },
  { code: 'SI', label: 'Steadiness + Influence', desc: 'Pendukung semangat', d: false, i: true, s: true, c: false },
  { code: 'SC', label: 'Steadiness + Compliance', desc: 'Penjaga standar', d: false, i: false, s: true, c: true },
  { code: 'CS', label: 'Compliance + Steadiness', desc: 'Spesialis kualitas', d: false, i: false, s: true, c: true },
];

const colors: Record<string, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };

export function CombinationMatrix() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {combos.map((combo) => {
        const activeDims = combo.code.split('');
        return (
          <div key={combo.code} className="card-hover bg-white rounded-2xl shadow-lg border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              {activeDims.map((ch) => (
                <span
                  key={ch}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md"
                  style={{ backgroundColor: colors[ch] }}
                >
                  {ch}
                </span>
              ))}
            </div>
            <h4 className="font-bold text-sm text-navy">{combo.label}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{combo.desc}</p>
            <div className="flex gap-1 mt-3">
              {(['D', 'I', 'S', 'C'] as const).map((dim) => (
                <span
                  key={dim}
                  className="w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: combo[dim.toLowerCase() as keyof typeof combo] ? colors[dim] : '#f1f5f9',
                    color: combo[dim.toLowerCase() as keyof typeof combo] ? 'white' : '#cbd5e1',
                  }}
                >
                  {dim}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
