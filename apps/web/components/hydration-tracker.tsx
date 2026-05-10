'use client';

import { useState } from 'react';

const TARGET_GLASSES = 14;

export function HydrationTracker() {
  const [glasses, setGlasses] = useState(0);

  const toggle = (index: number) => {
    if (index + 1 === glasses) {
      setGlasses(index);
    } else {
      setGlasses(index + 1);
    }
  };

  return (
    <div className="bg-bg-card rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Hydration</h3>
        <span className="text-xs text-text-secondary">{glasses} / {TARGET_GLASSES} glasses</span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: TARGET_GLASSES }).map((_, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`aspect-square rounded-lg flex items-center justify-center text-lg transition-colors ${
              i < glasses
                ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30'
                : 'bg-bg-elevated text-text-muted border border-white/5'
            }`}
          >
            {i < glasses ? '●' : '○'}
          </button>
        ))}
      </div>
      <div className="mt-3 w-full bg-bg-elevated rounded-full h-1.5">
        <div
          className="bg-accent-teal rounded-full h-1.5 transition-all duration-300"
          style={{ width: `${(glasses / TARGET_GLASSES) * 100}%` }}
        />
      </div>
    </div>
  );
}
