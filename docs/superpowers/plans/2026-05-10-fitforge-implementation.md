# FitForge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cross-platform (web + iOS + Android) 32-day fitness tracker with real-time sync, HIIT timer, gym logging, meal planning, and progress visualization.

**Architecture:** pnpm monorepo with shared TypeScript package, Next.js 14 web app, Expo SDK 52 mobile app, Firebase (Auth + Firestore) for sync and persistence.

**Tech Stack:** Next.js 14, Expo 52, Firebase, TailwindCSS, NativeWind, Recharts, react-native-chart-kit, expo-av, Web Audio API, pnpm workspaces.

---

## File Map

```
fitforge/
├── package.json                          # Workspace root
├── pnpm-workspace.yaml                   # Workspace config
├── .gitignore
├── firebase/
│   ├── firebase.json                     # Firebase project config
│   └── firestore.rules                   # Security rules
├── packages/
│   └── shared/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts                  # Barrel export
│           ├── types/
│           │   ├── index.ts
│           │   ├── user.ts               # Profile, settings types
│           │   ├── gym.ts                # Exercise, session, phase types
│           │   ├── meals.ts              # Meal plan, snack, recipe types
│           │   ├── swim.ts               # Swim session, plan types
│           │   ├── hiit.ts               # HIIT timer, round types
│           │   ├── progress.ts           # Weight, measurements, logs
│           │   ├── schedule.ts           # Daily schedule, time block types
│           │   └── health.ts             # Sleep, hydration, supplements
│           ├── data/
│           │   ├── gym-plan.ts           # All 3 phases of exercises
│           │   ├── meal-plan.ts          # 7-day rotating meal plan
│           │   ├── swim-plan.ts          # Week-by-week swim sessions
│           │   ├── hiit-protocols.ts     # Option A + B protocols
│           │   ├── schedule-templates.ts # Day type templates
│           │   ├── snacks.ts             # Snack library data
│           │   ├── recipes.ts            # 8 recipe cards
│           │   ├── quotes.ts             # Motivational quotes
│           │   └── food-guide.ts         # Campus eatery + restaurant guide
│           ├── firebase/
│           │   ├── config.ts             # Firebase init (env vars)
│           │   ├── auth.ts               # Google sign-in helpers
│           │   └── firestore.ts          # CRUD helpers for each collection
│           └── utils/
│               ├── date.ts               # Phase calculation, countdown, day-of-week
│               ├── calories.ts           # Daily totals, macro calculations
│               └── overload.ts           # Progressive overload logic + warnings
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── postcss.config.js
│   │   ├── public/
│   │   │   └── sounds/
│   │   │       ├── beep.mp3              # Timer countdown beep
│   │   │       └── go.mp3               # Timer GO tone
│   │   ├── app/
│   │   │   ├── layout.tsx               # Root layout with providers
│   │   │   ├── page.tsx                 # Dashboard/home
│   │   │   ├── login/page.tsx           # Google sign-in page
│   │   │   ├── gym/page.tsx             # Gym plan + logging
│   │   │   ├── swim/page.tsx            # Swim plan + lap counter
│   │   │   ├── hiit/page.tsx            # HIIT timer
│   │   │   ├── meals/page.tsx           # Meal plan viewer
│   │   │   ├── recipes/page.tsx         # Recipe cards + API search
│   │   │   ├── progress/page.tsx        # Charts + heatmap
│   │   │   ├── schedule/page.tsx        # Daily schedule timeline
│   │   │   └── health/page.tsx          # Recovery + wellness
│   │   ├── components/
│   │   │   ├── providers.tsx            # Auth + Firestore context
│   │   │   ├── nav.tsx                  # Bottom nav (mobile) / sidebar (desktop)
│   │   │   ├── countdown-card.tsx       # Days remaining widget
│   │   │   ├── phase-badge.tsx          # Current phase indicator
│   │   │   ├── exercise-card.tsx        # Single exercise with logging
│   │   │   ├── exercise-logger.tsx      # Expandable set/rep/weight form
│   │   │   ├── meal-card.tsx            # Single meal display
│   │   │   ├── meal-source-toggle.tsx   # Home/Campus/Restaurant toggle
│   │   │   ├── snack-grid.tsx           # Filterable snack cards
│   │   │   ├── recipe-card.tsx          # Expandable recipe
│   │   │   ├── hiit-timer.tsx           # Interval timer with audio
│   │   │   ├── lap-counter.tsx          # Swim lap counter
│   │   │   ├── weight-chart.tsx         # Recharts line chart
│   │   │   ├── session-heatmap.tsx      # GitHub-style activity grid
│   │   │   ├── schedule-timeline.tsx    # Vertical time blocks
│   │   │   ├── hydration-tracker.tsx    # Glass icons
│   │   │   ├── sleep-logger.tsx         # Bedtime/wake input
│   │   │   ├── supplement-checklist.tsx  # Daily supplement checkboxes
│   │   │   ├── weather-widget.tsx       # Open-Meteo Chennai weather
│   │   │   └── quote-card.tsx           # Daily motivational quote
│   │   └── hooks/
│   │       ├── use-auth.ts             # Firebase auth state
│   │       ├── use-firestore.ts        # Generic doc/collection listener
│   │       ├── use-session.ts          # Today's session data
│   │       ├── use-progress.ts         # Progress data listener
│   │       └── use-daily-log.ts        # Today's meals/water/sleep
│   └── mobile/
│       ├── package.json
│       ├── app.json                     # Expo config
│       ├── tsconfig.json
│       ├── tailwind.config.ts           # NativeWind config
│       ├── babel.config.js
│       ├── assets/
│       │   └── sounds/
│       │       ├── beep.mp3
│       │       └── go.mp3
│       ├── app/
│       │   ├── _layout.tsx              # Root layout with tab navigator
│       │   ├── (auth)/
│       │   │   └── login.tsx            # Google sign-in screen
│       │   ├── (tabs)/
│       │   │   ├── _layout.tsx          # Tab bar config
│       │   │   ├── index.tsx            # Dashboard
│       │   │   ├── gym.tsx              # Gym plan + logging
│       │   │   ├── meals.tsx            # Meal plan
│       │   │   ├── progress.tsx         # Progress charts
│       │   │   └── more.tsx             # Swim, HIIT, Schedule, Health, Recipes
│       │   ├── swim.tsx                 # Swim plan screen
│       │   ├── hiit.tsx                 # HIIT timer screen
│       │   ├── schedule.tsx             # Daily schedule
│       │   ├── health.tsx               # Recovery + wellness
│       │   └── recipes.tsx              # Recipe browser
│       ├── components/
│       │   ├── providers.tsx
│       │   ├── countdown-card.tsx
│       │   ├── phase-badge.tsx
│       │   ├── exercise-card.tsx
│       │   ├── exercise-logger.tsx
│       │   ├── meal-card.tsx
│       │   ├── meal-source-toggle.tsx
│       │   ├── hiit-timer.tsx
│       │   ├── lap-counter.tsx
│       │   ├── weight-chart.tsx
│       │   ├── session-heatmap.tsx
│       │   ├── schedule-timeline.tsx
│       │   ├── hydration-tracker.tsx
│       │   └── weather-widget.tsx
│       └── hooks/
│           ├── use-auth.ts
│           ├── use-firestore.ts
│           ├── use-session.ts
│           ├── use-progress.ts
│           └── use-daily-log.ts
```

---

## Task 1: Monorepo Scaffold + Firebase Setup

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `.gitignore`
- Create: `packages/shared/package.json`, `packages/shared/tsconfig.json`
- Create: `apps/web/package.json`, `apps/web/next.config.js`, `apps/web/tsconfig.json`
- Create: `apps/web/tailwind.config.ts`, `apps/web/postcss.config.js`
- Create: `apps/mobile/package.json`, `apps/mobile/app.json`, `apps/mobile/tsconfig.json`
- Create: `apps/mobile/tailwind.config.ts`, `apps/mobile/babel.config.js`
- Create: `firebase/firebase.json`, `firebase/firestore.rules`

- [ ] **Step 1: Create workspace root**

```json
// package.json
{
  "name": "fitforge",
  "private": true,
  "scripts": {
    "web": "pnpm --filter @fitforge/web dev",
    "mobile": "pnpm --filter @fitforge/mobile start",
    "shared:build": "pnpm --filter @fitforge/shared build",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"
```

```gitignore
# .gitignore
node_modules/
.next/
.expo/
dist/
.env
.env.local
*.tsbuildinfo
.firebase/
```

- [ ] **Step 2: Create shared package**

```json
// packages/shared/package.json
{
  "name": "@fitforge/shared",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "firebase": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

```json
// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 3: Create Next.js web app scaffold**

```json
// apps/web/package.json
{
  "name": "@fitforge/web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "firebase": "^11.0.0",
    "recharts": "^2.12.0",
    "@fitforge/shared": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

```typescript
// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@fitforge/shared'],
};

module.exports = nextConfig;
```

```typescript
// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-card': '#1a1a2e',
        'bg-elevated': '#252540',
        'accent-coral': '#ff6b6b',
        'accent-teal': '#4ecdc4',
        'accent-gold': '#ffd93d',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0b0',
        'text-muted': '#6b6b7b',
        'success': '#6bcf7f',
        'danger': '#ff4757',
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

```javascript
// apps/web/postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

```json
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@fitforge/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create Expo mobile app scaffold**

```json
// apps/mobile/package.json
{
  "name": "@fitforge/mobile",
  "version": "0.0.1",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "ios": "expo run:ios",
    "android": "expo run:android",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "expo": "~52.0.0",
    "expo-router": "~4.0.0",
    "expo-av": "~14.0.0",
    "expo-haptics": "~13.0.0",
    "expo-auth-session": "~6.0.0",
    "expo-web-browser": "~13.0.0",
    "react": "18.3.1",
    "react-native": "0.76.0",
    "react-native-chart-kit": "^6.12.0",
    "react-native-svg": "^15.0.0",
    "react-native-reanimated": "~3.16.0",
    "react-native-gesture-handler": "~2.20.0",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.1.0",
    "nativewind": "^4.0.0",
    "firebase": "^11.0.0",
    "@fitforge/shared": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "tailwindcss": "^3.4.0"
  }
}
```

```json
// apps/mobile/app.json
{
  "expo": {
    "name": "FitForge",
    "slug": "fitforge",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "fitforge",
    "userInterfaceStyle": "dark",
    "platforms": ["ios", "android"],
    "ios": {
      "bundleIdentifier": "com.fitforge.app",
      "supportsTablet": true
    },
    "android": {
      "package": "com.fitforge.app",
      "adaptiveIcon": {
        "backgroundColor": "#0a0a0f"
      }
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

```typescript
// apps/mobile/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-card': '#1a1a2e',
        'bg-elevated': '#252540',
        'accent-coral': '#ff6b6b',
        'accent-teal': '#4ecdc4',
        'accent-gold': '#ffd93d',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0b0',
        'text-muted': '#6b6b7b',
        'success': '#6bcf7f',
        'danger': '#ff4757',
      },
    },
  },
  plugins: [],
};

export default config;
```

```javascript
// apps/mobile/babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

```json
// apps/mobile/tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"],
      "@fitforge/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

- [ ] **Step 5: Create Firebase config**

```json
// firebase/firebase.json
{
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

```
// firebase/firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

- [ ] **Step 6: Install dependencies and verify workspace**

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm install`
Expected: All packages installed, workspace links resolved.

Run: `pnpm --filter @fitforge/shared lint`
Expected: No errors (empty project passes).

- [ ] **Step 7: Initialize git and commit**

```bash
cd /Users/shriprasad/Downloads/fitforge
git init
git add .
git commit -m "feat: scaffold monorepo with shared, web, and mobile packages"
```

---

## Task 2: Shared Types + Data Layer

**Files:**
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/src/types/index.ts`
- Create: `packages/shared/src/types/user.ts`
- Create: `packages/shared/src/types/gym.ts`
- Create: `packages/shared/src/types/meals.ts`
- Create: `packages/shared/src/types/swim.ts`
- Create: `packages/shared/src/types/hiit.ts`
- Create: `packages/shared/src/types/progress.ts`
- Create: `packages/shared/src/types/schedule.ts`
- Create: `packages/shared/src/types/health.ts`

- [ ] **Step 1: Create user types**

```typescript
// packages/shared/src/types/user.ts
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  height: number; // cm
  startWeight: number; // kg
  targetWeight: number; // kg
  startDate: string; // ISO date "2025-05-10"
  swimmingLevel: 'beginner' | 'learning-intermediate' | 'intermediate' | 'advanced';
}

export interface UserSettings {
  theme: 'dark' | 'light';
  notifications: boolean;
  units: 'metric' | 'imperial';
}
```

- [ ] **Step 2: Create gym types**

```typescript
// packages/shared/src/types/gym.ts
export type Phase = 'phase1' | 'phase2' | 'phase3';
export type GymDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // "10-12" or "max" or "45 sec"
  startWeight: string; // "16-18 kg each" or "Bodyweight"
  rest: string; // "75s"
  cue: string;
  isSuperset?: boolean;
  supersetWith?: string; // ID of paired exercise
  isPriority?: boolean;
}

export interface GymDayPlan {
  name: string; // "Push — Chest, Shoulders, Triceps"
  exercises: Exercise[];
  postGym?: string; // "HIIT at stadium" or "Head to pool"
}

