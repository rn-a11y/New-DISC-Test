import { SlideContainer } from '../components/layout/SlideContainer';
import { useAssessment } from '../context/AssessmentContext';
import { discProfiles } from '../data/profiles';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { RotateCcw, Printer, Star, Target, TrendingUp, Briefcase, FileText, FileSpreadsheet } from 'lucide-react';

const dimColors: Record<string, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };
const dimNames: Record<string, string> = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Compliance' };

export function FinalSummary() {
  const { state, dispatch } = useAssessment();
  const result = state.result;
  const { participant } = state;

  if (!result) return null;

  const primary = discProfiles[result.dominantStyle];
  const line3 = result.line3;

  const handlePrint = () => window.print();

  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center overflow-y-auto px-6">
        <div className="h-14 shrink-0" />
        <div className="w-full max-w-6xl min-w-0 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 rounded-full text-xs font-semibold text-navy/60 mb-4">
                <FileText className="w-3 h-3" />
                EXECUTIVE SUMMARY
              </div>
              <h2 className="text-4xl font-bold text-navy">Ringkasan Hasil</h2>
              <p className="text-slate-400 mt-1">DISC Personality Assessment</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4" /> Cetak
              </Button>
              <Button size="sm" onClick={() => dispatch({ type: 'RESET' })}>
                <RotateCcw className="w-4 h-4" /> Ulang
              </Button>
            </div>
          </div>

          <div className="bg-navy text-white rounded-2xl p-6 md:p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-2">Peserta</p>
                <h3 className="text-2xl font-bold">{participant.name || '—'}</h3>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm text-slate-300">
                  {participant.employeeId && <span>ID: {participant.employeeId}</span>}
                  {participant.department && <span>{participant.department}</span>}
                  {participant.position && <span>{participant.position}</span>}
                </div>
              </div>
              <div className="flex items-center gap-6 justify-start md:justify-end">
                <div className="text-center">
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">Dominan</p>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-xl"
                    style={{ backgroundColor: dimColors[result.dominantStyle] }}
                  >
                    {result.dominantStyle}
                  </div>
                  <p className="text-xs mt-1.5 font-medium" style={{ color: dimColors[result.dominantStyle] }}>
                    {dimNames[result.dominantStyle]}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">Sekunder</p>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-xl"
                    style={{ backgroundColor: dimColors[result.secondaryStyle] }}
                  >
                    {result.secondaryStyle}
                  </div>
                  <p className="text-xs mt-1.5 font-medium" style={{ color: dimColors[result.secondaryStyle] }}>
                    {dimNames[result.secondaryStyle]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-yellow-500" />
                <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Kunci Utama</h3>
              </div>
              <ul className="space-y-2">
                {line3.pattern.behaviour.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: dimColors[result.dominantStyle] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4" style={{ color: dimColors[result.dominantStyle] }} />
                <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Pengembangan</h3>
              </div>
              <ul className="space-y-2">
                {primary.developmentAreas.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                    <TrendingUp className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-slate-500" />
                <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Pekerjaan</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {line3.pattern.jobs.slice(0, 6).map((job, i) => (
                  <Badge key={i} color={dimColors[result.dominantStyle]} size="sm">{job}</Badge>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Pola Kepribadian</h3>
              </div>
              <p className="text-lg font-bold text-navy mb-1">{line3.pattern.label}</p>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{line3.pattern.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-5">Skor Akhir</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {result.rawScores.map((rs) => (
                <div key={rs.dimension} className="text-center p-4 rounded-xl" style={{ backgroundColor: dimColors[rs.dimension] + '06' }}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl font-bold" style={{ color: dimColors[rs.dimension] }}>{rs.dimension}</span>
                  </div>
                  <div className="flex justify-center gap-3 text-xs">
                    <span className="text-slate-400">M: <strong className="text-slate-700">{rs.most}</strong></span>
                    <span className="text-slate-400">L: <strong className="text-slate-700">{rs.least}</strong></span>
                    <span className="font-bold" style={{ color: rs.change >= 0 ? '#22C55E' : '#EF4444' }}>
                      Δ{rs.change > 0 ? '+' : ''}{rs.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-8 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'SET_SLIDE', payload: 0 })}>
            Kembali ke Awal
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => dispatch({ type: 'OPEN_REPORT' })}>
              <FileSpreadsheet className="w-4 h-4 mr-1.5" /> Buka Laporan
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1.5" /> Cetak Hasil
            </Button>
            <Button size="sm" onClick={() => dispatch({ type: 'RESET' })}>
              <RotateCcw className="w-4 h-4 mr-1.5" /> Asesmen Baru
            </Button>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
