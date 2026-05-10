import { Phase, DayOfWeek, GymDay } from '../types';

const PLAN_START = '2025-05-10';
const PLAN_END = '2025-06-11';
const CONVOCATION = '2025-06-14';

export function getDaysRemaining(targetDate: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getDaysToPlanEnd(): number {
  return getDaysRemaining(PLAN_END);
}

export function getDaysToConvocation(): number {
  return getDaysRemaining(CONVOCATION);
}

export function getCurrentPhase(date?: Date): Phase {
  const d = date || new Date();
  const start = new Date(PLAN_START);
  const daysSinceStart = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceStart < 14) return 'phase1';
  if (daysSinceStart < 28) return 'phase2';
  return 'phase3';
}

export function getCurrentWeek(date?: Date): number {
  const d = date || new Date();
  const start = new Date(PLAN_START);
  const daysSinceStart = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(5, Math.floor(daysSinceStart / 7) + 1);
}

export function getPhaseLabel(phase: Phase): string {
  switch (phase) {
    case 'phase1': return 'Phase 1: Build the Engine';
    case 'phase2': return 'Phase 2: Intensity Surge';
    case 'phase3': return 'Phase 3: Peak & Taper';
  }
}

export function getDayOfWeek(date?: Date): DayOfWeek {
  const d = date || new Date();
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[d.getDay()];
}

export function getGymDay(date?: Date): GymDay | null {
  const day = getDayOfWeek(date);
  if (day === 'saturday' || day === 'sunday') return null;
  return day as GymDay;
}

export function isSwimDay(date?: Date): boolean {
  const day = getDayOfWeek(date);
  return ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(day);
}

export function isHIITDay(date?: Date): boolean {
  return getDayOfWeek(date) === 'monday';
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getToday(): string {
  return formatDate(new Date());
}