export interface GymPhase {
  label: string; // "Week 1-2: Build the Engine"
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
  weight: number; // kg
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
```

- [ ] **Step 3: Create meal types**

```typescript
// packages/shared/src/types/meals.ts
export type MealTime = 'breakfast' | 'midMorning' | 'lunch' | 'preWorkout' | 'postWorkout' | 'dinner';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type MealSource = 'homeCooking' | 'campusEatery' | 'restaurant';

export interface Meal {
  name: string;
  calories: number;
  protein: number; // grams
  items: string[];
  prepNotes?: string;
  source: MealSource;
}

export interface DayMealPlan {
  breakfast: Meal;
  midMorning: Meal;
  lunch: Meal;
  preWorkout: Meal;
  postWorkout: Meal;
  dinner: Meal;
}

export interface MealLog {
  mealTime: MealTime;
  eaten: boolean;
  actualMeal?: string;
  actualCalories?: number;
  actualProtein?: number;
}

export interface DailyMealLog {
  date: string;
  meals: Record<MealTime, MealLog>;
  totalCalories: number;
  totalProtein: number;
}

export interface Snack {
  name: string;
  calories: number;
  protein?: number;
  category: 'campusVendor' | 'homeStash' | 'fruit';
  when: string;
  why: string;
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: 'indian' | 'continental' | 'mexican' | 'thai' | 'mediterranean';
  calories: number;
  protein: number;
  cookTime: number; // minutes
  ingredients: string[];
  steps: string[];
  isBeginnerFriendly: boolean;
}
```

- [ ] **Step 4: Create swim types**

```typescript
// packages/shared/src/types/swim.ts
export type SwimStroke = 'freestyle' | 'breaststroke' | 'backstroke' | 'kickboard';

export interface SwimSegment {
  stroke: SwimStroke;
  laps: number;
  pace: 'easy' | 'moderate' | 'hard';
  notes?: string;
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
  duration: number; // minutes
  notes: string;
  breathControlRating: number; // 1-5
}
```

- [ ] **Step 5: Create HIIT types**

```typescript
// packages/shared/src/types/hiit.ts
export type HIITOption = 'trackSprints' | 'seatingCircuit';

export interface HIITInterval {
  name: string; // "Sprint" or "Jump Squats"
  duration: number; // seconds
  type: 'work' | 'rest';
}

export interface HIITProtocol {
  option: HIITOption;
  label: string;
  warmup: number; // seconds
  intervals: HIITInterval[];
  cooldown: number; // seconds
  roundsPerWeek: Record<number, number>; // week number → rounds
}

export interface HIITSession {
  date: string;
  option: HIITOption;
  roundsCompleted: number;
  totalDuration: number; // seconds
}

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';
```

- [ ] **Step 6: Create progress types**

```typescript
// packages/shared/src/types/progress.ts
export interface WeighIn {
  date: string;
  weight: number; // kg
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
  holdSeconds?: number; // for negatives
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
```

- [ ] **Step 7: Create schedule types**

```typescript
// packages/shared/src/types/schedule.ts
export type BlockCategory = 'gym' | 'swim' | 'hiit' | 'work' | 'meal' | 'rest' | 'commute' | 'sleep';
export type DayType = 'gymHiit' | 'gymSwim' | 'activeRecovery' | 'fullRest';

export interface TimeBlock {
  id: string;
  startTime: string; // "07:30"
  endTime: string; // "08:00"
  label: string;
  category: BlockCategory;
  notes?: string;
}

export interface DaySchedule {
  dayType: DayType;
  blocks: TimeBlock[];
}
```

- [ ] **Step 8: Create health types**

```typescript
// packages/shared/src/types/health.ts
export interface SleepLog {
  date: string;
  bedTime: string; // "23:00"
  wakeTime: string; // "07:30"
  byElevenThirty: boolean;
  quality: 1 | 2 | 3 | 4 | 5;
}

export interface HydrationLog {
  date: string;
  glasses: number; // out of 14 (3.5L)
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
```

- [ ] **Step 9: Create barrel exports**

```typescript
// packages/shared/src/types/index.ts
export * from './user';
export * from './gym';
export * from './meals';
export * from './swim';
export * from './hiit';
export * from './progress';
export * from './schedule';
export * from './health';
```

```typescript
// packages/shared/src/index.ts
export * from './types';
```

- [ ] **Step 10: Verify types compile**

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm --filter @fitforge/shared lint`
Expected: No TypeScript errors.

- [ ] **Step 11: Commit**

```bash
git add packages/shared/src/
git commit -m "feat: add shared TypeScript types for all domains"
```

---

## Task 3: Static Plan Data

**Files:**
- Create: `packages/shared/src/data/gym-plan.ts`
- Create: `packages/shared/src/data/meal-plan.ts`
- Create: `packages/shared/src/data/swim-plan.ts`
- Create: `packages/shared/src/data/hiit-protocols.ts`
- Create: `packages/shared/src/data/schedule-templates.ts`
- Create: `packages/shared/src/data/snacks.ts`
- Create: `packages/shared/src/data/recipes.ts`
- Create: `packages/shared/src/data/quotes.ts`
- Create: `packages/shared/src/data/food-guide.ts`

- [ ] **Step 1: Create gym plan data (Phase 1)**

```typescript
// packages/shared/src/data/gym-plan.ts
import { GymPhase, Exercise, GymDayPlan } from '../types';

const mondayPhase1: GymDayPlan = {
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

const tuesdayPhase1: GymDayPlan = {
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

const wednesdayPhase1: GymDayPlan = {
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
      startWeight: 'Bodyweight',
      rest: '0s',
      cue: 'Ab circuit — no rest within round',
    },
    {
      id: 'p1-wed-7',
      name: 'Leg Raises',
      sets: 3,
      reps: '15',
      startWeight: 'Bodyweight',
      rest: '0s',
      cue: 'Flat on back, lower slow',
    },
    {
      id: 'p1-wed-8',
      name: 'Bicycle Crunches',
      sets: 3,
      reps: '20',
      startWeight: 'Bodyweight',
      rest: '0s',
      cue: 'Slow and controlled, not fast',
    },
    {
      id: 'p1-wed-9',
      name: 'Plank',
      sets: 3,
      reps: '40 sec',
      startWeight: 'Bodyweight',
      rest: '60s',
      cue: '60s rest between rounds',
    },
  ],
  postGym: 'Swim 6-7 PM',
};

const thursdayPhase1: GymDayPlan = {
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

const fridayPhase1: GymDayPlan = {
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
      startWeight: 'Bodyweight',
      rest: '0s',
      cue: 'Arms overhead, lower back pressed flat. Core circuit — 4 rounds.',
    },
    {
      id: 'p1-fri-8',
      name: 'Dead Bug',
      sets: 4,
      reps: '10',
      startWeight: 'Bodyweight',
      rest: '0s',
      cue: 'Opposite arm-leg extension',
    },
    {
      id: 'p1-fri-9',
      name: 'Side Plank',
      sets: 4,
      reps: '25 sec each',
      startWeight: 'Bodyweight',
      rest: '0s',
      cue: 'Hold steady, no hip drop',
    },
    {
      id: 'p1-fri-10',
      name: 'Hanging Knee Raises',
      sets: 4,
      reps: '12',
      startWeight: 'Bodyweight',
      rest: '60s',
      cue: '60s rest between rounds',
    },
  ],
  postGym: 'Swim 6-7 PM',
};

export const phase1: GymPhase = {
  label: 'Phase 1: Build the Engine (Week 1-2)',
  startDate: '2025-05-10',
  endDate: '2025-05-23',
  days: {
    monday: mondayPhase1,
    tuesday: tuesdayPhase1,
    wednesday: wednesdayPhase1,
    thursday: thursdayPhase1,
    friday: fridayPhase1,
  },
};

// Phase 2 changes: +1-2 kg dumbbells, +5 kg machines, supersets on isolation, push-ups 4→5 sets
export const phase2: GymPhase = {
  label: 'Phase 2: Intensity Surge (Week 3-4)',
  startDate: '2025-05-24',
  endDate: '2025-06-06',
  days: {
    monday: {
      ...mondayPhase1,
      exercises: mondayPhase1.exercises.map(e => ({
        ...e,
        id: e.id.replace('p1', 'p2'),
        startWeight: e.startWeight === 'Bodyweight' ? 'Bodyweight' :
          e.name === 'Push-ups' ? 'Bodyweight' : `${e.startWeight} (+1-2 kg)`,
        sets: e.name === 'Push-ups' ? 5 : e.sets,
      })),
    },
    tuesday: {
      ...tuesdayPhase1,
      exercises: tuesdayPhase1.exercises.map(e => ({
        ...e,
        id: e.id.replace('p1', 'p2'),
        startWeight: e.startWeight === 'Bodyweight' ? 'Bodyweight' : `${e.startWeight} (+1-2 kg)`,
        isSuperset: ['Dumbbell Bicep Curl', 'Hammer Curl'].includes(e.name) ? true : e.isSuperset,
      })),
    },
    wednesday: {
      ...wednesdayPhase1,
      exercises: wednesdayPhase1.exercises.map(e => ({
        ...e,
        id: e.id.replace('p1', 'p2'),
        startWeight: e.startWeight === 'Bodyweight' ? 'Bodyweight' : `${e.startWeight} (+1-2 kg)`,
      })),
    },
    thursday: {
      name: 'Push — Shoulder-Dominant (Cable Lateral Raise)',
      exercises: [
        {
          id: 'p2-thu-1',
          name: 'Arnold Press',
          sets: 4,
          reps: '10',
          startWeight: '14-16 kg each',
          rest: '75s',
          cue: 'Rotate from facing you to facing forward as you press.',
          isPriority: true,
        },
        {
          id: 'p2-thu-2',
          name: 'Cable Lateral Raise',
          sets: 4,
          reps: '12',
          startWeight: '7-8 kg',
          rest: '60s',
          cue: 'Constant tension throughout — better for shoulder hypertrophy. Replaces DB lateral raise.',
          isPriority: true,
          isSuperset: true,
          supersetWith: 'p2-thu-3',
        },
        {
          id: 'p2-thu-3',
          name: 'Rear Delt Fly',
          sets: 4,
          reps: '12',
          startWeight: '9-10 kg each',
          rest: '60s',
          cue: 'Superset with cable lateral raise',
          isSuperset: true,
          supersetWith: 'p2-thu-2',
        },
        {
          id: 'p2-thu-4',
          name: 'Flat Dumbbell Press',
          sets: 3,
          reps: '12',
          startWeight: '18-20 kg each',
          rest: '75s',
          cue: 'Full chest complement',
        },
        {
          id: 'p2-thu-5',
          name: 'Chest Dip',
          sets: 3,
          reps: '8-10',
          startWeight: 'Bodyweight',
          rest: '75s',
          cue: 'Lean forward for lower chest + tricep compound. New in Phase 2.',
        },
        {
          id: 'p2-thu-6',
          name: 'Push-ups',
          sets: 5,
          reps: 'max',
          startWeight: 'Bodyweight',
          rest: '60s',
          cue: 'Target 12-15 per set',
        },
        {
          id: 'p2-thu-7',
          name: 'Cable Overhead Tricep Extension',
          sets: 3,
          reps: '12',
          startWeight: '20 kg',
          rest: '60s',
          cue: 'Full stretch at bottom',
        },
      ],
      postGym: 'Swim 6-7 PM',
    },
    friday: {
      name: 'Pull — Heavy + Core Circuit (Spider Curl)',
      exercises: [
        ...fridayPhase1.exercises.slice(0, 4).map(e => ({
          ...e,
          id: e.id.replace('p1', 'p2'),
          startWeight: e.startWeight === 'Bodyweight' ? 'Bodyweight' : `${e.startWeight} (+5 kg)`,
        })),
        {
          id: 'p2-fri-5',
          name: 'Spider Curl',
          sets: 3,
          reps: '10',
          startWeight: '10-12 kg each',
          rest: '45s',
          cue: 'Chest against incline bench, arms hang — total bicep isolation. Replaces concentration curl.',
          isPriority: true,
        },
        ...fridayPhase1.exercises.slice(5).map(e => ({
          ...e,
          id: e.id.replace('p1', 'p2'),
        })),
      ],
      postGym: 'Swim 6-7 PM',
    },
  },
};

// Phase 3: 3 sets of everything at heaviest weight, longer rest
export const phase3: GymPhase = {
  label: 'Phase 3: Peak & Taper (Final Week)',
  startDate: '2025-06-07',
  endDate: '2025-06-11',
  days: {
    monday: {
      ...mondayPhase1,
      exercises: mondayPhase1.exercises.map(e => ({
        ...e,
        id: e.id.replace('p1', 'p3'),
        sets: 3,
        reps: e.reps === 'max' ? 'max' : '8-10',
        rest: '90-120s',
        startWeight: e.startWeight === 'Bodyweight' ? 'Bodyweight' : `${e.startWeight} (heaviest)`,
      })),
      postGym: 'HIIT — 8 rounds only (taper)',
    },
    tuesday: {
      ...tuesdayPhase1,
      exercises: tuesdayPhase1.exercises.map(e => ({
        ...e,
        id: e.id.replace('p1', 'p3'),
        sets: 3,
        reps: e.reps === '45 sec' ? '45 sec' : '8-10',
        rest: '90-120s',
      })),
      postGym: 'Swim — easy pace',
    },
    wednesday: {
      ...wednesdayPhase1,
      exercises: wednesdayPhase1.exercises.map(e => ({
        ...e,
        id: e.id.replace('p1', 'p3'),
        sets: 3,
        rest: '90-120s',
      })),
      postGym: 'Swim — easy pace',
    },
    thursday: {
      ...thursdayPhase1,
      exercises: thursdayPhase1.exercises.map(e => ({
        ...e,
        id: e.id.replace('p1', 'p3'),
        sets: 3,
        reps: e.reps === 'max' ? 'max' : '8-10',
        rest: '90-120s',
      })),
      postGym: 'Swim — easy pace',
    },
    friday: {
      ...fridayPhase1,
      exercises: fridayPhase1.exercises.map(e => ({
        ...e,
        id: e.id.replace('p1', 'p3'),
        sets: 3,
        rest: '90-120s',
      })),
      postGym: 'Swim — easy pace',
    },
  },
};

export const gymPlan: Record<string, GymPhase> = { phase1, phase2, phase3 };
```

- [ ] **Step 2: Create meal plan data**

```typescript
// packages/shared/src/data/meal-plan.ts
import { DayMealPlan, DayOfWeek } from '../types';

export const mealPlan: Record<DayOfWeek, DayMealPlan> = {
  monday: {
    breakfast: {
      name: 'Moong Dal Cheela',
      calories: 380,
      protein: 28,
      items: ['2 moong dal cheela (minimal oil)', 'Mint-coriander chutney', '1 cup low-fat curd', 'Black coffee (no sugar)'],
      source: 'homeCooking',
    },
    midMorning: {
      name: 'Coconut Water + Almonds',
      calories: 150,
      protein: 5,
      items: ['1 fresh coconut water', '10 almonds (soaked overnight)'],
      source: 'campusEatery',
    },
    lunch: {
      name: 'Rajma with Brown Rice',
      calories: 550,
      protein: 32,
      items: ['Rajma curry', '1 small cup brown rice or 2 multigrain rotis', 'Mixed salad (cucumber + tomato + onion + lemon)', '1 cup curd'],
      source: 'homeCooking',
    },
    preWorkout: {
      name: 'Banana + Peanut Butter',
      calories: 200,
      protein: 6,
      items: ['1 banana', '1 tbsp peanut butter (unsalted)', '300 ml water'],
      source: 'homeCooking',
    },
    postWorkout: {
      name: 'Paneer Bhurji + Roti',
      calories: 280,
      protein: 22,
      items: ['Paneer bhurji (100g paneer, minimal oil)', '1 multigrain roti', '1 cup masala chaas'],
      source: 'homeCooking',
    },
    dinner: {
      name: 'Dal Palak + Rotis',
      calories: 350,
      protein: 25,
      items: ['Dal palak (1.5 cups)', '2 whole wheat rotis', 'Roasted papad', 'Curd'],
      source: 'homeCooking',
    },
  },
  tuesday: {
    breakfast: {
      name: 'Vegetable Oats Upma',
      calories: 360,
      protein: 26,
      items: ['Oats + onion + carrot + peas + mustard seeds', '50g paneer scramble', 'Masala chai (no sugar)'],
      source: 'homeCooking',
    },
    midMorning: {
      name: 'Peri Peri Makhana',
      calories: 120,
      protein: 4,
      items: ['Roasted makhana (30g, peri peri)', 'Green tea'],
      source: 'homeCooking',
    },
    lunch: {
      name: 'Chole with Rotis',
      calories: 520,
      protein: 30,
      items: ['Chole (chickpea curry)', '2 whole wheat rotis', 'Pickled onion rings + green chutney', 'Cucumber raita'],
      source: 'homeCooking',
    },
    preWorkout: {
      name: 'Apple + Roasted Chana',
      calories: 180,
      protein: 8,
      items: ['1 apple', 'Roasted chana (30g, unsalted)'],
      source: 'homeCooking',
    },
    postWorkout: {
      name: 'Paneer Wrap',
      calories: 300,
      protein: 24,
      items: ['Whole wheat tortilla', 'Pan-seared paneer cubes', 'Shredded lettuce + tomato', 'Hung curd dressing', '1 glass nimbu paani'],
      source: 'homeCooking',
    },
    dinner: {
      name: 'Vegetable Soup + Roti',
      calories: 330,
      protein: 22,
      items: ['Mixed vegetable soup (tomato base, no cream) with tofu/paneer chunks', '1 multigrain roti', 'Curd'],
      source: 'homeCooking',
    },
  },
  wednesday: {
    breakfast: {
      name: 'Besan Chilla',
      calories: 390,
      protein: 30,
      items: ['Gram flour pancake with onion + tomato + green chilli', 'Mint coriander chutney', '1 cup low-fat curd', 'Black coffee'],
      source: 'homeCooking',
    },
    midMorning: {
      name: 'Peri Peri Corn + Coconut Water',
      calories: 160,
      protein: 4,
      items: ['Roasted corn with peri peri seasoning', 'Tender coconut water'],
      source: 'campusEatery',
    },
    lunch: {
      name: 'Dal Makhani + Baingan Bharta',
      calories: 560,
      protein: 34,
      items: ['Dal makhani (without extra butter)', '2 rotis', 'Baingan bharta', 'Sliced onion + green chilli'],
      source: 'homeCooking',
    },
    preWorkout: {
      name: 'Banana Smoothie',
      calories: 190,
      protein: 8,
      items: ['1 banana + 200 ml milk + pinch cinnamon (no sugar)'],
      source: 'homeCooking',
    },
    postWorkout: {
      name: 'Tofu Scramble',
      calories: 290,
      protein: 22,
      items: ['Crumbled tofu + bell pepper + onion + soy sauce + chilli flakes + garlic', '1 slice multigrain toast'],
      source: 'homeCooking',
    },
    dinner: {
      name: 'Palak Soup + Sprouts Salad',
      calories: 310,
      protein: 20,
      items: ['Spinach + garlic soup (1 tbsp cream)', 'Croutons', 'Moong sprouts + tomato + lemon + salt + pepper'],
      source: 'homeCooking',
    },
  },
  thursday: {
    breakfast: {
      name: 'Aloo Methi Paratha',
      calories: 370,
      protein: 28,
      items: ['2 thin parathas (1 tsp ghee max)', '1 cup curd + green chutney', 'Green tea'],
      source: 'homeCooking',
    },
    midMorning: {
      name: 'Mixed Fruit + Walnuts',
      calories: 140,
      protein: 3,
      items: ['Papaya + watermelon + pomegranate + lime', '10 walnuts'],
      source: 'homeCooking',
    },
    lunch: {
      name: 'Paneer Tikka Masala + Rice',
      calories: 530,
      protein: 30,
      items: ['Paneer tikka masala (minimal oil, no cream)', '2 rotis', 'Small steamed rice (80g dry)', 'Mixed raita'],
      source: 'homeCooking',
    },
    preWorkout: {
      name: 'Hummus + Crackers + Orange',
      calories: 200,
      protein: 6,
      items: ['2 whole wheat crackers', '2 tbsp hummus', '1 small orange'],
      source: 'homeCooking',
    },
    postWorkout: {
      name: 'Black Bean Burrito Bowl',
      calories: 270,
      protein: 20,
      items: ['Black beans + small brown rice + salsa + guacamole + lettuce + curd'],
      source: 'homeCooking',
    },
    dinner: {
      name: 'Moong Dal Soup + Rotis',
      calories: 340,
      protein: 24,
      items: ['Clear moong dal (tempered with cumin + garlic)', '2 rotis', 'Stir-fried cabbage with mustard seeds'],
      source: 'homeCooking',
    },
  },
  friday: {
    breakfast: {
      name: 'Protein Oats Bowl',
      calories: 400,
      protein: 32,
      items: ['Quick oats + milk + chia seeds + 1 tbsp peanut butter + sliced banana + cinnamon'],
      source: 'homeCooking',
    },
    midMorning: {
      name: 'Pumpkin Seeds + Guava',
      calories: 130,
      protein: 5,
      items: ['Roasted pumpkin seeds (20g)', '1 guava', 'Black coffee'],
      source: 'homeCooking',
    },
    lunch: {
      name: 'Sarson Ka Saag + Makki Roti',
      calories: 550,
      protein: 33,
      items: ['Sarson ka saag', '2 makki rotis', '1 glass lassi (thin, no sugar, salted)', 'Onion salad'],
      source: 'restaurant',
    },
    preWorkout: {
      name: 'Makhana + Coconut Water',
      calories: 180,
      protein: 5,
      items: ['Peri peri makhana (35g)', '1 tender coconut'],
      source: 'homeCooking',
    },
    postWorkout: {
      name: 'Mediterranean Chickpea Bowl',
      calories: 290,
      protein: 22,
      items: ['Roasted chickpeas (olive oil + cumin)', 'Small quinoa', 'Cucumber + tomato', 'Paneer crumbles + lemon dressing'],
      source: 'homeCooking',
    },
    dinner: {
      name: 'Tomato Rasam + Rice + Beans',
      calories: 320,
      protein: 22,
      items: ['Tomato rasam', '1 cup brown rice (small)', 'Stir-fried beans', 'Curd'],
      source: 'homeCooking',
    },
  },
  saturday: {
    breakfast: {
      name: 'Masala Dosa + Sambar',
      calories: 430,
      protein: 30,
      items: ['1 large thin dosa', 'Sambar', 'Coconut chutney', '1 cup filter coffee (no sugar)'],
      source: 'campusEatery',
    },
    midMorning: {
      name: 'Avocado Toast / Corn Chaat',
      calories: 180,
      protein: 4,
      items: ['½ avocado on multigrain bread + chilli flakes + lemon', 'OR sweet corn chaat'],
      source: 'homeCooking',
    },
    lunch: {
      name: 'Pav Bhaji (Light Version)',
      calories: 580,
      protein: 34,
      items: ['Bhaji (minimal oil)', '2 pav (unbuttered, toasted dry)', 'Cucumber raita'],
      source: 'restaurant',
    },
    preWorkout: {
      name: 'Seasonal Fruit Plate',
      calories: 150,
      protein: 2,
      items: ['Mango / watermelon / pineapple / papaya'],
      source: 'homeCooking',
    },
    postWorkout: {
      name: 'Thai Peanut Noodle Bowl',
      calories: 280,
      protein: 20,
      items: ['Rice noodles + peanut butter + soy + garlic + lime + tofu + shredded carrot'],
      source: 'homeCooking',
    },
    dinner: {
      name: 'Clear Veg Broth + Sprouts Chaat',
      calories: 300,
      protein: 18,
      items: ['Clear vegetable broth with paneer cubes', '1 roti', 'Sprouts chaat (cold salad)'],
      source: 'homeCooking',
    },
  },
  sunday: {
    breakfast: {
      name: 'Vegetable Poha',
      calories: 450,
      protein: 26,
      items: ['Flattened rice + peas + carrot + onion + mustard seeds + curry leaves + lemon', '1 boiled egg on side', 'Ginger chai (small jaggery)'],
      source: 'homeCooking',
    },
    midMorning: {
      name: 'Corn on the Cob / Bhel Puri',
      calories: 200,
      protein: 4,
      items: ['Boiled corn with butter (1 tsp) + lime + chilli', 'OR bhel puri (home version, no fried sev)'],
      source: 'homeCooking',
    },
    lunch: {
      name: 'Sunday Special (Flexible)',
      calories: 600,
      protein: 30,
      items: ['Veg biryani (lighter version)', 'OR paneer butter masala + 2 plain naan', 'Raita + salad', 'Sunday: eat a little more freely'],
      source: 'restaurant',
    },
    preWorkout: {
      name: 'Masala Chai + Khakra',
      calories: 150,
      protein: 4,
      items: ['1 cup masala chai (minimal sugar)', '2 khakra crackers'],
      source: 'homeCooking',
    },
    postWorkout: {
      name: 'Rest Day — No Post-Workout',
      calories: 0,
      protein: 0,
      items: ['Full rest day — no workout'],
      source: 'homeCooking',
    },
    dinner: {
      name: 'Dal Tadka + Rotis + Sabzi',
      calories: 320,
      protein: 20,
      items: ['Dal tadka', '2 rotis', 'Any vegetable curry', 'Curd'],
      source: 'homeCooking',
    },
  },
};
```

- [ ] **Step 3: Create swim plan data**

```typescript
// packages/shared/src/data/swim-plan.ts
import { SwimSessionPlan } from '../types';

export const swimPlan: SwimSessionPlan[] = [
  {
    week: 1,
    warmup: [
      { stroke: 'kickboard', laps: 2, pace: 'easy', notes: 'Flutter kicks at wall + shoulder rolls (5 min)' },
    ],
    mainSet: [
      { stroke: 'breaststroke', laps: 4, pace: 'easy', notes: 'Primary stroke — easier breathing pattern' },
      { stroke: 'freestyle', laps: 2, pace: 'moderate', notes: 'Max 2 laps continuous, then wall rest' },
      { stroke: 'kickboard', laps: 4, pace: 'moderate', notes: 'Legs only — targets lower belly and hip flexors' },
      { stroke: 'breaststroke', laps: 4, pace: 'easy', notes: 'Active recovery, uses upper chest and shoulders' },
    ],
    cooldown: [
      { stroke: 'breaststroke', laps: 2, pace: 'easy', notes: 'Any stroke, slow' },
    ],
    totalLaps: 18,
    breathControlTip: 'First 5 min: standing breathing drill. Face in water, exhale bubbles through nose, turn head to breathe. Practice before entering lanes.',
  },
  {
    week: 2,
    warmup: [
      { stroke: 'kickboard', laps: 2, pace: 'easy', notes: 'Flutter kicks + breathing drill (3 min standing)' },
    ],
    mainSet: [
      { stroke: 'freestyle', laps: 3, pace: 'moderate', notes: 'Try 2 laps continuous. Rest 20 sec at wall.' },
      { stroke: 'kickboard', laps: 5, pace: 'moderate', notes: 'Build cardio without breath pressure' },
      { stroke: 'breaststroke', laps: 4, pace: 'moderate', notes: 'Focus on glide phase' },
      { stroke: 'freestyle', laps: 2, pace: 'easy', notes: 'Count 3 strokes per breath' },
    ],
    cooldown: [
      { stroke: 'breaststroke', laps: 2, pace: 'easy' },
    ],
    totalLaps: 18,
    breathControlTip: 'Count 3 strokes per breath on freestyle. Exhale fully underwater — don\'t hold breath. Inhale quick at the turn.',
  },
  {
    week: 3,
    warmup: [
      { stroke: 'freestyle', laps: 2, pace: 'easy', notes: 'Breathing drill reduced to 2 min warmup' },
    ],
    mainSet: [
      { stroke: 'freestyle', laps: 4, pace: 'moderate', notes: 'Target 4 laps continuous before rest' },
      { stroke: 'freestyle', laps: 5, pace: 'hard', notes: 'Interval: 1 lap hard / 30 sec rest × 5' },
      { stroke: 'kickboard', laps: 4, pace: 'moderate', notes: 'Legs only' },
      { stroke: 'breaststroke', laps: 4, pace: 'easy', notes: 'Recovery set' },
    ],
    cooldown: [
      { stroke: 'backstroke', laps: 3, pace: 'easy', notes: 'Backstroke cooldown' },
    ],
    totalLaps: 22,
    breathControlTip: 'Introduce bilateral breathing — breathe on both sides. Alternate every 3 strokes. This builds symmetry and lung capacity.',
  },
  {
    week: 4,
    warmup: [
      { stroke: 'freestyle', laps: 3, pace: 'easy', notes: 'Easy warmup' },
    ],
    mainSet: [
      { stroke: 'freestyle', laps: 7, pace: 'hard', notes: 'Interval: 1 lap hard / 30 sec rest × 7' },
      { stroke: 'kickboard', laps: 4, pace: 'moderate' },
      { stroke: 'breaststroke', laps: 4, pace: 'moderate', notes: 'Strong pulls' },
    ],
    cooldown: [
      { stroke: 'breaststroke', laps: 3, pace: 'easy' },
    ],
    totalLaps: 24,
    breathControlTip: 'Bilateral breathing should feel natural now. Try exhaling through mouth AND nose underwater for faster air exchange.',
  },
  {
    week: 5,
    warmup: [
      { stroke: 'freestyle', laps: 2, pace: 'easy' },
    ],
    mainSet: [
      { stroke: 'freestyle', laps: 8, pace: 'moderate', notes: '8 laps continuous — no stop. Focus on form over speed.' },
      { stroke: 'breaststroke', laps: 4, pace: 'easy', notes: 'Mix of strokes, easy pace' },
    ],
    cooldown: [
      { stroke: 'backstroke', laps: 2, pace: 'easy', notes: 'Stretch in pool' },
    ],
    totalLaps: 16,
    breathControlTip: 'Final week: easy pace, consolidate gains. Form over speed. Enjoy the water.',
  },
];
```

- [ ] **Step 4: Create HIIT protocols data**

```typescript
// packages/shared/src/data/hiit-protocols.ts
import { HIITProtocol } from '../types';

export const trackSprints: HIITProtocol = {
  option: 'trackSprints',
  label: 'Option A: Track Sprint Intervals',
  warmup: 180, // 3 min easy jog (2 laps)
  intervals: [
    { name: 'Sprint', duration: 30, type: 'work' },
    { name: 'Walk', duration: 90, type: 'rest' },
  ],
  cooldown: 300, // 5 min walk
  roundsPerWeek: { 1: 8, 2: 10, 3: 12, 4: 12, 5: 8 },
};

export const seatingCircuit: HIITProtocol = {
  option: 'seatingCircuit',
  label: 'Option B: Seating Area Circuit',
  warmup: 120, // 2 min
  intervals: [
    { name: 'Jump Squats', duration: 30, type: 'work' },
    { name: 'Rest', duration: 10, type: 'rest' },
    { name: 'Burpees', duration: 25, type: 'work' },
    { name: 'Rest', duration: 10, type: 'rest' },
    { name: 'Mountain Climbers', duration: 30, type: 'work' },
    { name: 'Rest', duration: 10, type: 'rest' },
    { name: 'High Knees', duration: 30, type: 'work' },
    { name: 'Round Rest', duration: 45, type: 'rest' },
  ],
  cooldown: 300,
  roundsPerWeek: { 1: 6, 2: 7, 3: 8, 4: 8, 5: 6 },
};

export const hiitProtocols = { trackSprints, seatingCircuit };
```

- [ ] **Step 5: Create schedule templates data**

```typescript
// packages/shared/src/data/schedule-templates.ts
import { DaySchedule, TimeBlock } from '../types';

const gymSwimDay: TimeBlock[] = [
  { id: 'gs-1', startTime: '07:30', endTime: '07:45', label: 'Wake + 500ml water', category: 'rest' },
  { id: 'gs-2', startTime: '07:45', endTime: '08:00', label: 'Morning walk (natural light)', category: 'rest' },
  { id: 'gs-3', startTime: '08:00', endTime: '08:30', label: 'Breakfast', category: 'meal' },
  { id: 'gs-4', startTime: '08:30', endTime: '09:00', label: 'Commute to campus', category: 'commute' },
  { id: 'gs-5', startTime: '09:00', endTime: '11:30', label: 'Research/study (Pomodoro)', category: 'work' },
  { id: 'gs-6', startTime: '11:30', endTime: '11:45', label: 'Mid-morning snack', category: 'meal' },
  { id: 'gs-7', startTime: '12:30', endTime: '13:00', label: 'Lunch', category: 'meal' },
  { id: 'gs-8', startTime: '13:00', endTime: '15:00', label: 'Work block 2', category: 'work' },
  { id: 'gs-9', startTime: '15:00', endTime: '15:30', label: 'Break + hydrate', category: 'rest' },
  { id: 'gs-10', startTime: '15:30', endTime: '16:30', label: 'Work block 3', category: 'work' },
  { id: 'gs-11', startTime: '16:30', endTime: '16:45', label: 'Pre-workout snack', category: 'meal' },
  { id: 'gs-12', startTime: '17:00', endTime: '18:15', label: 'Gym session', category: 'gym' },
  { id: 'gs-13', startTime: '18:15', endTime: '19:00', label: 'Swim session', category: 'swim' },
  { id: 'gs-14', startTime: '19:15', endTime: '19:45', label: 'Post-swim meal', category: 'meal' },
  { id: 'gs-15', startTime: '19:45', endTime: '20:30', label: 'Commute home / light work', category: 'commute' },
  { id: 'gs-16', startTime: '20:30', endTime: '21:00', label: 'Free time', category: 'rest' },
  { id: 'gs-17', startTime: '21:00', endTime: '21:30', label: 'Dinner', category: 'meal' },
  { id: 'gs-18', startTime: '22:00', endTime: '22:30', label: 'Journal + wind-down', category: 'rest' },
  { id: 'gs-19', startTime: '23:00', endTime: '07:30', label: 'Sleep', category: 'sleep' },
];

const gymHiitDay: TimeBlock[] = [
  ...gymSwimDay.slice(0, 11),
  { id: 'gh-12', startTime: '17:00', endTime: '18:00', label: 'Gym session', category: 'gym' },
  { id: 'gh-13', startTime: '18:15', endTime: '18:45', label: 'HIIT at Manohar C Watsa Stadium', category: 'hiit' },
  { id: 'gh-14', startTime: '18:45', endTime: '19:15', label: 'Cool down + commute', category: 'commute' },
  { id: 'gh-15', startTime: '19:15', endTime: '19:45', label: 'Post-workout meal', category: 'meal' },
  ...gymSwimDay.slice(15),
];

const activeRecoveryDay: TimeBlock[] = [
  { id: 'ar-1', startTime: '08:00', endTime: '08:30', label: 'Wake naturally', category: 'rest' },
  { id: 'ar-2', startTime: '08:30', endTime: '09:00', label: 'Light breakfast', category: 'meal' },
  { id: 'ar-3', startTime: '09:30', endTime: '10:00', label: 'Track walk/jog at Stadium', category: 'gym' },
  { id: 'ar-4', startTime: '10:30', endTime: '11:00', label: 'Brunch snack', category: 'meal' },
  { id: 'ar-5', startTime: '11:00', endTime: '13:00', label: 'Meal prep / grocery', category: 'rest' },
  { id: 'ar-6', startTime: '13:00', endTime: '13:30', label: 'Lunch', category: 'meal' },
  { id: 'ar-7', startTime: '14:00', endTime: '16:00', label: 'Free time / social', category: 'rest' },
  { id: 'ar-8', startTime: '16:00', endTime: '16:30', label: 'Mid-afternoon snack', category: 'meal' },
  { id: 'ar-9', startTime: '18:00', endTime: '19:00', label: 'Swim (easy pace)', category: 'swim' },
  { id: 'ar-10', startTime: '19:15', endTime: '19:45', label: 'Post-swim meal', category: 'meal' },
  { id: 'ar-11', startTime: '21:00', endTime: '21:30', label: 'Dinner', category: 'meal' },
  { id: 'ar-12', startTime: '22:30', endTime: '08:00', label: 'Sleep', category: 'sleep' },
];

const fullRestDay: TimeBlock[] = [
  { id: 'fr-1', startTime: '09:00', endTime: '09:30', label: 'Wake naturally', category: 'rest' },
  { id: 'fr-2', startTime: '09:30', endTime: '10:00', label: 'Breakfast (relaxed)', category: 'meal' },
  { id: 'fr-3', startTime: '10:30', endTime: '12:00', label: 'Meal prep for week', category: 'rest' },
  { id: 'fr-4', startTime: '12:00', endTime: '12:30', label: 'Brunch snack', category: 'meal' },
  { id: 'fr-5', startTime: '13:30', endTime: '14:00', label: 'Lunch (eat freely)', category: 'meal' },
  { id: 'fr-6', startTime: '14:00', endTime: '17:00', label: 'Rest / social / errands', category: 'rest' },
  { id: 'fr-7', startTime: '17:00', endTime: '17:30', label: 'Evening snack + chai', category: 'meal' },
  { id: 'fr-8', startTime: '20:30', endTime: '21:00', label: 'Dinner', category: 'meal' },
  { id: 'fr-9', startTime: '22:00', endTime: '22:30', label: 'Journal + plan next week', category: 'rest' },
  { id: 'fr-10', startTime: '23:00', endTime: '09:00', label: 'Sleep', category: 'sleep' },
];

export const scheduleTemplates: Record<string, DaySchedule> = {
  gymHiit: { dayType: 'gymHiit', blocks: gymHiitDay },
  gymSwim: { dayType: 'gymSwim', blocks: gymSwimDay },
  activeRecovery: { dayType: 'activeRecovery', blocks: activeRecoveryDay },
  fullRest: { dayType: 'fullRest', blocks: fullRestDay },
};

export const dayToTemplate: Record<string, string> = {
  monday: 'gymHiit',
  tuesday: 'gymSwim',
  wednesday: 'gymSwim',
  thursday: 'gymSwim',
  friday: 'gymSwim',
  saturday: 'activeRecovery',
  sunday: 'fullRest',
};
```

- [ ] **Step 6: Create snacks, recipes, quotes, food guide data**

```typescript
// packages/shared/src/data/snacks.ts
import { Snack } from '../types';

export const snacks: Snack[] = [
  { name: 'Tender Coconut Water', calories: 45, category: 'campusVendor', when: 'Mid-morning or post-swim', why: 'Natural electrolytes, zero sugar, hydration' },
  { name: 'Corn on the Cob (boiled)', calories: 120, category: 'campusVendor', when: 'Mid-afternoon', why: 'Fibre, complex carb, filling' },
  { name: 'Peri Peri Corn (roasted)', calories: 140, category: 'campusVendor', when: 'Mid-morning or pre-workout', why: 'Flavour variety, satisfying' },
  { name: 'Sugarcane Juice (small)', calories: 80, category: 'campusVendor', when: 'Pre-workout only', why: 'Fast glucose spike — only before gym' },
  { name: 'Groundnut (roasted, 30g)', calories: 160, protein: 7, category: 'campusVendor', when: 'Afternoon', why: 'Protein + healthy fat' },
  { name: 'Roasted Makhana (30g)', calories: 100, protein: 3, category: 'homeStash', when: 'Anytime', why: 'Peri peri or masala — buy in bulk' },
  { name: 'Roasted Chana (30g)', calories: 110, protein: 7, category: 'homeStash', when: 'Anytime', why: 'Best protein-to-calorie snack' },
  { name: 'Almonds (8-10)', calories: 70, protein: 3, category: 'homeStash', when: 'Morning', why: 'Soak overnight for better absorption' },
  { name: 'Walnuts (4 halves)', calories: 100, protein: 2, category: 'homeStash', when: 'Anytime', why: 'Omega-3, brain and recovery' },
  { name: 'Peanut Butter (1 tbsp)', calories: 95, protein: 4, category: 'homeStash', when: 'Pre-workout', why: 'On roti, apple, or banana' },
  { name: 'Dark Chocolate (2 squares, 70%+)', calories: 100, protein: 2, category: 'homeStash', when: 'Once a day max', why: 'Antioxidants + mood' },
  { name: 'Banana', calories: 105, protein: 1, category: 'fruit', when: 'Pre-workout', why: 'Fast carb + potassium' },
  { name: 'Apple', calories: 95, protein: 0, category: 'fruit', when: 'Morning or afternoon', why: 'Low glycemic, fibre' },
  { name: 'Watermelon (1 cup)', calories: 46, protein: 1, category: 'fruit', when: 'Post-swim', why: 'Hydration + lycopene' },
  { name: 'Papaya (1 cup)', calories: 62, protein: 1, category: 'fruit', when: 'Morning', why: 'Digestive enzyme papain' },
  { name: 'Pomegranate (1/2)', calories: 72, protein: 1, category: 'fruit', when: 'Mid-morning', why: 'Antioxidants + iron' },
  { name: 'Guava', calories: 68, protein: 3, category: 'fruit', when: 'Afternoon', why: 'High vitamin C + fibre' },
];
```

```typescript
// packages/shared/src/data/recipes.ts
import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: 'r1',
    name: 'Moong Dal Cheela',
    cuisine: 'indian',
    calories: 250,
    protein: 18,
    cookTime: 15,
    ingredients: ['1 cup moong dal (soaked 2-3 hours)', '1 green chilli', '1 tsp grated ginger', 'Pinch cumin, salt', '½ tsp oil'],
    steps: ['Drain soaked dal, blend with chilli + ginger + cumin + salt + minimal water into thick batter', 'Heat non-stick pan, add tiny oil', 'Pour batter, spread into circle', 'Cook 2-3 min until edges lift, flip, cook 1 min', 'Serve with mint chutney or curd'],
    isBeginnerFriendly: true,
  },
  {
    id: 'r2',
    name: 'Paneer Bhurji',
    cuisine: 'indian',
    calories: 320,
    protein: 24,
    cookTime: 12,
    ingredients: ['100g paneer (crumbled)', '1 small onion', '1 tomato', '1 green chilli', 'Turmeric, cumin, coriander, salt', '1 tsp oil'],
    steps: ['Heat oil, add onion, cook 2 min', 'Add tomato + chilli, cook until mushy', 'Add all spices, mix', 'Add crumbled paneer, mix everything', 'Cook 2-3 min, garnish with coriander'],
    isBeginnerFriendly: true,
  },
  {
    id: 'r3',
    name: 'Tofu Stir-Fry',
    cuisine: 'continental',
    calories: 270,
    protein: 22,
    cookTime: 15,
    ingredients: ['200g firm tofu', '1 bell pepper', '½ onion', '2 garlic cloves', '1 tbsp soy sauce', 'Chilli flakes, black pepper, 1 tsp olive oil'],
    steps: ['Press tofu dry, cut into cubes', 'High heat, add oil, tofu cubes — don\'t move for 2 min until golden', 'Flip, add garlic, then veggies', 'Stir-fry 3 min, add soy sauce + spices', 'Toss and plate'],
    isBeginnerFriendly: true,
  },
  {
    id: 'r4',
    name: 'Black Bean Burrito Bowl',
    cuisine: 'mexican',
    calories: 380,
    protein: 22,
    cookTime: 10,
    ingredients: ['1 can black beans (rinsed)', '½ cup cooked brown rice', 'Salsa', '¼ avocado', 'Lettuce + tomato', '2 tbsp curd', 'Cumin, paprika, lime, salt'],
    steps: ['Heat black beans with cumin + paprika + salt (3 min)', 'Lay rice in bowl base', 'Top with beans, salsa, lettuce, tomato, avocado', 'Add curd on top, squeeze lime'],
    isBeginnerFriendly: true,
  },
  {
    id: 'r5',
    name: 'Thai Peanut Noodle Bowl',
    cuisine: 'thai',
    calories: 360,
    protein: 20,
    cookTime: 12,
    ingredients: ['80g rice noodles', '100g firm tofu (cubed)', '1 carrot (shredded)', '2 tbsp peanut butter', '1 tbsp soy sauce', '1 tsp lime juice', '1 tsp garlic paste', 'Chilli flakes'],
    steps: ['Boil noodles per pack (3 min), drain', 'Make sauce: peanut butter + soy + lime + garlic + chilli + 2 tbsp warm water', 'Toss noodles in sauce', 'Top with pan-fried tofu and shredded carrot', 'Garnish with coriander'],
    isBeginnerFriendly: true,
  },
  {
    id: 'r6',
    name: 'Chickpea Mediterranean Bowl',
    cuisine: 'mediterranean',
    calories: 390,
    protein: 24,
    cookTime: 15,
    ingredients: ['1 can chickpeas', '½ cup quinoa or brown rice', 'Cucumber', 'Tomatoes', '50g paneer (crumbled)', 'Olive oil, lemon, oregano, salt, pepper'],
    steps: ['Roast chickpeas in pan with oil + cumin + paprika, 5 min until crispy', 'Lay quinoa in bowl', 'Top with roasted chickpeas, cucumber, tomato, crumbled paneer', 'Drizzle olive oil + lemon + oregano dressing'],
    isBeginnerFriendly: true,
  },
  {
    id: 'r7',
    name: 'Dal Tadka',
    cuisine: 'indian',
    calories: 200,
    protein: 14,
    cookTime: 20,
    ingredients: ['½ cup toor/masoor dal', 'Turmeric', '1 tsp ghee', '½ tsp cumin seeds', '1 dried red chilli', 'Hing (asafoetida)', 'Salt, lemon'],
    steps: ['Pressure cook dal with turmeric + 1.5 cups water (3 whistles)', 'Heat ghee, add cumin (let splutter), add chilli + hing, cook 20 sec', 'Pour tadka into dal, add salt, squeeze lemon', 'Make in big batch, refrigerate 2 days'],
    isBeginnerFriendly: false,
  },
  {
    id: 'r8',
    name: 'Overnight Protein Oats',
    cuisine: 'continental',
    calories: 380,
    protein: 28,
    cookTime: 3,
    ingredients: ['½ cup quick oats', '200 ml milk', '1 tbsp chia seeds', '1 tbsp peanut butter', '½ banana (sliced)', 'Pinch cinnamon'],
    steps: ['Mix oats + milk + chia seeds in a jar', 'Add peanut butter, stir', 'Cover and refrigerate overnight (or 2 hours minimum)', 'In morning: top with banana slices + cinnamon', 'No cooking required'],
    isBeginnerFriendly: true,
  },
];
```

```typescript
// packages/shared/src/data/quotes.ts
export const motivationalQuotes: string[] = [
  "The body achieves what the mind believes.",
  "32 days. That's all it takes to change how you carry yourself.",
  "You don't have to be great to start, but you have to start to be great.",
  "Discipline is choosing between what you want now and what you want most.",
  "The pain you feel today is the strength you feel tomorrow.",
  "Every workout is progress. Every clean meal is a step forward.",
  "Your body is a reflection of your lifestyle, not your genetics.",
  "Consistency beats intensity. Show up every day.",
  "The only bad workout is the one that didn't happen.",
  "You're not just losing weight — you're building the version of yourself you've always imagined.",
  "Summer bodies are built in spring. Your spring is now.",
  "Push harder than yesterday if you want a different tomorrow.",
  "It's not about having time. It's about making time.",
  "Sweat is just fat crying.",
  "The difference between try and triumph is a little umph.",
  "Don't stop when you're tired. Stop when you're done.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Train insane or remain the same.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "You are one workout away from a good mood.",
  "Strength doesn't come from what you can do. It comes from overcoming what you thought you couldn't.",
  "Fall in love with the process and the results will come.",
  "No one ever drowned in sweat.",
  "It never gets easier. You just get stronger.",
  "Your only limit is you.",
  "Champions train. Losers complain.",
  "Be stronger than your excuses.",
  "The hard days are what make you stronger.",
  "Progress is progress, no matter how small.",
  "June 14 is coming. Will you be ready?",
];
```

```typescript
// packages/shared/src/data/food-guide.ts
export interface FoodGuideEntry {
  choose: string[];
  avoid: string[];
}

export const campusEateryGuide: Record<string, FoodGuideEntry> = {
  breakfast: {
    choose: ['Idli + sambar', 'Upma', 'Pongal (plain)', 'Curd', 'Boiled eggs', 'Dosa (plain, no butter)'],
    avoid: ['Vada', 'Puri', 'Bonda', 'Ghee roast dosa', 'Sweet items'],
  },
  lunch: {
    choose: ['Dal (any) + sabzi + 1 small rice or 2 rotis', 'Curd', 'Extra sambar/rasam', 'Paneer tikka (dry)'],
    avoid: ['Deep-fried items', 'Second helping of rice', 'Oily sabzis', 'Sweet dishes'],
  },
  dinner: {
    choose: ['2 rotis + dal + sabzi + curd', 'Clear soups', 'Raita'],
    avoid: ['Rice at dinner', 'Heavy gravies', 'Fried snacks', 'Sugary drinks'],
  },
};

export const restaurantGuide: Record<string, FoodGuideEntry> = {
  southIndian: {
    choose: ['Idli + sambar', 'Plain dosa (no butter)', 'Mini meals (restricted rice)', 'Rasam extras'],
    avoid: ['Ghee roast dosa', 'Parotta', 'Fried vada/bonda', 'Butter uttapam'],
  },
  northIndian: {
    choose: ['Dal fry (no extra butter)', 'Paneer tikka (dry)', 'Palak paneer (no cream)', 'Tandoori roti', 'Rajma/chole with roti'],
    avoid: ['Butter naan', 'Paneer butter masala', 'Malai kofta', 'Biryani (outside)', 'Puri bhaji'],
  },
  continental: {
    choose: ['Grilled veggie sandwich', 'Veggie wrap/burrito bowl', 'Black coffee, green tea', 'Quinoa bowl'],
    avoid: ['Creamy pasta', 'Loaded pizza', 'Cold coffee with sugar + cream', 'Extra cheese items'],
  },
  swiggyTips: {
    choose: ['Add note: "minimum oil, no extra butter"', 'Dal + roti (₹80-130)', 'Paneer tikka + roti (₹150-200)', 'EatFit / Freshmenu if available'],
    avoid: ['Cream-based gravies', 'Fried starters', 'Butter naan', 'Sugary drinks'],
  },
};
```

- [ ] **Step 7: Update barrel exports and verify**

```typescript
// packages/shared/src/index.ts
export * from './types';
export { gymPlan, phase1, phase2, phase3 } from './data/gym-plan';
export { mealPlan } from './data/meal-plan';
export { swimPlan } from './data/swim-plan';
export { hiitProtocols } from './data/hiit-protocols';
export { scheduleTemplates, dayToTemplate } from './data/schedule-templates';
export { snacks } from './data/snacks';
export { recipes } from './data/recipes';
export { motivationalQuotes } from './data/quotes';
export { campusEateryGuide, restaurantGuide } from './data/food-guide';
```

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm --filter @fitforge/shared lint`
Expected: No TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add packages/shared/src/data/ packages/shared/src/index.ts
git commit -m "feat: add all static plan data (gym, meals, swim, HIIT, schedule, recipes)"
```

---

## Task 4: Firebase Configuration + Auth Hooks

**Files:**
- Create: `packages/shared/src/firebase/config.ts`
- Create: `packages/shared/src/firebase/auth.ts`
- Create: `packages/shared/src/firebase/firestore.ts`
- Create: `apps/web/.env.local.example`

- [ ] **Step 1: Create Firebase config**

```typescript
// packages/shared/src/firebase/config.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getFirebaseDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
    if (typeof window !== 'undefined') {
      enableIndexedDbPersistence(db).catch(() => {});
    }
  }
  return db;
}
```

- [ ] **Step 2: Create auth helpers**

```typescript
// packages/shared/src/firebase/auth.ts
import { GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, User, onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOut(): Promise<void> {
  const auth = getFirebaseAuth();
  await fbSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}
```

- [ ] **Step 3: Create Firestore CRUD helpers**

```typescript
// packages/shared/src/firebase/firestore.ts
import {
  doc, setDoc, getDoc, updateDoc, deleteDoc,
  collection, query, onSnapshot, orderBy, where,
  Unsubscribe, DocumentData
} from 'firebase/firestore';
import { getFirebaseDb } from './config';
import { GymSession, SwimLog, HIITSession, DailyMealLog, DailyHealthLog, WeighIn, UserProfile } from '../types';

function userDoc(uid: string, ...path: string[]) {
  return doc(getFirebaseDb(), 'users', uid, ...path);
}

function userCollection(uid: string, ...path: string[]) {
  return collection(getFirebaseDb(), 'users', uid, ...path);
}

export async function saveProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
  await setDoc(userDoc(uid, 'profile', 'main'), profile, { merge: true });
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(userDoc(uid, 'profile', 'main'));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function saveGymSession(uid: string, session: GymSession): Promise<void> {
  await setDoc(userDoc(uid, 'sessions', session.date, 'gym', 'data'), session);
}

export async function saveSwimLog(uid: string, log: SwimLog): Promise<void> {
  await setDoc(userDoc(uid, 'sessions', log.date, 'swim', 'data'), log);
}

export async function saveHIITSession(uid: string, session: HIITSession): Promise<void> {
  await setDoc(userDoc(uid, 'sessions', session.date, 'hiit', 'data'), session);
}

export async function saveDailyMealLog(uid: string, log: DailyMealLog): Promise<void> {
  await setDoc(userDoc(uid, 'dailyLog', log.date, 'meals', 'data'), log);
}

export async function saveDailyHealthLog(uid: string, log: DailyHealthLog): Promise<void> {
  await setDoc(userDoc(uid, 'dailyLog', log.date, 'health', 'data'), log);
}

export async function saveWeighIn(uid: string, weighIn: WeighIn): Promise<void> {
  await setDoc(userDoc(uid, 'progress', 'weighIns', 'entries', weighIn.date), weighIn);
}

export function subscribeToGymSession(uid: string, date: string, callback: (session: GymSession | null) => void): Unsubscribe {
  return onSnapshot(userDoc(uid, 'sessions', date, 'gym', 'data'), (snap) => {
    callback(snap.exists() ? (snap.data() as GymSession) : null);
  });
}

export function subscribeToProgress(uid: string, callback: (weighIns: WeighIn[]) => void): Unsubscribe {
  const q = query(userCollection(uid, 'progress', 'weighIns', 'entries'), orderBy('date', 'asc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => d.data() as WeighIn));
  });
}

export function subscribeToDailyHealth(uid: string, date: string, callback: (log: DailyHealthLog | null) => void): Unsubscribe {
  return onSnapshot(userDoc(uid, 'dailyLog', date, 'health', 'data'), (snap) => {
    callback(snap.exists() ? (snap.data() as DailyHealthLog) : null);
  });
}
```

- [ ] **Step 4: Create env example file**

```
# apps/web/.env.local.example
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

- [ ] **Step 5: Update shared barrel export**

Add to `packages/shared/src/index.ts`:
```typescript
export { getFirebaseApp, getFirebaseAuth, getFirebaseDb } from './firebase/config';
export { signInWithGoogle, signOut, onAuthChange } from './firebase/auth';
export * from './firebase/firestore';
```

- [ ] **Step 6: Verify and commit**

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm --filter @fitforge/shared lint`
Expected: No TypeScript errors.

```bash
git add packages/shared/src/firebase/ apps/web/.env.local.example
git commit -m "feat: add Firebase config, auth, and Firestore CRUD helpers"
```

---

## Task 5: Utility Functions

**Files:**
- Create: `packages/shared/src/utils/date.ts`
- Create: `packages/shared/src/utils/calories.ts`
- Create: `packages/shared/src/utils/overload.ts`

- [ ] **Step 1: Create date utilities**

```typescript
// packages/shared/src/utils/date.ts
import { Phase, DayOfWeek, GymDay } from '../types';

const PLAN_START = '2025-05-10';
const PLAN_END = '2025-06-11';
const CONVOCATION = '2025-06-14';

export function getDaysRemaining(targetDate: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getDaysToPlanEnd(): number {
  return getDaysRemaining(PLAN_END);
}

export function getDaysToConvocation(): number {
  return getDaysRemaining(CONVOCATION);
}

export function getCurrentPhase(date?: Date): Phase {
  const d = date || new Date();
  const start = new Date(PLAN_START);
  const daysSinceStart = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (daysSinceStart < 14) return 'phase1';
  if (daysSinceStart < 28) return 'phase2';
  return 'phase3';
}

export function getCurrentWeek(date?: Date): number {
  const d = date || new Date();
  const start = new Date(PLAN_START);
  const daysSinceStart = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(5, Math.floor(daysSinceStart / 7) + 1);
}

export function getPhaseLabel(phase: Phase): string {
  switch (phase) {
    case 'phase1': return 'Phase 1: Build the Engine';
    case 'phase2': return 'Phase 2: Intensity Surge';
    case 'phase3': return 'Phase 3: Peak & Taper';
  }
}

export function getDayOfWeek(date?: Date): DayOfWeek {
  const d = date || new Date();
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[d.getDay()];
}

export function getGymDay(date?: Date): GymDay | null {
  const day = getDayOfWeek(date);
  if (day === 'saturday' || day === 'sunday') return null;
  return day as GymDay;
}

export function isSwimDay(date?: Date): boolean {
  const day = getDayOfWeek(date);
  return ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(day);
}

export function isHIITDay(date?: Date): boolean {
  return getDayOfWeek(date) === 'monday';
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getToday(): string {
  return formatDate(new Date());
}
```

- [ ] **Step 2: Create calorie utilities**

```typescript
// packages/shared/src/utils/calories.ts
import { MealLog, MealTime } from '../types';

export const DAILY_CALORIE_TARGET = 1900; // midpoint of 1800-2000
export const DAILY_PROTEIN_TARGET = 135; // midpoint of 130-140g
export const DAILY_CARB_TARGET = 165; // midpoint of 150-180g
export const DAILY_FAT_TARGET = 55; // midpoint of 50-60g

export function calculateDailyTotals(meals: Record<MealTime, MealLog>): { calories: number; protein: number } {
  let calories = 0;
  let protein = 0;

  for (const meal of Object.values(meals)) {
    if (meal.eaten) {
      calories += meal.actualCalories || 0;
      protein += meal.actualProtein || 0;
    }
  }

  return { calories, protein };
}

export function getCalorieStatus(consumed: number): 'under' | 'on-track' | 'over' {
  if (consumed < DAILY_CALORIE_TARGET - 200) return 'under';
  if (consumed > DAILY_CALORIE_TARGET + 100) return 'over';
  return 'on-track';
}

export function getProteinStatus(consumed: number): 'low' | 'on-track' | 'high' {
  if (consumed < DAILY_PROTEIN_TARGET - 20) return 'low';
  if (consumed > DAILY_PROTEIN_TARGET + 20) return 'high';
  return 'on-track';
}
```

- [ ] **Step 3: Create overload utility**

```typescript
// packages/shared/src/utils/overload.ts
export interface OverloadCheck {
  safe: boolean;
  percentIncrease: number;
  warning?: string;
}

export function checkProgressiveOverload(previousWeight: number, currentWeight: number): OverloadCheck {
  if (previousWeight === 0) return { safe: true, percentIncrease: 0 };

  const percentIncrease = ((currentWeight - previousWeight) / previousWeight) * 100;

  if (percentIncrease > 10) {
    return {
      safe: false,
      percentIncrease,
      warning: `Weight increase of ${percentIncrease.toFixed(0)}% exceeds 10% safety threshold. Risk of injury. Consider a smaller increment.`,
    };
  }

  return { safe: true, percentIncrease };
}

export function suggestNextWeight(currentWeight: number, phase: string): number {
  if (phase === 'phase3') return currentWeight;
  return currentWeight + (currentWeight <= 12 ? 1 : 2);
}
```

- [ ] **Step 4: Update barrel export, verify, commit**

Add to `packages/shared/src/index.ts`:
```typescript
export * from './utils/date';
export * from './utils/calories';
export * from './utils/overload';
```

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm --filter @fitforge/shared lint`
Expected: No TypeScript errors.

```bash
git add packages/shared/src/utils/
git commit -m "feat: add date, calorie, and progressive overload utility functions"
```

---

## Task 6: Web App — Layout, Auth, Navigation

**Files:**
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/globals.css`
- Create: `apps/web/components/providers.tsx`
- Create: `apps/web/components/nav.tsx`
- Create: `apps/web/hooks/use-auth.ts`
- Create: `apps/web/app/login/page.tsx`

- [ ] **Step 1: Create global CSS**

```css
/* apps/web/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

body {
  background-color: #0a0a0f;
  color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', system-ui, sans-serif;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #0a0a0f;
}

::-webkit-scrollbar-thumb {
  background: #252540;
  border-radius: 3px;
}
```

- [ ] **Step 2: Create auth hook**

```typescript
// apps/web/hooks/use-auth.ts
'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange, signInWithGoogle, signOut } from '@fitforge/shared';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function useAuth(): AuthState {
  return useContext(AuthContext);
}

export function useAuthProvider(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return { user, loading, signIn: handleSignIn, signOut: handleSignOut };
}
```

- [ ] **Step 3: Create providers wrapper**

```typescript
// apps/web/components/providers.tsx
'use client';

import { ReactNode } from 'react';
import { AuthContext, useAuthProvider } from '@/hooks/use-auth';

export function Providers({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
```

- [ ] **Step 4: Create navigation component**

```typescript
// apps/web/components/nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '◉' },
  { href: '/gym', label: 'Gym', icon: '◎' },
  { href: '/meals', label: 'Meals', icon: '◈' },
  { href: '/swim', label: 'Swim', icon: '◇' },
  { href: '/hiit', label: 'HIIT', icon: '◆' },
  { href: '/progress', label: 'Progress', icon: '◐' },
  { href: '/schedule', label: 'Schedule', icon: '◑' },
  { href: '/health', label: 'Health', icon: '◒' },
  { href: '/recipes', label: 'Recipes', icon: '◓' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-card border-t border-white/5 md:hidden">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center px-2 py-1 text-xs ${
                pathname === item.href ? 'text-accent-coral' : 'text-text-muted'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-56 md:fixed md:inset-y-0 bg-bg-card border-r border-white/5">
        <div className="p-4">
          <h1 className="font-heading text-xl font-bold text-accent-coral">FitForge</h1>
          <p className="text-xs text-text-muted mt-1">32-Day Transformation</p>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-accent-coral/10 text-accent-coral'
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
```

- [ ] **Step 5: Create root layout**

```typescript
// apps/web/app/layout.tsx
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Nav } from '@/components/nav';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitForge — 32-Day Transformation',
  description: 'Personal fitness tracker for IITM body transformation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-text-primary min-h-screen">
        <Providers>
          <Nav />
          <main className="md:ml-56 pb-20 md:pb-0 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Create login page**

```typescript
// apps/web/app/login/page.tsx
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-accent-coral text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-bg-card rounded-2xl p-8 max-w-md w-full border border-white/5">
        <h1 className="font-heading text-3xl font-bold text-center mb-2">FitForge</h1>
        <p className="text-text-secondary text-center mb-8">32-Day Body Transformation Tracker</p>

