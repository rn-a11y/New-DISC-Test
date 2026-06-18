import { useAssessment } from '../../context/AssessmentContext';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationProps {
  onNext?: () => void;
  nextLabel?: string;
  disableNext?: boolean;
  hidePrev?: boolean;
}

export function Navigation({ onNext, nextLabel = 'Lanjut', disableNext = false, hidePrev = false }: NavigationProps) {
  const { state, dispatch } = useAssessment();
  const totalSlides = 16;

  const goNext = () => {
    if (onNext) {
      onNext();
    } else if (state.currentSlide < totalSlides - 1) {
      dispatch({ type: 'SET_SLIDE', payload: state.currentSlide + 1 });
    }
  };

  const goPrev = () => {
    if (state.currentSlide > 0) {
      dispatch({ type: 'SET_SLIDE', payload: state.currentSlide - 1 });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-8 pb-8 border-t border-slate-100 mt-8">
      {!hidePrev && state.currentSlide > 0 && (
        <Button variant="ghost" onClick={goPrev} size="sm">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Kembali
        </Button>
      )}
      <Button onClick={goNext} disabled={disableNext} size="sm">
        {nextLabel}
        <ArrowRight className="w-4 h-4 ml-1.5" />
      </Button>
    </div>
  );
}
