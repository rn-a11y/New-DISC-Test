import type { Answer, RawScore, StandardScore, DiscDimension, AssessmentResult, DiscPattern } from '../data/types';
import { discPatterns } from '../data/patterns';
import { getStandardScore } from '../data/scoreMapping';

export function calculateRawScores(answers: Map<number, Answer>): RawScore[] {
  const dims: DiscDimension[] = ['D', 'I', 'S', 'C'];
  const mostCount: Record<DiscDimension, number> = { D: 0, I: 0, S: 0, C: 0 };
  const leastCount: Record<DiscDimension, number> = { D: 0, I: 0, S: 0, C: 0 };

  answers.forEach((answer) => {
    mostCount[answer.most]++;
    leastCount[answer.least]++;
  });

  return dims.map((dim) => ({
    dimension: dim,
    most: mostCount[dim],
    least: leastCount[dim],
    change: mostCount[dim] - leastCount[dim],
  }));
}

export function calculateStandardScores(rawScores: RawScore[]): { line1: StandardScore[]; line2: StandardScore[]; line3: StandardScore[] } {
  const line1 = rawScores.map((r) => ({
    dimension: r.dimension,
    value: getStandardScore(1, r.dimension, r.most),
  }));
  const line2 = rawScores.map((r) => ({
    dimension: r.dimension,
    value: getStandardScore(2, r.dimension, r.least),
  }));
  const line3 = rawScores.map((r, i) => ({
    dimension: r.dimension,
    value: line1[i].value - line2[i].value,
  }));
  return { line1, line2, line3 };
}

function getPatternId(scores: StandardScore[]): number {
  const D = scores.find(s => s.dimension === 'D')?.value ?? 0;
  const I = scores.find(s => s.dimension === 'I')?.value ?? 0;
  const S = scores.find(s => s.dimension === 'S')?.value ?? 0;
  const C = scores.find(s => s.dimension === 'C')?.value ?? 0;

  if (D <= 0 && I <= 0 && S <= 0 && C > 0) return 1;
  if (D > 0 && I <= 0 && S <= 0 && C <= 0) return 2;
  if (D > 0 && I <= 0 && S <= 0 && C > 0 && C >= D) return 3;
  if (D > 0 && I > 0 && S <= 0 && C <= 0 && I >= D) return 4;
  if (D > 0 && I > 0 && S <= 0 && C > 0 && I >= D && D >= C) return 5;
  if (D > 0 && I > 0 && S > 0 && C <= 0 && I >= D && D >= S) return 6;
  if (D > 0 && I > 0 && S > 0 && C <= 0 && I >= S && S >= D) return 7;
  if (D > 0 && I <= 0 && S > 0 && C > 0 && S >= D && D >= C) return 8;
  if (D > 0 && I > 0 && S <= 0 && C <= 0 && D >= I) return 9;
  if (D > 0 && I > 0 && S > 0 && C <= 0 && D >= I && I >= S) return 10;
  if (D > 0 && I <= 0 && S > 0 && C <= 0 && D >= S) return 11;
  if (D <= 0 && I > 0 && S > 0 && C > 0 && C >= I && I >= S) return 12;
  if (D <= 0 && I > 0 && S > 0 && C > 0 && C >= S && S >= I) return 13;
  if (D <= 0 && I > 0 && S > 0 && C > 0 && I >= S && I >= C) return 14;
  if (D <= 0 && I <= 0 && S > 0 && C <= 0) return 15;
  if (D <= 0 && I <= 0 && S > 0 && C > 0 && C >= S) return 16;
  if (D <= 0 && I <= 0 && S > 0 && C > 0 && S >= C) return 17;
  if (D > 0 && I <= 0 && S <= 0 && C > 0 && D >= C) return 18;
  if (D > 0 && I > 0 && S <= 0 && C > 0 && D >= I && I >= C) return 19;
  if (D > 0 && I > 0 && S > 0 && C <= 0 && D >= S && S >= I) return 20;
  if (D > 0 && I <= 0 && S > 0 && C > 0 && D >= S && S >= C) return 21;
  if (D > 0 && I > 0 && S <= 0 && C > 0 && D >= C && C >= I) return 22;
  if (D > 0 && I <= 0 && S > 0 && C > 0 && D >= C && C >= S) return 23;
  if (D <= 0 && I > 0 && S <= 0 && C <= 0) return 24;
  if (D <= 0 && I > 0 && S > 0 && C <= 0 && I >= S) return 25;
  if (D <= 0 && I > 0 && S <= 0 && C > 0 && I >= C) return 26;
  if (D > 0 && I > 0 && S <= 0 && C > 0 && I >= C && C >= D) return 27;
  if (D <= 0 && I > 0 && S > 0 && C > 0 && I >= C && C >= S) return 28;
  if (D > 0 && I <= 0 && S > 0 && C <= 0 && S >= D) return 29;
  if (D <= 0 && I > 0 && S > 0 && C <= 0 && S >= I) return 30;
  if (D > 0 && I > 0 && S > 0 && C <= 0 && S >= D && D >= I) return 31;
  if (D > 0 && I > 0 && S > 0 && C <= 0 && S >= I && I >= D) return 32;
  if (D <= 0 && I > 0 && S > 0 && C > 0 && S >= I && I >= C) return 33;
  if (D > 0 && I <= 0 && S > 0 && C > 0 && S >= C && C >= D) return 34;
  if (D <= 0 && I > 0 && S > 0 && C > 0 && S >= C && C >= I) return 35;
  if (D <= 0 && I > 0 && S <= 0 && C > 0 && C >= I) return 36;
  if (D > 0 && I > 0 && S <= 0 && C > 0 && C >= D && D >= I) return 37;
  if (D > 0 && I <= 0 && S > 0 && C > 0 && C >= D && D >= S) return 38;
  if (D > 0 && I > 0 && S <= 0 && C > 0 && C >= I && I >= D) return 39;
  if (D > 0 && I <= 0 && S > 0 && C > 0 && C >= S && S >= D) return 40;
  return 0;
}

export function findDominantStyle(rawScores: RawScore[]): { dominant: DiscDimension; secondary: DiscDimension } {
  const sorted = [...rawScores].sort((a, b) => b.most - a.most);
  return {
    dominant: sorted[0].dimension,
    secondary: sorted[1].dimension,
  };
}

export function calculateResults(answers: Map<number, Answer>): AssessmentResult {
  const rawScores = calculateRawScores(answers);
  const { line1: s1, line2: s2, line3: s3 } = calculateStandardScores(rawScores);

  const line1Pattern = findPattern(s1);
  const line2Pattern = findPattern(s2);
  const line3Pattern = findPattern(s3);

  const { dominant, secondary } = findDominantStyle(rawScores);

  return {
    rawScores,
    standardScores: s3,
    line1: { pattern: line1Pattern, scores: s1 },
    line2: { pattern: line2Pattern, scores: s2 },
    line3: { pattern: line3Pattern, scores: s3 },
    dominantStyle: dominant,
    secondaryStyle: secondary,
  };
}

function findPattern(scores: StandardScore[]): DiscPattern {
  const id = getPatternId(scores);
  return discPatterns[id] || discPatterns[0];
}
