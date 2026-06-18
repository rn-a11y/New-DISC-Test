import { useAssessment } from '../../context/AssessmentContext';
import { BarChart3 } from 'lucide-react';

const totalSlides = 16;

const slideNames = [
  'Cover','About','Instructions','Info','Overview','Questionnaire',
  'Scoring','Dashboard','D','I','S','C','Combinations','Development','Team','Summary'
];

export function ProgressIndicator() {
  const { state, dispatch } = useAssessment();
  const { currentSlide } = state;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/60 no-print">
      <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between">
        <button
          onClick={() => dispatch({ type: 'SET_SLIDE', payload: 0 })}
          className="flex items-center gap-2 text-sm font-bold text-navy hover:text-navy-light transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          <span>DISC</span>
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }, (_, i) => (
            <div
              key={i}
              className="flex items-center"
            >
              <button
                onClick={() => {
                  if (i <= currentSlide) dispatch({ type: 'SET_SLIDE', payload: i });
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === currentSlide
                    ? 'w-6 h-1.5 bg-navy rounded-full'
                    : i < currentSlide
                    ? 'w-1.5 h-1.5 bg-emerald-400 hover:scale-125'
                    : 'w-1.5 h-1.5 bg-slate-200'
                }`}
                title={slideNames[i]}
              />
            </div>
          ))}
        </div>
        <span className="text-[11px] font-medium text-slate-400 tabular-nums">
          {String(currentSlide + 1).padStart(2,'0')}/{totalSlides}
        </span>
      </div>
    </div>
  );
}
