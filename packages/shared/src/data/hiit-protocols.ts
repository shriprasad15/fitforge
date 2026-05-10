import { HIITProtocol } from '../types';

const trackSprints: HIITProtocol = {
  option: 'trackSprints',
  label: 'Track Sprints — Manohar C Watsa Stadium',
  warmup: 180,
  intervals: [
    { name: 'Sprint', duration: 30, type: 'work' },
    { name: 'Walk', duration: 90, type: 'rest' },
  ],
  cooldown: 300,
  roundsPerWeek: {
    1: 8,
    2: 10,
    3: 12,
    4: 12,
    5: 8,
  },
};

const seatingCircuit: HIITProtocol = {
  option: 'seatingCircuit',
  label: 'Seating Circuit — Bodyweight HIIT',
  warmup: 120,
  intervals: [
    { name: 'Jump Squats', duration: 30, type: 'work' },
    { name: 'Rest', duration: 10, type: 'rest' },
    { name: 'Burpees', duration: 25, type: 'work' },
    { name: 'Rest', duration: 10, type: 'rest' },
    { name: 'Mountain Climbers', duration: 30, type: 'work' },
    { name: 'Rest', duration: 10, type: 'rest' },
    { name: 'High Knees', duration: 30, type: 'work' },
    { name: 'Round Rest', duration: 45, type: 'rest' },
  ],
  cooldown: 300,
  roundsPerWeek: {
    1: 6,
    2: 7,
    3: 8,
    4: 8,
    5: 6,
  },
};

export const hiitProtocols = {
  trackSprints,
  seatingCircuit,
};
