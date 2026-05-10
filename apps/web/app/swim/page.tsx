'use client';

import { LapCounter } from '@/components/lap-counter';
import { swimPlan, getCurrentWeek } from '@fitforge/shared';

export default function SwimPage() {
  const week = getCurrentWeek();
  const plan = swimPlan[Math.min(week, swimPlan.length) - 1];

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Swim Session</h1>

      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <p className="text-xs text-text-muted uppercase tracking-wider">Week {plan.week} Plan</p>
        <p className="text-lg font-semibold text-text-primary mt-1">{plan.totalLaps} total laps</p>
      </div>

      {/* Lap Counter */}
      <LapCounter targetLaps={plan.totalLaps} />

      {/* Breath Control Tip */}
      <div className="bg-accent-teal/5 border border-accent-teal/20 rounded-xl p-4">
        <p className="text-xs text-accent-teal font-medium uppercase tracking-wider mb-1">Breath Control Tip</p>
        <p className="text-sm text-text-secondary leading-relaxed">{plan.breathControlTip}</p>
      </div>

      {/* Swim Plan Breakdown */}
      <div className="space-y-3">
        {/* Warmup */}
        <div className="bg-bg-card rounded-xl p-4 border border-white/5">
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-2">Warmup</h3>
          {plan.warmup.map((seg, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <span className="text-sm text-text-primary capitalize">{seg.stroke}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">{seg.laps} laps</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  seg.pace === 'easy' ? 'bg-success/10 text-success' :
                  seg.pace === 'moderate' ? 'bg-accent-gold/10 text-accent-gold' :
                  'bg-accent-coral/10 text-accent-coral'
                }`}>{seg.pace}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Set */}
        <div className="bg-bg-card rounded-xl p-4 border border-white/5">
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-2">Main Set</h3>
          {plan.mainSet.map((seg, i) => (
            <div key={i} className="py-1.5 border-b border-white/5 last:border-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary capitalize">{seg.stroke}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary">{seg.laps} laps</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    seg.pace === 'easy' ? 'bg-success/10 text-success' :
                    seg.pace === 'moderate' ? 'bg-accent-gold/10 text-accent-gold' :
                    'bg-accent-coral/10 text-accent-coral'
                  }`}>{seg.pace}</span>
                </div>
              </div>
              {seg.notes && <p className="text-[10px] text-text-muted mt-0.5">{seg.notes}</p>}
            </div>
          ))}
        </div>

        {/* Cooldown */}
        <div className="bg-bg-card rounded-xl p-4 border border-white/5">
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-2">Cooldown</h3>
          {plan.cooldown.map((seg, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <span className="text-sm text-text-primary capitalize">{seg.stroke}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">{seg.laps} laps</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  seg.pace === 'easy' ? 'bg-success/10 text-success' :
                  seg.pace === 'moderate' ? 'bg-accent-gold/10 text-accent-gold' :
                  'bg-accent-coral/10 text-accent-coral'
                }`}>{seg.pace}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
