'use client';

import { useEffect, useRef } from 'react';

const schedule = [
  { hour: 7, minute: 0, message: 'Time for breakfast! Start your day with protein.' },
  { hour: 10, minute: 0, message: 'Mid-morning snack — grab some nuts or a fruit.' },
  { hour: 12, minute: 30, message: 'Lunch time! High protein, controlled portions.' },
  { hour: 15, minute: 0, message: 'Pre-workout snack in 30 min. Banana + coffee?' },
  { hour: 15, minute: 45, message: 'Gym in 15 minutes! Get your gear ready.' },
  { hour: 17, minute: 30, message: 'Post-workout shake time. Protein + creatine.' },
  { hour: 18, minute: 0, message: 'Swimming session starts now. Head to the pool!' },
  { hour: 19, minute: 30, message: 'Dinner time. Keep it clean — dal, veggies, protein.' },
  { hour: 22, minute: 0, message: 'Take your supplements. Start winding down.' },
  { hour: 23, minute: 0, message: 'Time to sleep! Recovery happens while you rest.' },
];

export function useNotifications() {
  const permissionRef = useRef<NotificationPermission>('default');

  useEffect(() => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
      Notification.requestPermission().then((perm) => {
        permissionRef.current = perm;
      });
    } else {
      permissionRef.current = Notification.permission;
    }
  }, []);

  useEffect(() => {
    if (!('Notification' in window)) return;

    const checkInterval = setInterval(() => {
      if (permissionRef.current !== 'granted') return;

      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();

      const match = schedule.find((s) => s.hour === h && s.minute === m);
      if (match) {
        new Notification('FitForge', {
          body: match.message,
          icon: '/favicon.ico',
          tag: `fitforge-${h}-${m}`,
        });
      }
    }, 60000);

    return () => clearInterval(checkInterval);
  }, []);
}
