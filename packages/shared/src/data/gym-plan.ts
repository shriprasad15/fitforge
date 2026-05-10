import { GymPhase, GymDayPlan, Exercise, GymDay } from '../types';

// --- Phase 1: Build the Engine (Week 1-2) ---

const phase1Monday: GymDayPlan = {
  name: 'Push — Chest, Shoulders, Triceps',
  exercises: [
    {
      id: 'p1-mon-1',
      name: 'Incline Dumbbell Press',
      sets: 4,
      reps: '10-12',
      startWeight: '16-18 kg each',
      rest: '75s',
      cue: '30-45° bench, lower slow (3 sec), press explosive',
    },
    {
      id: 'p1-mon-2',
      name: 'Lateral Raise',
      sets: 4,
      reps: '12-15',
      startWeight: '7-8 kg each',
      rest: '60s',
      cue: 'No swing. 1-sec pause at top. Feel the side delt burn.',
      isPriority: true,
    },
    {
      id: 'p1-mon-3',
      name: 'Seated Dumbbell Overhead Press',
      sets: 4,
      reps: '10',
      startWeight: '14 kg each',
      rest: '75s',
      cue: 'Full lockout, don\'t arch lower back',
    },
    {
      id: 'p1-mon-4',
      name: 'Cable Front Raise',
      sets: 3,
      reps: '12',
      startWeight: '10 kg',
      rest: '60s',
      cue: 'Targets anterior delt — shoulder roundness',
    },
    {
      id: 'p1-mon-5',
      name: 'Push-ups',
      sets: 3,
      reps: 'max',
      startWeight: 'Bodyweight',
      rest: '60s',
      cue: 'Floor push-ups, full range, track number daily',
    },
    {
      id: 'p1-mon-6',
      name: 'Cable Tricep Pushdown (rope)',
      sets: 3,
      reps: '12',
      startWeight: '17-20 kg',
      rest: '60s',
      cue: 'Elbows pinned, full extension, squeeze at bottom',
    },
    {
      id: 'p1-mon-7',
      name: 'Overhead Tricep Extension (DB)',
      sets: 3,
      reps: '10',
      startWeight: '14-16 kg single',
      rest: '60s',
      cue: 'Long head, lower behind head, feel the stretch',
    },
  ],
  postGym: 'HIIT at Manohar C Watsa Stadium',
};

const phase1Tuesday: GymDayPlan = {
  name: 'Pull — Back, Biceps, Core',
  exercises: [
    {
      id: 'p1-tue-1',
      name: 'Lat Pulldown (wide grip)',
      sets: 4,
      reps: '10',
      startWeight: '47-52 kg',
      rest: '75s',
      cue: 'Bar to upper chest, lean 10° back, feel lats stretch at top',
    },
    {
      id: 'p1-tue-2',
      name: 'Seated Cable Row',
      sets: 4,
      reps: '10',
      startWeight: '42 kg',
      rest: '75s',
      cue: 'Pull to lower chest, hard shoulder blade squeeze',
    },
    {
      id: 'p1-tue-3',
      name: 'Single-Arm Dumbbell Row',
      sets: 3,
      reps: '12 each',
      startWeight: '18 kg',
      rest: '60s',
      cue: 'Elbow tracks back, not flared — full range',
    },
    {
      id: 'p1-tue-4',
      name: 'Dumbbell Bicep Curl',
      sets: 4,
      reps: '10-12',
      startWeight: '11-12 kg each',
      rest: '60s',
      cue: '3-sec lowering phase every rep. This is where the peak builds.',
      isPriority: true,
    },
    {
      id: 'p1-tue-5',
      name: 'Hammer Curl',
      sets: 3,
      reps: '10',
      startWeight: '11 kg each',
      rest: '60s',
      cue: 'Neutral grip. Builds brachialis which pushes bicep peak visually higher',
      isPriority: true,
    },
    {
      id: 'p1-tue-6',
      name: 'Negative Pull-ups',
      sets: 3,
      reps: '5',
      startWeight: 'Bodyweight',
      rest: '90s',
      cue: 'Jump to top, lower in 6-7 sec. Or use assisted machine at -30 kg',
    },
    {
      id: 'p1-tue-7',
      name: 'Plank',
      sets: 3,
      reps: '45 sec',
      startWeight: 'Bodyweight',
      rest: '30s',
      cue: 'Straight line, no sagging hips',
    },
    {
      id: 'p1-tue-8',
      name: 'Hanging Knee Raises',
      sets: 3,
      reps: '12',
      startWeight: 'Bodyweight',
      rest: '45s',
      cue: 'Pull knees to chest, lower controlled',
    },
  ],
  postGym: 'Swim 6-7 PM',
};

