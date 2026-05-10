import { SwimSessionPlan } from '../types';

export const swimPlan: SwimSessionPlan[] = [
  {
    week: 1,
    warmup: [
      {
        stroke: 'wall-breathing',
        laps: 0,
        pace: 'easy',
        notes: 'Stand in shallow end, hold wall. Face in water, blow bubbles for 5 sec. Lift head, inhale. Repeat 15 times.',
        videoUrl: 'https://www.youtube.com/watch?v=pHCmtJknJHE',
      },
    ],
    mainSet: [
      {
        stroke: 'wall-breathing',
        laps: 0,
        pace: 'easy',
        notes: 'Bob up and down — submerge fully, exhale underwater, surface and inhale. 20 reps x 3 sets.',
        videoUrl: 'https://www.youtube.com/watch?v=pHCmtJknJHE',
      },
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'easy',
        notes: 'Hold kickboard with arms extended. Flutter kick gently. Face OUT of water — just get used to kicking.',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'easy',
        notes: 'Same kickboard drill but try putting face IN water between breaths (exhale into water, lift to inhale).',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
    ],
    cooldown: [
      {
        stroke: 'wall-breathing',
        laps: 0,
        pace: 'easy',
        notes: 'Relaxed bobs — 10 reps, focus on calm exhale underwater',
        videoUrl: 'https://www.youtube.com/watch?v=pHCmtJknJHE',
      },
    ],
    totalLaps: 4,
    breathControlTip: 'This week is ONLY about getting comfortable with water on your face and basic kicking. Do NOT attempt full strokes. Spend at least 5 min on wall breathing drills before kickboard work.',
  },
  {
    week: 2,
    warmup: [
      {
        stroke: 'wall-breathing',
        laps: 0,
        pace: 'easy',
        notes: 'Breathing bobs — 15 reps. Then face-in flutter kick holding wall (no kickboard) for 30 sec x 3.',
        videoUrl: 'https://www.youtube.com/watch?v=pHCmtJknJHE',
      },
    ],
    mainSet: [
      {
        stroke: 'kickboard-flutter',
        laps: 4,
        pace: 'easy',
        notes: 'Kickboard with face in water. Exhale underwater, turn head to side to breathe every 4-5 kicks.',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
      {
        stroke: 'arm-pull-standing',
        laps: 0,
        pace: 'easy',
        notes: 'Stand in shallow end, bend forward. Practice arm pull: reach forward, pull water back to hip, recover over water. 20 reps each arm.',
        videoUrl: 'https://www.youtube.com/watch?v=gh557bAMbas',
      },
      {
        stroke: 'arm-pull-standing',
        laps: 0,
        pace: 'easy',
        notes: 'Same arm drill but add face in water. Pull with one arm, rotate head to that side to breathe. 15 reps each side.',
        videoUrl: 'https://www.youtube.com/watch?v=gh557bAMbas',
      },
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'moderate',
        notes: 'Slightly faster kicks, maintain breathing rhythm — exhale underwater, inhale when turning head.',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
    ],
    cooldown: [
      {
        stroke: 'wall-breathing',
        laps: 0,
        pace: 'easy',
        notes: 'Gentle bobs and relaxed floating on back (hold wall if needed) — 3 min',
      },
    ],
    totalLaps: 6,
    breathControlTip: 'Focus on rhythmic breathing during kicks. The arm pull standing drill teaches you the motion without worrying about staying afloat. Keep it relaxed — panic = bad breathing.',
  },
  {
    week: 3,
    warmup: [
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'easy',
        notes: 'Warm-up kicks with face in water, rhythmic breathing',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
    ],
    mainSet: [
      {
        stroke: 'combined-movement',
        laps: 1,
        pace: 'easy',
        notes: 'Attempt kick + one arm pull together. Use other arm on kickboard for support. Breathe to pulling-arm side. 1 lap, rest 30 sec.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
      {
        stroke: 'combined-movement',
        laps: 1,
        pace: 'easy',
        notes: 'Switch arms — other arm pulls while first holds kickboard. 1 lap, rest 30 sec.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
      {
        stroke: 'combined-movement',
        laps: 2,
        pace: 'easy',
        notes: 'Try both arms alternating (no kickboard) with continuous flutter kick. Stop and stand if needed. Short bursts of 5-10 meters.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
      {
        stroke: 'kickboard-flutter',
        laps: 4,
        pace: 'moderate',
        notes: 'Recovery — back to kickboard, strong kicks, steady breathing',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
    ],
    cooldown: [
      {
        stroke: 'wall-breathing',
        laps: 0,
        pace: 'easy',
        notes: 'Relaxed floating and gentle bobs — 3 min',
      },
    ],
    totalLaps: 10,
    breathControlTip: 'This is the hardest week — combining kick + arms + breathing is overwhelming at first. It is OK to stop, stand, and restart. Focus on exhaling underwater continuously (not holding breath).',
  },
  {
    week: 4,
    warmup: [
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'easy',
        notes: 'Warm-up kicks, establish breathing rhythm',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
    ],
    mainSet: [
      {
        stroke: 'full-lap-attempt',
        laps: 1,
        pace: 'easy',
        notes: 'Full lap attempt — kick + both arms + side breathing. Aim to complete without stopping. Rest 45 sec after.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
      {
        stroke: 'full-lap-attempt',
        laps: 1,
        pace: 'easy',
        notes: 'Second full lap attempt. Focus on slow, relaxed strokes. Speed does NOT matter — continuous movement does.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'moderate',
        notes: 'Active recovery on kickboard',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
      {
        stroke: 'full-lap-attempt',
        laps: 2,
        pace: 'easy',
        notes: 'Two more full laps. Rest 30-45 sec between each. Count strokes per lap to track efficiency.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
      {
        stroke: 'full-lap-attempt',
        laps: 2,
        pace: 'moderate',
        notes: 'Final set — try to do 2 continuous laps without stopping. If you must stop, stand briefly and continue.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
    ],
    cooldown: [
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'easy',
        notes: 'Easy cool-down kicks, relax legs',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
    ],
    totalLaps: 12,
    breathControlTip: 'You are now swimming! It will feel messy and inefficient — that is normal. Key: exhale constantly underwater through nose/mouth, inhale quickly when you rotate. Never hold your breath.',
  },
  {
    week: 5,
    warmup: [
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'easy',
        notes: 'Light warm-up kicks',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
    ],
    mainSet: [
      {
        stroke: 'endurance-swim',
        laps: 4,
        pace: 'easy',
        notes: 'Continuous swimming — 4 laps without stopping. Very slow pace is fine. Focus on rhythm: kick-pull-breathe-kick-pull-breathe.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
      {
        stroke: 'kickboard-flutter',
        laps: 2,
        pace: 'moderate',
        notes: 'Active recovery — fast kicks to build leg stamina',
        videoUrl: 'https://www.youtube.com/watch?v=pFMh2FMwMBY',
      },
      {
        stroke: 'endurance-swim',
        laps: 4,
        pace: 'easy',
        notes: 'Another 4-lap set. Try to reduce stroke count per lap (fewer strokes = more efficient).',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
      {
        stroke: 'endurance-swim',
        laps: 4,
        pace: 'moderate',
        notes: 'Final set — slightly faster pace. Maintain breathing pattern even when tired.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
    ],
    cooldown: [
      {
        stroke: 'endurance-swim',
        laps: 2,
        pace: 'easy',
        notes: 'Very slow, relaxed swimming. Focus on gliding between strokes.',
        videoUrl: 'https://www.youtube.com/watch?v=JKLfjJf3Qvc',
      },
    ],
    totalLaps: 18,
    breathControlTip: 'Consolidation week — you can now swim continuously. Focus on efficiency: long strokes, strong kicks, and relaxed breathing. Build from here by adding 2 laps per week.',
  },
];
