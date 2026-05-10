'use client';

import { useState } from 'react';
import { RecipeCard } from '@/components/recipe-card';
import { recipes, Recipe } from '@fitforge/shared';

type CuisineFilter = 'all' | Recipe['cuisine'];

const cuisines: { key: CuisineFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'indian', label: 'Indian' },
  { key: 'continental', label: 'Continental' },
  { key: 'mexican', label: 'Mexican' },
  { key: 'thai', label: 'Thai' },
  { key: 'mediterranean', label: 'Mediterranean' },
];

export default function RecipesPage() {
  const [filter, setFilter] = useState<CuisineFilter>('all');
  const [beginnerOnly, setBeginnerOnly] = useState(false);

  let filtered = filter === 'all' ? recipes : recipes.filter((r) => r.cuisine === filter);
  if (beginnerOnly) {
    filtered = filtered.filter((r) => r.isBeginnerFriendly);
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Recipes</h1>

      {/* Cuisine Filter */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1 overflow-x-auto">
        {cuisines.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`text-[10px] font-medium py-1.5 px-2.5 rounded-md transition-colors whitespace-nowrap ${
              filter === c.key
                ? 'bg-accent-coral text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Beginner Toggle */}
      <button
        onClick={() => setBeginnerOnly(!beginnerOnly)}
        className={`text-xs py-1.5 px-3 rounded-lg transition-colors ${
          beginnerOnly
            ? 'bg-success/10 text-success border border-success/30'
            : 'bg-bg-elevated text-text-secondary border border-white/5'
        }`}
      >
        Beginner-Friendly Only
      </button>

      {/* Recipe Cards */}
      <div className="space-y-2">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-bg-card rounded-xl p-6 border border-white/5 text-center">
            <p className="text-text-muted text-sm">No recipes match the current filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
