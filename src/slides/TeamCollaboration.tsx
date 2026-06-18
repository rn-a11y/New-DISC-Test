import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { Users } from 'lucide-react';

const dimColors: Record<string, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };

const collabData: Record<string, { with: string; advice: string; color: string }[]> = {
  D: [
    { with: 'I', advice: 'Berikan kebebasan berekspresi, fokus pada hasil bersama', color: dimColors.I },
    { with: 'S', advice: 'Hargai konsistensi mereka, berikan waktu untuk beradaptasi', color: dimColors.S },
    { with: 'C', advice: 'Dukung dengan data, hormati standar kualitas mereka', color: dimColors.C },
  ],
  I: [
    { with: 'D', advice: 'Dukung keputusan cepat mereka, fokus pada aksi', color: dimColors.D },
    { with: 'S', advice: 'Jaga harmoni, berikan apresiasi atas loyalitas mereka', color: dimColors.S },
    { with: 'C', advice: 'Siapkan data sebelum diskusi, hargai ketelitian mereka', color: dimColors.C },
  ],
  S: [
    { with: 'D', advice: 'Dukung ketegasan mereka, bantu percepat pengambilan keputusan', color: dimColors.D },
    { with: 'I', advice: 'Ikuti semangat mereka, bantu menjaga fokus pada detail', color: dimColors.I },
    { with: 'C', advice: 'Apresiasi konsistensi, dukung proses yang terstruktur', color: dimColors.C },
  ],
  C: [
    { with: 'D', advice: 'Sajikan data ringkas, dukung eksekusi cepat mereka', color: dimColors.D },
    { with: 'I', advice: 'Bantu visualisasi ide, dukung kreativitas mereka', color: dimColors.I },
    { with: 'S', advice: 'Hargai stabilitas, dukung dengan prosedur yang jelas', color: dimColors.S },
  ],
};

export function TeamCollaboration() {
  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center overflow-y-auto px-6">
        <div className="h-14 shrink-0" />
        <div className="w-full max-w-6xl min-w-0 py-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 rounded-full text-xs font-semibold text-navy/60 mb-4">
              <Users className="w-3 h-3" />
              KOLABORASI
            </div>
            <h2 className="text-4xl font-bold text-navy">Kolaborasi Tim</h2>
            <p className="text-slate-400 mt-2">Bagaimana tiap tipe DISC bekerja sama secara efektif</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {(['D', 'I', 'S', 'C'] as const).map((dim) => (
              <div key={dim} className="card-hover bg-white rounded-2xl shadow-lg border border-slate-100 p-5 text-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold mx-auto mb-2 shadow-lg"
                  style={{ backgroundColor: dimColors[dim] }}
                >
                  {dim}
                </div>
                <p className="text-xs font-bold text-navy uppercase tracking-wider">{dim}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {(['D', 'I', 'S', 'C'] as const).map((dim) => (
              <div key={dim} className="card-hover bg-white rounded-2xl shadow-lg border border-slate-100 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: dimColors[dim] }}
                  >
                    {dim}
                  </div>
                  <h3 className="font-bold text-navy text-sm">
                    Tipe <span className="uppercase">{dim}</span> bekerja sama dengan
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {collabData[dim].map((item) => (
                    <div key={item.with} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.with}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.advice}</p>
                    </div>
                  ))}
                </div>
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
