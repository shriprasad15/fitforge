'use client';

import { WeighIn } from '@fitforge/shared';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

interface WeightChartProps {
  weighIns: WeighIn[];
}

const TARGET_WEIGHT = 62.8;

export function WeightChart({ weighIns }: WeightChartProps) {
  if (weighIns.length === 0) {
    return (
      <div className="bg-bg-card rounded-xl p-4 border border-white/5 text-center">
        <p className="text-text-muted text-sm">No weigh-in data yet. Add your first entry!</p>
      </div>
    );
  }

  const data = weighIns.map((w) => ({
    date: w.date.slice(5), // MM-DD
    weight: w.weight,
    waist: w.waistCm,
    arm: w.armCm,
  }));

  return (
    <div className="bg-bg-card rounded-xl p-4 border border-white/5">
      <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Weight Progress</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#252540" />
          <XAxis dataKey="date" tick={{ fill: '#6b6b7b', fontSize: 10 }} />
          <YAxis domain={['auto', 'auto']} tick={{ fill: '#6b6b7b', fontSize: 10 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
            labelStyle={{ color: '#a0a0b0' }}
            itemStyle={{ color: '#ffffff' }}
          />
          <ReferenceLine y={TARGET_WEIGHT} stroke="#4ecdc4" strokeDasharray="5 5" label={{ value: 'Target', fill: '#4ecdc4', fontSize: 10 }} />
          <Line type="monotone" dataKey="weight" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b', r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
