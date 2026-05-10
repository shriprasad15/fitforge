'use client';

import { useState } from 'react';
import { Exercise, ExerciseLog, SetLog, checkProgressiveOverload } from '@fitforge/shared';

interface ExerciseLoggerProps {
  exercise: Exercise;
  existingLog?: ExerciseLog;
  previousWeight?: number;
  onUpdate: (log: ExerciseLog) => void;
}

export function ExerciseLogger({ exercise, existingLog, previousWeight, onUpdate }: ExerciseLoggerProps) {
  const defaultSets: SetLog[] = Array.from({ length: exercise.sets }, () => ({
    reps: 0,
    weight: 0,
    completed: false,
  }));

  const [sets, setSets] = useState<SetLog[]>(existingLog?.sets || defaultSets);

  const handleSetChange = (index: number, field: keyof SetLog, value: number | boolean) => {
    const updated = [...sets];
    updated[index] = { ...updated[index], [field]: value };
    setSets(updated);

    const completed = updated.every((s) => s.completed);
    onUpdate({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: updated,
      completed,
    });
  };

  const getOverloadWarning = (weight: number) => {
    if (!previousWeight || previousWeight === 0) return null;
    const check = checkProgressiveOverload(previousWeight, weight);
    if (!check.safe) return check.warning;
    return null;
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 text-xs text-text-muted px-1">
        <span>Set</span>
        <span>Reps</span>
        <span>Weight (kg)</span>
        <span>Done</span>
      </div>
      {sets.map((set, i) => {
        const warning = getOverloadWarning(set.weight);
        return (
          <div key={i}>
            <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center">
              <span className="text-xs text-text-muted w-6 text-center">{i + 1}</span>
              <input
                type="number"
                min={0}
                value={set.reps || ''}
                onChange={(e) => handleSetChange(i, 'reps', Number(e.target.value))}
                className="bg-bg-elevated border border-white/10 rounded-lg px-2 py-1.5 text-sm text-text-primary w-full"
                placeholder="0"
              />
              <input
                type="number"
                min={0}
                step={0.5}
                value={set.weight || ''}
                onChange={(e) => handleSetChange(i, 'weight', Number(e.target.value))}
                className="bg-bg-elevated border border-white/10 rounded-lg px-2 py-1.5 text-sm text-text-primary w-full"
                placeholder="0"
              />
              <input
                type="checkbox"
                checked={set.completed}
                onChange={(e) => handleSetChange(i, 'completed', e.target.checked)}
                className="w-5 h-5 rounded accent-accent-teal"
              />
            </div>
            {warning && (
              <p className="text-[10px] text-danger mt-0.5 ml-6">{warning}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