const phase1Wednesday: GymDayPlan = {
  name: 'Legs + Abs',
  exercises: [
    {
      id: 'p1-wed-1',
      name: 'Goblet Squat',
      sets: 4,
      reps: '12',
      startWeight: '20 kg',
      rest: '90s',
      cue: 'Thighs parallel or below, chest up, heels on ground',
    },
    {
      id: 'p1-wed-2',
      name: 'Leg Press',
      sets: 4,
      reps: '15',
      startWeight: '70-80 kg',
      rest: '90s',
      cue: 'Feet shoulder-width, don\'t lock knees at top',
    },
    {
      id: 'p1-wed-3',
      name: 'Romanian Deadlift (DB)',
      sets: 3,
      reps: '12',
      startWeight: '16 kg each',
      rest: '90s',
      cue: 'Hinge at hips, feel hamstring stretch, neutral spine',
    },
    {
      id: 'p1-wed-4',
      name: 'Walking Lunges',
      sets: 3,
      reps: '12 each leg',
      startWeight: 'Bodyweight',
      rest: '75s',
      cue: 'Long stride, back knee near floor',
    },
    {
      id: 'p1-wed-5',
      name: 'Calf Raises',
      sets: 4,
      reps: '20',
      startWeight: '+20 kg',
      rest: '45s',
      cue: 'Full range: all the way up, all the way down',
    },
    {
      id: 'p1-wed-6',
      name: 'Crunches',
      sets: 3,
      reps: '20',
      startWeight: 'BW',
      rest: '0s',
      cue: 'Ab circuit — no rest between ab exercises',
    },
    {
      id: 'p1-wed-7',
      name: 'Leg Raises',
      sets: 3,
      reps: '15',
      startWeight: 'BW',
      rest: '0s',
      cue: 'Keep lower back pressed to floor',
    },
    {
      id: 'p1-wed-8',
      name: 'Bicycle Crunches',
      sets: 3,
      reps: '20',
      startWeight: 'BW',
      rest: '0s',
      cue: 'Controlled rotation, elbow to opposite knee',
    },
    {
      id: 'p1-wed-9',
      name: 'Plank',
      sets: 3,
      reps: '40 sec',
      startWeight: 'BW',
      rest: '60s',
      cue: '60s rest between rounds of the ab circuit',
    },
  ],
  postGym: 'Swim 6-7 PM',
};

const phase1Thursday: GymDayPlan = {
  name: 'Push — Shoulder-Dominant',
  exercises: [
    {
      id: 'p1-thu-1',
      name: 'Arnold Press',
      sets: 4,
      reps: '10',
      startWeight: '12-14 kg each',
      rest: '75s',
      cue: 'Best shoulder exercise for full head development. Rotate from facing you to facing forward as you press.',
      isPriority: true,
    },
    {
      id: 'p1-thu-2',
      name: 'Lateral Raise (heavy)',
      sets: 4,
      reps: '10',
      startWeight: '9-10 kg each',
      rest: '60s',
      cue: 'Same strict form, slightly heavier than Monday',
      isPriority: true,
    },
    {
      id: 'p1-thu-3',
      name: 'Rear Delt Fly',
      sets: 4,
      reps: '12',
      startWeight: '8 kg each',
      rest: '60s',
      cue: 'Bent over, arms wide, squeeze rear delt at top — 3D shoulder look',
    },
    {
      id: 'p1-thu-4',
      name: 'Flat Dumbbell Press',
      sets: 3,
      reps: '12',
      startWeight: '16-18 kg each',
      rest: '75s',
      cue: 'Full chest day complement',
    },
    {
      id: 'p1-thu-5',
      name: 'Push-ups',
      sets: 4,
      reps: 'max',
      startWeight: 'Bodyweight',
      rest: '60s',
      cue: 'Track number vs Monday — should be equal or more',
    },
    {
      id: 'p1-thu-6',
      name: 'Cable Overhead Tricep Extension',
      sets: 3,
      reps: '12',
      startWeight: '15 kg',
      rest: '60s',
      cue: 'Full stretch at bottom, squeeze at top',
    },
    {
      id: 'p1-thu-7',
      name: 'Tricep Dips',
      sets: 3,
      reps: 'max',
      startWeight: 'Bodyweight',
      rest: '60s',
      cue: 'Lean slightly forward for tricep focus',
    },
  ],
  postGym: 'Swim 6-7 PM',
};