        <div className="space-y-4 text-center">
          <p className="text-text-muted text-sm">Sign in to sync your progress across all devices</p>
          <button
            onClick={signIn}
            className="w-full bg-accent-coral hover:bg-accent-coral/90 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Sign in with Google
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-text-muted">
          <p>Your data syncs across phone, Mac, and Ubuntu</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Verify dev server starts**

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm --filter @fitforge/web dev`
Expected: Next.js dev server starts without errors on localhost:3000.

- [ ] **Step 8: Commit**

```bash
git add apps/web/
git commit -m "feat: add web app layout, auth, navigation, and login page"
```

---

## Task 7: Web App — Dashboard Page

**Files:**
- Create: `apps/web/app/page.tsx`
- Create: `apps/web/components/countdown-card.tsx`
- Create: `apps/web/components/phase-badge.tsx`
- Create: `apps/web/components/quote-card.tsx`

- [ ] **Step 1: Create countdown card component**

```typescript
// apps/web/components/countdown-card.tsx
'use client';

import { getDaysToPlanEnd, getDaysToConvocation } from '@fitforge/shared';

export function CountdownCard() {
  const planDays = getDaysToPlanEnd();
  const convoDays = getDaysToConvocation();

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <p className="text-text-muted text-xs uppercase tracking-wider">Plan Ends</p>
        <p className="text-3xl font-bold text-accent-coral mt-1">{planDays}</p>
        <p className="text-text-secondary text-xs">days left</p>
      </div>
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <p className="text-text-muted text-xs uppercase tracking-wider">Convocation</p>
        <p className="text-3xl font-bold text-accent-teal mt-1">{convoDays}</p>
        <p className="text-text-secondary text-xs">days to June 14</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create phase badge component**

```typescript
// apps/web/components/phase-badge.tsx
'use client';

import { getCurrentPhase, getPhaseLabel } from '@fitforge/shared';

export function PhaseBadge() {
  const phase = getCurrentPhase();
  const label = getPhaseLabel(phase);

  const colors = {
    phase1: 'bg-accent-teal/10 text-accent-teal border-accent-teal/30',
    phase2: 'bg-accent-coral/10 text-accent-coral border-accent-coral/30',
    phase3: 'bg-accent-gold/10 text-accent-gold border-accent-gold/30',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors[phase]}`}>
      {label}
    </span>
  );
}
```

- [ ] **Step 3: Create quote card component**

```typescript
// apps/web/components/quote-card.tsx
'use client';

import { motivationalQuotes } from '@fitforge/shared';

export function QuoteCard() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const quote = motivationalQuotes[dayOfYear % motivationalQuotes.length];

