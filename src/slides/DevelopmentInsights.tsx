import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { useAssessment } from '../context/AssessmentContext';
import { discProfiles } from '../data/profiles';
import { Badge } from '../components/ui/Badge';
import { Target, TrendingUp, MessageCircle, Users, Lightbulb, ArrowUpRight, Sparkles } from 'lucide-react';

const dimColors: Record<string, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };

export function DevelopmentInsights() {
  const { state } = useAssessment();
  const result = state.result;
  if (!result) return null;

  const primary = discProfiles[result.dominantStyle];
  const secondary = discProfiles[result.secondaryStyle];

  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center overflow-y-auto px-6">
        <div className="h-14 shrink-0" />
        <div className="w-full max-w-6xl min-w-0 py-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 rounded-full text-xs font-semibold text-navy/60 mb-4">
              <Sparkles className="w-3 h-3" />
              PENGEMBANGAN
            </div>
            <h2 className="text-4xl font-bold text-navy">Wawasan Pengembangan Diri</h2>
            <p className="text-slate-400 mt-2">Insight personal untuk pengembangan karier dan kepemimpinan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: dimColors[result.dominantStyle] + '15' }}>
                  <Target className="w-5 h-5" style={{ color: dimColors[result.dominantStyle] }} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-sm">Kekuatan Utama</h3>
                  <Badge color={dimColors[result.dominantStyle]} size="sm">Dominan: {result.dominantStyle}</Badge>
                </div>
              </div>
              <ul className="space-y-2">
                {[...primary.strengths, ...secondary.strengths].slice(0, 5).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                    <TrendingUp className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-50">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-bold text-navy text-sm">Area Pengembangan</h3>
              </div>
              <ul className="space-y-2">
                {[...primary.developmentAreas, ...secondary.developmentAreas].slice(0, 5).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                    <ArrowUpRight className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: dimColors[result.dominantStyle] + '15' }}>
                  <MessageCircle className="w-5 h-5" style={{ color: dimColors[result.dominantStyle] }} />
                </div>
                <h3 className="font-bold text-navy text-sm">Gaya Komunikasi</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{primary.communicationStyle}</p>
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Tips dengan tipe {result.secondaryStyle}:</p>
                <p className="text-sm text-slate-600">{secondary.communicationStyle}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: dimColors[result.dominantStyle] + '15' }}>
                  <Users className="w-5 h-5" style={{ color: dimColors[result.dominantStyle] }} />
                </div>
                <h3 className="font-bold text-navy text-sm">Gaya Kepemimpinan</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{primary.leadershipStyle}</p>
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Pengembangan leadership:</p>
                <p className="text-sm text-slate-600">{secondary.leadershipStyle}</p>
              </div>
            </div>
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
