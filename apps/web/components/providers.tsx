'use client';

import { ReactNode } from 'react';
import { AuthContext, useAuthProvider } from '@/hooks/use-auth';
import { useNotifications } from '@/hooks/use-notifications';

export function Providers({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();
  useNotifications();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
