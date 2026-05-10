# FitForge — 32-Day Fitness Tracker

## Overview

A cross-platform fitness tracking application for a 32-day body transformation plan (May 10 – June 11, 2025), targeting convocation on June 14 and a Europe trip. The app serves as a daily companion for gym workouts, swimming, HIIT, meal planning, and progress tracking.

**User context:** MS student at IITM Madras. Lives off-campus (home, not hostel). Can use campus gym, campus pool, Manohar C Watsa Stadium, campus eateries, and nearby restaurants. Primary goal: lose 5-6+ kg of belly fat, build visible muscle (shoulders, arms, core), look super fit by June 14.

**Swimming level:** Learning intermediate — 60-70% correct arm/leg movements, needs breath control practice. Not a beginner, not yet a comfortable swimmer.

---

## Architecture

### Monorepo Structure

```
fitforge/
├── packages/
│   └── shared/          # Types, Firebase config, data models, constants
│       ├── src/
│       │   ├── types/       # TypeScript interfaces
│       │   ├── firebase/    # Firebase init, auth, Firestore helpers
│       │   ├── data/        # Static plan data (exercises, meals, schedule)
│       │   └── utils/       # Date helpers, calorie calculations
│       └── package.json
├── apps/
│   ├── web/             # Next.js 14 web app
│   │   ├── app/         # App router pages
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom hooks (useFirestore, useAuth, etc.)
│   │   └── public/      # Static assets, sounds
│   └── mobile/          # React Native (Expo) app
│       ├── app/         # Expo Router screens
│       ├── components/  # RN components
│       ├── hooks/       # Shared hooks adapted for RN
│       └── assets/      # Sounds, images
├── firebase/
│   ├── firestore.rules
│   └── firebase.json
└── package.json         # Workspace root (pnpm)
```

### Tech Stack

| Layer | Web | Mobile |
|-------|-----|--------|
| Framework | Next.js 14 (App Router) | Expo SDK 52 + Expo Router |
| Styling | TailwindCSS | NativeWind (Tailwind for RN) |
| Charts | Recharts | react-native-chart-kit |
| Timer audio | Web Audio API | expo-av |
| State | React Context + Firestore listeners | Same |
| Auth | Firebase Auth (Google) | Firebase Auth (Google, expo-auth-session) |
| Database | Cloud Firestore | Cloud Firestore |
| Offline | Firestore persistence | Firestore persistence |
| Package manager | pnpm workspaces | pnpm workspaces |
| Deployment | Vercel (web) | EAS Build (mobile) |

### Firebase Data Model

```
users/{uid}/
├── profile/
│   ├── name, height, startWeight, targetWeight
│   ├── startDate: "2025-05-10"
│   └── swimmingLevel: "learning-intermediate"
├── progress/
│   ├── weeklyWeighIns: [{date, weight, waistCm, armCm}]
│   ├── pushUpLog: [{date, count}]
│   └── pullUpLog: [{date, count, type}]
├── sessions/
│   ├── {date}/
│   │   ├── gym: {exercises: [{name, sets: [{reps, weight}], completed}]}
│   │   ├── swim: {laps, duration, notes}
│   │   ├── hiit: {rounds, option, duration}
│   │   └── completed: ["gym", "swim"]
├── dailyLog/
│   ├── {date}/
│   │   ├── meals: {breakfast, midMorning, lunch, preWorkout, postWorkout, dinner}
│   │   ├── water: {glasses: number, target: 14}
│   │   ├── sleep: {bedTime, wakeTime, quality}
│   │   └── supplements: {creatine, vitaminD, magnesium}
├── settings/
│   └── notifications, theme, units
```

### Sync Strategy

- Firestore real-time listeners on all active collections
- Offline persistence enabled (both platforms)
- Writes go to Firestore immediately; if offline, queued and synced on reconnect
- Conflict resolution: last-write-wins (acceptable for single-user app)

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| bg-primary | `#0a0a0f` | Main background |
| bg-card | `#1a1a2e` | Card surfaces |
| bg-elevated | `#252540` | Elevated elements, modals |
| accent-coral | `#ff6b6b` | Primary CTA, highlights |
| accent-teal | `#4ecdc4` | Secondary, progress indicators |
| accent-gold | `#ffd93d` | Warnings, streak indicators |
| text-primary | `#ffffff` | Headings, primary text |
| text-secondary | `#a0a0b0` | Body text, descriptions |
| text-muted | `#6b6b7b` | Placeholders, subtle labels |
| success | `#6bcf7f` | Completed states |
| danger | `#ff4757` | Missed, warnings |

### Typography

