export type BlockCategory = 'gym' | 'swim' | 'hiit' | 'work' | 'meal' | 'rest' | 'commute' | 'sleep';
export type DayType = 'gymHiit' | 'gymSwim' | 'activeRecovery' | 'fullRest';

export interface TimeBlock {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  category: BlockCategory;
  notes?: string;
}

export interface DaySchedule {
  dayType: DayType;
  blocks: TimeBlock[];
}
