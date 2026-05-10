const IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

function searchUrl(exercise: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise + ' proper form how to')}`;
}

export const exerciseMedia: Record<string, { images: string[]; videoUrl: string }> = {
  'Incline Dumbbell Press': {
    images: [
      `${IMAGE_BASE}/Dumbbell_Incline_Bench_Press/0.jpg`,
      `${IMAGE_BASE}/Dumbbell_Incline_Bench_Press/1.jpg`,
    ],
    videoUrl: searchUrl('Incline Dumbbell Press'),
  },
  'Lateral Raise': {
    images: [
      `${IMAGE_BASE}/Side_Lateral_Raise/0.jpg`,
      `${IMAGE_BASE}/Side_Lateral_Raise/1.jpg`,
    ],
    videoUrl: searchUrl('Dumbbell Lateral Raise'),
  },
  'Seated Dumbbell Overhead Press': {
    images: [
      `${IMAGE_BASE}/Dumbbell_Shoulder_Press/0.jpg`,
      `${IMAGE_BASE}/Dumbbell_Shoulder_Press/1.jpg`,
    ],
    videoUrl: searchUrl('Seated Dumbbell Shoulder Press'),
  },
  'Cable Front Raise': {
    images: [
      `${IMAGE_BASE}/Front_Cable_Raise/0.jpg`,
      `${IMAGE_BASE}/Front_Cable_Raise/1.jpg`,
    ],
    videoUrl: searchUrl('Cable Front Raise'),
  },
  'Push-ups': {
    images: [
      `${IMAGE_BASE}/Pushups/0.jpg`,
      `${IMAGE_BASE}/Pushups/1.jpg`,
    ],
    videoUrl: searchUrl('Push ups perfect form'),
  },
  'Cable Tricep Pushdown (rope)': {
    images: [
      `${IMAGE_BASE}/Triceps_Pushdown_-_Rope_Attachment/0.jpg`,
      `${IMAGE_BASE}/Triceps_Pushdown_-_Rope_Attachment/1.jpg`,
    ],
    videoUrl: searchUrl('Rope Tricep Pushdown'),
  },
  'Overhead Tricep Extension (DB)': {
    images: [
      `${IMAGE_BASE}/Dumbbell_One-Arm_Triceps_Extension/0.jpg`,
      `${IMAGE_BASE}/Dumbbell_One-Arm_Triceps_Extension/1.jpg`,
    ],
    videoUrl: searchUrl('Overhead Dumbbell Tricep Extension'),
  },
  'Lat Pulldown (wide grip)': {
    images: [
      `${IMAGE_BASE}/Wide-Grip_Lat_Pulldown/0.jpg`,
      `${IMAGE_BASE}/Wide-Grip_Lat_Pulldown/1.jpg`,
    ],
    videoUrl: searchUrl('Wide Grip Lat Pulldown'),
  },
  'Seated Cable Row': {
    images: [
      `${IMAGE_BASE}/Seated_Cable_Rows/0.jpg`,
      `${IMAGE_BASE}/Seated_Cable_Rows/1.jpg`,
    ],
    videoUrl: searchUrl('Seated Cable Row'),
  },
  'Single-Arm Dumbbell Row': {
    images: [
      `${IMAGE_BASE}/One-Arm_Dumbbell_Row/0.jpg`,
      `${IMAGE_BASE}/One-Arm_Dumbbell_Row/1.jpg`,
    ],
    videoUrl: searchUrl('One Arm Dumbbell Row'),
  },
  'Dumbbell Bicep Curl': {
    images: [
      `${IMAGE_BASE}/Dumbbell_Bicep_Curl/0.jpg`,
      `${IMAGE_BASE}/Dumbbell_Bicep_Curl/1.jpg`,
    ],
    videoUrl: searchUrl('Dumbbell Bicep Curl'),
  },
  'Hammer Curl': {
    images: [
      `${IMAGE_BASE}/Hammer_Curls/0.jpg`,
      `${IMAGE_BASE}/Hammer_Curls/1.jpg`,
    ],
    videoUrl: searchUrl('Hammer Curl'),
  },
  'Negative Pull-ups': {
    images: [
      `${IMAGE_BASE}/Pullups/0.jpg`,
      `${IMAGE_BASE}/Pullups/1.jpg`,
    ],
    videoUrl: searchUrl('Negative Pull ups beginner'),
  },
  'Plank': {
    images: [
      `${IMAGE_BASE}/Plank/0.jpg`,
      `${IMAGE_BASE}/Plank/1.jpg`,
    ],
    videoUrl: searchUrl('Plank exercise proper form'),
  },
  'Hanging Knee Raises': {
    images: [
      `${IMAGE_BASE}/Hanging_Leg_Raise/0.jpg`,
      `${IMAGE_BASE}/Hanging_Leg_Raise/1.jpg`,
    ],
    videoUrl: searchUrl('Hanging Knee Raises'),
  },
  'Goblet Squat': {
    images: [
      `${IMAGE_BASE}/Goblet_Squat/0.jpg`,
      `${IMAGE_BASE}/Goblet_Squat/1.jpg`,
    ],
    videoUrl: searchUrl('Goblet Squat dumbbell'),
  },
  'Leg Press': {
    images: [
      `${IMAGE_BASE}/Leg_Press/0.jpg`,
      `${IMAGE_BASE}/Leg_Press/1.jpg`,
    ],
    videoUrl: searchUrl('Leg Press machine form'),
  },
  'Romanian Deadlift (DB)': {
    images: [
      `${IMAGE_BASE}/Romanian_Deadlift_With_Dumbbells/0.jpg`,
      `${IMAGE_BASE}/Romanian_Deadlift_With_Dumbbells/1.jpg`,
    ],
    videoUrl: searchUrl('Dumbbell Romanian Deadlift'),
  },
  'Walking Lunges': {
    images: [
      `${IMAGE_BASE}/Walking_Barbell_Lunge/0.jpg`,
      `${IMAGE_BASE}/Walking_Barbell_Lunge/1.jpg`,
    ],
    videoUrl: searchUrl('Walking Lunges'),
  },
  'Calf Raises': {
    images: [
      `${IMAGE_BASE}/Standing_Calf_Raises/0.jpg`,
      `${IMAGE_BASE}/Standing_Calf_Raises/1.jpg`,
    ],
    videoUrl: searchUrl('Standing Calf Raises'),
  },
  'Crunches': {
    images: [
      `${IMAGE_BASE}/Crunches/0.jpg`,
      `${IMAGE_BASE}/Crunches/1.jpg`,
    ],
    videoUrl: searchUrl('Crunches ab exercise'),
  },
  'Leg Raises': {
    images: [
      `${IMAGE_BASE}/Flat_Bench_Lying_Leg_Raise/0.jpg`,
      `${IMAGE_BASE}/Flat_Bench_Lying_Leg_Raise/1.jpg`,
    ],
    videoUrl: searchUrl('Lying Leg Raises'),
  },
  'Bicycle Crunches': {
    images: [
      `${IMAGE_BASE}/Air_Bike/0.jpg`,
      `${IMAGE_BASE}/Air_Bike/1.jpg`,
    ],
    videoUrl: searchUrl('Bicycle Crunches'),
  },
  'Arnold Press': {
    images: [
      `${IMAGE_BASE}/Arnold_Dumbbell_Press/0.jpg`,
      `${IMAGE_BASE}/Arnold_Dumbbell_Press/1.jpg`,
    ],
    videoUrl: searchUrl('Arnold Press dumbbell'),
  },
  'Rear Delt Fly': {
    images: [
      `${IMAGE_BASE}/Dumbbell_Rear_Delt_Row/0.jpg`,
      `${IMAGE_BASE}/Dumbbell_Rear_Delt_Row/1.jpg`,
    ],
    videoUrl: searchUrl('Rear Delt Fly dumbbell'),
  },
  'Flat Dumbbell Press': {
    images: [
      `${IMAGE_BASE}/Dumbbell_Bench_Press/0.jpg`,
      `${IMAGE_BASE}/Dumbbell_Bench_Press/1.jpg`,
    ],
    videoUrl: searchUrl('Flat Dumbbell Bench Press'),
  },
  'Cable Overhead Tricep Extension': {
    images: [],
    videoUrl: searchUrl('Cable Overhead Tricep Extension'),
  },
  'Tricep Dips': {
    images: [
      `${IMAGE_BASE}/Dips_-_Triceps_Version/0.jpg`,
      `${IMAGE_BASE}/Dips_-_Triceps_Version/1.jpg`,
    ],
    videoUrl: searchUrl('Tricep Dips'),
  },
  'Lat Pulldown (wide + close)': {
    images: [
      `${IMAGE_BASE}/Wide-Grip_Lat_Pulldown/0.jpg`,
      `${IMAGE_BASE}/Wide-Grip_Lat_Pulldown/1.jpg`,
    ],
    videoUrl: searchUrl('Wide Grip vs Close Grip Lat Pulldown'),
  },
  'Barbell Row': {
    images: [
      `${IMAGE_BASE}/Bent_Over_Barbell_Row/0.jpg`,
      `${IMAGE_BASE}/Bent_Over_Barbell_Row/1.jpg`,
    ],
    videoUrl: searchUrl('Bent Over Barbell Row'),
  },
  'Face Pull (cable)': {
    images: [],
    videoUrl: searchUrl('Cable Face Pull'),
  },
  'Incline Dumbbell Curl': {
    images: [
      `${IMAGE_BASE}/Incline_Dumbbell_Curl/0.jpg`,
      `${IMAGE_BASE}/Incline_Dumbbell_Curl/1.jpg`,
    ],
    videoUrl: searchUrl('Incline Dumbbell Curl'),
  },
  'Concentration Curl': {
    images: [
      `${IMAGE_BASE}/Concentration_Curls/0.jpg`,
      `${IMAGE_BASE}/Concentration_Curls/1.jpg`,
    ],
    videoUrl: searchUrl('Concentration Curl'),
  },
  'Hollow Hold': {
    images: [],
    videoUrl: searchUrl('Hollow Body Hold'),
  },
  'Dead Bug': {
    images: [],
    videoUrl: searchUrl('Dead Bug exercise'),
  },
  'Side Plank': {
    images: [],
    videoUrl: searchUrl('Side Plank exercise'),
  },
  'Spider Curl': {
    images: [],
    videoUrl: searchUrl('Spider Curl dumbbell'),
  },
  'Cable Lateral Raise': {
    images: [],
    videoUrl: searchUrl('Cable Lateral Raise one arm'),
  },
  'Chest Dip': {
    images: [
      `${IMAGE_BASE}/Dips_-_Chest_Version/0.jpg`,
      `${IMAGE_BASE}/Dips_-_Chest_Version/1.jpg`,
    ],
    videoUrl: searchUrl('Chest Dips leaning forward'),
  },
};
