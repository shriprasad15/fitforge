'use client';

import { useState } from 'react';

interface LapCounterProps {
  targetLaps: number;
}

export function LapCounter({ targetLaps }: LapCounterProps) {
  const [laps, setLaps] = useState(0);

  const increment = () => setLaps((l) => l + 1);
  const decrement = () => setLaps((l) => Math.max(0, l - 1));
  const reset = () => setLaps(0);

  const progress = Math.min(100, (laps / targetLaps) * 100);

  return (
    <div className="bg-bg-card rounded-xl p-6 border border-white/5 text-center space-y-4">
      <p className="text-text-muted text-xs uppercase tracking-wider">Laps Completed</p>

      <div className="relative">
        <p className="text-6xl font-bold font-mono text-text-primary">{laps}</p>
        <p className="text-sm text-text-secondary mt-1">/ {targetLaps} target</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-bg-elevated rounded-full h-2">
        <div
          className="bg-accent-teal rounded-full h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={decrement}
          className="w-12 h-12 rounded-full bg-bg-elevated text-text-secondary text-xl font-bold hover:bg-bg-elevated/80 transition-colors"
        >
          -
        </button>
        <button
          onClick={increment}
          className="w-20 h-20 rounded-full bg-accent-teal text-bg-primary text-2xl font-bold hover:bg-accent-teal/90 transition-colors"
        >
          +1
        </button>
        <button
          onClick={reset}
          className="w-12 h-12 rounded-full bg-bg-elevated text-text-secondary text-xs font-medium hover:bg-bg-elevated/80 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
