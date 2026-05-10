import { DaySchedule } from '../types';

const gymSwim: DaySchedule = {
  dayType: 'gymSwim',
  blocks: [
    { id: 'gs-1', startTime: '07:30', endTime: '07:45', label: 'Wake + 500ml water', category: 'rest' },
    { id: 'gs-2', startTime: '07:45', endTime: '08:00', label: 'Morning walk', category: 'rest' },
    { id: 'gs-3', startTime: '08:00', endTime: '08:30', label: 'Breakfast', category: 'meal' },
    { id: 'gs-4', startTime: '08:30', endTime: '09:00', label: 'Commute to campus', category: 'commute' },
    { id: 'gs-5', startTime: '09:00', endTime: '11:30', label: 'Research/study', category: 'work' },
    { id: 'gs-6', startTime: '11:30', endTime: '11:45', label: 'Mid-morning snack', category: 'meal' },
    { id: 'gs-7', startTime: '12:30', endTime: '13:00', label: 'Lunch', category: 'meal' },
    { id: 'gs-8', startTime: '13:00', endTime: '15:00', label: 'Work block 2', category: 'work' },
    { id: 'gs-9', startTime: '15:00', endTime: '15:30', label: 'Break + hydrate', category: 'rest' },
    { id: 'gs-10', startTime: '15:30', endTime: '16:30', label: 'Work block 3', category: 'work' },
    { id: 'gs-11', startTime: '16:30', endTime: '16:45', label: 'Pre-workout snack', category: 'meal' },
    { id: 'gs-12', startTime: '17:00', endTime: '18:15', label: 'Gym session', category: 'gym' },
    { id: 'gs-13', startTime: '18:15', endTime: '19:00', label: 'Swim session', category: 'swim' },
    { id: 'gs-14', startTime: '19:15', endTime: '19:45', label: 'Post-swim meal', category: 'meal' },
    { id: 'gs-15', startTime: '19:45', endTime: '20:30', label: 'Commute home', category: 'commute' },
    { id: 'gs-16', startTime: '20:30', endTime: '21:00', label: 'Free time', category: 'rest' },
    { id: 'gs-17', startTime: '21:00', endTime: '21:30', label: 'Dinner', category: 'meal' },
    { id: 'gs-18', startTime: '22:00', endTime: '22:30', label: 'Journal + wind-down', category: 'rest' },
    { id: 'gs-19', startTime: '23:00', endTime: '07:30', label: 'Sleep', category: 'sleep' },
  ],
};

const gymHiit: DaySchedule = {
  dayType: 'gymHiit',
  blocks: [
    { id: 'gh-1', startTime: '07:30', endTime: '07:45', label: 'Wake + 500ml water', category: 'rest' },
    { id: 'gh-2', startTime: '07:45', endTime: '08:00', label: 'Morning walk', category: 'rest' },
    { id: 'gh-3', startTime: '08:00', endTime: '08:30', label: 'Breakfast', category: 'meal' },
    { id: 'gh-4', startTime: '08:30', endTime: '09:00', label: 'Commute to campus', category: 'commute' },
    { id: 'gh-5', startTime: '09:00', endTime: '11:30', label: 'Research/study', category: 'work' },
    { id: 'gh-6', startTime: '11:30', endTime: '11:45', label: 'Mid-morning snack', category: 'meal' },
    { id: 'gh-7', startTime: '12:30', endTime: '13:00', label: 'Lunch', category: 'meal' },
    { id: 'gh-8', startTime: '13:00', endTime: '15:00', label: 'Work block 2', category: 'work' },
    { id: 'gh-9', startTime: '15:00', endTime: '15:30', label: 'Break + hydrate', category: 'rest' },
    { id: 'gh-10', startTime: '15:30', endTime: '16:30', label: 'Work block 3', category: 'work' },
    { id: 'gh-11', startTime: '16:30', endTime: '16:45', label: 'Pre-workout snack', category: 'meal' },
    { id: 'gh-12', startTime: '17:00', endTime: '18:00', label: 'Gym session', category: 'gym' },
    { id: 'gh-13', startTime: '18:15', endTime: '18:45', label: 'HIIT session', category: 'hiit' },
    { id: 'gh-14', startTime: '18:45', endTime: '19:15', label: 'Cool down + commute', category: 'commute' },
    { id: 'gh-15', startTime: '19:15', endTime: '19:45', label: 'Post-workout meal', category: 'meal' },
    { id: 'gh-16', startTime: '19:45', endTime: '20:30', label: 'Commute home', category: 'commute' },
    { id: 'gh-17', startTime: '20:30', endTime: '21:00', label: 'Free time', category: 'rest' },
    { id: 'gh-18', startTime: '21:00', endTime: '21:30', label: 'Dinner', category: 'meal' },
    { id: 'gh-19', startTime: '22:00', endTime: '22:30', label: 'Journal + wind-down', category: 'rest' },
    { id: 'gh-20', startTime: '23:00', endTime: '07:30', label: 'Sleep', category: 'sleep' },
  ],
};

