export type HIITOption = 'trackSprints' | 'seatingCircuit';

export interface HIITInterval {
  name: string;
  duration: number;
  type: 'work' | 'rest';
}

export interface HIITProtocol {
  option: HIITOption;
  label: string;
  warmup: number;
  intervals: HIITInterval[];
  cooldown: number;
  roundsPerWeek: Record<number, number>;
}

export interface HIITSession {
  date: string;
  option: HIITOption;
  roundsCompleted: number;
  totalDuration: number;
}

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';