- Web: Inter (headings), system-ui (body)
- Mobile: System fonts (SF Pro on iOS, Roboto on Android)
- Scale: 12/14/16/20/24/32/40px

### Components

- Cards with 1px border `rgba(255,255,255,0.05)`, rounded-xl
- Buttons: filled (coral), outlined (teal border), ghost
- Progress bars: rounded, gradient fill (teal → coral)
- Inputs: dark bg, subtle border, focus ring coral
- Haptic feedback on mobile for completions

---

## Pages & Features

### 1. Dashboard (Home)

**Purpose:** Daily command center. One glance shows what to do today.

**Content:**
- **Countdown cards:** Days to June 11 (plan end) and June 14 (convocation)
- **Phase badge:** "Phase 1: Build the Engine" / "Phase 2: Intensity Surge" / "Phase 3: Peak & Taper"
- **Today's card:**
  - Gym split name + swim yes/no
  - Meal summary (total kcal target, protein target)
  - HIIT indicator (Monday only)
- **Quick stats row:** Current weight → target, sessions this week, streak
- **Motivational quote:** Rotates daily from curated list
- **Belly fat progress:** Visual indicator — waist measurement trend

### 2. Gym Plan

**Purpose:** Exercise reference and logging during workouts.

**Content:**
- Phase tabs: Week 1-2 / Week 3-4 / Final Week
- Day selector within each phase (Mon/Tue/Wed/Thu/Fri)
- Each exercise shows: name, sets × reps, target weight, rest time, coaching cue
- **Interactive logging:**
  - Tap exercise to expand → log actual weight and reps per set
  - Checkbox per set (mark complete)
  - Auto-saves to Firestore as you go
- **Progressive overload tracker:**
  - Shows last session's numbers next to today's targets
  - Warns if weight jump > 10% (injury risk flag)
- **Superset indicators** (Phase 2): grouped exercises with "superset" badge
- **Post-gym section:** HIIT protocol (Monday) or "Head to pool" reminder (Tue-Fri)

### 3. Swim Plan

**Purpose:** Structured swimming guidance for a learning intermediate.

**Content:**
- Week-by-week plan (adapted for learning intermediate level)
- **Per-session structure:** warmup, main set, kickboard, cooldown with lap counts
- **Breath control tips section:**
  - "Exhale underwater through nose, inhale at turn"
  - "Count 3 strokes per breath on freestyle"
  - "Practice standing breathing drill first 2 min of each session"
- **Lap counter:** Tap to count laps during session
- **Stroke focus badges:** Freestyle / Breaststroke / Kickboard
- **Post-swim checklist:** Stretch, hydrate, log session
- **Progress notes:** Free-text field per session (e.g., "breath control better today")

### 4. HIIT Timer

**Purpose:** Interval timer for Monday stadium sessions.

**Content:**
- **Two modes:**
  - Option A (Track): Sprint/Walk intervals with configurable duration
  - Option B (Seating Area Circuit): Exercise list with work/rest timers
- **Timer features:**
  - Large countdown display
  - Audio beep at interval transitions (3-2-1 countdown beeps + GO tone)
  - Vibration on mobile
  - Round counter (current/total)
  - Pause/Resume/Reset controls
- **Progressive overload display:** "This week: X rounds" based on current week
- **Weather widget:** Open-Meteo API for Chennai — shows if outdoor HIIT is viable
- **Session log:** Auto-records duration and rounds when timer completes

### 5. Meal Plan

**Purpose:** Daily food guide with flexibility for off-campus living.

**Content:**
- **Day tabs:** Monday through Sunday (rotating 7-day plan)
- **Per meal:** Name, calories, protein, full ingredient list, prep notes
- **Three source modes (toggle):**
  - "Home cooking" — recipes you make at home
  - "Campus eateries" — what to pick at campus food courts/canteens
  - "Nearby restaurants" — safe orders at restaurants near your home or campus
- **For each mode:** specific order recommendations, what to avoid
- **Daily totals bar:** Running kcal + protein vs target (auto-calculates from logged meals)
- **Meal logging:** Check off what you actually ate, swap alternatives
- **Snack library:** Filterable grid (campus vendor / home stash / fruit)
- **"Suggest alternative" button:** Fetches comparable-calorie vegetarian meal from TheMealDB API
- **Eating out tips:** Swiggy/Zomato ordering strategies, restaurant guides

### 6. Recipes

**Purpose:** Quick hostel/home-friendly cooking reference.

**Content:**
- 8+ recipe cards (expandable)
- Each: name, cuisine badge, calories, protein, cook time, ingredients, steps
- Filters: cuisine, time, protein content
- "Beginner friendly" badge
- **API integration:** TheMealDB vegetarian recipes for weekly variety suggestions
- **Nutrition lookup:** Search field using Nutritionix API for any food item

