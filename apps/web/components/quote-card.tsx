'use client';
import { motivationalQuotes } from '@fitforge/shared';

export function QuoteCard() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const quote = motivationalQuotes[dayOfYear % motivationalQuotes.length];
  return (
    <div className="bg-bg-card rounded-xl p-4 border border-white/5">
      <p className="text-text-secondary text-sm italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}
