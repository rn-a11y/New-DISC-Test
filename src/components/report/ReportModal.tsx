import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAssessment } from '../../context/AssessmentContext';
import { ProfessionalReport } from '../../slides/ProfessionalReport';
import { X, Printer } from 'lucide-react';
import { Button } from '../ui/Button';

export function ReportModal() {
  const { state, dispatch } = useAssessment();

  const handleClose = useCallback(() => {
    dispatch({ type: 'CLOSE_REPORT' });
  }, [dispatch]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (state.isReportOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [state.isReportOpen, handleClose]);

  if (!state.isReportOpen || !state.result) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white">
      {/* Toolbar */}
      <div className="no-print flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200 bg-white shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-navy">DISC Profile Report</span>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-1.5" /> Download PDF
        </Button>
      </div>

      {/* Report content */}
      <div className="flex-1 overflow-y-auto bg-slate-100 print:bg-white" style={{ scrollBehavior: 'smooth' }}>
        <div className="max-w-[210mm] mx-auto print:mx-0 print:max-w-none">
          <ProfessionalReport />
        </div>
      </div>

      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .report-page { page-break-after: always; page-break-inside: avoid; padding: 0.5in !important; }
          @page { margin: 0; size: A4; }
        }
      `}</style>
    </div>,
    document.body
  );
}
