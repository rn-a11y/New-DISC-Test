import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { KpiCard } from '../components/ui/KpiCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { RadarChartGrid } from '../components/disc/RadarChart';
import { useAssessment } from '../context/AssessmentContext';
import { Swords, Flame, Anchor, Shield, BarChart3 } from 'lucide-react';

const dimConfig = {
  D: { label: 'Dominance', icon: Swords, color: '#EF4444', max: 24 },
  I: { label: 'Influence', icon: Flame, color: '#F97316', max: 24 },
  S: { label: 'Steadiness', icon: Anchor, color: '#22C55E', max: 24 },
  C: { label: 'Compliance', icon: Shield, color: '#3B82F6', max: 24 },
};

export function ScoreDashboard() {
  const { state } = useAssessment();
  const result = state.result;

  if (!result) return null;

  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center overflow-y-auto px-6">
        <div className="h-14 shrink-0" />
        <div className="w-full max-w-7xl min-w-0 py-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 rounded-full text-xs font-semibold text-navy/60 mb-4">
              <BarChart3 className="w-3 h-3" />
              HASIL SKOR
            </div>
            <h2 className="text-4xl font-bold text-navy">Dashboard Skor DISC</h2>
            <p className="text-slate-400 mt-2">Ringkasan skor kepribadian Anda</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            {result.rawScores.map((rs) => {
              const cfg = dimConfig[rs.dimension];
              return (
                <KpiCard
                  key={rs.dimension}
                  label={cfg.label}
                  value={rs.most}
                  icon={<cfg.icon className="w-5 h-5" />}
                  color={cfg.color}
                  subtitle={`Least: ${rs.least} | Δ${rs.change > 0 ? '+' : ''}${rs.change}`}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <h3 className="text-base font-bold text-navy mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Skor Most
              </h3>
              <div className="space-y-4">
                {result.rawScores.map((rs) => (
                  <ProgressBar
                    key={rs.dimension}
                    label={dimConfig[rs.dimension].label}
                    value={rs.most}
                    max={24}
                    color={dimConfig[rs.dimension].color}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <h3 className="text-base font-bold text-navy mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                Skor Change
              </h3>
              <div className="space-y-4">
                {result.rawScores.map((rs) => (
                  <ProgressBar
                    key={rs.dimension}
                    label={dimConfig[rs.dimension].label}
                    value={rs.change + 12}
                    max={24}
                    color={dimConfig[rs.dimension].color}
                    showValue={false}
                  />
                ))}
              </div>
            </div>
          </div>

          <RadarChartGrid line1={result.line1.scores} line2={result.line2.scores} line3={result.line3.scores} />
        </div>
        <div className="w-full max-w-7xl shrink-0">
          <Navigation />
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
