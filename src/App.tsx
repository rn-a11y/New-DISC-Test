import { AnimatePresence } from 'framer-motion';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import { ProgressIndicator } from './components/layout/ProgressIndicator';
import { Cover } from './slides/Cover';
import { AboutDisc } from './slides/AboutDisc';
import { Instructions } from './slides/Instructions';
import { ParticipantInfo } from './slides/ParticipantInfo';
import { QuestionnaireOverview } from './slides/QuestionnaireOverview';
import { QuestionnaireSection } from './slides/QuestionnaireSection';
import { ScoringProcess } from './slides/ScoringProcess';
import { ScoreDashboard } from './slides/ScoreDashboard';
import { ProfileDetail } from './slides/ProfileDetail';
import { CombinationProfiles } from './slides/CombinationProfiles';
import { DevelopmentInsights } from './slides/DevelopmentInsights';
import { TeamCollaboration } from './slides/TeamCollaboration';
import { FinalSummary } from './slides/FinalSummary';
import { ReportModal } from './components/report/ReportModal';

function AppContent() {
  const { state } = useAssessment();
  const { currentSlide } = state;

  const slides = [
    <Cover key="cover" />,
    <AboutDisc key="about" />,
    <Instructions key="instructions" />,
    <ParticipantInfo key="participant" />,
    <QuestionnaireOverview key="overview" />,
    <QuestionnaireSection key="questionnaire" />,
    <ScoringProcess key="scoring" />,
    <ScoreDashboard key="dashboard" />,
    <ProfileDetail key="profile-d" dimension="D" />,
    <ProfileDetail key="profile-i" dimension="I" />,
    <ProfileDetail key="profile-s" dimension="S" />,
    <ProfileDetail key="profile-c" dimension="C" />,
    <CombinationProfiles key="combinations" />,
    <DevelopmentInsights key="development" />,
    <TeamCollaboration key="team" />,
    <FinalSummary key="summary" />,
  ];

  return (
    <div className="relative">
      <ProgressIndicator />
      <div>
        <AnimatePresence mode="wait">
          {slides[currentSlide] || slides[0]}
        </AnimatePresence>
      </div>
      <ReportModal />
    </div>
  );
}

export default function App() {
  return (
    <AssessmentProvider>
      <AppContent />
    </AssessmentProvider>
  );
}
