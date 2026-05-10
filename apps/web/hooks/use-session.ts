'use client';

import { useState, useEffect } from 'react';
import { GymSession, subscribeToGymSession, saveGymSession } from '@fitforge/shared';
import { useAuth } from './use-auth';

export function useSession(date: string) {
  const { user } = useAuth();
  const [session, setSession] = useState<GymSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const unsubscribe = subscribeToGymSession(user.uid, date, (s) => {
      setSession(s);
      setLoading(false);
    });
    return unsubscribe;
  }, [user, date]);

  const save = async (s: GymSession) => {
    if (!user) return;
    await saveGymSession(user.uid, s);
  };

  return { session, loading, save };
}
