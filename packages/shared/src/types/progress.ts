export interface WeighIn {
  date: string;
  weight: number;
  waistCm: number;
  armCm: number;
}

export interface PushUpLog {
  date: string;
  count: number;
}

export interface PullUpLog {
  date: string;
  count: number;
  type: 'negative' | 'assisted' | 'full';
  holdSeconds?: number;
}

export interface SessionEntry {
  date: string;
  activities: ('gym' | 'swim' | 'hiit' | 'walk')[];
}

export interface ProgressData {
  weeklyWeighIns: WeighIn[];
  pushUpLog: PushUpLog[];
  pullUpLog: PullUpLog[];
  sessionLog: SessionEntry[];
}
