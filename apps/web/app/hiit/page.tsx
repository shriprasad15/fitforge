'use client';

import { useState } from 'react';
import { HIITTimer } from '@/components/hiit-timer';
import { WeatherWidget } from '@/components/weather-widget';
import { hiitProtocols, HIITOption, getCurrentWeek } from '@fitforge/shared';

export default function HIITPage() {
  const [selectedOption, setSelectedOption] = useState<HIITOption>('trackSprints');
  const week = getCurrentWeek();
  const protocol = hiitProtocols[selectedOption];
  const rounds = protocol.roundsPerWeek[week] || protocol.roundsPerWeek[1];

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">HIIT Session</h1>

      {/* Weather */}
      <WeatherWidget />

      {/* Option Selector */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1">
        <button
          onClick={() => setSelectedOption('trackSprints')}
          className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
            selectedOption === 'trackSprints'
              ? 'bg-accent-coral text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Track Sprints
        </button>
        <button
          onClick={() => setSelectedOption('seatingCircuit')}
          className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
            selectedOption === 'seatingCircuit'
              ? 'bg-accent-coral text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Seating Circuit
        </button>
      </div>

      {/* Protocol Info */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <p className="text-sm font-medium text-text-primary">{protocol.label}</p>
        <div className="mt-2 flex gap-4 text-xs text-text-secondary">
          <span>Week {week}</span>
          <span>{rounds} rounds</span>
          <span>Warmup: {Math.floor(protocol.warmup / 60)}min</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {protocol.intervals.map((interval, i) => (
            <span
              key={i}
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                interval.type === 'work'
                  ? 'bg-accent-coral/10 text-accent-coral'
                  : 'bg-accent-teal/10 text-accent-teal'
              }`}
            >
              {interval.name} ({interval.duration}s)
            </span>
          ))}
        </div>
      </div>

      {/* Timer */}
      <div className="bg-bg-card rounded-xl p-6 border border-white/5">
        <HIITTimer protocol={protocol} rounds={rounds} />
      </div>
    </div>
  );
}