### 7. Progress Tracker

**Purpose:** Visualize the transformation journey.

**Content:**
- **Weight graph:** Line chart, current → target (62.8 kg goal line)
- **Measurements:** Waist and arm circumference (weekly input)
- **Push-up tracker:** Per-session count, shows improvement curve
- **Pull-up progress:** Tracks negative pull-up hold times → eventual full pull-ups
- **Session heatmap:** GitHub-contribution-style grid showing gym + swim + HIIT sessions
- **Photo comparison:** Optional before/after photo upload (stored locally on device, not cloud)
- **Weekly summary cards:** Weight change, sessions completed, protein adherence

### 8. Daily Schedule

**Purpose:** Hour-by-hour view of the day including work, gym, meals, swim, rest.

**Content:**
- **Visual timeline:** Vertical time column, color-coded blocks
  - Blue: gym
  - Teal: swim
  - Gray: work/study
  - Amber: meals
  - Green: rest/recovery
  - Purple: commute (off-campus → campus)
- **Customizable:** Drag to adjust meal times, gym times based on your actual schedule
- **Templates per day type:**
  - Gym + HIIT day (Monday)
  - Gym + Swim day (Tue-Fri)
  - Active recovery + Swim (Saturday)
  - Full rest (Sunday)
- **Commute factor:** Includes travel time home ↔ campus
- **Notifications:** Reminders for pre-workout snack, gym time, swim time, bedtime

### 9. Health & Recovery

**Purpose:** Track sleep, hydration, supplements, and overall wellness.

**Content:**
- **Sleep tracker:** Bedtime + wake time input, "by 11:30 PM?" indicator
- **Hydration:** 14 glass icons (3.5L), tap to fill, daily reset
- **Supplements:** Creatine / Vitamin D / Magnesium checkboxes
- **Soreness log:** Body map — tap areas that are sore, rate 1-5
- **Recovery tips:** Context-aware (if you logged heavy legs yesterday, show leg recovery tips)
- **Weekly weigh-in reminder:** Monday morning prompt

---

## Expanded Fitness Programming

### Swimming Adaptations (Learning Intermediate)

**Week 1-2 focus: Breath control + endurance building**
- First 5 minutes every session: standing breathing drill (face in water, exhale bubbles, turn head to breathe)
- Freestyle limited to 2 laps continuous, then wall rest (build gradually)
- Extra kickboard work (4-6 laps) — builds cardio without breath pressure
- Breaststroke as primary stroke (easier breathing pattern for learning)
- Target: 14-16 laps total per session

**Week 3-4 focus: Freestyle confidence + intervals**
- Breathing drill reduced to 2 min warmup
- Freestyle target: 4 laps continuous before rest
- Introduce bilateral breathing (breathe both sides)
- Interval set: 1 lap hard / 30 sec rest × 5 (not 20 sec like full intermediate)
- Target: 20-24 laps total

**Final week: Consolidate and enjoy**
- Easy pace, mix of strokes
- Focus on form over speed
- 16 laps total, no pressure

### Daily Schedule Template

**Gym + Swim days (Tue-Fri):**
```
07:30  Wake up, 500ml water
07:45  Morning walk (10 min, natural light)
08:00  Breakfast
08:30  Commute to campus
09:00  Research/study work block 1 (50 min on, 10 min off)
11:30  Mid-morning snack
12:30  Lunch (campus eatery or packed)
13:00  Work block 2
15:00  Break + hydrate
15:30  Work block 3
16:30  Pre-workout snack
17:00  Gym session (60-75 min)
18:15  Reach pool
18:00-19:00  Swim session (45 min)
19:15  Post-swim meal
19:45  Commute home / light work
20:30  Free time / light reading
21:00  Dinner
22:00  Journal + wind-down
22:30  Screen off
23:00  Sleep
```

**Monday (Gym + HIIT, no swim):**
```
Same as above but:
17:00  Gym (60 min)
18:15  HIIT at Manohar C Watsa Stadium (25 min)
18:45  Cool down + commute
19:15  Post-workout meal
...rest same
```

**Saturday (Active recovery + Swim):**
```
08:00  Wake (natural, no alarm)
08:30  Light breakfast
09:30  Track walk/jog at Manohar C Watsa (30 min)
10:30  Brunch snack
11:00  Meal prep / grocery shopping
13:00  Lunch (slightly generous)
14:00  Free time / social
16:00  Mid-afternoon snack
18:00  Swim (easy pace)
19:15  Post-swim meal
21:00  Dinner
22:30  Sleep
```

