'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useSession } from '@/hooks/use-session';
import { ExerciseCard } from '@/components/exercise-card';
import { ExerciseLogger } from '@/components/exercise-logger';
import {
  gymPlan,
  Phase,
  GymDay,
  GymSession,
  ExerciseLog,
  getCurrentPhase,
  getGymDay,
  getToday,
} from '@fitforge/shared';

const phaseKeys: Phase[] = ['phase1', 'phase2', 'phase3'];
const phaseTabLabels: Record<Phase, string> = {
  phase1: 'Week 1-2',
  phase2: 'Week 3-4',
  phase3: 'Final Week',
};

const days: GymDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const dayLabels: Record<GymDay, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
};

export default function GymPage() {
  const { user } = useAuth();
  const today = getToday();
  const { session, save } = useSession(today);

  const [selectedPhase, setSelectedPhase] = useState<Phase>(getCurrentPhase());
  const [selectedDay, setSelectedDay] = useState<GymDay>(getGymDay() || 'monday');

  const plan = gymPlan[selectedPhase];
  const dayPlan = plan.days[selectedDay];

  const handleExerciseUpdate = useCallback((log: ExerciseLog) => {
    if (!user) return;
    const existing = session?.exercises || [];
    const updated = existing.filter((e) => e.exerciseId !== log.exerciseId);
    updated.push(log);

    const newSession: GymSession = {
      date: today,
      phase: selectedPhase,
      day: selectedDay,
      exercises: updated,
    };
    save(newSession);
  }, [user, session, today, selectedPhase, selectedDay, save]);

  const getExistingLog = (exerciseId: string) => {
    return session?.exercises.find((e) => e.exerciseId === exerciseId);
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Gym Plan</h1>

      {/* Phase Tabs */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1">
        {phaseKeys.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPhase(p)}
            className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
              selectedPhase === p
                ? 'bg-accent-coral text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {phaseTabLabels[p]}
          </button>
        ))}
      </div>

      {/* Day Selector */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`flex-1 text-xs font-medium py-2 px-2 rounded-md transition-colors ${
              selectedDay === d
                ? 'bg-accent-teal text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {dayLabels[d]}
          </button>
        ))}
      </div>

      {/* Day Plan Header */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h2 className="font-medium text-text-primary">{dayPlan.name}</h2>
        {dayPlan.postGym && (
          <p className="text-xs text-accent-teal mt-1">After gym: {dayPlan.postGym}</p>
        )}
      </div>

      {/* Exercises */}
      <div className="space-y-2">
        {dayPlan.exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise}>
            <ExerciseLogger
              exercise={exercise}
              existingLog={getExistingLog(exercise.id)}
              onUpdate={handleExerciseUpdate}
            />
          </ExerciseCard>
        ))}
      </div>
    </div>
  );
}