  return (
    <div className="bg-bg-card rounded-xl p-4 border border-white/5">
      <p className="text-text-secondary text-sm italic leading-relaxed">"{quote}"</p>
    </div>
  );
}
```

- [ ] **Step 4: Create dashboard page**

```typescript
// apps/web/app/page.tsx
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CountdownCard } from '@/components/countdown-card';
import { PhaseBadge } from '@/components/phase-badge';
import { QuoteCard } from '@/components/quote-card';
import {
  getDayOfWeek, getGymDay, isSwimDay, isHIITDay,
  gymPlan, getCurrentPhase, mealPlan,
  DAILY_CALORIE_TARGET, DAILY_PROTEIN_TARGET
} from '@fitforge/shared';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-accent-coral">Loading...</div>
      </div>
    );
  }

  const today = getDayOfWeek();
  const gymDay = getGymDay();
  const phase = getCurrentPhase();
  const todayPlan = gymDay ? gymPlan[phase].days[gymDay] : null;
  const swim = isSwimDay();
  const hiit = isHIITDay();

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Hey, {user.displayName?.split(' ')[0]}
          </h1>
          <p className="text-text-muted text-sm capitalize">{today}</p>
        </div>
        <PhaseBadge />
      </div>

      <CountdownCard />

      {/* Today's Workout */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">Today's Training</h2>
        {todayPlan ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold">{todayPlan.name}</p>
            <div className="flex gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400">
                Gym
              </span>
              {swim && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-accent-teal/10 text-accent-teal">
                  Swim 6-7 PM
                </span>
              )}
              {hiit && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-accent-coral/10 text-accent-coral">
                  HIIT
                </span>
              )}
            </div>
            <p className="text-text-muted text-xs">{todayPlan.exercises.length} exercises</p>
          </div>
        ) : today === 'saturday' ? (
          <div>
            <p className="text-lg font-semibold">Active Recovery</p>
            <p className="text-text-secondary text-sm">Track walk + easy swim</p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold">Full Rest Day</p>
            <p className="text-text-secondary text-sm">Recover. Meal prep. Plan the week.</p>
          </div>
        )}
      </div>

      {/* Nutrition Summary */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">Nutrition Target</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-accent-coral">{DAILY_CALORIE_TARGET}</p>
            <p className="text-text-muted text-xs">kcal target</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent-teal">{DAILY_PROTEIN_TARGET}g</p>
            <p className="text-text-muted text-xs">protein target</p>
          </div>
        </div>
      </div>

      <QuoteCard />
    </div>
  );
}
```

- [ ] **Step 5: Verify dashboard renders**

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm --filter @fitforge/web dev`
Navigate to localhost:3000 — should show login page (no auth configured yet), or dashboard layout.

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/page.tsx apps/web/components/countdown-card.tsx apps/web/components/phase-badge.tsx apps/web/components/quote-card.tsx
git commit -m "feat: add dashboard page with countdown, phase badge, and daily summary"
```

---

## Task 8: Web App — Gym Plan Page

**Files:**
- Create: `apps/web/app/gym/page.tsx`
- Create: `apps/web/components/exercise-card.tsx`
- Create: `apps/web/components/exercise-logger.tsx`
- Create: `apps/web/hooks/use-session.ts`

- [ ] **Step 1: Create session hook**

```typescript
// apps/web/hooks/use-session.ts
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';
import { GymSession, ExerciseLog, SetLog } from '@fitforge/shared';
import { getToday, getCurrentPhase, getGymDay } from '@fitforge/shared';
import { saveGymSession, subscribeToGymSession } from '@fitforge/shared';

