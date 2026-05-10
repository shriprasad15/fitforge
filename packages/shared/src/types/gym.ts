export type Phase = 'phase1' | 'phase2' | 'phase3';
export type GymDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  startWeight: string;
  rest: string;
  cue: string;
  isSuperset?: boolean;
  supersetWith?: string;
  isPriority?: boolean;
  imageUrl?: string;
  videoUrl?: string;
}

export interface GymDayPlan {
  name: string;
  exercises: Exercise[];
  postGym?: string;
}

export interface GymPhase {
  label: string;
  startDate: string;
  endDate: string;
  days: Record<GymDay, GymDayPlan>;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
  completed: boolean;
}

export interface SetLog {
  reps: number;
  weight: number;
  completed: boolean;
}

export interface GymSession {
  date: string;
  phase: Phase;
  day: GymDay;
  exercises: ExerciseLog[];
  startTime?: string;
  endTime?: string;
}