const phase1Friday: GymDayPlan = {
  name: 'Pull — Heavy + Core Circuit',
  exercises: [
    {
      id: 'p1-fri-1',
      name: 'Lat Pulldown (wide + close)',
      sets: 4,
      reps: '10',
      startWeight: '50 kg',
      rest: '75s',
      cue: '2 sets wide (lat width) + 2 sets close (thickness)',
    },
    {
      id: 'p1-fri-2',
      name: 'Barbell Row',
      sets: 3,
      reps: '8',
      startWeight: '40 kg',
      rest: '90s',
      cue: 'Heaviest back movement of the week',
    },
    {
      id: 'p1-fri-3',
      name: 'Face Pull (cable)',
      sets: 3,
      reps: '15',
      startWeight: '15 kg',
      rest: '60s',
      cue: 'Pull to face level, elbows high — rear delt + rotator cuff health',
    },
    {
      id: 'p1-fri-4',
      name: 'Incline Dumbbell Curl',
      sets: 3,
      reps: '10',
      startWeight: '10 kg each',
      rest: '60s',
      cue: 'Lying back on incline, arms hang — maximum stretch on bicep. Peak builder.',
      isPriority: true,
    },
    {
      id: 'p1-fri-5',
      name: 'Concentration Curl',
      sets: 3,
      reps: '10 each',
      startWeight: '10-12 kg',
      rest: '45s',
      cue: 'Elbow on inner thigh. Full squeeze at top. Slow down.',
      isPriority: true,
    },
    {
      id: 'p1-fri-6',
      name: 'Negative Pull-ups',
      sets: 3,
      reps: '5',
      startWeight: 'Bodyweight',
      rest: '90s',
      cue: '1 sec slower than Tuesday — aim 7-8 sec descent',
    },
    {
      id: 'p1-fri-7',
      name: 'Hollow Hold',
      sets: 4,
      reps: '25 sec',
      startWeight: 'BW',
      rest: '0s',
      cue: 'Core circuit — 4 rounds',
    },
    {
      id: 'p1-fri-8',
      name: 'Dead Bug',
      sets: 4,
      reps: '10',
      startWeight: 'BW',
      rest: '0s',
      cue: 'Opposite arm and leg extend, lower back stays flat',
    },
    {
      id: 'p1-fri-9',
      name: 'Side Plank',
      sets: 4,
      reps: '25 sec each',
      startWeight: 'BW',
      rest: '0s',
      cue: 'Stack hips, straight line from head to feet',
    },
    {
      id: 'p1-fri-10',
      name: 'Hanging Knee Raises',
      sets: 4,
      reps: '12',
      startWeight: 'BW',
      rest: '60s',
      cue: '60s rest between rounds of core circuit',
    },
  ],
  postGym: 'Swim 6-7 PM',
};

export const phase1: GymPhase = {
  label: 'Phase 1: Build the Engine',
  startDate: '2026-05-12',
  endDate: '2026-05-25',
  days: {
    monday: phase1Monday,
    tuesday: phase1Tuesday,
    wednesday: phase1Wednesday,
    thursday: phase1Thursday,
    friday: phase1Friday,
  },
};

// --- Phase 2: Intensity Surge (Week 3-4) ---

function bumpWeight(weight: string, dbBump: number, machineBump: number, isMachine: boolean): string {
  if (weight === 'Bodyweight' || weight === 'BW') return weight;
  const bump = isMachine ? machineBump : dbBump;
  const match = weight.match(/^(\d+(?:-\d+)?)\s*kg/);
  if (!match) return weight;
  const parts = match[1].split('-');
  const bumped = parts.map(p => String(Number(p) + bump)).join('-');
  return weight.replace(match[0], `${bumped} kg`);
}

function makePhase2Exercise(ex: Exercise, idPrefix: string, index: number): Exercise {
  const isMachine = ex.name.toLowerCase().includes('cable') ||
    ex.name.toLowerCase().includes('lat pulldown') ||
    ex.name.toLowerCase().includes('seated cable') ||
    ex.name.toLowerCase().includes('leg press');

  return {
    ...ex,
    id: `${idPrefix}-${index + 1}`,
    startWeight: bumpWeight(ex.startWeight, 2, 5, isMachine),
  };
}

const phase2Monday: GymDayPlan = {
  name: phase1Monday.name,
  exercises: phase1Monday.exercises.map((ex, i) => {
    const updated = makePhase2Exercise(ex, 'p2-mon', i);
    if (ex.name === 'Push-ups') {
      return { ...updated, sets: 5 };
    }
    return updated;
  }),
  postGym: phase1Monday.postGym,
};

