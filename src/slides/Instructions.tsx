import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { CheckCircle2, XCircle, HelpCircle, Lightbulb, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: CheckCircle2, color: '#22C55E', title: 'Pilih PALING menggambarkan diri Anda',
    desc: 'Dari 4 pernyataan di setiap nomor, pilih satu yang PALING sesuai dengan kepribadian Anda.',
  },
  {
    icon: XCircle, color: '#EF4444', title: 'Pilih PALING TIDAK menggambarkan diri Anda',
    desc: 'Dari sisa pernyataan lainnya, pilih satu yang PALING TIDAK sesuai dengan diri Anda.',
  },
  {
    icon: HelpCircle, color: '#3B82F6', title: 'Tidak ada jawaban benar atau salah',
    desc: 'Jawablah dengan jujur sesuai kepribadian Anda, bukan berdasarkan yang Anda inginkan.',
  },
  {
    icon: Lightbulb, color: '#F97316', title: 'Ikuti insting pertama Anda',
    desc: 'Jangan terlalu lama memikirkan setiap jawaban. Respons pertama biasanya yang paling akurat.',
  },
];

export function Instructions() {
  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center px-6">
        <div className="h-14 shrink-0" />
        <div className="h-8" />
        <div className="w-full max-w-4xl min-w-0 shrink-0 py-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy">Petunjuk Pengisian</h2>
            <p className="text-slate-400 mt-3 text-base">Ikuti langkah-langkah berikut untuk hasil yang akurat</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-[2.15rem] top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {steps.map((s, i) => (
                <div key={i} className="relative flex items-start gap-5">
                  <div
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ backgroundColor: s.color }}
                  >
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-slate-400 tabular-nums">LANGKAH {i + 1}</span>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                    </div>
                    <h3 className="font-bold text-navy text-base">{s.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-md">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 bg-amber-50/80 border border-amber-200/60 rounded-2xl p-5">
            <p className="text-sm text-amber-700 text-center font-semibold">
              Setiap nomor WAJIB memiliki tepat 1 pilihan <span className="text-emerald-600">PALING</span> dan 1 pilihan <span className="text-red-500">PALING TIDAK</span>.
            </p>
          </div>
        </div>
        <div className="w-full max-w-4xl shrink-0">
          <Navigation />
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
