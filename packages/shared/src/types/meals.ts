export type MealTime = 'breakfast' | 'midMorning' | 'lunch' | 'preWorkout' | 'postWorkout' | 'dinner';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type MealSource = 'homeCooking' | 'campusEatery' | 'restaurant';

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  items: string[];
  prepNotes?: string;
  source: MealSource;
}

export interface DayMealPlan {
  breakfast: Meal;
  midMorning: Meal;
  lunch: Meal;
  preWorkout: Meal;
  postWorkout: Meal;
  dinner: Meal;
}

export interface MealLog {
  mealTime: MealTime;
  eaten: boolean;
  actualMeal?: string;
  actualCalories?: number;
  actualProtein?: number;
}

export interface DailyMealLog {
  date: string;
  meals: Record<MealTime, MealLog>;
  totalCalories: number;
  totalProtein: number;
}

export interface Snack {
  name: string;
  calories: number;
  protein?: number;
  category: 'campusVendor' | 'homeStash' | 'fruit';
  when: string;
  why: string;
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: 'indian' | 'continental' | 'mexican' | 'thai' | 'mediterranean';
  calories: number;
  protein: number;
  cookTime: number;
  ingredients: string[];
  steps: string[];
  isBeginnerFriendly: boolean;
}