const phase2Tuesday: GymDayPlan = {
  name: phase1Tuesday.name,
  exercises: phase1Tuesday.exercises.map((ex, i) => {
    const updated = makePhase2Exercise(ex, 'p2-tue', i);
    if (ex.name === 'Dumbbell Bicep Curl') {
      return { ...updated, isSuperset: true, supersetWith: 'Hammer Curl' };
    }
    if (ex.name === 'Hammer Curl') {
      return { ...updated, isSuperset: true, supersetWith: 'Dumbbell Bicep Curl' };
    }
    return updated;
  }),
  postGym: phase1Tuesday.postGym,
};

const phase2Wednesday: GymDayPlan = {
  name: phase1Wednesday.name,
  exercises: phase1Wednesday.exercises.map((ex, i) => makePhase2Exercise(ex, 'p2-wed', i)),
  postGym: phase1Wednesday.postGym,
};

const phase2Thursday: GymDayPlan = {
  name: phase1Thursday.name,
  exercises: [
    ...phase1Thursday.exercises
      .filter(ex => ex.name !== 'Lateral Raise (heavy)')
      .map((ex, i) => {
        const updated = makePhase2Exercise(ex, 'p2-thu', i);
        if (ex.name === 'Push-ups') {
          return { ...updated, sets: 5 };
        }
        return updated;
      }),
    {
      id: 'p2-thu-8',
      name: 'Cable Lateral Raise',
      sets: 4,
      reps: '12',
      startWeight: '7-8 kg',
      rest: '60s',
      cue: 'Superset with Rear Delt Fly — constant tension from cable',
      isPriority: true,
      isSuperset: true,
      supersetWith: 'Rear Delt Fly',
    },
    {
      id: 'p2-thu-9',
      name: 'Chest Dip',
      sets: 3,
      reps: '8-10',
      startWeight: 'Bodyweight',
      rest: '75s',
      cue: 'Lean forward for chest activation, full depth',
    },
  ],
  postGym: phase1Thursday.postGym,
};

const phase2Friday: GymDayPlan = {
  name: phase1Friday.name,
  exercises: phase1Friday.exercises.map((ex, i) => {
    if (ex.name === 'Concentration Curl') {
      return {
        id: 'p2-fri-5',
        name: 'Spider Curl',
        sets: 3,
        reps: '10',
        startWeight: '10-12 kg each',
        rest: '45s',
        cue: 'Chest on incline bench, arms hang. Pure bicep isolation — no momentum possible.',
        isPriority: true,
      };
    }
    const updated = makePhase2Exercise(ex, 'p2-fri', i);
    if (ex.name === 'Incline Dumbbell Curl') {
      return { ...updated, isSuperset: true, supersetWith: 'Spider Curl' };
    }
    return updated;
  }),
  postGym: phase1Friday.postGym,
};

export const phase2: GymPhase = {
  label: 'Phase 2: Intensity Surge',
  startDate: '2026-05-26',
  endDate: '2026-06-08',
  days: {
    monday: phase2Monday,
    tuesday: phase2Tuesday,
    wednesday: phase2Wednesday,
    thursday: phase2Thursday,
    friday: phase2Friday,
  },
};

// --- Phase 3: Peak & Taper (Final Week) ---

function makePhase3Exercise(ex: Exercise, idPrefix: string, index: number): Exercise {
  return {
    ...ex,
    id: `${idPrefix}-${index + 1}`,
    sets: ex.name === 'Push-ups' ? ex.sets : 3,
    reps: ex.name === 'Push-ups' ? 'max' : '8-10',
    rest: '90-120s',
  };
}

function makePhase3Day(day: GymDayPlan, dayKey: string): GymDayPlan {
  return {
    name: day.name,
    exercises: day.exercises.map((ex, i) => makePhase3Exercise(ex, `p3-${dayKey}`, i)),
    postGym: day.postGym,
  };
}

export const phase3: GymPhase = {
  label: 'Phase 3: Peak & Taper',
  startDate: '2026-06-09',
  endDate: '2026-06-15',
  days: {
    monday: makePhase3Day(phase2Monday, 'mon'),
    tuesday: makePhase3Day(phase2Tuesday, 'tue'),
    wednesday: makePhase3Day(phase2Wednesday, 'wed'),
    thursday: makePhase3Day(phase2Thursday, 'thu'),
    friday: makePhase3Day(phase2Friday, 'fri'),
  },
};

// --- Export ---

export const gymPlan: Record<string, GymPhase> = {
  phase1,
  phase2,
  phase3,
};
