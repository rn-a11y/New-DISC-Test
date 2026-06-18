export interface ScoreMapEntry {
  line: 1 | 2;
  value: number;
  d: number;
  i: number;
  s: number;
  c: number;
}

const buildMapping = (): ScoreMapEntry[] => {
  const entries: ScoreMapEntry[] = [];

  const line1Values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const line2Values = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12];

  const d1 = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7];
  const i1 = [4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8];
  const s1 = [3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9];
  const c1 = [2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10];

  const d2 = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  const i2 = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4];
  const s2 = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3];
  const c2 = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2];

  for (let i = 0; i < 13; i++) {
    entries.push({ line: 1, value: line1Values[i], d: d1[i], i: i1[i], s: s1[i], c: c1[i] });
    entries.push({ line: 2, value: line2Values[i], d: d2[i], i: i2[i], s: s2[i], c: c2[i] });
  }

  return entries;
};

export const scoreMapping = buildMapping();

export function getStandardScore(line: 1 | 2, dimension: 'D' | 'I' | 'S' | 'C', rawValue: number): number {
  const dimKey = dimension.toLowerCase() as 'd' | 'i' | 's' | 'c';
  const match = scoreMapping.find(m => m.line === line && m[dimKey] === rawValue);
  if (match) return match.value;
  if (rawValue > 0) {
    const sorted = scoreMapping
      .filter(m => m.line === line)
      .sort((a, b) => Math.abs(a[dimKey] - rawValue) - Math.abs(b[dimKey] - rawValue));
    return sorted[0]?.value ?? 0;
  }
  return 0;
}
