'use client';

import { MealSource } from '@fitforge/shared';

interface MealSourceToggleProps {
  value: MealSource;
  onChange: (source: MealSource) => void;
}

const sources: { key: MealSource; label: string }[] = [
  { key: 'homeCooking', label: 'Home' },
  { key: 'campusEatery', label: 'Campus' },
  { key: 'restaurant', label: 'Restaurant' },
];

export function MealSourceToggle({ value, onChange }: MealSourceToggleProps) {
  return (
    <div className="flex gap-1 bg-bg-elevated rounded-lg p-1">
      {sources.map((s) => (
        <button
          key={s.key}
          onClick={() => onChange(s.key)}
          className={`flex-1 text-xs font-medium py-1.5 px-2 rounded-md transition-colors ${
            value === s.key
              ? 'bg-accent-teal text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