export function useGymSession() {
  const { user } = useAuth();
  const [session, setSession] = useState<GymSession | null>(null);
  const today = getToday();

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToGymSession(user.uid, today, setSession);
    return unsub;
  }, [user, today]);

  const initSession = (): GymSession => ({
    date: today,
    phase: getCurrentPhase(),
    day: getGymDay() || 'monday',
    exercises: [],
  });

  const logSet = async (exerciseId: string, exerciseName: string, setIndex: number, log: SetLog) => {
    if (!user) return;

    const current = session || initSession();
    const exercises = [...current.exercises];
    let exerciseLog = exercises.find(e => e.exerciseId === exerciseId);

    if (!exerciseLog) {
      exerciseLog = { exerciseId, exerciseName, sets: [], completed: false };
      exercises.push(exerciseLog);
    }

    while (exerciseLog.sets.length <= setIndex) {
      exerciseLog.sets.push({ reps: 0, weight: 0, completed: false });
    }
    exerciseLog.sets[setIndex] = log;
    exerciseLog.completed = exerciseLog.sets.every(s => s.completed);

    const updated = { ...current, exercises };
    await saveGymSession(user.uid, updated);
  };

  return { session, logSet };
}
```

- [ ] **Step 2: Create exercise logger component**

```typescript
// apps/web/components/exercise-logger.tsx
'use client';

import { useState } from 'react';
import { SetLog } from '@fitforge/shared';
import { checkProgressiveOverload } from '@fitforge/shared';

interface ExerciseLoggerProps {
  exerciseId: string;
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  targetWeight: string;
  loggedSets: SetLog[];
  previousWeight?: number;
  onLogSet: (setIndex: number, log: SetLog) => void;
}

