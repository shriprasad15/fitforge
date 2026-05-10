'use client';

import { useState, useEffect } from 'react';
import { WeighIn, subscribeToProgress, saveWeighIn } from '@fitforge/shared';
import { useAuth } from './use-auth';

export function useProgress() {
  const { user } = useAuth();
  const [weighIns, setWeighIns] = useState<WeighIn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const unsubscribe = subscribeToProgress(user.uid, (data) => {
      setWeighIns(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);

  const addWeighIn = async (weighIn: WeighIn) => {
    if (!user) return;
    await saveWeighIn(user.uid, weighIn);
  };

  return { weighIns, loading, addWeighIn };
}
