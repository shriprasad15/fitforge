'use client';

import { useState, useEffect } from 'react';
import { HydrationTracker } from '@/components/hydration-tracker';

function useCurrentTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);
  return now;
}

interface ScheduleItem {
  time: string;
  label: string;
  hour: number;
}

const dailySchedule: ScheduleItem[] = [
  { time: '06:30', label: 'Wake up + Hydrate', hour: 6.5 },
  { time: '07:00', label: 'Breakfast', hour: 7 },
  { time: '08:00', label: 'Work/Study Block', hour: 8 },
  { time: '10:00', label: 'Mid-morning Snack', hour: 10 },
  { time: '12:30', label: 'Lunch', hour: 12.5 },
  { time: '15:00', label: 'Pre-workout Snack', hour: 15 },
  { time: '16:00', label: 'Gym Session', hour: 16 },
  { time: '17:30', label: 'Post-workout Shake', hour: 17.5 },
  { time: '18:00', label: 'Swimming', hour: 18 },
  { time: '19:30', label: 'Dinner', hour: 19.5 },
  { time: '21:00', label: 'Light Walk / Stretch', hour: 21 },
  { time: '22:00', label: 'Supplements + Wind Down', hour: 22 },
  { time: '23:00', label: 'Sleep', hour: 23 },
];

export default function HealthPage() {
  const now = useCurrentTime();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const [sleep, setSleep] = useState({ bedTime: '23:00', wakeTime: '07:30', quality: 3 });
  const [supplements, setSupplements] = useState({ creatine: false, vitaminD: false, magnesium: false, fishOil: false });
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleScheduleItem = (label: string) => {
    setCompleted((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const getStatus = (item: ScheduleItem) => {
    if (completed[item.label]) return 'done';
    if (currentHour >= item.hour + 1) return 'missed';
    if (currentHour >= item.hour - 0.5) return 'now';
    return 'upcoming';
  };

  const statusColors = {
    done: 'border-success/30 bg-success/5',
    missed: 'border-red-500/30 bg-red-500/5',
    now: 'border-accent-coral/50 bg-accent-coral/10',
    upcoming: 'border-white/5 bg-bg-card',
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Health Tracker</h1>
        <div className="text-right">
          <p className="text-xs text-text-muted">{now.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          <p className="text-sm font-medium text-accent-teal">{now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      {/* Daily Timeline */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">Today&apos;s Timeline</h3>
        <div className="space-y-1.5">
          {dailySchedule.map((item) => {
            const status = getStatus(item);
            return (
              <button
                key={item.label}
                onClick={() => toggleScheduleItem(item.label)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all ${statusColors[status]}`}
              >
                <span className="text-[10px] text-text-muted w-10 shrink-0">{item.time}</span>
                <span className={`text-xs flex-1 text-left ${
                  status === 'done' ? 'line-through text-text-muted' :
                  status === 'missed' ? 'text-red-400' :
                  status === 'now' ? 'text-accent-coral font-medium' :
                  'text-text-secondary'
                }`}>
                  {item.label}
                </span>
                {status === 'now' && !completed[item.label] && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent-coral/20 text-accent-coral animate-pulse">NOW</span>
                )}
                {status === 'missed' && !completed[item.label] && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">MISSED</span>
                )}
                {completed[item.label] && (
                  <span className="text-success text-xs">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hydration */}
      <HydrationTracker />

      {/* Sleep */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">Sleep</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-text-muted block mb-1">Bed Time</label>
            <input
              type="time"
              value={sleep.bedTime}
              onChange={(e) => setSleep((s) => ({ ...s, bedTime: e.target.value }))}
              className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary"
            />
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-1">Wake Time</label>
            <input
              type="time"
              value={sleep.wakeTime}
              onChange={(e) => setSleep((s) => ({ ...s, wakeTime: e.target.value }))}
              className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="text-xs text-text-muted block mb-1">Sleep Quality</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((q) => (
              <button
                key={q}
                onClick={() => setSleep((s) => ({ ...s, quality: q }))}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sleep.quality >= q
                    ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30'
                    : 'bg-bg-elevated text-text-muted border border-white/5'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        {sleep.bedTime > '23:30' && (
          <p className="mt-2 text-[10px] text-danger">Aim to be in bed by 11:30 PM for optimal recovery</p>
        )}
      </div>

      {/* Supplements */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">Supplements</h3>
        <div className="space-y-2">
          {[
            { key: 'creatine' as const, label: 'Creatine (5g)', time: 'Post-workout' },
            { key: 'vitaminD' as const, label: 'Vitamin D3', time: 'Morning with breakfast' },
            { key: 'magnesium' as const, label: 'Magnesium', time: 'Before bed' },
          ].map(({ key, label, time }) => (
            <button
              key={key}
              onClick={() => setSupplements((s) => ({ ...s, [key]: !s[key] }))}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                supplements[key]
                  ? 'bg-success/10 border border-success/30'
                  : 'bg-bg-elevated border border-white/5'
              }`}
            >
              <div className="text-left">
                <p className={`text-sm font-medium ${supplements[key] ? 'text-success' : 'text-text-primary'}`}>{label}</p>
                <p className="text-[10px] text-text-muted">{time}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                supplements[key] ? 'bg-success border-success text-white' : 'border-text-muted'
              }`}>
                {supplements[key] && <span className="text-xs">✓</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Soreness */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-2">Recovery Tips</h3>
        <div className="space-y-1.5 text-xs text-text-secondary">
          <p>- Foam roll any sore muscles for 5-10 min</p>
          <p>- Apply ice if acute pain, heat if chronic tightness</p>
          <p>- Light stretching before bed aids recovery</p>
          <p>- Magnesium before bed reduces muscle cramps</p>
        </div>
      </div>
    </div>
  );
}
