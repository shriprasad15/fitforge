'use client';
import { getCurrentPhase, getPhaseLabel } from '@fitforge/shared';

export function PhaseBadge() {
  const phase = getCurrentPhase();
  const label = getPhaseLabel(phase);
  const colors = {
    phase1: 'bg-accent-teal/10 text-accent-teal border-accent-teal/30',
    phase2: 'bg-accent-coral/10 text-accent-coral border-accent-coral/30',
    phase3: 'bg-accent-gold/10 text-accent-gold border-accent-gold/30',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors[phase]}`}>
      {label}
    </span>
  );
}
