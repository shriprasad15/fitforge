'use client';

import { useState } from 'react';
import { snacks, Snack } from '@fitforge/shared';

type SnackCategory = 'all' | 'campusVendor' | 'homeStash' | 'fruit';

const categoryLabels: Record<SnackCategory, string> = {
  all: 'All',
  campusVendor: 'Campus',
  homeStash: 'Home Stash',
  fruit: 'Fruit',
};

export function SnackGrid() {
  const [filter, setFilter] = useState<SnackCategory>('all');
  const filtered = filter === 'all' ? snacks : snacks.filter((s) => s.category === filter);

  return (
    <div className="space-y-3">
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1">
        {(Object.keys(categoryLabels) as SnackCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex-1 text-[10px] font-medium py-1.5 px-2 rounded-md transition-colors ${
              filter === cat
                ? 'bg-accent-gold text-bg-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.map((snack, i) => (
          <SnackCard key={i} snack={snack} />
        ))}
      </div>
    </div>
  );
}

function SnackCard({ snack }: { snack: Snack }) {
  return (
    <div className="bg-bg-card rounded-xl p-3 border border-white/5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-text-primary">{snack.name}</p>
        <span className="text-xs text-text-muted">{snack.calories} cal</span>
      </div>
      {snack.protein !== undefined && snack.protein > 0 && (
        <p className="text-[10px] text-accent-teal mt-0.5">{snack.protein}g protein</p>
      )}
      <p className="text-[10px] text-text-muted mt-1">{snack.when}</p>
      <p className="text-[10px] text-text-secondary mt-0.5 italic">{snack.why}</p>
    </div>
  );
}
