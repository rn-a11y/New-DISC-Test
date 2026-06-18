import { Radar, RadarChart as RechartRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { StandardScore } from '../../data/types';

interface RadarChartProps {
  label: string;
  data: { dimension: string; value: number }[];
  color?: string;
}

export function DISC_RadarChart({ label, data, color = '#0F172A' }: RadarChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{label}</h3>
      <ResponsiveContainer width="100%" height={320}>
        <RechartRadar data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: '#374151', fontSize: 14, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[-12, 12]} tick={false} axisLine={false} />
          <Tooltip />
          <Radar name={label} dataKey="value" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={2} />
        </RechartRadar>
      </ResponsiveContainer>
    </div>
  );
}

export function RadarChartGrid({ line1, line2, line3 }: { line1: StandardScore[]; line2: StandardScore[]; line3: StandardScore[] }) {
  const format = (scores: StandardScore[]) =>
    scores.map(s => ({ dimension: s.dimension, value: s.value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DISC_RadarChart label="Most — Topeng Publik" data={format(line1)} color="#0F172A" />
      <DISC_RadarChart label="Least — Inti Pribadi" data={format(line2)} color="#6366F1" />
      <DISC_RadarChart label="Change — Cermin Diri" data={format(line3)} color="#8B5CF6" />
    </div>
  );
}