export function ExerciseLogger({
  exerciseId, exerciseName, targetSets, targetReps, targetWeight,
  loggedSets, previousWeight, onLogSet
}: ExerciseLoggerProps) {
  const [expanded, setExpanded] = useState(false);

  const sets = Array.from({ length: targetSets }, (_, i) => loggedSets[i] || { reps: 0, weight: 0, completed: false });

  return (
    <div className={`mt-2 space-y-2 ${expanded ? '' : 'hidden'}`}>
      {sets.map((set, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-xs text-text-muted w-8">S{i + 1}</span>
          <input
            type="number"
            placeholder="reps"
            value={set.reps || ''}
            onChange={(e) => onLogSet(i, { ...set, reps: Number(e.target.value) })}
            className="w-16 bg-bg-elevated border border-white/10 rounded px-2 py-1 text-sm text-text-primary"
          />
          <input
            type="number"
            placeholder="kg"
            value={set.weight || ''}
            onChange={(e) => {
              const weight = Number(e.target.value);
              onLogSet(i, { ...set, weight });
            }}
            className="w-16 bg-bg-elevated border border-white/10 rounded px-2 py-1 text-sm text-text-primary"
          />
          <button
            onClick={() => onLogSet(i, { ...set, completed: !set.completed })}
            className={`w-6 h-6 rounded border flex items-center justify-center text-xs ${
              set.completed ? 'bg-success/20 border-success text-success' : 'border-white/20 text-text-muted'
            }`}
          >
            {set.completed ? '✓' : ''}
          </button>
          {previousWeight && set.weight > 0 && (() => {
            const check = checkProgressiveOverload(previousWeight, set.weight);
            if (!check.safe) {
              return <span className="text-xs text-danger">⚠ +{check.percentIncrease.toFixed(0)}%</span>;
            }
            return null;
          })()}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create exercise card component**

```typescript
// apps/web/components/exercise-card.tsx
'use client';

import { useState } from 'react';
import { Exercise, SetLog } from '@fitforge/shared';
import { ExerciseLogger } from './exercise-logger';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  loggedSets: SetLog[];
  onLogSet: (exerciseId: string, exerciseName: string, setIndex: number, log: SetLog) => void;
}

export function ExerciseCard({ exercise, index, loggedSets, onLogSet }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const completed = loggedSets.length === exercise.sets && loggedSets.every(s => s.completed);

  return (
    <div className={`bg-bg-card rounded-xl border transition-colors ${
      completed ? 'border-success/30' : exercise.isPriority ? 'border-accent-coral/30' : 'border-white/5'
    }`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">{index + 1}.</span>
              <h3 className="font-medium text-sm">{exercise.name}</h3>
              {exercise.isPriority && (
                <span className="text-xs bg-accent-coral/10 text-accent-coral px-1.5 py-0.5 rounded">Priority</span>
              )}
              {exercise.isSuperset && (
                <span className="text-xs bg-accent-teal/10 text-accent-teal px-1.5 py-0.5 rounded">Superset</span>
              )}
            </div>
            <p className="text-text-muted text-xs mt-1">
              {exercise.sets} × {exercise.reps} · {exercise.startWeight} · Rest {exercise.rest}
            </p>
          </div>
          <span className={`text-lg ${completed ? 'text-success' : 'text-text-muted'}`}>
            {completed ? '✓' : expanded ? '−' : '+'}
          </span>
        </div>
        {exercise.cue && (
          <p className="text-xs text-accent-teal/80 mt-2 italic">{exercise.cue}</p>
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          <ExerciseLogger
            exerciseId={exercise.id}
            exerciseName={exercise.name}
            targetSets={exercise.sets}
            targetReps={exercise.reps}
            targetWeight={exercise.startWeight}
            loggedSets={loggedSets}
            onLogSet={(setIndex, log) => onLogSet(exercise.id, exercise.name, setIndex, log)}
          />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create gym plan page**

```typescript
// apps/web/app/gym/page.tsx
'use client';

import { useState } from 'react';
import { gymPlan, getCurrentPhase, getGymDay, Phase, GymDay } from '@fitforge/shared';
import { ExerciseCard } from '@/components/exercise-card';
import { useGymSession } from '@/hooks/use-session';

export default function GymPage() {
  const [selectedPhase, setSelectedPhase] = useState<Phase>(getCurrentPhase());
  const [selectedDay, setSelectedDay] = useState<GymDay>(getGymDay() || 'monday');
  const { session, logSet } = useGymSession();

  const phase = gymPlan[selectedPhase];
  const dayPlan = phase.days[selectedDay];

  const phases: { key: Phase; label: string }[] = [
    { key: 'phase1', label: 'Week 1-2' },
    { key: 'phase2', label: 'Week 3-4' },
    { key: 'phase3', label: 'Final Week' },
  ];

  const days: { key: GymDay; label: string }[] = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
  ];

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Gym Plan</h1>

      {/* Phase tabs */}
      <div className="flex gap-2">
        {phases.map(p => (
          <button
            key={p.key}
            onClick={() => setSelectedPhase(p.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPhase === p.key
                ? 'bg-accent-coral text-white'
                : 'bg-bg-card text-text-secondary hover:bg-bg-elevated'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Day tabs */}
      <div className="flex gap-1">
        {days.map(d => (
          <button
            key={d.key}
            onClick={() => setSelectedDay(d.key)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
              selectedDay === d.key
                ? 'bg-accent-teal/10 text-accent-teal border border-accent-teal/30'
                : 'bg-bg-card text-text-muted hover:bg-bg-elevated'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Day name + post-gym info */}
      <div>
        <h2 className="font-heading text-lg font-semibold">{dayPlan.name}</h2>
        {dayPlan.postGym && (
          <p className="text-xs text-accent-teal mt-1">After gym: {dayPlan.postGym}</p>
        )}
      </div>

      {/* Exercise list */}
      <div className="space-y-2">
        {dayPlan.exercises.map((exercise, i) => {
          const logged = session?.exercises.find(e => e.exerciseId === exercise.id);
          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={i}
              loggedSets={logged?.sets || []}
              onLogSet={logSet}
            />
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/gym/ apps/web/components/exercise-card.tsx apps/web/components/exercise-logger.tsx apps/web/hooks/use-session.ts
git commit -m "feat: add gym plan page with exercise logging and progressive overload tracking"
```

---

## Task 9: Web App — HIIT Timer Page

**Files:**
- Create: `apps/web/app/hiit/page.tsx`
- Create: `apps/web/components/hiit-timer.tsx`
- Create: `apps/web/components/weather-widget.tsx`

- [ ] **Step 1: Create weather widget**

```typescript
// apps/web/components/weather-widget.tsx
'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  description: string;
  isGoodForOutdoor: boolean;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=12.99&longitude=80.23&current=temperature_2m,weather_code&timezone=Asia/Kolkata')
      .then(res => res.json())
      .then(data => {
        const temp = data.current.temperature_2m;
        const code = data.current.weather_code;
        const isRain = code >= 51; // drizzle and above
        setWeather({
          temperature: Math.round(temp),
          description: isRain ? 'Rainy — consider indoor circuit' : `${Math.round(temp)}°C — good for outdoor`,
          isGoodForOutdoor: !isRain,
        });
      })
      .catch(() => setWeather(null));
  }, []);

  if (!weather) return null;

  return (
    <div className={`rounded-lg px-3 py-2 text-xs ${
      weather.isGoodForOutdoor ? 'bg-success/10 text-success' : 'bg-accent-gold/10 text-accent-gold'
    }`}>
      {weather.description}
    </div>
  );
}
```

- [ ] **Step 2: Create HIIT timer component**

```typescript
// apps/web/components/hiit-timer.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { HIITProtocol, HIITInterval, TimerState } from '@fitforge/shared';
import { getCurrentWeek } from '@fitforge/shared';

interface HIITTimerProps {
  protocol: HIITProtocol;
  onComplete: (rounds: number, duration: number) => void;
}

export function HIITTimer({ protocol, onComplete }: HIITTimerProps) {
  const week = getCurrentWeek();
  const totalRounds = protocol.roundsPerWeek[week] || 8;

  const [state, setState] = useState<TimerState>('idle');
  const [currentRound, setCurrentRound] = useState(0);
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(-1); // -1 = warmup
  const [timeLeft, setTimeLeft] = useState(protocol.warmup);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  const playBeep = useCallback((frequency: number, duration: number) => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
    const ctx = audioContext.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.3;
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration / 1000);
  }, []);

  const getCurrentInterval = (): HIITInterval | null => {
    if (currentIntervalIndex < 0) return null;
    return protocol.intervals[currentIntervalIndex % protocol.intervals.length] || null;
  };

  const getPhaseLabel = (): string => {
    if (currentIntervalIndex === -1) return 'Warmup';
    if (state === 'completed') return 'Done!';
    const interval = getCurrentInterval();
    return interval?.name || '';
  };

  const advancePhase = useCallback(() => {
    if (currentIntervalIndex === -1) {
      // warmup done, start first interval
      setCurrentIntervalIndex(0);
      setCurrentRound(1);
      setTimeLeft(protocol.intervals[0].duration);
      playBeep(880, 200); // GO tone
      return;
    }

    const nextIndex = currentIntervalIndex + 1;
    const intervalsPerRound = protocol.intervals.length;

    if (nextIndex >= intervalsPerRound * totalRounds) {
      // All rounds complete — cooldown
      setState('completed');
      onComplete(totalRounds, totalElapsed);
      playBeep(440, 500);
      return;
    }

    const newRound = Math.floor(nextIndex / intervalsPerRound) + 1;
    setCurrentRound(newRound);
    setCurrentIntervalIndex(nextIndex);
    setTimeLeft(protocol.intervals[nextIndex % intervalsPerRound].duration);

    const interval = protocol.intervals[nextIndex % intervalsPerRound];
    if (interval.type === 'work') {
      playBeep(880, 200);
    } else {
      playBeep(440, 150);
    }
  }, [currentIntervalIndex, totalRounds, protocol, totalElapsed, onComplete, playBeep]);

  useEffect(() => {
    if (state !== 'running') return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          advancePhase();
          return 0;
        }
        if (prev <= 4 && prev > 1) {
          playBeep(660, 100); // countdown beeps
        }
        return prev - 1;
      });
      setTotalElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state, advancePhase, playBeep]);

  const start = () => {
    setState('running');
    if (currentIntervalIndex === -1) {
      setTimeLeft(protocol.warmup);
    }
  };

  const pause = () => setState('paused');
  const resume = () => setState('running');

  const reset = () => {
    setState('idle');
    setCurrentRound(0);
    setCurrentIntervalIndex(-1);
    setTimeLeft(protocol.warmup);
    setTotalElapsed(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const interval = getCurrentInterval();
  const isWork = interval?.type === 'work';

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Phase label */}
      <div className={`text-lg font-medium ${isWork ? 'text-accent-coral' : 'text-accent-teal'}`}>
        {getPhaseLabel()}
      </div>

      {/* Timer display */}
      <div className="text-7xl font-bold font-heading tabular-nums">
        {formatTime(timeLeft)}
      </div>

      {/* Round counter */}
      <div className="text-text-secondary text-sm">
        Round {currentRound} / {totalRounds}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {state === 'idle' && (
          <button onClick={start} className="bg-accent-coral hover:bg-accent-coral/90 text-white font-medium px-8 py-3 rounded-xl">
            Start
          </button>
        )}
        {state === 'running' && (
          <button onClick={pause} className="bg-accent-gold hover:bg-accent-gold/90 text-black font-medium px-8 py-3 rounded-xl">
            Pause
          </button>
        )}
        {state === 'paused' && (
          <>
            <button onClick={resume} className="bg-accent-coral hover:bg-accent-coral/90 text-white font-medium px-6 py-3 rounded-xl">
              Resume
            </button>
            <button onClick={reset} className="bg-bg-elevated text-text-secondary font-medium px-6 py-3 rounded-xl">
              Reset
            </button>
          </>
        )}
        {state === 'completed' && (
          <button onClick={reset} className="bg-bg-elevated text-text-secondary font-medium px-8 py-3 rounded-xl">
            Reset
          </button>
        )}
      </div>

      {/* Total elapsed */}
      <p className="text-text-muted text-xs">Total: {formatTime(totalElapsed)}</p>
    </div>
  );
}
```

- [ ] **Step 3: Create HIIT page**

```typescript
// apps/web/app/hiit/page.tsx
'use client';

import { useState } from 'react';
import { hiitProtocols, HIITOption, getCurrentWeek } from '@fitforge/shared';
import { HIITTimer } from '@/components/hiit-timer';
import { WeatherWidget } from '@/components/weather-widget';

export default function HIITPage() {
  const [selectedOption, setSelectedOption] = useState<HIITOption>('trackSprints');
  const week = getCurrentWeek();
  const protocol = hiitProtocols[selectedOption];

  const handleComplete = (rounds: number, duration: number) => {
    // TODO: save to Firestore
    console.log(`HIIT complete: ${rounds} rounds in ${duration}s`);
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">HIIT Timer</h1>
        <span className="text-xs text-text-muted">Monday only · Manohar C Watsa Stadium</span>
      </div>

      <WeatherWidget />

      {/* Option selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSelectedOption('trackSprints')}
          className={`p-3 rounded-xl text-left border transition-colors ${
            selectedOption === 'trackSprints'
              ? 'border-accent-coral/50 bg-accent-coral/5'
              : 'border-white/5 bg-bg-card'
          }`}
        >
          <p className="font-medium text-sm">Track Sprints</p>
          <p className="text-xs text-text-muted mt-1">Sprint 30s / Walk 90s</p>
        </button>
        <button
          onClick={() => setSelectedOption('seatingCircuit')}
          className={`p-3 rounded-xl text-left border transition-colors ${
            selectedOption === 'seatingCircuit'
              ? 'border-accent-coral/50 bg-accent-coral/5'
              : 'border-white/5 bg-bg-card'
          }`}
        >
          <p className="font-medium text-sm">Seating Circuit</p>
          <p className="text-xs text-text-muted mt-1">Bodyweight circuit</p>
        </button>
      </div>

      {/* Week info */}
      <div className="bg-bg-card rounded-xl p-3 border border-white/5 text-center">
        <p className="text-text-secondary text-sm">
          Week {week}: <span className="text-accent-teal font-medium">{protocol.roundsPerWeek[week]} rounds</span>
        </p>
      </div>

      {/* Timer */}
      <div className="bg-bg-card rounded-2xl p-8 border border-white/5">
        <HIITTimer protocol={protocol} onComplete={handleComplete} />
      </div>

      {/* Protocol details */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-medium text-text-muted mb-2">Exercises per round:</h3>
        <div className="space-y-1">
          {protocol.intervals.filter(i => i.type === 'work').map((interval, i) => (
            <p key={i} className="text-sm text-text-secondary">
              {interval.name} — {interval.duration}s
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/hiit/ apps/web/components/hiit-timer.tsx apps/web/components/weather-widget.tsx
git commit -m "feat: add HIIT timer page with audio beeps, round tracking, and weather widget"
```

---

## Task 10: Web App — Meal Plan Page

**Files:**
- Create: `apps/web/app/meals/page.tsx`
- Create: `apps/web/components/meal-card.tsx`
- Create: `apps/web/components/meal-source-toggle.tsx`
- Create: `apps/web/components/snack-grid.tsx`

- [ ] **Step 1: Create meal source toggle**

```typescript
// apps/web/components/meal-source-toggle.tsx
'use client';

import { MealSource } from '@fitforge/shared';

interface MealSourceToggleProps {
  selected: MealSource;
  onChange: (source: MealSource) => void;
}

export function MealSourceToggle({ selected, onChange }: MealSourceToggleProps) {
  const sources: { key: MealSource; label: string }[] = [
    { key: 'homeCooking', label: 'Home' },
    { key: 'campusEatery', label: 'Campus' },
    { key: 'restaurant', label: 'Restaurant' },
  ];

  return (
    <div className="flex bg-bg-elevated rounded-lg p-0.5">
      {sources.map(s => (
        <button
          key={s.key}
          onClick={() => onChange(s.key)}
          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
            selected === s.key ? 'bg-accent-coral text-white' : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create meal card component**

```typescript
// apps/web/components/meal-card.tsx
'use client';

import { Meal } from '@fitforge/shared';

interface MealCardProps {
  mealTime: string;
  meal: Meal;
  eaten: boolean;
  onToggleEaten: () => void;
}

export function MealCard({ mealTime, meal, eaten, onToggleEaten }: MealCardProps) {
  const timeLabels: Record<string, string> = {
    breakfast: '9:00 AM',
    midMorning: '11:30 AM',
    lunch: '12:30 PM',
    preWorkout: '4:30 PM',
    postWorkout: '7:00 PM',
    dinner: '9:00 PM',
  };

  return (
    <div className={`bg-bg-card rounded-xl p-4 border transition-colors ${
      eaten ? 'border-success/30' : 'border-white/5'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">{timeLabels[mealTime] || ''}</span>
            <span className="text-xs text-text-muted capitalize">{mealTime.replace(/([A-Z])/g, ' $1')}</span>
          </div>
          <h3 className="font-medium text-sm mt-1">{meal.name}</h3>
          <div className="flex gap-3 mt-1">
            <span className="text-xs text-accent-coral">{meal.calories} kcal</span>
            <span className="text-xs text-accent-teal">{meal.protein}g protein</span>
          </div>
        </div>
        <button
          onClick={onToggleEaten}
          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
            eaten ? 'bg-success/20 border-success text-success' : 'border-white/20'
          }`}
        >
          {eaten ? '✓' : ''}
        </button>
      </div>
      <div className="mt-2 space-y-0.5">
        {meal.items.map((item, i) => (
          <p key={i} className="text-xs text-text-muted">· {item}</p>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create snack grid component**

```typescript
// apps/web/components/snack-grid.tsx
'use client';

import { useState } from 'react';
import { snacks, Snack } from '@fitforge/shared';

export function SnackGrid() {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'campusVendor', label: 'Campus' },
    { key: 'homeStash', label: 'Home' },
    { key: 'fruit', label: 'Fruit' },
  ];

  const filtered = filter === 'all' ? snacks : snacks.filter(s => s.category === filter);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {categories.map(c => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`px-2.5 py-1 rounded-lg text-xs ${
              filter === c.key ? 'bg-accent-teal/10 text-accent-teal' : 'bg-bg-elevated text-text-muted'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {filtered.map((snack, i) => (
          <div key={i} className="bg-bg-card rounded-lg p-3 border border-white/5">
            <p className="text-sm font-medium">{snack.name}</p>
            <p className="text-xs text-accent-coral">{snack.calories} kcal</p>
            <p className="text-xs text-text-muted mt-1">{snack.when}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create meals page**

```typescript
// apps/web/app/meals/page.tsx
'use client';

import { useState } from 'react';
import { mealPlan, DayOfWeek, MealSource, MealTime, getDayOfWeek, DAILY_CALORIE_TARGET, DAILY_PROTEIN_TARGET } from '@fitforge/shared';
import { MealCard } from '@/components/meal-card';
import { MealSourceToggle } from '@/components/meal-source-toggle';
import { SnackGrid } from '@/components/snack-grid';

export default function MealsPage() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getDayOfWeek());
  const [source, setSource] = useState<MealSource>('homeCooking');
  const [eaten, setEaten] = useState<Record<string, boolean>>({});
  const [showSnacks, setShowSnacks] = useState(false);

  const dayPlan = mealPlan[selectedDay];
  const mealTimes: MealTime[] = ['breakfast', 'midMorning', 'lunch', 'preWorkout', 'postWorkout', 'dinner'];

  const days: { key: DayOfWeek; label: string }[] = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' },
  ];

  const totalCalories = mealTimes.reduce((sum, mt) => {
    if (eaten[mt]) return sum + dayPlan[mt].calories;
    return sum;
  }, 0);

  const totalProtein = mealTimes.reduce((sum, mt) => {
    if (eaten[mt]) return sum + dayPlan[mt].protein;
    return sum;
  }, 0);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Meal Plan</h1>

      {/* Day selector */}
      <div className="flex gap-1 overflow-x-auto">
        {days.map(d => (
          <button
            key={d.key}
            onClick={() => setSelectedDay(d.key)}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
              selectedDay === d.key ? 'bg-accent-coral text-white' : 'bg-bg-card text-text-muted'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <MealSourceToggle selected={source} onChange={setSource} />

      {/* Daily totals */}
      <div className="bg-bg-card rounded-xl p-3 border border-white/5 flex justify-between items-center">
        <div>
          <span className="text-sm text-text-secondary">Eaten: </span>
          <span className="text-accent-coral font-medium">{totalCalories}</span>
          <span className="text-text-muted text-xs"> / {DAILY_CALORIE_TARGET} kcal</span>
        </div>
        <div>
          <span className="text-accent-teal font-medium">{totalProtein}</span>
          <span className="text-text-muted text-xs"> / {DAILY_PROTEIN_TARGET}g protein</span>
        </div>
      </div>

      {/* Meal cards */}
      <div className="space-y-3">
        {mealTimes.map(mt => (
          <MealCard
            key={mt}
            mealTime={mt}
            meal={dayPlan[mt]}
            eaten={eaten[mt] || false}
            onToggleEaten={() => setEaten(prev => ({ ...prev, [mt]: !prev[mt] }))}
          />
        ))}
      </div>

      {/* Snack library toggle */}
      <button
        onClick={() => setShowSnacks(!showSnacks)}
        className="w-full bg-bg-card rounded-xl p-3 border border-white/5 text-sm text-text-secondary text-center"
      >
        {showSnacks ? 'Hide' : 'Show'} Snack Library
      </button>
      {showSnacks && <SnackGrid />}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/meals/ apps/web/components/meal-card.tsx apps/web/components/meal-source-toggle.tsx apps/web/components/snack-grid.tsx
git commit -m "feat: add meal plan page with day selector, source toggle, and snack library"
```

---

## Task 11: Web App — Progress Tracker Page

**Files:**
- Create: `apps/web/app/progress/page.tsx`
- Create: `apps/web/components/weight-chart.tsx`
- Create: `apps/web/components/session-heatmap.tsx`
- Create: `apps/web/hooks/use-progress.ts`

- [ ] **Step 1: Create progress hook**

```typescript
// apps/web/hooks/use-progress.ts
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';
import { WeighIn } from '@fitforge/shared';
import { subscribeToProgress, saveWeighIn } from '@fitforge/shared';

export function useProgress() {
  const { user } = useAuth();
  const [weighIns, setWeighIns] = useState<WeighIn[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToProgress(user.uid, setWeighIns);
    return unsub;
  }, [user]);

  const addWeighIn = async (weighIn: WeighIn) => {
    if (!user) return;
    await saveWeighIn(user.uid, weighIn);
  };

  return { weighIns, addWeighIn };
}
```

- [ ] **Step 2: Create weight chart component**

```typescript
// apps/web/components/weight-chart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { WeighIn } from '@fitforge/shared';

interface WeightChartProps {
  weighIns: WeighIn[];
  targetWeight: number;
  startWeight: number;
}

export function WeightChart({ weighIns, targetWeight, startWeight }: WeightChartProps) {
  const data = weighIns.map(w => ({
    date: w.date.slice(5), // "05-10" format
    weight: w.weight,
    waist: w.waistCm,
    arm: w.armCm,
  }));

  if (data.length === 0) {
    data.push({ date: 'Start', weight: startWeight, waist: 0, arm: 0 });
  }

  return (
    <div className="bg-bg-card rounded-xl p-4 border border-white/5">
      <h3 className="text-sm font-medium text-text-muted mb-4">Weight Progress</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#252540" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6b6b7b' }} />
          <YAxis domain={[targetWeight - 1, startWeight + 1]} tick={{ fontSize: 10, fill: '#6b6b7b' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            labelStyle={{ color: '#a0a0b0' }}
          />
          <ReferenceLine y={targetWeight} stroke="#4ecdc4" strokeDasharray="5 5" label={{ value: 'Target', fill: '#4ecdc4', fontSize: 10 }} />
          <Line type="monotone" dataKey="weight" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

- [ ] **Step 3: Create session heatmap component**

```typescript
// apps/web/components/session-heatmap.tsx
'use client';

interface SessionHeatmapProps {
  sessions: Record<string, string[]>; // date → ["gym", "swim", "hiit"]
}

export function SessionHeatmap({ sessions }: SessionHeatmapProps) {
  const startDate = new Date('2025-05-10');
  const endDate = new Date('2025-06-14');
  const days: { date: string; activities: string[] }[] = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    days.push({ date: dateStr, activities: sessions[dateStr] || [] });
  }

  const getIntensity = (activities: string[]): string => {
    if (activities.length === 0) return 'bg-bg-elevated';
    if (activities.length === 1) return 'bg-accent-teal/30';
    if (activities.length === 2) return 'bg-accent-teal/60';
    return 'bg-accent-teal';
  };

  return (
    <div className="bg-bg-card rounded-xl p-4 border border-white/5">
      <h3 className="text-sm font-medium text-text-muted mb-3">Session Activity</h3>
      <div className="grid grid-cols-7 gap-1">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className="text-xs text-text-muted text-center">{d}</span>
        ))}
        {days.map((day, i) => (
          <div
            key={day.date}
            className={`w-full aspect-square rounded-sm ${getIntensity(day.activities)}`}
            title={`${day.date}: ${day.activities.join(', ') || 'rest'}`}
          />
        ))}
      </div>
      <div className="flex gap-2 mt-3 text-xs text-text-muted">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-bg-elevated" /> Rest</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-accent-teal/30" /> 1</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-accent-teal/60" /> 2</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-accent-teal" /> 3+</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create progress page**

```typescript
// apps/web/app/progress/page.tsx
'use client';

import { useState } from 'react';
import { WeighIn } from '@fitforge/shared';
import { getToday } from '@fitforge/shared';
import { WeightChart } from '@/components/weight-chart';
import { SessionHeatmap } from '@/components/session-heatmap';
import { useProgress } from '@/hooks/use-progress';

export default function ProgressPage() {
  const { weighIns, addWeighIn } = useProgress();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ weight: '', waist: '', arm: '' });

  const handleSubmit = async () => {
    if (!formData.weight) return;
    const weighIn: WeighIn = {
      date: getToday(),
      weight: Number(formData.weight),
      waistCm: Number(formData.waist) || 0,
      armCm: Number(formData.arm) || 0,
    };
    await addWeighIn(weighIn);
    setFormData({ weight: '', waist: '', arm: '' });
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Progress</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-accent-coral hover:bg-accent-coral/90 text-white text-xs font-medium px-3 py-1.5 rounded-lg"
        >
          + Weigh In
        </button>
      </div>

      {showForm && (
        <div className="bg-bg-card rounded-xl p-4 border border-accent-coral/30 space-y-3">
          <h3 className="text-sm font-medium">Monday Weigh-In</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-text-muted">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={e => setFormData(p => ({ ...p, weight: e.target.value }))}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="63.5"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted">Waist (cm)</label>
              <input
                type="number"
                step="0.5"
                value={formData.waist}
                onChange={e => setFormData(p => ({ ...p, waist: e.target.value }))}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="84"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted">Arm (cm)</label>
              <input
                type="number"
                step="0.5"
                value={formData.arm}
                onChange={e => setFormData(p => ({ ...p, arm: e.target.value }))}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="29"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-accent-teal hover:bg-accent-teal/90 text-black font-medium py-2 rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      )}

      <WeightChart weighIns={weighIns} targetWeight={62.8} startWeight={68.8} />

      {/* Measurements summary */}
      {weighIns.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-bg-card rounded-xl p-3 border border-white/5 text-center">
            <p className="text-xl font-bold text-accent-coral">{weighIns[weighIns.length - 1].weight}</p>
            <p className="text-xs text-text-muted">Current kg</p>
          </div>
          <div className="bg-bg-card rounded-xl p-3 border border-white/5 text-center">
            <p className="text-xl font-bold text-accent-teal">{weighIns[weighIns.length - 1].waistCm || '-'}</p>
            <p className="text-xs text-text-muted">Waist cm</p>
          </div>
          <div className="bg-bg-card rounded-xl p-3 border border-white/5 text-center">
            <p className="text-xl font-bold text-accent-gold">{weighIns[weighIns.length - 1].armCm || '-'}</p>
            <p className="text-xs text-text-muted">Arm cm</p>
          </div>
        </div>
      )}

      <SessionHeatmap sessions={{}} />
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/progress/ apps/web/components/weight-chart.tsx apps/web/components/session-heatmap.tsx apps/web/hooks/use-progress.ts
git commit -m "feat: add progress tracker with weight chart, measurements, and session heatmap"
```

---

## Task 12: Web App — Swim, Schedule, Health, Recipes Pages

**Files:**
- Create: `apps/web/app/swim/page.tsx`
- Create: `apps/web/app/schedule/page.tsx`
- Create: `apps/web/app/health/page.tsx`
- Create: `apps/web/app/recipes/page.tsx`
- Create: `apps/web/components/lap-counter.tsx`
- Create: `apps/web/components/schedule-timeline.tsx`
- Create: `apps/web/components/hydration-tracker.tsx`
- Create: `apps/web/components/recipe-card.tsx`

- [ ] **Step 1: Create lap counter**

```typescript
// apps/web/components/lap-counter.tsx
'use client';

import { useState } from 'react';

export function LapCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-bg-card rounded-xl p-6 border border-white/5 text-center">
      <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Laps</p>
      <p className="text-5xl font-bold text-accent-teal">{count}</p>
      <div className="flex gap-3 mt-4 justify-center">
        <button
          onClick={() => setCount(c => Math.max(0, c - 1))}
          className="w-12 h-12 rounded-full bg-bg-elevated text-text-secondary text-xl"
        >
          -
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="w-12 h-12 rounded-full bg-accent-teal text-black text-xl font-bold"
        >
          +
        </button>
      </div>
      <button onClick={() => setCount(0)} className="mt-3 text-xs text-text-muted underline">
        Reset
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create swim page**

```typescript
// apps/web/app/swim/page.tsx
'use client';

import { swimPlan, getCurrentWeek } from '@fitforge/shared';
import { LapCounter } from '@/components/lap-counter';

export default function SwimPage() {
  const week = getCurrentWeek();
  const plan = swimPlan[Math.min(week - 1, swimPlan.length - 1)];

  const strokeColors: Record<string, string> = {
    freestyle: 'bg-accent-coral/10 text-accent-coral',
    breaststroke: 'bg-accent-teal/10 text-accent-teal',
    backstroke: 'bg-accent-gold/10 text-accent-gold',
    kickboard: 'bg-blue-500/10 text-blue-400',
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Swim Plan</h1>
      <p className="text-text-muted text-sm">Week {week} · Target: {plan.totalLaps} laps · Tue-Sat, 6-7 PM</p>

      {/* Breath control tip */}
      <div className="bg-accent-teal/5 rounded-xl p-4 border border-accent-teal/20">
        <p className="text-xs font-medium text-accent-teal uppercase tracking-wider mb-1">Breath Control Tip</p>
        <p className="text-sm text-text-secondary">{plan.breathControlTip}</p>
      </div>

      <LapCounter />

      {/* Session structure */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-muted">Session Structure</h3>

        <div className="space-y-2">
          <p className="text-xs text-text-muted uppercase">Warmup</p>
          {plan.warmup.map((seg, i) => (
            <div key={i} className="bg-bg-card rounded-lg p-3 border border-white/5 flex items-center justify-between">
              <div>
                <span className={`text-xs px-2 py-0.5 rounded ${strokeColors[seg.stroke]}`}>{seg.stroke}</span>
                <span className="text-sm text-text-secondary ml-2">{seg.laps} laps ({seg.pace})</span>
              </div>
              {seg.notes && <p className="text-xs text-text-muted max-w-[50%] text-right">{seg.notes}</p>}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs text-text-muted uppercase">Main Set</p>
          {plan.mainSet.map((seg, i) => (
            <div key={i} className="bg-bg-card rounded-lg p-3 border border-white/5 flex items-center justify-between">
              <div>
                <span className={`text-xs px-2 py-0.5 rounded ${strokeColors[seg.stroke]}`}>{seg.stroke}</span>
                <span className="text-sm text-text-secondary ml-2">{seg.laps} laps ({seg.pace})</span>
              </div>
              {seg.notes && <p className="text-xs text-text-muted max-w-[50%] text-right">{seg.notes}</p>}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs text-text-muted uppercase">Cooldown</p>
          {plan.cooldown.map((seg, i) => (
            <div key={i} className="bg-bg-card rounded-lg p-3 border border-white/5 flex items-center justify-between">
              <div>
                <span className={`text-xs px-2 py-0.5 rounded ${strokeColors[seg.stroke]}`}>{seg.stroke}</span>
                <span className="text-sm text-text-secondary ml-2">{seg.laps} laps</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create schedule timeline**

```typescript
// apps/web/components/schedule-timeline.tsx
'use client';

import { TimeBlock, BlockCategory } from '@fitforge/shared';

interface ScheduleTimelineProps {
  blocks: TimeBlock[];
}

const categoryStyles: Record<BlockCategory, string> = {
  gym: 'border-l-blue-500 bg-blue-500/5',
  swim: 'border-l-accent-teal bg-accent-teal/5',
  hiit: 'border-l-accent-coral bg-accent-coral/5',
  work: 'border-l-gray-500 bg-gray-500/5',
  meal: 'border-l-amber-500 bg-amber-500/5',
  rest: 'border-l-green-500 bg-green-500/5',
  commute: 'border-l-purple-500 bg-purple-500/5',
  sleep: 'border-l-indigo-500 bg-indigo-500/5',
};

export function ScheduleTimeline({ blocks }: ScheduleTimelineProps) {
  return (
    <div className="space-y-1">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`border-l-4 rounded-r-lg px-3 py-2 ${categoryStyles[block.category]}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">{block.label}</span>
            <span className="text-xs text-text-muted">{block.startTime} - {block.endTime}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create schedule page**

```typescript
// apps/web/app/schedule/page.tsx
'use client';

import { getDayOfWeek, dayToTemplate, scheduleTemplates } from '@fitforge/shared';
import { ScheduleTimeline } from '@/components/schedule-timeline';

export default function SchedulePage() {
  const today = getDayOfWeek();
  const templateKey = dayToTemplate[today];
  const schedule = scheduleTemplates[templateKey];

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Today's Schedule</h1>
      <p className="text-text-muted text-sm capitalize">{today} — {schedule.dayType.replace(/([A-Z])/g, ' $1')}</p>

      <ScheduleTimeline blocks={schedule.blocks} />
    </div>
  );
}
```

- [ ] **Step 5: Create hydration tracker**

```typescript
// apps/web/components/hydration-tracker.tsx
'use client';

import { useState } from 'react';

interface HydrationTrackerProps {
  target: number;
  initial?: number;
}

export function HydrationTracker({ target, initial = 0 }: HydrationTrackerProps) {
  const [glasses, setGlasses] = useState(initial);

  return (
    <div className="bg-bg-card rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-muted">Hydration</h3>
        <span className="text-xs text-accent-teal">{glasses}/{target} glasses (3.5L)</span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: target }, (_, i) => (
          <button
            key={i}
            onClick={() => setGlasses(i + 1 === glasses ? i : i + 1)}
            className={`aspect-square rounded-lg flex items-center justify-center text-lg transition-colors ${
              i < glasses ? 'bg-accent-teal/20 text-accent-teal' : 'bg-bg-elevated text-text-muted'
            }`}
          >
            {i < glasses ? '●' : '○'}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create health page**

```typescript
// apps/web/app/health/page.tsx
'use client';

import { useState } from 'react';
import { HydrationTracker } from '@/components/hydration-tracker';

export default function HealthPage() {
  const [sleep, setSleep] = useState({ bedTime: '', wakeTime: '' });
  const [supplements, setSupplements] = useState({ creatine: false, vitaminD: false, magnesium: false });

  const byElevenThirty = sleep.bedTime && sleep.bedTime <= '23:30';

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Health & Recovery</h1>

      {/* Sleep */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-medium text-text-muted mb-3">Sleep</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-text-muted">Bedtime</label>
            <input
              type="time"
              value={sleep.bedTime}
              onChange={e => setSleep(p => ({ ...p, bedTime: e.target.value }))}
              className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-text-muted">Wake time</label>
            <input
              type="time"
              value={sleep.wakeTime}
              onChange={e => setSleep(p => ({ ...p, wakeTime: e.target.value }))}
              className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm mt-1"
            />
          </div>
        </div>
        {sleep.bedTime && (
          <p className={`text-xs mt-2 ${byElevenThirty ? 'text-success' : 'text-danger'}`}>
            {byElevenThirty ? '✓ In bed by 11:30 PM' : '✗ Past 11:30 PM — cortisol impact'}
          </p>
        )}
      </div>

      <HydrationTracker target={14} />

      {/* Supplements */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-medium text-text-muted mb-3">Supplements</h3>
        <div className="space-y-2">
          {[
            { key: 'creatine' as const, label: 'Creatine (5g)', note: 'With water, daily' },
            { key: 'vitaminD' as const, label: 'Vitamin D3 (2000 IU)', note: 'With meal' },
            { key: 'magnesium' as const, label: 'Magnesium Glycinate (300mg)', note: 'Before bed' },
          ].map(supp => (
            <label key={supp.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm">{supp.label}</p>
                <p className="text-xs text-text-muted">{supp.note}</p>
              </div>
              <button
                onClick={() => setSupplements(p => ({ ...p, [supp.key]: !p[supp.key] }))}
                className={`w-6 h-6 rounded border flex items-center justify-center ${
                  supplements[supp.key] ? 'bg-success/20 border-success text-success' : 'border-white/20'
                }`}
              >
                {supplements[supp.key] ? '✓' : ''}
              </button>
            </label>
          ))}
        </div>
      </div>

      {/* Recovery tips */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-medium text-text-muted mb-2">Recovery Reminders</h3>
        <ul className="space-y-1 text-xs text-text-secondary">
          <li>· DOMS peaks 24-48 hours after session — do NOT skip gym</li>
          <li>· Post-swim: stretch chest, bicep, shoulder, hamstring (5 min)</li>
          <li>· Cold shower after gym (2 min) — activates brown fat</li>
          <li>· Sharp pain ≠ soreness. If sharp, rest that muscle.</li>
          <li>· Saturday foam rolling: quads, IT band, upper back</li>
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create recipe card component**

```typescript
// apps/web/components/recipe-card.tsx
'use client';

import { useState } from 'react';
import { Recipe } from '@fitforge/shared';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);

  const cuisineColors: Record<string, string> = {
    indian: 'bg-accent-gold/10 text-accent-gold',
    continental: 'bg-blue-500/10 text-blue-400',
    mexican: 'bg-accent-coral/10 text-accent-coral',
    thai: 'bg-green-500/10 text-green-400',
    mediterranean: 'bg-accent-teal/10 text-accent-teal',
  };

  return (
    <div className="bg-bg-card rounded-xl border border-white/5 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm">{recipe.name}</h3>
            <div className="flex gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded ${cuisineColors[recipe.cuisine]}`}>{recipe.cuisine}</span>
              {recipe.isBeginnerFriendly && (
                <span className="text-xs px-2 py-0.5 rounded bg-success/10 text-success">Beginner</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-accent-coral">{recipe.calories} kcal</p>
            <p className="text-xs text-accent-teal">{recipe.protein}g protein</p>
            <p className="text-xs text-text-muted">{recipe.cookTime} min</p>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
          <div>
            <p className="text-xs font-medium text-text-muted mb-1">Ingredients:</p>
            <ul className="space-y-0.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-xs text-text-secondary">· {ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted mb-1">Steps:</p>
            <ol className="space-y-1">
              {recipe.steps.map((step, i) => (
                <li key={i} className="text-xs text-text-secondary">{i + 1}. {step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 8: Create recipes page**

```typescript
// apps/web/app/recipes/page.tsx
'use client';

import { useState } from 'react';
import { recipes } from '@fitforge/shared';
import { RecipeCard } from '@/components/recipe-card';

export default function RecipesPage() {
  const [filter, setFilter] = useState<string>('all');

  const cuisines = ['all', 'indian', 'continental', 'mexican', 'thai', 'mediterranean'];
  const filtered = filter === 'all' ? recipes : recipes.filter(r => r.cuisine === filter);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Recipes</h1>
      <p className="text-text-muted text-sm">Quick protein-rich meals under 20 min</p>

      <div className="flex gap-2 flex-wrap">
        {cuisines.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-2.5 py-1 rounded-lg text-xs capitalize ${
              filter === c ? 'bg-accent-coral text-white' : 'bg-bg-card text-text-muted'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Commit**

```bash
git add apps/web/app/swim/ apps/web/app/schedule/ apps/web/app/health/ apps/web/app/recipes/ apps/web/components/lap-counter.tsx apps/web/components/schedule-timeline.tsx apps/web/components/hydration-tracker.tsx apps/web/components/recipe-card.tsx
git commit -m "feat: add swim, schedule, health, and recipes pages"
```

---

## Task 13: Mobile App — Core Setup + Screens

**Files:**
- Create: `apps/mobile/app/_layout.tsx`
- Create: `apps/mobile/app/(auth)/login.tsx`
- Create: `apps/mobile/app/(tabs)/_layout.tsx`
- Create: `apps/mobile/app/(tabs)/index.tsx`
- Create: `apps/mobile/app/(tabs)/gym.tsx`
- Create: `apps/mobile/app/(tabs)/meals.tsx`
- Create: `apps/mobile/app/(tabs)/progress.tsx`
- Create: `apps/mobile/app/(tabs)/more.tsx`
- Create: `apps/mobile/hooks/use-auth.ts`

- [ ] **Step 1: Create mobile auth hook**

```typescript
// apps/mobile/hooks/use-auth.ts
import { useState, useEffect, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange } from '@fitforge/shared';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { getFirebaseAuth } from '@fitforge/shared';

WebBrowser.maybeCompleteAuthSession();

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function useAuth(): AuthState {
  return useContext(AuthContext);
}

export function useAuthProvider(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(getFirebaseAuth(), credential);
    }
  }, [response]);

  const handleSignIn = async () => {
    await promptAsync();
  };

  const handleSignOut = async () => {
    const { signOut } = await import('@fitforge/shared');
    await signOut();
  };

  return { user, loading, signIn: handleSignIn, signOut: handleSignOut };
}
```

- [ ] **Step 2: Create root layout**

```typescript
// apps/mobile/app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthContext, useAuthProvider } from '../hooks/use-auth';

export default function RootLayout() {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0a0a0f' } }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthContext.Provider>
  );
}
```

- [ ] **Step 3: Create tab layout**

```typescript
// apps/mobile/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1a1a2e', borderTopColor: 'rgba(255,255,255,0.05)' },
        tabBarActiveTintColor: '#ff6b6b',
        tabBarInactiveTintColor: '#6b6b7b',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: () => <Text>◉</Text> }} />
      <Tabs.Screen name="gym" options={{ title: 'Gym', tabBarIcon: () => <Text>◎</Text> }} />
      <Tabs.Screen name="meals" options={{ title: 'Meals', tabBarIcon: () => <Text>◈</Text> }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarIcon: () => <Text>◐</Text> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: () => <Text>◑</Text> }} />
    </Tabs>
  );
}
```

- [ ] **Step 4: Create login screen**

```typescript
// apps/mobile/app/(auth)/login.tsx
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../../hooks/use-auth';
import { Redirect } from 'expo-router';

export default function LoginScreen() {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0f' }}>
        <Text style={{ color: '#ff6b6b', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  if (user) return <Redirect href="/(tabs)" />;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0f', padding: 24 }}>
      <Text style={{ color: '#ff6b6b', fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>FitForge</Text>
      <Text style={{ color: '#a0a0b0', fontSize: 14, marginBottom: 40 }}>32-Day Body Transformation</Text>
      <Pressable
        onPress={signIn}
        style={{ backgroundColor: '#ff6b6b', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 }}
      >
        <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 16 }}>Sign in with Google</Text>
      </Pressable>
    </View>
  );
}
```

- [ ] **Step 5: Create mobile dashboard screen**

```typescript
// apps/mobile/app/(tabs)/index.tsx
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/use-auth';
import {
  getDaysToPlanEnd, getDaysToConvocation, getCurrentPhase, getPhaseLabel,
  getDayOfWeek, getGymDay, isSwimDay, isHIITDay, gymPlan,
  DAILY_CALORIE_TARGET, DAILY_PROTEIN_TARGET, motivationalQuotes,
} from '@fitforge/shared';

export default function DashboardScreen() {
  const { user } = useAuth();
  const today = getDayOfWeek();
  const gymDay = getGymDay();
  const phase = getCurrentPhase();
  const todayPlan = gymDay ? gymPlan[phase].days[gymDay] : null;
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const quote = motivationalQuotes[dayOfYear % motivationalQuotes.length];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
        Hey, {user?.displayName?.split(' ')[0]}
      </Text>
      <Text style={{ color: '#6b6b7b', fontSize: 12, textTransform: 'capitalize', marginTop: 4 }}>{today}</Text>

      {/* Countdown */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
        <View style={{ flex: 1, backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16 }}>
          <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase' }}>Plan Ends</Text>
          <Text style={{ color: '#ff6b6b', fontSize: 28, fontWeight: 'bold' }}>{getDaysToPlanEnd()}</Text>
          <Text style={{ color: '#a0a0b0', fontSize: 10 }}>days left</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16 }}>
          <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase' }}>Convocation</Text>
          <Text style={{ color: '#4ecdc4', fontSize: 28, fontWeight: 'bold' }}>{getDaysToConvocation()}</Text>
          <Text style={{ color: '#a0a0b0', fontSize: 10 }}>days to June 14</Text>
        </View>
      </View>

      {/* Phase badge */}
      <View style={{ marginTop: 12, backgroundColor: '#1a1a2e', borderRadius: 8, padding: 8, alignSelf: 'flex-start' }}>
        <Text style={{ color: '#4ecdc4', fontSize: 11 }}>{getPhaseLabel(phase)}</Text>
      </View>

      {/* Today's workout */}
      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 16 }}>
        <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase', marginBottom: 8 }}>Today's Training</Text>
        {todayPlan ? (
          <>
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>{todayPlan.name}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <View style={{ backgroundColor: 'rgba(59,130,246,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                <Text style={{ color: '#60a5fa', fontSize: 10 }}>Gym</Text>
              </View>
              {isSwimDay() && (
                <View style={{ backgroundColor: 'rgba(78,205,196,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                  <Text style={{ color: '#4ecdc4', fontSize: 10 }}>Swim 6-7 PM</Text>
                </View>
              )}
              {isHIITDay() && (
                <View style={{ backgroundColor: 'rgba(255,107,107,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                  <Text style={{ color: '#ff6b6b', fontSize: 10 }}>HIIT</Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <Text style={{ color: '#a0a0b0', fontSize: 14 }}>
            {today === 'saturday' ? 'Active Recovery + Swim' : 'Full Rest Day'}
          </Text>
        )}
      </View>

      {/* Nutrition */}
      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 12 }}>
        <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase', marginBottom: 8 }}>Nutrition Target</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: '#ff6b6b', fontSize: 22, fontWeight: 'bold' }}>{DAILY_CALORIE_TARGET}</Text>
            <Text style={{ color: '#6b6b7b', fontSize: 10 }}>kcal target</Text>
          </View>
          <View>
            <Text style={{ color: '#4ecdc4', fontSize: 22, fontWeight: 'bold' }}>{DAILY_PROTEIN_TARGET}g</Text>
            <Text style={{ color: '#6b6b7b', fontSize: 10 }}>protein target</Text>
          </View>
        </View>
      </View>

      {/* Quote */}
      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 12 }}>
        <Text style={{ color: '#a0a0b0', fontSize: 12, fontStyle: 'italic' }}>"{quote}"</Text>
      </View>
    </ScrollView>
  );
}
```

- [ ] **Step 6: Create stub screens for gym, meals, progress, more**

```typescript
// apps/mobile/app/(tabs)/gym.tsx
import { View, Text, ScrollView } from 'react-native';
import { gymPlan, getCurrentPhase, getGymDay } from '@fitforge/shared';

export default function GymScreen() {
  const phase = getCurrentPhase();
  const gymDay = getGymDay();
  const dayPlan = gymDay ? gymPlan[phase].days[gymDay] : null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Gym Plan</Text>
      {dayPlan && (
        <>
          <Text style={{ color: '#a0a0b0', fontSize: 14, marginTop: 8 }}>{dayPlan.name}</Text>
          {dayPlan.exercises.map((ex, i) => (
            <View key={ex.id} style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 14, marginTop: 8 }}>
              <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '500' }}>{i + 1}. {ex.name}</Text>
              <Text style={{ color: '#6b6b7b', fontSize: 11, marginTop: 2 }}>
                {ex.sets} × {ex.reps} · {ex.startWeight} · Rest {ex.rest}
              </Text>
              {ex.cue && <Text style={{ color: '#4ecdc4', fontSize: 10, marginTop: 4, fontStyle: 'italic' }}>{ex.cue}</Text>}
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}
```

```typescript
// apps/mobile/app/(tabs)/meals.tsx
import { View, Text, ScrollView } from 'react-native';
import { mealPlan, getDayOfWeek, DayOfWeek, MealTime } from '@fitforge/shared';

export default function MealsScreen() {
  const today = getDayOfWeek();
  const dayPlan = mealPlan[today];
  const mealTimes: MealTime[] = ['breakfast', 'midMorning', 'lunch', 'preWorkout', 'postWorkout', 'dinner'];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Meals</Text>
      <Text style={{ color: '#6b6b7b', fontSize: 12, textTransform: 'capitalize', marginTop: 4 }}>{today}</Text>
      {mealTimes.map(mt => (
        <View key={mt} style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 14, marginTop: 8 }}>
          <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'capitalize' }}>{mt.replace(/([A-Z])/g, ' $1')}</Text>
          <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '500', marginTop: 2 }}>{dayPlan[mt].name}</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
            <Text style={{ color: '#ff6b6b', fontSize: 10 }}>{dayPlan[mt].calories} kcal</Text>
            <Text style={{ color: '#4ecdc4', fontSize: 10 }}>{dayPlan[mt].protein}g protein</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
```

```typescript
// apps/mobile/app/(tabs)/progress.tsx
import { View, Text } from 'react-native';

export default function ProgressScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0f', padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Progress</Text>
      <Text style={{ color: '#a0a0b0', fontSize: 14, marginTop: 8 }}>Weight chart and measurements coming here.</Text>
    </View>
  );
}
```

```typescript
// apps/mobile/app/(tabs)/more.tsx
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function MoreScreen() {
  const items = [
    { href: '/swim', label: 'Swim Plan', desc: 'Lap tracking + breath tips' },
    { href: '/hiit', label: 'HIIT Timer', desc: 'Monday interval timer' },
    { href: '/schedule', label: 'Schedule', desc: 'Daily timeline' },
    { href: '/health', label: 'Health', desc: 'Sleep, hydration, recovery' },
    { href: '/recipes', label: 'Recipes', desc: '8 quick protein meals' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>More</Text>
      {items.map(item => (
        <Link key={item.href} href={item.href as any} asChild>
          <Pressable style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 8 }}>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '500' }}>{item.label}</Text>
            <Text style={{ color: '#6b6b7b', fontSize: 11, marginTop: 2 }}>{item.desc}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add apps/mobile/
git commit -m "feat: add mobile app with auth, tabs, dashboard, gym, meals, progress, and more screens"
```

---

## Task 14: Integration Testing + Final Polish

**Files:**
- Modify: Various files for fixes found during integration testing

- [ ] **Step 1: Verify web app builds**

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm --filter @fitforge/web build`
Expected: Build succeeds. Fix any TypeScript errors.

- [ ] **Step 2: Verify mobile app type-checks**

Run: `cd /Users/shriprasad/Downloads/fitforge && pnpm --filter @fitforge/mobile lint`
Expected: No TypeScript errors. Fix any import resolution issues.

- [ ] **Step 3: Test web app in browser**

Run: `pnpm --filter @fitforge/web dev`
- Navigate to each page: /, /gym, /meals, /swim, /hiit, /progress, /schedule, /health, /recipes
- Verify navigation works (mobile bottom nav + desktop sidebar)
- Verify HIIT timer starts/stops with audio
- Verify exercise cards expand/collapse

- [ ] **Step 4: Create Firebase project (manual step for user)**

Instructions for user:
1. Go to https://console.firebase.google.com
2. Create project "fitforge"
3. Enable Authentication → Google Sign-In
4. Create Firestore database (start in test mode initially)
5. Get web config keys → add to `apps/web/.env.local`
6. Get Android/iOS client IDs → add to `apps/mobile/.env`

- [ ] **Step 5: Deploy Firestore rules**

Run: `cd /Users/shriprasad/Downloads/fitforge/firebase && npx firebase deploy --only firestore:rules`

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: integration fixes and final polish"
```

---

## Summary of Deliverables

After all 14 tasks:
- Monorepo with shared types and data
- Complete web app (9 pages, all functional)
- Mobile app (5 tab screens + 5 additional screens)
- Firebase Auth (Google) + Firestore with real-time sync
- HIIT timer with Web Audio API beeps
- Progressive overload tracking with safety warnings
- 7-day rotating meal plan with source toggle (home/campus/restaurant)
- Swim plan adapted for learning-intermediate level
- Progress charts (weight, measurements, session heatmap)
- Daily schedule timeline
- Health tracking (sleep, hydration, supplements)
- Recipe browser with filters
- Weather integration for outdoor HIIT
- Offline-capable via Firestore persistence
