import { createContext, useContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import type { Participant, Answer, AssessmentResult, DiscDimension } from '../data/types';
import { calculateResults } from '../utils/scoring';

interface AssessmentState {
  participant: Participant;
  answers: Map<number, Answer>;
  result: AssessmentResult | null;
  currentSlide: number;
  currentQuestionPage: number;
  isReportOpen: boolean;
}

type Action =
  | { type: 'SET_PARTICIPANT'; payload: Participant }
  | { type: 'ANSWER_QUESTION'; payload: { groupId: number; answer: Answer } }
  | { type: 'CALCULATE_RESULTS' }
  | { type: 'SET_SLIDE'; payload: number }
  | { type: 'NEXT_QUESTION_PAGE' }
  | { type: 'PREV_QUESTION_PAGE' }
  | { type: 'OPEN_REPORT' }
  | { type: 'CLOSE_REPORT' }
  | { type: 'RESET' };

function getPrefilledAnswers(): Map<number, Answer> {
  const answers = new Map<number, Answer>();
  // D most=10, I most=6, S most=5, C most=3
  // least: D=1, I=6, S=8, C=9
  const plan: [number, DiscDimension, DiscDimension][] = [
    // 10 x D-most
    [1, 'D', 'I'], [2, 'D', 'S'], [3, 'D', 'C'],
    [4, 'D', 'I'], [5, 'D', 'S'], [6, 'D', 'C'],
    [7, 'D', 'I'], [8, 'D', 'S'], [9, 'D', 'C'], [10, 'D', 'S'],
    // 6 x I-most
    [11, 'I', 'C'], [12, 'I', 'C'], [13, 'I', 'D'],
    [14, 'I', 'S'], [15, 'I', 'C'], [16, 'I', 'S'],
    // 5 x S-most
    [17, 'S', 'I'], [18, 'S', 'C'], [19, 'S', 'I'],
    [20, 'S', 'C'], [21, 'S', 'C'],
    // 3 x C-most
    [22, 'C', 'S'], [23, 'C', 'S'], [24, 'C', 'S'],
  ];
  // Verify counts
  const mC: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
  const lC: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
  plan.forEach(([, m, l]) => { mC[m]++; lC[l]++; });
  // Ensure each question id 1-24 is present exactly once
  const ids = plan.map(p => p[0]).sort((a, b) => a - b);
  if (ids.length !== 24 || ids[0] !== 1 || ids[23] !== 24 || new Set(ids).size !== 24) {
    throw new Error('Prefilled answers must cover questions 1-24 exactly once');
  }
  plan.forEach(([q, m, l]) => answers.set(q, { most: m, least: l }));
  return answers;
}

const prefilledAnswers = getPrefilledAnswers();
const prefilledResult = calculateResults(prefilledAnswers);

const initialState: AssessmentState = {
  participant: {
    name: 'Test User',
    employeeId: 'EMP-001',
    department: 'Information Technology',
    position: 'System Analyst',
    date: new Date().toISOString().split('T')[0],
  },
  answers: prefilledAnswers,
  result: prefilledResult,
  currentSlide: 0,
  currentQuestionPage: 0,
  isReportOpen: false,
};

function assessmentReducer(state: AssessmentState, action: Action): AssessmentState {
  switch (action.type) {
    case 'SET_PARTICIPANT':
      return { ...state, participant: action.payload };
    case 'ANSWER_QUESTION': {
      const newAnswers = new Map(state.answers);
      newAnswers.set(action.payload.groupId, action.payload.answer);
      return { ...state, answers: newAnswers };
    }
    case 'CALCULATE_RESULTS': {
      const result = calculateResults(state.answers);
      return { ...state, result };
    }
    case 'SET_SLIDE':
      return { ...state, currentSlide: action.payload };
    case 'NEXT_QUESTION_PAGE':
      return { ...state, currentQuestionPage: state.currentQuestionPage + 1 };
    case 'PREV_QUESTION_PAGE':
      return { ...state, currentQuestionPage: Math.max(0, state.currentQuestionPage - 1) };
    case 'OPEN_REPORT':
      return { ...state, isReportOpen: true };
    case 'CLOSE_REPORT':
      return { ...state, isReportOpen: false };
    case 'RESET':
      return { ...initialState, participant: { ...initialState.participant } };
    default:
      return state;
  }
}

interface AssessmentContextType {
  state: AssessmentState;
  dispatch: Dispatch<Action>;
}

const AssessmentContext = createContext<AssessmentContextType | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessment must be used within AssessmentProvider');
  return ctx;
}