**Sunday (Full rest):**
```
09:00  Wake naturally
09:30  Breakfast (relaxed, slightly more)
10:30  Meal prep for week
12:00  Brunch snack
13:30  Lunch (one day to eat more freely)
14:00  Rest / social / errands
17:00  Evening snack + chai
20:30  Dinner
22:00  Journal + plan next week
23:00  Sleep
```

### Extended Food Plans — Off-Campus Context

**Home cooking advantages:**
- Full kitchen access (stove, fridge, blender)
- Can meal prep on Sunday for 2-3 days
- Control over oil, salt, portions
- Can store grocery stash properly

**Campus eatery strategy:**
- Identify 2-3 reliable spots with protein-rich vegetarian options
- Standard orders: dal + roti + sabzi + curd (any North Indian outlet)
- Paneer tikka (dry) from any campus food court
- Idli/dosa for lighter days
- Always carry a lemon and ask for extra dal/sambar

**Nearby restaurant rotation (for variety):**
- Weekly 1-2 restaurant meals allowed (Saturday lunch or Sunday lunch)
- Stick to: dal fry + tandoori roti, paneer tikka, south Indian meals (limited rice)
- Avoid: cream gravies, fried starters, naan with butter, biryani (outside)
- Swiggy/Zomato: EatFit, Freshmenu, or custom "less oil" orders

### Additional Fitness Targets (Beyond MD)

**Belly fat specific protocol:**
- Morning fasted walk (10 min) — mobilizes visceral fat before breakfast
- No fruit juice ever (liquid calories spike insulin)
- Apple cider vinegar in water before 2 meals (optional, aids digestion)
- Cold shower after gym (2 min) — activates brown fat, aids recovery
- Measure belly circumference at navel every Monday with weight

**Muscle visibility targets:**
- Shoulder width: target 1-2 cm visual increase via lateral delt focus
- Arms: target 0.5-1 cm increase, focus on peak and horseshoe
- Core: 4 ab sessions/week, plus daily vacuums (30 sec × 3, anywhere)
- Posture: shoulder-back exercises (face pulls, rear delt) every pull day

**Progressive overload rules:**
- Week 1-2: Establish baseline, perfect form, RPE 7-8
- Week 3-4: Add weight OR reps (never both), RPE 8-9
- Final week: Same weight, fewer sets, full recovery between sets
- If you miss a rep target by >2, don't increase weight next session

---

## API Integrations

| API | Purpose | Auth |
|-----|---------|------|
| Firebase Auth | Google Sign-In | Firebase project config |
| Cloud Firestore | Real-time data sync | Firebase SDK |
| TheMealDB | Vegetarian recipe suggestions | Free, no key |
| Open-Meteo | Chennai weather for HIIT planning | Free, no key |
| Nutritionix (optional) | Calorie lookup for custom foods | Free tier API key |

---

## Notifications & Reminders

| Trigger | Message | Platform |
|---------|---------|----------|
| 16:15 daily (Tue-Fri) | "Pre-workout snack time. Gym in 45 min." | Push (mobile) |
| 17:45 (Tue-Sat) | "Pool opens in 15 min. Grab your gear." | Push (mobile) |
| 22:30 daily | "Wind down. Screen off in 30 min." | Push (mobile) |
| Monday 07:30 | "Weigh-in day! Empty stomach, same conditions." | Push (mobile) |
| Monday 16:00 | "HIIT day! Stadium after gym. Hydrate now." | Push (mobile) |

---

## Scope Boundaries

**In scope:**
- All 10 pages described above
- Firebase real-time sync
- Google Auth
- HIIT timer with audio
- Offline support
- Dark mode (primary), light mode (toggle)
- Web + iOS + Android

**Out of scope (for now):**
- Social features / sharing
- AI-powered meal suggestions (beyond TheMealDB)
- Wearable device integration (Apple Watch, etc.)
- Video exercise demonstrations
- Trainer/coach chat

---

## Implementation Priority

1. Firebase setup + Auth + data model
2. Shared package (types, data, utilities)
3. Web app: Dashboard + Gym Plan + Meals (core daily use)
4. Mobile app: Same core screens
5. HIIT Timer (both platforms)
6. Progress Tracker + Charts
7. Swim Plan + Schedule + Recovery
8. API integrations (weather, recipes)
9. Notifications
10. Polish, testing, deployment

---

## Success Criteria

- User can log a gym session on phone during workout and see it on desktop immediately
- HIIT timer works with audio cues and tracks rounds
- Daily meal plan visible with one tap
- Weight/measurement tracking shows visual progress
- App works offline and syncs when back online
- Installable as app on iOS, Android, Mac, and Ubuntu (via web)
