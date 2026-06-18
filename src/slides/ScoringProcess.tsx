import { useEffect } from 'react';
import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { ScoringFlow } from '../components/disc/ScoringFlow';
import { useAssessment } from '../context/AssessmentContext';

export function ScoringProcess() {
  const { dispatch } = useAssessment();

  useEffect(() => {
    dispatch({ type: 'CALCULATE_RESULTS' });
  }, []);

  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center px-6">
        <div className="h-14 shrink-0" />
        <div className="h-8" />
        <div className="w-full max-w-4xl min-w-0 shrink-0 py-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-navy">Proses Skoring</h2>
            <p className="text-slate-400 mt-3">Bagaimana jawaban Anda diolah menjadi profil kepribadian</p>
          </div>
          <ScoringFlow />
          <div className="mt-12 bg-navy text-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-lg font-medium">Menghitung hasil asesmen Anda...</p>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
        <div className="w-full max-w-4xl shrink-0">
          <Navigation nextLabel="Lihat Hasil" />
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
