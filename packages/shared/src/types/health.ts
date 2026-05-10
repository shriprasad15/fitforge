export interface SleepLog {
  date: string;
  bedTime: string;
  wakeTime: string;
  byElevenThirty: boolean;
  quality: 1 | 2 | 3 | 4 | 5;
}

export interface HydrationLog {
  date: string;
  glasses: number;
}

export interface SupplementLog {
  date: string;
  creatine: boolean;
  vitaminD: boolean;
  magnesium: boolean;
}

export interface SorenessEntry {
  bodyPart: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export interface DailyHealthLog {
  date: string;
  sleep: SleepLog;
  hydration: HydrationLog;
  supplements: SupplementLog;
  soreness: SorenessEntry[];
}
