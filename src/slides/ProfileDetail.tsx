import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { ProfileCard } from '../components/disc/ProfileCard';
import { Badge } from '../components/ui/Badge';
import { useAssessment } from '../context/AssessmentContext';
import { discProfiles } from '../data/profiles';
import type { DiscDimension } from '../data/types';

interface ProfileDetailProps {
  dimension: DiscDimension;
}

const dimColors: Record<DiscDimension, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };
const dimTitles: Record<DiscDimension, string> = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Compliance' };

export function ProfileDetail({ dimension }: ProfileDetailProps) {
  const { state } = useAssessment();
  const profile = discProfiles[dimension];
  const score = state.result?.rawScores.find((r) => r.dimension === dimension);

  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center overflow-y-auto px-6">
        <div className="h-14 shrink-0" />
        <div className="h-8" />
        <div className="w-full max-w-6xl min-w-0 shrink-0 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl shrink-0"
              style={{ backgroundColor: dimColors[dimension] }}
            >
              {dimension}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-navy">{dimTitles[dimension]}</h2>
              <p className="text-slate-400 text-sm mt-0.5">{profile.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge color={dimColors[dimension]} size="md">
                Most: {score?.most || 0}
              </Badge>
              <Badge color={dimColors[dimension]} size="md">
                Δ: {score?.change || 0}
              </Badge>
            </div>
          </div>
          <ProfileCard profile={profile} color={dimColors[dimension]} />
        </div>
        <div className="w-full max-w-6xl shrink-0">
          <Navigation />
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
