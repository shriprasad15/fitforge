'use client';

import { useState } from 'react';
import { MealCard } from '@/components/meal-card';
import { SnackGrid } from '@/components/snack-grid';
import {
  mealPlan,
  DayOfWeek,
  MealTime,
  getDayOfWeek,
  DAILY_CALORIE_TARGET,
  DAILY_PROTEIN_TARGET,
} from '@fitforge/shared';

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayLabels: Record<DayOfWeek, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};

const mealTimes: MealTime[] = ['breakfast', 'midMorning', 'lunch', 'preWorkout', 'postWorkout', 'dinner'];

export default function MealsPage() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getDayOfWeek());
  const [eaten, setEaten] = useState<Record<string, boolean>>({});
  const [showSnacks, setShowSnacks] = useState(false);

  const dayMeals = mealPlan[selectedDay];

  const toggleEaten = (mealTime: MealTime) => {
    const key = `${selectedDay}-${mealTime}`;
    setEaten((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalCalories = mealTimes.reduce((sum, mt) => {
    const key = `${selectedDay}-${mt}`;
    return sum + (eaten[key] ? dayMeals[mt].calories : 0);
  }, 0);

  const totalProtein = mealTimes.reduce((sum, mt) => {
    const key = `${selectedDay}-${mt}`;
    return sum + (eaten[key] ? dayMeals[mt].protein : 0);
  }, 0);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Meal Plan</h1>

      {/* Day Selector */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1 overflow-x-auto">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`flex-1 text-xs font-medium py-2 px-2 rounded-md transition-colors whitespace-nowrap ${
              selectedDay === d
                ? 'bg-accent-coral text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {dayLabels[d]}
          </button>
        ))}
      </div>

      {/* Daily Totals */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-text-muted">Calories Eaten</p>
            <p className="text-xl font-bold text-text-primary">
              {totalCalories} <span className="text-sm text-text-muted">/ {DAILY_CALORIE_TARGET}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted">Protein</p>
            <p className="text-xl font-bold text-text-primary">
              {totalProtein}g <span className="text-sm text-text-muted">/ {DAILY_PROTEIN_TARGET}g</span>
            </p>
          </div>
        </div>
      </div>

      {/* Meals / Snacks Toggle */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1">
        <button
          onClick={() => setShowSnacks(false)}
          className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
            !showSnacks ? 'bg-accent-teal text-white' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Meals
        </button>
        <button
          onClick={() => setShowSnacks(true)}
          className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
            showSnacks ? 'bg-accent-teal text-white' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Snacks
        </button>
      </div>

      {/* Content */}
      {!showSnacks ? (
        <div className="space-y-2">
          {mealTimes.map((mt) => (
            <MealCard
              key={mt}
              mealTime={mt}
              meal={dayMeals[mt]}
              eaten={!!eaten[`${selectedDay}-${mt}`]}
              onToggle={() => toggleEaten(mt)}
            />
          ))}
        </div>
      ) : (
        <SnackGrid />
      )}
    </div>
  );
}