const activeRecovery: DaySchedule = {
  dayType: 'activeRecovery',
  blocks: [
    { id: 'ar-1', startTime: '08:00', endTime: '08:30', label: 'Wake + water + stretch', category: 'rest' },
    { id: 'ar-2', startTime: '08:30', endTime: '09:00', label: 'Breakfast', category: 'meal' },
    { id: 'ar-3', startTime: '09:30', endTime: '10:00', label: 'Track walk', category: 'gym' },
    { id: 'ar-4', startTime: '10:30', endTime: '11:00', label: 'Mid-morning snack', category: 'meal' },
    { id: 'ar-5', startTime: '11:00', endTime: '13:00', label: 'Meal prep', category: 'rest' },
    { id: 'ar-6', startTime: '13:00', endTime: '13:30', label: 'Lunch', category: 'meal' },
    { id: 'ar-7', startTime: '14:00', endTime: '16:00', label: 'Free time', category: 'rest' },
    { id: 'ar-8', startTime: '16:00', endTime: '16:30', label: 'Snack', category: 'meal' },
    { id: 'ar-9', startTime: '18:00', endTime: '19:00', label: 'Swim session', category: 'swim' },
    { id: 'ar-10', startTime: '19:15', endTime: '19:45', label: 'Post-swim meal', category: 'meal' },
    { id: 'ar-11', startTime: '21:00', endTime: '21:30', label: 'Dinner', category: 'meal' },
    { id: 'ar-12', startTime: '22:30', endTime: '08:00', label: 'Sleep', category: 'sleep' },
  ],
};

const fullRest: DaySchedule = {
  dayType: 'fullRest',
  blocks: [
    { id: 'fr-1', startTime: '09:00', endTime: '09:30', label: 'Wake + water', category: 'rest' },
    { id: 'fr-2', startTime: '09:30', endTime: '10:00', label: 'Breakfast', category: 'meal' },
    { id: 'fr-3', startTime: '10:30', endTime: '12:00', label: 'Meal prep', category: 'rest' },
    { id: 'fr-4', startTime: '12:00', endTime: '12:30', label: 'Snack', category: 'meal' },
    { id: 'fr-5', startTime: '13:30', endTime: '14:00', label: 'Lunch', category: 'meal' },
    { id: 'fr-6', startTime: '14:00', endTime: '17:00', label: 'Free time', category: 'rest' },
    { id: 'fr-7', startTime: '17:00', endTime: '17:30', label: 'Snack', category: 'meal' },
    { id: 'fr-8', startTime: '20:30', endTime: '21:00', label: 'Dinner', category: 'meal' },
    { id: 'fr-9', startTime: '22:00', endTime: '22:30', label: 'Journal + wind-down', category: 'rest' },
    { id: 'fr-10', startTime: '23:00', endTime: '09:00', label: 'Sleep', category: 'sleep' },
  ],
};

export const scheduleTemplates: Record<string, DaySchedule> = {
  gymSwim,
  gymHiit,
  activeRecovery,
  fullRest,
};

export const dayToTemplate: Record<string, string> = {
  monday: 'gymHiit',
  tuesday: 'gymSwim',
  wednesday: 'gymSwim',
  thursday: 'gymSwim',
  friday: 'gymSwim',
  saturday: 'activeRecovery',
  sunday: 'fullRest',
};
