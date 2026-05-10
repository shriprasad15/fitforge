'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CountdownCard } from '@/components/countdown-card';
import { PhaseBadge } from '@/components/phase-badge';
import { QuoteCard } from '@/components/quote-card';
import {
  gymPlan,
  getCurrentPhase,
  getGymDay,
  isSwimDay,
  isHIITDay,
  DAILY_CALORIE_TARGET,
  DAILY_PROTEIN_TARGET,
} from '@fitforge/shared';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-accent-coral text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const phase = getCurrentPhase();
  const gymDay = getGymDay();
  const swim = isSwimDay();
  const hiit = isHIITDay();
  const currentPlan = gymPlan[phase];
  const todayPlan = gymDay ? currentPlan.days[gymDay] : null;
  const firstName = user.displayName?.split(' ')[0] || 'Athlete';

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      {/* Greeting */}
      <div>
        <h1 className="font-heading text-2xl font-bold">Hey, {firstName}</h1>
        <div className="mt-2">
          <PhaseBadge />
        </div>
      </div>

      {/* Countdown */}
      <CountdownCard />

      {/* Today's Workout */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-2">Today&apos;s Workout</h2>
        {todayPlan ? (
          <div>
            <p className="text-lg font-semibold text-text-primary">{todayPlan.name}</p>
            <p className="text-text-secondary text-sm mt-1">{todayPlan.exercises.length} exercises</p>
          </div>
        ) : (
          <p className="text-text-secondary">Rest day — recovery is growth</p>
        )}
        <div className="flex gap-2 mt-3">
          {hiit && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-accent-coral/10 text-accent-coral border border-accent-coral/30">
              HIIT Day
            </span>
          )}
          {swim && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-accent-teal/10 text-accent-teal border border-accent-teal/30">
              Swim Day
            </span>
          )}
        </div>
      </div>

      {/* Nutrition Targets */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-2">Daily Targets</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-accent-gold">{DAILY_CALORIE_TARGET}</p>
            <p className="text-text-secondary text-xs">calories</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent-teal">{DAILY_PROTEIN_TARGET}g</p>
            <p className="text-text-secondary text-xs">protein</p>
          </div>
        </div>
      </div>

      {/* Quote */}
      <QuoteCard />
    </div>
  );
}
