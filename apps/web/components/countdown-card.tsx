'use client';
import { getDaysToPlanEnd, getDaysToConvocation } from '@fitforge/shared';

export function CountdownCard() {
  const planDays = getDaysToPlanEnd();
  const convoDays = getDaysToConvocation();
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <p className="text-text-muted text-xs uppercase tracking-wider">Plan Ends</p>
        <p className="text-3xl font-bold text-accent-coral mt-1">{planDays}</p>
        <p className="text-text-secondary text-xs">days left</p>
      </div>
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <p className="text-text-muted text-xs uppercase tracking-wider">Convocation</p>
        <p className="text-3xl font-bold text-accent-teal mt-1">{convoDays}</p>
        <p className="text-text-secondary text-xs">days to June 14</p>
      </div>
    </div>
  );
}
