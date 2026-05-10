'use client';

import { useState } from 'react';
import { HydrationTracker } from '@/components/hydration-tracker';

export default function HealthPage() {
  const [sleep, setSleep] = useState({ bedTime: '23:00', wakeTime: '07:30', quality: 3 });
  const [supplements, setSupplements] = useState({ creatine: false, vitaminD: false, magnesium: false });

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Health Tracker</h1>

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
