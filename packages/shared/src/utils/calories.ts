import { MealLog, MealTime } from '../types';

export const DAILY_CALORIE_TARGET = 1900;
export const DAILY_PROTEIN_TARGET = 135;
export const DAILY_CARB_TARGET = 165;
export const DAILY_FAT_TARGET = 55;

export function calculateDailyTotals(meals: Record<MealTime, MealLog>): { calories: number; protein: number } {
  let calories = 0;
  let protein = 0;
  for (const meal of Object.values(meals)) {
    if (meal.eaten) {
      calories += meal.actualCalories || 0;
      protein += meal.actualProtein || 0;
    }
  }
  return { calories, protein };
}

export function getCalorieStatus(consumed: number): 'under' | 'on-track' | 'over' {
  if (consumed < DAILY_CALORIE_TARGET - 200) return 'under';
  if (consumed > DAILY_CALORIE_TARGET + 100) return 'over';
  return 'on-track';
}

export function getProteinStatus(consumed: number): 'low' | 'on-track' | 'high' {
  if (consumed < DAILY_PROTEIN_TARGET - 20) return 'low';
  if (consumed > DAILY_PROTEIN_TARGET + 20) return 'high';
  return 'on-track';
}
