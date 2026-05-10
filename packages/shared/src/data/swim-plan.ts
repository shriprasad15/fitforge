import { SwimSessionPlan } from '../types';

export const swimPlan: SwimSessionPlan[] = [
  {
    week: 1,
    warmup: [
      { stroke: 'kickboard', laps: 2, pace: 'easy', notes: 'Gentle kick, focus on breathing rhythm' },
    ],
    mainSet: [
      { stroke: 'breaststroke', laps: 4, pace: 'easy', notes: 'Long glides, exhale underwater' },
      { stroke: 'freestyle', laps: 2, pace: 'moderate', notes: 'Max 2 continuous laps — rest between if needed' },
      { stroke: 'kickboard', laps: 4, pace: 'moderate', notes: 'Build kick strength' },
      { stroke: 'breaststroke', laps: 4, pace: 'easy', notes: 'Focus on timing: pull → breathe → kick → glide' },
    ],
    cooldown: [
      { stroke: 'breaststroke', laps: 2, pace: 'easy', notes: 'Very relaxed, stretch out' },
    ],
    totalLaps: 18,
    breathControlTip: 'First 5 min: standing breathing drill — inhale above water, face in water and exhale bubbles for 5 sec. Repeat 10 times before starting laps.',
  },
  {
    week: 2,
    warmup: [
      { stroke: 'kickboard', laps: 2, pace: 'easy', notes: 'Streamlined position, face in water' },
    ],
    mainSet: [
      { stroke: 'breaststroke', laps: 4, pace: 'easy', notes: 'Rhythm focus — consistent pace' },
      { stroke: 'freestyle', laps: 3, pace: 'moderate', notes: 'Aim for 3 strokes per breath' },
      { stroke: 'kickboard', laps: 5, pace: 'moderate', notes: 'Alternate flutter and dolphin kick' },
      { stroke: 'breaststroke', laps: 2, pace: 'easy', notes: 'Recovery set' },
    ],
    cooldown: [
      { stroke: 'breaststroke', laps: 2, pace: 'easy', notes: 'Slow and relaxed' },
    ],
    totalLaps: 18,
    breathControlTip: 'Count 3 strokes per breath in freestyle. If gasping, go back to 2 strokes per breath and rebuild.',
  },
  {
    week: 3,
    warmup: [
      { stroke: 'kickboard', laps: 2, pace: 'easy', notes: 'Warm up legs' },
      { stroke: 'breaststroke', laps: 2, pace: 'easy', notes: 'Loosen shoulders' },
    ],
    mainSet: [
      { stroke: 'freestyle', laps: 5, pace: 'hard', notes: 'Interval: 1 lap hard / 30 sec rest x 5' },
      { stroke: 'breaststroke', laps: 4, pace: 'moderate', notes: 'Active recovery' },
      { stroke: 'kickboard', laps: 4, pace: 'moderate', notes: 'Legs-only endurance' },
      { stroke: 'freestyle', laps: 3, pace: 'moderate', notes: 'Continuous — practice bilateral breathing' },
    ],
    cooldown: [
      { stroke: 'breaststroke', laps: 2, pace: 'easy', notes: 'Cool down, long glides' },
    ],
    totalLaps: 22,
    breathControlTip: 'Introduce bilateral breathing — breathe every 3rd stroke (alternating sides). Awkward at first but builds symmetry and lung capacity.',
  },
  {
    week: 4,
    warmup: [
      { stroke: 'kickboard', laps: 2, pace: 'easy', notes: 'Dynamic warm-up kicks' },
      { stroke: 'freestyle', laps: 2, pace: 'easy', notes: 'Easy freestyle to get into rhythm' },
    ],
    mainSet: [
      { stroke: 'freestyle', laps: 7, pace: 'hard', notes: 'Interval: 1 lap hard / 25 sec rest x 7' },
      { stroke: 'breaststroke', laps: 4, pace: 'moderate', notes: 'Active recovery between sets' },
      { stroke: 'kickboard', laps: 3, pace: 'moderate', notes: 'Sprint kicks — build power' },
      { stroke: 'freestyle', laps: 2, pace: 'moderate', notes: 'Continuous steady pace' },
    ],
    cooldown: [
      { stroke: 'breaststroke', laps: 2, pace: 'easy', notes: 'Full relaxation' },
      { stroke: 'backstroke', laps: 2, pace: 'easy', notes: 'Open up chest, relax neck' },
    ],
    totalLaps: 24,
    breathControlTip: 'Bilateral breathing should feel natural now. Focus on exhaling completely underwater — the inhale happens automatically when you rotate.',
  },
  {
    week: 5,
    warmup: [
      { stroke: 'kickboard', laps: 2, pace: 'easy', notes: 'Light warm-up' },
    ],
    mainSet: [
      { stroke: 'freestyle', laps: 4, pace: 'easy', notes: 'Form focus — high elbow catch, full rotation' },
      { stroke: 'breaststroke', laps: 4, pace: 'easy', notes: 'Smooth and efficient' },
      { stroke: 'backstroke', laps: 2, pace: 'easy', notes: 'Recovery stroke — open breathing' },
      { stroke: 'kickboard', laps: 2, pace: 'easy', notes: 'Light kicks, relax' },
    ],
    cooldown: [
      { stroke: 'breaststroke', laps: 2, pace: 'easy', notes: 'Gentle finish' },
    ],
    totalLaps: 16,
    breathControlTip: 'Final week: easy pace, consolidate gains. Focus on smooth, effortless breathing patterns. Form over speed — lock in technique for the long term.',
  },
];
