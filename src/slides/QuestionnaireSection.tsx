import { useState } from 'react';
import { SlideContainer } from '../components/layout/SlideContainer';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight, AlertCircle, Check, X } from 'lucide-react';
import { questionGroups } from '../data/questions';
import type { DiscDimension } from '../data/types';

const QUESTIONS_PER_PAGE = 4;
const totalPages = Math.ceil(questionGroups.length / QUESTIONS_PER_PAGE);

const dimColors: Record<DiscDimension, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };

export function QuestionnaireSection() {
  const { state, dispatch } = useAssessment();
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);

  const pageGroups = questionGroups.slice(page * QUESTIONS_PER_PAGE, (page + 1) * QUESTIONS_PER_PAGE);

  const setAnswer = (groupId: number, type: 'most' | 'least', dimension: DiscDimension) => {
    const current = state.answers.get(groupId);
    const otherType = type === 'most' ? 'least' : 'most';
    if (current && current[otherType] === dimension) {
      const fallback: DiscDimension = (['D', 'I', 'S', 'C'] as const).find(d => d !== dimension) ?? 'D';
      dispatch({
        type: 'ANSWER_QUESTION',
        payload: { groupId, answer: { ...current, [type]: dimension, [otherType]: fallback } }
      });
      return;
    }
    const answer = { ...current || { most: 'D', least: 'I' }, [type]: dimension };
    if (answer.most === answer.least) {
      const free = (['D', 'I', 'S', 'C'] as const).find(d => d !== answer.most) ?? 'D';
      answer[otherType] = free;
    }
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: { groupId, answer }
    });
  };

  const validatePage = () => {
    const errs: number[] = [];
    pageGroups.forEach((g) => {
      const a = state.answers.get(g.id);
      if (!a || !a.most || !a.least) {
        errs.push(g.id);
      }
    });
    setErrors(errs);
    return errs.length === 0;
  };

  const goNext = () => {
    if (page < totalPages - 1) {
      if (validatePage()) {
        setPage(page + 1);
        setErrors([]);
      }
    } else {
      if (validatePage()) {
        dispatch({ type: 'SET_SLIDE', payload: 6 });
      }
    }
  };

  const goPrev = () => {
    if (page > 0) {
      setPage(page - 1);
      setErrors([]);
    } else {
      dispatch({ type: 'SET_SLIDE', payload: 4 });
    }
  };

  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center px-4 md:px-6">
        <div className="h-14 shrink-0" />
        <div className="h-8" />
        <div className="w-full max-w-4xl min-w-0 flex-1 flex flex-col gap-6 py-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-navy">Kuesioner DISC</h2>
                <p className="text-sm text-slate-400 mt-0.5">Pilih PALING (P) dan PALING TIDAK (K) untuk setiap nomor</p>
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold transition-all ${
                      i === page ? 'bg-navy text-white shadow-lg shadow-navy/20' :
                      i < page ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {i < page ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {pageGroups.map((group) => {
                const answer = state.answers.get(group.id);
                const hasError = errors.includes(group.id);
                return (
                  <div
                    key={group.id}
                    className={`card-hover bg-white rounded-xl shadow-lg border p-5 ${
                      hasError ? 'border-red-300 shadow-red-100/30' : 'border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">
                        {group.id}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-500 flex-1">Pilih satu P dan satu K</h3>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider w-9 text-center shrink-0">P</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider w-9 text-center shrink-0">K</span>
                      {hasError && (
                        <span className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
                          <AlertCircle className="w-3 h-3" /> Harus dipilih kedua
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {group.statements.map((stmt) => {
                        const isMost = answer?.most === stmt.dimension;
                        const isLeast = answer?.least === stmt.dimension;
                        const dimColor = dimColors[stmt.dimension];
                        return (
                          <div
                            key={stmt.dimension}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                              isMost || isLeast ? 'bg-slate-50 ring-1 ring-slate-200' : ''
                            }`}
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-sm shrink-0"
                              style={{ backgroundColor: dimColor }}
                            />

                            <span className="flex-1 text-sm text-slate-700 leading-snug">{stmt.text}</span>

                            <button
                              onClick={() => setAnswer(group.id, 'most', stmt.dimension)}
                              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                isMost
                                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                  : 'bg-slate-100 hover:bg-emerald-50'
                              }`}
                              title="Paling menggambarkan"
                            >
                              {isMost ? <Check className="w-4 h-4" /> : <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: dimColor }} />}
                            </button>

                            <button
                              onClick={() => setAnswer(group.id, 'least', stmt.dimension)}
                              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                isLeast
                                  ? 'bg-red-500 text-white shadow-md shadow-red-200'
                                  : 'bg-slate-100 hover:bg-red-50'
                              }`}
                              title="Paling tidak menggambarkan"
                            >
                              {isLeast ? <X className="w-4 h-4" /> : <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: dimColor }} />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-8 pb-8 border-t border-slate-100 shrink-0">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <Button variant="ghost" onClick={goPrev} size="sm">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                {page === 0 ? 'Overview' : 'Sebelumnya'}
              </Button>
              <span className="text-xs text-slate-400 font-medium tabular-nums">
                {page + 1} / {totalPages}
              </span>
              <Button onClick={goNext} size="sm">
                {page < totalPages - 1 ? 'Selanjutnya' : 'Lihat Hasil'}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
