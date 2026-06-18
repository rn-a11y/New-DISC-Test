import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { Swords, Flame, Anchor, Shield } from 'lucide-react';

const dims = [
  {
    icon: <Swords className="w-6 h-6" />, title: 'Dominance (D)', subtitle: 'Dominan — Pengendali',
    color: '#EF4444',
    items: ['Tegas, langsung, dan berorientasi hasil', 'Mengambil keputusan dengan cepat', 'Suka tantangan dan kompetisi', 'Mandiri dan percaya diri'],
  },
  {
    icon: <Flame className="w-6 h-6" />, title: 'Influence (I)', subtitle: 'Pengaruh — Komunikator',
    color: '#F97316',
    items: ['Antusias, energetik, dan persuasif', 'Membangun relasi dengan mudah', 'Optimis dan kreatif', 'Pandai memotivasi orang lain'],
  },
  {
    icon: <Anchor className="w-6 h-6" />, title: 'Steadiness (S)', subtitle: 'Konsisten — Pendukung',
    color: '#22C55E',
    items: ['Sabtu, konsisten, dan dapat diandalkan', 'Pendengar yang baik', 'Menghargai harmoni dan stabilitas', 'Setia dan loyal terhadap tim'],
  },
  {
    icon: <Shield className="w-6 h-6" />, title: 'Compliance (C)', subtitle: 'Patuh — Analitis',
    color: '#3B82F6',
    items: ['Analitis, teliti, dan sistematis', 'Berorientasi pada kualitas', 'Mengikuti prosedur dan standar', 'Objektif dalam penilaian'],
  },
];

export function AboutDisc() {
  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center px-6">
        <div className="h-14 shrink-0" />
        <div className="h-8" />
        <div className="w-full max-w-6xl min-w-0 shrink-0 py-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy">Tentang DISC</h2>
            <p className="text-slate-400 mt-3 text-base">
              DISC adalah model perilaku yang membantu memahami gaya kepribadian dan preferensi kerja seseorang berdasarkan empat dimensi utama.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dims.map((d) => (
              <div key={d.title} className="card-hover bg-white rounded-2xl shadow-lg border border-slate-100 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: d.color }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: d.color + '12' }}>
                  <div style={{ color: d.color }}>{d.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-navy">{d.title}</h3>
                <p className="text-xs font-semibold mt-0.5 mb-4 uppercase tracking-wider" style={{ color: d.color }}>{d.subtitle}</p>
                <ul className="space-y-2">
                  {d.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-500 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: d.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full max-w-6xl shrink-0">
          <Navigation />
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
