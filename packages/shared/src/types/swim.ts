export type SwimStroke = 'freestyle' | 'breaststroke' | 'backstroke' | 'kickboard' | 'wall-breathing' | 'kickboard-flutter' | 'arm-pull-standing' | 'combined-movement' | 'full-lap-attempt' | 'endurance-swim';

export interface SwimSegment {
  stroke: SwimStroke;
  laps: number;
  pace: 'easy' | 'moderate' | 'hard';
  notes?: string;
  videoUrl?: string;
}

export interface SwimSessionPlan {
  week: number;
  warmup: SwimSegment[];
  mainSet: SwimSegment[];
  cooldown: SwimSegment[];
  totalLaps: number;
  breathControlTip: string;
}

export interface SwimLog {
  date: string;
  laps: number;
  duration: number;
  notes: string;
  breathControlRating: number;
}
