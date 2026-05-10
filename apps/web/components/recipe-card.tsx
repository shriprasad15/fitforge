'use client';

import { useState } from 'react';
import { Recipe } from '@fitforge/shared';

interface RecipeCardProps {
  recipe: Recipe;
}

const cuisineColors: Record<string, string> = {
  indian: 'bg-accent-gold/10 text-accent-gold',
  continental: 'bg-blue-500/10 text-blue-400',
  mexican: 'bg-accent-coral/10 text-accent-coral',
  thai: 'bg-success/10 text-success',
  mediterranean: 'bg-accent-teal/10 text-accent-teal',
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-bg-card rounded-xl border border-white/5 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-text-primary">{recipe.name}</p>
              <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${cuisineColors[recipe.cuisine] || ''}`}>
                {recipe.cuisine}
              </span>
              {recipe.isBeginnerFriendly && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/10 text-success">
                  Beginner
                </span>
              )}
            </div>
            <div className="flex gap-3 mt-1 text-xs text-text-secondary">
              <span>{recipe.calories} cal</span>
              <span>{recipe.protein}g protein</span>
              <span>{recipe.cookTime} min</span>
            </div>
          </div>
          <span className="text-text-muted text-lg shrink-0">
            {expanded ? '−' : '+'}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Ingredients */}
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Ingredients</p>
            <ul className="space-y-0.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-xs text-text-secondary">• {ing}</li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Steps</p>
            <ol className="space-y-1">
              {recipe.steps.map((step, i) => (
                <li key={i} className="text-xs text-text-secondary">
                  <span className="text-text-muted font-medium">{i + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
