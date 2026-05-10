'use client';

import { Meal } from '@fitforge/shared';

interface MealCardProps {
  mealTime: string;
  meal: Meal;
  eaten: boolean;
  onToggle: () => void;
}

const mealTimeLabels: Record<string, string> = {
  breakfast: 'Breakfast',
  midMorning: 'Mid-Morning',
  lunch: 'Lunch',
  preWorkout: 'Pre-Workout',
  postWorkout: 'Post-Workout',
  dinner: 'Dinner',
};

export function MealCard({ mealTime, meal, eaten, onToggle }: MealCardProps) {
  return (
    <div className={`bg-bg-card rounded-xl p-4 border transition-colors ${eaten ? 'border-success/30' : 'border-white/5'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-text-muted">
            {mealTimeLabels[mealTime] || mealTime}
          </p>
          <p className="font-medium text-text-primary mt-0.5">{meal.name}</p>
          <div className="flex gap-3 mt-1 text-xs text-text-secondary">
            <span>{meal.calories} cal</span>
            <span>{meal.protein}g protein</span>
          </div>
          <div className="mt-2 space-y-0.5">
            {meal.items.map((item, i) => (
              <p key={i} className="text-xs text-text-muted">{item}</p>
            ))}
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
            eaten
              ? 'bg-success border-success text-white'
              : 'border-text-muted hover:border-success'
          }`}
        >
          {eaten && <span className="text-sm">✓</span>}
        </button>
      </div>
    </div>
  );
}
