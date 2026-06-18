import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { CombinationMatrix } from '../components/disc/CombinationMatrix';
import { GitCompare } from 'lucide-react';

export function CombinationProfiles() {
  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center overflow-y-auto px-6">
        <div className="h-14 shrink-0" />
        <div className="w-full max-w-6xl min-w-0 py-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 rounded-full text-xs font-semibold text-navy/60 mb-4">
              <GitCompare className="w-3 h-3" />
              KOMBINASI
            </div>
            <h2 className="text-4xl font-bold text-navy">Kombinasi Profil DISC</h2>
            <p className="text-slate-400 mt-2">Kombinasi dua dimensi dominan membentuk profil yang lebih spesifik</p>
          </div>
          <CombinationMatrix />
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
            <h3 className="font-bold text-navy mb-4 text-sm uppercase tracking-wider">Cara Membaca Kombinasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-500">
              {[
                { d: 'D+I', color: '#EF4444', desc: 'Pemimpin visioner yang karismatik dan berorientasi hasil' },
                { d: 'C+S', color: '#3B82F6', desc: 'Spesialis kualitas yang konsisten dan teliti' },
                { d: 'I+S', color: '#F97316', desc: 'Penghubung tim yang komunikatif dan suportif' },
                { d: 'S+C', color: '#22C55E', desc: 'Penjaga standar yang konsisten dan metodis' },
              ].map((item) => (
                <div key={item.d} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <span className="flex gap-0.5 shrink-0 mt-0.5">
                    {item.d.split('+').map((ch) => (
                      <span key={ch} className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: item.color }}>
                        {ch}
                      </span>
                    ))}
                  </span>
                  <span className="text-xs leading-relaxed"><strong className="text-slate-700">{item.d}</strong> — {item.desc}</span>
                </div>
              ))}
            </div>
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
