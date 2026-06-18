export type DiscDimension = 'D' | 'I' | 'S' | 'C';

export interface QuestionGroup {
  id: number;
  statements: {
    text: string;
    dimension: DiscDimension;
  }[];
}

export interface Participant {
  name: string;
  employeeId: string;
  department: string;
  position: string;
  date: string;
}

export interface Answer {
  most: DiscDimension;
  least: DiscDimension;
}

export interface RawScore {
  dimension: DiscDimension;
  most: number;
  least: number;
  change: number;
}

export interface StandardScore {
  dimension: DiscDimension;
  value: number;
}

export interface DiscPattern {
  id: number;
  label: string;
  behaviour: string[];
  description: string;
  jobs: string[];
}

export interface AssessmentResult {
  rawScores: RawScore[];
  standardScores: StandardScore[];
  line1: { pattern: DiscPattern; scores: StandardScore[] };
  line2: { pattern: DiscPattern; scores: StandardScore[] };
  line3: { pattern: DiscPattern; scores: StandardScore[] };
  dominantStyle: DiscDimension;
  secondaryStyle: DiscDimension;
}

export interface DiscProfileDetails {
  dimension: DiscDimension;
  title: string;
  subtitle: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  workplacePreferences: string[];
  communicationStyle: string;
  leadershipStyle: string;
  developmentAreas: string[];
}
