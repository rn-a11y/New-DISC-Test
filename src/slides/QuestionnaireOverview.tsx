import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { useAssessment } from '../context/AssessmentContext';
import { questionGroups } from '../data/questions';
import { Check } from 'lucide-react';

const dimColors: Record<string, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };

export function QuestionnaireOverview() {
  const { state } = useAssessment();
  const answeredCount = state.answers.size;

  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center px-6">
        <div className="h-14 shrink-0" />
        <div className="h-8" />
        <div className="w-full max-w-5xl min-w-0 shrink-0 py-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 rounded-full text-xs font-semibold text-navy/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-navy/40" />
              KUESIONER
            </div>
            <h2 className="text-4xl font-bold text-navy">Kuesioner DISC</h2>
            <p className="text-slate-400 mt-2">
              Terdapat {questionGroups.length} nomor, masing-masing dengan 4 pernyataan
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {questionGroups.slice(0, 6).map((group) => {
              const answer = state.answers.get(group.id);
              const isAnswered = answer && answer.most && answer.least;
              return (
                <div key={group.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {group.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-medium mb-1">Pilih satu P dan satu K:</p>
                    <div className="flex flex-wrap gap-2">
                      {group.statements.map((stmt) => (
                        <span key={stmt.dimension} className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                          <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: dimColors[stmt.dimension] }} />
                          {stmt.text.length > 25 ? stmt.text.slice(0, 25) + '…' : stmt.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {isAnswered ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3" /> Selesai
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-300">Belum</span>
                    )}
                  </div>
                </div>
              );
            })}
            {questionGroups.length > 6 && (
              <p className="text-center text-xs text-slate-400 pt-2">
                +{questionGroups.length - 6} nomor lainnya (total {questionGroups.length})
              </p>
            )}
          </div>

          <div className="bg-navy/5 rounded-2xl p-5 text-center">
            <p className="text-sm text-navy/70 font-semibold">
              <span className="text-navy">{answeredCount}</span> dari <span className="text-navy">{questionGroups.length}</span> nomor telah dijawab
            </p>
            <div className="w-full bg-white/60 rounded-full h-2 mt-3 overflow-hidden max-w-md mx-auto">
              <div
                className="h-full bg-navy rounded-full transition-all duration-500"
                style={{ width: `${(answeredCount / questionGroups.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl shrink-0">
          <Navigation nextLabel={answeredCount > 0 ? 'Lanjutkan' : 'Mulai'} />
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
