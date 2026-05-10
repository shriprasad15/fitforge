'use client';

import { useState } from 'react';
import { Exercise } from '@fitforge/shared';

interface ExerciseCardProps {
  exercise: Exercise;
  children?: React.ReactNode;
}

export function ExerciseCard({ exercise, children }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-bg-card rounded-xl border border-white/5 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-text-primary truncate">{exercise.name}</p>
            {exercise.isPriority && (
              <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-accent-gold/10 text-accent-gold border border-accent-gold/30">
                Priority
              </span>
            )}
            {exercise.isSuperset && (
              <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-accent-teal/10 text-accent-teal border border-accent-teal/30">
                SS
              </span>
            )}
          </div>
          <div className="flex gap-3 mt-1 text-xs text-text-secondary">
            <span>{exercise.sets} x {exercise.reps}</span>
            <span>{exercise.startWeight}</span>
            <span>Rest: {exercise.rest}</span>
          </div>
        </div>
        <span className="text-text-muted text-lg shrink-0">
          {expanded ? '−' : '+'}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-xs text-text-muted italic">{exercise.cue}</p>
          {exercise.isSuperset && exercise.supersetWith && (
            <p className="text-xs text-accent-teal">Superset with: {exercise.supersetWith}</p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
